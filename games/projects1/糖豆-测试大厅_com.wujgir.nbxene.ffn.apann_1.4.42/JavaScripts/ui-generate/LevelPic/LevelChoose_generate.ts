




@UIBind('UI/LevelPic/LevelChoose.ui')
export default class LevelChoose_Generate extends UIScript {
		private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private mTextBlockTips_Internal: mw.TextBlock
	public get mTextBlockTips(): mw.TextBlock {
		if(!this.mTextBlockTips_Internal&&this.uiWidgetBase) {
			this.mTextBlockTips_Internal = this.uiWidgetBase.findChildByPath('canvas/mTextBlockTips') as mw.TextBlock
		}
		return this.mTextBlockTips_Internal
	}
	private mTextBlockRound_Internal: mw.TextBlock
	public get mTextBlockRound(): mw.TextBlock {
		if(!this.mTextBlockRound_Internal&&this.uiWidgetBase) {
			this.mTextBlockRound_Internal = this.uiWidgetBase.findChildByPath('canvas/mTextBlockRound') as mw.TextBlock
		}
		return this.mTextBlockRound_Internal
	}
	private mIconCanvas_Internal: mw.Canvas
	public get mIconCanvas(): mw.Canvas {
		if(!this.mIconCanvas_Internal&&this.uiWidgetBase) {
			this.mIconCanvas_Internal = this.uiWidgetBase.findChildByPath('canvas/mIconCanvas') as mw.Canvas
		}
		return this.mIconCanvas_Internal
	}
	private tipsRoot_Internal: mw.Canvas
	public get tipsRoot(): mw.Canvas {
		if(!this.tipsRoot_Internal&&this.uiWidgetBase) {
			this.tipsRoot_Internal = this.uiWidgetBase.findChildByPath('canvas/tipsRoot') as mw.Canvas
		}
		return this.tipsRoot_Internal
	}
	private btnBacklobby_Internal: mw.StaleButton
	public get btnBacklobby(): mw.StaleButton {
		if(!this.btnBacklobby_Internal&&this.uiWidgetBase) {
			this.btnBacklobby_Internal = this.uiWidgetBase.findChildByPath('canvas/tipsRoot/btnBacklobby') as mw.StaleButton
		}
		return this.btnBacklobby_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.btnBacklobby.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.btnBacklobby);
		
	

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlockTips)
		
	
		this.initLanguage(this.mTextBlockRound)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("canvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("canvas/tipsRoot/TextBlock_1") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 