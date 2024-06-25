
 

 @UIBind('UI/ShareUI/card/Giftlist_UI.ui')
 export default class Giftlist_UI_Generate extends UIScript {
	 	private canvas_sendgift_Internal: mw.Canvas
	public get canvas_sendgift(): mw.Canvas {
		if(!this.canvas_sendgift_Internal&&this.uiWidgetBase) {
			this.canvas_sendgift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sendgift') as mw.Canvas
		}
		return this.canvas_sendgift_Internal
	}
	private img_giftBg1_Internal: mw.Image
	public get img_giftBg1(): mw.Image {
		if(!this.img_giftBg1_Internal&&this.uiWidgetBase) {
			this.img_giftBg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sendgift/img_giftBg1') as mw.Image
		}
		return this.img_giftBg1_Internal
	}
	private img_giftBg2_Internal: mw.Image
	public get img_giftBg2(): mw.Image {
		if(!this.img_giftBg2_Internal&&this.uiWidgetBase) {
			this.img_giftBg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sendgift/img_giftBg2') as mw.Image
		}
		return this.img_giftBg2_Internal
	}
	private img_giftBg3_Internal: mw.Image
	public get img_giftBg3(): mw.Image {
		if(!this.img_giftBg3_Internal&&this.uiWidgetBase) {
			this.img_giftBg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sendgift/img_giftBg3') as mw.Image
		}
		return this.img_giftBg3_Internal
	}
	private btn_off2_Internal: mw.Button
	public get btn_off2(): mw.Button {
		if(!this.btn_off2_Internal&&this.uiWidgetBase) {
			this.btn_off2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sendgift/btn_off2') as mw.Button
		}
		return this.btn_off2_Internal
	}
	private text_sendgift_Internal: mw.TextBlock
	public get text_sendgift(): mw.TextBlock {
		if(!this.text_sendgift_Internal&&this.uiWidgetBase) {
			this.text_sendgift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sendgift/text_sendgift') as mw.TextBlock
		}
		return this.text_sendgift_Internal
	}
	private canvas_giftName_Internal: mw.Canvas
	public get canvas_giftName(): mw.Canvas {
		if(!this.canvas_giftName_Internal&&this.uiWidgetBase) {
			this.canvas_giftName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_sendgift/ScrollBox_giftName0/canvas_giftName') as mw.Canvas
		}
		return this.canvas_giftName_Internal
	}
	private canvas_giftItems_Internal: mw.Canvas
	public get canvas_giftItems(): mw.Canvas {
		if(!this.canvas_giftItems_Internal&&this.uiWidgetBase) {
			this.canvas_giftItems_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems') as mw.Canvas
		}
		return this.canvas_giftItems_Internal
	}
	private img_giftItem1_Internal: mw.Image
	public get img_giftItem1(): mw.Image {
		if(!this.img_giftItem1_Internal&&this.uiWidgetBase) {
			this.img_giftItem1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems/img_giftItem1') as mw.Image
		}
		return this.img_giftItem1_Internal
	}
	private img_giftItem2_Internal: mw.Image
	public get img_giftItem2(): mw.Image {
		if(!this.img_giftItem2_Internal&&this.uiWidgetBase) {
			this.img_giftItem2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems/img_giftItem2') as mw.Image
		}
		return this.img_giftItem2_Internal
	}
	private img_giftItem3_Internal: mw.Image
	public get img_giftItem3(): mw.Image {
		if(!this.img_giftItem3_Internal&&this.uiWidgetBase) {
			this.img_giftItem3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems/img_giftItem3') as mw.Image
		}
		return this.img_giftItem3_Internal
	}
	private btn_off3_Internal: mw.Button
	public get btn_off3(): mw.Button {
		if(!this.btn_off3_Internal&&this.uiWidgetBase) {
			this.btn_off3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems/btn_off3') as mw.Button
		}
		return this.btn_off3_Internal
	}
	private text_giftItems_Internal: mw.TextBlock
	public get text_giftItems(): mw.TextBlock {
		if(!this.text_giftItems_Internal&&this.uiWidgetBase) {
			this.text_giftItems_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems/text_giftItems') as mw.TextBlock
		}
		return this.text_giftItems_Internal
	}
	private giftItemScrollbox_Internal: mw.ScrollBox
	public get giftItemScrollbox(): mw.ScrollBox {
		if(!this.giftItemScrollbox_Internal&&this.uiWidgetBase) {
			this.giftItemScrollbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems/giftItemScrollbox') as mw.ScrollBox
		}
		return this.giftItemScrollbox_Internal
	}
	private canvas_giftItem_Internal: mw.Canvas
	public get canvas_giftItem(): mw.Canvas {
		if(!this.canvas_giftItem_Internal&&this.uiWidgetBase) {
			this.canvas_giftItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_giftItems/giftItemScrollbox/canvas_giftItem') as mw.Canvas
		}
		return this.canvas_giftItem_Internal
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
		
		this.btn_off2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Giftlist_UI_btn_off2");
		})
		this.btn_off2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_off2.onPressed.add(() => {
			this.btn_off2["preScale"] = this.btn_off2.renderScale;
			this.btn_off2.renderScale = Vector2.one.set(this.btn_off2["preScale"]).multiply(1.1);
		})
		this.btn_off2.onReleased.add(() => {
			this.btn_off2.renderScale = this.btn_off2["preScale"];
		})
		
	
		this.btn_off3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Giftlist_UI_btn_off3");
		})
		this.btn_off3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_off3.onPressed.add(() => {
			this.btn_off3["preScale"] = this.btn_off3.renderScale;
			this.btn_off3.renderScale = Vector2.one.set(this.btn_off3["preScale"]).multiply(1.1);
		})
		this.btn_off3.onReleased.add(() => {
			this.btn_off3.renderScale = this.btn_off3["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_sendgift)
		this.text_sendgift.isRichText = true;
		
	
		this.initLanguage(this.text_giftItems)
		this.text_giftItems.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Giftlist_UI'] = Giftlist_UI_Generate;