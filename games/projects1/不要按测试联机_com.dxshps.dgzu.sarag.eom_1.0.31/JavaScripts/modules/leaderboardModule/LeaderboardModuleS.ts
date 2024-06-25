import { LeaderboardModuleBaseS } from "module_leaderboard";
import { FieldType, LeaderboardModuleC } from "./LeaderboardModuleC";

export class LeaderboardModuleS extends LeaderboardModuleBaseS<LeaderboardModuleC> {
    protected onStart(): void {

    }
    //玩家进入房间
    playerJoined(pid: number, nickName: string) {
        //构建玩家的初始数据
        let data = {};
        data[FieldType.Name] = nickName;
        data[FieldType.Score] = 0;
        //向排行榜添加玩家
        this.addPlayer(pid, data);
    }
    //玩家离开房间
    onPlayerLeft(player: mw.Player) {
        try {
            this.removePlayer(player);
        } catch (e) {
            console.error("LeaderboardModuleS onPlayerLeft", e);
        }
    }

    public onPlayerKill(playerId: number, gamingkillNum: number) {
        this.setPlayerValue(playerId, FieldType.Score, gamingkillNum);
    }
}