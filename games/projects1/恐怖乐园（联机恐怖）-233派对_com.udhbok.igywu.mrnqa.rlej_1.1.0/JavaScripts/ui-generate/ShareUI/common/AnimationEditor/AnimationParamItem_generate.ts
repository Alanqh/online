
 

 @UIBind('UI/ShareUI/common/AnimationEditor/AnimationParamItem.ui')
 export default class AnimationParamItem_Generate extends UIScript {
	 	private mTextName_Internal: mw.TextBlock
	public get mTextName(): mw.TextBlock {
		if(!this.mTextName_Internal&&this.uiWidgetBase) {
			this.mTextName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextName') as mw.TextBlock
		}
		return this.mTextName_Internal
	}
	private mInputBox_Internal: mw.InputBox
	public get mInputBox(): mw.InputBox {
		if(!this.mInputBox_Internal&&this.uiWidgetBase) {
			this.mInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputBox') as mw.InputBox
		}
		return this.mInputBox_Internal
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
		
		this.initLanguage(this.mTextName)
		this.mTextName.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AnimationParamItem'] = AnimationParamItem_Generate;