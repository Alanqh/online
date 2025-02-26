/*
 * @Author       : dal
 * @Date         : 2024-01-22 17:03:46
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-03-26 15:25:24
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\route\RouteData.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme, GamesStartDefines } from "../../Defines";
import GameStart from "../../GameStart";
import { MapEx } from "../../utils/MapEx";
import { AchieveService, EAchieveType } from "../achievement/AchieveDefine";
import { BagItemData } from "../bag/BagDefine";
import PlayerRankData, { PlayerPassDataItem } from "../globalRank/PlayerRankData";
import RecordModuleS from "../record/RecordModuleS";
import RouteConst from "./RouteConst";

/** 成功通关的信息 */
export class PassInfo {
    /** 难度 */
    diff: number;
    /** 结局 */
    endingType: number;
    /** 次数 */
    passTimes: number;

    constructor(diff, endingType, passTimes) {
        this.diff = diff;
        this.endingType = endingType;
        this.passTimes = passTimes;
    }
}

export class VIP {
    /**月卡时间戳 */
    public monthlyCard: number = 0;
    /**季卡时间戳 */
    public seasonalCard: number = 0;
    /**月卡每日领取时间戳 */
    public monthlyStamp: number = null;
    /**月卡每日领取状态 */
    public monthlyState: boolean = false;
    /**季卡每日领取时间戳 */
    public seasonalStamp: number = null;
    /**季卡每日领取状态 */
    public seasonalState: boolean = false;
}



export class BuyLimit {
    timeStamp: number;//每日时间戳

    weekTime: number;//每周的星期几

    monthTime: number;//每月的几号

    dailyLimit: MapEx.MapExClass<number> = {};

    weekLimit: MapEx.MapExClass<number> = {};

    monthLimit: MapEx.MapExClass<number> = {};
}

export const RouteDataType = {
    PassInfoMap: "passInfoMap",
    TotalGameTime: "totalGameTime",
    GameTheme: "gameTheme",
    TotalExp: "totalExp",
    UnlockedGraphList: "unlockedGraphList",
    FearCoin: "fearCoin",
    SpecialItemDataList: "specialItemDataList",
    /** 2024.6.5废弃掉，使用NewFastPassTimeMap */
    FastPassTimeMap: "fastPassTimeMap",
    UnlockedItemList: "unlockedItemList",
    vip: "vip",
    skins: "skins",
    giftPack: "giftPack",
    wantTimes: "wantTimes",
    dateMark: "dateMark",
    RecommendState: "RecommendState",
    ItemLevelMap: "itemLevelMap",
    killedFakerCount: "killedFakerCount",
    rewardStateList: "rewardStateList",
    buyLimit: "buyLimit",
    NewFastPassTimeMap: "newFastPassTimeMap",
}

/** 数据实体 */
export class RouteData {

    /** 怕数据升级，方便后面打补丁， 数据升级记得更新版本号 */
    version: number = 1;
    // ------------------------v1---------------------------

    /** 通关难度 - 结局 1 : 0次, key 是”难度_结局“，===========分游戏的key */
    passInfoMap: MapEx.MapExClass<PassInfo> = {};

    /** 总游戏时长，这个是分游戏存放的 ===========分游戏的key*/
    totalGameTime: number = 0;

    /** 
     * 这个是统一存放在 ===========大厅Hall的key 
     * @deprecated 已迁移至GraphData
    */
    unlockedGraphList: number[] = [];

    // ------------------------v2---------------------------

    /** 各游戏，各难度各通关结局最快通关记录 */
    /** 2024.6.5废弃掉，使用newFastPassTimeMap */
    fastPassTimeMap: MapEx.MapExClass<PlayerPassDataItem> = {};

    /** 恐惧币 ===========大厅Hall的key*/
    fearCoin: number = 0;

    /** 特殊道具数据 ===========大厅Hall的key*/
    specialItemDataList: BagItemData[] = [];

    /** 存的哪个游戏主题===========分游戏的key */
    gameTheme: EGameTheme = EGameTheme.Empty;

    /** 经验 ===========分游戏的key（所以最后要计算总经验才行）*/
    totalExp: number = 0;

    // ------------------------v3---------------------------

    /** 已解锁的一些道具，不会出现在背包 */
    unlockedItemList: number[] = [];

    /**已解锁的房屋皮肤 */
    skins: number[] = [];

    /**会员数据 */
    vip: VIP = new VIP();


    /**每日白嫖次数 */
    wantTimes: number = 0;
    /**白嫖时间标记 */
    dateMark: number = null;

    // ------------------------v4---------------------------

    /**每日推荐商品 */
    recommendState: boolean = false;

    // ------------------------v5---------------------------

    /** 强化等级配置 */
    itemLevelMap: MapEx.MapExClass<number> = {};

