
 

 @UIBind('UI/ShareUI/common/realName_item.ui')
 export default class realName_item_Generate extends UIScript {
	 	private image_icon_Internal: mw.Image
	public get image_icon(): mw.Image {
		if(!this.image_icon_Internal&&this.uiWidgetBase) {
			this.image_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image_icon') as mw.Image
		}
		return this.image_icon_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_num_Internal: mw.TextBlock
	public get text_num(): mw.TextBlock {
		if(!this.text_num_Internal&&this.uiWidgetBase) {
			this.text_num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_num') as mw.TextBlock
		}
		return this.text_num_Internal
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
		
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
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

UIService['UI_realName_item'] = realName_item_Generate;