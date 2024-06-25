/*
 * @Author       : dal
 * @Date         : 2024-05-13 15:39:07
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-20 17:49:16
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\equip\ui\NewPieceUnlockTips.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import ShotResult_UI_Generate from "../../../../ui-generate/ShareUI/ghostmenu/ShotResult_UI_generate";
import { TimerOnly } from "../../../utils/AsyncTool";
import { UIAniUtil } from "../../../utils/UIAniUtil";

export class NewPieceUnlockTips extends ShotResult_UI_Generate {

    /** 开始位置 */
    private readonly startPos = new Vector2(0, 600);
    /** 默认结束位置 - 可能会受当前激活数量改变 */
    private readonly endPos = new Vector2(0, 80);
    /** 漂移时间 */
    private readonly SHIFT_TIME = 500;
    /** 停留时间 */
    private readonly KEEP_TIME = 3000;

    private pieceImgArr: Image[] = []

    /**
     * 初始化当前空闲的条目，隐藏UI
     */
    onStart() {
        this.canUpdate = true;
        this.layer = UILayerError;
        this.pieceImgArr.push(this.mImage_piece1);
        this.pieceImgArr.push(this.mImage_piece2);
        this.pieceImgArr.push(this.mImage_piece3);
        this.pieceImgArr.push(this.mImage_piece4);
        this.pieceImgArr.push(this.mImage_piece5);
    }

    private secondTween1: Tween<any>;
    private secondTween2: Tween<any>;

    public show(markStr: string, pieceId: number) {
        UIService.showUI(this, this.layer);
        this.secondTween1?.stop();
        this.secondTween2?.stop();
        this.mText_Rank.text = markStr;
        const cfg = GameConfig.GhostFragment.getElement(pieceId);
        this.pieceImgArr.forEach(v => { v.visibility = SlateVisibility.Collapsed });
        const targetImg: Image = this[`mImage_piece${cfg.fragmentCode}`];
        targetImg.imageGuid = cfg.icon;
        targetImg.visibility = SlateVisibility.SelfHitTestInvisible;
        this.nameTxt.text = `${cfg.fragmentCode}号: ${cfg.name}`;
        this.mText_Rank.renderOpacity = 1;
        this.mCanvas_PieceGet.renderOpacity = 1;
        this.mCanvas_PieceGet.position = this.startPos;
        UIAniUtil.playPosAni(this.mCanvas_PieceGet, this.endPos, this.SHIFT_TIME, () => {
            this.secondTween1 = UIAniUtil.playOpaAni(this.mCanvas_PieceGet, 0, this.KEEP_TIME, () => {
            });
            this.secondTween2 = UIAniUtil.playOpaAni(this.mText_Rank, 0, this.KEEP_TIME, () => {
            });
        }, 0, TweenUtil.Easing.Back.Out);

        this.closeTimer.setTimeout(() => {
            UIService.hideUI(this)
        }, this.SHIFT_TIME + this.KEEP_TIME);
    }

    private closeTimer: TimerOnly = new TimerOnly();
}