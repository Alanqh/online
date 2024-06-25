/*
 * @Author       : dal
 * @Date         : 2023-11-17 10:52:51
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-24 10:09:33
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\state\ProcedureStateClient.ts
 * @Description  : 
 */

import { getIsRefresh, targetVersion } from "../../../../DefNoSubModule";
import { GameConfig } from "../../../../config/GameConfig";
import { CommonUtils } from "../../../utils/CommonUtils";
import { GlobalSwitch } from "../../../utils/GlobalSwitch";
import { MainUI } from "../../../ui/MainUI";
import { MapEx } from "../../../utils/MapEx";
import MusicMgr from "../../../utils/MusicMgr";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UtilEx } from "../../../utils/UtilEx";
import PlayerArchiveData from "../../archive/ArchiveData";
import { ArchiveData, ArchiveDataType, ClueSaveData } from "../../archive/ArchiveHelper";
import ArchiveModuleC from "../../archive/ArchiveModuleC";
import { BagDefine, BagItemData } from "../../bag/BagDefine";
import { PlayerInterModuleC } from "../../inter/PlayerInterModule";
import { INIT_HP_NUM } from "../../player/PlayerData";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import HpHud from "../../player/ui/HpHud";
import { ProcedureModuleC } from "../ProcedureModuleC";
import { RoomHelper } from "../RoomHelper";
import { PickSaveData, PickItemTag } from "../const/ClueDefine";
import { EmProcedureState } from "../const/EmProcedureState";
import { Event_GameEnd, Event_LoadArchiveData } from "../const/Events";
import { LoadingGameUI } from "../ui/LoadingGameUI";
import { MainMenuPanel } from "../ui/MainMenuPanel";
import { ProcedureStateBase } from "./ProcedureState";
import GameStart, { EGameTheme } from "../../../GameStart";
import { BoardHelper } from "../../blackboard/BoardDefine";
import { WaitLoop } from "../../../utils/AsyncTool";
import BagPanel from "../../bag/ui/BagPanel";
import { ScenePropsModuleC } from "../../sceneProps/ScenePropsModule";
import { ObjInterDefine } from "../../inter/ObjInterDefine";
import StoreModuleC from "../../store/StoreModuleC";
import WeaponUpgradePanel from "../../equip/ui/WeaponUpgradePanel";
import BirthInfoHelper from "../util/BirthInfoHelper";


export class InitProcedureStateClient extends ProcedureStateBase {

    enter?: (data?: any) => void = () => {
        this.client_initPlayerState();
        if (GameStart.GameTheme === EGameTheme.Hall) {
            const char = Player.localPlayer.character;
            char.jumpEnabled = true;
            char.movementEnabled = true;
            // UIService.show(MainUI).applyHallPanel();
            /** 帮blackBoard代发一下 */
            Event.dispatchToLocal(BoardHelper.BoardLoadingEvt);
        } else {
            UIService.show(MainMenuPanel);
        }
    }

    exit?: (nextState?: any) => void = () => {
        UIService.hide(MainMenuPanel);
    }
}

export class LoadingProcedureStateClient extends ProcedureStateBase {

    setAsClueItem(go: GameObject, guid: string, saveData: ClueSaveData) {
        go[PickItemTag] = guid;
        go[PickSaveData] = saveData;
        go.getChildren().forEach(e => {
            this.setAsClueItem(e, guid, saveData);
        })
    }

