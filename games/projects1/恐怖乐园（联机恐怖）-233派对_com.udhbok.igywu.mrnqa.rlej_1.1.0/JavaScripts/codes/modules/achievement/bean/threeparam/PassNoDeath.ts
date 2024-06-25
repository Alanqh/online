/*
 * @Author       : dal
 * @Date         : 2024-05-09 19:24:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 11:55:06
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\threeparam\PassNoDeath.ts
 * @Description  : 
 */

import { GamesStartDefines } from "../../../../Defines";
import { MapEx } from "../../../../utils/MapEx";
import { registerAchievementSAndC, AchievementS } from "../Achievement";


@registerAchievementSAndC
export default class PassNoDeath extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        // 所有游戏
        // if (cfg.targetPara[0] === "ALL") {
        //     if (cfg.targetPara[1] === "0") {
        //         let tempTime = this.getRecordData().passInfo.allGameMinBeHurtTimes;
        //         if (!tempTime) { str = !tempTime ? `${0}/${1}` }

        //     } else {
        //         let tempTime = this.getRecordData().passInfo.allGameShortestPassTime;
        //         str = tempTime ? `${tempTime}/${cfg.targetPara[2]}` : "当前无通关记录";
        //     }
        // }
        // // 任意游戏
        // else {
        //     if (cfg.tar)
        // }
        return `0/1`;
    }

    /**
     * @param deathTimes 死亡次数
     * @param beHurtTimes 天数
     * @returns 
     */
    public listen(playerInfo: Player | string | number, deathTimes: number, beHurtTimes: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }

        // 所有游戏
        // 死亡次数
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return v.targetPara[0] === "ALL" && Number(v.targetPara[1]) === 0 && Number(v.targetPara[2]) >= deathTimes })
                .map(v => { return v.id })
        )
        // 受伤次数
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return v.targetPara[0] === "ALL" && Number(v.targetPara[1]) === 1 && Number(v.targetPara[2]) >= beHurtTimes })
                .map(v => { return v.id })
        )

        // 本游戏
        // 受伤次数
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return v.targetPara[0] === GamesStartDefines.gameTheme && Number(v.targetPara[1]) === 0 && Number(v.targetPara[2]) >= deathTimes })
                .map(v => { return v.id })
        )
        // 受伤次数
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return v.targetPara[0] === GamesStartDefines.gameTheme && Number(v.targetPara[1]) === 1 && Number(v.targetPara[2]) >= beHurtTimes })
                .map(v => { return v.id })
        )
    }
}