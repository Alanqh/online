
 

 @UIBind('UI/ShareUI/Find相关UI/Multiitem_UI.ui')
 export default class Multiitem_UI_Generate extends UIScript {
	 	private img_multiItem_Internal: mw.Image
	public get img_multiItem(): mw.Image {
		if(!this.img_multiItem_Internal&&this.uiWidgetBase) {
			this.img_multiItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_multiItem') as mw.Image
		}
		return this.img_multiItem_Internal
	}
	private img_Internal: mw.Image
	public get img(): mw.Image {
		if(!this.img_Internal&&this.uiWidgetBase) {
			this.img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img') as mw.Image
		}
		return this.img_Internal
	}
	private txt_itemname_Internal: mw.TextBlock
	public get txt_itemname(): mw.TextBlock {
		if(!this.txt_itemname_Internal&&this.uiWidgetBase) {
			this.txt_itemname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_itemname') as mw.TextBlock
		}
		return this.txt_itemname_Internal
	}
	private txt_number_Internal: mw.TextBlock
	public get txt_number(): mw.TextBlock {
		if(!this.txt_number_Internal&&this.uiWidgetBase) {
			this.txt_number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_number') as mw.TextBlock
		}
		return this.txt_number_Internal
	}
	private btn_Internal: mw.Button
	public get btn(): mw.Button {
		if(!this.btn_Internal&&this.uiWidgetBase) {
			this.btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn') as mw.Button
		}
		return this.btn_Internal
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
		
		this.btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Multiitem_UI_btn");
		})
		this.btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn.onPressed.add(() => {
			this.btn["preScale"] = this.btn.renderScale;
			this.btn.renderScale = Vector2.one.set(this.btn["preScale"]).multiply(1.1);
		})
		this.btn.onReleased.add(() => {
			this.btn.renderScale = this.btn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txt_itemname)
		this.txt_itemname.isRichText = true;
		
	
		this.initLanguage(this.txt_number)
		this.txt_number.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Multiitem_UI'] = Multiitem_UI_Generate;