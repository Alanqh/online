
 

 @UIBind('UI/ShareUI/weaponupgrade/WeaponUpgradeItem_UI.ui')
 export default class WeaponUpgradeItem_UI_Generate extends UIScript {
	 	private mCanvasWeaponItem_Internal: mw.Canvas
	public get mCanvasWeaponItem(): mw.Canvas {
		if(!this.mCanvasWeaponItem_Internal&&this.uiWidgetBase) {
			this.mCanvasWeaponItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem') as mw.Canvas
		}
		return this.mCanvasWeaponItem_Internal
	}
	private bG2_Internal: mw.Image
	public get bG2(): mw.Image {
		if(!this.bG2_Internal&&this.uiWidgetBase) {
			this.bG2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/bG2') as mw.Image
		}
		return this.bG2_Internal
	}
	private mImage_Icon_Internal: mw.Image
	public get mImage_Icon(): mw.Image {
		if(!this.mImage_Icon_Internal&&this.uiWidgetBase) {
			this.mImage_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/mImage_Icon') as mw.Image
		}
		return this.mImage_Icon_Internal
	}
	private triggerBtn_Internal: mw.Button
	public get triggerBtn(): mw.Button {
		if(!this.triggerBtn_Internal&&this.uiWidgetBase) {
			this.triggerBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/triggerBtn') as mw.Button
		}
		return this.triggerBtn_Internal
	}
	private mText_WeaponName_Internal: mw.TextBlock
	public get mText_WeaponName(): mw.TextBlock {
		if(!this.mText_WeaponName_Internal&&this.uiWidgetBase) {
			this.mText_WeaponName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/mText_WeaponName') as mw.TextBlock
		}
		return this.mText_WeaponName_Internal
	}
	private mText_MAX_Internal: mw.TextBlock
	public get mText_MAX(): mw.TextBlock {
		if(!this.mText_MAX_Internal&&this.uiWidgetBase) {
			this.mText_MAX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/mText_MAX') as mw.TextBlock
		}
		return this.mText_MAX_Internal
	}
	private mText_ULTRA_Internal: mw.TextBlock
	public get mText_ULTRA(): mw.TextBlock {
		if(!this.mText_ULTRA_Internal&&this.uiWidgetBase) {
			this.mText_ULTRA_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/mText_ULTRA') as mw.TextBlock
		}
		return this.mText_ULTRA_Internal
	}
	private mCanvas_Locked_Internal: mw.Canvas
	public get mCanvas_Locked(): mw.Canvas {
		if(!this.mCanvas_Locked_Internal&&this.uiWidgetBase) {
			this.mCanvas_Locked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/mCanvas_Locked') as mw.Canvas
		}
		return this.mCanvas_Locked_Internal
	}
	private mImg_Locked_Internal: mw.Image
	public get mImg_Locked(): mw.Image {
		if(!this.mImg_Locked_Internal&&this.uiWidgetBase) {
			this.mImg_Locked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/mCanvas_Locked/mImg_Locked') as mw.Image
		}
		return this.mImg_Locked_Internal
	}
	private mImg_Locker_Internal: mw.Image
	public get mImg_Locker(): mw.Image {
		if(!this.mImg_Locker_Internal&&this.uiWidgetBase) {
			this.mImg_Locker_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasWeaponItem/mCanvas_Locked/mImg_Locker') as mw.Image
		}
		return this.mImg_Locker_Internal
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
		
		this.triggerBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "WeaponUpgradeItem_UI_triggerBtn");
		})
		this.triggerBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.triggerBtn.onPressed.add(() => {
			this.triggerBtn["preScale"] = this.triggerBtn.renderScale;
			this.triggerBtn.renderScale = Vector2.one.set(this.triggerBtn["preScale"]).multiply(1.1);
		})
		this.triggerBtn.onReleased.add(() => {
			this.triggerBtn.renderScale = this.triggerBtn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mText_WeaponName)
		this.mText_WeaponName.isRichText = true;
		
	
		this.initLanguage(this.mText_MAX)
		this.mText_MAX.isRichText = true;
		
	
		this.initLanguage(this.mText_ULTRA)
		this.mText_ULTRA.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_WeaponUpgradeItem_UI'] = WeaponUpgradeItem_UI_Generate;