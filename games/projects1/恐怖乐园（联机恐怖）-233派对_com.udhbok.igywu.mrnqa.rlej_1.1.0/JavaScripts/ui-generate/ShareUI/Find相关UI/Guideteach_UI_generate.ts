
 

 @UIBind('UI/ShareUI/Find相关UI/Guideteach_UI.ui')
 export default class Guideteach_UI_Generate extends UIScript {
	 	private mLeftMask_Internal: mw.StaleButton
	public get mLeftMask(): mw.StaleButton {
		if(!this.mLeftMask_Internal&&this.uiWidgetBase) {
			this.mLeftMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mLeftMask') as mw.StaleButton
		}
		return this.mLeftMask_Internal
	}
	private mTopMask_Internal: mw.StaleButton
	public get mTopMask(): mw.StaleButton {
		if(!this.mTopMask_Internal&&this.uiWidgetBase) {
			this.mTopMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mTopMask') as mw.StaleButton
		}
		return this.mTopMask_Internal
	}
	private mButtomMask_Internal: mw.StaleButton
	public get mButtomMask(): mw.StaleButton {
		if(!this.mButtomMask_Internal&&this.uiWidgetBase) {
			this.mButtomMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mButtomMask') as mw.StaleButton
		}
		return this.mButtomMask_Internal
	}
	private mRightMask_Internal: mw.StaleButton
	public get mRightMask(): mw.StaleButton {
		if(!this.mRightMask_Internal&&this.uiWidgetBase) {
			this.mRightMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mRightMask') as mw.StaleButton
		}
		return this.mRightMask_Internal
	}
	private mBtnCav_Internal: mw.Canvas
	public get mBtnCav(): mw.Canvas {
		if(!this.mBtnCav_Internal&&this.uiWidgetBase) {
			this.mBtnCav_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnCav') as mw.Canvas
		}
		return this.mBtnCav_Internal
	}
	private mBtnHand_Internal: mw.Image
	public get mBtnHand(): mw.Image {
		if(!this.mBtnHand_Internal&&this.uiWidgetBase) {
			this.mBtnHand_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnCav/mBtnHand') as mw.Image
		}
		return this.mBtnHand_Internal
	}
	private mHandText_Internal: mw.TextBlock
	public get mHandText(): mw.TextBlock {
		if(!this.mHandText_Internal&&this.uiWidgetBase) {
			this.mHandText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnCav/mHandText') as mw.TextBlock
		}
		return this.mHandText_Internal
	}
	private mtitleTxt_Internal: mw.TextBlock
	public get mtitleTxt(): mw.TextBlock {
		if(!this.mtitleTxt_Internal&&this.uiWidgetBase) {
			this.mtitleTxt_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnCav/mtitleTxt') as mw.TextBlock
		}
		return this.mtitleTxt_Internal
	}
	private img_aim_Internal: mw.Image
	public get img_aim(): mw.Image {
		if(!this.img_aim_Internal&&this.uiWidgetBase) {
			this.img_aim_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnCav/mtitleTxt/img_aim') as mw.Image
		}
		return this.img_aim_Internal
	}
	private btn_skip_Internal: mw.Button
	public get btn_skip(): mw.Button {
		if(!this.btn_skip_Internal&&this.uiWidgetBase) {
			this.btn_skip_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/btn_skip') as mw.Button
		}
		return this.btn_skip_Internal
	}
	private txt_skip_Internal: mw.TextBlock
	public get txt_skip(): mw.TextBlock {
		if(!this.txt_skip_Internal&&this.uiWidgetBase) {
			this.txt_skip_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/txt_skip') as mw.TextBlock
		}
		return this.txt_skip_Internal
	}
	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtn') as mw.Button
		}
		return this.mBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.mLeftMask.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Guideteach_UI_mLeftMask");
		})
		this.initLanguage(this.mLeftMask);
		this.mLeftMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mLeftMask.onPressed.add(() => {
			this.mLeftMask["preScale"] = this.mLeftMask.renderScale;
			this.mLeftMask.renderScale = Vector2.one.set(this.mLeftMask["preScale"]).multiply(1.1);
		})
		this.mLeftMask.onReleased.add(() => {
			this.mLeftMask.renderScale = this.mLeftMask["preScale"];
		})
		
		
	
		this.mTopMask.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Guideteach_UI_mTopMask");
		})
		this.initLanguage(this.mTopMask);
		this.mTopMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mTopMask.onPressed.add(() => {
			this.mTopMask["preScale"] = this.mTopMask.renderScale;
			this.mTopMask.renderScale = Vector2.one.set(this.mTopMask["preScale"]).multiply(1.1);
		})
		this.mTopMask.onReleased.add(() => {
			this.mTopMask.renderScale = this.mTopMask["preScale"];
		})
		
		
	
		this.mButtomMask.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Guideteach_UI_mButtomMask");
		})
		this.initLanguage(this.mButtomMask);
		this.mButtomMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mButtomMask.onPressed.add(() => {
			this.mButtomMask["preScale"] = this.mButtomMask.renderScale;
			this.mButtomMask.renderScale = Vector2.one.set(this.mButtomMask["preScale"]).multiply(1.1);
		})
		this.mButtomMask.onReleased.add(() => {
			this.mButtomMask.renderScale = this.mButtomMask["preScale"];
		})
		
		
	
		this.mRightMask.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Guideteach_UI_mRightMask");
		})
		this.initLanguage(this.mRightMask);
		this.mRightMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mRightMask.onPressed.add(() => {
			this.mRightMask["preScale"] = this.mRightMask.renderScale;
			this.mRightMask.renderScale = Vector2.one.set(this.mRightMask["preScale"]).multiply(1.1);
		})
		this.mRightMask.onReleased.add(() => {
			this.mRightMask.renderScale = this.mRightMask["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.btn_skip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Guideteach_UI_btn_skip");
		})
		this.btn_skip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_skip.onPressed.add(() => {
			this.btn_skip["preScale"] = this.btn_skip.renderScale;
			this.btn_skip.renderScale = Vector2.one.set(this.btn_skip["preScale"]).multiply(1.1);
		})
		this.btn_skip.onReleased.add(() => {
			this.btn_skip.renderScale = this.btn_skip["preScale"];
		})
		
	
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Guideteach_UI_mBtn");
		})
		this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn.onPressed.add(() => {
			this.mBtn["preScale"] = this.mBtn.renderScale;
			this.mBtn.renderScale = Vector2.one.set(this.mBtn["preScale"]).multiply(1.1);
		})
		this.mBtn.onReleased.add(() => {
			this.mBtn.renderScale = this.mBtn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mHandText)
		this.mHandText.isRichText = true;
		
	
		this.initLanguage(this.mtitleTxt)
		this.mtitleTxt.isRichText = true;
		
	
		this.initLanguage(this.txt_skip)
		this.txt_skip.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Guideteach_UI'] = Guideteach_UI_Generate;