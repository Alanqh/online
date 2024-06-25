/*
 * @Author       : dal
 * @Date         : 2024-05-08 09:41:42
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-28 16:29:08
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\AchieveModuleData.ts
 * @Description  : 
 */

import { EGameTheme } from "../../Defines";
import { MapEx } from "../../utils/MapEx";
import { ArchiveHelper } from "../archive/ArchiveHelper";
import RecordData from "../record/RecordData";
import { AchieveService, EAchieveType } from "./AchieveDefine";

export default class AchieveModuleData extends Subdata {

    /** 成就积分 */
    @Decorator.persistence()
    points: number;

    /** 成就等级 */
    @Decorator.persistence()
    level: number;

    levelChangeAction: Action = new Action();

    @Decorator.persistence()
    finishTimeStampMap: MapEx.MapExClass<number> = {};

    /** 已完成的成就列表 */
    @Decorator.persistence()
    finishedArr: number[];

    achieveFinishAction: Action = new Action();

    /** 当前的数据版本 - 用于升级用 */
    protected get version(): number {
        return 1;
    }

    /**
     * 支持获取一个玩家全服的数据
     * @param userId 玩家id
     * @returns 
     */
    public static async getGlobalData(userId: string) {
        const key = `${userId}_SubData_AchieveModuleData`;
        return (await DataStorage.asyncGetData(key)).data as AchieveModuleData;
    }

    /**
     * 支持设置一个一个玩家全服数据
     * @param userId 玩家id
     */
    public static setGlobalData(userId: string, data: AchieveModuleData) {
        if (!data) { return; }
        const key = `${userId}_SubData_AchieveModuleData`;
        DataStorage.asyncSetData(key, data);
    }

    protected async initDefaultData(): Promise<void> {
        this.level = 1;
        this.points = 0;
        this.finishedArr = [];
        this.save(true);
        if (SystemUtil.isServer()) {
            // 记录数据
            const recordData = DataCenterS.getData(this["mUserId"], RecordData);

            // 成就数据初始化 - 有可能有以前完成过的成就：给处理掉
            const allArchiveDataArr = await ArchiveHelper.reqGetAllData(this["mUserId"], EGameTheme.Graveyard);
            allArchiveDataArr.forEach(v => {
                recordData.saveMaxAliveDay(v.aliveDay);
                AchieveService.getAchieveIns(EAchieveType.AliveDayCount).listen(this["mUserId"], v.aliveDay);
            });

            AchieveService.getAchieveIns(EAchieveType.PassTimes).listen(this["mUserId"]);
            console.log(`DEBUG>>> 初始化成就数据 userId: ${this["mUserId"]}`);
        }
    }

    /** 用来数据升级 */
    protected onDataInit(): void {

    }

    /**
     * 检查成就是否完成
     * @param achieveId 
     */
    public checkAchieveIsFinish(achieveId: number) {
        if (!this.finishedArr) { this.finishedArr = []; }
        return this.finishedArr.includes(achieveId);
    }

    /**
     * 保存新的成就
     * @param achieveId 成就id
     */
    public saveNewAchieve(achieveId: number) {
        if (this.checkAchieveIsFinish(achieveId)) {
            console.error(`DEBUG MyTypeError>>> 保存成就失败 成就${achieveId}已完成`);
            return false;
        }
        const cfg = AchieveService.getAchieveCfg(achieveId);
        if (!cfg) {
            console.error(`DEBUG MyTypeError>>> 保存成就失败 没这个成就${achieveId}配置`);
            return false;
        }
        // 前置成就是否完成
        if (cfg.preCondition != 0 && !this.checkAchieveIsFinish(cfg.preCondition)) {
            console.error(`DEBUG MyTypeError>>> 保存成就失败 这个成就${achieveId} 之前的成就 ${cfg.preCondition}还没有完成`);
            return false;
        }
        this.finishedArr.push(achieveId);
        this.points += cfg.points;
        MapEx.set(this.finishTimeStampMap, achieveId, Date.now());
        this.save(true);
        this.achieveFinishAction.call(achieveId);
        return true;
    }

    /**
     * 批量保存新的成就
     * @param achieveIdArr 成就id列表
     */
    public saveNewAchieves(achieveIdArr: number[]) {
        if (achieveIdArr.length === 0) { return; }
        achieveIdArr.sort().forEach(v => {
            this.saveNewAchieve(v);
        });
    }

    /** 检查是否可升级 */
    public checkCanLevelUp() {
        return this.points >= AchieveService.getLevelCfg(this.level).requireScore;
    }

    /**
     * 检擦是否达到最高等级
     */
    public checkIsMaxLevel() {
        return this.level >= AchieveService.maxLevel;
    }

    /**
     * 保存新的等级 - 实际就是升级
     * @param level 
     */
    public saveNewLevel() {
        if (!this.checkCanLevelUp()) {
            console.error(`DEBUG MyTypeError>>> 保存新的成就等级失败，当前积分${this.points}还没有达成当前等级${this.level}积分升级条件`);
            return false;
        }
        if (this.checkIsMaxLevel()) {
            console.error(`DEBUG MyTypeError>>> 升级失败，不能超过成就最高等级${AchieveService.maxLevel}`);
            return false;
        }
        this.level += 1;
        this.save(true);
        this.levelChangeAction.call(this);
        return true;
    }
}