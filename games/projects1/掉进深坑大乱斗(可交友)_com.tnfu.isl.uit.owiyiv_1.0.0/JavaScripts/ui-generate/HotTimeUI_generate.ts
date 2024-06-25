
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/HotTimeUI.ui
*/



@UIBind('UI/HotTimeUI.ui')
export default class HotTimeUI_Generate extends UIScript {
		private number_2_Internal: mw.Image
	public get number_2(): mw.Image {
		if(!this.number_2_Internal&&this.uiWidgetBase) {
			this.number_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/number_2') as mw.Image
		}
		return this.number_2_Internal
	}
	private number_Internal: mw.Image
	public get number(): mw.Image {
		if(!this.number_Internal&&this.uiWidgetBase) {
			this.number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/number') as mw.Image
		}
		return this.number_Internal
	}
	private number_1_Internal: mw.Image
	public get number_1(): mw.Image {
		if(!this.number_1_Internal&&this.uiWidgetBase) {
			this.number_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/number_1') as mw.Image
		}
		return this.number_1_Internal
	}
	private image_go_Internal: mw.Image
	public get image_go(): mw.Image {
		if(!this.image_go_Internal&&this.uiWidgetBase) {
			this.image_go_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image_go') as mw.Image
		}
		return this.image_go_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 