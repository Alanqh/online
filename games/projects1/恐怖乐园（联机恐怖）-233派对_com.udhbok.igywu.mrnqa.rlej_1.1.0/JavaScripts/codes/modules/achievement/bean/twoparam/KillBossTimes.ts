/*
 * @Author       : dal
 * @Date         : 2024-06-02 10:04:20
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-02 10:08:06
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\twoparam\KillBossTimes.ts
 * @Description  : 
 */

import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class KillBossTimes extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        if (cfg.targetPara[0] === "ALL") { str = `${this.getPlayerRecordData().baseRecordInfo.totalKillBossCount}/${cfg.targetPara[1]}`; }
        else { str = `${this.getPlayerRecordData().getKillBossTimes(Number(cfg.targetPara[0]))}/${cfg.targetPara[1]}`; }
        return str;
    }

    public listen(playerInfo: Player | string | number, bossId: number, killBossTimes: number, totalKillBossTimes: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        // 所有 解锁图录的数量
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return "ALL" === v.targetPara[0] && totalKillBossTimes >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );

        // 指定 
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return "ALL" != v.targetPara[0] && bossId === Number(v.targetPara[0]) && killBossTimes >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}