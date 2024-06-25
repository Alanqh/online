import { RedDotModuleC } from "module_reddot";
import { GameConfig } from "../../../config/GameConfig";
import { IShopElement } from "../../../config/Shop";
import { GlobalData } from "../../../const/GlobalData";
import { CoinType, EnumAnalytics, RedDotType, ShopFirstDo, ShopType, TabType } from "../../../const/enum";
import GiftCanvas_Generate from "../../../ui-generate/Shop/GiftCanvas_generate";
import Hot_Generate from "../../../ui-generate/Shop/Hot_generate";
import LevelTab_1_Generate from "../../../ui-generate/Shop/LevelTab_1_generate";
import LevelTab_2_Generate from "../../../ui-generate/Shop/LevelTab_2_generate";
import Money_Generate from "../../../ui-generate/Shop/Money_generate";
import ShopCanvas_Generate from "../../../ui-generate/Shop/ShopCanvas_generate";
import ShopMain_Generate from "../../../ui-generate/Shop/ShopMain_generate";
import VIP_Generate from "../../../ui-generate/Shop/VIP_generate";
import { utils } from "../../../utils/uitls";
import { AnalyticsModuleC } from "../../Analytics/AnalyticsModule";
import { P_HUD } from "../../GameHud/UI/P_HUD";
import TSIAP from "../IAPInstance";
import { ShopData } from "../ShopData";
import { P_GiftItem, P_ShopItem } from "./P_ShopItem";
import { P_Icon } from "./P_BuyDetails";
import { IShopItemElement } from "../../../config/ShopItem";

/**商店主ui */
export class P_Shop extends ShopMain_Generate {

    /**
    * 点击事件 参数：商店类型，配置id 
    * @description C端判断后 到S端再次判断
    */
    public onClickAC: Action2<ShopType, number> = new Action2();
    /**红点提示 */
    public onRedNoteAC: Action2<ShopType, boolean> = new Action2();
    /**买补给礼包 */
    public onBuySupplyAC: Action = new Action();
    /**买会员 */
    public onBuyVipAC: Action = new Action();
    /**看广告事件 */
    public onWatchADAC: Action = new Action();

    private canvasArr: P_ShopCanvas[] = [];

    private lastSeleTab: LevelTab_1_Generate = null;
    private lastCfg: IShopElement = null;
    private tabArr: Map<TabType, LevelTab_1_Generate> = new Map();
    /**乐币余额ui */
    private happyBalanceUI: Money_Generate = null;
    /**异常币余额ui */
    private abnormalBalanceUI: Money_Generate = null;
    /**代币余额UI */
    private bioCoinUI: Money_Generate = null;

    onStart() {
        this.layer = UILayerMiddle;

        this.mButton_Close.onClicked.add(() => {
            // UIService.getUI(P_ScreeShow).itemId++;
            // if (UIService.getUI(P_ScreeShow).itemId > 11013) {
            //     UIService.getUI(P_ScreeShow).hide();
            // } else {
            //     UIService.getUI(P_ScreeShow).hide();
            //     ModuleService.getModule(ShopModuleC).showScreenShop(UIService.getUI(P_ScreeShow).itemId);
            // }
            this.hide();
        });
    }

