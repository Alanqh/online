




@UIBind('UI/UIScore.ui')
export default class UIScore_Generate extends UIScript {
		private score_Internal: mw.TextBlock
	public get score(): mw.TextBlock {
		if(!this.score_Internal&&this.uiWidgetBase) {
			this.score_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/score') as mw.TextBlock
		}
		return this.score_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.score)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 