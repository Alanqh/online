/*
 * @Author       : dal
 * @Date         : 2024-05-09 19:24:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 10:37:21
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\oneparam\PlayerLevel.ts
 * @Description  : 
 */
import { PlayerModuleS } from "../../../player/PlayerModuleS";
import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class PlayerLevel extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        return `${this.getPlayerRecordData().baseRecordInfo.playerLevel}/${cfg.targetPara[0]}`;
    }

    public listen(playerInfo: Player | string | number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        ModuleService.getModule(PlayerModuleS).net_getPlayerLevel(player.userId).then(count => {
            data.saveNewAchieves(
                this.cfgArr.filter(v => { return count >= Number(v.targetPara[0]) && !data.checkAchieveIsFinish(v.id) })
                    .map(v => { return v.id })
            );
            this.getPlayerRecordData(player).savePlayerLevel(count);
        });
    }
}