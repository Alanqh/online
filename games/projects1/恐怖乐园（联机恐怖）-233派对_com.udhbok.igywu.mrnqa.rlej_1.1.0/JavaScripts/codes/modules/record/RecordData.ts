import TimeTransferUtil from "../../utils/TimeTransferUtil";
import { MapEx } from "../../utils/MapEx";
import { AchieveService, EAchieveType } from "../achievement/AchieveDefine";
import { EStateIndex, RouteDefine } from "../route/RouteDefine";
import { EGameTheme, GamesStartDefines } from "../../Defines";
import { IDCardDataHelper } from "../idcard/IDCardDataHelper";
import IDCardDefine from "../idcard/IDCardDefine";
import { NewPlayerRankData } from "../globalRankNew/NewPlayerRankData";
import { EBaseRankDataType } from "../globalRankNew/NewRankDefine";
import { DegreeType } from "../blackboard/BoardDefine";

/** 登录信息 */
export class LoginInfo {
    /** 上一次登录的是时间戳 */
    lastLoginTimeInterval: number = Date.now();
    /** 连续登录天数 */
    continueLoginDay: number = 1;
}

/** 恐惧币信息 */
export class FearCoinInfo {
    /** 累计消费 */
    totalPay: number = 0;
    /** 累计拥有 */
    totalHave: number = 0;
    /** 最大拥有 */
    maxHave: number = 0;
    /** 最大一次消耗 */
    maxPay: number = 0;
}

/** 记录一下玩家的基本信息 */
export class PlayerBaseRecordInfo {
    /** 复活次数 */
    rebirthTimes: number = 0;
    /** 小镇鬼鬼击倒次数 */
    killGhostTimes: number = 0;
    /** 玩家的死亡次数 - 记录不同游戏的死亡次数 */
    deathTimesMap: MapEx.MapExClass<number> = {};
    /** 总计死亡次数 */
    totalDeathTimes: number = 0;
    /** 被赞 / 收礼次数 */
    receiveGiftTimes: number[] = [0, 0];
    /** 点赞 / 送礼次数 */
    sendGiftTimes: number[] = [0, 0];
    /** 道具使用次数 */
    useItemCountMap: MapEx.MapExClass<number> = {};
    /** 所有道具总共使用次数 */
    totalUseItemCount: number = 0;
    /** 拍鬼次数 */
    ghostPicCountMap: MapEx.MapExClass<number> = {};
    /** 所有拍鬼次数 */
    totalPicCount: number = 0;
    /** 使用交互物次数 第一个位置是非门交互次数 第二个位置是门的交互次数 */
    useInterActorTimes: number[] = [0, 0];
    /** 最大存活天数 */
    maxAliveDay: number = 0;
    /** 捕捉的伪人数 */
    captureFakers: number = 0;
    /** 总在线时长 */
    totalOnlineTimesLength: number = 0;
    /** 玩家等级 */
    playerLevel: number = 0;
    /** 击杀某只boss的次数 */
    killBossCount: MapEx.MapExClass<number> = {};
    /** 击杀boss总次数 */
    totalKillBossCount: number = 0;
}

export class RecordPassInfo {
    /** 所有游戏中最短的通关时间  单位：秒  默认是null*/
    allGameShortestPassTime: number = null;
    /** 各游戏中任意结局的最快通关时间  单位：秒 */
    shortestPassTimeMap: MapEx.MapExClass<number> = {};
    /** 各游戏中各结局的最快通关时间  单位：秒 */
    shortestPassTimeWithEndingMap: MapEx.MapExClass<MapEx.MapExClass<number>> = {};

    /** 所有游戏最小死亡次数通关 */
    allGameMinDeathTimes: number = null;
    /** 任意游戏最小死亡次数通关 */
    allGameMinDeathTimesMap: MapEx.MapExClass<number> = {};
    /** 所有游戏最受伤次数通关 */
    allGameMinBeHurtTimes: number = null;
    /** 任意游戏最小受伤次数通关 */
    allGameMinBeHurtTimesMap: MapEx.MapExClass<number> = {};

    /** 所有游戏的通关次数 */
    allPassTimes: number = 0;
    /** 任意游戏，所有结局，所有难度的通关次数 */
    gameThemePassTimesMap: MapEx.MapExClass<number> = {};
}

export default class RecordData extends Subdata {

    @Decorator.persistence()
    loginInfo: LoginInfo;

    @Decorator.persistence()
    fearCoinInfo: FearCoinInfo;

