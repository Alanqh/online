
 

 @UIBind('UI/ShareUI/transferGameUI.ui')
 export default class transferGameUI_Generate extends UIScript {
	 	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private img_gamePic_Internal: mw.Image
	public get img_gamePic(): mw.Image {
		if(!this.img_gamePic_Internal&&this.uiWidgetBase) {
			this.img_gamePic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/img_gamePic') as mw.Image
		}
		return this.img_gamePic_Internal
	}
	private mTextGameName_Internal: mw.TextBlock
	public get mTextGameName(): mw.TextBlock {
		if(!this.mTextGameName_Internal&&this.uiWidgetBase) {
			this.mTextGameName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/mTextGameName') as mw.TextBlock
		}
		return this.mTextGameName_Internal
	}
	private btn_sure_Internal: mw.StaleButton
	public get btn_sure(): mw.StaleButton {
		if(!this.btn_sure_Internal&&this.uiWidgetBase) {
			this.btn_sure_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_sure') as mw.StaleButton
		}
		return this.btn_sure_Internal
	}
	private mText_desc_Internal: mw.TextBlock
	public get mText_desc(): mw.TextBlock {
		if(!this.mText_desc_Internal&&this.uiWidgetBase) {
			this.mText_desc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/mText_desc') as mw.TextBlock
		}
		return this.mText_desc_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_sure.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "transferGameUI_btn_sure");
		})
		this.initLanguage(this.btn_sure);
		this.btn_sure.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_sure.onPressed.add(() => {
			this.btn_sure["preScale"] = this.btn_sure.renderScale;
			this.btn_sure.renderScale = Vector2.one.set(this.btn_sure["preScale"]).multiply(1.1);
		})
		this.btn_sure.onReleased.add(() => {
			this.btn_sure.renderScale = this.btn_sure["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "transferGameUI_btn_close");
		})
		this.btn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close.onPressed.add(() => {
			this.btn_close["preScale"] = this.btn_close.renderScale;
			this.btn_close.renderScale = Vector2.one.set(this.btn_close["preScale"]).multiply(1.1);
		})
		this.btn_close.onReleased.add(() => {
			this.btn_close.renderScale = this.btn_close["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mTextGameName)
		this.mTextGameName.isRichText = true;
		
	
		this.initLanguage(this.mText_desc)
		this.mText_desc.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_transferGameUI'] = transferGameUI_Generate;