




@UIBind('UI/Countdown/CountDown.ui')
export default class CountDown_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mImageClockBack_Internal: mw.Image
	public get mImageClockBack(): mw.Image {
		if(!this.mImageClockBack_Internal&&this.uiWidgetBase) {
			this.mImageClockBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImageClockBack') as mw.Image
		}
		return this.mImageClockBack_Internal
	}
	private mImageClock_Internal: mw.Image
	public get mImageClock(): mw.Image {
		if(!this.mImageClock_Internal&&this.uiWidgetBase) {
			this.mImageClock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImageClock') as mw.Image
		}
		return this.mImageClock_Internal
	}
	private mTextTime_Internal: mw.TextBlock
	public get mTextTime(): mw.TextBlock {
		if(!this.mTextTime_Internal&&this.uiWidgetBase) {
			this.mTextTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextTime') as mw.TextBlock
		}
		return this.mTextTime_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
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
 