    /**击杀伪人数量 */
    killedFakerCount: number = 0;
    /**奖励领取的状态 */
    rewardStateList: number[] = [];

    /**限购数据 */
    buyLimit: BuyLimit;

    // ------------------------v6-------------------------------
    /** 新的通关信息 */
    newFastPassTimeMap: MapEx.MapExClass<PlayerPassDataItem> = {};

    /** 这个数据的主人的userId */
    ownerId: string;

    // ------------------------v7-------------------------------
    // 这次升级会合并FastPassTimesMap与NewFastPastTimeMap
}

/** 类似与存档工具类 */
export class RouteDataHelper {
    private constructor() { }

    /** 当前的数据版本 - 数据升级记得更新版本号 */
    private static readonly CURRENT_VERSION: number = 7;

    private static getKey(userId: string, gameTheme: EGameTheme) {
        return `${userId}_RouteData_${gameTheme}`;
    }

    public static isSelfGame(gameTheme: EGameTheme) {
        return GameStart.GameTheme === gameTheme;
    }

    /** 每隔10分钟清理一次或主动清理的存档缓存 */
    private static cacheDataMap: Map<string, RouteData> = new Map();

    public static async reqGetData(userId: string, gameTheme: EGameTheme) {
        const key = this.getKey(userId, gameTheme);

        let routeData: RouteData;

        // 有缓存就拿
        if (this.cacheDataMap.has(key)) {
            routeData = this.cacheDataMap.get(key);
        }
        // 没有就创建
        else {
            routeData = await this.getRouteDataFromDB(userId, gameTheme);
            this.cacheDataMap.set(key, routeData);
            // 创建的时候设置一个延迟销毁的定时器
            setTimeout(() => { if (this.cacheDataMap.has(key)) { this.cacheDataMap.delete(key) } }, 10e3);
        }

        // 加个补丁
        this.checkUpdate(routeData, gameTheme);

        return routeData;
    }

    private static checkUpdate(routeData: RouteData, gameTheme: EGameTheme) {
        routeData.gameTheme = gameTheme;
        if (routeData.version && routeData.version >= this.CURRENT_VERSION) { return; }
        switch (routeData.version) {
            case 1:
                this.updateDataVersion1(routeData, gameTheme);
                break;
            case 2:
                this.updateDataVersion2(routeData);
                break;
            case 3:
                this.updateDataVersion3(routeData);
                break;
            case 4:
                this.updateDataVersion4(routeData);
                break;
            case 5:
                this.updateDataVersion5(routeData);
                break;
            case 6:
                this.updateDataVersion6(routeData);
                break;
            default:
                routeData.version = 1;
                break;
        }
        this.checkUpdate(routeData, gameTheme);
    }

    /** 更新第一版的数据 */
    private static updateDataVersion1(routeData: RouteData, gameTheme: EGameTheme) {
        routeData.version = 2;
        routeData.gameTheme = gameTheme;
        routeData.specialItemDataList = [];
        routeData.fearCoin = 0;
        // 这个经验需要根据时长计算一下
        routeData.totalExp = Number((routeData.totalGameTime / 60).toFixed(3));
        // 通关经验也保存一下
        MapEx.forEach(routeData.passInfoMap, (k, v) => {
            routeData.totalExp += v.passTimes * GameConfig.SubGlobal.PassBaseExp.number;
        })
    }

    /** 更新第二版的数据 */
    private static updateDataVersion2(routeData: RouteData) {
        routeData.version = 3;
        routeData.unlockedItemList = [];
        routeData.vip = new VIP();
        routeData.skins = [];
        routeData.wantTimes = GameConfig.SubGlobal.wantParams.number;
        routeData.dateMark = null;
    }

    /** 更新第三版的数据 */
    private static updateDataVersion3(routeData: RouteData) {
        routeData.version = 4;
        routeData.recommendState = false
    }

    private static updateDataVersion4(routeData: RouteData) {
        routeData.version = 5;
        routeData.itemLevelMap = {};
        routeData.killedFakerCount = 0;
        routeData.rewardStateList = [];
        routeData.buyLimit = new BuyLimit();
    }

    private static async updateDataVersion5(routeData: RouteData) {
        routeData.version = 6;
        // 更新烂掉的fastPassTimeMap
        let data = await PlayerRankData.getGlobalData(routeData.ownerId);
        if (!data || !data.newEndRankDataMap) {
            routeData.newFastPassTimeMap = {};
        } else {
            let passData = MapEx.get(data.newEndRankDataMap, routeData.gameTheme);
            routeData.newFastPassTimeMap = passData ? passData : {};
        }
    }