    @Decorator.persistence()
    baseRecordInfo: PlayerBaseRecordInfo;

    @Decorator.persistence()
    passInfo: RecordPassInfo;

    /**对话且领取奖励过的NPC */
    @Decorator.persistence()
    talkNpcArr: number[] = [];

    /**
     * 支持获取一个玩家全服的数据
     * @param userId 玩家id
     * @returns 
     */
    public static async getGlobalData(userId: string) {
        const key = `${userId}_SubData_RecordData`;
        return (await DataStorage.asyncGetData(key)).data as RecordData;
    }

    /**
     * 支持设置一个一个玩家全服数据
     * @param userId 玩家id
     */
    public static setGlobalData(userId: string, recordData: RecordData) {
        if (!recordData) { return; }
        const key = `${userId}_SubData_RecordData`;
        DataStorage.asyncSetData(key, recordData);
    }

    /** 初始化默认数据 */
    protected async initDefaultData(): Promise<void> {
        this.loginInfo = new LoginInfo();
        this.fearCoinInfo = new FearCoinInfo();
        this.baseRecordInfo = new PlayerBaseRecordInfo();
        this.passInfo = new RecordPassInfo();
        this.talkNpcArr = [];
        this.save(true);

        if (SystemUtil.isServer()) {
            // // 开局赠送五个灵异胶卷
            // setTimeout(() => {
            //     RouteDefine.addSpecialItem(this["mUserId"], 51004, 5, true)
            // }, 5e3);

            // 恐惧币初始化
            let coinCount = await RouteDefine.getFearCoin(this["mUserId"])
            this.saveTotalHave(coinCount, coinCount);
            // 被赞和收礼信息初始化
            let iDCardData = await IDCardDataHelper.reqGetData(this["mUserId"]);
            let count = IDCardDefine.getAllGiftCount(iDCardData);
            // 礼物
            this.saveReceiveGiftTimes(-2, count);
            // 被赞
            this.saveReceiveGiftTimes(-1, iDCardData.beLikedCount);

            // 捕捉的伪人数初始化
            const routeData = await RouteDefine.getRouteData(this["mUserId"], EGameTheme.Hall);
            this.saveCaptureFakers(routeData.killedFakerCount);
        }
    }

    /** 保存击杀boss的次数 */
    public saveKillBossTimes(bossId: number) {
        let killTimes = this.getKillBossTimes(bossId) + 1;
        MapEx.set(this.baseRecordInfo.killBossCount, bossId, killTimes);
        this.baseRecordInfo.totalKillBossCount += 1;
        this.save(true);
        AchieveService.getAchieveIns(EAchieveType.PassNoDeath).listen(this["mUserId"], bossId, killTimes, this.baseRecordInfo.totalKillBossCount);
    }

    /**
     * 获得击杀某只boss的总数量
     * @param bossId 
     */
    public getKillBossTimes(bossId: number) {
        let killCount = MapEx.get(this.baseRecordInfo.killBossCount, bossId);
        return killCount ? killCount : 0;
    }

    /**
     * 保存所有游戏的通关次数
     */
    public saveAllGamePassTimes(passTimes: number) {
        if (passTimes <= this.passInfo.allPassTimes) { return; }
        this.passInfo.allPassTimes = passTimes;
        this.save(true);
    }

    /**
     * 保存所有游戏的通关次数
     */
    public saveGameThemePassTimes(gameTheme: EGameTheme, passTimes: number) {
        if (passTimes <= this.getGameThemePassTimes(gameTheme)) { return; }
        MapEx.set(this.passInfo.gameThemePassTimesMap, gameTheme, passTimes);
        DataCenterS.getData(this["mUserId"], NewPlayerRankData).saveGameThemePassTimes(gameTheme, passTimes);
        this.save(true);
    }

    /**
     * 获取某个游戏的通关次数
     * @param gameTheme 游戏主题
     */
    public getGameThemePassTimes(gameTheme: EGameTheme) {
        const passTimes = MapEx.get(this.passInfo.gameThemePassTimesMap, gameTheme);
        return passTimes ? passTimes : 0;
    }

