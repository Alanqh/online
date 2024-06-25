
 

 @UIBind('UI/ShareUI/unlock/UnlockedWorld_UI.ui')
 export default class UnlockedWorld_UI_Generate extends UIScript {
	 	private text_unlocked_Internal: mw.TextBlock
	public get text_unlocked(): mw.TextBlock {
		if(!this.text_unlocked_Internal&&this.uiWidgetBase) {
			this.text_unlocked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_unlocked') as mw.TextBlock
		}
		return this.text_unlocked_Internal
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
		
		this.initLanguage(this.text_unlocked)
		this.text_unlocked.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_UnlockedWorld_UI'] = UnlockedWorld_UI_Generate;