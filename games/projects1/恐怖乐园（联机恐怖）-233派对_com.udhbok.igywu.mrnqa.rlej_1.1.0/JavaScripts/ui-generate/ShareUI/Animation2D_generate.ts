
 

 @UIBind('UI/ShareUI/Animation2D.ui')
 export default class Animation2D_Generate extends UIScript {
	 	private start_Internal: mw.Image
	public get start(): mw.Image {
		if(!this.start_Internal&&this.uiWidgetBase) {
			this.start_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/start') as mw.Image
		}
		return this.start_Internal
	}
	private end_Internal: mw.Image
	public get end(): mw.Image {
		if(!this.end_Internal&&this.uiWidgetBase) {
			this.end_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/end') as mw.Image
		}
		return this.end_Internal
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
		

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Animation2D'] = Animation2D_Generate;