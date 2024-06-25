
 

 @UIBind('UI/ShareUI/rank/NewGiftItem_UI.ui')
 export default class NewGiftItem_UI_Generate extends UIScript {
	 	private canvas_giftItem_Internal: mw.Canvas
	public get canvas_giftItem(): mw.Canvas {
		if(!this.canvas_giftItem_Internal&&this.uiWidgetBase) {
			this.canvas_giftItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem') as mw.Canvas
		}
		return this.canvas_giftItem_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
	}
	private giftBtn_Internal: mw.Button
	public get giftBtn(): mw.Button {
		if(!this.giftBtn_Internal&&this.uiWidgetBase) {
			this.giftBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftItem/giftBtn') as mw.Button
		}
		return this.giftBtn_Internal
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
		
		this.giftBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "NewGiftItem_UI_giftBtn");
		})
		this.giftBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.giftBtn.onPressed.add(() => {
			this.giftBtn["preScale"] = this.giftBtn.renderScale;
			this.giftBtn.renderScale = Vector2.one.set(this.giftBtn["preScale"]).multiply(1.1);
		})
		this.giftBtn.onReleased.add(() => {
			this.giftBtn.renderScale = this.giftBtn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_num)
		this.text_num.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_NewGiftItem_UI'] = NewGiftItem_UI_Generate;