import { LevelLogic_S } from "../LevelLogic_S";
import Level_1 from "./Level_1";



export class Level_1_S extends LevelLogic_S<Level_1> {
    protected async onInitServer(): Promise<void> {

    }
    protected onStartPlayGame(): void {

    }
    /**
     * 玩家离开事件
     * @param player 
     */
    protected onPlayerLeave(player: mw.Player): void {

    }

    /**
     * 基类也有需要销毁的逻辑
     */
    protected onScriptDestroy(): void {
        super.onScriptDestroy();

    }
}