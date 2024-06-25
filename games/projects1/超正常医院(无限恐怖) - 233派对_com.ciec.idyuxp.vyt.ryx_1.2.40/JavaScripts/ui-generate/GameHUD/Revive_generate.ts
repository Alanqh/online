
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/GameHUD/Revive.ui')
export default class Revive_Generate extends UIScript {
		private mText_ReviveCoinCount_Internal: mw.TextBlock
	public get mText_ReviveCoinCount(): mw.TextBlock {
		if(!this.mText_ReviveCoinCount_Internal&&this.uiWidgetBase) {
			this.mText_ReviveCoinCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_ReviveCoinCount') as mw.TextBlock
		}
		return this.mText_ReviveCoinCount_Internal
	}
	private mBtn_Use_Internal: mw.Button
	public get mBtn_Use(): mw.Button {
		if(!this.mBtn_Use_Internal&&this.uiWidgetBase) {
			this.mBtn_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Use') as mw.Button
		}
		return this.mBtn_Use_Internal
	}
	private mText_ReviveCoinCount_1_Internal: mw.TextBlock
	public get mText_ReviveCoinCount_1(): mw.TextBlock {
		if(!this.mText_ReviveCoinCount_1_Internal&&this.uiWidgetBase) {
			this.mText_ReviveCoinCount_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_ReviveCoinCount_1') as mw.TextBlock
		}
		return this.mText_ReviveCoinCount_1_Internal
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
		
		this.mBtn_Use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Use");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_ReviveCoinCount)
		
	
		this.initLanguage(this.mText_ReviveCoinCount_1)
		
	
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
 