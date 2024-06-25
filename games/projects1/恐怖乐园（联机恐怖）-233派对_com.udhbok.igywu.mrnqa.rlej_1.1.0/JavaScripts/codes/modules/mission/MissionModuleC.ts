/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-08 13:54:33
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-20 15:56:31
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\mission\MissionModuleC.ts
 * @Description  : 
 */

import { AddGMCommand } from "module_gm";
import MissionData from "./MissionData";
import MissionModuleS from "./MissionModuleS";
import { PhotoData } from "../equip/util/CamerHelper";
import { GameConfig } from "../../../config/GameConfig";
import GameStart from "../../GameStart";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { IMissionElement } from "../../../config/Mission";
import Tips from "../../utils/Tips";
import { EGameTheme } from "../../Defines";
import { MainUI } from "../../ui/MainUI";
import { LanUtil } from "../../utils/LanUtil";

AddGMCommand("增加活跃值", (player: mw.Player, val: string) => {
}, (player: mw.Player, val: string) => {
    DataCenterS.getData(player, MissionData).updateActiveValue(Number(val));
})

export default class MissionModuleC extends ModuleC<MissionModuleS, MissionData> {

    /**保存交互事件监听 */
    private interEvents: Map<number, mw.EventListener> = new Map()

    protected onStart(): void {
        this.registerEvents()
        //监听任务完成 检查是否有新任务可以在npc处接取
        this.data.onMissionComplete.add(this.listenMissionCompleted.bind(this));
        //监听任务接取 刷新npc任务提示
        this.data.onMissionTaken.add(this.listenMissionTaken.bind(this))
    }

    protected onEnterScene(sceneType: number): void {
        this.server.net_initMission()
        this.data.onMissionComplete.add((missionId: number) => {
            if (this.interEvents.has(missionId)) {
                this.interEvents.get(missionId).disconnect();
                this.interEvents.delete(missionId);
            }
        })
    }

    private registerEvents() {
        Event.addLocalListener("PlayerAlready", () => {
            if (GameStart.GameTheme != EGameTheme.Hall) {
                this.server.net_surviveTime()
            }
        })
    }

    /**请求接取任务 */
    public reqTakeMission(missionId: number) {
        this.server.net_takeMission(missionId, this.localPlayerId);
    }

    /**请求完成任务 */
    public async reqCompleteMission(missionId: number) {
        let result = await this.server.net_completeMission(missionId);
        if (result) {
            let mission = GameConfig.Mission.getElement(missionId)
            let str = "";
            mission.reward.forEach(e => {
                let item = GameConfig.Item.getElement(e[0])
                str += `${item.name}x${e[1]} `
            })
            Tips.show(LanUtil.getText("FindTips_02") + ` ${str}`);
        }
    }

    public net_playFlyAni(isCharIcon: boolean) {
        UIService.getUI(MainUI).flyCharmOrExpIcon(isCharIcon);
    }

    /**领取活跃度奖励 */
    public reqGetDailyReward(activeId: number) {
        this.server.net_GetDailyReward(activeId)
    }

    public reqSavePhotoData(data: PhotoData[]) {
        this.server.net_savePhotoData(data)
    }
    /**监听任务完成 */
    private async listenMissionCompleted(completedMissionId: number) {
        //过滤掉不从npc接取的任务
        let npcMission = GameConfig.Mission.getAllElement().filter(e => { return e.npcID != null });
        //过滤掉已经完成的任务
        let unComplete = npcMission.filter(e => { return this.data.isCompleted(e.id) });
        let playerLevel = await ModuleService.getModule(PlayerModuleC).getPlayerLevel();
        let canTakeMission: IMissionElement[] = []
        for (let i = 0; i < unComplete.length; ++i) {
            let mission = unComplete[i];
            if (mission.pre_Mission && !this.data.isCompleted(mission.id)) continue;//判断前置任务
            if (mission.pre_playerLevel > playerLevel) continue;//判断前置等级
            canTakeMission.push(mission);
        }
        canTakeMission.forEach(e => {
            e.npcID.forEach(npcId => {
                Event.dispatchToLocal(`evt_npcNewMission_${npcId}`, e.id)
            })
        })
    }

    /**监听任务接取 */
    private listenMissionTaken(missionID: number) {
        //过滤掉不从npc接取的任务
        let mission = GameConfig.Mission.getElement(missionID);
        if (mission.npcID) {
            //通知所有有任务的npc更新任务提示
            mission.npcID.forEach(npcId => {
                Event.dispatchToLocal(`evt_npcMissionCompleted_${npcId}`, missionID)
            })
        }
    }

    /**监听交互任务事件 */
    public net_listenInteractMission(missionID: number) {
        let mission = GameConfig.Mission.getElement(missionID);
        let eventName = mission.targetPara[2]
        if (this.interEvents.has(missionID)) return;
        let listener = Event.addLocalListener(eventName, (guid: string) => {
            this.server.net_saveInteractData(GameStart.GameTheme, guid, eventName)
        })
        this.interEvents.set(missionID, listener)
    }

}