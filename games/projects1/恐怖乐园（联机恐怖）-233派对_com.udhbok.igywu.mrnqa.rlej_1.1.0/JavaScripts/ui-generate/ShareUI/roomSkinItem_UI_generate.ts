
 

 @UIBind('UI/ShareUI/roomSkinItem_UI.ui')
 export default class roomSkinItem_UI_Generate extends UIScript {
	 	private img_itembg_Internal: mw.Image
	public get img_itembg(): mw.Image {
		if(!this.img_itembg_Internal&&this.uiWidgetBase) {
			this.img_itembg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/img_itembg') as mw.Image
		}
		return this.img_itembg_Internal
	}
	private img_roomIcon_Internal: mw.Image
	public get img_roomIcon(): mw.Image {
		if(!this.img_roomIcon_Internal&&this.uiWidgetBase) {
			this.img_roomIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/img_roomIcon') as mw.Image
		}
		return this.img_roomIcon_Internal
	}
	private img_btn_Internal: mw.Button
	public get img_btn(): mw.Button {
		if(!this.img_btn_Internal&&this.uiWidgetBase) {
			this.img_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/img_btn') as mw.Button
		}
		return this.img_btn_Internal
	}
	private img_text_bg_Internal: mw.Image
	public get img_text_bg(): mw.Image {
		if(!this.img_text_bg_Internal&&this.uiWidgetBase) {
			this.img_text_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/img_text_bg') as mw.Image
		}
		return this.img_text_bg_Internal
	}
	private text_skinName_Internal: mw.TextBlock
	public get text_skinName(): mw.TextBlock {
		if(!this.text_skinName_Internal&&this.uiWidgetBase) {
			this.text_skinName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/text_skinName') as mw.TextBlock
		}
		return this.text_skinName_Internal
	}
	private text_nowUse_Internal: mw.TextBlock
	public get text_nowUse(): mw.TextBlock {
		if(!this.text_nowUse_Internal&&this.uiWidgetBase) {
			this.text_nowUse_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/text_nowUse') as mw.TextBlock
		}
		return this.text_nowUse_Internal
	}
	private btn_changeThisSkin_Internal: mw.StaleButton
	public get btn_changeThisSkin(): mw.StaleButton {
		if(!this.btn_changeThisSkin_Internal&&this.uiWidgetBase) {
			this.btn_changeThisSkin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_2/btn_changeThisSkin') as mw.StaleButton
		}
		return this.btn_changeThisSkin_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_changeThisSkin.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "roomSkinItem_UI_btn_changeThisSkin");
		})
		this.initLanguage(this.btn_changeThisSkin);
		this.btn_changeThisSkin.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_changeThisSkin.onPressed.add(() => {
			this.btn_changeThisSkin["preScale"] = this.btn_changeThisSkin.renderScale;
			this.btn_changeThisSkin.renderScale = Vector2.one.set(this.btn_changeThisSkin["preScale"]).multiply(1.1);
		})
		this.btn_changeThisSkin.onReleased.add(() => {
			this.btn_changeThisSkin.renderScale = this.btn_changeThisSkin["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.img_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "roomSkinItem_UI_img_btn");
		})
		this.img_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.img_btn.onPressed.add(() => {
			this.img_btn["preScale"] = this.img_btn.renderScale;
			this.img_btn.renderScale = Vector2.one.set(this.img_btn["preScale"]).multiply(1.1);
		})
		this.img_btn.onReleased.add(() => {
			this.img_btn.renderScale = this.img_btn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_skinName)
		this.text_skinName.isRichText = true;
		
	
		this.initLanguage(this.text_nowUse)
		this.text_nowUse.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_roomSkinItem_UI'] = roomSkinItem_UI_Generate;