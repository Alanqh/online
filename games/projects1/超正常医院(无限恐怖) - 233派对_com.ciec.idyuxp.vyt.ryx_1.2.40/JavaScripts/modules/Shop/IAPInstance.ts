import { GameConfig } from "../../config/GameConfig";
import UITools from "../../utils/UI/UITools";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";


export default class TSIAP {
    /**功能是否开放 */
    public enable: boolean = false;
    /**乐币数量 */
    private _arkCoin: number = 0;
    /**乐币数量 */
    public get arkCoin(): number {
        return this._arkCoin;
    }
    /**埋点用 */
    private initCoin: boolean = false;
    /**乐币数量监听回调 */
    public readonly onArkCoinChange: Action1<number> = new Action1();
    /**服务端购买商品成功的回调 playerId ，商品ID ，数量 */
    public readonly onBuyGoodsSuccess: Action3<number, string, number> = new Action3();


    private static _instace: TSIAP = null;

    public static get instance(): TSIAP {
        if (!this._instace) {
            this._instace = new TSIAP();
        }
        return this._instace;
    }

    public init() {
        if (SystemUtil.isClient()) {
            mw.MessageChannelService.registerAction("bridge.action.feature.support.result", this, (dataStr) => {
                try {
                    const resp = JSON.parse(dataStr).data;
                    if (resp.feature == "isIAPEnable") {
                        this.enable = resp.isSupport
                    }
                } catch (err) {
                }
            });
            this.reqIAP();
            if (this.enable) {

            }
            PurchaseService.onArkBalanceUpdated.add((amount: number) => {
                if (amount > this.arkCoin && this.initCoin) {
                    //乐币增加
                    ModuleService.getModule(AnalyticsModuleC).recharge_return_hit();
                }
                this._arkCoin = amount;
                this.initCoin = true;
                this.onArkCoinChange.call(amount);
            });
            this.reqRefreshCoin();

        } else {
            PurchaseService.onOrderDelivered.add((playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean) => void) => {
                if (!Player.getPlayer(playerId)) {
                    console.error("ShopModuleS onOrderDelivered player not found:", playerId);
                    confirmOrder(false);
                    return;
                }
                this.onBuyGoodsSuccess.call(playerId, commodityId, amount);
                confirmOrder(true);
            })
        }
    }

    /**测试货币的时候使用，设置乐币数量 */
    public setArkCoin(coin: number) {
        this._arkCoin = coin;
        this.onArkCoinChange.call(coin);
    }



    private reqIAP() {
        const Data = {
            "action": "ue.action.feature.support",
            "messageId": 0,
            "callbackType": "Call",
            "data": {
                "feature": "isIAPEnable"
            }
        };
        const DataStr = JSON.stringify(Data);
        mw.MessageChannelService.sendTo(mw.MessageChannelReceiver.Client, DataStr);
    }
    /**
     * 客户端发起购买
     * @param commodityId 商品Code
     * @param count 数量
     * @returns 
     */
    public reqBuyGoods(commodityId: string, count: number = 1, onBuySuccessAction?: Function, _onBuyFailAction?: Function) {
        if (!this.enable) {
            UITools.ShowSoftTips("功能未开放,请升级到最新版本!");
            return;
        }
        return new Promise((result: (success: boolean) => void) => {
            console.log("发起购买的code", commodityId)
            PurchaseService.placeOrder(commodityId, count, (status: number, msg: string) => {
                console.log(`IAP_BuyCallback__,status:${status},msg:${msg},id:${commodityId}`);
                PurchaseService.getArkBalance();
                if (status == 200) {
                    onBuySuccessAction && onBuySuccessAction();
                    result(true);
                    UITools.ShowSoftTips(GameConfig.Language.Shop_Tips_3.Value)
                } else {
                    _onBuyFailAction && _onBuyFailAction();
                    result(false);
                    // UITools.ShowSoftTips(`订单支付失败`)
                }
            })
        });
    }
    /**
     * 乐币是否足够
     * @param cost 花费金额
     * @returns 
     */
    public isArkCoinEnough(cost: number) {
        return this._arkCoin >= cost;
    }
    /**
     * 客户端发起刷新乐币
     */
    public reqRefreshCoin() {
        PurchaseService.getArkBalance();
    }
}