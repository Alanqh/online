
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Porp/Store.ui')
export default class Store_Generate extends UIScript {
		private mTextBlock_Title_Internal: mw.TextBlock
	public get mTextBlock_Title(): mw.TextBlock {
		if(!this.mTextBlock_Title_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mTextBlock_Title') as mw.TextBlock
		}
		return this.mTextBlock_Title_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_Clothes_Internal: mw.Canvas
	public get mCanvas_Clothes(): mw.Canvas {
		if(!this.mCanvas_Clothes_Internal&&this.uiWidgetBase) {
			this.mCanvas_Clothes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mScrollBox/mCanvas_Clothes') as mw.Canvas
		}
		return this.mCanvas_Clothes_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mTextBlock_Number_Internal: mw.TextBlock
	public get mTextBlock_Number(): mw.TextBlock {
		if(!this.mTextBlock_Number_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mTextBlock_Number') as mw.TextBlock
		}
		return this.mTextBlock_Number_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mButton_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_Title)
		
	
		this.initLanguage(this.mTextBlock_Number)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 