/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 16:01:32
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-24 14:09:10
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\store\ui\UIGiftBagOpen.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import ItemGiftBagOpen_UI_Generate from "../../../../ui-generate/ShareUI/ItemGiftBagOpen_UI_generate";
import NEWGiftBagOpen_UI_Generate from "../../../../ui-generate/ShareUI/NEWGiftBagOpen_UI_generate";
import { CommonUtils } from "../../../utils/CommonUtils";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { BagDefine, BagItemData } from "../../bag/BagDefine";
import { BagModuleC } from "../../bag/BagModuleC";
import { RouteDefine } from "../../route/RouteDefine";
import StoreModuleC from "../StoreModuleC";
import { UIItemDetail } from "./UIItemDetail";

export class UIGiftBagOpen extends NEWGiftBagOpen_UI_Generate {

    private _curData: IItemElement;

    private _curNum: number = 1;

    /**拥有数量 */
    private _hasCount: number = 0;
    onStart() {
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIGiftBagOpen);
        })
        this.btn_open.onClicked.add(() => {
            if (!this._curData) return
            if (this._hasCount <= 0) {
                Tips.show(LanUtil.getText("Code_002"));
                return
            }
            if (this._curNum < 1 || this._curNum > this._hasCount) return
            ModuleService.getModule(StoreModuleC).reqOpenGiftPack(this._curData.id, this._curNum, false)
        })

        this.btn_minus.onClicked.add(() => {
            this._curNum--;
            if (this._curNum < 1) this._curNum = 1
            this.setPercent()
        })

        this.btn_add.onClicked.add(() => {
            this._curNum++;
            if (this._curNum > this._hasCount) this._curNum = this._hasCount
            this.setPercent()
        })
        this.pro_numberChange.onSliderValueChanged.add((curValue) => {
            this._curNum = curValue
            this.setPercent()
        })
        //更新剩余数量
        RouteDefine.onItemChange.add((cfgId: number, count: number) => {
            if (!this._curData || this._curData.id != cfgId) return
            this._hasCount = count;
            this.pro_numberChange.sliderMaxValue = count
        })
        Event.addLocalListener(BagDefine.OnItemChangeEvt, (list: BagItemData[]) => {
            this._hasCount = ModuleService.getModule(BagModuleC).getAllItemCountByCfgId(this._curData.id)
        })
    }

    private setPercent() {
        this.pro_numberChange.percent = this._curNum / this._hasCount
        this.text_openCount.text = this._curNum.toString()
    }

    async onShow(itemID: number) {
        this.canvas_giftList.removeAllChildren();
        this._curData = GameConfig.Item.getElement(itemID);
        this.text_title_1.text = this._curData.description
        this.text_title.text = StringUtil.format(GameConfig.SubLanguage.packbuy_02.Value, this._curData.name)
        //必得道具
        if (this._curData.surelyGift) {
            this._curData.surelyGift.forEach(async e => {
                let tag = ""
                if (!BagDefine.checkIsSpecialItem(e[0])) {
                    let bagData = ModuleService.getModule(BagModuleC).getItemsById(e[0])
                    tag = bagData && bagData.length > 0 ? LanUtil.getText("Code_003") : LanUtil.getText("Code_004");
                } else {
                    let list = await RouteDefine.getSpecialItemDataList(Player.localPlayer.userId)
                    let data = list.find(c => c.cfgId == e[0])
                    tag = data && data.count > 0 ? LanUtil.getText("Code_003") : LanUtil.getText("Code_004");
                }
                let item = UIService.create(GiftItem)
                item.setData(e[0], e[1], tag)
                this.canvas_giftList.addChild(item.uiObject);
            })
        }
        //概率道具
        if (this._curData.giftList) {
            for (let i = 0; i < this._curData.giftList.length; ++i) {
                let arr = this._curData.giftList[i]
                for (let j = 0; j < arr.length; ++j) {
                    let tag = ""
                    let itemData = GameConfig.Item.getElement(arr[j])
                    if (!BagDefine.checkIsSpecialItem(arr[j])) {
                        if (itemData.clazz == "RoomSkin") {
                            let has = await RouteDefine.checkHasSkin(Player.localPlayer.userId, Number(itemData.clazzParam[0]))
                            tag = has ? LanUtil.getText("Code_003") : "";
                        }
                    } else {
                        let list = await RouteDefine.getSpecialItemDataList(Player.localPlayer.userId)
                        let data = list.find(c => c.cfgId == arr[j])
                        if (itemData.clazz == "RoomSkin") {
                            tag = data && data.count > 0 ? LanUtil.getText("Code_003") : "";
                        }
                    }
                    let count = this._curData.giftNum[i][j]
                    let item = UIService.create(GiftItem)
                    item.setData(arr[j], count, tag)
                    this.canvas_giftList.addChild(item.uiObject);
                }
            }
        }
        //初始化背包剩余礼包数量

        if (BagDefine.checkIsSpecialItem(itemID)) {
            RouteDefine.getSpecialItemDataList(Player.localPlayer.userId).then(list => {
                let bagData = list.find(e => e.cfgId == itemID);
                this._hasCount = bagData ? bagData.count : 0
                this.pro_numberChange.sliderMaxValue = this._hasCount
                this._curNum = 1;
                this.setPercent()
            })
        } else {
            this._hasCount = ModuleService.getModule(BagModuleC).getAllItemCountByCfgId(itemID)
            this.pro_numberChange.sliderMaxValue = this._hasCount
            this._curNum = 1;
            this.setPercent()
        }
    }
}

export class GiftItem extends ItemGiftBagOpen_UI_Generate {

    private _data: IItemElement

    onStart() {
        this.btn_itempick.onClicked.add(() => {
            let position = CommonUtils.getViewPosition(this.rootCanvas, this.rootCanvas.position.clone());
            position.x += this.rootCanvas.size.x / 2
            UIService.show(UIItemDetail, this._data, position)
        })
    }

    setData(itemID: number, count: number, tag?: string) {
        this._data = GameConfig.Item.getElement(itemID);
        if (!this._data) return
        this.img_itemicon.imageGuid = this._data.icon;
        this.text_number.text = count.toString();
        this.text_Name.text = this._data.name;
        if (tag) {
            this.img_Tag.visibility = SlateVisibility.SelfHitTestInvisible
            this.text_Tag.text = tag
        }
        if (this._data.quality) {
            const qualityID = this._data.quality === 0 ? 1 : this._data.quality;
            this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(qualityID).imgGuid;
        }
    }
}