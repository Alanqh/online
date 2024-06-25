/*
 * @Author       : dal
 * @Date         : 2024-04-21 15:59:08
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-22 17:31:12
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\ui\ItemLackTipsPanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import LoM_UI_Generate from "../../../../ui-generate/ShareUI/weaponupgrade/LoM_UI_generate";
import LoMItem_UI_Generate from "../../../../ui-generate/ShareUI/weaponupgrade/LoMItem_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";
import { GridContainer } from "../../../utils/UIPool";
import { RouteDefine } from "../../route/RouteDefine";
import { NeedsInfo } from "./WeaponUpgradePanel";

const goldColor = "#D99E63FF";

export default class ItemLackTipsPanel extends LoM_UI_Generate {

    private container1: GridContainer<Item>;
    private container2: GridContainer<Item>;

    protected onStart() {
        this.container1 = new GridContainer(this.mCanvas_ChangeBefore, Item);
        this.container2 = new GridContainer(this.mCanvas_ChangeAfter, Item);

        this.btn_ExchangeNo.onClicked.add(() => {
            UIService.hideUI(this);
        });

        this.btn_ExchangeYes.onClicked.add(async () => {
            if (await RouteDefine.changeFearCoin(Player.localPlayer.userId, -this.totalCost) && await RouteDefine.removeSpecialItems(Player.localPlayer.userId, [this.needsInfo.itemId1, this.needsInfo.itemId2], [Math.min(this.needsInfo.count1, this.needsInfo.leftCount1), Math.min(this.needsInfo.count2, this.needsInfo.leftCount2)])) {
                if (this.yesCall) {
                    this.yesCall();
                    this.yesCall = null;
                }
            }
            UIService.hideUI(this);
        });
    }

    private yesCall: Function;

    private totalCost: number = 0;

    private needsInfo: NeedsInfo;

    protected onShow(needsInfo: NeedsInfo, yesCall: Function) {
        if (!needsInfo) { UIService.hideUI(this); return; }
        this.needsInfo = needsInfo;
        this.container1.clear();
        this.container2.clear();
        this.yesCall = yesCall;
        let str = `是否花费{0}<color=${goldColor}>恐惧币</color>，代替缺少的{1}个<color=${goldColor}>{2}</color>`;
        let cost = 0;
        let itemCfg1 = this.getItemCfg(needsInfo.itemId1);
        let itemCfg2 = this.getItemCfg(needsInfo.itemId2);
        if (!needsInfo.isEnough1) {
            cost += this.getShopCfg(this.needsInfo.shopId1).price * needsInfo.needCount1;
            this.container2.addNode().setData(itemCfg1.name, itemCfg1.icon, needsInfo.needCount1);
            if (!needsInfo.isEnough2) {
                cost += this.getShopCfg(this.needsInfo.shopId2).price * needsInfo.needCount2;
                str += `和{3}个<color=${goldColor}>{4}</color>`;
                str = StringUtil.format(str, cost, needsInfo.needCount1, itemCfg1.name, needsInfo.needCount2, itemCfg2.name)
                this.container2.addNode().setData(itemCfg2.name, itemCfg2.icon, needsInfo.needCount2);
            } else {
                str = StringUtil.format(str, cost, needsInfo.needCount1, itemCfg1.name);
            }
        } else {
            cost += this.getShopCfg(this.needsInfo.shopId2).price * needsInfo.needCount2;
            str = StringUtil.format(str, cost, needsInfo.needCount2, itemCfg2.name);
            this.container2.addNode().setData(itemCfg2.name, itemCfg2.icon, needsInfo.needCount2);
        }
        this.container1.addNode().setData(LanUtil.getText("money_01"), GameConfig.SubGlobal.fearCoinIcon.string, cost);
        this.text_LoMDetail.text = "当前所需材料不足，" + str;
        this.totalCost = cost;
    }

    private getItemCfg(id: number) {
        return GameConfig.Item.getElement(id);
    }

    private getShopCfg(id: number) {
        return GameConfig.Shop.getElement(id);
    }
}

class Item extends LoMItem_UI_Generate {

    setData(name: string, icon: string, count: number) {
        this.nameTxt.text = name;
        this.mImg_Item.imageGuid = icon;
        this.mText_LoMItemNum.text = count + "";
    }
}

