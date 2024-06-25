
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/NewUI.ui')
export default class NewUI_Generate extends UIScript {
		private mAds_Internal: mw.AdsButton
	public get mAds(): mw.AdsButton {
		if(!this.mAds_Internal&&this.uiWidgetBase) {
			this.mAds_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAds') as mw.AdsButton
		}
		return this.mAds_Internal
	}
	private mText_tips_Internal: mw.TextBlock
	public get mText_tips(): mw.TextBlock {
		if(!this.mText_tips_Internal&&this.uiWidgetBase) {
			this.mText_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_tips') as mw.TextBlock
		}
		return this.mText_tips_Internal
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
		
		this.initLanguage(this.mText_tips)
		
	
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
 