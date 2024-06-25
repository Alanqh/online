
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L4UI/Prefabs/RPInteract/RPHud.ui
*/



@UIBind('UI/L4UI/Prefabs/RPInteract/RPHud.ui')
export default class RPHud_Generate extends UIScript {
		private mBtnJump_Internal: mw.Button
	public get mBtnJump(): mw.Button {
		if(!this.mBtnJump_Internal&&this.uiWidgetBase) {
			this.mBtnJump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CanvasJump/mBtnJump') as mw.Button
		}
		return this.mBtnJump_Internal
	}
	private mTextTips_Internal: mw.TextBlock
	public get mTextTips(): mw.TextBlock {
		if(!this.mTextTips_Internal&&this.uiWidgetBase) {
			this.mTextTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CanvasJump/mTextTips') as mw.TextBlock
		}
		return this.mTextTips_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 