    /**
     * 保存最小死亡次数或最少受伤次数通关记录
     * @param beHurtTimes 受伤次数
     * @param deathTimes 死亡次数
     */
    public saveMinDeathAndBeHurtTimes(beHurtTimes: number, deathTimes: number) {

        // 任意游戏最小受伤次数通关
        let minBeHurtTimes = MapEx.get(this.passInfo.allGameMinBeHurtTimesMap, GamesStartDefines.gameTheme);
        if (!minBeHurtTimes || minBeHurtTimes > beHurtTimes) {
            MapEx.set(this.passInfo.allGameMinBeHurtTimesMap, GamesStartDefines.gameTheme, beHurtTimes);
        }

        // 任意游戏最小死亡次数通关
        let minDeathTimes = MapEx.get(this.passInfo.allGameMinDeathTimesMap, GamesStartDefines.gameTheme);
        if (!minDeathTimes || minDeathTimes > deathTimes) {
            MapEx.set(this.passInfo.allGameMinDeathTimesMap, GamesStartDefines.gameTheme, deathTimes);
        }

        if (this.passInfo.allGameMinBeHurtTimes > beHurtTimes) {
            this.passInfo.allGameMinBeHurtTimes = beHurtTimes;
            AchieveService.getAchieveIns(EAchieveType.PassNoDeath).listen(this["mUserId"], deathTimes, beHurtTimes);
        }
        if (this.passInfo.allGameMinDeathTimes > deathTimes) {
            this.passInfo.allGameMinDeathTimes = deathTimes;
            AchieveService.getAchieveIns(EAchieveType.PassNoDeath).listen(this["mUserId"], deathTimes, beHurtTimes);
        }
    }

    /** 保存各游戏的各结局的最短通关时间  */
    public saveShortestPassTime(gameTheme: EGameTheme, endingCfgId: number, passTime: number) {
        // 各游戏各结局的通关时间
        let gameThemeMap = MapEx.get(this.passInfo.shortestPassTimeWithEndingMap, gameTheme);
        if (!gameThemeMap) {
            gameThemeMap = {};
            MapEx.set(gameThemeMap, endingCfgId, passTime);
            MapEx.set(this.passInfo.shortestPassTimeWithEndingMap, gameTheme, gameThemeMap);
            this.save(true);
            AchieveService.getAchieveIns(EAchieveType.PassInShortTime).listen(this["mUserId"], endingCfgId, passTime);
        } else {
            let shortestPassTime = MapEx.get(gameThemeMap, endingCfgId);
            if (!shortestPassTime || shortestPassTime > passTime) {
                MapEx.set(gameThemeMap, endingCfgId, passTime);
                MapEx.set(this.passInfo.shortestPassTimeWithEndingMap, gameTheme, gameThemeMap);
                this.save(true);
                AchieveService.getAchieveIns(EAchieveType.PassInShortTime).listen(this["mUserId"], endingCfgId, passTime);
            }
        }

        // 所有游戏的最快通关时间
        if (this.passInfo.allGameShortestPassTime > passTime) {
            this.passInfo.allGameShortestPassTime = passTime;
            this.save(true);
            AchieveService.getAchieveIns(EAchieveType.PassInShortTime).listen(this["mUserId"], endingCfgId, passTime);
        }

        // 对应游戏的任意结局快通关时间
        const gameThemeShortPassTime = MapEx.get(this.passInfo.shortestPassTimeMap, gameTheme);
        if (!gameThemeShortPassTime || gameThemeShortPassTime > passTime) {
            MapEx.set(this.passInfo.shortestPassTimeMap, gameTheme, passTime);
            this.save(true);
            AchieveService.getAchieveIns(EAchieveType.PassInShortTime).listen(this["mUserId"], endingCfgId, passTime);
        }
    }

    /** 保存玩家等级 */
    public savePlayerLevel(level: number) {
        // 比之前小了？不对劲儿
        if (level <= this.baseRecordInfo.playerLevel) { return; }
        this.baseRecordInfo.playerLevel = level;
        DataCenterS.getData(this["mUserId"], NewPlayerRankData).saveRankInfo(EBaseRankDataType.PlayerLevel, level);
        this.save(true);
    }

    /** 记录总在线时长 */
    public saveOnlineTimesLength(onlineTimesLength: number) {
        this.baseRecordInfo.totalOnlineTimesLength = onlineTimesLength;
        this.save(true);
    }

    /** 保存最大存活天数 */
    public saveMaxAliveDay(delta: number) {
        if (delta > this.baseRecordInfo.maxAliveDay) {
            this.baseRecordInfo.maxAliveDay = delta;
            this.save(true);
        }
        DataCenterS.getData(this["mUserId"], NewPlayerRankData).saveRankInfo(EBaseRankDataType.GraveyardAliveDay, this.baseRecordInfo.maxAliveDay);
    }

