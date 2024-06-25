
 

 @UIBind('UI/ShareUI/buff/BuffItem.ui')
 export default class BuffItem_Generate extends UIScript {
	 	private img_bg0_Internal: mw.Image
	public get img_bg0(): mw.Image {
		if(!this.img_bg0_Internal&&this.uiWidgetBase) {
			this.img_bg0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg0') as mw.Image
		}
		return this.img_bg0_Internal
	}
	private descIcon_Internal: mw.MaskButton
	public get descIcon(): mw.MaskButton {
		if(!this.descIcon_Internal&&this.uiWidgetBase) {
			this.descIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/descIcon') as mw.MaskButton
		}
		return this.descIcon_Internal
	}
	private img_color0_Internal: mw.Image
	public get img_color0(): mw.Image {
		if(!this.img_color0_Internal&&this.uiWidgetBase) {
			this.img_color0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_color0') as mw.Image
		}
		return this.img_color0_Internal
	}
	private canvas_introduce_Internal: mw.Canvas
	public get canvas_introduce(): mw.Canvas {
		if(!this.canvas_introduce_Internal&&this.uiWidgetBase) {
			this.canvas_introduce_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce') as mw.Canvas
		}
		return this.canvas_introduce_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_introduce_Internal: mw.TextBlock
	public get text_introduce(): mw.TextBlock {
		if(!this.text_introduce_Internal&&this.uiWidgetBase) {
			this.text_introduce_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/text_introduce') as mw.TextBlock
		}
		return this.text_introduce_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_introduce/img_br') as mw.Image
		}
		return this.img_br_Internal
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
		
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
		this.initLanguage(this.text_introduce)
		this.text_introduce.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuffItem'] = BuffItem_Generate;