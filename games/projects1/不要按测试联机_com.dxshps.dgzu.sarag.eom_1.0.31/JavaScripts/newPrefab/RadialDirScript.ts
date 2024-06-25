/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-02-02 18:50:55
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-12-10 16:36:13
 * @FilePath     : \petparty\JavaScripts\newPrefab\RadialDirScript.ts
 * @Description  : 立方体径向力，始终不会向下
 */

import { GameConfig } from "../config/GameConfig";
import GameComUtils from "../utils/GameComUtils";

@Component
export default class RadialDirScript extends mw.Script {
    @mw.Property({ displayName: "径向力大小——地面" })
    public _force: number = 1000;
    @mw.Property({ displayName: "径向力大小——空中" })
    public _forceAir: number = 1000;
    @mw.Property({ displayName: "是否需要显示受到攻击方向" })
    public _needShowDir: boolean = false;

    @mw.Property({ displayName: "纵向角度固定" })
    public _useUpAngle: boolean = true;
    @mw.Property({ displayName: "纵向角度大小", tooltip: "大于0朝上，小于0朝下" })
    public _upAngle: number = 10;

    @mw.Property({ displayName: "生效间隔时间", tooltip: "冷却时间（毫秒）" })
    public cdTime: number = 200;
    @mw.Property({ displayName: "向上的额外冲量,当最终计算方向水平的时候会额外加上这个力" })
    public _addUpForce: number = 0;


    @mw.Property({ displayName: "gearId" })
    public _gearId: number = 1;

    private _forceDir: mw.Vector;
    private _character: mw.Character;
    private _cdTime: number = 0;
    private _triggerTime: number = 0;
    private effectId: number;

    // private other: mw.GameObject;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        if (this.isRunningClient()) {
            this._character = (await mw.Player.asyncGetLocalPlayer()).character;

            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
                if (other instanceof mw.Character && other == this._character) {
                    if (this._cdTime >= Date.now()) {
                        return;
                    }
                    this.playEffect(other);
                    this.playVolume(other);
                    this._forceDir = this.getDirection(this.gameObject.worldTransform.position, other.worldTransform.position, this.getAddPower(other), this._upAngle, this._useUpAngle);
                    Event.dispatchToLocal("GEAR_AddPower", other.gameObjectId, this.getAddPower(other), this._gearId);
                    // this._character.moveEnable = false;
                    this._triggerTime = 0.1;
                    this._cdTime = Date.now() + this.cdTime + 100;
                    this.useUpdate = true;
                }
                else if (other instanceof mw.Character && !other.player) {
                    let downForce = other.velocity;
                    if (!downForce) return;
                    const forceDir = this.getDirection(this.gameObject.worldTransform.position, other.worldTransform.position, this.getAddPower(other), this._upAngle, this._useUpAngle);
                    forceDir.z -= downForce.z;
                    Event.dispatchToLocal("Npc.Impluse", other, forceDir);
                    this.playEffect(other);
                    this.playVolume(other);
                }

            });

        }
        else {
            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
                /**服务器的碰撞只对玩家生效 */
                if (other instanceof Character && other.player && this._cdTime < Date.now()) {
                    this.playEffect(other);
                    this.playVolume(other);
                    this._forceDir = this.getDirection(this.gameObject.worldTransform.position, other.worldTransform.position, this.getAddPower(other), this._upAngle, this._useUpAngle);
                    other.addImpulse(this._forceDir, true);
                }
            });
        }
    }

    private async playEffect(char: Character) {
        let dataInfo = GameConfig.Gear.getElement(this._gearId);
        if (!dataInfo || StringUtil.isEmpty(dataInfo.EffectID)) {
            return;
        }
        if (this.effectId) {
            EffectService.stop(this.effectId);
        }
        let loopCount = 0;
        let duration = 0;
        if (dataInfo.EffectTime >= 0) {
            loopCount = dataInfo.EffectTime;
        }
        else {
            duration = Math.abs(dataInfo.EffectTime);
        }
        this.effectId = EffectService.playAtPosition(dataInfo.EffectID, char.worldTransform.position.clone().add(dataInfo.EffectLocation), {
            loopCount: loopCount,
            duration: duration,
            rotation: new Rotation(dataInfo.EffectRotate),
            scale: dataInfo.EffectLarge,
        });
        if (!StringUtil.isEmpty(dataInfo.ColorValue)) {
            let effectObj = await EffectService.getEffectById(this.effectId);
            if (!effectObj) {
                return;
            }
            effectObj.forceStop();
            effectObj.setColor("Color", (LinearColor.colorHexToLinearColor(dataInfo.ColorValue)));
            effectObj.loopCount = loopCount;
            effectObj.play();
        }

    }

    private playVolume(obj: GameObject) {
        let dataInfo = GameConfig.Gear.getElement(this._gearId);
        if (!dataInfo || !dataInfo.SoundId) {
            return;
        }
        GameComUtils.play3DSoundByCfg(dataInfo.SoundId, obj.worldTransform.position);
    }

    private getAddPower(char: Character) {
        if (char.isJumping) {
            return this._forceAir;
        }
        return this._force;
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this._cdTime < Date.now()) {
            // this._character.moveEnable = true;
            this.useUpdate = false;

        }
        if (this._triggerTime > 0) {
            this._triggerTime -= dt;
            if (this._triggerTime > 0) {
                return;
            }
            this._character.addImpulse(this._forceDir, true);
            if (!this._needShowDir) {
                return;
            }
            let endPos = this._character.worldTransform.position.clone().add(this._forceDir.normalized.multiply(400));
            QueryUtil.lineTrace(this._character.worldTransform.position, endPos, true, true);
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
            if (Vector.dot(to, Vector.up) == 0 && this._character && !this._character.isJumping) {
                to.add(new Vector(0, 0, this._addUpForce));
            }
            return to;
        }
        return Vector.zero;
    }

    protected onDestroy(): void {
        if (this.effectId) {
            EffectService.stop(this.effectId);
        }
    }
}
