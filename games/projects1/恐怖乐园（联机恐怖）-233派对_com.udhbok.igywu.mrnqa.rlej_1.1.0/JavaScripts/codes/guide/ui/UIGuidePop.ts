/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-01-30 13:11:40
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-19 17:44:45
 * @FilePath     : \1001_hall\JavaScripts\codes\guide\ui\UIGuidePop.ts
 * @Description  : 
 */



import Hall_GuidePopup_UI_Generate from "../../../ui-generate/ShareUI/hall/Hall_GuidePopup_UI_generate";
import { MainUI } from "../../ui/MainUI";
import ExGuideModuleC from "../ExGuideModuleC";

export default class UIGuidePop extends Hall_GuidePopup_UI_Generate {
    onStart() {
        this.mBtn_Close.onClicked.add(() => {
            UIService.hide(UIGuidePop)
            UIService.show(MainUI).applyHallPanel();
        })
    }

    onHide() {
        ModuleService.getModule(ExGuideModuleC).guideStage3()
    }
}