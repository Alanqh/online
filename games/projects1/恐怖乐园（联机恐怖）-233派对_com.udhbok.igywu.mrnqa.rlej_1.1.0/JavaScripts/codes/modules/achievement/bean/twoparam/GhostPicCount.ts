/*
 * @Author       : dal
 * @Date         : 2024-05-09 19:24:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 10:42:16
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\twoparam\GhostPicCount.ts
 * @Description  : 
 */
import { MapEx } from "../../../../utils/MapEx";
import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class GhostPicCount extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        if (cfg.targetPara[0] === "ALL") { str = `${this.getPlayerRecordData().baseRecordInfo.totalPicCount}/${cfg.targetPara[1]}`; }
        else { str = `${this.getPlayerRecordData().getGhostPicCount(Number(cfg.targetPara[0]))}/${cfg.targetPara[1]}`; }
        return str;
    }

    public listen(playerInfo: Player | string | number, name: string, count: number, totalPicCount: number): void {
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
            this.cfgArr.filter(v => { return name === v.targetPara[0] && count >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}