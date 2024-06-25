

import { GameConfig } from "../../../config/GameConfig";
import { IhappyCoinElement } from "../../../config/happyCoin";
import GameStart from "../../GameStart";
import { BagDefine } from "../bag/BagDefine";
import { RouteDefine } from "../route/RouteDefine";
import { RouteModuleS } from "../route/RouteModule";
import StoreModuleS from "../store/StoreModuleS";
import { IAPData } from "./IAPData";
import IAPModuleC from "./IAPModuleC";

const commitMap: Map<string, (playerId: number, orderId: string, amount: number) => boolean> = new Map();

/**
 * 注册一个商品的回调,同一个商品不能重复注册。Only 服务器
 * @param cfg 配置id
 * @param func 回调的方法
 * @returns 注册是否成功
 */
export function registerCommodity(cfg: IhappyCoinElement, func: (playerId: number, orderId: string, amount: number) => boolean) {
    /** innner */
    if (commitMap.has(cfg.clazz)) {
        console.error("重复注册了" + cfg.id + "同一个商品只能注册一个回调");
        return false;
    }
    commitMap.set(cfg.clazz, func);
    /** aborad */
    if (commitMap.has(cfg.outClazz)) {
        console.error("重复注册了" + cfg.id + "同一个商品只能注册一个回调");
        return false;
    }
    commitMap.set(cfg.outClazz, func);
    return true;
}


export default class IAPModuleS extends ModuleS<IAPModuleC, IAPData> {
    protected onAwake(): void {
        const onShipOrder = async (playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean) => void) => {
            console.log("IAAHelper=====>>>>", playerId, orderId, commodityId, amount);
            let player = Player.getPlayer(playerId)
            if (!player) {
                confirmOrder(true);
                return
            }
            let result = false;
            let data = GameConfig.happyCoin.getAllElement().find(e => { return e.clazz == commodityId || e.outClazz == commodityId });
            if (!data) {
                confirmOrder(true);
                return
            }
            let cfgId = data.id
            const commit = commitMap.get(commodityId);
            if (commit) {
                confirmOrder(commit(playerId, orderId, amount));
                this.getClient(playerId).net_onPurchaseCall(cfgId, result)
                return;
            }

            let res = await this.doPurchaseFunction(playerId, cfgId, amount)
            confirmOrder(res);
            this.getClient(playerId).net_onPurchaseCall(cfgId, res)
        }
        mw.PurchaseService.onOrderDelivered.add(onShipOrder)
    }

    private async doPurchaseFunction(playerId: number, cfgId: number, amount: number) {
        let result = false;
        switch (cfgId) {
            case 101://周礼包
            case 102://月礼包
                result = await this.buyLimitPack(cfgId, playerId, amount)
                break;
            case 22://特权卡
                result = await this.buyPrivilegeCard(playerId, amount)
                break;
            //恐惧币充值
            case 1000:
            case 1001:
            case 1002:
            case 1003:
            case 1004:
            case 1005:
            case 1006:
                result = await this.fearCoin(cfgId, playerId)
                break;
            case 2000://月卡
                result = await this.monthlyCard(playerId)
                break;
            case 2001://季卡
                result = await this.seasonalCard(playerId)
                break;
            default://武器强化
                result = true;
        }
        return result
    }

    public async net_testBuySomething(coinCfgId: number, amount: number) {
        let playerId = this.currentPlayerId
        let res = await this.doPurchaseFunction(playerId, coinCfgId, amount)
        this.getClient(playerId).net_onPurchaseCall(coinCfgId, res)
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        //进游戏检查一下领奖是不是可以刷新了
        ModuleService.getModule(RouteModuleS).net_reqRouteHallData(player.userId).then(routeData => {
            let nowTime = new Date(Date.now()).toLocaleDateString()
            let timeStr1 = new Date(routeData.vip.monthlyStamp).toLocaleDateString()
            let timeStr2 = new Date(routeData.vip.seasonalStamp).toLocaleDateString()
            if (nowTime != timeStr1) ModuleService.getModule(RouteModuleS).refreshRewardState(player.userId, 1)
            if (nowTime != timeStr2) ModuleService.getModule(RouteModuleS).refreshRewardState(player.userId, 2)
        })
    }

    /**
    * 购买月卡
    * @param playerId 
    */
    private async monthlyCard(playerId: number) {
        let player = Player.getPlayer(playerId)
        if (!player) return false
        let result = await ModuleService.getModule(RouteModuleS).saveMonthlyCard(player.userId)
        RouteDefine.changeFearCoin(player.userId, GameConfig.SubGlobal.MonthlyCard.array1d[2])
        return result
    }

    /**
     * 购买季卡
     * @param playerId 
     */
    private async seasonalCard(playerId: number) {
        let player = Player.getPlayer(playerId)
        if (!player) return false
        let result = await ModuleService.getModule(RouteModuleS).saveSeasonalCard(player.userId)
        RouteDefine.changeFearCoin(player.userId, GameConfig.SubGlobal.SeasonalCard.array1d[2])
        return result
    }

    /**
     * 购买恐惧币
     * @param playerId 
     * @param commodityId 
     * @returns 
     */
    private async fearCoin(cfgId: number, playerId: number) {
        let player = Player.getPlayer(playerId)
        let data = GameConfig.happyCoin.getElement(cfgId)
        if (!player || !data) return false;
        let itemData = GameConfig.Item.getElement(data.itemID)
        let totalVal = Number(itemData.clazzParam[1])
        let dataHelper = this.getPlayerData(player)
        if (dataHelper.isPurchased(cfgId)) {
            totalVal += Number(itemData.clazzParam[3])
        } else {
            totalVal += Number(itemData.clazzParam[2])
        }
        dataHelper.recordingPurchaseId(cfgId);
        let result = await RouteDefine.changeFearCoin(player.userId, totalVal)
        result && this.getClient(playerId).net_rechargeSuccess()
        return result
    }

    private async buyLimitPack(cfgId: number, playerId: number, amount: number) {
        let player = Player.getPlayer(playerId)
        let data = GameConfig.happyCoin.getElement(cfgId)
        if (!player || !data) return false
        let itemData = GameConfig.Item.getElement(data.itemID)
        ModuleService.getModule(RouteModuleS).net_saveItemLimit(player.userId, cfgId, amount);//更新限购数据
        BagDefine.AddItem(playerId, itemData.id, null, null, amount)
        return true
    }

    private async buyPrivilegeCard(playerId: number, amount: number) {
        let result = await BagDefine.AddItem(playerId, 10100, null, null, amount)
        return result
    }

}