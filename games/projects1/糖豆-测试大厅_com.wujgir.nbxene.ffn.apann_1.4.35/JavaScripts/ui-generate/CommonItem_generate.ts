




@UIBind('UI/CommonItem.ui')
export default class CommonItem_Generate extends UIScript {
		private mCanvas_common_Internal: mw.Canvas
	public get mCanvas_common(): mw.Canvas {
		if(!this.mCanvas_common_Internal&&this.uiWidgetBase) {
			this.mCanvas_common_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_common') as mw.Canvas
		}
		return this.mCanvas_common_Internal
	}
	private mImageBack_Internal: mw.Image
	public get mImageBack(): mw.Image {
		if(!this.mImageBack_Internal&&this.uiWidgetBase) {
			this.mImageBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_common/mImageBack') as mw.Image
		}
		return this.mImageBack_Internal
	}
	private mImg_common_Internal: mw.Image
	public get mImg_common(): mw.Image {
		if(!this.mImg_common_Internal&&this.uiWidgetBase) {
			this.mImg_common_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_common/mImg_common') as mw.Image
		}
		return this.mImg_common_Internal
	}
	private txt_common_Internal: mw.TextBlock
	public get txt_common(): mw.TextBlock {
		if(!this.txt_common_Internal&&this.uiWidgetBase) {
			this.txt_common_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_common/txt_common') as mw.TextBlock
		}
		return this.txt_common_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_common)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 