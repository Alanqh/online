
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/DressMain.ui')
export default class DressMain_Generate extends UIScript {
		private mImg_Head_Internal: mw.Image
	public get mImg_Head(): mw.Image {
		if(!this.mImg_Head_Internal&&this.uiWidgetBase) {
			this.mImg_Head_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImg_Head') as mw.Image
		}
		return this.mImg_Head_Internal
	}
	private mCanvas_Tab1_Internal: mw.Canvas
	public get mCanvas_Tab1(): mw.Canvas {
		if(!this.mCanvas_Tab1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Tab1') as mw.Canvas
		}
		return this.mCanvas_Tab1_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mTextBlock_Survive_Internal: mw.TextBlock
	public get mTextBlock_Survive(): mw.TextBlock {
		if(!this.mTextBlock_Survive_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Survive_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/mTextBlock_Survive') as mw.TextBlock
		}
		return this.mTextBlock_Survive_Internal
	}
	private mTextBlock_Catch_Internal: mw.TextBlock
	public get mTextBlock_Catch(): mw.TextBlock {
		if(!this.mTextBlock_Catch_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Catch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/mTextBlock_Catch') as mw.TextBlock
		}
		return this.mTextBlock_Catch_Internal
	}
	private mTextBlock_Death_Internal: mw.TextBlock
	public get mTextBlock_Death(): mw.TextBlock {
		if(!this.mTextBlock_Death_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Death_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_1/mTextBlock_Death') as mw.TextBlock
		}
		return this.mTextBlock_Death_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
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
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mTextBlock_Survive)
		
	
		this.initLanguage(this.mTextBlock_Catch)
		
	
		this.initLanguage(this.mTextBlock_Death)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock_4_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock_4_1_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock_4_1_1_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/TextBlock_Save") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	

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
 