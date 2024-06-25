import { GameConfig } from "../../../config/GameConfig";
import { IPetElement } from "../../../config/Pet";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { BaseState } from "../../../fsm/StateMachine";
import GameComUtils from "../../../utils/GameComUtils";
import GamingModuleC from "../../gamingModule/GamingModuleC";
import { FourPlayerState } from "./FourPlayerFSM";

//飞扑状态(按钮点击进入)
export class FlyState extends BaseState {
    private petConfig: IPetElement = null;//宠物配置
    private aniConfig: IPetAnimationElement;
    private needCheck: boolean = false;
    private isAir: boolean = false;//飞扑结束是否滞空
    private walknum: number = 2048;// 行走制动速率
    private gronum: number = 8;// 行走制动速率
    private gravityScale: number = 8;//重力倍率
    private driftControl: number = 1;//重力倍率
    private rate: number = GameConfig.PetStat.getElement(10003).Value;//最大转向速度
    private fall: number = 0;

    private addForce: Vector = Vector.zero;
    private time: number = GameConfig.PetStat.getElement(20005).Value;//飞扑时间
    private airNum: number = GameConfig.PetStat.getElement(20003).Value;//空中冲量
    private airRate: number = GameConfig.PetStat.getElement(20004).Value;//空中转向
    private fallNum: number = GameConfig.PetStat.getElement(20001).Value;//下落制动
    private groundNum: number = GameConfig.PetStat.getElement(20002).Value;//地面冲量
    private control: number = GameConfig.PetStat.getElement(20007).Value;//空中控制

    init(cfgId: number) {
        this.petConfig = GameConfig.Pet.getElement(cfgId);
        this.aniConfig = GameConfig.PetAnimation.getElement(this.petConfig.animationSet);

        this.walknum = this.owner.brakingDecelerationWalking;
        this.gronum = this.owner.groundFriction;
        this.fall = this.owner.horizontalBrakingDecelerationFalling;
        this.gravityScale = this.owner.gravityScale;
        this.driftControl = this.owner.driftControl;
    }

    enter(...param: any): void {
        ModuleService.getModule(GamingModuleC).incrDiveCount();
        this.isAir = false;
        let jumpState = this.owner.isJumping;//是否空中
        this.addForce = Vector.zero;
        this.time = GameConfig.PetStat.getElement(20005).Value;//飞扑时间
        //抵消初始速度
        this.owner.complexMovementEnabled = false;
        this.owner.complexMovementEnabled = true;
        //飞扑方向
        let fvec = this.owner.worldTransform.getForwardVector();
        if (jumpState) {
            Vector.multiply(fvec, this.airNum, this.addForce);
            this.owner.rotateRate = this.airRate;
            this.owner.driftControl = this.control;
        } else {
            Vector.multiply(fvec, this.groundNum, this.addForce)
            this.owner.rotateRate = 0;
        }
        this.fsm.toPlayAnim(FourPlayerState.FlyState, true, this.aniConfig.FlyGuid, this.aniConfig.FlyRate, 999999);
        this.owner.brakingDecelerationWalking = 0;
        this.owner.groundFriction = 0;
        this.owner.addImpulse(this.addForce, true)
        this.owner.movementEnabled = false;
        this.owner.jumpEnabled = false;
        this.owner.gravityScale = 0;
        this.needCheck = true;
        EffectService.playOnGameObject(this.petConfig.diveEffect, this.owner, { position: this.petConfig.diveEffectPos, rotation: new Rotation(this.petConfig.diveEffectRot), scale: this.petConfig.diveEffectScale })
        //音效
        GameComUtils.play2DSoundByCfg(10001);
    }
    update(dt: number): void {
        if (this.needCheck) {
            if (this.time > 0) {
                this.time -= dt;
            } else {
                this.time = 0;
                this.needCheck = false;
                this.owner.gravityScale = this.gravityScale;
                this.check();
            }
        }
        if (this.isAir && !this.owner.isJumping) {//检测滞空结束
            this.check();
        }
    }
    check() {
        if (this.owner.isJumping) {
            if (this.isAir) return;
            this.isAir = true;//飞扑结束滞空
            this.fsm.toPlayAnim(FourPlayerState.FlyState, true, this.aniConfig.FlyHoverGuid, this.aniConfig.FlyHoverRate, 99999);
            this.owner.horizontalBrakingDecelerationFalling = this.fallNum;//下落制动
        } else {
            this.owner.brakingDecelerationWalking = 80000;//制动
            this.fsm.changeState(FourPlayerState.FallState);
        }
    }
    exit(): void {
        this.needCheck = false;
        this.isAir = false;
        this.owner.driftControl = this.driftControl;
        this.owner.gravityScale = this.gravityScale;
        this.owner.rotateRate = this.rate;
        this.owner.brakingDecelerationWalking = this.walknum;
        this.owner.horizontalBrakingDecelerationFalling = this.fall;
        this.owner.groundFriction = this.gronum;
        this.owner.movementEnabled = true;
        this.owner.jumpEnabled = true;
        this.isAir ? this.fsm.toPlayAnim(FourPlayerState.FlyState, false, this.aniConfig.FlyHoverGuid) : this.fsm.toPlayAnim(FourPlayerState.FlyState, false, this.aniConfig.FlyGuid);
    }
}