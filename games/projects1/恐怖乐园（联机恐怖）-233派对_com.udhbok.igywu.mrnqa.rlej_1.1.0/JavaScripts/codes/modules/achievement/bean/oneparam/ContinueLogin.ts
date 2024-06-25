/*
 * @Author       : dal
 * @Date         : 2024-05-08 15:49:00
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 10:06:54
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\oneparam\ContinueLogin.ts
 * @Description  : 
 */

import { AchievementS, registerAchievementSAndC } from "../Achievement";

@registerAchievementSAndC
export default class ContinueLogin extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        return `${this.getPlayerRecordData().loginInfo.continueLoginDay}/${cfg.targetPara[0]}`;
    }

    /**
     * @param loginDay 持续登录天数
     */
    public listen(playerInfo: Player | string | number, loginDay: number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return loginDay >= Number(v.targetPara[0]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}