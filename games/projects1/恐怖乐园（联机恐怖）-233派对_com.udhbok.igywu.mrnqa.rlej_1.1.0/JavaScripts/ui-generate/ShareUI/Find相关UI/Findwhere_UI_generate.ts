
 

 @UIBind('UI/ShareUI/Find相关UI/Findwhere_UI.ui')
 export default class Findwhere_UI_Generate extends UIScript {
	 	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private img_b_Internal: mw.Image
	public get img_b(): mw.Image {
		if(!this.img_b_Internal&&this.uiWidgetBase) {
			this.img_b_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/img_b') as mw.Image
		}
		return this.img_b_Internal
	}
	private txt_tips_Internal: mw.TextBlock
	public get txt_tips(): mw.TextBlock {
		if(!this.txt_tips_Internal&&this.uiWidgetBase) {
			this.txt_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tips/txt_tips') as mw.TextBlock
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

UIService['UI_Findwhere_UI'] = Findwhere_UI_Generate;