
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/iconItem.ui')
export default class iconItem_Generate extends UIScript {
		private mButton_Internal: mw.Button
	public get mButton(): mw.Button {
		if(!this.mButton_Internal&&this.uiWidgetBase) {
			this.mButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton') as mw.Button
		}
		return this.mButton_Internal
	}
	private mImage_icon_Internal: mw.Image
	public get mImage_icon(): mw.Image {
		if(!this.mImage_icon_Internal&&this.uiWidgetBase) {
			this.mImage_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton/mImage_icon') as mw.Image
		}
		return this.mImage_icon_Internal
	}
	private mText_num_Internal: mw.TextBlock
	public get mText_num(): mw.TextBlock {
		if(!this.mText_num_Internal&&this.uiWidgetBase) {
			this.mText_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton/mText_num') as mw.TextBlock
		}
		return this.mText_num_Internal
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
		
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_num)
		
	
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
 