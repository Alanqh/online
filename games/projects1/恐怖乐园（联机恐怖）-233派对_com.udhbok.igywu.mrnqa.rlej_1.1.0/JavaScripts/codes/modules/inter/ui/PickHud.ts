/*
 * @Author       : dal
 * @Date         : 2024-01-08 14:17:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-14 18:21:09
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\inter\ui\PickHud.ts
 * @Description  : 
 */

import PickUp_UI_Generate from "../../../../ui-generate/ShareUI/PickUp_UI_generate";
import { LogService } from "../../../ui/utils/LogPanel";
import MusicMgr from "../../../utils/MusicMgr";
import { ObjInterModuleC } from "../ObjInterModuleC";
import { PlayerInterModuleC } from "../PlayerInterModule";


export default class PickHud extends PickUp_UI_Generate {

    private pressTime: number = 0;

    onStart() {
        this.layer = mw.UILayerScene;
        this.canUpdate = false;
        this.btn_catch.touchMethod = mw.ButtonTouchMethod.DownAndUp;
        this.btn_catch.onPressed.add(() => {
            this.onPress();
            this.pressTime = TimeUtil.elapsedTime();
        });

        this.btn_catch.onReleased.add(() => {
            this.onRelease();
            if (TimeUtil.elapsedTime() - this.pressTime > 0.5) { return; }
            let res = ModuleService.getModule(PlayerInterModuleC).reqStopInter(true);
            if (res) { return; }
            ModuleService.getModule(ObjInterModuleC).triggerSelectItem();
        })
    }

    /** 是否在蓄力中 */
    isPowering: boolean = false;

    public onPress() {
        if (this.visible) {
            this.canUpdate = true;
            this.isPowering = true;
        }
    }

    public onRelease() {
        this.isPowering = false;
    }

    protected onUpdate(dt) {

        // 蓄力
        if (this.isPowering) {
            this.maskBtn_color.fanShapedValue -= dt;
            if (this.maskBtn_color.fanShapedValue <= 0) {
                MusicMgr.instance.play(2003);
                ModuleService.getModule(ObjInterModuleC).longClickTriggerItem();
                UIService.hideUI(this);
            }
        }

        // 没有蓄力就慢慢缩回去
        else {
            if (this.maskBtn_color.fanShapedValue >= 1) { return; }
            this.maskBtn_color.fanShapedValue += (dt / 5);
            if (this.maskBtn_color.fanShapedValue >= 1) {
                this.canUpdate = false;
            }
        }
    }

    public setHandVisible(enable: boolean) {
        this.btn_catch.visibility = enable ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    onShow() {
        Event.dispatchToLocal("SetHandVisible", true);
        this.maskBtn_color.fanShapedValue = 1;
        this.isPowering = false;
        this.rootCanvas.renderOpacity = 1;
        LogService.addClientLog("显示PickHud");
    }

    onHide() {
        Event.dispatchToLocal("SetHandVisible", false);
        this.maskBtn_color.fanShapedValue = 1;
        this.isPowering = false;
        LogService.addClientLog("隐藏PickHud");
    }
}