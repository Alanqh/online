
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/AnimationEditor/frameItem.ui')
export default class frameItem_Generate extends UIScript {
		private mButton_Internal: mw.Button
	public get mButton(): mw.Button {
		if(!this.mButton_Internal&&this.uiWidgetBase) {
			this.mButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton') as mw.Button
		}
		return this.mButton_Internal
	}
	private mSelectImage_Internal: mw.Image
	public get mSelectImage(): mw.Image {
		if(!this.mSelectImage_Internal&&this.uiWidgetBase) {
			this.mSelectImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectImage') as mw.Image
		}
		return this.mSelectImage_Internal
	}
	private mIndex_Internal: mw.TextBlock
	public get mIndex(): mw.TextBlock {
		if(!this.mIndex_Internal&&this.uiWidgetBase) {
			this.mIndex_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIndex') as mw.TextBlock
		}
		return this.mIndex_Internal
	}
	private mImage_Internal: mw.Image
	public get mImage(): mw.Image {
		if(!this.mImage_Internal&&this.uiWidgetBase) {
			this.mImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage') as mw.Image
		}
		return this.mImage_Internal
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
		
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mIndex)
		
	
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
 