import { AIManager_C } from "./AIManager_C";
import { AIModuleS } from "./AIModuleS";

export class AICheckPointInfo {
    public checkPoint: number = -1;
    public centerPoint: mw.Vector = null;
    public size: mw.Vector2 = null;
}

export class AIModuleC extends ModuleC<AIModuleS, null>{
    protected onStart(): void {
    }

    protected onUpdate(dt: number): void {
        AIManager_C.Instance.onUpdate(dt);
    }

}