




@UIBind('UI/EndRank.ui')
export default class EndRank_Generate extends UIScript {
		private jumpCamera_Internal: mw.StaleButton
	public get jumpCamera(): mw.StaleButton {
		if(!this.jumpCamera_Internal&&this.uiWidgetBase) {
			this.jumpCamera_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/jumpCamera') as mw.StaleButton
		}
		return this.jumpCamera_Internal
	}
	private completeTimeTxt_Internal: mw.TextBlock
	public get completeTimeTxt(): mw.TextBlock {
		if(!this.completeTimeTxt_Internal&&this.uiWidgetBase) {
			this.completeTimeTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/completeTimeTxt') as mw.TextBlock
		}
		return this.completeTimeTxt_Internal
	}
	private menberName_Internal: mw.TextBlock
	public get menberName(): mw.TextBlock {
		if(!this.menberName_Internal&&this.uiWidgetBase) {
			this.menberName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/menberName') as mw.TextBlock
		}
		return this.menberName_Internal
	}
	private goodText_Internal: mw.TextBlock
	public get goodText(): mw.TextBlock {
		if(!this.goodText_Internal&&this.uiWidgetBase) {
			this.goodText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goodText') as mw.TextBlock
		}
		return this.goodText_Internal
	}
	private goodImg_Internal: mw.Image
	public get goodImg(): mw.Image {
		if(!this.goodImg_Internal&&this.uiWidgetBase) {
			this.goodImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goodImg') as mw.Image
		}
		return this.goodImg_Internal
	}
	private goodBtn_Internal: mw.Button
	public get goodBtn(): mw.Button {
		if(!this.goodBtn_Internal&&this.uiWidgetBase) {
			this.goodBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/goodBtn') as mw.Button
		}
		return this.goodBtn_Internal
	}
	private textName_Internal: mw.TextBlock
	public get textName(): mw.TextBlock {
		if(!this.textName_Internal&&this.uiWidgetBase) {
			this.textName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/textName') as mw.TextBlock
		}
		return this.textName_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.jumpCamera.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.jumpCamera);
		
	

		//按钮添加点击
		
		this.goodBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.completeTimeTxt)
		
	
		this.initLanguage(this.menberName)
		
	
		this.initLanguage(this.goodText)
		
	
		this.initLanguage(this.textName)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 