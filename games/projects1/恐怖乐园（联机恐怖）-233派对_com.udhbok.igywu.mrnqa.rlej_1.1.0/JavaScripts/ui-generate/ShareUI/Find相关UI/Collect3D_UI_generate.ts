
 

 @UIBind('UI/ShareUI/Find相关UI/Collect3D_UI.ui')
 export default class Collect3D_UI_Generate extends UIScript {
	 	private img_not_Internal: mw.Image
	public get img_not(): mw.Image {
		if(!this.img_not_Internal&&this.uiWidgetBase) {
			this.img_not_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_not') as mw.Image
		}
		return this.img_not_Internal
	}
	private img_yes_Internal: mw.Image
	public get img_yes(): mw.Image {
		if(!this.img_yes_Internal&&this.uiWidgetBase) {
			this.img_yes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_yes') as mw.Image
		}
		return this.img_yes_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
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
		
		this.initLanguage(this.txt_name)
		this.txt_name.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Collect3D_UI'] = Collect3D_UI_Generate;