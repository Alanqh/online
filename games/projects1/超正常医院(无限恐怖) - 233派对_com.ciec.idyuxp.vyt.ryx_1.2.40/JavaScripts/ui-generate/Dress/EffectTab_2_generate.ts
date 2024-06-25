
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/EffectTab_2.ui')
export default class EffectTab_2_Generate extends UIScript {
		private mImage_Frame_Internal: mw.Image
	public get mImage_Frame(): mw.Image {
		if(!this.mImage_Frame_Internal&&this.uiWidgetBase) {
			this.mImage_Frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Frame') as mw.Image
		}
		return this.mImage_Frame_Internal
	}
	private mText_Form_Internal: mw.TextBlock
	public get mText_Form(): mw.TextBlock {
		if(!this.mText_Form_Internal&&this.uiWidgetBase) {
			this.mText_Form_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Form') as mw.TextBlock
		}
		return this.mText_Form_Internal
	}
	private mBtn_Form_Internal: mw.Button
	public get mBtn_Form(): mw.Button {
		if(!this.mBtn_Form_Internal&&this.uiWidgetBase) {
			this.mBtn_Form_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Form') as mw.Button
		}
		return this.mBtn_Form_Internal
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
		
		this.mBtn_Form.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Form");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Form)
		
	
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
 