
import { GameConfig } from "../../config/GameConfig";
import { LotteryRewardCountType, PropQualityType, ShopFirstDo, ShopType, TabType } from "../../const/enum";
import { DressUpItemData } from "../DressUp/DressData";
import DressUpModuleS from "../DressUp/DressUpModuleS";
import PlayerAssetModuleData from "../PlayerAsset/PlayerAssetMData";
import PlayerAssetModuleS from "../PlayerAsset/PlayerAssetModuleS";
import PropSaveData from "../PlayerAsset/PropSaveData";
import { ShareData, ShareModuleS } from "../Share/ShareModule";
import P_IAA from "../Shop/P_IAA";
import { RandomSection } from "../../utils/RandomSection";
import MessageBox from "../../utils/UI/MessageBox";
import UITools from "../../utils/UI/UITools";
import { utils } from "../../utils/uitls";
import P_LotteryRewardShow, { ItemBaseInfo } from "./LotteryRewardWindow";
import { LotteryTransition } from "./LotteryTransition";
import { LotteryWindow } from "./LotteryWindow";
import { ShopModuleC } from "../Shop/ShopModuleC";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import TeamS from "../Team/TeamS";
import DressUpModuleC from "../DressUp/DressUpModuleC";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";

export enum EnumLotteryType {
    normal = 1,
    special = 2,
}

export interface LotteryEtcConfig {
    randomSection: RandomSection
    needItemID: number
}

export class LotteryUtil {
    private static config: Map<EnumLotteryType, LotteryEtcConfig>

    private static initFinish = false

    private static firstLotteryRewardSection: RandomSection

    static getConfigByType(type: EnumLotteryType): LotteryEtcConfig {
        this.checker()
        return this.config.get(type)
    }

    static getFirstLotteryRewardSection(): RandomSection {
        this.checker()
        return this.firstLotteryRewardSection
    }

    private static checker() {
        if (this.initFinish) return

        this.firstLotteryRewardSection = new RandomSection()
        for (const cfg of GameConfig.LotteryFirstReward.getAllElement()) {
            this.firstLotteryRewardSection.pushSection(cfg.Probability, cfg.ID)
        }

        this.config = new Map()

        this.config.set(EnumLotteryType.normal, { randomSection: new RandomSection(), needItemID: 1025 })

        for (const cfg of GameConfig.Lottery.getAllElement()) {
            this.config.get(cfg.Type).randomSection.pushSection(cfg.Probability, cfg.ID)
        }

        this.initFinish = true
    }
}

export class LotteryModuleData extends Subdata {
    // 上一次领取每日奖励时的时间戳
    @Decorator.persistence()
    dailyRewardReceivedDayInYear: number
    // 上一次看广告的日期
    @Decorator.persistence()
    adRewardReceivedDayInYear: number
    // 上次日期领取的广告奖励数量
    @Decorator.persistence()
    adRewardReceivedCount: number

    // 上次领取每日盲盒奖励日期
    @Decorator.persistence()
    receivedBoxDay: number

    @Decorator.persistence()
    isFirstLottery: boolean

    @Decorator.persistence()
    unGetRewardArr: ItemBaseInfo[];

    @Decorator.persistence()
    lotteryCount: number

    @Decorator.persistence()
    private lotteryGetReward: number[];

    public get LotteryGetReward() {
        if (!this.lotteryGetReward) {
            this.lotteryGetReward = [];
        }
        return this.lotteryGetReward;
    }

    public onLotteryCountChangeAC: Action = new Action();
    public onLotteryGetRewardAC: Action = new Action();

    protected initDefaultData(): void {
        this.dailyRewardReceivedDayInYear = -1
        this.adRewardReceivedDayInYear = -1
        this.receivedBoxDay = -1
        this.adRewardReceivedCount = 0
        this.lotteryCount = 0;
        this.unGetRewardArr = [];
        this.lotteryGetReward = [];
    }

    public saveUnGetRewardByArr(arr: ItemBaseInfo[]) {
        this.unGetRewardArr = Array.from(arr);
        this.save(true);
    }
}

