/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 16:39:24
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-04-23 18:43:26
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIItemDetail.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import ShopDetail_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopDetail_UI_generate";
import { CloseFloatWindow } from "../../../ui/CloseFloatWindow";

export class UIItemDetail extends ShopDetail_UI_Generate {

    onStart() {
        this.layer = UILayerError;
    }

    onShow(data: IItemElement, position: Vector2) {
        this.img_itemicon.imageGuid = data.icon;
        this.text_name.text = data.name;
        this.text_introduce.text = data.description;
        this.rootCanvas.position = position;
        if (data.quality) {
            const qualityID = data.quality === 0 ? 1 : data.quality;
            this.img_iconquality.imageGuid = GameConfig.ItemQuality.getElement(qualityID).imgGuid
        }
        UIService.show(CloseFloatWindow);
    }

}