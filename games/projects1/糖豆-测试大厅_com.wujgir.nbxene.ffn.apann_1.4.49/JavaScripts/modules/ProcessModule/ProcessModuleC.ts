import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
/** 
* @Author       : zhenyu.zhang
* @Date         : 2023-02-08 18:39:47
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-07 11:18:12
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\ProcessModule\ProcessModuleC.ts
* @Description  : 流程模块客户端
*/

import { AIRobot } from "../../AI/client/AIRobot";
import { CLAI } from "../../AI/client/ClientAIService";
import TipsUI from "../../common/Tips";
import { GameConfig } from "../../config/GameConfig";
import EndRankUI from '../../EndRankUI';
import { MGSCore } from "../../mgs/MGSCore";
import { MGSGame } from "../../mgs/MGSGame";
import { MGSWatch } from "../../mgs/MGSWatch";
import { Camera } from "../../Prefabs/CameraRuntime/Script/Camera";
import { recordCharacter } from "../../Prefabs/CheckPoint/Script/CheckPoint";
import { TeamManager } from "../../Prefabs/GameStater/Script/TeamManager";
import { LanUtils } from "../../tool/LanguageUtil";
import { Singleton } from "../../tool/Singleton";
import { Utils } from "../../tool/Utils";
import UIExpression from "../../UI/UIExpression";
import { Tools } from '../../utils/Tools';
import { ProcessHelper } from "./ProcessHelper";
import ProcessModuleS, { BoxPassword } from "./ProcessModuleS";
import { CountDownUI } from "./UI/CountDownUI";
import EndUI from "./UI/EndUI";
import GameUI from "./UI/GameUI";
import OutUI from "./UI/OutUI";
import PassUI from "./UI/PassUI";
import FirstUI from './UI/FirstUI';
import TransitionUI from '../../TransitionUI';

const blockGUID = "8BE22C7542E0AD4C93FFDDB9534854E9";
const winAnimationGUID = "148733";
const winParticleGUID = "73404";
const idleAnimationGUID = "146120";
const jumpAnimationGUID = "14537";

const TEMP = new mw.Vector();
type DropData = {
    npc: Character,
    time: number
}
type ResultUI = {
    ui: new () => mw.UIScript,
    params: any[],
    showTime: number
}

export default class ProcessModuleC extends ModuleC<ProcessModuleS, null> {
    //用于处理AI的淘汰掉落表现
    private drops: DropData[] = [];
    //用于处理AI的淘汰掉落表现
    private _z: number;
    //防止多次冲线
    public _isPass: boolean = false;
    //防止结束之后客户端做冲线表现
    private _inGamingState: boolean = true;
    /** 玩家本局游戏的数据 */
    private _curGameInfo: GameInfo = null;
    private _passByTeamId: number = 0;
    /**开始的时间 */
    private _startTime: number = Date.now();
    /**是否在321到结束之间，埋点用 */
    private _isGaming: boolean = false;
    private _checkInterval: number = 10;
    /**结果UI队列 */
    private _resultUIs: ResultUI[] = [];
    private _isShowUI: boolean = false;
    /**排名，埋点用 */
    private _ranks: { guid: string, checkPoint: number }[] = [];

    private _lastTargetArmLen
    private _lastWorldLocation
    private _lastWorldRotation

    private _aiCount = 0
    private _aiName = []

    private _finalRank = 6
    private _firstID: number
    private isPlayerEliminate = false;
    private _passCheckPoint: number[] = [];

    /** 是否进入结算（淘汰关可以从离开观战进入结算）*/
    private _isInSettle: boolean = false;

