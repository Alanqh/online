
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/Dance.ui')
export default class Dance_Generate extends UIScript {
		private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mCanvas_Tab_Internal: mw.Canvas
	public get mCanvas_Tab(): mw.Canvas {
		if(!this.mCanvas_Tab_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Tab') as mw.Canvas
		}
		return this.mCanvas_Tab_Internal
	}
	private mScrollBox_Dance_Internal: mw.ScrollBox
	public get mScrollBox_Dance(): mw.ScrollBox {
		if(!this.mScrollBox_Dance_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Dance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mScrollBox_Dance') as mw.ScrollBox
		}
		return this.mScrollBox_Dance_Internal
	}
	private mCanvas_Dance_Internal: mw.Canvas
	public get mCanvas_Dance(): mw.Canvas {
		if(!this.mCanvas_Dance_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mScrollBox_Dance/mCanvas_Dance') as mw.Canvas
		}
		return this.mCanvas_Dance_Internal
	}
	private mScrollBox_Expression_Internal: mw.ScrollBox
	public get mScrollBox_Expression(): mw.ScrollBox {
		if(!this.mScrollBox_Expression_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Expression_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mScrollBox_Expression') as mw.ScrollBox
		}
		return this.mScrollBox_Expression_Internal
	}
	private mCanvas_Expression_Internal: mw.Canvas
	public get mCanvas_Expression(): mw.Canvas {
		if(!this.mCanvas_Expression_Internal&&this.uiWidgetBase) {
			this.mCanvas_Expression_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mScrollBox_Expression/mCanvas_Expression') as mw.Canvas
		}
		return this.mCanvas_Expression_Internal
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
		
		this.mButton_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Close");
		})
		
	

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
 