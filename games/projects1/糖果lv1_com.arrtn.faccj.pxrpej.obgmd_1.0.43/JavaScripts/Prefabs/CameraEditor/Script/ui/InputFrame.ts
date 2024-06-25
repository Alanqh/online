/** 
 * @Author       : lei.zhao
 * @Date         : 2023-03-09 10:35:29
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-03-09 10:39:03
 * @FilePath     : \色块派对\JavaScripts\ui\InputFrame.ts
 * @Description  : 修改描述
 */
import InputFrame_Generate from "../../../../ui-generate/Prefabs/CameraEditor/UI/InputFrame_generate";
import { NodeContainer } from "../NodeContainer";
import { Resolver } from "../Resolver";

export default class InputFrame extends InputFrame_Generate {
    private flag: string;
    public onStart() {
        this.okButton.onClicked.add(() => {
            if (this.flag == "import") {
                NodeContainer.insertNodes(Resolver.unserialize(this.inputBox.text));
                Event.dispatchToLocal("CameraMainPanel.UpdateFrame");
            } else {
                this.inputBox.text = Resolver.serialize(NodeContainer.nodes);
            }
        });
        this.closeButton.onClicked.add(() => {

            mw.UIService.hideUI(this);
        });
    }

    public onShow(flag: string) {
        this.uiObject.zOrder = 1000;
        this.flag = flag;
        this.inputBox.text = "";
    }
    get layer(): number {
        return mw.UILayerMiddle;
    }
}