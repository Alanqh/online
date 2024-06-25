/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-26 18:33:34
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-08 09:58:13
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIGiftItem.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import GiftItem_UI_Generate from "../../../../ui-generate/ShareUI/shop/GiftItem_UI_generate";
import { CommonUtils } from "../../../utils/CommonUtils";
import { UIItemDetail } from "./UIItemDetail";

export class UIGiftItem extends GiftItem_UI_Generate {

    private _data: IItemElement;

    private _myRootCanvas: Canvas
    onStart() {
        this._myRootCanvas = this.uiWidgetBase.findChildByPath("RootCanvas") as Canvas
        this.btn_itempick.onClicked.add(() => {
            if (!this._myRootCanvas) return
            let position = CommonUtils.getViewPosition(this._myRootCanvas, this._myRootCanvas.position.clone());
            position.y += this._myRootCanvas.size.y
            UIService.show(UIItemDetail, this._data, position)
        })
    }

    setData(data: IItemElement, count: number) {
        this._data = data;
        this.img_itemicon.imageGuid = this._data.icon;
        this.text_price.text = `x${count}`;
        if (data.quality) {
            this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(data.quality).imgGuid
        }

    }
}