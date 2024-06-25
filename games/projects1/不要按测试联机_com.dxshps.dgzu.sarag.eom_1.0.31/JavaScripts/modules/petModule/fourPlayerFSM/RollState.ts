import { GameConfig } from "../../../config/GameConfig";
import { IPetElement } from "../../../config/Pet";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { GameEventC2C } from "../../../const/GameCommonEvent";
import { BaseState } from "../../../fsm/StateMachine";
import GameComUtils from "../../../utils/GameComUtils";
import Tips from "../../../utils/P_Tips";
import { PetModuleC } from "../PetModuleC";
import { PetStrengthenType } from "../PetModuleData";
import { FourPlayerState } from "./FourPlayerFSM";

enum RollMoveState {
    Null,
    Move,
    Idle
}
export class RollState extends BaseState {
    private petConfig: IPetElement = null;
    private aniConfig: IPetAnimationElement;
    private enterAcceleration: number = 0;//最大加速度
    private enterGroundFriction: number = 0;
    private enterRotateRate: number = GameConfig.PetStat.getElement(10003).Value;

    private timer: number = 0;//冲刺持续时间
    private playId: string = '';//音效id

    private airEffect: Effect = null;

    private state: RollMoveState;

    init(cfgId: number) {
        this.petConfig = GameConfig.Pet.getElement(cfgId);
        this.aniConfig = GameConfig.PetAnimation.getElement(this.petConfig.animationSet);
        this.createMoveEffect();
    }
    private speedUp: number = GameConfig.PetStat.getElement(30001).Value;//冲刺速度的增量
    /** 强化给到的冲刺速度加成 */
    private addSpeed: number = 0;
    enter(...param: any[]): void {
        const petModule = ModuleService.getModule(PetModuleC);
        if (petModule) {
            this.enterAcceleration = this.owner.maxAcceleration;//最大加速度
            this.addSpeed = petModule.getStrengthenAttr(PetStrengthenType.SprintMaxSpeed).val;
            Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, this.addSpeed);
            this.owner.maxAcceleration = GameConfig.PetStat.getElement(30002).Value + petModule.getStrengthenAttr(PetStrengthenType.SprintAccel).val;
        }
        this.enterGroundFriction = this.owner.groundFriction;//地面摩檫力

        Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, this.speedUp);
        // this.owner.maxWalkSpeed = GameConfig.PetStat.getElement(30001).Value;
        this.owner.rotateRate = GameConfig.PetStat.getElement(30005).Value;
        this.owner.groundFriction = GameConfig.PetStat.getElement(30006).Value;
        this.timer = petModule ? GameConfig.PetStat.getElement(30004).Value + petModule.getStrengthenAttr(PetStrengthenType.SprintDuration).val : GameConfig.PetStat.getElement(30004).Value;//冲刺持续时间

        this.state = null;
        this.playId = GameComUtils.play2DSoundByCfg(10004);
        ModuleService.getModule(PetModuleC).toPlayRollEff(true, this.petConfig.id);//冲刺特效

    }
    private async createMoveEffect() {
        //冲刺气流特效
        this.airEffect = await GameObject.asyncSpawn(this.petConfig.airEffect) as Effect;
        this.airEffect.parent = this.owner;
        this.airEffect.loopCount = 9999;
        this.airEffect.localTransform.scale = this.petConfig.airEffectScale;
        this.airEffect.localTransform.position = this.petConfig.airEffectPos;
        this.airEffect.localTransform.rotation = new Rotation(this.petConfig.airEffectRot);
        setTimeout(() => {
            this.airEffect.forceStop();
        }, 10);
    }

    update(dt: number): void {
        this.timer -= dt;
        if (this.timer <= 0) {
            this.fsm.changeState(FourPlayerState.IdleState);
            return;
        }
        if (!this.owner.isMoving) {
            if (this.state == RollMoveState.Idle) return;
            this.state = RollMoveState.Idle;
            this.fsm.toPlayAnim(FourPlayerState.RollState, true, this.aniConfig.IdleGuid, this.aniConfig.IdleRate, 999999);
            this.airEffect.forceStop();
        } else {
            if (this.state == RollMoveState.Move) return;
            this.state = RollMoveState.Move;
            this.fsm.toPlayAnim(FourPlayerState.RollState, true, this.aniConfig.RollGuid, this.aniConfig.RollRate, 999999);
            this.airEffect.play();
        }
    }

    exit(): void {
        Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, -this.addSpeed);
        Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, -this.speedUp);
        this.owner.maxAcceleration = this.enterAcceleration;
        this.owner.groundFriction = this.enterGroundFriction;
        this.owner.rotateRate = this.enterRotateRate;
        switch (this.state) {
            case RollMoveState.Idle:
                this.fsm.toPlayAnim(FourPlayerState.RollState, false, this.aniConfig.IdleGuid);
                break;
            case RollMoveState.Move:
                this.fsm.toPlayAnim(FourPlayerState.RollState, false, this.aniConfig.RollGuid);
                break;
        }
        ModuleService.getModule(PetModuleC).toPlayRollEff(false, this.petConfig.id);//冲刺特效
        if (this.timer > 0) {
            ModuleService.getModule(PetModuleC).endRoll();//强制结束冲刺
        }
        SoundService.stopSound(this.playId);
        if (this.airEffect) {
            this.airEffect.forceStop();
        }
    }
}
