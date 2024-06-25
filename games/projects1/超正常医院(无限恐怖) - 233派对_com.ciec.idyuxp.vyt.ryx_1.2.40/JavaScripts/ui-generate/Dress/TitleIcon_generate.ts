
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/TitleIcon.ui')
export default class TitleIcon_Generate extends UIScript {
		private mImage_TitlePic_Internal: mw.Image
	public get mImage_TitlePic(): mw.Image {
		if(!this.mImage_TitlePic_Internal&&this.uiWidgetBase) {
			this.mImage_TitlePic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_TitlePic') as mw.Image
		}
		return this.mImage_TitlePic_Internal
	}
	private mText_TitleName_Internal: mw.TextBlock
	public get mText_TitleName(): mw.TextBlock {
		if(!this.mText_TitleName_Internal&&this.uiWidgetBase) {
			this.mText_TitleName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_TitleName') as mw.TextBlock
		}
		return this.mText_TitleName_Internal
	}
	private mImage_Black_Internal: mw.Image
	public get mImage_Black(): mw.Image {
		if(!this.mImage_Black_Internal&&this.uiWidgetBase) {
			this.mImage_Black_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_Black') as mw.Image
		}
		return this.mImage_Black_Internal
	}
	private mImage_Clock_Internal: mw.Image
	public get mImage_Clock(): mw.Image {
		if(!this.mImage_Clock_Internal&&this.uiWidgetBase) {
			this.mImage_Clock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_Black/mImage_Clock') as mw.Image
		}
		return this.mImage_Clock_Internal
	}
	private mImage_Select_Internal: mw.Image
	public get mImage_Select(): mw.Image {
		if(!this.mImage_Select_Internal&&this.uiWidgetBase) {
			this.mImage_Select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_Select') as mw.Image
		}
		return this.mImage_Select_Internal
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
		
		this.initLanguage(this.mText_TitleName)
		
	
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
 