import { PlayerManagerExtesion } from '../Modified027Editor/ModifiedPlayer';

/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-04-02 17:34:20
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-24 17:24:32
 * @FilePath     : \stumbleguys_new\JavaScripts\playerCtrl\PlayerFSM.ts
 * @Description  : 角色行为状态管理
 */
import { IGearElement } from "../config/Gear";
import { CustomCharacter } from "./CustomCharacter";
import { EFrontSlope, PlayerComponentMgr } from "./PlayerComponentMgr";
import { PlayerParam } from "./PlayerParam";
import { SkillManager } from "../modules/Skill/SkillManager";
/**
 * 游泳前冲CD
 */
const SWIM_FORCE_CD: number = 1;
/**
 * 跳跃行为状态机
 */
export class JumpFSM {

    private _curState: StateBase;
    private _states: StateBase[] = [new StandState(), new JumpState(), new SwoopState(), new AnotherSwoopState(), new SlipState(), new OnHitState(), new SlideIntState(), new JumpCompensateState()];
    /**自定义角色 */
    public character: CustomCharacter;
    public isSwoopable = true;
    public isSwoopableType = 0;
    TEMP_VEC: Vector = new Vector(0, 0, 0);
    private _preInputVec: Vector = new Vector(0, 0, 0);
    private _interval: number = 0;
    constructor(private actor: Character) {
        Event.addLocalListener("Swoop.Blocker.Enter", (gameObject, type: number) => {
            if (gameObject == this.actor) {
                this.isSwoopable = false;
                this.isSwoopableType = type;
            }
        });
        Event.addLocalListener("Swoop.Blocker.Leave", gameObject => {
            if (gameObject == this.actor) {
                this.isSwoopable = true;
            }
        });
        this.character = new CustomCharacter(actor);
        this.character.registerEvent(actor);
        for (let i of this._states) {
            i.character = this.character;
            i.machine = this;
        }
        //延迟1s防止参数初始化失败
        setTimeout(() => {
            this.initCharacterParams();
        }, 1000);
        this._curState = this._states[0];
        this._curState.enter();
    }

    /**
     * 初始化玩家参数
     */
    initCharacterParams() {
        this.actor.maxWalkSpeed = PlayerParam.maxWalkSpeed;
        this.actor.driftControl = PlayerParam.airControl;
        // this.actor.airControlBoostMultiplier = PlayerParam.airControlBoostMultiplier
        // this.actor.airControlBoostVelocityThreshold = PlayerParam.airControlBoostVelocityThreshold
        this.actor.gravityScale = PlayerParam.gravityScale;
        this.actor.maxJumpHeight = PlayerParam.maxJumpHeight;
        this.actor.maxFallingSpeed = PlayerParam.maxFallingSpeed;
        this.actor.horizontalBrakingDecelerationFalling = PlayerParam.dropSpeed;
    }


    toState(cls: { new(): StateBase }, ...param) {
        this._curState.leave();
        this._curState = this._states.find(i => i.constructor.name == cls.name);
        this._curState.enter(...param);
    }
    onClickJump() {
        this._curState.onClickJump();
    }
    update(dt: number) {
        this.turn(dt);
        this._curState.update(dt);
    }
    /**
     * 被机关击中
     */
    onGearHit(cfg: IGearElement) {
        this.toState(OnHitState, cfg);
    }
    /**
     * 强制切回站立
     */
    forceToStand() {
        this.toState(StandState);
    }
    /**
     * 滑梯下滑状态
     */
    slideEnter() {
        this.toState(SlideIntState);
    }
    /**
     * 滑梯下滑退出
     */
    slideLeave() {
        this._curState.quitSlideInt();
    }

    /**
     * 使用大跳时调用，如果是飞扑状态，强制切换到跳跃状态
     */
    forceToJump() {
        this.toState(JumpState);
    }

    turnTime: number = 0;
    turn(dt: number) {
        //玩家转向不减速
        if (!this.actor.isJumping) {
            const input = this.actor["ueCharacter"].SysMovementComponent.GetLastInputVector()
            const inputVec = this.TEMP_VEC.set(input.x, input.y, 0)
            //上一帧没有输入  参数还原
            if (inputVec.sqrMagnitude == 0) {
                this._interval += dt;
                if (this._interval > 1) {
                    this._interval = 0;
                    this._preInputVec.set(0, 0, 0);
                }
                return
            }
            if (this._preInputVec.sqrMagnitude == 0) {
                this._preInputVec.set(inputVec)
                return;
            } else {
                this._interval = 0;
                if (this._preInputVec.x * inputVec.x < 0 || this._preInputVec.y * inputVec.y < 0) {
                    this.actor.maxAcceleration = 5000
                    this.turnTime = 0.5;
                }
                this._preInputVec.set(inputVec)
            }
        }
        if (this.turnTime > 0) {
            this.turnTime -= dt;
            if (this.turnTime < 0) {
                this.actor.maxAcceleration = 1850
            }
        }
    }

}
/**
 * 状态基类
 */
