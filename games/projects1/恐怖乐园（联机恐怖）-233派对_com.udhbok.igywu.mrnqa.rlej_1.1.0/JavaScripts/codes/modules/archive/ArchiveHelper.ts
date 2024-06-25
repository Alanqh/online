/*
 * @Author       : dal
 * @Date         : 2023-11-09 11:24:50
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-28 18:35:43
 * @FilePath: \hauntedparadise\JavaScripts\codes\modules\archive\ArchiveHelper.ts
 * @Description  : 学校的存档
 */

import { GameConfig } from "../../../config/GameConfig";
import { Const, EGameTheme, GamesStartDefines, SubGameThemeArr } from "../../Defines";
import { MapEx } from "../../utils/MapEx";
import { BagItemData } from "../bag/BagDefine";
import { DegreeType } from "../blackboard/BoardDefine";
import { ArchiveBuff } from "../buff/BuffData";
import { INIT_HP_NUM, INIT_LIFE_NUM } from "../player/PlayerData";
import { ProcedureModuleS } from "../procedure/ProcedureModuleS";
import BirthInfoHelper from "../procedure/util/BirthInfoHelper";
import RecordData from "../record/RecordData";
import RouteConst from "../route/RouteConst";
import ArchiveModuleS from "./ArchiveModuleS";

/** 没人的最多存档数 */
export const MaxArchiveNum: number = 3;

/**
 * 存档数据属性值property类型
 */
export const ArchiveDataType = {
    // 版本
    VERSION: "version",
    // 难度
    DEGREE: "degree",
    // 复活点
    BIRTHPOS: "birthPos",
    //复活点朝向
    BIRTHROT: "birthRot",
    // 是否初始化过背包初始物品
    BAGITEMINIT: "bagItemInit",
    // 背包道具
    BAGITEMS: "bagItems",
    //
    INITSCENEPROPS: "initSceneProps",
    // 线索(生成的时候给一个id)
    CLUES: "clues",
    //是否初始化过线索
    CLUESINIT: "isInitClues",
    // 交互物
    INTER: "interObjs",
    // 密码
    PASSWORD: "password",
    // 复活次数
    LIFE: "lifeNum",
    // 受伤次数
    BeHurtTimes: "beHurtTimes",
    // 生命值
    HP: "hp",
    // 生存天数
    ALIVEDAY: "aliveDay",
    // 游戏进行时长
    TIME: "gameTime",
    // 已解锁的笔记
    UNLOCKEDNOTES: "unlockedNotes",
    BuffList: "buffList",
    //红色的月亮
    RedMoon: "redMoon",
    IsGuideComplete: "isGuideComplete",
    GuideStep: "guideStep",

    skins: "skins",
    /**当前使用的皮肤id */
    curSkin: "curSkin",

    devData: "devData"

}

export class ClueSaveData {
    public assid: number;
    public loc: number[];
    public rot: number[];
}
export type TForgingInfo = {
    /**锻造任务唯一id */
    taskId: string;
    /**锻造的道具ID */
    itemID: number;
    /**锻造的数量 */
    forgingCount: number;
    /**锻造结束的时间 */
    forgingEndTime: number;
}
/**孤岛养成数据 */
export class DevelopData {
    /**已解锁的建筑id */
    unlockedList: number[] = [];
    /**图纸碎片 */
    fragments: number = 0;
    /**保存所有锻造任务 */
    forgingMap: MapEx.MapExClass<TForgingInfo> = {};

}

/**
 * 存档数据实体类
 */
export class ArchiveData {

    //版本
    version: number = 0;

    /** 经过第一次存档才初始化，用来判断有没有这个存档 */
    isInit: boolean = false;

    // 难度
    degree: number = DegreeType.Simple;

    // 复活点
    birthPos: Vector = BirthInfoHelper.instance.birthPos;

    //复活点的旋转
    birthRot: number[] = [];

    //是否初始化过背包初始物品
    bagItemInit: boolean = false;

    // 背包道具
    bagItems: BagItemData[] = [];

    //是否初始化了场景物品
    initSceneProps: boolean = false;

    // 线索(生成的时候给一个id)
    clues: MapEx.MapExClass<ClueSaveData> = {}

    // 是否初始化过线索
    isInitClues: boolean = false;

    // 交互物
    interObjs: MapEx.MapExClass<number> = {};

    // 密码
    password: MapEx.MapExClass<string> = {};

    // 复活次数
    lifeNum: number = INIT_LIFE_NUM;

    // 生命值
    hp: number = INIT_HP_NUM;

    // 启用了时间系统会用到的生存天数
    aliveDay: number = 0;

    // 游戏进行时长
    gameTime: number = 0;

