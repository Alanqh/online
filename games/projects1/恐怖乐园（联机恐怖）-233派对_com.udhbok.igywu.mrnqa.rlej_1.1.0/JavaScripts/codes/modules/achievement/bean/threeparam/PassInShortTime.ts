/*
 * @Author       : dal
 * @Date         : 2024-05-09 19:24:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 11:34:00
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\threeparam\PassInShortTime.ts
 * @Description  : 
 */

import { GamesStartDefines } from "../../../../Defines";
import { MapEx } from "../../../../utils/MapEx";
import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class PassInShortTime extends AchievementS {

    public getCurProgress(achievementId: number): string {
        // const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        // let str = "";
        // if (cfg.targetPara[0] === "ALL") {
        //     let tempTime = this.getRecordData().passInfo.allGameShortestPassTime;
        //     str = tempTime ? `${tempTime}/${cfg.targetPara[2]}` : "当前无通关记录";
        // }
        // else if (cfg.targetPara[0] === GamesStartDefines.gameTheme) {
        //     let tempTime = MapEx.get(this.getRecordData().passInfo.shortestPassTimeMap, cfg.targetPara[0]);
        //     str = tempTime ? `${tempTime}/${cfg.targetPara[2]}` : "当前无通关记录";
        // }
        // else {
        //     let tempTimeMap = MapEx.get(this.getRecordData().passInfo.shortestPassTimeWithEndingMap, cfg.targetPara[0]);
        //     if (!tempTimeMap) { str = "当前无通关记录"; return str; }
        //     let tempTime = MapEx.get(tempTimeMap, cfg.targetPara[1]);
        //     str = tempTime ? `${tempTime}/${cfg.targetPara[2]}` : "当前无通关记录";
        // }
        return "0/1";
    }

    /**
     * @param endingCfgId 结局id
     * @param passTime 通关时间秒
     */
    public listen(playerInfo: Player | string | number, endingCfgId: number, passTime: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }

        // 所有游戏 所有结局
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return v.targetPara[0] === "ALL" && v.targetPara[1] === "ALL" && Number(v.targetPara[2]) >= passTime })
                .map(v => { return v.id })
        )

        // 本游戏
        // 任意结局
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return v.targetPara[0] === GamesStartDefines.gameTheme && v.targetPara[1] === "ALL" && Number(v.targetPara[2]) >= passTime })
                .map(v => { return v.id })
        )
        // 这个结局
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return v.targetPara[0] === GamesStartDefines.gameTheme && Number(v.targetPara[1]) === endingCfgId && Number(v.targetPara[2]) >= passTime })
                .map(v => { return v.id })
        )

    }
}