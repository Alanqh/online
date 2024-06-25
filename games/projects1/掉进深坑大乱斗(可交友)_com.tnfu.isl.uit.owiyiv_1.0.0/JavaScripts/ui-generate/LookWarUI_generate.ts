
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/LookWarUI.ui
*/



@UIBind('UI/LookWarUI.ui')
export default class LookWarUI_Generate extends UIScript {
		private changeLookPlayer_Internal: mw.Button
	public get changeLookPlayer(): mw.Button {
		if(!this.changeLookPlayer_Internal&&this.uiWidgetBase) {
			this.changeLookPlayer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/changeLookPlayer') as mw.Button
		}
		return this.changeLookPlayer_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 