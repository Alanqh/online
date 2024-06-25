/*
 * @Author       : dal
 * @Date         : 2024-05-08 14:26:29
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 10:22:44
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\oneparam\OnlineTimeLength.ts
 * @Description  : 
 */
import TimeTransferUtil from "../../../../utils/TimeTransferUtil";
import { RouteData } from "../../../route/RouteData";
import { RouteModuleS } from "../../../route/RouteModule";
import { AchievementS, registerAchievementSAndC } from "../Achievement";

@registerAchievementSAndC
export default class OnlineTimeLength extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        return `${TimeTransferUtil.getMiniStrByTimeSec(this.getPlayerRecordData().baseRecordInfo.totalOnlineTimesLength)}/${TimeTransferUtil.getMiniStrByTimeSec(Number(cfg.targetPara[0]))}`;
    }

    public listen(player: Player): void {
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }
        ModuleService.getModule(RouteModuleS).net_reqAllGameRouteData(player.userId).then((dataArr: RouteData[]) => {
            const totalTime = dataArr.map(v => { return v.totalGameTime }).reduce((a, b) => { return a + b }, 0);
            data.saveNewAchieves(
                this.cfgArr.filter(v => { return totalTime >= Number(v.targetPara[0]) && !data.checkAchieveIsFinish(v.id) })
                    .map(v => { return v.id })
            );
            this.getPlayerRecordData(player)?.saveOnlineTimesLength(totalTime);
        });

    }
}
