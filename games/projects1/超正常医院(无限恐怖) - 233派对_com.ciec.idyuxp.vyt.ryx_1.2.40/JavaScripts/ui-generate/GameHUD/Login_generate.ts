
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/GameHUD/Login.ui')
export default class Login_Generate extends UIScript {
		private mYes_btn_Internal: mw.StaleButton
	public get mYes_btn(): mw.StaleButton {
		if(!this.mYes_btn_Internal&&this.uiWidgetBase) {
			this.mYes_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BodyCanvas/mYes_btn') as mw.StaleButton
		}
		return this.mYes_btn_Internal
	}
	private mContent_txt_Internal: mw.TextBlock
	public get mContent_txt(): mw.TextBlock {
		if(!this.mContent_txt_Internal&&this.uiWidgetBase) {
			this.mContent_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BodyCanvas/mContent_txt') as mw.TextBlock
		}
		return this.mContent_txt_Internal
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
		
		this.mYes_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mYes_btn");
		})
		this.initLanguage(this.mYes_btn);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mContent_txt)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/BodyCanvas/TextBlock_1") as any);
		
	

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
 