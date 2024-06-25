
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/ChatWheelItem.ui
*/



@UIBind('UI/ChatWheelItem.ui')
export default class ChatWheelItem_Generate extends UIScript {
		private img_Bg_Internal: mw.Image
	public get img_Bg(): mw.Image {
		if(!this.img_Bg_Internal&&this.uiWidgetBase) {
			this.img_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Bg') as mw.Image
		}
		return this.img_Bg_Internal
	}
	private canvas_Item_Internal: mw.Canvas
	public get canvas_Item(): mw.Canvas {
		if(!this.canvas_Item_Internal&&this.uiWidgetBase) {
			this.canvas_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Item') as mw.Canvas
		}
		return this.canvas_Item_Internal
	}
	private img_Icon_Internal: mw.Image
	public get img_Icon(): mw.Image {
		if(!this.img_Icon_Internal&&this.uiWidgetBase) {
			this.img_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Item/img_Icon') as mw.Image
		}
		return this.img_Icon_Internal
	}
	private txt_Name_Internal: mw.TextBlock
	public get txt_Name(): mw.TextBlock {
		if(!this.txt_Name_Internal&&this.uiWidgetBase) {
			this.txt_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Item/txt_Name') as mw.TextBlock
		}
		return this.txt_Name_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 