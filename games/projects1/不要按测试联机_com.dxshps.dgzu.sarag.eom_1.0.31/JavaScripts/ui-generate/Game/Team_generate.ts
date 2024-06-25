
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Game/Team.ui
*/



@UIBind('UI/Game/Team.ui')
export default class Team_Generate extends UIScript {
		private mCanvas_Team_Internal: mw.Canvas
	public get mCanvas_Team(): mw.Canvas {
		if(!this.mCanvas_Team_Internal&&this.uiWidgetBase) {
			this.mCanvas_Team_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team') as mw.Canvas
		}
		return this.mCanvas_Team_Internal
	}
	private mImg_Team_Bg_Internal: mw.Image
	public get mImg_Team_Bg(): mw.Image {
		if(!this.mImg_Team_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_Team_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mImg_Team_Bg') as mw.Image
		}
		return this.mImg_Team_Bg_Internal
	}
	private mText_Team_Num_Internal: mw.TextBlock
	public get mText_Team_Num(): mw.TextBlock {
		if(!this.mText_Team_Num_Internal&&this.uiWidgetBase) {
			this.mText_Team_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mText_Team_Num') as mw.TextBlock
		}
		return this.mText_Team_Num_Internal
	}
	private mText_Team_Name_Internal: mw.TextBlock
	public get mText_Team_Name(): mw.TextBlock {
		if(!this.mText_Team_Name_Internal&&this.uiWidgetBase) {
			this.mText_Team_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mText_Team_Name') as mw.TextBlock
		}
		return this.mText_Team_Name_Internal
	}
	private mText_Team_Captain_Internal: mw.TextBlock
	public get mText_Team_Captain(): mw.TextBlock {
		if(!this.mText_Team_Captain_Internal&&this.uiWidgetBase) {
			this.mText_Team_Captain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mText_Team_Captain') as mw.TextBlock
		}
		return this.mText_Team_Captain_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 