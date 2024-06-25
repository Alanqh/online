/** 
 * @Author       : lei.zhao
 * @Date         : 2023-03-09 10:35:29
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-03-09 10:45:42
 * @FilePath     : \色块派对\JavaScripts\ui\TravelerUI.ts
 * @Description  : 修改描
 */

import TravelerUI_Generate from "../../../../ui-generate/Prefabs/CameraEditor/UI/TravelerUI_generate";



export default class TravelerUI extends TravelerUI_Generate {

    get layer(): number {
        return mw.UILayerScene;
    }

    onShow() {
        this.uiObject.zOrder = 1;
    }
    protected onTouchStarted(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.EventReply {
        Event.dispatchToLocal("TravelerUI_TouchBegin");
        return mw.EventReply.handled;
    }
    /**
     * 手指或则鼠标再UI界面上移动时
     */
    protected onTouchMoved(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.EventReply {
        const point = mw.absoluteToLocal(InGeometry, InPointerEvent.screenSpacePosition);
        Event.dispatchToLocal("TravelerUI_TouchMove", point);
        return mw.EventReply.handled;
    }
}