    public init() {
        let redDot = ModuleService.getModule(RedDotModuleC);

        GameConfig.Shop.getAllElement().forEach((cfg) => {
            if (cfg.tabLevel == 2) return;

            let item = UIService.create(LevelTab_1_Generate);
            item.uiObject.size = item.rootCanvas.size;
            item.mText_TagName.text = cfg.tabName;
            this.mCanvas_Tab.addChild(item.uiObject);
            this.tabArr.set(cfg.ID, item);
            item.mBtn_Tab.onClicked.add(() => {
                this.changeTab(cfg.ID);
            });

            let ui: P_ShopCanvas = null;
            switch (cfg.ID) {
                case TabType.Score:
                    ui = UIService.create(P_Score);
                    this.mCanvas_Porp.addChild(ui.uiObject);
                    break;
                case TabType.Coin:
                    ui = UIService.create(P_Coin);
                    this.mCanvas_Charge.addChild(ui.uiObject);
                    break;
                case TabType.Gift:
                    ui = UIService.create(P_Gift);
                    this.mCanvas_Gift.addChild(ui.uiObject);
                    redDot.addRedDotPathByEvt(RedDotType.Hot, RedDotType.GiftLevel_1, item.mBtn_Tab);
                    break;
                case TabType.Supply:
                    ui = UIService.create(P_Supply);
                    this.mCanvas_Supply.addChild(ui.uiObject);
                    redDot.addRedDotPathByEvt(RedDotType.Hot, RedDotType.SupplyLevel_1, item.mBtn_Tab);
                    break;
                case TabType.Vip:
                    ui = UIService.create(P_Vip);
                    this.mCanvas_Vip.addChild(ui.uiObject);
                    redDot.addRedDotPathByEvt(RedDotType.Hot, RedDotType.VipLevel_1, item.mBtn_Tab);
                    break;
                case TabType.Recharge:
                    ui = UIService.create(P_Money);
                    this.mCanvas_Recharge.addChild(ui.uiObject);
                    break;
                case TabType.Pendant:
                    ui = UIService.create(P_Pendant);
                    this.mCanvas_Pendant.addChild(ui.uiObject);
                    break;
                default:
                    break;
            }
            ui.uiObject.size = ui.rootCanvas.size;
            if (!ui) {
                console.error(`lwj 商店类型错误 ${cfg.ID}`);
                return;
            }
            ui.init(cfg, this);
            this.canvasArr.push(ui);
        });
        //乐币余额显示
        this.happyBalanceUI = UIService.create(Money_Generate);
        this.mCanvas_MyGold.addChild(this.happyBalanceUI.uiObject);
        this.happyBalanceUI.uiObject.size = this.happyBalanceUI.rootCanvas.size;
        this.happyBalanceUI.mImage_Icon.imageGuid = GlobalData.Shop.icons[CoinType.Coin]
        this.happyBalanceUI.mButton_Pay.onClicked.add(() => {
            TSIAP.instance.reqBuyGoods("4gXL1zT0000C2", 1);
        });
        //异常币余额显示
        this.abnormalBalanceUI = UIService.create(Money_Generate);
        this.mCanvas_MyAbCoin.addChild(this.abnormalBalanceUI.uiObject);
        this.abnormalBalanceUI.uiObject.size = this.abnormalBalanceUI.rootCanvas.size;
        this.abnormalBalanceUI.mImage_Icon.imageGuid = GlobalData.Shop.icons[CoinType.Abnormal]
        this.abnormalBalanceUI.mButton_Pay.onClicked.add(() => {
            this.showShop(ShopType.Shop, TabType.Recharge);
        });
        //代币余额显示
        this.bioCoinUI = UIService.create(Money_Generate);
        this.mCanvas_MyBioCoin.addChild(this.bioCoinUI.uiObject);
        this.bioCoinUI.uiObject.size = this.bioCoinUI.rootCanvas.size;
        this.bioCoinUI.mImage_Icon.imageGuid = GlobalData.Shop.icons[CoinType.BioCoin]
        this.bioCoinUI.mButton_Pay.visibility = SlateVisibility.Collapsed;
    }

    /**
     * 切换一级标签
     * @param tabType 一级标签
     * @param tabLevel2 二级标签
     */
    private changeTab(tabType: TabType, tabLevel2?: number) {
        this.canvasArr.forEach((ui) => {
            ui.changeTab(tabType, tabLevel2);
        });
        this.cancelSeleBtn(tabType);
    }

    /**一级标签背景显隐 */
    private levelImgVis_1(tabType: TabType, vis: boolean) {
        switch (tabType) {
            case TabType.Coin:
                this.mImg_Tab1.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
                break;
            case TabType.Score:
                this.mImg_Tab2.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
                break;
            case TabType.Gift:
                this.mImg_Tab3.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
                break;
            case TabType.Supply:
                this.mImg_Tab1.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
                break;
            case TabType.Vip:
                this.mImg_Tab2.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
                break;
            default:
                break;
        }
    }

