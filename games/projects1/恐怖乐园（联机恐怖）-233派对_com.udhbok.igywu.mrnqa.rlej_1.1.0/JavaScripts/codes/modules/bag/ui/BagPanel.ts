import { GameConfig } from "../../../../config/GameConfig";
import Bag_UI_Generate from "../../../../ui-generate/ShareUI/Bag_UI_generate";
import GameStart, { EGameTheme } from "../../../GameStart";
import { BagItemUI, EBagItemType } from "../../../ui/BagItemUI";
import { TimerOnly } from "../../../utils/AsyncTool";
import { GlobalSwitch } from "../../../utils/GlobalSwitch";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { GridSelectContainer } from "../../../utils/UIPool";
import { EquipDefine } from "../../equip/EquipDefine";
import { RouteDefine } from "../../route/RouteDefine";
import TreasureData from "../../treasure/TreasureData";
import { BagDefine, BagItemData } from "../BagDefine";
import { BagModuleC } from "../BagModuleC";
import { ItemUseBox } from "./ItemUseBox";

export default class BagPanel extends Bag_UI_Generate {
    /** 当前显示的界面 */
    public curView: number = 1;

    /** 物品栏道具容器 */
    private viewContainer: GridSelectContainer<BagItemUI>;

    /** 背包中普通道具的容器 */
    private normalContainer: GridSelectContainer<BagItemUI>;

    /** 特殊道具容器 */
    private specialContainer: GridSelectContainer<BagItemUI>;

    /** 背包道具数据列表 */
    private bagItemDataList: BagItemData[] = [];

    private initContainer() {
        this.canvas_prop.removeAllChildren();
        this.viewContainer = new GridSelectContainer(this.canvas_prop, BagItemUI);
        this.normalContainer = new GridSelectContainer(this.canvas_items01, BagItemUI);
        this.specialContainer = new GridSelectContainer(this.canvas_items, BagItemUI);
        for (let index = 0; index < BagDefine.ViewCount; index++) {
            this.addNode(EBagItemType.View);
        }
        for (let index = 0; index < BagDefine.NormalItemCapacity; index++) {
            this.addNode(EBagItemType.Normal);
        }
        for (let index = 0; index < BagDefine.SpecialItemCapacity; index++) {
            this.addNode(EBagItemType.Special);
        }
    }

    /** 每种容器节点序号数组 */
    private viewNodeIdArr: number[] = [];

    private normalNodeIdArr: number[] = [];

    private specialNodeIdArr: number[] = [];

    /** 节点计数器 */
    private nodeCount: number = 0;

    /**
     * 统一添加 node 接口
     * @param nodeType 节点类型
     * @returns 新增节点
     */
    private addNode(nodeType: EBagItemType): BagItemUI {
        let node;
        switch (nodeType) {
            case EBagItemType.View:
                node = this.viewContainer.addNode();
                this.viewNodeIdArr.push(this.nodeCount);
                break;
            case EBagItemType.Normal:
                node = this.normalContainer.addNode();
                this.normalNodeIdArr.push(this.nodeCount);
                break;
            case EBagItemType.Special:
                node = this.specialContainer.addNode();
                this.specialNodeIdArr.push(this.nodeCount);
                break;
        }
        node.initNode(this.nodeCount++, nodeType);
        node.setAsEmpty();
        return node;
    }

    /** 刷新一下背包 */
    public refresh() {
        this.viewContainer.nodes.forEach(v => { v.refresh() });
        this.normalContainer.nodes.forEach(v => { v.refresh() });
        this.specialContainer.nodes.forEach(v => { v.refresh() });
    }

    /**
     * 根据nodeId找到一个节点
     * @param nodeId 可能的节点id
     * @param itemId 道具id 要根据id判断是否找对格子
     * @param needAddIfNotExist 如果没找到，是否需要新增一个节点 但是节点id可能不是传进来的这个nodeId default true
     */
    public findNode(nodeId: number, itemId: number, needAddIfNotExist: boolean = true): BagItemUI {
        let node;
        const isSpecialItem = BagDefine.checkIsSpecialItem(itemId);
        const nodeType = this.getNodeType(nodeId);
        switch (nodeType) {
            case EBagItemType.View:
                node = this.viewContainer.nodes.find(v => { return v["nodeId"] === nodeId });
                break;
            case EBagItemType.Normal:
                if (!isSpecialItem) { node = this.normalContainer.nodes.find(v => { return v["nodeId"] === nodeId }); }
                break;
            case EBagItemType.Special:
                if (isSpecialItem) { node = this.specialContainer.nodes.find(v => { return v["nodeId"] === nodeId }); }
                break;
        }
        if (!node && needAddIfNotExist) {
            node = this.findFistEmptyNode(isSpecialItem);
        }
        return node;
    }