class StateBase {
    public machine: JumpFSM;
    public character: CustomCharacter
    onClickJump() { }
    update(dt: number) { }
    enter(...param) { }
    leave() { }
    quitSlideInt() { }
}
/**
 * 站立
 */
class StandState extends StateBase {
    private swimCD: number = 0;

    private preV: Vector;

    override  enter() {
        this.character.exitSlide();
        this.character.moveEnable = true;

        this.preV = this.character.velocity;
        Event.dispatchToLocal("CHANGE_JUMP_IMG", true);
    }
    override onClickJump(): void {
        if (this.character.isSwiming()) {
            if (this.swimCD <= 0) {
                this.swimCD = SWIM_FORCE_CD;
                this.character.ezSwoop();
            }
        } else {
            Event.dispatchToLocal("PLAY_BY_CFG", 5);
            this.character.jump();
            this.machine.toState(JumpState);
            TimeUtil.delayExecute(() => {
                this.character.maxAcceleration = 1850
            }, 2)
        }
    }
    override update(dt: number): void {
        this.swimCD -= dt;
        let velocity = this.character.velocity;
        if (!PlayerComponentMgr.ins.isCharacterOnGround()) {
            if (Math.abs(this.preV.z - velocity.z) < 100)
                this.machine.toState(JumpCompensateState);
        }
        this.preV = velocity;
    }
}

/**
 * 跳跃补偿状态
 */
class JumpCompensateState extends StateBase {

    //跳跃补偿时间
    private _compensateTime = 0.25;

    private _time = 0;
    enter(...param: any[]): void {
        this._time = this._compensateTime;
        this.character.jumpCount = 2;

    }
    onClickJump(): void {
        this.character.jump();
        this.machine.toState(JumpState);
    }
    update(dt: number): void {
        this._time -= dt;
        if (this._time <= 0) {
            this.machine.toState(JumpState);
            return;
        }

        if (PlayerComponentMgr.ins.isCharacterOnGround()) {
            this.machine.toState(StandState);
            return;
        }
    }
    leave(): void {
        this.character.jumpCount = 1;
    }
}


/**
 * 跳跃状态
 */
class JumpState extends StateBase {
    private checkTime = 0;
    private _isSwoop = false;
    private startPosZ: number;
    override onClickJump(): void {
        //判断是否满足飞扑条件
        if (this.machine.isSwoopable) {
            this.machine.toState(SwoopState);
        }
    }
    override enter() {
        this._isSwoop = false;
        this.startPosZ = this.character.character.worldTransform.position.z
        this.checkTime = 0.2;
        Event.dispatchToLocal("CHANGE_JUMP_IMG", false);
    }
    override update(dt: number) {
        if (this.checkTime <= 0) {
            if (PlayerComponentMgr.ins.isCharacterOnGround()) {
                this.machine.toState(StandState);
                if (this.machine.isSwoopableType == 0) {
                    this.machine.isSwoopable = true;
                }
            }
        } else {
            this.checkTime -= dt;
        }
        if (this._isSwoop && this.machine.isSwoopable) {
            if (this.character.character.worldTransform.position.z - this.startPosZ > PlayerParam.maxJumpHeight * 0.6 || this.character.velocity.z < 0) {
                this.machine.toState(SwoopState);
            }
        }
    }
}
/**
 * 朝前飞扑
 */
class SwoopState extends StateBase {

    /**飞扑最大下落速度 */
    maxFallSpeed: number = 2000;
    /**z轴实时速度 */
    zSpeed: number = 0;
    /**飞扑初速度 */
    initSpeed: number = 300;
    /**重力加速度 */
    g: number = 2048;
    /**时间 */
    t: number = 0;
    preSpeed: number = 0;
    override enter() {
        this.character.brakingDecelerationFalling = PlayerParam.dropSpeed * PlayerParam.dropSpeedSize;
        this.t = 0;
        this.zSpeed = 0;
        this.maxFallSpeed = PlayerParam.maxFallingSpeed;
        this.initSpeed = Math.max(PlayerParam.initSpeed, this.character.velocity.z);
        this.g = PlayerParam.g;
        this.character.executeSwoop(false);
        Event.dispatchToLocal("CHANGE_JUMP_IMG", false);
        this.preSpeed = 0;
    }
    override update(dt: number): void {
        if (PlayerComponentMgr.ins.isCharacterOnGround()) {
            this.machine.toState(SlipState);
            return;
        }
        this.t += dt;
        const velocity = this.character.velocity
        if (this.preSpeed && Math.abs(velocity.z - this.preSpeed) > 300) {
            this.machine.toState(StandState);
        } else {
            this.zSpeed = this.initSpeed - this.g * this.t
            let z = Math.max(this.zSpeed, -this.maxFallSpeed)
            this.character[`_character`][`ueCharacter`].SysMovementComponent.velocity = new UE.Vector(velocity.x, velocity.y, z)
            this.preSpeed = z
        }
    }
}
/**
 * 飞扑落地后再飞扑
 */
