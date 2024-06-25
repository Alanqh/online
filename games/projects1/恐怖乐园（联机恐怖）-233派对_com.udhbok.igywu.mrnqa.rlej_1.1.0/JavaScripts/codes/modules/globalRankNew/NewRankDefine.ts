/*
 * @Author       : dal
 * @Date         : 2024-05-24 10:34:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-04 11:31:26
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\NewRankDefine.ts
 * @Description  : 
 */

/**
 * 全服排行榜基础数据信息枚举类型
 * 
 * 注意这些值都必须是number类型，并且都是只能递增的值
 */
export enum EBaseRankDataType {
    /** 玩家等级 */
    PlayerLevel = "playerLevel",
    /** 魅力值 */
    CharmValue = "charmValue",
    /** 学校通关次数 */
    SchoolPassTimes = "schoolPassTimes",
    /** 医院通关次数 */
    HospitalPassTimes = "hosPassTimes",
    /** 小镇通关次数 */
    TownPassTimes = "townPassTimes",
    /** 孤岛存活天数 */
    GraveyardAliveDay = "graveyardAliveDay",
}

/**
 * 全服排行榜基础数据信息
 */
export class BaseRankDataInfo {
    /** 玩家等级 */
    playerLevel: number = 0;
    /** 魅力值 */
    charmValue: number = 0;
    /** 学校通关次数 */
    schoolPassTimes: number = 0;
    /** 医院通关次数 */
    hosPassTimes: number = 0;
    /** 小镇通关次数 */
    townPassTimes: number = 0;
    /** 孤岛存活天数 */
    graveyardAliveDay: number = 0;
}

export class NewRankDefine {

    /** 排行榜黑名单 - 禁止在排行榜上显示的玩家 */
    // public static BanUserIdArr: string[] = ["46813651"];
    public static BlackList: string[] = ["56566982", "1006468", "109257122", "330901229", "55349045"];

    /** 排行榜记录最多存储条数 */
    public static readonly MaxRankItemSaveLength = 1e3;

    /** 最大显示长度 */
    public static readonly MaxRankItemViewLength = 50;

    /** 服务端多久保存一次数据 */
    public static readonly RankDataSaveTime = 1e4;

    /** 多久自动更新一次缓存 单位秒 多个一秒方便显示 */
    public static readonly AutoUpdateCacheTime = 61;

    /** 标题 */
    public static tittleTxtArr: string[] = ["等级", "人气", "鬼校通关次数", "疯人院通关次数", "小镇通关次数", "孤岛存活天数"];

    /** 排名图标 */
    public static rankImgArr: string[] = ["255660", "255672", "255673"];

    /** 世界排行榜数据类型 */
    private static _RankTypeArr;

    public static get rankTypeArr(): EBaseRankDataType[] {
        if (!this._RankTypeArr) {
            this._RankTypeArr = Object.keys(new BaseRankDataInfo());
        }
        return this._RankTypeArr;
    }

    /**
     * 是否显示形象
     */
    public static viewRole(type: EBaseRankDataType) {
        return type === EBaseRankDataType.PlayerLevel || type === EBaseRankDataType.CharmValue;
    }
}