    /**
     * 根据道具类型，找到第一个适合它的空格子，如果没找到就新增一个
     * 会先在viewContainer找，没找到根据是否特殊道具分别去specialContainer找和normalContainer找
     * @param isSpecialItem 是否特殊道具
     */
    private findFistEmptyNode(isSpecialItem: boolean = false): BagItemUI {
        let node = this.viewContainer.nodes.find(v => { return !v.data });
        if (!node) {
            if (isSpecialItem) {
                node = this.specialContainer.nodes.find(v => { return !v.data });
                if (!node) { node = this.addNode(EBagItemType.Special); }
            } else {
                node = this.normalContainer.nodes.find(v => { return !v.data });
                if (!node) { node = this.addNode(EBagItemType.Normal); }
            }
        }
        return node;
    }

    /**
     * 获取一个节点类型根据节点id, 如果都没找到会返回 EBagItemType.Special
     * @param nodeId 节点id
     */
    private getNodeType(nodeId: number): EBagItemType {
        if (this.viewNodeIdArr.includes(nodeId)) {
            return EBagItemType.View;
        }
        if (this.normalNodeIdArr.includes(nodeId)) {
            return EBagItemType.Normal;
        }
        return EBagItemType.Special;
    }

    private get selfModule() {
        return ModuleService.getModule(BagModuleC);
    }

    private syncTimer: TimerOnly = new TimerOnly();

    /**
     * 同步背包数据，每次会等等再一起同步，默认是慢同步
     * @param syncQuick 快同步，不需要等
     */
    public syncItemData(syncQuick: boolean = false) {
        if (syncQuick) {
            this.syncTimer.stop();
            this.selfModule.reqSyncBagData(this.bagItemDataList);
        } else {
            this.syncTimer.setTimeout(() => {
                this.selfModule.reqSyncBagData(this.bagItemDataList);
            }, 3e2);
        }
    }

    private initEvt() {
        if (GlobalSwitch.enableBagItemMark()) {
            this.viewContainer.onNodeRemoveAction.add((node: BagItemUI) => {
                node.text_type.text = "";
            });
        }
        Event.addLocalListener(EquipDefine.EquipEvt, this.onEquipItem.bind(this));
        Event.addLocalListener(BagDefine.OnItemInit, this.onItemInit.bind(this));
        Event.addLocalListener(BagDefine.AddItemEvt, this.onItemAdd.bind(this));
        Event.addLocalListener(BagDefine.RemoveItemEvt, this.onItemRemove.bind(this));
        Event.addLocalListener(BagDefine.OnItemChangeEvt, (bagItemList: BagItemData[]) => { this.bagItemDataList = bagItemList; })
        //初始化货币显示
        RouteDefine.getFearCoin(Player.localPlayer.userId).then(val => {
            this.text_freenum.text = val.toString()
        })
        //监听货币变化
        RouteDefine.onFearCoinChangeAction.add((money: number, delta: number) => {
            GhostTraceHelper.uploadMGS("ts_action_get_item", "玩家恐惧币变动", { item_id: Math.abs(delta), item_type: delta > 0 ? 0 : 1 });
            this.text_freenum.text = money.toString();
        })
    }

    private onEquipItem(equipData: BagItemData) {
        if (this.curView != 1) { return; }
        // 没有装备了，需要取消选中当前道具
        if (!equipData) { this.viewContainer.beSelectedNode && this.viewContainer.beSelectedNode.onSelect.call(); return; }
        const equipItemUI = this.viewContainer.nodes.find(v => { return v.data && v.data.guid === equipData.guid });
        if (!equipItemUI) {
            console.error(`DEBUG MyTypeError>>> 装备itemUI有问题${JSON.stringify(equipData)}`);
            return;
        }
        if (this.viewContainer.beSelectedNode != equipItemUI) {
            equipItemUI.onSelect.call();
        }
    }

    private onItemInit(bagList: BagItemData[]) {
        this.bagItemDataList = bagList;
        console.log("DEBUG>>> onItemInit", JSON.stringify(this.bagItemDataList));
        this.bagItemDataList.forEach(bagItem => {
            if (!BagDefine.checkNeedViewInBagByCfgId(bagItem.cfgId)) { return; }
            console.log("DEBUG>>> bagItemData: ", JSON.stringify(bagItem));
            if (bagItem["nodeId"] >= 0) {
                let uiNode = this.findNode(bagItem.nodeId, bagItem.cfgId);
                // 被鸠占鹊巢了，重新找一个
                if (uiNode.data) { uiNode = this.findFistEmptyNode(BagDefine.checkIsSpecialItem(bagItem.cfgId)); }
                uiNode.setData(bagItem);
            } else {
                this.findFistEmptyNode(BagDefine.checkIsSpecialItem(bagItem.cfgId)).setData(bagItem);
            }
        });
    }

