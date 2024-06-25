import { GameConfig } from "../../../config/GameConfig";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { GameEventC2C } from "../../../const/GameCommonEvent";
import { BaseState } from "../../../fsm/StateMachine";
import { PetModuleC } from "../PetModuleC";
import { PetStrengthenType } from "../PetModuleData";
import { FourPlayerState } from "./FourPlayerFSM";

export class RunState extends BaseState {
    private aniConfig: IPetAnimationElement;
    /** 强化给到的移动速度加成 */
    private addSpeed: number = 0;
    private enterAcceleration: number = 0;

    init(cfgId: number) {
        let petConfig = GameConfig.Pet.getElement(cfgId);
        this.aniConfig = GameConfig.PetAnimation.getElement(petConfig.animationSet);
    }

    enter(...param: any): void {
        const petModule = ModuleService.getModule(PetModuleC);
        if (petModule) {
            this.addSpeed = petModule.getStrengthenAttr(PetStrengthenType.MoveMaxSpeed).val;
            this.enterAcceleration = this.owner.maxAcceleration;
            this.owner.maxAcceleration += petModule.getStrengthenAttr(PetStrengthenType.MoveAccel).val;
        }
        //改变移动最大速度
        Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, this.addSpeed);
        this.fsm.toPlayAnim(FourPlayerState.RunState, true, this.aniConfig.RunGuid, this.aniConfig.RunRate, 99999)
    }
    update(dt: number): void {
        if (this.owner.isJumping) {
            this.fsm.changeState(FourPlayerState.HoverState);
        }
        if (!this.owner.isMoving) {
            this.fsm.changeState(FourPlayerState.IdleState);
        }
    }
    exit(): void {
        //改变移动最大速度
        Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, -this.addSpeed);
        if (this.enterAcceleration) {
            this.owner.maxAcceleration = this.enterAcceleration;
        }
        this.fsm.toPlayAnim(FourPlayerState.RunState, false, this.aniConfig.RunGuid);
    }
}