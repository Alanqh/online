
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Prefabs/排行榜系统/UI/UIRankItem.ui
*/



@UIBind('UI/Prefabs/排行榜系统/UI/UIRankItem.ui')
export default class UIRankItem_Generate extends UIScript {
		private rankText_Internal: mw.TextBlock
	public get rankText(): mw.TextBlock {
		if(!this.rankText_Internal&&this.uiWidgetBase) {
			this.rankText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/rankText') as mw.TextBlock
		}
		return this.rankText_Internal
	}
	private gradeText_Internal: mw.TextBlock
	public get gradeText(): mw.TextBlock {
		if(!this.gradeText_Internal&&this.uiWidgetBase) {
			this.gradeText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/gradeText') as mw.TextBlock
		}
		return this.gradeText_Internal
	}
	private nameText_Internal: mw.TextBlock
	public get nameText(): mw.TextBlock {
		if(!this.nameText_Internal&&this.uiWidgetBase) {
			this.nameText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/nameText') as mw.TextBlock
		}
		return this.nameText_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 