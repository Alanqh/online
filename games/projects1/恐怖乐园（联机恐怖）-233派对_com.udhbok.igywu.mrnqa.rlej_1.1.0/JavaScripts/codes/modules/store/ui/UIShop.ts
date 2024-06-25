import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import Shop_UI_Generate from "../../../../ui-generate/ShareUI/shop/Shop_UI_generate";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC, { EShopItemType } from "../StoreModuleC";
import { UIItemDetail } from "./UIItemDetail";
import { UIGiftItem } from "./UIGiftItem";
import { UIShopBuy } from "./UIShopBuy";
import { UIShopItem } from "./UIShopItem";
import { UIShopTips } from "./UIShopTips";
import { CommonUtils } from "../../../utils/CommonUtils";
import { CloseFloatWindow } from "../../../ui/CloseFloatWindow";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import ShopTab_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopTab_UI_generate";
import { RouteModuleC } from "../../route/RouteModule";
import Tips from "../../../utils/Tips";
import IAPModuleC from "../../iap/IAPModuleC";
import { IShopLabelElement } from "../../../../config/ShopLabel";
import { GameAnim } from "../../../utils/GameAnim";
import { LanUtil } from "../../../utils/LanUtil";
import GameStart from "../../../GameStart";
import { UtilEx } from "../../../utils/UtilEx";
import { IAPData } from "../../iap/IAPData";
import { off } from "puerts";

export default class UIShop extends Shop_UI_Generate {
    private _itemList: UIShopItem[] = [];
    private _curSelectedItem: IShopElement;
    private _isSortPanelOpen: boolean = false;
    /**触摸起始值 */
    private _startVal: number = 0;
    /**分帧创建的数据 */
    private _loadData: IShopElement[] = null;
    public curShopType: EShopItemType = EShopItemType.All;
    /**是否初始化完成 */
    private _initComplete: boolean = false;
    private _shopID: number = 1
    protected onStart() {
        this._loadData = [].concat(GameConfig.Shop.getAllElement());
        this.initButtonEvent();
        this.initEvents();
        this.initSomeUI();
        this.loadItems();
    }

    /**初始化按钮事件 */
    private initButtonEvent() {
        this.btn_back.onClicked.add(() => {
            ModuleService.getModule(StoreModuleC).closeStore()
        })
        //购买
        this.btn_buy.onClicked.add(async () => {
            if (!this._curSelectedItem) return
            GhostTraceHelper.uploadMGS("ts_action_buy_energyrobot", "点击购买按钮", { robot_id: this._curSelectedItem.itemID })
            //乐币购买
            if (this._curSelectedItem.currencyType == 2) {
                if (this._curSelectedItem.buyLimit == 1) {
                    let lebi = GameConfig.happyCoin.getElement(this._curSelectedItem.price)
                    let price = GameStart.isGPark ? lebi.outValue : lebi.value
                    let item = GameConfig.Item.getElement(this._curSelectedItem.itemID)
                    UIService.show(UIShopTips, GameConfig.SubLanguage.shop_02.Value + GameConfig.SubLanguage.shoptips_01.Value,
                        StringUtil.format(LanUtil.getText("Code_048"), price, item.name),
                        () => {
                            GhostTraceHelper.uploadMGS("ts_action_buy_gun", "购买弹窗确定按钮", { gun_id: this._curSelectedItem.itemID })
                            ModuleService.getModule(StoreModuleC).reqBuyItem(this._curSelectedItem, 1);
                        },
                        () => {
                            GhostTraceHelper.uploadMGS("ts_action_buy_pet", "购买弹窗展示", { pet_id: this._curSelectedItem.itemID })
                        },
                        true
                        , false
                    )
                } else {
                    let limit = -1
                    if (this._curSelectedItem.limitString) {
                        limit = await RouteDefine.checkBuyLimit(Player.localPlayer.userId, this._curSelectedItem.id)
                        if (limit <= 0) { Tips.show(LanUtil.getText("Code_049")); return }
                    }
                    UIService.show(UIShopBuy, this._curSelectedItem, limit);
                }
            }
            //恐惧币购买
            else {
                let realPrice = this._curSelectedItem.price * StoreModuleC.discount
                let result = await ModuleService.getModule(StoreModuleC).checkMoney(realPrice)
                if (!result) return
                let limit = await RouteDefine.checkBuyLimit(Player.localPlayer.userId, this._curSelectedItem.id)//检查限购
                if (limit <= 0) {
                    Tips.show(LanUtil.getText("Code_049"));
                    return
                }
                UIService.show(UIShopBuy, this._curSelectedItem, limit);
            }
        })

        this.canvas_want.visibility = SlateVisibility.Collapsed;
        //想要
        this.btn_want.onClicked.add(async () => {
            return
            if (!this._curSelectedItem) return
            GhostTraceHelper.uploadMGS("ts_action_buy_lottery", "点击我想要按钮", { lottery_id: this._curSelectedItem.itemID })
            let limit = await RouteDefine.checkBuyLimit(Player.localPlayer.userId, this._curSelectedItem.id)//检查限购
            if (limit <= 0 && this._curSelectedItem.buyLimit != -1) {
                UIService.show(UIShopTips, GameConfig.SubLanguage.shoptips_01.Value, LanUtil.getText("Code_050"), null, null, false, false)
            } else {
                ModuleService.getModule(StoreModuleC).reqWantedItem(this._curSelectedItem.id);
            }
        })

        //排序按钮
        this.btn_sort.onClicked.add(() => {
            this._isSortPanelOpen = !this._isSortPanelOpen;
            this.canvas_sortlist.visibility = this._isSortPanelOpen ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed
            this.img_sort.renderTransformAngle = this._isSortPanelOpen ? 180 : 0
        })

        //选择排序方式按钮
        for (let i = 1; i <= 5; i++) {
            this[`btn_category${i}`].onClicked.add(() => {
                this.reSort(i);
                this._isSortPanelOpen = false;
                this.img_sort.renderTransformAngle = 0
                this.canvas_sortlist.visibility = SlateVisibility.Collapsed
            })
        }
        //白嫖说明按钮
        this.btn_intro.onClicked.add(() => {
            this.canvas_tipsbox.visibility = SlateVisibility.Visible;
            UIService.show(CloseFloatWindow)
        })

        this.btn_free.onClicked.add(() => {
            let position = CommonUtils.getViewPosition(this.canvas_freemoney, this.canvas_freemoney.position)
            position.y += 50;
            UIService.show(UIItemDetail, GameConfig.Item.getElement(10200), position)
        })

    }

