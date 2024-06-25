
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/Monster.ui')
export default class Monster_Generate extends UIScript {
		private mImage_MonsterIcon_Internal: mw.Image
	public get mImage_MonsterIcon(): mw.Image {
		if(!this.mImage_MonsterIcon_Internal&&this.uiWidgetBase) {
			this.mImage_MonsterIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_MonsterIcon') as mw.Image
		}
		return this.mImage_MonsterIcon_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Select_Internal: mw.TextBlock
	public get mText_Select(): mw.TextBlock {
		if(!this.mText_Select_Internal&&this.uiWidgetBase) {
			this.mText_Select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Select') as mw.TextBlock
		}
		return this.mText_Select_Internal
	}
	private mCanvas_Select_Internal: mw.Canvas
	public get mCanvas_Select(): mw.Canvas {
		if(!this.mCanvas_Select_Internal&&this.uiWidgetBase) {
			this.mCanvas_Select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Select') as mw.Canvas
		}
		return this.mCanvas_Select_Internal
	}
	private mButton_Change_Internal: mw.Button
	public get mButton_Change(): mw.Button {
		if(!this.mButton_Change_Internal&&this.uiWidgetBase) {
			this.mButton_Change_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Select/mButton_Change') as mw.Button
		}
		return this.mButton_Change_Internal
	}
	private mText_Money_Internal: mw.TextBlock
	public get mText_Money(): mw.TextBlock {
		if(!this.mText_Money_Internal&&this.uiWidgetBase) {
			this.mText_Money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Select/mText_Money') as mw.TextBlock
		}
		return this.mText_Money_Internal
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
		
		this.mButton_Change.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Change");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Select)
		
	
		this.initLanguage(this.mText_Money)
		
	
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
 