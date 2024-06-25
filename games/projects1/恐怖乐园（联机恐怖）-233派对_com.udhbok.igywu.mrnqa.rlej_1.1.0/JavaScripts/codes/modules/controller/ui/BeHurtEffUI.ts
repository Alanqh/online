import Blood_Generate from "../../../../ui-generate/ShareUI/Blood_generate";

export default class BeHurtEffUI extends Blood_Generate {

    private tween: Tween<any>;

    /**
     * 播放UI的透明度tween动画
     */
    private playOpaAni(ui: Widget, toOpa: number, duration: number = 1e3, playTimes: number = 1) {
        this.rootCanvas.renderOpacity = 0;
        this.tween = new Tween({ value: ui.renderOpacity })
            .to({ value: toOpa }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) { this.tween.stop(); return; }
                ui.renderOpacity = delta.value;
            })
            .onComplete(() => {
                UIService.hideUI(this);
            })
            .yoyo(true)
            .repeat(playTimes)
            .start()
    }

    protected onShow(playTimes: number = 1) {
        this.playOpaAni(this.rootCanvas, 1, 1e3, playTimes);
    }

    protected onHide() {
        this.tween?.stop();
    }
}