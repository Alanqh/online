/** 
 * @Author       : Songyang.Xie
 * @Date         : 2024-01-08 14:43:42
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2024-01-11 17:03:57
 * @FilePath     : \petparty\JavaScripts\modules\loginModule\LoginModuleS.ts
 * @Description  : 修改描述
 */
import { oTrace } from "odin";
import { GlobalCtrlEventS2S } from "../../const/GameCommonEvent";
import GameComUtils from "../../utils/GameComUtils";
import { HallToGameDataManager } from "../jumpGame/JumpGameHelper";
import { LeaderboardModuleS } from "../leaderboardModule/LeaderboardModuleS";
import MGSModuleS from "../mgsModule/MGSModuleS";
import { PetModuleS } from "../petModule/PetModuleS";
import PlayerModuleS from "../playerModule/PlayerModuleS";
import TeamModuleS from "../teamModule/TeamModuleS";
import LoginModuleC from "./LoginModuleC";

/**
 * 玩家登录，数据初始化
 */
export default class LoginModuleS extends ModuleS<LoginModuleC, null> {
    @Decorator.noReply()
    public net_PlayerClientLogin(nickName: string): void {
        oTrace('guan log net_PlayerClientLogin currentPlayerId', this.currentPlayerId, "nickName", nickName);
        this.currentPlayer.character.displayName = nickName;

        // this.currentPlayer.character.collisionWithOtherCharacterEnabled = false;
        // 各个模块初始化数据
        ModuleService.getModule(LeaderboardModuleS).playerJoined(this.currentPlayerId, nickName);
        ModuleService.getModule(PlayerModuleS).playerClientLogin(this.currentPlayerId, nickName);
        ModuleService.getModule(PetModuleS).playerJoined(this.currentPlayerId, nickName);
        let pid = this.currentPlayerId;
        // 确保全局控制器已经初始化完成
        GameComUtils.waitForGlobalCtrlInitDone().then(() => {
            // 发送登录成功事件
            Event.dispatchToLocal(GlobalCtrlEventS2S.CTRL_LOGIN_S2S, pid);
        })
        ModuleService.getModule(MGSModuleS).playerEnterGame(this.currentPlayer);
        this.getPlayerJumpGameData(this.currentPlayer);
    }

    private async getPlayerJumpGameData(player: Player) {
        const teamId = player.teamId;
        oTrace('guan log getPlayerJumpGameData teamId', teamId);
        if (!teamId) {
            oTrace('guan log getPlayerJumpGameData teamId 没找到', player.playerId);
            return
        }

        await this.playerUserIDReady(player);
        oTrace('guan log getPlayerJumpGameData found userId', player.playerId, player.userId);

        const data = RouteService.getTeamCarryingData(teamId);
        oTrace('guan log getPlayerJumpGameData data', data);

        if (!data) {
            return
        }
        //当前游戏类型为大厅跳游戏，接收数据为游戏跳大厅
        let curData = data[player.userId];
        oTrace('guan log getPlayerJumpGameData curData', curData);
        if (!curData) {
            return
        }
        const hallToGameData = HallToGameDataManager.decode(curData.toString());
        oTrace('guan log getPlayerJumpGameData hallToGameData', hallToGameData);

        if (!hallToGameData) {
            return
        }

        let configId = hallToGameData.petId;
        let suit = [hallToGameData.Back, hallToGameData.Shoulder, hallToGameData.Tail, hallToGameData.Effect, hallToGameData.Head];
        let levels = [hallToGameData.SprintAccelLv, hallToGameData.SprintDurationLv, hallToGameData.SprintMaxSpeedLv,
        hallToGameData.SprintCdLv, hallToGameData.MoveMaxSpeedLv, hallToGameData.MoveAccelLv];
        ModuleService.getModule(PlayerModuleS).setPlayerDataInfo(player.playerId, configId, suit, levels)
        //添加队伍
        let leaderUserId = hallToGameData.leaderUserId;
        if (leaderUserId == "0" || Object.keys(data).length <= 1) return
        ModuleService.getModule(TeamModuleS).playerAddTeam(player.userId, leaderUserId)
    }

    // 防止玩家没userId
    private async playerUserIDReady(player: mw.Player) {
        return new Promise<void>((resolve, reject) => {
            let key = setInterval(() => {
                if (!StringUtil.isEmpty(player.userId)) {
                    clearInterval(key);
                    oTrace("LoginModuleS playerUserIDReady playerId", player.playerId, "userId", player.userId);
                    resolve();
                }
            }, 10)
        });
    }
}