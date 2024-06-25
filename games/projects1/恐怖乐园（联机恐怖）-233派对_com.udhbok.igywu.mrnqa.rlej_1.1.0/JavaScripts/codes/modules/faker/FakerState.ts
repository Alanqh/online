/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-18 16:53:11
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-04-23 16:36:22
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\faker\FakerState.ts
 * @Description  : 
 */



import { IAlternateElement } from "../../../config/Alternate";
import { GameConfig } from "../../../config/GameConfig";
import { UtilEx } from "../../utils/UtilEx";
import FakerScript from "./FakerScript";

export enum EFakerState {
    /**发呆 */
    Daze = 1,
    /**解密 */
    Decrypt,
    /**观察 */
    Observe,
    /**攻击 */
    Attack,
    /**
     * @deprecated
     */
    LockTarget
}

export class FakerState extends UtilEx.StateFunc {

    protected target: FakerScript;
    protected cfg: IAlternateElement;
    protected duration: number = 0;
    protected stateId: EFakerState = EFakerState.Daze;
    public startCountDown: boolean = true;

    constructor(_target: FakerScript, stateId: EFakerState) {
        super()
        this.stateId = stateId - 1;
        this.target = _target;
        this.cfg = GameConfig.Alternate.getElement(1);
        this.duration = this.cfg.stateDuration[this.stateId]
    }

    protected countDown(dt: number) {
        if (!this.startCountDown) return;
        if (this.duration <= 0) {
            this.target.randomState();
        }
        this.duration -= dt;


    }
}

/**原地发呆 */
export class DazeState extends FakerState {

    enter?: (data?: any) => void = () => {
        console.log("Faker====>>>>,进入发呆状态");
        this.duration = this.cfg.stateDuration[this.stateId];
        this.startCountDown = true;
        this.target.daze()
    }
    update?: (dt: number) => void = (dt: number) => {
        this.countDown(dt)
    }
    exit?: (nextState?: any) => void = () => {
        this.target.stopCurAni()
    }

}

/**假装解密 */
export class DecryptState extends FakerState {
    enter?: (data?: any) => void = () => {
        console.log("Faker====>>>>,进入假装解密状态");
        this.duration = this.cfg.stateDuration[this.stateId];
        this.startCountDown = false;
        this.target.toDecrypt()
    }
    update?: (dt: number) => void = (dt: number) => {
        this.countDown(dt)
    }
    exit?: (nextState?: any) => void = () => {
        Navigation.stopNavigateTo(this.target.faker);
        this.target.stopCurAni()
    }
}

/**观察 */
export class ObserveState extends FakerState {
    enter?: (data?: any) => void = () => {
        console.log("Faker====>>>>,进入观察状态");
        this.duration = this.cfg.stateDuration[this.stateId];
        this.startCountDown = false;
        this.target.toObserve();
    }
    update?: (dt: number) => void = (dt: number) => {
        this.countDown(dt)
    }
    exit?: (nextState?: any) => void = () => {
        Navigation.stopNavigateTo(this.target.faker);
        this.target.stopCurAni()
    }

}

/**偷袭 */
export class AttackState extends FakerState {
    public followTimer: number = 0;
    enter?: (data?: any) => void = () => {
        this.startCountDown = false;
        this.followTimer = 0;
        console.log("Faker====>>>>,进入攻击状态");
        this.duration = this.cfg.stateDuration[this.stateId];
        this.target.toAttack()
    }
    update?: (dt: number) => void = (dt: number) => {
        if (this.followTimer > 0) {
            this.followTimer -= dt;
        }
        this.target.followTarget(this.followTimer <= 0)
        this.countDown(dt);
    }
    exit?: (nextState?: any) => void = () => {
        Navigation.stopNavigateTo(this.target.faker);
        this.target.stopCurAni()
    }
}

/**
 * @deprecated
 * 锁定
 **/
export class LockTargetState extends FakerState {
    enter?: (data?: any) => void = () => {
        console.log("Faker====>>>>,进入锁定玩家状态");
    }
    update?: (dt: number) => void = (dt: number) => {

    }
    exit?: (nextState?: any) => void = () => {
        Navigation.stopNavigateTo(this.target.faker);
        this.target.stopCurAni()
    }
}