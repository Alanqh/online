
 

 @UIBind('UI/ShareUI/integration/Integration_UI.ui')
 export default class Integration_UI_Generate extends UIScript {
	 	private mrootCanvas_Internal: mw.Canvas
	public get mrootCanvas(): mw.Canvas {
		if(!this.mrootCanvas_Internal&&this.uiWidgetBase) {
			this.mrootCanvas_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas') as mw.Canvas
		}
		return this.mrootCanvas_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_frame_Internal: mw.Canvas
	public get canvas_frame(): mw.Canvas {
		if(!this.canvas_frame_Internal&&this.uiWidgetBase) {
			this.canvas_frame_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame') as mw.Canvas
		}
		return this.canvas_frame_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private canvas_btn_Internal: mw.Canvas
	public get canvas_btn(): mw.Canvas {
		if(!this.canvas_btn_Internal&&this.uiWidgetBase) {
			this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/ScrollBox/canvas_btn') as mw.Canvas
		}
		return this.canvas_btn_Internal
	}
	private canvas_title_Internal: mw.Canvas
	public get canvas_title(): mw.Canvas {
		if(!this.canvas_title_Internal&&this.uiWidgetBase) {
			this.canvas_title_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/canvas_title') as mw.Canvas
		}
		return this.canvas_title_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/canvas_title/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private canvas_content_Internal: mw.Canvas
	public get canvas_content(): mw.Canvas {
		if(!this.canvas_content_Internal&&this.uiWidgetBase) {
			this.canvas_content_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/canvas_content') as mw.Canvas
		}
		return this.canvas_content_Internal
	}
	private canvas_panels_Internal: mw.Canvas
	public get canvas_panels(): mw.Canvas {
		if(!this.canvas_panels_Internal&&this.uiWidgetBase) {
			this.canvas_panels_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/canvas_content/canvas_panels') as mw.Canvas
		}
		return this.canvas_panels_Internal
	}
	private canvas_activity_Internal: mw.Canvas
	public get canvas_activity(): mw.Canvas {
		if(!this.canvas_activity_Internal&&this.uiWidgetBase) {
			this.canvas_activity_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/canvas_activity') as mw.Canvas
		}
		return this.canvas_activity_Internal
	}
	private canvas_activityBtn_Internal: mw.Canvas
	public get canvas_activityBtn(): mw.Canvas {
		if(!this.canvas_activityBtn_Internal&&this.uiWidgetBase) {
			this.canvas_activityBtn_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_frame/canvas_activity/canvas_activityBtn') as mw.Canvas
		}
		return this.canvas_activityBtn_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Integration_UI_btn_back");
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
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Integration_UI'] = Integration_UI_Generate;