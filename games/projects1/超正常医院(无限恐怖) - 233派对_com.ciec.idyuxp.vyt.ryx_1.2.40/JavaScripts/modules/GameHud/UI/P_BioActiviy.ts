import { EnumAnalytics } from "../../../const/enum";
import Inlet_Generate from "../../../ui-generate/Event/Inlet_generate";
import MessageBox from "../../../utils/UI/MessageBox";
import { AnalyticsModuleC } from "../../Analytics/AnalyticsModule";


/**生化模式 */
export class P_Bio extends Inlet_Generate {

    public onJumpGameAC: Action = new Action();
    protected onAwake(): void {
        this.layer = UILayerMiddle;
    }

    onStart() {
        this.mBtn_Close.onClicked.add(() => {
            this.hide();
        });
        this.mBtn_Inlet.onClicked.add(() => {
            MessageBox.showTwoBtnMessage("是否回到医院", (res) => {
                if (!res) return;
                this.onJumpGameAC.call();
            });
        });
    }
    protected onShow(...params: any[]): void {
        ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.Event_Click);
    }


}