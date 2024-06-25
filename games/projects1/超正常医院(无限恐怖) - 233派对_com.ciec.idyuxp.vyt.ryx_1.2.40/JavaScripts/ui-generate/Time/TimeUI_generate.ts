
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Time/TimeUI.ui')
export default class TimeUI_Generate extends UIScript {
		private mText_RemainTime_Internal: mw.TextBlock
	public get mText_RemainTime(): mw.TextBlock {
		if(!this.mText_RemainTime_Internal&&this.uiWidgetBase) {
			this.mText_RemainTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_RemainTime') as mw.TextBlock
		}
		return this.mText_RemainTime_Internal
	}
	private mInage_Sun_Internal: mw.Image
	public get mInage_Sun(): mw.Image {
		if(!this.mInage_Sun_Internal&&this.uiWidgetBase) {
			this.mInage_Sun_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInage_Sun') as mw.Image
		}
		return this.mInage_Sun_Internal
	}
	private mImage_Moon_Internal: mw.Image
	public get mImage_Moon(): mw.Image {
		if(!this.mImage_Moon_Internal&&this.uiWidgetBase) {
			this.mImage_Moon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Moon') as mw.Image
		}
		return this.mImage_Moon_Internal
	}
	private mText_Countdays_Internal: mw.TextBlock
	public get mText_Countdays(): mw.TextBlock {
		if(!this.mText_Countdays_Internal&&this.uiWidgetBase) {
			this.mText_Countdays_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Countdays') as mw.TextBlock
		}
		return this.mText_Countdays_Internal
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
		
		this.initLanguage(this.mText_RemainTime)
		
	
		this.initLanguage(this.mText_Countdays)
		
	
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
 