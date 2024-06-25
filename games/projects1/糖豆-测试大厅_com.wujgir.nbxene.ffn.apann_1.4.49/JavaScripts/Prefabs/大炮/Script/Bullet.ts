/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-11-02 14:20:37
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-11-02 17:04:01
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\大炮\Script\Bullet.ts
 * @Description  : 修改描述
 */
import { GeneralManager } from '../../../Modified027Editor/ModifiedStaticAPI';
import { BulletDamage } from "./BulletDamage";
import { ICannonConfig } from "./ICannonConfig";

const tempVec = new Vector();
const tempRot = new Rotation();
export class Bullet {
    /**
     * 移动速度向量
     */
    private moveSpeed: mw.Vector;
    /**
     * 启用物理延迟
     */
    private enablePhysicsTimeout: number = 0;
    /**
     * 存在时间
     */
    private runTime: number = 0;
    /**
     * 子弹伤害对象，用于给人添加冲量
     */
    private damage: BulletDamage;
    /**
     * ue冲量对象
     */
    private ab: any;
    /**
     * ue向量缓存
     */
    private ueVec: any;
    /**
     * 
     * @param root 
     * @param data 配置 
     */
    constructor(private root: mw.Model, private data: ICannonConfig) {
        const trigger = root.getChildByName("trigger") as mw.Trigger;
        setTimeout(() => {
            Event.dispatchToAllClient("ServerBulletCreate", root.parent.gameObjectId, trigger.gameObjectId)
        }, 20000);
        this.damage = new BulletDamage(this.root, data);

        this.ab = root["actor"].K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass()).Get(0);

        if (trigger) {
            trigger.onEnter.add(gameObject => {
                if (gameObject.gameObjectId == this.root.gameObjectId) return;
                const speed = this.ab.GetPhysicsLinearVelocity();
                this.damage.onHit(gameObject, speed, this.data.gearId);
            });
        }
    }

    /**
     * 
     * @param dt 
     * @returns 是否销毁
     */
    public onUpdate(dt: number): boolean {
        if (this.enablePhysicsTimeout) {
            this.enablePhysicsTimeout--;
            if (this.enablePhysicsTimeout <= 0) {
                this.enablePhysicsTimeout = 0;
                this.ab.AddImpulse(this.ueVec);
            }
        }
        this.damage.onUpdate(dt);
        this.runTime += dt;
        if (this.runTime >= this.data.destoryTime) {
            GeneralManager.rpcPlayEffectAtLocation(this.data.destroyEffect, this.root.worldTransform.position, 1, Rotation.zero, this.data.destroyEffectScale);
            this.destroy();
            return true;
        }
        return false;
    }
    private destroy() {
        this.root.physicsEnabled = false;
        this.root.worldTransform.position = tempVec.set(0, 0, 30000);
        this.damage.onStop();
    }
    /**
     * 锚固
     */
    public anchor(anchorObject: mw.GameObject) {
        this.damage.onAnchor();
        this.root.worldTransform.position = anchorObject.worldTransform.position;
        this.root.worldTransform.rotation = anchorObject.worldTransform.rotation;
        this.root.physicsEnabled = true;
        if (!this.ueVec) {
            this.moveSpeed = this.root.worldTransform.getForwardVector().multiply(this.data.speed * 1000);
            this.ueVec = new UE.Vector(this.moveSpeed.x, this.moveSpeed.y, this.moveSpeed.z);
        }
        this.enablePhysicsTimeout = 2;
        this.runTime = 0;

    }
}
declare const UE;
