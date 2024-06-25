
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Event/Inlet.ui')
export default class Inlet_Generate extends UIScript {
		private mCanvas_Inlet_Internal: mw.Canvas
	public get mCanvas_Inlet(): mw.Canvas {
		if(!this.mCanvas_Inlet_Internal&&this.uiWidgetBase) {
			this.mCanvas_Inlet_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet') as mw.Canvas
		}
		return this.mCanvas_Inlet_Internal
	}
	private mCanvas_Describe_Internal: mw.Canvas
	public get mCanvas_Describe(): mw.Canvas {
		if(!this.mCanvas_Describe_Internal&&this.uiWidgetBase) {
			this.mCanvas_Describe_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_Describe') as mw.Canvas
		}
		return this.mCanvas_Describe_Internal
	}
	private mCanvas_Bonus_Internal: mw.Canvas
	public get mCanvas_Bonus(): mw.Canvas {
		if(!this.mCanvas_Bonus_Internal&&this.uiWidgetBase) {
			this.mCanvas_Bonus_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_Bonus') as mw.Canvas
		}
		return this.mCanvas_Bonus_Internal
	}
	private mCanvas_BonusPre_Internal: mw.Canvas
	public get mCanvas_BonusPre(): mw.Canvas {
		if(!this.mCanvas_BonusPre_Internal&&this.uiWidgetBase) {
			this.mCanvas_BonusPre_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_Bonus/mCanvas_BonusPre') as mw.Canvas
		}
		return this.mCanvas_BonusPre_Internal
	}
	private mCanvas_InletBtn_Internal: mw.Canvas
	public get mCanvas_InletBtn(): mw.Canvas {
		if(!this.mCanvas_InletBtn_Internal&&this.uiWidgetBase) {
			this.mCanvas_InletBtn_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn') as mw.Canvas
		}
		return this.mCanvas_InletBtn_Internal
	}
	private mCanvas_PassCheck_Internal: mw.Canvas
	public get mCanvas_PassCheck(): mw.Canvas {
		if(!this.mCanvas_PassCheck_Internal&&this.uiWidgetBase) {
			this.mCanvas_PassCheck_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn/mCanvas_PassCheck') as mw.Canvas
		}
		return this.mCanvas_PassCheck_Internal
	}
	private mBtn_PassCheck_Internal: mw.Button
	public get mBtn_PassCheck(): mw.Button {
		if(!this.mBtn_PassCheck_Internal&&this.uiWidgetBase) {
			this.mBtn_PassCheck_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn/mCanvas_PassCheck/mBtn_PassCheck') as mw.Button
		}
		return this.mBtn_PassCheck_Internal
	}
	private mCanvas_EventShop_Internal: mw.Canvas
	public get mCanvas_EventShop(): mw.Canvas {
		if(!this.mCanvas_EventShop_Internal&&this.uiWidgetBase) {
			this.mCanvas_EventShop_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn/mCanvas_EventShop') as mw.Canvas
		}
		return this.mCanvas_EventShop_Internal
	}
	private mBtn_EventShop_Internal: mw.Button
	public get mBtn_EventShop(): mw.Button {
		if(!this.mBtn_EventShop_Internal&&this.uiWidgetBase) {
			this.mBtn_EventShop_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn/mCanvas_EventShop/mBtn_EventShop') as mw.Button
		}
		return this.mBtn_EventShop_Internal
	}
	private mCanvas_InletButton_Internal: mw.Canvas
	public get mCanvas_InletButton(): mw.Canvas {
		if(!this.mCanvas_InletButton_Internal&&this.uiWidgetBase) {
			this.mCanvas_InletButton_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn/mCanvas_InletButton') as mw.Canvas
		}
		return this.mCanvas_InletButton_Internal
	}
	private mBtn_Inlet_Internal: mw.Button
	public get mBtn_Inlet(): mw.Button {
		if(!this.mBtn_Inlet_Internal&&this.uiWidgetBase) {
			this.mBtn_Inlet_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn/mCanvas_InletButton/mBtn_Inlet') as mw.Button
		}
		return this.mBtn_Inlet_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('mCanvas_Inlet/mCanvas_InletBtn/mCanvas_InletButton/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
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
		
		this.mBtn_PassCheck.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_PassCheck");
		})
		
	
		this.mBtn_EventShop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_EventShop");
		})
		
	
		this.mBtn_Inlet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Inlet");
		})
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Inlet/mCanvas_Describe/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Inlet/mCanvas_Describe/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Inlet/mCanvas_Describe/TextBlock_5") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Inlet/mCanvas_Bonus/TextBlock_6") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Inlet/mCanvas_InletBtn/mCanvas_PassCheck/TextBlock_7") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Inlet/mCanvas_InletBtn/mCanvas_EventShop/TextBlock_8") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_Inlet/mCanvas_InletBtn/mCanvas_InletButton/TextBlock_9") as any);
		
	

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
 