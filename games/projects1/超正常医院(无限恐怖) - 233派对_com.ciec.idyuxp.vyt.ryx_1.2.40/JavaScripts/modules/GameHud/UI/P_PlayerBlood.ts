import PlayerBlood_Generate from "../../../ui-generate/GameHUD/PlayerBlood_generate";



export class P_PlayerBlood extends PlayerBlood_Generate {
    onStart() {
        this.startState();
    }

    private startState() {
        this.mImage_1.renderOpacity = 0;
        this.mImage_2.renderOpacity = 0;
        this.mImage_3.renderOpacity = 0;
    }

    /**播放动画 */
    public playAni() {
        this.opacityAni(this.mImage_1);
        setTimeout(() => {
            this.opacityAni(this.mImage_2);
        }, 500);
        setTimeout(() => {
            this.opacityAni(this.mImage_3, true);
        }, 1000);
        this.show();
    }

    /**透明度动画 */
    public opacityAni(ui: Image, isHide: boolean = false) {
        new mw.Tween({ render: 0.3 }).to({ render: 1 }, 1 * 1000)
            .onUpdate(obj => {
                ui.renderOpacity = obj.render;
            })
            .onComplete(() => {
                if (isHide) {
                    this.hide();
                    this.startState();
                }
            })
            .start();
    }

}