    private setLabel() {
        if (!this._shopID) return
        this.canvas_tablist.removeAllChildren()
        let labelData = GameConfig.ShopLabel.getAllElement();
        let label = UIService.create(UIShopLabel)
        label.setData(labelData[labelData.length - 1])
        this.canvas_tablist.addChild(label.uiObject)
        let shopData = ModuleService.getModule(StoreModuleC).getShopDataById(this._shopID)
        for (let i = 0; i < labelData.length - 1; ++i) {
            let result = shopData.find(c => c.type == labelData[i].id)//商店中没有这种分类的商品就不显该分类
            if (!result) continue;
            let label = UIService.create(UIShopLabel)
            label.setData(labelData[i])
            this.canvas_tablist.addChild(label.uiObject)
        }
    }

    /**初始化事件监听 */
    private initEvents() {
        //初始化货币显示
        RouteDefine.getFearCoin(Player.localPlayer.userId).then(val => {
            this.text_freenum.text = val.toString()
        })
        //监听货币变化
        RouteDefine.onFearCoinChangeAction.add((money: number, delta: number) => {
            this.text_freenum.text = money.toString();
        })
        //初始化每日白嫖次数
        RouteDefine.getWantTimes(Player.localPlayer.userId).then(times => {
            this.text_wantnum.text = times.toString();
            this.checkWantTimes(times);
        })
        RouteDefine.onWantTimesChange.add((times: number) => {
            this.text_wantnum.text = times.toString();
            this.checkWantTimes(times)
        })
        Event.addLocalListener("evt_shopItemSelected", this.selectItem.bind(this))
        Event.addLocalListener("switchTab", this.switchTab.bind(this));
        this.initRollModel()
        //IAP购买成功监听
        IAPModuleC.onPurchaseAction.add(async (cfgId: number, result: boolean) => {
            StoreModuleC.discount = await RouteDefine.getDiscount(Player.localPlayer.userId)
            Event.dispatchToLocal("evt_triggerRedDot")
            if (cfgId == 2000 || cfgId == 2001) this.checkRewardState()
            this._curSelectedItem && this.selectItem(this._curSelectedItem)
        })
        //获得新皮肤监听
        RouteDefine.addNewSkin.add((newSkinID: number) => {

            ModuleService.getModule(StoreModuleC).updateSkinData(newSkinID)
            if (this.curShopType == EShopItemType.RoomSkin || this.curShopType == EShopItemType.All) this.reSort(1)
            RouteDefine.getAllSkins(Player.localPlayer.userId).then(skins => {
                GhostTraceHelper.uploadMGS("ts_action_change_power", "解锁皮肤", { money: newSkinID, player_power: skins.length })
            })
        })
        DataCenterC.getData(IAPData).onDataChange.add(() => { this.switchTab(this.curShopType) })
        this.checkRewardState()
    }

