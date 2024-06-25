/*
 * @Author       : aolin.dai aolin.dai@appshahe.com
 * @Date         : 2023-07-17 18:05:25
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-05 14:06:07
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRank\PlayerRankData.ts
 * @Description  : 玩家的本地排行榜数据
 */

import { EGameTheme, GamesStartDefines } from "../../Defines";
import { MapEx } from "../../utils/MapEx";
import { DegreeType } from "../blackboard/BoardDefine";
import RouteConst from "../route/RouteConst";
import { RouteDataHelper, RouteDataType } from "../route/RouteData";
import { GlobalRankDefine } from "./GlobalRankDefine";

export class PlayerPassDataItem {
    public passTimeMap: MapEx.MapExClass<number> = {};

    /**
     * 
     * @param degree 
     * @param passTime 
     * @returns 是否设置有效
     */
    public static setPassTime(item: PlayerPassDataItem, degree: DegreeType, passTime: number) {
        if (!this.isBreakingRecord(item, degree, passTime)) { return false; }
        MapEx.set(item.passTimeMap, degree, passTime);
        return true;
    }

    /** 是否打破记录 */
    public static isBreakingRecord(item: PlayerPassDataItem, degree: DegreeType, passTime: number) {
        return this.getRankScore(item, degree) === -1 || this.getRankScore(item, degree) > passTime;
    }

    /**
     * 获取某难度的通关时间
     * @param type 难度类型
     * @returns 通关时间 如果是-1 代表当前难度未通关
     */
    public static getRankScore(item: PlayerPassDataItem, type: DegreeType) {
        // 有新模式排行榜数据，直接添加
        if (!MapEx.has(item.passTimeMap, type)) {
            MapEx.set(item.passTimeMap, type, -1);
        }
        return MapEx.get(item.passTimeMap, type);
    }
}

export default class PlayerRankData extends Subdata {

    /**
     * 通过的难度
     * @deprecated 不再维护（2024/5/23），用newRankDataMap
     */
    @Decorator.persistence()
    rankDataMap: MapEx.MapExClass<number> = {};

    /** 已通过的关卡 key 是游戏主题 */
    @Decorator.persistence()
    newRankDataMap: MapEx.MapExClass<MapEx.MapExClass<number>> = {};

    /**
     * @deprecated 不再维护（2024/5/23），用newEndRankDataMap
     */
    @Decorator.persistence()
    endRankDataMap: MapEx.MapExClass<PlayerPassDataItem> = {};

    /** 已通过的关卡 key 是游戏主题 */
    @Decorator.persistence()
    newEndRankDataMap: MapEx.MapExClass<MapEx.MapExClass<PlayerPassDataItem>> = {};

    public getNewRankDataMap(gameTheme?: EGameTheme) {
        if (!gameTheme) { gameTheme = GamesStartDefines.gameTheme; }
        if (!(MapEx.has(this.newRankDataMap, gameTheme))) {
            MapEx.set(this.newRankDataMap, gameTheme, {});
        }
        return MapEx.get(this.newRankDataMap, gameTheme);
    }

    /**
     * @param gameTheme 
     * @returns 
     */
    public getNewEndRankDataMap(gameTheme?: EGameTheme) {
        if (!gameTheme) { gameTheme = GamesStartDefines.gameTheme; }
        if (!(MapEx.has(this.newEndRankDataMap, gameTheme))) {
            MapEx.set(this.newEndRankDataMap, gameTheme, {});
        }
        return MapEx.get(this.newEndRankDataMap, gameTheme);
    }

    /** 需要该数据的游戏 */
    private readonly needFixGameThemeArr: EGameTheme[] = [EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town];

    /**
     * 初始化通关难度map重置迁移一次数据
     * 之前迁移的数据有问题，重新迁移一次
     */
    private reMigrateData() {
        this.needFixGameThemeArr.forEach(v => {
            MapEx.set(this.newRankDataMap, v, this.rankDataMap);
        });
        this.needFixGameThemeArr.forEach(v => {
            MapEx.set(this.newEndRankDataMap, v, this.endRankDataMap);
        });
    }

