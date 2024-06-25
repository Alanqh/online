/*
 * @Author       : dal
 * @Date         : 2024-05-09 10:23:15
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-09 10:28:24
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\achievement\bean\RebirthTimes.ts
 * @Description  : 
 */

import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class RebirthTimes extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        return `${this.getPlayerRecordData().baseRecordInfo.rebirthTimes}/${cfg.targetPara[0]}`;
    }

    public listen(playerInfo: Player | string | number, count: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return count >= Number(v.targetPara[0]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}