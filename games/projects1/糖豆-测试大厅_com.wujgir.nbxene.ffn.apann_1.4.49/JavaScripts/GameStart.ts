import { PlayerManagerExtesion } from './Modified027Editor/ModifiedPlayer';
import { SpawnManager } from './Modified027Editor/ModifiedSpawn';
/**
* release1.15.0封板 
*/
import { GM } from "module_gm";
import { CLAI } from "./AI/client/ClientAIService";
import { PlayAIPool } from "./AI/play/PlayAI";
import { GameConfig } from "./config/GameConfig";
import { MGSCore } from "./mgs/MGSCore";
import { MGSGame } from "./mgs/MGSGame";
import { DressData } from "./modules/dress/DressData";
import { DressModuleC } from "./modules/dress/DressModuleC";
import { DressModuleS } from "./modules/dress/DressModuleS";
import ItemObj from "./modules/dress/ItemObj";
import { ScriptManager } from "./modules/dress/ScriptManager";
import { ChatModuleC } from "./modules/Emoji/ChatModuleC";
import { ChatModuleS } from "./modules/Emoji/ChatModuleS";
import { GMBasePanelUI } from "./modules/gm/ui/GMBasePanelUI";
import PlayerModuleC from "./modules/PlayerModule/PlayerModuleC";
import PlayerModuleS from "./modules/PlayerModule/PlayerModuleS";
import ProcessModuleC from "./modules/ProcessModule/ProcessModuleC";

import { SceneJumpService } from './modScene/SceneJumpMgr';
import ProcessModuleS from "./modules/ProcessModule/ProcessModuleS";
import { PlayerCtrlMgr } from "./playerCtrl/PlayerCtrlMgr";
import { TeamManager } from "./Prefabs/GameStater/Script/TeamManager";
import { TestMode } from "./TestMode";
import { CGrapics } from "./tool/CGrapics";
import { LanUtils } from "./tool/LanguageUtil";
import { Singleton } from "./tool/Singleton";
import { showVersion } from './VerHelper';

TeamManager.config = GameConfig.GameInfo.getElement(1);
enum Elan {
    ch,//中文
    en,//英文
}
@Component
export default class GameStart extends mw.Script {
    @mw.Property({ displayName: "场景调试(PIE)", tooltip: "开启之后不走流程，用于机关和场景调试" })
    private _debugScene: boolean = false;
    @mw.Property({ displayName: "语言环境(PIE)", enumType: Elan, tooltip: "ch=中文(PIE),en=英文(PIE)" })
    private laIndex: Elan = Elan.en;
    // @mw.Property({ displayName: "轮次(PIE)", selectOptions: { "第一轮": "1", "第二轮": "2" }, tooltip: "轮次仅PIE生效" })
    // private round: string = "1";

