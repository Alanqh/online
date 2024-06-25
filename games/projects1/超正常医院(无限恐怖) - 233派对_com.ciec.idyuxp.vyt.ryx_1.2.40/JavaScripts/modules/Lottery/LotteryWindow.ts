
import { GameConfig } from "../../config/GameConfig";
import { ILotteryElement } from "../../config/Lottery";
import { GlobalData } from "../../const/GlobalData";
import { LotteryRewardCountType, PropQualityType, ShopType, TabType } from "../../const/enum";
import PlayerAssetModuleData from "../PlayerAsset/PlayerAssetMData";
import LotteryRewardPreview_generate from "../../ui-generate/Lottery/LotteryRewardPreview_generate";
import LotteryWindow_generate from "../../ui-generate/Lottery/LotteryWindow_generate";
import UITools from "../../utils/UI/UITools";
import { UIPool } from "../../utils/UIPool";
import { utils } from "../../utils/uitls";
import { EnumLotteryType, LotteryEtcConfig, LotteryModuleC, LotteryModuleData, LotteryUtil } from "./LotteryModule";
import { LotteryTransition } from "./LotteryTransition";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import MessageBox from "../../utils/UI/MessageBox";
import { RedDotModuleC } from "module_reddot";
import { ShopModuleC } from "../Shop/ShopModuleC";
import { ShopData } from "../Shop/ShopData";


const redDotName_Lottery: string = "RedDot_Lottery"

export class LotteryWindow extends LotteryWindow_generate {
    private md: LotteryModuleC
    private lotteryData: LotteryModuleData
    private redModuleC: RedDotModuleC;

    public onClickGetRewardByCountAC: Action1<number> = new Action1();

    private previewPool: UIPool<PreviewItem> = new UIPool(() => {
        let item = UIService.create(PreviewItem)
        this.con_reward_preview_items.addChild(item.uiObject)
        return item
    })

    private _selectedLotteryType: EnumLotteryType = EnumLotteryType.normal
    private set selectedLotteryType(value: EnumLotteryType) {
        this._selectedLotteryType = value
        this.refreshSelectedType()
    }
    private get selectedLotteryType(): EnumLotteryType {
        return this._selectedLotteryType
    }

    protected onStart(): void {
        this.layer = UILayerTop
        this.md = ModuleService.getModule(LotteryModuleC)
        this.lotteryData = DataCenterC.getData(LotteryModuleData)
        this.redModuleC = ModuleService.getModule(RedDotModuleC);

        this.btn_close.onClicked.add(() => {
            UIService.hideUI(this)
        })

        this.btn_normal.onClicked.add(() => {
            this.selectedLotteryType = EnumLotteryType.normal
        })

        this.btn_quest3.onClicked.add(() => {
            this.md.buyLotteryCoin()
        })
        this.mBtn_20Times.onClicked.add(() => {
            this.onClickGetRewardByCountAC.call(LotteryRewardCountType.RewardCount_20);
        })
        this.mBtn_40Times.onClicked.add(() => {
            this.onClickGetRewardByCountAC.call(LotteryRewardCountType.RewardCount_40);
        })
        this.mBtn_60Times.onClicked.add(() => {
            this.onClickGetRewardByCountAC.call(LotteryRewardCountType.RewardCount_60);
        })
        this.mBtn_100Times.onClicked.add(() => {
            this.onClickGetRewardByCountAC.call(LotteryRewardCountType.RewardCount_100);
        })
        this.mBtn_Open.onClicked.add(() => {
            this.canvas_Gifts.visibility = this.canvas_Gifts.visible ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        })
        this.mBtn_Get.onClicked.add(() => {
            ModuleService.getModule(ShopModuleC).showShop(ShopType.Hot, TabType.Gift);
            this.canvas_Gifts.visibility = SlateVisibility.Collapsed
            UIService.hideUI(this)
        })
        this.redModuleC.addRedDotPath(redDotName_Lottery, this.mBtn_Open);

        // 抽奖按钮
        this.btn_premium1.onClicked.add(() => { this.lottery(1) })
        this.btn_premium10.onClicked.add(() => { this.lottery(10) })

        this.btn_quest1.onClicked.add(this.receiveDailyReward.bind(this))
        this.btn_quest2.onClicked.add(this.receiveAdsReward.bind(this))

        this.btn_preview2.onClicked.add(() => {
            let vis = this.con_reward_preview.visibility == SlateVisibility.SelfHitTestInvisible ? SlateVisibility.Hidden : SlateVisibility.SelfHitTestInvisible
            this.con_reward_preview.visibility = vis
            if (vis == SlateVisibility.SelfHitTestInvisible) {
                //TODO:埋点？
            }
        })
        let data = DataCenterC.getData(ShopData);
        data.onSuccessBuyAC.add(this.refreshRedDot.bind(this));
        this.refreshRedDot();
        this.refreshLotteryCount();
        this.canvas_Gifts.visibility = SlateVisibility.Collapsed
        this.selectedLotteryType = EnumLotteryType.normal
    }