    protected onStart(): void {
        Singleton.getIns(MGSGame).saveStartGameStamp();
        AssetUtil.asyncDownloadAsset(winAnimationGUID);
        AssetUtil.asyncDownloadAsset(winParticleGUID);
        AssetUtil.asyncDownloadAsset(idleAnimationGUID);
        AssetUtil.asyncDownloadAsset(jumpAnimationGUID);
        AssetUtil.asyncDownloadAsset("192815");
        AssetUtil.asyncDownloadAsset("192814");
        AssetUtil.asyncDownloadAsset("192821");
        AssetUtil.asyncDownloadAsset("192809");
        AssetUtil.asyncDownloadAsset("192804");
        AssetUtil.asyncDownloadAsset("192817");

        // Event.dispatchToServer("GameState.ReqGamingCharacter");
        this.server.net_repGameingPlayer(true);
        Event.addLocalListener("Eliminate_Self_Character", () => {
            this.onCharacterEliminate();
        });

        mw.UIService.show(GameUI);

        Camera.getPlayer().onComplete.add(() => {
            // GameCamera.setCameraParam(mw.Camera.currentCamera);
            let camera = mw.Camera.currentCamera;
            let trans = camera.springArm.localTransform.clone();
            trans.position = GameConfig.CameraConfig.getElement(1).cameraRelativeLocation;
            let rot = GameConfig.CameraConfig.getElement(1).cameraRelativeRotation;
            trans.rotation = Player.localPlayer.character.worldTransform.getForwardVector().toRotation();
            trans.rotation.add(new mw.Rotation(rot.x, rot.y, rot.z));
            camera.springArm.localTransform = trans;
            camera.springArm.length = GameConfig.CameraConfig.getElement(1).targetArmlength;
            camera.upAngleLimit = 60;
            camera.downAngleLimit = 0;
            trans.rotation.y = -30;
            Player.setControllerRotation(trans.rotation);
        })
        Event.addLocalListener("FinishLine.Pass.Client", (guid: string) => {

            if (this._inGamingState == false) {
                return;
            }
            //FIXME 可能会多次触发
            if (Player.localPlayer.character.gameObjectId == guid) {
                if (this._curGameInfo.round == 2) {
                    //如果第二轮到了终点，判定为胜利
                    this._finalRank = 1
                }
                if (this._isPass == false) {
                    this.showPassUI(guid, false);
                    this._isPass = true;
                    //通关之后隐藏控制
                    Event.dispatchToLocal("SET_CTRL_UI_VISIBLE", false);
                }
                this.selfOnFinishLine();
            }
        });
        Event.addLocalListener("GameState.EliminatePlayer", () => {
            this.isPlayerEliminate = true;
        });
        // Event.addServerListener("ClickGood", () => {
        //     Event.dispatchToLocal("ClickGood", player.character.displayName)
        // });

        Event.addServerListener("Team.Passed", (playerId: number, teams: string[]) => {
            if (this._passByTeamId == 0 && teams.includes(this.localPlayer.userId)) {
                this._passByTeamId = playerId;
            }
        });
        /**
         * 是角色就只有playerId参数
         * 是NPC就只有npcGuid, skinId, name 参数
         */
        Event.addServerListener("SHOW_GAME_CHAMPOIN", async (playerId: number, npcGuid: string, skinId: number, name: string) => {
            // 通过观战点击进入结算，就不走冠军流程了。
            if (this._isInSettle) return;
            let winName = ""
            let winSkin = "156363"
            if (this._curGameInfo.round == 2) {
                this._firstID = playerId
                let character: Character = null;
                if (playerId) {
                    // 根据是否是冠军显示UI
                    if (playerId !== this.localPlayerId) {
                        // 不是冠军，显示淘汰UI，淘汰赛就不显示了，死亡的时候显示过了
                        if (GameConfig.GameInfo.getElement(1).type !== 2) {
                            this._resultUIs.push({ ui: OutUI, params: [], showTime: 2 })
                        }
                    } else {
                        // 是冠军，且不是竞速赛，显示冠军UI，因为竞速赛冠军UI在冲线时显示
                        if (GameConfig.GameInfo.getElement(1).type !== 1) {
                            this.showPassUI(this.localPlayer.character.gameObjectId, true);
                        }
                    }
                    character = (await Tools.getPlayer(playerId)).character;
                    winSkin = character.description.base.wholeBody;
                    winName = character.displayName
                    character.ragdollEnabled = false;
                }
                if (!character) {
                    let bot: AIRobot = npcGuid ? CLAI.getAICharacter(npcGuid) : null;
                    bot = bot ? bot : CLAI.getWinCharacter();
                    if (bot) {
                        bot.character["isWinner"] = true;
                        bot.character.ragdollEnabled = false;
                        const appearance = bot.character.description;
                        bot.character.setVisibility(mw.PropertyStatus.On, true);
                        skinId && (appearance.base.wholeBody = GameConfig.Item.getElement(skinId).resGUID);
                        name && bot.nameSkin(name);
                        bot.character.worldTransform.position = CLAI.dist;
                        bot.character.addMovement(Vector.forward);
                        winName = bot.character.displayName
                        winSkin = bot.character.description.base.wholeBody;
                        character = bot.character
                    } else {
                        mw.UIService.hide(GameUI);
                        Event.dispatchToLocal("HIDE_HEADANCHOR");
                    }
                    if (GameConfig.GameInfo.getElement(1).type !== 2) {
                        // 非淘汰关AI夺冠，显示淘汰UI
                        this._resultUIs.push({ ui: OutUI, params: [], showTime: 2 })
                    }
                }
                Event.dispatchToLocal("CHAMPION_INIT", winName, winSkin);
                // if (character) {
                //     character.setVisibility(mw.PropertyStatus.On);
                // }
                // const asset: string = "156822";
                // Utils.downloadAsset(asset).then((sucess: boolean) => {
                //     let animation = PlayerManagerExtesion.loadAnimationExtesion(character, asset, false);
                //     animation.loop = 50;
                //     animation.play();
                // })
                // this.cameraMotion(character);
                // setTimeout(() => {
                //     let passTime = Date.now() - this._startTime;
                //     mw.UIService.hide(GameUI);
                //     mw.UIService.show(EndRankUI, passTime);

                //     if (playerId == this.localPlayerId) {
                //         //第一名隐藏点赞按钮
                //         Event.dispatchToLocal("showWinnerEnd", this._aiCount, this._aiName)
                //     }
                //     Event.dispatchToLocal("showEnd", character.player, winName)
                //     character.setVisibility(mw.PropertyStatus.On);
                //     Event.dispatchToLocal("HIDE_HEADANCHOR");


                // }, 2000);

            }

        });

        Event.addLocalListener("CameraCloseUp", () => {
            if (this._finalRank == 1) {
                this.setObjCloseUp(true, null, 0, -100, 250);
            }
        });

        Event.addLocalListener("GameState.End.Client", () => {
            let reason: "DeadOne" | "DeadTwo" | "DeadThree" = "DeadTwo";
            const round: number = this._curGameInfo.round;
            const lvType = GameConfig.GameInfo.getElement(1).type;
            Event.dispatchToServer("RESULT_ALL_LIKE_COUNT", Singleton.getIns(MGSWatch).getLikeCount());
            this._inGamingState = false;
            CLAI.stop();
            const isEliminate = lvType == 2;
            if (!this.isPlayerEliminate && isEliminate) {
                this._isPass = true;
                this._finalRank = 1;
            }
            mw.UIService.hide(UIExpression);
            if (round == 2) {
                Singleton.getIns(MGSCore).coreStep(13);
            } else {
                if (!this._isPass && this._passByTeamId == 0) {
                    if (!isEliminate) {
                        this._resultUIs.push({ ui: OutUI, params: [], showTime: 2 });
                    }
                } else {
                    this.showPassUI(this.localPlayer.character.gameObjectId, true);
                    reason = this.isSelfPass ? "DeadOne" : "DeadThree";
                }
            }
            // 要放在最后
            this.showEndUI(round);

            Singleton.getIns(MGSGame).endGame(round == 2 ? 2 : 1, TeamManager.teams[0].players.filter(i => i.playerId).length, reason);
        });
        Event.addLocalListener("GameState.Dispose.Client", () => {
            setTimeout(() => {
                Singleton.getIns(MGSCore).coreStep(-200);
                const cfg = GameConfig.VerCfg.getElement(1);
                this.net_enterLobby(cfg.chValue, 1, 3, false, 10, { singlePasswordIdx: null, singlePassword: null, probability: 0 });
                this.net_enterLobby(cfg.enValue, 1, 3, false, 10, { singlePasswordIdx: null, singlePassword: null, probability: 0 });
            }, 15000);
        });
        Event.addLocalListener("GameState.Knockout.Client", () => {
            Event.dispatchToLocal("CAMERA_DELAY_UPDATE", false);
            mw.UIService.hide(CountDownUI)
            mw.UIService.hide(EndUI);
            this.changeCameraToKnock();
            this.movePlayerToSeat();
        });

        Event.addLocalListener("Player.Death.Client", (guid: string) => {
            if (Player.localPlayer.character.gameObjectId == guid) {
                Singleton.getIns(MGSGame).playerDead();
            }
        });


        Event.addServerListener("ResultGamePlayerInfo", (winPlayers: number[], losePlayer: number[]) => {
            Event.dispatchToLocal("GameState.UpdateWinNum", winPlayers.length);
            //赢了的人
            for (let i of winPlayers) {
                const player = Player.getPlayer(i);
                this.onCharacterResult(player.character, true);
            }
            //赢了的AI
            this.moveAIByResult(true);
            //输了的AI
            for (let i of losePlayer) {
                const player = Player.getPlayer(i);
                this.onCharacterResult(player.character, false);
            }
            //输了的AI
            this.moveAIByResult(false);
        })

        // 排名埋点
        Event.addLocalListener("EnterPointClient", async (guid: string, checkPoint: number, isSelf: boolean) => {
            if (!this._inGamingState || Math.floor(checkPoint) !== checkPoint) return;
            let rank = this._ranks.find(i => i.guid === guid);
            let num = 0;
            if (rank) {
                if (rank.checkPoint === checkPoint) return;
                const index = this._ranks.indexOf(rank);
                this._ranks.splice(index, 1);
                rank.checkPoint = checkPoint;
                if (this._ranks.length === 0 || checkPoint <= this._ranks[this._ranks.length - 1].checkPoint) {
                    this._ranks.push(rank);
                    num = this._ranks.length;
                } else {
                    for (let i = 0; i < this._ranks.length; i++) {
                        if (this._ranks[i].checkPoint < checkPoint) {
                            this._ranks.splice(i, 0, rank);
                            num = i + 1;
                            break;
                        }
                    }
                }
            } else {
                this._ranks.push({ guid: guid, checkPoint: checkPoint });
                num = this._ranks.length;
            }
            if (isSelf) {
                Singleton.getIns(MGSGame).saveLastCheckPoint(checkPoint);
                let round = this._curGameInfo ? this._curGameInfo.round : 0;
                Singleton.getIns(MGSGame).postCheckPointTime(checkPoint, round, num, recordCharacter.lastRank - num);
                recordCharacter.lastRank = num;

                //获取密码相关逻辑, 第一个存档点不能获取直接
                if (checkPoint != 1) {
                    if (this._passCheckPoint.indexOf(checkPoint) == -1) {
                        this._passCheckPoint.push(checkPoint);
                        let boxPasswordData = await this.server.net_getPlayerPassword()
                        if (boxPasswordData) {
                            if (boxPasswordData.singlePasswordIdx != undefined && boxPasswordData.singlePasswordIdx != null && boxPasswordData.singlePassword != undefined && boxPasswordData.singlePassword != null) {
                                if (boxPasswordData.probability < 1 && Math.random() <= boxPasswordData.probability) {
                                    TipsUI.show(LanUtils.getLanguage("UI_LOBBY_179").replace("{0}", (boxPasswordData.singlePasswordIdx + 1).toString()).replace("{1}", boxPasswordData.singlePassword.toString()))
                                    this.server.net_setPlayerPassword(1)
                                    Singleton.getIns(MGSGame).gainPassword(boxPasswordData.singlePasswordIdx);
                                }
                            }
                        }
                    }
                }
            }
        })

        Event.addLocalListener("GameState.Gameing.Client", () => {
            //321倒计时结束后游戏开始
            Event.dispatchToLocal("MOVER_RESET");
            this._isGaming = true;
            this._startTime = Date.now();

            //遍历场上玩家数量
            const result = QueryUtil.sphereOverlap(this.localPlayer.character.worldTransform.position, 1000, false);
            //记录本局ai名
            result.forEach(go => {
                if (PlayerManagerExtesion.isNpc(go)) {
                    this._aiCount++;
                    this._aiName.push((go as Character).displayName);
                }
            })
        })

        Event.addLocalListener("LEVEL_SETTLE", () => {
            this._isInSettle = true;
        })

        this.onPlayerSpawn();
    }

