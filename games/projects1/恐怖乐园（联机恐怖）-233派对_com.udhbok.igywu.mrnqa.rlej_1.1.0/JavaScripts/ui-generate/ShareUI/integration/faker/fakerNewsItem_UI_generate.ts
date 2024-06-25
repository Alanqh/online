
 

 @UIBind('UI/ShareUI/integration/faker/fakerNewsItem_UI.ui')
 export default class fakerNewsItem_UI_Generate extends UIScript {
	 	private mrootCanvas_Internal: mw.Canvas
	public get mrootCanvas(): mw.Canvas {
		if(!this.mrootCanvas_Internal&&this.uiWidgetBase) {
			this.mrootCanvas_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas') as mw.Canvas
		}
		return this.mrootCanvas_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_faker_Internal: mw.Image
	public get img_faker(): mw.Image {
		if(!this.img_faker_Internal&&this.uiWidgetBase) {
			this.img_faker_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/img_faker') as mw.Image
		}
		return this.img_faker_Internal
	}
	private img_01_Internal: mw.Image
	public get img_01(): mw.Image {
		if(!this.img_01_Internal&&this.uiWidgetBase) {
			this.img_01_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/img_01') as mw.Image
		}
		return this.img_01_Internal
	}
	private img_02_Internal: mw.Image
	public get img_02(): mw.Image {
		if(!this.img_02_Internal&&this.uiWidgetBase) {
			this.img_02_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/img_01/img_02') as mw.Image
		}
		return this.img_02_Internal
	}
	private img_03_Internal: mw.Image
	public get img_03(): mw.Image {
		if(!this.img_03_Internal&&this.uiWidgetBase) {
			this.img_03_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/img_03') as mw.Image
		}
		return this.img_03_Internal
	}
	private img_04_Internal: mw.Image
	public get img_04(): mw.Image {
		if(!this.img_04_Internal&&this.uiWidgetBase) {
			this.img_04_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/img_04') as mw.Image
		}
		return this.img_04_Internal
	}
	private text_title0_Internal: mw.TextBlock
	public get text_title0(): mw.TextBlock {
		if(!this.text_title0_Internal&&this.uiWidgetBase) {
			this.text_title0_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/text_title0') as mw.TextBlock
		}
		return this.text_title0_Internal
	}
	private text_title1_Internal: mw.TextBlock
	public get text_title1(): mw.TextBlock {
		if(!this.text_title1_Internal&&this.uiWidgetBase) {
			this.text_title1_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/text_title1') as mw.TextBlock
		}
		return this.text_title1_Internal
	}
	private text_news_Internal: mw.TextBlock
	public get text_news(): mw.TextBlock {
		if(!this.text_news_Internal&&this.uiWidgetBase) {
			this.text_news_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/text_news') as mw.TextBlock
		}
		return this.text_news_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
	}
	private text_gift_Internal: mw.TextBlock
	public get text_gift(): mw.TextBlock {
		if(!this.text_gift_Internal&&this.uiWidgetBase) {
			this.text_gift_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/text_gift') as mw.TextBlock
		}
		return this.text_gift_Internal
	}
	private canvas_countDown_Internal: mw.Canvas
	public get canvas_countDown(): mw.Canvas {
		if(!this.canvas_countDown_Internal&&this.uiWidgetBase) {
			this.canvas_countDown_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_countDown') as mw.Canvas
		}
		return this.canvas_countDown_Internal
	}
	private img_giftBg_Internal: mw.Image
	public get img_giftBg(): mw.Image {
		if(!this.img_giftBg_Internal&&this.uiWidgetBase) {
			this.img_giftBg_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_countDown/img_giftBg') as mw.Image
		}
		return this.img_giftBg_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_countDown/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private img_gift_Internal: mw.Image
	public get img_gift(): mw.Image {
		if(!this.img_gift_Internal&&this.uiWidgetBase) {
			this.img_gift_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_countDown/img_gift') as mw.Image
		}
		return this.img_gift_Internal
	}
	private img_gift2_Internal: mw.Image
	public get img_gift2(): mw.Image {
		if(!this.img_gift2_Internal&&this.uiWidgetBase) {
			this.img_gift2_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_countDown/img_gift2') as mw.Image
		}
		return this.img_gift2_Internal
	}
	private maskBtn_color_Internal: mw.MaskButton
	public get maskBtn_color(): mw.MaskButton {
		if(!this.maskBtn_color_Internal&&this.uiWidgetBase) {
			this.maskBtn_color_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_countDown/maskBtn_color') as mw.MaskButton
		}
		return this.maskBtn_color_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/canvas_countDown/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private img_gift3_Internal: mw.Image
	public get img_gift3(): mw.Image {
		if(!this.img_gift3_Internal&&this.uiWidgetBase) {
			this.img_gift3_Internal = this.uiWidgetBase.findChildByPath('mrootCanvas/img_gift3') as mw.Image
		}
		return this.img_gift3_Internal
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
		

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_title0)
		this.text_title0.isRichText = true;
		
	
		this.initLanguage(this.text_title1)
		this.text_title1.isRichText = true;
		
	
		this.initLanguage(this.text_news)
		this.text_news.isRichText = true;
		
	
		this.initLanguage(this.text_tips)
		this.text_tips.isRichText = true;
		
	
		this.initLanguage(this.text_gift)
		this.text_gift.isRichText = true;
		
	
		this.initLanguage(this.text_num)
		this.text_num.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_fakerNewsItem_UI'] = fakerNewsItem_UI_Generate;