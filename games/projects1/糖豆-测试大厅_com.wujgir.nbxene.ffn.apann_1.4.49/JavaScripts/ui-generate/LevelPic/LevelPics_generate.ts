




@UIBind('UI/LevelPic/LevelPics.ui')
export default class LevelPics_Generate extends UIScript {
		private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private picBg_Internal: mw.Image
	public get picBg(): mw.Image {
		if(!this.picBg_Internal&&this.uiWidgetBase) {
			this.picBg_Internal = this.uiWidgetBase.findChildByPath('canvas/picBg') as mw.Image
		}
		return this.picBg_Internal
	}
	private mIconPic_Internal: mw.Image
	public get mIconPic(): mw.Image {
		if(!this.mIconPic_Internal&&this.uiWidgetBase) {
			this.mIconPic_Internal = this.uiWidgetBase.findChildByPath('canvas/mIconPic') as mw.Image
		}
		return this.mIconPic_Internal
	}
	private imgColor_Internal: mw.Image
	public get imgColor(): mw.Image {
		if(!this.imgColor_Internal&&this.uiWidgetBase) {
			this.imgColor_Internal = this.uiWidgetBase.findChildByPath('canvas/imgColor') as mw.Image
		}
		return this.imgColor_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('canvas/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 