    protected onUpdate(dt: number): void {
        // 结果UI显示
        if (this._resultUIs.length > 0) {
            const resultUI = this._resultUIs[0];
            if (this._isShowUI) {
                resultUI.showTime -= dt;
                if (resultUI.showTime <= 0) {
                    UIService.hide(resultUI.ui);
                    this._resultUIs.shift();
                    this._isShowUI = false;
                }
            } else {
                this._isShowUI = true;
                UIService.show(resultUI.ui, ...resultUI.params);
            }
        }

        for (let i = 0; i < this.drops.length; i++) {
            let drop = this.drops[i];
            const transform = this.drops[0].npc.worldTransform;
            if (transform) {
                let z = -0.5 * 3000 * drop.time * drop.time;
                if (!this._z) {
                    this._z = this.drops[0].npc.worldTransform.position.z;
                }
                TEMP.set(drop.npc.worldTransform.position);
                TEMP.z = this._z + z;
                drop.npc.worldTransform.position = TEMP;
                drop.time += dt;
            }
        }

        //发埋点
        if (this._isGaming) {
            this._checkInterval -= dt;
            if (this._checkInterval <= 0) {
                this._checkInterval = 10;
                const result = QueryUtil.sphereOverlap(this.localPlayer.character.worldTransform.position, 1000, false);
                let count = 0;
                result.forEach(go => {
                    if (PlayerManagerExtesion.isCharacter(go) || PlayerManagerExtesion.isNpc(go)) {
                        count++;
                    }
                })
                Singleton.getIns(MGSGame).checkPlayerNum(count, recordCharacter.checkPoint, this._curGameInfo ? this._curGameInfo.round : 0);
            }
        }
    }

