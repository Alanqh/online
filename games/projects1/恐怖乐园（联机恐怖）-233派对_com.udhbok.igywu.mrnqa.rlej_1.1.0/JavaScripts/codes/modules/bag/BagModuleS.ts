import { AddGMCommand } from "module_gm";
import { BagDefine, BagItemData, IBagItemData } from "./BagDefine";
import { BagModuleC } from "./BagModuleC";
import { ArchiveData, ArchiveDataType, ArchiveHelper } from "../archive/ArchiveHelper";
import { InterSaveModuleS } from "../inter/InterSaveHelper";
import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { RouteDefine } from "../route/RouteDefine";
import { Const, EGameTheme, GamesStartDefines } from "../../Defines";
import { RouteDataHelper, RouteDataType } from "../route/RouteData";

AddGMCommand("增加物品", () => {

}, (plyaer: mw.Player, params: string) => {
    if (params == "" || params == null) {
        BagDefine.AddItem(plyaer.playerId, 1)
    } else {
        let param = params.split("|");
        BagDefine.AddItem(plyaer.playerId, Number(param[0]), "", "", Number(param[1]) ? Number(param[1]) : 1);
    }
})

AddGMCommand("移除物品", () => {

}, (plyaer: mw.Player, params: string) => {
    let guid = BagDefine.GetItemGuid(plyaer.playerId, 1);
    BagDefine.RemoveItem(plyaer.playerId, guid, 1)
})

type OtherBagInfo = {

    /** 在展示区的特殊道具数量 - 用以动态计算 道具容量格子 的容量 */
    specialItemCountOnView,

    /** 普通道具的数量 */
    normalItemCount,

}

export class BagModuleS extends ModuleS<BagModuleC, null> {
    private _dataMap: Map<number, BagItemData[]> = new Map();

    protected onStart(): void {
        BagDefine.init();
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        if (GamesStartDefines.gameTheme === EGameTheme.Hall) {
            RouteDefine.getSpecialItemDataList(player.userId).then(v => {
                this.getClient(player).net_initHallBagItem(v);
            });
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            //延迟一秒种 处理离线时的自动存档
            setTimeout(() => {
                if (this._dataMap.has(player.playerId)) {
                    this._dataMap.delete(player.playerId);
                }
            }, 1e3);
        } catch (error) {
            console.error(error + "{BagModuleSLeftTypeError}");
        }
    }