    public showShop(type: ShopType, tab?: TabType, tabLevel2?: number) {
        this.show();
        if (type == ShopType.Hot) {
            if (!tab) tab = TabType.Supply;
            this.tabArr.get(TabType.Pendant).visible = false;
            this.tabArr.get(TabType.Coin).visible = false;
            this.tabArr.get(TabType.Recharge).visible = false;
            this.tabArr.get(TabType.Gift).visible = true;
            this.tabArr.get(TabType.Vip).visible = true;
            this.tabArr.get(TabType.Supply).visible = true;
            this.tabArr.get(TabType.Score).visible = false;
            this.changeTab(tab, tabLevel2);
            this.mText_HotName.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mText_ShopName.visibility = SlateVisibility.Collapsed;
        } else {
            if (!tab) tab = TabType.Coin;
            this.tabArr.get(TabType.Pendant).visible = true;
            this.tabArr.get(TabType.Coin).visible = true;
            this.tabArr.get(TabType.Gift).visible = true;
            this.tabArr.get(TabType.Recharge).visible = true;
            this.tabArr.get(TabType.Supply).visible = false;
            this.tabArr.get(TabType.Vip).visible = false;
            this.tabArr.get(TabType.Score).visible = true;
            this.changeTab(tab, tabLevel2);
            this.mText_HotName.visibility = SlateVisibility.Collapsed;
            this.mText_ShopName.visibility = SlateVisibility.SelfHitTestInvisible;
        }
    }

    /**
     * 刷新余额
     * @param type 货币类型
     * @param param
     */
    public refreshBalance(type: CoinType, param: number) {
        if (this.happyBalanceUI && type == CoinType.Coin) {
            this.happyBalanceUI.mText_Money.text = param.toString();
        }
        if (this.abnormalBalanceUI && type == CoinType.Abnormal) {
            this.abnormalBalanceUI.mText_Money.text = param.toString();
        }
        if (this.bioCoinUI && type == CoinType.BioCoin) {
            this.bioCoinUI.mText_Money.text = param.toString();
        }
    }

    protected onShow(...params: any[]): void {
        utils.showUITween(this);
        UIService.getUI(P_HUD).mTouchPadDesigner.enable = false;

    }
    onHide() {
        UIService.getUI(P_HUD).mTouchPadDesigner.enable = true;
    }


    /**
    * 取消一级标签 上次选中
    * @param item 需要选中的按钮
    */
    private cancelSeleBtn(type: TabType) {
        let item = this.tabArr.get(type);

        let cfg = GameConfig.Shop.getElement(type);

        if (this.lastSeleTab) {
            this.levelImgVis_1(this.lastCfg.ID, false);
            this.lastSeleTab.mText_TagName.text = this.lastCfg.tabName;
            this.lastSeleTab.mImage_Select.visibility = SlateVisibility.Collapsed;
            this.lastSeleTab.mImage_Select_1.visibility = SlateVisibility.Collapsed;
            this.lastSeleTab.mText_TagName.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_1[1]);
        }
        if (item) {
            this.lastSeleTab = item;
            this.lastCfg = cfg;
            this.levelImgVis_1(cfg.ID, true);
            item.mText_TagName.text = cfg.tabSelectName;
            item.mImage_Select.visibility = SlateVisibility.SelfHitTestInvisible;
            item.mImage_Select_1.visibility = SlateVisibility.SelfHitTestInvisible;
            item.mText_TagName.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_1[0]);
        }
    }

}



abstract class P_ShopCanvas extends UIScript {
    abstract tabType: TabType;
    /**初始化数据 */
    abstract init(data: IShopElement, shopUI: P_Shop): void;
    /**切换页签显隐UI */
    abstract changeTab(tabType: TabType, tabLevel2?: number): void;
    /**红点提示 */
    abstract onRedNoteAC: Action2<TabType, boolean>;
}


/**积分商城页 */
class P_Score extends ShopCanvas_Generate implements P_ShopCanvas {

    tabType: TabType = TabType.Score;
    public onRedNoteAC: Action2<TabType, boolean> = new Action2();
    private shopData: ShopData = null;
    private cfg: IShopElement = null;
    private tabArr: LevelTab_2_Generate[] = [];
    /**上次选中的按钮 */
    private lastSeleBtn: LevelTab_2_Generate = null;
    onStart() {
        this.shopData = DataCenterC.getData(ShopData);
    }