export class LotteryModuleC extends ModuleC<LotteryModuleS, LotteryModuleData> {

    private lotteryHeartbeat: number
    private lotteryUI: LotteryWindow;
    private lotteryRewardShowUI: P_LotteryRewardShow;
    private iaaUI: P_IAA;

    protected onStart(): void {
        this.lotteryUI = UIService.create(LotteryWindow);
        this.lotteryRewardShowUI = UIService.create(P_LotteryRewardShow);
        this.lotteryRewardShowUI.init();
        this.iaaUI = UIService.create(P_IAA);
        this.iaaUI.init(3008);
        this.iaaUI.onSuccessAll.add(this.playIAASuccess.bind(this))
        this.data.onLotteryCountChangeAC.add(this.refreshLotteryCount.bind(this));
        this.lotteryUI.onClickGetRewardByCountAC.add(this.playerClickRewardCountBtn.bind(this))
        this.data.onLotteryGetRewardAC.add(this.refreshLotteryGetRewardBtnState.bind(this));
        // 进游戏直接弹(没引导的前提下)
        // let guideData = DataCenterC.getData(ActivityGuideModuleData)
        // if(guideData.guideCompleted){
        //     UIService.show(ActivityWindow)
        // }
    }

    protected onEnterScene(sceneType: number): void {
        this.refreshLotteryGetRewardBtnState();
    }

    public showLotteryUI() {
        if (this.lotteryUI)
            UIService.showUI(this.lotteryUI)
    }

    private refreshLotteryGetRewardBtnState() {
        if (this.lotteryUI) {
            this.lotteryUI.refreshGetRewardBtn();
        }
    }

    private refreshLotteryCount() {
        if (this.lotteryUI) {
            this.lotteryUI.refreshLotteryCount();
        }
    }

    request_lottery(type: EnumLotteryType, count: number) {
        // 开始播动效, 播完往服务器发
        this.server.net_lottery(type, count)

    }

    net_ShowLottery(quality: PropQualityType) {
        this.lotteryUI.showLottery(quality);
        // 防止服务器没回导致游戏无法继续
        this.lotteryHeartbeat = TimeUtil.delayExecute(() => {
            LotteryTransition.exit()
        }, 25 * 30)
    }

    public playerGetReward() {
        this.server.net_GetReward();
    }

    request_receive_daily_reward() {
        this.server.net_receive_daily_reward()
    }

    request_receive_ad_reward() {
        // 是否领取过今日奖励
        let today = utils.getTodayOfYear()
        if (this.data.adRewardReceivedDayInYear == today && this.data.adRewardReceivedCount >= 3) {
            UITools.ShowSoftTips('已达到今日领取上限, 明天再来吧~')
            return
        }
        UIService.showUI(this.iaaUI);
        // 播放广告, 领取奖励
        // AdsUtil.playRewardAds(() => {
        // }, () => { })
    }

    playIAASuccess() {
        this.server.net_receive_ad_reward()
    }

    receive_daily_box() {
        // 是否领取过今日奖励
        let today = utils.getTodayOfYear()
        if (this.data.receivedBoxDay == today) {
            UITools.ShowSoftTips('今日已领取, 明天再来吧~')
            return
        }
        this.server.net_receive_daily_box()

    }

    net_lottery_res(rewardArray: ItemBaseInfo[], repeatList: number[]) {
        //TODO:展示奖励
        this.lotteryRewardShowUI.showReward(rewardArray);
        if (rewardArray.length == 1) {
            AnalyticsTool.ts_action_click("oneTime", Player.localPlayer);
        } else if (rewardArray.length == 10) {
            AnalyticsTool.ts_action_click("TenTimes", Player.localPlayer);
        }
        TimeUtil.clearDelayExecute(this.lotteryHeartbeat)
        this.server.net_ClearRewardInfo();
        repeatList.forEach(dressId => {
            let dressConf = GameConfig.Dress.getElement(dressId);
            if (dressConf) {
                UITools.ShowSoftTips(`获得重复装扮:${dressConf.Name}, 已转换为${dressConf.transNum}活动代币`);
            }
        })
    }

