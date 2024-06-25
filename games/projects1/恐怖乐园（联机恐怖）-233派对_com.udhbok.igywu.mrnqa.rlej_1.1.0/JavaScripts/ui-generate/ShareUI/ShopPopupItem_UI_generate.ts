
 

 @UIBind('UI/ShareUI/ShopPopupItem_UI.ui')
 export default class ShopPopupItem_UI_Generate extends UIScript {
	 	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_item/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_item/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_item/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private mText_ItemNum_Internal: mw.TextBlock
	public get mText_ItemNum(): mw.TextBlock {
		if(!this.mText_ItemNum_Internal&&this.uiWidgetBase) {
			this.mText_ItemNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_item/mText_ItemNum') as mw.TextBlock
		}
		return this.mText_ItemNum_Internal
	}
	private mText_SellOut_Internal: mw.TextBlock
	public get mText_SellOut(): mw.TextBlock {
		if(!this.mText_SellOut_Internal&&this.uiWidgetBase) {
			this.mText_SellOut_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_item/mText_SellOut') as mw.TextBlock
		}
		return this.mText_SellOut_Internal
	}
	private mText_ItemName_Internal: mw.TextBlock
	public get mText_ItemName(): mw.TextBlock {
		if(!this.mText_ItemName_Internal&&this.uiWidgetBase) {
			this.mText_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_ItemName') as mw.TextBlock
		}
		return this.mText_ItemName_Internal
	}
	private mText_ItemDetail_Internal: mw.TextBlock
	public get mText_ItemDetail(): mw.TextBlock {
		if(!this.mText_ItemDetail_Internal&&this.uiWidgetBase) {
			this.mText_ItemDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_ItemDetail') as mw.TextBlock
		}
		return this.mText_ItemDetail_Internal
	}
	private btn_useItem_Internal: mw.Button
	public get btn_useItem(): mw.Button {
		if(!this.btn_useItem_Internal&&this.uiWidgetBase) {
			this.btn_useItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btn_useItem') as mw.Button
		}
		return this.btn_useItem_Internal
	}
	private mCanvas_Buy_Internal: mw.Canvas
	public get mCanvas_Buy(): mw.Canvas {
		if(!this.mCanvas_Buy_Internal&&this.uiWidgetBase) {
			this.mCanvas_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btn_useItem/mCanvas_Buy') as mw.Canvas
		}
		return this.mCanvas_Buy_Internal
	}
	private mImg_CurrencyIcon_Internal: mw.Image
	public get mImg_CurrencyIcon(): mw.Image {
		if(!this.mImg_CurrencyIcon_Internal&&this.uiWidgetBase) {
			this.mImg_CurrencyIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btn_useItem/mCanvas_Buy/mImg_CurrencyIcon') as mw.Image
		}
		return this.mImg_CurrencyIcon_Internal
	}
	private mText_Prize_Internal: mw.TextBlock
	public get mText_Prize(): mw.TextBlock {
		if(!this.mText_Prize_Internal&&this.uiWidgetBase) {
			this.mText_Prize_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btn_useItem/mCanvas_Buy/mText_Prize') as mw.TextBlock
		}
		return this.mText_Prize_Internal
	}
	private mText_ItemDetail_1_Internal: mw.TextBlock
	public get mText_ItemDetail_1(): mw.TextBlock {
		if(!this.mText_ItemDetail_1_Internal&&this.uiWidgetBase) {
			this.mText_ItemDetail_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_ItemDetail_1') as mw.TextBlock
		}
		return this.mText_ItemDetail_1_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		

		//按钮添加点击
		
		this.btn_useItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopPopupItem_UI_btn_useItem");
		})
		this.btn_useItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_useItem.onPressed.add(() => {
			this.btn_useItem["preScale"] = this.btn_useItem.renderScale;
			this.btn_useItem.renderScale = Vector2.one.set(this.btn_useItem["preScale"]).multiply(1.1);
		})
		this.btn_useItem.onReleased.add(() => {
			this.btn_useItem.renderScale = this.btn_useItem["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mText_ItemNum)
		this.mText_ItemNum.isRichText = true;
		
	
		this.initLanguage(this.mText_SellOut)
		this.mText_SellOut.isRichText = true;
		
	
		this.initLanguage(this.mText_ItemName)
		this.mText_ItemName.isRichText = true;
		
	
		this.initLanguage(this.mText_ItemDetail)
		this.mText_ItemDetail.isRichText = true;
		
	
		this.initLanguage(this.mText_Prize)
		this.mText_Prize.isRichText = true;
		
	
		this.initLanguage(this.mText_ItemDetail_1)
		this.mText_ItemDetail_1.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ShopPopupItem_UI'] = ShopPopupItem_UI_Generate;