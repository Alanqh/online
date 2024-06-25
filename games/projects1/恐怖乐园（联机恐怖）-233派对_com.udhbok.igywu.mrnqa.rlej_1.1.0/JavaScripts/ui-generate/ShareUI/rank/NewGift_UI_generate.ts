
 

 @UIBind('UI/ShareUI/rank/NewGift_UI.ui')
 export default class NewGift_UI_Generate extends UIScript {
	 	private canvas_rankingList_1_Internal: mw.Canvas
	public get canvas_rankingList_1(): mw.Canvas {
		if(!this.canvas_rankingList_1_Internal&&this.uiWidgetBase) {
			this.canvas_rankingList_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1') as mw.Canvas
		}
		return this.canvas_rankingList_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private img_rankIcon_Internal: mw.Image
	public get img_rankIcon(): mw.Image {
		if(!this.img_rankIcon_Internal&&this.uiWidgetBase) {
			this.img_rankIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/img_rankIcon') as mw.Image
		}
		return this.img_rankIcon_Internal
	}
	private canvas_list_Internal: mw.Canvas
	public get canvas_list(): mw.Canvas {
		if(!this.canvas_list_Internal&&this.uiWidgetBase) {
			this.canvas_list_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list') as mw.Canvas
		}
		return this.canvas_list_Internal
	}
	private canva_rankContent_Internal: mw.Canvas
	public get canva_rankContent(): mw.Canvas {
		if(!this.canva_rankContent_Internal&&this.uiWidgetBase) {
			this.canva_rankContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/ScrollBox/canva_rankContent') as mw.Canvas
		}
		return this.canva_rankContent_Internal
	}
	private text_rankNum_Internal: mw.TextBlock
	public get text_rankNum(): mw.TextBlock {
		if(!this.text_rankNum_Internal&&this.uiWidgetBase) {
			this.text_rankNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/text_rankNum') as mw.TextBlock
		}
		return this.text_rankNum_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_data_Internal: mw.TextBlock
	public get text_data(): mw.TextBlock {
		if(!this.text_data_Internal&&this.uiWidgetBase) {
			this.text_data_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/text_data') as mw.TextBlock
		}
		return this.text_data_Internal
	}
	private canvas_myRank_Internal: mw.Canvas
	public get canvas_myRank(): mw.Canvas {
		if(!this.canvas_myRank_Internal&&this.uiWidgetBase) {
			this.canvas_myRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/canvas_myRank') as mw.Canvas
		}
		return this.canvas_myRank_Internal
	}
	private img_rankBg_Internal: mw.Image
	public get img_rankBg(): mw.Image {
		if(!this.img_rankBg_Internal&&this.uiWidgetBase) {
			this.img_rankBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/canvas_myRank/img_rankBg') as mw.Image
		}
		return this.img_rankBg_Internal
	}
	private text_myRankNum_Internal: mw.TextBlock
	public get text_myRankNum(): mw.TextBlock {
		if(!this.text_myRankNum_Internal&&this.uiWidgetBase) {
			this.text_myRankNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/canvas_myRank/text_myRankNum') as mw.TextBlock
		}
		return this.text_myRankNum_Internal
	}
	private text_myData_Internal: mw.TextBlock
	public get text_myData(): mw.TextBlock {
		if(!this.text_myData_Internal&&this.uiWidgetBase) {
			this.text_myData_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/canvas_myRank/text_myData') as mw.TextBlock
		}
		return this.text_myData_Internal
	}
	private text_myName_Internal: mw.TextBlock
	public get text_myName(): mw.TextBlock {
		if(!this.text_myName_Internal&&this.uiWidgetBase) {
			this.text_myName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/canvas_myRank/text_myName') as mw.TextBlock
		}
		return this.text_myName_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList_1/canvas_list/canvas_myRank/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
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
			Event.dispatchToLocal("PlayButtonClick", "NewGift_UI_btn_buyGift");
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
			Event.dispatchToLocal("PlayButtonClick", "NewGift_UI_btn_pocket");
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
			Event.dispatchToLocal("PlayButtonClick", "NewGift_UI_btn_down");
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
			Event.dispatchToLocal("PlayButtonClick", "NewGift_UI_btn_up");
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
			Event.dispatchToLocal("PlayButtonClick", "NewGift_UI_btn_send");
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
			Event.dispatchToLocal("PlayButtonClick", "NewGift_UI_btn_back");
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
		
		this.initLanguage(this.text_title)
		this.text_title.isRichText = true;
		
	
		this.initLanguage(this.text_rankNum)
		this.text_rankNum.isRichText = true;
		
	
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
		this.initLanguage(this.text_data)
		this.text_data.isRichText = true;
		
	
		this.initLanguage(this.text_myRankNum)
		this.text_myRankNum.isRichText = true;
		
	
		this.initLanguage(this.text_myData)
		this.text_myData.isRichText = true;
		
	
		this.initLanguage(this.text_myName)
		this.text_myName.isRichText = true;
		
	
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

UIService['UI_NewGift_UI'] = NewGift_UI_Generate;