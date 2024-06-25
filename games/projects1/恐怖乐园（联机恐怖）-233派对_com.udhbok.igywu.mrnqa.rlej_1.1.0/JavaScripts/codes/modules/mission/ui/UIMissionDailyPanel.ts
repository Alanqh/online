/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-09 15:43:36
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-19 14:27:28
 * @FilePath: \1001_hall\JavaScripts\codes\modules\mission\ui\UIMissionDailyPanel.ts
 * @Description  : 
 */


import { IActiveValueElement } from "../../../../config/ActiveValue";
import { GameConfig } from "../../../../config/GameConfig";
import { IMissionElement } from "../../../../config/Mission";
import MissionDailyPanel_Generate from "../../../../ui-generate/ShareUI/integration/mission/MissionDailyPanel_generate";
import UIIntegration, { IntegrationPanel } from "../../../ui/UIIntegration";
import Tips from "../../../utils/Tips";
import { RewardTipsHud } from "../../achievement/ui/RewardTipsHud";
import { MissionCondition } from "../MissionCondition";
import MissionData from "../MissionData";
import MissionModuleC from "../MissionModuleC";
import UIMissionItem from "./UIMissionItem";
import { UIItemPool } from "./UIMissionNormalPanel";

export default class UIMissionDailyPanel extends MissionDailyPanel_Generate implements IntegrationPanel {

    /**保存可领取的活跃值奖励 */
    private dailyRewardID: number[] = []
    /**动画参数 */
    private angle: number = 0
    private missionItems: UIMissionItem[] = [];
    private tipsOffset: Vector2 = new Vector2(50, -150);
    protected onStart(): void {
        //监听接取新任务
        this.missionData.onMissionTaken.add((missionId: number) => { this.checkRefresh(missionId) })
        //监听完成某个任务
        this.missionData.onMissionComplete.add((missionId: number) => { this.checkRefresh(missionId) })
        //监听活跃值变化
        this.missionData.onActiveValueChange.add((val) => { this.refreshDailyReward(val) })
        //监听任务数据变化
        this.missionData.onDataChange.add(() => { this.refreshDailyMission(); })
        this.refreshDailyMission();
        this.initDailyReward();
        this.canUpdate = true;
    }

    initDailyReward() {
        let data = GameConfig.ActiveValue.getAllElement();
        for (let i = 0; i < data.length; ++i) {
            let btn = this[`btn_gift${i + 1}`];
            let btn_img = this[`img_giftBr${i + 1}`]
            let cfgId = data[i].id
            btn.normalImageGuid = data[i].icon.toString();
            if (this.missionData.isAlreadyGetActiveReward(cfgId)) {//已经领取了
                btn.normalImageGuid = data[i].openIcon.toString();
                btn_img.visibility = SlateVisibility.Hidden;
            } else {
                btn.onClicked.add(() => {
                    if (this.getReward(cfgId)) {//领取活跃度奖励
                        btn.enable = false
                        btn.normalImageGuid = data[i].openIcon.toString();
                        btn_img.visibility = SlateVisibility.Hidden;
                        ModuleService.getModule(MissionModuleC).reqGetDailyReward(cfgId);
                        Event.dispatchToLocal("evt_panelRedPointChange", "UIMissionDailyPanel", `active_${cfgId}`, false);
                    } else {
                        UIService.show(RewardTipsHud, data[i].rewards, btn, this.tipsOffset);
                        //Tips.show("活跃值不足")
                    }
                })
            }
        }
        this.refreshDailyReward(this.missionData.activeValue)
    }

    /**检查刷新哪一类的任务 */
    checkRefresh(missionId: number) {
        let mission = GameConfig.Mission.getElement(missionId)
        if (mission.missionType == 2) this.refreshDailyMission()
    }

    getReward(id: number) {
        if (this.missionData.isAlreadyGetActiveReward(id)) return false;
        let index = this.dailyRewardID.indexOf(id)
        if (index == -1) return false;
        this.dailyRewardID.splice(index, 1);
        return true
    }

    /**保存可以领取得的活跃奖励id */
    saveCanGetId(data: IActiveValueElement, curVal: number) {
        if (this.missionData.isAlreadyGetActiveReward(data.id)) return false;
        if (this.dailyRewardID.indexOf(data.id) != -1) return false;
        if (curVal < data.id) return false;
        this.dailyRewardID.push(data.id);
        return true
    }

    private uiMissionItemPool: UIItemPool<UIMissionItem> = new UIItemPool();

    /**刷新每日任务 */
    refreshDailyMission() {


        if (!UIService.getUI(UIIntegration).visible) {
            return;
        }

        if (!this.visible) {
            return;
        }


        let dailyMission: IMissionElement[] = [];//每日任务
        this.missionData.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission.missionType == 2) { dailyMission.push(mission) }
        })

        let first: { data: IMissionElement, progress: number[] }[] = []
        let second: { data: IMissionElement, progress: number[] }[] = []
        dailyMission.forEach(e => {
            let result = MissionCondition.ins.checkCondition(e)
            if (result[0] >= result[1]) {
                first.push({ data: e, progress: result })//已完成任务
            } else {
                second.push({ data: e, progress: result })
            }
        })
        first.sort((a, b) => { return a.data.showRank - b.data.showRank })
        second.sort((a, b) => { return a.data.showRank - b.data.showRank })
        //刷新每日任务
        this.missionItems.length = 0
        //this.canvas_taskList1.removeAllChildren()
        this.uiMissionItemPool.releaseALLUIItem((item) => {
            item.release();
        });
        first.forEach(e => {
            let item = this.uiMissionItemPool.getUIItem(UIMissionItem);//UIService.create(UIMissionItem)
            item.initData(e.data, e.progress)
            this.canvas_taskList1.addChild(item.uiObject);
            this.missionItems.push(item)
        })
        second.forEach(e => {
            let item = this.uiMissionItemPool.getUIItem(UIMissionItem);//UIService.create(UIMissionItem)
            item.initData(e.data, e.progress)
            this.canvas_taskList1.addChild(item.uiObject);
            this.missionItems.push(item)
        })

    }

    /**刷新活跃值奖励 */
    refreshDailyReward(val: number) {
        this.text_actNow.text = `今日活跃度 ${val}`
        this.mProgressBar.percent = val / 100;
        GameConfig.ActiveValue.getAllElement().forEach(e => {
            if (this.saveCanGetId(e, val)) {
                Event.dispatchToLocal("evt_panelRedPointChange", "UIMissionDailyPanel", `active_${e.id}`, true)
                this[`img_giftBr${Math.round(e.id / 20)}`].visibility = SlateVisibility.Visible
            }
        })
    }



    onUpdate(dt: number) {
        if (this.dailyRewardID.length == 0) return
        this.angle += 5
        this.dailyRewardID.forEach(ID => {
            let uiIndex = Math.round(ID / 20)
            this[`img_giftBr${uiIndex}`].renderTransformAngle = this.angle % 360
        })
    }

    showVisible(bVisible: boolean): void {
        this.refreshDailyMission();
        this.uiObject.visibility = bVisible ? SlateVisibility.Visible : SlateVisibility.Hidden;
    }

    get missionData() {
        return DataCenterC.getData(MissionData)
    }
}

