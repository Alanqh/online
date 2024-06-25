
import { DeadCountData } from "./DeadCountData";
import DeadCountModuleC, { DeadCountDataC } from "./DeadCountModuleC";
import DeadCountModuleData from "./DeadCountModuleData";

/**服务端玩家死亡数据 */
export class DeadCountDataS {

}

export default class DeadCountModuleS extends ModuleS<DeadCountModuleC, DeadCountModuleData> {

    /**玩家死亡统计信息map */
    private playerDeadCountMap: Map<number, DeadCountDataS> = new Map();
    /**玩家死亡计数全数据 */
    private deadCountData: Map<number, DeadCountData> = new Map();


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        if (!this.playerDeadCountMap.has(player.playerId)) {
            let deadCountData = new DeadCountDataS();
            this.playerDeadCountMap.set(player.playerId, deadCountData);
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.playerDeadCountMap.delete(player.playerId);
    }


    /**客户端结算完数据后，上传给服务端 */
    public net_setData(dataC: DeadCountDataC): void {
        let data = new DeadCountData(dataC);
        this.deadCountData.set(this.currentPlayerId, data);
    }

    /**重置玩家死亡数据 */
    public net_resetPlayerData(): void {
        this.deadCountData.get(this.currentPlayerId).resetData();
    }
}