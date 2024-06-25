




@UIBind('UI/Emoji/Emoji.ui')
export default class Emoji_Generate extends UIScript {
		private mBtn_expression_Internal: mw.StaleButton
	public get mBtn_expression(): mw.StaleButton {
		if(!this.mBtn_expression_Internal&&this.uiWidgetBase) {
			this.mBtn_expression_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_expression') as mw.StaleButton
		}
		return this.mBtn_expression_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.mBtn_expression.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.mBtn_expression);
		
	

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
 