    public changeTab(tabType: TabType): void {

        this.visible = tabType == this.tabType;
        if (tabType == TabType.Score) {
            //显示二级标签内容
            // this.changeLable(this.cfg.childTabId[0], this.tabArr[0]);
            //取消选中
            // this.cancelSeleBtn();
            ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.EventShop_Click)
        }

    }

    private itemArr: P_ShopItem[] = [];

    public init(data: IShopElement, shopUI: P_Shop): void {
        this.cfg = data;
        //页签
        data.childTabId?.forEach((id) => {
            let item = UIService.create(LevelTab_2_Generate);
            this.tabArr.push(item);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_SecList.addChild(item.uiObject);
            let tabcfg = GameConfig.Shop.getElement(id);
            item.mText_Form.text = tabcfg.tabName;
            item.mBtn_Form.onClicked.add(this.changeLable.bind(this, id, item));
        });

        //商品列表
        data.shopItem.forEach((id) => {
            let tarId = GlobalData.Shop.limitPropMap.get(id);
            if (tarId && this.shopData.boughtIds.includes(tarId)) {
                return;
            }
            let item = UIService.create(P_ShopItem);
            let cfg = GameConfig.ShopItem.getElement(id);
            item.init(cfg, shopUI, this.tabType);
            this.itemArr.push(item);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_Prop.addChild(item.uiObject);
        });
    }


    /**点击二级页签 */
    private changeLable(lableCfgId: number, item: LevelTab_2_Generate) {
        // console.warn(`lwj  积分 点击二级页签 ${lableCfgId}`);
        let cfg = GameConfig.Shop.getElement(lableCfgId);
        this.itemArr.forEach((ui) => {
            if (!cfg.shopItem.includes(ui.id))
                ui.visible = false;
            else
                ui.visible = true;
        });
        //选中态
        this.cancelSeleBtn(item);
    }

    protected onShow(...params: any[]): void {
        this.itemArr.forEach((ui) => {
            ui.visible = true;
        });
    }


    /**
     * 取消二级标签上次选中
     * @param item 需要选中的按钮
     */
    private cancelSeleBtn(item: LevelTab_2_Generate = null) {
        if (this.lastSeleBtn) {
            this.lastSeleBtn.mImage_Frame.visibility = SlateVisibility.Collapsed;
            this.lastSeleBtn.mText_Form.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_2[1]);
        }
        if (item) {
            this.lastSeleBtn = item;
            item.mImage_Frame.visibility = SlateVisibility.SelfHitTestInvisible;
            item.mText_Form.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_2[0]);
        }
    }
}


/**乐币商城 */
class P_Coin extends ShopCanvas_Generate implements P_ShopCanvas {
    tabType: TabType = TabType.Coin;
    public onRedNoteAC: Action2<TabType, boolean> = new Action2();

    /**上次选中的按钮 */
    private lastSeleBtn: LevelTab_2_Generate = null;
    private itemArr: P_ShopItem[] = [];
    private tabArr: LevelTab_2_Generate[] = [];
    private cfg: IShopElement = null;
    private shopData: ShopData = null;
    onStart() {
        this.shopData = DataCenterC.getData(ShopData);
    }

    public changeTab(tabType: TabType): void {
        this.visible = tabType == this.tabType;

        if (tabType == TabType.Coin) {
            //显示二级标签内容
            this.changeLable(this.cfg.childTabId[0], this.tabArr[0]);
            //取消选中
            ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.shop);
        }

    }

    public init(data: IShopElement, shopUI: P_Shop): void {
        this.cfg = data;
        let now = new Date();
        //商品列表
        data.shopItem.forEach((id) => {
            let data = GameConfig.ShopItem.getElement(id);
            if (data.weekSolds && !data.weekSolds.includes(now.getDay())) {
                return;
            }
            let tarId = GlobalData.Shop.limitPropMap.get(id);
            if (tarId && this.shopData.boughtIds.includes(tarId)) {
                return;
            }
            let item = UIService.create(P_ShopItem);
            let cfg = GameConfig.ShopItem.getElement(id);
            item.init(cfg, shopUI, this.tabType);
            this.itemArr.push(item);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_Prop.addChild(item.uiObject);
        });
        //页签
        data.childTabId.forEach((id) => {
            let item = UIService.create(LevelTab_2_Generate);
            this.tabArr.push(item);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_SecList.addChild(item.uiObject);
            let tabcfg = GameConfig.Shop.getElement(id);
            item.mText_Form.text = tabcfg.tabName;
            item.mBtn_Form.onClicked.add(this.changeLable.bind(this, id, item));
        });
    }

    /**点击二级页签 */
    private changeLable(lableCfgId: number, item: LevelTab_2_Generate) {
        // console.warn(`lwj  乐币 点击二级页签 ${lableCfgId}`);
        let cfg = GameConfig.Shop.getElement(lableCfgId);
        this.itemArr.forEach((ui) => {
            if (!cfg.shopItem.includes(ui.id))
                ui.visible = false;
            else
                ui.visible = true;
        });
        //选中态
        this.cancelSeleBtn(item);

        if (cfg.ID == 2002) {
            ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.weapon_click);
        }
    }

    /**
     * 取消二级标签上次选中
     * @param item 需要选中的按钮
     */
    private cancelSeleBtn(item: LevelTab_2_Generate = null) {
        if (this.lastSeleBtn) {
            this.lastSeleBtn.mImage_Frame.visibility = SlateVisibility.Collapsed;
            this.lastSeleBtn.mText_Form.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_2[1]);
        }
        if (item) {
            this.lastSeleBtn = item;
            item.mImage_Frame.visibility = SlateVisibility.SelfHitTestInvisible;
            item.mText_Form.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_2[0]);
        }
    }


}


