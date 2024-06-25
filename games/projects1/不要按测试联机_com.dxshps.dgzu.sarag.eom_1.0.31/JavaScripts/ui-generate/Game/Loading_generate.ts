
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Game/Loading.ui
*/



@UIBind('UI/Game/Loading.ui')
export default class Loading_Generate extends UIScript {
		private mImg_Bg_Loading_Internal: mw.Image
	public get mImg_Bg_Loading(): mw.Image {
		if(!this.mImg_Bg_Loading_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Loading_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Bg_Loading') as mw.Image
		}
		return this.mImg_Bg_Loading_Internal
	}
	private mImg_Tips_Loading_Internal: mw.Image
	public get mImg_Tips_Loading(): mw.Image {
		if(!this.mImg_Tips_Loading_Internal&&this.uiWidgetBase) {
			this.mImg_Tips_Loading_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Tips_Loading') as mw.Image
		}
		return this.mImg_Tips_Loading_Internal
	}
	private mText_Tips_Loading_Internal: mw.TextBlock
	public get mText_Tips_Loading(): mw.TextBlock {
		if(!this.mText_Tips_Loading_Internal&&this.uiWidgetBase) {
			this.mText_Tips_Loading_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Tips_Loading') as mw.TextBlock
		}
		return this.mText_Tips_Loading_Internal
	}
	private mIconCanvas_Internal: mw.Canvas
	public get mIconCanvas(): mw.Canvas {
		if(!this.mIconCanvas_Internal&&this.uiWidgetBase) {
			this.mIconCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIconCanvas') as mw.Canvas
		}
		return this.mIconCanvas_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 