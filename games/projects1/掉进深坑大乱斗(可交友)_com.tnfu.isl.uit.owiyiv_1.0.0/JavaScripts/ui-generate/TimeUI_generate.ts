
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/TimeUI.ui
*/



@UIBind('UI/TimeUI.ui')
export default class TimeUI_Generate extends UIScript {
		private textTime_Internal: mw.TextBlock
	public get textTime(): mw.TextBlock {
		if(!this.textTime_Internal&&this.uiWidgetBase) {
			this.textTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textTime') as mw.TextBlock
		}
		return this.textTime_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 