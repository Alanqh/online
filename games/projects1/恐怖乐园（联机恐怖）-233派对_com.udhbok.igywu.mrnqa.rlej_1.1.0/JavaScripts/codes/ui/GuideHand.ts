/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2024-04-28 17:45:19
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-13 20:50:00
 * @FilePath     : \1001_hall\JavaScripts\guide\ui\GuideHand.ts
 * @Description  : 
 */
import { PollingUtils } from "../../codes/utils/PollingUtils";
import GuideHand_Generate from "../../ui-generate/ShareUI/GuideHand_generate";

const tempData = {
    "mVirtualJoystickPanel": {
        useLeftTween: false, startRelativePos: new Vector2(250, 490), endRelativePos: new Vector2(250, 380), tweenTime: 1000, textRelativePos: new Vector2(220, -200)
    },
    "mTouchPad": {
        useLeftTween: false, startRelativePos: new Vector2(700, 430), endRelativePos: new Vector2(1000, 430), tweenTime: 1000, textRelativePos: new Vector2(220, -200)
    }
}

export class GuideHand extends GuideHand_Generate {
    private tween: mw.Tween<{}> = null;
    protected onStart(): void {
        this.layer = UILayerSystem;
    }

    /**
     * 开始缓动
     * @param startPos 开始位置 
     * @param endPos 结束位置
     * @param isLeft 是否使用左手指
     * @param tweenTime 缓动时间
     */
    public async startTween(ui: Widget, isSecond: boolean = false) {

        await PollingUtils.add(() => {
            if (ui.visible) {
                return true;
            }
            return null
        }, 8000, 200, true)
        await TimeUtil.delaySecond(0.1);

        if (this.tween) {
            this.tween = null;
        }
        let name = ui.name;
        if (isSecond) {
            name += "_2";
        }
        let widData = tempData[name];
        if (!widData) {
            widData = { useLeftTween: false, startRelativePos: new Vector2(210, 10), endRelativePos: new Vector2(250, 50), tweenTime: 1000, textRelativePos: new Vector2(220, -200) }
        }

        let outPixelPosition = new Vector2();
        let outViewportPosition = new Vector2();
        localToViewport(ui.tickSpaceGeometry, Vector2.zero, outPixelPosition, outViewportPosition);

        let startPos = outViewportPosition.clone().add(widData.startRelativePos)
        let endPos = outViewportPosition.clone().add(widData.endRelativePos)

        this.tween = new Tween({ pos: startPos }).to({ pos: endPos }, widData.tweenTime).onUpdate((obj) => {
            if (widData.useLeftTween) {
                this.mLeftBtnHand.position = obj.pos;
            } else {
                this.mRigntBtnHand.position = obj.pos;
            }
        }).repeat(Infinity).yoyo(true).onStart(() => {
            UIService.showUI(this, this.layer);
            this.mLeftBtnHand.visibility = widData.useLeftTween ? SlateVisibility.HitTestInvisible : SlateVisibility.Collapsed;
            this.mRigntBtnHand.visibility = widData.useLeftTween ? SlateVisibility.Collapsed : SlateVisibility.HitTestInvisible;
        }).start();
    }

    public closeTween() {
        if (this.tween) {
            this.tween.stop();
        }
        UIService.hideUI(this);
    }
}