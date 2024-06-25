import { GameConfig } from "../../config/GameConfig";
import GameComUtils from "../../utils/GameComUtils";

@Component
export default class MoveBoard extends Script {
    @mw.Property({ displayName: "是否为客户端" })
    public isClient: boolean = true;
    @mw.Property({ displayName: "径向力大小——地面(力量为负数就是反方向)" })
    public _force: number = 1000;
    @mw.Property({ displayName: "径向力大小——空中" })
    public _forceAir: number = 1000;
    @mw.Property({ displayName: "运动方式", selectOptions: { "世界轴向": "0", "本地轴向": "1" } })
    private moveType: string = "0";
    @mw.Property({ displayName: "往那个方向打", selectOptions: { "x轴": "0", "y轴": "1", "z轴": "2" } })
    private direction: string = "0";
    @mw.Property({ displayName: "生效间隔时间", tooltip: "冷却时间（毫秒）" })
    public cdTime: number = 200;
    @mw.Property({ displayName: "方向永远不会朝下？" })
    public justUp: boolean = false;
    @mw.Property({ displayName: "向上的额外冲量,当最终计算方向水平的时候会额外加上这个力" })
    public _addUpForce: number = 0;
    @mw.Property({ displayName: "gearId" })
    public _gearId: number = 1;


    private _character: Character;
    private _cdTime: number = 0;
    private _forceDir: mw.Vector;
    private _triggerTime: number = 0;
    private effectId: number;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart() {
        if (this.isClient && SystemUtil.isClient()) {
            this._character = (await mw.Player.asyncGetLocalPlayer()).character;
            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
                if (other instanceof mw.Character && other == this._character) {
                    if (this._cdTime >= Date.now()) {
                        return;
                    }
                    this._forceDir = this.getDirection(other);
                    Event.dispatchToLocal("GEAR_AddPower", other.gameObjectId, this.getAddPower(other), this._gearId);
                    this.playEffect(other);
                    this.playVolume(other);
                    this._triggerTime = 0.1;
                    this._cdTime = Date.now() + this.cdTime + 100;
                    this.useUpdate = true;
                }
                else if (other instanceof mw.Character && !other.player) {
                    let downForce = other.velocity;
                    if (!downForce) return;
                    const forceDir = this.getDirection(other);
                    Event.dispatchToLocal("Npc.Impluse", other, forceDir);
                    this.playEffect(other);
                    this.playVolume(other);
                }

            });
        }
    }

    private getAddPower(char: Character) {
        if (char.isJumping) {
            return this._forceAir;
        }
        return this._force;
    }

    private getDirection(char: Character) {
        let power = this._force;
        if (char.isJumping) {
            power = this._forceAir;
        }
        let res: Vector;
        if (this.moveType == "0" && this.direction == "0") {
            res = new Vector(1, 0, 0);
        }
        else if (this.moveType == "0" && this.direction == "1") {
            res = new Vector(0, 1, 0);
        }
        else if (this.moveType == "0" && this.direction == "2") {
            res = new Vector(0, 0, 1);
        }
        else if (this.moveType == "1" && this.direction == "0") {
            res = this.gameObject.worldTransform.getForwardVector();
        }
        else if (this.moveType == "1" && this.direction == "1") {
            res = this.gameObject.worldTransform.getRightVector();
        }
        else if (this.moveType == "1" && this.direction == "2") {
            res = this.gameObject.worldTransform.getUpVector();
        }
        /**如果方向向下那就把z轴制空 */
        if ((this._force > 0 && Vector.dot(res, Vector.up) < 0 && this.justUp) || (this._force < 0 && Vector.dot(res, Vector.up) > 0 && this.justUp)) {
            res.z = 0;
            res = res.normalized;
        }
        res.multiply(power)
        if (Vector.dot(res, Vector.up) == 0 && this._character && !this._character.isJumping) {
            res.add(new Vector(0, 0, this._addUpForce));
        }
        return res;
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
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        if (this.effectId) {
            EffectService.stop(this.effectId);
        }
    }
}