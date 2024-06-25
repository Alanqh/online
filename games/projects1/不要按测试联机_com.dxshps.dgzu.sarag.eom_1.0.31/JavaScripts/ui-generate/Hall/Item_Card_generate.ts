
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Hall/Item_Card.ui
*/



@UIBind('UI/Hall/Item_Card.ui')
export default class Item_Card_Generate extends UIScript {
		private mImage_BG_Internal: mw.Image
	public get mImage_BG(): mw.Image {
		if(!this.mImage_BG_Internal&&this.uiWidgetBase) {
			this.mImage_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_BG') as mw.Image
		}
		return this.mImage_BG_Internal
	}
	private mImage_Icon_Internal: mw.Image
	public get mImage_Icon(): mw.Image {
		if(!this.mImage_Icon_Internal&&this.uiWidgetBase) {
			this.mImage_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Icon') as mw.Image
		}
		return this.mImage_Icon_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 