    public buyLotteryCoin(count: number = 1) {
        MessageBox.showTwoBtnMessage("是否购买抽奖券", (res) => {
            if (!res) return
            let curCoin = DataCenterC.getData(ShareData).abCoin;
            let needCoin = 100 * count
            if (curCoin < needCoin) {
                ModuleService.getModule(ShopModuleC).showShop(ShopType.Shop, TabType.Recharge);
                return
            }
            this.server.net_BuyLotteryCoin(count, needCoin);
        })
    }

    private playerClickRewardCountBtn(type: LotteryRewardCountType) {
        let getRewardArr = this.data.LotteryGetReward;
        if (getRewardArr && getRewardArr.includes(type)) {
            UITools.ShowSoftTips("已经领取过当前奖励了")
            return
        }
        let curCount = this.data.lotteryCount;
        switch (type) {
            case LotteryRewardCountType.RewardCount_20:
                if (curCount < 20) {
                    UITools.ShowSoftTips("抽奖次数不足")
                    return
                } else {
                    this.server.net_BuyLotteryCoin(5, 0);
                    ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.LotteryBonus_Click_1);
                }
                break;
            case LotteryRewardCountType.RewardCount_40:
                if (curCount < 40) {
                    UITools.ShowSoftTips("抽奖次数不足")
                    return
                } else {
                    //TODO:发铭牌
                    ModuleService.getModule(DressUpModuleC).addDress(7004);
                    ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.LotteryBonus_Click_2);
                }
                break;
            case LotteryRewardCountType.RewardCount_60:
                if (curCount < 60) {
                    UITools.ShowSoftTips("抽奖次数不足")
                    return
                } else {
                    this.server.net_BuyLotteryCoin(10, 0);
                    ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.LotteryBonus_Click_3);
                }
                break;
            case LotteryRewardCountType.RewardCount_100:
                if (curCount < 100) {
                    UITools.ShowSoftTips("抽奖次数不足")
                    return
                } else {
                    //TODO:发凯蒂
                    ModuleService.getModule(DressUpModuleC).addDress(3015);
                    ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.LotteryBonus_Click_4);
                }
                break;

            default:
                break;
        }
        this.server.net_SaveGetReward(type);
    }
}

export class LotteryModuleS extends ModuleS<LotteryModuleC, LotteryModuleData> {

    private saveAllPlayerReward: Map<number, ItemBaseInfo[]> = new Map();

    protected onPlayerEnterGame(player: mw.Player): void {
        let data = this.getPlayerData(player.playerId);
        if (!data) return;
        if (data.lotteryCount == null) {
            data.lotteryCount = 0;
            data.save(true);
        }
        let propArr = data.unGetRewardArr;
        if (!propArr || propArr.length == 0) return
        let bagArray: PropSaveData[] = [];
        let clothArray: DressUpItemData[] = [];
        let coin: number = 0;
        propArr.forEach(info => {
            if (!info.lotteryCfgId) return
            let cfg = GameConfig.Lottery.getElement(info.lotteryCfgId);
            switch (cfg.RewardType) {
                case 1://道具表
                    let bagInfo = new PropSaveData(info.cfgID, !cfg.Time, cfg.Time, info.count)
                    bagArray.push(bagInfo)
                    break;
                case 2://装扮表
                    let dressInfo = new DressUpItemData(info.cfgID, null, !cfg.Time, cfg.Time)
                    clothArray.push(dressInfo);
                    break;
                case 3:
                    coin += info.count;
                    break;
                default:
                    break;
            }
        })
        //背包加物品
        let itemMD = ModuleService.getModule(PlayerAssetModuleS)
        itemMD.addPropList(player.playerId, bagArray)
        //服装加物品
        let clothMS = ModuleService.getModule(DressUpModuleS);
        clothMS.addDressList(player.playerId, clothArray)
        if (coin > 0) {
            ModuleService.getModule(TeamS).addGameCoin(coin, player.playerId);
        }
        data.saveUnGetRewardByArr([]);
    }

