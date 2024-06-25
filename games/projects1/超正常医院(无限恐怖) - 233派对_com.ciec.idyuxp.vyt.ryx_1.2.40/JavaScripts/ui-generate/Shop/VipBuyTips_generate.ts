
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/VipBuyTips.ui')
export default class VipBuyTips_Generate extends UIScript {
		private mImage_Bck_Internal: mw.Image
	public get mImage_Bck(): mw.Image {
		if(!this.mImage_Bck_Internal&&this.uiWidgetBase) {
			this.mImage_Bck_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImage_Bck') as mw.Image
		}
		return this.mImage_Bck_Internal
	}
	private mImg_Background_1_Internal: mw.Image
	public get mImg_Background_1(): mw.Image {
		if(!this.mImg_Background_1_Internal&&this.uiWidgetBase) {
			this.mImg_Background_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mImg_Background_1') as mw.Image
		}
		return this.mImg_Background_1_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mText_Vip_Internal: mw.TextBlock
	public get mText_Vip(): mw.TextBlock {
		if(!this.mText_Vip_Internal&&this.uiWidgetBase) {
			this.mText_Vip_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mText_Vip') as mw.TextBlock
		}
		return this.mText_Vip_Internal
	}
	private mYes_btn_Internal: mw.Button
	public get mYes_btn(): mw.Button {
		if(!this.mYes_btn_Internal&&this.uiWidgetBase) {
			this.mYes_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mYes_btn') as mw.Button
		}
		return this.mYes_btn_Internal
	}
	private mText_Konw_Internal: mw.TextBlock
	public get mText_Konw(): mw.TextBlock {
		if(!this.mText_Konw_Internal&&this.uiWidgetBase) {
			this.mText_Konw_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mText_Konw') as mw.TextBlock
		}
		return this.mText_Konw_Internal
	}
	private mText_Gift_Internal: mw.TextBlock
	public get mText_Gift(): mw.TextBlock {
		if(!this.mText_Gift_Internal&&this.uiWidgetBase) {
			this.mText_Gift_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mText_Gift') as mw.TextBlock
		}
		return this.mText_Gift_Internal
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
		
	
		this.mYes_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mYes_btn");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Vip)
		
	
		this.initLanguage(this.mText_Konw)
		
	
		this.initLanguage(this.mText_Gift)
		
	
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
 