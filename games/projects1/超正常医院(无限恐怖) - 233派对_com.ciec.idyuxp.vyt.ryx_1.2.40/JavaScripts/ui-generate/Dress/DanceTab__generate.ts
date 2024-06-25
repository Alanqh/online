
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/DanceTab_.ui')
export default class DanceTab__Generate extends UIScript {
		private mImage_Select_1_Internal: mw.Image
	public get mImage_Select_1(): mw.Image {
		if(!this.mImage_Select_1_Internal&&this.uiWidgetBase) {
			this.mImage_Select_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Select_1') as mw.Image
		}
		return this.mImage_Select_1_Internal
	}
	private mImage_Select_Internal: mw.Image
	public get mImage_Select(): mw.Image {
		if(!this.mImage_Select_Internal&&this.uiWidgetBase) {
			this.mImage_Select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Select') as mw.Image
		}
		return this.mImage_Select_Internal
	}
	private mImage_Select_1_1_Internal: mw.Image
	public get mImage_Select_1_1(): mw.Image {
		if(!this.mImage_Select_1_1_Internal&&this.uiWidgetBase) {
			this.mImage_Select_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Select_1_1') as mw.Image
		}
		return this.mImage_Select_1_1_Internal
	}
	private mText_TagName_Internal: mw.TextBlock
	public get mText_TagName(): mw.TextBlock {
		if(!this.mText_TagName_Internal&&this.uiWidgetBase) {
			this.mText_TagName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_TagName') as mw.TextBlock
		}
		return this.mText_TagName_Internal
	}
	private mBtn_Tab_Internal: mw.Button
	public get mBtn_Tab(): mw.Button {
		if(!this.mBtn_Tab_Internal&&this.uiWidgetBase) {
			this.mBtn_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Tab') as mw.Button
		}
		return this.mBtn_Tab_Internal
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
		
		this.mBtn_Tab.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Tab");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_TagName)
		
	
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
 