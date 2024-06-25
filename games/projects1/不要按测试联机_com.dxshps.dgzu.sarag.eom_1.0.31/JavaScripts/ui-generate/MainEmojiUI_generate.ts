
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/MainEmojiUI.ui
*/



@UIBind('UI/MainEmojiUI.ui')
export default class MainEmojiUI_Generate extends UIScript {
		private canvas_Emoji_Internal: mw.Canvas
	public get canvas_Emoji(): mw.Canvas {
		if(!this.canvas_Emoji_Internal&&this.uiWidgetBase) {
			this.canvas_Emoji_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Emoji') as mw.Canvas
		}
		return this.canvas_Emoji_Internal
	}
	private mask_Emoji_JoyStick_Internal: mw.MaskButton
	public get mask_Emoji_JoyStick(): mw.MaskButton {
		if(!this.mask_Emoji_JoyStick_Internal&&this.uiWidgetBase) {
			this.mask_Emoji_JoyStick_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Emoji/mask_Emoji_JoyStick') as mw.MaskButton
		}
		return this.mask_Emoji_JoyStick_Internal
	}
	private joyStick_Emoji_Internal: mw.VirtualJoystickPanel
	public get joyStick_Emoji(): mw.VirtualJoystickPanel {
		if(!this.joyStick_Emoji_Internal&&this.uiWidgetBase) {
			this.joyStick_Emoji_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Emoji/joyStick_Emoji') as mw.VirtualJoystickPanel
		}
		return this.joyStick_Emoji_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 