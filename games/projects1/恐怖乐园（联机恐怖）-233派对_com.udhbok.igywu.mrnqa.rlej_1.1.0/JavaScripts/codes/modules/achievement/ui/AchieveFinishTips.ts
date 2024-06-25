/*
 * @Author       : dal
 * @Date         : 2024-05-11 15:58:28
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-17 19:29:07
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\ui\AchieveFinishTips.ts
 * @Description  : 
 */
import MainAchieveTip_Generate from "../../../../ui-generate/ShareUI/integration/Achievements/MainAchieveTip_generate";
import { TimerOnly } from "../../../utils/AsyncTool";
import { UIAniUtil } from "../../../utils/UIAniUtil";

export class AchieveFinishTipsIns {

    /** 激活的数量 */
    public static activeTipsCount: number = 0;
    /** 空闲的 */
    public static freeUITipsArr: AchieveFinishTips[] = [];

    public static show(txt: string) {
        this.activeTipsCount++;
        let tipsUI = this.freeUITipsArr.pop();
        if (!tipsUI) {
            tipsUI = UIService.create(AchieveFinishTips);
        }
        tipsUI.showMsg(txt);
    }
}

class AchieveFinishTips extends MainAchieveTip_Generate {

    /** 高度 */
    private readonly deltaVec2 = new Vector(0, 160);
    /** 开始位置 */
    private startPos = new Vector2(0, 922);
    /** 默认结束位置 - 可能会受当前激活数量改变 */
    private endPos = new Vector2(0, 0);
    /** 漂移时间 */
    private readonly SHIFT_TIME = 1e3;
    /** 停留时间 */
    private readonly KEEP_TIME = 3e3;



    /**
     * 初始化当前空闲的条目，隐藏UI
     */
    onStart() {
        // 消除不同分辨率手机影响
        this.startPos.divide(getViewportScale());
        this.endPos.divide(getViewportScale());
        this.canUpdate = true;
        this.layer = UILayerError;
        // 给个唯一id guid太狗了，居然不是唯一的
        this.canvas_achievementTip["uuid"] = Date.now().toString().substring(5) + MathUtil.randomInt(0, 1e3);
    }

    public showMsg(txt: string) {
        UIService.showUI(this, UILayerError);
        this.img_medalTip.text = txt;
        this.canvas_achievementTip.renderOpacity = 1;
        this.canvas_achievementTip.position = this.startPos;
        let endPos = this.endPos.clone().add(this.deltaVec2.clone().multiply(AchieveFinishTipsIns.activeTipsCount - 1));
        UIAniUtil.playPosAni(this.canvas_achievementTip, endPos, this.SHIFT_TIME, () => {
            UIAniUtil.playOpaAni(this.canvas_achievementTip, 0, this.KEEP_TIME, () => {
            });
        }, 0, TweenUtil.Easing.Back.Out);

        this.closeTimer.setTimeout(() => {
            this.canvas_achievementTip.position = this.startPos;
            UIService.hideUI(this);
            AchieveFinishTipsIns.activeTipsCount--;
            AchieveFinishTipsIns.freeUITipsArr.push(this);
        }, this.SHIFT_TIME + this.KEEP_TIME);

    }
    private closeTimer: TimerOnly = new TimerOnly();
}