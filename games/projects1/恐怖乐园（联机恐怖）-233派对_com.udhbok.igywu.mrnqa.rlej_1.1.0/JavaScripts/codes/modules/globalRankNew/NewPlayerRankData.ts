/*
 * @Author       : aolin.dai aolin.dai@appshahe.com
 * @Date         : 2023-07-17 18:05:25
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-04 11:26:56
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\NewPlayerRankData.ts
 * @Description  : 玩家的本地排行榜数据
 */

import { EGameTheme, PassTimesGameTheme } from "../../Defines";
import { LogService } from "../../ui/utils/LogPanel";
import { MapEx } from "../../utils/MapEx";
import { ArchiveData, ArchiveHelper } from "../archive/ArchiveHelper";
import { IDCardDataHelper } from "../idcard/IDCardDataHelper";
import RecordData from "../record/RecordData";
import { PassInfo } from "../route/RouteData";
import { RouteDefine } from "../route/RouteDefine";
import { BaseRankDataInfo, EBaseRankDataType } from "./NewRankDefine";
import { NewRankModuleS } from "./NewRankModuleS";

export class NewPlayerRankData extends Subdata {

    @Decorator.persistence()
    baseRankInfo: BaseRankDataInfo = new BaseRankDataInfo();

    /**
     * 支持获取一个玩家全服的数据
     * @param userId 玩家id
     * @returns 
     */
    public static async getGlobalData(userId: string) {
        const key = `${userId}_SubData_NewPlayerRankData`;
        return (await DataStorage.asyncGetData(key)).data as NewPlayerRankData;
    }

    /**
     * 支持设置一个一个玩家全服数据
     * @param userId 玩家id
     */
    public static setGlobalData(userId: string, rankData: NewPlayerRankData) {
        if (!rankData) { return; }
        const key = `${userId}_SubData_NewPlayerRankData`;
        DataStorage.asyncSetData(key, rankData);
    }

    protected initDefaultData(): void {
        // 拉取一次玩家初始排行数据
        if (SystemUtil.isClient()) { return; }
    }

    /** 
     * 玩家每次上线同步下数据
     */
    public syncData() {
        setTimeout(() => {
            const recordData = DataCenterS.getData(this["mUserId"], RecordData);
            if (recordData && recordData.baseRecordInfo) {
                LogService.addServerLog(`初始化玩家${this["mUserId"]}的等级排行信息${recordData.baseRecordInfo.playerLevel}`);

                // 现在的等级
                this.saveRankInfo(EBaseRankDataType.PlayerLevel, recordData.baseRecordInfo.playerLevel);

                // 存活天数 读取次存档中的数据
                ArchiveHelper.reqGetAllData(this["mUserId"], EGameTheme.Graveyard).then((archiveDataArr: ArchiveData[]) => {
                    archiveDataArr.forEach(v => { recordData.saveMaxAliveDay(v.aliveDay); });
                    LogService.addServerLog(`初始化玩家${this["mUserId"]}的孤岛存活天数排行信息${recordData.baseRecordInfo.maxAliveDay}`);
                    this.saveRankInfo(EBaseRankDataType.GraveyardAliveDay, recordData.baseRecordInfo.maxAliveDay);
                });
            }

            // 魅力值
            IDCardDataHelper.reqGetData(this["mUserId"]).then(data => {
                LogService.addServerLog(`初始化玩家${this["mUserId"]}的魅力值排行信息${data.charmVal}`);
                this.saveRankInfo(EBaseRankDataType.CharmValue, data.charmVal);
            });

            // 通关次数
            RouteDefine.getAllRouteData(this["mUserId"]).then(routeDataArr => {
                routeDataArr.forEach((routeData) => {
                    if (PassTimesGameTheme.includes(routeData.gameTheme)) {
                        // 当前游戏的通关次数
                        let curPassTimes = 0;
                        MapEx.forEach(routeData.passInfoMap, (key, passInfo: PassInfo) => {
                            curPassTimes += passInfo.passTimes;
                        })
                        LogService.addServerLog(`初始化玩家${this["mUserId"]}的${routeData.gameTheme}通关次数排行信息${curPassTimes}`);
                        this.saveGameThemePassTimes(routeData.gameTheme, curPassTimes);
                    }
                });
            });
        }, 3e3);
    }

    /**
     * 保存不同游戏通关次数
     * @param gameTheme 游戏主题
     * @param passTimes 通关次数
     */
    public saveGameThemePassTimes(gameTheme: EGameTheme, passTimes: number) {
        switch (gameTheme) {
            case EGameTheme.School:
                this.saveRankInfo(EBaseRankDataType.SchoolPassTimes, passTimes);
                break;
            case EGameTheme.Hospital:
                this.saveRankInfo(EBaseRankDataType.HospitalPassTimes, passTimes);
                break;
            case EGameTheme.Town:
                this.saveRankInfo(EBaseRankDataType.TownPassTimes, passTimes);
                break;
        }
    }

    /**
     * 保存排行信息
     * @param type 类型
     * @param dataVal 值 
     */
    public saveRankInfo(type: EBaseRankDataType, dataVal: number) {
        if (SystemUtil.isClient()) { return; }
        if (dataVal == this.baseRankInfo[type]) { return; }
        // 不能比之前的值小
        if (dataVal < this.baseRankInfo[type]) {
            console.error(`DEBUG MyTypeError>>> 设置新的排行榜数据失败，不能比之前的数据${JSON.stringify(this.baseRankInfo)}小, type: ${type} dataVal: ${dataVal}`);
            return;
        }
        ModuleService.getModule(NewRankModuleS).updateGlobalRankInfo(this["mUserId"], type, dataVal);
        this.baseRankInfo[type] = dataVal;
        this.save(true);
    }
}