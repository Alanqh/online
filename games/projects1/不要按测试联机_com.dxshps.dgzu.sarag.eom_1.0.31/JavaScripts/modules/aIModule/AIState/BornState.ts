import { EGamingFsmType } from "../../../const/Enum";
import { GamingCtrlEventC2C } from "../../../const/GameCommonEvent";
import { GlobalData } from "../../../const/GlobalData";
import GameComUtils from "../../../utils/GameComUtils";
import { StateBase, stateType } from "../AIMachine/AIStateManager";
import { AIManager_C } from "../AIManager_C";

export class BornState extends StateBase {
    private gamingStartListener: EventListener;
    onEnter(bornLoc: Vector): void {
        // oTrace('guan log BornState');
        let pathInfo = this.fsm.getPathInfoByIndex(this.fsm.curPathIndex);
        if (this.fsm.curPathIndex <= 0) {//流程刚开始，需要监听游戏开始事件
            if (bornLoc == null) {//检测是否有出生点参数，没有则随机一个
                let vArr = pathInfo.pos;
                bornLoc = vArr[Math.floor(Math.random() * vArr.length)];
            }
            this.fsm.curAIObj.worldTransform.position = bornLoc;
            this.fsm.curAIObj.switchToWalking();

            let bornCheckPoint = AIManager_C.Instance.findAICheckPointInfoByObj(this.fsm.curAIObj);
            if (bornCheckPoint) {
                bornCheckPoint.centerPoint = this.fsm.curAIObj.worldTransform.position.clone();
                bornCheckPoint.size = new Vector2(500, 500);
            }
            // oTrace('guan log BornState addCurIndex');
            // this.fsm.addCurIndex();
            if (GlobalData.gameingState_C == EGamingFsmType.Gaming) {
                this.gameStart(EGamingFsmType.Gaming);
            } else {
                //TODO：是否监听游戏开始，还是创建就开始寻路找下一个点
                this.gamingStartListener = Event.addLocalListener(GamingCtrlEventC2C.CTRL_GAMING_STATE_CHANGE_C2C, this.gameStart.bind(this))
            }
        } else {//普通死亡复活流程
            let aiCheckPointInfo = AIManager_C.Instance.findAICheckPointInfoByObj(this.fsm.curAIObj);
            if (aiCheckPointInfo) {
                let bornPos = GameComUtils.getRandomPoint(aiCheckPointInfo.centerPoint, aiCheckPointInfo.size);
                this.fsm.curAIObj.worldTransform.position = bornPos;
            }
            this.fsm.changeStateByType(pathInfo.type);
        }
    }

    private gameStart(state: EGamingFsmType) {
        if (state != EGamingFsmType.Gaming) { return; }
        this.fsm.changeState(stateType.Walk)
        if (this.gamingStartListener) {
            Event.removeListener(this.gamingStartListener);
            this.gamingStartListener = null;
        }
    }

    onUpdate(dt: number): void {

    }

    onExit(): void {
        if (this.gamingStartListener) {
            Event.removeListener(this.gamingStartListener);
        }
        this.gamingStartListener = null;
    }

    onDestroy(): void {

    }
}