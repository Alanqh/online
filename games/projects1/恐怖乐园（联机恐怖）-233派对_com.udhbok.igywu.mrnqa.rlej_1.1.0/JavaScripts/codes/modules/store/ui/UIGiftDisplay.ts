/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 18:19:41
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-16 18:29:14
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ui\UIGiftDisplay.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import Congratulations_UI_Generate from "../../../../ui-generate/ShareUI/props/Congratulations_UI_generate";
import GiftDisplayItem_Generate from "../../../../ui-generate/ShareUI/props/GiftDisplayItem_generate";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { BagDefine } from "../../bag/BagDefine";
import { BagModuleC } from "../../bag/BagModuleC";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC from "../StoreModuleC";
import { UIGiftBagOpen } from "./UIGiftBagOpen";
const delayTime: number = 3

export class UIGiftDisplay extends Congratulations_UI_Generate {

    private _totalData: number[][] = []
    private _items: number[] = []
    private _itemCounts: number[] = []
    private _timer: number = delayTime;
    private _curItemID: number;

    onStart() {
        this.btn_next.onClicked.add(() => {
            this.showItem()
        })
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIGiftDisplay)
        })

        this.btn_open.onClicked.add(() => {
            UIService.hide(UIGiftDisplay)
            if (BagDefine.checkIsSpecialItem(this._curItemID)) {
                RouteDefine.getSpecialItemDataList(Player.localPlayer.userId).then(list => {
                    let item = list.find(e => e.cfgId == this._curItemID)
                    if (item.count > 0) {
                        UIService.show(UIGiftBagOpen, this._curItemID)
                    } else {
                        Tips.show(LanUtil.getText("Code_002"));
                    }
                })
            } else {
                let count = ModuleService.getModule(BagModuleC).getAllItemCountByCfgId(this._curItemID)
                if (count > 0) {
                    UIService.show(UIGiftBagOpen, this._curItemID)
                } else {
                    Tips.show(LanUtil.getText("Code_002"));
                }
            }
        })
    }

    onShow(data: number[][], itemID: number) {
        if (!data || !itemID) return
        this._totalData = data;
        this._curItemID = itemID;
        this._items = [].concat(data[0])
        this._itemCounts = [].concat(data[1])
        this.showItem();
        this.canUpdate = true
        this.btn_next.enable = true;
    }

    private showItem() {
        if (this._items.length > 0 && !StoreModuleC.skipDisplay) {
            let itemID = this._items.shift();
            let itemCount = this._itemCounts.shift();
            let itemData = GameConfig.Item.getElement(itemID)
            this.img_icon1.imageGuid = itemData.icon
            this.text_name1.text = `${BagDefine.extractTextBeforeRichText(itemData.name)}x${itemCount}`;
            let q = this.getQuality(1);
            this.text_quality.text = q.txt;
            this.text_quality.fontColor = q.color;
            this._timer = delayTime
        } else {
            this.btn_next.enable = false;
            this.canUpdate = false
            this.showAllGifts()
        }
    }


    private showAllGifts() {
        this.canvas_items0.removeAllChildren();
        this.canvas_1.visibility = SlateVisibility.Collapsed;
        this.canvas_3.visibility = SlateVisibility.Visible;
        let items = this._totalData[0];
        let itemCounts = this._totalData[1];
        for (let i = 0; i < items.length; ++i) {
            let item = UIService.create(UIDisplayItem)
            let itemData = GameConfig.Item.getElement(items[i])
            item.setData(itemData.icon, `${BagDefine.extractTextBeforeRichText(itemData.name)}x${itemCounts[i]}`)
            this.canvas_items0.addChild(item.rootCanvas);
        }
    }

    private getQuality(type: number) {
        switch (type) {
            case 1:
                return { txt: GameConfig.SubLanguage.quality_01.Value, color: new LinearColor(255, 255, 255) }
            case 2:
                return { txt: GameConfig.SubLanguage.quality_02.Value, color: new LinearColor(255, 255, 255) }
            case 3:
                return { txt: GameConfig.SubLanguage.quality_03.Value, color: new LinearColor(255, 255, 255) }
            case 4:
                return { txt: GameConfig.SubLanguage.quality_04.Value, color: new LinearColor(255, 255, 255) }
            case 5:
                return { txt: GameConfig.SubLanguage.quality_05.Value, color: new LinearColor(255, 255, 255) }
            default:
                console.log("不存在的品质", type);

        }
    }

    onHide() {
        this.canvas_items0.removeAllChildren();
        this.canvas_1.visibility = SlateVisibility.Visible;
        this.canvas_3.visibility = SlateVisibility.Collapsed;
        this.canUpdate = false
    }

    onUpdate(dt: number) {
        if (this._timer > 0) {
            this._timer -= dt
            if (this._timer <= 0) this.showItem()
        }
    }

}


export class UIDisplayItem extends GiftDisplayItem_Generate {

    setData(icon: string, name: string) {
        this.imgIcon.imageGuid = icon;
        this.text_name.text = name
    }

}