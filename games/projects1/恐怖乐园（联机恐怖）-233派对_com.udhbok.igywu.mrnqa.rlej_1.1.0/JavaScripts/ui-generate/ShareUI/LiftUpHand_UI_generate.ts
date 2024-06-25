
 

 @UIBind('UI/ShareUI/LiftUpHand_UI.ui')
 export default class LiftUpHand_UI_Generate extends UIScript {
	 	private btn_liftUpHand_Internal: mw.Button
	public get btn_liftUpHand(): mw.Button {
		if(!this.btn_liftUpHand_Internal&&this.uiWidgetBase) {
			this.btn_liftUpHand_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_liftUpHand') as mw.Button
		}
		return this.btn_liftUpHand_Internal
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
		
		this.btn_liftUpHand.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "LiftUpHand_UI_btn_liftUpHand");
		})
		this.btn_liftUpHand.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_liftUpHand.onPressed.add(() => {
			this.btn_liftUpHand["preScale"] = this.btn_liftUpHand.renderScale;
			this.btn_liftUpHand.renderScale = Vector2.one.set(this.btn_liftUpHand["preScale"]).multiply(1.1);
		})
		this.btn_liftUpHand.onReleased.add(() => {
			this.btn_liftUpHand.renderScale = this.btn_liftUpHand["preScale"];
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

UIService['UI_LiftUpHand_UI'] = LiftUpHand_UI_Generate;