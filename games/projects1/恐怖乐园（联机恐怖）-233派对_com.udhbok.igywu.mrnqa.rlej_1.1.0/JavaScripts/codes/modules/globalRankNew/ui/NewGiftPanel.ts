/*
 * @Author       : dal
 * @Date         : 2024-05-27 16:49:30
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-02 15:52:48
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\ui\NewGiftPanel.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { IGiftElement } from "../../../../config/Gift";
import { IItemElement } from "../../../../config/Item";
import NewCardGift_UI_Generate from "../../../../ui-generate/ShareUI/rank/NewCardGift_UI_generate";
import NewGiftItem_UI_Generate from "../../../../ui-generate/ShareUI/rank/NewGiftItem_UI_generate";
import Tips from "../../../utils/Tips";
import { GridSelectContainer } from "../../../utils/UIPool";
import { BagItemData } from "../../bag/BagDefine";
import { BaseInfo } from "../../idcard/IDCardConst";
import { IDCardModuleC } from "../../idcard/IDCardModule";
import { RouteDefine } from "../../route/RouteDefine";
import { EBaseRankDataType } from "../NewRankDefine";

class NewGiftItem extends NewGiftItem_UI_Generate {

    public giftCfg: IGiftElement;

    public itemCfg: IItemElement;

    selectColor = LinearColor.colorHexToLinearColor("#A60000FF");
    unSelectColor = LinearColor.colorHexToLinearColor("#363636FF");

    public initData(giftCfg: IGiftElement) {
        this.giftCfg = giftCfg;
        this.itemCfg = GameConfig.Item.getElement(giftCfg.itemId);
        // this.img_bg.imageGuid = GameConfig.ItemQuality.getElement(this.itemCfg.quality).imgGuid;
        this.img_icon.imageGuid = this.itemCfg.icon;
    }

    private curData: BagItemData;

    public get haveCount() {
        return (this.curData ? this.curData.count : 0);
    }

    public setData(specialItemArr: BagItemData[], isGiftTab: boolean) {
        this.curData = specialItemArr.find(v => { return v.cfgId === this.itemCfg.id });
        if (isGiftTab) { this.text_num.text = ""; }
        else { this.text_num.text = this.haveCount + ""; }
    }

    public onSelect: Action;
    public isSelected: boolean = false;

    public onStart() {
        this.onSelect = new Action();
        this.giftBtn.onClicked.add(() => {
            this.call();
        });
    }

    public call() {
        this.selfPanel.switchItem(this);
        if (this.isSelected) { return; }
        this.onSelect.call();
    }

    private get selfPanel() {
        return UIService.getUI(NewGiftPanel);
    }

    public setSelected(isTrue: boolean) {
        this.img_bg.imageColor = isTrue ? this.selectColor : this.unSelectColor;
    }
}

enum ETabType {

    /** 礼物页 */
    Gift,
    /** 背包页 */
    Bag,
    /** 空 */
    None,
}

export class NewGiftPanel extends NewCardGift_UI_Generate {

    private rankType: EBaseRankDataType;

    private playerBaseInfo: BaseInfo;

    /**
     * @param baseInfo 基本信息，从玩家名片上获取
     * @param rankType 排行类型 有可能是从排行榜打开的
     */
    protected onShow(baseInfo: BaseInfo, rankType?: EBaseRankDataType) {
        // if (this.rankType && this.rankType != rankType) { UIService.hideUI(newRankPanelMgrIns.getPanel(this.rankType)); }
        this.rankType = rankType;
        this.btn_send.enable = true;
        if (this.playerBaseInfo && baseInfo.id === this.playerBaseInfo.id) { return; }
        this.curTab = ETabType.None;
        this.playerBaseInfo = baseInfo;
        this.shiftTab(ETabType.Gift);
    }

    
    private giftContainer: GridSelectContainer<NewGiftItem>;

    private tabBtnArr: Button[] = [];

    protected onStart() {
        // 先排个序
        GameConfig.Gift.getAllElement().sort((a, b) => { return a.price - b.price });

        // 图标
        this.img_money.imageGuid = GameConfig.SubGlobal.fearCoinIcon.string;

        // 监听打开
        Event.addLocalListener("ShowNewGiftPanel", (baseInfo: BaseInfo) => {
            UIService.showUI(this, UILayerDialog, baseInfo);
        });

        // btn些
        this.tabBtnArr.push(this.btn_buyGift);
        this.tabBtnArr.push(this.btn_pocket);
        this.btn_back.onClicked.add(() => { UIService.hideUI(this); });
        this.btn_send.onClicked.add(this.buyGift.bind(this));
        this.btn_up.onClicked.add(this.onAddClick.bind(this));
        this.btn_down.onClicked.add(this.onReduceClick.bind(this));
        this.tabBtnArr.forEach((btn, id) => {
            btn.onClicked.add(() => { this.shiftTab(id); });
        });

        // 所有礼物展示
        this.canvas_giftList.removeAllChildren();
        this.giftContainer = new GridSelectContainer(this.canvas_giftList, NewGiftItem);
        this.layer = mw.UILayerDialog;
    }

