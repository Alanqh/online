import { GameConfig } from "../../../config/GameConfig";
import { StateBase, stateType } from "../AIMachine/AIStateManager";

const deadTime: number = GameConfig.RuleGame.getElement(10018).float_Value;
export class DeadState extends StateBase {

    private timer: number = null;

    onEnter(): void {
        this.fsm.curAIObj.ragdollEnabled = true;
        this.timer = 0;
        // this.fsm.subCurIndex();
        this.fsm.setCurPathIndex(this.fsm.CurCheckIndex);
    }

    onUpdate(dt: number): void {
        if (this.timer == null) return;
        this.timer += dt;
        if (this.timer < deadTime) return;
        this.timer = null;
        this.fsm.changeState(stateType.Born);
    }

    onExit(): void {
        this.timer = null;
        this.fsm.curAIObj.ragdollEnabled = false;
    }

    onDestroy(): void {

    }
}