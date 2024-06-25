
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L6UI/L6_ShootUI.ui
*/



@UIBind('UI/L6UI/L6_ShootUI.ui')
export default class L6_ShootUI_Generate extends UIScript {
		private shootButton_Internal: mw.Button
	public get shootButton(): mw.Button {
		if(!this.shootButton_Internal&&this.uiWidgetBase) {
			this.shootButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shootButton') as mw.Button
		}
		return this.shootButton_Internal
	}
	private bullets_Internal: mw.TextBlock
	public get bullets(): mw.TextBlock {
		if(!this.bullets_Internal&&this.uiWidgetBase) {
			this.bullets_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1/bullets') as mw.TextBlock
		}
		return this.bullets_Internal
	}
	private score_Internal: mw.TextBlock
	public get score(): mw.TextBlock {
		if(!this.score_Internal&&this.uiWidgetBase) {
			this.score_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TextBlock/score') as mw.TextBlock
		}
		return this.score_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 