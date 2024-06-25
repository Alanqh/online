
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DefaultUI.ui
*/



@UIBind('UI/DefaultUI.ui')
export default class DefaultUI_Generate extends UIScript {
		private levelText_Internal: mw.TextBlock
	public get levelText(): mw.TextBlock {
		if(!this.levelText_Internal&&this.uiWidgetBase) {
			this.levelText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/levelText') as mw.TextBlock
		}
		return this.levelText_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 