    protected onShow(...params: any[]): void {
        this.con_reward_preview.visibility = SlateVisibility.Hidden
        this.canvas_Gifts.visibility = SlateVisibility.Collapsed

        GlobalData.Lottery.lotteryCoinRefresh.add(this.refreshSelectedType, this)
        this.lotteryData.onDataChange.add(this.refreshDailyReward, this)
        this.refreshSelectedType()
        this.refreshDailyReward()
    }

    protected onHide(): void {
        GlobalData.Lottery.lotteryCoinRefresh.remove(this.refreshSelectedType, this)
        this.lotteryData.onDataChange.remove(this.refreshDailyReward, this)
    }

    private receiveDailyReward() {
        let received = this.lotteryData.dailyRewardReceivedDayInYear >= utils.getTodayOfYear()
        if (received) {
            UITools.ShowSoftTips('今日已领取过奖励, 明天再来吧~')
            return
        }

        this.md.request_receive_daily_reward()
        //TODO:埋点，每日奖励？
        AnalyticsTool.ts_action_firstdo("FreeLottery_Click", 0);
    }

    private receiveAdsReward() {
        this.md.request_receive_ad_reward()
        //TODO:埋点，广告奖励？
    }

    private refreshDailyReward() {
        let received = this.lotteryData.dailyRewardReceivedDayInYear >= utils.getTodayOfYear()
        this.txt_prices1.text = received ? '已领取' : "领取"

        let adTodayReceived = this.lotteryData.adRewardReceivedDayInYear == utils.getTodayOfYear()
        if (adTodayReceived) {
            this.txt_prices2.text = `${this.lotteryData.adRewardReceivedCount} / 3`
        } else {
            this.txt_prices2.text = `0 / 3`
        }
    }

    private lottery(count: number) {
        // 判断抽奖币够不够
        let propInfo = DataCenterC.getData(PlayerAssetModuleData).getProp(LotteryUtil.getConfigByType(this.selectedLotteryType).needItemID)

        if (!propInfo || propInfo.count < count) {
            let subCount = count - (propInfo ? propInfo.count : 0);
            MessageBox.showTwoBtnMessage(`抽奖券不足，是否购买${subCount}个抽奖券`, (res) => {
                if (!res) return;
                this.md.buyLotteryCoin(subCount);
            })
            return
        }
        //先算奖励，再走表现
        this.md.request_lottery(this.selectedLotteryType, count)
    }

    public showLottery(quality: PropQualityType) {
        // 关闭此界面
        UIService.hideUI(this)
        // 播放动效
        LotteryTransition.play(quality, () => {
            this.md.playerGetReward();
        })
        // this.md.playerGetReward();
    }

