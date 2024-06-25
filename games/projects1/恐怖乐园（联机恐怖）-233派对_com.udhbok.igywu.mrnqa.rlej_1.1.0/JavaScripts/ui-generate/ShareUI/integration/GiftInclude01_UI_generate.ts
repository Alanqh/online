
 

 @UIBind('UI/ShareUI/integration/GiftInclude01_UI.ui')
 export default class GiftInclude01_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private canvas_include_Internal: mw.Canvas
	public get canvas_include(): mw.Canvas {
		if(!this.canvas_include_Internal&&this.uiWidgetBase) {
			this.canvas_include_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_include') as mw.Canvas
		}
		return this.canvas_include_Internal
	}
	private text_include_Internal: mw.TextBlock
	public get text_include(): mw.TextBlock {
		if(!this.text_include_Internal&&this.uiWidgetBase) {
			this.text_include_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_include/text_include') as mw.TextBlock
		}
		return this.text_include_Internal
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
		
		this.initLanguage(this.text_include)
		this.text_include.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GiftInclude01_UI'] = GiftInclude01_UI_Generate;