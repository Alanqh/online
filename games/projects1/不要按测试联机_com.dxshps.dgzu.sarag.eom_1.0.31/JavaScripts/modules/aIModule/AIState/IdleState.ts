import { oTrace } from "odin";
import GameComUtils from "../../../utils/GameComUtils";
import { StateBase, stateType } from "../AIMachine/AIStateManager";
import { AIManager_C } from "../AIManager_C";

const checkRandomWalkTime: number = 2;
const randomSize: Vector2 = new Vector2(500, 500);

export class IdleState extends StateBase {

    private timer: number = null;
    private randomCenterPoint: Vector = null;
    private endPos: Vector = null;
    private walkAnim: Animation;
    private checkCanNotMoveTimer: number = null;
    private checkPos: Vector = null;
    private canNotMoveCheckTime: number = 10;

    onEnter(): void {
        if (!this.walkAnim) {
            this.walkAnim = this.fsm.curAIObj.loadAnimation(this.fsm.animCfg.RunGuid);
            this.walkAnim.loop = 0;
            this.walkAnim.speed = this.fsm.animCfg.RunRate;
            this.walkAnim.stop();
        }
        this.randomCenterPoint = this.fsm.curAIObj.worldTransform.position.clone();
        this.timer = checkRandomWalkTime;

        this.checkPos = this.randomCenterPoint;
        this.checkCanNotMoveTimer = 0;
        this.canNotMoveCheckTime = MathUtil.randomInt(6, 11);
    }

    onUpdate(dt: number): void {
        this.randomWalk(dt);
        this.checkCanNotMove(dt)
    }

    private randomWalk(dt: number) {
        if (this.endPos != null) {
            this.fsm.curAIObj.lookAt(this.endPos);
            this.fsm.curAIObj.addMovement(Vector.forward);
            if (Vector.squaredDistance(this.endPos, this.fsm.curAIObj.worldTransform.position) <= 1600) {
                this.walkAnim.stop();
                this.endPos = null;
                this.timer = 0;
                if (this.fsm.curPathIndex < AIManager_C.Instance.FsmArr.length) {//防止卡住的情况
                    this.fsm.changeState(stateType.Walk);
                    return
                }
            }
        }
        if (this.timer == null || this.randomCenterPoint == null) return;
        this.timer += dt;
        if (this.timer < checkRandomWalkTime) return;
        this.timer = null;
        if (this.endPos == null) {
            this.endPos = GameComUtils.getRandomPoint(this.randomCenterPoint, randomSize);
            this.walkAnim.play();
        }
    }

    private checkCanNotMove(dt: number) {
        if (this.checkCanNotMoveTimer == null || this.checkPos == null) return
        this.checkCanNotMoveTimer += dt;
        if (this.checkCanNotMoveTimer < this.canNotMoveCheckTime) return;
        this.checkCanNotMoveTimer = 0;
        let curPos = this.fsm.curAIObj.worldTransform.position.clone();
        let dis = Vector.squaredDistance(curPos, this.checkPos)
        this.checkPos = curPos;
        if (dis < 900) {
            // this.fsm.changeState(stateType.Idle);
            this.onEnter();
            this.fsm.subCurIndex();
        }
    }

    onExit(): void {
        this.timer = 0;
        this.randomCenterPoint = null;
        this.endPos = null;
        this.checkCanNotMoveTimer = null;
        this.checkPos = null
    }

    onDestroy(): void {

    }
}