/**特惠礼包 大礼包 */
class P_Gift extends GiftCanvas_Generate implements P_ShopCanvas {

    tabType: TabType = TabType.Gift;
    public onRedNoteAC: Action2<TabType, boolean> = new Action2();
    private shopData: ShopData = null;
    private itemArr: P_GiftItem[] = [];
    private shopUI: P_Shop = null;

    onStart() {
        this.shopData = DataCenterC.getData(ShopData);
        this.shopData.onSuccessBuyAC.add(this.onBuySuccess.bind(this));
    }

    public changeTab(tabType: TabType): void {
        this.visible = tabType == this.tabType;
    }

    public init(data: IShopElement, shopUI: P_Shop): void {
        this.shopUI = shopUI;
        let now = new Date();
        //商品列表
        data.shopItem.forEach((id) => {
            let data = GameConfig.ShopItem.getElement(id);
            if (data.weekSolds && !data.weekSolds.includes(now.getDay())) {
                return;
            }
            let tarId = GlobalData.Shop.limitPropMap.get(id);
            if (tarId && this.shopData.boughtIds.includes(tarId)) {
                return;
            }
            let item = UIService.create(P_GiftItem);
            let cfg = GameConfig.ShopItem.getElement(id);
            item.init(cfg, shopUI, this.tabType);
            item.mButton_Pay.touchMethod = mw.ButtonTouchMethod.PreciseTap;
            if (this.shopData.isSellOut(id)) {
                // console.warn(`lwj 已售罄Gift ${id}`);
                item.soldOut(id);
                item.mImage_Black.visibility = SlateVisibility.SelfHitTestInvisible;
                this.itemArr.unshift(item);
            } else {
                item.mImage_Black.visibility = SlateVisibility.Collapsed;
                this.itemArr.push(item);
                if (cfg.isRedNotice) {
                    item.showRedDot(true);
                    // console.warn(`lwj 未售罄Gift ${id}  ${cfg.isRedNotice != 0}`);
                } else {
                    item.showRedDot(false);
                }
                item.updateLimit(this.shopData, id);
            }

            item.uiObject.size = item.rootCanvas.size;
            // 将所有商品统一添加到 mCanvas_SecList 中
            this.itemArr.forEach(item => {
                this.mCanvas_SecList.addChild(item.uiObject);
            });
        });
    }

    private onBuySuccess(id: number) {
        let cfg = GameConfig.ShopItem.getElement(id);
        if (cfg && cfg.DanceIds) {
            GlobalData.Dance.getDanceAC.call(cfg.ID);
        }
        this.itemArr.forEach((ui) => {
            if (ui.id == id) {
                console.warn(`lwj 购买成功Gift ${id}`);
                let out = this.shopData.isSellOut(id);
                if (out)
                    ui.soldOut(id);
                else
                    ui.updateLimit(this.shopData, id);
            }
        });
        GlobalData.Shop.limitPropMap.forEach((value, key) => {
            if (value == id) {
                this.itemArr.forEach((ui) => {
                    if (ui.id == key) {
                        this.mCanvas_SecList.removeChild(ui.uiObject);
                    }
                });
            }
        })

    }
}


/**特权会员 */
class P_Vip extends VIP_Generate implements P_ShopCanvas {

    tabType: TabType = TabType.Vip;
    private shopData: ShopData = null;

