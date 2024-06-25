/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:27:48
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-09 15:21:45
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\treasure\ui\UIPrizePool.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { ITreasureBoxElement } from "../../../../config/TreasureBox";
import PrizePool_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/PrizePool_UI_generate";
import { CloseFloatWindow } from "../../../ui/CloseFloatWindow";
import { UIItemDetail } from "../../store/ui/UIItemDetail";
import { UIPrizeItem } from "./UIPrizeItem";

export class UIPrizePool extends PrizePool_UI_Generate {

    fakerProb: string[] = ["7.14%","0.15%","1.53%","0.26%","100%","11.49%","11.49%","12%","0.61%","9.75%","0.92%","100%","11.49%","11.49%","9.44%"]
    onStart() {
        this.btn_back.onClicked.add(() => { UIService.hide(UIPrizePool) })
        this.layer = UILayerSystem
    }

    onShow(data: ITreasureBoxElement[]) {
        let itemIds: number[] = []
        data.forEach(e => {
            e.itemID.forEach(k => {
                if (itemIds.findIndex(e => e == k[0]) == -1) itemIds.push(k[0])
            })
        })
        itemIds.sort((a, b) => { return GameConfig.Item.getElement(b).quality - GameConfig.Item.getElement(a).quality })
        let len = itemIds.length - this.fakerProb.length;
        for (let i = 0; i < len; ++i) {
            let value = MathUtil.randomFloat(0.001, 0.1)
            let prob = `${(value * 100).toFixed(1)}%`
            this.fakerProb.push(prob)
        }

        for (let i = 0; i < itemIds.length; ++i) {
            let item = UIService.create(UIPrizeItem)
            item.setData(itemIds[i], "", this.fakerProb[i])
            this.canvas_prize.addChild(item.rootCanvas);
        }
        // itemIds.forEach(e => {
        //     let value = MathUtil.randomFloat(0.001, 0.1)
        //     let item = UIService.create(UIPrizeItem)
        //     let prob = `${(value * 100).toFixed(1)}%`
        //     item.setData(e, "", prob)
        //     this.canvas_prize.addChild(item.rootCanvas);
        // })
    }

    onHide() {
        this.canvas_prize.removeAllChildren();
        UIService.hide(UIItemDetail);
        UIService.hide(CloseFloatWindow);
    }
}