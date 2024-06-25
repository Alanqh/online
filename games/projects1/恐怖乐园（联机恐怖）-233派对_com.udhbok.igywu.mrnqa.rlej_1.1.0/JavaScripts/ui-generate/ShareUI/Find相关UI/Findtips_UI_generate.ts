
 

 @UIBind('UI/ShareUI/Find相关UI/Findtips_UI.ui')
 export default class Findtips_UI_Generate extends UIScript {
	 	private canvas_findtips_Internal: mw.Canvas
	public get canvas_findtips(): mw.Canvas {
		if(!this.canvas_findtips_Internal&&this.uiWidgetBase) {
			this.canvas_findtips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips') as mw.Canvas
		}
		return this.canvas_findtips_Internal
	}
	private bg2_Internal: mw.Image
	public get bg2(): mw.Image {
		if(!this.bg2_Internal&&this.uiWidgetBase) {
			this.bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/bg2') as mw.Image
		}
		return this.bg2_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private img_quality_Internal: mw.Image
	public get img_quality(): mw.Image {
		if(!this.img_quality_Internal&&this.uiWidgetBase) {
			this.img_quality_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/img_quality') as mw.Image
		}
		return this.img_quality_Internal
	}
	private img_finditem_Internal: mw.Image
	public get img_finditem(): mw.Image {
		if(!this.img_finditem_Internal&&this.uiWidgetBase) {
			this.img_finditem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/img_finditem') as mw.Image
		}
		return this.img_finditem_Internal
	}
	private txt_congratuation_Internal: mw.TextBlock
	public get txt_congratuation(): mw.TextBlock {
		if(!this.txt_congratuation_Internal&&this.uiWidgetBase) {
			this.txt_congratuation_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/txt_congratuation') as mw.TextBlock
		}
		return this.txt_congratuation_Internal
	}
	private txt_itemname_Internal: mw.TextBlock
	public get txt_itemname(): mw.TextBlock {
		if(!this.txt_itemname_Internal&&this.uiWidgetBase) {
			this.txt_itemname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/txt_itemname') as mw.TextBlock
		}
		return this.txt_itemname_Internal
	}
	private btn_jumptobook_Internal: mw.StaleButton
	public get btn_jumptobook(): mw.StaleButton {
		if(!this.btn_jumptobook_Internal&&this.uiWidgetBase) {
			this.btn_jumptobook_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/btn_jumptobook') as mw.StaleButton
		}
		return this.btn_jumptobook_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_findtips/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_jumptobook.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Findtips_UI_btn_jumptobook");
		})
		this.initLanguage(this.btn_jumptobook);
		this.btn_jumptobook.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_jumptobook.onPressed.add(() => {
			this.btn_jumptobook["preScale"] = this.btn_jumptobook.renderScale;
			this.btn_jumptobook.renderScale = Vector2.one.set(this.btn_jumptobook["preScale"]).multiply(1.1);
		})
		this.btn_jumptobook.onReleased.add(() => {
			this.btn_jumptobook.renderScale = this.btn_jumptobook["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Findtips_UI_btn_close");
		})
		this.btn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close.onPressed.add(() => {
			this.btn_close["preScale"] = this.btn_close.renderScale;
			this.btn_close.renderScale = Vector2.one.set(this.btn_close["preScale"]).multiply(1.1);
		})
		this.btn_close.onReleased.add(() => {
			this.btn_close.renderScale = this.btn_close["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txt_congratuation)
		this.txt_congratuation.isRichText = true;
		
	
		this.initLanguage(this.txt_itemname)
		this.txt_itemname.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Findtips_UI'] = Findtips_UI_Generate;