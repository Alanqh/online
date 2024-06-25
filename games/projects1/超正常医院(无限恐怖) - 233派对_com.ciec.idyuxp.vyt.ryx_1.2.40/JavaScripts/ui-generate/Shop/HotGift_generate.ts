
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/HotGift.ui')
export default class HotGift_Generate extends UIScript {
		private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Price_Internal: mw.TextBlock
	public get mText_Price(): mw.TextBlock {
		if(!this.mText_Price_Internal&&this.uiWidgetBase) {
			this.mText_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Price') as mw.TextBlock
		}
		return this.mText_Price_Internal
	}
	private mImage_Money_Internal: mw.Image
	public get mImage_Money(): mw.Image {
		if(!this.mImage_Money_Internal&&this.uiWidgetBase) {
			this.mImage_Money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Money') as mw.Image
		}
		return this.mImage_Money_Internal
	}
	private mImage_Discount_Internal: mw.Image
	public get mImage_Discount(): mw.Image {
		if(!this.mImage_Discount_Internal&&this.uiWidgetBase) {
			this.mImage_Discount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Discount') as mw.Image
		}
		return this.mImage_Discount_Internal
	}
	private mText_Discount_Internal: mw.TextBlock
	public get mText_Discount(): mw.TextBlock {
		if(!this.mText_Discount_Internal&&this.uiWidgetBase) {
			this.mText_Discount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Discount') as mw.TextBlock
		}
		return this.mText_Discount_Internal
	}
	private mButton_Pay_Internal: mw.Button
	public get mButton_Pay(): mw.Button {
		if(!this.mButton_Pay_Internal&&this.uiWidgetBase) {
			this.mButton_Pay_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Pay') as mw.Button
		}
		return this.mButton_Pay_Internal
	}
	private mScrollBox_Item_Internal: mw.ScrollBox
	public get mScrollBox_Item(): mw.ScrollBox {
		if(!this.mScrollBox_Item_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Item') as mw.ScrollBox
		}
		return this.mScrollBox_Item_Internal
	}
	private mCanvas_Item_Internal: mw.Canvas
	public get mCanvas_Item(): mw.Canvas {
		if(!this.mCanvas_Item_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Item/mCanvas_Item') as mw.Canvas
		}
		return this.mCanvas_Item_Internal
	}
	private mImage_Black_Internal: mw.Image
	public get mImage_Black(): mw.Image {
		if(!this.mImage_Black_Internal&&this.uiWidgetBase) {
			this.mImage_Black_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Black') as mw.Image
		}
		return this.mImage_Black_Internal
	}
	private mText_Times_Internal: mw.TextBlock
	public get mText_Times(): mw.TextBlock {
		if(!this.mText_Times_Internal&&this.uiWidgetBase) {
			this.mText_Times_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Times') as mw.TextBlock
		}
		return this.mText_Times_Internal
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
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Price)
		
	
		this.initLanguage(this.mText_Discount)
		
	
		this.initLanguage(this.mText_Times)
		
	
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
 