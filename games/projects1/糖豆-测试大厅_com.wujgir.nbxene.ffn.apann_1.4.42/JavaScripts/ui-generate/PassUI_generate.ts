




@UIBind('UI/PassUI.ui')
export default class PassUI_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mCanvasMove_Internal: mw.Canvas
	public get mCanvasMove(): mw.Canvas {
		if(!this.mCanvasMove_Internal&&this.uiWidgetBase) {
			this.mCanvasMove_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasMove') as mw.Canvas
		}
		return this.mCanvasMove_Internal
	}
	private enUI_1_Internal: mw.Image
	public get enUI_1(): mw.Image {
		if(!this.enUI_1_Internal&&this.uiWidgetBase) {
			this.enUI_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasMove/enUI_1') as mw.Image
		}
		return this.enUI_1_Internal
	}
	private teamCanvas_Internal: mw.Canvas
	public get teamCanvas(): mw.Canvas {
		if(!this.teamCanvas_Internal&&this.uiWidgetBase) {
			this.teamCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasMove/teamCanvas') as mw.Canvas
		}
		return this.teamCanvas_Internal
	}
	private teamNameTxt_Internal: mw.TextBlock
	public get teamNameTxt(): mw.TextBlock {
		if(!this.teamNameTxt_Internal&&this.uiWidgetBase) {
			this.teamNameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasMove/teamCanvas/teamNameTxt') as mw.TextBlock
		}
		return this.teamNameTxt_Internal
	}
	private mImageEmo_Internal: mw.Image
	public get mImageEmo(): mw.Image {
		if(!this.mImageEmo_Internal&&this.uiWidgetBase) {
			this.mImageEmo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImageEmo') as mw.Image
		}
		return this.mImageEmo_Internal
	}
	private completeTimeTxt_Internal: mw.TextBlock
	public get completeTimeTxt(): mw.TextBlock {
		if(!this.completeTimeTxt_Internal&&this.uiWidgetBase) {
			this.completeTimeTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/completeTimeTxt') as mw.TextBlock
		}
		return this.completeTimeTxt_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.teamNameTxt)
		
	
		this.initLanguage(this.completeTimeTxt)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasMove/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvasMove/teamCanvas/TextBlock_1") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 