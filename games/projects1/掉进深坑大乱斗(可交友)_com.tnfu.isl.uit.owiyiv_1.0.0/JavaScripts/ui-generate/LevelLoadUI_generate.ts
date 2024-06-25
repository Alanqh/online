
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/LevelLoadUI.ui
*/



@UIBind('UI/LevelLoadUI.ui')
export default class LevelLoadUI_Generate extends UIScript {
		private levelImage1_Internal: mw.Image
	public get levelImage1(): mw.Image {
		if(!this.levelImage1_Internal&&this.uiWidgetBase) {
			this.levelImage1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/levelImage1') as mw.Image
		}
		return this.levelImage1_Internal
	}
	private levelImage3_Internal: mw.Image
	public get levelImage3(): mw.Image {
		if(!this.levelImage3_Internal&&this.uiWidgetBase) {
			this.levelImage3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1_1/levelImage3') as mw.Image
		}
		return this.levelImage3_Internal
	}
	private levelImage2_Internal: mw.Image
	public get levelImage2(): mw.Image {
		if(!this.levelImage2_Internal&&this.uiWidgetBase) {
			this.levelImage2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1/levelImage2') as mw.Image
		}
		return this.levelImage2_Internal
	}
	private levelImage4_Internal: mw.Image
	public get levelImage4(): mw.Image {
		if(!this.levelImage4_Internal&&this.uiWidgetBase) {
			this.levelImage4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1_1_1/levelImage4') as mw.Image
		}
		return this.levelImage4_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 