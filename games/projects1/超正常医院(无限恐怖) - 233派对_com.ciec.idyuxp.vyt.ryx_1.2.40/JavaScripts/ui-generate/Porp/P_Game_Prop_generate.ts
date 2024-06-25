
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Porp/P_Game_Prop.ui')
export default class P_Game_Prop_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mPropCanvas_Internal: mw.Canvas
	public get mPropCanvas(): mw.Canvas {
		if(!this.mPropCanvas_Internal&&this.uiWidgetBase) {
			this.mPropCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/ScrollBox/mPropCanvas') as mw.Canvas
		}
		return this.mPropCanvas_Internal
	}
	private mImage_Action_Internal: mw.Image
	public get mImage_Action(): mw.Image {
		if(!this.mImage_Action_Internal&&this.uiWidgetBase) {
			this.mImage_Action_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImage_Action') as mw.Image
		}
		return this.mImage_Action_Internal
	}
	private mBtn_Action_Internal: mw.MaskButton
	public get mBtn_Action(): mw.MaskButton {
		if(!this.mBtn_Action_Internal&&this.uiWidgetBase) {
			this.mBtn_Action_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mBtn_Action') as mw.MaskButton
		}
		return this.mBtn_Action_Internal
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
 