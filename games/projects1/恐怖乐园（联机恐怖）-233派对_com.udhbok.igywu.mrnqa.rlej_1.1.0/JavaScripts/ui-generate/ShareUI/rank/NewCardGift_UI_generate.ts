
 

 @UIBind('UI/ShareUI/rank/NewCardGift_UI.ui')
 export default class NewCardGift_UI_Generate extends UIScript {
	 	private canvas_gift_Internal: mw.Canvas
	public get canvas_gift(): mw.Canvas {
		if(!this.canvas_gift_Internal&&this.uiWidgetBase) {
			this.canvas_gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift') as mw.Canvas
		}
		return this.canvas_gift_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private btn_buyGift_Internal: mw.Button
	public get btn_buyGift(): mw.Button {
		if(!this.btn_buyGift_Internal&&this.uiWidgetBase) {
			this.btn_buyGift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/btn_buyGift') as mw.Button
		}
		return this.btn_buyGift_Internal
	}
	private text_buyGift_Internal: mw.TextBlock
	public get text_buyGift(): mw.TextBlock {
		if(!this.text_buyGift_Internal&&this.uiWidgetBase) {
			this.text_buyGift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/text_buyGift') as mw.TextBlock
		}
		return this.text_buyGift_Internal
	}
	private btn_pocket_Internal: mw.Button
	public get btn_pocket(): mw.Button {
		if(!this.btn_pocket_Internal&&this.uiWidgetBase) {
			this.btn_pocket_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/btn_pocket') as mw.Button
		}
		return this.btn_pocket_Internal
	}
	private text_pocket_Internal: mw.TextBlock
	public get text_pocket(): mw.TextBlock {
		if(!this.text_pocket_Internal&&this.uiWidgetBase) {
			this.text_pocket_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/text_pocket') as mw.TextBlock
		}
		return this.text_pocket_Internal
	}
	private img_listBg_Internal: mw.Image
	public get img_listBg(): mw.Image {
		if(!this.img_listBg_Internal&&this.uiWidgetBase) {
			this.img_listBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/img_listBg') as mw.Image
		}
		return this.img_listBg_Internal
	}
	private canvas_giftList_Internal: mw.Canvas
	public get canvas_giftList(): mw.Canvas {
		if(!this.canvas_giftList_Internal&&this.uiWidgetBase) {
			this.canvas_giftList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/ScrollBox_1/canvas_giftList') as mw.Canvas
		}
		return this.canvas_giftList_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
	}
	private img_buyNum_Internal: mw.Image
	public get img_buyNum(): mw.Image {
		if(!this.img_buyNum_Internal&&this.uiWidgetBase) {
			this.img_buyNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/img_buyNum') as mw.Image
		}
		return this.img_buyNum_Internal
	}
	private btn_down_Internal: mw.Button
	public get btn_down(): mw.Button {
		if(!this.btn_down_Internal&&this.uiWidgetBase) {
			this.btn_down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/btn_down') as mw.Button
		}
		return this.btn_down_Internal
	}
	private text_buyNum_Internal: mw.TextBlock
	public get text_buyNum(): mw.TextBlock {
		if(!this.text_buyNum_Internal&&this.uiWidgetBase) {
			this.text_buyNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/text_buyNum') as mw.TextBlock
		}
		return this.text_buyNum_Internal
	}
	private btn_up_Internal: mw.Button
	public get btn_up(): mw.Button {
		if(!this.btn_up_Internal&&this.uiWidgetBase) {
			this.btn_up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/btn_up') as mw.Button
		}
		return this.btn_up_Internal
	}
	private btn_send_Internal: mw.Button
	public get btn_send(): mw.Button {
		if(!this.btn_send_Internal&&this.uiWidgetBase) {
			this.btn_send_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/btn_send') as mw.Button
		}
		return this.btn_send_Internal
	}
	private img_money_Internal: mw.Image
	public get img_money(): mw.Image {
		if(!this.img_money_Internal&&this.uiWidgetBase) {
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/img_money') as mw.Image
		}
		return this.img_money_Internal
	}
	private text_moneyNum_Internal: mw.TextBlock
	public get text_moneyNum(): mw.TextBlock {
		if(!this.text_moneyNum_Internal&&this.uiWidgetBase) {
			this.text_moneyNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/text_moneyNum') as mw.TextBlock
		}
		return this.text_moneyNum_Internal
	}
	private text_send_Internal: mw.TextBlock
	public get text_send(): mw.TextBlock {
		if(!this.text_send_Internal&&this.uiWidgetBase) {
			this.text_send_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/text_send') as mw.TextBlock
		}
		return this.text_send_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_gift/btn_back') as mw.Button
		}
		return this.btn_back_Internal
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
		
		this.btn_buyGift.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NewCardGift_UI_btn_buyGift");
		})
		this.btn_buyGift.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_buyGift.onPressed.add(() => {
			this.btn_buyGift["preScale"] = this.btn_buyGift.renderScale;
			this.btn_buyGift.renderScale = Vector2.one.set(this.btn_buyGift["preScale"]).multiply(1.1);
		})
		this.btn_buyGift.onReleased.add(() => {
			this.btn_buyGift.renderScale = this.btn_buyGift["preScale"];
		})
		
	
		this.btn_pocket.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NewCardGift_UI_btn_pocket");
		})
		this.btn_pocket.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pocket.onPressed.add(() => {
			this.btn_pocket["preScale"] = this.btn_pocket.renderScale;
			this.btn_pocket.renderScale = Vector2.one.set(this.btn_pocket["preScale"]).multiply(1.1);
		})
		this.btn_pocket.onReleased.add(() => {
			this.btn_pocket.renderScale = this.btn_pocket["preScale"];
		})
		
	
		this.btn_down.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NewCardGift_UI_btn_down");
		})
		this.btn_down.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_down.onPressed.add(() => {
			this.btn_down["preScale"] = this.btn_down.renderScale;
			this.btn_down.renderScale = Vector2.one.set(this.btn_down["preScale"]).multiply(1.1);
		})
		this.btn_down.onReleased.add(() => {
			this.btn_down.renderScale = this.btn_down["preScale"];
		})
		
	
		this.btn_up.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NewCardGift_UI_btn_up");
		})
		this.btn_up.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_up.onPressed.add(() => {
			this.btn_up["preScale"] = this.btn_up.renderScale;
			this.btn_up.renderScale = Vector2.one.set(this.btn_up["preScale"]).multiply(1.1);
		})
		this.btn_up.onReleased.add(() => {
			this.btn_up.renderScale = this.btn_up["preScale"];
		})
		
	
		this.btn_send.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NewCardGift_UI_btn_send");
		})
		this.btn_send.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_send.onPressed.add(() => {
			this.btn_send["preScale"] = this.btn_send.renderScale;
			this.btn_send.renderScale = Vector2.one.set(this.btn_send["preScale"]).multiply(1.1);
		})
		this.btn_send.onReleased.add(() => {
			this.btn_send.renderScale = this.btn_send["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NewCardGift_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_buyGift)
		this.text_buyGift.isRichText = true;
		
	
		this.initLanguage(this.text_pocket)
		this.text_pocket.isRichText = true;
		
	
		this.initLanguage(this.text_tips)
		this.text_tips.isRichText = true;
		
	
		this.initLanguage(this.text_buyNum)
		this.text_buyNum.isRichText = true;
		
	
		this.initLanguage(this.text_moneyNum)
		this.text_moneyNum.isRichText = true;
		
	
		this.initLanguage(this.text_send)
		this.text_send.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_NewCardGift_UI'] = NewCardGift_UI_Generate;