    /**初始化部分ui显示 */
    private initSomeUI() {
        this.img_MonthlyCard.imageGuid = GameStart.isGPark ? GameConfig.SubGlobal.MonthlyCard.stringList[1] : GameConfig.SubGlobal.MonthlyCard.stringList[0];
        this.img_SeasonalCard.imageGuid = GameStart.isGPark ? GameConfig.SubGlobal.SeasonalCard.stringList[1] : GameConfig.SubGlobal.SeasonalCard.stringList[0];
        this.text_tequandesc.text = StringUtil.format(LanUtil.getText("Code_051"), GameConfig.SubGlobal.MonthlyCard.array1d[0] * 100)
        this.text_SeasonalCardTime_1.text = StringUtil.format(LanUtil.getText("Code_051"), GameConfig.SubGlobal.SeasonalCard.array1d[0] * 100)
        this.text_tequandescMonthlyN.text = GameConfig.SubGlobal.MonthlyCard.array1d[2].toFixed(0) //+ LanUtil.getText("money_01")
        this.text_tequandescMonthlyDN.text = GameConfig.SubGlobal.MonthlyCard.array1d[1].toFixed(0) //+ LanUtil.getText("money_01")
        this.text_tequandescSeasonalN.text = GameConfig.SubGlobal.SeasonalCard.array1d[2].toFixed(0) //+ LanUtil.getText("money_01")
        this.text_tequandescSeasonalDN.text = GameConfig.SubGlobal.SeasonalCard.array1d[1].toFixed(0) //+ LanUtil.getText("money_01")
        this.img_reicon.imageGuid = GameStart.isGPark ? "311872" : "291724"

    }

    /**检查月卡季卡的领取状态 */
    private async checkRewardState() {
        this.btn_buyMonthlyCard.onClicked.clear()
        this.btn_buySeasonalCard.onClicked.clear()
        let userId = Player.localPlayer.userId
        let result = await RouteDefine.getRewardState(userId);
        let monthly = result[0]; let seasonal = result[1]
        this.canvas_getMonthlyCard.visibility = monthly.state == 0 ? SlateVisibility.Collapsed : SlateVisibility.Visible
        this.canvas_getSeasonalCard.visibility = seasonal.state == 0 ? SlateVisibility.Collapsed : SlateVisibility.Visible
        this.text_MonthlyCardTime.text = StringUtil.format(LanUtil.getText("Code_055"), monthly.remainDays);
        //设置月卡状态
        if (monthly.state == 0) {//没买或过期
            let lebi = GameConfig.happyCoin.getElement(2000)
            let price = GameStart.isGPark ? lebi.outValue : lebi.value
            this.text_buyMonthlyCard.text = price + LanUtil.getText("money_02");
            this.btn_buyMonthlyCard.onClicked.add(() => {
                ModuleService.getModule(IAPModuleC).placeOrder(lebi.id, 1)
            })
            this.text_MonthlyCardTime.text = ""
        } else if (monthly.state == -1) {
            this.text_buyMonthlyCard.text = LanUtil.getText("Code_052");
        } else {
            this.text_buyMonthlyCard.text = StringUtil.format(LanUtil.getText("Code_053"), (monthly.state * GameConfig.SubGlobal.MonthlyCard.array1d[1]).toFixed(0));
            this.btn_buyMonthlyCard.onClicked.add(async () => {
                let reward = await ModuleService.getModule(RouteModuleC).reqGetDailyRewardOfMonthly(userId)
                if (reward <= 0) return
                Tips.show(StringUtil.format(LanUtil.getText("Code_054"), reward))
                this.text_buyMonthlyCard.text = LanUtil.getText("Code_052");
                this.addCoinAni()
                GameAnim.flySequence(5, this.btn_buyMonthlyCard, this.canvas_freemoney, "303467", new Vector2(50, 50), new Vector(50, -100))
                Event.dispatchToLocal("evt_triggerRedDot")
                GhostTraceHelper.uploadMGS("ts_action_buy_skill", "领取奖励时上发", { skill_id: 1 })
            })
        }
        this.text_SeasonalCardTime.text = StringUtil.format(LanUtil.getText("Code_055"), seasonal.remainDays);
        //设置季卡状态
        if (seasonal.state == 0) {//没买或过期
            let lebi = GameConfig.happyCoin.getElement(2001)
            let price = GameStart.isGPark ? lebi.outValue : lebi.value
            this.text_buySeasonalCard.text = price + LanUtil.getText("money_02");
            this.btn_buySeasonalCard.onClicked.add(() => {
                ModuleService.getModule(IAPModuleC).placeOrder(lebi.id, 1)
            })
            this.text_SeasonalCardTime.text = ""
        } else if (seasonal.state == -1) {
            this.text_buySeasonalCard.text = LanUtil.getText("Code_052");
        } else {
            this.text_buySeasonalCard.text = StringUtil.format(LanUtil.getText("Code_053"), (seasonal.state * GameConfig.SubGlobal.SeasonalCard.array1d[1]).toFixed(0));
            this.btn_buySeasonalCard.onClicked.add(async () => {
                let reward = await ModuleService.getModule(RouteModuleC).reqGetDailyRewardOfSeasonal(userId)
                if (reward <= 0) return
                Tips.show(StringUtil.format(LanUtil.getText("Code_054"), reward))
                this.text_buySeasonalCard.text = LanUtil.getText("Code_052");
                GameAnim.flySequence(5, this.btn_buySeasonalCard, this.canvas_freemoney, "303467", new Vector2(50, 50), new Vector(50, -100))
                Event.dispatchToLocal("evt_triggerRedDot")
                GhostTraceHelper.uploadMGS("ts_action_buy_skill", "领取奖励时上发", { skill_id: 0 })
            })
        }
        this.text_cardingDesc.text = StoreModuleC.discount < 1 ? StringUtil.format(LanUtil.getText("UI_shop_03"), ((1 - StoreModuleC.discount) * 100).toFixed(0)) : ""
        this.reSort(1);
    }

