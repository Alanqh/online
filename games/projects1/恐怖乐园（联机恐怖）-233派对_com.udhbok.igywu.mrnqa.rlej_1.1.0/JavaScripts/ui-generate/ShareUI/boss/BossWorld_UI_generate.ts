
 

 @UIBind('UI/ShareUI/boss/BossWorld_UI.ui')
 export default class BossWorld_UI_Generate extends UIScript {
	 	private mText_BTime_Internal: mw.TextBlock
	public get mText_BTime(): mw.TextBlock {
		if(!this.mText_BTime_Internal&&this.uiWidgetBase) {
			this.mText_BTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_BTime') as mw.TextBlock
		}
		return this.mText_BTime_Internal
	}
	private mTextBHP_Internal: mw.TextBlock
	public get mTextBHP(): mw.TextBlock {
		if(!this.mTextBHP_Internal&&this.uiWidgetBase) {
			this.mTextBHP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mTextBHP') as mw.TextBlock
		}
		return this.mTextBHP_Internal
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
		
		this.initLanguage(this.mText_BTime)
		this.mText_BTime.isRichText = true;
		
	
		this.initLanguage(this.mTextBHP)
		this.mTextBHP.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BossWorld_UI'] = BossWorld_UI_Generate;