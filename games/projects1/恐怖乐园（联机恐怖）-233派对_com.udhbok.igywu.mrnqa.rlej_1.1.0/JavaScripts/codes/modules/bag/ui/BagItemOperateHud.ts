/*
 * @Author       : dal
 * @Date         : 2024-02-27 11:48:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-29 14:34:36
 * @FilePath     : \1005_town\JavaScripts\codes\modules\bag\ui\BagItemOperateHud.ts
 * @Description  : 
 */
import BagOperate_UI_Generate from "../../../../ui-generate/ShareUI/BagOperate_UI_generate";
import { BagItemUI } from "../../../ui/BagItemUI";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIGiftBagOpen } from "../../store/ui/UIGiftBagOpen";
import { BagDefine } from "../BagDefine";
import BagPanel from "./BagPanel";
import { ItemUseBox } from "./ItemUseBox";

export class BagItemOperateHud extends BagOperate_UI_Generate {

    private bagItemUI: BagItemUI

    public hideAllInfo() {
        this.viewMoreBtn(false);
        this.viewIntro(false);
    }

    public viewMoreBtn(enable: boolean) {
        this.canvas_operate.visibility = enable ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public viewIntro(enable: boolean) {
        this.canvas_introduce.visibility = enable ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public onStart() {
        this.btn_use.onClicked.add(this.onUse.bind(this));
        this.btn_move.onClicked.add(this.onMove.bind(this));
        this.btn_detail.onClicked.add(this.onDescView.bind(this));
    }

    private onUse() {
        if (this.bagItemUI.cfg.clazz == "GiftItem") {
            GhostTraceHelper.rebirthNum(this.bagItemUI.cfg.id, 7);
            UIService.show(UIGiftBagOpen, this.bagItemUI.cfg.id)
        } else {
            GhostTraceHelper.rebirthNum(this.bagItemUI.cfg.id, 7);
            UIService.show(ItemUseBox, this.bagItemUI.cfg, this.bagItemUI.data);
        }
        this.bagItemUI.onSelect.call();
    }

    private onMove() {
        this.bagItemUI.data && GhostTraceHelper.rebirthNum(this.bagItemUI.data.cfgId, 2);
        this.selfPanel.enterChangeMode();
        this.viewMoreBtn(false);
    }

    private onDescView() {
        this.bagItemUI.data && GhostTraceHelper.rebirthNum(this.bagItemUI.data.cfgId, 6);
        this.viewIntro(true);
        this.viewMoreBtn(false);
    }

    private get selfPanel() {
        return UIService.getUI(BagPanel);
    }

    protected onHide() {
        if (this.bagItemUI) {
            this.bagItemUI.data && GhostTraceHelper.rebirthNum(this.bagItemUI.data.cfgId, 1);
        }
    }

    /** 最大边界 */
    private _maxBound: Vector2;

    public get maxBound() {
        if (!this._maxBound) {
            const curViewPortScale = getViewportScale();
            let viewPortSize = getViewportSize();
            this._maxBound = new Vector2(viewPortSize.x * 0.75 / curViewPortScale, viewPortSize.y * 0.7 / curViewPortScale);
        }
        return this._maxBound;
    }

    protected onShow(bagItemUI: BagItemUI) {
        this.bagItemUI = bagItemUI;
        this.viewMoreBtn(true);
        this.viewIntro(false);

        // 获取此时按钮的绝对位置
        const btnAbs = bagItemUI.rootCanvas.cachedGeometry.getAbsolutePosition();
        // 获取背包根画布的绝对位置
        const bagAbs = this.selfPanel.rootCanvas.cachedGeometry.getAbsolutePosition();
        // 计算差值
        let targetAbsPos = btnAbs.subtract(bagAbs);

        const curViewPortScale = getViewportScale();

        // 消除DPI的影响
        targetAbsPos.x /= curViewPortScale;
        targetAbsPos.y /= curViewPortScale;

        targetAbsPos.x = Math.min(targetAbsPos.x, this.maxBound.x);
        targetAbsPos.y = Math.min(targetAbsPos.y, this.maxBound.y);

        this.rootCanvas.position = targetAbsPos;

        // 使用按钮的显隐
        this.btn_use.visibility = !this.NoUseItemClazzList.includes(this.bagItemUI.cfg.clazz) && bagItemUI.cfg.isCanActiveUse && bagItemUI.cfg.isConsumable ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        // this.text_name.text = BagDefine.extractTextBeforeRichText(bagItemUI.cfg.name);
        // 详细信息注入
        BagDefine.getCfgEx(bagItemUI.cfg.id, Player.localPlayer.userId).then((v) => {
            this.text_name.text = BagDefine.extractTextBeforeRichText(v.name);
        });
        this.text_introduce.text = bagItemUI.cfg.description;
    }

    private readonly NoUseItemClazzList: string[] = ["InteractItem", "RelifeItem", "ScreamKunItem"];
}
