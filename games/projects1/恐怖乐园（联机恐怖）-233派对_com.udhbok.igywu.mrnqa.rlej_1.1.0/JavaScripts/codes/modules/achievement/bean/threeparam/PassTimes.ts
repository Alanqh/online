/*
 * @Author       : dal
 * @Date         : 2024-05-09 17:14:21
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-24 15:09:34
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\bean\threeparam\PassTimes.ts
 * @Description  : 
 */

import { EGameTheme } from "../../../../Defines";
import { MapEx } from "../../../../utils/MapEx";
import { PassInfo } from "../../../route/RouteData";
import { RouteDefine } from "../../../route/RouteDefine";
import { registerAchievementSAndC, AchievementS } from "../Achievement";

@registerAchievementSAndC
export default class PassTimes extends AchievementS {

    public getCurProgress(achievementId: number): string {
        const cfg = this.cfgArr.find(v => { return v.id === achievementId });
        let str = "";
        // 所有游戏
        if (cfg.targetPara[0] === "ALL") {
            let passTimes = this.getPlayerRecordData().passInfo.allPassTimes;
            str = `${passTimes}/${cfg.targetPara[3]}`;
        }

        // 任意游戏
        else {
            str = `${this.getPlayerRecordData().getGameThemePassTimes(cfg.targetPara[0] as EGameTheme)}/${cfg.targetPara[3]}`;
        }
        return str;
    }

    public listen(playerInfo: Player | string | number): void {
        let player: Player = playerInfo instanceof Player ? playerInfo : Player.getPlayer(playerInfo);
        if (!player) {
            console.error(`DEBUG MyTypeError>>> ${this.constructor.name} 成就监听失败，没找到玩家`);
            return;
        }
        const data = this.getData(player);
        if (!data) { return; }

        RouteDefine.getAllRouteData(player.userId).then(routeDataArr => {
            let totalPassTimes = 0;
            routeDataArr.forEach((routeData) => {
                let thisPassTimes = 0;
                MapEx.forEach(routeData.passInfoMap, (key, passInfo: PassInfo) => {
                    thisPassTimes += passInfo.passTimes;
                    totalPassTimes += passInfo.passTimes;
                })

                // 通关某个游戏所有结局所有难度多少次
                data.saveNewAchieves(
                    this.cfgArr.filter(v => {
                        return routeData.gameTheme === v.targetPara[0]
                            && "ALL" === v.targetPara[1]
                            && "ALL" === v.targetPara[2]
                            && thisPassTimes >= Number(v.targetPara[2])
                            && !data.checkAchieveIsFinish(v.id)
                    })
                        .map(v => { return v.id })
                );
                this.getPlayerRecordData(player).saveGameThemePassTimes(routeData.gameTheme, thisPassTimes);
            });
            this.getPlayerRecordData(player).saveAllGamePassTimes(totalPassTimes);

            // 通关所有游戏所有结局所有难度多少次
            data.saveNewAchieves(
                this.cfgArr.filter(v => { return "ALL" === v.targetPara[0] && totalPassTimes >= Number(v.targetPara[3]) && !data.checkAchieveIsFinish(v.id) })
                    .map(v => { return v.id })
            );
        });

    }
}