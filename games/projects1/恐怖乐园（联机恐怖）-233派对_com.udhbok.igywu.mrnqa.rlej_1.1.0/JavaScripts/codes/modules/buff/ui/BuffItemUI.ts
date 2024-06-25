/*
 * @Author       : dal
 * @Date         : 2024-03-19 09:18:08
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-07 15:47:53
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\buff\ui\BuffItemUI.ts
 * @Description  : 
 */
import { IBuffElement } from "../../../../config/Buff";
import BuffItem_Generate from "../../../../ui-generate/ShareUI/buff/BuffItem_generate";
import { GridSelectContainerItem } from "../../../utils/UIPool";

export default class BuffItemUI extends BuffItem_Generate implements GridSelectContainerItem {

    public cfg: IBuffElement;

    /** 持续时间 - 秒 */
    public duration: number = 1;

    private readonly defaultFrameColor = "FFFFFFFF";

    /**
     * 
     * @param buffCfg 
     * @param elapse 生效时间
     */
    public setData(buffCfg: IBuffElement, elapse: number, duration: number) {
        this.cfg = buffCfg;
        this.duration = duration;
        this.descIcon.normalImageGuid = buffCfg.icon;
        this.text_name.text = buffCfg.name;
        this.text_introduce.text = buffCfg.desc;
        this.canvas_introduce.visibility = SlateVisibility.Collapsed;
        const colorStr = buffCfg.frameColor? buffCfg.frameColor: this.defaultFrameColor;
        this.img_color0.imageColor = LinearColor.colorHexToLinearColor(colorStr);
        this.checkTimer = 0;
        this.initCoolDown(elapse);
    }

    protected onHide() {
        this.canUpdate = false;
        this.cfg = null;
    }

    private initCoolDown(elapse: number) {
        const index = elapse / this.duration;
        this.descIcon.fanShapedValue = index;
        this.canUpdate = true;
    }

    private checkTimer: number = 0;

    protected onUpdate(dt) {
        if (!this["UIPoolFlagVisible"]) { this.cfg = null; this.canUpdate = false; return; }

        // 持续时间超过了半分钟
        if (this.duration > 36e3) {
            // 就一秒更新一次
            this.checkTimer += dt;
            if (this.checkTimer >= 60) {
                this.descIcon.fanShapedValue += this.checkTimer / this.duration;
                this.checkTimer = 0;
            }

        } else if (this.duration > 30) {
            // 就一秒更新一次
            this.checkTimer += dt;
            if (this.checkTimer >= 1) {
                this.descIcon.fanShapedValue += this.checkTimer / this.duration;
                this.checkTimer = 0;
            }
        } else {
            this.descIcon.fanShapedValue += dt / this.duration;
            if (this.descIcon.fanShapedValue >= 1) {
                this.canUpdate = false;
            }
        }
    }

    public onSelect: Action;
    public isSelected: boolean;

    protected onStart() {
        this.onSelect = new Action();
        this.descIcon.clickedDelegate.add(() => {
            this.onSelect.call();
        });
    }

    public setSelected(isTrue: boolean) {
        this.isSelected = isTrue;
        this.canvas_introduce.visibility = isTrue ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }
}