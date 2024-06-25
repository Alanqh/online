/*
 * @Author       : dal
 * @Date         : 2024-04-08 19:03:41
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-17 18:20:03
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\inter\evtCom\OpenUIEvt.ts
 * @Description  : 
 */
import UIIntegration from "../../../ui/UIIntegration";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import WeaponUpgradePanel from "../../equip/ui/WeaponUpgradePanel";
import NewGhostGraphPanel from "../../graph/ui/NewGraphPanel";
import { IEvtCom, RegisterEvt } from "./IEvtCom";

@RegisterEvt
export class OpenUIEvt implements IEvtCom {
    evtName: string = "OpenUIEvt";

    private _uimap: Map<string, any> = new Map();

    public constructor() {
        this._uimap.set("GhostGraphPanel", () => {
            // UIService.show(GhostGraphPanel);
            UIService.show(NewGhostGraphPanel);
            GhostTraceHelper.uploadMGS("ts_game_over", "点击拍照按钮上发", { round_id: 667 });
        });

        this._uimap.set("WeaponUpgradePanel", () => {
            UIService.show(WeaponUpgradePanel);
            GhostTraceHelper.uploadMGS("ts_action_pick", "打开武器升级界面上发", { loot: 2 });
        });

        this._uimap.set("UINews", () => {
            // UIService.show(UINews);
            UIService.show(UIIntegration).showSubTab();
        });
    }

    onGetCall(goid: string, key: string) {
        console.log("尝试打开UI" + key)
        this._uimap.get(key)();
    }
}