    private redName: string = "P_Vip";
    public onRedNoteAC: Action2<TabType, boolean> = new Action2();

    //test
    addDay: number = 0;

    onStart() {
        this.shopData = DataCenterC.getData(ShopData);
        this.shopData.onVipInfoChange.add(this.onBuySuccess.bind(this));

        Event.addLocalListener("TestVip", (num: number) => {
            this.addDay = num;
            console.warn(`lwj TestVip ${num}`);
            this.onBuySuccess();
        })
    }

    public changeTab(tabType: TabType): void {
        this.visible = tabType == this.tabType;
        if (this.visible) {
            this.onBuySuccess();
            ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.vip_click);
        }
    }

    public init(data: IShopElement, shopUI: P_Shop): void {

        this.redName = "P_Vip_" + data.ID;

        ModuleService.getModule(RedDotModuleC).addRedDotPathByEvt(RedDotType.VipLevel_1, this.redName, this.mBtn_buy);
        //刷新界面
        this.onBuySuccess();
        this.mBtn_buy.onClicked.add(() => {
            shopUI.onBuyVipAC.call();
            ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.vip_buy)
        });

        let shopItemConfigs: IShopItemElement = null;
        data.shopItem.forEach((id) => {
            shopItemConfigs = GameConfig.ShopItem.getElement(id);
        });
        this.mImg_Buy.imageGuid = GlobalData.Shop.icons[CoinType.Abnormal];

        // 初始化每个 canvas 上的图标
        for (let i = 0; i < shopItemConfigs.propIds.length; i++) {
            let canvas: Canvas;
            switch (i) {
                case 0:
                    canvas = this.canvas_TitleIcon;
                    break;
                case 1:
                    canvas = this.canvas_RebornIcon;
                    break;
                case 2:
                    canvas = this.canvas_TransframIcon;
                    break;
                default:
                    continue;
            }
            let propId = shopItemConfigs.propIds[i] || 0;
            this.createIcon(canvas, propId, canvas.size);
        }
    }

    private createIcon(canvas: Canvas, propId: number, canvasSize: Vector2): void {
        let item = UIService.create(P_Icon);
        item.initGift(propId, 1);
        item.uiObject.size = canvasSize;
        item.mButton.size = canvasSize;
        item.mImage_icon.size = canvasSize;

        item.mText_num.visibility = SlateVisibility.Collapsed;
        canvas.addChild(item.uiObject);
    }



    private onBuySuccess() {
        let redDot = ModuleService.getModule(RedDotModuleC);

        if (this.shopData.vipInfo) {

            this.mImg_Buy.visibility = SlateVisibility.Collapsed;
            this.mText_tip.visibility = SlateVisibility.Collapsed;
            this.mText_Time.visibility = SlateVisibility.SelfHitTestInvisible;

            let lastStr = this.shopData.vipInfo.todayDate;
            let now = new Date();
            if (this.addDay > 0) {
                console.warn(`lwj TestVip ${this.addDay}`);
                now.setDate(now.getDate() + this.addDay);
            }

            let buyTime = new Date(this.shopData.vipInfo.date);
            let hour = utils.compareDate(now, buyTime);
            hour = GlobalData.Shop.vipHour - hour;
            this.mText_Time.text = utils.formatHourToDayHour(hour);

            if (lastStr == "") {
                redDot.triggerRedDotEvent(this.redName);
                this.mTxt_State.text = GameConfig.Language.Shop_Tips_22.Value;
                return;
            }

            let lastTime = new Date(lastStr);
            let isSome = utils.isSameDay(lastTime, now);

            if (isSome) {
                this.mBtn_buy.enable = false;
                redDot.hideRedDotEvent(this.redName);
                this.mTxt_State.text = GameConfig.Language.Shop_Tips_14.Value;
            } else {
                this.mBtn_buy.enable = true;
                redDot.triggerRedDotEvent(this.redName);
                this.mTxt_State.text = GameConfig.Language.Shop_Tips_22.Value;
            }

        } else {
            this.mImg_Buy.visibility = SlateVisibility.SelfHitTestInvisible;
            // this.mImage_RedNote.visibility = SlateVisibility.Collapsed;
            this.mText_Time.visibility = SlateVisibility.Collapsed;
            this.mBtn_buy.enable = true;
            this.mTxt_State.text = "";
            redDot.hideRedDotEvent(this.redName);
        }

    }
}


