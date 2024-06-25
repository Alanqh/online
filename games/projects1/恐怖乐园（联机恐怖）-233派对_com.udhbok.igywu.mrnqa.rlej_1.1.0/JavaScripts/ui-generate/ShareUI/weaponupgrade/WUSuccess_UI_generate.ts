
 

 @UIBind('UI/ShareUI/weaponupgrade/WUSuccess_UI.ui')
 export default class WUSuccess_UI_Generate extends UIScript {
	 	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private mBtn_WUSuccessClose_Internal: mw.Button
	public get mBtn_WUSuccessClose(): mw.Button {
		if(!this.mBtn_WUSuccessClose_Internal&&this.uiWidgetBase) {
			this.mBtn_WUSuccessClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_WUSuccessClose') as mw.Button
		}
		return this.mBtn_WUSuccessClose_Internal
	}
	private canvas_WUSuccess_Internal: mw.Canvas
	public get canvas_WUSuccess(): mw.Canvas {
		if(!this.canvas_WUSuccess_Internal&&this.uiWidgetBase) {
			this.canvas_WUSuccess_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess') as mw.Canvas
		}
		return this.canvas_WUSuccess_Internal
	}
	private img_frame1_Internal: mw.Image
	public get img_frame1(): mw.Image {
		if(!this.img_frame1_Internal&&this.uiWidgetBase) {
			this.img_frame1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/img_frame1') as mw.Image
		}
		return this.img_frame1_Internal
	}
	private mCanvas_WUSuccess_Internal: mw.Canvas
	public get mCanvas_WUSuccess(): mw.Canvas {
		if(!this.mCanvas_WUSuccess_Internal&&this.uiWidgetBase) {
			this.mCanvas_WUSuccess_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess') as mw.Canvas
		}
		return this.mCanvas_WUSuccess_Internal
	}
	private text_WUSuccessTitle_Internal: mw.TextBlock
	public get text_WUSuccessTitle(): mw.TextBlock {
		if(!this.text_WUSuccessTitle_Internal&&this.uiWidgetBase) {
			this.text_WUSuccessTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/text_WUSuccessTitle') as mw.TextBlock
		}
		return this.text_WUSuccessTitle_Internal
	}
	private mImg_WUSuccessIcon_Internal: mw.Image
	public get mImg_WUSuccessIcon(): mw.Image {
		if(!this.mImg_WUSuccessIcon_Internal&&this.uiWidgetBase) {
			this.mImg_WUSuccessIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mImg_WUSuccessIcon') as mw.Image
		}
		return this.mImg_WUSuccessIcon_Internal
	}
	private mCanvas_WUSuccessDetail_Internal: mw.Canvas
	public get mCanvas_WUSuccessDetail(): mw.Canvas {
		if(!this.mCanvas_WUSuccessDetail_Internal&&this.uiWidgetBase) {
			this.mCanvas_WUSuccessDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mCanvas_WUSuccessDetail') as mw.Canvas
		}
		return this.mCanvas_WUSuccessDetail_Internal
	}
	private text_WUSuccess1_Internal: mw.TextBlock
	public get text_WUSuccess1(): mw.TextBlock {
		if(!this.text_WUSuccess1_Internal&&this.uiWidgetBase) {
			this.text_WUSuccess1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mCanvas_WUSuccessDetail/text_WUSuccess1') as mw.TextBlock
		}
		return this.text_WUSuccess1_Internal
	}
	private text_WUSuccess2_Internal: mw.TextBlock
	public get text_WUSuccess2(): mw.TextBlock {
		if(!this.text_WUSuccess2_Internal&&this.uiWidgetBase) {
			this.text_WUSuccess2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mCanvas_WUSuccessDetail/text_WUSuccess2') as mw.TextBlock
		}
		return this.text_WUSuccess2_Internal
	}
	private mCanvas_WUNG_Internal: mw.Canvas
	public get mCanvas_WUNG(): mw.Canvas {
		if(!this.mCanvas_WUNG_Internal&&this.uiWidgetBase) {
			this.mCanvas_WUNG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mCanvas_WUNG') as mw.Canvas
		}
		return this.mCanvas_WUNG_Internal
	}
	private text_WUNG1_Internal: mw.TextBlock
	public get text_WUNG1(): mw.TextBlock {
		if(!this.text_WUNG1_Internal&&this.uiWidgetBase) {
			this.text_WUNG1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mCanvas_WUNG/text_WUNG1') as mw.TextBlock
		}
		return this.text_WUNG1_Internal
	}
	private text_WUNG2_Internal: mw.TextBlock
	public get text_WUNG2(): mw.TextBlock {
		if(!this.text_WUNG2_Internal&&this.uiWidgetBase) {
			this.text_WUNG2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mCanvas_WUNG/Canvas/text_WUNG2') as mw.TextBlock
		}
		return this.text_WUNG2_Internal
	}
	private text_WUNG2_1_Internal: mw.TextBlock
	public get text_WUNG2_1(): mw.TextBlock {
		if(!this.text_WUNG2_1_Internal&&this.uiWidgetBase) {
			this.text_WUNG2_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_WUSuccess/mCanvas_WUSuccess/mCanvas_WUNG/Canvas/text_WUNG2_1') as mw.TextBlock
		}
		return this.text_WUNG2_1_Internal
	}
	private mText_WUSuccessClose_Internal: mw.TextBlock
	public get mText_WUSuccessClose(): mw.TextBlock {
		if(!this.mText_WUSuccessClose_Internal&&this.uiWidgetBase) {
			this.mText_WUSuccessClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_WUSuccessClose') as mw.TextBlock
		}
		return this.mText_WUSuccessClose_Internal
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
		
		this.mBtn_WUSuccessClose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "WUSuccess_UI_mBtn_WUSuccessClose");
		})
		this.mBtn_WUSuccessClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_WUSuccessClose.onPressed.add(() => {
			this.mBtn_WUSuccessClose["preScale"] = this.mBtn_WUSuccessClose.renderScale;
			this.mBtn_WUSuccessClose.renderScale = Vector2.one.set(this.mBtn_WUSuccessClose["preScale"]).multiply(1.1);
		})
		this.mBtn_WUSuccessClose.onReleased.add(() => {
			this.mBtn_WUSuccessClose.renderScale = this.mBtn_WUSuccessClose["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_WUSuccessTitle)
		this.text_WUSuccessTitle.isRichText = true;
		
	
		this.initLanguage(this.text_WUSuccess1)
		this.text_WUSuccess1.isRichText = true;
		
	
		this.initLanguage(this.text_WUSuccess2)
		this.text_WUSuccess2.isRichText = true;
		
	
		this.initLanguage(this.text_WUNG1)
		this.text_WUNG1.isRichText = true;
		
	
		this.initLanguage(this.text_WUNG2)
		this.text_WUNG2.isRichText = true;
		
	
		this.initLanguage(this.text_WUNG2_1)
		this.text_WUNG2_1.isRichText = true;
		
	
		this.initLanguage(this.mText_WUSuccessClose)
		this.mText_WUSuccessClose.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_WUSuccess_UI'] = WUSuccess_UI_Generate;