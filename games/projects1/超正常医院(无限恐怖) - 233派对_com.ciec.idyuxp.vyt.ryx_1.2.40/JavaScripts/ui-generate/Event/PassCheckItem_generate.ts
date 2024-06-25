
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Event/PassCheckItem.ui')
export default class PassCheckItem_Generate extends UIScript {
		private mTxt_Level_Internal: mw.TextBlock
	public get mTxt_Level(): mw.TextBlock {
		if(!this.mTxt_Level_Internal&&this.uiWidgetBase) {
			this.mTxt_Level_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_Level') as mw.TextBlock
		}
		return this.mTxt_Level_Internal
	}
	private mCanvas_Free_Internal: mw.Canvas
	public get mCanvas_Free(): mw.Canvas {
		if(!this.mCanvas_Free_Internal&&this.uiWidgetBase) {
			this.mCanvas_Free_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Free') as mw.Canvas
		}
		return this.mCanvas_Free_Internal
	}
	private mCanvas_Collection_Internal: mw.Canvas
	public get mCanvas_Collection(): mw.Canvas {
		if(!this.mCanvas_Collection_Internal&&this.uiWidgetBase) {
			this.mCanvas_Collection_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Collection') as mw.Canvas
		}
		return this.mCanvas_Collection_Internal
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
		
		this.initLanguage(this.mTxt_Level)
		
	
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
 