    /** 数据迁移 */
    public async migrate(userId: string) {
        const oldKey = `${userId}_SubData_PlayerRankData`;
        const dataRes = (await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(GamesStartDefines.gameTheme), oldKey)).data as PlayerRankData;
        MapEx.set(this.newRankDataMap, GamesStartDefines.gameTheme, MapEx.copy(dataRes["rankDataMap"]));
        MapEx.set(this.newEndRankDataMap, GamesStartDefines.gameTheme, MapEx.copy(dataRes["endRankDataMap"]));
        this.save(true);
        console.log(`DEBUG>>> 迁移PlayerRankData数据成功 this.rankDataMap = ${JSON.stringify(this.newRankDataMap)} this.endRankDataMap = ${JSON.stringify(this.newEndRankDataMap)}`);
    }

    /** 是否需要重新迁移数据 */
    private needReMigrate = true;

    protected override initDefaultData(): void {
        this.needReMigrate = false;
        GlobalRankDefine.RankDataTypeList.forEach(type => { MapEx.set(this.getNewRankDataMap(), type, -1); })
        this.save(true);
    }

    protected get version(): number {
        return 2;
    }

    protected onDataInit(): void {
        while (this.currentVersion != this.version) {
            switch (this.currentVersion) {
                case 1:
                    this.currentVersion = 2;
                    this.needReMigrate && this.reMigrateData();
                    break;
                default:
                    console.error("未处理的数据版本", this.currentVersion);
                    this.currentVersion = this.version;
                    break;
            }
            this.save(false);
        }
    }

    /**
     * 获取某难度的通关时间
     * @param type 难度类型
     * @returns 通关时间 如果是-1 代表当前难度未通关
     */
    public getRankScore(type: DegreeType) {
        // 有新模式排行榜数据，直接添加
        if (!MapEx.has(this.getNewRankDataMap(), type)) {
            MapEx.set(this.getNewRankDataMap(), type, -1);
            this.save(true);
        }
        return MapEx.get(this.getNewRankDataMap(), type);
    }

    public setRankData(type: DegreeType, passTime: number) {
        if (!this.isBreakingRecord(type, passTime)) { return; }
        MapEx.set(this.getNewRankDataMap(), type, passTime);
        this.save(true);
    }

    /** 是否打破记录 */
    public isBreakingRecord(degree: DegreeType, passTime: number) {
        return this.getRankScore(degree) === -1 || this.getRankScore(degree) > passTime;
    }

    public updateEndingData(passId: number, degree: number, time: number, userId: string) {
        if (!MapEx.has(this.getNewEndRankDataMap(), passId)) {
            MapEx.set(this.getNewEndRankDataMap(), passId, new PlayerPassDataItem());
        }

        let item = MapEx.get(this.getNewEndRankDataMap(), passId)

        if (PlayerPassDataItem.setPassTime(item, degree, time)) {
            RouteDataHelper.reqSetData(userId, GamesStartDefines.gameTheme, [RouteDataType.NewFastPassTimeMap], [this.getNewEndRankDataMap()]);
            this.save(true);
        }
    }

    /**
     * 支持获取一个玩家全服的数据
     * @param userId 玩家id
     * @returns 
     */
    public static async getGlobalData(userId: string) {
        const key = `${userId}_SubData_PlayerRankData`;
        return (await DataStorage.asyncGetData(key)).data as PlayerRankData;
    }

    public getEndingData(passId: number) {
        return MapEx.get(this.getNewEndRankDataMap(), passId);
    }

    /**
     * 查询是否通关了指定的结局
     * @param passId 结局id
     */
    public isPassEnding(passId: number) {
        return MapEx.has(this.getNewEndRankDataMap(), passId);
    }
}