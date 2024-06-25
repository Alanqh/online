
 

 @UIBind('UI/ShareUI/ChangeRoomSkin.ui')
 export default class ChangeRoomSkin_Generate extends UIScript {
	 	private canvas_roomSkins_Internal: mw.Canvas
	public get canvas_roomSkins(): mw.Canvas {
		if(!this.canvas_roomSkins_Internal&&this.uiWidgetBase) {
			this.canvas_roomSkins_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins') as mw.Canvas
		}
		return this.canvas_roomSkins_Internal
	}
	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private img_bg_1_1_Internal: mw.Image
	public get img_bg_1_1(): mw.Image {
		if(!this.img_bg_1_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/img_bg_1_1') as mw.Image
		}
		return this.img_bg_1_1_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private canvas_roomSkinsList_Internal: mw.Canvas
	public get canvas_roomSkinsList(): mw.Canvas {
		if(!this.canvas_roomSkinsList_Internal&&this.uiWidgetBase) {
			this.canvas_roomSkinsList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/ScrollBox/canvas_roomSkinsList') as mw.Canvas
		}
		return this.canvas_roomSkinsList_Internal
	}
	private canvas_right_Internal: mw.Canvas
	public get canvas_right(): mw.Canvas {
		if(!this.canvas_right_Internal&&this.uiWidgetBase) {
			this.canvas_right_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right') as mw.Canvas
		}
		return this.canvas_right_Internal
	}
	private canvas_upBuild_Internal: mw.Canvas
	public get canvas_upBuild(): mw.Canvas {
		if(!this.canvas_upBuild_Internal&&this.uiWidgetBase) {
			this.canvas_upBuild_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild') as mw.Canvas
		}
		return this.canvas_upBuild_Internal
	}
	private text_upBuildTitle_Internal: mw.TextBlock
	public get text_upBuildTitle(): mw.TextBlock {
		if(!this.text_upBuildTitle_Internal&&this.uiWidgetBase) {
			this.text_upBuildTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/text_upBuildTitle') as mw.TextBlock
		}
		return this.text_upBuildTitle_Internal
	}
	private text_buildCount_Internal: mw.TextBlock
	public get text_buildCount(): mw.TextBlock {
		if(!this.text_buildCount_Internal&&this.uiWidgetBase) {
			this.text_buildCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/text_buildCount') as mw.TextBlock
		}
		return this.text_buildCount_Internal
	}
	private canvas_upBuildBuy_Internal: mw.Canvas
	public get canvas_upBuildBuy(): mw.Canvas {
		if(!this.canvas_upBuildBuy_Internal&&this.uiWidgetBase) {
			this.canvas_upBuildBuy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/canvas_upBuildBuy') as mw.Canvas
		}
		return this.canvas_upBuildBuy_Internal
	}
	private btn_upBuild_Internal: mw.Button
	public get btn_upBuild(): mw.Button {
		if(!this.btn_upBuild_Internal&&this.uiWidgetBase) {
			this.btn_upBuild_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/canvas_upBuildBuy/btn_upBuild') as mw.Button
		}
		return this.btn_upBuild_Internal
	}
	private text_upBuild_Internal: mw.TextBlock
	public get text_upBuild(): mw.TextBlock {
		if(!this.text_upBuild_Internal&&this.uiWidgetBase) {
			this.text_upBuild_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/canvas_upBuildBuy/btn_upBuild/text_upBuild') as mw.TextBlock
		}
		return this.text_upBuild_Internal
	}
	private img_money_Internal: mw.Image
	public get img_money(): mw.Image {
		if(!this.img_money_Internal&&this.uiWidgetBase) {
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/canvas_upBuildBuy/img_money') as mw.Image
		}
		return this.img_money_Internal
	}
	private text_money_Internal: mw.TextBlock
	public get text_money(): mw.TextBlock {
		if(!this.text_money_Internal&&this.uiWidgetBase) {
			this.text_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/canvas_upBuildBuy/text_money') as mw.TextBlock
		}
		return this.text_money_Internal
	}
	private proBar_buildLevel1_Internal: mw.ProgressBar
	public get proBar_buildLevel1(): mw.ProgressBar {
		if(!this.proBar_buildLevel1_Internal&&this.uiWidgetBase) {
			this.proBar_buildLevel1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/proBar_buildLevel1') as mw.ProgressBar
		}
		return this.proBar_buildLevel1_Internal
	}
	private text_buildDesc_Internal: mw.TextBlock
	public get text_buildDesc(): mw.TextBlock {
		if(!this.text_buildDesc_Internal&&this.uiWidgetBase) {
			this.text_buildDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/text_buildDesc') as mw.TextBlock
		}
		return this.text_buildDesc_Internal
	}
	private proBar_buildLevel2_Internal: mw.ProgressBar
	public get proBar_buildLevel2(): mw.ProgressBar {
		if(!this.proBar_buildLevel2_Internal&&this.uiWidgetBase) {
			this.proBar_buildLevel2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_upBuild/proBar_buildLevel2') as mw.ProgressBar
		}
		return this.proBar_buildLevel2_Internal
	}
	private canvas_noEntry_Internal: mw.Canvas
	public get canvas_noEntry(): mw.Canvas {
		if(!this.canvas_noEntry_Internal&&this.uiWidgetBase) {
			this.canvas_noEntry_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_noEntry') as mw.Canvas
		}
		return this.canvas_noEntry_Internal
	}
	private text_noEntryTitle_Internal: mw.TextBlock
	public get text_noEntryTitle(): mw.TextBlock {
		if(!this.text_noEntryTitle_Internal&&this.uiWidgetBase) {
			this.text_noEntryTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_noEntry/text_noEntryTitle') as mw.TextBlock
		}
		return this.text_noEntryTitle_Internal
	}
	private text_noEntryDesc_Internal: mw.TextBlock
	public get text_noEntryDesc(): mw.TextBlock {
		if(!this.text_noEntryDesc_Internal&&this.uiWidgetBase) {
			this.text_noEntryDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_noEntry/text_noEntryDesc') as mw.TextBlock
		}
		return this.text_noEntryDesc_Internal
	}
	private btn_noEntry_Internal: mw.Button
	public get btn_noEntry(): mw.Button {
		if(!this.btn_noEntry_Internal&&this.uiWidgetBase) {
			this.btn_noEntry_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_noEntry/btn_noEntry') as mw.Button
		}
		return this.btn_noEntry_Internal
	}
	private text_noEntryType_off_Internal: mw.TextBlock
	public get text_noEntryType_off(): mw.TextBlock {
		if(!this.text_noEntryType_off_Internal&&this.uiWidgetBase) {
			this.text_noEntryType_off_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_noEntry/text_noEntryType_off') as mw.TextBlock
		}
		return this.text_noEntryType_off_Internal
	}
	private text_noEntryPrivilege_Internal: mw.TextBlock
	public get text_noEntryPrivilege(): mw.TextBlock {
		if(!this.text_noEntryPrivilege_Internal&&this.uiWidgetBase) {
			this.text_noEntryPrivilege_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_noEntry/text_noEntryPrivilege') as mw.TextBlock
		}
		return this.text_noEntryPrivilege_Internal
	}
	private text_noEntryType_on_Internal: mw.TextBlock
	public get text_noEntryType_on(): mw.TextBlock {
		if(!this.text_noEntryType_on_Internal&&this.uiWidgetBase) {
			this.text_noEntryType_on_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_noEntry/text_noEntryType_on') as mw.TextBlock
		}
		return this.text_noEntryType_on_Internal
	}
	private canvas_recoveryBuild_Internal: mw.Canvas
	public get canvas_recoveryBuild(): mw.Canvas {
		if(!this.canvas_recoveryBuild_Internal&&this.uiWidgetBase) {
			this.canvas_recoveryBuild_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_recoveryBuild') as mw.Canvas
		}
		return this.canvas_recoveryBuild_Internal
	}
	private text_recoveryBuildTitle_Internal: mw.TextBlock
	public get text_recoveryBuildTitle(): mw.TextBlock {
		if(!this.text_recoveryBuildTitle_Internal&&this.uiWidgetBase) {
			this.text_recoveryBuildTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_recoveryBuild/text_recoveryBuildTitle') as mw.TextBlock
		}
		return this.text_recoveryBuildTitle_Internal
	}
	private text_recoveryBuildDesc_Internal: mw.TextBlock
	public get text_recoveryBuildDesc(): mw.TextBlock {
		if(!this.text_recoveryBuildDesc_Internal&&this.uiWidgetBase) {
			this.text_recoveryBuildDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_recoveryBuild/text_recoveryBuildDesc') as mw.TextBlock
		}
		return this.text_recoveryBuildDesc_Internal
	}
	private btn_recoveryBuild_Internal: mw.StaleButton
	public get btn_recoveryBuild(): mw.StaleButton {
		if(!this.btn_recoveryBuild_Internal&&this.uiWidgetBase) {
			this.btn_recoveryBuild_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_roomSkins/canvas_right/canvas_recoveryBuild/btn_recoveryBuild') as mw.StaleButton
		}
		return this.btn_recoveryBuild_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_recoveryBuild.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ChangeRoomSkin_btn_recoveryBuild");
		})
		this.initLanguage(this.btn_recoveryBuild);
		this.btn_recoveryBuild.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_recoveryBuild.onPressed.add(() => {
			this.btn_recoveryBuild["preScale"] = this.btn_recoveryBuild.renderScale;
			this.btn_recoveryBuild.renderScale = Vector2.one.set(this.btn_recoveryBuild["preScale"]).multiply(1.1);
		})
		this.btn_recoveryBuild.onReleased.add(() => {
			this.btn_recoveryBuild.renderScale = this.btn_recoveryBuild["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ChangeRoomSkin_btn_close");
		})
		this.btn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close.onPressed.add(() => {
			this.btn_close["preScale"] = this.btn_close.renderScale;
			this.btn_close.renderScale = Vector2.one.set(this.btn_close["preScale"]).multiply(1.1);
		})
		this.btn_close.onReleased.add(() => {
			this.btn_close.renderScale = this.btn_close["preScale"];
		})
		
	
		this.btn_upBuild.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ChangeRoomSkin_btn_upBuild");
		})
		this.btn_upBuild.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_upBuild.onPressed.add(() => {
			this.btn_upBuild["preScale"] = this.btn_upBuild.renderScale;
			this.btn_upBuild.renderScale = Vector2.one.set(this.btn_upBuild["preScale"]).multiply(1.1);
		})
		this.btn_upBuild.onReleased.add(() => {
			this.btn_upBuild.renderScale = this.btn_upBuild["preScale"];
		})
		
	
		this.btn_noEntry.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ChangeRoomSkin_btn_noEntry");
		})
		this.btn_noEntry.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_noEntry.onPressed.add(() => {
			this.btn_noEntry["preScale"] = this.btn_noEntry.renderScale;
			this.btn_noEntry.renderScale = Vector2.one.set(this.btn_noEntry["preScale"]).multiply(1.1);
		})
		this.btn_noEntry.onReleased.add(() => {
			this.btn_noEntry.renderScale = this.btn_noEntry["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_upBuildTitle)
		this.text_upBuildTitle.isRichText = true;
		
	
		this.initLanguage(this.text_buildCount)
		this.text_buildCount.isRichText = true;
		
	
		this.initLanguage(this.text_upBuild)
		this.text_upBuild.isRichText = true;
		
	
		this.initLanguage(this.text_money)
		this.text_money.isRichText = true;
		
	
		this.initLanguage(this.text_buildDesc)
		this.text_buildDesc.isRichText = true;
		
	
		this.initLanguage(this.text_noEntryTitle)
		this.text_noEntryTitle.isRichText = true;
		
	
		this.initLanguage(this.text_noEntryDesc)
		this.text_noEntryDesc.isRichText = true;
		
	
		this.initLanguage(this.text_noEntryType_off)
		this.text_noEntryType_off.isRichText = true;
		
	
		this.initLanguage(this.text_noEntryPrivilege)
		this.text_noEntryPrivilege.isRichText = true;
		
	
		this.initLanguage(this.text_noEntryType_on)
		this.text_noEntryType_on.isRichText = true;
		
	
		this.initLanguage(this.text_recoveryBuildTitle)
		this.text_recoveryBuildTitle.isRichText = true;
		
	
		this.initLanguage(this.text_recoveryBuildDesc)
		this.text_recoveryBuildDesc.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_roomSkins/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ChangeRoomSkin'] = ChangeRoomSkin_Generate;