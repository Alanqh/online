
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Dress/DressEffect.ui')
export default class DressEffect_Generate extends UIScript {
		private mText_TabName_Internal: mw.TextBlock
	public get mText_TabName(): mw.TextBlock {
		if(!this.mText_TabName_Internal&&this.uiWidgetBase) {
			this.mText_TabName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_TabName') as mw.TextBlock
		}
		return this.mText_TabName_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mCanvas_Tab1_Internal: mw.Canvas
	public get mCanvas_Tab1(): mw.Canvas {
		if(!this.mCanvas_Tab1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Tab1') as mw.Canvas
		}
		return this.mCanvas_Tab1_Internal
	}
	private mCanvas_Dress_Internal: mw.Canvas
	public get mCanvas_Dress(): mw.Canvas {
		if(!this.mCanvas_Dress_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/ScrollBox/mCanvas_Dress') as mw.Canvas
		}
		return this.mCanvas_Dress_Internal
	}
	private mCanvas_Tab_2_Internal: mw.Canvas
	public get mCanvas_Tab_2(): mw.Canvas {
		if(!this.mCanvas_Tab_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tab_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/ScrollBox_1/mCanvas_Tab_2') as mw.Canvas
		}
		return this.mCanvas_Tab_2_Internal
	}
	private mButton_Equip_Internal: mw.Button
	public get mButton_Equip(): mw.Button {
		if(!this.mButton_Equip_Internal&&this.uiWidgetBase) {
			this.mButton_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Equip') as mw.Button
		}
		return this.mButton_Equip_Internal
	}
	private mButton_Unequip_Internal: mw.Button
	public get mButton_Unequip(): mw.Button {
		if(!this.mButton_Unequip_Internal&&this.uiWidgetBase) {
			this.mButton_Unequip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Unequip') as mw.Button
		}
		return this.mButton_Unequip_Internal
	}
	private mButton_Buy_Internal: mw.Button
	public get mButton_Buy(): mw.Button {
		if(!this.mButton_Buy_Internal&&this.uiWidgetBase) {
			this.mButton_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Buy') as mw.Button
		}
		return this.mButton_Buy_Internal
	}
	private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
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
		
		this.mButton_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Close");
		})
		
	
		this.mButton_Equip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Equip");
		})
		
	
		this.mButton_Unequip.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Unequip");
		})
		
	
		this.mButton_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Buy");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_TabName)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mButton_Equip/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mButton_Unequip/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mButton_Buy/TextBlock") as any);
		
	

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
 