import { IAvatarFrameElement } from "../../../../config/AvatarFrame";
import { GameConfig } from "../../../../config/GameConfig";
import FrameItem_UI_Generate from "../../../../ui-generate/ShareUI/card/FrameItem_UI_generate";
import HeadFrameChangePanel from "./HeadFrameChangePanel";

/*
 * @Author       : dal
 * @Date         : 2024-05-16 16:32:01
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-16 21:20:18
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\idcard\ui\HeadFrameUIItem.ts
 * @Description  : 
 */
export class HeadFrameUIItem extends FrameItem_UI_Generate {

    /** 这个不用监听 */
    public onSelect: Action = new Action();
    public isSelected: boolean;

    public setSelected(isTrue: boolean) {
        if (isTrue) {
            this.btn_select.renderOpacity = 1;
        } else {
            this.btn_select.renderOpacity = 0;
        }
    }

    private get selfPanel() {
        return UIService.getUI(HeadFrameChangePanel);
    }

    protected onStart() {
        this.btn_select.onClicked.add(() => {
            if (this.isSelected) { return; }
            this.call();
        });
    }

    public call() {
        this.onSelect.call();
        UIService.getUI(HeadFrameChangePanel).setInfo(this.cfg);
    }

    /**
     * 是否锁上了
     */
    public get isLocked() {
        return !this.selfPanel.checkIsUnlock(this.cfg.itemId);
    }

    public cfg: IAvatarFrameElement;

    public setData(cfg: IAvatarFrameElement) {
        this.cfg = cfg;
        this.setLockState();
        this.img_frame.imageGuid = GameConfig.Item.getElement(cfg.itemId).icon;
    }

    /**
     * 设置锁的状态
     * @param isLock 
     */
    private setLockState() {
        if (this.isLocked) {
            this.canvas_locked.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.canvas_locked.visibility = SlateVisibility.Collapsed;
        }
    }
}