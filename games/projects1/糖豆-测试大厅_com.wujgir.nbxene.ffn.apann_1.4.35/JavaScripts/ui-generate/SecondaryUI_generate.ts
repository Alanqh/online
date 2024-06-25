




@UIBind('UI/SecondaryUI.ui')
export default class SecondaryUI_Generate extends UIScript {
		private cancelBtn_Internal: mw.Button
	public get cancelBtn(): mw.Button {
		if(!this.cancelBtn_Internal&&this.uiWidgetBase) {
			this.cancelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/cancelBtn') as mw.Button
		}
		return this.cancelBtn_Internal
	}
	private confirmBtn_Internal: mw.Button
	public get confirmBtn(): mw.Button {
		if(!this.confirmBtn_Internal&&this.uiWidgetBase) {
			this.confirmBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/confirmBtn') as mw.Button
		}
		return this.confirmBtn_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.cancelBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.confirmBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/cancelBtn/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/confirmBtn/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock_1") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 