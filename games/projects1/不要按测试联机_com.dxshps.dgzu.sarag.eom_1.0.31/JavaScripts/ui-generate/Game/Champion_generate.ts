
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Game/Champion.ui
*/



@UIBind('UI/Game/Champion.ui')
export default class Champion_Generate extends UIScript {
		private mCanvas_PlayerInfo_Internal: mw.Canvas
	public get mCanvas_PlayerInfo(): mw.Canvas {
		if(!this.mCanvas_PlayerInfo_Internal&&this.uiWidgetBase) {
			this.mCanvas_PlayerInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo') as mw.Canvas
		}
		return this.mCanvas_PlayerInfo_Internal
	}
	private mImg_PlayerName_Internal: mw.Image
	public get mImg_PlayerName(): mw.Image {
		if(!this.mImg_PlayerName_Internal&&this.uiWidgetBase) {
			this.mImg_PlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo/mImg_PlayerName') as mw.Image
		}
		return this.mImg_PlayerName_Internal
	}
	private mText_PlayerName_Internal: mw.TextBlock
	public get mText_PlayerName(): mw.TextBlock {
		if(!this.mText_PlayerName_Internal&&this.uiWidgetBase) {
			this.mText_PlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo/mText_PlayerName') as mw.TextBlock
		}
		return this.mText_PlayerName_Internal
	}
	private mImg_Info_Internal: mw.Image
	public get mImg_Info(): mw.Image {
		if(!this.mImg_Info_Internal&&this.uiWidgetBase) {
			this.mImg_Info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo/mImg_Info') as mw.Image
		}
		return this.mImg_Info_Internal
	}
	private mText_Info_Internal: mw.TextBlock
	public get mText_Info(): mw.TextBlock {
		if(!this.mText_Info_Internal&&this.uiWidgetBase) {
			this.mText_Info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo/mText_Info') as mw.TextBlock
		}
		return this.mText_Info_Internal
	}
	private mImg_PetCard_Bg_Internal: mw.Image
	public get mImg_PetCard_Bg(): mw.Image {
		if(!this.mImg_PetCard_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_PetCard_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo/mImg_PetCard_Bg') as mw.Image
		}
		return this.mImg_PetCard_Bg_Internal
	}
	private mImg_PetCard_Internal: mw.Image
	public get mImg_PetCard(): mw.Image {
		if(!this.mImg_PetCard_Internal&&this.uiWidgetBase) {
			this.mImg_PetCard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo/mImg_PetCard') as mw.Image
		}
		return this.mImg_PetCard_Internal
	}
	private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInfo/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mCanvas_BackHall_Internal: mw.Canvas
	public get mCanvas_BackHall(): mw.Canvas {
		if(!this.mCanvas_BackHall_Internal&&this.uiWidgetBase) {
			this.mCanvas_BackHall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BackHall') as mw.Canvas
		}
		return this.mCanvas_BackHall_Internal
	}
	private mBtn_BackHall_Internal: mw.StaleButton
	public get mBtn_BackHall(): mw.StaleButton {
		if(!this.mBtn_BackHall_Internal&&this.uiWidgetBase) {
			this.mBtn_BackHall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BackHall/mBtn_BackHall') as mw.StaleButton
		}
		return this.mBtn_BackHall_Internal
	}
	private mCanvas_Time_Internal: mw.Canvas
	public get mCanvas_Time(): mw.Canvas {
		if(!this.mCanvas_Time_Internal&&this.uiWidgetBase) {
			this.mCanvas_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Time') as mw.Canvas
		}
		return this.mCanvas_Time_Internal
	}
	private mText_Time01_Internal: mw.TextBlock
	public get mText_Time01(): mw.TextBlock {
		if(!this.mText_Time01_Internal&&this.uiWidgetBase) {
			this.mText_Time01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Time/mText_Time01') as mw.TextBlock
		}
		return this.mText_Time01_Internal
	}
	private mText_Time02_Internal: mw.TextBlock
	public get mText_Time02(): mw.TextBlock {
		if(!this.mText_Time02_Internal&&this.uiWidgetBase) {
			this.mText_Time02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Time/mText_Time02') as mw.TextBlock
		}
		return this.mText_Time02_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 