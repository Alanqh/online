
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Porp/PropItem.ui')
export default class PropItem_Generate extends UIScript {
		private mSelect_Internal: mw.Image
	public get mSelect(): mw.Image {
		if(!this.mSelect_Internal&&this.uiWidgetBase) {
			this.mSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelect') as mw.Image
		}
		return this.mSelect_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mText_Number_Internal: mw.TextBlock
	public get mText_Number(): mw.TextBlock {
		if(!this.mText_Number_Internal&&this.uiWidgetBase) {
			this.mText_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Number') as mw.TextBlock
		}
		return this.mText_Number_Internal
	}
	private mBtn_Internal: mw.Button
	public get mBtn(): mw.Button {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.Button
		}
		return this.mBtn_Internal
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
		
		this.mBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Number)
		
	
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
 