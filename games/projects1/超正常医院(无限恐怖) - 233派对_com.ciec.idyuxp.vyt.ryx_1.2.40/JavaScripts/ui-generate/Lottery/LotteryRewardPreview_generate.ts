
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Lottery/LotteryRewardPreview.ui')
export default class LotteryRewardPreview_Generate extends UIScript {
		private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
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
	private txt_count_Internal: mw.TextBlock
	public get txt_count(): mw.TextBlock {
		if(!this.txt_count_Internal&&this.uiWidgetBase) {
			this.txt_count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_count') as mw.TextBlock
		}
		return this.txt_count_Internal
	}
	private txt_chance_Internal: mw.TextBlock
	public get txt_chance(): mw.TextBlock {
		if(!this.txt_chance_Internal&&this.uiWidgetBase) {
			this.txt_chance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_chance') as mw.TextBlock
		}
		return this.txt_chance_Internal
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
		
	
		this.initLanguage(this.txt_count)
		
	
		this.initLanguage(this.txt_chance)
		
	
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
 