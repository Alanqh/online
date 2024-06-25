/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-02 17:00:57
 * @LastEditors: wanyue.gou wanyue.gou@appshahe.com
 * @LastEditTime: 2024-04-18 15:25:19
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\store\ui\UIShopPopUp.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { IRecommendedElement } from "../../../../config/Recommended";
import { IShopElement } from "../../../../config/Shop";
import ShopPopup_UI_Generate from "../../../../ui-generate/ShareUI/ShopPopup_UI_generate";
import ShopPopupItem_UI_Generate from "../../../../ui-generate/ShareUI/ShopPopupItem_UI_generate";

import GameStart from "../../../GameStart";
import UIIntegration from "../../../ui/UIIntegration";
import { LanUtil } from "../../../utils/LanUtil";
import { BagDefine } from "../../bag/BagDefine";
import { BagModuleC } from "../../bag/BagModuleC";
import UnlockTips from "../../controller/ui/UnlockTips";
import IAPModuleC from "../../iap/IAPModuleC";
import { RouteDefine } from "../../route/RouteDefine";
import { RouteModuleC } from "../../route/RouteModule";
import StoreModuleC from "../StoreModuleC";


export default class UIShopPopUp extends ShopPopup_UI_Generate {

    private _popState: boolean = false;

    protected onHide() {
        UIService.show(UIIntegration).showSubTab();
    }

    protected onStart(): void {
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIShopPopUp)
        })

        this.mCheckbox.onCheckStateChanged.add(() => {
            this.mCheckbox.enable = false;
            this._popState = !this._popState;
            RouteDefine.setRecommendState(Player.localPlayer.userId, GameStart.GameTheme, this._popState)
            TimeUtil.delaySecond(0.5).then(() => {
                this.mCheckbox.enable = true;
            })
        })
        this.layer = mw.UILayerBottom;
    }

    onShow(data: IRecommendedElement) {
        this.mCanvas_PopupList.removeAllChildren();
        for (let i = 0; i < 3; ++i) {
            let shopData = GameConfig.Shop.getElement(data.numberList[i]);
            let item = UIService.create(UIPopUpItem);
            item.setData(shopData)
            this.mCanvas_PopupList.addChild(item.uiObject);
        }
    }

    protected onUpdate(dt: number): void {

    }

}

export class UIPopUpItem extends ShopPopupItem_UI_Generate {

    private _data: IShopElement;

    onStart() {
        this.btn_useItem.onClicked.add(() => {
            if (!this._data) return
            let itemData = GameConfig.Item.getElement(this._data.itemID)
            if (itemData.clazz == "HotWeaponItem") {
                UIService.show(UnlockTips, itemData, this._data.price);
            } else {
                ModuleService.getModule(StoreModuleC).reqBuyItem(this._data, 1);
            }
        })

        //IAP购买成功监听
        IAPModuleC.onPurchaseAction.add((commodityId: string, result: boolean) => {
            this.checkState()
        })

        //获得新皮肤监听
        RouteDefine.addNewSkin.add((newSkinID: number) => {
            this.checkState()
        })
        /**购买枪械回调 */
        Event.addLocalListener("UnlockItemSuccess", () => { this.checkState() });
    }

    setData(data: IShopElement) {
        if (!data) return;
        this._data = data;
        let itemData = GameConfig.Item.getElement(this._data.itemID)
        if (!itemData) return;
        this.img_icon.imageGuid = itemData.icon;
        this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(itemData.quality).imgGuid;
        this.mText_ItemName.text = itemData.name;
        this.mText_ItemDetail.text = itemData.description;
        if (this._data.currencyType == 2) {
            let lebi = GameConfig.happyCoin.getElement(this._data.price)
            let price = GameStart.isGPark ? lebi.outValue : lebi.value
            this.mText_Prize.text = price.toFixed(0)
            this.mImg_CurrencyIcon.imageGuid = GameStart.isGPark ? "311872" : "291724"
        } else {
            this.mImg_CurrencyIcon.imageGuid = "306668";
            RouteDefine.getDiscount(Player.localPlayer.userId).then(discount => {
                this.mText_Prize.text = (this._data.price * discount).toFixed(0);
            })
        }
        this.checkState()
    }

    private checkState() {
        switch (this._data.type) {
            case 1:
                this.checkSkinLimit();
                break;
            case 4:
                if (!BagDefine.checkIsSpecialItem(this._data.itemID)) {
                    this.checkNormalItemLimit()
                } else {
                    this.checkSpecialItemLimit()
                }
                break;
            case 5:
                this.checkMonthlyAndSeasonalLimit();
                break;
            case 10:
                this.checkGunLimit();
                break;
            default:
        }
    }

