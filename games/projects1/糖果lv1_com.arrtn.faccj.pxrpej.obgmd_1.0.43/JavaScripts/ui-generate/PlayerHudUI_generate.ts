




@UIBind('UI/PlayerHudUI.ui')
export default class PlayerHudUI_Generate extends UIScript {
		private mTextBlockSelf_Internal: mw.TextBlock
	public get mTextBlockSelf(): mw.TextBlock {
		if(!this.mTextBlockSelf_Internal&&this.uiWidgetBase) {
			this.mTextBlockSelf_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlockSelf') as mw.TextBlock
		}
		return this.mTextBlockSelf_Internal
	}
	private mTextBlockOther_Internal: mw.TextBlock
	public get mTextBlockOther(): mw.TextBlock {
		if(!this.mTextBlockOther_Internal&&this.uiWidgetBase) {
			this.mTextBlockOther_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlockOther') as mw.TextBlock
		}
		return this.mTextBlockOther_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlockSelf)
		
	
		this.initLanguage(this.mTextBlockOther)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 