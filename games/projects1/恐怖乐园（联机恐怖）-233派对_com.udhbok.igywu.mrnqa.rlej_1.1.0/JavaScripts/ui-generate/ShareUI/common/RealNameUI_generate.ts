
 

 @UIBind('UI/ShareUI/common/RealNameUI.ui')
 export default class RealNameUI_Generate extends UIScript {
	 	private mCanvas_item_Internal: mw.Canvas
	public get mCanvas_item(): mw.Canvas {
		if(!this.mCanvas_item_Internal&&this.uiWidgetBase) {
			this.mCanvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PopupCanvas/mCanvas_item') as mw.Canvas
		}
		return this.mCanvas_item_Internal
	}
	private mTxt_Tip_Internal: mw.TextBlock
	public get mTxt_Tip(): mw.TextBlock {
		if(!this.mTxt_Tip_Internal&&this.uiWidgetBase) {
			this.mTxt_Tip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PopupCanvas/mTxt_Tip') as mw.TextBlock
		}
		return this.mTxt_Tip_Internal
	}
	private mBtn_Exit_Internal: mw.StaleButton
	public get mBtn_Exit(): mw.StaleButton {
		if(!this.mBtn_Exit_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PopupCanvas/mBtn_Exit') as mw.StaleButton
		}
		return this.mBtn_Exit_Internal
	}
	private mBtn_Close_Internal: mw.StaleButton
	public get mBtn_Close(): mw.StaleButton {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PopupCanvas/mBtn_Close') as mw.StaleButton
		}
		return this.mBtn_Close_Internal
	}
	private mBtn_Sure_Internal: mw.StaleButton
	public get mBtn_Sure(): mw.StaleButton {
		if(!this.mBtn_Sure_Internal&&this.uiWidgetBase) {
			this.mBtn_Sure_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PopupCanvas/mBtn_Sure') as mw.StaleButton
		}
		return this.mBtn_Sure_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.mBtn_Exit.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "RealNameUI_mBtn_Exit");
		})
		this.initLanguage(this.mBtn_Exit);
		this.mBtn_Exit.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Exit.onPressed.add(() => {
			this.mBtn_Exit["preScale"] = this.mBtn_Exit.renderScale;
			this.mBtn_Exit.renderScale = Vector2.one.set(this.mBtn_Exit["preScale"]).multiply(1.1);
		})
		this.mBtn_Exit.onReleased.add(() => {
			this.mBtn_Exit.renderScale = this.mBtn_Exit["preScale"];
		})
		
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "RealNameUI_mBtn_Close");
		})
		this.initLanguage(this.mBtn_Close);
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Close.onPressed.add(() => {
			this.mBtn_Close["preScale"] = this.mBtn_Close.renderScale;
			this.mBtn_Close.renderScale = Vector2.one.set(this.mBtn_Close["preScale"]).multiply(1.1);
		})
		this.mBtn_Close.onReleased.add(() => {
			this.mBtn_Close.renderScale = this.mBtn_Close["preScale"];
		})
		
		
	
		this.mBtn_Sure.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "RealNameUI_mBtn_Sure");
		})
		this.initLanguage(this.mBtn_Sure);
		this.mBtn_Sure.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_Sure.onPressed.add(() => {
			this.mBtn_Sure["preScale"] = this.mBtn_Sure.renderScale;
			this.mBtn_Sure.renderScale = Vector2.one.set(this.mBtn_Sure["preScale"]).multiply(1.1);
		})
		this.mBtn_Sure.onReleased.add(() => {
			this.mBtn_Sure.renderScale = this.mBtn_Sure["preScale"];
		})
		
		
	

		//按钮添加点击
		

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mTxt_Tip)
		this.mTxt_Tip.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/PopupCanvas/Txt_Title") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/PopupCanvas/Txt_Content") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_RealNameUI'] = RealNameUI_Generate;