    enter?: (data?: any) => void = async () => {
        const char = Player.localPlayer.character

        // 把和其他玩家得碰撞关了
        Player.localPlayer.character.collisionWithOtherCharacterEnabled = false;


        // 加载存档数据
        let archiveData = await ModuleService.getModule(ArchiveModuleC).reqDataByArchiveId(this.owner.archiveID);
        const degreeCfg = GameConfig.Difficulty.getElement(this.owner.degree);
        const playerModule = ModuleService.getModule(PlayerModuleC)
        playerModule.birthPos = archiveData.birthPos;
        playerModule.birthRot = CommonUtils.arr2Rot(archiveData.birthRot, new Rotation(BirthInfoHelper.instance.birthRot));

        // 存活天数
        GlobalSwitch.enableTimeSys() && UIService.getUI(MainUI).setAliveDay(archiveData.aliveDay);

        console.log(CommonUtils.arr2Rot(archiveData.birthRot, BirthInfoHelper.instance.birthRot) + " startRot")
        // 先改一下位置
        Player.localPlayer.character.worldTransform.position = new Vector(archiveData.birthPos.x, archiveData.birthPos.y, archiveData.birthPos.z);
        const rot = playerModule.birthRot;
        setTimeout(() => {
            Player.localPlayer.character.worldTransform.rotation = new Rotation(0, 0, rot.z);
            Player.setControllerRotation(playerModule.birthRot);
            console.log("setRotation" + playerModule.birthRot)
        }, 20);
        // 生成线索
        if (archiveData.isInitClues) {
            console.log("读取老的线索数据");
            MapEx.forEach(archiveData.clues, async (key: string, val: ClueSaveData) => {
                const cfg = GameConfig.Item.getElement(val.assid);
                if (!cfg) {
                    console.error("MyTypeError 生成线索物品失败cfg not find", val.assid);
                    return;
                }
                let go = await GameObject.asyncSpawn(cfg.prefab, { replicates: false });
                if (!go) { await WaitLoop.loop(() => { return go }) }
                if (go) {
                    let box = go.getBoundingBoxExtent(true, false);
                    let offsetz = Math.max(0, box.z / 2);
                    let fallPos = CommonUtils.arr2Vec(val.loc);
                    fallPos.z += offsetz;
                    go.worldTransform.position = fallPos;
                    go.worldTransform.rotation = CommonUtils.arr2Rot(val.rot);
                    //go.worldTransform.scale = Vector.one;
                    this.setAsClueItem(go, key, val);
                    go.setCollision(CollisionStatus.QueryOnly);
                    this.owner.client_clueGOArray.push(go);
                }
            })
        }
        if (getIsRefresh(archiveData)) {
            console.log("生成新的线索");
            const itemIds = [];
            degreeCfg.itemIds?.forEach(arr => {
                for (let i = 0; i < arr[1]; i++) {
                    itemIds.push(arr[0]);
                }
            });
            if (!archiveData.isInitClues) {
                archiveData.clues = {};
                archiveData.isInitClues = true;
            }
            let map: MapEx.MapExClass<ClueSaveData> = archiveData.clues;
            for (let i = 0; i < itemIds.length; i++) {
                const cfg = GameConfig.Item.getElement(itemIds[i]);
                if (!cfg) {
                    console.error("MyTypeError 生成线索物品失败cfg not find", itemIds[i]);
                    continue;
                }
                if (!cfg.roomType) {
                    console.error("MyTypeError 生成物品失败cfg no roomType" + cfg.id)
                    continue;
                }
                let roomTyps = cfg.roomType.filter(e => {
                    let items = RoomHelper.instance.getRoom(e).items.filter((itemPoint) => {
                        if (itemPoint.refreshDegree > this.owner.degree) {
                            return false;
                        }
                        return itemPoint.isUsed == false && (itemPoint.refreshType == 0 || itemPoint.refreshType == cfg.refreshType)
                    });
                    return items.length != 0;
                })
                console.log(cfg.id + "roomTypeArr" + roomTyps);
                const roomType = UtilEx.MathEx.rangeItem(roomTyps, false);
                const items = RoomHelper.instance.getRoom(roomType).items.filter((itemPoint) => {
                    if (itemPoint.refreshDegree > this.owner.degree) {
                        return false;
                    }
                    return itemPoint.isUsed == false && (itemPoint.refreshType == 0 || itemPoint.refreshType == cfg.refreshType)
                });
                console.log("线索物品" + cfg.id + ":" + items.length)
                const itemPoint = UtilEx.MathEx.rangeItem(items);
                if (!itemPoint) {
                    console.error("MyTypeError 生成线索物品失败 item not find", cfg.id, JSON.stringify(items));
                    continue;
                }
                if (itemPoint.isUsed) {
                    console.error("MyTypeError 生成线索物品失败 item is used", cfg.id, JSON.stringify(items));
                    continue;
                }
                itemPoint.isUsed = true;
                const itemTrans = itemPoint?.gameObject?.worldTransform.clone();
                const go = await GameObject.asyncSpawn(cfg.prefab);
                let val = new ClueSaveData();
                val.assid = cfg.id;
                val.loc = CommonUtils.vec2Arr(itemTrans.position);
                val.rot = CommonUtils.rot2Arr(itemTrans.rotation);
                MapEx.set(map, `CI${go.gameObjectId}`, val);
                this.setAsClueItem(go, `CI${go.gameObjectId}`, val);
                //itemTrans.scale = Vector.one;
                go.worldTransform = itemTrans.clone();
                go.setCollision(CollisionStatus.QueryOnly);
                this.owner.client_clueGOArray.push(go);
            }
            ModuleService.getModule(ArchiveModuleC).reqSaveData([
                ArchiveDataType.CLUES, ArchiveDataType.CLUESINIT, ArchiveDataType.VERSION, ArchiveDataType.LIFE],
                [map, true, targetVersion, degreeCfg.lifeNum]
            );
        }
        console.log("DEBUG==>> 0000", JSON.stringify(archiveData))
        if (GameConfig.Global.initItems.array1d && !archiveData.bagItemInit) {
            for (let index = 0; index < GameConfig.Global.initItems.array1d.length; index++) {
                const element = GameConfig.Global.initItems.array1d[index];
                const cfg = GameConfig.Item.getElement(element);
                if (!cfg) {
                    console.error("添加物品失败")
                    continue;
                }
                if (!archiveData.bagItems) {
                    archiveData.bagItems = [];
                }
                if (archiveData.bagItems.find(e => { return e.cfgId == element; })) {
                    console.error("背包中已经存在物品了")
                    continue;
                }
                let itemdata = new BagItemData();
                itemdata.cfgId = element;
                itemdata.customData = "";
                itemdata.guid = `${index}_${element}`;
                itemdata.count = 1;
                archiveData.bagItems.push(itemdata);
            }
            ModuleService.getModule(ArchiveModuleC).reqSaveData([
                ArchiveDataType.BAGITEMS, ArchiveDataType.BAGITEMINIT],
                [archiveData.bagItems, true]
            );
        }
        await this.checkSceneProps(archiveData);
        console.log("[Board]开始存档", JSON.stringify(archiveData))

        if (GlobalSwitch.enableHpHud()) {
            UIService.getUI(HpHud).initBloodVolume(archiveData.hp, INIT_HP_NUM);
            ModuleService.getModule(PlayerModuleC).setHp(archiveData.hp);
        }

        ObjInterDefine.isLoadingArchive = true;
        Event.dispatchToLocal(Event_LoadArchiveData, archiveData);
        ObjInterDefine.isLoadingArchive = false;
    }

