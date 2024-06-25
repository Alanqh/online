import { GameConfig } from "../../../config/GameConfig";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { BaseState } from "../../../fsm/StateMachine";
import { FourPlayerState } from "./FourPlayerFSM";


export class IdleState extends BaseState {
    private aniConfig: IPetAnimationElement;
    init(cfgId: number): void {
        let petConfig = GameConfig.Pet.getElement(cfgId);
        this.aniConfig = GameConfig.PetAnimation.getElement(petConfig.animationSet);
    }
    enter(...param: any[]): void {
        if (this.aniConfig) {
            this.fsm.toPlayAnim(FourPlayerState.IdleState, true, this.aniConfig.IdleGuid, this.aniConfig.IdleRate, 999999);
        }
        this.resetState();
    }

    private resetState() {
        this.owner.movementEnabled = true;
        this.owner.jumpEnabled = true;
        // this.owner.maxWalkSpeed = GameConfig.PetStat.getElement(10001).Value;
        this.owner.maxJumpHeight = GameConfig.PetStat.getElement(10002).Value;
        this.owner.rotateRate = GameConfig.PetStat.getElement(10003).Value;

        // this.owner.maxWalkSpeed = 2000;
        // this.owner.maxJumpHeight = 1000;

    }
    update(dt: number): void {
        if (this.owner.isMoving) {
            this.fsm.changeState(FourPlayerState.RunState);
        }
    }
    exit(...param: any[]): void {
        if (this.aniConfig) {
            this.fsm.toPlayAnim(FourPlayerState.IdleState, false, this.aniConfig.IdleGuid);
        }
    }

}
