




@UIBind('UI/TitleUI.ui')
export default class TitleUI_Generate extends UIScript {
		private txtTitle_Internal: mw.TextBlock
	public get txtTitle(): mw.TextBlock {
		if(!this.txtTitle_Internal&&this.uiWidgetBase) {
			this.txtTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txtTitle') as mw.TextBlock
		}
		return this.txtTitle_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txtTitle)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 