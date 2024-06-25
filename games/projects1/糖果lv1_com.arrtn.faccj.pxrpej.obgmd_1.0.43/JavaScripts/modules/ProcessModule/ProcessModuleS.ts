/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-08 18:39:39
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-05 19:10:21
 * @FilePath     : \stumbleguys\JavaScripts\modules\ProcessModule\ProcessModuleS.ts
 * @Description  : 流程模块服务器
 */

import { GameConfig } from "../../config/GameConfig";
import { IGameInfoElement } from "../../config/GameInfo";
import { Player, PlayerData } from "../../Prefabs/GameStater/Script/data/Player";
import { Team } from "../../Prefabs/GameStater/Script/data/Team";
import { LifeState } from "../../Prefabs/GameStater/Script/LifeState";
import { TeamManager } from "../../Prefabs/GameStater/Script/TeamManager";
import { TestMode } from "../../TestMode";
import { ProcessHelper } from "./ProcessHelper";
import ProcessModuleC, { GameInfo } from "./ProcessModuleC";

/**大厅箱子解密的密码数据 */
export type BoxPassword = { singlePasswordIdx: number, singlePassword: number, probability: number }

export default class ProcessModuleS extends ModuleS<ProcessModuleC, null> {

    /** 当前游戏模式 1 竞速 2 淘汰 */
    private _gameMode: number = null;
    /** 游戏配置数据 */
    private _gameCfg: IGameInfoElement = null;

    protected onStart(): void {
        // 读取游戏模式 1 竞速 2 淘汰
        this._gameCfg = GameConfig.GameInfo.getElement(1);
        this._gameMode = this._gameCfg.type;

        // 监听淘汰事件
        Event.addLocalListener("GameState.Knockout.Server", (teamId: string) => {
            this.onGameKnockout(teamId);
        });

        Event.addLocalListener("GameState.RandomMap.Server", (teamId: string) => {
            this.onEnterNewGame(teamId);
        });

        //请求观战列表
        Event.addClientListener("GameState.WatchData", gamePlayer => {
            const data = { 'all': [], 'remove': "" }
            const team = TeamManager.getTeam(gamePlayer.teamId);
            data['all'] = team.players.filter(i => !(i.isEliminate || i.isFinish)).map(i => i.character.gameObjectId);
            (data['aiList'] = team.serverData['aiList']);
            Event.dispatchToClient(gamePlayer, "GameState.WatchData", JSON.stringify(data));
        });

        // 有玩家触碰到监测挂机
        Event.addLocalListener("CheckAfk.server", (playerId: number) => {
            this.checkAfk(playerId);
        });

        Event.addClientListener("rotatePlayer", (player: mw.Player, rot: Rotation) => {
            player.character.worldTransform.rotation = rot;
        });

        Event.addClientListener("ClickGood", (player: mw.Player) => {
            this.getAllClient().net_showGoodClick(player.character.displayName)
            // Event.dispatchToAllClient("ClickGood", player.character.displayName)
        });

        //客户端点击返回
        Event.addClientListener("EnterLobby", (player: mw.Player) => {
            const teamID = player.teamId
            const team = TeamManager.getTeam(teamID);
            let lobbyId = team.serverData['lobbyId'] as string;
            const enterPlayer: Player = team.players.filter(i => i.playerId)[0];

            this.enterLobby(player.playerId, lobbyId, enterPlayer.data);
        });
    }

    /**
     * 判断玩家是否挂机 设置数据
     * @param id 玩家id
     */
    private checkAfk(id: number): void {
        TeamManager.getPlayer(id).then(player => {
            player.data.isAfk = false;
        });
    }

    /**
     * 玩家通关终点
     * @param player 
     */
    public onPlayerFinish(player: Player) {
        const count = player.team.players.filter(i => i.playerId && i.isFinish).length;
        for (let i = 0; i < player.team.players.length; i++) {
            const element = player.team.players[i];
            //更新席位数据
            element.playerId && this.getClient(element.playerId).net_updatePlayerNum(count, player.data.seat, player.character.displayName, player.team.players.length);
        }
    }

