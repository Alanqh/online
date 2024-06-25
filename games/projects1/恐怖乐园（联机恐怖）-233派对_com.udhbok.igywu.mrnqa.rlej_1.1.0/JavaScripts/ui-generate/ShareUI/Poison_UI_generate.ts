
 

 @UIBind('UI/ShareUI/Poison_UI.ui')
 export default class Poison_UI_Generate extends UIScript {
	 	private img_Internal: mw.Image
	public get img(): mw.Image {
		if(!this.img_Internal&&this.uiWidgetBase) {
			this.img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img') as mw.Image
		}
		return this.img_Internal
	}
	private txt_Internal: mw.TextBlock
	public get txt(): mw.TextBlock {
		if(!this.txt_Internal&&this.uiWidgetBase) {
			this.txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt') as mw.TextBlock
		}
		return this.txt_Internal
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
		
		this.initLanguage(this.txt)
		this.txt.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Poison_UI'] = Poison_UI_Generate;