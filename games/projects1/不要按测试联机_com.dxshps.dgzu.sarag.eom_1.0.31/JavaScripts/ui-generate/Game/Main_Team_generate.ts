
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Game/Main_Team.ui
*/



@UIBind('UI/Game/Main_Team.ui')
export default class Main_Team_Generate extends UIScript {
		private mCanvas_Team_Internal: mw.Canvas
	public get mCanvas_Team(): mw.Canvas {
		if(!this.mCanvas_Team_Internal&&this.uiWidgetBase) {
			this.mCanvas_Team_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team') as mw.Canvas
		}
		return this.mCanvas_Team_Internal
	}
	private mCanvas_TeamEntrance_Internal: mw.Canvas
	public get mCanvas_TeamEntrance(): mw.Canvas {
		if(!this.mCanvas_TeamEntrance_Internal&&this.uiWidgetBase) {
			this.mCanvas_TeamEntrance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamEntrance') as mw.Canvas
		}
		return this.mCanvas_TeamEntrance_Internal
	}
	private mImg_TeamEntrance_Internal: mw.Image
	public get mImg_TeamEntrance(): mw.Image {
		if(!this.mImg_TeamEntrance_Internal&&this.uiWidgetBase) {
			this.mImg_TeamEntrance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamEntrance/mImg_TeamEntrance') as mw.Image
		}
		return this.mImg_TeamEntrance_Internal
	}
	private mBtn_TeamEntrance_Internal: mw.StaleButton
	public get mBtn_TeamEntrance(): mw.StaleButton {
		if(!this.mBtn_TeamEntrance_Internal&&this.uiWidgetBase) {
			this.mBtn_TeamEntrance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamEntrance/mBtn_TeamEntrance') as mw.StaleButton
		}
		return this.mBtn_TeamEntrance_Internal
	}
	private mText_TeamEntrance_Internal: mw.TextBlock
	public get mText_TeamEntrance(): mw.TextBlock {
		if(!this.mText_TeamEntrance_Internal&&this.uiWidgetBase) {
			this.mText_TeamEntrance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamEntrance/mText_TeamEntrance') as mw.TextBlock
		}
		return this.mText_TeamEntrance_Internal
	}
	private mCanvas_TeamList_Internal: mw.Canvas
	public get mCanvas_TeamList(): mw.Canvas {
		if(!this.mCanvas_TeamList_Internal&&this.uiWidgetBase) {
			this.mCanvas_TeamList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamList') as mw.Canvas
		}
		return this.mCanvas_TeamList_Internal
	}
	private mImg_TeamList_Bg01_Internal: mw.Image
	public get mImg_TeamList_Bg01(): mw.Image {
		if(!this.mImg_TeamList_Bg01_Internal&&this.uiWidgetBase) {
			this.mImg_TeamList_Bg01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamList/mImg_TeamList_Bg01') as mw.Image
		}
		return this.mImg_TeamList_Bg01_Internal
	}
	private mBtn_TeamList_Close_Internal: mw.Button
	public get mBtn_TeamList_Close(): mw.Button {
		if(!this.mBtn_TeamList_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_TeamList_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamList/mBtn_TeamList_Close') as mw.Button
		}
		return this.mBtn_TeamList_Close_Internal
	}
	private mBtn_Invent_Internal: mw.StaleButton
	public get mBtn_Invent(): mw.StaleButton {
		if(!this.mBtn_Invent_Internal&&this.uiWidgetBase) {
			this.mBtn_Invent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamList/mBtn_Invent') as mw.StaleButton
		}
		return this.mBtn_Invent_Internal
	}
	private mBtn_Exit_Internal: mw.StaleButton
	public get mBtn_Exit(): mw.StaleButton {
		if(!this.mBtn_Exit_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamList/mBtn_Exit') as mw.StaleButton
		}
		return this.mBtn_Exit_Internal
	}
	private mCanvas_TeamL_Internal: mw.Canvas
	public get mCanvas_TeamL(): mw.Canvas {
		if(!this.mCanvas_TeamL_Internal&&this.uiWidgetBase) {
			this.mCanvas_TeamL_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Team/mCanvas_TeamList/mCanvas_TeamL') as mw.Canvas
		}
		return this.mCanvas_TeamL_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 