    /**
     *  淘汰某个指定玩家
     */
    public eliminatePlayer(player: Player): void {
        const eliminatePlayers = player.team.players.filter(i => i.isEliminate).map(i => i.guid || i.playerId);

        // 如果不是ai通知客户端被淘汰了
        if (player.playerId) {
            this.getClient(player.playerId).net_knockout();
        }

        const data = { 'all': [], 'remove': "", 'eliminateNum': eliminatePlayers.length }
        data['remove'] = player.character.gameObjectId;
        for (let i = 0; i < player.team.players.length; i++) {
            const element = player.team.players[i];
            element.playerId && this.getClient(element.playerId).net_GameStart(JSON.stringify(data));
        }

    }

    /**
     * 请求所有游戏中玩家
     */
    public net_repGameingPlayer(isAIList: boolean): void {
        const data = { 'all': [], 'remove': "", curTime: 0, curState: LifeState.Loading, playerCount: 0, curRound: 0 };
        const teamId = this.currentPlayer.teamId;
        const userId = this.currentPlayer.userId;
        const playerId = this.currentPlayerId;
        const inter = setInterval(() => {
            const team = TeamManager.getTeam(teamId);
            if (team && team.serverData && team.serverData[userId]) {
                clearInterval(inter);
                data['all'] = team.players.map(i => i.character.gameObjectId);
                data.playerCount = team.players.filter(i => i.playerId).length;
                if (isAIList) {
                    data['aiList'] = [];
                    team.serverData['aiList'] && data["aiList"].push(...team.serverData['aiList'] as any);
                    const playerAIList = team.serverData[userId]['aiList'];
                    playerAIList && data["aiList"].push(...playerAIList);
                }
                data.curRound = team.serverData["round"] ? Number(team.serverData["round"]) : 1;
                data.curState = team.state;
                data.curTime = team.passTime;
                this.getClient(playerId).net_GameStart(JSON.stringify(data));
            }
        }, 100);
    }

    /**
     * 淘汰阶段
     */
    private onGameKnockout(teamId: string) {
        const team = TeamManager.getTeam(teamId);
        const allPlayers = team.players;
        const seats = GameConfig.GameInfo.getElement(1).seats;
        const winPlayers: number[] = [];
        const losePlayers: number[] = [];
        for (let i = 0; i < allPlayers.length; ++i) {
            const player = allPlayers[i];
            if (player.playerId) {
                const loc = seats[player.data.seat];
                if (player.isFinish && !player.isEliminate || player.isTeamWin) {
                    winPlayers.push(player.playerId);
                } else {
                    losePlayers.push(player.playerId);
                }
            }
        }
        for (let i = 0; i < allPlayers.length; ++i) {
            const player = allPlayers[i];
            if (player.playerId) {
                Event.dispatchToClient(player.character.player, "ResultGamePlayerInfo", winPlayers, losePlayers);
            }
        }
    }



    /**
     * 进入下个游戏
     */
    private onEnterNewGame(teamId: string): void {

        const team = TeamManager.getTeam(teamId);
        let lobbyId = team.serverData['lobbyId'] as string;

        if (TestMode.testMode) {
            lobbyId = "1";
        }
        // console.log("round:" + team.serverData["round"])
        // 是否是决赛 决赛完毕全回大厅
        if (team.serverData["round"] == 2) {
            setTimeout(() => {
                const pList: Player[] = team.players.filter(i => i.playerId);
                this.enterLobbyFinal(team, pList, lobbyId);
            }, 3000);

        } else {
            team.serverData["round"] = 2;

            // 不是决赛 判断游戏模式
            if (this._gameMode == 1 || this._gameMode == 3) {
                //组合过关AI
                const passedAI = team.winNPCList.filter(i => i.isFinish && i.guid).map(i => i.data);
                team.serverData['aiList'] = passedAI;

                // 胜利了的去下一关
                this.nextStage(team, lobbyId, team.players.filter(i => (i.isFinish || i.isTeamWin) && i.playerId));
                // 没过终点的就回大厅了,组队OR单人
                this.backLobby(team, lobbyId, team.players.filter(i => !(i.isFinish || i.isTeamWin) && i.playerId));
            } else {
                //组合过关AI
                const passedAI = team.winNPCList.filter(i => !i.isEliminate && i.guid).map(i => i.data);
                team.serverData['aiList'] = passedAI;

                // 胜利了的去下一关
                this.nextStage(team, lobbyId, team.players.filter(i => (!i.isEliminate || i.isTeamWin) && i.playerId));

                // 没过终点的就回大厅了,组队OR单人
                this.backLobby(team, lobbyId, team.players.filter(i => !(!i.isEliminate || i.isTeamWin) && i.playerId));
            }
        }

    }

