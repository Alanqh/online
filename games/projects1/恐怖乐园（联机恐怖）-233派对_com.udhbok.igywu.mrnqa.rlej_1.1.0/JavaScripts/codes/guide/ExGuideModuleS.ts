/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-19 09:44:43
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-29 14:13:21
 * @FilePath     : \1005_town\JavaScripts\codes\guide\ExGuideModuleS.ts
 * @Description  : 
 */

import { EGameTheme, GamesStartDefines } from "../Defines";
import { ArchiveHelper } from "../modules/archive/ArchiveHelper";
import FakerModuleS from "../modules/faker/FakerModuleS";
import { ProcedureModuleS } from "../modules/procedure/ProcedureModuleS";
import { RouteDefine, EStateIndex } from "../modules/route/RouteDefine";
import ExGuideData from "./ExGuideData";
import ExGuideModuleC from "./ExGuideModuleC";

export default class ExGuideModuleS extends ModuleS<ExGuideModuleC, ExGuideData> {
    visiblePlayers: Set<number> = new Set();
    protected onPlayerEnterGame(player: mw.Player): void {
        // 除了大厅，其他游戏没有引导
        if (GamesStartDefines.gameTheme != EGameTheme.Hall) { return; }
        ModuleService.getModule(ProcedureModuleS).net_loadGame(player.userId, 1, 1, 1)
        TimeUtil.delayExecute(() => {
            ArchiveHelper.reqSetData(player.userId, [], [], false, 1);
        }, 1)
        //没有完成引导需要在其他玩家客户端隐藏
        let dataHelper = this.getPlayerData(player)
        let stage = dataHelper.guideStage
        this.setPlyerVisible(stage == 6, player.playerId);
        if (stage == 6) RouteDefine.setActivityRewardState(player.userId, EStateIndex.ShowPopDialog)

    }

    protected onPlayerLeft(player: mw.Player): void {
        this.visiblePlayers.delete(player.playerId);
    }


    net_getGuideStep() {
        return this.currentData.guideStage;
    }

    net_completeGuide(stage: number) {
        this.currentData.guideStage = stage;
        this.currentData.save(true)
        //完成引导 在其他玩家客户端显示该玩家
        if (stage == 6) {
            this.setPlyerVisible(true, this.currentPlayerId);
            this.currentData.completeTimeStamp = new Date().toLocaleDateString();
            this.currentData.save(true)
        }
    }

    setPlyerVisible(visibile: boolean, playerId: number) {
        console.log("setPlyerVisible", playerId, Array.from(this.visiblePlayers));
        if (visibile) {
            this.visiblePlayers.add(playerId);
        }
        else {
            this.visiblePlayers.delete(playerId)
        }
        ModuleService.getModule(FakerModuleS).net_playerReady(playerId)
        Player.getAllPlayers().forEach(player => {
            this.getClient(player).net_showPlayer(Array.from(this.visiblePlayers));
        })
    }

}