
 

 @UIBind('UI/ShareUI/NPC/TalkItem.ui')
 export default class TalkItem_Generate extends UIScript {
	 	private btn_select_1_Internal: mw.StaleButton
	public get btn_select_1(): mw.StaleButton {
		if(!this.btn_select_1_Internal&&this.uiWidgetBase) {
			this.btn_select_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_select_1') as mw.StaleButton
		}
		return this.btn_select_1_Internal
	}
	private imageMark_Internal: mw.Image
	public get imageMark(): mw.Image {
		if(!this.imageMark_Internal&&this.uiWidgetBase) {
			this.imageMark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imageMark') as mw.Image
		}
		return this.imageMark_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_select_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "TalkItem_btn_select_1");
		})
		this.initLanguage(this.btn_select_1);
		this.btn_select_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_select_1.onPressed.add(() => {
			this.btn_select_1["preScale"] = this.btn_select_1.renderScale;
			this.btn_select_1.renderScale = Vector2.one.set(this.btn_select_1["preScale"]).multiply(1.1);
		})
		this.btn_select_1.onReleased.add(() => {
			this.btn_select_1.renderScale = this.btn_select_1["preScale"];
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

UIService['UI_TalkItem'] = TalkItem_Generate;