/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-02-19 13:13:48
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-23 15:43:57
 * @FilePath     : \stumbleguys_new\JavaScripts\UI\LevelPicsUI.ts
 * @Description  : 修改描述
 */

import LevelPics_Generate from "../ui-generate/LevelPic/LevelPics_generate";
export default class LevelPicsUI extends LevelPics_Generate {
    private alph: number = 1;
    private tween: Tween<{}>;
    onStart() {
        this.layer = mw.UILayerMiddle
    }
    showTween() {
        this.picBg.setImageColorByHex("#FDC04EFF");
        this.tween = new Tween(this).to({ alph: 0, }, 700).easing(TweenUtil.Easing.Quadratic.InOut).onUpdate((a) => {
            this.picBg.renderOpacity = a.alph;
        }).repeat(5).start();
    }

    stopTween() {
        this.tween && this.tween.stop();
    }
}