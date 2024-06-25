
 

 @UIBind('UI/ShareUI/Find相关UI/Teach_txt_UI.ui')
 export default class Teach_txt_UI_Generate extends UIScript {
	 	private title_Internal: mw.TextBlock
	public get title(): mw.TextBlock {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/title') as mw.TextBlock
		}
		return this.title_Internal
	}
	private content_Internal: mw.TextBlock
	public get content(): mw.TextBlock {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/content') as mw.TextBlock
		}
		return this.content_Internal
	}
	private btn_skip_Internal: mw.Button
	public get btn_skip(): mw.Button {
		if(!this.btn_skip_Internal&&this.uiWidgetBase) {
			this.btn_skip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_skip') as mw.Button
		}
		return this.btn_skip_Internal
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
		
		this.btn_skip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Teach_txt_UI_btn_skip");
		})
		this.btn_skip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_skip.onPressed.add(() => {
			this.btn_skip["preScale"] = this.btn_skip.renderScale;
			this.btn_skip.renderScale = Vector2.one.set(this.btn_skip["preScale"]).multiply(1.1);
		})
		this.btn_skip.onReleased.add(() => {
			this.btn_skip.renderScale = this.btn_skip["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.title)
		this.title.isRichText = true;
		
	
		this.initLanguage(this.content)
		this.content.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Teach_txt_UI'] = Teach_txt_UI_Generate;