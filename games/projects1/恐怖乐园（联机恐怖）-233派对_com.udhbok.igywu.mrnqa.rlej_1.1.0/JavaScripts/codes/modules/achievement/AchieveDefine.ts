/*
 * @Author       : dal
 * @Date         : 2024-05-08 14:10:38
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-17 10:10:39
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\AchieveDefine.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { AchievementInsMap } from "./bean/Achievement";

/** 成就类型 */
export enum EAchieveType {
    /** 在线时长 */
    OnlineTimeLength = "OnlineTimeLength",
    /** 连续登录天数 */
    ContinueLogin = "ContinueLogin",
    /** 孤岛存活天数 */
    AliveDayCount = "AliveDayCount",
    /** 累计消耗恐惧币 */
    FearCoinTotalPay = "FearCoinTotalPay",
    /** 累计拥有恐惧币数 */
    FearCoinTotalHave = "FearCoinTotalHave",
    /** 最大拥有恐惧币数 */
    FearCoinMaxHave = "FearCoinMaxHave",
    /** 一次最多消费恐惧币数 */
    FearCoinMaxPay = "FearCoinMaxPay",
    /** 复活次数 */
    RebirthTimes = "RebirthTimes",
    /** 玩家等级 */
    PlayerLevel = "PlayerLevel",
    /** 小镇击倒的鬼鬼次数 */
    KillGhostTimes = "KillGhostTimes",
    /** 死亡次数 */
    DeathTimes = "DeathTimes",
    /** 送礼/点赞次数 */
    GiftSendTimes = "GiftSendTimes",
    /** 收礼/点赞次数 */
    GiftReceiveTimes = "GiftReceiveTimes",
    /** 抓捕伪人 */
    CaptureFaker = "CaptureFaker",
    /** 拍鬼次数 */
    GhostPicCount = "GhostPicCount",
    /** 解锁图鉴 */
    UnlockGhostGraph = "UnlockGhostGraph",
    /** 使用道具次数 */
    UseItemCount = "UseItemCount",
    /** 使用交互物次数 */
    UseInterActorCount = "UseInterActorCount",
    /** 通关次数 */
    PassTimes = "PassTimes",
    /** 短时间内通关 */
    PassInShortTime = "PassInShortTime",
    /** 无伤通关 */
    PassNoDeath = "PassNoDeath",
    /** Find收集 */
    FindCollection = "FindCollection",
    /** Find收集 */
    KillBossTimes = "KillBossTimes",
}

class AchieveInstance {

    /** 代表成就的最高等级 */
    public maxLevel: number = 10;

    constructor() {
        this.maxLevel = this.getAllLevelCfg().length;
    }

    /** 获取所有成就配置 */
    public getAllAchieveCfg() { return GameConfig.Achievement.getAllElement(); }

    /**
     * 获取成就配置
     * @param id 成就配置id
     */
    public getAchieveCfg(id: number) { return GameConfig.Achievement.getElement(id); }

    /** 获取所有成就等级配置 */
    public getAllLevelCfg() { return GameConfig.AchievementLevel.getAllElement(); }

    /**
     * 获取成就等级配置
     * @param id 等级配置id
     */
    public getLevelCfg(id: number) {
        let res = GameConfig.AchievementLevel.getElement(id);
        return res;
    }

    /**
     * 获取成就实例
     * @param achieveType 成就类型
     * @returns 成就实例
     */
    public getAchieveIns(achieveType: EAchieveType) {
        return SystemUtil.isClient() ? AchievementInsMap.achievementMapC.get(achieveType) : AchievementInsMap.achievementMapS.get(achieveType);
    }
}

export const AchieveService = new AchieveInstance();