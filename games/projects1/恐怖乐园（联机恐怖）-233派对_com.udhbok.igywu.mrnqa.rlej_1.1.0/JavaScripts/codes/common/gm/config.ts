/*
 * @Author       : dal
 * @Date         : 2023-11-10 18:40:59
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-04 09:38:12
 * @FilePath     : \1001_hall\JavaScripts\codes\common\gm\config.ts
 * @Description  : 
 */
import { DebugConsole } from "debug_console";
import { ArchiveDataType, ArchiveHelper } from "../../modules/archive/ArchiveHelper";
import { DegreeType } from "../../modules/blackboard/BoardDefine";
import { ProcedureModuleC } from "../../modules/procedure/ProcedureModuleC";
import { LosePanel } from "../../modules/procedure/ui/LosePanel";
import { VictoryPanel } from "../../modules/procedure/ui/VictoryPanel";
import { BagDefine } from "../../modules/bag/BagDefine";
import GhostInst from "../../modules/ghost/GhostInst";
import { GhostModuleS } from "../../modules/ghost/GhostModuleS";
import { PlayerModuleC } from "../../modules/player/PlayerModuleC";
import { BehaviorNode } from "../../behavior3/BehaviorNode";
import TimeModuleS from "../../modules/time/TimeModuleS";
import GameStart from "../../GameStart";
import { RouteDefine } from "../../modules/route/RouteDefine";
import { GameConfig } from "../../../config/GameConfig";
import { GhostModuleC } from "../../modules/ghost/GhostModuleC";
import { RouteDataHelper, RouteDataType } from "../../modules/route/RouteData";
import Tips from "../../utils/Tips";
import { PlayerModuleS } from "../../modules/player/PlayerModuleS";
import { ScenePropsRefreshMgr } from "../../modules/sceneProps/ScenePropsRefreshMgr";
import { BuffModuleC } from "../../modules/buff/BuffModule";
import { EBuffType } from "../../modules/buff/BuffDefine";
import ArchiveModuleC from "../../modules/archive/ArchiveModuleC";
import TimeModuleC from "../../modules/time/TimeModuleC";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import GraphModuleC from "../../modules/graph/GraphModuleC";
import { GhostSettings } from "../../modules/ghost/GhostDefine";
import { MainUI } from "../../ui/MainUI";
import { FindData } from "../../modules/find/FindData";
import { PlayerInterModuleS } from "../../modules/inter/PlayerInterModule";
import MissionModuleS from "../../modules/mission/MissionModuleS";
import { FindModuleS } from "../../modules/find/FindModuleS";
import MissionModuleC from "../../modules/mission/MissionModuleC";
import AchieveModuleData from "../../modules/achievement/AchieveModuleData";
import { NewRankModuleC } from "../../modules/globalRankNew/NewRankModuleC";
import { EBaseRankDataType, NewRankDefine } from "../../modules/globalRankNew/NewRankDefine";
import { TestNameList } from "../../modules/idcard/IDCardConst";
import { NewRankModuleS } from "../../modules/globalRankNew/NewRankModuleS";
import NewRankData from "../../modules/globalRankNew/NewRankData";
import { NewPlayerRankData } from "../../modules/globalRankNew/NewPlayerRankData";
import { GhostBossModuleS } from "../../modules/ghostBoss/GhostBossModuleS";
import { LogService } from "../../ui/utils/LogPanel";
import WeaponEditor from "../../GamePlay/Framework/MeleeWeapon/editor/WeaponEditor";

export type GMData = {
    label: string,
    group: string,
    clientCmd: (player: mw.Player, params: string) => void,
    serverCmd: (player: mw.Player, params: string) => void
};

let temp: any;

Event.addServerListener("showAllPlayers", () => {
    Player.getAllPlayers().forEach(e => {
        e.character.setVisibility(PropertyStatus.On);
    })
})