    /**
     * closeGiftTips
     */
    public closeGiftTips() {
        this.canvas_tipsbox.visibility = SlateVisibility.Hidden;
        UIService.hide(UIItemDetail)
    }

    public updateHappyCoin(amount: number) {
        this.text_renum.text = amount.toString()
    }

    /**
     * 初始化滑动模型转动事件
     */
    private initRollModel() {
        this.progress.sliderButtonPressDelegate.add((curValue: number) => {
            this._startVal = curValue
        })
        this.progress.onSliderValueChanged.add((curValue: number) => {
            let delta = curValue - this._startVal;
            ModuleService.getModule(StoreModuleC).rotateModel(delta > 0)
            this._startVal = curValue;
        })
    }

    private checkWantTimes(times: number) {
        if (times <= 0) {
            this.btn_want.onClicked.clear();
            this.btn_want.onClicked.add(() => {
                UIService.show(UIShopTips, GameConfig.SubLanguage.shoptips_01.Value, GameConfig.SubLanguage.shoptips_06.Value, null, null, false, false);
            })
            this.btn_want.setNormalImageColorByHex("#404040FF");
        }
    }

    /**
     * 对商品排序
     * @param index 
     * @returns 
     */
    private reSort(index: number) {
        if (!this._initComplete) return
        let shopData = ModuleService.getModule(StoreModuleC).getShopData(this._shopID)
        if (!shopData) return
        let data = shopData.get(this.curShopType);
        if (!data) return
        this.text_sort.text = this[`text_category${index}`].text;
        let sorted: IShopElement[] = data[index - 1]
        this._itemList.forEach(e => { e.hide() })
        for (let i = 0; i < sorted.length; ++i) {
            this._itemList[i]?.setShopData(sorted[i], this.curShopType);
        }
        Event.dispatchToLocal("evt_shopItemSelected", this._itemList[0].data)
        this.scrollBox_goods.scrollToStart()
        if (this.curShopType == EShopItemType.Recharge) {
            let res = true;
            let list = DataCenterC.getData(IAPData).alreadyBuyList
            sorted.forEach(e => { if (list.indexOf(e.price) == -1) res = false })
            if (res) {
                this.txt_firstbuy_tips.visibility = SlateVisibility.Collapsed
            } else {
                this.txt_firstbuy_tips.visibility = SlateVisibility.Visible
            }
        } else {
            this.txt_firstbuy_tips.visibility = SlateVisibility.Collapsed
        }
    }

