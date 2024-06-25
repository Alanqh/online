/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:44:49
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-16 18:56:21
 * @FilePath: \1001_hall\JavaScripts\codes\modules\treasure\ui\UIGainPrize.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import GainPrize_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/GainPrize_UI_generate";
import { CloseFloatWindow } from "../../../ui/CloseFloatWindow";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIItemDetail } from "../../store/ui/UIItemDetail";
import { UIPrizeItem } from "./UIPrizeItem";

export class UIGainPrize extends GainPrize_UI_Generate {

    onStart() {
        this.btn_close.onClicked.add(() => {
            UIService.hide(UIGainPrize);
        })
        this.layer = UILayerSystem
    }

    onShow(treasureID: number, itemIdList: number[] = [], gainCount: number[] = []) {
        let itemIds: number[] = []
        let dataMap: Map<number, number> = new Map()
        if (itemIdList.length <= 0) {
            let data = GameConfig.TreasureBox.getElement(treasureID);
            data.itemID.forEach(e => {
                if (dataMap.has(e[0])) {
                    let count = dataMap.get(e[0])
                    dataMap.set(e[0], count + e[1])
                } else {
                    dataMap.set(e[0], e[1])
                }
            })
            itemIds = Array.from(dataMap.keys());
        } else {
            itemIds = itemIdList;
            itemIds.forEach((v, i, arr) => {
                dataMap.set(v, gainCount[i])
            })
        }
        itemIds.sort((a, b) => { return GameConfig.Item.getElement(b).quality - GameConfig.Item.getElement(a).quality })
        itemIds.forEach(e => {
            let item = UIService.create(UIPrizeItem)
            let count = dataMap.get(e);
            item.setData(e, count.toString())
            this.canvas_prize.addChild(item.rootCanvas);
            GhostTraceHelper.uploadMGS("ts_action_upgrade_item", "获得物品的时候上发", { item_id: e, item_level: 2 })
        })
    }

    onHide() {
        this.canvas_prize.removeAllChildren()
        UIService.hide(UIItemDetail);
        UIService.hide(CloseFloatWindow);
    }
}