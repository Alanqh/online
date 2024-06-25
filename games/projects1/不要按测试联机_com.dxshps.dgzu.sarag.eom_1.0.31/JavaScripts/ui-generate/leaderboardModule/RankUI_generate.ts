
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/leaderboardModule/RankUI.ui
*/



@UIBind('UI/leaderboardModule/RankUI.ui')
export default class RankUI_Generate extends UIScript {
		private tab1_Internal: mw.StaleButton
	public get tab1(): mw.StaleButton {
		if(!this.tab1_Internal&&this.uiWidgetBase) {
			this.tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_2/tab1') as mw.StaleButton
		}
		return this.tab1_Internal
	}
	private tab2_Internal: mw.StaleButton
	public get tab2(): mw.StaleButton {
		if(!this.tab2_Internal&&this.uiWidgetBase) {
			this.tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_2/tab2') as mw.StaleButton
		}
		return this.tab2_Internal
	}
	private title_Internal: mw.TextBlock
	public get title(): mw.TextBlock {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle/sizeCanvas/title') as mw.TextBlock
		}
		return this.title_Internal
	}
	private sizeCanvas_Internal: mw.Canvas
	public get sizeCanvas(): mw.Canvas {
		if(!this.sizeCanvas_Internal&&this.uiWidgetBase) {
			this.sizeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle/sizeCanvas') as mw.Canvas
		}
		return this.sizeCanvas_Internal
	}
	private canvasTitle_Internal: mw.Canvas
	public get canvasTitle(): mw.Canvas {
		if(!this.canvasTitle_Internal&&this.uiWidgetBase) {
			this.canvasTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle') as mw.Canvas
		}
		return this.canvasTitle_Internal
	}
	private title1_Internal: mw.TextBlock
	public get title1(): mw.TextBlock {
		if(!this.title1_Internal&&this.uiWidgetBase) {
			this.title1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle1/sizeCanvas1/title1') as mw.TextBlock
		}
		return this.title1_Internal
	}
	private sizeCanvas1_Internal: mw.Canvas
	public get sizeCanvas1(): mw.Canvas {
		if(!this.sizeCanvas1_Internal&&this.uiWidgetBase) {
			this.sizeCanvas1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle1/sizeCanvas1') as mw.Canvas
		}
		return this.sizeCanvas1_Internal
	}
	private canvasTitle1_Internal: mw.Canvas
	public get canvasTitle1(): mw.Canvas {
		if(!this.canvasTitle1_Internal&&this.uiWidgetBase) {
			this.canvasTitle1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle1') as mw.Canvas
		}
		return this.canvasTitle1_Internal
	}
	private title2_Internal: mw.TextBlock
	public get title2(): mw.TextBlock {
		if(!this.title2_Internal&&this.uiWidgetBase) {
			this.title2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle2/sizeCanvas2/title2') as mw.TextBlock
		}
		return this.title2_Internal
	}
	private sizeCanvas2_Internal: mw.Canvas
	public get sizeCanvas2(): mw.Canvas {
		if(!this.sizeCanvas2_Internal&&this.uiWidgetBase) {
			this.sizeCanvas2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle2/sizeCanvas2') as mw.Canvas
		}
		return this.sizeCanvas2_Internal
	}
	private canvasTitle2_Internal: mw.Canvas
	public get canvasTitle2(): mw.Canvas {
		if(!this.canvasTitle2_Internal&&this.uiWidgetBase) {
			this.canvasTitle2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle2') as mw.Canvas
		}
		return this.canvasTitle2_Internal
	}
	private title3_Internal: mw.TextBlock
	public get title3(): mw.TextBlock {
		if(!this.title3_Internal&&this.uiWidgetBase) {
			this.title3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle3/sizeCanvas3/title3') as mw.TextBlock
		}
		return this.title3_Internal
	}
	private sizeCanvas3_Internal: mw.Canvas
	public get sizeCanvas3(): mw.Canvas {
		if(!this.sizeCanvas3_Internal&&this.uiWidgetBase) {
			this.sizeCanvas3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle3/sizeCanvas3') as mw.Canvas
		}
		return this.sizeCanvas3_Internal
	}
	private canvasTitle3_Internal: mw.Canvas
	public get canvasTitle3(): mw.Canvas {
		if(!this.canvasTitle3_Internal&&this.uiWidgetBase) {
			this.canvasTitle3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas/canvasTitle3') as mw.Canvas
		}
		return this.canvasTitle3_Internal
	}
	private titleCanvas_Internal: mw.Canvas
	public get titleCanvas(): mw.Canvas {
		if(!this.titleCanvas_Internal&&this.uiWidgetBase) {
			this.titleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/Canvas/titleCanvas') as mw.Canvas
		}
		return this.titleCanvas_Internal
	}
	private content_Internal: mw.Canvas
	public get content(): mw.Canvas {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/scrollBox/content') as mw.Canvas
		}
		return this.content_Internal
	}
	private scrollBox_Internal: mw.ScrollBox
	public get scrollBox(): mw.ScrollBox {
		if(!this.scrollBox_Internal&&this.uiWidgetBase) {
			this.scrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/scrollBox') as mw.ScrollBox
		}
		return this.scrollBox_Internal
	}
	private myRank_Internal: mw.Canvas
	public get myRank(): mw.Canvas {
		if(!this.myRank_Internal&&this.uiWidgetBase) {
			this.myRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas/myRank') as mw.Canvas
		}
		return this.myRank_Internal
	}
	private rankCanvas_Internal: mw.Canvas
	public get rankCanvas(): mw.Canvas {
		if(!this.rankCanvas_Internal&&this.uiWidgetBase) {
			this.rankCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView/Canvas_5/rankCanvas') as mw.Canvas
		}
		return this.rankCanvas_Internal
	}
	private rankView_Internal: mw.Canvas
	public get rankView(): mw.Canvas {
		if(!this.rankView_Internal&&this.uiWidgetBase) {
			this.rankView_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/rankView') as mw.Canvas
		}
		return this.rankView_Internal
	}
	private button_Internal: mw.Button
	public get button(): mw.Button {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/button') as mw.Button
		}
		return this.button_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 