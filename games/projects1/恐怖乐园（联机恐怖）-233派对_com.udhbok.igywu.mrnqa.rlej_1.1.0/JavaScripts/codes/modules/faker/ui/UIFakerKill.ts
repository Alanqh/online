/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-15 19:26:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-05-20 13:59:31
 * @FilePath: \1001_hall\JavaScripts\codes\modules\faker\ui\UIFakerKill.ts
 * @Description  : 
 */

import AlternateKill_UI_Generate from "../../../../ui-generate/ShareUI/AlternateKill_UI_generate";


export class UIFakerKill extends AlternateKill_UI_Generate {

    callBack: Function;

    leftHandPos: Vector2;
    rightHandPos: Vector2;

    onStart() {

    }

    async onShow(call: Function) {
        this.callBack = call;
        if (!this.leftHandPos) {
            await TimeUtil.delaySecond(0.1);
            this.leftHandPos = this.img_hand2.position.clone();
            this.rightHandPos = this.img_hand.position.clone()
        }
        this.img_hand2.position = this.leftHandPos.clone()
        this.img_hand.position = this.rightHandPos.clone()
        this.playTween(this.img_hand2, new Vector2(this.leftHandPos.x + 150, this.leftHandPos.y), true)
        this.playTween(this.img_hand, new Vector2(this.rightHandPos.x - 150, this.rightHandPos.y))
    }
    playTween(uiWidget: mw.Image, targetPos: Vector2, state: boolean = false) {
        let params = { pos: uiWidget.position, opacity: 1, scale: Vector2.one };
        new Tween(params)
            .to({ pos: targetPos, opacity: 0, scale: new Vector2(1.2, 1.2) })
            .onUpdate((val) => {
                uiWidget.position = val.pos;
                uiWidget.renderOpacity = val.opacity
                uiWidget.renderScale = val.scale
            })
            .onComplete(() => {
                if (state) {
                    this.callBack && this.callBack();
                }
                UIService.hide(UIFakerKill)

            })
            .start();
    }


}