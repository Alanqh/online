import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-04-19 15:41:30
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-18 11:16:37
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GameStater\Script\TeamManager.ts
 * @Description  : 修改描述
 */
import { AIData } from "../../../../JavaScripts/RouteData";
import { CLAI } from "../../../AI/client/ClientAIService";
import { GameConfig } from "../../../config/GameConfig";
import { MGSCore } from "../../../mgs/MGSCore";
import { SceneJumpService } from '../../../modScene/SceneJumpMgr';
import ProcessModuleS from "../../../modules/ProcessModule/ProcessModuleS";
import { CountDownUI } from "../../../modules/ProcessModule/UI/CountDownUI";
import { TestMode } from "../../../TestMode";
import { Singleton } from "../../../tool/Singleton";
import LevelChooseUI from '../../../UI/LevelChooseUI';
import { VerHelper } from '../../../VerHelper';
import { Player } from "./data/Player";
import { GameDataConfig, Team } from "./data/Team";
import { LifeState } from "./LifeState";
const NO_TEAMID: number = -102;
const NO_TEAMDATA: number = -100;
const NO_TEAMFORPLAYER: number = -103;
export namespace TeamManager {

    /**
     * 当前所有队伍信息
     */
    export const teams: Team[] = [];
    export let config: GameDataConfig;
    let AIListClientData: AIData[] = null;
    /**
     * 获取玩家/NPC所在的队伍
     * @param id 
     */
    export function getPlayerTeam(id: string | number) {
        if (typeof (id) == "number") {
            return teams.find(t => t.players.find(i => i.playerId == id));
        } else {
            return teams.find(t => t.players.find(i => i.guid == id));
        }
    }
    /**
     * 获取玩家/NPC所在的队伍,可能为空
     * @param id 
     */
    export async function asyncGetPlayerTeam(id: string | number) {
        return new Promise<Team>((res) => {
            let maxTime = 100;
            const inter = setInterval(() => {
                const team = getPlayerTeam(id);
                if (team) {
                    clearInterval(inter);
                    res(team);
                }
                else if (maxTime-- <= 0) {
                    clearInterval(inter);
                    res(null);
                }
            }, 100);
        });
    }
    /**
    * 获取玩家/NPC所在对应的玩家对象
    * @param id 
    */
    export async function getPlayer(id: string | number) {
        return new Promise<Player>((res) => {
            let player = null;
            const inter = setInterval(() => {
                for (let i = 0; i < teams.length; i++) {
                    if (typeof (id) == "number") {
                        player = teams[i].players.find(i => i.playerId == id);
                    } else {
                        player = teams[i].players.find(i => i.guid == id);
                    }
                    if (player) {
                        clearInterval(inter);
                        res(player);
                        break;
                    }
                }
            }, 100);
        });

    }
    // export async function getUserId(player: mw.Player) {
    //     try {
    //         //这里有可能出错，等待直到完成
    //         player.userId;
    //     } catch (error) {
    //         return new Promise((res) => {
    //             const inter = setInterval(() => {
    //                 try {
    //                     player.userId;
    //                     clearInterval(inter);
    //                     res(true);
    //                 } catch (error) {
    //                 }
    //             }, 50)
    //         });
    //     }
    //     return true;
    // }
    async function getTeamData(teleportId: string) {
        let maxTry = 10;
        return new Promise((res) => {
            const inter = setInterval(() => {
                const data = SceneJumpService.getJumpData(teleportId) // RouteService.getTeamCarryingData(teamdId);
                maxTry--;
                if (data || maxTry <= 0) {
                    clearInterval(inter);
                    res(data);
                }
            }, 500)
        });

    }
    export async function addPlayer(userId: string, teleportId: string, player: mw.Player) {
        let data = null;
        if (SystemUtil.isServer() && !TestMode.testMode) {
            data = await getTeamData(teleportId);
            if (!data) {
                Event.dispatchToClient(player, "TeamId.Undefined", NO_TEAMDATA);
                return null;
            }
        }
        let team = teams.find(i => i.teamId == teleportId);
        if (!team) {
            team = new Team(teleportId, data, config);
            teams.push(team);
            team.start();
        } else {
            // team.reset();
        }
        const lplayer = team.addPlayer(player, userId);
        return lplayer;
    }
    function removePlayer(player: mw.Player) {
        for (let i = 0; i < teams.length; i++) {
            const index = teams[i].players.findIndex(i => i.playerId == player.playerId);
            if (index >= 0) {
                if (teams[i].players[index].isFinish) {
                    teams[i].passNum--;
                }
                if (GameConfig.GameInfo.getElement(1).type == 2) {
                    if (!teams[i].players[index].isEliminate) {
                        teams[i].players.forEach(player => {
                            player.eliminateRemaind--;
                            Event.dispatchToClient(mw.Player.getPlayer(player.playerId), "Team.Eliminate.Count", player.eliminateRemaind, -1);
                        });
                    }
                }
                teams[i].players.splice(index, 1);
                if (teams[i].playerCount == 0) {
                    //队伍没人，移除这个队伍
                    teams.splice(i, 1);
                }
                break;
            }
        }
    }
    /**
     * 返回NPC所在的队伍
     * @param character 
     * @returns 
     */
    function getNpcTeam(character: Character) {
        for (let i = 0; i < teams.length; i++) {
            const player = teams[i].players.find(i => i.guid == character.gameObjectId);
            if (player) {
                return teams[i];
            }
        }
        return null;
    }

