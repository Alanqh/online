
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Hall/C_Card_Other.ui
*/



@UIBind('UI/Hall/C_Card_Other.ui')
export default class C_Card_Other_Generate extends UIScript {
		private mImage_Profile_Internal: mw.Image
	public get mImage_Profile(): mw.Image {
		if(!this.mImage_Profile_Internal&&this.uiWidgetBase) {
			this.mImage_Profile_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Profile') as mw.Image
		}
		return this.mImage_Profile_Internal
	}
	private mText_PlayerName_Internal: mw.TextBlock
	public get mText_PlayerName(): mw.TextBlock {
		if(!this.mText_PlayerName_Internal&&this.uiWidgetBase) {
			this.mText_PlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_PlayerName') as mw.TextBlock
		}
		return this.mText_PlayerName_Internal
	}
	private mCanvas_Information1_Internal: mw.Canvas
	public get mCanvas_Information1(): mw.Canvas {
		if(!this.mCanvas_Information1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Information1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information1') as mw.Canvas
		}
		return this.mCanvas_Information1_Internal
	}
	private mText_Name1_Internal: mw.TextBlock
	public get mText_Name1(): mw.TextBlock {
		if(!this.mText_Name1_Internal&&this.uiWidgetBase) {
			this.mText_Name1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information1/mText_Name1') as mw.TextBlock
		}
		return this.mText_Name1_Internal
	}
	private mText_Count1_Internal: mw.TextBlock
	public get mText_Count1(): mw.TextBlock {
		if(!this.mText_Count1_Internal&&this.uiWidgetBase) {
			this.mText_Count1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information1/mText_Count1') as mw.TextBlock
		}
		return this.mText_Count1_Internal
	}
	private mCanvas_Information2_Internal: mw.Canvas
	public get mCanvas_Information2(): mw.Canvas {
		if(!this.mCanvas_Information2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Information2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information2') as mw.Canvas
		}
		return this.mCanvas_Information2_Internal
	}
	private mText_Name2_Internal: mw.TextBlock
	public get mText_Name2(): mw.TextBlock {
		if(!this.mText_Name2_Internal&&this.uiWidgetBase) {
			this.mText_Name2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information2/mText_Name2') as mw.TextBlock
		}
		return this.mText_Name2_Internal
	}
	private mText_Count2_Internal: mw.TextBlock
	public get mText_Count2(): mw.TextBlock {
		if(!this.mText_Count2_Internal&&this.uiWidgetBase) {
			this.mText_Count2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information2/mText_Count2') as mw.TextBlock
		}
		return this.mText_Count2_Internal
	}
	private mCanvas_Information3_Internal: mw.Canvas
	public get mCanvas_Information3(): mw.Canvas {
		if(!this.mCanvas_Information3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Information3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information3') as mw.Canvas
		}
		return this.mCanvas_Information3_Internal
	}
	private mText_Name3_Internal: mw.TextBlock
	public get mText_Name3(): mw.TextBlock {
		if(!this.mText_Name3_Internal&&this.uiWidgetBase) {
			this.mText_Name3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information3/mText_Name3') as mw.TextBlock
		}
		return this.mText_Name3_Internal
	}
	private mText_Count3_Internal: mw.TextBlock
	public get mText_Count3(): mw.TextBlock {
		if(!this.mText_Count3_Internal&&this.uiWidgetBase) {
			this.mText_Count3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information3/mText_Count3') as mw.TextBlock
		}
		return this.mText_Count3_Internal
	}
	private mCanvas_Information4_Internal: mw.Canvas
	public get mCanvas_Information4(): mw.Canvas {
		if(!this.mCanvas_Information4_Internal&&this.uiWidgetBase) {
			this.mCanvas_Information4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information4') as mw.Canvas
		}
		return this.mCanvas_Information4_Internal
	}
	private mText_Name4_Internal: mw.TextBlock
	public get mText_Name4(): mw.TextBlock {
		if(!this.mText_Name4_Internal&&this.uiWidgetBase) {
			this.mText_Name4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information4/mText_Name4') as mw.TextBlock
		}
		return this.mText_Name4_Internal
	}
	private mText_Count4_Internal: mw.TextBlock
	public get mText_Count4(): mw.TextBlock {
		if(!this.mText_Count4_Internal&&this.uiWidgetBase) {
			this.mText_Count4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Information4/mText_Count4') as mw.TextBlock
		}
		return this.mText_Count4_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 