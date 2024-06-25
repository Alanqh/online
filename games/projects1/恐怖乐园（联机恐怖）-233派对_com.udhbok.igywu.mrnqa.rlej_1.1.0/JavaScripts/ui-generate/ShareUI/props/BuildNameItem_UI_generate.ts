
 

 @UIBind('UI/ShareUI/props/BuildNameItem_UI.ui')
 export default class BuildNameItem_UI_Generate extends UIScript {
	 	private canvas_item_Internal: mw.Canvas
	public get canvas_item(): mw.Canvas {
		if(!this.canvas_item_Internal&&this.uiWidgetBase) {
			this.canvas_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item') as mw.Canvas
		}
		return this.canvas_item_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_itemLv_Internal: mw.Image
	public get img_itemLv(): mw.Image {
		if(!this.img_itemLv_Internal&&this.uiWidgetBase) {
			this.img_itemLv_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_itemLv') as mw.Image
		}
		return this.img_itemLv_Internal
	}
	private img_itemBg_Internal: mw.Image
	public get img_itemBg(): mw.Image {
		if(!this.img_itemBg_Internal&&this.uiWidgetBase) {
			this.img_itemBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_itemBg') as mw.Image
		}
		return this.img_itemBg_Internal
	}
	private img_item_Internal: mw.Image
	public get img_item(): mw.Image {
		if(!this.img_item_Internal&&this.uiWidgetBase) {
			this.img_item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/img_item') as mw.Image
		}
		return this.img_item_Internal
	}
	private text_state_Internal: mw.TextBlock
	public get text_state(): mw.TextBlock {
		if(!this.text_state_Internal&&this.uiWidgetBase) {
			this.text_state_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/text_state') as mw.TextBlock
		}
		return this.text_state_Internal
	}
	private btn_change_Internal: mw.StaleButton
	public get btn_change(): mw.StaleButton {
		if(!this.btn_change_Internal&&this.uiWidgetBase) {
			this.btn_change_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_item/btn_change') as mw.StaleButton
		}
		return this.btn_change_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_change.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildNameItem_UI_btn_change");
		})
		this.initLanguage(this.btn_change);
		this.btn_change.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_change.onPressed.add(() => {
			this.btn_change["preScale"] = this.btn_change.renderScale;
			this.btn_change.renderScale = Vector2.one.set(this.btn_change["preScale"]).multiply(1.1);
		})
		this.btn_change.onReleased.add(() => {
			this.btn_change.renderScale = this.btn_change["preScale"];
		})
		
		
	

		//按钮添加点击
		

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
		this.initLanguage(this.text_state)
		this.text_state.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildNameItem_UI'] = BuildNameItem_UI_Generate;