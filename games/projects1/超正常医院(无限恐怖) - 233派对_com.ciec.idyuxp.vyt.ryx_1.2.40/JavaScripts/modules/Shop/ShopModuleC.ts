import { GameConfig } from "../../config/GameConfig";
import { CoinType, EnumAnalytics, ShopFirstDo, ShopType, TabType } from "../../const/enum";
import UITools from "../../utils/UI/UITools";
import TSIAP from "./IAPInstance";
import { P_Shop } from "./UI/P_Shop";
import { ShopData } from "./ShopData";
import { ShopModuleS } from "./ShopModuleS";
import { P_ShopBuy } from "./UI/P_BuyDetails";
import { utils } from "../../utils/uitls";
import MessageBox from "../../utils/UI/MessageBox";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import { P_BuySuccess, P_BuySuccessDetails } from "./UI/P_BuySuccess";
import { GlobalData } from "../../const/GlobalData";
import { P_ScreeShow } from "./UI/P_ScreeShow";
import { ShareData } from "../Share/ShareModule";
import { TeamData } from "../Team/TeamData";

export class ShopModuleC extends ModuleC<ShopModuleS, ShopData> {

    private shopUI: P_Shop = null;
    private shopBuyUI: P_ShopBuy = null;
    private buySuccessUI: P_BuySuccessDetails = null;
    private anlytics: AnalyticsModuleC = null;
    private shareData: ShareData = null;
    private teamData: TeamData = null;

    protected onStart(): void {

        this.shopBuyUI = UIService.getUI(P_ShopBuy);
        this.buySuccessUI = UIService.getUI(P_BuySuccessDetails);
        this.shareData = DataCenterC.getData(ShareData);
        this.anlytics = ModuleService.getModule(AnalyticsModuleC);
        this.screenUI = UIService.getUI(P_ScreeShow);

        InputUtil.onKeyDown(mw.Keys.F9, () => {
            this.onWatchAD(ShopType.Hot, 3006);
        });
    }

    private bindEvent() {
        this.shopUI.onClickAC.add(this.onClickItem.bind(this));
        this.shopUI.onWatchADAC.add(this.onWatchAD.bind(this));
        this.shopUI.onBuySupplyAC.add(this.buySupply.bind(this));
        this.shopUI.onBuyVipAC.add(this.buyVip.bind(this));
        this.shopBuyUI.onBuyAC.add(this.onBuyItem.bind(this));
        this.teamData = DataCenterC.getData(TeamData);
        this.shareData.onGameCoinChange.add((value) => {
            this.shopUI.refreshBalance(CoinType.Abnormal, value);
        });
        this.teamData.onGameCoinChange.add((value) => {
            this.shopUI.refreshBalance(CoinType.BioCoin, value);
        })
        TSIAP.instance.onArkCoinChange.add((value) => {
            this.shopUI.refreshBalance(CoinType.Coin, value);
        });
    }

    net_SyncShopData() {
        this.shopUI = UIService.getUI(P_Shop);
        this.bindEvent();
        this.shopUI.init();
        this.shopUI.refreshBalance(CoinType.Abnormal, this.shareData.abCoin);
        this.shopUI.refreshBalance(CoinType.Coin, TSIAP.instance.arkCoin);
        this.shopUI.refreshBalance(CoinType.BioCoin, this.teamData.bioCoin);
    }
    /**
     * 显示商城
     * @param type 商城类型
     * @param tab 二级页签
     */
    public showShop(type: ShopType, tab?: TabType, tab2?: number) {
        if (!this.shopUI) return;
        this.shopUI.showShop(type, tab, tab2);
        if (type == ShopType.Hot) {
            this.anlytics.shopFirstDo(ShopFirstDo.hot_click);
        } else {
            this.anlytics.shopFirstDo(ShopFirstDo.present_click);
        }
    }


    /**点击商品 */
    private async onClickItem(type: ShopType, id: number) {
        let cfg = GameConfig.ShopItem.getElement(id);
        this.shopBuyUI.showShopBuyDetail(type, cfg);

    }

    /**补给按钮点击 */
    private async buySupply() {

        let info = this.data.supplyInfo;
        if (!info) {
            this.shopBuyUI.showSupplyDetail();
        } else {
            let isSuccess = await this.server.net_GetSupply();
            if (isSuccess > -1) {
                let cfgid = GlobalData.Shop.supplyGiftIds[isSuccess];
                this.buySuccessUI.showShopBuyDetail(true, GameConfig.ShopItem.getElement(cfgid))
            }
        }

    }

    /**购买VIP */
    private async buyVip() {
        if (!this.data.vipInfo) {

            let price = GameConfig.ShopItem.getElement(5001).price;
            let msg = utils.Format(GameConfig.Language.Shop_Tips_16.Value, price);
            MessageBox.showTwoBtnMessage(msg, (res) => {
                if (!res) return;
                this.onBuyItem(5001, 1);
                this.anlytics.shopFirstDo(ShopFirstDo.vip_buy_affrim)
            });
            return;
        }
        //领取奖励
        let res = await this.server.net_GetVip();
        if (res) {
            this.buySuccessUI.showShopBuyDetail(true, GameConfig.ShopItem.getElement(5001));
        }
    }

