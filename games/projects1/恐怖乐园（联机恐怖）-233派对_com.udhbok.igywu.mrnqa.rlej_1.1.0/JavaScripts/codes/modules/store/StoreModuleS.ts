/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 10:12:55
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-06-17 16:16:41
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\store\StoreModuleS.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import ExGuideData from "../../guide/ExGuideData";
import { CommonUtils } from "../../utils/CommonUtils";
import { BagDefine } from "../bag/BagDefine";
import { BagModuleS } from "../bag/BagModuleS";
import MissionData from "../mission/MissionData";
import { RouteDefine } from "../route/RouteDefine";
import { RouteModuleS } from "../route/RouteModule";
import StoreModuleC from "./StoreModuleC";

export default class StoreModuleS extends ModuleS<StoreModuleC, null> {

    protected onStart(): void {

    }


    protected onUpdate(dt: number): void {

    }

    //=======================================rpc=========================================//

    /**
     * 
     * @param shopId 道具id
     * @param count 购买数量
     * @returns 
     */
    public async net_buyItem(shopId: number, count: number) {
        let player = this.currentPlayer
        let shopData = GameConfig.Shop.getElement(shopId)
        let discount = await RouteDefine.getDiscount(player.userId)
        let totalPrice = shopData.price * count * discount
        let money = await RouteDefine.getFearCoin(player.userId)
        //检查限购
        let limit = await RouteDefine.checkBuyLimit(player.userId, shopId);
        if (limit < 0) {
            return "buy_limit";
        } else if (limit > 0 && count > limit) {
            return "item_is_not_enough";
        }
        if (money < totalPrice) return "not_enough"
        let itemData = GameConfig.Item.getElement(shopData.itemID);
        if (!itemData) { return "config error" }
        RouteDefine.changeFearCoin(player.userId, -totalPrice);
        if (itemData.type == 50) {//购买的是图纸碎片
            Event.dispatchToLocal("evt_buyFragmentsAtShop", player.userId, count, true)//有循环引用 所以发事件
        } else {
            BagDefine.AddItem(player.playerId, shopData.itemID, "", null, count, false);
        }
        DataCenterS.getData(player, MissionData).updateBuyData(shopData.itemID, count);
        ModuleService.getModule(RouteModuleS).net_saveItemLimit(player.userId, shopId, count);//更新限购数据
        return shopData.itemID.toString()
    }

    /**
     * 白嫖
     * @param itemID 
     * @returns 
     */
    public async net_wantItem(itemID: number) {
        let player = this.currentPlayer
        let userId = player.userId;
        let times = await ModuleService.getModule(RouteModuleS).net_getWantTimes(userId)
        if (times <= 0) return null
        let data = GameConfig.Shop.getElement(itemID);
        if (!data.wantParams || data.wantParams.length == 0) return null;
        let newItemID = -1
        if (Math.random() <= data.wantParams[0]) { //获得物品
            newItemID = data.itemID
            if (BagDefine.checkIsSpecialItem(newItemID)) {
                RouteDefine.addSpecialItem(userId, newItemID, 1)
            } else {
                BagDefine.AddItem(player.playerId, newItemID)
            }
        } else {  //未获得道具给恐惧币
            RouteDefine.changeFearCoin(userId, MathUtil.randomInt(data.wantParams[1], data.wantParams[2]));
        }
        ModuleService.getModule(RouteModuleS).changeWantsTimes(userId, -1)
        return newItemID;
    }

    /**
     * 打开礼包
     * @param itemID 
     * @returns 
     */
    public async net_openGiftPack(itemID: number, count: number, state: boolean = true) {
        let player = this.currentPlayer
        //背包礼包数量是否足够
        if (BagDefine.checkIsSpecialItem(itemID)) {
            let data = await RouteDefine.getSpecialItemDataList(player.userId)
            let bagData = data.find(e => e.cfgId == itemID);
            if (!bagData || bagData.count < count) return null
        } else {
            let data = ModuleService.getModule(BagModuleS).getItemsById(player.playerId, itemID)
            if (!data || data.length == 0) return null
        }

        let data = GameConfig.Item.getElement(itemID);
        let result = new Map()
        let tempItems = []; let tempItemCount = [];
        //必得物品
        if (data.surelyGift) {
            for (let i = 0; i < count; ++i) {
                data.surelyGift.forEach(e => {
                    tempItems.push(e[0])
                    tempItemCount.push(e[1])
                })
            }
        }

        if (data.giftList && data.giftWeights && data.giftNum) {
            //开启多个礼包
            for (let i = 0; i < count; ++i) {
                let index = CommonUtils.weightRandom(data.giftWeights);
                if (data.giftList[index]) {
                    tempItems = tempItems.concat(data.giftList[index])
                    tempItemCount = tempItemCount.concat(data.giftNum[index])
                }
            }
        }
        //堆叠重复物品
        for (let i = 0; i < tempItems.length; ++i) {

            let count = result.get(tempItems[i])
            if (count) {
                result.set(tempItems[i], count + tempItemCount[i])
            } else {
                result.set(tempItems[i], tempItemCount[i])
            }
        }
        let finalItems: number[] = []; let finalCounts: number[] = []
        result.forEach((count, itemID) => {
            finalItems.push(itemID)
            finalCounts.push(count)
            ModuleService.getModule(BagModuleS).net_reqAddItem(player.playerId, itemID, "", null, count, false);
        })
        let guid = BagDefine.GetItemGuid(player.playerId, itemID)
        !state && ModuleService.getModule(BagModuleS).removeItem(player.playerId, guid, count)
        // }
        return [finalItems, finalCounts];
    }


    public net_getGuideMark() {
        let mark = DataCenterS.getData(this.currentPlayer, ExGuideData).completeTimeStamp
        return mark
    }
}