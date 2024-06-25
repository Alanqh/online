




@UIBind('UI/Rank/RankUI1.ui')
export default class RankUI1_Generate extends UIScript {
		private mBack_Internal: mw.Image
	public get mBack(): mw.Image {
		if(!this.mBack_Internal&&this.uiWidgetBase) {
			this.mBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBack') as mw.Image
		}
		return this.mBack_Internal
	}
	private mRankText_Internal: mw.TextBlock
	public get mRankText(): mw.TextBlock {
		if(!this.mRankText_Internal&&this.uiWidgetBase) {
			this.mRankText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CanvasName/mRankText') as mw.TextBlock
		}
		return this.mRankText_Internal
	}
	private mCanvasView_Internal: mw.Canvas
	public get mCanvasView(): mw.Canvas {
		if(!this.mCanvasView_Internal&&this.uiWidgetBase) {
			this.mCanvasView_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasView') as mw.Canvas
		}
		return this.mCanvasView_Internal
	}
	private mImageBack_Internal: mw.Image
	public get mImageBack(): mw.Image {
		if(!this.mImageBack_Internal&&this.uiWidgetBase) {
			this.mImageBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSelf/mImageBack') as mw.Image
		}
		return this.mImageBack_Internal
	}
	private mTextRankSelf_Internal: mw.TextBlock
	public get mTextRankSelf(): mw.TextBlock {
		if(!this.mTextRankSelf_Internal&&this.uiWidgetBase) {
			this.mTextRankSelf_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSelf/Canvas_2/Canvas_1/mTextRankSelf') as mw.TextBlock
		}
		return this.mTextRankSelf_Internal
	}
	private mImgHead_Internal: mw.Image
	public get mImgHead(): mw.Image {
		if(!this.mImgHead_Internal&&this.uiWidgetBase) {
			this.mImgHead_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSelf/Canvas_2/Canvas_3/mImgHead') as mw.Image
		}
		return this.mImgHead_Internal
	}
	private mTextName_Internal: mw.TextBlock
	public get mTextName(): mw.TextBlock {
		if(!this.mTextName_Internal&&this.uiWidgetBase) {
			this.mTextName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSelf/Canvas_2/Canvas_3/mTextName') as mw.TextBlock
		}
		return this.mTextName_Internal
	}
	private mTextTime_Internal: mw.TextBlock
	public get mTextTime(): mw.TextBlock {
		if(!this.mTextTime_Internal&&this.uiWidgetBase) {
			this.mTextTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSelf/Canvas_2/Canvas_3/mTextTime') as mw.TextBlock
		}
		return this.mTextTime_Internal
	}
	private mCanvasSelf_Internal: mw.Canvas
	public get mCanvasSelf(): mw.Canvas {
		if(!this.mCanvasSelf_Internal&&this.uiWidgetBase) {
			this.mCanvasSelf_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasSelf') as mw.Canvas
		}
		return this.mCanvasSelf_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mRankText)
		
	
		this.initLanguage(this.mTextRankSelf)
		
	
		this.initLanguage(this.mTextName)
		
	
		this.initLanguage(this.mTextTime)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 