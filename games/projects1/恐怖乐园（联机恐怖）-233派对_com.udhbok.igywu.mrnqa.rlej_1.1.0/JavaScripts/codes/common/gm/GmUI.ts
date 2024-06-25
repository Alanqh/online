import { GMBasePanel } from "module_gm";
import GMHUD_Generate from "../../../ui-generate/ShareUI/module_gm/GMHUD_generate";
import GMItem_Generate from "../../../ui-generate/ShareUI/module_gm/GMItem_generate";


export class GMBasePanelUI extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
    static instance: GMBasePanelUI;
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
        if (SystemUtil.isPIE) {
            InputUtil.onKeyDown(Keys.U, () => {
                const ui = UIService.getUI(GMHUD_Generate);
                if (ui.visible) {
                    UIService.hideUI(ui)
                }
                else {
                    UIService.showUI(ui);
                }
            })
            GMBasePanelUI.instance = this;
        }
    }
}