    /**
     * 进入下一关
     */
    private nextStage(team: Team, lobbyId: string, players: Player[]) {
        const playerIds = [];
        for (const pass of players) {
            if (!playerIds.includes(pass.playerId.toString())) {
                playerIds.push(pass.playerId.toString());
                if (pass.winNpcs.length > 0) {
                    team.serverData[pass.userId]["aiList"] = pass.winNpcs;
                }
            }
            if (pass.data.team) {
                Event.dispatchToLocal("Team.Jump", pass.data.team[0]);
                for (const teamMember of pass.data.team) {
                    const playerId = ProcessHelper.getPlayerId(teamMember)
                    if (playerId && !playerIds.includes(playerId.toString())) {
                        playerIds.push(playerId.toString());
                        const teamPlayer = team.getPlayer(mw.Player.getPlayer(playerId));
                        if (teamPlayer && pass.winNpcs.length > 0) {
                            team.serverData[teamMember]["aiList"] = teamPlayer.winNpcs;
                        }
                    }
                }
            }
        }
        console.log("SuccessJump", playerIds, JSON.stringify(team.serverData))
        playerIds.length > 0 && ProcessHelper.enterNewGame(team.serverData['finalId'].toString(), playerIds, team.serverData);
    }

    private backLobby(team: Team, lobbyId: string, players: Player[]) {
        const teamPlayers: Player[] = [];
        //单人跳回大厅
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (!player.data.team || player.data.team.length == 0) {
                this.enterLobby(player.playerId, lobbyId, player.data);
            } else {
                teamPlayers.push(player);
            }
        }
        const jumpMap = new Map<string, Player[]>();
        for (let i = 0; i < teamPlayers.length; i++) {
            //按本来的队伍分配跳转
            let jumpTeam = jumpMap.get(teamPlayers[i].data.team[0]);
            if (!jumpTeam) {
                jumpTeam = [];
                jumpMap.set(teamPlayers[i].data.team[0], jumpTeam);
            }
            jumpTeam.push(teamPlayers[i]);
        }
        for (const [headUserId, players] of jumpMap) {
            Event.dispatchToLocal("Team.Jump", headUserId);
            const serverData = {};
            for (let i = 0; i < players.length; i++) {
                serverData[players[i].userId] = {
                    fristRank: players[i].data.fristRank ? players[i].data.fristRank : 0,
                    finalRank: 0,
                    isAfk: players[i].data.isAfk,
                    exGold: players[i].data.exGold ? players[i].data.exGold : 0,
                    boxPassword: players[i].data.boxPassword
                }
            }
            ProcessHelper.enterNewGame(lobbyId.toString(), players.map(i => i.playerId.toString()), serverData);
        }
    }
    /**
     * 根据组队情况跳回大厅
     * @param pList 
     * @param lobbyId 
     */
    public enterLobbyFinal(team: Team, players: Player[], lobbyId: string) {

        delete team.serverData["aiList"];
        const teamPlayers: Player[] = [];
        //单人跳回大厅
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (!player.data.team || player.data.team.length == 0) {
                this.enterLobby(player.playerId, lobbyId, player.data);
            } else {
                teamPlayers.push(player);
            }
        }
        const jumpMap = new Map<string, Player[]>();
        for (let i = 0; i < teamPlayers.length; i++) {
            //按本来的队伍分配跳转
            let jumpTeam = jumpMap.get(teamPlayers[i].data.team[0]);
            if (!jumpTeam) {
                jumpTeam = [];
                jumpMap.set(teamPlayers[i].data.team[0], jumpTeam);
            }
            jumpTeam.push(teamPlayers[i]);
        }
        for (const [headUserId, players] of jumpMap) {
            Event.dispatchToLocal("Team.Jump", headUserId);
            const serverData = {};
            for (let i = 0; i < players.length; i++) {
                serverData[players[i].userId] = {
                    fristRank: 1,
                    finalRank: players[i].data.finalRank ? players[i].data.finalRank : 0,
                    isAfk: false,
                    exGold: players[i].data.exGold ? players[i].data.exGold : 0,
                    boxPassword: players[i].data.boxPassword
                }
            }
            ProcessHelper.enterNewGame(lobbyId.toString(), players.map(i => i.playerId.toString()), serverData);
        }

        // delete team.serverData["aiList"];
        // const jumpPlayers: string[] = [];
        // for (let i = 0; i < players.length; i++) {
        //     const player = players[i];
        //     if (player.data.team) {
        //         jumpPlayers.push(player.playerId.toString());
        //         team.serverData[player.userId] = {
        //             team: player.data.team,
        //             fristRank: 1,
        //             finalRank: player.data.finalRank ? player.data.finalRank : 0,
        //             isAfk: false,
        //             exGold: player.data.exGold ? player.data.exGold : 0
        //         }
        //     } else {
        //         this.enterLobby(player.playerId, lobbyId, player.data);
        //     }
        // }
        // console.log('LobbyJump', jumpPlayers, JSON.stringify(team.serverData))
        // jumpPlayers.length > 0 && ProcessHelper.enterNewGame(lobbyId.toString(), jumpPlayers, team.serverData);
    }
    /**
     * 通知玩家进入大厅
     */
    private enterLobby(playerId: number, lobbyId: string, data: PlayerData): void {
        //私人跳回大厅
        console.log("LobbySingle", playerId, JSON.stringify(data));
        const player = this.getClient(playerId);
        player.net_enterLobby(lobbyId, data.fristRank, data.finalRank, data.isAfk, data.exGold, data.boxPassword);
    }

    /**
     * 获取本局游戏数据
     * @returns seat round teamPlayerNum
     */
    public async net_getGameInfo() {
        let player = await TeamManager.getPlayer(this.currentPlayerId)
        if (!player) {
            return [0, 0, 0];
        }
        // 真人玩家
        let realNum = 0;
        if (player.team && player.team.players) {
            for (let index = 0; index < player.team.players.length; index++) {
                const role = player.team.players[index];
                if (role.playerId) {
                    realNum++;
                }
            }
        }

        const result: GameInfo = { seat: 0, round: 0, teamPlayerNum: 0 };
        result.seat = player.data.seat;
        result.round = player.team.serverData['round'] ? Number(player.team.serverData['round']) : 1;
        result.teamPlayerNum = realNum;

        if (TestMode.testMode) {
            let players = mw.Player.getAllPlayers();
            for (let i = 0; i < players.length; i++) {
                if (this.currentPlayerId == players[i].playerId) {
                    player.data.seat = i;
                    result.seat = i;
                }
            }
        }

        return [result.seat, result.round, result.teamPlayerNum];
    }
    /**
     * 获取玩家装座位以及扮模块相关数据
     * @returns skinId garnitureId
     */
    private loopSeat: number = 0;
    public async net_getPlayerDressInfo() {
        let player = await TeamManager.getPlayer(this.currentPlayerId);
        const seat = this.loopSeat % 8;
        this.loopSeat++;
        if (player) return [player.data.skinId, player.data.garnitureId, player.data.title, seat];
        return [player.data.skinId, player.data.garnitureId, player.data.title, seat];
    }
    /**
     * 获取玩家拥有的表情
     * @returns 表情数组
     */
    public async net_getPlayerEmoji() {
        let player = await TeamManager.getPlayer(this.currentPlayerId);
        if (player) return player.data.emoji;
        return [];
    }
    /**
     * 获取玩家拥有的动作
     * @returns 动作数组
     */
    public async net_getPlayerAnims() {
        let player = await TeamManager.getPlayer(this.currentPlayerId);
        if (player) return player.data.anims;
        return [];
    }

    net_getPlayerPassword() {
        let team = TeamManager.getTeam(this.currentPlayer.teamId)
        if (team) {
            const teamPlayer = team.getPlayer(mw.Player.getPlayer(this.currentPlayerId));
            if (teamPlayer) return teamPlayer.data.boxPassword;
        } else {
            return null;
        }
    }

    net_setPlayerPassword(probability: number) {
        let team = TeamManager.getTeam(this.currentPlayer.teamId)
        if (team) {
            const teamPlayer = team.getPlayer(mw.Player.getPlayer(this.currentPlayerId));
            if (teamPlayer) teamPlayer.data.boxPassword.probability = probability
        }
    }
}
