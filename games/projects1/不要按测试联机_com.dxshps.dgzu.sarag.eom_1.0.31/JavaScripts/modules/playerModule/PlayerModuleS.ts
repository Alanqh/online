import { oTrace } from "odin";
import EmojiScript from "../../EmojiPlate/EmojiScript";
import { GameConfig } from "../../config/GameConfig";
import { EPlayerStateType, InGameStatus } from "../../const/Enum";
import { LevelEventS2S } from "../../const/GameCommonEvent";
import { GlobalData } from "../../const/GlobalData";
import GamingModuleS from "../gamingModule/GamingModuleS";
import TeamModuleS from "../teamModule/TeamModuleS";
import PlayerModuleC from "./PlayerModuleC";
import PlayerSync from "./PlayerSync";

export default class PlayerModuleS extends ModuleS<PlayerModuleC, null> {
    private playerSyncMap: Map<number, PlayerSync> = new Map();

    private pausePlayer: Array<number> = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Event.addLocalListener(LevelEventS2S.LEVEL_ADD_WINER_S2S, this.playerWin);
        EmojiScript.instance.setGetEmojiInfoFunc(this.getEmojoInfo.bind(this));
    }

    public async playerClientLogin(playerID: number, playerName: string) {
        if (this.playerSyncMap.has(playerID)) return;

        let playerSync = await mw.Script.spawnScript(PlayerSync);
        playerSync.server_init(playerID);
        playerSync.playerName = playerName;
        this.playerSyncMap.set(playerID, playerSync);
    }

    private getEmojoInfo(id: number){
        return GameConfig.Chat.getElement(id);
    }

    /**暂停 */
    @Decorator.noReply()
    public net_PlayerPause() {
        if (this.pausePlayer.indexOf(this.currentPlayerId) != -1) return;
        this.pausePlayer.push(this.currentPlayerId);
    }
    /**恢复 */
    @Decorator.noReply()
    public net_PlayerResume() {
        let index = this.pausePlayer.indexOf(this.currentPlayerId);
        if (index == -1) return;
        this.pausePlayer.splice(index, 1);
    }
    /**获取玩家同步脚本 */
    public getPlayerSync(playerID: number) {
        return this.playerSyncMap.get(playerID);
    }


    /**玩家下线 */
    protected onPlayerLeft(player: mw.Player): void {
        try {
            let playerID = player.playerId;

            let index = this.pausePlayer.indexOf(this.currentPlayerId);
            if (index != -1) {
                this.pausePlayer.splice(index, 1);
            }

            if (this.playerSyncMap.has(playerID) == false) return;

            let playerSync = this.playerSyncMap.get(playerID);

            playerSync.prepareDestroy();
            this.playerSyncMap.delete(playerID);
            // 给状态后。延迟10帧销毁。避免销毁的时候还在属性同步导致房间卡住
            setTimeout(() => {
                playerSync.destroy();
            }, 10);

            // 检测没输的玩家
            let hasNormalP = false;
            this.playerSyncMap.forEach((playerSync) => {
                if (playerSync.getPlayerState != EPlayerStateType.Lose) {
                    hasNormalP = true;
                    return;
                }
            })
            // 没有正常玩家了，游戏结束
            if (!hasNormalP) {
                oTrace('guan log 没有正常玩家了，游戏强制结束');
                // 走结束流程
                ModuleService.getModule(GamingModuleS).forceGameOver();
                Event.dispatchToLocal(LevelEventS2S.LEVEL_GAME_OVER_S2S);
            }
        } catch (error) {
            console.error("PlayerModuleS onPlayerLeft error:", error);
        }
    }

    public getIsSuccessByPId(playerID: number) {
        let playerSync = this.getPlayerSync(playerID);
        if (playerSync == null) return false;
        return playerSync.IsSuccess;
    }

    /**
     * 是否可以发送RPC
     * @param playerID 
     * @returns true:可以发送 false:不可以发送
     */
    public canSendRPC(playerID: number) {
        return this.pausePlayer.indexOf(playerID) == -1;
    }

    public setPlayerDataInfo(playerId: number, configId: number, suit: number[], petLevels: number[]) {
        this.getClient(playerId).net_playerJumpGameByServer(configId, suit.slice(), petLevels);
    }

    private playerWin = (playerID: number) => {
        // 添加胜利玩家
        if (this.playerSyncMap.has(playerID) == false) {
            oTrace('guan log 没找到playerID', playerID);
            return;
        }
        let playerSync = this.playerSyncMap.get(playerID);
        playerSync.win(GlobalData.levelEndCount_S);
    }

    // 重置玩家状态
    public enterLoadingState() {
        this.playerSyncMap.forEach((playerSync) => {
            playerSync.levelStart();
        })
    }

    // 结算修改玩家状态
    public enterCalculateState(): number[] {
        let winList = [];
        if (GlobalData.levelEndCount_S == 1) {//只有第一轮会带队员胜利，第二轮不会带队员胜利
            this.playerSyncMap.forEach((playerSync) => {
                // playerSync.calculate();
                if (playerSync.getPlayerState == EPlayerStateType.Win) {
                    winList.push(playerSync.getPlayerId)
                }
            })

            winList.forEach(id => {
                //获胜玩家，查找队伍，把队伍玩家的状态改成胜利
                let playerSync = this.playerSyncMap.get(id);
                if (!playerSync || playerSync.LeaderId == "0") return;//没有队伍
                let userId = Player.getPlayer(id).userId;
                let playerUserIds = ModuleService.getModule(TeamModuleS).getPlayerTeamPIds(userId);
                if (!playerUserIds || playerUserIds.length == 0) return;//没有队伍

                playerUserIds.forEach(userId => {//遍历队伍内玩家，修改玩家状态w
                    let pId = Player.getPlayer(userId).playerId;
                    if (this.playerSyncMap.has(pId) == false) return;
                    let newPlayerSy = this.playerSyncMap.get(pId);
                    if (newPlayerSy.getPlayerState == EPlayerStateType.Win) return;
                    this.playerSyncMap.get(pId).win(GlobalData.levelEndCount_S);
                })
            })
        }


        this.playerSyncMap.forEach((playerSync) => {
            if (playerSync.getPlayerState == EPlayerStateType.Win && winList.includes(playerSync.getPlayerId) == false) {
                winList.push(playerSync.getPlayerId)
            }
            playerSync.calculate();
        })
        return winList;
    }

    // 玩家是否获胜
    public checkIsWin(playerID: number): boolean {
        if (this.playerSyncMap.has(playerID) == false) return false;
        return this.playerSyncMap.get(playerID).getPlayerState == EPlayerStateType.Win;
    }

    @Decorator.noReply()
    public net_SetPlayerPetID(petid: number) {
        if (this.playerSyncMap.has(this.currentPlayerId) == false) {
            oTrace('guan log 没找到playerID', this.currentPlayerId);
            return;
        }
        let playerSync = this.playerSyncMap.get(this.currentPlayerId);
        playerSync.setPetId(petid);
    }

    /**
     * 检测首轮获胜
     * @param playerID 玩家id
     * @returns 是否获胜
     */
    public checkFirstRoundWin(playerID: number): boolean {
        if (this.playerSyncMap.has(playerID) == false) return false;
        return this.playerSyncMap.get(playerID).getFirstRoundWin;
    }

    /**
     * 检测第二轮夺冠
     * @param playerID 玩家id
     * @returns 是否夺冠
     */
    public checkSecondRoundWin(playerID: number): boolean {
        if (this.playerSyncMap.has(playerID) == false) return false;
        return this.playerSyncMap.get(playerID).getSecondRoundWin;
    }

    /**
     * 返回大厅时候，获取玩家对局内状态
     * @param playerID 玩家id
     * @returns 结果 因为是服务器全部跳，所以不考虑等待过程
     */
    public getInGameStatus(playerID: number): InGameStatus {
        if (this.playerSyncMap.has(playerID) == false) return -1;
        /**没进入关卡是不会获得奖励的 */
        if (!ModuleService.getModule(GamingModuleS).getEnterGaming()) {
            return InGameStatus.None;
        }
        // 夺冠
        if (this.playerSyncMap.get(playerID).getSecondRoundWin) {
            return InGameStatus.Winner;
        }

        // 第一轮晋级
        if (this.playerSyncMap.get(playerID).getFirstRoundWin) {
            return InGameStatus.SecondOut;
        }

        // 没赢过
        return InGameStatus.FirstOut;
    }

    public playerAddTeam(pUserId: string, leaderId: string) {
        let pId = Player.getPlayer(pUserId).playerId;
        if (this.playerSyncMap.has(pId) == false) return;
        this.playerSyncMap.get(pId).playerAddTeam(leaderId);
    }
}