    /**点击购买
     * @description vip shopitem giftItem 首次补给 用
     */
    private async onBuyItem(cfgId: number, count: number) {
        console.warn(`lwj 购买 ${cfgId}  ${count} `);

        //判断是否达到限购次数
        if (!this.data.isCanBuy(cfgId, count)) {
            UITools.ShowSoftTips(GameConfig.Language.Shop_Tips_11.Value);
            return;
        }

        let cfg = GameConfig.ShopItem.getElement(cfgId);
        let price = cfg.price * count;

        if (cfg.ID == 3001) {
            //每周礼包 额外处理；
            console.warn(`lwj 每周礼包`);
            let isSuccess = this.server.net_buyWeeklyGift(3001);
            if (isSuccess) {
                this.buySuccessUI.showShopBuyDetail(false, cfg);
            } else {
                UITools.ShowSoftTips("领取失败,退出重试");
            }
            return
        }

        if (cfg.coinType == CoinType.Abnormal) {
            //异常币
            console.warn(`lwj 异常币 ${this.shareData.abCoin}  ${price}`);

            if (this.shareData.abCoin < price) {
                this.showRechargeTips();
                return;
            }
            if (cfgId == 5001) {
                //vip
                this.server.net_buyVip(price);
                return;
            }
            if (cfgId == 4001) {
                //补给
                this.server.net_buySupply(price);
                return;
            }

            let isSuccess = await this.server.net_buyItem(cfgId, count);
            if (!isSuccess) {
                this.showRechargeTips();
            } else {
                console.warn(`lwj 异常币购买成功  ${cfgId}`);
                this.buySuccessUI.showShopBuyDetail(false, cfg, count);
                UITools.ShowSoftTips(GameConfig.Language.Shop_Tips_3.Value);
            }

        } else if (cfg.coinType == CoinType.Coin) {
            //乐币
            console.warn(`lwj 乐币 ${price}`);
            if (SystemUtil.isPIE) {
                this.server.net_orderDelivered(cfg.commodityId, count);
                return;
            }

            if (TSIAP.instance.arkCoin < price) {
                let msg = (GameConfig.Language.Shop_Tips_8.Value);
                MessageBox.showTwoBtnMessage(msg, (res) => {
                    if (res) {
                        TSIAP.instance.reqBuyGoods(cfg.commodityId);
                        this.anlytics.shopFirstDoGlobal(EnumAnalytics.recharge_confirm_hit);
                    }
                });
                this.anlytics.shopFirstDoGlobal(EnumAnalytics.recharge_hit);
                return;
            }

            TSIAP.instance.reqBuyGoods(cfg.commodityId, count, () => {
                this.buySuccessUI.showShopBuyDetail(false, cfg);
            })
        } else {
            //代币
            console.warn(`lwj 代币币 ${this.teamData.bioCoin}  ${price}`);

            if (this.teamData.bioCoin < price) {
                MessageBox.showTwoBtnMessage("代币不足，请前往活动模式获得", () => { });
                return;
            }
            let isSuccess = await this.server.net_buyItemByCoin(cfgId, count);
            if (!isSuccess) {
                MessageBox.showTwoBtnMessage("代币不足，请前往活动模式获得", () => { });
            } else {
                console.warn(`lwj 代币购买成功  ${cfgId}`);
                this.buySuccessUI.showShopBuyDetail(false, cfg, count);
                UITools.ShowSoftTips(GameConfig.Language.Shop_Tips_3.Value);
            }

        }
    }

    /**提示充值异常币 */
    private showRechargeTips() {
        MessageBox.showTwoBtnMessage(GameConfig.Language.Tips_164.Value, (res) => {
            if (res) {
                this.showShop(ShopType.Shop, TabType.Recharge);
            }
        });
        this.anlytics.shopFirstDoGlobal(EnumAnalytics.recharge_hit);
    }

    /**领取广告奖励 */
    private async onWatchAD(type: ShopType, id: number) {
        let cfg = GameConfig.ShopItem.getElement(id);
        let isSuccess = await this.server.net_buyWeeklyGift(id);
        if (isSuccess) {
            this.buySuccessUI.showShopBuyDetail(true, cfg);
        } else {
            UITools.ShowSoftTips("领取失败,退出重试");
        }
    }

    public net_ResetVip() {
        MessageBox.showTwoBtnMessage(GameConfig.Language.Shop_Tips_19.Value, (res) => {
            if (res) {
                this.showShop(ShopType.Hot, TabType.Vip);
            }
        });
    }

    net_buySuccess(tab: TabType) {
        UIService.getUI(P_BuySuccess).showSuccess(tab);
    }


    public screenUI: P_ScreeShow = null;
    public setShowGiftInfo(isshow: boolean) {
        this.server.net_setShowGiftInfo(isshow);
    }

    public showScreenShop(configId: number) {
        let allItemId: number[] = [];
        let config = GameConfig.Screenshow.getElement(configId);
        GameConfig.Screenshow.getAllElement().forEach((item) => {
            item.isBuy.forEach((itemid) => {
                allItemId.push(parseInt(itemid));
            });
        });
        allItemId = Array.from(new Set(allItemId));
        let allBought: boolean = allItemId.every(id => this.data.isBought(id));
        if (allBought) return;
        this.screenUI.onClickScreenItem.add(this.onClickItem.bind(this));
        this.screenUI.showScreen(config);
    }


    /**广告信息 */
    public saveAdInfo(id: number, remain: number) {
        this.server.net_saveAdInfo(id, remain);
    }

    /**根据ChatID返回shopitemID*/
    public getShopItemIDByChatID(chatID: number): number {

        let cfg = GameConfig.Chat.getElement(chatID)
        if (cfg && cfg.UnlockType == 1) return 1;

        let cfgs = GameConfig.ShopItem.getAllElement();
        for (let index = 0; index < cfgs.length; index++) {
            const element = cfgs[index];
            if (element.DanceIds) {
                if (element.DanceIds.includes(chatID) && this.data.boughtIds.includes(element.ID)) {
                    return element.ID;
                }
            }
        }
        return null;
    }
}