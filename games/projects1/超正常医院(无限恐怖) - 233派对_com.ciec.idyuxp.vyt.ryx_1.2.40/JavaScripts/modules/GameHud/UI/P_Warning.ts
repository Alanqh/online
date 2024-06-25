import Warning_Generate from "../../../ui-generate/GameHUD/Warning_generate";


export class P_Warning extends Warning_Generate {
    /**警报动画 */
    private warningTween: mw.Tween<{ render: number; }>;



    /**
     * 警告动画
     */
    public warningAni() {
        if (this.warningTween) {
            return;
        }
        this.show();
        this.warningTween = new mw.Tween({ render: 1 }).to({ render: 0.3 }, 1 * 1000)
            .onUpdate(obj => {
                this.mImg_Warning.renderOpacity = obj.render;
            })
            .onComplete(() => {
                this.hide();
                this.warningTween = null;
            })
            .yoyo()
            .repeat(1)
            .start();
    }


}