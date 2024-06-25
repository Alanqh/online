import { GlobalData } from "../../../const/GlobalData";
import Cure_Generate from "../../../ui-generate/Ghost/Cure_generate";
import { cubicBezier } from "../../../utils/uitls";

const time = GlobalData.PlayerAttribute.bloodShowTime;
const bezier = GlobalData.PlayerAttribute.showTweenBezier

/**
 * 恢复血量ui动画
 */
export class P_Cure extends Cure_Generate {

    private tween_1 = new mw.Tween({ X: 0 })
        .to({ X: 1 })
        .duration(time[0])
        .onUpdate(val => {
            this.mImage_Blood.renderOpacity = val.X;
        })
        .easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]))
        .start();

    private tween_2 = new mw.Tween({ X: 1 })
        .to({ X: 0 })
        .duration(time[1])
        .onUpdate(val => {
            this.mImage_Blood.renderOpacity = val.X;
        })
        .easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]))
        .start()
        .onComplete(() => {
            this.hide();
        });


    onStart() {
        this.tween_1.chain(this.tween_2);
    }

    /**开始显隐动画 */
    public showBlood() {
        if (this.tween_1.isPlaying) {
            this.tween_1.stop();
        }
        if (this.tween_2.isPlaying) {
            this.tween_2.stop();
        }
        this.tween_1.start();
        this.show();
    }


}