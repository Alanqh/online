import { GameConfig } from "../../config/GameConfig";
import Tips_UI_Generate from "../../ui-generate/ShareUI/Tips_UI_generate"
import { TimerOnly } from "../utils/AsyncTool";
import Tips from "../utils/Tips";
import { GhostTraceHelper } from "../utils/TraceHelper";

// Tips.show = (val: string) => {
//     mw.UIService.getUI(TipsUI).showTips(val)
// }

export class TipsUI extends Tips_UI_Generate {
    public static showTips(tip: string) {
        mw.UIService.getUI(TipsUI).showTips(tip)
    }
    public static showCatTips(tip: string) {
        mw.UIService.getUI(TipsUI).showCatTips(tip)
    }

    private _tipTimer: TimerOnly = new TimerOnly();

    private _catTipTimer: TimerOnly = new TimerOnly();

    onStart() {
        this.layer = mw.UILayerDialog;
        this.canvas_tips.visibility = mw.SlateVisibility.Collapsed;
        this.canvas_catTips.visibility = mw.SlateVisibility.Collapsed;
        Event.addLocalListener("showTips", (guid: string, val: string) => {
            let lan = GameConfig.Language[val];
            if (lan && lan.Value) {
                this.showTips(lan.Value)
            }
            else {
                this.showTips(val);
            }
        })
        Event.addLocalListener("showWorldTips", (guid: string, val: string) => {
            let lan = GameConfig.Language[val];
            if (lan && lan.Value) {
                this.showTips(lan.Value)
            }
            else {
                this.showTips(val);
            }
        })
        this.text_catTip.text = "";
    }

    public showTips(tip: string, time: number = 5) {
        tip = "◉ " + tip;
        this.canvas_tips.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.text_tip.text = tip;
        this._tipTimer.setTimeout(() => {
            this.canvas_tips.visibility = mw.SlateVisibility.Collapsed;
        }, time * 1000)
    }

    public setCatVisiable(visiable: boolean) {
        this.canvas_catTips.visibility = visiable ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        if (!visiable) {
            this.text_catTip.text = "";
        }
    }

    public showCatTips(tip: string) {
        tip = "◉ " + tip;
        this.text_catTip.text = tip;
    }

    public showCatTipsWithTime(tip: string, time: number) {
        tip = "◉ " + tip;
        this.text_catTip.text = tip;
        this.canvas_catTips.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this._catTipTimer.setTimeout(() => {
            this.canvas_catTips.visibility = mw.SlateVisibility.Collapsed;
        }, time * 1000)
    }
}