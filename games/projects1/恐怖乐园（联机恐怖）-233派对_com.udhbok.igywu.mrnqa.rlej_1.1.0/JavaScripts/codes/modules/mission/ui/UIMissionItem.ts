/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-08 19:09:27
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-19 14:26:57
 * @FilePath: \1001_hall\JavaScripts\codes\modules\mission\ui\UIMissionItem.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IMissionElement } from "../../../../config/Mission";
import AcReIncludeItem_UI_Generate from "../../../../ui-generate/ShareUI/integration/mission/AcReIncludeItem_UI_generate";
import MissionItem_UI_Generate from "../../../../ui-generate/ShareUI/integration/mission/MissionItem_UI_generate";
import MissionModuleC from "../MissionModuleC";
import { UIItemPool } from "./UIMissionNormalPanel";

export default class UIMissionItem extends MissionItem_UI_Generate {
    private data: IMissionElement;
    private events: EventListener[] = [];
    private belongPanelName: string = "";
    private cacheItem: UIMissionRewardItem[] = [];

    public static UIMissionRewardItemPool: UIItemPool<UIMissionRewardItem> = new UIItemPool();

    protected onStart(): void {
        this.btn_giftGain.onClicked.add(() => {
            if (!this.data) return
            ModuleService.getModule(MissionModuleC).reqCompleteMission(this.data.id);
            Event.dispatchToLocal("evt_panelRedPointChange", this.belongPanelName, `${this.belongPanelName}_${this.data.id}`, false);
        })
        //this.events.push(Event.addLocalListener("evt_setMissionItemVisible", this.onVisibleChange.bind(this)))
    }

    public release() {
        this.events.forEach(e => { e.disconnect() });
    }

    initData(data: IMissionElement, progress: number[]) {

        this.cacheItem.forEach(e => {
            UIMissionItem.UIMissionRewardItemPool.releaseUIItem(e)
        })

        this.cacheItem = [];

        this.data = data
        this.events.push(Event.addLocalListener("evt_setMissionItemVisible", this.onVisibleChange.bind(this)))

        this.text_taskName.text = this.data.name;
        this.text_taskTips.text = this.data.targetText;
        this.belongPanelName = this.data.missionType == 2 ? "UIMissionDailyPanel" : "UIMissionNormalPanel";
        //创建奖励item
        this.data.reward.forEach(e => {
            let item = UIMissionItem.UIMissionRewardItemPool.getUIItem(UIMissionRewardItem);//UIService.create(UIMissionRewardItem)
            item.setData(e[0], e[1])
            this.canvas_gifts.addChild(item.uiObject);
            this.cacheItem.push(item);
        })
        this.text_progress.text = `${progress[0]}/${progress[1]}`
        if (progress[0] >= progress[1]) {
            this.btn_giftGain.visibility = SlateVisibility.Visible;
            this.img_progress.visibility = SlateVisibility.Collapsed;
            Event.dispatchToLocal("evt_panelRedPointChange", this.belongPanelName, `${this.belongPanelName}_${this.data.id}`, true);
        } else {
            this.btn_giftGain.visibility = SlateVisibility.Collapsed;
            this.img_progress.visibility = SlateVisibility.Visible;
        }
    }

    onVisibleChange(missionType: number, bVisible: boolean) {
        if (missionType != this.data.missionType) return
        this.setVisible(bVisible ? SlateVisibility.Visible : SlateVisibility.Collapsed);
    }

    onDestroy() {
        this.events.forEach(e => { e.disconnect() });
    }

}

export class UIMissionRewardItem extends AcReIncludeItem_UI_Generate {

    setData(itemID: number, count: number) {
        let cfg = GameConfig.Item.getElement(itemID);
        if (!cfg) return

        if (this.img_includeItem.imageGuid != cfg.icon) {
            this.img_includeItem.imageGuid = cfg.icon
        }
        this.text_includeItem.text = `*${count}`

    }

}