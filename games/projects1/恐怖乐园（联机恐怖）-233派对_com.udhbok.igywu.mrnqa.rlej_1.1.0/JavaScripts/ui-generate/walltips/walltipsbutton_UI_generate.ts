
 

 @UIBind('UI/walltips/walltipsbutton_UI.ui')
 export default class walltipsbutton_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private btn_catch_Internal: mw.Button
	public get btn_catch(): mw.Button {
		if(!this.btn_catch_Internal&&this.uiWidgetBase) {
			this.btn_catch_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/btn_catch') as mw.Button
		}
		return this.btn_catch_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "walltipsbutton_UI_btn_catch");
		})
		this.btn_catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_catch.onPressed.add(() => {
			this.btn_catch["preScale"] = this.btn_catch.renderScale;
			this.btn_catch.renderScale = Vector2.one.set(this.btn_catch["preScale"]).multiply(1.1);
		})
		this.btn_catch.onReleased.add(() => {
			this.btn_catch.renderScale = this.btn_catch["preScale"];
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

UIService['UI_walltipsbutton_UI'] = walltipsbutton_UI_Generate;