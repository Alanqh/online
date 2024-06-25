
 

 @UIBind('UI/ShareUI/integration/IntegraBtnItem_UI.ui')
 export default class IntegraBtnItem_UI_Generate extends UIScript {
	 	private canvas_btn_Internal: mw.Canvas
	public get canvas_btn(): mw.Canvas {
		if(!this.canvas_btn_Internal&&this.uiWidgetBase) {
			this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_btn') as mw.Canvas
		}
		return this.canvas_btn_Internal
	}
	private btn_icon_Internal: mw.Button
	public get btn_icon(): mw.Button {
		if(!this.btn_icon_Internal&&this.uiWidgetBase) {
			this.btn_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_btn/btn_icon') as mw.Button
		}
		return this.btn_icon_Internal
	}
	private img_point_Internal: mw.Image
	public get img_point(): mw.Image {
		if(!this.img_point_Internal&&this.uiWidgetBase) {
			this.img_point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_btn/img_point') as mw.Image
		}
		return this.img_point_Internal
	}
	private text_mun_Internal: mw.TextBlock
	public get text_mun(): mw.TextBlock {
		if(!this.text_mun_Internal&&this.uiWidgetBase) {
			this.text_mun_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_btn/img_point/text_mun') as mw.TextBlock
		}
		return this.text_mun_Internal
	}
	private btn_onOff_Internal: mw.Button
	public get btn_onOff(): mw.Button {
		if(!this.btn_onOff_Internal&&this.uiWidgetBase) {
			this.btn_onOff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_btn/btn_onOff') as mw.Button
		}
		return this.btn_onOff_Internal
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
		
		this.btn_icon.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "IntegraBtnItem_UI_btn_icon");
		})
		this.btn_icon.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_icon.onPressed.add(() => {
			this.btn_icon["preScale"] = this.btn_icon.renderScale;
			this.btn_icon.renderScale = Vector2.one.set(this.btn_icon["preScale"]).multiply(1.1);
		})
		this.btn_icon.onReleased.add(() => {
			this.btn_icon.renderScale = this.btn_icon["preScale"];
		})
		
	
		this.btn_onOff.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "IntegraBtnItem_UI_btn_onOff");
		})
		this.btn_onOff.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_onOff.onPressed.add(() => {
			this.btn_onOff["preScale"] = this.btn_onOff.renderScale;
			this.btn_onOff.renderScale = Vector2.one.set(this.btn_onOff["preScale"]).multiply(1.1);
		})
		this.btn_onOff.onReleased.add(() => {
			this.btn_onOff.renderScale = this.btn_onOff["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_mun)
		this.text_mun.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_IntegraBtnItem_UI'] = IntegraBtnItem_UI_Generate;