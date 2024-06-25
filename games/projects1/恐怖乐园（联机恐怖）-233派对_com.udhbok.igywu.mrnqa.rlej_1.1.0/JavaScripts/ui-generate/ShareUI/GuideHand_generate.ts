
 

 @UIBind('UI/ShareUI/GuideHand.ui')
 export default class GuideHand_Generate extends UIScript {
	 	private mLeftBtnHand_Internal: mw.Image
	public get mLeftBtnHand(): mw.Image {
		if(!this.mLeftBtnHand_Internal&&this.uiWidgetBase) {
			this.mLeftBtnHand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLeftBtnHand') as mw.Image
		}
		return this.mLeftBtnHand_Internal
	}
	private mRigntBtnHand_Internal: mw.Image
	public get mRigntBtnHand(): mw.Image {
		if(!this.mRigntBtnHand_Internal&&this.uiWidgetBase) {
			this.mRigntBtnHand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRigntBtnHand') as mw.Image
		}
		return this.mRigntBtnHand_Internal
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

UIService['UI_GuideHand'] = GuideHand_Generate;