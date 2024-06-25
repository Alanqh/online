
 

 @UIBind('UI/ShareUI/Find相关UI/WardItem_UI.ui')
 export default class WardItem_UI_Generate extends UIScript {
	 	private canvas_wardicon_Internal: mw.Canvas
	public get canvas_wardicon(): mw.Canvas {
		if(!this.canvas_wardicon_Internal&&this.uiWidgetBase) {
			this.canvas_wardicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_wardicon') as mw.Canvas
		}
		return this.canvas_wardicon_Internal
	}
	private img_wardicon1_Internal: mw.Image
	public get img_wardicon1(): mw.Image {
		if(!this.img_wardicon1_Internal&&this.uiWidgetBase) {
			this.img_wardicon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_wardicon/img_wardicon1') as mw.Image
		}
		return this.img_wardicon1_Internal
	}
	private btn_notice_Internal: mw.Button
	public get btn_notice(): mw.Button {
		if(!this.btn_notice_Internal&&this.uiWidgetBase) {
			this.btn_notice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_wardicon/btn_notice') as mw.Button
		}
		return this.btn_notice_Internal
	}
	private txtnumber_1_Internal: mw.TextBlock
	public get txtnumber_1(): mw.TextBlock {
		if(!this.txtnumber_1_Internal&&this.uiWidgetBase) {
			this.txtnumber_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_wardicon/txtnumber_1') as mw.TextBlock
		}
		return this.txtnumber_1_Internal
	}
	private txtnumber_Internal: mw.TextBlock
	public get txtnumber(): mw.TextBlock {
		if(!this.txtnumber_Internal&&this.uiWidgetBase) {
			this.txtnumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_wardicon/txtnumber') as mw.TextBlock
		}
		return this.txtnumber_Internal
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
		
		this.btn_notice.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "WardItem_UI_btn_notice");
		})
		this.btn_notice.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_notice.onPressed.add(() => {
			this.btn_notice["preScale"] = this.btn_notice.renderScale;
			this.btn_notice.renderScale = Vector2.one.set(this.btn_notice["preScale"]).multiply(1.1);
		})
		this.btn_notice.onReleased.add(() => {
			this.btn_notice.renderScale = this.btn_notice["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txtnumber_1)
		this.txtnumber_1.isRichText = true;
		
	
		this.initLanguage(this.txtnumber)
		this.txtnumber.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_WardItem_UI'] = WardItem_UI_Generate;