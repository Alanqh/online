import CountDown_Generate from "../../../ui-generate/Countdown/CountDown_generate";
import { ToolUtils } from "../../dress/ToolUtils";

/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-04-07 17:46:06
 * @LastEditors  : chenxinyu
 * @LastEditTime : 2023-07-17 13:25:55
 * @FilePath     : \stumbleguys\JavaScripts\modules\ProcessModule\UI\CountDownUI.ts
 * @Description  : 修改描述
 */
export class CountDownUI extends CountDown_Generate {
    endTime: number = 0
    /**是否可以进入最后五秒倒计时 */
    canEnterLast: boolean = true

    onStart() {
        Event.addLocalListener("GameState.End.Client", () => {
            this.canUpdate = false
        })
        Event.addServerListener("Player.ALL.Finish", (time: number) => {
            this.endTime = time * 1000 + Date.now();
        });
    }

    onShow(endTime: number) {
        this.endTime = endTime
        this.mCanvas.visibility = mw.SlateVisibility.Collapsed
        this.canUpdate = true
    }

    onUpdate(dt: number) {
        let countDown = this.endTime - Date.now()
        if (countDown <= 30000 && countDown >= 0) {
            if (this.mCanvas.visibility == mw.SlateVisibility.Collapsed) this.mCanvas.visibility = mw.SlateVisibility.Visible
            this.mTextTime.text = ToolUtils.getFormateTime(countDown)

            if (countDown <= 6000 && this.canEnterLast) {
                // 摆动tween
                let clockTween = new mw.Tween({ rot: -30 })
                    .to({ rot: 30 }, 200)
                    .onUpdate(obj => {
                        this.mImageClock.renderTransformAngle = obj.rot
                    })
                    .yoyo(true)
                    .repeat(Infinity)
                    .onStart().start();

                //缩放tween
                let clockScaleTween = new mw.Tween({ scale: 1 })
                    .to({ scale: 1.5 }, 500)
                    .onUpdate(obj => {
                        this.mImageClock.renderScale = new Vector2(obj.scale, obj.scale)
                        this.mTextTime.renderScale = new Vector2(obj.scale, obj.scale)
                    })
                    .yoyo(true)
                    .repeat(Infinity)
                    .onStart().start();
                this.canEnterLast = false
            }
        } else if (countDown < 0) {
            mw.UIService.hide(CountDownUI)
        }

    }
}
