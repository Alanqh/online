/** 
 * @Author       : lei.zhao
 * @Date         : 2023-03-09 10:35:29
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-03-09 10:45:22
 * @FilePath     : \色块派对\JavaScripts\ui\KeyFrame.ts
 * @Description  : 修改描述
 */

import KeyFrame_Generate from "../../../../ui-generate/Prefabs/CameraEditor/UI/KeyFrame_generate";


export default class KeyFrameUI extends KeyFrame_Generate {
    public onStart() {
        this.button.onClicked.add(() => {
            Event.dispatchToLocal("KeyFrame.Click", this);
        });
        this.button.normalImageColor = mw.LinearColor.green;
    }
    onShow() {
        this.uiObject.zOrder = 0;
    }
    /**选中关键帧 */
    public select() {
        this.button.normalImageColor = mw.LinearColor.yellow;
    }
    /**取消选中关键帧 */
    public unselect() {
        this.button.normalImageColor = mw.LinearColor.green;
    }
    get layer(): number {
        return mw.UILayerMiddle;
    }
}