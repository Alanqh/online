
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/GameHUD/PlayerBlood.ui')
export default class PlayerBlood_Generate extends UIScript {
		private mImg_Frame_Internal: mw.Image
	public get mImg_Frame(): mw.Image {
		if(!this.mImg_Frame_Internal&&this.uiWidgetBase) {
			this.mImg_Frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Frame') as mw.Image
		}
		return this.mImg_Frame_Internal
	}
	private mCanvas_Blood_Internal: mw.Canvas
	public get mCanvas_Blood(): mw.Canvas {
		if(!this.mCanvas_Blood_Internal&&this.uiWidgetBase) {
			this.mCanvas_Blood_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Blood') as mw.Canvas
		}
		return this.mCanvas_Blood_Internal
	}
	private mImage_1_Internal: mw.Image
	public get mImage_1(): mw.Image {
		if(!this.mImage_1_Internal&&this.uiWidgetBase) {
			this.mImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Blood/mImage_1') as mw.Image
		}
		return this.mImage_1_Internal
	}
	private mImage_2_Internal: mw.Image
	public get mImage_2(): mw.Image {
		if(!this.mImage_2_Internal&&this.uiWidgetBase) {
			this.mImage_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Blood/mImage_2') as mw.Image
		}
		return this.mImage_2_Internal
	}
	private mImage_3_Internal: mw.Image
	public get mImage_3(): mw.Image {
		if(!this.mImage_3_Internal&&this.uiWidgetBase) {
			this.mImage_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Blood/mImage_3') as mw.Image
		}
		return this.mImage_3_Internal
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
 