    refreshSelectedType() {

        let selectedNormal = this.selectedLotteryType == EnumLotteryType.normal
        this.img_selected_normal.visibility = selectedNormal ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Hidden
        this.img_selected_special.visibility = selectedNormal ? SlateVisibility.Hidden : SlateVisibility.SelfHitTestInvisible

        this.canvas_normal.visibility = selectedNormal ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Hidden
        this.canvas_premium.visibility = selectedNormal ? SlateVisibility.Hidden : SlateVisibility.SelfHitTestInvisible

        // let needItemCfg = GameConfig.Item.getElement(this.selectedLotteryConfig.needItemID)
        // this.img_icon2.imageGuid = needItemCfg.Icon
        let propInfo = DataCenterC.getData(PlayerAssetModuleData).getProp(1025)

        this.txt_times_premium.text = `${propInfo ? propInfo.count : 0}次`

        this.previewPool.resetAll()
        for (const cfg of GameConfig.Lottery.getAllElement()) {
            if (cfg.Type != this.selectedLotteryType) continue
            if (!cfg.ShowInPreveiew) continue
            let item = this.previewPool.get()
            item.setInfo(cfg, cfg.RewardID, cfg.RewardCount)
        }

    }

    public refreshLotteryCount() {
        let data = DataCenterC.getData(LotteryModuleData);
        if (!data) return;
        this.mTxt_GachaTimes.text = `当前祈愿次数：${data.lotteryCount ? data.lotteryCount : 0}次`
    }

    public refreshGetRewardBtn() {
        let data = DataCenterC.getData(LotteryModuleData);
        if (!data) return;
        let arr = data.LotteryGetReward;
        this.mBtn_20Times.enable = !arr.includes(LotteryRewardCountType.RewardCount_20);
        this.mBtn_40Times.enable = !arr.includes(LotteryRewardCountType.RewardCount_40);
        this.mBtn_60Times.enable = !arr.includes(LotteryRewardCountType.RewardCount_60);
        this.mBtn_100Times.enable = !arr.includes(LotteryRewardCountType.RewardCount_100);
    }

    private refreshRedDot() {
        let data = DataCenterC.getData(ShopData);
        if (!data) return;
        let isShow: boolean = false;
        let prop_1 = data.boughtProps.find(info => { return info.id == 3009 });
        let prop_2 = data.boughtProps.find(info => { return info.id == 3010 });
        if (!prop_1) {
            isShow = true
        } else {
            let cfg_1 = GameConfig.ShopItem.getElement(prop_1.id);
            if (cfg_1.limitCount > prop_1.count) {
                isShow = true
            }
        }
        if (!prop_2) {
            isShow = true
        } else {
            let cfg_2 = GameConfig.ShopItem.getElement(prop_2.id);
            if (cfg_2.limitCount > prop_2.count) {
                isShow = true
            }
        }
        if (isShow) {
            this.redModuleC.triggerRedDotEvent(redDotName_Lottery)
        } else {
            this.redModuleC.hideRedDotEvent(redDotName_Lottery)
            this.mCanvas_Goods.visibility = SlateVisibility.Collapsed;
        }
    }
}

class PreviewItem extends LotteryRewardPreview_generate {
    setInfo(cfg: ILotteryElement, rewardID: number, rewardCount: number) {
        if (cfg.RewardType == 1 || cfg.RewardType == 3) {
            let itemCfg = GameConfig.Item.getElement(rewardID)
            this.img_icon.imageGuid = itemCfg.Icon
            this.txt_count.text = rewardCount == 1 ? '' : rewardCount.toString()
            this.txt_name.text = itemCfg.Name
            this.txt_chance.text = `${(cfg.ShowProbability * 100).toFixed(0)}%`
        } else if (cfg.RewardType == 2) {
            let clothCfg = GameConfig.Dress.getElement(rewardID)
            this.img_icon.imageGuid = clothCfg.Icon
            this.txt_count.text = rewardCount == 1 ? '' : rewardCount.toString()
            this.txt_name.text = clothCfg.Name
            this.txt_chance.text = `${(cfg.ShowProbability * 100).toFixed(0)}%`
        }
    }
}