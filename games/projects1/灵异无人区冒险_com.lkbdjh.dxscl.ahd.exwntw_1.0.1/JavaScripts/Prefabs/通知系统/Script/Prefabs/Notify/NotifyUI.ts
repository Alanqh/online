/*
 * @Description: Description
 */
/*
 * @Description: Description
 */

import Notify_Generate from "../../../../../ui-generate/Prefabs/通知系统/UI/Notify_generate";

export default class NotifyUI extends Notify_Generate {

    private _startTime: number = 0;
    private _complateCall: () => void;

    private _start: boolean = false;

    onStart() {
        this.canUpdate = true;
    }

    onShow(tips: string, complateCall: () => void) {

        this.tips.text = tips;
        this._complateCall = complateCall;
        this._startTime = -1;

        this.tips.position = new mw.Vector2(850, 176);

        this._start = true;

    }

    onUpdate(dt: number) {

        if (!this.visible || !this._start) return;

        if (this._startTime < 0) {
            this._startTime += dt * 1.2;
            return;
        }
        else {
            this._startTime += dt * 2;
        }


        if (this._startTime >= 1) this._startTime = 1;

        this.tips.position = new mw.Vector2(850, mw.MathUtil.lerp(176, -100, this._startTime));

        if (this._startTime == 1) {
            this._start = false;
            this._complateCall();
        }
    }

}