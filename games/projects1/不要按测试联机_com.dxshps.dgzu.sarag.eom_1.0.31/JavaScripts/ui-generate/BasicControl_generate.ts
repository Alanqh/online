
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicControl.ui
*/



@UIBind('UI/BasicControl.ui')
export default class BasicControl_Generate extends UIScript {
		private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private mCanvas_Reset_Internal: mw.Canvas
	public get mCanvas_Reset(): mw.Canvas {
		if(!this.mCanvas_Reset_Internal&&this.uiWidgetBase) {
			this.mCanvas_Reset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reset') as mw.Canvas
		}
		return this.mCanvas_Reset_Internal
	}
	private mBtn_Reset_Internal: mw.Button
	public get mBtn_Reset(): mw.Button {
		if(!this.mBtn_Reset_Internal&&this.uiWidgetBase) {
			this.mBtn_Reset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reset/mBtn_Reset') as mw.Button
		}
		return this.mBtn_Reset_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 