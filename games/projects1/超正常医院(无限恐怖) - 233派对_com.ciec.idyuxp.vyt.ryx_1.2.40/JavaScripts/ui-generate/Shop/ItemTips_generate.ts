
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/ItemTips.ui')
export default class ItemTips_Generate extends UIScript {
		private mButton_Click_Internal: mw.Button
	public get mButton_Click(): mw.Button {
		if(!this.mButton_Click_Internal&&this.uiWidgetBase) {
			this.mButton_Click_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Click') as mw.Button
		}
		return this.mButton_Click_Internal
	}
	private mImage_Coin_Internal: mw.Image
	public get mImage_Coin(): mw.Image {
		if(!this.mImage_Coin_Internal&&this.uiWidgetBase) {
			this.mImage_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Coin') as mw.Image
		}
		return this.mImage_Coin_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Name_1_Internal: mw.TextBlock
	public get mText_Name_1(): mw.TextBlock {
		if(!this.mText_Name_1_Internal&&this.uiWidgetBase) {
			this.mText_Name_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name_1') as mw.TextBlock
		}
		return this.mText_Name_1_Internal
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
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Name_1)
		
	
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
 