    protected onHide() {
        UIService.hide(ItemUseBox);
    }

    /**
     * 道具增加的回调
     * @param bagItem 道具数据
     * @param needEquip 是否需要装备
     * @returns 
     */
    private onItemAdd(bagItem: BagItemData, needEquip: boolean) {
        bagItem = this.bagItemDataList.find((v) => { return v.guid === bagItem.guid });
        if (!bagItem) { console.error("DEBUG>>> MyTypeError onItemAdd error"); return; }
        if (!BagDefine.checkNeedViewInBagByCfgId(bagItem.cfgId)) { return; }
        console.log("DEBUG>>> onItemAdd", JSON.stringify(bagItem));

        let uiNode: BagItemUI;
        if (bagItem["nodeId"] >= 0) {
            uiNode = this.findNode(bagItem.nodeId, bagItem.cfgId);
        } else {
            uiNode = this.findFistEmptyNode(BagDefine.checkIsSpecialItem(bagItem.cfgId));
        }
        uiNode.setData(bagItem);
        if (needEquip && this.curView === 1 && this.getNodeType(bagItem.nodeId) === EBagItemType.View) { EquipDefine.EquipItem(bagItem.guid); }
        this.syncItemData();
    }

    private onItemRemove(bagItem: BagItemData) {
        if (!BagDefine.checkNeedViewInBagByCfgId(bagItem.cfgId)) { return; }
        console.log("DEBUG>>> onItemRemove, ", JSON.stringify(bagItem), JSON.stringify(this.bagItemDataList));
        const uiNode = this.findNode(bagItem.nodeId, bagItem.cfgId);
        if (bagItem.count <= 0) {
            uiNode.setAsEmpty();
        } else {
            uiNode.setData(bagItem);
        }
    }

    /** 将所有容器归还 */
    public setAllNodeEmpty() {
        this.bagItemDataList.length = 0;
        this.viewContainer.nodes.forEach(itemUI => { itemUI.setAsEmpty(); });
        this.normalContainer.nodes.forEach(itemUI => { itemUI.setAsEmpty(); });
        this.specialContainer.nodes.forEach(itemUI => { itemUI.setAsEmpty(); });
    }

    private initBtn() {
        this.btn_back.onClicked.add(this.applyFirstView.bind(this));
        this.btn_expand.onClicked.add(this.applySecondView.bind(this));
        this.btn_openbag.onClicked.add(this.shiftView.bind(this));
        const closeBtnList: Button[] = [];
        closeBtnList.push(this.btn_close);
        closeBtnList.push(this.btn_close1);
        closeBtnList.push(this.btn_close2);
        closeBtnList.forEach(btn => {
            btn.clickMethod = ButtonClickMethod.PreciseClick;
            btn.onClicked.add(() => {
                this.checkExistSelectedItem()?.onSelect.call();
                this.exitChangeMode();
            });
        });
    }

    /** 检查是不是有需要交互的UI Item 可能是空 */
    public checkExistSelectedItem(): BagItemUI {
        if (this.curView != 2) { return; }
        if (this.viewContainer.beSelectedNode) {
            return this.viewContainer.beSelectedNode;
        }
        if (this.normalContainer.beSelectedNode) {
            return this.normalContainer.beSelectedNode;
        }
        return this.specialContainer.beSelectedNode;
    }

    /** 是否是交换物体的模式 */
    public isChangeMode: boolean = false;

    public enterChangeMode() {
        this.isChangeMode = true;
        Tips.show(LanUtil.getText("Code_008"));
    }

    public exitChangeMode() {
        this.isChangeMode = false;
    }

    /**
     * 交换两个格子
     * @param itemUI1 
     * @param itemUI2 
     */
    public reqChangeTwoItem(itemUI1: BagItemUI, itemUI2: BagItemUI) {
        let data1 = itemUI1.data;
        let data2 = itemUI2.data;
        if (!this.canChangeTwoItem(itemUI1, itemUI2)) {
            // 如果是交换道具栏道具交换失败了，那就给它找一个
            if (itemUI2["nodeId"] < BagDefine.ViewCount) {
                itemUI1.setAsEmpty();
                itemUI2.setData(data1);
                this.findFistEmptyNode(BagDefine.checkIsSpecialItem(data2.cfgId)).setData(data2);
                GhostTraceHelper.rebirthNum(data1.cfgId, 3);
                return;
            }
            Tips.show(GameConfig.SubLanguage.bag_01.Value);
            GhostTraceHelper.rebirthNum(data1.cfgId, 5);
            return;
        }
        data2 ? itemUI1.setData(data2) : itemUI1.setAsEmpty();
        data1 ? itemUI2.setData(data1) : itemUI2.setAsEmpty();
        GhostTraceHelper.rebirthNum(data1.cfgId, 3);
    }