    /**
     * 到达目标点
     * @param rank 
     * @param guid 
     */
    export function playerWin(guid: string | number) {
        for (let i = 0; i < teams.length; i++) {
            let player: Player = null;
            if (typeof (guid) == "number") {
                player = teams[i].players.find(i => i.playerId == guid);
            } else {
                player = teams[i].players.find(i => i.guid == guid);
            }
            if (player && !player.isFinish && !teams[i].isFinish) {
                if (PlayerManagerExtesion.isNpc(player.character)) {
                    teams[i].addWinNpc(player.character);
                }
                const hallTeam = player.data.team;
                if (hallTeam) {
                    for (let k = 0; k < hallTeam.length; k++) {
                        const teamPlayer = player.team.players.find(p => p.userId == hallTeam[k]);
                        if (teamPlayer && !teamPlayer.isTeamWin) {
                            teams[i].passNum++;
                            if (teams[i].serverData.round != 2) {
                                //第二轮不广播
                                Event.dispatchToClient(mw.Player.getPlayer(teamPlayer.playerId), "Team.Passed", player.playerId, hallTeam);
                            }
                            teamPlayer.isTeamWin = true;
                        }
                    }

                } else {
                    teams[i].passNum++;
                }
                teams[i].playerFinish(player);
                ModuleService.getModule(ProcessModuleS).onPlayerFinish(player);
                teams[i].currentRank++;
                break;
            }
        }
    }

    /**
     * 获取队伍信息
     * @param teamId 
     */
    export function getTeam(teamId: string) {
        return teams.find(i => i.teamId == teamId);
    }
    /**
     * 更新入口
     * @param dt 
     */
    export function onUpdate(dt: number) {
        for (let i = 0; i < teams.length; i++) {
            if (!teams[i].isDispose) {
                teams[i].onUpdate(dt);
            } else {
                teams.splice(i, 1);
                i--;
            }

        }
    }
    function eliminate(guid: string) {
        const character = GameObject.findGameObjectById(guid) as Character;
        let team: Team = null;
        if (character.player) {
            team = getPlayerTeam(character.player.playerId);
        } else {
            team = getPlayerTeam(character.gameObjectId);
        }
        if (team) {
            team.eliminate(guid);
        }
        return team
    }

