
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Common/GuideChoose.ui')
export default class GuideChoose_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mImg_Background_1_Internal: mw.Image
	public get mImg_Background_1(): mw.Image {
		if(!this.mImg_Background_1_Internal&&this.uiWidgetBase) {
			this.mImg_Background_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImg_Background_1') as mw.Image
		}
		return this.mImg_Background_1_Internal
	}
	private mImg_Background_2_Internal: mw.Image
	public get mImg_Background_2(): mw.Image {
		if(!this.mImg_Background_2_Internal&&this.uiWidgetBase) {
			this.mImg_Background_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImg_Background_2') as mw.Image
		}
		return this.mImg_Background_2_Internal
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
	private mText_Des_Internal: mw.TextBlock
	public get mText_Des(): mw.TextBlock {
		if(!this.mText_Des_Internal&&this.uiWidgetBase) {
			this.mText_Des_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Des') as mw.TextBlock
		}
		return this.mText_Des_Internal
	}
	private mButton_Old_Internal: mw.Button
	public get mButton_Old(): mw.Button {
		if(!this.mButton_Old_Internal&&this.uiWidgetBase) {
			this.mButton_Old_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Old') as mw.Button
		}
		return this.mButton_Old_Internal
	}
	private mText_old_Internal: mw.TextBlock
	public get mText_old(): mw.TextBlock {
		if(!this.mText_old_Internal&&this.uiWidgetBase) {
			this.mText_old_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_old') as mw.TextBlock
		}
		return this.mText_old_Internal
	}
	private mButton_New_Internal: mw.Button
	public get mButton_New(): mw.Button {
		if(!this.mButton_New_Internal&&this.uiWidgetBase) {
			this.mButton_New_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_New') as mw.Button
		}
		return this.mButton_New_Internal
	}
	private mText_New_Internal: mw.TextBlock
	public get mText_New(): mw.TextBlock {
		if(!this.mText_New_Internal&&this.uiWidgetBase) {
			this.mText_New_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_New') as mw.TextBlock
		}
		return this.mText_New_Internal
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
		
	
		this.mButton_Old.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Old");
		})
		
	
		this.mButton_New.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_New");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Des)
		
	
		this.initLanguage(this.mText_old)
		
	
		this.initLanguage(this.mText_New)
		
	
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
 