
 

 @UIBind('UI/ShareUI/FollowHand_UI.ui')
 export default class FollowHand_UI_Generate extends UIScript {
	 	private btn_followHand_Internal: mw.Button
	public get btn_followHand(): mw.Button {
		if(!this.btn_followHand_Internal&&this.uiWidgetBase) {
			this.btn_followHand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_followHand') as mw.Button
		}
		return this.btn_followHand_Internal
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
		
		this.btn_followHand.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "FollowHand_UI_btn_followHand");
		})
		this.btn_followHand.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_followHand.onPressed.add(() => {
			this.btn_followHand["preScale"] = this.btn_followHand.renderScale;
			this.btn_followHand.renderScale = Vector2.one.set(this.btn_followHand["preScale"]).multiply(1.1);
		})
		this.btn_followHand.onReleased.add(() => {
			this.btn_followHand.renderScale = this.btn_followHand["preScale"];
		})
		
	

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

UIService['UI_FollowHand_UI'] = FollowHand_UI_Generate;