    // 创建日期的时间戳
    createTime: number;

    // 已解锁的笔记
    unlockedNotes: number[] = [];

    // buff列表
    buffList: ArchiveBuff[] = [];

    //redMoonNum
    redMoon: number = 0;

    // 引导是否完成
    isGuideComplete: boolean = false;

    // 引导第几步
    guideStep: number = 1;
    /**当前使用的皮肤id */
    curSkin: number = 1;

    /** 死亡次数 - 默认是零，使用了复活丹后复活，死亡次数+1 */
    deathTimes: number = 0;

    /** 受伤次数 - 默认是零，每过一天就+1，死亡后复活不清零 */
    beHurtTimes: number = 0;

    devData: DevelopData = new DevelopData()

}

/** 毫秒 */
const DELETE_CACHE_TIME = 10e3;

class DataMigration {

    /** 是否完成数据迁移 */
    isFinish: boolean = false;
}

/**
 * 存档条工具类，辅助完成存档的增删改查操作，仅供服务端调用
 * 存档key规则：前缀Prefix + "Archive_" + userId + "_" + 存档序号，如：ScarySchool_Archive_46813651_1
 * 存档内容value：难度、画面风格、道具、交互物、生命值、游戏进行时长等
 */
export class ArchiveHelper {

    /** 每隔10分钟清理一次或主动清理的存档缓存 */
    private static _cacheArchiveDataMap: Map<string, ArchiveData> = new Map();

    public static async reqQueryDataExist(userId: string, id: number): Promise<boolean> {
        let archiveData = await this.reqGetData(userId, id);
        return archiveData.isInit;
    }

    /**
     * 这是以前游戏的存档key
     * @param userId 
     * @param archiveId 
     * @returns 
     */
    private static getOldKey(userId: string, archiveId: number) {
        return `ScarySchool_Archive_${userId}_${archiveId}`
    }

    /** 
     * 检测数据迁移
     * 将玩家在以前子包的游戏数据存档迁移到多场景这个包
     */
    public static async checkDataMigration(userId: string) {
        if (SystemUtil.isPIE) { return; }
        let dataMigrationKey = `${userId}_DataISMigration_${GamesStartDefines.gameTheme}`;
        let dataRes = await DataStorage.asyncGetData(dataMigrationKey);
        let dataMigration = dataRes.data as DataMigration;
        if (!dataMigration) { dataMigration = new DataMigration(); }
        // 数据迁移已完成
        if (dataMigration.isFinish) { return; }

        console.log(`DEBUG>>> 检测到玩家 ${userId} 还没完成存档数据迁移，开始对其迁移`);

        // 在大厅时，一次性迁移所有子游戏的数据
        if (GamesStartDefines.gameTheme === EGameTheme.Hall) {
            // 一下子迁移所有游戏的存档
            await SubGameThemeArr.forEach(async (v: EGameTheme) => {
                // 将原包数据放在新包
                for (let index = 0; index < 3; index++) {
                    let dataRes = await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(v), this.getOldKey(userId, index));
                    let archiveData = dataRes.data as ArchiveData;
                    if (archiveData) {
                        await DataStorage.asyncSetData(this.getNewKey(userId, index, v), archiveData);
                        console.log(`DEBUG>>> 存档${index}数据迁移完成 ${JSON.stringify(archiveData)}`);
                    }
                }
            });
        }
        // 进入其他游戏时再迁移一下各游戏中的数据
        else {
            // 还有一些需要迁移存档数据的通知一下，比如说孤岛的建筑存档
            Event.dispatchToLocal("OnDataMigration", userId);
        }

        // 完成传输标记
        dataMigration.isFinish = true;
        DataStorage.asyncSetData(dataMigrationKey, dataMigration);