    /** 当亲选中的礼物 */
    private curGiftItem: NewGiftItem;

    public switchItem(giftItem: NewGiftItem) {
        if (!giftItem) { return; }
        this.curGiftItem = giftItem;
        this.sendCount = 1;
        this.haveCount = this.curTab === ETabType.Gift ? 0 : giftItem.haveCount;
        this.countCost();
    }

    private curTab: ETabType = ETabType.None;

    public async shiftTab(tabType: ETabType) {
        if (this.curTab === tabType) { return; }
        this.curTab = tabType;
        const itemArr: BagItemData[] = await RouteDefine.getSpecialItemDataList(Player.localPlayer.userId);
        this.giftContainer.clear();
        switch (tabType) {
            case ETabType.Gift:
                // 下划线
                this.setGiftTabHightLight(true);

                // 加载节点
                GameConfig.Gift.getAllElement().forEach(giftCfg => {
                    const node = this.giftContainer.addNode();
                    node.initData(giftCfg);
                    node.setData(itemArr, true);
                });
                this.giftContainer.getFirstUsedNode().call();
                break;
            case ETabType.Bag:
                // 下划线
                this.setGiftTabHightLight(false);

                // 加载节点
                GameConfig.Gift.getAllElement().forEach(giftCfg => {
                    const itemIndex = itemArr.findIndex(v => { return v.cfgId === giftCfg.itemId && v.count > 0 });
                    if (itemIndex != -1) {
                        const node = this.giftContainer.addNode();
                        node.initData(giftCfg);
                        node.setData(itemArr, false);
                    }
                });
                this.sendCount = 1;
                const firstNode = this.giftContainer.getFirstUsedNode();
                if (firstNode) { firstNode.call(); }
                else {
                    this.text_tips.text = "";
                    this.curGiftItem = null;
                    this.countCost();
                }
                break;
        }
    }

    /**
     * 设置送礼界面高亮
     */
    private setGiftTabHightLight(isTrue: boolean) {
        this.text_buyGift.underlineEnable = isTrue;
        this.text_pocket.underlineEnable = !isTrue;

        // 控制些UI显隐
        this.text_moneyNum.visibility = isTrue ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.img_money.visibility = isTrue ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    protected onHide() {
        // if (this.rankType) { UIService.hideUI(newRankPanelMgrIns.getPanel(this.rankType)); }
        this.curGiftItem = null;
        this.rankType = null;
        this.curTab = ETabType.None;
        this.playerBaseInfo = null;
    }

    private sendCount: number = 1;

    private haveCount: number = 0;

    /** 总开销 */
    private cost: number = 0;

    /** 需要购买的数量 */
    private needBuyCount: number = this.sendCount;

    /** 计算花费 */
    private countCost() {
        this.text_buyNum.text = this.sendCount + "";
        if (!this.curGiftItem) { return; }
        this.needBuyCount = this.sendCount - this.haveCount;
        const needCost = this.needBuyCount * this.curGiftItem.giftCfg.price;
        this.cost = needCost > 0 ? needCost : 0;
        this.text_moneyNum.text = this.cost + "";
        this.text_tips.text = `赠送${this.playerBaseInfo.n}${this.sendCount}个${this.curGiftItem.giftCfg.name}，增加${this.curGiftItem.giftCfg.charmVal * this.sendCount}点魅力值`;
    }

    private onAddClick() {
        if (!this.curGiftItem) {
            Tips.show("增加失败，请先选择要赠送的礼物");
            return;
        }
        if (this.curTab === ETabType.Bag && this.sendCount >= this.curGiftItem.haveCount) {
            Tips.show(`增加失败，只剩${this.haveCount}个了`);
            return;
        }
        this.sendCount += 1;
        this.countCost();
    }

    private onReduceClick() {
        if (!this.curGiftItem) {
            Tips.show("减少失败，请先选择要赠送的礼物");
            return;
        }
        if (this.sendCount <= 1) { Tips.show("不能少于一个"); return; }
        this.sendCount -= 1;
        this.countCost();
    }

    private get idCardModule() {
        return ModuleService.getModule(IDCardModuleC);
    }

    private async buyGift() {
        if (!this.curGiftItem) {
            Tips.show("赠送失败，请选择要赠送的礼物");
            return;
        }
        this.btn_send.enable = false;
        let curTab = this.curTab;
        this.curTab = ETabType.None;
        if (await this.idCardModule.checkCanPurChase(this.curGiftItem.giftCfg, this.cost)) {
            if (this.idCardModule.reqGift(this.playerBaseInfo.id, this.curGiftItem.giftCfg.id, this.sendCount, false, curTab == ETabType.Gift)) {
                Tips.show("赠送成功！");
            } else {
                Tips.show("赠送失败！");
            }
            // 刷新一下
            this.shiftTab(curTab);
            this.btn_send.enable = true;
        }
    }

}