import { PlayerParam } from "../../../playerCtrl/PlayerParam";

/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-02-02 18:50:55
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-23 16:47:12
 * @FilePath     : \stumbleguys_new\JavaScripts\Prefabs\弹力地板\Script\TangentialScript.ts
 * @Description  : 弹力地板
 */
const CdTimes: WeakMap<Character, number> = new WeakMap();
@Component
export default class TangentialScript extends mw.Script {
    @mw.Property({ displayName: "切向力大小" })
    private _force: number = 1500;
    @mw.Property({ displayName: "纵向角度固定" })
    private _useUpAngle: boolean = true;
    @mw.Property({ displayName: "纵向角度大小", tooltip: "大于0朝上，小于0朝下" })
    private _upAngle: number = 90;
    @mw.Property({ displayName: "生效间隔时间", tooltip: "冷却时间（毫秒）" })
    private cdTime: number = 200;
    @mw.Property({ displayName: "缩放节点" })
    private tweenGuid: string = "";
    @mw.Property({ displayName: "X缩放" })
    private scaleX: number = 1.2;
    @mw.Property({ displayName: "Y缩放" })
    private scaleY: number = 1.2;
    @mw.Property({ displayName: "Z缩放" })
    private scaleZ: number = 0.2;
    @mw.Property({ displayName: "缩放时间", tooltip: "毫秒" })
    private scaleTime: number = 100;
    @mw.Property({ displayName: "gearId" })
    public _gearId: number = 9;

    // private _forceTimer: number = 0;
    // private _forceDir: mw.Vector;
    private _character: Character;
    private _cdTime: number = 0;
    // private _triggerTime: number = 0;
    private _pingpong: mw.Tween<{
        x: number, y: number, z: number
    }>;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        this._cdTime = 0;
        if (this.isRunningClient()) {
            let tweenNode: mw.GameObject;
            if (this.tweenGuid) {
                tweenNode = await this.findGO(this.tweenGuid);
            }

            this._character = (await Player.asyncGetLocalPlayer()).character;

            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {

                if (other instanceof Character) {
                    Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);
                    const isIncd = CdTimes.get(other) ? CdTimes.get(other) < Date.now() : true;
                    if (isIncd) {
                        CdTimes.set(other, Date.now() + this.cdTime)
                        if (!other.player) {
                            const forceDir = this.getTangentialVector(this.gameObject.worldTransform.getForwardVector(), other.worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                            forceDir.z -= other.velocity.z;
                            other.gravityScale = PlayerParam.gravityScale;
                            Event.dispatchToLocal("Npc.Impluse", other, forceDir);
                        } else if (other == this._character) {
                            const forceDir = this.getTangentialVector(this.gameObject.worldTransform.getForwardVector(), (other as Character).worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                            forceDir.z -= this._character.velocity.z;
                            this._character.addImpulse(forceDir, true);
                        }
                    }
                }
                // if (other == this._character && this._cdTime < Date.now()) {
                //     this._forceDir = this.getTangentialVector(this.gameObject.getForwardVector(), other.worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);

                //     this._triggerTime = 0.05;
                //     this._cdTime = Date.now() + this.cdTime + 100;
                //     this.useUpdate = true;
                // }
                if (this._pingpong && !this._pingpong.isPlaying()) {
                    this._pingpong.start();
                }
            });

            if (tweenNode) {
                let scale = tweenNode.localTransform.scale;
                this._pingpong = new mw.Tween({ x: scale.x, y: scale.y, z: scale.z }).to({ x: this.scaleX, y: this.scaleY, z: this.scaleZ }, this.scaleTime).onUpdate((v) => {
                    scale.set(v.x, v.y, v.z);
                    tweenNode.localTransform.scale = scale;
                }).repeat(1).yoyo(true).easing(TweenUtil.Easing.Bounce.Out);

            }
        } else {
            // (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
            //     if (PlayerManagerExtesion.isNpc(other)) {
            //         const isIncd = CdTimes.get(other) ? CdTimes.get(other) < Date.now() : true;
            //         if (isIncd) {
            //             Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.guid, this._gearId, other.worldTransform.position);
            //             CdTimes.set(other, Date.now() + this.cdTime)
            //             // let downForce = other.velocity;
            //             this._forceDir = this.getTangentialVector(this.gameObject.getForwardVector(), other.worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);

            //             setTimeout(() => {
            //                 other.addImpulse(this._forceDir, true);
            //             }, 100);


            //         }
            //     }
            // });
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this._cdTime < Date.now()) {
            // this._character.movementEnabled = true;
            // this._character.jumpEnabled = true;

            this.useUpdate = false;

        }
        // if (this._triggerTime > 0) {
        //     this._triggerTime -= dt;
        //     if (this._triggerTime <= 0)
        //         this._character.addImpulse(this._forceDir, true);
        // }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
    /**
     * 提供一个切向力(通过单位向量近似的计算)
     * @param dirVec 触发器前向量
     * @param point 
     * @param outer 
     * @param scale 
     * @returns 
     */
    private getTangentialVector(dirVec: mw.Vector, point: mw.Vector, dirWPos: mw.Vector, scale: number, fixUpAngle: number, usefixUpAngle: boolean): mw.Vector {
        // if (usefixUpAngle) {
        //     if (point.z < dirWPos.z) point.z = dirWPos.z + mw.Vector.distance(dirWPos, point) * Math.sin(fixUpAngle * Math.PI / 180);
        // }
        if (point) {

            point.subtract(dirWPos).normalize();
            let angleAB: number = mw.Vector.dot(point, dirVec);
            let angleBB: number = mw.Vector.dot(dirVec, dirVec);
            dirVec.multiply(angleAB / angleBB);
            point.subtract(dirVec).normalize();
            point = this.getDisUpDirection(point, fixUpAngle, usefixUpAngle)
            point.multiply(scale);
            return point;
        } return Vector.zero;
    }
    getDisUpDirection(point: mw.Vector, fixUpAngle: number, usefixUpAngle: boolean) {
        if (usefixUpAngle) {
            let rotate = point.toRotation();
            rotate.y = fixUpAngle;
            rotate.getForce(point);
            return point;
        }
        return point;
    }
    findGO(guid: string): Promise<mw.GameObject> {

        return new Promise((res, rej) => {
            let finder = setInterval(() => {
                let go = GameObject.findGameObjectById(guid);
                if (go) {
                    res(go);
                    clearInterval(finder);
                }
            }, 500);
        });
    }

}
