/*
 * @Author       : dal
 * @Date         : 2024-05-15 13:56:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-15 14:06:10
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\twoparam\UnlockGhostGraph.ts
 * @Description  : 
 */

import GraphModuleData from "../../../graph/GraphModuleData";
import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class UnlockGhostGraph extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        if (cfg.targetPara[0] === "ALL") { str = `${DataCenterC.getData(GraphModuleData).unlockedGraphArr.length}/${cfg.targetPara[1]}`; }
        else { str = `0/1`; }
        return str;
    }

    public listen(playerInfo: Player | string | number, unlockedGraphArr: number[]): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        // 所有 解锁图录的数量
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return "ALL" === v.targetPara[0] && unlockedGraphArr.length >= Number(v.targetPara[1]) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );

        // 指定 
        data.saveNewAchieves(
            this.cfgArr.filter(v => { return "ALL" != v.targetPara[0] && unlockedGraphArr.includes(Number(v.targetPara[0])) && !data.checkAchieveIsFinish(v.id) })
                .map(v => { return v.id })
        );
    }
}