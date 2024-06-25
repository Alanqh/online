
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/GameHUD/Gun_HUD.ui')
export default class Gun_HUD_Generate extends UIScript {
		private mv_select_Internal: mw.VirtualJoystickPanel
	public get mv_select(): mw.VirtualJoystickPanel {
		if(!this.mv_select_Internal&&this.uiWidgetBase) {
			this.mv_select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mv_select') as mw.VirtualJoystickPanel
		}
		return this.mv_select_Internal
	}
	private mImage_Action_Internal: mw.Image
	public get mImage_Action(): mw.Image {
		if(!this.mImage_Action_Internal&&this.uiWidgetBase) {
			this.mImage_Action_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Action') as mw.Image
		}
		return this.mImage_Action_Internal
	}
	private mCanvas_5_Internal: mw.Canvas
	public get mCanvas_5(): mw.Canvas {
		if(!this.mCanvas_5_Internal&&this.uiWidgetBase) {
			this.mCanvas_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_5') as mw.Canvas
		}
		return this.mCanvas_5_Internal
	}
	private mImg_5_1_Internal: mw.Image
	public get mImg_5_1(): mw.Image {
		if(!this.mImg_5_1_Internal&&this.uiWidgetBase) {
			this.mImg_5_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_5/mImg_5_1') as mw.Image
		}
		return this.mImg_5_1_Internal
	}
	private mImg_5_2_Internal: mw.Image
	public get mImg_5_2(): mw.Image {
		if(!this.mImg_5_2_Internal&&this.uiWidgetBase) {
			this.mImg_5_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_5/mImg_5_2') as mw.Image
		}
		return this.mImg_5_2_Internal
	}
	private mImg_5_3_Internal: mw.Image
	public get mImg_5_3(): mw.Image {
		if(!this.mImg_5_3_Internal&&this.uiWidgetBase) {
			this.mImg_5_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_5/mImg_5_3') as mw.Image
		}
		return this.mImg_5_3_Internal
	}
	private mImg_5_4_Internal: mw.Image
	public get mImg_5_4(): mw.Image {
		if(!this.mImg_5_4_Internal&&this.uiWidgetBase) {
			this.mImg_5_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_5/mImg_5_4') as mw.Image
		}
		return this.mImg_5_4_Internal
	}
	private mImg_5_5_Internal: mw.Image
	public get mImg_5_5(): mw.Image {
		if(!this.mImg_5_5_Internal&&this.uiWidgetBase) {
			this.mImg_5_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_5/mImg_5_5') as mw.Image
		}
		return this.mImg_5_5_Internal
	}
	private mImg_BackGround_Internal: mw.Image
	public get mImg_BackGround(): mw.Image {
		if(!this.mImg_BackGround_Internal&&this.uiWidgetBase) {
			this.mImg_BackGround_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_5/mImg_BackGround') as mw.Image
		}
		return this.mImg_BackGround_Internal
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
 