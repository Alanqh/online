
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/GameHUD/Rule.ui')
export default class Rule_Generate extends UIScript {
		private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_Rules_Internal: mw.Canvas
	public get mCanvas_Rules(): mw.Canvas {
		if(!this.mCanvas_Rules_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rules_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rules') as mw.Canvas
		}
		return this.mCanvas_Rules_Internal
	}
	private mTxt_Page_Internal: mw.TextBlock
	public get mTxt_Page(): mw.TextBlock {
		if(!this.mTxt_Page_Internal&&this.uiWidgetBase) {
			this.mTxt_Page_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rules/mTxt_Page') as mw.TextBlock
		}
		return this.mTxt_Page_Internal
	}
	private mBtn_PreviousPage_Internal: mw.StaleButton
	public get mBtn_PreviousPage(): mw.StaleButton {
		if(!this.mBtn_PreviousPage_Internal&&this.uiWidgetBase) {
			this.mBtn_PreviousPage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rules/mBtn_PreviousPage') as mw.StaleButton
		}
		return this.mBtn_PreviousPage_Internal
	}
	private mBtn_NextPage_Internal: mw.StaleButton
	public get mBtn_NextPage(): mw.StaleButton {
		if(!this.mBtn_NextPage_Internal&&this.uiWidgetBase) {
			this.mBtn_NextPage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rules/mBtn_NextPage') as mw.StaleButton
		}
		return this.mBtn_NextPage_Internal
	}
	private mBtn_close_Internal: mw.Button
	public get mBtn_close(): mw.Button {
		if(!this.mBtn_close_Internal&&this.uiWidgetBase) {
			this.mBtn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rules/mBtn_close') as mw.Button
		}
		return this.mBtn_close_Internal
	}
	private mCanvas_Rule_Internal: mw.Canvas
	public get mCanvas_Rule(): mw.Canvas {
		if(!this.mCanvas_Rule_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rule_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule') as mw.Canvas
		}
		return this.mCanvas_Rule_Internal
	}
	private mImg_Picture_01_Internal: mw.Image
	public get mImg_Picture_01(): mw.Image {
		if(!this.mImg_Picture_01_Internal&&this.uiWidgetBase) {
			this.mImg_Picture_01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule/Canvas_Frist/mImg_Picture_01') as mw.Image
		}
		return this.mImg_Picture_01_Internal
	}
	private mTxt_Describe_01_Internal: mw.TextBlock
	public get mTxt_Describe_01(): mw.TextBlock {
		if(!this.mTxt_Describe_01_Internal&&this.uiWidgetBase) {
			this.mTxt_Describe_01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule/Canvas_Frist/mTxt_Describe_01') as mw.TextBlock
		}
		return this.mTxt_Describe_01_Internal
	}
	private mImg_Picture_02_Internal: mw.Image
	public get mImg_Picture_02(): mw.Image {
		if(!this.mImg_Picture_02_Internal&&this.uiWidgetBase) {
			this.mImg_Picture_02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule/Canvas_Second/mImg_Picture_02') as mw.Image
		}
		return this.mImg_Picture_02_Internal
	}
	private mTxt_Describe_02_Internal: mw.TextBlock
	public get mTxt_Describe_02(): mw.TextBlock {
		if(!this.mTxt_Describe_02_Internal&&this.uiWidgetBase) {
			this.mTxt_Describe_02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule/Canvas_Second/mTxt_Describe_02') as mw.TextBlock
		}
		return this.mTxt_Describe_02_Internal
	}
	private mTxt_Title_Internal: mw.TextBlock
	public get mTxt_Title(): mw.TextBlock {
		if(!this.mTxt_Title_Internal&&this.uiWidgetBase) {
			this.mTxt_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_Title') as mw.TextBlock
		}
		return this.mTxt_Title_Internal
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
		
		this.mBtn_PreviousPage.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_PreviousPage");
		})
		this.initLanguage(this.mBtn_PreviousPage);
		
	
		this.mBtn_NextPage.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_NextPage");
		})
		this.initLanguage(this.mBtn_NextPage);
		
	
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	
		this.mBtn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_Page)
		
	
		this.initLanguage(this.mTxt_Describe_01)
		
	
		this.initLanguage(this.mTxt_Describe_02)
		
	
		this.initLanguage(this.mTxt_Title)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Rules/TextBlock_1") as any);
		
	

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
 