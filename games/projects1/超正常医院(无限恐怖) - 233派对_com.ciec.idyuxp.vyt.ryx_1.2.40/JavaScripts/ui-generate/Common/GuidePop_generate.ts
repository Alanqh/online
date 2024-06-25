
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Common/GuidePop.ui')
export default class GuidePop_Generate extends UIScript {
		private mImg_Background_1_Internal: mw.Image
	public get mImg_Background_1(): mw.Image {
		if(!this.mImg_Background_1_Internal&&this.uiWidgetBase) {
			this.mImg_Background_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Background_1') as mw.Image
		}
		return this.mImg_Background_1_Internal
	}
	private mImg_Background_2_Internal: mw.Image
	public get mImg_Background_2(): mw.Image {
		if(!this.mImg_Background_2_Internal&&this.uiWidgetBase) {
			this.mImg_Background_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Background_2') as mw.Image
		}
		return this.mImg_Background_2_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mImg_TeachShow_Internal: mw.Image
	public get mImg_TeachShow(): mw.Image {
		if(!this.mImg_TeachShow_Internal&&this.uiWidgetBase) {
			this.mImg_TeachShow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImg_TeachShow') as mw.Image
		}
		return this.mImg_TeachShow_Internal
	}
	private mText_Des_Internal: mw.TextBlock
	public get mText_Des(): mw.TextBlock {
		if(!this.mText_Des_Internal&&this.uiWidgetBase) {
			this.mText_Des_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Des') as mw.TextBlock
		}
		return this.mText_Des_Internal
	}
	private mButton_Confirm_Internal: mw.Button
	public get mButton_Confirm(): mw.Button {
		if(!this.mButton_Confirm_Internal&&this.uiWidgetBase) {
			this.mButton_Confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Confirm') as mw.Button
		}
		return this.mButton_Confirm_Internal
	}
	private mText_Konw_Internal: mw.TextBlock
	public get mText_Konw(): mw.TextBlock {
		if(!this.mText_Konw_Internal&&this.uiWidgetBase) {
			this.mText_Konw_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Konw') as mw.TextBlock
		}
		return this.mText_Konw_Internal
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
		
	
		this.mButton_Confirm.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Confirm");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Des)
		
	
		this.initLanguage(this.mText_Konw)
		
	
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
 