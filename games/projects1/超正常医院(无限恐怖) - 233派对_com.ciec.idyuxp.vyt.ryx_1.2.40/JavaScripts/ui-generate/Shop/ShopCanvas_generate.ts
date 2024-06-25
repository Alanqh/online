
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/ShopCanvas.ui')
export default class ShopCanvas_Generate extends UIScript {
		private mScrollBox_Prop_Internal: mw.ScrollBox
	public get mScrollBox_Prop(): mw.ScrollBox {
		if(!this.mScrollBox_Prop_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Prop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Prop') as mw.ScrollBox
		}
		return this.mScrollBox_Prop_Internal
	}
	private mCanvas_Prop_Internal: mw.Canvas
	public get mCanvas_Prop(): mw.Canvas {
		if(!this.mCanvas_Prop_Internal&&this.uiWidgetBase) {
			this.mCanvas_Prop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Prop/mCanvas_Prop') as mw.Canvas
		}
		return this.mCanvas_Prop_Internal
	}
	private mCanvas_SecList_Internal: mw.Canvas
	public get mCanvas_SecList(): mw.Canvas {
		if(!this.mCanvas_SecList_Internal&&this.uiWidgetBase) {
			this.mCanvas_SecList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_SecList') as mw.Canvas
		}
		return this.mCanvas_SecList_Internal
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
 