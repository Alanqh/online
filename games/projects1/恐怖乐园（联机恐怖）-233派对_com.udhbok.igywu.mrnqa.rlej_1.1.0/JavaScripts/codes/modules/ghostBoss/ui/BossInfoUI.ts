import Boss_UI_Generate from "../../../../ui-generate/ShareUI/boss/Boss_UI_generate";
import { TimerOnly } from "../../../utils/AsyncTool";

export class BossInfoUI extends Boss_UI_Generate {
    private _tauntArr: mw.Image[] = [];

    onStart() {
        for (let index = 0; index < 4; index++) {
            const element = this[`taunt${index + 1}`] as Image;
            element.visibility = SlateVisibility.Collapsed;
            this._tauntArr.push(element);
        }
    }

    public updateHp(hp: number, maxHp: number) {
        const percent = hp / maxHp;
        this.mText_BossHP.text = `${hp}/${maxHp}`
        this.mProgressBar_BossHP.percent = percent;
        this.mText_BossHPPercent.text = (percent * 100).toFixed(2) + "%"
    }

    public updateBossInfo(name: string) {
        this.mText_Bossname.text = name;
    }

    public updateHate(hateLv: number) {
        for (let index = 0; index < this._tauntArr.length; index++) {
            const element = this._tauntArr[index];
            element.visibility = hateLv == index ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        }
    }

    /**
     * 
     * @param time 单位为s
     */
    public updateTimer(txt: string) {
        this.mText_BossTime.text = txt;
    }

    public setBossCavVisiable(visiable: boolean) {
        this.mCanvas_Boss.visibility = visiable ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    private _catTipTimer: TimerOnly = new TimerOnly();

    public setTipsVisiable(visiable: boolean) {
        this.mTextBlock_BossRun.visibility = visiable ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        if (!visiable) {
            this.mTextBlock_BossRun.text = "";
        }
    }

    public showTips(tip: string) {
        tip = "◉ " + tip;
        this.mTextBlock_BossRun.text = tip;
    }

    public showTipsWithTime(tip: string, time: number) {
        tip = "◉ " + tip;
        this.mTextBlock_BossRun.text = tip;
        this.mTextBlock_BossRun.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this._catTipTimer.setTimeout(() => {
            this.mTextBlock_BossRun.visibility = mw.SlateVisibility.Collapsed;
        }, time * 1000)
    }
}
