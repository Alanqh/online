
 

 @UIBind('UI/ShareUI/treasureBox/ProbabliltyItem_UI.ui')
 export default class ProbabliltyItem_UI_Generate extends UIScript {
	 	private mcanvas_item_Internal: mw.Canvas
	public get mcanvas_item(): mw.Canvas {
		if(!this.mcanvas_item_Internal&&this.uiWidgetBase) {
			this.mcanvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item') as mw.Canvas
		}
		return this.mcanvas_item_Internal
	}
	private mtext_name_Internal: mw.TextBlock
	public get mtext_name(): mw.TextBlock {
		if(!this.mtext_name_Internal&&this.uiWidgetBase) {
			this.mtext_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item/mtext_name') as mw.TextBlock
		}
		return this.mtext_name_Internal
	}
	private mtext_Probability_Internal: mw.TextBlock
	public get mtext_Probability(): mw.TextBlock {
		if(!this.mtext_Probability_Internal&&this.uiWidgetBase) {
			this.mtext_Probability_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item/mtext_Probability') as mw.TextBlock
		}
		return this.mtext_Probability_Internal
	}
	private mcanvas_icon_Internal: mw.Canvas
	public get mcanvas_icon(): mw.Canvas {
		if(!this.mcanvas_icon_Internal&&this.uiWidgetBase) {
			this.mcanvas_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item/mcanvas_icon') as mw.Canvas
		}
		return this.mcanvas_icon_Internal
	}
	private mimg_bg1_Internal: mw.Image
	public get mimg_bg1(): mw.Image {
		if(!this.mimg_bg1_Internal&&this.uiWidgetBase) {
			this.mimg_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item/mcanvas_icon/mimg_bg1') as mw.Image
		}
		return this.mimg_bg1_Internal
	}
	private mimg_bg2_Internal: mw.Image
	public get mimg_bg2(): mw.Image {
		if(!this.mimg_bg2_Internal&&this.uiWidgetBase) {
			this.mimg_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item/mcanvas_icon/mimg_bg2') as mw.Image
		}
		return this.mimg_bg2_Internal
	}
	private mimg_icon_Internal: mw.Image
	public get mimg_icon(): mw.Image {
		if(!this.mimg_icon_Internal&&this.uiWidgetBase) {
			this.mimg_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item/mcanvas_icon/mimg_icon') as mw.Image
		}
		return this.mimg_icon_Internal
	}
	private btn_detailP_Internal: mw.Button
	public get btn_detailP(): mw.Button {
		if(!this.btn_detailP_Internal&&this.uiWidgetBase) {
			this.btn_detailP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_item/btn_detailP') as mw.Button
		}
		return this.btn_detailP_Internal
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
		
		this.btn_detailP.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ProbabliltyItem_UI_btn_detailP");
		})
		this.btn_detailP.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_detailP.onPressed.add(() => {
			this.btn_detailP["preScale"] = this.btn_detailP.renderScale;
			this.btn_detailP.renderScale = Vector2.one.set(this.btn_detailP["preScale"]).multiply(1.1);
		})
		this.btn_detailP.onReleased.add(() => {
			this.btn_detailP.renderScale = this.btn_detailP["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mtext_name)
		this.mtext_name.isRichText = true;
		
	
		this.initLanguage(this.mtext_Probability)
		this.mtext_Probability.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ProbabliltyItem_UI'] = ProbabliltyItem_UI_Generate;