class AnotherSwoopState extends StateBase {

    private checkTime = 0;
    override enter() {
        this.checkTime = 0.1;
        this.character.brakingDecelerationFalling = PlayerParam.dropSpeed * PlayerParam.dropSpeedSize;
        this.character.maxJumpHeight = this.character.maxJumpHeight * 0.6;
        this.character.jump();
        this.character.executeSwoop(true);
        Event.dispatchToLocal("CHANGE_JUMP_IMG", false);
    }
    override update(dt: number): void {
        if (this.checkTime <= 0) {
            if (PlayerComponentMgr.ins.isCharacterOnGround()) {
                this.machine.toState(SlipState);
            }
        } else {
            this.checkTime -= dt;
        }

    }
}
/**
 * 只能从飞扑过来， 地面滑行,如果速度降下来之后就会站立，如果这时候点击跳跃，跳跃的同时先前冲，切换到飞扑状态
 */
class SlipState extends StateBase {
    private _currentFrontSlope: EFrontSlope = EFrontSlope.Ground;


    override onClickJump(): void {
        if (!this.character.isSwiming()) {
            this.machine.toState(AnotherSwoopState);
        }
    }
    override enter(): void {
        PlayerParam.isSlide = true;
        this.character.CheckDropEvent();
        this._currentFrontSlope = PlayerComponentMgr.ins._speedComponent.currentFrontSlope;
        Event.dispatchToLocal("CHANGE_JUMP_IMG", false);
    }
    override update(dt: number) {
        if (PlayerComponentMgr.ins.isCharacterSpeedLow(this.character.character) || (this._currentFrontSlope == EFrontSlope.Down && PlayerComponentMgr.ins._speedComponent.currentFrontSlope == EFrontSlope.Ground)) {
            // this.machine.swoopCD = 0.25
            this.character.moveEnable = true;
            this.machine.toState(StandState);
        } else if (this.character.isSwiming()) {
            // this.machine.swoopCD = 0.25
            this.machine.toState(StandState);
        }
    }
    override leave() {
        PlayerParam.isSlide = false;
    }
}

/**
 * 被机关击中状态
 */
class OnHitState extends StateBase {
    private timer: number = 0;
    override onClickJump(): void {
        // this.timer -= 0.01;
    }
    override enter(cfg: IGearElement): void {
        this.character.exitSlide();
        if (cfg.id == 9) {

        } else {
            PlayerManagerExtesion.rpcPlayAnimation(this.character.character, "14701", 0);
            this.character.moveEnable = false;

            // 受击停止技能，弹力地板除外
            SkillManager.instance.stopSkill();
            SkillManager.instance.onHitOrDeath(false);
            this.character.playHitEffect(true);
        }
        this.character.jumpEnable = false;
        if (this.timer < cfg.time) {
            this.timer = cfg.time;
        }
        // 受击不能使用技能
        Event.dispatchToLocal("SKILL_BTN_ACTIVE", false);
    }
    override update(dt: number) {
        this.timer -= dt;
        if (this.timer <= 0) {
            PlayerManagerExtesion.rpcStopAnimation(this.character.character, "14701");
            this.character.playHitEffect(false);
            if (PlayerComponentMgr.ins.isCharacterOnGround()) {
                this.machine.toState(StandState);
            } else {
                this.machine.toState(JumpState);
            }
        }
    }
    override leave(): void {
        this.character.moveEnable = true;
        this.character.jumpEnable = true;
        // 恢复技能
        Event.dispatchToLocal("SKILL_BTN_ACTIVE", true);
    }
}
/**
 * 滑梯下滑
 */
class SlideIntState extends StateBase {
    private timer: number = 5;
    override enter(...param: any[]): void {
        this.timer = 5;
    }
    override update(dt: number): void {
        this.timer -= dt;
        if (this.timer <= 0) {
            this.machine.toState(StandState);
        }
    }
    override quitSlideInt() {
        this.character.walkableFloorAngle = 45;
        this.machine.toState(StandState);
    }
}
