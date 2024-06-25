
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Teleport/Teleport.ui')
export default class Teleport_Generate extends UIScript {
		private mBtn_Teleport_Internal: mw.Button
	public get mBtn_Teleport(): mw.Button {
		if(!this.mBtn_Teleport_Internal&&this.uiWidgetBase) {
			this.mBtn_Teleport_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Teleport') as mw.Button
		}
		return this.mBtn_Teleport_Internal
	}
	private mBtn_Mask_Internal: mw.Button
	public get mBtn_Mask(): mw.Button {
		if(!this.mBtn_Mask_Internal&&this.uiWidgetBase) {
			this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask') as mw.Button
		}
		return this.mBtn_Mask_Internal
	}
	private mScrollBox_Teleport_Internal: mw.ScrollBox
	public get mScrollBox_Teleport(): mw.ScrollBox {
		if(!this.mScrollBox_Teleport_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Teleport_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Teleport') as mw.ScrollBox
		}
		return this.mScrollBox_Teleport_Internal
	}
	private mCanvas_TelePortScroll_Internal: mw.Canvas
	public get mCanvas_TelePortScroll(): mw.Canvas {
		if(!this.mCanvas_TelePortScroll_Internal&&this.uiWidgetBase) {
			this.mCanvas_TelePortScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Teleport/mCanvas_TelePortScroll') as mw.Canvas
		}
		return this.mCanvas_TelePortScroll_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Teleport/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
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
		
		this.mBtn_Teleport.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Teleport");
		})
		
	
		this.mBtn_Mask.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Mask");
		})
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mScrollBox_Teleport/TextBlock") as any);
		
	

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
 