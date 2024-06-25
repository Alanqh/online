
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/VIP.ui')
export default class VIP_Generate extends UIScript {
		private mBtn_buy_Internal: mw.Button
	public get mBtn_buy(): mw.Button {
		if(!this.mBtn_buy_Internal&&this.uiWidgetBase) {
			this.mBtn_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_buy') as mw.Button
		}
		return this.mBtn_buy_Internal
	}
	private canvas_TitleIcon_Internal: mw.Canvas
	public get canvas_TitleIcon(): mw.Canvas {
		if(!this.canvas_TitleIcon_Internal&&this.uiWidgetBase) {
			this.canvas_TitleIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Title/canvas_TitleIcon') as mw.Canvas
		}
		return this.canvas_TitleIcon_Internal
	}
	private canvas_RebornIcon_Internal: mw.Canvas
	public get canvas_RebornIcon(): mw.Canvas {
		if(!this.canvas_RebornIcon_Internal&&this.uiWidgetBase) {
			this.canvas_RebornIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Reborn/canvas_RebornIcon') as mw.Canvas
		}
		return this.canvas_RebornIcon_Internal
	}
	private canvas_TransframIcon_Internal: mw.Canvas
	public get canvas_TransframIcon(): mw.Canvas {
		if(!this.canvas_TransframIcon_Internal&&this.uiWidgetBase) {
			this.canvas_TransframIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Transfram/canvas_TransframIcon') as mw.Canvas
		}
		return this.canvas_TransframIcon_Internal
	}
	private mImg_Buy_Internal: mw.Image
	public get mImg_Buy(): mw.Image {
		if(!this.mImg_Buy_Internal&&this.uiWidgetBase) {
			this.mImg_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Buy') as mw.Image
		}
		return this.mImg_Buy_Internal
	}
	private mTxt_State_Internal: mw.TextBlock
	public get mTxt_State(): mw.TextBlock {
		if(!this.mTxt_State_Internal&&this.uiWidgetBase) {
			this.mTxt_State_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_State') as mw.TextBlock
		}
		return this.mTxt_State_Internal
	}
	private mText_tip_Internal: mw.TextBlock
	public get mText_tip(): mw.TextBlock {
		if(!this.mText_tip_Internal&&this.uiWidgetBase) {
			this.mText_tip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_tip') as mw.TextBlock
		}
		return this.mText_tip_Internal
	}
	private mText_Time_Internal: mw.TextBlock
	public get mText_Time(): mw.TextBlock {
		if(!this.mText_Time_Internal&&this.uiWidgetBase) {
			this.mText_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Time') as mw.TextBlock
		}
		return this.mText_Time_Internal
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
		
		this.mBtn_buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_buy");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_State)
		
	
		this.initLanguage(this.mText_tip)
		
	
		this.initLanguage(this.mText_Time)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Title/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Reborn/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Transfram/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mImg_Buy/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mImg_Buy/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_5") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_6") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_7") as any);
		
	

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
 