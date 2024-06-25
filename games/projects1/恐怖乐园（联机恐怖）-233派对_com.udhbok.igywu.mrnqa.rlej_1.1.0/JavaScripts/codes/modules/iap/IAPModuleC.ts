/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-25 18:49:29
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-27 16:07:58
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\iap\IAPModuleC.ts
 * @Description  : 
 */
import { AddGMCommand } from "module_gm";
import UIShop from "../store/ui/UIShop";
import IAPModuleS from "./IAPModuleS"
import { RouteModuleS } from "../route/RouteModule";
import Tips from "../../utils/Tips";
import { TSIAPService } from "./IAPInstance";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { GameConfig } from "../../../config/GameConfig";
import { UIGainItem } from "../store/ui/UIGaintem";
import { LanUtil } from "../../utils/LanUtil";
import GameStart from "../../GameStart";
import { IAPData } from "./IAPData";
import { RealNameConditionType, RealNameTool } from "../../ui/realName/RealNameUI";

AddGMCommand("月卡", () => { }, (player: mw.Player, params) => {
    ModuleService.getModule(RouteModuleS).saveMonthlyCard(player.userId)
})
AddGMCommand("季卡", () => { }, (player: mw.Player, params) => {
    ModuleService.getModule(RouteModuleS).saveSeasonalCard(player.userId)
})

export default class IAPModuleC extends ModuleC<IAPModuleS, IAPData> {
    static onPurchaseAction: Action = new Action()
    protected onAwake(): void {
        const onArkUpdate = (amount: number) => {
            UIService.getUI(UIShop).updateHappyCoin(amount);
        }
        mw.PurchaseService.onArkBalanceUpdated.add(onArkUpdate)
    }

    /**购买商品 */
    placeOrder(coinCfgId: number, amount: number, shopId?: number) {
        const res = RealNameTool.instance.checkRealName(RealNameConditionType.IAP);
        if (!res) {
            return;
        }
        // this.server.net_testBuySomething(coinCfgId, amount);
        // return

        if (!TSIAPService.enable) {
            GhostTraceHelper.uploadMGS("ts_action_buy_reborn", "玩家购买乐币物品，233apk把那本不对时上发", { play_time: 1 });
            Tips.show(LanUtil.getText("Code_056"));
            return;
        }
        let coinCfg = GameConfig.happyCoin.getElement(coinCfgId)
        if (!coinCfg) {
            Tips.show(`乐币表中找不到该配置${coinCfgId}`)
            return
        }

        if (SystemUtil.isPIE) {
            // Tips.show("PIE上不支持付费！！！")
            return
        }

        let commodityId = GameStart.isGPark ? coinCfg.outClazz : coinCfg.clazz
        mw.PurchaseService.placeOrder(commodityId, amount, (status: number, msg: string) => {
            mw.PurchaseService.getArkBalance()
            if (status == 200) {
                let key = GameStart.isGPark ? "outClazz" : "clazz"
                let data = GameConfig.happyCoin.getElement(key);
                if (data.itemID) {
                    let itemData = GameConfig.Item.getElement(data.itemID)
                    itemData && UIService.show(UIGainItem, itemData, 1)
                }
                GhostTraceHelper.uploadMGS("ts_action_buy_item", "购买物品上发", { box_id: amount, item_id: data.itemID, model_id: shopId })
            }
        })
    }

    net_onPurchaseCall(cfgId: number, result: boolean) {
        if (!result) { Tips.show(LanUtil.getText("Code_060")); return }
        switch (cfgId) {
            case 101://周礼包
                Tips.show(LanUtil.getText("Code_059") + LanUtil.getText("Code_061"))
                break;
            case 102://月礼包
                // Tips.show(LanUtil.getText("Code_058") + LanUtil.getText("Code_061"))
                Tips.show(LanUtil.getText("Code_061"))
                break;
            case 22://特权卡
                break;
            //恐惧币充值
            case 1000:
            case 1001:
            case 1002:
            case 1003:
            case 1004:
            case 1005:
            case 1006:
                break;
            case 2000://月卡
                UIService.getUI(UIShop).addCoinAni()
                Event.dispatchToLocal("evt_triggerRedDot")
                Tips.show(LanUtil.getText("Code_057") + LanUtil.getText("Code_061"))
                break;
            case 2001://季卡
                UIService.getUI(UIShop).addCoinAni()
                Event.dispatchToLocal("evt_triggerRedDot")
                Tips.show(LanUtil.getText("Code_058") + LanUtil.getText("Code_061"))
                break;
            default://武器强化
        }
        IAPModuleC.onPurchaseAction.call(cfgId, result)
    }

    net_rechargeSuccess() {
        UIService.getUI(UIShop).addCoinAni()
    }
}