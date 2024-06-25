




@UIBind('UI/WatchUI.ui')
export default class WatchUI_Generate extends UIScript {
		private cvsRoot_Internal: mw.Canvas
	public get cvsRoot(): mw.Canvas {
		if(!this.cvsRoot_Internal&&this.uiWidgetBase) {
			this.cvsRoot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot') as mw.Canvas
		}
		return this.cvsRoot_Internal
	}
	private txtName_Internal: mw.TextBlock
	public get txtName(): mw.TextBlock {
		if(!this.txtName_Internal&&this.uiWidgetBase) {
			this.txtName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/txtName') as mw.TextBlock
		}
		return this.txtName_Internal
	}
	private btnLeft_Internal: mw.Button
	public get btnLeft(): mw.Button {
		if(!this.btnLeft_Internal&&this.uiWidgetBase) {
			this.btnLeft_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/btnLeft') as mw.Button
		}
		return this.btnLeft_Internal
	}
	private btnRight_Internal: mw.Button
	public get btnRight(): mw.Button {
		if(!this.btnRight_Internal&&this.uiWidgetBase) {
			this.btnRight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/btnRight') as mw.Button
		}
		return this.btnRight_Internal
	}
	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private canvasReturn_Internal: mw.Canvas
	public get canvasReturn(): mw.Canvas {
		if(!this.canvasReturn_Internal&&this.uiWidgetBase) {
			this.canvasReturn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasReturn') as mw.Canvas
		}
		return this.canvasReturn_Internal
	}
	private backBack_Internal: mw.Image
	public get backBack(): mw.Image {
		if(!this.backBack_Internal&&this.uiWidgetBase) {
			this.backBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasReturn/backBack') as mw.Image
		}
		return this.backBack_Internal
	}
	private btnBack2Lobby_Internal: mw.StaleButton
	public get btnBack2Lobby(): mw.StaleButton {
		if(!this.btnBack2Lobby_Internal&&this.uiWidgetBase) {
			this.btnBack2Lobby_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasReturn/btnBack2Lobby') as mw.StaleButton
		}
		return this.btnBack2Lobby_Internal
	}
	private txtReturn_Internal: mw.TextBlock
	public get txtReturn(): mw.TextBlock {
		if(!this.txtReturn_Internal&&this.uiWidgetBase) {
			this.txtReturn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasReturn/txtReturn') as mw.TextBlock
		}
		return this.txtReturn_Internal
	}
	private canvasLove_Internal: mw.Canvas
	public get canvasLove(): mw.Canvas {
		if(!this.canvasLove_Internal&&this.uiWidgetBase) {
			this.canvasLove_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove') as mw.Canvas
		}
		return this.canvasLove_Internal
	}
	private btnAssist_Internal: mw.Button
	public get btnAssist(): mw.Button {
		if(!this.btnAssist_Internal&&this.uiWidgetBase) {
			this.btnAssist_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/btnAssist') as mw.Button
		}
		return this.btnAssist_Internal
	}
	private txtLove_Internal: mw.TextBlock
	public get txtLove(): mw.TextBlock {
		if(!this.txtLove_Internal&&this.uiWidgetBase) {
			this.txtLove_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/txtLove') as mw.TextBlock
		}
		return this.txtLove_Internal
	}
	private imgP_0_Internal: mw.Image
	public get imgP_0(): mw.Image {
		if(!this.imgP_0_Internal&&this.uiWidgetBase) {
			this.imgP_0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/imgP_0') as mw.Image
		}
		return this.imgP_0_Internal
	}
	private imgP_1_Internal: mw.Image
	public get imgP_1(): mw.Image {
		if(!this.imgP_1_Internal&&this.uiWidgetBase) {
			this.imgP_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/imgP_1') as mw.Image
		}
		return this.imgP_1_Internal
	}
	private imgP_2_Internal: mw.Image
	public get imgP_2(): mw.Image {
		if(!this.imgP_2_Internal&&this.uiWidgetBase) {
			this.imgP_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/imgP_2') as mw.Image
		}
		return this.imgP_2_Internal
	}
	private imgP_3_Internal: mw.Image
	public get imgP_3(): mw.Image {
		if(!this.imgP_3_Internal&&this.uiWidgetBase) {
			this.imgP_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/imgP_3') as mw.Image
		}
		return this.imgP_3_Internal
	}
	private imgP_4_Internal: mw.Image
	public get imgP_4(): mw.Image {
		if(!this.imgP_4_Internal&&this.uiWidgetBase) {
			this.imgP_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/imgP_4') as mw.Image
		}
		return this.imgP_4_Internal
	}
	private imgP_5_Internal: mw.Image
	public get imgP_5(): mw.Image {
		if(!this.imgP_5_Internal&&this.uiWidgetBase) {
			this.imgP_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsRoot/canvasLove/imgP_5') as mw.Image
		}
		return this.imgP_5_Internal
	}
	private btnSwitch_Internal: mw.Button
	public get btnSwitch(): mw.Button {
		if(!this.btnSwitch_Internal&&this.uiWidgetBase) {
			this.btnSwitch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btnSwitch') as mw.Button
		}
		return this.btnSwitch_Internal
	}
	private btnWatch_Internal: mw.StaleButton
	public get btnWatch(): mw.StaleButton {
		if(!this.btnWatch_Internal&&this.uiWidgetBase) {
			this.btnWatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btnWatch') as mw.StaleButton
		}
		return this.btnWatch_Internal
	}
	private btnSelf_Internal: mw.StaleButton
	public get btnSelf(): mw.StaleButton {
		if(!this.btnSelf_Internal&&this.uiWidgetBase) {
			this.btnSelf_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/btnSelf') as mw.StaleButton
		}
		return this.btnSelf_Internal
	}
	private canvasBackConfirm_Internal: mw.Canvas
	public get canvasBackConfirm(): mw.Canvas {
		if(!this.canvasBackConfirm_Internal&&this.uiWidgetBase) {
			this.canvasBackConfirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasBackConfirm') as mw.Canvas
		}
		return this.canvasBackConfirm_Internal
	}
	private btnOK_Internal: mw.StaleButton
	public get btnOK(): mw.StaleButton {
		if(!this.btnOK_Internal&&this.uiWidgetBase) {
			this.btnOK_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasBackConfirm/btnOK') as mw.StaleButton
		}
		return this.btnOK_Internal
	}
	private btnCancel_Internal: mw.StaleButton
	public get btnCancel(): mw.StaleButton {
		if(!this.btnCancel_Internal&&this.uiWidgetBase) {
			this.btnCancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasBackConfirm/btnCancel') as mw.StaleButton
		}
		return this.btnCancel_Internal
	}
	private confirmTxt_Internal: mw.TextBlock
	public get confirmTxt(): mw.TextBlock {
		if(!this.confirmTxt_Internal&&this.uiWidgetBase) {
			this.confirmTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasBackConfirm/confirmTxt') as mw.TextBlock
		}
		return this.confirmTxt_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.btnBack2Lobby.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.btnBack2Lobby);
		
	
		this.btnWatch.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.btnWatch);
		
	
		this.btnSelf.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.btnSelf);
		
	
		this.btnOK.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.btnOK);
		
	
		this.btnCancel.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.btnCancel);
		
	

		//按钮添加点击
		
		this.btnLeft.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.btnRight.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.btnAssist.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.btnSwitch.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txtName)
		
	
		this.initLanguage(this.txtReturn)
		
	
		this.initLanguage(this.txtLove)
		
	
		this.initLanguage(this.confirmTxt)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cvsRoot/TextBlock_5") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 