    protected onPlayerLeft(player: mw.Player): void {
        let pId = player.playerId;
        if (!this.saveAllPlayerReward.has(pId)) return;
        let propArr = this.saveAllPlayerReward.get(pId);
        let data = this.getPlayerData(pId);
        if (!data) return;
        data.saveUnGetRewardByArr(propArr);
    }

    @Decorator.noReply()
    net_receive_daily_box() {
        // 是否领取过今日奖励
        let today = utils.getTodayOfYear()
        if (this.currentData.receivedBoxDay == today) return

        let itemMD = ModuleService.getModule(PlayerAssetModuleS)
        let info = new PropSaveData(1025, true, -1, 1);
        itemMD.addPropAndSave(this.currentPlayerId, info)

        this.currentData.receivedBoxDay = today
        this.currentData.save(true)
    }

    @Decorator.noReply()
    net_receive_daily_reward() {
        // 是否领取过今日奖励
        let today = utils.getTodayOfYear()
        if (this.currentData.dailyRewardReceivedDayInYear >= today) return

        let config = LotteryUtil.getConfigByType(EnumLotteryType.normal)

        let itemMD = ModuleService.getModule(PlayerAssetModuleS)

        let info = new PropSaveData(config.needItemID, true, -1, 1);
        itemMD.addPropAndSave(this.currentPlayerId, info)

        this.currentData.dailyRewardReceivedDayInYear = today
        this.currentData.save(true)
    }

    @Decorator.noReply()
    net_receive_ad_reward() {
        // // 今日是否领取过三次奖励
        let today = utils.getTodayOfYear()
        if (this.currentData.adRewardReceivedDayInYear == today && this.currentData.adRewardReceivedCount >= 3) return

        if (this.currentData.adRewardReceivedDayInYear != today) {
            this.currentData.adRewardReceivedCount = 0
        }

        let config = LotteryUtil.getConfigByType(EnumLotteryType.normal)
        let itemMD = ModuleService.getModule(PlayerAssetModuleS)
        let info = new PropSaveData(config.needItemID, true, -1, 1);
        itemMD.addPropAndSave(this.currentPlayerId, info)

        this.currentData.adRewardReceivedDayInYear = today
        this.currentData.adRewardReceivedCount++
        this.currentData.save(true)
    }

    @Decorator.noReply()
    net_lottery(type: EnumLotteryType, count: number) {
        let itemMD = DataCenterS.getData(this.currentPlayerId, PlayerAssetModuleData)
        // 判断抽奖币够不够
        let config = LotteryUtil.getConfigByType(type)
        let info = itemMD.getProp(config.needItemID)
        if (!info || info.count < count) return
        // TODO:扣货币
        ModuleService.getModule(PlayerAssetModuleS).delProp(this.currentPlayerId, config.needItemID, count)
        if (!this.saveAllPlayerReward.has(this.currentPlayerId)) {
            this.saveAllPlayerReward.set(this.currentPlayerId, []);
        }
        let rewardArray = this.saveAllPlayerReward.get(this.currentPlayerId);
        rewardArray.length = 0;
        // 第一次抽奖暗箱
        // if (!this.currentData.isFirstLottery && type == EnumLotteryType.normal && count == 10) {
        //     for (const rewardCfg of GameConfig.LotteryFirstReward.getAllElement()) {
        //         let randomIndex = Math.floor(rewardCfg.RandomRewardID.length * Math.random())
        //         let randomCfgID = rewardCfg.RandomRewardID[randomIndex]
        //         let randomCount = rewardCfg.RandomRewardCount[randomIndex]
        //         rewardArray.push({ cfgID: randomCfgID, count: randomCount, lotteryCfgId: rewardCfg.ID })

        //         let color: string = ""//TODO:获取品质
        //         this.getClient(this.currentPlayerId).net_ShowLottery(color);
        //     }
        //     this.currentData.isFirstLottery = true
        //     this.currentData.save(false)
        //     return
        // }
        // 发奖励
        for (let i = 0; i < count; i++) {
            let id = config.randomSection.getRandom()
            let rewardCfg = GameConfig.Lottery.getElement(id)
            rewardArray.push({ cfgID: rewardCfg.RewardID, count: rewardCfg.RewardCount, lotteryCfgId: id })
        }
        // itemMD.addItems(this.currentPlayerId, rewardArray)
        // // 返回奖励结果
        // this.getClient(this.currentPlayerId).net_lottery_res(rewardArray)

        let quality: PropQualityType = PropQualityType.Blue//TODO:获取品质

        rewardArray.forEach(info => {
            let cfg = GameConfig.Lottery.getElement(info.lotteryCfgId);
            switch (cfg.RewardType) {
                case 1://物品表
                case 3:
                    let propCfg = GameConfig.Item.getElement(info.cfgID);
                    if (!propCfg) return
                    if (quality < propCfg.QualityType) {
                        quality = propCfg.QualityType;
                    }
                    break;
                case 2://装扮表
                    let dressCfg = GameConfig.Dress.getElement(info.cfgID);
                    if (!dressCfg) return
                    if (quality < dressCfg.QualityType) {
                        quality = dressCfg.QualityType;
                    }
                    break;
                default:
                    break;
            }
        })
        this.saveAllPlayerReward.set(this.currentPlayerId, rewardArray)
        this.getClient(this.currentPlayerId).net_ShowLottery(quality);
        let data = this.getPlayerData(this.currentPlayerId)
        if (!data) return
        data.lotteryCount += count;
        data.save(true);
        data.onLotteryCountChangeAC.call();
    }

