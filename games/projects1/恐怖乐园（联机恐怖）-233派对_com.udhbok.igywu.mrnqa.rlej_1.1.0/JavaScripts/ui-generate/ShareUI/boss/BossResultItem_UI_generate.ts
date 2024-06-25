
 

 @UIBind('UI/ShareUI/boss/BossResultItem_UI.ui')
 export default class BossResultItem_UI_Generate extends UIScript {
	 	private mCanvas_BossResultItem_Internal: mw.Canvas
	public get mCanvas_BossResultItem(): mw.Canvas {
		if(!this.mCanvas_BossResultItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_BossResultItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossResultItem') as mw.Canvas
		}
		return this.mCanvas_BossResultItem_Internal
	}
	private mImage_BossResultItem_Internal: mw.Image
	public get mImage_BossResultItem(): mw.Image {
		if(!this.mImage_BossResultItem_Internal&&this.uiWidgetBase) {
			this.mImage_BossResultItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossResultItem/mImage_BossResultItem') as mw.Image
		}
		return this.mImage_BossResultItem_Internal
	}
	private mTextBlock_BossResultItemNum_Internal: mw.TextBlock
	public get mTextBlock_BossResultItemNum(): mw.TextBlock {
		if(!this.mTextBlock_BossResultItemNum_Internal&&this.uiWidgetBase) {
			this.mTextBlock_BossResultItemNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BossResultItem/mTextBlock_BossResultItemNum') as mw.TextBlock
		}
		return this.mTextBlock_BossResultItemNum_Internal
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
		

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mTextBlock_BossResultItemNum)
		this.mTextBlock_BossResultItemNum.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BossResultItem_UI'] = BossResultItem_UI_Generate;