/** GM命令配置组 */
export const localGMConfig: GMData[] = [
    {
        label: "角色换装",
        group: "Boss",
        clientCmd: (player: mw.Player, params: string) => {
            player.character.setDescription([params])
        },
        serverCmd: (player: mw.Player, params: string) => {
        }
    },
    {
        label: "冷兵器打开",
        group: "Boss",
        clientCmd: (player: mw.Player, params: string) => {
            Camera.currentCamera.preset = CameraPreset.ThirdPerson;
            Camera.currentCamera.springArm.zoomEnabled = true;
            Camera.currentCamera.springArm.zoomDistanceRange = new Vector2(150, 1500)
            UIService.hide(MainUI);
            GhostInst.isInvincible = true;
        },
        serverCmd: (player: mw.Player, params: string) => {
            ModuleService.getModule(GhostModuleS).setPlayerCd(player, 999999999);
            player.character.addComponent(WeaponEditor);
        }
    },
    {
        label: "拉起",
        group: "控制台",
        clientCmd: (player: mw.Player, params: string) => {
            LogService.show();
        },
        serverCmd: (player: mw.Player, params: string) => {
        }
    },
    {
        label: "看一眼小怪",
        group: "Boss",
        clientCmd: (player: Player, params: string) => {
            Event.dispatchToLocal("onWatchChar", Number(params));
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "打一下小怪",
        group: "Boss",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            const ghostModule = ModuleService.getModule(GhostModuleS);
            ghostModule.ghostMap.forEach(e => {
                if (e._insCfg.id == Number(params)) {
                    ModuleService.getModule(GhostModuleS).net_damageGhost(player.playerId, e.id, 50, "", Vector.zero, false);
                }
            })
        }
    },
    {
        label: "boss死",
        group: "Boss",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            if (params == "1") {
                ModuleService.getModule(GhostBossModuleS).curBoss.ins.takeDmg(9999, player.playerId);
            }
            else {
                ModuleService.getModule(GhostBossModuleS).curBoss.ins.takeDmg(9999, 0);
            }

        }
    },
    {
        label: "刷新一个boss",
        group: "Boss",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostBossModuleS).addBoss();
        }
    },
    {
        label: "UploadCharApp",
        group: "Find",
        clientCmd: (player: Player, params: string) => {
            AccountService.uploadData(player.character, () => {
                player.character.displayName = "ok"
            }, 0);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "完成一些成就",
        group: "任务&成就",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            let arr;
            if (params.includes("|")) {
                arr = params.split("|");
            }
            if (params.includes(",")) {
                arr = params.split(",");
            }
            if (!arr || arr.length === 0) {
                Tips.show("输入id，多个成就用竖线或逗号隔开")
                return;
            }
            DataCenterS.getData(player, AchieveModuleData).saveNewAchieves(arr.map(v => { return Number(v) }));
        }
    },
    {
        label: "完成某一个任务",
        group: "任务&成就",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            let taskId = Number(params);
            if (!taskId) {
                Tips.show("输入id")
                return;
            }
            ModuleService.getModule(MissionModuleS).cheatCompleteMission(player, taskId);
        }
    },
    {
        label: "接取某一个任务",
        group: "任务&成就",
        clientCmd: (player: Player, params: string) => {
            let taskId = Number(params);
            if (!taskId) {
                return;
            }
            ModuleService.getModule(MissionModuleC).reqTakeMission(taskId);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "修改交互物相对位置",
        group: "交互物",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            Event.dispatchToAllClient("showAllPlayers")
            if (!params || params == "") {
                return;
            }
            let ps = params.split("|").map(e => { return Number(e) });
            const info = ModuleService.getModule(PlayerInterModuleS)._playerInfoMap.get(player.playerId);
            let inter: Interactor;
            if (info.isMain) {
                inter = info.interAnchor;
            }
            else {
                inter = ModuleService.getModule(PlayerInterModuleS)._playerInfoMap.get(info.interPids[0]).interAnchor
            }
            inter.localTransform.position = new Vector(ps[0], ps[1], ps[2]);
            inter.localTransform.rotation = new Rotation(ps[3], ps[4], ps[5]);
        }
    },
    {
        label: "获取所有的find道具",
        group: "Find",
        clientCmd: (player: Player, params: string) => {
            let findData = DataCenterC.getData(FindData);
            GameConfig.Find.getAllElement().forEach(e => {
                if (e.process) {
                    return;
                }
                if (findData.finds.includes(e.id)) {
                    return;
                }
                Event.dispatchToLocal("OnFindItem", e.id)
            });
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(FindModuleS).cheat(player);
        }
    },
    {
        label: "覆写ghostDis节点距离",
        group: "默认",
        clientCmd: (player: Player, params: string) => {

        },
        serverCmd: (player: Player, params: string) => {
            GhostSettings.recoverDis = Number(params);
        }
    },
    // {
    //     label: "迁移排行榜数据",
    //     group: "管理员",
    //     clientCmd: (player: Player, params: string) => {

    //     },
    //     serverCmd: (player: Player, params: string) => {
    //         GlobalRankData.migrate();
    //     }
    // },
    // {
    //     label: "迁移通关次数数据",
    //     group: "管理员",
    //     clientCmd: (player: Player, params: string) => {

    //     },
    //     serverCmd: (player: Player, params: string) => {
    //         GlobalDataHelper.migrate();
    //     }
    // },
    {
        label: "追追追",
        group: "默认",
        clientCmd: (player: Player, params: string) => {
            GameConfig.Ghost.getAllElement().forEach(e => {
                e.existChaseTime = 999999;
                e.existChaseDist = 999999;
                e.sightRange = [9999, 180];
                e.sightRangeInCD = [9999, 180];

            })

        },
        serverCmd: (player: Player, params: string) => {
            GameConfig.Ghost.getAllElement().forEach(e => {
                e.existChaseTime = 999999;
                e.existChaseDist = 999999;
                e.sightRange = [9999, 180];
                e.sightRangeInCD = [9999, 180];

            })
        }
    },
    {
        // （模拟玩家进游戏杀进程再进游戏的操作）
        label: "再发一次加载事件",
        group: "默认",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            Event.dispatchToLocal("LoadingProcedureServer", player.userId);
        }
    },
    {

        label: "隐藏头顶名字",
        group: "录视频",
        clientCmd: (player: Player, params: string) => {

        },
        serverCmd: (player: Player, params: string) => {
            Player.getAllPlayers().forEach(e => {
                e.character.displayName = "";
            })
        }
    },
    {

        label: "播放动画",
        group: "录视频",
        clientCmd: (player: Player, params: string) => {

        },
        serverCmd: (player: Player, params: string) => {
            if (params == "") {
                player.character.currentAnimation.stop();
                return;
            }
            const ps = params.split("|");
            const ani = player.character.loadAnimation(ps[0])
            ani.speed = Number(ps[1]);
            ani.loop = Infinity;
            ani.play();
        }
    },
    {

        label: "点燃所有蜡烛",
        group: "存档buff",
        clientCmd: (player: Player, params: string) => {
            Event.dispatchToLocal("CandleActiveGM", Number(params));
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {

        label: "输入buff类型添加",
        group: "存档buff",
        clientCmd: (player: Player, params: string) => {
            const buffType = StringUtil.isEmpty(params) ? EBuffType.Poison : Number(params);
            ModuleService.getModule(BuffModuleC).addArchiveBuff(buffType);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {

        label: "开红月",
        group: "血月",
        clientCmd: (player: Player, params: string) => {
            const timeScript = ModuleService.getModule(TimeModuleC).timeScript;
            let targetDate = true ? timeScript.playerDay : -1;
            if (timeScript.redMoonDay == -1 && true) {
                return;
            }
            if (timeScript.redMoonDay > 0 && true) {
                return;
            }

            GhostTraceHelper.uploadMGS("ts_action_dj", "狂暴模式", {
                action_type: true ? 0 : 1,
                action_id: true ? targetDate : timeScript.playerDay - timeScript.redMoonDay
            });
            timeScript.redMoonDay = targetDate;
            console.log("moonDay" + targetDate)
            ModuleService.getModule(ArchiveModuleC).reqSaveData([ArchiveDataType.RedMoon], [targetDate])
            console.log("血月状态改变" + true);
            timeScript.refreshDayCfg();
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {

        label: "关红月",
        group: "血月",
        clientCmd: (player: Player, params: string) => {
            const timeScript = ModuleService.getModule(TimeModuleC).timeScript;
            let targetDate = false ? timeScript.playerDay : -1;
            if (timeScript.redMoonDay > 0 && false) {
                return;
            }
            if (timeScript.redMoonDay <= 0 && true) {
                return;
            }
            GhostTraceHelper.uploadMGS("ts_action_dj", "狂暴模式", {
                action_type: false ? 0 : 1,
                action_id: false ? targetDate : timeScript.playerDay - timeScript.redMoonDay
            });
            timeScript.redMoonDay = targetDate;
            console.log("moonDay" + targetDate)
            ModuleService.getModule(ArchiveModuleC).reqSaveData([ArchiveDataType.RedMoon], [targetDate])
            console.log("血月状态改变" + false);
            timeScript.refreshDayCfg();
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {

        label: "探测莫名奇妙的东东",
        group: "工具",
        clientCmd: (player: Player, params: string) => {
            const camera = Camera.currentCamera;
            let startPos = Camera.currentCamera.worldTransform.position;
            let endPos = startPos.clone().add(camera.worldTransform.getForwardVector().multiply(300));
            let res = QueryUtil.lineTrace(startPos, endPos, true, true);
            res.forEach(r => {
                if (r.gameObject && !(r.gameObject instanceof Character)) {
                    console.log(`探测莫名奇妙的东东 name: ${r.gameObject.name} guid: ${r.gameObject.gameObjectId}`);
                }
            });
        },
        serverCmd: (player: Player, params: string) => {
            let startPos = player.character.worldTransform.position;
            let endPos = startPos.clone().add(player.character.worldTransform.getForwardVector().multiply(300));
            let res = QueryUtil.lineTrace(startPos, endPos, true, true);
            res.forEach(r => {
                if (r.gameObject && !(r.gameObject instanceof Character)) {
                    console.log(`探测莫名奇妙的东东 name: ${r.gameObject.name} guid: ${r.gameObject.gameObjectId}`);
                }
            });
        }
    },
    {

        label: "概率测试",
        group: "默认",
        clientCmd: (player: Player, params: string) => {
            let level = Number(params);
            let res = new Map();
            for (let index = 0; index < 10000; index++) {
                const id = ScenePropsRefreshMgr.instance["getRandomItem"](level);
                res.set(id, (res.get(id) || 0) + 1);
            }

            console.log("[RefreshMgr]模拟结果")
            res.forEach((v, k) => {
                console.log(`[RefreshMgr]id:${k} 出现次数:${v} 概率:${v / 10000}`);
            })
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "原地死亡",
        group: "默认",
        clientCmd: (player: Player, params: string) => {

        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(PlayerModuleS).net_killLife(player.playerId);
        }
    },
    {
        label: "进入安全区",
        group: "触发器测试",
        clientCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleC).isInsafe = (true);
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleS).safeMap.set(player.playerId, true);
        }
    },
    {
        label: "离开安全区",
        group: "触发器测试",
        clientCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleC).isInsafe = (false);
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleS).safeMap.set(player.playerId, false);
        }
    },
    {
        label: "获得特殊道具",
        group: "商店",
        clientCmd: (player: Player, params: string) => {
            const param1 = Number(params.split("|")[0]);
            const param2 = Number(params.split("|")[1]);
            RouteDefine.addSpecialItem(player.userId, param1, param2 ? param2 : 1);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "改变多少钱",
        group: "商店",
        clientCmd: (player: Player, params: string) => {
            RouteDefine.changeFearCoin(player.userId, Number(params));
        },
        serverCmd: (player: Player, params: string) => {

        }
    },
    {
        label: "现在的钱",
        group: "商店",
        clientCmd: async (player: Player, params: string) => {
            console.log("DEBUG>>> 现在的恐惧币是：" + (await RouteDefine.getFearCoin(player.userId)));
        },
        serverCmd: (player: Player, params: string) => {

        }
    },
    {
        label: "打开mainUI",
        group: "新图录",
        clientCmd: (player: Player, params: string) => {
            UIService.show(MainUI);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "解锁某些图录",
        group: "新图录",
        clientCmd: (player: Player, params: string) => {
            const arr = params.split("|");
            if (!arr || arr.length === 0) {
                Tips.show("输入图录id，多个图录用竖线线隔开")
                return;
            }
            arr.forEach(cfgId => {
                GameConfig.GhostFragment.getAllElement().filter(v => { return v.ghostGraphId === Number(cfgId) }).forEach(v => {
                    ModuleService.getModule(GraphModuleC).unlockNewPiece(v.id);
                });
            });
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "解锁某个碎片",
        group: "新图录",
        clientCmd: (player: Player, params: string) => {
            ModuleService.getModule(GraphModuleC).unlockNewPiece(Number(params));
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "玩家穿墙术",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            const char = player.character;
            let charpos = char.worldTransform.position
            let checkDis = 500 + (Number(params)) * 300
            let charfor = char.worldTransform.getForwardVector().multiply(checkDis);
            let end = charfor.add(charpos)
            let res = QueryUtil.lineTrace(end, charpos, true, true);
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if (element.gameObject instanceof Trigger) {
                    continue;
                }
                char.worldTransform.position = element.position.add(char.worldTransform.getForwardVector().multiply(100));
                break;
            }
        },
        serverCmd: (player: Player, params: string) => {
            // ModuleService.getModule(GhostModuleS)["ghostMap"].forEach(e => {
            //     e.ghostChar.maxWalkSpeed = Number(params);
            // })
        }
    },
    {
        label: "修改鬼的移动速度",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            // CommonUtils.blackDescription(player.character.description);
            // player.character.syncDescription();
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleS)["ghostMap"].forEach(e => {
                e.ghostChar.maxWalkSpeed = Number(params);
            })
        }
    },
    {
        label: "天气加速",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            // CommonUtils.blackDescription(player.character.description);
            // player.character.syncDescription();
        },
        serverCmd: (player: Player, params: string) => {
            let num = Number(params) || 1;
            num = MathUtil.clamp(num, 0, Number.MAX_SAFE_INTEGER);
            ModuleService.getModule(TimeModuleS).timeScript.timeScale = num;
        }
    },
    {
        label: "立刻进入夜晚",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            // CommonUtils.blackDescription(player.character.description);
            // player.character.syncDescription();
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(TimeModuleS).timeScript.enterNight();
        }
    },
    {
        label: "服务器命令",
        group: "测试气泡",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            UE.KismetSystemLibrary.ExecuteConsoleCommand(player.character["actor"], params);
        }
    },
    {
        label: "碰撞扫荡",
        group: "测试气泡",
        clientCmd: (player: Player, params: string) => {
            // let startLoc = char.worldTransform.position;
            // let endLoc = startLoc.add(char.worldTransform.getForwardVector().multiply(200));

            // let startLoc = Camera.currentCamera.worldTransform.position.clone();
            // let endLoc = startLoc.clone().add(Camera.currentCamera.worldTransform.getForwardVector().multiply(200));

            // let hits = QueryUtil.lineTrace(startLoc, endLoc, true, true);
            // hits.forEach(e => {
            //     console.log("hit hit" + e.gameObject.gameObjectId)
            // })
            let startLoc = player.character.worldTransform.position.clone();
            let endLoc = startLoc.clone().add(player.character.worldTransform.getForwardVector().multiply(60));
            let hits = QueryUtil.boxOverlap(endLoc, new Vector(100, 100, 200), true);
            let res: GameObject[] = hits.filter(e => {
                return e["BuildingUUID"];
            })
            res.forEach(e => {
                console.log(e["BuildingUUID"]);
            })
        },
        serverCmd: (player: Player) => {
        }
    },
    {
        label: "测试气泡",
        group: "测试气泡",
        clientCmd: (player: Player, params: string) => {
            Event.dispatchToLocal("Bubble_scMsg", params)
            Event.dispatchToLocal("evt_sendDanmaku", params);
        },
        serverCmd: (player: Player) => {
        }
    },
    {
        label: "改变玩家移速",
        group: "默认",
        clientCmd: (player: Player, params: string) => {
            player.character.maxWalkSpeed += Number(params);
        },
        serverCmd: (player: Player) => {
        }
    },
    {
        label: "获得经验",
        group: "默认",
        clientCmd: (player: Player, params: string) => {

        },
        serverCmd: (player: Player, params: string) => {
            let num = Number.isInteger(Number(params)) ? Number(params) : 1;
            RouteDataHelper.reqSetData(player.userId, GameStart.GameTheme, [RouteDataType.TotalExp], [num]);
        }
    },
    {
        label: "输入一个结局通关",
        group: "默认",
        clientCmd: (player: Player, params: string) => {
            const passCfg = GameConfig.PassEnding.getElement(params);
            if (!passCfg) {
                Tips.show(`没有 ${params} 这个通关配置，请重新输入`);
                return;
            }
            Event.dispatchToLocal("Local_PlayerPass", player.character.gameObjectId, params);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "无敌",
        group: "无敌",
        clientCmd: () => {
            GhostInst.isInvincible = true;
        },
        serverCmd: (player: Player) => {
            ModuleService.getModule(GhostModuleS).setPlayerCd(player, 999999999);
        }
    },
    {
        label: "取消无敌",
        group: "无敌",
        clientCmd: () => {
            GhostInst.isInvincible = false;
        },
        serverCmd: (player: Player) => {
            ModuleService.getModule(GhostModuleS).setPlayerCd(player, -100);
        }
    }
    ,
    {
        label: "解锁一个笔记",
        group: "笔记本",
        clientCmd: (player: mw.Player, params: string) => {
            let noteId = params != "" ? Number(params) : 1;
            ModuleService.getModule(ProcedureModuleC).unlockNote(noteId);
        },
        serverCmd: null,
    },
    {
        label: "改变玩家生命值",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            let noteId = params != "" ? Number(params) : 1;
            ModuleService.getModule(PlayerModuleC).changeHp(noteId);
        },
        serverCmd: null,
    },
    {
        label: "打开行为树调试log",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            BehaviorNode.isOpenLog = true;
        },
        serverCmd: null,
    },
    {
        label: "设置一个数据",
        group: "全服排行榜",
        clientCmd: null,
        serverCmd: (player: mw.Player, params: string) => {
            let count = params != "" ? Number(params) : 1;
            let type = NewRankDefine.rankTypeArr[MathUtil.randomInt(0, NewRankDefine.rankTypeArr.length)];
            DataCenterS.getData(player, NewPlayerRankData).saveRankInfo(type, count);
        },
    },
    {
        label: "随机加N个人",
        group: "全服排行榜",
        clientCmd: null,
        serverCmd: (player: mw.Player, params: string) => {
            let count = params != "" ? Number(params) : 1;
            let type = NewRankDefine.rankTypeArr[MathUtil.randomInt(0, NewRankDefine.rankTypeArr.length)];
            for (let index = 0; index < count; index++) {
                ModuleService.getModule(NewRankModuleS)["dataMap"].get(type).setData({
                    i: Date.now() + MathUtil.randomInt(0, 100) + "",
                    n: TestNameList[MathUtil.randomInt(0, TestNameList.length)],
                    v: MathUtil.randomInt(1, 100)
                });
            }
        },
    },
    {
        label: "打印当前位置",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            console.log(player.character.worldTransform);
            UE.KismetSystemLibrary.ExecuteConsoleCommand(Player.localPlayer.character["actor"], "stat unit");
        },
        serverCmd: null,
    },
    {
        label: "获取开船四件套",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            BagDefine.AddItem(player.playerId, 43);
            BagDefine.AddItem(player.playerId, 18);
            BagDefine.AddItem(player.playerId, 19);
            BagDefine.AddItem(player.playerId, 20);
        },
        serverCmd: null,
    },
    {
        label: "输入传送玩家x|y|z",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            if (params === "") { return; }
            let posArr = params.split("|");
            Player.localPlayer.character.worldTransform.position = new Vector(Number(posArr[0]), Number(posArr[1]), Number(posArr[2]));
        },
        serverCmd: null,
    },
    {
        label: "MGS气泡",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            Event.dispatchToLocal("Bubble_scMsg", params);
        },
        serverCmd: null,
    },
    {
        label: "打开胜利界面",
        group: "UI调试",
        clientCmd: (player: mw.Player, params: string) => { UIService.show(VictoryPanel); },
        serverCmd: (player: mw.Player, params: string) => { }
    },
    {
        label: "打开失败界面",
        group: "UI调试",
        clientCmd: (player: mw.Player, params: string) => { UIService.show(LosePanel); },
        serverCmd: (player: mw.Player, params: string) => { }
    },
    {
        label: "增加存档",
        group: "存档调试",
        clientCmd: (player: mw.Player, params: string) => { },
        serverCmd: (player: mw.Player, params: string) => {
            let id = params === "" ? 1 : Number(params);
            ArchiveHelper.reqSetData(player.userId, [ArchiveDataType.LIFE], [2]);
        }
    },
    {
        label: "删除存档",
        group: "存档调试",
        clientCmd: (player: mw.Player, params: string) => { },
        serverCmd: (player: mw.Player, params: string) => {
            let id = params === "" ? 1 : Number(params);
            ArchiveHelper.reqDeleteData(player.userId, Number(id));
        }
    },
    {
        label: "拿所有存档",
        group: "存档调试",
        clientCmd: (player: mw.Player, params: string) => { },
        serverCmd: (player: mw.Player, params: string) => {
            let id = params === "" ? 1 : Number(params);
            ArchiveHelper.reqGetAllData(player.userId).then(eles => {
                eles.forEach((data, id) => {
                    console.log(`DEBUG>>> id = ${id}, value = ${JSON.stringify(data)}`);
                });
            });
        }
    },
    // {
    //     label: "拉起",
    //     group: "控制台",
    //     clientCmd: (player: mw.Player, params: string) => {
    //         DebugConsole.start(params === "1");
    //     },
    //     serverCmd: (player: mw.Player, params: string) => {
    //     }
    // },
    // {
    //     label: "停止",
    //     group: "控制台",
    //     clientCmd: (player: mw.Player, params: string) => {
    //         DebugConsole.stop();
    //     },
    //     serverCmd: (player: mw.Player, params: string) => {
    //     }
    // },
]

/** 分割命令参数
 * @param params
 * @returns 参数数组
 */
function splitParams(params: string): string[] {
    return params.split(",");
}
