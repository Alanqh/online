/*
 * @Author       : dal
 * @Date         : 2024-05-09 15:16:40
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-15 13:56:45
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\twoparam\UseItemCount.ts
 * @Description  : 
 */

import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class UseItemCount extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        if (cfg.targetPara[0] === "ALL") { str = `${this.getPlayerRecordData().baseRecordInfo.totalUseItemCount}/${cfg.targetPara[1]}`; }
        else { str = `${this.getPlayerRecordData().getUseItemTimes(Number(cfg.targetPara[0]))}/${cfg.targetPara[1]}`; }
        return str;
    }

    public listen(playerInfo: Player | string | number, itemId: string, count: number, totalPicCount: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        // 所有
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return "ALL" === v.targetPara[0] && totalPicCount >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
        // 指定
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return itemId === v.targetPara[0] && count >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}