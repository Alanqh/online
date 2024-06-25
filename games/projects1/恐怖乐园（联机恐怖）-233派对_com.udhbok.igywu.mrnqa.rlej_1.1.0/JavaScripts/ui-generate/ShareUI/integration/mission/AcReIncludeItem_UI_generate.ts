
 

 @UIBind('UI/ShareUI/integration/mission/AcReIncludeItem_UI.ui')
 export default class AcReIncludeItem_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_includeItem_Internal: mw.Canvas
	public get canvas_includeItem(): mw.Canvas {
		if(!this.canvas_includeItem_Internal&&this.uiWidgetBase) {
			this.canvas_includeItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_includeItem') as mw.Canvas
		}
		return this.canvas_includeItem_Internal
	}
	private img_includeItem_Internal: mw.Image
	public get img_includeItem(): mw.Image {
		if(!this.img_includeItem_Internal&&this.uiWidgetBase) {
			this.img_includeItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_includeItem/img_includeItem') as mw.Image
		}
		return this.img_includeItem_Internal
	}
	private text_includeItem_Internal: mw.TextBlock
	public get text_includeItem(): mw.TextBlock {
		if(!this.text_includeItem_Internal&&this.uiWidgetBase) {
			this.text_includeItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_includeItem/text_includeItem') as mw.TextBlock
		}
		return this.text_includeItem_Internal
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
		
		this.initLanguage(this.text_includeItem)
		this.text_includeItem.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AcReIncludeItem_UI'] = AcReIncludeItem_UI_Generate;