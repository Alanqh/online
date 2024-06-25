
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/leaderboardModule/LeaderboardPanel.ui
*/



@UIBind('UI/leaderboardModule/LeaderboardPanel.ui')
export default class LeaderboardPanel_Generate extends UIScript {
		private mTitle_txt_Internal: mw.TextBlock
	public get mTitle_txt(): mw.TextBlock {
		if(!this.mTitle_txt_Internal&&this.uiWidgetBase) {
			this.mTitle_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mTitle_txt') as mw.TextBlock
		}
		return this.mTitle_txt_Internal
	}
	private mFieldName_Internal: mw.Canvas
	public get mFieldName(): mw.Canvas {
		if(!this.mFieldName_Internal&&this.uiWidgetBase) {
			this.mFieldName_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mFieldName') as mw.Canvas
		}
		return this.mFieldName_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/ScrollView/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mSelfList_Internal: mw.Canvas
	public get mSelfList(): mw.Canvas {
		if(!this.mSelfList_Internal&&this.uiWidgetBase) {
			this.mSelfList_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mSelfList') as mw.Canvas
		}
		return this.mSelfList_Internal
	}
	private mClose_btn_Internal: mw.StaleButton
	public get mClose_btn(): mw.StaleButton {
		if(!this.mClose_btn_Internal&&this.uiWidgetBase) {
			this.mClose_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mClose_btn') as mw.StaleButton
		}
		return this.mClose_btn_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 