
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Teleport/Teleport_Item.ui')
export default class Teleport_Item_Generate extends UIScript {
		private mTeleportBtn_Canvas_Internal: mw.Canvas
	public get mTeleportBtn_Canvas(): mw.Canvas {
		if(!this.mTeleportBtn_Canvas_Internal&&this.uiWidgetBase) {
			this.mTeleportBtn_Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTeleportBtn_Canvas') as mw.Canvas
		}
		return this.mTeleportBtn_Canvas_Internal
	}
	private mTeleport_Btn_Internal: mw.Button
	public get mTeleport_Btn(): mw.Button {
		if(!this.mTeleport_Btn_Internal&&this.uiWidgetBase) {
			this.mTeleport_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTeleportBtn_Canvas/mTeleport_Btn') as mw.Button
		}
		return this.mTeleport_Btn_Internal
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
		
		this.mTeleport_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTeleport_Btn");
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
 