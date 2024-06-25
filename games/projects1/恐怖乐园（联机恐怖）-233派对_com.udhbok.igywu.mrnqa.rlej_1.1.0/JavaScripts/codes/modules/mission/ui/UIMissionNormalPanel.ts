/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-09 15:43:36
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-19 14:27:46
 * @FilePath: \1001_hall\JavaScripts\codes\modules\mission\ui\UIMissionNormalPanel.ts
 * @Description  : 
 */


import { GameConfig } from "../../../../config/GameConfig";
import { IMissionElement } from "../../../../config/Mission";
import MissionNormalPanel_Generate from "../../../../ui-generate/ShareUI/integration/mission/MissionNormalPanel_generate";
import MissionData from "../MissionData";
import MainLine_UI_Generate from "../../../../ui-generate/ShareUI/integration/mission/MainLine_UI_generate";
import UIMissionItem from "./UIMissionItem";
import { MissionCondition } from "../MissionCondition";
import UIIntegration, { IntegrationPanel } from "../../../ui/UIIntegration";

export default class UIMissionNormalPanel extends MissionNormalPanel_Generate implements IntegrationPanel {
    /**主线任务展开状态 */
    public static mainState: boolean = true;
    /**支线任务展开状态 */
    public static branchState: boolean = true;

    private missionItems: UIMissionItem[] = []

    onStart() {
        //监听接取新任务
        this.missionData.onMissionTaken.add((missionId: number) => { this.checkRefresh(missionId) })
        //监听完成某个任务
        this.missionData.onMissionComplete.add((missionId: number) => { this.checkRefresh(missionId) })

        //监听任务数据变化
        this.missionData.onDataChange.add(() => { this.refreshNormalMission(); })
        this.refreshNormalMission();
    }

    checkRefresh(missionId: number) {
        let mission = GameConfig.Mission.getElement(missionId)
        if (mission.missionType != 2) this.refreshNormalMission()
    }

    private uiMissionLinePool: UIItemPool<UIMissionLine> = new UIItemPool<UIMissionLine>();
    private uiMissionItemPool: UIItemPool<UIMissionItem> = new UIItemPool<UIMissionItem>();
    private uiUIBranchMissionLinePool: UIItemPool<UIBranchMissionLine> = new UIItemPool<UIBranchMissionLine>();

    /**刷新常规任务列表 */
    refreshNormalMission() {

        if (!UIService.getUI(UIIntegration).visible) {
            return;
        }

        if (!this.visible) {
            return;
        }

        this.missionItems.length = 0;
        let mainMission: IMissionElement[] = [];//主线任务
        let branchMission: IMissionElement[] = [];//支线任务
        this.missionData.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission.missionType == 0) { mainMission.push(mission) }
            if (mission.missionType == 1) { branchMission.push(mission) }
        })

        let mainFirst: { data: IMissionElement, progress: number[] }[] = []
        let mainSecond: { data: IMissionElement, progress: number[] }[] = []

        mainMission.forEach(e => {
            let result = MissionCondition.ins.checkCondition(e)
            if (result[0] >= result[1]) {
                mainFirst.push({ data: e, progress: result })//已完成任务
            } else {
                mainSecond.push({ data: e, progress: result })
            }
        })
        mainFirst.sort((a, b) => { return a.data.showRank - b.data.showRank })
        mainSecond.sort((a, b) => { return a.data.showRank - b.data.showRank })

        let mainSorted = mainFirst.concat(mainSecond)

        //刷新常规任务
        this.uiMissionLinePool.releaseALLUIItem();
        this.uiMissionItemPool.releaseALLUIItem((item) => {
            item.release();
        });
        this.uiUIBranchMissionLinePool.releaseALLUIItem();
        //添加主线任务展开箭头
        let line = (this.uiMissionLinePool.getUIItem(UIMissionLine));//UIService.create(UIMissionLine);
        line.setData(0)
        this.canvas_taskList2.addChild(line.uiObject);
        //添加主线任务Item
        mainSorted.forEach(e => {
            let item = this.uiMissionItemPool.getUIItem(UIMissionItem);//UIService.create(UIMissionItem)
            this.canvas_taskList2.addChild(item.uiObject);
            item.initData(e.data, e.progress)
            item.onVisibleChange(0, UIMissionNormalPanel.mainState)
            this.missionItems.push(item)
        })
        let branchFirst: { data: IMissionElement, progress: number[] }[] = []
        let branchSecond: { data: IMissionElement, progress: number[] }[] = []

        //添加支线任务展开箭头
        let branchLine = this.uiUIBranchMissionLinePool.getUIItem(UIBranchMissionLine);//UIService.create(UIBranchMissionLine);
        branchLine.setData(1)
        this.canvas_taskList2.addChild(branchLine.uiObject);
        branchMission.forEach(e => {
            let result = MissionCondition.ins.checkCondition(e)
            if (result[0] >= result[1]) {
                branchFirst.push({ data: e, progress: result })//已完成任务
            } else {
                branchSecond.push({ data: e, progress: result })
            }
        })
        branchFirst.sort((a, b) => { return a.data.showRank - b.data.showRank })
        branchSecond.sort((a, b) => { return a.data.showRank - b.data.showRank })

        let branchSorted = branchFirst.concat(branchSecond)
        //添加支线任务Item
        branchSorted.forEach(e => {
            let item = this.uiMissionItemPool.getUIItem(UIMissionItem);//UIService.create(UIMissionItem)
            this.canvas_taskList2.addChild(item.uiObject);
            item.initData(e.data, e.progress)
            item.onVisibleChange(1, UIMissionNormalPanel.branchState)
            this.missionItems.push(item)
        })
    }
    showVisible(bVisible: boolean): void {
        this.refreshNormalMission();
        this.uiObject.visibility = bVisible ? SlateVisibility.Visible : SlateVisibility.Hidden;
    }
    get missionData() {
        return DataCenterC.getData(MissionData)
    }

}

