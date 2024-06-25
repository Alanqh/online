/*
 * @Author       : dal
 * @Date         : 2024-03-19 16:27:55
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-19 16:32:58
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\buff\ui\PoisonHud.ts
 * @Description  : 
 */

import Poison_UI_Generate from "../../../../ui-generate/ShareUI/Poison_UI_generate";

export default class PoisonHud extends Poison_UI_Generate {

    private tween: Tween<any>;

    /**
     * 播放UI的透明度tween动画（0-360自动轮回）
     */
    private playOpaAni(ui: Widget, toOpa: number, duration: number = 1e3) {
        this.img.renderOpacity = 0;
        this.tween = new Tween({ value: ui.renderOpacity })
            .to({ value: toOpa }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) { this.tween.stop(); return; }
                ui.renderOpacity = delta.value;
            })
            .yoyo(true)
            .repeat(Infinity)
            .start()
    }

    onShow() {
        this.playOpaAni(this.img, 1, 1e3);
    }

    onHide() {
        this.tween?.stop();
    }
}