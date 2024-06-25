
 

 @UIBind('UI/ShareUI/hud/InteractPanel.ui')
 export default class InteractPanel_Generate extends UIScript {
	 	private canvas_catch_Internal: mw.Canvas
	public get canvas_catch(): mw.Canvas {
		if(!this.canvas_catch_Internal&&this.uiWidgetBase) {
			this.canvas_catch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_catch') as mw.Canvas
		}
		return this.canvas_catch_Internal
	}
	private img_catch_Internal: mw.Image
	public get img_catch(): mw.Image {
		if(!this.img_catch_Internal&&this.uiWidgetBase) {
			this.img_catch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_catch/img_catch') as mw.Image
		}
		return this.img_catch_Internal
	}
	private btn_catch_Internal: mw.Button
	public get btn_catch(): mw.Button {
		if(!this.btn_catch_Internal&&this.uiWidgetBase) {
			this.btn_catch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_catch/btn_catch') as mw.Button
		}
		return this.btn_catch_Internal
	}
	private canvas_cancel_Internal: mw.Canvas
	public get canvas_cancel(): mw.Canvas {
		if(!this.canvas_cancel_Internal&&this.uiWidgetBase) {
			this.canvas_cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_cancel') as mw.Canvas
		}
		return this.canvas_cancel_Internal
	}
	private img_cancel_Internal: mw.Image
	public get img_cancel(): mw.Image {
		if(!this.img_cancel_Internal&&this.uiWidgetBase) {
			this.img_cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_cancel/img_cancel') as mw.Image
		}
		return this.img_cancel_Internal
	}
	private btn_cancel_Internal: mw.Button
	public get btn_cancel(): mw.Button {
		if(!this.btn_cancel_Internal&&this.uiWidgetBase) {
			this.btn_cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_cancel/btn_cancel') as mw.Button
		}
		return this.btn_cancel_Internal
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
		
		this.btn_catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "InteractPanel_btn_catch");
		})
		this.btn_catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_catch.onPressed.add(() => {
			this.btn_catch["preScale"] = this.btn_catch.renderScale;
			this.btn_catch.renderScale = Vector2.one.set(this.btn_catch["preScale"]).multiply(1.1);
		})
		this.btn_catch.onReleased.add(() => {
			this.btn_catch.renderScale = this.btn_catch["preScale"];
		})
		
	
		this.btn_cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "InteractPanel_btn_cancel");
		})
		this.btn_cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_cancel.onPressed.add(() => {
			this.btn_cancel["preScale"] = this.btn_cancel.renderScale;
			this.btn_cancel.renderScale = Vector2.one.set(this.btn_cancel["preScale"]).multiply(1.1);
		})
		this.btn_cancel.onReleased.add(() => {
			this.btn_cancel.renderScale = this.btn_cancel["preScale"];
		})
		
	

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

UIService['UI_InteractPanel'] = InteractPanel_Generate;