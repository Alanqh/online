
 

 @UIBind('UI/ShareUI/card/LevelItem.ui')
 export default class LevelItem_Generate extends UIScript {
	 	private imgBtn_Internal: mw.Button
	public get imgBtn(): mw.Button {
		if(!this.imgBtn_Internal&&this.uiWidgetBase) {
			this.imgBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imgBtn') as mw.Button
		}
		return this.imgBtn_Internal
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
		
		this.imgBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "LevelItem_imgBtn");
		})
		this.imgBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.imgBtn.onPressed.add(() => {
			this.imgBtn["preScale"] = this.imgBtn.renderScale;
			this.imgBtn.renderScale = Vector2.one.set(this.imgBtn["preScale"]).multiply(1.1);
		})
		this.imgBtn.onReleased.add(() => {
			this.imgBtn.renderScale = this.imgBtn["preScale"];
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

UIService['UI_LevelItem'] = LevelItem_Generate;