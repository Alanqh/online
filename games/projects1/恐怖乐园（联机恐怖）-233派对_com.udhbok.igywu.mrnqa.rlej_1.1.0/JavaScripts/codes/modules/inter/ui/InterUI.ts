import InteractPanel_Generate from "../../../../ui-generate/ShareUI/hud/InteractPanel_generate";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import { PlayerInterModuleC } from "../PlayerInterModule";

export class InterPanel extends InteractPanel_Generate {
    public isMain: boolean = false;

    onStart() {
        this.layer = UILayerMiddle;
        this.btn_cancel.onClicked.add(() => {
            UIService.hideUI(this);
            ModuleService.getModule(PlayerInterModuleC).reqCancelPlayerInter();
        })
        this.btn_catch.onClicked.add(() => {
            ModuleService.getModule(PlayerInterModuleC).reqInterAction();
            GhostTraceHelper.uploadMGS("ts_action_hit", "点击按钮时上发", {
                stage_level: 0
            })
        })
    }

    showInter(isMain: boolean) {
        if (isMain) {
            this.canvas_catch.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.canvas_catch.visibility = SlateVisibility.Collapsed;
        }
        UIService.showUI(this, this.layer);
    }
}
