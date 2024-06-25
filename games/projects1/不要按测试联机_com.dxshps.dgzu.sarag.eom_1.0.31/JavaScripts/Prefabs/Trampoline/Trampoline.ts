/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-16 21:30:52
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-12-10 16:41:20
 * @FilePath     : \petparty\JavaScripts\Prefabs\Trampoline\Trampoline.ts
 * @Description  : 修改描述
 */

import { IElasticityElement } from "../../config/Elasticity";
import { GameConfig } from "../../config/GameConfig";
import { PetModuleC } from "../../modules/petModule/PetModuleC";
import { FourPlayerState } from "../../modules/petModule/fourPlayerFSM/FourPlayerFSM";

@Component
export default class Trampoline extends Script {
    private player: mw.Player;
    private curTween: Tween<{ time: number }>
    private baseScale: mw.Vector;
    private isCheck: boolean = false;
    private dataInfo: IElasticityElement;
    @mw.Property({ displayName: "弹力大小(记得挂在触发器上,蹦床仅限单端)" })
    private power: number = 0;
    @mw.Property({ displayName: "配置表id" })
    private configId: number = 0;
    @mw.Property({ displayName: "蹦床表现物体", capture: true })
    private trampolineId: string = "";
    private trampolineObj: GameObject = null;
    private checkMap: Map<Character, boolean> = new Map();
    /**有可能出现特效挂在物体身上然后物体没了的问题，所以需要记录一下然后删掉 */
    private effectId: number;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart() {
        if (SystemUtil.isServer()) {
            return;
        }
        this.player = await mw.Player.asyncGetLocalPlayer();
        await this.gameObject.asyncReady();
        this.dataInfo = GameConfig.Elasticity.getElement(this.configId);
        this.trampolineObj = await GameObject.asyncFindGameObjectById(this.trampolineId);
        if (this.trampolineObj) {
            await this.trampolineObj.asyncReady();
            this.baseScale = this.trampolineObj.worldTransform.scale;
        }
        if (this.gameObject instanceof mw.Trigger) {
            this.gameObject.onEnter.add((obj: GameObject) => {
                this.firstCheck(obj);
            })
        }
    }

    private firstCheck(obj: GameObject) {
        /**仅对自身以及npc生效 */
        if ((obj instanceof Character && !obj.player) || (obj instanceof Character && obj == this.player.character) && this.dataInfo) {
            this.secondCheck(obj);
        }
    }

    private async secondCheck(obj) {
        if (this.checkMap.has(obj)) {
            return;
        }
        this.checkMap.set(obj, true);
        let checkTime: number = Math.min(this.dataInfo.ElasticityTime, this.dataInfo.ImpulseTime);
        await TimeUtil.delaySecond(checkTime);
        if (!this.gameObject || (this.gameObject instanceof Trigger) == false || !obj) {
            return;
        }
        let trigger = this.gameObject as Trigger;
        if (trigger.checkInArea(obj)) {
            this.active(obj);
        }
        this.checkMap.delete(obj);
    }

    private active(obj: Character) {
        let checkTime = Math.min(this.dataInfo.ElasticityTime, this.dataInfo.ImpulseTime);
        let delayTime = this.dataInfo.ElasticityTime - checkTime;
        if (delayTime > 0) {
            setTimeout(() => {
                this.playerTween();
            }, (delayTime) * 1000);
        }
        else {
            this.playerTween();
        }
        delayTime = this.dataInfo.ImpulseTime - checkTime;
        if (delayTime > 0) {
            setTimeout(() => {
                this.addImpluse(obj);
            }, delayTime * 1000);
        }
        else {
            this.addImpluse(obj);
        }
        setTimeout(() => {
            this.playEffect();

        }, this.dataInfo.EffectTime * 1000);
        if (obj.player) {
            setTimeout(() => {
                SoundService.playSound(this.dataInfo.VoiceGuid, 1, this.dataInfo.Volume);
            }, this.dataInfo.VoiceTime * 1000);
        }
    }

    private addImpluse(obj: Character) {
        let nowState = ModuleService.getModule(PetModuleC).getState();
        if (nowState == FourPlayerState.FlyState || nowState == FourPlayerState.FallState) {
            ModuleService.getModule(PetModuleC).changeState(false, FourPlayerState.IdleState);
        }
        let up = this.gameObject.worldTransform.getUpVector().normalized;
        let dirSpeed = obj.velocity.multiply(up);
        let subImpluse = dirSpeed.length;
        if (Vector.dot(up, dirSpeed.normalized) == 1) {
            subImpluse = -subImpluse
        }

        let impluse = up.multiply(this.power + subImpluse);
        obj.addImpulse(impluse, true);

    }

    private playerTween() {
        let dataInfo = GameConfig.Elasticity.getElement(this.configId);
        if (!this.trampolineObj) {
            return;
        }
        if (!this.curTween) {
            this.curTween = new mw.Tween({ time: 0 })
                .to({ time: 1 }, dataInfo.RockTime * 1000)
                .onUpdate((obj) => {
                    let z = this.shakeFunc(obj.time, dataInfo.Speed, dataInfo.Frequency, dataInfo.Amplitude) * dataInfo.RockScale;
                    let basicSide = this.baseScale.x
                    let side = Math.pow(this.baseScale.x * this.baseScale.y * this.baseScale.z / (this.baseScale.z + z), 0.5)
                    let worldScale = new mw.Vector(basicSide + (side - basicSide) * dataInfo.ScaleMultXY, basicSide + (side - basicSide) * dataInfo.ScaleMultXY, this.baseScale.z + z);
                    this.trampolineObj.worldTransform.scale = worldScale;
                })
        }
        this.curTween.start();
    }

    private async playEffect() {
        if (!this.dataInfo || StringUtil.isEmpty(this.dataInfo.EffectGuid)) {
            return;
        }
        if (this.effectId) {
            EffectService.stop(this.effectId);
        }
        this.effectId = EffectService.playOnGameObject(this.dataInfo.EffectGuid, this.gameObject, {
            loopCount: 1,
            position: this.dataInfo.EffectPos,
            rotation: new Rotation(this.dataInfo.EffectRot),
            scale: this.dataInfo.EffectScale,
        });
        if (!StringUtil.isEmpty(this.dataInfo.EffectColor)) {
            let effectObj = await EffectService.getEffectById(this.effectId);
            if (!effectObj) {
                return;
            }
            effectObj.forceStop();
            effectObj.setColor("Color", (LinearColor.colorHexToLinearColor(this.dataInfo.EffectColor)));
            effectObj.loopCount = 1;
            effectObj.play();

        }
    }

    /**
 * 震荡函数
 * @param x 
 * @param speed 震荡衰减/增益的速度
 * @param frequency 震荡的频率
 * @param amplitude 震荡的幅度
 * @returns 
 */
    shakeFunc(x: number, speed: number, frequency: number, amplitude: number) {
        return (Math.pow(speed, -x) * Math.sin(2 * frequency * Math.PI * x)) / amplitude;
    }

    protected onDestroy(): void {
        if (this.effectId) {
            EffectService.stop(this.effectId);
        }
        if (this.curTween) {
            this.curTween.stop();
        }
    }
}