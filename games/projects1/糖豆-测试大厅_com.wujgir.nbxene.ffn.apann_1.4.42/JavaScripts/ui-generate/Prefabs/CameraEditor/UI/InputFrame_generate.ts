




@UIBind('UI/Prefabs/CameraEditor/UI/InputFrame.ui')
export default class InputFrame_Generate extends UIScript {
		private inputBox_Internal: mw.InputBox
	public get inputBox(): mw.InputBox {
		if(!this.inputBox_Internal&&this.uiWidgetBase) {
			this.inputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/inputBox') as mw.InputBox
		}
		return this.inputBox_Internal
	}
	private okButton_Internal: mw.Button
	public get okButton(): mw.Button {
		if(!this.okButton_Internal&&this.uiWidgetBase) {
			this.okButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/okButton') as mw.Button
		}
		return this.okButton_Internal
	}
	private closeButton_Internal: mw.Button
	public get closeButton(): mw.Button {
		if(!this.closeButton_Internal&&this.uiWidgetBase) {
			this.closeButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeButton') as mw.Button
		}
		return this.closeButton_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.okButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.closeButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/okButton/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/closeButton/TextBlock") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 