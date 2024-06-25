import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { EnumAnalytics, ShopType, TabType } from "../../const/enum";
import MessageBox from "../../utils/UI/MessageBox";
import UITools from "../../utils/UI/UITools";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import { P_Bio } from "../GameHud/UI/P_BioActiviy";
import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import { ShareData } from "../Share/ShareModule";
import TSIAP from "../Shop/IAPInstance";
import { ShopModuleC } from "../Shop/ShopModuleC";
import TeamC from "../Team/TeamC";
import { TeamData } from "../Team/TeamData";
import BattlePassModuleData from "./BattlePassModuleData";
import BattlePassModuleS from "./BattlePassModuleS";
import P_BattlePass from "./P_BattlePass";
import P_BuyPass from "./P_BuyPass";
import PassUtils from "./PassUtils";


export default class BattlePassModuleC extends ModuleC<BattlePassModuleS, BattlePassModuleData> {

    /**通行证UI */
    public passUI: P_BattlePass;
    /**购买通行证UI */
    private buyUI: P_BuyPass;

    protected onStart(): void {

        this.buyUI = UIService.getUI(P_BuyPass);
        this.data.onDataChange.add(() => {
            this.refreshScore();
            this.refreshRewardItem();
        })

        this.passUI = UIService.getUI(P_BattlePass);
        this.passUI.init(this.data);
        // 显示战令
        UIService.getUI(P_Game_HUD).mBtn_PassCheck.onClicked.add(() => {
            this.passUI.show();
        });
        // 一键领取
        this.passUI.mBtn_GetAll.onClicked.add(this.receiveAll.bind(this));
        // 购买通行证
        this.passUI.mBtn_Buy.onClicked.add(() => {
            this.buyUI.show();
            ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.PassCheckBuy);
        });
        // 通行证购买方法
        this.buyUI.mBtn_Buy.onClicked.add(this.buyPass.bind(this));
        // 购买等级
        this.passUI.mButton_LevelBuy.onClicked.add(this.buyLevel.bind(this));
        this.addReceiveListener();
        this.addCoinChangeListener();
        // 跳转到通行证
        this.jumpToPass();
    }


    /**添加跳转到战令的按钮监听 */
    private jumpToPass() {
        // 优惠礼包界面跳转通行证
        let ui = UIService.getUI(P_Bio)
        ui.mBtn_PassCheck.onClicked.add(() => {
            this.passUI.show();
            ui.hide()
        })
    }


    /**添加货币改变监听 */
    private addCoinChangeListener() {
        // 活动代币变动监听
        DataCenterC.getData(TeamData).onGameCoinChange.add((coin) => {
            this.passUI.mText_Money3.text = coin.toString();
        })
        // 乐币变动监听
        TSIAP.instance.onArkCoinChange.add((coin) => {
            this.passUI.mText_Money1.text = coin.toString();
        })
        // 异常币变动监听
        DataCenterC.getData(ShareData).onGameCoinChange.add((coin) => {
            this.passUI.mText_Money2.text = coin.toString();
        });
        Character
        // 初始化战令显示货币
        this.passUI.mText_Money1.text = TSIAP.instance.arkCoin.toString();
        this.passUI.mText_Money2.text = DataCenterC.getData(ShareData).abCoin.toString();
        this.passUI.mText_Money3.text = DataCenterC.getData(TeamData).bioCoin.toString();
    }

    /**添加领取奖励监听 */
    private addReceiveListener() {
        this.passUI.itemList.forEach((levelItem) => {
            levelItem.freeItems.forEach((rewardItem) => {
                rewardItem.mbtn.onClicked.add(async () => {
                    let conf = rewardItem.conf;
                    let isSuccess = await this.server.net_ReceiveOnePassReward(levelItem.conf.ShowLevel, false);
                    if (isSuccess) {
                        UITools.ShowSoftTips(`领取${conf.RewardName}x${conf.Count}成功`);
                        ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.PassCheckBonus_Get_ + levelItem.conf.ShowLevel);
                    }
                    else UITools.ShowSoftTips(`领取失败，已经领取过了`);
                })
            });
            levelItem.collectionItems.forEach((rewardItem) => {
                rewardItem.mbtn.onClicked.add(async () => {
                    let conf = rewardItem.conf;
                    let isSuccess = await this.server.net_ReceiveOnePassReward(levelItem.conf.ShowLevel, true);
                    if (isSuccess) {
                        UITools.ShowSoftTips(`领取${conf.RewardName}x${conf.Count}成功`);
                    }
                    else UITools.ShowSoftTips(`领取失败，已经领取过了`);
                })
            });
        })
    }

    /**添加积分 */
    public addScore(score: number) {
        this.server.net_addScore(score);
    }

    /**一键领取 */
    private async receiveAll() {
        let successIds = await this.server.net_ReceiveAllPassReward();
        successIds.forEach((id) => {
            let conf = GameConfig.GamePassRewarid.getElement(id);
            UITools.ShowSoftTips(`领取${conf.RewardName}x${conf.Count}成功`);
            ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.PassCheckBonus_Get_ + id.toString());
        });
    }

    /**购买通行证 */
    private buyPass() {
        MessageBox.showTwoBtnMessage(`是否花${GlobalData.BattlePass.passCost}异常币购买通行证？`, async (res) => {
            if (!res) return;
            ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.PassCheckBuyAffrim);
            let isSuccess = await this.server.net_buyPass();
            if (isSuccess) {
                UITools.ShowSoftTips(`购买通行证成功`);
                ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.PasscheckBuySuccess);
                this.buyUI.mBtn_Buy.enable = false;
                this.buyUI.hide();
                this.passUI.mBtn_Buy.visibility = SlateVisibility.Collapsed;
                this.passUI.mImg_Lock.visibility = SlateVisibility.Collapsed;
                this.passUI.mImg_Mask.visibility = SlateVisibility.Collapsed;
            } else {
                MessageBox.showTwoBtnMessage(`异常币不足，是否前往商城购买？`, (res) => {
                    if (res) ModuleService.getModule(ShopModuleC).showShop(ShopType.Shop, TabType.Recharge);
                });
            }
        })
    }

    /**购买等级 */
    private async buyLevel() {
        MessageBox.showTwoBtnMessage(`是否花${GlobalData.BattlePass.levelCost}异常币购买${GlobalData.BattlePass.expPerLevel}经验值？`, async (res) => {
            if (!res) return;
            let isSuccess = await this.server.net_buyLevel();
            if (isSuccess) {
                UITools.ShowSoftTips(`购买等级成功！`);
            } else {
                UITools.ShowSoftTips(`购买等级失败 异常币不足`);
            }
        });
    }

    /**刷新积分和战令等级 */
    private refreshScore() {
        this.passUI.setCurLevelByScore(this.data.score);
        // 如果满级则隐藏购买等级按钮
        let curLevel = PassUtils.getCurLevel(this.data.score);
        if (curLevel >= GlobalData.BattlePass.maxLevel) {
            this.passUI.mCanvas_LevelBuy.visibility = SlateVisibility.Collapsed;
        }
    }

    /**刷新战令奖品 */
    private refreshRewardItem() {
        this.passUI.refreshReward(this.data);
    }


}