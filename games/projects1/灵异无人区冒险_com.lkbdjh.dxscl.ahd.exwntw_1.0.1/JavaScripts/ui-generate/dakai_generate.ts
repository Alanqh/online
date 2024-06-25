
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/dakai.ui
*/



@UIBind('UI/dakai.ui')
export default class dakai_Generate extends UIScript {
		private mButton_anniu_Internal: mw.Button
	public get mButton_anniu(): mw.Button {
		if(!this.mButton_anniu_Internal&&this.uiWidgetBase) {
			this.mButton_anniu_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_anniu') as mw.Button
		}
		return this.mButton_anniu_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 