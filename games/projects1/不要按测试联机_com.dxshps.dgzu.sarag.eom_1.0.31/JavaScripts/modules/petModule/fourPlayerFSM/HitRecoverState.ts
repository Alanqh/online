import { oTrace } from "odin";
import { GameConfig } from "../../../config/GameConfig";
import { IHitRecoverElement } from "../../../config/HitRecover";
import { BaseState } from "../../../fsm/StateMachine";
import GameComUtils from "../../../utils/GameComUtils";
import { FourPlayerState } from "./FourPlayerFSM";
import { PropModuleC } from "../../propModule/PropModuleC";

/**
 * 受击硬直
 */
export class HitRecoverState extends BaseState {
    private hitRecoverConfig: IHitRecoverElement = null;

    private timer: number = 0;
    public beGod: Action1<boolean> = new Action1<boolean>();
    init(cfgId: number): void {
        // let petConfig = GameConfig.Pet.getElement(cfgId);

    }


    enter(hitRecoverConfigId: number, dir: Vector): void {
        oTrace('guan log 进入受击硬直状态', hitRecoverConfigId, dir);
        ModuleService.getModule(PropModuleC).breakProp();
        this.owner.movementEnabled = false;
        this.owner.jumpEnabled = false;
        this.hitRecoverConfig = GameConfig.HitRecover.getElement(hitRecoverConfigId);
        this.timer = TimeUtil.elapsedTime() + this.hitRecoverConfig.Timer;

        this.fsm.toPlayAnim(FourPlayerState.HitRecoverState, true, this.hitRecoverConfig.AniGuid, this.hitRecoverConfig.AniRate, 999999);

        if (this.hitRecoverConfig.IsGod) {
            // 不受其他影响
            this.beGod.call(true);
        }

        if (this.hitRecoverConfig.IsFly) {
            this.owner.switchToFlying();
        }

        if (this.hitRecoverConfig.Impulse > 0) {
            this.owner.addImpulse(dir.normalize().multiply(this.hitRecoverConfig.Impulse), true);
        }

        if (this.hitRecoverConfig.StartEffectID > 0) {
            this.fsm.toPlayEffect(FourPlayerState.HitRecoverState, this.hitRecoverConfig.StartEffectID);
        }
        if (this.hitRecoverConfig.TotalEffectID > 0) {
            this.fsm.toPlayEffect(FourPlayerState.HitRecoverState, this.hitRecoverConfig.TotalEffectID);
        }
        if (this.hitRecoverConfig.SoundId > 0) {
            GameComUtils.play3DSoundByCfg(this.hitRecoverConfig.SoundId, this.owner);
        }
    }
    update(dt: number): void {
        if (TimeUtil.elapsedTime() <= this.timer) {
            return;
        }
        this.fsm.changeState(FourPlayerState.IdleState);
    }
    exit(): void {
        console.log('guan log 受击硬直结束 exit');
        if (this.hitRecoverConfig.IsGod) {
            // 不受其他影响
            this.beGod.call(false);
        }

        if (this.hitRecoverConfig.IsFly) {
            this.owner.switchToWalking();
        }

        if (this.hitRecoverConfig.TotalEffectID > 0) {
            this.fsm.toStopEffect(FourPlayerState.HitRecoverState, this.hitRecoverConfig.TotalEffectID);
        }

        if (this.hitRecoverConfig.EndEffectID > 0) {
            this.fsm.toPlayEffect(FourPlayerState.HitRecoverState, this.hitRecoverConfig.EndEffectID);
        }
        this.owner.movementEnabled = true;
        this.owner.jumpEnabled = true;
    }
}