    /**选中商品 */
    public async selectItem(data: IShopElement) {
        if (!data || data.type == EShopItemType.Card) return
        this._curSelectedItem = data;
        // this.canvas_want.visibility = !data.wantParams || data.wantParams.length == 0 ? SlateVisibility.Collapsed : SlateVisibility.Visible
        ModuleService.getModule(StoreModuleC).selectItem(this._curSelectedItem.id);
        let itemData = GameConfig.Item.getElement(this._curSelectedItem.itemID)
        if (data.type == EShopItemType.Gift) {//礼包
            this.canvas_details.visibility = SlateVisibility.Collapsed;
            this.canvas_giftDetails.visibility = SlateVisibility.Visible;
            this.canvas_giftItem.removeAllChildren();
            let itemData = GameConfig.Item.getElement(data.itemID)
            if (!itemData) return
            if (itemData.surelyGift) {
                itemData.surelyGift.forEach(e => {
                    let item = UIService.create(UIGiftItem)
                    let data = GameConfig.Item.getElement(e[0])
                    item.setData(data, e[1])
                    this.canvas_giftItem.addChild(item.rootCanvas);
                })
            }
            if (itemData.giftList) {
                for (let i = 0; i < itemData.giftList.length; ++i) {
                    let arr = itemData.giftList[i]
                    for (let k = 0; k < arr.length; ++k) {
                        let item = UIService.create(UIGiftItem)
                        let data = GameConfig.Item.getElement(arr[k])
                        item.setData(data, itemData.giftNum[i][k])
                        this.canvas_giftItem.addChild(item.rootCanvas);
                    }
                }
            }
            if (data.limitString) {
                let count = await RouteDefine.checkBuyLimit(Player.localPlayer.userId, data.id)
                this.text_limit.text = StringUtil.format(LanUtil.getText(data.limitString), data.buyLimit - count, data.buyLimit)

            } else {
                this.text_limit.text = ""
            }
            this.text_giftDetail.text = itemData.description
            this.gift_name.text = itemData.name
        } else {
            this.canvas_giftDetails.visibility = SlateVisibility.Collapsed;
            this.canvas_details.visibility = SlateVisibility.Visible;
            this.text_name.text = itemData.name
            this.text_itemdetail.text = itemData.description
            this.text_itemdetail.visibility = SlateVisibility.Visible;
        }

        if (this._curSelectedItem.currencyType == 1) {
            this.text_money.text = this._curSelectedItem.price <= 0 ? LanUtil.getText("Code_047") : (this._curSelectedItem.price * StoreModuleC.discount).toFixed(0)
            this.img_money.imageGuid = "306668"
        } else {
            let lebi = GameConfig.happyCoin.getElement(this._curSelectedItem.price)
            this.text_money.text = GameStart.isGPark ? lebi.outValue.toFixed(0) : lebi.value.toFixed(0)
            this.img_money.imageGuid = GameStart.isGPark ? "311872" : "291724"
        }
    }

    /**切换分类 */
    public switchTab(index: EShopItemType) {
        if (!this._initComplete) return
        this.curShopType = index;
        GhostTraceHelper.uploadMGS("ts_action_buy_energybag", "点击商店分页", { bag_id: index })
        this.cannvas_Card.visibility = this.curShopType == EShopItemType.Card ? SlateVisibility.Visible : SlateVisibility.Collapsed

        this.reSort(1)
    }

    public onShow(shopID: number) {
        this._shopID = shopID
        this.setLabel()
        mw.PurchaseService.getArkBalance()
        this._itemList.forEach(e => {
            e.myRootCanvas.visibility = e.data.shopID == this._shopID ? SlateVisibility.Visible : SlateVisibility.Collapsed
        })
        Event.dispatchToLocal("switchTab", EShopItemType.All)
        this.checkRewardState();
        setTimeout(() => {
            UtilEx.UIEx.transformIn(this.canvas_tabs, UtilEx.UIEx.Direction.Right, 500)
            UtilEx.UIEx.transformIn(this.canvas_list, UtilEx.UIEx.Direction.Top, 500)
            UtilEx.UIEx.transformIn(this.canvas_details, UtilEx.UIEx.Direction.Left, 500)
            UtilEx.UIEx.transformIn(this.canvas_giftDetails, UtilEx.UIEx.Direction.Left, 500)
            // UtilEx.UIEx.transformIn(this.cannvas_Card, UtilEx.UIEx.Direction.Bottom, 500)
            UtilEx.UIEx.transformIn(this.canvas_currency, UtilEx.UIEx.Direction.Top, 500)
        }, 0);
    }

