
 

 @UIBind('UI/ShareUI/utils/DebugWeapon.ui')
 export default class DebugWeapon_Generate extends UIScript {
	 	private rotCanvas_Internal: mw.Canvas
	public get rotCanvas(): mw.Canvas {
		if(!this.rotCanvas_Internal&&this.uiWidgetBase) {
			this.rotCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rotCanvas') as mw.Canvas
		}
		return this.rotCanvas_Internal
	}
	private rotBarCan_Internal: mw.Canvas
	public get rotBarCan(): mw.Canvas {
		if(!this.rotBarCan_Internal&&this.uiWidgetBase) {
			this.rotBarCan_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rotCanvas/rotBarCan') as mw.Canvas
		}
		return this.rotBarCan_Internal
	}
	private rotInputCan_Internal: mw.Canvas
	public get rotInputCan(): mw.Canvas {
		if(!this.rotInputCan_Internal&&this.uiWidgetBase) {
			this.rotInputCan_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rotCanvas/rotInputCan') as mw.Canvas
		}
		return this.rotInputCan_Internal
	}
	private rotDropBtn_Internal: mw.Dropdown
	public get rotDropBtn(): mw.Dropdown {
		if(!this.rotDropBtn_Internal&&this.uiWidgetBase) {
			this.rotDropBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rotCanvas/rotDropBtn') as mw.Dropdown
		}
		return this.rotDropBtn_Internal
	}
	private rotCopyBtn_Internal: mw.StaleButton
	public get rotCopyBtn(): mw.StaleButton {
		if(!this.rotCopyBtn_Internal&&this.uiWidgetBase) {
			this.rotCopyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rotCanvas/rotCopyBtn') as mw.StaleButton
		}
		return this.rotCopyBtn_Internal
	}
	private rotPasteBtn_Internal: mw.StaleButton
	public get rotPasteBtn(): mw.StaleButton {
		if(!this.rotPasteBtn_Internal&&this.uiWidgetBase) {
			this.rotPasteBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rotCanvas/rotPasteBtn') as mw.StaleButton
		}
		return this.rotPasteBtn_Internal
	}
	private posCan_Internal: mw.Canvas
	public get posCan(): mw.Canvas {
		if(!this.posCan_Internal&&this.uiWidgetBase) {
			this.posCan_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/posCan') as mw.Canvas
		}
		return this.posCan_Internal
	}
	private posBarCan_Internal: mw.Canvas
	public get posBarCan(): mw.Canvas {
		if(!this.posBarCan_Internal&&this.uiWidgetBase) {
			this.posBarCan_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/posCan/posBarCan') as mw.Canvas
		}
		return this.posBarCan_Internal
	}
	private posInputCan_Internal: mw.Canvas
	public get posInputCan(): mw.Canvas {
		if(!this.posInputCan_Internal&&this.uiWidgetBase) {
			this.posInputCan_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/posCan/posInputCan') as mw.Canvas
		}
		return this.posInputCan_Internal
	}
	private posDropBtn_Internal: mw.Dropdown
	public get posDropBtn(): mw.Dropdown {
		if(!this.posDropBtn_Internal&&this.uiWidgetBase) {
			this.posDropBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/posCan/posDropBtn') as mw.Dropdown
		}
		return this.posDropBtn_Internal
	}
	private posCopyBtn_Internal: mw.StaleButton
	public get posCopyBtn(): mw.StaleButton {
		if(!this.posCopyBtn_Internal&&this.uiWidgetBase) {
			this.posCopyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/posCan/posCopyBtn') as mw.StaleButton
		}
		return this.posCopyBtn_Internal
	}
	private posPasteBtn_Internal: mw.StaleButton
	public get posPasteBtn(): mw.StaleButton {
		if(!this.posPasteBtn_Internal&&this.uiWidgetBase) {
			this.posPasteBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/posCan/posPasteBtn') as mw.StaleButton
		}
		return this.posPasteBtn_Internal
	}
	private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private emulateBtn_Internal: mw.StaleButton
	public get emulateBtn(): mw.StaleButton {
		if(!this.emulateBtn_Internal&&this.uiWidgetBase) {
			this.emulateBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/emulateBtn') as mw.StaleButton
		}
		return this.emulateBtn_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.rotCopyBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DebugWeapon_rotCopyBtn");
		})
		this.initLanguage(this.rotCopyBtn);
		this.rotCopyBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.rotCopyBtn.onPressed.add(() => {
			this.rotCopyBtn["preScale"] = this.rotCopyBtn.renderScale;
			this.rotCopyBtn.renderScale = Vector2.one.set(this.rotCopyBtn["preScale"]).multiply(1.1);
		})
		this.rotCopyBtn.onReleased.add(() => {
			this.rotCopyBtn.renderScale = this.rotCopyBtn["preScale"];
		})
		
		
	
		this.rotPasteBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DebugWeapon_rotPasteBtn");
		})
		this.initLanguage(this.rotPasteBtn);
		this.rotPasteBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.rotPasteBtn.onPressed.add(() => {
			this.rotPasteBtn["preScale"] = this.rotPasteBtn.renderScale;
			this.rotPasteBtn.renderScale = Vector2.one.set(this.rotPasteBtn["preScale"]).multiply(1.1);
		})
		this.rotPasteBtn.onReleased.add(() => {
			this.rotPasteBtn.renderScale = this.rotPasteBtn["preScale"];
		})
		
		
	
		this.posCopyBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DebugWeapon_posCopyBtn");
		})
		this.initLanguage(this.posCopyBtn);
		this.posCopyBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.posCopyBtn.onPressed.add(() => {
			this.posCopyBtn["preScale"] = this.posCopyBtn.renderScale;
			this.posCopyBtn.renderScale = Vector2.one.set(this.posCopyBtn["preScale"]).multiply(1.1);
		})
		this.posCopyBtn.onReleased.add(() => {
			this.posCopyBtn.renderScale = this.posCopyBtn["preScale"];
		})
		
		
	
		this.posPasteBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DebugWeapon_posPasteBtn");
		})
		this.initLanguage(this.posPasteBtn);
		this.posPasteBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.posPasteBtn.onPressed.add(() => {
			this.posPasteBtn["preScale"] = this.posPasteBtn.renderScale;
			this.posPasteBtn.renderScale = Vector2.one.set(this.posPasteBtn["preScale"]).multiply(1.1);
		})
		this.posPasteBtn.onReleased.add(() => {
			this.posPasteBtn.renderScale = this.posPasteBtn["preScale"];
		})
		
		
	
		this.emulateBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DebugWeapon_emulateBtn");
		})
		this.initLanguage(this.emulateBtn);
		this.emulateBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.emulateBtn.onPressed.add(() => {
			this.emulateBtn["preScale"] = this.emulateBtn.renderScale;
			this.emulateBtn.renderScale = Vector2.one.set(this.emulateBtn["preScale"]).multiply(1.1);
		})
		this.emulateBtn.onReleased.add(() => {
			this.emulateBtn.renderScale = this.emulateBtn["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.closeBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "DebugWeapon_closeBtn");
		})
		this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.closeBtn.onPressed.add(() => {
			this.closeBtn["preScale"] = this.closeBtn.renderScale;
			this.closeBtn.renderScale = Vector2.one.set(this.closeBtn["preScale"]).multiply(1.1);
		})
		this.closeBtn.onReleased.add(() => {
			this.closeBtn.renderScale = this.closeBtn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/rotCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/posCan/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_DebugWeapon'] = DebugWeapon_Generate;