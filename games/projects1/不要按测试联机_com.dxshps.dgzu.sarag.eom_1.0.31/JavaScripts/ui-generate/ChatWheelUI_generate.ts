
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/ChatWheelUI.ui
*/



@UIBind('UI/ChatWheelUI.ui')
export default class ChatWheelUI_Generate extends UIScript {
		private canvas_Origin_Internal: mw.Canvas
	public get canvas_Origin(): mw.Canvas {
		if(!this.canvas_Origin_Internal&&this.uiWidgetBase) {
			this.canvas_Origin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Origin') as mw.Canvas
		}
		return this.canvas_Origin_Internal
	}
	private img_clock_Internal: mw.Image
	public get img_clock(): mw.Image {
		if(!this.img_clock_Internal&&this.uiWidgetBase) {
			this.img_clock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Origin/img_clock') as mw.Image
		}
		return this.img_clock_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 