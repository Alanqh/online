
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/IaaBuy.ui')
export default class IaaBuy_Generate extends UIScript {
		private mImage_Bck_Internal: mw.Image
	public get mImage_Bck(): mw.Image {
		if(!this.mImage_Bck_Internal&&this.uiWidgetBase) {
			this.mImage_Bck_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Bck') as mw.Image
		}
		return this.mImage_Bck_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mText_tips_Internal: mw.TextBlock
	public get mText_tips(): mw.TextBlock {
		if(!this.mText_tips_Internal&&this.uiWidgetBase) {
			this.mText_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_tips') as mw.TextBlock
		}
		return this.mText_tips_Internal
	}
	private mScrollBox_Item_Internal: mw.ScrollBox
	public get mScrollBox_Item(): mw.ScrollBox {
		if(!this.mScrollBox_Item_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox_Item') as mw.ScrollBox
		}
		return this.mScrollBox_Item_Internal
	}
	private mCanvas_Item_Internal: mw.Canvas
	public get mCanvas_Item(): mw.Canvas {
		if(!this.mCanvas_Item_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mScrollBox_Item/mCanvas_Item') as mw.Canvas
		}
		return this.mCanvas_Item_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mAds_Internal: mw.AdsButton
	public get mAds(): mw.AdsButton {
		if(!this.mAds_Internal&&this.uiWidgetBase) {
			this.mAds_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mAds') as mw.AdsButton
		}
		return this.mAds_Internal
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
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_tips)
		
	
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
 