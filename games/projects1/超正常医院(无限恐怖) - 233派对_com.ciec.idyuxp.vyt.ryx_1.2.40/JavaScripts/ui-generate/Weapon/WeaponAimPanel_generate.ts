
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Weapon/WeaponAimPanel.ui')
export default class WeaponAimPanel_Generate extends UIScript {
		private mImage_commonAimType_Internal: mw.Image
	public get mImage_commonAimType(): mw.Image {
		if(!this.mImage_commonAimType_Internal&&this.uiWidgetBase) {
			this.mImage_commonAimType_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_commonAimType') as mw.Image
		}
		return this.mImage_commonAimType_Internal
	}
	private mImage_commonAimTypeRed_Internal: mw.Image
	public get mImage_commonAimTypeRed(): mw.Image {
		if(!this.mImage_commonAimTypeRed_Internal&&this.uiWidgetBase) {
			this.mImage_commonAimTypeRed_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_commonAimTypeRed') as mw.Image
		}
		return this.mImage_commonAimTypeRed_Internal
	}
	private mBulletCountText_Internal: mw.TextBlock
	public get mBulletCountText(): mw.TextBlock {
		if(!this.mBulletCountText_Internal&&this.uiWidgetBase) {
			this.mBulletCountText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBulletCountText') as mw.TextBlock
		}
		return this.mBulletCountText_Internal
	}
	private mCanvas_Shoot_Internal: mw.Canvas
	public get mCanvas_Shoot(): mw.Canvas {
		if(!this.mCanvas_Shoot_Internal&&this.uiWidgetBase) {
			this.mCanvas_Shoot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shoot') as mw.Canvas
		}
		return this.mCanvas_Shoot_Internal
	}
	private mBtn_Shoot_Internal: mw.Button
	public get mBtn_Shoot(): mw.Button {
		if(!this.mBtn_Shoot_Internal&&this.uiWidgetBase) {
			this.mBtn_Shoot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shoot/mBtn_Shoot') as mw.Button
		}
		return this.mBtn_Shoot_Internal
	}
	private mImg_Shoot_Internal: mw.Image
	public get mImg_Shoot(): mw.Image {
		if(!this.mImg_Shoot_Internal&&this.uiWidgetBase) {
			this.mImg_Shoot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shoot/mImg_Shoot') as mw.Image
		}
		return this.mImg_Shoot_Internal
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
		
		this.mBtn_Shoot.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Shoot");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mBulletCountText)
		
	
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
 