    /**
     * 玩家准备好可以接受数据了
     */
    private async onPlayerSpawn(): Promise<void> {
        // 出生直接调用移动位置
        const data = await this.getGameInfo();
        if (!data) return;

        // const cfg = GameConfig.GameInfo.getElement(1).spawns;
        // const seat = this._curGameInfo.seat;
        // const loc = cfg[seat] ? cfg[seat] : cfg[0];
        // console.log("初始化玩家座位", this.currentPlayerId, seat, loc.toString());
        // this.movePLayerToLoc(loc);


        const round = this._curGameInfo.round;
        if (round == 1) {
            Singleton.getIns(MGSCore).coreStep(6);
        } else if (round == 2) {
            Singleton.getIns(MGSCore).coreStep(11);
        }
    }


    public showCLAI() {
        CLAI.stop();
    }
    public moveAIByResult(isWin: boolean) {
        const robots = CLAI.getAllRobots();
        for (let i = 0; i < robots.length; i++) {
            const robot = robots[i];
            if (isWin == robot.isWin) {
                this.onCharacterResult(robot.character, isWin);
            }
        }
    }
    private async showAIModel() {
        this.showCLAI();
        const teleportId = this.localPlayer.teleportId;
        const aiDatas = TeamManager.getTeam(teleportId).clientAIData;
        Event.dispatchToLocal("UpdateAICount", aiDatas.length);
        return;
    }
    /**
     * 角色结算表现
     * @param character 角色
     * @param isWin 是否胜利
     */
    onCharacterResult(character: Character, isWin: boolean) {
        const location = Singleton.getIns(SeatFactory).getSeat();
        if (location) {
            const round = this._curGameInfo.round;
            if (round == 1 && character == this.localPlayer.character) {
                Singleton.getIns(MGSCore).coreStep(10);
                Singleton.getIns(MGSGame).blockEnd(isWin ? 1 : 2);
            }
            if (location) {
                TEMP.set(location.x, location.y, location.z + 120);
                character.worldTransform.rotation = Rotation.zero;
                character.worldTransform.position = TEMP;
                character.switchToFlying();
                SpawnManager.asyncSpawn({ guid: blockGUID, transform: new Transform(location, Rotation.zero, new Vector(1.5, 1.5, 1.5)) }).then(obj => {
                    obj.getChildByName(isWin ? "greenBlock" : "redBlock").asyncReady().then(block => {
                        block.setVisibility(PropertyStatus.On);
                        // block.setCollision(mw.PropertyStatus.On);
                        // TEMP.set(location.x, location.y, location.z + 120);
                        // character.worldTransform.rotation = Rotation.zero;
                        // character.worldTransform.position = TEMP;
                        // character.switchToWalking();
                    });
                    if (isWin) {
                        let ani = PlayerManagerExtesion.loadAnimationExtesion(character, winAnimationGUID, false);
                        if (ani) {
                            ani.loop = 999;
                            ani.play();
                        }
                        SpawnManager.asyncSpawn({ guid: winParticleGUID, replicates: false }).then((particle: Effect) => {
                            if (particle) {
                                particle.worldTransform.position = location;
                                particle.loopCount = 999;
                                particle.play();
                            }
                        })
                    } else {
                        setTimeout(() => {
                            obj.destroy();
                            character.switchToWalking();
                        }, 2000);
                    }
                })
            }
        }
    }



