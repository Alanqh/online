import { GlobalData } from "../../const/GlobalData";
import HUDModuleC from "./HUDModuleC";


/**
 * 主页面
 */
export default class HUDModuleS extends ModuleS<HUDModuleC, null> {

    protected onStart(): void {

    }

    // 通知所有玩家匹配成功
    public showAllPlayerReady() {
        this.getAllClient().net_ShowAllPlayerReady();
    }

    @Decorator.noReply()
    public net_PlayerAddLikeCount(playerId: number) {
        if (!GlobalData.allPlayerLikeCounts.has(playerId)) {
            GlobalData.allPlayerLikeCounts.set(playerId, 0);
        }
        let curCount = GlobalData.allPlayerLikeCounts.get(playerId);
        curCount++;
        GlobalData.allPlayerLikeCounts.set(playerId, curCount);
        this.getClient(playerId).net_setPlayerLikeCount();
    }
}