    @Decorator.noReply()
    net_GetReward() {
        if (!this.saveAllPlayerReward.has(this.currentPlayerId)) return
        let rewardArray = this.saveAllPlayerReward.get(this.currentPlayerId);
        let bagArray: PropSaveData[] = [];
        let clothArray: DressUpItemData[] = [];
        let coin: number = 0;
        rewardArray.forEach(info => {
            if (!info.lotteryCfgId) return
            let cfg = GameConfig.Lottery.getElement(info.lotteryCfgId);
            switch (cfg.RewardType) {
                case 1://道具表
                    let bagInfo = new PropSaveData(info.cfgID, !cfg.Time, cfg.Time, info.count)
                    bagArray.push(bagInfo)
                    break;
                case 2://装扮表
                    let dressInfo = new DressUpItemData(info.cfgID, null, !cfg.Time, cfg.Time)
                    clothArray.push(dressInfo);
                    break;
                case 3:
                    coin += info.count;
                    break;
                default:
                    break;
            }
        })
        //背包加物品
        let itemMD = ModuleService.getModule(PlayerAssetModuleS)

        itemMD.addPropList(this.currentPlayerId, bagArray)
        //服装加物品
        let clothMS = ModuleService.getModule(DressUpModuleS);
        let repeatList = clothMS.addDressList(this.currentPlayerId, clothArray)
        if (coin > 0) {
            ModuleService.getModule(TeamS).addGameCoin(coin, this.currentPlayerId)
        }
        this.getClient(this.currentPlayerId).net_lottery_res(rewardArray, repeatList)
    }

    net_BuyLotteryCoin(count: number, needCoin: number) {
        let res = ModuleService.getModule(ShareModuleS).reduceGameCoin(needCoin, this.currentPlayer)
        if (!res) return
        let playerAssetMS = ModuleService.getModule(PlayerAssetModuleS)
        let info = new PropSaveData(1025, true, -1, count);
        playerAssetMS.addPropAndSave(this.currentPlayerId, info)
    }

    net_ClearRewardInfo() {
        if (!this.saveAllPlayerReward.has(this.currentPlayerId)) return;
        this.saveAllPlayerReward.set(this.currentPlayerId, []);
    }

    net_SaveGetReward(type: LotteryRewardCountType) {
        let data = this.getPlayerData(this.currentPlayerId);
        if (!data) return;
        let index = data.LotteryGetReward.indexOf(type);
        if (index != -1) return
        data.LotteryGetReward.push(type);
        data.save(true);
        data.onLotteryGetRewardAC.call();
    }
}