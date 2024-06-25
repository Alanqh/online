
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/EffectIcon.ui')
export default class EffectIcon_Generate extends UIScript {
		private mImage_Select_Internal: mw.Image
	public get mImage_Select(): mw.Image {
		if(!this.mImage_Select_Internal&&this.uiWidgetBase) {
			this.mImage_Select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_Select') as mw.Image
		}
		return this.mImage_Select_Internal
	}
	private mImage_EffectPic_Internal: mw.Image
	public get mImage_EffectPic(): mw.Image {
		if(!this.mImage_EffectPic_Internal&&this.uiWidgetBase) {
			this.mImage_EffectPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_EffectPic') as mw.Image
		}
		return this.mImage_EffectPic_Internal
	}
	private mText_EffectName_Internal: mw.TextBlock
	public get mText_EffectName(): mw.TextBlock {
		if(!this.mText_EffectName_Internal&&this.uiWidgetBase) {
			this.mText_EffectName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_EffectName') as mw.TextBlock
		}
		return this.mText_EffectName_Internal
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
	private mImage_Equip_Internal: mw.Image
	public get mImage_Equip(): mw.Image {
		if(!this.mImage_Equip_Internal&&this.uiWidgetBase) {
			this.mImage_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_Equip') as mw.Image
		}
		return this.mImage_Equip_Internal
	}
	private mbtn_Internal: mw.Button
	public get mbtn(): mw.Button {
		if(!this.mbtn_Internal&&this.uiWidgetBase) {
			this.mbtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mbtn') as mw.Button
		}
		return this.mbtn_Internal
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
		
		this.mbtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mbtn");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_EffectName)
		
	
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
 