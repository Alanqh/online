




@UIBind('UI/Prefabs/CameraEditor/UI/CameraMainPanel.ui')
export default class CameraMainPanel_Generate extends UIScript {
		private lineCanvas_Internal: mw.Canvas
	public get lineCanvas(): mw.Canvas {
		if(!this.lineCanvas_Internal&&this.uiWidgetBase) {
			this.lineCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/lineCanvas') as mw.Canvas
		}
		return this.lineCanvas_Internal
	}
	private keyFlag_Internal: mw.Image
	public get keyFlag(): mw.Image {
		if(!this.keyFlag_Internal&&this.uiWidgetBase) {
			this.keyFlag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/keyFlag') as mw.Image
		}
		return this.keyFlag_Internal
	}
	private addTime_Internal: mw.Button
	public get addTime(): mw.Button {
		if(!this.addTime_Internal&&this.uiWidgetBase) {
			this.addTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/addTime') as mw.Button
		}
		return this.addTime_Internal
	}
	private subTime_Internal: mw.Button
	public get subTime(): mw.Button {
		if(!this.subTime_Internal&&this.uiWidgetBase) {
			this.subTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/subTime') as mw.Button
		}
		return this.subTime_Internal
	}
	private exportBtn_Internal: mw.Button
	public get exportBtn(): mw.Button {
		if(!this.exportBtn_Internal&&this.uiWidgetBase) {
			this.exportBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/exportBtn') as mw.Button
		}
		return this.exportBtn_Internal
	}
	private importBtn_Internal: mw.Button
	public get importBtn(): mw.Button {
		if(!this.importBtn_Internal&&this.uiWidgetBase) {
			this.importBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/importBtn') as mw.Button
		}
		return this.importBtn_Internal
	}
	private addButton_Internal: mw.Button
	public get addButton(): mw.Button {
		if(!this.addButton_Internal&&this.uiWidgetBase) {
			this.addButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/addButton') as mw.Button
		}
		return this.addButton_Internal
	}
	private delButton_Internal: mw.Button
	public get delButton(): mw.Button {
		if(!this.delButton_Internal&&this.uiWidgetBase) {
			this.delButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/delButton') as mw.Button
		}
		return this.delButton_Internal
	}
	private playButton_Internal: mw.Button
	public get playButton(): mw.Button {
		if(!this.playButton_Internal&&this.uiWidgetBase) {
			this.playButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playButton') as mw.Button
		}
		return this.playButton_Internal
	}
	private alignButton_Internal: mw.Button
	public get alignButton(): mw.Button {
		if(!this.alignButton_Internal&&this.uiWidgetBase) {
			this.alignButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/alignButton') as mw.Button
		}
		return this.alignButton_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.addTime.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.subTime.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.exportBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.importBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.addButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.delButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.playButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	
		this.alignButton.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 