




@UIBind('UI/GameUI.ui')
export default class GameUI_Generate extends UIScript {
		private backLobbyBtn_Internal: mw.Button
	public get backLobbyBtn(): mw.Button {
		if(!this.backLobbyBtn_Internal&&this.uiWidgetBase) {
			this.backLobbyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/backLobbyBtn') as mw.Button
		}
		return this.backLobbyBtn_Internal
	}
	private themeCanvas_Internal: mw.Canvas
	public get themeCanvas(): mw.Canvas {
		if(!this.themeCanvas_Internal&&this.uiWidgetBase) {
			this.themeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/themeCanvas') as mw.Canvas
		}
		return this.themeCanvas_Internal
	}
	private themeText_Internal: mw.TextBlock
	public get themeText(): mw.TextBlock {
		if(!this.themeText_Internal&&this.uiWidgetBase) {
			this.themeText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/themeCanvas/themeText') as mw.TextBlock
		}
		return this.themeText_Internal
	}
	private playerNumText_Internal: mw.TextBlock
	public get playerNumText(): mw.TextBlock {
		if(!this.playerNumText_Internal&&this.uiWidgetBase) {
			this.playerNumText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/themeCanvas/playerNumText') as mw.TextBlock
		}
		return this.playerNumText_Internal
	}
	private loadPic_Internal: mw.Image
	public get loadPic(): mw.Image {
		if(!this.loadPic_Internal&&this.uiWidgetBase) {
			this.loadPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/loadPic') as mw.Image
		}
		return this.loadPic_Internal
	}
	private countDownImg_Internal: mw.Image
	public get countDownImg(): mw.Image {
		if(!this.countDownImg_Internal&&this.uiWidgetBase) {
			this.countDownImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/countDownImg') as mw.Image
		}
		return this.countDownImg_Internal
	}
	private mVersion_Internal: mw.TextBlock
	public get mVersion(): mw.TextBlock {
		if(!this.mVersion_Internal&&this.uiWidgetBase) {
			this.mVersion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mVersion') as mw.TextBlock
		}
		return this.mVersion_Internal
	}
	private cvsScore_Internal: mw.Canvas
	public get cvsScore(): mw.Canvas {
		if(!this.cvsScore_Internal&&this.uiWidgetBase) {
			this.cvsScore_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsScore') as mw.Canvas
		}
		return this.cvsScore_Internal
	}
	private txtScore_Internal: mw.TextBlock
	public get txtScore(): mw.TextBlock {
		if(!this.txtScore_Internal&&this.uiWidgetBase) {
			this.txtScore_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cvsScore/txtScore') as mw.TextBlock
		}
		return this.txtScore_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.backLobbyBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.themeText)
		
	
		this.initLanguage(this.playerNumText)
		
	
		this.initLanguage(this.mVersion)
		
	
		this.initLanguage(this.txtScore)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/cvsScore/TextBlock") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 