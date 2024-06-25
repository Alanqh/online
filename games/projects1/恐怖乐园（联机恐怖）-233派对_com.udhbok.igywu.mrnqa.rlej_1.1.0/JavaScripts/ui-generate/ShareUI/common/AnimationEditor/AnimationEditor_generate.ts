
 

 @UIBind('UI/ShareUI/common/AnimationEditor/AnimationEditor.ui')
 export default class AnimationEditor_Generate extends UIScript {
	 	private mScorllAnimation_Internal: mw.ScrollBox
	public get mScorllAnimation(): mw.ScrollBox {
		if(!this.mScorllAnimation_Internal&&this.uiWidgetBase) {
			this.mScorllAnimation_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScorllAnimation') as mw.ScrollBox
		}
		return this.mScorllAnimation_Internal
	}
	private mCanvasScroll_Internal: mw.Canvas
	public get mCanvasScroll(): mw.Canvas {
		if(!this.mCanvasScroll_Internal&&this.uiWidgetBase) {
			this.mCanvasScroll_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScorllAnimation/mCanvasScroll') as mw.Canvas
		}
		return this.mCanvasScroll_Internal
	}
	private mAddPeriod_Internal: mw.StaleButton
	public get mAddPeriod(): mw.StaleButton {
		if(!this.mAddPeriod_Internal&&this.uiWidgetBase) {
			this.mAddPeriod_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddPeriod') as mw.StaleButton
		}
		return this.mAddPeriod_Internal
	}
	private mAddAni_Internal: mw.StaleButton
	public get mAddAni(): mw.StaleButton {
		if(!this.mAddAni_Internal&&this.uiWidgetBase) {
			this.mAddAni_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddAni') as mw.StaleButton
		}
		return this.mAddAni_Internal
	}
	private mAddEff_Internal: mw.StaleButton
	public get mAddEff(): mw.StaleButton {
		if(!this.mAddEff_Internal&&this.uiWidgetBase) {
			this.mAddEff_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddEff') as mw.StaleButton
		}
		return this.mAddEff_Internal
	}
	private mBtnGetGuid_Internal: mw.StaleButton
	public get mBtnGetGuid(): mw.StaleButton {
		if(!this.mBtnGetGuid_Internal&&this.uiWidgetBase) {
			this.mBtnGetGuid_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mBtnGetGuid') as mw.StaleButton
		}
		return this.mBtnGetGuid_Internal
	}
	private mAddAudio_Internal: mw.StaleButton
	public get mAddAudio(): mw.StaleButton {
		if(!this.mAddAudio_Internal&&this.uiWidgetBase) {
			this.mAddAudio_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddAudio') as mw.StaleButton
		}
		return this.mAddAudio_Internal
	}
	private mAddMove_Internal: mw.StaleButton
	public get mAddMove(): mw.StaleButton {
		if(!this.mAddMove_Internal&&this.uiWidgetBase) {
			this.mAddMove_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddMove') as mw.StaleButton
		}
		return this.mAddMove_Internal
	}
	private mAddSkillRect_Internal: mw.StaleButton
	public get mAddSkillRect(): mw.StaleButton {
		if(!this.mAddSkillRect_Internal&&this.uiWidgetBase) {
			this.mAddSkillRect_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddSkillRect') as mw.StaleButton
		}
		return this.mAddSkillRect_Internal
	}
	private mAddFlyNode_Internal: mw.StaleButton
	public get mAddFlyNode(): mw.StaleButton {
		if(!this.mAddFlyNode_Internal&&this.uiWidgetBase) {
			this.mAddFlyNode_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddFlyNode') as mw.StaleButton
		}
		return this.mAddFlyNode_Internal
	}
	private mAddForbidenNode_Internal: mw.StaleButton
	public get mAddForbidenNode(): mw.StaleButton {
		if(!this.mAddForbidenNode_Internal&&this.uiWidgetBase) {
			this.mAddForbidenNode_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddForbidenNode') as mw.StaleButton
		}
		return this.mAddForbidenNode_Internal
	}
	private mAddCameraNode_Internal: mw.StaleButton
	public get mAddCameraNode(): mw.StaleButton {
		if(!this.mAddCameraNode_Internal&&this.uiWidgetBase) {
			this.mAddCameraNode_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddCameraNode') as mw.StaleButton
		}
		return this.mAddCameraNode_Internal
	}
	private mAddFollowNode_Internal: mw.StaleButton
	public get mAddFollowNode(): mw.StaleButton {
		if(!this.mAddFollowNode_Internal&&this.uiWidgetBase) {
			this.mAddFollowNode_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddFollowNode') as mw.StaleButton
		}
		return this.mAddFollowNode_Internal
	}
	private mAddCtrlCameraPos_Internal: mw.StaleButton
	public get mAddCtrlCameraPos(): mw.StaleButton {
		if(!this.mAddCtrlCameraPos_Internal&&this.uiWidgetBase) {
			this.mAddCtrlCameraPos_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddCtrlCameraPos') as mw.StaleButton
		}
		return this.mAddCtrlCameraPos_Internal
	}
	private mAddHideCharNode_Internal: mw.StaleButton
	public get mAddHideCharNode(): mw.StaleButton {
		if(!this.mAddHideCharNode_Internal&&this.uiWidgetBase) {
			this.mAddHideCharNode_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_operation/mAddHideCharNode') as mw.StaleButton
		}
		return this.mAddHideCharNode_Internal
	}
	private mBtnPlay_Internal: mw.StaleButton
	public get mBtnPlay(): mw.StaleButton {
		if(!this.mBtnPlay_Internal&&this.uiWidgetBase) {
			this.mBtnPlay_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_BtnStart/mBtnPlay') as mw.StaleButton
		}
		return this.mBtnPlay_Internal
	}
	private mComboSlider_Internal: mw.ProgressBar
	public get mComboSlider(): mw.ProgressBar {
		if(!this.mComboSlider_Internal&&this.uiWidgetBase) {
			this.mComboSlider_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_BtnStart/mComboSlider') as mw.ProgressBar
		}
		return this.mComboSlider_Internal
	}
	private mSec_Internal: mw.TextBlock
	public get mSec(): mw.TextBlock {
		if(!this.mSec_Internal&&this.uiWidgetBase) {
			this.mSec_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_BtnStart/mSec') as mw.TextBlock
		}
		return this.mSec_Internal
	}
	private mInputOutJson_Internal: mw.InputBox
	public get mInputOutJson(): mw.InputBox {
		if(!this.mInputOutJson_Internal&&this.uiWidgetBase) {
			this.mInputOutJson_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mInputOutJson') as mw.InputBox
		}
		return this.mInputOutJson_Internal
	}
	private mShowBtn_Internal: mw.StaleButton
	public get mShowBtn(): mw.StaleButton {
		if(!this.mShowBtn_Internal&&this.uiWidgetBase) {
			this.mShowBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_4/mShowBtn') as mw.StaleButton
		}
		return this.mShowBtn_Internal
	}
	private mAIOnHitGuid_Internal: mw.InputBox
	public get mAIOnHitGuid(): mw.InputBox {
		if(!this.mAIOnHitGuid_Internal&&this.uiWidgetBase) {
			this.mAIOnHitGuid_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_4/Canvas_1/mAIOnHitGuid') as mw.InputBox
		}
		return this.mAIOnHitGuid_Internal
	}
	private mAIOnHitAnimation_Internal: mw.InputBox
	public get mAIOnHitAnimation(): mw.InputBox {
		if(!this.mAIOnHitAnimation_Internal&&this.uiWidgetBase) {
			this.mAIOnHitAnimation_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_4/Canvas_2/mAIOnHitAnimation') as mw.InputBox
		}
		return this.mAIOnHitAnimation_Internal
	}
	private mAIOnDieAnimation_Internal: mw.InputBox
	public get mAIOnDieAnimation(): mw.InputBox {
		if(!this.mAIOnDieAnimation_Internal&&this.uiWidgetBase) {
			this.mAIOnDieAnimation_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_4/Canvas_3/mAIOnDieAnimation') as mw.InputBox
		}
		return this.mAIOnDieAnimation_Internal
	}
	private mAIFightIdelGuid_Internal: mw.InputBox
	public get mAIFightIdelGuid(): mw.InputBox {
		if(!this.mAIFightIdelGuid_Internal&&this.uiWidgetBase) {
			this.mAIFightIdelGuid_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/Canvas_Idel/mAIFightIdelGuid') as mw.InputBox
		}
		return this.mAIFightIdelGuid_Internal
	}
	private mAIFightIdel2IdelGuid_Internal: mw.InputBox
	public get mAIFightIdel2IdelGuid(): mw.InputBox {
		if(!this.mAIFightIdel2IdelGuid_Internal&&this.uiWidgetBase) {
			this.mAIFightIdel2IdelGuid_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/Canvas_Idel_1/mAIFightIdel2IdelGuid') as mw.InputBox
		}
		return this.mAIFightIdel2IdelGuid_Internal
	}
	private mAIFightIdelSlot_Internal: mw.InputBox
	public get mAIFightIdelSlot(): mw.InputBox {
		if(!this.mAIFightIdelSlot_Internal&&this.uiWidgetBase) {
			this.mAIFightIdelSlot_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/Canvas_IdelSlot/mAIFightIdelSlot') as mw.InputBox
		}
		return this.mAIFightIdelSlot_Internal
	}
	private mAIAutoFocus_Internal: mw.InputBox
	public get mAIAutoFocus(): mw.InputBox {
		if(!this.mAIAutoFocus_Internal&&this.uiWidgetBase) {
			this.mAIAutoFocus_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/Canvas_Focus/mAIAutoFocus') as mw.InputBox
		}
		return this.mAIAutoFocus_Internal
	}
	private mAIAutoFocusRadius_Internal: mw.InputBox
	public get mAIAutoFocusRadius(): mw.InputBox {
		if(!this.mAIAutoFocusRadius_Internal&&this.uiWidgetBase) {
			this.mAIAutoFocusRadius_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/Canvas_FocusRadius/mAIAutoFocusRadius') as mw.InputBox
		}
		return this.mAIAutoFocusRadius_Internal
	}
	private mAIAutoFocusAngle_Internal: mw.InputBox
	public get mAIAutoFocusAngle(): mw.InputBox {
		if(!this.mAIAutoFocusAngle_Internal&&this.uiWidgetBase) {
			this.mAIAutoFocusAngle_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/Canvas_FocusAngle/mAIAutoFocusAngle') as mw.InputBox
		}
		return this.mAIAutoFocusAngle_Internal
	}
	private mAIAutoFocusFactor_Internal: mw.InputBox
	public get mAIAutoFocusFactor(): mw.InputBox {
		if(!this.mAIAutoFocusFactor_Internal&&this.uiWidgetBase) {
			this.mAIAutoFocusFactor_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/Canvas_FocusFactor/mAIAutoFocusFactor') as mw.InputBox
		}
		return this.mAIAutoFocusFactor_Internal
	}
	private mBtnToJson_Internal: mw.StaleButton
	public get mBtnToJson(): mw.StaleButton {
		if(!this.mBtnToJson_Internal&&this.uiWidgetBase) {
			this.mBtnToJson_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/mBtnToJson') as mw.StaleButton
		}
		return this.mBtnToJson_Internal
	}
	private mBtnToView_Internal: mw.StaleButton
	public get mBtnToView(): mw.StaleButton {
		if(!this.mBtnToView_Internal&&this.uiWidgetBase) {
			this.mBtnToView_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Global/mBtnToView') as mw.StaleButton
		}
		return this.mBtnToView_Internal
	}
	private mButtonCamera_Internal: mw.Button
	public get mButtonCamera(): mw.Button {
		if(!this.mButtonCamera_Internal&&this.uiWidgetBase) {
			this.mButtonCamera_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Camera/mButtonCamera') as mw.Button
		}
		return this.mButtonCamera_Internal
	}
	private mCanvas_CameraSetting_Internal: mw.Canvas
	public get mCanvas_CameraSetting(): mw.Canvas {
		if(!this.mCanvas_CameraSetting_Internal&&this.uiWidgetBase) {
			this.mCanvas_CameraSetting_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Camera/mCanvas_CameraSetting') as mw.Canvas
		}
		return this.mCanvas_CameraSetting_Internal
	}
	private mProgressBarLength_Internal: mw.ProgressBar
	public get mProgressBarLength(): mw.ProgressBar {
		if(!this.mProgressBarLength_Internal&&this.uiWidgetBase) {
			this.mProgressBarLength_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Camera/mCanvas_CameraSetting/mProgressBarLength') as mw.ProgressBar
		}
		return this.mProgressBarLength_Internal
	}
	private mProgressBarFov_Internal: mw.ProgressBar
	public get mProgressBarFov(): mw.ProgressBar {
		if(!this.mProgressBarFov_Internal&&this.uiWidgetBase) {
			this.mProgressBarFov_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas_Camera/mCanvas_CameraSetting/mProgressBarFov') as mw.ProgressBar
		}
		return this.mProgressBarFov_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.mAddPeriod.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddPeriod");
		})
		this.initLanguage(this.mAddPeriod);
		this.mAddPeriod.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddPeriod.onPressed.add(() => {
			this.mAddPeriod["preScale"] = this.mAddPeriod.renderScale;
			this.mAddPeriod.renderScale = Vector2.one.set(this.mAddPeriod["preScale"]).multiply(1.1);
		})
		this.mAddPeriod.onReleased.add(() => {
			this.mAddPeriod.renderScale = this.mAddPeriod["preScale"];
		})
		
		
	
		this.mAddAni.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddAni");
		})
		this.initLanguage(this.mAddAni);
		this.mAddAni.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddAni.onPressed.add(() => {
			this.mAddAni["preScale"] = this.mAddAni.renderScale;
			this.mAddAni.renderScale = Vector2.one.set(this.mAddAni["preScale"]).multiply(1.1);
		})
		this.mAddAni.onReleased.add(() => {
			this.mAddAni.renderScale = this.mAddAni["preScale"];
		})
		
		
	
		this.mAddEff.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddEff");
		})
		this.initLanguage(this.mAddEff);
		this.mAddEff.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddEff.onPressed.add(() => {
			this.mAddEff["preScale"] = this.mAddEff.renderScale;
			this.mAddEff.renderScale = Vector2.one.set(this.mAddEff["preScale"]).multiply(1.1);
		})
		this.mAddEff.onReleased.add(() => {
			this.mAddEff.renderScale = this.mAddEff["preScale"];
		})
		
		
	
		this.mBtnGetGuid.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mBtnGetGuid");
		})
		this.initLanguage(this.mBtnGetGuid);
		this.mBtnGetGuid.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnGetGuid.onPressed.add(() => {
			this.mBtnGetGuid["preScale"] = this.mBtnGetGuid.renderScale;
			this.mBtnGetGuid.renderScale = Vector2.one.set(this.mBtnGetGuid["preScale"]).multiply(1.1);
		})
		this.mBtnGetGuid.onReleased.add(() => {
			this.mBtnGetGuid.renderScale = this.mBtnGetGuid["preScale"];
		})
		
		
	
		this.mAddAudio.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddAudio");
		})
		this.initLanguage(this.mAddAudio);
		this.mAddAudio.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddAudio.onPressed.add(() => {
			this.mAddAudio["preScale"] = this.mAddAudio.renderScale;
			this.mAddAudio.renderScale = Vector2.one.set(this.mAddAudio["preScale"]).multiply(1.1);
		})
		this.mAddAudio.onReleased.add(() => {
			this.mAddAudio.renderScale = this.mAddAudio["preScale"];
		})
		
		
	
		this.mAddMove.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddMove");
		})
		this.initLanguage(this.mAddMove);
		this.mAddMove.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddMove.onPressed.add(() => {
			this.mAddMove["preScale"] = this.mAddMove.renderScale;
			this.mAddMove.renderScale = Vector2.one.set(this.mAddMove["preScale"]).multiply(1.1);
		})
		this.mAddMove.onReleased.add(() => {
			this.mAddMove.renderScale = this.mAddMove["preScale"];
		})
		
		
	
		this.mAddSkillRect.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddSkillRect");
		})
		this.initLanguage(this.mAddSkillRect);
		this.mAddSkillRect.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddSkillRect.onPressed.add(() => {
			this.mAddSkillRect["preScale"] = this.mAddSkillRect.renderScale;
			this.mAddSkillRect.renderScale = Vector2.one.set(this.mAddSkillRect["preScale"]).multiply(1.1);
		})
		this.mAddSkillRect.onReleased.add(() => {
			this.mAddSkillRect.renderScale = this.mAddSkillRect["preScale"];
		})
		
		
	
		this.mAddFlyNode.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddFlyNode");
		})
		this.initLanguage(this.mAddFlyNode);
		this.mAddFlyNode.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddFlyNode.onPressed.add(() => {
			this.mAddFlyNode["preScale"] = this.mAddFlyNode.renderScale;
			this.mAddFlyNode.renderScale = Vector2.one.set(this.mAddFlyNode["preScale"]).multiply(1.1);
		})
		this.mAddFlyNode.onReleased.add(() => {
			this.mAddFlyNode.renderScale = this.mAddFlyNode["preScale"];
		})
		
		
	
		this.mAddForbidenNode.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddForbidenNode");
		})
		this.initLanguage(this.mAddForbidenNode);
		this.mAddForbidenNode.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddForbidenNode.onPressed.add(() => {
			this.mAddForbidenNode["preScale"] = this.mAddForbidenNode.renderScale;
			this.mAddForbidenNode.renderScale = Vector2.one.set(this.mAddForbidenNode["preScale"]).multiply(1.1);
		})
		this.mAddForbidenNode.onReleased.add(() => {
			this.mAddForbidenNode.renderScale = this.mAddForbidenNode["preScale"];
		})
		
		
	
		this.mAddCameraNode.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddCameraNode");
		})
		this.initLanguage(this.mAddCameraNode);
		this.mAddCameraNode.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddCameraNode.onPressed.add(() => {
			this.mAddCameraNode["preScale"] = this.mAddCameraNode.renderScale;
			this.mAddCameraNode.renderScale = Vector2.one.set(this.mAddCameraNode["preScale"]).multiply(1.1);
		})
		this.mAddCameraNode.onReleased.add(() => {
			this.mAddCameraNode.renderScale = this.mAddCameraNode["preScale"];
		})
		
		
	
		this.mAddFollowNode.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddFollowNode");
		})
		this.initLanguage(this.mAddFollowNode);
		this.mAddFollowNode.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddFollowNode.onPressed.add(() => {
			this.mAddFollowNode["preScale"] = this.mAddFollowNode.renderScale;
			this.mAddFollowNode.renderScale = Vector2.one.set(this.mAddFollowNode["preScale"]).multiply(1.1);
		})
		this.mAddFollowNode.onReleased.add(() => {
			this.mAddFollowNode.renderScale = this.mAddFollowNode["preScale"];
		})
		
		
	
		this.mAddCtrlCameraPos.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddCtrlCameraPos");
		})
		this.initLanguage(this.mAddCtrlCameraPos);
		this.mAddCtrlCameraPos.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddCtrlCameraPos.onPressed.add(() => {
			this.mAddCtrlCameraPos["preScale"] = this.mAddCtrlCameraPos.renderScale;
			this.mAddCtrlCameraPos.renderScale = Vector2.one.set(this.mAddCtrlCameraPos["preScale"]).multiply(1.1);
		})
		this.mAddCtrlCameraPos.onReleased.add(() => {
			this.mAddCtrlCameraPos.renderScale = this.mAddCtrlCameraPos["preScale"];
		})
		
		
	
		this.mAddHideCharNode.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mAddHideCharNode");
		})
		this.initLanguage(this.mAddHideCharNode);
		this.mAddHideCharNode.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mAddHideCharNode.onPressed.add(() => {
			this.mAddHideCharNode["preScale"] = this.mAddHideCharNode.renderScale;
			this.mAddHideCharNode.renderScale = Vector2.one.set(this.mAddHideCharNode["preScale"]).multiply(1.1);
		})
		this.mAddHideCharNode.onReleased.add(() => {
			this.mAddHideCharNode.renderScale = this.mAddHideCharNode["preScale"];
		})
		
		
	
		this.mBtnPlay.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mBtnPlay");
		})
		this.initLanguage(this.mBtnPlay);
		this.mBtnPlay.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnPlay.onPressed.add(() => {
			this.mBtnPlay["preScale"] = this.mBtnPlay.renderScale;
			this.mBtnPlay.renderScale = Vector2.one.set(this.mBtnPlay["preScale"]).multiply(1.1);
		})
		this.mBtnPlay.onReleased.add(() => {
			this.mBtnPlay.renderScale = this.mBtnPlay["preScale"];
		})
		
		
	
		this.mShowBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mShowBtn");
		})
		this.initLanguage(this.mShowBtn);
		this.mShowBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mShowBtn.onPressed.add(() => {
			this.mShowBtn["preScale"] = this.mShowBtn.renderScale;
			this.mShowBtn.renderScale = Vector2.one.set(this.mShowBtn["preScale"]).multiply(1.1);
		})
		this.mShowBtn.onReleased.add(() => {
			this.mShowBtn.renderScale = this.mShowBtn["preScale"];
		})
		
		
	
		this.mBtnToJson.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mBtnToJson");
		})
		this.initLanguage(this.mBtnToJson);
		this.mBtnToJson.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnToJson.onPressed.add(() => {
			this.mBtnToJson["preScale"] = this.mBtnToJson.renderScale;
			this.mBtnToJson.renderScale = Vector2.one.set(this.mBtnToJson["preScale"]).multiply(1.1);
		})
		this.mBtnToJson.onReleased.add(() => {
			this.mBtnToJson.renderScale = this.mBtnToJson["preScale"];
		})
		
		
	
		this.mBtnToView.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mBtnToView");
		})
		this.initLanguage(this.mBtnToView);
		this.mBtnToView.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnToView.onPressed.add(() => {
			this.mBtnToView["preScale"] = this.mBtnToView.renderScale;
			this.mBtnToView.renderScale = Vector2.one.set(this.mBtnToView["preScale"]).multiply(1.1);
		})
		this.mBtnToView.onReleased.add(() => {
			this.mBtnToView.renderScale = this.mBtnToView["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.mButtonCamera.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationEditor_mButtonCamera");
		})
		this.mButtonCamera.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mButtonCamera.onPressed.add(() => {
			this.mButtonCamera["preScale"] = this.mButtonCamera.renderScale;
			this.mButtonCamera.renderScale = Vector2.one.set(this.mButtonCamera["preScale"]).multiply(1.1);
		})
		this.mButtonCamera.onReleased.add(() => {
			this.mButtonCamera.renderScale = this.mButtonCamera["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mSec)
		this.mSec.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_4/Canvas_1/MWTextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_4/Canvas_2/MWTextBlock_1_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_4/Canvas_3/MWTextBlock_1_1_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_Global/Canvas_Idel/MWTextBlock_1_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_Global/Canvas_Idel_1/MWTextBlock_1_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_Global/Canvas_IdelSlot/MWTextBlock_1_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_Global/Canvas_Focus/MWTextBlock_1_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_Global/Canvas_FocusRadius/MWTextBlock_1_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_Global/Canvas_FocusAngle/MWTextBlock_1_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_Global/Canvas_FocusFactor/MWTextBlock_1_4") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AnimationEditor'] = AnimationEditor_Generate;