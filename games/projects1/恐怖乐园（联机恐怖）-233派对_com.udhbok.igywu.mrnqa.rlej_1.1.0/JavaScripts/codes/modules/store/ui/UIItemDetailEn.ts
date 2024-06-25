/*
 * @Author       : dal
 * @Date         : 2024-04-25 14:30:56
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-25 15:09:36
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIItemDetailEn.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import ShopDetail_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopDetail_UI_generate";
import { CloseFloatWindowEn } from "../../../ui/CloseFloatWindow";

export class UIItemDetailEn extends ShopDetail_UI_Generate {

    onStart() {
        this.layer = UILayerDialog;
    }

    /**
     * 传一个ui，显示在这个UI下面
     * @param itemId 道具配置id
     * @param widget 
     * @param rootCanvas 这个widget的最父级画布
     */
    onShow(itemId: number, widget: Widget, rootCanvas: Canvas) {
        // 获取此时按钮的绝对位置
        const btnAbs = widget.cachedGeometry.getAbsolutePosition();
        // 获取背包根画布的绝对位置
        const bagAbs = rootCanvas.cachedGeometry.getAbsolutePosition();
        // 计算差值
        let targetAbsPos = btnAbs.subtract(bagAbs);

        const curViewPortScale = getViewportScale();

        // 消除DPI的影响
        targetAbsPos.x /= curViewPortScale;
        targetAbsPos.y /= curViewPortScale;

        this.rootCanvas.position = targetAbsPos;

        const itemCfg = GameConfig.Item.getElement(itemId);

        this.img_itemicon.imageGuid = itemCfg.icon;
        this.text_name.text = itemCfg.name;
        this.text_introduce.text = itemCfg.description;
        if (itemCfg.quality) {
            const qualityID = itemCfg.quality === 0 ? 1 : itemCfg.quality;
            this.img_iconquality.imageGuid = GameConfig.ItemQuality.getElement(qualityID).imgGuid
        }
        UIService.show(CloseFloatWindowEn);
    }

}