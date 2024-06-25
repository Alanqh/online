
 

 @UIBind('UI/ShareUI/unlock/Unlock_UI.ui')
 export default class Unlock_UI_Generate extends UIScript {
	 	private canvas_unlock_Internal: mw.Canvas
	public get canvas_unlock(): mw.Canvas {
		if(!this.canvas_unlock_Internal&&this.uiWidgetBase) {
			this.canvas_unlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock') as mw.Canvas
		}
		return this.canvas_unlock_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg1_1_Internal: mw.Image
	public get img_bg1_1(): mw.Image {
		if(!this.img_bg1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/img_bg1_1') as mw.Image
		}
		return this.img_bg1_1_Internal
	}
	private img_bg1_2_Internal: mw.Image
	public get img_bg1_2(): mw.Image {
		if(!this.img_bg1_2_Internal&&this.uiWidgetBase) {
			this.img_bg1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/img_bg1_2') as mw.Image
		}
		return this.img_bg1_2_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_item/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_item/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_item/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_desc_Internal: mw.TextBlock
	public get text_desc(): mw.TextBlock {
		if(!this.text_desc_Internal&&this.uiWidgetBase) {
			this.text_desc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/text_desc') as mw.TextBlock
		}
		return this.text_desc_Internal
	}
	private canvas_data_Internal: mw.Canvas
	public get canvas_data(): mw.Canvas {
		if(!this.canvas_data_Internal&&this.uiWidgetBase) {
			this.canvas_data_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data') as mw.Canvas
		}
		return this.canvas_data_Internal
	}
	private text_data1_Internal: mw.TextBlock
	public get text_data1(): mw.TextBlock {
		if(!this.text_data1_Internal&&this.uiWidgetBase) {
			this.text_data1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/text_data1') as mw.TextBlock
		}
		return this.text_data1_Internal
	}
	private text_dataNum1_Internal: mw.TextBlock
	public get text_dataNum1(): mw.TextBlock {
		if(!this.text_dataNum1_Internal&&this.uiWidgetBase) {
			this.text_dataNum1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/text_dataNum1') as mw.TextBlock
		}
		return this.text_dataNum1_Internal
	}
	private progressBar_Internal: mw.ProgressBar
	public get progressBar(): mw.ProgressBar {
		if(!this.progressBar_Internal&&this.uiWidgetBase) {
			this.progressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/progressBar') as mw.ProgressBar
		}
		return this.progressBar_Internal
	}
	private text_data1_1_Internal: mw.TextBlock
	public get text_data1_1(): mw.TextBlock {
		if(!this.text_data1_1_Internal&&this.uiWidgetBase) {
			this.text_data1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/text_data1_1') as mw.TextBlock
		}
		return this.text_data1_1_Internal
	}
	private text_dataNum1_1_Internal: mw.TextBlock
	public get text_dataNum1_1(): mw.TextBlock {
		if(!this.text_dataNum1_1_Internal&&this.uiWidgetBase) {
			this.text_dataNum1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/text_dataNum1_1') as mw.TextBlock
		}
		return this.text_dataNum1_1_Internal
	}
	private progressBar_1_Internal: mw.ProgressBar
	public get progressBar_1(): mw.ProgressBar {
		if(!this.progressBar_1_Internal&&this.uiWidgetBase) {
			this.progressBar_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/progressBar_1') as mw.ProgressBar
		}
		return this.progressBar_1_Internal
	}
	private text_data1_2_Internal: mw.TextBlock
	public get text_data1_2(): mw.TextBlock {
		if(!this.text_data1_2_Internal&&this.uiWidgetBase) {
			this.text_data1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/text_data1_2') as mw.TextBlock
		}
		return this.text_data1_2_Internal
	}
	private text_dataNum1_2_Internal: mw.TextBlock
	public get text_dataNum1_2(): mw.TextBlock {
		if(!this.text_dataNum1_2_Internal&&this.uiWidgetBase) {
			this.text_dataNum1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/text_dataNum1_2') as mw.TextBlock
		}
		return this.text_dataNum1_2_Internal
	}
	private progressBar_2_Internal: mw.ProgressBar
	public get progressBar_2(): mw.ProgressBar {
		if(!this.progressBar_2_Internal&&this.uiWidgetBase) {
			this.progressBar_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_data/progressBar_2') as mw.ProgressBar
		}
		return this.progressBar_2_Internal
	}
	private canvas_money_Internal: mw.Canvas
	public get canvas_money(): mw.Canvas {
		if(!this.canvas_money_Internal&&this.uiWidgetBase) {
			this.canvas_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_money') as mw.Canvas
		}
		return this.canvas_money_Internal
	}
	private img_moneyicon_Internal: mw.Image
	public get img_moneyicon(): mw.Image {
		if(!this.img_moneyicon_Internal&&this.uiWidgetBase) {
			this.img_moneyicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_money/img_moneyicon') as mw.Image
		}
		return this.img_moneyicon_Internal
	}
	private text_moneynum_Internal: mw.TextBlock
	public get text_moneynum(): mw.TextBlock {
		if(!this.text_moneynum_Internal&&this.uiWidgetBase) {
			this.text_moneynum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/canvas_money/text_moneynum') as mw.TextBlock
		}
		return this.text_moneynum_Internal
	}
	private btn_unlcok_Internal: mw.Button
	public get btn_unlcok(): mw.Button {
		if(!this.btn_unlcok_Internal&&this.uiWidgetBase) {
			this.btn_unlcok_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/btn_unlcok') as mw.Button
		}
		return this.btn_unlcok_Internal
	}
	private text_unlcok_Internal: mw.TextBlock
	public get text_unlcok(): mw.TextBlock {
		if(!this.text_unlcok_Internal&&this.uiWidgetBase) {
			this.text_unlcok_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_unlock/text_unlcok') as mw.TextBlock
		}
		return this.text_unlcok_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "Unlock_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_unlcok.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Unlock_UI_btn_unlcok");
		})
		this.btn_unlcok.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_unlcok.onPressed.add(() => {
			this.btn_unlcok["preScale"] = this.btn_unlcok.renderScale;
			this.btn_unlcok.renderScale = Vector2.one.set(this.btn_unlcok["preScale"]).multiply(1.1);
		})
		this.btn_unlcok.onReleased.add(() => {
			this.btn_unlcok.renderScale = this.btn_unlcok["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
		this.initLanguage(this.text_desc)
		this.text_desc.isRichText = true;
		
	
		this.initLanguage(this.text_data1)
		this.text_data1.isRichText = true;
		
	
		this.initLanguage(this.text_dataNum1)
		this.text_dataNum1.isRichText = true;
		
	
		this.initLanguage(this.text_data1_1)
		this.text_data1_1.isRichText = true;
		
	
		this.initLanguage(this.text_dataNum1_1)
		this.text_dataNum1_1.isRichText = true;
		
	
		this.initLanguage(this.text_data1_2)
		this.text_data1_2.isRichText = true;
		
	
		this.initLanguage(this.text_dataNum1_2)
		this.text_dataNum1_2.isRichText = true;
		
	
		this.initLanguage(this.text_moneynum)
		this.text_moneynum.isRichText = true;
		
	
		this.initLanguage(this.text_unlcok)
		this.text_unlcok.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Unlock_UI'] = Unlock_UI_Generate;