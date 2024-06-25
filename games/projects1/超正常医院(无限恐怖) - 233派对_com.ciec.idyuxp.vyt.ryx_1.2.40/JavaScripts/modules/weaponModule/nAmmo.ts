
import { GameConfig } from "../../config/GameConfig";
import { InBulletElement } from '../../config/nBullet';
import { GlobalData } from "../../const/GlobalData";
import { utils } from '../../utils/uitls';

/* 重力 */
const GRAVITAIONAL_ACCELERATION: number = 9.8;
/* debug标识 */
const DEBUG_FLAG: boolean = false;

enum AmmoType {
    effect = 1,
    Modle = 2
}

export class AmmoPool {

    private static _instance: AmmoPool;
    public static get instance(): AmmoPool {
        if (!this._instance) {
            this._instance = new AmmoPool();
        }
        return this._instance;
    }

    private ammoPool: Ammo[] = [];

    public async getAmmo(ownerId: number, startLoc: mw.Vector, direction: mw.Vector, bulletId: number, distance: number, danceId: number): Promise<Ammo> {
        let ammo = this.ammoPool.pop();
        if (!ammo) {
            ammo = new Ammo();
            await ammo.init(ownerId, bulletId, startLoc, direction, distance, danceId)
        } else {
            await ammo.init(ownerId, bulletId, startLoc, direction, distance, danceId)
        }
        return ammo;
    }


    public recycleAmmo(ammo: Ammo): void {
        ammo.destroy();
        this.ammoPool.push(ammo);
    }


}

// 单端弹药类
export class Ammo {
    /**弹药所属角色*/
    ownerId: number = 0;
    hitResults: mw.GameObject[] | mw.HitResult[] = []; // 击中结果

    private ownerCharGuid: string;
    public danceId: number; // 舞蹈id
    private entity: GameObject; // 弹药实体
    private displacement: mw.Vector; // 每秒位移
    private currentLocation: mw.Vector; // 当前位置
    private gravityScale: number; // 重力系数
    private lifeTime: number; // 生命周期
    private currentTime: number; // 当前运动时间
    private stride: mw.Vector; // 步长
    /**子弹数据 */
    public bulletData: InBulletElement = null;

    /**
     * 子弹初始化
     * @param ownerId 所属玩家id
     * @param bulletId 子弹表id
     * @param startLoc 开始位置
     * @param direction 方向
     * @param distance 子弹距离
     */
    async init(ownerId: number, bulletId: number, startLoc: mw.Vector, direction: mw.Vector, distance: number, danceId: number): Promise<void> {
        this.ownerId = ownerId;
        this.danceId = danceId;
        this.ownerCharGuid = Player.getPlayer(ownerId).character.gameObjectId;
        this.bulletData = GameConfig.nBullet.getElement(bulletId);

        switch (this.bulletData.nAmmoType) {
            case AmmoType.effect:
                this.entity = await GameObjPool.asyncSpawn<Effect>(this.bulletData.resId, GameObjPoolSourceType.Asset);
                (this.entity as Effect).play();
                break;
            case AmmoType.Modle:
                this.entity = await GameObjPool.asyncSpawn<GameObject>(this.bulletData.resId, GameObjPoolSourceType.Asset);
            default:
                break;
        }

        this.currentLocation = startLoc.clone();
        this.entity.worldTransform.position = this.currentLocation;
        this.entity.worldTransform.rotation = direction.toRotation().add(new Rotation(this.bulletData.rotation));
        this.entity.setVisibility(mw.PropertyStatus.On);

        this.entity.worldTransform.scale = this.bulletData.scale;
        this.displacement = mw.Vector.multiply(direction, this.bulletData.speed, this.displacement);
        this.lifeTime = distance / this.bulletData.speed;
        this.currentTime = 0;
        this.gravityScale = this.bulletData.gravityScale;
        this.stride = mw.Vector.zero;
    }

    // 更新弹药位置，发射客户端承担检测
    public update(dt: number): boolean {
        if (!this.entity) return false;
        if (this.lifeTime <= 0) {//延时回收
            return true
        }
        // 计算当前帧弹药移动步长
        mw.Vector.multiply(this.displacement, dt, this.stride);
        // 如果重力系数不为0则对z轴坐标和旋转进行进一步计算
        if (this.gravityScale) {
            this.stride.z -= (this.gravityScale * GRAVITAIONAL_ACCELERATION * (Math.pow(this.currentTime + dt, 2) - Math.pow(this.currentTime, 2)));
            this.entity.worldTransform.rotation = this.stride.toRotation().add(new Rotation(this.bulletData.rotation));
            this.currentTime += dt;
        }
        // 计算出当前更新位置
        this.currentLocation.x += this.stride.x;
        this.currentLocation.y += this.stride.y;
        this.currentLocation.z += this.stride.z;

        // 如果检测范围大于0，每帧检测碰撞（只有武器持有人客户端子弹进行检测，其余客户端只是模拟）
        if (GlobalData.Gun.checkSize && this.ownerId) {
            // 如果检测范围小于10，射线检测，返回Gameplay.HitResult数组
            if (GlobalData.Gun.checkSize < 10) {
                let lineResult = QueryUtil.lineTrace(this.entity.worldTransform.position, this.currentLocation, true, DEBUG_FLAG);
                // 射线检测结果不为0，即有碰撞对象
                for (let element of lineResult) {
                    if (element.gameObject.tag) {
                        this.lifeTime = -1;
                        this.hitResults.push(element as any);
                        break;
                    }
                }
            } else { // 如果检测范围大于等于10，矩形检测，返回Core.GameObject数组
                let boxResult = utils.boxOverlap(this.entity.worldTransform.position, this.currentLocation, GlobalData.Gun.checkSize, GlobalData.Gun.checkSize, DEBUG_FLAG, [this.ownerCharGuid]);
                // 射线检测结果不为0，即有碰撞对象
                for (let element of boxResult) {
                    if (element.tag == "Eye") { //TODO 打到检测
                        if (element.name == "小眼球怪物") {
                            this.hitResults.push(element as any);
                        } else if (element.parent.name == "小眼球怪物") {
                            this.hitResults.push(element.parent as any);
                        } else {
                            this.hitResults.push(element.parent.parent as any);
                        }
                        this.lifeTime = -1;
                        break;
                    }
                    if (element instanceof Character) {
                        this.hitResults.push(element as any);
                        this.lifeTime = -1;
                        break;
                    }
                }
            }
        }
        if (this.currentLocation.z <= -600) this.currentLocation.z = -600;
        // 更新弹药实体位置，弹药生命-=当前帧时间，返回弹药生命<0的Boolean值
        this.entity.worldTransform.position = this.currentLocation;
        this.lifeTime -= dt;
        if (this.lifeTime <= 0) {//延时回收
            return true
        }
        return this.lifeTime <= 0;
    }

    // 销毁弹药方法，对象池回收弹药实体
    public destroy(): void {
        if (!this.entity) return;

        if (this.entity instanceof Effect) {
            (this.entity as Effect).stop();
        }
        GameObjPool.despawn(this.entity);
        this.entity = null;
        this.hitResults.length = 0;
    }

}