    onHide() {
        let filterUI = ["Animation2D_Generate", "UIShop", "GMHUD_Generate", "Tips"]
        UIService[`inst`][`createPanelMap`].forEach((panels, name) => {
            panels.forEach(element => {
                if (element.visible && !filterUI.includes(name)) {
                    element.uiObject.position = new Vector2(0, 0)
                }
            });
        });

        UtilEx.UIEx.transformOut(this.canvas_tabs, UtilEx.UIEx.Direction.Right, 500)
        UtilEx.UIEx.transformOut(this.canvas_list, UtilEx.UIEx.Direction.Top, 500)
        UtilEx.UIEx.transformOut(this.canvas_details, UtilEx.UIEx.Direction.Left, 500)
        UtilEx.UIEx.transformOut(this.canvas_giftDetails, UtilEx.UIEx.Direction.Left, 500)
        // UtilEx.UIEx.transformOut(this.cannvas_Card, UtilEx.UIEx.Direction.Bottom, 500)
        UtilEx.UIEx.transformOut(this.canvas_currency, UtilEx.UIEx.Direction.Top, 500)

        this.canvas_tipsbox.visibility = SlateVisibility.Hidden;
        this.cannvas_Card.visibility = SlateVisibility.Collapsed;
    }

    onUpdate(dt: number) {
    }

    /**
     * 分帧加载item
     */
    private loadItems() {
        const timer = setInterval(() => {
            if (this._loadData.length == 0 || this._initComplete) {
                clearInterval(timer)
                this._initComplete = true;
                Event.dispatchToLocal("switchTab", EShopItemType.All)
            } else {
                let item = UIService.create(UIShopItem);
                item.setShopData(this._loadData.shift(), this.curShopType);
                this.canvas_shopitems.addChild(item.rootCanvas);
                this._itemList.push(item)
            }
        }, 50)
    }

    public addCoinAni() {
        GameAnim.flySequence(5, this.btn_want, this.canvas_freemoney, "303467", new Vector2(50, 50), new Vector(50, -100))
    }

    jumpToTab(index: EShopItemType, shopID: number = 1) {
        this._shopID = shopID
        Event.dispatchToLocal("switchTab", index)
    }
}

export class UIShopLabel extends ShopTab_UI_Generate {
    private _data: IShopLabelElement;
    private _event: EventListener[] = [];
    onStart() {
        this.btn_tab1.onClicked.add(() => {
            if (!this._data) return
            Event.dispatchToLocal("switchTab", this._data.id)
        })

        this._event.push(Event.addLocalListener("switchTab", (id: number) => {
            if (!this._data) return
            this.img_tabSelected.visibility = id == this._data.id ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        }))
        this._event.push(Event.addLocalListener("evt_triggerRedDot", this.checkRedDot.bind(this)))
    }

    setData(data: IShopLabelElement) {
        this._data = data;
        this.text_tab1.text = data.name;
        this.checkRedDot()
        if (this._data.id == EShopItemType.RoomSkin) {
            this.checkVisible()//进来先检测一次
            RouteDefine.addNewSkin.add(async (newSkinID: number) => {
                //监听获得新皮肤再次检测
                this.checkVisible()
            })
        }
    }
    async checkVisible() {
        let datas = GameConfig.Shop.getAllElement().filter(e => e.type == EShopItemType.RoomSkin)
        let skins = await RouteDefine.getAllSkins(Player.localPlayer.userId)
        if (datas.length == skins.length) {
            this.uiObject.visibility = SlateVisibility.Collapsed;
        }
    }

    checkRedDot() {
        if (this._data.id == EShopItemType.Card) {
            StoreModuleC.checkCardRewards().then(result => { this.img_shopPoint.visibility = result ? SlateVisibility.Visible : SlateVisibility.Hidden })

        } else if (this._data.id == EShopItemType.Gift) {
            StoreModuleC.checkDailyPack().then(result => { this.img_shopPoint.visibility = result ? SlateVisibility.Visible : SlateVisibility.Hidden })
        }
    }

    onDestroy() {
        this._event.forEach(e => e.disconnect());
        this._event.length = 0
    }


}