    /**
     * 监听是否可以领取拍摄伪人奖励的成就
     */
    public async checkCanReceiveFakerReward() {
        // 是否可以领取伪人奖励了，但是还没有领取，通知一下
        if (this.baseRecordInfo.captureFakers >= 60 && await RouteDefine.canReceiveActivity(this["mUserId"], EStateIndex.ScreamKun)) {
            Event.dispatchToClient(Player.getPlayer(this["mUserId"]), "evt_panelRedPointChange");
        }
    }

    /** 保存捕捉的伪人数 */
    public saveCaptureFakers(fakerCount: number) {
        this.baseRecordInfo.captureFakers = fakerCount;
        this.save(true);
        // 监听成就
        AchieveService.getAchieveIns(EAchieveType.CaptureFaker).listen(this["mUserId"], this.baseRecordInfo.captureFakers);
        this.checkCanReceiveFakerReward();
    }

    /**
     * 保存 交互次数 第一个位置是非门交互次数 第二个位置是门的交互次数
     * @param type 0是非门交互  1是门交互
     * @param deltaCount 改变值
     */
    public saveInterActorCount(type: number) {
        if (type === 0) {
            this.baseRecordInfo.useInterActorTimes[0]++;
        } else {
            this.baseRecordInfo.useInterActorTimes[1]++;
        }
        this.save(true);
        // 监听成就变化
        AchieveService.getAchieveIns(EAchieveType.UseInterActorCount).listen(this["mUserId"], type, type === 0 ? this.baseRecordInfo.useInterActorTimes[0] : this.baseRecordInfo.useInterActorTimes[1]);
    }

    /**
     * 保存拍鬼次数
     * @param cfgIds 图录id
     */
    public saveGhostPicTimes(cfgIds: number[]) {
        // set去重
        const set: Set<number> = new Set();
        cfgIds.forEach(v => {
            set.add(v);
        });
        set.forEach(v => {
            this.baseRecordInfo.totalPicCount++;
            let times = MapEx.get(this.baseRecordInfo.ghostPicCountMap, v);
            times = times ? times : 0;
            MapEx.set(this.baseRecordInfo.ghostPicCountMap, v, ++times);
            // 监听成就变化
            AchieveService.getAchieveIns(EAchieveType.GhostPicCount).listen(this["mUserId"], v.toString(), times, this.baseRecordInfo.totalPicCount);
        })
        this.save(true);
    }

    public getGhostPicCount(ghostCfgId: number) {
        const times = MapEx.get(this.baseRecordInfo.ghostPicCountMap, ghostCfgId);
        return times ? times : 0;
    }

    /**
     * 保存使用道具次数
     * @param itemId 道具id
     */
    public saveUseItemTimes(itemId: number, useCount: number) {
        this.baseRecordInfo.totalUseItemCount += useCount;
        let times = MapEx.get(this.baseRecordInfo.useItemCountMap, itemId);
        times = times ? times + useCount : useCount;
        MapEx.set(this.baseRecordInfo.useItemCountMap, itemId, times);
        this.save(true);
        // 监听成就变化
        AchieveService.getAchieveIns(EAchieveType.UseItemCount).listen(this["mUserId"], itemId.toString(), times, this.baseRecordInfo.totalUseItemCount);
    }

    /**
     * 获取使用道具次数
     */
    public getUseItemTimes(itemId: number) {
        const useTimes: number = MapEx.get(this.baseRecordInfo.useItemCountMap, itemId);
        return useTimes ? useTimes : 0;
    }

    /**
     * 保存 被赞 / 收礼次数
     * @param type -1 是点赞 -2 是所有礼物
     * @param deltaCount 改变值
     */
    public saveReceiveGiftTimes(type: number, deltaCount: number) {
        if (type === -1) {
            this.baseRecordInfo.receiveGiftTimes[0] += deltaCount;
        } else {
            this.baseRecordInfo.receiveGiftTimes[1] += deltaCount;
        }
        this.save(true);
        // 监听成就变化
        AchieveService.getAchieveIns(EAchieveType.GiftReceiveTimes).listen(this["mUserId"], type, type === -1 ? this.baseRecordInfo.receiveGiftTimes[0] : this.baseRecordInfo.receiveGiftTimes[1]);
    }