    private static async updateDataVersion6(routeData: RouteData) {
        routeData.version = 7;
        if (!routeData.newFastPassTimeMap) { routeData.newFastPassTimeMap = {} }
        MapEx.forEach(routeData.fastPassTimeMap, (k, v) => {
            if (!MapEx.has(routeData.newFastPassTimeMap, k)) {
                MapEx.set(routeData.newFastPassTimeMap, k, v);
            }
        });
        this.reqSetData(routeData.ownerId, routeData.gameTheme, [], []);
    }

    private static async getRouteDataFromDB(userId: string, gameTheme: EGameTheme) {
        let res: DataStorageResult;
        const key = this.getKey(userId, gameTheme);
        if (SystemUtil.isPIE) {
            res = await DataStorage.asyncGetData(key);
        } else {
            res = await DataStorage.asyncGetData(key);//(GameStart.GameTheme === EGameTheme.Hall) ? await DataStorage.asyncGetData(key) : await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(EGameTheme.Hall), key);
        }
        let routeData: RouteData;
        if (!res.data) { routeData = new RouteData(); }
        else { routeData = res.data; }
        // 新增玩家userId信息
        routeData.ownerId = userId;
        return routeData;
    }


    public static async reqSetData(userId: string, gameTheme: EGameTheme, properties: string[], values: any[]): Promise<void> {

        let resCode: DataStorageResultCode;
        // // 存数据肯定都是存到大厅主包上去
        // let gameTheme = GameStart.GameTheme;
        const key = this.getKey(userId, gameTheme);

        // console.log(`DEBUG >>> 准备保存一下数据key = ${key},  ${JSON.stringify(properties)}, ${JSON.stringify(values)}`);

        // 先拿数据
        const routeData = await this.reqGetData(userId, gameTheme);

        /** 游戏id - 存到大厅上去哈 */
        let gameId = RouteConst.getGameIdByGameTheme(EGameTheme.Hall);

        if (!SystemUtil.isPIE && StringUtil.isEmpty(gameId)) {
            console.error(`DEBUG ERROR >>> 游戏Id错误 gameId不能为空`);
            return;
        }

        // 解析并存储数据
        this.parseData(routeData, properties, values);

        if (this.cacheDataMap.has(key)) {
            this.cacheDataMap.set(key, routeData);
        }

        resCode = await DataStorage.asyncSetData(key, routeData);

        // 添加玩家等级监听
        if (properties.includes(RouteDataType.TotalExp)) {
            AchieveService.getAchieveIns(EAchieveType.PlayerLevel).listen(userId);
        }
        // 监听成就
        if (properties.includes(RouteDataType.PassInfoMap)) {
            AchieveService.getAchieveIns(EAchieveType.PassTimes).listen(userId);
        }

        if (resCode === DataStorageResultCode.Success) {
            // console.log(`DEBUG >>> 保存数据成功`);
        } else {
            console.error(`DEBUG >>> 保存数据失败，错误码：${JSON.stringify(resCode)},  ${JSON.stringify(properties)}, ${JSON.stringify(values)}`);
        }
    }

    /** 直接设值得属性列表 */
    private static readonly DirSetPropertyList: string[] = [RouteDataType.NewFastPassTimeMap, RouteDataType.buyLimit, RouteDataType.ItemLevelMap, RouteDataType.wantTimes, RouteDataType.dateMark, RouteDataType.UnlockedGraphList, RouteDataType.SpecialItemDataList, RouteDataType.FastPassTimeMap, RouteDataType.vip, RouteDataType.skins, RouteDataType.giftPack, RouteDataType.RecommendState];

    private static isDirSet(property: string) {
        return this.DirSetPropertyList.includes(property);
    }

    /** 一个数组，给数组push值 */
    private static readonly PushSetPropertyList: string[] = [RouteDataType.UnlockedItemList];

    private static isPushSet(property: string) {
        return this.PushSetPropertyList.includes(property);
    }

    /** 解析存储的数据 */
    private static parseData(routeData: RouteData, properties: string[], values: any[]) {
        properties.forEach((property: string, id) => {
            if (property === RouteDataType.PassInfoMap) {
                const newPassInfo: PassInfo = values[id];
                const key = newPassInfo.diff + "_" + newPassInfo.endingType;
                let passInfo = MapEx.get(routeData.passInfoMap, key);
                if (!passInfo) {
                    passInfo = newPassInfo;
                } else {
                    passInfo.passTimes += newPassInfo.passTimes;
                }
                MapEx.set(routeData.passInfoMap, key, passInfo);
            } else if (RouteDataHelper.isDirSet(property)) {
                routeData[property] = values[id];
            } else if (RouteDataHelper.isPushSet(property)) {
                routeData[property].push(values[id]);
            } else {
                routeData[property] += values[id];
            }
        });
    }
}