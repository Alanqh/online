/*
 * @Author       : dal
 * @Date         : 2023-11-03 14:01:00
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-01-07 16:29:41
 * @FilePath: \hauntedparadise\JavaScripts\codes\modules\bag\BagModuleC.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme, GamesStartDefines } from "../../Defines";
import { WaitLoop } from "../../utils/AsyncTool";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { ArchiveData } from "../archive/ArchiveHelper";
import { InterSaveModuleC } from "../inter/InterSaveHelper";
import { Event_LoadArchiveData } from "../procedure/const/Events";
import { RouteDefine } from "../route/RouteDefine";
import { RouteModuleC } from "../route/RouteModule";
import { BagDefine, BagItemData } from "./BagDefine";
import { BagModuleS } from "./BagModuleS";
import BagPanel from "./ui/BagPanel";


export class BagModuleC extends ModuleC<BagModuleS, null> {
    private _bagDataList: BagItemData[] = [];

    protected onStart(): void {
        super.onStart();
        // 唤醒背包
        UIService.getUI(BagPanel);
        BagDefine.init();
        Event.addLocalListener("Event_GameEnd", () => {
            this._bagDataList.length = 0;
        })

        Event.addLocalListener("PlayerAlready", this.checkUnlockItem.bind(this));

        Event.addLocalListener(Event_LoadArchiveData, this.readArchive.bind(this));
    }

    /** 将已解锁的武器直接给到玩家 */
    private async checkUnlockItem() {
        if (GamesStartDefines.gameTheme === EGameTheme.Town) {
            const unlockItemList: number[] = await ModuleService.getModule(RouteModuleC).reqUnlockedItemList();
            const bagItemIdArr = GameConfig.Item.getAllElement().filter(v => { return unlockItemList.includes(v.id); }).map(v => { return v.id });
            bagItemIdArr.forEach(v => {
                this.reqAddItem(Player.localPlayer.playerId, v, "", "", 1, false);
            });
        }
    }

    public get bagData() { return this._bagDataList }

    /**
     * 强行将一个模型插入到背包中一个位置，被插入的这个位置如果有item了，给它重新安个家
     * @param cfgId 
     * @param nodeId 背包中格子的索引
     */
    public insertItem(cfgId: number, nodeId: number, count: number = 1) {
        UIService.getUI(BagPanel).checkNodeExistAndMoveToNextNode(cfgId, nodeId);
        const newItemData = new BagItemData();
        newItemData.cfgId = cfgId;
        newItemData.count = count;
        newItemData.nodeId = nodeId;
        newItemData.guid = `${Date.now()}_${cfgId}`;
        this.net_resAddItem(false, newItemData, true);
        return newItemData.guid;
    }

    private async loadSpecialItems() {
        const specialItemList = await RouteDefine.getSpecialItemDataList(this.localPlayer.userId);
        this._bagDataList = this._bagDataList.concat(specialItemList);
    }

    /** 木牌子的id */
    private readonly woodCardId: number = 1200;

    public async net_initHallBagItem(specialItemList: BagItemData[]) {
        this._bagDataList = specialItemList;
        await WaitLoop.loop(() => { return GamesStartDefines.isMergeConfigFinish }, 100, 100);
        this.server.net_syncItems(this._bagDataList);
        Event.dispatchToLocal(BagDefine.OnItemInit, this._bagDataList);
    }

    /**
     * 将木牌子插入背包
     */
    public async pushWoodCardItemIntoBag() {
        if (GamesStartDefines.gameTheme != EGameTheme.Hall) { return; }
        await WaitLoop.loop(() => { return GamesStartDefines.isMergeConfigFinish }, 100, 100);
        let itemData = new BagItemData();
        itemData.cfgId = this.woodCardId;
        itemData.count = 1;
        itemData.guid = "customItem";
        this._bagDataList.push(itemData);
        Event.dispatchToLocal(BagDefine.AddItemEvt, itemData, false);
    }

    /**
     * 读档
     */
    private async readArchive(archiveData: ArchiveData) {
        if (!archiveData.bagItems) {
            archiveData.bagItems = [];
        }
        this._bagDataList = archiveData.bagItems;
        await this.loadSpecialItems();
        Event.dispatchToLocal(BagDefine.OnItemInit, this._bagDataList)
        this.server.net_syncItems(this._bagDataList);
    }

    /** 请求同步背包数据 */
    public reqSyncBagData(bagDataList: BagItemData[]) {
        this._bagDataList = bagDataList;
        this.server.net_syncItems(bagDataList);
    }

    public reqSyncItem(bagItemData: BagItemData) {
        let itemData = this._bagDataList.find(v => { return v.guid === bagItemData.guid });
        if (!itemData) {
            this._bagDataList.push(bagItemData);
        } else {
            itemData.count = bagItemData.count;
            itemData.customData = bagItemData.customData;
            itemData.nodeId = bagItemData.nodeId;
        }
        this.server.net_syncBagItem(this.localPlayer.playerId, this.localPlayer.userId, JSON.stringify(bagItemData));
    }

    public getAllItemCountByCfgId(cfgId: number) {
        const itemArr = this._bagDataList.filter(v => { return v.cfgId === cfgId });
        if (itemArr.length === 0) { return 0; }
        return itemArr.map(v => { return v.count }).reduce((p, c) => { return p + c }, 0);
    }

    /**
         * 全量增加道具的接口
         * @param bagItemDataArr 
         */
    public net_resAddItems(bagItemDataArr: BagItemData[]) {
        bagItemDataArr.forEach(v => {
            this.net_resAddItem(false, v, true);
        });
    }

    /**
     * 同步物品
     * @param needEquip 是否需要装备
     * @param itemdata 
     */
    public net_resAddItem(needEquip: boolean, itemdata: BagItemData, showTips: boolean = true) {
        if (!itemdata) { return; }
        let grid = this._bagDataList.find((e) => { return e.guid == itemdata.guid; });
        if (!grid) {
            this._bagDataList.unshift(itemdata);
        }
        else {
            grid.count = itemdata.count;
        }
        Event.dispatchToLocal(BagDefine.AddItemEvt, itemdata, needEquip);
        Event.dispatchToLocal(BagDefine.OnItemChangeEvt, this._bagDataList)
        let cfg = GameConfig.Item.getElement(itemdata.cfgId)
        showTips && Tips.show(CommonUtils.formatString(GameConfig.Language.Door_Tips5.Value, cfg.tip));
    }

    /** 在展示区的特殊道具数量 - 用以动态计算 道具容量格子 的容量 */
    private specialItemCountOnView = 0;

    /** 动态的容量 */
    private get curMaxGridCount() {
        return GameConfig.Global.ItemMax.number - this.specialItemCountOnView;
    }

    /** 普通道具的数量 */
    private normalItemCount: number;

    public async reqAddItem(playerId: number, cfgId: number, customData: string, clueGuid: string, count: number = 1, needSelect = true): Promise<boolean> {
        let cfg = GameConfig.Item.getElement(cfgId);

        if (BagDefine.checkIsSpecialItem(cfgId)) {
            if (clueGuid != "") {
                ModuleService.getModule(InterSaveModuleC).reqDeleteClue(clueGuid);
            }
            RouteDefine.addSpecialItem(this.localPlayer.userId, cfgId, count);
            return true;
        }

        if (!cfg) {
            console.error("尝试捡起来不存在的物品");
            return false;
        }

        /** 热武器只能拥有一把 */
        if (cfg.clazz == "HotWeaponItem" && this._bagDataList.filter(v => { return v.cfgId === cfg.id }).length != 0) {
            return false;
        }

        let res = await this.server.net_reqAddItem(playerId, cfgId, customData, clueGuid, count, needSelect);
        //GhostTraceHelper.itemTrace(cfgId, 2);
        return res;
    }

    public checkItemCanPick(playerId: number, cfgId: number, customData: string, clueGuid: string, count: number): boolean {
        let cfg = GameConfig.Item.getElement(cfgId);
        if (cfg.clazz == "Currency") {
            return true;
        }
        if (!cfg) {
            console.error("尝试捡起来不存在的物品");
            return false;
        }

        // 最大格子超过了零的有限制的
        if (cfg.maxGrid > 0) {
            // 检查一下是否超过最大格子
            let grids = this._bagDataList.filter(e => { return e.cfgId === cfgId });
            // 是否还有容纳的余地
            if (grids.length > cfg.maxGrid) {
                this.net_tipsMaxGrid(cfgId);
                return false;
            }
            if (grids.length === cfg.maxGrid) {
                let mark: boolean = false;
                for (const grid of grids) {
                    // 有一个格子还没满
                    if (grid.count < cfg.maxCount) {
                        mark = true;
                        break;
                    }
                }
                if (!mark) {
                    this.net_tipsMaxGrid(cfgId);
                    return false;
                }
            }
        }
        return true;
    }

    /** 检查背包中是否存在某个item */
    public checkItemExist(cfgId: number): boolean {
        return this.getItemsById(cfgId).length != 0;
    }

    public getItemsById(cfgId: number): BagItemData[] {
        return this._bagDataList.filter(v => { return v.cfgId === cfgId });
    }

    /**
     * 移除物品
     * @param guid 物品的guid
     */
    public net_removeItem(guid: string, newCount: number) {
        let index = this._bagDataList.findIndex(e => { return e.guid == guid });
        if (index == -1) {
            return;
        }
        let item = this._bagDataList[index];
        item.count = newCount;
        Event.dispatchToLocal(BagDefine.RemoveItemEvt, item, item.customData);
        if (item.count <= 0) {
            this._bagDataList.splice(index, 1);
        }
        GhostTraceHelper.itemTrace(item.cfgId, 3);
        Event.dispatchToLocal(BagDefine.OnItemChangeEvt, this._bagDataList)
        this.reqSyncBagData(this._bagDataList);
    }

    /** 请求改变道具数量(可+可-)，从背包中改成功了几个就返回几个 */
    public async reqChangeItemCount(deltaNum: number, itemId: number) {
        if (deltaNum === 0) { return 0; }
        return this.server.net_reqChangeItemCount(this.localPlayerId, itemId, deltaNum);
    }

    /**
     * 合并两个item
     * @param itemDataList 道具列表，如果合并时一个itemData被吸干，需要及时删除
     * @param data1 
     * @param data2 
     * @returns 是否合并成功
     */
    public mergeTwoItem(itemDataList: BagItemData[], data1: BagItemData, data2: BagItemData) {
        if (data1.cfgId != data2.cfgId) {
            console.error(`DEBUG MyTypeError>>> data1: ${JSON.stringify(data1)}，与data2：${JSON.stringify(data2)}格子配置都不同，合并失败！`);
            return false;
        }
        let cfg = this.getItemCfg(data1.cfgId);
        // 就不用交换了
        if (cfg.maxCount <= 1 || data1.count === cfg.maxCount || data2.count === cfg.maxCount) { return false; }
        // 改变值，一个增，另一个就需要减少
        let deltaNum = cfg.maxCount - data1.count;
        deltaNum = Math.min(deltaNum, data2.count);
        data1.count += deltaNum;
        data2.count -= deltaNum;
        // 如果data2被吸干，就需要在道具列表中将其删除
        if (data2.count <= 0) {
            let id = itemDataList.findIndex(v => { return v.guid === data2.guid });
            itemDataList.splice(id, 1);
        }
        return true;
    }

    private getItemCfg(itemId: number) {
        return GameConfig.Item.getElement(itemId);
    }

    public getAllItems() {
        return this._bagDataList;
    }

    public net_tipsMaxGrid(cfgId: number) {
        Tips.show(CommonUtils.formatString(LanUtil.getText("tips_show_8"), GameConfig.Item.getElement(cfgId).name));
    }

    public net_tipsMax() {
        Tips.show(GameConfig.Language.tips_show_01.Value);
    }

    public net_tipsCurrency(id: number, mount: number) {
        let str = GameConfig.Item.getElement(id).tip;
        if (str.includes("{0}")) {
            str = str.replace("{0}", mount.toString());
        }
        Tips.show(str);
        SoundService.playSound("136198", 1)
    }

    public reqChangeItems(addItems: number[], removeItems: number[]) {
        this.server.net_changeItems(addItems, removeItems);
    }
}