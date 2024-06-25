/*
 * @Author       : dal
 * @Date         : 2024-05-10 16:42:36
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-17 14:24:43
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\ui\RewardTipsHud.ts
 * @Description  : 奖励提示ｈｕｄ
 */

import { GameConfig } from "../../../../config/GameConfig";
import GiftInclude01_UI_Generate from "../../../../ui-generate/ShareUI/integration/GiftInclude01_UI_generate";
import GiftItem01_UI_Generate from "../../../../ui-generate/ShareUI/integration/GiftItem01_UI_generate";
import { CloseRewardTipsFloatWindow } from "../../../ui/CloseFloatWindow";
import UIIntegration from "../../../ui/UIIntegration";
import { GridContainer } from "../../../utils/UIPool";

export class RewardTipsItem extends GiftItem01_UI_Generate {

    public setData(itemId: number, count: number) {
        let cfg = GameConfig.Item.getElement(itemId);
        if (!cfg) {
            cfg = GameConfig.Item.getElement(10001);
            console.error(`DEBUG MyTypeError>>> 奖励提示item显示失败 ${itemId}不存在`);
        }
        this.img_icon.imageGuid = cfg.icon;
        this.text_num.text = `*${count}`;
    }
}

export class RewardTipsHud extends GiftInclude01_UI_Generate {

    onStart() {
        this.layer = UILayerDialog;
        this.container = new GridContainer(this.canvas_include, RewardTipsItem);
    }

    private container: GridContainer<RewardTipsItem>;

    /**
     * 传一个ui，显示在这个UI下面
     * @param itemId 道具配置id
     * @param widget 要出现在那个位置的widget
     * @param rootCanvas 这个widget的最父级画布
     * @param offSet 偏移
     */
    onShow(rewardsArr: number[][], widget: Widget, offSet: Vector2 = Vector.zero) {
        // 获取此时按钮的绝对位置
        const btnAbs = widget.cachedGeometry.getAbsolutePosition();
        // 获取背包根画布的绝对位置
        const bagAbs = UIService.getUI(UIIntegration).rootCanvas.cachedGeometry.getAbsolutePosition();
        // 计算差值
        let targetAbsPos = btnAbs.subtract(bagAbs);

        const curViewPortScale = getViewportScale();

        // 消除DPI的影响
        targetAbsPos.x /= curViewPortScale;
        targetAbsPos.y /= curViewPortScale;

        this.uiObject.position = targetAbsPos.add(offSet);

        this.container.clear();
        rewardsArr.forEach(v => {



            const node = this.container.addNode();
            node.setData(v[0], v[1]);


        });

        this.img_bg.size = new Vector2(this.localX, this.localY + rewardsArr.length * this.itemY);

        UIService.show(CloseRewardTipsFloatWindow);
    }

    /** item的高度 */
    private readonly itemY: number = 65;

    /** 本地的高度 */
    private readonly localY: number = 55;
    /** 本地的高度 */
    private readonly localX: number = 170;
}