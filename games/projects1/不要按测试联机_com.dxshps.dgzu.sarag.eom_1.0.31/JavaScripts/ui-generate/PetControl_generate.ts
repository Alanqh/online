
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/PetControl.ui
*/



@UIBind('UI/PetControl.ui')
export default class PetControl_Generate extends UIScript {
		private mCanvas_Control_Internal: mw.Canvas
	public get mCanvas_Control(): mw.Canvas {
		if(!this.mCanvas_Control_Internal&&this.uiWidgetBase) {
			this.mCanvas_Control_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control') as mw.Canvas
		}
		return this.mCanvas_Control_Internal
	}
	private mCanvas_Jump_Internal: mw.Canvas
	public get mCanvas_Jump(): mw.Canvas {
		if(!this.mCanvas_Jump_Internal&&this.uiWidgetBase) {
			this.mCanvas_Jump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Jump') as mw.Canvas
		}
		return this.mCanvas_Jump_Internal
	}
	private mBtn_Jump_Pet_Internal: mw.Button
	public get mBtn_Jump_Pet(): mw.Button {
		if(!this.mBtn_Jump_Pet_Internal&&this.uiWidgetBase) {
			this.mBtn_Jump_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Jump/mBtn_Jump_Pet') as mw.Button
		}
		return this.mBtn_Jump_Pet_Internal
	}
	private mCanvas_Dive_Internal: mw.Canvas
	public get mCanvas_Dive(): mw.Canvas {
		if(!this.mCanvas_Dive_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dive_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Dive') as mw.Canvas
		}
		return this.mCanvas_Dive_Internal
	}
	private mBtn_Dive_Internal: mw.Button
	public get mBtn_Dive(): mw.Button {
		if(!this.mBtn_Dive_Internal&&this.uiWidgetBase) {
			this.mBtn_Dive_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Dive/mBtn_Dive') as mw.Button
		}
		return this.mBtn_Dive_Internal
	}
	private mCanvas_Speed_Internal: mw.Canvas
	public get mCanvas_Speed(): mw.Canvas {
		if(!this.mCanvas_Speed_Internal&&this.uiWidgetBase) {
			this.mCanvas_Speed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Speed') as mw.Canvas
		}
		return this.mCanvas_Speed_Internal
	}
	private mImage_Glow_Internal: mw.Image
	public get mImage_Glow(): mw.Image {
		if(!this.mImage_Glow_Internal&&this.uiWidgetBase) {
			this.mImage_Glow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Speed/mImage_Glow') as mw.Image
		}
		return this.mImage_Glow_Internal
	}
	private mBtn_Speed_Internal: mw.Button
	public get mBtn_Speed(): mw.Button {
		if(!this.mBtn_Speed_Internal&&this.uiWidgetBase) {
			this.mBtn_Speed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Speed/mBtn_Speed') as mw.Button
		}
		return this.mBtn_Speed_Internal
	}
	private mText_Cooldown_Internal: mw.TextBlock
	public get mText_Cooldown(): mw.TextBlock {
		if(!this.mText_Cooldown_Internal&&this.uiWidgetBase) {
			this.mText_Cooldown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Speed/mText_Cooldown') as mw.TextBlock
		}
		return this.mText_Cooldown_Internal
	}
	private mCanvas_Tool_Internal: mw.Canvas
	public get mCanvas_Tool(): mw.Canvas {
		if(!this.mCanvas_Tool_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Tool') as mw.Canvas
		}
		return this.mCanvas_Tool_Internal
	}
	private mBtn_Tool_Internal: mw.Button
	public get mBtn_Tool(): mw.Button {
		if(!this.mBtn_Tool_Internal&&this.uiWidgetBase) {
			this.mBtn_Tool_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Control/mCanvas_Tool/mBtn_Tool') as mw.Button
		}
		return this.mBtn_Tool_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 