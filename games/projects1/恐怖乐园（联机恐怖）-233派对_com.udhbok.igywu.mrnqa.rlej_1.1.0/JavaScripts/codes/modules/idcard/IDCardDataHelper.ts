import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import SubDataHelper from "../../SubDataHelper";
import { NewPlayerRankData } from "../globalRankNew/NewPlayerRankData";
import { EBaseRankDataType } from "../globalRankNew/NewRankDefine";
import RouteConst from "../route/RouteConst";
import { BaseInfo, DayLikeNum, FreeGiftTimes, GiftInfo, IntimacyInfo, RecentGiftInfo, RecentLikeInfo } from "./IDCardConst";

export const IDCardDataType = {
    BaseInfo: "baseInfo",
    SignTxt: "signTxt",
    TodayLeftLikeNum: "todayLeftLikeNum",
    TodayLikedUserIdList: "todayLikedUserIdList",
    LastLoginTimeStamp: "lastLoginTimeStamp",
    RecentLikeInfoList: "recentLikeInfoList",
    RecentGiftInfoList: "recentGiftInfoList",
    GiftInfoList: "giftInfoList",
    FreeGiftTimes: "freeGiftTimes",
    BeLikedCount: "beLikedCount",
    CharmVal: "charmVal",
    IntimacyInfoList: "intimacyInfoList",
}

/** 数据实体 */
export class IDCardData {

    /** 怕数据升级，方便后面打补丁 */
    version: number = 1;

    /** 基本信息 */
    baseInfo: BaseInfo = new BaseInfo();

    /** 个性签名 */
    signTxt: string = "";

    /** 今日份剩余点赞数 */
    todayLeftLikeNum: number = DayLikeNum;

    /** 今日份赞过的玩家 */
    todayLikedUserIdList: string[] = [];

    /** 上一次登录时间戳 */
    lastLoginTimeStamp: number = Date.now();

    /** 近期喜欢信息 */
    recentLikeInfoList: RecentLikeInfo[] = [];

    /** 近期收礼信息 */
    recentGiftInfoList: RecentGiftInfo[] = [];

    /** 礼物信息 */
    giftInfoList: GiftInfo[] = [];

    /** 每日份免费礼物次数 */
    freeGiftTimes: number = FreeGiftTimes;

    /** 被点赞次数 */
    beLikedCount: number = 0;

    /** 魅力值 */
    charmVal: number = 0;

    /** 亲昵度信息 */
    intimacyInfoList: IntimacyInfo[] = [];

    /** 当前佩戴的头像框 */
    curFrameId: number = 1;
}

/** 不用缓存，因为缓存可能导致礼物点赞数据被覆盖 */
export class IDCardDataHelper {

    private constructor() { }

    /** 当前的数据版本 */
    private static readonly CURRENT_VERSION: number = 1;

    private static getKey(userId: string, gameTheme: EGameTheme) {
        return `${userId}_IDCardData_${gameTheme}`;
    }

    public static isSelfGame(gameTheme: EGameTheme) {
        return GameStart.GameTheme === gameTheme;
    }

    public static async reqGetData(userId: string) {
        let res: DataStorageResult;
        const key = this.getKey(userId, EGameTheme.Hall);
        if (SystemUtil.isPIE) {
            res = await DataStorage.asyncGetData(key);
        } else {
            res = await DataStorage.asyncGetData(key);//(GameStart.GameTheme === EGameTheme.Hall) ? await DataStorage.asyncGetData(key) : await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(EGameTheme.Hall), key);
        }
        let data: IDCardData;
        if (!res.data) { data = new IDCardData(); }
        else { data = res.data; }
        return data;
    }

    public static async reqSetData(userId: string, properties: string[], values: any[]): Promise<void> {

        let resCode: DataStorageResultCode;
        const key = this.getKey(userId, EGameTheme.Hall);

        // console.log(`DEBUG >>> 准备保存一下数据key = ${key},  ${JSON.stringify(properties)}, ${JSON.stringify(values)}`);

        // 先拿数据
        const data = await this.reqGetData(userId);

        /** 游戏id - 存到大厅上去哈 */
        let gameId = RouteConst.getGameIdByGameTheme(EGameTheme.Hall);

        if (!SystemUtil.isPIE && StringUtil.isEmpty(gameId)) {
            console.error(`DEBUG ERROR >>> 游戏Id错误 gameId不能为空`);
            return;
        }

        properties.forEach((v, i) => {
            data[v] = values[i];
        });

        resCode = await DataStorage.asyncSetData(key, data);

        if (resCode === DataStorageResultCode.Success) {
            // console.log(`DEBUG >>> 保存数据成功`);
        } else {
            console.error(`DEBUG >>> 保存数据失败，错误码：${JSON.stringify(resCode)},  ${JSON.stringify(properties)}, ${JSON.stringify(values)}`);
        }
    }

    /** 直接保存数据 */
    public static async reqSaveData(userId: string, data: IDCardData): Promise<void> {
        const key = this.getKey(userId, EGameTheme.Hall);
        /** 游戏id - 存到大厅上去哈 */
        let gameId = RouteConst.getGameIdByGameTheme(EGameTheme.Hall);
        if (!SystemUtil.isPIE && StringUtil.isEmpty(gameId)) {
            console.error(`DEBUG ERROR >>> 游戏Id错误 gameId不能为空`);
            return;
        }

        await DataStorage.asyncSetData(key, data);

        // 支持全服保存魅力值排行记录
        const rankData = await NewPlayerRankData.getGlobalData(userId);
        rankData && SubDataHelper.ins.saveGlobalRankInfo(userId, rankData, EBaseRankDataType.CharmValue, data.charmVal);
    }
}