    if (SystemUtil.isPIE) {
        Event.addLocalListener("Round.Set", (round: number) => {
            TestMode.testRound = round;
        })
    }
    /**
     * 返回大厅错误码
     * const NO_TEAMID: number = -102;
     * const NO_TEAMDATA: number = -100;
       const NO_TEAMFORPLAYER: number = -103;
     * 
     */
    function jumpBackLobby(reason: number) {
        Singleton.getIns(MGSCore).coreStep(reason);
        let uinode = UIService.getUI(LevelChooseUI);
        if (uinode) {
            uinode.tipsRoot.visibility = mw.SlateVisibility.Visible;
            uinode.btnBacklobby.onClicked.add(() => {
                backLobby(VerHelper.HallName, mw.Player.localPlayer.userId);
            })
        } else {
            backLobby(VerHelper.HallName, mw.Player.localPlayer.userId);
        }
    }
    function backLobby(sceneName: string, user: string) {
        SceneJumpService.jumpToScene([user], sceneName, {});
        // const lobbyIds = [];
        // const cfg = GameConfig.VerCfg.getElement(1);
        // if (LanUtils.getLanguageEv() == 1) {
        //     lobbyIds.push(cfg.enValue, cfg.chValue);
        // } else {
        //     lobbyIds.push(cfg.chValue, cfg.enValue);
        // }
        // let jumpIndex = 0;
        // RouteService.requestGameId(lobbyIds[jumpIndex++]).then((gameId) => {
        //     RouteService.enterNewGame(gameId);
        // });
        // //定时跳转，确保跳转回大厅
        // setInterval(() => {
        //     if (jumpIndex >= lobbyIds.length) {
        //         jumpIndex = 0;
        //     }
        //     RouteService.requestGameId(lobbyIds[jumpIndex++]).then((gameId) => {
        //         RouteService.enterNewGame(gameId);
        //     });
        // }, 3000);
    }
    export function init(_config: GameDataConfig) {
        config = _config;
        // if (SystemUtil.isServer()) {
        //     const players = Player.getAllPlayers();
        //     for (const player of players) {
        //         addPlayer(player, AIListClientData);
        //     }
        // }
        if (SystemUtil.isServer()) {

            Event.addClientListener("Player.Join", (player, userId: string, teleportId: string) => {
                addPlayer(userId, teleportId, player);
            });
            Event.addClientListener("Player.CheckPointPassed.Server", (player: mw.Player) => {
                const playerTeam = teams.find(t => t.players.find(i => i.playerId == player.playerId));
                if (playerTeam) {
                    playerTeam.checkPassed(player);
                }

            });
            mw.Player.onPlayerLeave.add(player => {
                removePlayer(player);
            });
            Event.addClientListener("AI.Pass.Client", (player: mw.Player, characterName: string, index: number, skinId: number, garnitureId: number, guid: string, id: number) => {
                const playerTeam = teams.find(t => t.players.find(i => i.playerId == player.playerId));
                if (playerTeam) {
                    playerTeam.onAIPassed(id);
                    playerTeam.getPlayer(player).addWinNpc(characterName, index, skinId, garnitureId, guid);
                    playerTeam.currentRank++;
                }
            });
            Event.addClientListener("AI.Eliminate.Client", (player: mw.Player, characterName: string, index: number, skinId: number, garnitureId: number, guid: string) => {
                const playerTeam = teams.find(t => t.players.find(i => i.playerId == player.playerId));
                if (playerTeam) {
                    playerTeam.getPlayer(player).eliminateRemaind--;
                    let minRemaindCount = 100;
                    const livePlayerCount = playerTeam.players.filter(i => i.playerId && !i.isEliminate).length;
                    playerTeam.players.forEach(player => {
                        if (player.playerId) {
                            minRemaindCount = Math.min(minRemaindCount, player.eliminateRemaind);
                        }
                    });
                    console.log("remaindplayer", livePlayerCount, "remandallCount", minRemaindCount)
                    playerTeam.players.forEach(player => {
                        if (player.playerId) {
                            player.eliminateRemaind = minRemaindCount;
                            Event.dispatchToClient(mw.Player.getPlayer(player.playerId), "Team.Eliminate.Count", minRemaindCount, minRemaindCount - livePlayerCount);
                        }
                    });
                }
                // if (SystemUtil.isServer() && playerId) {
                //     Event.addLocalListener("Player.Eliminate." + playerId, () => {
                //         this.eliminateRemaind--;
                //     });
                // }
                // Event.dispatchToLocal("Player.Eliminate." + player.playerId);
            });
            Event.addClientListener("GameState.EliminatePlayer.Server", (player: mw.Player, guid: string) => {
                // eliminate(guid);
                for (const team of teams) {
                    const player = team.players.find(i => i.character.gameObjectId == guid);
                    if (player) {
                        if (player.isEliminate) return;
                        team.players.forEach(player => {
                            if (player.playerId) {
                                player.eliminateRemaind--;
                            }
                        });
                        player.isEliminate = true;

                        let minRemaindCount = 100;
                        team.players.forEach(player => {
                            if (player.playerId) {
                                minRemaindCount = Math.min(minRemaindCount, player.eliminateRemaind);
                            }
                        });

                        team.players.forEach(player => {
                            if (player.playerId) {
                                Event.dispatchToClient(mw.Player.getPlayer(player.playerId), "Team.Eliminate.Count", minRemaindCount, -1, guid);
                            }
                        });

                        ModuleService.getModule(ProcessModuleS).eliminatePlayer(player);
                        break;
                    }
                }
            });
        } else {
            //只需要监听一次
            let once = Event.addServerListener("TeamId.Undefined", (reason: number) => {
                jumpBackLobby(reason);
                once.disconnect();
            });
            mw.Player.asyncGetLocalPlayer().then(player => {
                const serverInter = setInterval(() => {
                    if (player.userId && player.teleportId) {
                        clearInterval(serverInter);
                        Event.dispatchToServer("Player.Join", player.userId, player.teleportId);
                    }
                }, 3000);
                let maxRetry = 50;
                const inter = setInterval(() => {
                    if (player.userId && player.teleportId) {
                        addPlayer(player.userId, player.teleportId, player);
                        clearInterval(inter);
                    } else if (maxRetry-- <= 0) {
                        jumpBackLobby(NO_TEAMID);
                        clearInterval(inter);
                    }
                }, 200);
            });
            Event.addLocalListener("Character_Pass_Score_Mode", (playerId: number, guid: string) => {
                if (playerId) {
                    for (const team of teams) {
                        const player = team.players.find(i => i.character.gameObjectId == guid);
                        if (player && playerId == player.playerId) {
                            Event.dispatchToServer("FinishLine.Pass.ClientToServer", playerId);
                            Event.dispatchToLocal("FinishLine.Pass.Client", player.character.gameObjectId);
                        }
                    }
                }
                else if (guid) {
                    const robot = CLAI.getAllRobots().find(i => i.character.gameObjectId == guid);
                    if (robot) {
                        Event.dispatchToServer("FinishLine.Pass.ClientToServer", guid);
                        Event.dispatchToLocal("FinishLine.Pass.Client", guid);
                    }
                }
            });
        }
        Event.addLocalListener("FinishLine.Pass.Server", (guid: string | number) => {
            playerWin(guid);
        });
        Event.addClientListener("FinishLine.Pass.ClientToServer", (player, guid: string | number) => {
            playerWin(guid);
        });
        Event.addClientListener("TeamState.Ask", (player: mw.Player) => {
            asyncGetPlayerTeam(player.playerId).then(team => {
                if (team) {
                    Event.dispatchToClient(player, "TeamState.Answer", team.state, team.curRound, team.passTime);
                } else {
                    Event.dispatchToClient(player, "TeamId.Undefined", NO_TEAMFORPLAYER);
                }
            });
        });
        Event.addClientListener("RESULT_ALL_LIKE_COUNT", (player: mw.Player, count: number) => {
            let team = getPlayerTeam(player.playerId);
            if (team) {
                let playerData = team.serverData[player["getUserId"]()];
                if (playerData) {
                    if (!playerData["like"]) {
                        playerData["like"] = 0;
                    }
                    playerData["like"] += count;
                }
            }

        });
        Event.addLocalListener("AI.Created.Server", (character: Character, dist: mw.Vector, cfg: any) => {
            getTeam(cfg.teamId).addNpc(character, cfg);
        });
        Event.addLocalListener("GameState.Gameing.Server", (teamId: string) => {
            setTimeout(() => {

                const team = teams.find(i => i.teamId == teamId);
                if (team) {
                    for (const player of team.players) {
                        if (player.character["ai"]) {
                            player.character["ai"].respawn();
                        }
                    }
                }
            }, 1000);
        });

        Event.addLocalListener("AI.Recycle.Server", (character: Character) => {
            character.switchToFlying();
            character.worldTransform.position = new Vector(0, 0, -10000);
            const team = getNpcTeam(character);
            if (team) {
                ModuleService.getModule(ProcessModuleS).eliminatePlayer(team.players.find(i => i.character == character));
                // team.addWinNpc(character);
            }

        });
        Event.addLocalListener("AI.Reuse.Server", (character: Character) => {
            const team = getNpcTeam(character);
            if (team) {
                ModuleService.getModule(ProcessModuleS).eliminatePlayer(team.players.find(i => i.character == character));
                team.removeNpc(character);
            }

        });
        Event.addServerListener("GameState.EliminatePlayer.Client", (guid: string) => {
            eliminate(guid);
        });
    }

