/*
 * @Author       : dal
 * @Date         : 2024-01-26 15:40:05
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-05-20 10:24:36
 * @FilePath: \1001_hall\JavaScripts\codes\utils\UIAniUtil.ts
 * @Description  : 
 */
export class UIAniUtil {

    private static popUpTweenMap: Map<string, Tween<any>> = new Map();
    /**
     * 让一个UI从中将蹦出来
     * @param ui 
     */
    public static popUp(ui: Widget, duration: number = 500, onCompleteCall?: Function) {
        if (this.popUpTweenMap.has(ui.guid)) { this.popUpTweenMap.get(ui.guid).stop(); }
        ui.renderScale = Vector.zero;
        let tween = new Tween({ data: Vector2.zero })
            .to({ data: Vector2.one }, duration)
            .onUpdate((trans) => {
                if (!ui || !ui.visibility) {
                    this.popUpTweenMap.delete(ui.guid);
                    tween.stop();
                    return;
                }
                ui.renderScale = trans.data;
            })
            .start()
            .easing(TweenUtil.Easing.Quartic.Out)
            .onComplete(() => {
                this.popUpTweenMap.delete(ui.guid);
                onCompleteCall && onCompleteCall();
            });
        this.popUpTweenMap.set(ui.guid, tween);
        return tween;
    }

    private static popDownTweenMap: Map<string, Tween<any>> = new Map();

    public static popDown(ui: Widget, duration: number = 500, onCompleteCall?: Function) {
        if (this.popDownTweenMap.has(ui.guid)) { this.popDownTweenMap.get(ui.guid).stop(); }
        ui.renderScale = Vector.one;
        let tween = new Tween({ data: Vector2.one })
            .to({ data: Vector2.zero }, duration)
            .onUpdate((trans) => {
                if (!ui || !ui.visibility) {
                    this.popDownTweenMap.delete(ui.guid);
                    tween.stop();
                    return;
                }
                ui.renderScale = trans.data;
            })
            .start()
            .easing(TweenUtil.Easing.Quartic.Out)
            .onComplete(() => {
                this.popDownTweenMap.delete(ui.guid);
                onCompleteCall && onCompleteCall();
            });
        this.popDownTweenMap.set(ui.guid, tween);
        return tween;
    }

    private static _uiAngleTweenMap: Map<string, Tween<any>> = new Map();

    /**
     * 播放旋转UI动画（0-360自动轮回）
     * @param ui 
     * @param toAngle 要变换到的角度
     * @param duration 持续时间
     * @param doCompleteCall 完成的回调
     */
    static playAngleTurnAni(ui: Widget, toAngle: number, duration: number = 1e3, doCompleteCall?: Function) {
        let tween = this._uiAngleTweenMap.get(ui.guid);
        tween?.stop();
        let curAngle = ui.renderTransformAngle;
        let newToAngle = toAngle;
        if (Math.abs(curAngle - toAngle) > 180) {
            // 方向
            let dir = toAngle - curAngle > 0 ? -1 : 1;
            // 变化值
            let t = 360 - Math.abs(toAngle - curAngle);
            // 最终角度值
            newToAngle = curAngle + t * dir;
        }
        tween = new Tween({ angle: ui.renderTransformAngle })
            .to({ angle: newToAngle }, duration)
            .onUpdate((trans) => {
                if (!ui || !ui.visibility) { tween.stop(); return; }
                ui.renderTransformAngle = trans.angle;
            })
            .start()
            .onComplete(() => {
                ui.renderTransformAngle = toAngle;
                doCompleteCall && doCompleteCall();
                this._uiAngleTweenMap.delete(ui.guid);
            });
        this._uiAngleTweenMap.set(ui.guid, tween);
    }

    private static opaTween: Map<string, Tween<any>> = new Map();

    /**
     * 播放UI的透明度tween动画（0-360自动轮回）
     */
    public static playOpaAni(ui: Widget, toOpa: number, duration: number = 1e3, doCompleteCall?: Function) {
        let uuid = StringUtil.isEmpty(ui["uuid"]) ? ui.guid : ui["uuid"];
        this.opaTween.get(uuid)?.stop();
        let tween = new Tween({ value: ui.renderOpacity })
            .to({ value: toOpa }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) {
                    tween.stop();
                    this.opaTween.delete(uuid);
                    return;
                }
                ui.renderOpacity = delta.value;
            })
            .start()
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
                this.opaTween.delete(uuid);
            });
        this.opaTween.set(uuid, tween);
        return tween;
    }

    /**
     * 播放UI的scale 的tween动画
     */
    static playScaleAni(ui: Widget, toScale: Vector2, duration: number = 1e3, doCompleteCall?: Function, delay?: number, easing?: TweenEasingFunction) {
        let tween = new Tween({ value: ui.renderScale })
            .to({ value: toScale }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) { tween.stop(); return; }
                ui.renderScale = delta.value;
            })
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
            });
        delay && tween.delay(delay);
        easing && tween.easing(easing);
        tween.start();
    }

    private static posMap: Map<string, Tween<any>> = new Map();

    static playPosAni(ui: Widget, toPos: Vector2, duration: number = 1e3, doCompleteCall?: Function, delay?: number, easing?: TweenEasingFunction) {
        // ui的guid不是唯一的
        let uuid = StringUtil.isEmpty(ui["uuid"]) ? ui.guid : ui["uuid"];
        this.posMap.get(uuid)?.stop();
        let tween = new Tween({ value: ui.position })
            .to({ value: toPos }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) {
                    tween.stop();
                    this.posMap.delete(uuid);
                    return;
                }
                ui.position = delta.value;
            })
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
                this.posMap.delete(uuid);
            });
        this.posMap.set(uuid, tween);
        delay && tween.delay(delay);
        easing && tween.easing(easing);
        tween.start();
    }
}