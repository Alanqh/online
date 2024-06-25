/*
 * @Author       : dal
 * @Date         : 2024-05-09 11:29:27
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 10:45:50
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\twoparam\GiftReceiveTimes.ts
 * @Description  : 
 */
import { MapEx } from "../../../../utils/MapEx";
import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class GiftReceiveTimes extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        if (cfg.targetPara[0] === "-1") { str = `${this.getPlayerRecordData().baseRecordInfo.receiveGiftTimes[0]}/${cfg.targetPara[1]}`; }
        else { str = `${this.getPlayerRecordData().baseRecordInfo.receiveGiftTimes[1]}/${cfg.targetPara[1]}`; }
        return str;
    }

    public listen(playerInfo: Player | string | number, type: number, count: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return type === Number(v.targetPara[0]) && count >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}