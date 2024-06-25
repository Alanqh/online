
 

 @UIBind('UI/ShareUI/checkin/RewardsItem_UI.ui')
 export default class RewardsItem_UI_Generate extends UIScript {
	 	private canvas_day1_1_Internal: mw.Canvas
	public get canvas_day1_1(): mw.Canvas {
		if(!this.canvas_day1_1_Internal&&this.uiWidgetBase) {
			this.canvas_day1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1') as mw.Canvas
		}
		return this.canvas_day1_1_Internal
	}
	private img_day1bg_Internal: mw.Image
	public get img_day1bg(): mw.Image {
		if(!this.img_day1bg_Internal&&this.uiWidgetBase) {
			this.img_day1bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/img_day1bg') as mw.Image
		}
		return this.img_day1bg_Internal
	}
	private text_day1_Internal: mw.TextBlock
	public get text_day1(): mw.TextBlock {
		if(!this.text_day1_Internal&&this.uiWidgetBase) {
			this.text_day1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/text_day1') as mw.TextBlock
		}
		return this.text_day1_Internal
	}
	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private item_iconBg_Internal: mw.Image
	public get item_iconBg(): mw.Image {
		if(!this.item_iconBg_Internal&&this.uiWidgetBase) {
			this.item_iconBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_item/item_iconBg') as mw.Image
		}
		return this.item_iconBg_Internal
	}
	private item_icon_Internal: mw.Image
	public get item_icon(): mw.Image {
		if(!this.item_icon_Internal&&this.uiWidgetBase) {
			this.item_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_item/item_icon') as mw.Image
		}
		return this.item_icon_Internal
	}
	private text_itemNum_Internal: mw.TextBlock
	public get text_itemNum(): mw.TextBlock {
		if(!this.text_itemNum_Internal&&this.uiWidgetBase) {
			this.text_itemNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_item/text_itemNum') as mw.TextBlock
		}
		return this.text_itemNum_Internal
	}
	private text_itemName_Internal: mw.TextBlock
	public get text_itemName(): mw.TextBlock {
		if(!this.text_itemName_Internal&&this.uiWidgetBase) {
			this.text_itemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_item/text_itemName') as mw.TextBlock
		}
		return this.text_itemName_Internal
	}
	private btn_item_Internal: mw.Button
	public get btn_item(): mw.Button {
		if(!this.btn_item_Internal&&this.uiWidgetBase) {
			this.btn_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_item/btn_item') as mw.Button
		}
		return this.btn_item_Internal
	}
	private text_get_Internal: mw.TextBlock
	public get text_get(): mw.TextBlock {
		if(!this.text_get_Internal&&this.uiWidgetBase) {
			this.text_get_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/text_get') as mw.TextBlock
		}
		return this.text_get_Internal
	}
	private btn_get_Internal: mw.Button
	public get btn_get(): mw.Button {
		if(!this.btn_get_Internal&&this.uiWidgetBase) {
			this.btn_get_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/btn_get') as mw.Button
		}
		return this.btn_get_Internal
	}
	private canvas_received_Internal: mw.Canvas
	public get canvas_received(): mw.Canvas {
		if(!this.canvas_received_Internal&&this.uiWidgetBase) {
			this.canvas_received_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_received') as mw.Canvas
		}
		return this.canvas_received_Internal
	}
	private img_receivedBg_Internal: mw.Image
	public get img_receivedBg(): mw.Image {
		if(!this.img_receivedBg_Internal&&this.uiWidgetBase) {
			this.img_receivedBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_received/img_receivedBg') as mw.Image
		}
		return this.img_receivedBg_Internal
	}
	private img_receivedIcon_Internal: mw.Image
	public get img_receivedIcon(): mw.Image {
		if(!this.img_receivedIcon_Internal&&this.uiWidgetBase) {
			this.img_receivedIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_day1_1/canvas_received/img_receivedIcon') as mw.Image
		}
		return this.img_receivedIcon_Internal
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
		
		this.btn_item.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "RewardsItem_UI_btn_item");
		})
		this.btn_item.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_item.onPressed.add(() => {
			this.btn_item["preScale"] = this.btn_item.renderScale;
			this.btn_item.renderScale = Vector2.one.set(this.btn_item["preScale"]).multiply(1.1);
		})
		this.btn_item.onReleased.add(() => {
			this.btn_item.renderScale = this.btn_item["preScale"];
		})
		
	
		this.btn_get.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "RewardsItem_UI_btn_get");
		})
		this.btn_get.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_get.onPressed.add(() => {
			this.btn_get["preScale"] = this.btn_get.renderScale;
			this.btn_get.renderScale = Vector2.one.set(this.btn_get["preScale"]).multiply(1.1);
		})
		this.btn_get.onReleased.add(() => {
			this.btn_get.renderScale = this.btn_get["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_day1)
		this.text_day1.isRichText = true;
		
	
		this.initLanguage(this.text_itemNum)
		this.text_itemNum.isRichText = true;
		
	
		this.initLanguage(this.text_itemName)
		this.text_itemName.isRichText = true;
		
	
		this.initLanguage(this.text_get)
		this.text_get.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_RewardsItem_UI'] = RewardsItem_UI_Generate;