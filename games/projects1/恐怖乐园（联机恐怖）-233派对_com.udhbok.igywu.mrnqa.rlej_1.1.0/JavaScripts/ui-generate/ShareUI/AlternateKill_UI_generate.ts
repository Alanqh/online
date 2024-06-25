
 

 @UIBind('UI/ShareUI/AlternateKill_UI.ui')
 export default class AlternateKill_UI_Generate extends UIScript {
	 	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_hand_Internal: mw.Image
	public get img_hand(): mw.Image {
		if(!this.img_hand_Internal&&this.uiWidgetBase) {
			this.img_hand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_hand') as mw.Image
		}
		return this.img_hand_Internal
	}
	private img_hand2_Internal: mw.Image
	public get img_hand2(): mw.Image {
		if(!this.img_hand2_Internal&&this.uiWidgetBase) {
			this.img_hand2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_hand2') as mw.Image
		}
		return this.img_hand2_Internal
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

UIService['UI_AlternateKill_UI'] = AlternateKill_UI_Generate;