/**超值礼包 按天领取 */
class P_Supply extends Hot_Generate implements P_ShopCanvas {

    tabType: TabType = TabType.Supply;
    public onRedNoteAC: Action2<TabType, boolean> = new Action2();
    private shopData: ShopData = null;
    private redName: string = "P_Supply";

    //test
    addDay: number = 0;

    onStart() {
        this.shopData = DataCenterC.getData(ShopData);
        this.shopData.onSupplyInfoChange.add(this.onBuySuccess.bind(this));
        Event.addLocalListener("TestVip", (num: number) => {
            this.addDay = num;
            this.onBuySuccess(this.shopData.supplyInfo.stage);
        })
    }

    public init(data: IShopElement, shopUI: P_Shop): void {

        this.redName = "P_Supply_" + data.ID;
        ModuleService.getModule(RedDotModuleC).addRedDotPathByEvt(RedDotType.SupplyLevel_1, this.redName, this.mBtn_Buy);
        let stage = this.shopData.supplyInfo ? this.shopData.supplyInfo.stage : 0;
        this.onBuySuccess(stage);
        this.mBtn_Buy.onClicked.add(() => {
            shopUI.onBuySupplyAC.call();
            ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.hot_buy)
        });

        let shopItemConfigs: IShopItemElement[] = [];
        data.shopItem.forEach((id) => {
            shopItemConfigs.push(GameConfig.ShopItem.getElement(id));
        });

        let canvasGroups: Canvas[][] = [
            [this.mCanvas_DayOne1, this.mCanvas_DayOne2, this.mCanvas_DayOne3],
            [this.mCanvas_DayTwo1, this.mCanvas_DayTwo2, this.mCanvas_DayTwo3],
            [this.mCanvas_DayThree1, this.mCanvas_DayThree2, this.mCanvas_DayThree3]
        ];

        this.mImg_Buy.imageGuid = GlobalData.Shop.icons[CoinType.Abnormal];

        // 依次初始化每个 Canvas 组上的图标
        for (let i = 0; i < canvasGroups.length; i++) {
            let canvasGroup = canvasGroups[i];
            let propIds = shopItemConfigs[i]?.propIds || [];

            // 初始化该组上的每个 Canvas 的图标
            for (let j = 0; j < canvasGroup.length; j++) {
                let canvas = canvasGroup[j];
                let propId = propIds[j] || 0;
                this.createIcon(canvas, propId, canvas.size);
            }
        }
    }

    public changeTab(tabType: TabType): void {
        this.visible = tabType == this.tabType;
        if (this.visible) {
            ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.hot)
        }
    }

    private createIcon(canvas: Canvas, propId: number, canvasSize: Vector2): void {
        let item = UIService.create(P_Icon);
        item.initGift(propId, 1);
        item.uiObject.size = canvasSize;
        item.mImage_icon.size = canvasSize;
        item.mText_num.visibility = SlateVisibility.Collapsed;
        canvas.addChild(item.uiObject);
    }

    /**购买阶段 */
    private onBuySuccess(stage: number) {
        let redDot = ModuleService.getModule(RedDotModuleC);

        if (!this.shopData.supplyInfo) {
            redDot.hideRedDotEvent(this.redName);
            return;
        }
        let lastDay = new Date(this.shopData.supplyInfo.date);
        let nowTime = new Date();
        if (this.addDay > 0) {
            nowTime.setDate(nowTime.getDate() + this.addDay);
        }
        //相差天数
        let diff = this.diffDays(lastDay, nowTime);

        let getTxt = GameConfig.Language.Shop_Tips_13.Value;
        let getTxt1 = GameConfig.Language.Shop_Tips_14.Value;
        this.mImg_Buy.visibility = SlateVisibility.Collapsed;

        switch (stage) {
            case 0:
                this.mTxt_State.text = getTxt;
                break;
            case 1:
                this.mTxt_State.text = diff >= 1 ? getTxt : getTxt1;
                this.mBtn_Buy.enable = diff >= 1;
                this.mText_Get_1.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_Dark1.visibility = SlateVisibility.SelfHitTestInvisible
                break;
            case 2:
                this.mTxt_State.text = diff >= 2 ? getTxt : getTxt1;
                this.mBtn_Buy.enable = diff >= 2;
                this.mText_Get_1.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_Dark1.visibility = SlateVisibility.SelfHitTestInvisible
                this.mText_Get_3.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_Dark3.visibility = SlateVisibility.SelfHitTestInvisible
                break;
            case 3:
                this.mTxt_State.text = GameConfig.Language.Shop_Tips_15.Value;
                this.mBtn_Buy.enable = false;
                this.mText_Get_1.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_Dark1.visibility = SlateVisibility.SelfHitTestInvisible
                this.mText_Get_3.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_Dark3.visibility = SlateVisibility.SelfHitTestInvisible
                this.mText_Get_2.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mImage_Dark2.visibility = SlateVisibility.SelfHitTestInvisible
                break;
            default:
                break;
        }

        if (this.mBtn_Buy.enable) {
            redDot.triggerRedDotEvent(this.redName);
        } else {
            redDot.hideRedDotEvent(this.redName);
        }


        // console.warn(`lwj 补给礼包 ${stage}  ${this.mBtn_Buy.enable}`);
    }

    public diffDays(date1: Date, date2: Date): number {
        // 只比较日期部分
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);

        let diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
        let diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
        return diffInDays;
    }
}

