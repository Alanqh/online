
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/PlayerName.ui
*/



@UIBind('UI/PlayerName.ui')
export default class PlayerName_Generate extends UIScript {
		private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private mText_PlayerName_Internal: mw.TextBlock
	public get mText_PlayerName(): mw.TextBlock {
		if(!this.mText_PlayerName_Internal&&this.uiWidgetBase) {
			this.mText_PlayerName_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mText_PlayerName') as mw.TextBlock
		}
		return this.mText_PlayerName_Internal
	}
	private mText_PetName_Internal: mw.TextBlock
	public get mText_PetName(): mw.TextBlock {
		if(!this.mText_PetName_Internal&&this.uiWidgetBase) {
			this.mText_PetName_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mText_PetName') as mw.TextBlock
		}
		return this.mText_PetName_Internal
	}
	private mCanvas_Rank_1_Internal: mw.Canvas
	public get mCanvas_Rank_1(): mw.Canvas {
		if(!this.mCanvas_Rank_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Rank_1') as mw.Canvas
		}
		return this.mCanvas_Rank_1_Internal
	}
	private mImg_BG_1_Internal: mw.Image
	public get mImg_BG_1(): mw.Image {
		if(!this.mImg_BG_1_Internal&&this.uiWidgetBase) {
			this.mImg_BG_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Rank_1/mImg_BG_1') as mw.Image
		}
		return this.mImg_BG_1_Internal
	}
	private mText_Rank_1_Internal: mw.TextBlock
	public get mText_Rank_1(): mw.TextBlock {
		if(!this.mText_Rank_1_Internal&&this.uiWidgetBase) {
			this.mText_Rank_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Rank_1/mText_Rank_1') as mw.TextBlock
		}
		return this.mText_Rank_1_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 