    /**
     * 玩家被淘汰 （主控端设置位置）
     */
    private onKnockoutPlayer(): void {
        //TODO 淘汰
    }

    /**
     * 移动玩家到某个位置
     * @param loc 位置
     */
    private movePLayerToLoc(loc: Vector): void {
        if (loc) {
            Player.asyncGetLocalPlayer().then(player => {
                player.character.worldTransform.position = loc;

            });
        }
    }

    /**
     * 旋转玩家
     * @param rot 
     */
    private rotatePlayer(rot: Rotation): void {
        Event.dispatchToServer("rotatePlayer", rot);
    }


    private showPassUI(guid: string, isEnd: boolean): void {
        let passTime = Date.now() - this._startTime;
        Event.dispatchToLocal("SetSelfTime", passTime);
        this._isGaming = false;

        const curGuid = Player.localPlayer.character.gameObjectId;
        if (this._curGameInfo.round == 2) {
            if (curGuid == guid && !mw.UIService.getUI(FirstUI, false)) {
                this._resultUIs.push({ ui: FirstUI, params: [isEnd ? this._passByTeamId : 0, passTime], showTime: 2 });
                Singleton.getIns(MGSGame).curPlayerFinish();
            }
        } else {
            if (curGuid == guid && !mw.UIService.getUI(PassUI, false)) {
                this._resultUIs.push({ ui: PassUI, params: [isEnd ? this._passByTeamId : 0, passTime], showTime: 2 });
                Singleton.getIns(MGSGame).curPlayerFinish();
            }
        }
    }
    /**
     * 自己冲线上报行为
     */
    private mgsUpload: boolean = false;
    private isSelfPass: boolean = false;
    public selfOnFinishLine() {
        this.isSelfPass = true;
        if (!this.mgsUpload) {
            this.mgsUpload = true;
            const round = this._curGameInfo.round;
            if (round == 1) {
                Singleton.getIns(MGSCore).coreStep(8);
            }
            let passTime = Date.now() - this._startTime;
            Singleton.getIns(MGSGame).passTime(passTime / 1000, this._curGameInfo ? this._curGameInfo.round : 0, this._curGameInfo ? this._curGameInfo.teamPlayerNum : 1);
        }

    }

    private movePlayerToSeat(): void {
        // 显示假AI
        this.showAIModel();
        // const cfg = GameConfig.GameInfo.getElement(1).seats;
        // console.log(this._curGameInfo.seat, "seat number");
        // const loc = cfg[this._curGameInfo.seat];
        // loc.z += 100;
        // this.movePLayerToLoc(loc);
        this.rotatePlayer(new Rotation(0, 0, 0));

        const round = this._curGameInfo.round;
        if (round == 1) {
            Singleton.getIns(MGSCore).coreStep(9);
        }
    }

    private showEndUI(round: number): void {
        // 已经进入结算的，就不走这了
        if (this._isInSettle) return;
        let time = this._isPass ? 3 : 2;
        this._resultUIs.push({ ui: EndUI, params: [], showTime: time });
        const interval = setInterval(() => {
            if (this._resultUIs.length == 0) {
                // 当所有弹窗UI弹完后
                clearInterval(interval);
                if (round == 2) {
                    // 第二轮显示冠军结算
                    Event.dispatchToLocal("CHAMPION_SHOW");
                } else {
                    // 第一轮显示加载UI
                    UIService.show(TransitionUI);
                }
            }
        }, 1);
    }

