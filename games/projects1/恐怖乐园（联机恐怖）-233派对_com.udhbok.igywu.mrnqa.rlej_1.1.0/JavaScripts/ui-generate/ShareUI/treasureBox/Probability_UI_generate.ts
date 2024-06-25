
 

 @UIBind('UI/ShareUI/treasureBox/Probability_UI.ui')
 export default class Probability_UI_Generate extends UIScript {
	 	private btn_backP_Internal: mw.Button
	public get btn_backP(): mw.Button {
		if(!this.btn_backP_Internal&&this.uiWidgetBase) {
			this.btn_backP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_backP') as mw.Button
		}
		return this.btn_backP_Internal
	}
	private canvas_poolP_Internal: mw.Canvas
	public get canvas_poolP(): mw.Canvas {
		if(!this.canvas_poolP_Internal&&this.uiWidgetBase) {
			this.canvas_poolP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_poolP') as mw.Canvas
		}
		return this.canvas_poolP_Internal
	}
	private text_prizeP_Internal: mw.TextBlock
	public get text_prizeP(): mw.TextBlock {
		if(!this.text_prizeP_Internal&&this.uiWidgetBase) {
			this.text_prizeP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_poolP/text_prizeP') as mw.TextBlock
		}
		return this.text_prizeP_Internal
	}
	private text_closeP_Internal: mw.TextBlock
	public get text_closeP(): mw.TextBlock {
		if(!this.text_closeP_Internal&&this.uiWidgetBase) {
			this.text_closeP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_poolP/text_closeP') as mw.TextBlock
		}
		return this.text_closeP_Internal
	}
	private mScrollBox_P_Internal: mw.ScrollBox
	public get mScrollBox_P(): mw.ScrollBox {
		if(!this.mScrollBox_P_Internal&&this.uiWidgetBase) {
			this.mScrollBox_P_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_poolP/mScrollBox_P') as mw.ScrollBox
		}
		return this.mScrollBox_P_Internal
	}
	private mCanvas_P_Internal: mw.Canvas
	public get mCanvas_P(): mw.Canvas {
		if(!this.mCanvas_P_Internal&&this.uiWidgetBase) {
			this.mCanvas_P_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_poolP/mScrollBox_P/mCanvas_P') as mw.Canvas
		}
		return this.mCanvas_P_Internal
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
		
		this.btn_backP.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Probability_UI_btn_backP");
		})
		this.btn_backP.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_backP.onPressed.add(() => {
			this.btn_backP["preScale"] = this.btn_backP.renderScale;
			this.btn_backP.renderScale = Vector2.one.set(this.btn_backP["preScale"]).multiply(1.1);
		})
		this.btn_backP.onReleased.add(() => {
			this.btn_backP.renderScale = this.btn_backP["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_prizeP)
		this.text_prizeP.isRichText = true;
		
	
		this.initLanguage(this.text_closeP)
		this.text_closeP.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Probability_UI'] = Probability_UI_Generate;