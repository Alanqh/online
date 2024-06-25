
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/ScreenShow/Panel.ui')
export default class Panel_Generate extends UIScript {
		private mBtn_Transfer_Internal: mw.Button
	public get mBtn_Transfer(): mw.Button {
		if(!this.mBtn_Transfer_Internal&&this.uiWidgetBase) {
			this.mBtn_Transfer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Transfer') as mw.Button
		}
		return this.mBtn_Transfer_Internal
	}
	private mImg_BG_Internal: mw.Image
	public get mImg_BG(): mw.Image {
		if(!this.mImg_BG_Internal&&this.uiWidgetBase) {
			this.mImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mImg_BG') as mw.Image
		}
		return this.mImg_BG_Internal
	}
	private mImg_Picturebg_Internal: mw.Image
	public get mImg_Picturebg(): mw.Image {
		if(!this.mImg_Picturebg_Internal&&this.uiWidgetBase) {
			this.mImg_Picturebg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mImg_Picturebg') as mw.Image
		}
		return this.mImg_Picturebg_Internal
	}
	private mImg_Picture_Internal: mw.Image
	public get mImg_Picture(): mw.Image {
		if(!this.mImg_Picture_Internal&&this.uiWidgetBase) {
			this.mImg_Picture_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mImg_Picture') as mw.Image
		}
		return this.mImg_Picture_Internal
	}
	private mImg_Title_Internal: mw.Image
	public get mImg_Title(): mw.Image {
		if(!this.mImg_Title_Internal&&this.uiWidgetBase) {
			this.mImg_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mImg_Title') as mw.Image
		}
		return this.mImg_Title_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_Item_Internal: mw.Canvas
	public get mCanvas_Item(): mw.Canvas {
		if(!this.mCanvas_Item_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mCanvas_Item') as mw.Canvas
		}
		return this.mCanvas_Item_Internal
	}
	private mTxt_Describe_Internal: mw.TextBlock
	public get mTxt_Describe(): mw.TextBlock {
		if(!this.mTxt_Describe_Internal&&this.uiWidgetBase) {
			this.mTxt_Describe_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mTxt_Describe') as mw.TextBlock
		}
		return this.mTxt_Describe_Internal
	}
	private mTxt_Time_Internal: mw.TextBlock
	public get mTxt_Time(): mw.TextBlock {
		if(!this.mTxt_Time_Internal&&this.uiWidgetBase) {
			this.mTxt_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mTxt_Time') as mw.TextBlock
		}
		return this.mTxt_Time_Internal
	}
	private mCanvas_Hint_Internal: mw.Canvas
	public get mCanvas_Hint(): mw.Canvas {
		if(!this.mCanvas_Hint_Internal&&this.uiWidgetBase) {
			this.mCanvas_Hint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mCanvas_Hint') as mw.Canvas
		}
		return this.mCanvas_Hint_Internal
	}
	private mBtn_Select_Internal: mw.Button
	public get mBtn_Select(): mw.Button {
		if(!this.mBtn_Select_Internal&&this.uiWidgetBase) {
			this.mBtn_Select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mCanvas_Hint/mBtn_Select') as mw.Button
		}
		return this.mBtn_Select_Internal
	}
	private mImg_Select_Internal: mw.Image
	public get mImg_Select(): mw.Image {
		if(!this.mImg_Select_Internal&&this.uiWidgetBase) {
			this.mImg_Select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MCanvas_Panel/mCanvas_Hint/mImg_Select') as mw.Image
		}
		return this.mImg_Select_Internal
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
		
		this.mBtn_Transfer.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Transfer");
		})
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	
		this.mBtn_Select.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Select");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_Describe)
		
	
		this.initLanguage(this.mTxt_Time)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/MCanvas_Panel/mCanvas_Hint/TextBlock") as any);
		
	

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
 