




@UIBind('UI/ExpresionUI.ui')
export default class ExpresionUI_Generate extends UIScript {
		private exPression_Scroll_Internal: mw.ScrollBox
	public get exPression_Scroll(): mw.ScrollBox {
		if(!this.exPression_Scroll_Internal&&this.uiWidgetBase) {
			this.exPression_Scroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/expressionCanvas/exPression_Scroll') as mw.ScrollBox
		}
		return this.exPression_Scroll_Internal
	}
	private expressionCanvas_Internal: mw.Canvas
	public get expressionCanvas(): mw.Canvas {
		if(!this.expressionCanvas_Internal&&this.uiWidgetBase) {
			this.expressionCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/expressionCanvas') as mw.Canvas
		}
		return this.expressionCanvas_Internal
	}
	private expression_Btn_Internal: mw.StaleButton
	public get expression_Btn(): mw.StaleButton {
		if(!this.expression_Btn_Internal&&this.uiWidgetBase) {
			this.expression_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Expression/expression_Btn') as mw.StaleButton
		}
		return this.expression_Btn_Internal
	}
	private mAction_btn_Internal: mw.StaleButton
	public get mAction_btn(): mw.StaleButton {
		if(!this.mAction_btn_Internal&&this.uiWidgetBase) {
			this.mAction_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsAction/mAction_btn') as mw.StaleButton
		}
		return this.mAction_btn_Internal
	}
	private cvsAction_Internal: mw.Canvas
	public get cvsAction(): mw.Canvas {
		if(!this.cvsAction_Internal&&this.uiWidgetBase) {
			this.cvsAction_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsAction') as mw.Canvas
		}
		return this.cvsAction_Internal
	}
	private mCanvasWord_Internal: mw.Canvas
	public get mCanvasWord(): mw.Canvas {
		if(!this.mCanvasWord_Internal&&this.uiWidgetBase) {
			this.mCanvasWord_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_word/scrollBox_word/mCanvasWord') as mw.Canvas
		}
		return this.mCanvasWord_Internal
	}
	private scrollBox_word_Internal: mw.ScrollBox
	public get scrollBox_word(): mw.ScrollBox {
		if(!this.scrollBox_word_Internal&&this.uiWidgetBase) {
			this.scrollBox_word_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_word/scrollBox_word') as mw.ScrollBox
		}
		return this.scrollBox_word_Internal
	}
	private canvas_word_Internal: mw.Canvas
	public get canvas_word(): mw.Canvas {
		if(!this.canvas_word_Internal&&this.uiWidgetBase) {
			this.canvas_word_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_word') as mw.Canvas
		}
		return this.canvas_word_Internal
	}
	private wordBtn_Internal: mw.StaleButton
	public get wordBtn(): mw.StaleButton {
		if(!this.wordBtn_Internal&&this.uiWidgetBase) {
			this.wordBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_btn/wordBtn') as mw.StaleButton
		}
		return this.wordBtn_Internal
	}
	private canvas_btn_Internal: mw.Canvas
	public get canvas_btn(): mw.Canvas {
		if(!this.canvas_btn_Internal&&this.uiWidgetBase) {
			this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_btn') as mw.Canvas
		}
		return this.canvas_btn_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.expression_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.expression_Btn);
		
	
		this.mAction_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.mAction_btn);
		
	
		this.wordBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.wordBtn);
		
	

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Expression/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cvsAction/TextBlock") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 