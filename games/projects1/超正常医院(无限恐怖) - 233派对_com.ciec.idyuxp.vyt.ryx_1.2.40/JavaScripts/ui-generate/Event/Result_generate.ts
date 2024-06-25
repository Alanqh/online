
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Event/Result.ui')
export default class Result_Generate extends UIScript {
		private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mCanvas_ResultList_Internal: mw.Canvas
	public get mCanvas_ResultList(): mw.Canvas {
		if(!this.mCanvas_ResultList_Internal&&this.uiWidgetBase) {
			this.mCanvas_ResultList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ResultList') as mw.Canvas
		}
		return this.mCanvas_ResultList_Internal
	}
	private mCanvas_BonusItem_Internal: mw.Canvas
	public get mCanvas_BonusItem(): mw.Canvas {
		if(!this.mCanvas_BonusItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_BonusItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BonusItem') as mw.Canvas
		}
		return this.mCanvas_BonusItem_Internal
	}
	private mBtn_Affrim_Internal: mw.Button
	public get mBtn_Affrim(): mw.Button {
		if(!this.mBtn_Affrim_Internal&&this.uiWidgetBase) {
			this.mBtn_Affrim_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Affrim') as mw.Button
		}
		return this.mBtn_Affrim_Internal
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
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	
		this.mBtn_Affrim.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Affrim");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_3") as any);
		
	

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
 