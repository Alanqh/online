
 

 @UIBind('UI/ShareUI/utils/LogPanel.ui')
 export default class LogPanel_Generate extends UIScript {
	 	private scrollBox_Internal: mw.ScrollBox
	public get scrollBox(): mw.ScrollBox {
		if(!this.scrollBox_Internal&&this.uiWidgetBase) {
			this.scrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scrollBox') as mw.ScrollBox
		}
		return this.scrollBox_Internal
	}
	private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scrollBox/canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private btn_Internal: mw.StaleButton
	public get btn(): mw.StaleButton {
		if(!this.btn_Internal&&this.uiWidgetBase) {
			this.btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn') as mw.StaleButton
		}
		return this.btn_Internal
	}
	private btn_1_Internal: mw.StaleButton
	public get btn_1(): mw.StaleButton {
		if(!this.btn_1_Internal&&this.uiWidgetBase) {
			this.btn_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_1') as mw.StaleButton
		}
		return this.btn_1_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "LogPanel_btn");
		})
		this.initLanguage(this.btn);
		this.btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn.onPressed.add(() => {
			this.btn["preScale"] = this.btn.renderScale;
			this.btn.renderScale = Vector2.one.set(this.btn["preScale"]).multiply(1.1);
		})
		this.btn.onReleased.add(() => {
			this.btn.renderScale = this.btn["preScale"];
		})
		
		
	
		this.btn_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "LogPanel_btn_1");
		})
		this.initLanguage(this.btn_1);
		this.btn_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_1.onPressed.add(() => {
			this.btn_1["preScale"] = this.btn_1.renderScale;
			this.btn_1.renderScale = Vector2.one.set(this.btn_1["preScale"]).multiply(1.1);
		})
		this.btn_1.onReleased.add(() => {
			this.btn_1.renderScale = this.btn_1["preScale"];
		})
		
		
	

		//按钮添加点击
		

		//按钮多语言
		

		//文本多语言
		

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_LogPanel'] = LogPanel_Generate;