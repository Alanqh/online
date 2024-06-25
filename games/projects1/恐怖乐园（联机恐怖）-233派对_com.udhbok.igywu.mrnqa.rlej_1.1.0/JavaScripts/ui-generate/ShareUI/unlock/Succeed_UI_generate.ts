
 

 @UIBind('UI/ShareUI/unlock/Succeed_UI.ui')
 export default class Succeed_UI_Generate extends UIScript {
	 	private canvas_successful_Internal: mw.Canvas
	public get canvas_successful(): mw.Canvas {
		if(!this.canvas_successful_Internal&&this.uiWidgetBase) {
			this.canvas_successful_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful') as mw.Canvas
		}
		return this.canvas_successful_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_bg1_2_Internal: mw.Image
	public get img_bg1_2(): mw.Image {
		if(!this.img_bg1_2_Internal&&this.uiWidgetBase) {
			this.img_bg1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_bg1_2') as mw.Image
		}
		return this.img_bg1_2_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private text_back_Internal: mw.TextBlock
	public get text_back(): mw.TextBlock {
		if(!this.text_back_Internal&&this.uiWidgetBase) {
			this.text_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/btn_back/text_back') as mw.TextBlock
		}
		return this.text_back_Internal
	}
	private btn_use_Internal: mw.Button
	public get btn_use(): mw.Button {
		if(!this.btn_use_Internal&&this.uiWidgetBase) {
			this.btn_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/btn_use') as mw.Button
		}
		return this.btn_use_Internal
	}
	private text_use_Internal: mw.TextBlock
	public get text_use(): mw.TextBlock {
		if(!this.text_use_Internal&&this.uiWidgetBase) {
			this.text_use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/btn_use/text_use') as mw.TextBlock
		}
		return this.text_use_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private img_line_Internal: mw.Image
	public get img_line(): mw.Image {
		if(!this.img_line_Internal&&this.uiWidgetBase) {
			this.img_line_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_line') as mw.Image
		}
		return this.img_line_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_successful/canvas_item/img_icon') as mw.Image
		}
		return this.img_icon_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "Succeed_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Succeed_UI_btn_use");
		})
		this.btn_use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_use.onPressed.add(() => {
			this.btn_use["preScale"] = this.btn_use.renderScale;
			this.btn_use.renderScale = Vector2.one.set(this.btn_use["preScale"]).multiply(1.1);
		})
		this.btn_use.onReleased.add(() => {
			this.btn_use.renderScale = this.btn_use["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_title)
		this.text_title.isRichText = true;
		
	
		this.initLanguage(this.text_back)
		this.text_back.isRichText = true;
		
	
		this.initLanguage(this.text_use)
		this.text_use.isRichText = true;
		
	
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Succeed_UI'] = Succeed_UI_Generate;