
 

 @UIBind('UI/ShareUI/card/AvatarFrame_UI.ui')
 export default class AvatarFrame_UI_Generate extends UIScript {
	 	private canvas_avatarFrame_Internal: mw.Canvas
	public get canvas_avatarFrame(): mw.Canvas {
		if(!this.canvas_avatarFrame_Internal&&this.uiWidgetBase) {
			this.canvas_avatarFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame') as mw.Canvas
		}
		return this.canvas_avatarFrame_Internal
	}
	private img_frameBg_Internal: mw.Image
	public get img_frameBg(): mw.Image {
		if(!this.img_frameBg_Internal&&this.uiWidgetBase) {
			this.img_frameBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/img_frameBg') as mw.Image
		}
		return this.img_frameBg_Internal
	}
	private img_frameBg2_Internal: mw.Image
	public get img_frameBg2(): mw.Image {
		if(!this.img_frameBg2_Internal&&this.uiWidgetBase) {
			this.img_frameBg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/img_frameBg2') as mw.Image
		}
		return this.img_frameBg2_Internal
	}
	private img_bg00_Internal: mw.Image
	public get img_bg00(): mw.Image {
		if(!this.img_bg00_Internal&&this.uiWidgetBase) {
			this.img_bg00_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/img_bg00') as mw.Image
		}
		return this.img_bg00_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private img_br2_Internal: mw.Image
	public get img_br2(): mw.Image {
		if(!this.img_br2_Internal&&this.uiWidgetBase) {
			this.img_br2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/img_br2') as mw.Image
		}
		return this.img_br2_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private scrollBox_Internal: mw.ScrollBox
	public get scrollBox(): mw.ScrollBox {
		if(!this.scrollBox_Internal&&this.uiWidgetBase) {
			this.scrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/scrollBox') as mw.ScrollBox
		}
		return this.scrollBox_Internal
	}
	private canvas_frameItem_Internal: mw.Canvas
	public get canvas_frameItem(): mw.Canvas {
		if(!this.canvas_frameItem_Internal&&this.uiWidgetBase) {
			this.canvas_frameItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/scrollBox/canvas_frameItem') as mw.Canvas
		}
		return this.canvas_frameItem_Internal
	}
	private canvas_sidebar_Internal: mw.Canvas
	public get canvas_sidebar(): mw.Canvas {
		if(!this.canvas_sidebar_Internal&&this.uiWidgetBase) {
			this.canvas_sidebar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/canvas_sidebar') as mw.Canvas
		}
		return this.canvas_sidebar_Internal
	}
	private btn_change_Internal: mw.Button
	public get btn_change(): mw.Button {
		if(!this.btn_change_Internal&&this.uiWidgetBase) {
			this.btn_change_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/canvas_sidebar/btn_change') as mw.Button
		}
		return this.btn_change_Internal
	}
	private text_change_Internal: mw.TextBlock
	public get text_change(): mw.TextBlock {
		if(!this.text_change_Internal&&this.uiWidgetBase) {
			this.text_change_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/canvas_sidebar/text_change') as mw.TextBlock
		}
		return this.text_change_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/canvas_sidebar/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private resourceTxt_Internal: mw.TextBlock
	public get resourceTxt(): mw.TextBlock {
		if(!this.resourceTxt_Internal&&this.uiWidgetBase) {
			this.resourceTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/canvas_sidebar/resourceTxt') as mw.TextBlock
		}
		return this.resourceTxt_Internal
	}
	private img_avatarFrame_Internal: mw.Image
	public get img_avatarFrame(): mw.Image {
		if(!this.img_avatarFrame_Internal&&this.uiWidgetBase) {
			this.img_avatarFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_avatarFrame/canvas_sidebar/img_avatarFrame') as mw.Image
		}
		return this.img_avatarFrame_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AvatarFrame_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_change.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AvatarFrame_UI_btn_change");
		})
		this.btn_change.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_change.onPressed.add(() => {
			this.btn_change["preScale"] = this.btn_change.renderScale;
			this.btn_change.renderScale = Vector2.one.set(this.btn_change["preScale"]).multiply(1.1);
		})
		this.btn_change.onReleased.add(() => {
			this.btn_change.renderScale = this.btn_change["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_title)
		this.text_title.isRichText = true;
		
	
		this.initLanguage(this.text_change)
		this.text_change.isRichText = true;
		
	
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
		this.initLanguage(this.resourceTxt)
		this.resourceTxt.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AvatarFrame_UI'] = AvatarFrame_UI_Generate;