    private localPlayer: mw.Player;
    protected onStart() {
        ScriptingSettings.setGlobalAsyncTimeout(10 * 1000);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, null);
        if (SystemUtil.isClient()) {
            // AvatarSettings.optimizationEnabled = false;
            showVersion();
            LanUtils.initLanguage(this.laIndex);
            Event.dispatchToLocal("chooseUIInit", 1);
            PlayAIPool.init();
            Singleton.getIns(MGSGame).postCheckPointTime(-99, 0, -99, -99);
            Singleton.getIns(MGSCore).coreStep(-101);
            CGrapics.init();
            // GameObject.asyncFindGameObjectById("8F9D811140D4E7BBF102C68AF45AA929").then((obj: mw.Lighting) => {
            // });
            if (SystemUtil.isPIE) {
                // TestMode.testRound = Number(this.round);
                // Event.dispatchToLocal("Round.Set", Number(this.round));
                // TeamManager.teams.forEach(team => {
                //     team.clientCurRound = Number(this.round);
                // });
                InputUtil.onKeyDown(mw.Keys.G, () => {
                    CLAI.stop();
                });
            }
            Player.asyncGetLocalPlayer().then(async (player) => {
                setTimeout(() => {
                    Event.dispatchToLocal("CAMERA_DELAY_UPDATE", true);
                }, 1000);
                this.queryTeamInfo(player.playerId);
                player.character.collisionWithOtherCharacterEnabled = false;
                PlayerCtrlMgr.ins.init(player.character);
                this.useUpdate = true;
            });
        } else {
            // if (SystemUtil.isPIE) {
            //     TestMode.testRound = Number(this.round);
            //     Event.dispatchToLocal("Round.Set", Number(this.round));
            //     TeamManager.teams.forEach(team => {
            //         team.serverData["round"] = Number(this.round);
            //     });
            // }
            Player.onPlayerJoin.add((player) => {
                // player["leftEffect"] = EffectService.playOnGameObject("181011", player.character, { loopCount: 0, slotType: HumanoidSlotType.LeftFoot, position: new Vector(-25, 0, 0) })
                // player["rightEffect"] = EffectService.playOnGameObject("181011", player.character, { loopCount: 0, slotType: HumanoidSlotType.RightFoot, position: new Vector(25, 0, 0) })
            })
        }
        if (this._debugScene && SystemUtil.isPIE) {
            if (SystemUtil.isClient()) {
                this.sceneDebug();
            }
            return;
        }
        TeamManager.init(GameConfig.GameInfo.getElement(1));
        ModuleService.registerModule(ProcessModuleS, ProcessModuleC, null);
        ModuleService.registerModule(ChatModuleS, ChatModuleC, null);
        ModuleService.registerModule(DressModuleS, DressModuleC, DressData);


