/*

 * @Date         : 2023-03-27 16:41:44

 * @LastEditTime : 2023-03-29 13:25:44
 * @FilePath     : \commonprefab3\JavaScripts\Prefabs\IAA\IAAUI.ts
 * @Description  : 
 */
import IAAUI_Generate from "../../ui-generate/Prefabs/IAA/IAAUI_generate";

export class IAAUI extends IAAUI_Generate {
    private _maxKeepTime: number = 0;
    private _curKeepSec: number = 0;

    onUpdate(dt: number) {
        this.showKeepTimeInfo(dt);
    }

    onShow() {
        this.canUpdate = true;
        console.log("showcanvas")
    }

    setKeepTime(maxKeepTime: number) {
        this._maxKeepTime = maxKeepTime;
        this._curKeepSec = 0;
    }

    onHide() {
        this.canUpdate = false;
    }

    /**
     * 更新持续时间
     * @param dt 帧时间
     */
    private showKeepTimeInfo(dt: number) {
        this._curKeepSec += dt;
        this.keepTimeTxt.text = (((this._maxKeepTime - this._curKeepSec)).toFixed(2) + "s");
        this.keepTimeBar.currentValue = ((this._maxKeepTime - this._curKeepSec) / this._maxKeepTime);
        if (this._curKeepSec >= this._maxKeepTime) {
            this.setVisible(false);
        }
    }
}