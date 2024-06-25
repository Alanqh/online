/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 11:15:27
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-23 18:12:50
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\store\ui\UIShopItem.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import ShopItem_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopItem_UI_generate";
import GameStart from "../../../GameStart";
import { LanUtil } from "../../../utils/LanUtil";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { IAPData } from "../../iap/IAPData";
import StoreModuleC, { EShopItemType } from "../StoreModuleC";

export class UIShopItem extends ShopItem_UI_Generate {

    private _data: IShopElement;
    private _myRootCanvas: Canvas;
    onStart() {
        this.btn_itempick.clickMethod = ButtonClickMethod.PreciseClick
        this.btn_itempick.onClicked.add(() => {
            if (!this._data) return
            Event.dispatchToLocal("evt_shopItemSelected", this._data)
            GhostTraceHelper.uploadMGS("ts_action_buy_rocket", "选中商店物品", { rocket_id: this._data.itemID })
        })
        this._myRootCanvas = this.uiWidgetBase.findChildByPath("RootCanvas") as Canvas;
        Event.addLocalListener("evt_shopItemSelected", (data: IShopElement) => {
            let color = data.id == this._data.id ? "#E2EB00FF" : "#FFFFFFFF"
            this.btn_itempick.setNormalImageColorByHex(color)
        })
    }

    setShopData(data: IShopElement, type: EShopItemType) {
        if (!data) return
        this._data = data;
        let itemData = GameConfig.Item.getElement(this._data.itemID)
        if (itemData) {
            this.img_itemicon.imageGuid = itemData.icon
            this.text_itemname.text = itemData.name
            if (itemData.quality && this.img_itembg) {
                const qualityID = itemData.quality === 0 ? 1 : itemData.quality;
                this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(qualityID).imgGuid;
            }
        }
        this.img_normal.visibility = SlateVisibility.Collapsed;
        this.img_firstbuy.visibility = SlateVisibility.Collapsed;
        if (data.currencyType == 1) {
            this.img_currencyicon.imageGuid = "306668"
            this.text_price.text = this._data.price <= 0 ? LanUtil.getText("Code_047") : (this._data.price * StoreModuleC.discount).toFixed(0);
        } else {
            this.img_currencyicon.imageGuid = GameStart.isGPark ? "311872" : "291724"
            let lebi = GameConfig.happyCoin.getElement(this._data.price)
            if (lebi) {
                this.text_price.text = GameStart.isGPark ? lebi.outValue.toFixed(0) : lebi.value.toFixed(0);
                if (itemData.clazz == "Currency") {//是恐惧币
                    if (DataCenterC.getData(IAPData).isPurchased(lebi.id)) {//已经买过
                        if (Number(itemData.clazzParam[3]) > 0) {
                            this.txt_normal.text = StringUtil.format(LanUtil.getText("UI_normalbuy"), itemData.clazzParam[3])
                            this.img_normal.visibility = SlateVisibility.HitTestInvisible;
                        }
                    } else {//首次购买
                        this.txt_firstbuy.text = StringUtil.format(LanUtil.getText("UI_firstbuy"), itemData.clazzParam[2])
                        this.img_firstbuy.visibility = SlateVisibility.HitTestInvisible;
                    }
                }
            } else {
                console.log("没拿到乐币配置", this._data.price);
                this.text_price.text = this._data.price.toFixed(0)
            }
        }
        this.checkVisibility(type)
    }

    checkVisibility(type: EShopItemType) {
        if (type == EShopItemType.All) {//显示所有商品
            this._myRootCanvas.visibility = SlateVisibility.Visible
            return
        }
        this._myRootCanvas.visibility = type == this._data.type ? SlateVisibility.Visible : SlateVisibility.Collapsed
    }

    hide() {
        this._myRootCanvas.visibility = SlateVisibility.Collapsed
    }
    get data() { return this._data }
    get myRootCanvas() { return this._myRootCanvas }
    get type() { return this._data.type }


}