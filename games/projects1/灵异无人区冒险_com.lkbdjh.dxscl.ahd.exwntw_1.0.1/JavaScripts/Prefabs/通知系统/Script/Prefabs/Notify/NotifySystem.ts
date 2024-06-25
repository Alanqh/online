/*
 * @Description: Description
 */
/*
 * @Description: Description
 */
import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent"; import { PrefabReport } from "../../../../../prefabEvent/PrefabReport";
;
import NotifyUI from "./NotifyUI";

export default class NotifySystem extends mw.Script {

    private tips: NotifyUI[] = [];

    @PrefabReport(15)
    onStart() {

        PrefabEvent.PrefabEvtNotify.onNotify((text: string) => {

            if (this.tips.length <= 0) {
                let ui = mw.UIService.create(NotifyUI);
                ui.setVisible(true);
                this.tips.push(ui);
            }
            let ui = this.tips.shift();
            if (ui) {
                mw.UIService.showUI(ui, mw.UILayerTop, text, () => {
                    mw.UIService.hideUI(ui);
                    this.tips.push(ui);
                });
            }

        })

    }

}