
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Tool.ui
*/



@UIBind('UI/Tool.ui')
export default class Tool_Generate extends UIScript {
		private mCanvas_Joystick_Internal: mw.Canvas
	public get mCanvas_Joystick(): mw.Canvas {
		if(!this.mCanvas_Joystick_Internal&&this.uiWidgetBase) {
			this.mCanvas_Joystick_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Joystick') as mw.Canvas
		}
		return this.mCanvas_Joystick_Internal
	}
	private mImage_JoystickBG_Internal: mw.Image
	public get mImage_JoystickBG(): mw.Image {
		if(!this.mImage_JoystickBG_Internal&&this.uiWidgetBase) {
			this.mImage_JoystickBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Joystick/mImage_JoystickBG') as mw.Image
		}
		return this.mImage_JoystickBG_Internal
	}
	private mImage_JoystickBG2_Internal: mw.Image
	public get mImage_JoystickBG2(): mw.Image {
		if(!this.mImage_JoystickBG2_Internal&&this.uiWidgetBase) {
			this.mImage_JoystickBG2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Joystick/mImage_JoystickBG2') as mw.Image
		}
		return this.mImage_JoystickBG2_Internal
	}
	private mImage_JoyCentre_Internal: mw.Image
	public get mImage_JoyCentre(): mw.Image {
		if(!this.mImage_JoyCentre_Internal&&this.uiWidgetBase) {
			this.mImage_JoyCentre_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Joystick/mImage_JoyCentre') as mw.Image
		}
		return this.mImage_JoyCentre_Internal
	}
	private mCanvas_Cancel_Internal: mw.Canvas
	public get mCanvas_Cancel(): mw.Canvas {
		if(!this.mCanvas_Cancel_Internal&&this.uiWidgetBase) {
			this.mCanvas_Cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Cancel') as mw.Canvas
		}
		return this.mCanvas_Cancel_Internal
	}
	private mBtn_Cancel_Internal: mw.Button
	public get mBtn_Cancel(): mw.Button {
		if(!this.mBtn_Cancel_Internal&&this.uiWidgetBase) {
			this.mBtn_Cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Cancel/mBtn_Cancel') as mw.Button
		}
		return this.mBtn_Cancel_Internal
	}
	private mCanvas_Tool_Internal: mw.Canvas
	public get mCanvas_Tool(): mw.Canvas {
		if(!this.mCanvas_Tool_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool') as mw.Canvas
		}
		return this.mCanvas_Tool_Internal
	}
	private mImage_ToolBG_Internal: mw.Image
	public get mImage_ToolBG(): mw.Image {
		if(!this.mImage_ToolBG_Internal&&this.uiWidgetBase) {
			this.mImage_ToolBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mImage_ToolBG') as mw.Image
		}
		return this.mImage_ToolBG_Internal
	}
	private mImage_ToolIcon_Internal: mw.Image
	public get mImage_ToolIcon(): mw.Image {
		if(!this.mImage_ToolIcon_Internal&&this.uiWidgetBase) {
			this.mImage_ToolIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mImage_ToolIcon') as mw.Image
		}
		return this.mImage_ToolIcon_Internal
	}
	private mCanvas_TipCount_Internal: mw.Canvas
	public get mCanvas_TipCount(): mw.Canvas {
		if(!this.mCanvas_TipCount_Internal&&this.uiWidgetBase) {
			this.mCanvas_TipCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mCanvas_TipCount') as mw.Canvas
		}
		return this.mCanvas_TipCount_Internal
	}
	private mImage_topBG_Internal: mw.Image
	public get mImage_topBG(): mw.Image {
		if(!this.mImage_topBG_Internal&&this.uiWidgetBase) {
			this.mImage_topBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mCanvas_TipCount/mImage_topBG') as mw.Image
		}
		return this.mImage_topBG_Internal
	}
	private mText_Count_Internal: mw.TextBlock
	public get mText_Count(): mw.TextBlock {
		if(!this.mText_Count_Internal&&this.uiWidgetBase) {
			this.mText_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mCanvas_TipCount/mText_Count') as mw.TextBlock
		}
		return this.mText_Count_Internal
	}
	private mCanvas_TipTimer_Internal: mw.Canvas
	public get mCanvas_TipTimer(): mw.Canvas {
		if(!this.mCanvas_TipTimer_Internal&&this.uiWidgetBase) {
			this.mCanvas_TipTimer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mCanvas_TipTimer') as mw.Canvas
		}
		return this.mCanvas_TipTimer_Internal
	}
	private mMask_Timer_Internal: mw.MaskButton
	public get mMask_Timer(): mw.MaskButton {
		if(!this.mMask_Timer_Internal&&this.uiWidgetBase) {
			this.mMask_Timer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mCanvas_TipTimer/mMask_Timer') as mw.MaskButton
		}
		return this.mMask_Timer_Internal
	}
	private mText_ToolName_Internal: mw.TextBlock
	public get mText_ToolName(): mw.TextBlock {
		if(!this.mText_ToolName_Internal&&this.uiWidgetBase) {
			this.mText_ToolName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tool/mText_ToolName') as mw.TextBlock
		}
		return this.mText_ToolName_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 