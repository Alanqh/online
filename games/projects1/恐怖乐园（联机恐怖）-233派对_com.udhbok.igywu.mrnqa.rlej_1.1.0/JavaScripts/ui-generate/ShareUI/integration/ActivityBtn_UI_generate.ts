
 

 @UIBind('UI/ShareUI/integration/ActivityBtn_UI.ui')
 export default class ActivityBtn_UI_Generate extends UIScript {
	 	private btn_activity1_Internal: mw.Button
	public get btn_activity1(): mw.Button {
		if(!this.btn_activity1_Internal&&this.uiWidgetBase) {
			this.btn_activity1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_activity1') as mw.Button
		}
		return this.btn_activity1_Internal
	}
	private text_activity1_Internal: mw.TextBlock
	public get text_activity1(): mw.TextBlock {
		if(!this.text_activity1_Internal&&this.uiWidgetBase) {
			this.text_activity1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_activity1/text_activity1') as mw.TextBlock
		}
		return this.text_activity1_Internal
	}
	private img_redpointA1_Internal: mw.Image
	public get img_redpointA1(): mw.Image {
		if(!this.img_redpointA1_Internal&&this.uiWidgetBase) {
			this.img_redpointA1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_activity1/img_redpointA1') as mw.Image
		}
		return this.img_redpointA1_Internal
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
		
		this.btn_activity1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ActivityBtn_UI_btn_activity1");
		})
		this.btn_activity1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_activity1.onPressed.add(() => {
			this.btn_activity1["preScale"] = this.btn_activity1.renderScale;
			this.btn_activity1.renderScale = Vector2.one.set(this.btn_activity1["preScale"]).multiply(1.1);
		})
		this.btn_activity1.onReleased.add(() => {
			this.btn_activity1.renderScale = this.btn_activity1["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_activity1)
		this.text_activity1.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ActivityBtn_UI'] = ActivityBtn_UI_Generate;