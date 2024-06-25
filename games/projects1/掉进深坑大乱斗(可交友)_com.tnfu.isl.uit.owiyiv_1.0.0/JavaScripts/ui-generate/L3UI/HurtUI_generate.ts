
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L3UI/HurtUI.ui
*/



@UIBind('UI/L3UI/HurtUI.ui')
export default class HurtUI_Generate extends UIScript {
		private hurtMsg_Internal: mw.TextBlock
	public get hurtMsg(): mw.TextBlock {
		if(!this.hurtMsg_Internal&&this.uiWidgetBase) {
			this.hurtMsg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/hurtMsg') as mw.TextBlock
		}
		return this.hurtMsg_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 