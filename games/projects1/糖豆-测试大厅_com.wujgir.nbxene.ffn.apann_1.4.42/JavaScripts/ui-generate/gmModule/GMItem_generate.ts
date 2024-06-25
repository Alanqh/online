




@UIBind('UI/gmModule/GMItem.ui')
export default class GMItem_Generate extends UIScript {
		private button_Internal: mw.StaleButton
	public get button(): mw.StaleButton {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/button') as mw.StaleButton
		}
		return this.button_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.button.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.button);
		
	

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
 