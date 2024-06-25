




@UIBind('UI/Prefabs/淘汰场景/UI/EliminUI1.ui')
export default class EliminUI1_Generate extends UIScript {
		private playerNumText_Internal: mw.TextBlock
	public get playerNumText(): mw.TextBlock {
		if(!this.playerNumText_Internal&&this.uiWidgetBase) {
			this.playerNumText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playerNumText') as mw.TextBlock
		}
		return this.playerNumText_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.playerNumText)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 