    public net_showGoodClick(name: string) {
        if (this._firstID == this.localPlayerId) {
            Event.dispatchToLocal("showGoodClick", name);
        }
    }

    /**
     * 给本地ai换装
     * @param character ai
     * @param skinId ai 皮肤
     */
    private changeClothByCharacter(character: Character, skinId: number) {
        const cfg = GameConfig.Item.getElement(skinId);
        const guid = cfg.resGUID;
        character.description.base.wholeBody = guid;
    }

    /**
     * 将人物摄像机移动到指定位置
     */
    private changeCameraToKnock(): void {
        const curPlayer = Player.localPlayer;
        const camera = mw.Camera.currentCamera;

        curPlayer.character.ragdollEnabled = false;
        curPlayer.character.switchToFlying();
        // let ani = PlayerManagerExtesion.loadAnimationExtesion(curPlayer.character, idleAnimationGUID, true);
        // ani.loop = 0;
        // ani.play();

        const orgPos = GameConfig.GameInfo.getElement(1).seatPoint.clone();
        orgPos.x = 10600;
        orgPos.z = 10350;

        SpawnManager.asyncSpawn({ guid: "Anchor", transform: new Transform(orgPos, Rotation.zero, Vector.one) }).then((go) => {
            go.worldTransform.position = orgPos;
            curPlayer.character.worldTransform.rotation = (Rotation.zero);
            camera.springArm.length = CLAI.isActive() ? 900 : 500;
            ModifiedCameraSystem.followTargetInterpSpeed = 0;
            ModifiedCameraSystem.setCameraFollowTarget(go)
            ModifiedCameraSystem.setOverrideCameraRotation(new Rotation(0, -28, -180));
        });

        Event.dispatchToLocal("PLAY_BY_CFG", 14);
    }

    /**
     * 小游戏开始 同步所有玩家信息
     * @param data 所有玩家数据 { 'all':string[],'remove;:stirng }
     */
    public net_GameStart(data: any): void {
        data = JSON.parse(data);
        Event.dispatchToLocal("GameState.ResGamingCharacter", data);
        data.eliminateNum && Event.dispatchToLocal("GameState.UpdatePlayerNum", data.eliminateNum);
    }


    /**
     * 玩家被淘汰
     */
    public net_knockout(): void {
        this._resultUIs.push({ ui: OutUI, params: [], showTime: 2 });
        this.onKnockoutPlayer();
    }

    /**
     * 将玩家返回大厅结算
     * @param lobbyId 大厅id
     * @param fristRank 第一局排名
     * @param finalRank 第二局排名
     * @param isAfk 是否挂机
     * @param exGold 额外吃星获得得钱
     */
    public net_enterLobby(lobbyId: string, fristRank: number, finalRank: number, isAfk: boolean, exGold: number, boxPassword: BoxPassword): void {
        const data = { fristRank: null, finalRank: null, isAfk: null, exGold: 0, boxPassword: null, settleStamp: null };
        data.fristRank = fristRank;
        data.finalRank = finalRank;
        data.exGold = exGold;
        data.isAfk = isAfk;
        data.boxPassword = boxPassword;
        data.settleStamp = Date.now();

        // 发送淘汰埋点
        // Singleton.getIns(MGSGame).blockEnd();

        // 发起跳游戏
        ProcessHelper.enterGameClient(this.localPlayer.userId, lobbyId, data);
    }

    /**
     * 通知客户端当前有多少人达标了
     * @param pNum 当前达标人数
     */
    public net_updatePlayerNum(pNum: number, seat: number, name: string, maxCount: number): void {
        Event.dispatchToLocal("GameState.UpdatePlayerNum", pNum, maxCount);
        Event.dispatchToLocal("refreshRank", name)
        if (pNum == 1) {
            Singleton.getIns(MGSGame).otherPlayerFinish();
        }
        const teleportId = this.localPlayer.teleportId;
        if (teleportId != null) {
            const teamData = TeamManager.getTeam(teleportId)
            if (teamData && teamData.clientAIData) {
                // console.log(teamData.clientAIData, "teamData.clientAIData")
                const aiData = teamData.clientAIData.find(i => i.seat == seat);
                if (aiData) {
                    aiData.isWin = true;
                    // Singleton.getIns(MGSGame).onAIFinished();
                }
            } else {
                console.error("net_updatePlayerNum error");
            }
        }
    }

    protected onEnterScene(): void {
        // 在玩家进入游戏之后初始化 UI
        setTimeout(() => {
            Event.dispatchToLocal("GameState.UpdatePlayerNum", 0);
        }, 500);

        // 播放BGM
        Event.dispatchToLocal("PLAY_BY_CFG", 3);
        // 保底时间
        this._startTime = Date.now();
    }

