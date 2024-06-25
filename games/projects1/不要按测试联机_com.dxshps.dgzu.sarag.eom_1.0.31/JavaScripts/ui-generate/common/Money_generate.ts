
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/Money.ui
*/



@UIBind('UI/common/Money.ui')
export default class Money_Generate extends UIScript {
		private mText_money_Internal: mw.TextBlock
	public get mText_money(): mw.TextBlock {
		if(!this.mText_money_Internal&&this.uiWidgetBase) {
			this.mText_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMoney_Canvas/mText_money') as mw.TextBlock
		}
		return this.mText_money_Internal
	}
	private mMoney_Canvas_Internal: mw.Canvas
	public get mMoney_Canvas(): mw.Canvas {
		if(!this.mMoney_Canvas_Internal&&this.uiWidgetBase) {
			this.mMoney_Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMoney_Canvas') as mw.Canvas
		}
		return this.mMoney_Canvas_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 