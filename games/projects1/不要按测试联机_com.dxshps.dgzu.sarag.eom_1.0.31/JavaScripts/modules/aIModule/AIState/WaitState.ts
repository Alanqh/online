import { GameConfig } from "../../../config/GameConfig";
import { StateBase, stateType } from "../AIMachine/AIStateManager";

/**
 * 等待状态
 */
export class WaitState extends StateBase {

    private _timer: number = 0;
    onEnter(): void {
        let waitconfig = GameConfig.RuleGame.getElement(10037).floatArr_Value;
        let min = waitconfig[0];
        let max = waitconfig[1];
        let waitTime = Math.random() * (max - min) + min;
        this._timer = TimeUtil.elapsedTime() + waitTime;
    }

    onUpdate(dt: number): void {
        if (TimeUtil.elapsedTime() >= this._timer) {
            this.fsm.changeState(stateType.Walk);
        }
    }

    onExit(): void {
    }

    onDestroy(): void {
    }
}