    /**
     * 获取玩家本局数据
     * @returns 玩家本局数据
     */
    public async getGameInfo(): Promise<GameInfo> {
        if (this._curGameInfo != null) return this._curGameInfo;
        let data = [];
        data = await this.server.net_getGameInfo();
        this._curGameInfo = { seat: data[0], round: data[1], teamPlayerNum: data[2] };
        return this._curGameInfo;
    }

    /**
     * 获取玩家身上装扮
     * @returns 玩家身上装扮
     */
    public async getPlayerDressInfo(): Promise<PlayerDressInfo> {
        let data = [];
        let result = null;
        data = await this.server.net_getPlayerDressInfo();
        if (data != null) {
            result = { skinId: data[0], garnitureId: data[1], title: data[2] }
        }
        const cfg = GameConfig.GameInfo.getElement(1).spawns;
        const seat = data ? data[3] : 0;
        const loc = cfg[seat] ? cfg[seat] : cfg[0];
        console.log("初始化玩家座位", this.localPlayerId, seat, loc.toString());
        this.movePLayerToLoc(loc);
        return result;
    }

    /**
     * 获取玩家拥有表情
     * @returns 玩家拥有表情
     */
    public async getPlayerEmoji(): Promise<number[]> {
        let data = [];
        data = await this.server.net_getPlayerEmoji();
        return data;
    }

    /**
     * 获取玩家拥有的动作
     * @returns 玩家拥有动作
     */
    public async getPlayerAnims(): Promise<number[]> {
        let data = [];
        data = await this.server.net_getPlayerAnims();
        return data;
    }
    /**
     * 获取队伍中的玩家，可能为空
     */
    public getTeamPlayer() {
        const teleportId = this.localPlayer.teleportId;
        const players = TeamManager.getTeam(teleportId) ? TeamManager.getTeam(teleportId).players : [];
        return players
    }

