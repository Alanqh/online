
 

 @UIBind('UI/ShareUI/Find相关UI/Multinotice_UI.ui')
 export default class Multinotice_UI_Generate extends UIScript {
	 	private canvas_pool_Internal: mw.Canvas
	public get canvas_pool(): mw.Canvas {
		if(!this.canvas_pool_Internal&&this.uiWidgetBase) {
			this.canvas_pool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool') as mw.Canvas
		}
		return this.canvas_pool_Internal
	}
	private img_frame2_Internal: mw.Image
	public get img_frame2(): mw.Image {
		if(!this.img_frame2_Internal&&this.uiWidgetBase) {
			this.img_frame2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/img_frame2') as mw.Image
		}
		return this.img_frame2_Internal
	}
	private img_frame3_Internal: mw.Image
	public get img_frame3(): mw.Image {
		if(!this.img_frame3_Internal&&this.uiWidgetBase) {
			this.img_frame3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/img_frame3') as mw.Image
		}
		return this.img_frame3_Internal
	}
	private text_prizePool_Internal: mw.TextBlock
	public get text_prizePool(): mw.TextBlock {
		if(!this.text_prizePool_Internal&&this.uiWidgetBase) {
			this.text_prizePool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/text_prizePool') as mw.TextBlock
		}
		return this.text_prizePool_Internal
	}
	private canvas_prize_Internal: mw.Canvas
	public get canvas_prize(): mw.Canvas {
		if(!this.canvas_prize_Internal&&this.uiWidgetBase) {
			this.canvas_prize_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_pool/ScrollBox/canvas_prize') as mw.Canvas
		}
		return this.canvas_prize_Internal
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
		
		this.initLanguage(this.text_prizePool)
		this.text_prizePool.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Multinotice_UI'] = Multinotice_UI_Generate;