/*
 * @Author       : xin.zhang xin.zhang@appshahe.com
 * @Date         : 2023-07-03 15:01:25
 * @LastEditors  : xin.zhang xin.zhang@appshahe.com
 * @LastEditTime : 2023-07-13 18:16:41
 * @FilePath     : \catcompanion\JavaScripts\modules\pet\PetCom\TwoFingerToucher.ts
 * @Description  : 
 */

import { GlobalDefine } from "../../../DefNoSubModule";
import { GameDefines } from "../../CehuaDefines";
import AliveDayCount from "../achievement/bean/oneparam/AliveDayCount";

const area = new Vector2(180, 500)
/**
 * 二指缩放组件，用于缩放摄像机
 */
export class TwoFingerToucher {
    private _ispreOpen: boolean = false;

    public enable: boolean = false;
    /**触摸事件 */
    protected toucher: mw.TouchInput;
    /**触摸数量 */
    protected touchNum = 0;
    /**双击距离 */
    protected doubleTouchDistance = 0;
    /**是否触摸屏幕 */
    protected isTouch = false;

    /**
     * 初始化二指组件，绑定相关方法，用于缩放摄像机
     * @param toucher 触摸控件
     */
    public constructor() {
        this.toucher = new mw.TouchInput();
        TimeUtil.onEnterFrame.add(() => {
            if (this._ispreOpen == GameDefines.isThirdPerson) {
                return
            }
            this._ispreOpen = GameDefines.isThirdPerson;
            // cam.springArm.zoomEnabled = this._ispreOpen;
            // cam["currentTouchCount"] = 0;
        })



        this.toucher.onTouch.add((index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
            if (!Player.localPlayer || !Player.localPlayer.character || Player.localPlayer.character.isDestroyed) {
                return;
            }
            const cam = Camera.currentCamera;
            if (cam.parent != Player.localPlayer.character) {
                return;
            }
            if (!this.enable || !this._ispreOpen) {
                return;
            }
            switch (touchType) {
                case mw.TouchInputType.TouchBegin:
                    this.isTouch = true;
                    this.touchNum = index + 1;
                    if (this.touchNum == 2) {
                        let touchVectorArray = this.toucher.getTouchVectorArray();
                        this.doubleTouchDistance = Vector2.distance(touchVectorArray[0], touchVectorArray[1]);
                    }
                    break;
                case mw.TouchInputType.TouchEnd:
                    this.isTouch = false;
                    this.touchNum = index;
                    break;
                case mw.TouchInputType.TouchMove:
                    if (this.touchNum == 2) {
                        /**限制摄像机拉近拉远范围 */
                        let touchVectorArray = this.toucher.getTouchVectorArray();
                        let distance = Vector2.distance(touchVectorArray[0], touchVectorArray[1]);
                        let delta = distance - this.doubleTouchDistance;
                        let length = Camera.currentCamera.springArm.length;
                        length -= delta;
                        length = MathUtil.clamp(length, area.x, area.y);
                        Camera.currentCamera.springArm.length = length;
                        this.doubleTouchDistance = distance;
                    }
            }
        });

        InputUtil.onKeyDown(Keys.MouseScrollDown, () => {
            if (Player.localPlayer.character.isDestroyed) {
                return;
            }
            const cam = Camera.currentCamera;
            if (cam.parent != Player.localPlayer.character) {
                return;
            }
            if (!this.enable || !this._ispreOpen) {
                return;
            }
            let length = Camera.currentCamera.springArm.length;
            length += 10;
            length = MathUtil.clamp(length, area.x, area.y);
            Camera.currentCamera.springArm.length = length;
        })
        InputUtil.onKeyDown(Keys.MouseScrollUp, () => {
            if (Player.localPlayer.character.isDestroyed) {
                return;
            }
            const cam = Camera.currentCamera;
            if (cam.parent != Player.localPlayer.character) {
                return;
            }
            if (!this.enable || !this._ispreOpen) {
                return;
            }
            let length = Camera.currentCamera.springArm.length;
            length -= 10;
            length = MathUtil.clamp(length, area.x, area.y);
            Camera.currentCamera.springArm.length = length;
        })
    }
}