




@UIBind('UI/TestCamera.ui')
export default class TestCamera_Generate extends UIScript {
		private mInputBox_Internal: mw.InputBox
	public get mInputBox(): mw.InputBox {
		if(!this.mInputBox_Internal&&this.uiWidgetBase) {
			this.mInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputBox') as mw.InputBox
		}
		return this.mInputBox_Internal
	}
	private mInputBox_1_Internal: mw.InputBox
	public get mInputBox_1(): mw.InputBox {
		if(!this.mInputBox_1_Internal&&this.uiWidgetBase) {
			this.mInputBox_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputBox_1') as mw.InputBox
		}
		return this.mInputBox_1_Internal
	}
	private mInputBox_2_Internal: mw.InputBox
	public get mInputBox_2(): mw.InputBox {
		if(!this.mInputBox_2_Internal&&this.uiWidgetBase) {
			this.mInputBox_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputBox_2') as mw.InputBox
		}
		return this.mInputBox_2_Internal
	}
	private mInputBox_3_Internal: mw.InputBox
	public get mInputBox_3(): mw.InputBox {
		if(!this.mInputBox_3_Internal&&this.uiWidgetBase) {
			this.mInputBox_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputBox_3') as mw.InputBox
		}
		return this.mInputBox_3_Internal
	}
	private mInputBox_4_Internal: mw.InputBox
	public get mInputBox_4(): mw.InputBox {
		if(!this.mInputBox_4_Internal&&this.uiWidgetBase) {
			this.mInputBox_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputBox_4') as mw.InputBox
		}
		return this.mInputBox_4_Internal
	}
	private mInputBox_5_Internal: mw.InputBox
	public get mInputBox_5(): mw.InputBox {
		if(!this.mInputBox_5_Internal&&this.uiWidgetBase) {
			this.mInputBox_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputBox_5') as mw.InputBox
		}
		return this.mInputBox_5_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

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
 