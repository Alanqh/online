import { GameConfig } from "../../../config/GameConfig";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { BaseState } from "../../../fsm/StateMachine";
import { FourPlayerState } from "./FourPlayerFSM";

//平地摔状态
export class FallState extends BaseState {
    private aniConfig: IPetAnimationElement;
    private awaitTime: any;
    private time: number = GameConfig.PetStat.getElement(20006).Value;//摔倒时间
    init(cfgId: number) {
        let petConfig = GameConfig.Pet.getElement(cfgId);
        this.aniConfig = GameConfig.PetAnimation.getElement(petConfig.animationSet);
    }

    enter(...param: any): void {
        this.owner.movementEnabled = false;
        this.owner.jumpEnabled = false;
        this.fsm.toPlayAnim(FourPlayerState.FallState, true, this.aniConfig.FallGuid, this.aniConfig.FallRate, 1);
        this.awaitTime = setTimeout(() => {
            this.fsm.changeState(FourPlayerState.IdleState);
        }, this.time * 1000);
    }
    update(dt: number): void {

    }
    exit(): void {
        clearTimeout(this.awaitTime);
        this.owner.movementEnabled = true;
        this.owner.jumpEnabled = true;
        this.fsm.toPlayAnim(FourPlayerState.FallState, false, this.aniConfig.FallGuid);
    }
}