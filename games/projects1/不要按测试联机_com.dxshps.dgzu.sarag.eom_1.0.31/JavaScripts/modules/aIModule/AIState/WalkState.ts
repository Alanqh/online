import { StateBase, stateType } from "../AIMachine/AIStateManager";
import { AIActType } from "../AIPathUtil";

const offset: number = 100;

export class WalkState extends StateBase {

    private nextPos: Vector = null;
    private walkAnim: Animation;
    private checkCanNotMoveTimer: number = null;
    private checkPos: Vector = null;
    private canNotMoveCheckTime: number = 10;
    private tmpV: Vector = Vector.zero;
    private endV: Vector = Vector.zero;
    onEnter(): void {
        let nextPathInfo = this.fsm.getPathInfoByIndex(this.fsm.curPathIndex + 1);
        // 如果下一个点没有了，就切换到待机状态
        if (!nextPathInfo) {
            this.fsm.changeState(stateType.Idle);
            return;
        }
        let nextPos = nextPathInfo.pos.clone();
        if (!this.walkAnim) {
            this.walkAnim = this.fsm.curAIObj.loadAnimation(this.fsm.animCfg.RunGuid);
            this.walkAnim.loop = 0;
            this.walkAnim.speed = this.fsm.animCfg.RunRate;
            this.walkAnim.stop();
        }
        this.walkAnim.play();
        let rot = MathUtil.randomFloat(-Math.PI, Math.PI);
        nextPos.x = nextPathInfo.pos.x + Math.cos(rot) * offset;
        nextPos.y = nextPathInfo.pos.y + Math.sin(rot) * offset;
        this.checkPos = nextPos;

        this.nextPos = nextPos;

        this.endV.x = nextPos.x;
        this.endV.y = nextPos.y;
        this.endV.z = 0;

        let info = this.fsm.getPathInfoByIndex(this.fsm.curPathIndex)
        if (info && info.type == AIActType.CheckPoint) {
            this.fsm.setCurCheckIndex(this.fsm.curPathIndex);
        }
        this.fsm.addCurIndex();
        this.checkCanNotMoveTimer = 0;
        this.canNotMoveCheckTime = MathUtil.randomInt(6, 11);
    }

    onUpdate(dt: number): void {
        this.move();
        this.checkCanNotMove(dt);
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
            this.fsm.changeState(stateType.Idle);
            this.fsm.subCurIndex();
        }
    }

    private move() {
        if (this.nextPos == null) return;
        this.fsm.curAIObj.lookAt(this.nextPos)
        this.fsm.curAIObj.addMovement(Vector.forward);

        // 过滤z影响
        this.tmpV.x = this.fsm.curAIObj.worldTransform.position.x;
        this.tmpV.y = this.fsm.curAIObj.worldTransform.position.y;
        let dis = Vector.squaredDistance(this.tmpV, this.endV);
        if (dis < 3000) {
            this.nextPos = null;
            // oTrace('guan log 到达终点，this.fsm.curPathIndex', this.fsm.curPathIndex);
            let info = this.fsm.getPathInfoByIndex(this.fsm.curPathIndex)
            if (!info) {
                this.fsm.changeState(stateType.Idle);
                return
            }
            // oTrace('guan log info.type', info.type);
            if (info.type == AIActType.Walk || info.type == AIActType.CheckPoint) {
                this.onEnter();
            } else {
                this.fsm.changeStateByType(info.type);
            }
            //TODO：跳跃状态可能不需要？？？尝试触发器跳跃/跳跃方法
            // this.fsm.addCurIndex();
        }
    }

    onExit(): void {
        this.nextPos = null;
        if (this.walkAnim) {
            this.walkAnim.stop();
        }
        this.checkCanNotMoveTimer = null;
    }

    onDestroy(): void {

    }
}