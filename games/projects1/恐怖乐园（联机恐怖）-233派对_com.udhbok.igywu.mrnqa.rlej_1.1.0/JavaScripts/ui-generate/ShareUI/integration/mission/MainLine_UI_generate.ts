
 

 @UIBind('UI/ShareUI/integration/mission/MainLine_UI.ui')
 export default class MainLine_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_mainLine_Internal: mw.Canvas
	public get canvas_mainLine(): mw.Canvas {
		if(!this.canvas_mainLine_Internal&&this.uiWidgetBase) {
			this.canvas_mainLine_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_mainLine') as mw.Canvas
		}
		return this.canvas_mainLine_Internal
	}
	private text_mainLine_Internal: mw.TextBlock
	public get text_mainLine(): mw.TextBlock {
		if(!this.text_mainLine_Internal&&this.uiWidgetBase) {
			this.text_mainLine_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_mainLine/text_mainLine') as mw.TextBlock
		}
		return this.text_mainLine_Internal
	}
	private btn_mainLine_Internal: mw.Button
	public get btn_mainLine(): mw.Button {
		if(!this.btn_mainLine_Internal&&this.uiWidgetBase) {
			this.btn_mainLine_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_mainLine/btn_mainLine') as mw.Button
		}
		return this.btn_mainLine_Internal
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
		
		this.btn_mainLine.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MainLine_UI_btn_mainLine");
		})
		this.btn_mainLine.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_mainLine.onPressed.add(() => {
			this.btn_mainLine["preScale"] = this.btn_mainLine.renderScale;
			this.btn_mainLine.renderScale = Vector2.one.set(this.btn_mainLine["preScale"]).multiply(1.1);
		})
		this.btn_mainLine.onReleased.add(() => {
			this.btn_mainLine.renderScale = this.btn_mainLine["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_mainLine)
		this.text_mainLine.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MainLine_UI'] = MainLine_UI_Generate;