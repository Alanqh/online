
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Temp/Disband.ui')
export default class Disband_Generate extends UIScript {
		private mBtn_Disband_Internal: mw.Button
	public get mBtn_Disband(): mw.Button {
		if(!this.mBtn_Disband_Internal&&this.uiWidgetBase) {
			this.mBtn_Disband_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Disband') as mw.Button
		}
		return this.mBtn_Disband_Internal
	}
	private mText_Tips_Internal: mw.TextBlock
	public get mText_Tips(): mw.TextBlock {
		if(!this.mText_Tips_Internal&&this.uiWidgetBase) {
			this.mText_Tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Tips') as mw.TextBlock
		}
		return this.mText_Tips_Internal
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
		
		this.mBtn_Disband.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Disband");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Tips)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBtn_Disband/TextBlock") as any);
		
	

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
 