    /**
     * 相机聚焦自己或物体
     * @param isShow 是否聚焦
     * @param obj 聚焦的物体，传null则是聚焦自己
     * @param offsetAngle 
     * @param offsetZ 
     * @param fov 
     */
    public async setObjCloseUp(isShow: boolean, obj: mw.GameObject, offsetAngle: number = 19.3, offsetZ: number = -10, _armLen: number = 40): Promise<void> {
        let isOther = !!obj;
        let chara = Player.localPlayer.character;
        if (!obj) {
            obj = chara;
        }

        let cameraSystem = mw.Camera.currentCamera;
        cameraSystem.positionLagEnabled = true;
        cameraSystem.positionLagSpeed = 7;
        cameraSystem.rotationLagEnabled = true;
        cameraSystem.rotationLagSpeed = 7;
        if (isShow) {
            Event.dispatchToLocal("PLAY_BY_CFG", 54);

            const asset: string = "156822";
            Utils.downloadAsset(asset).then(() => {
                PlayerManagerExtesion.rpcPlayAnimation(chara, asset, 5);
            })

            this._lastTargetArmLen = 750;// cameraSystem.springArm.length;
            this._lastWorldLocation = cameraSystem.worldTransform.clone().position;
            this._lastWorldRotation = cameraSystem.worldTransform.clone().rotation;

            if (isOther) {
                ModifiedCameraSystem.setCameraFollowTarget(obj);
            }

            // cameraSystem.fov = fov;
            let len = cameraSystem.springArm.length;
            new mw.Tween({ armLen: len })
                .to({ armLen: _armLen }, 500)
                .onUpdate((_param) => {
                    cameraSystem.springArm.length = _param.armLen;
                })
                .easing(TweenUtil.Easing.Quadratic.Out)
                .start();
            let ro = obj.worldTransform.clone().rotation;
            let z = ro.z - 180;
            ModifiedCameraSystem.setOverrideCameraRotation(new mw.Rotation(ro.x, ro.y, z));
            let forward = obj.worldTransform.clone().getForwardVector();
            let tarp = new mw.Vector(forward.x * 200, forward.y * 200, forward.z * 200);
            let x = tarp.x * Math.cos(offsetAngle) + tarp.y * Math.sin(offsetAngle);
            let y = -tarp.x * Math.sin(offsetAngle) + tarp.y * Math.cos(offsetAngle);
            cameraSystem.springArm.localTransform.position = new mw.Vector(x, y, offsetZ);
            await TimeUtil.delaySecond(1);
        }
        else {
            cameraSystem.positionLagEnabled = false;
            cameraSystem.rotationLagEnabled = false;
            Event.dispatchToLocal("PLAY_BY_CFG", 1);
            if (!this._lastWorldLocation)
                return;

            if (isOther) {
                ModifiedCameraSystem.setCameraFollowTarget(chara);
            }
            else {
                ModifiedCameraSystem.cancelCameraFollowTarget();
                //ModifiedCameraSystem.setCameraFollowTarget(Player.localPlayer.character);
            }

            // ModifiedCameraSystem.applySettings(CameraTool.laseData);
            cameraSystem.springArm.localTransform.position = mw.Vector.zero;
            cameraSystem.worldTransform.clone().position = this._lastWorldLocation;
            cameraSystem.springArm.length = this._lastTargetArmLen;
            ModifiedCameraSystem.setOverrideCameraRotation(this._lastWorldRotation);
            await TimeUtil.delaySecond(0.1);
            ModifiedCameraSystem.resetOverrideCameraRotation();
            await TimeUtil.delaySecond(0.9);//0.9
        }
    }
    /**
     * 本地玩家淘汰
     */
    private onCharacterEliminate() {
        if (GameConfig.GameInfo.getElement(1).type == 2) {
            const character = this.localPlayer.character;
            // setTimeout(() => {
            //     character.displayName = ""
            // }, 1000);
            character.ragdollEnabled = true;
            Singleton.getIns(MGSGame).curPlayerEliminate();
            Event.dispatchToLocal("GameState.EliminatePlayer", character.gameObjectId);
            Event.dispatchToLocal("ACTIVE_WATCH_MODULE");
            Event.dispatchToServer("GameState.EliminatePlayer.Server", character.gameObjectId);
            // this.character.worldTransform.position = new mw.Vector(0, 0, 1000);
        }
    }
    /**
    * 用于角色展示,
    */
    private cameraMotion(other: Character) {
        const player = Player.localPlayer;
        const character = player.character;
        const camera = mw.Camera.currentCamera;

        ModifiedCameraSystem.setCameraFollowTarget(other);
        let from: Quaternion = other.worldTransform.rotation.add(new Rotation(10, -15, 120)).toQuaternion();
        let to: Quaternion = other.worldTransform.rotation.add(new Rotation(- 5, 0, 220)).toQuaternion();
        let toRot: Quaternion = other.worldTransform.rotation.add(new Rotation(2, 0, 210)).toQuaternion();
        let toBack: Quaternion = other.worldTransform.rotation.add(new Rotation(0, 5, 150)).toQuaternion();

        let farQ: Quaternion = other.worldTransform.rotation.add(new Rotation(0, -20, 150)).toQuaternion();
        camera.springArm.length = 750;
        // camera.lockTargetOffset = Vector.zero;
        let relative = camera.localTransform.clone();
        relative.position.z = 0;
        camera.localTransform = relative;
        let percent: number = 0;
        let step: number = 0;
        let speed: number = 0.001;
        let data = {
            0: { minSpeed: 0.001, up: 0.3, keep: 0.7, down: 1, speedDelta: 0.0001, armParam: [750, 300], rot: [from, to] },
            1: { minSpeed: 0.001, up: 0.7, keep: 0, down: 1, speedDelta: 0.0001, armParam: [300, 300], rot: [to, toRot] },
            2: { minSpeed: 0.001, up: 0.5, keep: 0, down: 0, speedDelta: 0.0001, armParam: [300, 300], rot: [toRot, toBack] },
            3: { minSpeed: 0.001, up: 0.5, keep: 0.7, down: 1, speedDelta: 0.0003, armParam: [300, 900], rot: [toBack, farQ] }
        };
        let curData = data[step];
        let time = setInterval(() => {
            percent += speed
            ModifiedCameraSystem.setOverrideCameraRotation(Quaternion.slerp(curData.rot[0], curData.rot[1], percent).toRotation());
            camera.springArm.length = Utils.lerp(curData.armParam[0], curData.armParam[1], percent);
            if (percent < curData.up) {
                speed += curData.speedDelta;
            } else if (percent < curData.keep) { }
            else if (percent < curData.down) {
                if (speed < curData.minSpeed) {
                } else {
                    speed -= curData.speedDelta;
                }
            }

            if (percent > 1) {
                step++;
                percent = 0;
                curData = data[step];
                if (!curData) {
                    clearInterval(time);
                }
            }


        }, 1);

    }
}

/**
 * 当局游戏数据
 */
export type GameInfo = {
    /** 座位号 */
    seat: number,
    /** 回合 */
    round: number,
    /** 队伍玩家数量 */
    teamPlayerNum: number
}

/**
 * 玩家装扮模块数据
 */
export type PlayerDressInfo = {
    /** 皮肤 id */
    skinId: number,
    /** 挂件 id */
    garnitureId: number[],

    /**称号 */
    title: string
}

/**
 * 玩家装备模块数据 表情&动作
 */
export type PlayerEquipInfo = {
    /** 拥有的表情 */
    emoji: number[],
    /** 拥有的动作 */
    anims: number[]
}

export type GameData = {
    PlayerInfo: { skinId: number, garnitureId: number, seat: number, emoji: number[], anims: number[] },
    GameInfo: { round: number, teamPlayerNum: number }
}
class SeatFactory {
    private _seat: Vector[] = [];
    constructor() {
        const list = GameConfig.GameInfo.getElement(1).seats
        for (let i of list) {
            this._seat.push(i);
            if (this._seat.length == 24) {
                break;
            }
        }
    }
    public getSeat() {
        return this._seat.shift();
    }
}


