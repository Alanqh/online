
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/MessageBox.ui
*/



@UIBind('UI/common/MessageBox.ui')
export default class MessageBox_Generate extends UIScript {
		private mTitle_txt_Internal: mw.TextBlock
	public get mTitle_txt(): mw.TextBlock {
		if(!this.mTitle_txt_Internal&&this.uiWidgetBase) {
			this.mTitle_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mTitle_txt') as mw.TextBlock
		}
		return this.mTitle_txt_Internal
	}
	private mContent_txt_Internal: mw.TextBlock
	public get mContent_txt(): mw.TextBlock {
		if(!this.mContent_txt_Internal&&this.uiWidgetBase) {
			this.mContent_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mContent_txt') as mw.TextBlock
		}
		return this.mContent_txt_Internal
	}
	private mRichText_Internal: mw.TextBlock
	public get mRichText(): mw.TextBlock {
		if(!this.mRichText_Internal&&this.uiWidgetBase) {
			this.mRichText_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mRichText') as mw.TextBlock
		}
		return this.mRichText_Internal
	}
	private mYes_btn_Internal: mw.StaleButton
	public get mYes_btn(): mw.StaleButton {
		if(!this.mYes_btn_Internal&&this.uiWidgetBase) {
			this.mYes_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mYes_btn') as mw.StaleButton
		}
		return this.mYes_btn_Internal
	}
	private mNo_btn_Internal: mw.StaleButton
	public get mNo_btn(): mw.StaleButton {
		if(!this.mNo_btn_Internal&&this.uiWidgetBase) {
			this.mNo_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mNo_btn') as mw.StaleButton
		}
		return this.mNo_btn_Internal
	}
	private mOK_btn_Internal: mw.StaleButton
	public get mOK_btn(): mw.StaleButton {
		if(!this.mOK_btn_Internal&&this.uiWidgetBase) {
			this.mOK_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mOK_btn') as mw.StaleButton
		}
		return this.mOK_btn_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 