
/** 
* @Author       : yuanqi.bai
* @Date         : 2023-02-02 18:50:55
* @LastEditors  : yuanqi.bai
* @LastEditTime : 2023-07-21 09:27:30
* @FilePath     : \stumbleguys\JavaScripts\newPrefab\TangentialScript.ts
* @Description  : 切向力
*/
@Component
export default class TangentialScript extends mw.Script {
    @mw.Property({ displayName: "切向力大小" })
    public _force: number = 1000;
    @mw.Property({ displayName: "纵向角度固定" })
    public _useUpAngle: boolean = true;
    @mw.Property({ displayName: "纵向角度大小", tooltip: "大于0朝上，小于0朝下" })
    public _upAngle: number = 10;
    @mw.Property({ displayName: "生效间隔时间", tooltip: "冷却时间（毫秒）" })
    public cdTime: number = 200;
    @mw.Property({ displayName: "gearId" })
    public _gearId: number = 1;


    private _forceTimer: number = 0;
    private _forceDir: mw.Vector;
    private _character: Character;
    private _cdTime: number = 0;
    private _triggerTime: number = 0;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        if (this.isRunningClient()) {
            this._character = (await Player.asyncGetLocalPlayer()).character;

            const trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add((other: mw.GameObject) => {
                if (other instanceof Character) {
                    if (other == this._character) {
                        if (this._cdTime < Date.now()) {
                            Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);
                            this._forceDir = this.getTangentialVector(this.gameObject.worldTransform.getForwardVector(), other.worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                            this._triggerTime = 0.1;
                            this._cdTime = Date.now() + this.cdTime + 100;
                            this.useUpdate = true;
                            setTimeout(() => {
                                if (trigger.checkInArea(this._character)) {
                                    this._character.addImpulse(this._forceDir, true);
                                }
                            }, 150);
                        }
                    } else {
                        if (!other.player) {
                            let downForce = other.velocity;
                            if (!downForce) return;
                            const forceDir = this.getTangentialVector(this.gameObject.worldTransform.getForwardVector(), other.worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                            Event.dispatchToLocal("Npc.OnHit", other, this._gearId);
                            setTimeout(() => {
                                Event.dispatchToLocal("Npc.Impluse", other, forceDir);
                            }, 150);

                            Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);
                        }
                        if (other[`GUIDEAI`]) {
                            Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);
                            this._forceDir = this.getTangentialVector(this.gameObject.worldTransform.getForwardVector(), other.worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                            other.addImpulse(this._forceDir, true);
                        }
                    }
                }
            });

        }
        else {
            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
                if (other instanceof Character && !other.player && this._cdTime < Date.now()) {
                    Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);

                    this._forceDir = this.getTangentialVector(this.gameObject.worldTransform.getForwardVector(), other.worldTransform.position, this.gameObject.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                    (other as Character).addImpulse(this._forceDir, true);
                }
            });
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
            this.useUpdate = false;

        }
        if (this._triggerTime > 0) {
            this._triggerTime -= dt;
            if (this._triggerTime <= 0)
                this._character.addImpulse(this._forceDir, true);
        }
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
        if (point) {
            point.subtract(dirWPos).normalize();
            let angleAB: number = mw.Vector.dot(point, dirVec);
            let angleBB: number = mw.Vector.dot(dirVec, dirVec);
            dirVec.multiply(angleAB / angleBB);
            point.subtract(dirVec).normalize();
            point = this.getDisUpDirection(point, fixUpAngle, usefixUpAngle)
            point.multiply(scale);
            return point;
        }
        return Vector.zero;
    }
    private getDisUpDirection(point: mw.Vector, fixUpAngle: number, usefixUpAngle: boolean) {
        if (usefixUpAngle) {
            let rotate: mw.Rotation = point.toRotation();
            rotate.y = fixUpAngle;
            rotate.getForce(point);
            return point;
        }
        return point;
    }

}
