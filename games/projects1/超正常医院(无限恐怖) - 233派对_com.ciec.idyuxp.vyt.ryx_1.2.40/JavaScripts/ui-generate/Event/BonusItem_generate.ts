
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Event/BonusItem.ui')
export default class BonusItem_Generate extends UIScript {
		private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mTxt_Num_Internal: mw.TextBlock
	public get mTxt_Num(): mw.TextBlock {
		if(!this.mTxt_Num_Internal&&this.uiWidgetBase) {
			this.mTxt_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_Num') as mw.TextBlock
		}
		return this.mTxt_Num_Internal
	}
	private mCanvas_Unlock_Internal: mw.Canvas
	public get mCanvas_Unlock(): mw.Canvas {
		if(!this.mCanvas_Unlock_Internal&&this.uiWidgetBase) {
			this.mCanvas_Unlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Unlock') as mw.Canvas
		}
		return this.mCanvas_Unlock_Internal
	}
	private mCanvas_Got_Internal: mw.Canvas
	public get mCanvas_Got(): mw.Canvas {
		if(!this.mCanvas_Got_Internal&&this.uiWidgetBase) {
			this.mCanvas_Got_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Got') as mw.Canvas
		}
		return this.mCanvas_Got_Internal
	}
	private mbtn_Internal: mw.Button
	public get mbtn(): mw.Button {
		if(!this.mbtn_Internal&&this.uiWidgetBase) {
			this.mbtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mbtn') as mw.Button
		}
		return this.mbtn_Internal
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
		
		this.mbtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mbtn");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_Num)
		
	
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
 