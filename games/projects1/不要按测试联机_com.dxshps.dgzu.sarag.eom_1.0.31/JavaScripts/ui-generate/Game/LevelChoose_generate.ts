
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Game/LevelChoose.ui
*/



@UIBind('UI/Game/LevelChoose.ui')
export default class LevelChoose_Generate extends UIScript {
		private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private mTextBlockTips_Internal: mw.TextBlock
	public get mTextBlockTips(): mw.TextBlock {
		if(!this.mTextBlockTips_Internal&&this.uiWidgetBase) {
			this.mTextBlockTips_Internal = this.uiWidgetBase.findChildByPath('canvas/mTextBlockTips') as mw.TextBlock
		}
		return this.mTextBlockTips_Internal
	}
	private mTextBlockRound_Internal: mw.TextBlock
	public get mTextBlockRound(): mw.TextBlock {
		if(!this.mTextBlockRound_Internal&&this.uiWidgetBase) {
			this.mTextBlockRound_Internal = this.uiWidgetBase.findChildByPath('canvas/mTextBlockRound') as mw.TextBlock
		}
		return this.mTextBlockRound_Internal
	}
	private mIconCanvas_Internal: mw.Canvas
	public get mIconCanvas(): mw.Canvas {
		if(!this.mIconCanvas_Internal&&this.uiWidgetBase) {
			this.mIconCanvas_Internal = this.uiWidgetBase.findChildByPath('canvas/mIconCanvas') as mw.Canvas
		}
		return this.mIconCanvas_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 