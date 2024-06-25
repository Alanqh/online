/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 10:16:41
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-06-17 17:41:10
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\store\ui\UIShopBuy.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import Buy_UI_Generate from "../../../../ui-generate/ShareUI/shop/Buy_UI_generate";
import GameStart from "../../../GameStart";
import { LanUtil } from "../../../utils/LanUtil";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC, { EShopItemType } from "../StoreModuleC";
import { UIShopTips } from "./UIShopTips";

const singleBuyLimit: number = 99

export class UIShopBuy extends Buy_UI_Generate {
    private _data: IShopElement
    private _curNum: number = 1;
    private _maxNum: number = undefined;
    private _curName: string;
    private _skipConform: boolean = false;
    onStart() {
        this.layer = mw.UILayerSystem;
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIShopBuy);
        })

        this.btn_add.onClicked.add(() => {
            if (this._curNum >= this._maxNum) return
            this._curNum++;
            this.text_buynum.text = this._curNum.toString()
            this.updateCostMoney()
        })

        this.btn_minus.onClicked.add(() => {
            if (this._curNum <= 1) return
            this._curNum--;
            this.text_buynum.text = this._curNum.toString()
            this.updateCostMoney()
        })

        this.btn_max.onClicked.add(() => {
            this._curNum = this._maxNum;
            this.text_buynum.text = this._curNum.toString()
            this.updateCostMoney()
        })

        this.btn_buy.onClicked.add(() => {
            if (!this._data || !this._maxNum) return
            this.btn_buy.enable = false;
            // if (!this._skipConform) {
            let realPrice = (this._curNum * this._data.price * StoreModuleC.discount).toFixed(0)
            if (this._data.currencyType == 2) {
                let lebi = GameConfig.happyCoin.getElement(this._data.price)
                let price = GameStart.isGPark ? lebi.outValue : lebi.value
                realPrice = (price * this._curNum).toFixed(0)
            }
            if (this._data.price <= 0) realPrice = LanUtil.getText("Code_047")
            // UIService.show(UIShopTips, GameConfig.SubLanguage.shop_02.Value + GameConfig.SubLanguage.shoptips_01.Value,
            //     StringUtil.format(GameConfig.SubLanguage.shoptips_04.Value, realPrice, this._curNum, this._curName),
            //     () => {
            //         ModuleService.getModule(StoreModuleC).reqBuyItem(this._data, this._curNum);
            //         GhostTraceHelper.uploadMGS("ts_action_buy_item", "购买物品上发", { box_id: this._curNum, item_id: this._data.id, model_id: this._data.shopID })
            //         UIService.hide(UIShopBuy)
            //     },
            //     true
            // )
            ModuleService.getModule(StoreModuleC).reqBuyItem(this._data, this._curNum);

            GhostTraceHelper.uploadMGS("ts_action_buy_gun", "购买弹窗确定按钮", { gun_id: this._data.itemID })
            UIService.hide(UIShopBuy)

            // } else {
            //     ModuleService.getModule(StoreModuleC).reqBuyItem(this._data, this._curNum);
            //     GhostTraceHelper.uploadMGS("ts_action_buy_item", "购买物品上发", { box_id: this._curNum, item_id: this._data.id, model_id: this._data.shopID })
            //     UIService.hide(UIShopBuy)
            // }
        })
        UIShopTips.checkAction.add((state: boolean) => {
            this._skipConform = state
        })
    }

    async onShow(data: IShopElement, canBuyCount: number) {
        this.btn_buy.enable = true;
        GhostTraceHelper.uploadMGS("ts_action_buy_pet", "购买弹窗展示", { pet_id: data.itemID })
        this._data = data
        this._curNum = 1;
        let itemData = GameConfig.Item.getElement(this._data.itemID)
        this.img_icon.imageGuid = itemData.icon
        this._curName = itemData.name
        this.text_name.text = this._curName
        this.text_buynum.text = this._curNum.toString();
        this.text_desc.text = itemData.description;
        this.updateCostMoney();
        this.text_limit.visibility = this._data.buyLimit == -1 ? SlateVisibility.Collapsed : SlateVisibility.Visible
        if (itemData.quality) {
            this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(itemData.quality).imgGuid
        }
        if (this._data.buyLimit == -1) canBuyCount = Infinity//不限购
        if (this._data.currencyType == 1) {
            if (this._data.price == 0) {//不要钱
                this._maxNum = Math.min(canBuyCount, singleBuyLimit);
            } else {
                //检查背包道具数量 计算最大可购买数量
                let money = await RouteDefine.getFearCoin(Player.localPlayer.userId)
                this._maxNum = Math.min(Math.floor(money / this._data.price), singleBuyLimit, canBuyCount)
            }
        } else {
            this._maxNum = Math.min(canBuyCount, singleBuyLimit);;
        }

        if (data.limitString) {
            let count = await RouteDefine.checkBuyLimit(Player.localPlayer.userId, data.id)
            this.text_limit.text = StringUtil.format(LanUtil.getText(data.limitString), data.buyLimit - count, data.buyLimit)
        } else {
            this.text_limit.text = StringUtil.format(GameConfig.SubLanguage.shop_08.Value, this._maxNum);
        }

        if (StoreModuleC.discount < 1) {
            this.text_cardingDesc.text = StringUtil.format(LanUtil.getText("UI_shop_03"), ((1 - StoreModuleC.discount) * 100).toFixed(0));
        } else {
            this.text_cardingDesc.text = ""
        }
    }

    updateCostMoney() {
        let realPrice: string;
        if (this._data.currencyType == 1) {
            this.img_moneyicon.imageGuid = "306668"
            realPrice = (this._curNum * this._data.price * StoreModuleC.discount).toFixed(0)
        } else {
            this.img_moneyicon.imageGuid = GameStart.isGPark ? "311872" : "291724"
            let lebi = GameConfig.happyCoin.getElement(this._data.price)
            let price = GameStart.isGPark ? lebi.outValue : lebi.value
            realPrice = (price * this._curNum).toFixed(0)
        }
        if (this._data.price <= 0) realPrice = LanUtil.getText("Code_047")
        this.text_moneynum.text = realPrice;
    }

}