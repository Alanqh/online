
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/GameUI.ui
*/



@UIBind('UI/GameUI.ui')
export default class GameUI_Generate extends UIScript {
		private mBG_Internal: mw.Image
	public get mBG(): mw.Image {
		if(!this.mBG_Internal&&this.uiWidgetBase) {
			this.mBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBG') as mw.Image
		}
		return this.mBG_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mLevelProgress_Internal: mw.ProgressBar
	public get mLevelProgress(): mw.ProgressBar {
		if(!this.mLevelProgress_Internal&&this.uiWidgetBase) {
			this.mLevelProgress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLevelProgress') as mw.ProgressBar
		}
		return this.mLevelProgress_Internal
	}
	private mLevelText_Internal: mw.TextBlock
	public get mLevelText(): mw.TextBlock {
		if(!this.mLevelText_Internal&&this.uiWidgetBase) {
			this.mLevelText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLevelText') as mw.TextBlock
		}
		return this.mLevelText_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 