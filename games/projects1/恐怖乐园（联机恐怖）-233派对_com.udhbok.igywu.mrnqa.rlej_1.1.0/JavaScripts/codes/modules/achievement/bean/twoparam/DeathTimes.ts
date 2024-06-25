/*
 * @Author       : dal
 * @Date         : 2024-05-09 11:28:04
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-15 13:56:34
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\twoparam\DeathTimes.ts
 * @Description  : 
 */

import { EGameTheme, GamesStartDefines } from "../../../../Defines";
import { registerAchievementSAndC, AchievementS } from "../Achievement";


@registerAchievementSAndC
export default class DeathTimes extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        if (cfg.targetPara[0] === "ALL") { str = `${this.getPlayerRecordData().baseRecordInfo.totalDeathTimes}/${cfg.targetPara[1]}`; }
        else { str = `${this.getPlayerRecordData().getDeathTimes(cfg.targetPara[0] as EGameTheme)}/${cfg.targetPara[1]}`; }
        return str;
    }

    /**
     * @param curThemeDeathTimes 当前游戏死亡次数
     * @param totalDeathTimes 总计死亡次数
     */
    public listen(playerInfo: Player | string | number, curThemeDeathTimes: number, totalDeathTimes: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        // 所有游戏
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return "ALL" === v.targetPara[0] && totalDeathTimes >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
        // 指定游戏
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return GamesStartDefines.gameTheme === v.targetPara[0] && curThemeDeathTimes >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}