    /**检查月卡季卡购买限制 */
    async checkMonthlyAndSeasonalLimit() {
        let result = await RouteDefine.getRewardState(Player.localPlayer.userId);
        let monthly = result[0]; let seasonal = result[1];
        if (this._data.id === 2000) {//月卡
            if (monthly.state == 0) {
                this.btn_useItem.visibility = SlateVisibility.Visible
                this.mText_SellOut.visibility = SlateVisibility.Collapsed
                this.mText_ItemDetail_1.text = ""
            } else {
                this.btn_useItem.visibility = SlateVisibility.Collapsed
                this.mText_SellOut.visibility = SlateVisibility.Visible
                this.mText_ItemDetail_1.text = StringUtil.format(LanUtil.getText("UI_Popup_04"), monthly.remainDays);
            }
            this.img_icon.imageGuid = GameStart.isGPark ? GameConfig.SubGlobal.MonthlyCard.stringList[1] : GameConfig.SubGlobal.MonthlyCard.stringList[0];
        } else if (this._data.id === 2001) {//季卡
            if (seasonal.state == 0) {
                this.btn_useItem.visibility = SlateVisibility.Visible
                this.mText_SellOut.visibility = SlateVisibility.Collapsed
                this.mText_ItemDetail_1.text = ""
            } else {
                this.btn_useItem.visibility = SlateVisibility.Collapsed
                this.mText_SellOut.visibility = SlateVisibility.Visible
                this.mText_ItemDetail_1.text = StringUtil.format(LanUtil.getText("UI_Popup_04"), monthly.remainDays);
            }
            this.img_icon.imageGuid = GameStart.isGPark ? GameConfig.SubGlobal.SeasonalCard.stringList[1] : GameConfig.SubGlobal.SeasonalCard.stringList[0];
        }
    }

    /**检查房子皮肤限制 */
    async checkSkinLimit() {
        let itemData = GameConfig.Item.getElement(this._data.itemID)
        let skinID = Number(itemData.clazzParam[0])
        let state = await RouteDefine.checkHasSkin(Player.localPlayer.userId, skinID);
        this.btn_useItem.visibility = state ? SlateVisibility.Collapsed : SlateVisibility.Visible
        this.mText_SellOut.visibility = state ? SlateVisibility.Visible : SlateVisibility.Collapsed
    }

    /**检查特殊道具限制 */
    async checkSpecialItemLimit() {
        if (this._data.limitString) {//限购礼包处理
            let count = await RouteDefine.checkBuyLimit(Player.localPlayer.userId, this._data.id);
            this.btn_useItem.visibility = count <= 0 ? SlateVisibility.Collapsed : SlateVisibility.Visible
            this.mText_SellOut.visibility = count <= 0 ? SlateVisibility.Visible : SlateVisibility.Collapsed
        } else {
            let dataList = await RouteDefine.getSpecialItemDataList(Player.localPlayer.userId);
            let item = dataList.find(e => e.cfgId == this._data.itemID);
            if (!item) {
                this.btn_useItem.visibility = SlateVisibility.Visible
                this.mText_SellOut.visibility = SlateVisibility.Collapsed
            } else {
                this.btn_useItem.visibility = item.count >= this._data.buyLimit ? SlateVisibility.Collapsed : SlateVisibility.Visible
                this.mText_SellOut.visibility = item.count >= this._data.buyLimit ? SlateVisibility.Visible : SlateVisibility.Collapsed
            }
        }
    }

    /**检查普通道具限制 */
    checkNormalItemLimit() {
        let count = ModuleService.getModule(BagModuleC).getAllItemCountByCfgId(this._data.itemID);
        this.btn_useItem.visibility = count >= this._data.buyLimit ? SlateVisibility.Collapsed : SlateVisibility.Visible
        this.mText_SellOut.visibility = count >= this._data.buyLimit ? SlateVisibility.Visible : SlateVisibility.Collapsed
    }

    /**检查枪械限制 */
    async checkGunLimit() {
        let list = await ModuleService.getModule(RouteModuleC).reqUnlockedItemList()
        let index = list.indexOf(this._data.itemID)
        this.btn_useItem.visibility = index == -1 ? SlateVisibility.Visible : SlateVisibility.Collapsed
        this.mText_SellOut.visibility = index == -1 ? SlateVisibility.Collapsed : SlateVisibility.Visible
    }

}