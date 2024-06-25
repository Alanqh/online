import { GameConfig } from "../../../config/GameConfig";
import { PlayerRace } from "../../../const/enum";
import RulesTips_Generate from "../../../ui-generate/Ghost/RulesTips_generate";
import { cubicBezier, utils } from "../../../utils/uitls";


/**规则tips */
export class P_RulesTips extends RulesTips_Generate {




    /**
     * 玩家死亡
     */
    public showPlayerDie() {
        // this.mText_Rules.text = GameConfig.Language.Reset_Tips_1.Value;
        // this.show();
        // this.tweenOpacity();
    }

    /**
     * 游戏开始
     * @param str 
     */
    public showRule() {
        this.mText_Rules_2.text = "游戏开始";
        this.show();
        this.tweenOpacity();
    }

    /**阵营tips */
    public showTeamTips(team: PlayerRace) {
        if (team == PlayerRace.Ghost) {
            this.mText_Rules_1.text = "你今夜的身份是感染者";
        } else {
            this.mText_Rules_1.text = "你今夜的身份是求生者";
        }
        this.show();
        this.tweenOpacity();
    }

    /**透明度tween */
    public tweenOpacity() {
        const bezier = [.13, .88, .82, .15];
        let tween = new mw.Tween({ o: 0 }).to({ o: 1 }, 5 / 2 * 1000)
            .onUpdate((value) => {
                this.mCanvas.renderOpacity = value.o;
            }).onComplete((obj) => {
                this.hide();
                this.mCanvas.renderOpacity = 1;
            }).start().easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3])).yoyo(true).repeat(1);
    }



    protected onShow(...params: any[]): void {
        utils.showUITween(this);
    }


}