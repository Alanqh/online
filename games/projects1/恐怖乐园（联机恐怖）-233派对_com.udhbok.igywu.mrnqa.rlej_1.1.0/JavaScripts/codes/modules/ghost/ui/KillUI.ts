/*
 * @Author       : dal
 * @Date         : 2024-01-22 16:02:21
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-20 10:58:18
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\ghost\ui\KillUI.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import KillUI_Generate from "../../../../ui-generate/ShareUI/ghost/KillUI_generate";
import SetUI from "../../../ui/SetUI";
import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
import { EquipModuleC } from "../../equip/EquipModuleC";
import CameraPanel from "../../equip/ui/UICamera";
import NewGhostGraphPanel from "../../graph/ui/NewGraphPanel";
import UIMissionDailyPanel from "../../mission/ui/UIMissionDailyPanel";
import UIMissionNormalPanel from "../../mission/ui/UIMissionNormalPanel";
import { NotebookPanel } from "../../procedure/ui/NotebookPanel";

export class KillUI extends KillUI_Generate {
    onShow() {
        this.hideOtherUI();
        // 把装备卸载掉
        ModuleService.getModule(EquipModuleC).equip(null);

        UIService.hide(CameraPanel);

        let curStyle = Number(BoardHelper.GetTargetKeyValue(BoardKeys.Style));
        let cavName = GameConfig.Global.flashUI.stringList[curStyle - 1];
        let curCav = this[cavName];
        let count = this.rootCanvas.getChildrenCount();
        for (let index = 0; index < count; index++) {
            const element = this.rootCanvas.getChildAt(index);
            element.visibility = SlateVisibility.Collapsed;
        }
        if (!curCav) {
            curCav = this.m1;
        }
        curCav.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    private hideOtherUI() {
        UIService.hide(SetUI);
        UIService.hide(NotebookPanel);
        // UIService.hide(UIMissionDailyPanel);
        UIService.hide(NewGhostGraphPanel);
        // UIService.hide(UIMissionNormalPanel);
        Event.dispatchToLocal("onOpenKillUI")
    }
}