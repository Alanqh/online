




@UIBind('UI/Prefabs/PlayerController/UI/PlayerController.ui')
export default class PlayerController_Generate extends UIScript {
		private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private joyCon_Internal: mw.VirtualJoystickPanel
	public get joyCon(): mw.VirtualJoystickPanel {
		if(!this.joyCon_Internal&&this.uiWidgetBase) {
			this.joyCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/joyCon') as mw.VirtualJoystickPanel
		}
		return this.joyCon_Internal
	}
	private mHitBtn_Internal: mw.Button
	public get mHitBtn(): mw.Button {
		if(!this.mHitBtn_Internal&&this.uiWidgetBase) {
			this.mHitBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_5/mHitBtn') as mw.Button
		}
		return this.mHitBtn_Internal
	}
	private btnJump_Internal: mw.Button
	public get btnJump(): mw.Button {
		if(!this.btnJump_Internal&&this.uiWidgetBase) {
			this.btnJump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_5/btnJump') as mw.Button
		}
		return this.btnJump_Internal
	}
	private btn_Force_Internal: mw.Image
	public get btn_Force(): mw.Image {
		if(!this.btn_Force_Internal&&this.uiWidgetBase) {
			this.btn_Force_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_5/btn_Force') as mw.Image
		}
		return this.btn_Force_Internal
	}
	private btn_Jump_Internal: mw.Image
	public get btn_Jump(): mw.Image {
		if(!this.btn_Jump_Internal&&this.uiWidgetBase) {
			this.btn_Jump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_5/btn_Jump') as mw.Image
		}
		return this.btn_Jump_Internal
	}
	private skillCanvas_Internal: mw.Canvas
	public get skillCanvas(): mw.Canvas {
		if(!this.skillCanvas_Internal&&this.uiWidgetBase) {
			this.skillCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/skillCanvas') as mw.Canvas
		}
		return this.skillCanvas_Internal
	}
	private mSkillBtn_Internal: mw.MaskButton
	public get mSkillBtn(): mw.MaskButton {
		if(!this.mSkillBtn_Internal&&this.uiWidgetBase) {
			this.mSkillBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/skillCanvas/mSkillBtn') as mw.MaskButton
		}
		return this.mSkillBtn_Internal
	}
	private mCDImg_Internal: mw.Image
	public get mCDImg(): mw.Image {
		if(!this.mCDImg_Internal&&this.uiWidgetBase) {
			this.mCDImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/skillCanvas/mCDImg') as mw.Image
		}
		return this.mCDImg_Internal
	}
	private mCDText_Internal: mw.TextBlock
	public get mCDText(): mw.TextBlock {
		if(!this.mCDText_Internal&&this.uiWidgetBase) {
			this.mCDText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/skillCanvas/mCDText') as mw.TextBlock
		}
		return this.mCDText_Internal
	}
	private scoreCVS_Internal: mw.Canvas
	public get scoreCVS(): mw.Canvas {
		if(!this.scoreCVS_Internal&&this.uiWidgetBase) {
			this.scoreCVS_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scoreCVS') as mw.Canvas
		}
		return this.scoreCVS_Internal
	}
	private btnGiveUp_Internal: mw.Button
	public get btnGiveUp(): mw.Button {
		if(!this.btnGiveUp_Internal&&this.uiWidgetBase) {
			this.btnGiveUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scoreCVS/btnGiveUp') as mw.Button
		}
		return this.btnGiveUp_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.mHitBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.btnJump.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.btnGiveUp.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mCDText)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 