    /**
     * 检查一个格子是否有数据，有的话就挪到从头开始的第一个空格子
     * @param uiNode 
     */
    public checkNodeExistAndMoveToNextNode(cfgId: number, nodeId: number) {
        const uiNode = this.findNode(nodeId, cfgId, false);
        if (uiNode.data) {
            const newNode = this.findFistEmptyNode(BagDefine.checkIsSpecialItem(cfgId));
            newNode.setData(uiNode.data);
            uiNode.setAsEmpty();
        }
    }

    /**
     * 是否能交换两个item
     */
    private canChangeTwoItem(itemUI1: BagItemUI, itemUI2: BagItemUI) {
        if (BagDefine.checkIsSpecialItem(itemUI1.data.cfgId) && itemUI2.type === EBagItemType.Normal) { return false; }
        if (!BagDefine.checkIsSpecialItem(itemUI1.data.cfgId) && itemUI2.type === EBagItemType.Special) { return false; }
        if (itemUI2.data && BagDefine.checkIsSpecialItem(itemUI2.data.cfgId) && itemUI1.type === EBagItemType.Normal) { return false; }
        if (itemUI2.data && !BagDefine.checkIsSpecialItem(itemUI2.data.cfgId) && itemUI1.type === EBagItemType.Special) { return false; }
        return true;
    }

    /**
     * 合并两个格子
     * @param itemUI1 
     * @param itemUI2 
     */
    public reqMergeTwoItem(itemUI1: BagItemUI, itemUI2: BagItemUI) {
        let data1 = itemUI1.data;
        let data2 = itemUI2.data;
        let needSync = this.selfModule.mergeTwoItem(this.bagItemDataList, data1, data2);
        itemUI1.setData(data2, needSync);
        itemUI2.setData(data1, needSync);
        GhostTraceHelper.rebirthNum(data1.cfgId, 3);
    }

    protected onStart() {
        this.layer = mw.UILayerBottom;
        this.initContainer();
        this.initEvt();
        this.initBtn();
    }

    /**
     * @param needPriorView 是否继承原来界面
     */
    protected onShow(needPriorView: boolean) {
        !needPriorView && this.applyFirstView();
        this.rootCanvas.renderOpacity = 1;
    }

    private shiftView() {
        if (this.curView === 1) {
            this.applySecondView();
        } else {
            this.applyFirstView();
        }
        this.checkTreasureTips()
    }

    /** 启用一级界面 */
    private applyFirstView() {
        this.curView = 1;
        this.exitChangeMode();
        this.canvas_bag.visibility = SlateVisibility.Collapsed;
        this.btn_expand.visibility = SlateVisibility.Visible;
        this.clearAllSelectNode();
        this.checkHasEquipWeapon();
        // EquipDefine.EquipItem(null);
    }

    /** 检查有没有装备道具，装备了的道具需要重新高亮 */
    private checkHasEquipWeapon() {
        if (EquipDefine.curPlayerEquipItem) {
            let nodeItemUI = this.findNode(EquipDefine.curPlayerEquipItem.nodeId, EquipDefine.curPlayerEquipItem.cfgId, false);
            // 如果没找到，取消掉这个假装备
            if (!nodeItemUI) { EquipDefine.EquipItem(null); return; }
            nodeItemUI.onSelect.call();
        }
    }

    /** 启用二级界面 */
    private applySecondView() {
        this.curView = 2;
        EquipDefine.EquipItem(null);
        this.canvas_bag.visibility = SlateVisibility.SelfHitTestInvisible;
        this.btn_expand.visibility = SlateVisibility.Collapsed;
        this.viewContainer.beSelectedNode && this.viewContainer.beSelectedNode.onSelect.call();
        this.checkTreasureTips()
    }

    private clearAllSelectNode() {
        this.viewContainer.beSelectedNode && this.viewContainer.beSelectedNode.onSelect.call();
        this.normalContainer.beSelectedNode && this.normalContainer.beSelectedNode.onSelect.call();
        this.specialContainer.beSelectedNode && this.specialContainer.beSelectedNode.onSelect.call();
    }

    private checkTreasureTips() {
        if (GameStart.GameTheme === EGameTheme.Hall) {
            let remainTimes = GameConfig.SubGlobal.openBoxTimes.number - DataCenterC.getData(TreasureData).openTimes
            this.textTreasureTips.text = remainTimes > 0 ? StringUtil.format(LanUtil.getText("Code_009"), remainTimes) : ""
        }
    }
}