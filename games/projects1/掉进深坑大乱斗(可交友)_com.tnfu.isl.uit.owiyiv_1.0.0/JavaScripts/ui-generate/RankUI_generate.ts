
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/RankUI.ui
*/



@UIBind('UI/RankUI.ui')
export default class RankUI_Generate extends UIScript {
		private rankName_Internal: mw.TextBlock
	public get rankName(): mw.TextBlock {
		if(!this.rankName_Internal&&this.uiWidgetBase) {
			this.rankName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName') as mw.TextBlock
		}
		return this.rankName_Internal
	}
	private playerName1_Internal: mw.TextBlock
	public get playerName1(): mw.TextBlock {
		if(!this.playerName1_Internal&&this.uiWidgetBase) {
			this.playerName1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName1') as mw.TextBlock
		}
		return this.playerName1_Internal
	}
	private playerName2_Internal: mw.TextBlock
	public get playerName2(): mw.TextBlock {
		if(!this.playerName2_Internal&&this.uiWidgetBase) {
			this.playerName2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName2') as mw.TextBlock
		}
		return this.playerName2_Internal
	}
	private playerName3_Internal: mw.TextBlock
	public get playerName3(): mw.TextBlock {
		if(!this.playerName3_Internal&&this.uiWidgetBase) {
			this.playerName3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName3') as mw.TextBlock
		}
		return this.playerName3_Internal
	}
	private rankName1_Internal: mw.TextBlock
	public get rankName1(): mw.TextBlock {
		if(!this.rankName1_Internal&&this.uiWidgetBase) {
			this.rankName1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName1') as mw.TextBlock
		}
		return this.rankName1_Internal
	}
	private rankName2_Internal: mw.TextBlock
	public get rankName2(): mw.TextBlock {
		if(!this.rankName2_Internal&&this.uiWidgetBase) {
			this.rankName2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName2') as mw.TextBlock
		}
		return this.rankName2_Internal
	}
	private rankName3_Internal: mw.TextBlock
	public get rankName3(): mw.TextBlock {
		if(!this.rankName3_Internal&&this.uiWidgetBase) {
			this.rankName3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName3') as mw.TextBlock
		}
		return this.rankName3_Internal
	}
	private selfRankId_Internal: mw.TextBlock
	public get selfRankId(): mw.TextBlock {
		if(!this.selfRankId_Internal&&this.uiWidgetBase) {
			this.selfRankId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/selfRankId') as mw.TextBlock
		}
		return this.selfRankId_Internal
	}
	private selfRankName_Internal: mw.TextBlock
	public get selfRankName(): mw.TextBlock {
		if(!this.selfRankName_Internal&&this.uiWidgetBase) {
			this.selfRankName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/selfRankName') as mw.TextBlock
		}
		return this.selfRankName_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 