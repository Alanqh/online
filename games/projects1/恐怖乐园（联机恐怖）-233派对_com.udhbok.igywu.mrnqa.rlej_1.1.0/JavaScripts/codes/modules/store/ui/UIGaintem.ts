/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 18:36:08
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-29 11:05:15
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIGaintem.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import Successful_UI_Generate from "../../../../ui-generate/ShareUI/shop/Successful_UI_generate";

export class UIGainItem extends Successful_UI_Generate {

    onStart() {
        this.btn_confirm.onClicked.add(() => {
            UIService.hide(UIGainItem)
        })
        this.layer = UILayerSystem
    }

    onShow(itemData: IItemElement, count: number = 1) {
        if (!itemData) return
        this.img_icon.imageGuid = itemData.icon;
        this.text_name.text = itemData.name;
        this.text_num.text = count.toString()
        this.canUpdate = true;
        if (itemData.quality) {
            const qualityID = itemData.quality === 0 ? 1 : itemData.quality;
            this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(qualityID).imgGuid
        }
    }

    onHide() {
        this.canUpdate = false;
    }

    onUpdate(dt: number) {
        this.img_flash.renderTransformAngle += 1
    }
}