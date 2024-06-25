/** 
* @Author       : yuanqi.bai
* @Date         : 2023-02-02 18:50:55
* @LastEditors  : yuanqi.bai
* @LastEditTime : 2023-06-30 18:06:43
* @FilePath     : \stumbleguys\JavaScripts\newPrefab\RadialDirScript.ts
* @Description  : 立方体径向力，始终不会向下
*/

import { Utils } from "../tool/Utils";

@Component
export default class RadialDirScript extends mw.Script {
    @mw.Property({ displayName: "径向力大小" })
    public _force: number = 1000;

    @mw.Property({ displayName: "纵向角度固定" })
    public _useUpAngle: boolean = true;
    @mw.Property({ displayName: "纵向角度大小", tooltip: "大于0朝上，小于0朝下" })
    public _upAngle: number = 10;

    @mw.Property({ displayName: "生效间隔时间", tooltip: "冷却时间（毫秒）" })
    public cdTime: number = 200;


    @mw.Property({ displayName: "gearId" })
    public _gearId: number = 1;

    private _forceDir: mw.Vector;
    private _character: Character;
    private _cdTime: number = 0;
    private _triggerTime: number = 0;

    // private other: mw.GameObject;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        if (this.isRunningClient()) {
            this._character = (await Player.asyncGetLocalPlayer()).character;

            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
                if (other instanceof Character) {
                    if (other == this._character) {
                        if (this._cdTime < Date.now()) {
                            Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);
                            this._forceDir = this.getDirection(this.gameObject.worldTransform.position, other.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                            // this._character.movementEnabled = false;
                            this._triggerTime = 0.1;
                            this._cdTime = Date.now() + this.cdTime + 100;
                            this.useUpdate = true;
                        }
                    } else if (!other.player) {
                        let downForce = other.velocity;
                        if (!downForce) return;
                        const forceDir = this.getDirection(this.gameObject.worldTransform.position, other.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                        forceDir.z -= downForce.z;
                        Event.dispatchToLocal("Npc.Impluse", other, forceDir);
                    }
                    Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);
                }
            });

        } else {
            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
                if (other instanceof Character && Utils.isNpc(other) && this._cdTime < Date.now()) {
                    Event.dispatchToLocal("GEAR_EFF_BY_CFG", other.gameObjectId, this._gearId, other.worldTransform.position);

                    this._forceDir = this.getDirection(this.gameObject.worldTransform.position, other.worldTransform.position, this._force, this._upAngle, this._useUpAngle);
                    other.addImpulse(this._forceDir, true);
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
    /**
     * 返回力的方向（始终不会朝下）
     * @param from 
     * @param to 
     * @param scale 
     */
    private getDirection(from: mw.Vector, to: mw.Vector, scale: number = 1, offAngle: number, useOffAngle: boolean): mw.Vector {
        if (to) {

            if (useOffAngle) {
                if (to.z < from.z) to.z = from.z + mw.Vector.distance(from, to) * Math.sin(offAngle * Math.PI / 180);
            }
            to.subtract(from);
            to.normalize();
            to.multiply(scale);
            return to;
        }
        return Vector.zero;
    }

}
