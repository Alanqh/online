
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Game/LevelPics.ui
*/



@UIBind('UI/Game/LevelPics.ui')
export default class LevelPics_Generate extends UIScript {
		private mImg_Bg01_Internal: mw.Image
	public get mImg_Bg01(): mw.Image {
		if(!this.mImg_Bg01_Internal&&this.uiWidgetBase) {
			this.mImg_Bg01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Bg01') as mw.Image
		}
		return this.mImg_Bg01_Internal
	}
	private mImg_Level01_Internal: mw.Image
	public get mImg_Level01(): mw.Image {
		if(!this.mImg_Level01_Internal&&this.uiWidgetBase) {
			this.mImg_Level01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Level01') as mw.Image
		}
		return this.mImg_Level01_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 