
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/ExpressionItem.ui')
export default class ExpressionItem_Generate extends UIScript {
		private mImage_Pic_Internal: mw.Image
	public get mImage_Pic(): mw.Image {
		if(!this.mImage_Pic_Internal&&this.uiWidgetBase) {
			this.mImage_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Pic') as mw.Image
		}
		return this.mImage_Pic_Internal
	}
	private mText_ExpressionName_Internal: mw.TextBlock
	public get mText_ExpressionName(): mw.TextBlock {
		if(!this.mText_ExpressionName_Internal&&this.uiWidgetBase) {
			this.mText_ExpressionName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_ExpressionName') as mw.TextBlock
		}
		return this.mText_ExpressionName_Internal
	}
	private mButton_Click_Internal: mw.Button
	public get mButton_Click(): mw.Button {
		if(!this.mButton_Click_Internal&&this.uiWidgetBase) {
			this.mButton_Click_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Click') as mw.Button
		}
		return this.mButton_Click_Internal
	}
	private mLock_Canvas_Internal: mw.Canvas
	public get mLock_Canvas(): mw.Canvas {
		if(!this.mLock_Canvas_Internal&&this.uiWidgetBase) {
			this.mLock_Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLock_Canvas') as mw.Canvas
		}
		return this.mLock_Canvas_Internal
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
		
		this.mButton_Click.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Click");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_ExpressionName)
		
	
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
 