import P_Game_HUD from "../../modules/GameHud/UI/P_Game_HUD";
import TipsUI from "./TipsUI";


export default class UITools {

    /**显示软提示 */
    public static ShowSoftTips(str: string) {
        mw.UIService.show(TipsUI).showTips(str);
    }

    private static guideTween: mw.Tween<any> = null;
    /**显示指引小手 */
    public static ShowGuideHand(pos: Vector2, moveDistance: Vector2) {
        let guideImg = UIService.getUI(P_Game_HUD).mImg_Guide;
        let tweenTime = 500;
        let startPos = pos;
        let endPos = Vector2.add(pos, moveDistance);

        if (this.guideTween) this.guideTween.stop();
        this.guideTween = new mw.Tween({ pos: startPos }).to({ pos: endPos }, tweenTime)
            .onUpdate((obj) => {
                guideImg.position = obj.pos;
            })
            .yoyo(true)
            .start();

    }

    /**隐藏提示小手 */
    public static HideGuideHand() {
        if (this.guideTween) {
            this.guideTween.stop();
            this.guideTween = null;
        }
        UIService.getUI(P_Game_HUD).mImg_Guide.visibility = SlateVisibility.Collapsed;
    }


    private static tweenTime = 100;
    private static moveDis = 120;
    /**弹窗动画 */
    private static popUpTween: mw.Tween<any> = null;
    public static playPopUpTween(ui: UIScript | Widget) {
        // 如果有弹窗动画正在播，等他播完再弹
        if (this.popUpTween || this.closeTween) {
            setTimeout(() => {
                this.playPopUpTween(ui);
            }, this.tweenTime);
            return;
        }
        // 参数为UI脚本则为根画布
        if (ui instanceof UIScript) {
            UIService.showUI(ui, ui.layer);
            ui = ui.rootCanvas;
        }
        ui.visibility = SlateVisibility.Visible;
        let endPos = ui.position.clone();
        // 出现位置向下移动半个身位
        let startPos = new Vector2(ui.position.x, ui.position.y + this.moveDis);
        this.popUpTween = new mw.Tween({ pos: startPos, alpha: 0 }).to({ pos: endPos, alpha: 1 }, this.tweenTime)
            .onUpdate((obj) => {
                if (ui == null) return;
                ui = ui as Widget;
                ui.position = obj.pos;
                ui.renderOpacity = obj.alpha;
            })
            .onComplete(() => {
                this.popUpTween = null;
            })
            .start();
    }

    private static closeTween: mw.Tween<any> = null;
    public static playCloseTween(ui: UIScript | Widget) {
        console.error(`open:${this.popUpTween}, colse:${this.closeTween}`)
        // 如果有弹窗动画正在播，等他播完再弹
        if (this.closeTween || this.popUpTween) {
            setTimeout(() => {
                this.playCloseTween(ui);
            }, this.tweenTime);
            return;
        }
        // 参数为UI脚本则为根画布
        if (ui instanceof UIScript) {
            ui = ui.rootCanvas;
        }
        let startPos = ui.position.clone();
        // ui = ui as Widget;
        // 出现位置向下移动半个身位
        let endPos = new Vector2(ui.position.x, ui.position.y + this.moveDis);
        this.closeTween = new mw.Tween({ pos: startPos.clone(), alpha: 1 }).to({ pos: endPos, alpha: 0 }, this.tweenTime)
            .onUpdate((obj) => {
                if (ui == null) return;
                ui = ui as Widget;
                ui.position = obj.pos;
                ui.renderOpacity = obj.alpha;
            })
            .onComplete(() => {
                ui = ui as Widget;
                ui.position = startPos;
                ui.visibility = SlateVisibility.Collapsed;
                this.closeTween = null;
            })
            .start();
    }

}