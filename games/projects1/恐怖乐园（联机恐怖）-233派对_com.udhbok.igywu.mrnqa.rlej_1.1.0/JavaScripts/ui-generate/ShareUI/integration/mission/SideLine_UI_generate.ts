
 

 @UIBind('UI/ShareUI/integration/mission/SideLine_UI.ui')
 export default class SideLine_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_sideLine_Internal: mw.Canvas
	public get canvas_sideLine(): mw.Canvas {
		if(!this.canvas_sideLine_Internal&&this.uiWidgetBase) {
			this.canvas_sideLine_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_sideLine') as mw.Canvas
		}
		return this.canvas_sideLine_Internal
	}
	private text_sideLine_Internal: mw.TextBlock
	public get text_sideLine(): mw.TextBlock {
		if(!this.text_sideLine_Internal&&this.uiWidgetBase) {
			this.text_sideLine_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_sideLine/text_sideLine') as mw.TextBlock
		}
		return this.text_sideLine_Internal
	}
	private btn_sideLine_Internal: mw.Button
	public get btn_sideLine(): mw.Button {
		if(!this.btn_sideLine_Internal&&this.uiWidgetBase) {
			this.btn_sideLine_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_sideLine/btn_sideLine') as mw.Button
		}
		return this.btn_sideLine_Internal
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
		
		this.btn_sideLine.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "SideLine_UI_btn_sideLine");
		})
		this.btn_sideLine.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_sideLine.onPressed.add(() => {
			this.btn_sideLine["preScale"] = this.btn_sideLine.renderScale;
			this.btn_sideLine.renderScale = Vector2.one.set(this.btn_sideLine["preScale"]).multiply(1.1);
		})
		this.btn_sideLine.onReleased.add(() => {
			this.btn_sideLine.renderScale = this.btn_sideLine["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_sideLine)
		this.text_sideLine.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_SideLine_UI'] = SideLine_UI_Generate;