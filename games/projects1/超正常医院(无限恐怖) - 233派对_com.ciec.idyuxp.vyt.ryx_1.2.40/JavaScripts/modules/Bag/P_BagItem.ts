import BagItem_Generate from "../../ui-generate/Porp/BagItem_generate";
import PropItem_Generate from "../../ui-generate/Porp/PropItem_generate";
import { utils } from "../../utils/uitls";
import BagItem from "./BagItem";
import P_Bag from "./P_Bag";

/**背包项状态 */
export enum BagItemStatus {
    /**非选中 */
    Unselected,
    /**选中 */
    Selected,
    /**禁用 */
    Disable,
}
export default class P_BagItem extends BagItem_Generate {

    public selectStatus: BagItemStatus = BagItemStatus.Unselected;

    public isCarrying: boolean = false;

    /**背包UI */
    private bagUI: P_Bag;

    public curTween: mw.Tween<any> = null;

    public remainTime: number = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.bagUI = UIService.getUI(P_Bag);
    }

    /**设置为选择状态 */
    public setSelected() {
        this.selectStatus = BagItemStatus.Selected;
        this.mSelect.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /**设置为非选中状态 */
    public setUnselected() {
        this.selectStatus = BagItemStatus.Unselected;
        this.mSelect.visibility = SlateVisibility.Collapsed;
    }

    /**设置为携带状态 */
    public setCarrying(isCarrying: boolean) {
        this.isCarrying = isCarrying;
        if (isCarrying) {
            this.mImage_Equip.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mImage_Equip.visibility = SlateVisibility.Collapsed;
        }
    }


    /**点击图标 */
    public clickTween() {
        if (this.bagUI.isPlayingTweenCount > 0) return;
        if (!this) return;
        this.bagUI.isPlayingTweenCount++;

        let normalScale = this.rootCanvas.renderScale;
        let bigScale = Vector2.multiply(normalScale, 1.2);
        let smallScale = Vector2.multiply(normalScale, 0.9);
        let bigTween = new mw.Tween({ scale: normalScale.clone() }).to({ scale: bigScale }, 100)
            .onUpdate(obj => {
                if (!this) return;
                this.rootCanvas.renderScale = obj.scale;
            })

        let smallTween = new mw.Tween({ scale: bigScale.clone() }).to({ scale: smallScale }, 100)
            .onUpdate(obj => {
                if (!this) return;
                this.rootCanvas.renderScale = obj.scale;
            })

        let resumeTween = new mw.Tween({ scale: smallScale.clone() }).to({ scale: normalScale }, 100)
            .onUpdate(obj => {
                if (!this) return;
                this.rootCanvas.renderScale = obj.scale;
            })
            .onComplete(() => {
                this.bagUI.isPlayingTweenCount--;
                this.curTween = null;
            })
        bigTween.chain(smallTween);
        smallTween.chain(resumeTween);
        bigTween.start();
        this.curTween = bigTween;
    }

    onDestory() {
        if (this.curTween) {
            this.curTween.stop();
            this.bagUI.isPlayingTweenCount--;
        }
    }

    /**设置剩余时间 */
    setRemainTime() {
        if (this.remainTime == null || this.remainTime <= 0) {
            this.bagUI.mText_RemainTime.visibility = SlateVisibility.Collapsed;
        } else {
            this.bagUI.mText_RemainTime.visibility = SlateVisibility.SelfHitTestInvisible;
            let time = utils.parseToDayHourMin(this.remainTime);
            
            this.bagUI.mText_RemainTime.text = `剩余体验时间: ${time.days}天${time.hours}小时${time.minutes}分`;
        }
    }
}