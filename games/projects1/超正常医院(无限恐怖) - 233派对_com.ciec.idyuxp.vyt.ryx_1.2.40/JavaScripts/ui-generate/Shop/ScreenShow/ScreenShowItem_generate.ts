
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Shop/ScreenShow/ScreenShowItem.ui')
export default class ScreenShowItem_Generate extends UIScript {
		private mImg_Bg_Internal: mw.Image
	public get mImg_Bg(): mw.Image {
		if(!this.mImg_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Bg') as mw.Image
		}
		return this.mImg_Bg_Internal
	}
	private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mTxt_name_Internal: mw.TextBlock
	public get mTxt_name(): mw.TextBlock {
		if(!this.mTxt_name_Internal&&this.uiWidgetBase) {
			this.mTxt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTxt_name') as mw.TextBlock
		}
		return this.mTxt_name_Internal
	}
	private mCanvas_Btn_Internal: mw.Canvas
	public get mCanvas_Btn(): mw.Canvas {
		if(!this.mCanvas_Btn_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Btn') as mw.Canvas
		}
		return this.mCanvas_Btn_Internal
	}
	private mImg_Btn_Internal: mw.Image
	public get mImg_Btn(): mw.Image {
		if(!this.mImg_Btn_Internal&&this.uiWidgetBase) {
			this.mImg_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Btn/mImg_Btn') as mw.Image
		}
		return this.mImg_Btn_Internal
	}
	private mImg_Coins_Internal: mw.Image
	public get mImg_Coins(): mw.Image {
		if(!this.mImg_Coins_Internal&&this.uiWidgetBase) {
			this.mImg_Coins_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Btn/mImg_Coins') as mw.Image
		}
		return this.mImg_Coins_Internal
	}
	private mTxt_Price_Internal: mw.TextBlock
	public get mTxt_Price(): mw.TextBlock {
		if(!this.mTxt_Price_Internal&&this.uiWidgetBase) {
			this.mTxt_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Btn/mTxt_Price') as mw.TextBlock
		}
		return this.mTxt_Price_Internal
	}
	private mBtn_Buy_Internal: mw.Button
	public get mBtn_Buy(): mw.Button {
		if(!this.mBtn_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Btn/mBtn_Buy') as mw.Button
		}
		return this.mBtn_Buy_Internal
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
		
		this.mBtn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_name)
		
	
		this.initLanguage(this.mTxt_Price)
		
	
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
 