    update?: (dt: number) => void = (dt) => {
        if (this.owner.client_canStartGame) {
            // 开始游戏
            this.owner.setState(EmProcedureState.Start);
            ModuleService.getModule(ProcedureModuleC).getServer().net_syncProcedureState(this.owner.userId, EmProcedureState.Start);
        }
    }

    exit?: (nextState?: any) => void = () => {
        this.owner.client_canStartGame = false;
        ModuleService.getModule(ProcedureModuleC).getServer().net_setPlayerVisible(Player.localPlayer.playerId, true);
    }

    private async checkSceneProps(archiveData: ArchiveData) {
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            ModuleService.getModule(ScenePropsModuleC).refreshProps(this.setAsClueItem.bind(this));
            return;
        }
        if (!archiveData.initSceneProps) {
            archiveData.initSceneProps = true;
            if (!archiveData.clues) {
                archiveData.clues = {};
            }
            let map: MapEx.MapExClass<ClueSaveData> = archiveData.clues;
            let props = await ModuleService.getModule(ScenePropsModuleC).asyncGetProps(this.owner.degree);
            let keyTime = Math.ceil(new Date(Date.now()).getTime() / 10000);
            for (let index = 0; index < props.length; index++) {
                const val = props[index];
                const cfg = GameConfig.Item.getElement(val.assid);
                if (!cfg) {
                    console.error("MyTypeError 生成线索物品失败cfg not find\n", val.assid);
                    continue;
                }
                const key = `CE${keyTime}${index}`
                MapEx.set(map, key, val);
                let go = await GameObject.asyncSpawn(cfg.prefab, { replicates: false });
                if (!go) {
                    console.error("MyTypeError 资源生成失败\n资源的id为" + cfg.prefab)
                    continue;
                }
                if (go) {
                    let box = go.getBoundingBoxExtent(true, false);
                    let offsetz = Math.max(0, box.z / 2);
                    let fallPos = CommonUtils.arr2Vec(val.loc);
                    fallPos.z += offsetz;
                    go.worldTransform.position = fallPos;
                    go.worldTransform.rotation = CommonUtils.arr2Rot(val.rot);
                    this.setAsClueItem(go, key, val);
                    go.setCollision(CollisionStatus.QueryOnly);
                    this.owner.client_clueGOArray.push(go);
                }
            }
            ModuleService.getModule(ArchiveModuleC).reqSaveData(
                [ArchiveDataType.INITSCENEPROPS, ArchiveDataType.CLUES],
                [true, map]
            );
        }
    }
}


