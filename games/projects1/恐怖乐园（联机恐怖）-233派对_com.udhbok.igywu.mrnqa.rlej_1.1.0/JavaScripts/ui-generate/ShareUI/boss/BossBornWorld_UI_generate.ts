
 

 @UIBind('UI/ShareUI/boss/BossBornWorld_UI.ui')
 export default class BossBornWorld_UI_Generate extends UIScript {
	 	private mTxt_Internal: mw.TextBlock
	public get mTxt(): mw.TextBlock {
		if(!this.mTxt_Internal&&this.uiWidgetBase) {
			this.mTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt') as mw.TextBlock
		}
		return this.mTxt_Internal
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
		
		this.initLanguage(this.mTxt)
		this.mTxt.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BossBornWorld_UI'] = BossBornWorld_UI_Generate;