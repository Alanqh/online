
 

 @UIBind('UI/ShareUI/rank/ListItem_UI.ui')
 export default class ListItem_UI_Generate extends UIScript {
	 	private canvas_rank_Internal: mw.Canvas
	public get canvas_rank(): mw.Canvas {
		if(!this.canvas_rank_Internal&&this.uiWidgetBase) {
			this.canvas_rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank') as mw.Canvas
		}
		return this.canvas_rank_Internal
	}
	private img_rankBg_Internal: mw.Image
	public get img_rankBg(): mw.Image {
		if(!this.img_rankBg_Internal&&this.uiWidgetBase) {
			this.img_rankBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank/img_rankBg') as mw.Image
		}
		return this.img_rankBg_Internal
	}
	private btn_gift_Internal: mw.Button
	public get btn_gift(): mw.Button {
		if(!this.btn_gift_Internal&&this.uiWidgetBase) {
			this.btn_gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank/btn_gift') as mw.Button
		}
		return this.btn_gift_Internal
	}
	private text_data_Internal: mw.TextBlock
	public get text_data(): mw.TextBlock {
		if(!this.text_data_Internal&&this.uiWidgetBase) {
			this.text_data_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank/text_data') as mw.TextBlock
		}
		return this.text_data_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_rankIcon_Internal: mw.Image
	public get img_rankIcon(): mw.Image {
		if(!this.img_rankIcon_Internal&&this.uiWidgetBase) {
			this.img_rankIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank/img_rankIcon') as mw.Image
		}
		return this.img_rankIcon_Internal
	}
	private text_rankNum_Internal: mw.TextBlock
	public get text_rankNum(): mw.TextBlock {
		if(!this.text_rankNum_Internal&&this.uiWidgetBase) {
			this.text_rankNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank/text_rankNum') as mw.TextBlock
		}
		return this.text_rankNum_Internal
	}
	private btn_openCard_Internal: mw.Button
	public get btn_openCard(): mw.Button {
		if(!this.btn_openCard_Internal&&this.uiWidgetBase) {
			this.btn_openCard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rank/btn_openCard') as mw.Button
		}
		return this.btn_openCard_Internal
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
		
		this.btn_gift.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ListItem_UI_btn_gift");
		})
		this.btn_gift.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift.onPressed.add(() => {
			this.btn_gift["preScale"] = this.btn_gift.renderScale;
			this.btn_gift.renderScale = Vector2.one.set(this.btn_gift["preScale"]).multiply(1.1);
		})
		this.btn_gift.onReleased.add(() => {
			this.btn_gift.renderScale = this.btn_gift["preScale"];
		})
		
	
		this.btn_openCard.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ListItem_UI_btn_openCard");
		})
		this.btn_openCard.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_openCard.onPressed.add(() => {
			this.btn_openCard["preScale"] = this.btn_openCard.renderScale;
			this.btn_openCard.renderScale = Vector2.one.set(this.btn_openCard["preScale"]).multiply(1.1);
		})
		this.btn_openCard.onReleased.add(() => {
			this.btn_openCard.renderScale = this.btn_openCard["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_data)
		this.text_data.isRichText = true;
		
	
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
		this.initLanguage(this.text_rankNum)
		this.text_rankNum.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ListItem_UI'] = ListItem_UI_Generate;