/**充值 */
class P_Money extends GiftCanvas_Generate implements P_ShopCanvas {

    tabType: TabType = TabType.Recharge;

    init(data: IShopElement, shopUI: P_Shop): void {
        data.shopItem.forEach((id) => {
            let cfg = GameConfig.ShopItem.getElement(id);
            let item = UIService.create(P_ShopItem);
            item.init(cfg, shopUI, this.tabType);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_SecList.addChild(item.uiObject);
        });
    }
    changeTab(tabType: TabType): void {
        this.visible = tabType == this.tabType;
    }
    onRedNoteAC: Action2<TabType, boolean>;

}

/**挂件 */
class P_Pendant extends ShopCanvas_Generate implements P_ShopCanvas {

    tabType: TabType = TabType.Pendant;

    /**上次选中的按钮 */
    private lastSeleBtn: LevelTab_2_Generate = null;
    private itemArr: P_ShopItem[] = [];
    private tabMap: Map<number, LevelTab_2_Generate> = new Map();

    init(data: IShopElement, shopUI: P_Shop): void {
        data.shopItem.forEach((id) => {
            let cfg = GameConfig.ShopItem.getElement(id);
            let item = UIService.create(P_ShopItem);
            item.init(cfg, shopUI, this.tabType);
            this.itemArr.push(item);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_Prop.addChild(item.uiObject);
        });

        //页签
        data.childTabId.forEach((id) => {
            let item = UIService.create(LevelTab_2_Generate);
            this.tabMap.set(id, item);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_SecList.addChild(item.uiObject);
            let tabcfg = GameConfig.Shop.getElement(id);
            item.mText_Form.text = tabcfg.tabName;
            item.mBtn_Form.onClicked.add(this.changeLable.bind(this, id, item));
        });
    }
    changeTab(tabType: TabType, tabId_2?: number): void {
        this.visible = tabType == this.tabType;
        if (this.visible && tabId_2) {
            this.changeLable(tabId_2, this.tabMap.get(tabId_2));
            return;
        }
        if (this.visible) {
            this.changeLable(2003, this.tabMap.get(2003));
        }
    }
    onRedNoteAC: Action2<TabType, boolean>;
    /**点击二级页签 */
    private changeLable(lableCfgId: number, item: LevelTab_2_Generate) {
        let cfg = GameConfig.Shop.getElement(lableCfgId);
        this.itemArr.forEach((ui) => {
            if (!cfg.shopItem.includes(ui.id))
                ui.visible = false;
            else
                ui.visible = true;
        });
        //选中态
        this.cancelSeleBtn(item);
    }

    /**
     * 取消二级标签上次选中
     * @param item 需要选中的按钮
     */
    private cancelSeleBtn(item: LevelTab_2_Generate = null) {
        if (this.lastSeleBtn) {
            this.lastSeleBtn.mImage_Frame.visibility = SlateVisibility.Collapsed;
            this.lastSeleBtn.mText_Form.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_2[1]);
        }
        if (item) {
            this.lastSeleBtn = item;
            item.mImage_Frame.visibility = SlateVisibility.SelfHitTestInvisible;
            item.mText_Form.setFontColorByHex(GlobalData.Shop.seleBtnColorLevel_2[0]);
        }
    }
}