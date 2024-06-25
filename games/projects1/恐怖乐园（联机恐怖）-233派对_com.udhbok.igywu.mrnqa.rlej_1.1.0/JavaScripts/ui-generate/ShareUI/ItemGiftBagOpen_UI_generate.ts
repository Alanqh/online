
 

 @UIBind('UI/ShareUI/ItemGiftBagOpen_UI.ui')
 export default class ItemGiftBagOpen_UI_Generate extends UIScript {
	 	private canvas_opengiftItem_Internal: mw.Canvas
	public get canvas_opengiftItem(): mw.Canvas {
		if(!this.canvas_opengiftItem_Internal&&this.uiWidgetBase) {
			this.canvas_opengiftItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem') as mw.Canvas
		}
		return this.canvas_opengiftItem_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private canvas_giftitem_Internal: mw.Canvas
	public get canvas_giftitem(): mw.Canvas {
		if(!this.canvas_giftitem_Internal&&this.uiWidgetBase) {
			this.canvas_giftitem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/canvas_giftitem') as mw.Canvas
		}
		return this.canvas_giftitem_Internal
	}
	private img_black_Internal: mw.Image
	public get img_black(): mw.Image {
		if(!this.img_black_Internal&&this.uiWidgetBase) {
			this.img_black_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/canvas_giftitem/img_black') as mw.Image
		}
		return this.img_black_Internal
	}
	private btn_itempick_Internal: mw.Button
	public get btn_itempick(): mw.Button {
		if(!this.btn_itempick_Internal&&this.uiWidgetBase) {
			this.btn_itempick_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/canvas_giftitem/btn_itempick') as mw.Button
		}
		return this.btn_itempick_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/canvas_giftitem/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private img_itemicon_Internal: mw.Image
	public get img_itemicon(): mw.Image {
		if(!this.img_itemicon_Internal&&this.uiWidgetBase) {
			this.img_itemicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/canvas_giftitem/img_itemicon') as mw.Image
		}
		return this.img_itemicon_Internal
	}
	private text_number_Internal: mw.TextBlock
	public get text_number(): mw.TextBlock {
		if(!this.text_number_Internal&&this.uiWidgetBase) {
			this.text_number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/canvas_giftitem/text_number') as mw.TextBlock
		}
		return this.text_number_Internal
	}
	private text_Name_Internal: mw.TextBlock
	public get text_Name(): mw.TextBlock {
		if(!this.text_Name_Internal&&this.uiWidgetBase) {
			this.text_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/text_Name') as mw.TextBlock
		}
		return this.text_Name_Internal
	}
	private img_Tag_Internal: mw.Image
	public get img_Tag(): mw.Image {
		if(!this.img_Tag_Internal&&this.uiWidgetBase) {
			this.img_Tag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/img_Tag') as mw.Image
		}
		return this.img_Tag_Internal
	}
	private text_Tag_Internal: mw.TextBlock
	public get text_Tag(): mw.TextBlock {
		if(!this.text_Tag_Internal&&this.uiWidgetBase) {
			this.text_Tag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_opengiftItem/text_Tag') as mw.TextBlock
		}
		return this.text_Tag_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "ItemGiftBagOpen_UI_btn_itempick");
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
		
		this.initLanguage(this.text_number)
		this.text_number.isRichText = true;
		
	
		this.initLanguage(this.text_Name)
		this.text_Name.isRichText = true;
		
	
		this.initLanguage(this.text_Tag)
		this.text_Tag.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ItemGiftBagOpen_UI'] = ItemGiftBagOpen_UI_Generate;