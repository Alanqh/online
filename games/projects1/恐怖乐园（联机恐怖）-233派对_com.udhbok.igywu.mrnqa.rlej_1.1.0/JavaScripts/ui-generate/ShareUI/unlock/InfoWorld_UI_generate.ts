
 

 @UIBind('UI/ShareUI/unlock/InfoWorld_UI.ui')
 export default class InfoWorld_UI_Generate extends UIScript {
	 	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private canvas_money_Internal: mw.Canvas
	public get canvas_money(): mw.Canvas {
		if(!this.canvas_money_Internal&&this.uiWidgetBase) {
			this.canvas_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_money') as mw.Canvas
		}
		return this.canvas_money_Internal
	}
	private text_money_Internal: mw.TextBlock
	public get text_money(): mw.TextBlock {
		if(!this.text_money_Internal&&this.uiWidgetBase) {
			this.text_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_money/text_money') as mw.TextBlock
		}
		return this.text_money_Internal
	}
	private img_money_Internal: mw.Image
	public get img_money(): mw.Image {
		if(!this.img_money_Internal&&this.uiWidgetBase) {
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_money/img_money') as mw.Image
		}
		return this.img_money_Internal
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
		
	
		this.initLanguage(this.text_money)
		this.text_money.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_InfoWorld_UI'] = InfoWorld_UI_Generate;