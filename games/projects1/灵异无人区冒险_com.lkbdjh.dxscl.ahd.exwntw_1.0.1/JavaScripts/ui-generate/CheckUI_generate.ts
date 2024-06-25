
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/CheckUI.ui
*/



@UIBind('UI/CheckUI.ui')
export default class CheckUI_Generate extends UIScript {
		private title_Internal: mw.TextBlock
	public get title(): mw.TextBlock {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/title') as mw.TextBlock
		}
		return this.title_Internal
	}
	private content_Internal: mw.TextBlock
	public get content(): mw.TextBlock {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/content') as mw.TextBlock
		}
		return this.content_Internal
	}
	private confirm_Internal: mw.StaleButton
	public get confirm(): mw.StaleButton {
		if(!this.confirm_Internal&&this.uiWidgetBase) {
			this.confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/confirm') as mw.StaleButton
		}
		return this.confirm_Internal
	}
	private cancel_Internal: mw.StaleButton
	public get cancel(): mw.StaleButton {
		if(!this.cancel_Internal&&this.uiWidgetBase) {
			this.cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cancel') as mw.StaleButton
		}
		return this.cancel_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 