        console.log(`DEBUG>>> 玩家 ${userId} 存档数据迁移完成`);
    }

    /**
     * 从跳游戏改为切场景起，就用这个key来进行存数据与取数据了
     * @param userId 
     * @param archiveId 
     * @returns 
     */
    private static getNewKey(userId: string, archiveId: number, gameTheme?: EGameTheme) {
        return `${userId}_Archive_${gameTheme ? gameTheme : GamesStartDefines.gameTheme}_${archiveId}`;
    }

    /**
     * 供外部直接获取存档的方法
     * @param userId 玩家唯一id
     * @param archiveId 存档序号 - 从0开始，默认是0
     * @returns 存档数据，如果是null代表还没有该存档
     */
    public static async reqGetData(userId: string, archiveId: number, gameTheme?: EGameTheme): Promise<ArchiveData> {
        if (GamesStartDefines.gameTheme == EGameTheme.Hall) {
            return new ArchiveData();
        }
        if (archiveId === -1) { return; }
        let dataKey = this.getNewKey(userId, archiveId, gameTheme);
        let archiveData: ArchiveData;
        // 有缓存就拿
        if (this._cacheArchiveDataMap.has(dataKey)) {
            archiveData = this._cacheArchiveDataMap.get(dataKey);
        }
        // 没有就创建
        else {
            archiveData = await this.getDataByDataStorage(dataKey);
            // 创建的时候设置一个延迟销毁的定时器
            setTimeout(() => { if (this._cacheArchiveDataMap.has(dataKey)) { this._cacheArchiveDataMap.delete(dataKey) } }, DELETE_CACHE_TIME);
        }
        return archiveData;
    }

    /**获取局内养成数据 */
    public static async getDevData(userId: string, archiveId: number, gameTheme?: EGameTheme) {
        let archiveData = await this.reqGetData(userId, archiveId, gameTheme)
        if (!archiveData.devData) {
            archiveData.devData = new DevelopData();
            await this.reqSetData(userId, [ArchiveDataType.devData], [archiveData.devData]);
        }
        return archiveData
    }

    /** 获取所有存档数据 */
    public static async reqGetAllData(userID: string, gameTheme?: EGameTheme): Promise<ArchiveData[]> {
        let archiveDataList: ArchiveData[] = [];
        for (let index = 0; index < MaxArchiveNum; index++) { archiveDataList.push(await this.reqGetData(userID, index, gameTheme)); }
        return archiveDataList;
    }

    /**
     * 根据存档序号id获取存档数据
     * @param userID 玩家唯一id
     * @param id 存档序号 - 从0开始，默认是0
     * @returns 存档数据，如果是null代表还没有该存档
     */
    private static async getDataByDataStorage(dataKey: string): Promise<ArchiveData> {
        let dataRes: DataStorageResult;
        dataRes = await DataStorage.asyncGetData(dataKey);

        if (dataRes.code === DataStorageResultCode.Success) {
            let archiveData: ArchiveData = dataRes.data;
            // 没有这个数据或者这个数据并没有初始化，新创建一个数据
            if (!dataRes.data) { archiveData = new ArchiveData(); }
            // 有可能还没存这个key，返回的结果就是一个undefined
            this._cacheArchiveDataMap.set(dataKey, archiveData);
            return archiveData;
        } else {
            console.error("DEBUG MyTypeERROR>>>获取数据失败，错误码：" + dataRes.code);
            // 可能会请求超限
            return null;
        }
    }

    /** 临时存档数据缓存，在存入成功时会被删除，因为set和remove对同一个key的操作会导致其被锁定6秒，所以需要缓存后面push进来的操作，然后在锁定解除时继续setData */
    private static _tempArchiveDataMap: Map<string, ArchiveData> = new Map();

    /** 设置数据的限制列表 */
    private static restrictionList: string[] = [];

    /** 等待时间(毫秒) */
    private static readonly waitTime: number = 20;

    /**
     * 根据属性和value值存储游戏进度（对同一个key每6秒钟只能操作一次，否则会被锁定）保存除游戏进行时间以外字段时，会自动保存一次当前的游戏进行时间
     * @param userID 玩家唯一id
     * @param id 存档序号 - 从0开始，默认是0
     * @param properties string数组代表ArchiveData类的字段
     * @param values any数组ArchiveData对应字段的value值
     * @param isForce 是否强制存档，就不会考虑是否还在冷却中
     * @returns true or false
     */
    public static async reqSetData(userID: string, properties: string[], values: any[], isForce: boolean = false, curArchiveId: number = -1): Promise<boolean> {
        const procedureScript = ProcedureModuleS.getScriptByUserID(userID);

        // // 玩家死亡中不能存
        // if (procedureScript.isDeath) { return; }

        let archiveId = procedureScript.archiveID;
        if (archiveId === -1 && curArchiveId === -1) { return false; }
        if (archiveId === -1 && curArchiveId != -1) { archiveId = curArchiveId; }
        let dataKey = this.getNewKey(userID, archiveId);

        let archiveData: ArchiveData;
        // 有缓存还没保存的情况
        if (this._tempArchiveDataMap.has(dataKey)) {
            archiveData = this._tempArchiveDataMap.get(dataKey);
        } else {
            archiveData = await this.reqGetData(userID, archiveId);
            if (!archiveData) { archiveData = new ArchiveData(); }
        }
        // 初始化
        if (!archiveData.isInit) { archiveData.isInit = true; archiveData.createTime = Date.now(); }

        // 如果没有时间，则主动保存一次时间
        if (!properties.includes(ArchiveDataType.TIME)) {
            const useTime = procedureScript.saveUseTime();
            if (useTime) {
                archiveData[ArchiveDataType.TIME] += useTime;
            }
        }

        properties.forEach((property, id) => {
            // 保存记录最大存活天数
            if (property.includes(ArchiveDataType.ALIVEDAY)) {
                const recordData = DataCenterS.getData(userID, RecordData);
                recordData.saveMaxAliveDay(values[id]);
            }

            if (property === ArchiveDataType.TIME || property === ArchiveDataType.BeHurtTimes) {
                archiveData[property] += values[id];
            } else if (property === ArchiveDataType.BAGITEMS) {
                // 特殊道具不需要在这里持久化
                archiveData[property] = values[id].filter(v => { return GameConfig.Item.getElement(v.cfgId).type != Const.SpecialItemType });
            } else {
                archiveData[property] = values[id];
            }
        });

        this._cacheArchiveDataMap.set(dataKey, archiveData);
        // 六秒钟存一次
        if (this.restrictionList.includes(dataKey) && !isForce) {
            // console.error(`DEBUG ERROR>>> 存储超频，先缓存，下次存数据的时候再存`);
            this._tempArchiveDataMap.set(dataKey, archiveData);
        } else {
            setTimeout(async () => {
                let resCode: DataStorageResultCode;
                if (this.lockList.includes(dataKey)) {
                    console.error("DEBUG>>> 这个key正在被锁定中，存档失败");
                    return false;
                }
                resCode = await DataStorage.asyncSetData(dataKey, archiveData);
                switch (resCode) {
                    case DataStorageResultCode.Success:
                        console.log(`DEBUG>>> 存档成功，当前游戏进行时间：${JSON.stringify(archiveData[ArchiveDataType.TIME])}存档内容key: ${JSON.stringify(properties)}`);
                        // 保存成功，删除缓存
                        this._tempArchiveDataMap.delete(dataKey);
                        this.restrictionList.push(dataKey);
                        setTimeout(() => {
                            this.restrictionList.includes(dataKey) && this.restrictionList.splice(this.restrictionList.indexOf(dataKey), 1);
                        }, 6e3);
                        return true;
                    case DataStorageResultCode.RequestTooFrequent:
                        // console.error(`DEBUG ERROR>>> 存储超频，先缓存，下次存数据的时候再存`);
                        this._tempArchiveDataMap.set(dataKey, archiveData);
                        return false;
                    default:
                        console.error(`DEBUG MyTypeERROR>>> 存储数据失败，错误码${resCode}，请联系管理员解决`);
                        return false;
                }
            }, this.waitTime);
        }
    }

    /** 锁列表，在锁列表中的key短时间无法继续存档 */
    private static lockList: string[] = [];

    /**
     * 请求删档
     * @param userId 玩家唯一id
     * @param archiveId 存档序号 - 从0开始，默认是0
     */
    public static async reqDeleteData(userId: string, archiveId: number): Promise<void> {
        if (archiveId === -1) { return; }
        // 将数据复写为null
        setTimeout(async () => {
            let dataKey = this.getNewKey(userId, archiveId);
            let resCode: DataStorageResultCode;
            resCode = await DataStorage.asyncSetData(dataKey, new ArchiveData());
            switch (resCode) {
                case DataStorageResultCode.Success:
                    if (this._tempArchiveDataMap.has(dataKey)) { this._tempArchiveDataMap.delete(dataKey) }
                    if (this._cacheArchiveDataMap.has(dataKey)) { this._cacheArchiveDataMap.delete(dataKey) }
                    ModuleService.getModule(ArchiveModuleS).net_initClickCount(userId, archiveId);
                    console.log(`DEBUG>>> 删档成功, 这个key将会被暂时锁定两秒`);
                    this.lockList.push(dataKey);
                    Event.dispatchToClient(Player.getPlayer(userId), "DeleteArchiveSuccess");
                    Event.dispatchToLocal("DeleteArchiveSuccess", userId, archiveId);
                    setTimeout(() => { this.lockList.splice(this.lockList.indexOf(dataKey), 1); }, 5e2);
                    break;
                case DataStorageResultCode.RequestTooFrequent:
                    console.error(`DEBUG MyTypeERROR>>> 删档失败，请求太快了`);
                    // 6秒后再删一次
                    setTimeout(() => {
                        this.reqDeleteData(userId, archiveId);
                    }, 6e3);
                    break;
                default:
                    console.error(`DEBUG MyTypeERROR>>> 删档失败，错误码${resCode}，请联系管理员解决`);
                    break;
            }
        }, ArchiveHelper.waitTime);
    }
}