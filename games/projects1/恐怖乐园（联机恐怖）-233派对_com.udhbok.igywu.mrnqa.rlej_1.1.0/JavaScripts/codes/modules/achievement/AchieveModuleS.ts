/*
 * @Author       : dal
 * @Date         : 2024-05-08 11:18:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-28 15:45:22
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\AchieveModuleS.ts
 * @Description  : 
 */

import MissionModuleS from "../mission/MissionModuleS";
import { AchieveService } from "./AchieveDefine";
import AchieveModuleC from "./AchieveModuleC";
import AchieveModuleData from "./AchieveModuleData";

export default class AchieveModuleS extends ModuleS<AchieveModuleC, AchieveModuleData> {

    public net_getGift(): number {
        let thisLevel = this.currentData.level;
        if (this.currentData.saveNewLevel()) {
            const rewardArr = AchieveService.getLevelCfg(thisLevel);
            ModuleService.getModule(MissionModuleS).getReward(rewardArr.rewards, this.currentPlayer);
            return thisLevel;
        }

        return 0;
    }

    /**
     * 获取玩家成就数据
     */
    public async net_getAchieveData(userId: string) {
        return await AchieveModuleData.getGlobalData(userId);
    }

}