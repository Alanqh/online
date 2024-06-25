import { GameConfig } from "../../../config/GameConfig";
import { FindRewardUI } from "../find/ui/FindRewardUI";
import MissionModuleS from "../mission/MissionModuleS";
import { RealNameData } from "./RealNameData";

export class RealNameModuleC extends ModuleC<RealNameModuleS, RealNameData> {
    public reqGetReward() {
        this.server.net_getRewards();
        UIService.show(FindRewardUI, GameConfig.SubGlobal.RealNameItems.numberList);
    }
}

export class RealNameModuleS extends ModuleS<RealNameModuleC, RealNameData> {
    public onStart(): void {
        Event.addClientListener("C2S_KickPlayer", (player: Player, lanid: number) => {
            RoomService.kick(player, "亲爱的玩家，根据政策要求，未实名的用户禁止享受网络游戏服务");
        });
    }

    net_getRewards() {
        const rewards = GameConfig.SubGlobal.RealNameItems.numberList;
        ModuleService.getModule(MissionModuleS).getReward(rewards, this.currentPlayer);
        this.currentData.isget = true;
        this.currentData.save(true);
    }
}