export class UIItemPool<T extends UIScript> {

    private cacheItem: T[] = [];
    private allItem: T[] = [];

    private clazz: any = null;

    public getUIItem(clazz): T {
        if (this.cacheItem.length > 0) {
            let res = this.cacheItem.shift();
            res.visible = true;
            return res;
        }

        let res = UIService.create(clazz);
        this.allItem.push(res as any);
        return res as any;
    }

    public releaseUIItem(item: T): void {
        item.uiObject.removeObject();
        item.visible = false;
        this.cacheItem.push(item);
    }

    public releaseALLUIItem(onRelease: (item: T) => void = null): void {
        for (let i = 0; i < this.allItem.length; i++) {

            if (onRelease) {
                onRelease(this.allItem[i]);
            }

            if (!this.allItem[i].visible) {
                continue;
            }

            this.allItem[i].uiObject.removeObject();
            this.allItem[i].visible = false;
            this.cacheItem.push(this.allItem[i])
        }
    }

}

export class UIMissionLine extends MainLine_UI_Generate {
    protected missionType: number = 0;
    protected btnUp: Vector2 = new Vector2(1, -1)
    onStart() {
        this.btn_mainLine.onClicked.add(() => {
            UIMissionNormalPanel.mainState = !UIMissionNormalPanel.mainState
            this.setBtnState()
            Event.dispatchToLocal("evt_setMissionItemVisible", this.missionType, UIMissionNormalPanel.mainState)
        })
    }

    setData(type: number) {
        this.missionType = type;
        this.text_mainLine.fontColor = LinearColor.red
        this.btn_mainLine.normalImageColor = LinearColor.red
        this.text_mainLine.text = "主线任务"
        this.setBtnState()
    }

    setBtnState() {
        this.btn_mainLine.renderScale = UIMissionNormalPanel.mainState ? Vector2.one : this.btnUp;
    }
}

export class UIBranchMissionLine extends UIMissionLine {

    onStart() {
        this.btn_mainLine.onClicked.add(() => {
            UIMissionNormalPanel.branchState = !UIMissionNormalPanel.branchState
            this.setBtnState()
            Event.dispatchToLocal("evt_setMissionItemVisible", this.missionType, UIMissionNormalPanel.branchState)
        })
    }

    setData(type: number) {
        this.missionType = type;
        this.text_mainLine.fontColor = LinearColor.yellow;
        this.btn_mainLine.normalImageColor = LinearColor.yellow;
        this.text_mainLine.text = "支线任务"
        this.setBtnState()
    }

    setBtnState() {
        this.btn_mainLine.renderScale = UIMissionNormalPanel.branchState ? Vector2.one : this.btnUp;
    }
}