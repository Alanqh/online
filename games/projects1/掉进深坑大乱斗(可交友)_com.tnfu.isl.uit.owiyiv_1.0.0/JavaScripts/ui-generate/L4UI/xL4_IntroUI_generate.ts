
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L4UI/xL4_IntroUI.ui
*/



@UIBind('UI/L4UI/xL4_IntroUI.ui')
export default class xL4_IntroUI_Generate extends UIScript {
		private gameName_Internal: mw.TextBlock
	public get gameName(): mw.TextBlock {
		if(!this.gameName_Internal&&this.uiWidgetBase) {
			this.gameName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameName') as mw.TextBlock
		}
		return this.gameName_Internal
	}
	private gameIntro_Internal: mw.TextBlock
	public get gameIntro(): mw.TextBlock {
		if(!this.gameIntro_Internal&&this.uiWidgetBase) {
			this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameIntro') as mw.TextBlock
		}
		return this.gameIntro_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 