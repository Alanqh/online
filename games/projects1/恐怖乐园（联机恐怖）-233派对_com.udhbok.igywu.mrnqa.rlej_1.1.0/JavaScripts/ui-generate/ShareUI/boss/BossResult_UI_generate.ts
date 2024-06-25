
 

 @UIBind('UI/ShareUI/boss/BossResult_UI.ui')
 export default class BossResult_UI_Generate extends UIScript {
	 	private mCanvas_BossResult_Internal: mw.Canvas
	public get mCanvas_BossResult(): mw.Canvas {
		if(!this.mCanvas_BossResult_Internal&&this.uiWidgetBase) {
			this.mCanvas_BossResult_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossResult') as mw.Canvas
		}
		return this.mCanvas_BossResult_Internal
	}
	private mTextBlock_Lose_Internal: mw.TextBlock
	public get mTextBlock_Lose(): mw.TextBlock {
		if(!this.mTextBlock_Lose_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Lose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossResult/mTextBlock_Lose') as mw.TextBlock
		}
		return this.mTextBlock_Lose_Internal
	}
	private mTextBlock_Win_Internal: mw.TextBlock
	public get mTextBlock_Win(): mw.TextBlock {
		if(!this.mTextBlock_Win_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Win_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossResult/mTextBlock_Win') as mw.TextBlock
		}
		return this.mTextBlock_Win_Internal
	}
	private mCanvas_BossPrice_Internal: mw.Canvas
	public get mCanvas_BossPrice(): mw.Canvas {
		if(!this.mCanvas_BossPrice_Internal&&this.uiWidgetBase) {
			this.mCanvas_BossPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossPrice') as mw.Canvas
		}
		return this.mCanvas_BossPrice_Internal
	}
	private mImage_silver_Internal: mw.Image
	public get mImage_silver(): mw.Image {
		if(!this.mImage_silver_Internal&&this.uiWidgetBase) {
			this.mImage_silver_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossPrice/Canvas_2/mImage_silver') as mw.Image
		}
		return this.mImage_silver_Internal
	}
	private mImage_bronze_Internal: mw.Image
	public get mImage_bronze(): mw.Image {
		if(!this.mImage_bronze_Internal&&this.uiWidgetBase) {
			this.mImage_bronze_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossPrice/Canvas_2/mImage_bronze') as mw.Image
		}
		return this.mImage_bronze_Internal
	}
	private mImage_gold_Internal: mw.Image
	public get mImage_gold(): mw.Image {
		if(!this.mImage_gold_Internal&&this.uiWidgetBase) {
			this.mImage_gold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossPrice/Canvas_2/mImage_gold') as mw.Image
		}
		return this.mImage_gold_Internal
	}
	private mCanvas_ResultItem_Internal: mw.Canvas
	public get mCanvas_ResultItem(): mw.Canvas {
		if(!this.mCanvas_ResultItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_ResultItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossPrice/mCanvas_ResultItem') as mw.Canvas
		}
		return this.mCanvas_ResultItem_Internal
	}
	private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossPrice/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		

		//按钮添加点击
		
		this.closeBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BossResult_UI_closeBtn");
		})
		this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.closeBtn.onPressed.add(() => {
			this.closeBtn["preScale"] = this.closeBtn.renderScale;
			this.closeBtn.renderScale = Vector2.one.set(this.closeBtn["preScale"]).multiply(1.1);
		})
		this.closeBtn.onReleased.add(() => {
			this.closeBtn.renderScale = this.closeBtn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mTextBlock_Lose)
		this.mTextBlock_Lose.isRichText = true;
		
	
		this.initLanguage(this.mTextBlock_Win)
		this.mTextBlock_Win.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_BossPrice/TextWin") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BossResult_UI'] = BossResult_UI_Generate;