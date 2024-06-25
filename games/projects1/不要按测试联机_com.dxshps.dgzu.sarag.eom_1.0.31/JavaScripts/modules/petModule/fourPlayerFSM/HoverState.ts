import { GameConfig } from "../../../config/GameConfig";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { BaseState } from "../../../fsm/StateMachine";
import { FourPlayerState } from "./FourPlayerFSM";

enum Hover {
    Jump = 0,
    Up = 1,
    Down = 2,
}

export class HoverState extends BaseState {
    private jumpAnim: mw.Animation;

    private aniConfig: IPetAnimationElement;
    private time: number = 0;
    private setTime: any = null;
    private hoverType: Hover = Hover.Jump;
    private needCheck: boolean = false;


    init(cfgId: number) {
        let petConfig = GameConfig.Pet.getElement(cfgId);
        this.aniConfig = GameConfig.PetAnimation.getElement(petConfig.animationSet);

        this.jumpAnim = this.owner.loadAnimation(this.aniConfig.JumpGuid);
        this.time = Math.ceil((this.jumpAnim.length / this.aniConfig.JumpRate) * 100) / 100;
    }
    enter(...param: any): void {
        this.needCheck = false;
        let needJump = param[0];
        this.hoverType = Hover.Jump;
        if (needJump) {
            this.fsm.toPlayAnim(FourPlayerState.HoverState, true, this.aniConfig.JumpGuid, this.aniConfig.JumpRate, 1);
            this.setTime = setTimeout(() => {
                this.setTime = null;
                this.needCheck = true;
            }, this.time * 1000);
        } else {
            this.needCheck = true;
        }
    }
    update(dt: number): void {
        if (!this.owner.isJumping) {
            this.fsm.changeState(FourPlayerState.IdleState);
            return;
        }
        if (this.needCheck) {
            if (this.owner.velocity.z > 0 && this.hoverType != Hover.Up) {//up
                this.hoverType = Hover.Up;
                this.fsm.toPlayAnim(FourPlayerState.HoverState, true, this.aniConfig.HoverUpGuid, this.aniConfig.HoveUpRate, 99999);
            } else if (this.owner.velocity.z < 0 && this.hoverType != Hover.Down) {//down
                this.hoverType = Hover.Down;
                this.fsm.toPlayAnim(FourPlayerState.HoverState, true, this.aniConfig.HoverDownGuid, this.aniConfig.HoveDownRate, 99999);
            }
        }

    }
    exit(): void {
        if (this.setTime) {
            clearTimeout(this.setTime);
            this.setTime = null;
        }
        switch (this.hoverType) {
            case Hover.Jump:
                this.fsm.toPlayAnim(FourPlayerState.HoverState, false, this.aniConfig.JumpGuid);
                break;
            case Hover.Up:
                this.fsm.toPlayAnim(FourPlayerState.HoverState, false, this.aniConfig.HoverUpGuid);
                break;
            case Hover.Down:
                this.fsm.toPlayAnim(FourPlayerState.HoverState, false, this.aniConfig.HoverDownGuid);
                break;
        }
    }
}
