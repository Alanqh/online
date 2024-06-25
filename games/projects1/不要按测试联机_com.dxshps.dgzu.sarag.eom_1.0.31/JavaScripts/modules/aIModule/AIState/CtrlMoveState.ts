import { oTrace } from "odin";
import { StateBase, stateType } from "../AIMachine/AIStateManager";

const autoMoveNpcAniGuid: string = "14554";
const autoMoveNpcAniSpeed: number = 1;

/**
 * 外部控制移动状态
 */
export class CtrlMoveState extends StateBase {

    private ani: mw.Animation = null;

    public autoMoveTimer: number = null;
    public autoMoveSpeed: Vector = Vector.zero;

    private mTmpV: Vector = Vector.zero;

    onEnter(moveTimer: number, moveSpeed: Vector): void {
        this.fsm.curAIObj.complexMovementEnabled = false;

        if (!this.ani) {
            this.ani = this.fsm.curAIObj.loadAnimation(autoMoveNpcAniGuid);
            this.ani.speed = autoMoveNpcAniSpeed;
            this.ani.loop = 0;
        }

        this.autoMoveTimer = TimeUtil.elapsedTime() + moveTimer;
        Vector.copy(moveSpeed, this.autoMoveSpeed);

        this.ani.play();
    }

    onUpdate(dt: number): void {
        if (TimeUtil.elapsedTime() >= this.autoMoveTimer) {
            this.autoMoveTimer = null;
            this.fsm.unlockChange();
            this.fsm.changeState(stateType.Walk);
            return
        }

        Vector.add(this.fsm.curAIObj.worldTransform.position, this.autoMoveSpeed, this.mTmpV);
        this.fsm.curAIObj.worldTransform.position = this.mTmpV;
    }

    onExit(): void {
        this.ani.stop();
        this.fsm.curAIObj.complexMovementEnabled = true;
    }

    onDestroy(): void {
    }
}