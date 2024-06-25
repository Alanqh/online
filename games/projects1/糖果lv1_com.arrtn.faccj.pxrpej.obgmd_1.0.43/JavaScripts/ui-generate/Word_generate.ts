




@UIBind('UI/Word.ui')
export default class Word_Generate extends UIScript {
		private mBtn_word_Internal: mw.StaleButton
	public get mBtn_word(): mw.StaleButton {
		if(!this.mBtn_word_Internal&&this.uiWidgetBase) {
			this.mBtn_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_word') as mw.StaleButton
		}
		return this.mBtn_word_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.mBtn_word.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.mBtn_word);
		
	

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
 