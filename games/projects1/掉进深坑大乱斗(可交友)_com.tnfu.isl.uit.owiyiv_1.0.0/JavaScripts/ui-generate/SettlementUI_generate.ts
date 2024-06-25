
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/SettlementUI.ui
*/



@UIBind('UI/SettlementUI.ui')
export default class SettlementUI_Generate extends UIScript {
		private playerName_Internal: mw.TextBlock
	public get playerName(): mw.TextBlock {
		if(!this.playerName_Internal&&this.uiWidgetBase) {
			this.playerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName') as mw.TextBlock
		}
		return this.playerName_Internal
	}
	private winCount_Internal: mw.TextBlock
	public get winCount(): mw.TextBlock {
		if(!this.winCount_Internal&&this.uiWidgetBase) {
			this.winCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/winCount') as mw.TextBlock
		}
		return this.winCount_Internal
	}
	private closeButton_Internal: mw.Button
	public get closeButton(): mw.Button {
		if(!this.closeButton_Internal&&this.uiWidgetBase) {
			this.closeButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/closeButton') as mw.Button
		}
		return this.closeButton_Internal
	}
	private winUmb_Internal: mw.TextBlock
	public get winUmb(): mw.TextBlock {
		if(!this.winUmb_Internal&&this.uiWidgetBase) {
			this.winUmb_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/winUmb') as mw.TextBlock
		}
		return this.winUmb_Internal
	}
	private winCoin_Internal: mw.TextBlock
	public get winCoin(): mw.TextBlock {
		if(!this.winCoin_Internal&&this.uiWidgetBase) {
			this.winCoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/winCoin') as mw.TextBlock
		}
		return this.winCoin_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 