    /**
     * 保存 点赞 / 送礼次数
     * @param type -1 是点赞 -2 是所有礼物
     * @param deltaCount 改变值
     */
    public saveSendGiftTimes(type: number, deltaCount: number) {
        if (type === -1) {
            this.baseRecordInfo.sendGiftTimes[0] += deltaCount;
        } else {
            this.baseRecordInfo.sendGiftTimes[1] += deltaCount;
        }
        this.save(true);
        // 监听成就变化
        AchieveService.getAchieveIns(EAchieveType.GiftSendTimes).listen(this["mUserId"], type, type === -1 ? this.baseRecordInfo.sendGiftTimes[0] : this.baseRecordInfo.sendGiftTimes[1]);
    }

    /** 保存死亡次数 */
    public saveDeathTimes() {
        this.baseRecordInfo.totalDeathTimes++;
        let nowDeathTimes = MapEx.get(this.baseRecordInfo.deathTimesMap, GamesStartDefines.gameTheme);
        nowDeathTimes = nowDeathTimes ? nowDeathTimes : 0;
        MapEx.set(this.baseRecordInfo.deathTimesMap, GamesStartDefines.gameTheme, ++nowDeathTimes);
        this.save(true);
        // 监听成就变化
        AchieveService.getAchieveIns(EAchieveType.DeathTimes).listen(this["mUserId"], nowDeathTimes, this.baseRecordInfo.totalDeathTimes);
    }

    /** 获取死亡次数 */
    public getDeathTimes(gameTheme: EGameTheme) {
        const deathTimes = MapEx.get(this.baseRecordInfo.deathTimesMap, gameTheme);
        return deathTimes ? deathTimes : 0;
    }

    /** 保存复活次数 */
    public saveRebirthTimes() {
        this.baseRecordInfo.rebirthTimes++;
        this.save(true);
        // 监听成就
        AchieveService.getAchieveIns(EAchieveType.RebirthTimes).listen(this["mUserId"], this.baseRecordInfo.rebirthTimes);
    }

    /** 保存小镇鬼鬼击倒次数 */
    public saveKillGhostTimes() {
        this.baseRecordInfo.killGhostTimes++;
        this.save(true);
        // 监听成就
        AchieveService.getAchieveIns(EAchieveType.KillGhostTimes).listen(this["mUserId"], this.baseRecordInfo.killGhostTimes);
    }


    /** 保存登录信息 */
    public saveLoginInfo() {
        // 计算这次登录的时间戳与上一次登录时间戳相差的天数
        const dayDiff = TimeTransferUtil.getDaysDifference(this.loginInfo.lastLoginTimeInterval, Date.now());
        if (dayDiff === 1) {
            this.loginInfo.continueLoginDay++;
        } else if (dayDiff > 1) {
            this.loginInfo.continueLoginDay = 1;
        }
        this.loginInfo.lastLoginTimeInterval = Date.now();
    }

    /**
     * 保存累计消费额
     * @param deltaCount 消费额
     */
    public saveTotalPay(deltaCount: number) {
        this.fearCoinInfo.totalPay += deltaCount;
        this.fearCoinInfo.maxPay = Math.max(this.fearCoinInfo.maxPay, deltaCount);
        AchieveService.getAchieveIns(EAchieveType.FearCoinTotalPay).listen(this["mUserId"], this.fearCoinInfo.totalPay);
        AchieveService.getAchieveIns(EAchieveType.FearCoinMaxPay).listen(this["mUserId"], this.fearCoinInfo.maxPay);
        this.save(true);
    }

    /**
     * 保存累计拥有额
     * @param curAccount 当前账户余额
     * @param deltaCount 增加值
     */
    public saveTotalHave(curAccount: number, deltaCount: number) {
        this.fearCoinInfo.totalHave += deltaCount;
        this.fearCoinInfo.maxHave = Math.max(this.fearCoinInfo.maxHave, curAccount);
        AchieveService.getAchieveIns(EAchieveType.FearCoinTotalHave).listen(this["mUserId"], this.fearCoinInfo.totalHave);
        AchieveService.getAchieveIns(EAchieveType.FearCoinMaxHave).listen(this["mUserId"], this.fearCoinInfo.maxHave);
        this.save(true);
    }

    /**
     * 保存对话且领取过奖励的Npc信息
     * @param id npcID
     */
    public saveTalkNpcInfo(id: number) {
        if (!this.talkNpcArr) {
            this.talkNpcArr = [];
        }
        if (!this.talkNpcArr.includes(id)) {
            this.talkNpcArr.push(id);
        }
        this.save(true);
    }

}
