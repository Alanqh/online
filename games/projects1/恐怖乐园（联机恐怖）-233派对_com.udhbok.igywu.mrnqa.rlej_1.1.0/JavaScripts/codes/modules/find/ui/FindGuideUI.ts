import Guideteach_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Guideteach_UI_generate";
import Teach_txt_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Teach_txt_UI_generate";
import GMHUD_Generate from "../../../../ui-generate/ShareUI/module_gm/GMHUD_generate";
import { GuideDataHelper, GuideModuleC, GuideModuleS, GuideModuleView } from "module_guide";

export class FindGuideUI extends Guideteach_UI_Generate {
    /**
     * 接收空间坐标，用于接收UI本地坐标到视口坐标的转换。
     */
    private _outPixelPos = Vector2.zero;
    /**
     * 用于接收视口坐标，用于接收UI本地坐标到视口坐标的转换。
     */
    private _outViewPos = Vector2.zero;

    private _condition: () => boolean;

    private _callback: (isjump: boolean) => void;

    onStart() {
        this.mLeftMask.onPressed.clear();
        this.mLeftMask.onReleased.clear();
        this.mTopMask.onPressed.clear();
        this.mTopMask.onReleased.clear();
        this.mButtomMask.onPressed.clear();
        this.mButtomMask.onReleased.clear();
        this.mRightMask.onPressed.clear();
        this.mRightMask.onReleased.clear();
        this.layer = UILayerSystem;
        this.btn_skip.onClicked.add(() => {
            UIService.hideUI(this)
            this._callback && this._callback(true);
        })
        this.mBtn.onClicked.add(() => {
            UIService.hideUI(this)
            this._callback && this._callback(true);
        })
    }


    public handOnTarget(target: Widget, btn: Widget, tips: string, condition: () => boolean, callback: (isjump: boolean) => void, isShowHand: boolean = true, txt: string = "跳过") {
        let pos = Vector2.zero;
        if (btn) {
            mw.localToViewport(btn.tickSpaceGeometry, Vector2.zero, new Vector2(0, 0), pos);
            pos.add(btn.size.clone().divide(2));
        }
        else {
            mw.localToViewport(target.tickSpaceGeometry, Vector2.zero, new Vector2(0, 0), pos);
            pos.x += target.size.x / 2;
        }

        // 获取target的slot信息
        let target_slot = target;
        if (target.tickSpaceGeometry == null) {
            return;
        }
        mw.localToViewport(target.tickSpaceGeometry, mw.Vector2.zero, this._outPixelPos, this._outViewPos);
        if (!this._outViewPos || this._outViewPos.equals(mw.Vector2.zero)) {
            return;
        }
        // 设置mask区域
        const viewportSize = mw.WindowUtil.getViewportSize();
        let targetSlotSize = target_slot.size;
        // 设置Top
        this.mTopMask.size = new mw.Vector2(viewportSize.x, this._outViewPos.y);
        // 设置Buttom
        this.mButtomMask.position = new mw.Vector2(0, this._outViewPos.y + targetSlotSize.y);
        this.mButtomMask.size = new mw.Vector2(viewportSize.x, viewportSize.y - this.mButtomMask.position.y);
        // 设置Left
        this.mLeftMask.position = new mw.Vector2(0, this.mTopMask.size.y);
        this.mLeftMask.size = new mw.Vector2(this._outViewPos.x, viewportSize.y - this.mTopMask.size.y - this.mButtomMask.size.y);
        // 设置Right
        this.mRightMask.position = new mw.Vector2(this._outViewPos.x + targetSlotSize.x, this.mTopMask.size.y);
        this.mRightMask.size = new mw.Vector2(viewportSize.x - this.mButtomMask.position.x, viewportSize.y - this.mTopMask.size.y - this.mButtomMask.size.y);
        //设置手指
        this.mBtnCav.position = pos;
        this.mHandText.text = (tips);
        this.mtitleTxt.text = tips;
        this.txt_skip.text = txt;
        if (isShowHand) {
            this.mBtnHand.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mBtn.visibility = SlateVisibility.Collapsed;
            this.mtitleTxt.visibility = SlateVisibility.Collapsed;
            this.mHandText.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        else {
            pos.y -= 200;
            this.mBtnCav.position = pos;
            this.mBtnHand.visibility = SlateVisibility.Collapsed;
            this.mBtn.visibility = SlateVisibility.Visible;
            this.mtitleTxt.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mHandText.visibility = SlateVisibility.Collapsed;
            // 设置button区域
            this.mBtn.position = new mw.Vector2(this._outViewPos.x, this._outViewPos.y);
            this.mBtn.size = new mw.Vector2(target_slot.size.x, target_slot.size.y);
        }
        this._condition = condition;
        this._callback = callback;
        this.canUpdate = true;
        UIService.showUI(this, this.layer);
    }

    onUpdate() {
        if (this._condition()) {
            this._callback && this._callback(false);
            this._callback = null;
            UIService.hideUI(this)
        }
    }
}

export class FindGuideTxtUI extends Teach_txt_UI_Generate {
    private _timer: number;

    private _callBack: () => void;

    private _openTime: number = 0;

    onStart() {
        this.layer = UILayerSystem;
        this.btn_skip.onClicked.add(() => {
            if (TimeUtil.elapsedTime() - this._openTime < 1) {
                return;
            }
            this._callBack && this._callBack();
            UIService.hideUI(this);
        })
    }

    public showTxt(title: string, content: string, callback: () => void, time: number = 2.5) {
        this._openTime = TimeUtil.elapsedTime();
        this.title.text = title;
        this.content.text = content;
        this._timer = time;
        UIService.showUI(this, this.layer);
        this._callBack = callback;
        this.canUpdate = true;

    }

    onUpdate(dt: number) {
        if (this._timer > 0) {
            this._timer -= dt
            if (this._timer <= 0) {
                this._callBack && this._callBack();
                UIService.hideUI(this);
            }
        }
    }
}
