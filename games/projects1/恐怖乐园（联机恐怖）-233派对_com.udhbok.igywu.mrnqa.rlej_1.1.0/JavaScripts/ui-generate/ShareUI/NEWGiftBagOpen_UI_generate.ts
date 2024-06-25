
 

 @UIBind('UI/ShareUI/NEWGiftBagOpen_UI.ui')
 export default class NEWGiftBagOpen_UI_Generate extends UIScript {
	 	private canvas_giftBag_Internal: mw.Canvas
	public get canvas_giftBag(): mw.Canvas {
		if(!this.canvas_giftBag_Internal&&this.uiWidgetBase) {
			this.canvas_giftBag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag') as mw.Canvas
		}
		return this.canvas_giftBag_Internal
	}
	private img_bg_2_Internal: mw.Image
	public get img_bg_2(): mw.Image {
		if(!this.img_bg_2_Internal&&this.uiWidgetBase) {
			this.img_bg_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_bg_2') as mw.Image
		}
		return this.img_bg_2_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private btn_open_Internal: mw.Button
	public get btn_open(): mw.Button {
		if(!this.btn_open_Internal&&this.uiWidgetBase) {
			this.btn_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_open') as mw.Button
		}
		return this.btn_open_Internal
	}
	private text_open_Internal: mw.TextBlock
	public get text_open(): mw.TextBlock {
		if(!this.text_open_Internal&&this.uiWidgetBase) {
			this.text_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/btn_open/text_open') as mw.TextBlock
		}
		return this.text_open_Internal
	}
	private img_br_1_Internal: mw.Image
	public get img_br_1(): mw.Image {
		if(!this.img_br_1_Internal&&this.uiWidgetBase) {
			this.img_br_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/img_br_1') as mw.Image
		}
		return this.img_br_1_Internal
	}
	private text_title_1_Internal: mw.TextBlock
	public get text_title_1(): mw.TextBlock {
		if(!this.text_title_1_Internal&&this.uiWidgetBase) {
			this.text_title_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_title_1') as mw.TextBlock
		}
		return this.text_title_1_Internal
	}
	private canvas_giftList_Internal: mw.Canvas
	public get canvas_giftList(): mw.Canvas {
		if(!this.canvas_giftList_Internal&&this.uiWidgetBase) {
			this.canvas_giftList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/ScrollBox/canvas_giftList') as mw.Canvas
		}
		return this.canvas_giftList_Internal
	}
	private canvas_numberChange_Internal: mw.Canvas
	public get canvas_numberChange(): mw.Canvas {
		if(!this.canvas_numberChange_Internal&&this.uiWidgetBase) {
			this.canvas_numberChange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_numberChange') as mw.Canvas
		}
		return this.canvas_numberChange_Internal
	}
	private btn_minus_Internal: mw.Button
	public get btn_minus(): mw.Button {
		if(!this.btn_minus_Internal&&this.uiWidgetBase) {
			this.btn_minus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_numberChange/btn_minus') as mw.Button
		}
		return this.btn_minus_Internal
	}
	private btn_add_Internal: mw.Button
	public get btn_add(): mw.Button {
		if(!this.btn_add_Internal&&this.uiWidgetBase) {
			this.btn_add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_numberChange/btn_add') as mw.Button
		}
		return this.btn_add_Internal
	}
	private pro_numberChange_Internal: mw.ProgressBar
	public get pro_numberChange(): mw.ProgressBar {
		if(!this.pro_numberChange_Internal&&this.uiWidgetBase) {
			this.pro_numberChange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/canvas_numberChange/pro_numberChange') as mw.ProgressBar
		}
		return this.pro_numberChange_Internal
	}
	private text_openCount_Internal: mw.TextBlock
	public get text_openCount(): mw.TextBlock {
		if(!this.text_openCount_Internal&&this.uiWidgetBase) {
			this.text_openCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftBag/text_openCount') as mw.TextBlock
		}
		return this.text_openCount_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NEWGiftBagOpen_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_open.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NEWGiftBagOpen_UI_btn_open");
		})
		this.btn_open.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_open.onPressed.add(() => {
			this.btn_open["preScale"] = this.btn_open.renderScale;
			this.btn_open.renderScale = Vector2.one.set(this.btn_open["preScale"]).multiply(1.1);
		})
		this.btn_open.onReleased.add(() => {
			this.btn_open.renderScale = this.btn_open["preScale"];
		})
		
	
		this.btn_minus.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NEWGiftBagOpen_UI_btn_minus");
		})
		this.btn_minus.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_minus.onPressed.add(() => {
			this.btn_minus["preScale"] = this.btn_minus.renderScale;
			this.btn_minus.renderScale = Vector2.one.set(this.btn_minus["preScale"]).multiply(1.1);
		})
		this.btn_minus.onReleased.add(() => {
			this.btn_minus.renderScale = this.btn_minus["preScale"];
		})
		
	
		this.btn_add.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NEWGiftBagOpen_UI_btn_add");
		})
		this.btn_add.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_add.onPressed.add(() => {
			this.btn_add["preScale"] = this.btn_add.renderScale;
			this.btn_add.renderScale = Vector2.one.set(this.btn_add["preScale"]).multiply(1.1);
		})
		this.btn_add.onReleased.add(() => {
			this.btn_add.renderScale = this.btn_add["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_title)
		this.text_title.isRichText = true;
		
	
		this.initLanguage(this.text_open)
		this.text_open.isRichText = true;
		
	
		this.initLanguage(this.text_title_1)
		this.text_title_1.isRichText = true;
		
	
		this.initLanguage(this.text_openCount)
		this.text_openCount.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_NEWGiftBagOpen_UI'] = NEWGiftBagOpen_UI_Generate;