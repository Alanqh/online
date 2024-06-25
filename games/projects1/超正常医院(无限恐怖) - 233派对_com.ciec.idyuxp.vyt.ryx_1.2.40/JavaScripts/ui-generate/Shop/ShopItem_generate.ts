
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/ShopItem.ui')
export default class ShopItem_Generate extends UIScript {
		private mButton_Pay_Internal: mw.Button
	public get mButton_Pay(): mw.Button {
		if(!this.mButton_Pay_Internal&&this.uiWidgetBase) {
			this.mButton_Pay_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Pay') as mw.Button
		}
		return this.mButton_Pay_Internal
	}
	private mText_Price_Internal: mw.TextBlock
	public get mText_Price(): mw.TextBlock {
		if(!this.mText_Price_Internal&&this.uiWidgetBase) {
			this.mText_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Pay/mText_Price') as mw.TextBlock
		}
		return this.mText_Price_Internal
	}
	private mImage_Shop_Internal: mw.Image
	public get mImage_Shop(): mw.Image {
		if(!this.mImage_Shop_Internal&&this.uiWidgetBase) {
			this.mImage_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Pay/mImage_Shop') as mw.Image
		}
		return this.mImage_Shop_Internal
	}
	private mImage_Money_Internal: mw.Image
	public get mImage_Money(): mw.Image {
		if(!this.mImage_Money_Internal&&this.uiWidgetBase) {
			this.mImage_Money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Pay/mImage_Money') as mw.Image
		}
		return this.mImage_Money_Internal
	}
	private mImage_Discount_Internal: mw.Image
	public get mImage_Discount(): mw.Image {
		if(!this.mImage_Discount_Internal&&this.uiWidgetBase) {
			this.mImage_Discount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Pay/mImage_Discount') as mw.Image
		}
		return this.mImage_Discount_Internal
	}
	private mText_Discount_Internal: mw.TextBlock
	public get mText_Discount(): mw.TextBlock {
		if(!this.mText_Discount_Internal&&this.uiWidgetBase) {
			this.mText_Discount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Pay/mText_Discount') as mw.TextBlock
		}
		return this.mText_Discount_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mImage_black1_Internal: mw.Image
	public get mImage_black1(): mw.Image {
		if(!this.mImage_black1_Internal&&this.uiWidgetBase) {
			this.mImage_black1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_black1') as mw.Image
		}
		return this.mImage_black1_Internal
	}
	private mText_BuyNumber_Internal: mw.TextBlock
	public get mText_BuyNumber(): mw.TextBlock {
		if(!this.mText_BuyNumber_Internal&&this.uiWidgetBase) {
			this.mText_BuyNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_BuyNumber') as mw.TextBlock
		}
		return this.mText_BuyNumber_Internal
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
		
		this.mButton_Pay.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Pay");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Price)
		
	
		this.initLanguage(this.mText_Discount)
		
	
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_BuyNumber)
		
	
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
 