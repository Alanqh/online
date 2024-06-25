
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/AnimationEditor/infoItem.ui')
export default class infoItem_Generate extends UIScript {
		private mSelectImage_Internal: mw.Image
	public get mSelectImage(): mw.Image {
		if(!this.mSelectImage_Internal&&this.uiWidgetBase) {
			this.mSelectImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectImage') as mw.Image
		}
		return this.mSelectImage_Internal
	}
	private selectButton_Internal: mw.Button
	public get selectButton(): mw.Button {
		if(!this.selectButton_Internal&&this.uiWidgetBase) {
			this.selectButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectButton') as mw.Button
		}
		return this.selectButton_Internal
	}
	private index_Internal: mw.TextBlock
	public get index(): mw.TextBlock {
		if(!this.index_Internal&&this.uiWidgetBase) {
			this.index_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/index') as mw.TextBlock
		}
		return this.index_Internal
	}
	private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private time_Internal: mw.TextBlock
	public get time(): mw.TextBlock {
		if(!this.time_Internal&&this.uiWidgetBase) {
			this.time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/time') as mw.TextBlock
		}
		return this.time_Internal
	}
	private delButton_Internal: mw.Button
	public get delButton(): mw.Button {
		if(!this.delButton_Internal&&this.uiWidgetBase) {
			this.delButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/delButton') as mw.Button
		}
		return this.delButton_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.selectButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "selectButton");
		})
		
	
		this.delButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "delButton");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.index)
		
	
		this.initLanguage(this.name)
		
	
		this.initLanguage(this.time)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_2") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 