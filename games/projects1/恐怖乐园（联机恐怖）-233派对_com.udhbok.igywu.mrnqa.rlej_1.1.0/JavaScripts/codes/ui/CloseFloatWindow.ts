/*
 * @Author       : dal
 * @Date         : 2024-04-25 15:57:59
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-26 11:23:16
 * @FilePath     : \hauntedparadise\JavaScripts\codes\ui\CloseFloatWindow.ts
 * @Description  : 
 */
import CloseFloatUI_Generate from "../../ui-generate/ShareUI/common/CloseFloatUI_generate";
import { RewardTipsHud } from "../modules/achievement/ui/RewardTipsHud";
import { UIItemDetailEn } from "../modules/store/ui/UIItemDetailEn";
import UIShop from "../modules/store/ui/UIShop";
import { UIPrizeTips } from "../modules/treasure/ui/UIPrizeTips";

export class CloseFloatWindow extends CloseFloatUI_Generate {


    onStart() {
        this.layer = UILayerSystem;
        this.btn_close.onClicked.add(() => {
            UIService.hide(CloseFloatWindow);
            UIService.hide(UIPrizeTips);
            UIService.getUI(UIShop).closeGiftTips();
        })
    }
}

export class CloseFloatWindowEn extends CloseFloatUI_Generate {


    onStart() {
        this.layer = UILayerDialog;

        this.btn_close.onClicked.add(() => {
            UIService.hide(UIItemDetailEn);
            UIService.hideUI(this);
        })
    }
}

export class CloseRewardTipsFloatWindow extends CloseFloatUI_Generate {

    onStart() {
        this.layer = UILayerDialog;

        this.btn_close.onClicked.add(() => {
            UIService.hide(RewardTipsHud);
            UIService.hideUI(this);
        })
    }
}