export class StartProcedureStateClient extends ProcedureStateBase {

    /** 背景音效的音效配置表id */
    static BGMSoundItemCfgId: number = 1000;

    birthPos: Vector;

    enter?: (data?: any) => void = () => {
        this.isListenMove = true;

        this.birthPos = Player.localPlayer.character.worldTransform.position;

        if (GameStart.GameTheme === EGameTheme.Graveyard) {
            MusicMgr.instance.play(2002);
        } else {
            MusicMgr.instance.play(1000);
        }

        MusicMgr.instance.play(1003);
        GhostTraceHelper.uploadMGS("ts_action_open_box", "难度ID", {
            box_id: 3,
            rebirth_num: this.owner.style,
            lifetime: this.owner.degree,
            reward: DataCenterC.getData(PlayerArchiveData).getClickCount(this.owner.archiveID)
        });
        UIService.show(LoadingGameUI);
        //GhostTraceHelper.uploadMGS("ts_action_open_box", "存档第几次进入", {});
        ModuleService.getModule(ArchiveModuleC).addClickCount(this.owner.archiveID);
        ModuleService.getModule(PlayerModuleC).setMGSListener();
    }

    isListenMove: boolean = false;

    update?: (dt: number) => void = (dt) => {
        if (!this.isListenMove) { return; }
        if (Vector.squaredDistance(this.birthPos, Player.localPlayer.character.worldTransform.position) > 1e4) {
            // 把和其他玩家的碰撞打开
            Player.localPlayer.character.collisionWithOtherCharacterEnabled = true;
            this.isListenMove = false;
        }
    }

    exit?: (data?: any) => void = (data?: any) => {
        UIService.getUI(BagPanel).setAllNodeEmpty();
        if (Player.localPlayer && Player.localPlayer.character) { Player.localPlayer.character.collisionWithOtherCharacterEnabled = false; }
    }
}

export class EndProcedureStateClient extends ProcedureStateBase {

    enter?: (data?: any) => void = (data?: any) => {
        ModuleService.getModule(PlayerInterModuleC).reqStopInter();
        this.owner.client_clueGOArray.forEach((go) => { go.destroy(); });
        this.owner.client_clueGOArray.length = 0;
        Event.dispatchToLocal(Event_GameEnd, data);
        this.client_initPlayerState();
        // 没有数据传入的应该是返回主菜单的操作执行了
        if (!data) {
            UIService.show(MainMenuPanel);
        }
        if (GameStart.GameTheme === EGameTheme.Town) {
            UIService.hide(WeaponUpgradePanel);
        }
    }
}