    /**
     * 
     * @param datas 
     */
    public net_syncBagItem(pid: number, userId: string, bagItemDataString: string) {
        const bagItemData = JSON.parse(bagItemDataString);
        const playerItemDataList = this._dataMap.get(pid);
        let itemData = playerItemDataList.find(v => { return v.guid === bagItemData.guid });
        if (!itemData) {
            playerItemDataList.push(bagItemData);
        } else {
            itemData.count = bagItemData.count;
            itemData.customData = bagItemData.customData;
            itemData.nodeId = bagItemData.nodeId;
        }
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.BAGITEMS], [playerItemDataList]);
    }

    /** 由客户端主动发起的同步，会自动保存一次到存档 */
    public net_syncItems(datas: BagItemData[]) {
        this._dataMap.set(this.currentPlayerId, datas);

        if (this.currentPlayer) {
            const specialItemArr = datas.filter(v => { return BagDefine.checkIsSpecialItem(v.cfgId); });
            // 同步一下specialItem
            if (specialItemArr.length > 0) {
                RouteDataHelper.reqSetData(this.currentPlayer.userId, EGameTheme.Hall, [RouteDataType.SpecialItemDataList], [specialItemArr]);
            }
        }

        // 保存到存档
        ArchiveHelper.reqSetData(this.currentPlayer.userId, [ArchiveDataType.BAGITEMS], [datas], true);
    }

    public saveDataAtPlayerLeave(playerId: number, cfgId: number, customData: string, clueGuid: string = "", count: number = 1, needSelect: boolean = true, showTips = true, isForce: boolean = false) {
        if (!this._dataMap.has(playerId)) {
            this._dataMap.set(playerId, []);
        }
        let arr = this._dataMap.get(playerId);
        let cfg = GameConfig.Item.getElement(cfgId);
        if (cfg.maxCount != 0) { //可以堆叠
            let grid = arr.find(e => {
                return e.cfgId == cfgId && e.customData == customData && e.count < cfg.maxCount;
            });
            if (grid) {
                //先把没填满的填满
                let deltaCount = cfg.maxCount - grid.count
                if (count > deltaCount) {
                    count -= deltaCount
                    grid.count = cfg.maxCount;
                }
            }
            //剩下的开新格子存储
            while (count > 0) {
                let itemdata = new BagItemData();
                itemdata.cfgId = cfgId;
                itemdata.customData = customData;
                itemdata.guid = `${Date.now()}_${cfgId}`;
                itemdata.count = Math.min(count, cfg.maxCount);
                arr.push(itemdata);
                count -= cfg.maxCount;
            }
        } else {
            while (count > 0) {
                let itemdata = new BagItemData();
                itemdata.cfgId = cfgId;
                itemdata.customData = customData;
                itemdata.guid = `${Date.now()}_${cfgId}`;
                itemdata.count = 1;
                arr.push(itemdata);
                count--;
            }
        }
        // 保存到存档
        ArchiveHelper.reqSetData(Player.getPlayer(playerId).userId, [ArchiveDataType.BAGITEMS], [arr], isForce);
    }

    /**
     * 增加物品
     * @param cfgId 配置表id
     * @param customData 自定义数据
     * @param needSaveToArchive 是否需要保存到存档 default true
     */
    public net_reqAddItem(playerId: number, cfgId: number, customData: string, clueGuid: string = "", count: number = 1, needSelect: boolean = true, showTips = true, isForce: boolean = false) {
        if (!this.getClient(this.currentPlayer)) {
            return;
        }
        if (!this._dataMap.has(playerId)) {
            this._dataMap.set(playerId, []);
        }
        let arr = this._dataMap.get(playerId);

        let cfg = GameConfig.Item.getElement(cfgId);
        if (!cfg) {
            return false;
        }

        /** 检查是否是货币类型，不入库 */
        if (cfg.clazz == "Currency") {
            this.trans2Currency(playerId, cfg, count, clueGuid);
            return true;
        }

        /** 热武器只能拥有一把 */
        if (cfg.clazz == "HotWeaponItem" && arr.filter(v => { return v.cfgId === cfg.id }).length != 0) {
            return false;
        }

        if (BagDefine.checkIsSpecialItem(cfgId)) {
            if (clueGuid != "") {
                ModuleService.getModule(InterSaveModuleS).net_deleteClue(playerId, clueGuid);
            }
            RouteDefine.addSpecialItem(Player.getPlayer(playerId).userId, cfgId, count);
            return true;
        }

        // 最大格子超过了零的有限制的
        if (cfg.maxGrid > 0) {
            // 检查一下是否超过最大格子
            let grids = arr.filter(e => { return e.cfgId === cfgId });
            // 是否还有容纳的余地
            if (grids.length > cfg.maxGrid) {
                this.getClient(playerId).net_tipsMaxGrid(cfgId);
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
                    this.getClient(playerId).net_tipsMaxGrid(cfgId);
                    return false;
                }
            }
        }
        let grid = arr.find(e => {
            return e.cfgId == cfgId && e.customData == customData && e.count < cfg.maxCount;
        });



        /** 溢出的数量 - 如果这次存的数量太多了，将会触发加存机制 */
        let extraCount: number = 0;

        if (!grid) {
            let itemdata = new BagItemData();
            itemdata.cfgId = cfgId;
            itemdata.customData = customData;
            itemdata.guid = `${Date.now()}_${cfgId}`;
            // 可以堆叠的情况
            if (cfg.maxCount != 0) {
                if (count > cfg.maxCount) {
                    itemdata.count = cfg.maxCount;
                    // 溢出了
                    extraCount = count - cfg.maxCount;
                } else {
                    itemdata.count = count;
                }
            }
            // 不能堆叠
            else {
                itemdata.count = 1;
            }
            arr.push(itemdata);
            grid = itemdata;
        } else {
            if (grid.count + count > cfg.maxCount) {
                let needCount = cfg.maxCount - grid.count;
                grid.count += needCount;
                // 溢出了
                extraCount = count - needCount;
            } else {
                grid.count += count;
            }


        }

        Event.dispatchToLocal(BagDefine.AddItemEvt, playerId, cfgId, customData);
        if (clueGuid != "") {
            ModuleService.getModule(InterSaveModuleS).net_deleteClue(playerId, clueGuid);
        }

        // 保存到存档
        ArchiveHelper.reqSetData(Player.getPlayer(playerId).userId, [ArchiveDataType.BAGITEMS], [arr], isForce);

        this.getClient(playerId).net_resAddItem(needSelect, grid, showTips);

        /** 溢出了，加存 */
        if (extraCount > 0) {
            // 等等同步
            setTimeout(() => { this.net_reqAddItem(playerId, cfgId, customData, clueGuid, extraCount, needSelect, showTips); }, 20);
        }

        return true;
    }

    /**
     * 将道具转换成货币
     * @param pid 
     * @param cfg 
     * @param count 
     * @param clueGuid 
     */
    private trans2Currency(pid: number, cfg: IItemElement, count: number, clueGuid: string) {
        let player = Player.getPlayer(pid);
        if (!player) {
            return;
        }
        if (cfg.clazzParam.length < 2) {
            return;
        }
        let num = cfg.clazzParam.map(e => { return Number(e); })
        if (!num[0] || !num[1]) {
            return;
        }
        num[0] = Math.round(num[0]);
        num[1] = MathUtil.clamp(num[1], 0, Number.MAX_SAFE_INTEGER);
        let mount = Math.round(count * num[1]);
        console.log("获得了恐惧比" + mount)
        RouteDefine.changeFearCoin(player.userId, mount);
        if (clueGuid != "") {
            ModuleService.getModule(InterSaveModuleS).net_deleteClue(pid, clueGuid);
        }
        this.getClient(player).net_tipsCurrency(cfg.id, mount);
    }

    public getItemGuid(playerId: number, cfgId: number, customData: string = ""): string {
        let arr = this._dataMap.get(playerId);
        let index = arr.findIndex(e => { return e.cfgId == cfgId && customData == customData });
        if (index == -1) {
            return "";
        }
        return arr[index].guid;
    }

    public getItemsById(pid: number, cfgId: number): BagItemData[] {
        let arr = this._dataMap.get(pid);
        if (!arr) { return; }
        return arr.filter(v => { return v.cfgId === cfgId });
    }

    public getItemCount(pid: number, cfgId: number) {
        return this.getItemsById(pid, cfgId).map(e => { return e.count }).reduce((a, b) => { return a + b }, 0)
    }

    /** 找到并移除多个道具并返回 */
    public net_reqChangeItemCount(pid: number, itemId: number, deltaNum: number) {

        if (deltaNum === 0) { return 0; }

        // 减
        if (deltaNum < 0) {
            deltaNum = Math.abs(deltaNum);
            let items = this.getItemsById(pid, itemId);
            if (!items) { return 0; }
            // 先减少的，再减多的
            items.sort((a, b) => { return a.count - b.count });
            let finalCount = 0;
            for (let data of items) {
                if (data.count >= deltaNum) {
                    finalCount += deltaNum;
                    this.removeItem(pid, data.guid, deltaNum);
                    break;
                } else {
                    deltaNum -= data.count;
                    finalCount += data.count;
                    this.removeItem(pid, data.guid, data.count);
                }
            }
            return finalCount;
        }
        // 加
        else {
            this.net_reqAddItem(pid, itemId, "", "", deltaNum, false, false);
            // TODO:这里的返回数量不一定准确，因为有可能被背包上限卡住
            return deltaNum;
        }
    }

    /**
     * 移除一个玩家背包中某个格子的道具
     * @param playerId 
     * @param guid 格子id
     * @param discardCount 可选参数，不传将会移除这个格子中所有的堆叠道具
     */
    public removeItem(playerId: number, guid: string, discardCount?: number) {
        let arr = this._dataMap.get(playerId);
        if (!arr) {
            console.error("玩家的背包为空");
            return false;
        }
        let index = arr.findIndex(e => { return e.guid == guid });
        if (index == -1) {
            return false;
        }
        // 需要处理的数据体 - 注意这里是引用
        const bagData: BagItemData = arr[index];
        // 需要删减的数量
        const newDiscardCount = discardCount ? discardCount : bagData.count;
        // 特殊道具有特殊道具的处理逻辑
        if (BagDefine.checkIsSpecialItem(bagData.cfgId)) {
            // 需要将引用转换成拷贝
            const cloneBagData = this.cloneBagData(bagData);
            cloneBagData.count -= newDiscardCount;
            Event.dispatchToLocal(BagDefine.RemoveItemEvt, playerId, cloneBagData);

            // 改变玩家的特殊道具存档
            const player = Player.getPlayer(playerId);
            player && RouteDefine.removeSpecialItem(player.userId, bagData.cfgId, newDiscardCount);
        } else {
            bagData.count -= newDiscardCount;
            Event.dispatchToLocal(BagDefine.RemoveItemEvt, playerId, bagData);
            if (bagData.count == 0) { arr.splice(index, 1); }

            // 保存
            ArchiveHelper.reqSetData(Player.getPlayer(playerId).userId, [ArchiveDataType.BAGITEMS], [arr]);

            // 通知客户端更新信息
            this.getClient(playerId).net_removeItem(guid, bagData.count);
        }
        return true;
    }

    public cloneBagData(bagData: BagItemData) {
        let cloneData = new BagItemData();
        cloneData.cfgId = bagData.cfgId;
        cloneData.count = bagData.count;
        cloneData.customData = bagData.customData;
        cloneData.guid = bagData.guid;
        cloneData.nodeId = bagData.nodeId;
        return cloneData;
    }

    public getItem(playerId: number, guid: string) {
        let arr = this._dataMap.get(playerId);
        let index = arr.findIndex(e => { return e.guid == guid });
        if (index == -1) {
            return null;
        }
        return arr[index];
    }

    @Decorator.noReply()
    public net_changeItems(addItems: number[], removeItems: number[]) {
        addItems.forEach(e => {
            this.net_reqChangeItemCount(this.currentPlayerId, e, 1);
        })

        removeItems.forEach(e => {
            this.net_reqChangeItemCount(this.currentPlayerId, e, -1);
        })
    }

    public addItems(playerId: number, bagItemDataArr: IBagItemData[]) {
        // for (let index = 0; index < bagItemDataArr.length; index++) {
        //     const element = bagItemDataArr[index];
        //     this.net_reqAddItem(playerId, element.cfgid, "", "", element.count, false, false)
        // }
        if (!this.getClient(this.currentPlayer)) {
            return;
        }

        if (!this._dataMap.has(playerId)) {
            this._dataMap.set(playerId, []);
        }
        let nowArr = this._dataMap.get(playerId);
        let newArr = bagItemDataArr.map(v => {
            let itemdata = new BagItemData();
            itemdata.cfgId = v.cfgId;
            itemdata.customData = "";
            itemdata.guid = `${Date.now()}_${v.cfgId}`;
            itemdata.count = v.count;
            return itemdata;
        })
        nowArr = nowArr.concat(newArr);
        this._dataMap.set(playerId, newArr);
        this.getClient(playerId).net_resAddItems(newArr);
    }
}