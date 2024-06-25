




@UIBind('UI/飞扑参数/button.ui')
export default class button_Generate extends UIScript {
		private mbtn_Internal: mw.Button
	public get mbtn(): mw.Button {
		if(!this.mbtn_Internal&&this.uiWidgetBase) {
			this.mbtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mbtn') as mw.Button
		}
		return this.mbtn_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.mbtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
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
 