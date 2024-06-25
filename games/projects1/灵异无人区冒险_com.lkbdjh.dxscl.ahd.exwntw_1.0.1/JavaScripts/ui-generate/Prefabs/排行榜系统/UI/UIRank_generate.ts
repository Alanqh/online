
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Prefabs/排行榜系统/UI/UIRank.ui
*/



@UIBind('UI/Prefabs/排行榜系统/UI/UIRank.ui')
export default class UIRank_Generate extends UIScript {
		private contentCanvas_Internal: mw.Canvas
	public get contentCanvas(): mw.Canvas {
		if(!this.contentCanvas_Internal&&this.uiWidgetBase) {
			this.contentCanvas_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas') as mw.Canvas
		}
		return this.contentCanvas_Internal
	}
	private rankBg_Internal: mw.Image
	public get rankBg(): mw.Image {
		if(!this.rankBg_Internal&&this.uiWidgetBase) {
			this.rankBg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/rankBg') as mw.Image
		}
		return this.rankBg_Internal
	}
	private rankText_Internal: mw.TextBlock
	public get rankText(): mw.TextBlock {
		if(!this.rankText_Internal&&this.uiWidgetBase) {
			this.rankText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/rankText') as mw.TextBlock
		}
		return this.rankText_Internal
	}
	private gradeText_Internal: mw.TextBlock
	public get gradeText(): mw.TextBlock {
		if(!this.gradeText_Internal&&this.uiWidgetBase) {
			this.gradeText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/gradeText') as mw.TextBlock
		}
		return this.gradeText_Internal
	}
	private nameText_Internal: mw.TextBlock
	public get nameText(): mw.TextBlock {
		if(!this.nameText_Internal&&this.uiWidgetBase) {
			this.nameText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/nameText') as mw.TextBlock
		}
		return this.nameText_Internal
	}
	private putBtn_Internal: mw.StaleButton
	public get putBtn(): mw.StaleButton {
		if(!this.putBtn_Internal&&this.uiWidgetBase) {
			this.putBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/putBtn') as mw.StaleButton
		}
		return this.putBtn_Internal
	}
	private list_Internal: mw.ScrollBox
	public get list(): mw.ScrollBox {
		if(!this.list_Internal&&this.uiWidgetBase) {
			this.list_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/list') as mw.ScrollBox
		}
		return this.list_Internal
	}
	private btnLeft_Internal: mw.Button
	public get btnLeft(): mw.Button {
		if(!this.btnLeft_Internal&&this.uiWidgetBase) {
			this.btnLeft_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/btnLeft') as mw.Button
		}
		return this.btnLeft_Internal
	}
	private btnRight_Internal: mw.Button
	public get btnRight(): mw.Button {
		if(!this.btnRight_Internal&&this.uiWidgetBase) {
			this.btnRight_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/btnRight') as mw.Button
		}
		return this.btnRight_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 