/*
 * @Author       : dal
 * @Date         : 2024-05-08 13:36:12
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-28 16:07:20
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\Achievement.ts
 * @Description  : 
 */

import { IAchievementElement } from "../../../../config/Achievement";
import RecordData from "../../record/RecordData";
import { AchieveService } from "../AchieveDefine";
import AchieveModuleData from "../AchieveModuleData";

/** 成就实例map */
export namespace AchievementInsMap {
    export const achievementMapC: Map<string, AchievementC> = new Map<string, AchievementC>();
    export const achievementMapS: Map<string, AchievementS> = new Map<string, AchievementS>();
}

/** 成就注册器 */
export function registerAchievementC<T extends { new(...args: any[]): AchievementC }>(constructor: T): T {
    if (SystemUtil.isClient()) {
        const instance = new constructor();
        AchievementInsMap.achievementMapC.set(instance.constructor.name, instance);
        return constructor;
    }
    else {
        return constructor;
    }
}

/** 成就注册器 */
export function registerAchievementSAndC<T extends { new(...args: any[]): AchievementS | AchievementC }>(constructor: T): T {
    if (SystemUtil.isServer()) {
        let instance = new constructor() as AchievementS;
        AchievementInsMap.achievementMapS.set(instance.constructor.name, instance);
        return constructor;
    }
    else {
        let instance = new constructor() as AchievementC;
        // 客户端也注册一下，需要去拿进度信息
        AchievementInsMap.achievementMapC.set(instance.constructor.name, instance);
        return constructor;
    }
}

abstract class Achievement {

    constructor() {
        ModuleService.ready().then(() => { this.onReg(); })
    }

    protected abstract getData(player: Player): AchieveModuleData;

    public cfgArr: IAchievementElement[] = [];

    protected onReg(): void {
        this.cfgArr = AchieveService.getAllAchieveCfg().filter(v => { return v.targetType === this.constructor.name });
        console.error(`DEBUG>>> 成就类型${this.constructor.name}注册成功! 对应的成就配置: ${JSON.stringify(this.cfgArr.map(v => { return v.id }))}`);
    };

    /**
     * 根据id获取当前进度
     * @param achievementId 成就id
     */
    public abstract getCurProgress(achievementId: number): string;

    /**
     * 获取玩家的记录数据
     * @param player 玩家
     */
    protected getPlayerRecordData(player?: Player) {
        return SystemUtil.isClient() ? DataCenterC.getData(RecordData) : DataCenterS.getData(player, RecordData);
    }
}

/** 成就基类 */
export abstract class AchievementC extends Achievement {

    protected getData(): AchieveModuleData {
        return DataCenterC.getData(AchieveModuleData);
    }

    /**
     * 监听玩家对应成就数据改变，然后完成回调
     */
    public abstract listen(...params): void;
}

/** 成就基类 */
export abstract class AchievementS extends Achievement {

    protected getData(player: Player): AchieveModuleData {
        return DataCenterS.getData(player, AchieveModuleData);
    }

    /**
     * 监听玩家对应成就数据改变，然后完成回调
     * @param playerInfo 玩家信息，可能是userId，也可以是playerId
     */
    public abstract listen(playerInfo: Player | string | number, ...params): void;
}