
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/ShopMain.ui')
export default class ShopMain_Generate extends UIScript {
		private mCanvas_Vip_Internal: mw.Canvas
	public get mCanvas_Vip(): mw.Canvas {
		if(!this.mCanvas_Vip_Internal&&this.uiWidgetBase) {
			this.mCanvas_Vip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Vip') as mw.Canvas
		}
		return this.mCanvas_Vip_Internal
	}
	private mCanvas_Porp_Internal: mw.Canvas
	public get mCanvas_Porp(): mw.Canvas {
		if(!this.mCanvas_Porp_Internal&&this.uiWidgetBase) {
			this.mCanvas_Porp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Porp') as mw.Canvas
		}
		return this.mCanvas_Porp_Internal
	}
	private mCanvas_Charge_Internal: mw.Canvas
	public get mCanvas_Charge(): mw.Canvas {
		if(!this.mCanvas_Charge_Internal&&this.uiWidgetBase) {
			this.mCanvas_Charge_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Charge') as mw.Canvas
		}
		return this.mCanvas_Charge_Internal
	}
	private mCanvas_Gift_Internal: mw.Canvas
	public get mCanvas_Gift(): mw.Canvas {
		if(!this.mCanvas_Gift_Internal&&this.uiWidgetBase) {
			this.mCanvas_Gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gift') as mw.Canvas
		}
		return this.mCanvas_Gift_Internal
	}
	private mCanvas_Supply_Internal: mw.Canvas
	public get mCanvas_Supply(): mw.Canvas {
		if(!this.mCanvas_Supply_Internal&&this.uiWidgetBase) {
			this.mCanvas_Supply_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Supply') as mw.Canvas
		}
		return this.mCanvas_Supply_Internal
	}
	private mCanvas_Pendant_Internal: mw.Canvas
	public get mCanvas_Pendant(): mw.Canvas {
		if(!this.mCanvas_Pendant_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pendant_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pendant') as mw.Canvas
		}
		return this.mCanvas_Pendant_Internal
	}
	private mCanvas_Recharge_Internal: mw.Canvas
	public get mCanvas_Recharge(): mw.Canvas {
		if(!this.mCanvas_Recharge_Internal&&this.uiWidgetBase) {
			this.mCanvas_Recharge_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Recharge') as mw.Canvas
		}
		return this.mCanvas_Recharge_Internal
	}
	private mImg_Tab1_Internal: mw.Image
	public get mImg_Tab1(): mw.Image {
		if(!this.mImg_Tab1_Internal&&this.uiWidgetBase) {
			this.mImg_Tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Tab1') as mw.Image
		}
		return this.mImg_Tab1_Internal
	}
	private mImg_Tab2_Internal: mw.Image
	public get mImg_Tab2(): mw.Image {
		if(!this.mImg_Tab2_Internal&&this.uiWidgetBase) {
			this.mImg_Tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Tab2') as mw.Image
		}
		return this.mImg_Tab2_Internal
	}
	private mImg_Tab3_Internal: mw.Image
	public get mImg_Tab3(): mw.Image {
		if(!this.mImg_Tab3_Internal&&this.uiWidgetBase) {
			this.mImg_Tab3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Tab3') as mw.Image
		}
		return this.mImg_Tab3_Internal
	}
	private mImg_Tab4_Internal: mw.Image
	public get mImg_Tab4(): mw.Image {
		if(!this.mImg_Tab4_Internal&&this.uiWidgetBase) {
			this.mImg_Tab4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Tab4') as mw.Image
		}
		return this.mImg_Tab4_Internal
	}
	private mScrollBox_ShopTab_Internal: mw.ScrollBox
	public get mScrollBox_ShopTab(): mw.ScrollBox {
		if(!this.mScrollBox_ShopTab_Internal&&this.uiWidgetBase) {
			this.mScrollBox_ShopTab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_ShopTab') as mw.ScrollBox
		}
		return this.mScrollBox_ShopTab_Internal
	}
	private mCanvas_Tab_Internal: mw.Canvas
	public get mCanvas_Tab(): mw.Canvas {
		if(!this.mCanvas_Tab_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_ShopTab/mCanvas_Tab') as mw.Canvas
		}
		return this.mCanvas_Tab_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mText_HotName_Internal: mw.TextBlock
	public get mText_HotName(): mw.TextBlock {
		if(!this.mText_HotName_Internal&&this.uiWidgetBase) {
			this.mText_HotName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_HotName') as mw.TextBlock
		}
		return this.mText_HotName_Internal
	}
	private mCanvas_MyGold_Internal: mw.Canvas
	public get mCanvas_MyGold(): mw.Canvas {
		if(!this.mCanvas_MyGold_Internal&&this.uiWidgetBase) {
			this.mCanvas_MyGold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MyGold') as mw.Canvas
		}
		return this.mCanvas_MyGold_Internal
	}
	private mCanvas_MyAbCoin_Internal: mw.Canvas
	public get mCanvas_MyAbCoin(): mw.Canvas {
		if(!this.mCanvas_MyAbCoin_Internal&&this.uiWidgetBase) {
			this.mCanvas_MyAbCoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MyAbCoin') as mw.Canvas
		}
		return this.mCanvas_MyAbCoin_Internal
	}
	private mText_ShopName_Internal: mw.TextBlock
	public get mText_ShopName(): mw.TextBlock {
		if(!this.mText_ShopName_Internal&&this.uiWidgetBase) {
			this.mText_ShopName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_ShopName') as mw.TextBlock
		}
		return this.mText_ShopName_Internal
	}
	private mCanvas_MyBioCoin_Internal: mw.Canvas
	public get mCanvas_MyBioCoin(): mw.Canvas {
		if(!this.mCanvas_MyBioCoin_Internal&&this.uiWidgetBase) {
			this.mCanvas_MyBioCoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MyBioCoin') as mw.Canvas
		}
		return this.mCanvas_MyBioCoin_Internal
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
		
		this.initLanguage(this.mText_HotName)
		
	
		this.initLanguage(this.mText_ShopName)
		
	
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
 