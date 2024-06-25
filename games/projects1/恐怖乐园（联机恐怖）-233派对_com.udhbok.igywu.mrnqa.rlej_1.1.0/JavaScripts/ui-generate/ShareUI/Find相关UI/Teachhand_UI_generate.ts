
 

 @UIBind('UI/ShareUI/Find相关UI/Teachhand_UI.ui')
 export default class Teachhand_UI_Generate extends UIScript {
	 	private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private img_hand_Internal: mw.Image
	public get img_hand(): mw.Image {
		if(!this.img_hand_Internal&&this.uiWidgetBase) {
			this.img_hand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas/img_hand') as mw.Image
		}
		return this.img_hand_Internal
	}
	private txt_tips_Internal: mw.TextBlock
	public get txt_tips(): mw.TextBlock {
		if(!this.txt_tips_Internal&&this.uiWidgetBase) {
			this.txt_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas/txt_tips') as mw.TextBlock
		}
		return this.txt_tips_Internal
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
		
		this.initLanguage(this.txt_tips)
		this.txt_tips.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Teachhand_UI'] = Teachhand_UI_Generate;