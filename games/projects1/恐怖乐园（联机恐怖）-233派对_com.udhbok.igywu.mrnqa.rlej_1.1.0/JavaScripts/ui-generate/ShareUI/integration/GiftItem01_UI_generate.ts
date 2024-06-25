
 

 @UIBind('UI/ShareUI/integration/GiftItem01_UI.ui')
 export default class GiftItem01_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_gift_Internal: mw.Canvas
	public get canvas_gift(): mw.Canvas {
		if(!this.canvas_gift_Internal&&this.uiWidgetBase) {
			this.canvas_gift_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_gift') as mw.Canvas
		}
		return this.canvas_gift_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_gift/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_gift/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
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

UIService['UI_GiftItem01_UI'] = GiftItem01_UI_Generate;