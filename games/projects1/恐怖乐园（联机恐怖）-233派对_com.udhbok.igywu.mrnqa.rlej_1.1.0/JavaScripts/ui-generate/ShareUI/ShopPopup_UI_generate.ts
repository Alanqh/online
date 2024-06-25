
 

 @UIBind('UI/ShareUI/ShopPopup_UI.ui')
 export default class ShopPopup_UI_Generate extends UIScript {
	 	private mButton_Internal: mw.Button
	public get mButton(): mw.Button {
		if(!this.mButton_Internal&&this.uiWidgetBase) {
			this.mButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton') as mw.Button
		}
		return this.mButton_Internal
	}
	private mCanvas_ShopPopup_Internal: mw.Canvas
	public get mCanvas_ShopPopup(): mw.Canvas {
		if(!this.mCanvas_ShopPopup_Internal&&this.uiWidgetBase) {
			this.mCanvas_ShopPopup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ShopPopup') as mw.Canvas
		}
		return this.mCanvas_ShopPopup_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ShopPopup/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ShopPopup/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ShopPopup/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ShopPopup/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_PopupList_Internal: mw.Canvas
	public get mCanvas_PopupList(): mw.Canvas {
		if(!this.mCanvas_PopupList_Internal&&this.uiWidgetBase) {
			this.mCanvas_PopupList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ShopPopup/mScrollBox/mCanvas_PopupList') as mw.Canvas
		}
		return this.mCanvas_PopupList_Internal
	}
	private mCanvas_Checkbox_Internal: mw.Canvas
	public get mCanvas_Checkbox(): mw.Canvas {
		if(!this.mCanvas_Checkbox_Internal&&this.uiWidgetBase) {
			this.mCanvas_Checkbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Checkbox') as mw.Canvas
		}
		return this.mCanvas_Checkbox_Internal
	}
	private mCheckbox_Internal: mw.Checkbox
	public get mCheckbox(): mw.Checkbox {
		if(!this.mCheckbox_Internal&&this.uiWidgetBase) {
			this.mCheckbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Checkbox/mCheckbox') as mw.Checkbox
		}
		return this.mCheckbox_Internal
	}
	private mText_Checkbox_Internal: mw.TextBlock
	public get mText_Checkbox(): mw.TextBlock {
		if(!this.mText_Checkbox_Internal&&this.uiWidgetBase) {
			this.mText_Checkbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Checkbox/mText_Checkbox') as mw.TextBlock
		}
		return this.mText_Checkbox_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		

		//按钮添加点击
		
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopPopup_UI_mButton");
		})
		this.mButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mButton.onPressed.add(() => {
			this.mButton["preScale"] = this.mButton.renderScale;
			this.mButton.renderScale = Vector2.one.set(this.mButton["preScale"]).multiply(1.1);
		})
		this.mButton.onReleased.add(() => {
			this.mButton.renderScale = this.mButton["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopPopup_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_title)
		this.text_title.isRichText = true;
		
	
		this.initLanguage(this.mText_Checkbox)
		this.mText_Checkbox.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ShopPopup_UI'] = ShopPopup_UI_Generate;