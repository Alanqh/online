
 

 @UIBind('UI/ShareUI/weaponupgrade/WeaponUpgrade_UI.ui')
 export default class WeaponUpgrade_UI_Generate extends UIScript {
	 	private mCanvas_Top_Internal: mw.Canvas
	public get mCanvas_Top(): mw.Canvas {
		if(!this.mCanvas_Top_Internal&&this.uiWidgetBase) {
			this.mCanvas_Top_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Top') as mw.Canvas
		}
		return this.mCanvas_Top_Internal
	}
	private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Top/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private canvas_back_Internal: mw.Canvas
	public get canvas_back(): mw.Canvas {
		if(!this.canvas_back_Internal&&this.uiWidgetBase) {
			this.canvas_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Top/canvas_back') as mw.Canvas
		}
		return this.canvas_back_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Top/canvas_back/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private text_back_Internal: mw.TextBlock
	public get text_back(): mw.TextBlock {
		if(!this.text_back_Internal&&this.uiWidgetBase) {
			this.text_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Top/canvas_back/text_back') as mw.TextBlock
		}
		return this.text_back_Internal
	}
	private img_back_Internal: mw.Image
	public get img_back(): mw.Image {
		if(!this.img_back_Internal&&this.uiWidgetBase) {
			this.img_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Top/canvas_back/img_back') as mw.Image
		}
		return this.img_back_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_line1_Internal: mw.Image
	public get img_line1(): mw.Image {
		if(!this.img_line1_Internal&&this.uiWidgetBase) {
			this.img_line1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_line1') as mw.Image
		}
		return this.img_line1_Internal
	}
	private mCanvas_Weapon_Internal: mw.Canvas
	public get mCanvas_Weapon(): mw.Canvas {
		if(!this.mCanvas_Weapon_Internal&&this.uiWidgetBase) {
			this.mCanvas_Weapon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Weapon') as mw.Canvas
		}
		return this.mCanvas_Weapon_Internal
	}
	private mText_Subtitle_Internal: mw.TextBlock
	public get mText_Subtitle(): mw.TextBlock {
		if(!this.mText_Subtitle_Internal&&this.uiWidgetBase) {
			this.mText_Subtitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Weapon/mText_Subtitle') as mw.TextBlock
		}
		return this.mText_Subtitle_Internal
	}
	private mCanvas_WeaponAll_Internal: mw.Canvas
	public get mCanvas_WeaponAll(): mw.Canvas {
		if(!this.mCanvas_WeaponAll_Internal&&this.uiWidgetBase) {
			this.mCanvas_WeaponAll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Weapon/mCanvas_WeaponAll') as mw.Canvas
		}
		return this.mCanvas_WeaponAll_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Weapon/mCanvas_WeaponAll/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_WeaponList_Internal: mw.Canvas
	public get mCanvas_WeaponList(): mw.Canvas {
		if(!this.mCanvas_WeaponList_Internal&&this.uiWidgetBase) {
			this.mCanvas_WeaponList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Weapon/mCanvas_WeaponAll/mScrollBox/mCanvas_WeaponList') as mw.Canvas
		}
		return this.mCanvas_WeaponList_Internal
	}
	private img_bg4_Internal: mw.Image
	public get img_bg4(): mw.Image {
		if(!this.img_bg4_Internal&&this.uiWidgetBase) {
			this.img_bg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg4') as mw.Image
		}
		return this.img_bg4_Internal
	}
	private img_bg2_1_2_Internal: mw.Image
	public get img_bg2_1_2(): mw.Image {
		if(!this.img_bg2_1_2_Internal&&this.uiWidgetBase) {
			this.img_bg2_1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg2_1_2') as mw.Image
		}
		return this.img_bg2_1_2_Internal
	}
	private mCanvas_UpgradeDetail_Internal: mw.Canvas
	public get mCanvas_UpgradeDetail(): mw.Canvas {
		if(!this.mCanvas_UpgradeDetail_Internal&&this.uiWidgetBase) {
			this.mCanvas_UpgradeDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UpgradeDetail') as mw.Canvas
		}
		return this.mCanvas_UpgradeDetail_Internal
	}
	private mText_WeaponLevel_Internal: mw.TextBlock
	public get mText_WeaponLevel(): mw.TextBlock {
		if(!this.mText_WeaponLevel_Internal&&this.uiWidgetBase) {
			this.mText_WeaponLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UpgradeDetail/mText_WeaponLevel') as mw.TextBlock
		}
		return this.mText_WeaponLevel_Internal
	}
	private mText_WeaponAttack_Internal: mw.TextBlock
	public get mText_WeaponAttack(): mw.TextBlock {
		if(!this.mText_WeaponAttack_Internal&&this.uiWidgetBase) {
			this.mText_WeaponAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UpgradeDetail/mText_WeaponAttack') as mw.TextBlock
		}
		return this.mText_WeaponAttack_Internal
	}
	private mText_WeaponBackup_Internal: mw.TextBlock
	public get mText_WeaponBackup(): mw.TextBlock {
		if(!this.mText_WeaponBackup_Internal&&this.uiWidgetBase) {
			this.mText_WeaponBackup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UpgradeDetail/mText_WeaponBackup') as mw.TextBlock
		}
		return this.mText_WeaponBackup_Internal
	}
	private mText_WeaponSpeed_Internal: mw.TextBlock
	public get mText_WeaponSpeed(): mw.TextBlock {
		if(!this.mText_WeaponSpeed_Internal&&this.uiWidgetBase) {
			this.mText_WeaponSpeed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UpgradeDetail/mText_WeaponSpeed') as mw.TextBlock
		}
		return this.mText_WeaponSpeed_Internal
	}
	private mText_WeaponHeadshot_Internal: mw.TextBlock
	public get mText_WeaponHeadshot(): mw.TextBlock {
		if(!this.mText_WeaponHeadshot_Internal&&this.uiWidgetBase) {
			this.mText_WeaponHeadshot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UpgradeDetail/mText_WeaponHeadshot') as mw.TextBlock
		}
		return this.mText_WeaponHeadshot_Internal
	}
	private mText_WeaponName_Internal: mw.TextBlock
	public get mText_WeaponName(): mw.TextBlock {
		if(!this.mText_WeaponName_Internal&&this.uiWidgetBase) {
			this.mText_WeaponName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_WeaponName') as mw.TextBlock
		}
		return this.mText_WeaponName_Internal
	}
	private canvas_Upgrade_Internal: mw.Canvas
	public get canvas_Upgrade(): mw.Canvas {
		if(!this.canvas_Upgrade_Internal&&this.uiWidgetBase) {
			this.canvas_Upgrade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade') as mw.Canvas
		}
		return this.canvas_Upgrade_Internal
	}
	private btn_Upgrade_Internal: mw.Button
	public get btn_Upgrade(): mw.Button {
		if(!this.btn_Upgrade_Internal&&this.uiWidgetBase) {
			this.btn_Upgrade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/btn_Upgrade') as mw.Button
		}
		return this.btn_Upgrade_Internal
	}
	private text_Upgrade_Internal: mw.TextBlock
	public get text_Upgrade(): mw.TextBlock {
		if(!this.text_Upgrade_Internal&&this.uiWidgetBase) {
			this.text_Upgrade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/btn_Upgrade/text_Upgrade') as mw.TextBlock
		}
		return this.text_Upgrade_Internal
	}
	private mCanvas_UpgradeItem_Internal: mw.Canvas
	public get mCanvas_UpgradeItem(): mw.Canvas {
		if(!this.mCanvas_UpgradeItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_UpgradeItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem') as mw.Canvas
		}
		return this.mCanvas_UpgradeItem_Internal
	}
	private img_itembg1_Internal: mw.Image
	public get img_itembg1(): mw.Image {
		if(!this.img_itembg1_Internal&&this.uiWidgetBase) {
			this.img_itembg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem/img_itembg1') as mw.Image
		}
		return this.img_itembg1_Internal
	}
	private img_UpgradeIcon1_Internal: mw.Image
	public get img_UpgradeIcon1(): mw.Image {
		if(!this.img_UpgradeIcon1_Internal&&this.uiWidgetBase) {
			this.img_UpgradeIcon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem/img_UpgradeIcon1') as mw.Image
		}
		return this.img_UpgradeIcon1_Internal
	}
	private text_UpgradeNum1_Internal: mw.TextBlock
	public get text_UpgradeNum1(): mw.TextBlock {
		if(!this.text_UpgradeNum1_Internal&&this.uiWidgetBase) {
			this.text_UpgradeNum1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem/text_UpgradeNum1') as mw.TextBlock
		}
		return this.text_UpgradeNum1_Internal
	}
	private mBtntext_UpgradeNum1_Internal: mw.Button
	public get mBtntext_UpgradeNum1(): mw.Button {
		if(!this.mBtntext_UpgradeNum1_Internal&&this.uiWidgetBase) {
			this.mBtntext_UpgradeNum1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem/mBtntext_UpgradeNum1') as mw.Button
		}
		return this.mBtntext_UpgradeNum1_Internal
	}
	private mCanvas_UpgradeItem2_Internal: mw.Canvas
	public get mCanvas_UpgradeItem2(): mw.Canvas {
		if(!this.mCanvas_UpgradeItem2_Internal&&this.uiWidgetBase) {
			this.mCanvas_UpgradeItem2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem2') as mw.Canvas
		}
		return this.mCanvas_UpgradeItem2_Internal
	}
	private img_itembg2_Internal: mw.Image
	public get img_itembg2(): mw.Image {
		if(!this.img_itembg2_Internal&&this.uiWidgetBase) {
			this.img_itembg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem2/img_itembg2') as mw.Image
		}
		return this.img_itembg2_Internal
	}
	private img_UpgradeIcon2_Internal: mw.Image
	public get img_UpgradeIcon2(): mw.Image {
		if(!this.img_UpgradeIcon2_Internal&&this.uiWidgetBase) {
			this.img_UpgradeIcon2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem2/img_UpgradeIcon2') as mw.Image
		}
		return this.img_UpgradeIcon2_Internal
	}
	private text_UpgradeNum2_Internal: mw.TextBlock
	public get text_UpgradeNum2(): mw.TextBlock {
		if(!this.text_UpgradeNum2_Internal&&this.uiWidgetBase) {
			this.text_UpgradeNum2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem2/text_UpgradeNum2') as mw.TextBlock
		}
		return this.text_UpgradeNum2_Internal
	}
	private mBtntext_UpgradeNum2_Internal: mw.Button
	public get mBtntext_UpgradeNum2(): mw.Button {
		if(!this.mBtntext_UpgradeNum2_Internal&&this.uiWidgetBase) {
			this.mBtntext_UpgradeNum2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Upgrade/mCanvas_UpgradeItem2/mBtntext_UpgradeNum2') as mw.Button
		}
		return this.mBtntext_UpgradeNum2_Internal
	}
	private canvas_UpgradeSP_Internal: mw.Canvas
	public get canvas_UpgradeSP(): mw.Canvas {
		if(!this.canvas_UpgradeSP_Internal&&this.uiWidgetBase) {
			this.canvas_UpgradeSP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_UpgradeSP') as mw.Canvas
		}
		return this.canvas_UpgradeSP_Internal
	}
	private btn_UpgradeSP_Internal: mw.Button
	public get btn_UpgradeSP(): mw.Button {
		if(!this.btn_UpgradeSP_Internal&&this.uiWidgetBase) {
			this.btn_UpgradeSP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_UpgradeSP/btn_UpgradeSP') as mw.Button
		}
		return this.btn_UpgradeSP_Internal
	}
	private text_UpgradeSP_Internal: mw.TextBlock
	public get text_UpgradeSP(): mw.TextBlock {
		if(!this.text_UpgradeSP_Internal&&this.uiWidgetBase) {
			this.text_UpgradeSP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_UpgradeSP/btn_UpgradeSP/text_UpgradeSP') as mw.TextBlock
		}
		return this.text_UpgradeSP_Internal
	}
	private img_UpgradeIconSP_Internal: mw.Image
	public get img_UpgradeIconSP(): mw.Image {
		if(!this.img_UpgradeIconSP_Internal&&this.uiWidgetBase) {
			this.img_UpgradeIconSP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_UpgradeSP/img_UpgradeIconSP') as mw.Image
		}
		return this.img_UpgradeIconSP_Internal
	}
	private text_UpgradeNumSP_Internal: mw.TextBlock
	public get text_UpgradeNumSP(): mw.TextBlock {
		if(!this.text_UpgradeNumSP_Internal&&this.uiWidgetBase) {
			this.text_UpgradeNumSP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_UpgradeSP/text_UpgradeNumSP') as mw.TextBlock
		}
		return this.text_UpgradeNumSP_Internal
	}
	private mText_LevelMax_Internal: mw.TextBlock
	public get mText_LevelMax(): mw.TextBlock {
		if(!this.mText_LevelMax_Internal&&this.uiWidgetBase) {
			this.mText_LevelMax_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_LevelMax') as mw.TextBlock
		}
		return this.mText_LevelMax_Internal
	}
	private mCanvas_NextG_Internal: mw.Canvas
	public get mCanvas_NextG(): mw.Canvas {
		if(!this.mCanvas_NextG_Internal&&this.uiWidgetBase) {
			this.mCanvas_NextG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_NextG') as mw.Canvas
		}
		return this.mCanvas_NextG_Internal
	}
	private text_nextLevel_Internal: mw.TextBlock
	public get text_nextLevel(): mw.TextBlock {
		if(!this.text_nextLevel_Internal&&this.uiWidgetBase) {
			this.text_nextLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_NextG/text_nextLevel') as mw.TextBlock
		}
		return this.text_nextLevel_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "WeaponUpgrade_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_Upgrade.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "WeaponUpgrade_UI_btn_Upgrade");
		})
		this.btn_Upgrade.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_Upgrade.onPressed.add(() => {
			this.btn_Upgrade["preScale"] = this.btn_Upgrade.renderScale;
			this.btn_Upgrade.renderScale = Vector2.one.set(this.btn_Upgrade["preScale"]).multiply(1.1);
		})
		this.btn_Upgrade.onReleased.add(() => {
			this.btn_Upgrade.renderScale = this.btn_Upgrade["preScale"];
		})
		
	
		this.mBtntext_UpgradeNum1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "WeaponUpgrade_UI_mBtntext_UpgradeNum1");
		})
		this.mBtntext_UpgradeNum1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtntext_UpgradeNum1.onPressed.add(() => {
			this.mBtntext_UpgradeNum1["preScale"] = this.mBtntext_UpgradeNum1.renderScale;
			this.mBtntext_UpgradeNum1.renderScale = Vector2.one.set(this.mBtntext_UpgradeNum1["preScale"]).multiply(1.1);
		})
		this.mBtntext_UpgradeNum1.onReleased.add(() => {
			this.mBtntext_UpgradeNum1.renderScale = this.mBtntext_UpgradeNum1["preScale"];
		})
		
	
		this.mBtntext_UpgradeNum2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "WeaponUpgrade_UI_mBtntext_UpgradeNum2");
		})
		this.mBtntext_UpgradeNum2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtntext_UpgradeNum2.onPressed.add(() => {
			this.mBtntext_UpgradeNum2["preScale"] = this.mBtntext_UpgradeNum2.renderScale;
			this.mBtntext_UpgradeNum2.renderScale = Vector2.one.set(this.mBtntext_UpgradeNum2["preScale"]).multiply(1.1);
		})
		this.mBtntext_UpgradeNum2.onReleased.add(() => {
			this.mBtntext_UpgradeNum2.renderScale = this.mBtntext_UpgradeNum2["preScale"];
		})
		
	
		this.btn_UpgradeSP.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "WeaponUpgrade_UI_btn_UpgradeSP");
		})
		this.btn_UpgradeSP.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_UpgradeSP.onPressed.add(() => {
			this.btn_UpgradeSP["preScale"] = this.btn_UpgradeSP.renderScale;
			this.btn_UpgradeSP.renderScale = Vector2.one.set(this.btn_UpgradeSP["preScale"]).multiply(1.1);
		})
		this.btn_UpgradeSP.onReleased.add(() => {
			this.btn_UpgradeSP.renderScale = this.btn_UpgradeSP["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mText_Title)
		this.mText_Title.isRichText = true;
		
	
		this.initLanguage(this.text_back)
		this.text_back.isRichText = true;
		
	
		this.initLanguage(this.mText_Subtitle)
		this.mText_Subtitle.isRichText = true;
		
	
		this.initLanguage(this.mText_WeaponLevel)
		this.mText_WeaponLevel.isRichText = true;
		
	
		this.initLanguage(this.mText_WeaponAttack)
		this.mText_WeaponAttack.isRichText = true;
		
	
		this.initLanguage(this.mText_WeaponBackup)
		this.mText_WeaponBackup.isRichText = true;
		
	
		this.initLanguage(this.mText_WeaponSpeed)
		this.mText_WeaponSpeed.isRichText = true;
		
	
		this.initLanguage(this.mText_WeaponHeadshot)
		this.mText_WeaponHeadshot.isRichText = true;
		
	
		this.initLanguage(this.mText_WeaponName)
		this.mText_WeaponName.isRichText = true;
		
	
		this.initLanguage(this.text_Upgrade)
		this.text_Upgrade.isRichText = true;
		
	
		this.initLanguage(this.text_UpgradeNum1)
		this.text_UpgradeNum1.isRichText = true;
		
	
		this.initLanguage(this.text_UpgradeNum2)
		this.text_UpgradeNum2.isRichText = true;
		
	
		this.initLanguage(this.text_UpgradeSP)
		this.text_UpgradeSP.isRichText = true;
		
	
		this.initLanguage(this.text_UpgradeNumSP)
		this.text_UpgradeNumSP.isRichText = true;
		
	
		this.initLanguage(this.mText_LevelMax)
		this.mText_LevelMax.isRichText = true;
		
	
		this.initLanguage(this.text_nextLevel)
		this.text_nextLevel.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_WeaponUpgrade_UI'] = WeaponUpgrade_UI_Generate;