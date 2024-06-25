
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Lottery/LotteryRewardItem.ui')
export default class LotteryRewardItem_Generate extends UIScript {
		private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private mImg_back_Internal: mw.Image
	public get mImg_back(): mw.Image {
		if(!this.mImg_back_Internal&&this.uiWidgetBase) {
			this.mImg_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_back') as mw.Image
		}
		return this.mImg_back_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
	}
	private mText_Num_Internal: mw.TextBlock
	public get mText_Num(): mw.TextBlock {
		if(!this.mText_Num_Internal&&this.uiWidgetBase) {
			this.mText_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Num') as mw.TextBlock
		}
		return this.mText_Num_Internal
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
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_name)
		
	
		this.initLanguage(this.mText_Num)
		
	
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
 