        if (SystemUtil.isClient()) {
            ModuleService.ready().then(() => {
                GM.checkAuthority(isGM => {
                    if (isGM || SystemUtil.isPIE) {
                        GM.start(GMBasePanelUI);
                    }
                });
            })
            Player.asyncGetLocalPlayer().then(player => {
                // const controller = player.character["ueCharacter"].GetPlayerController();
                // controller.AddPitchInput(-30 / controller.InputPitchScale);
                ModuleService.ready().then(() => {
                    this.localPlayer = player;
                    const players = Player.getAllPlayers();
                    for (const player of players) {
                        let interval = setInterval(() => {
                            if (player.character) {
                                clearInterval(interval);
                                this.checkTeamPlayer(player);
                            }
                        }, 100)
                    }
                    Player.onPlayerJoin.add((player) => {
                        let interval = setInterval(() => {
                            if (player.character) {
                                clearInterval(interval);
                                this.checkTeamPlayer(player);
                            }
                        }, 100)
                    });
                });
                SpawnManager.asyncSpawn({ guid: "162019" }).then((obj: mw.Effect) => {
                    SpawnManager.asyncSpawn({ guid: "7669" }).then((anchor) => {
                        player.character.attachToSlot(anchor, mw.HumanoidSlotType.Root);
                        anchor.setVisibility(mw.PropertyStatus.Off, false);
                        anchor["privateActor"].GetStaticMeshComponent().SetAbsolute(false, true, false);
                        Event.addLocalListener("HIDE_HEADANCHOR", () => {
                            anchor.setVisibility(mw.PropertyStatus.Off, false);
                        });
                        obj.parent = anchor;
                        obj.localTransform.scale = new mw.Vector(3, 3, 1.5);
                        obj.localTransform.position = new mw.Vector(0, 0, 180);
                        obj.setVisibility(mw.PropertyStatus.On);
                    });
                    obj.setColor("00FF6788", mw.LinearColor.colorHexToLinearColor("00FF6788"));
                    obj.loop = true;
                    obj.play();
                });
            });

        }
    }

    @RemoteFunction(mw.Client)
    private spawnAI(player: mw.Player) {
        CLAI.spawn(GameConfig.GameInfo.getElement(1).spawns.length - 12);
    }
    @RemoteFunction(mw.Server)
    private queryTeamInfo(playerId: number) {
        let maxRetryCount = 40;
        const inter = setInterval(() => {
            const player = Player.getPlayer(playerId);
            if (player) {
                if (TestMode.testMode) {
                    this.spawnAI(player);
                    clearInterval(inter);
                }
                const data: { round: number } = SceneJumpService.getJumpData(player.teleportId)
                if (data) {
                    if (data.round != 2) {
                        this.spawnAI(player);
                    }
                    clearInterval(inter);
                }
            }
            if (--maxRetryCount <= 0) {
                clearInterval(inter);
            }
        }, 500);

    }
    sceneDebug() {

        Player.asyncGetLocalPlayer().then(player => {
            player.character.asyncReady().then(char => {
                // GameCamera.setCameraParam(Camera.currentCamera);
                let camera = Camera.currentCamera;
                let trans = camera.localTransform.clone();
                trans.position = GameConfig.CameraConfig.getElement(1).cameraRelativeLocation;
                let rot = GameConfig.CameraConfig.getElement(1).cameraRelativeRotation;
                trans.rotation = new mw.Rotation(rot.x, rot.y, rot.z);
                camera.localTransform = trans;
                camera.springArm.length = GameConfig.CameraConfig.getElement(1).targetArmlength;
                camera.upAngleLimit = 60;
                camera.downAngleLimit = 0;
                let appearance = char.description;
                let appinter = setInterval(() => {
                    if (appearance != undefined) {
                        clearInterval(appinter);
                        AssetUtil.asyncDownloadAsset("154704").then(() => {
                            PlayerManagerExtesion.changeBaseStanceExtesion(player.character, "154704");
                        });
                        setTimeout(() => {
                            // if (char.characterType != mw.AppearanceType.HumanoidV1) {
                            //     char.characterType = mw.AppearanceType.HumanoidV1;
                            //     appearance = char.getAppearance<mw.HumanoidV1>();
                            // }
                            appearance.base.wholeBody = "151157";
                            // player.character.capsuleCorrectionEnabled = false;
                            // player.character.capsuleHalfHeight = 57;
                            // player.character.capsuleRadius = 60;
                        }, 100);
                    } else {
                        appearance = char.description;
                    }
                }, 100)
            })
        })
    }


    /**
     * 判断隐藏其他队伍玩家
     * @param player 玩家
     */
    private async checkTeamPlayer(player: mw.Player): Promise<void> {
        if (this.localPlayer.playerId != player.playerId) {
            const character = player.character;
            await character.asyncReady();
            this.getTeamId(player).then(async teamID => {
                if (await this.getTeamId(this.localPlayer) != teamID) {
                    // 先确保玩家的装扮已经加载完毕, 确保能正确隐藏装扮
                    let maxTry: number = 4;
                    let hideOther = setInterval(() => {
                        character.setVisibility(PropertyStatus.Off);
                        if (maxTry-- <= 0) {
                            clearInterval(hideOther);
                        }
                    }, 3000);
                    /**隐藏其他队伍玩家的拖尾 */
                    let inter = setInterval(() => {
                        const itemObj = Singleton.getIns(ScriptManager).getScriptOnPlayer(player.playerId, ItemObj);
                        if (itemObj) {
                            clearInterval(inter);
                            itemObj.hideFootEffect();

                        }
                    }, 100);
                }
            });
        }
    }

    /**
     * 获取玩家 TeamID
     * @param player 玩家
     * @returns 玩家 teamID
     */
    private async getTeamId(player: mw.Player): Promise<string> {
        try {
            if (player.teleportId) return player.teleportId;
            return new Promise(res => {
                const inter = setInterval(() => {
                    if (Player.getAllPlayers().find(tempPlayer => tempPlayer == player)) {
                        if (player.teleportId) {
                            clearInterval(inter);
                            res(player.teleportId);
                        }
                    } else {
                        clearInterval(inter);
                        res("")
                    }
                }, 40);
            });
        } catch (error) {
            return "";
        }

    }
    protected onUpdate(DeltaTime: number): void {
        if (this.isRunningClient()) {
            CGrapics.onUpdate(DeltaTime);
            PlayerCtrlMgr.ins.update(DeltaTime);
            CLAI.onUpdate(DeltaTime);
        }
    }
}