import Reset_Generate from "../../../ui-generate/Reset_generate";


export class P_Reset extends Reset_Generate {
    private timeout: any = null;

    onStart() {
        this.layer = mw.UILayerTop;
    }

    public showAni() {

        this.show();

        //透明度动画
        const bezier = [.13, .88, .82, .15];
        let tween = new mw.Tween({ o: 1 }).to({ o: 0.4 }, 4 * 1000)
            .onUpdate((value) => {
                this.mImage.renderOpacity = value.o;
            }).onComplete((obj) => {
                this.hide();
                if (this.timeout) {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }
                this.mImage.renderOpacity = 1;
            }).start().easing((x) => {
                return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
            })

        this.timeout = setTimeout(() => {
            this.hide();
            clearTimeout(this.timeout);
            this.timeout = null;
        }, 6000);

    }


}