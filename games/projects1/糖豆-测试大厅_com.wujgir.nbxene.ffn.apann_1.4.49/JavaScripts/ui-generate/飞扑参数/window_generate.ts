




@UIBind('UI/飞扑参数/window.ui')
export default class window_Generate extends UIScript {
		private mbox1_Internal: mw.InputBox
	public get mbox1(): mw.InputBox {
		if(!this.mbox1_Internal&&this.uiWidgetBase) {
			this.mbox1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/mbox1') as mw.InputBox
		}
		return this.mbox1_Internal
	}
	private mbox2_Internal: mw.InputBox
	public get mbox2(): mw.InputBox {
		if(!this.mbox2_Internal&&this.uiWidgetBase) {
			this.mbox2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/MWCanvas_2147380006/mbox2') as mw.InputBox
		}
		return this.mbox2_Internal
	}
	private mbox3_Internal: mw.InputBox
	public get mbox3(): mw.InputBox {
		if(!this.mbox3_Internal&&this.uiWidgetBase) {
			this.mbox3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/MWCanvas_2147380000/mbox3') as mw.InputBox
		}
		return this.mbox3_Internal
	}
	private mbox4_Internal: mw.InputBox
	public get mbox4(): mw.InputBox {
		if(!this.mbox4_Internal&&this.uiWidgetBase) {
			this.mbox4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/MWCanvas_2147379994/mbox4') as mw.InputBox
		}
		return this.mbox4_Internal
	}
	private mbox5_Internal: mw.InputBox
	public get mbox5(): mw.InputBox {
		if(!this.mbox5_Internal&&this.uiWidgetBase) {
			this.mbox5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/MWCanvas_2147379988/mbox5') as mw.InputBox
		}
		return this.mbox5_Internal
	}
	private mbox6_Internal: mw.InputBox
	public get mbox6(): mw.InputBox {
		if(!this.mbox6_Internal&&this.uiWidgetBase) {
			this.mbox6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/MWCanvas_2147379982/mbox6') as mw.InputBox
		}
		return this.mbox6_Internal
	}
	private mbox7_Internal: mw.InputBox
	public get mbox7(): mw.InputBox {
		if(!this.mbox7_Internal&&this.uiWidgetBase) {
			this.mbox7_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/MWCanvas_2147379976/mbox7') as mw.InputBox
		}
		return this.mbox7_Internal
	}
	private mbox8_Internal: mw.InputBox
	public get mbox8(): mw.InputBox {
		if(!this.mbox8_Internal&&this.uiWidgetBase) {
			this.mbox8_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1_1/mbox8') as mw.InputBox
		}
		return this.mbox8_Internal
	}
	private mbox9_Internal: mw.InputBox
	public get mbox9(): mw.InputBox {
		if(!this.mbox9_Internal&&this.uiWidgetBase) {
			this.mbox9_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1_2/mbox9') as mw.InputBox
		}
		return this.mbox9_Internal
	}
	private mUseBtn_Internal: mw.Button
	public get mUseBtn(): mw.Button {
		if(!this.mUseBtn_Internal&&this.uiWidgetBase) {
			this.mUseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mUseBtn') as mw.Button
		}
		return this.mUseBtn_Internal
	}
	private mCloseBtn_Internal: mw.Button
	public get mCloseBtn(): mw.Button {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCloseBtn') as mw.Button
		}
		return this.mCloseBtn_Internal
	}
	private mbox10_Internal: mw.InputBox
	public get mbox10(): mw.InputBox {
		if(!this.mbox10_Internal&&this.uiWidgetBase) {
			this.mbox10_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1_2_1/mbox10') as mw.InputBox
		}
		return this.mbox10_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.mUseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.mCloseBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/MWCanvas_2147380006/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/MWCanvas_2147380000/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/MWCanvas_2147379994/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/MWCanvas_2147379988/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/MWCanvas_2147379982/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/MWCanvas_2147379976/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1_1/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1_2/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1_2_1/TextBlock") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 