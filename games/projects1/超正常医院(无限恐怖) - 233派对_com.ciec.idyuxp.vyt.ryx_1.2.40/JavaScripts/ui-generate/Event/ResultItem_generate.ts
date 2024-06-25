
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Event/ResultItem.ui')
export default class ResultItem_Generate extends UIScript {
		private mTxt_Title_Internal: mw.TextBlock
	public get mTxt_Title(): mw.TextBlock {
		if(!this.mTxt_Title_Internal&&this.uiWidgetBase) {
			this.mTxt_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_Title') as mw.TextBlock
		}
		return this.mTxt_Title_Internal
	}
	private mTxt_Num_Internal: mw.TextBlock
	public get mTxt_Num(): mw.TextBlock {
		if(!this.mTxt_Num_Internal&&this.uiWidgetBase) {
			this.mTxt_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_Num') as mw.TextBlock
		}
		return this.mTxt_Num_Internal
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
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_Title)
		
	
		this.initLanguage(this.mTxt_Num)
		
	
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
 