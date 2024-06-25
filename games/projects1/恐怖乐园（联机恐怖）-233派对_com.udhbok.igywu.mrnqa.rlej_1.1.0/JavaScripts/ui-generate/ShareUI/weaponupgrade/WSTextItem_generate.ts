
 

 @UIBind('UI/ShareUI/weaponupgrade/WSTextItem.ui')
 export default class WSTextItem_Generate extends UIScript {
	 	private text_Internal: mw.TextBlock
	public get text(): mw.TextBlock {
		if(!this.text_Internal&&this.uiWidgetBase) {
			this.text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text') as mw.TextBlock
		}
		return this.text_Internal
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
		
		this.initLanguage(this.text)
		this.text.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_WSTextItem'] = WSTextItem_Generate;