    Event.addClientListener("PlayerCount.FixReq", (player, teamId: string) => {
        const team = getTeam(teamId);
        let playerCount = team.playerCount;
        Event.dispatchToClient(player, "PlayerCount.FixReq", playerCount);
    });
    Event.addServerListener("PlayerCount.FixReq", (playercount: number) => {
        for (const team of teams) {
            team.clientPlayerCount = playercount;
        }
        Event.dispatchToLocal("UpdateGamePlayerCount");
    });
    Event.addLocalListener("GameState.ResGamingCharacter", (data: any) => {
        if (!data['aiList']) return;
        AIListClientData = data['aiList'];
        AIListClientData.forEach(aiData => {
            CLAI.createAI(aiData.name, aiData.skinId, aiData.garnitureId, aiData.seat, aiData.title, (robot) => {
                if (data.curState == LifeState.Gameing && CLAI.dist) {
                    robot.pauseTime = 0;
                    robot.target = CLAI.dist;
                    robot.start();
                }
            });

        });
        for (const team of teams) {
            team.clientPlayerCount = data.playerCount + data.aiList.length;
            team.clientAIData = AIListClientData;
            team.clientCurRound = data.curRound;
            team.state = data.curState;
        }

        if (data.curState == LifeState.Gameing) {
            mw.UIService.show(CountDownUI, Date.now() + (GameConfig.GameInfo.getElement(1).gameTime - data.curTime) * 1000);
        }
    });

}