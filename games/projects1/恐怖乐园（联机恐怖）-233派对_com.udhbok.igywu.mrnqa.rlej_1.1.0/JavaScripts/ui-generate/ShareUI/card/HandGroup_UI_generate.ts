
 

 @UIBind('UI/ShareUI/card/HandGroup_UI.ui')
 export default class HandGroup_UI_Generate extends UIScript {
	 	private container_Internal: mw.Canvas
	public get container(): mw.Canvas {
		if(!this.container_Internal&&this.uiWidgetBase) {
			this.container_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/container') as mw.Canvas
		}
		return this.container_Internal
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

UIService['UI_HandGroup_UI'] = HandGroup_UI_Generate;