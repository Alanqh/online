
 

 @UIBind('UI/ShareUI/shop/ShopItem_UI.ui')
 export default class ShopItem_UI_Generate extends UIScript {
	 	private canvas_shopitem_Internal: mw.Canvas
	public get canvas_shopitem(): mw.Canvas {
		if(!this.canvas_shopitem_Internal&&this.uiWidgetBase) {
			this.canvas_shopitem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem') as mw.Canvas
		}
		return this.canvas_shopitem_Internal
	}
	private img_black_Internal: mw.Image
	public get img_black(): mw.Image {
		if(!this.img_black_Internal&&this.uiWidgetBase) {
			this.img_black_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/img_black') as mw.Image
		}
		return this.img_black_Internal
	}
	private bg2_Internal: mw.Image
	public get bg2(): mw.Image {
		if(!this.bg2_Internal&&this.uiWidgetBase) {
			this.bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/bg2') as mw.Image
		}
		return this.bg2_Internal
	}
	private btn_itempick_Internal: mw.Button
	public get btn_itempick(): mw.Button {
		if(!this.btn_itempick_Internal&&this.uiWidgetBase) {
			this.btn_itempick_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/btn_itempick') as mw.Button
		}
		return this.btn_itempick_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private canvas_price_Internal: mw.Canvas
	public get canvas_price(): mw.Canvas {
		if(!this.canvas_price_Internal&&this.uiWidgetBase) {
			this.canvas_price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_price') as mw.Canvas
		}
		return this.canvas_price_Internal
	}
	private img_currencyicon_Internal: mw.Image
	public get img_currencyicon(): mw.Image {
		if(!this.img_currencyicon_Internal&&this.uiWidgetBase) {
			this.img_currencyicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_price/img_currencyicon') as mw.Image
		}
		return this.img_currencyicon_Internal
	}
	private text_price_Internal: mw.TextBlock
	public get text_price(): mw.TextBlock {
		if(!this.text_price_Internal&&this.uiWidgetBase) {
			this.text_price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_price/text_price') as mw.TextBlock
		}
		return this.text_price_Internal
	}
	private img_itemicon_Internal: mw.Image
	public get img_itemicon(): mw.Image {
		if(!this.img_itemicon_Internal&&this.uiWidgetBase) {
			this.img_itemicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/img_itemicon') as mw.Image
		}
		return this.img_itemicon_Internal
	}
	private text_itemname_Internal: mw.TextBlock
	public get text_itemname(): mw.TextBlock {
		if(!this.text_itemname_Internal&&this.uiWidgetBase) {
			this.text_itemname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/text_itemname') as mw.TextBlock
		}
		return this.text_itemname_Internal
	}
	private canvas_ultracoin_Internal: mw.Canvas
	public get canvas_ultracoin(): mw.Canvas {
		if(!this.canvas_ultracoin_Internal&&this.uiWidgetBase) {
			this.canvas_ultracoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_ultracoin') as mw.Canvas
		}
		return this.canvas_ultracoin_Internal
	}
	private img_normal_Internal: mw.Image
	public get img_normal(): mw.Image {
		if(!this.img_normal_Internal&&this.uiWidgetBase) {
			this.img_normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_ultracoin/img_normal') as mw.Image
		}
		return this.img_normal_Internal
	}
	private txt_normal_Internal: mw.TextBlock
	public get txt_normal(): mw.TextBlock {
		if(!this.txt_normal_Internal&&this.uiWidgetBase) {
			this.txt_normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_ultracoin/img_normal/txt_normal') as mw.TextBlock
		}
		return this.txt_normal_Internal
	}
	private img_firstbuy_Internal: mw.Image
	public get img_firstbuy(): mw.Image {
		if(!this.img_firstbuy_Internal&&this.uiWidgetBase) {
			this.img_firstbuy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_ultracoin/img_firstbuy') as mw.Image
		}
		return this.img_firstbuy_Internal
	}
	private txt_firstbuy_Internal: mw.TextBlock
	public get txt_firstbuy(): mw.TextBlock {
		if(!this.txt_firstbuy_Internal&&this.uiWidgetBase) {
			this.txt_firstbuy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_shopitem/canvas_ultracoin/img_firstbuy/txt_firstbuy') as mw.TextBlock
		}
		return this.txt_firstbuy_Internal
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
		
		this.btn_itempick.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ShopItem_UI_btn_itempick");
		})
		this.btn_itempick.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_itempick.onPressed.add(() => {
			this.btn_itempick["preScale"] = this.btn_itempick.renderScale;
			this.btn_itempick.renderScale = Vector2.one.set(this.btn_itempick["preScale"]).multiply(1.1);
		})
		this.btn_itempick.onReleased.add(() => {
			this.btn_itempick.renderScale = this.btn_itempick["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_price)
		this.text_price.isRichText = true;
		
	
		this.initLanguage(this.text_itemname)
		this.text_itemname.isRichText = true;
		
	
		this.initLanguage(this.txt_normal)
		this.txt_normal.isRichText = true;
		
	
		this.initLanguage(this.txt_firstbuy)
		this.txt_firstbuy.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ShopItem_UI'] = ShopItem_UI_Generate;