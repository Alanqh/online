




@UIBind('UI/Prefabs/Team/TeamUI.ui')
export default class TeamUI_Generate extends UIScript {
		private teamCanvas_Internal: mw.Canvas
	public get teamCanvas(): mw.Canvas {
		if(!this.teamCanvas_Internal&&this.uiWidgetBase) {
			this.teamCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/teamCanvas') as mw.Canvas
		}
		return this.teamCanvas_Internal
	}
	private memberList_Internal: mw.Canvas
	public get memberList(): mw.Canvas {
		if(!this.memberList_Internal&&this.uiWidgetBase) {
			this.memberList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/teamCanvas/memberList') as mw.Canvas
		}
		return this.memberList_Internal
	}
	private memberCloseButton_Internal: mw.Button
	public get memberCloseButton(): mw.Button {
		if(!this.memberCloseButton_Internal&&this.uiWidgetBase) {
			this.memberCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/teamCanvas/memberCloseButton') as mw.Button
		}
		return this.memberCloseButton_Internal
	}
	private teamButton_Internal: mw.StaleButton
	public get teamButton(): mw.StaleButton {
		if(!this.teamButton_Internal&&this.uiWidgetBase) {
			this.teamButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/teamButton') as mw.StaleButton
		}
		return this.teamButton_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.teamButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.teamButton);
		
	

		//按钮添加点击
		
		this.memberCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/teamCanvas/TextBlock") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 