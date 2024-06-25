/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 15:06:19
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-28 11:59:26
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIBuyGiftBag.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IShopElement } from "../../../../config/Shop";
import BuyFixBag_UI_Generate from "../../../../ui-generate/ShareUI/props/BuyFixBag_UI_generate";
import BuyGiftBag_UI_Generate from "../../../../ui-generate/ShareUI/props/BuyGiftBag_UI_generate";
import { ReItemUI } from "../../../ui/items/ReItemUI";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import IAPModuleC from "../../iap/IAPModuleC";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC from "../StoreModuleC";
import { UIShopTips } from "./UIShopTips";

export class UIBuyGiftBag extends BuyGiftBag_UI_Generate {
    private _curData: IShopElement;
    private _maxNum: number = 0;
    private _curNum: number = 0;

    onStart() {
        this.layer = UILayerDialog
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIBuyGiftBag);
        })

        this.btn_buyItem.onClicked.add(async () => {
            if (!this._curData || this._curNum <= 0 || this._curNum > this._maxNum) return;
            GhostTraceHelper.uploadMGS("ts_action_buy_item", "非商店购买", { item_id: this._curData.itemID, model_id: -999, box_id: this._curNum })
            GhostTraceHelper.uploadMGS("ts_action_buy_gun", "购买弹窗确定按钮", { item_id: this._curData.itemID })
            ModuleService.getModule(StoreModuleC).reqBuyItem(this._curData, this._curNum);
            UIService.hide(UIBuyGiftBag);
        })

        this.btn_no.onClicked.add(() => {
            UIService.hide(UIBuyGiftBag);
        })
        this.btn_add.onClicked.add(() => {
            if (this._curNum >= this._maxNum) return;
            this._curNum++;
            this.setBuyNumText()
        })

        this.btn_minus.onClicked.add(() => {
            if (this._curNum <= 1) return;
            this._curNum--;
            this.setBuyNumText()
        })
        this.btn_max.onClicked.add(() => {
            this._curNum = this._maxNum;
            this.setBuyNumText()
        })
    }

    onShow(shopID: number) {
        this._curData = GameConfig.Shop.getElement(shopID);
        let itemData = GameConfig.Item.getElement(this._curData.itemID)
        GhostTraceHelper.uploadMGS("ts_action_buy_pet", "购买弹窗展示", { pet_id: this._curData.itemID })
        this.text_question.text = StringUtil.format(GameConfig.SubLanguage.packbuy_01.Value, itemData.name)
        this.img_gift.imageGuid = itemData.icon;
        this._curNum = 0
        RouteDefine.getSpecialItemDataList(Player.localPlayer.userId).then(async list => {
            let bagData = list.find(e => e.cfgId == this._curData.itemID);
            let money = await RouteDefine.getFearCoin(Player.localPlayer.userId)
            if (this._curData.buyLimit == -1) {//不限购
                this._maxNum = Math.floor(money / this._curData.price)
            } else {
                let val1 = bagData ? this._curData.buyLimit - bagData.count : this._curData.buyLimit
                let val2 = Math.floor(money / this._curData.price)
                this._maxNum = Math.min(val1, val2);
            }
            this.text_num.text = bagData ? bagData.count.toString() : "0";//显示背包数量
            this.setBuyNumText()
        })
    }

    private setBuyNumText() {
        this.text_limit.text = `${this._curNum}/${this._maxNum}`;
        this.text_num_1.text = (StoreModuleC.discount * this._curNum * this._curData.price).toString()
    }

}


export class UIBuyFix extends BuyFixBag_UI_Generate {
    private _curData: IShopElement;
    private _curNum: number = 0;
    private _canBuy: boolean = false;

    onStart() {
        this.layer = UILayerDialog
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIBuyFix);
        })

        this.btn_buyItem.onClicked.add(async () => {
            if (!this._curData || this._curNum <= 0) return;
            GhostTraceHelper.uploadMGS("ts_action_buy_item", "非商店购买", { item_id: this._curData.itemID, model_id: -999, box_id: this._curNum })
            let totalPrice = StoreModuleC.discount * this._curData.price * this._curNum
            let result = await ModuleService.getModule(StoreModuleC).checkMoney(totalPrice)
            if (result) {
                GhostTraceHelper.uploadMGS("ts_action_buy_gun", "购买弹窗确定按钮", { item_id: this._curData.itemID })
                ModuleService.getModule(StoreModuleC).reqBuyItem(this._curData, this._curNum);
            }
            // else {
            //     let data = GameConfig.happyCoin.getElement(1)
            //     let itemData = GameConfig.Item.getElement(data.itemID)
            //     UIService.show(UIShopTips, "提示", `是否花费${data.value}乐币购买${itemData.clazzParam[1]}恐惧币？`, () => {
            //         ModuleService.getModule(IAPModuleC).placeOrder(data.clazz, 1)
            //     })
            // }
            UIService.hide(UIBuyFix);
        })

        this.btn_no.onClicked.add(() => {
            UIService.hide(UIBuyFix);
        })
    }

    async onShow(shopID: number, leftNum: number, iscanbuy: (res: boolean) => void) {
        this._curData = GameConfig.Shop.getElement(shopID);
        GhostTraceHelper.uploadMGS("ts_action_buy_pet", "购买弹窗展示", { pet_id: this._curData.itemID })
        let itemData = GameConfig.Item.getElement(this._curData.itemID)
        this.text_question.text = StringUtil.format(GameConfig.SubLanguage.packbuy_01.Value, itemData.name)
        this._curNum = leftNum
        this._canBuy = false;
        let totalPrice = StoreModuleC.discount * this._curData.price * this._curNum
        let money = await RouteDefine.getFearCoin(Player.localPlayer.userId)
        this._canBuy = money >= totalPrice
        RouteDefine.getSpecialItemDataList(Player.localPlayer.userId).then(async list => {
            this.setBuyNumText()
        })
        iscanbuy && iscanbuy(this._canBuy);
    }

    private setBuyNumText() {
        this.text_num_1.text = (StoreModuleC.discount * this._curData.price * this._curNum).toFixed(0)
    }

}
