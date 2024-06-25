
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Event/PassCheckBuy.ui')
export default class PassCheckBuy_Generate extends UIScript {
		private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_BonusPanel_Internal: mw.Canvas
	public get mCanvas_BonusPanel(): mw.Canvas {
		if(!this.mCanvas_BonusPanel_Internal&&this.uiWidgetBase) {
			this.mCanvas_BonusPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BonusPanel') as mw.Canvas
		}
		return this.mCanvas_BonusPanel_Internal
	}
	private mBtn_Buy_Internal: mw.Button
	public get mBtn_Buy(): mw.Button {
		if(!this.mBtn_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BonusPanel/mBtn_Buy') as mw.Button
		}
		return this.mBtn_Buy_Internal
	}
	private mTxt_Price_Internal: mw.TextBlock
	public get mTxt_Price(): mw.TextBlock {
		if(!this.mTxt_Price_Internal&&this.uiWidgetBase) {
			this.mTxt_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BonusPanel/mTxt_Price') as mw.TextBlock
		}
		return this.mTxt_Price_Internal
	}
	private mCanvas_List_Internal: mw.Canvas
	public get mCanvas_List(): mw.Canvas {
		if(!this.mCanvas_List_Internal&&this.uiWidgetBase) {
			this.mCanvas_List_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BonusPanel/mCanvas_List') as mw.Canvas
		}
		return this.mCanvas_List_Internal
	}
	private mCanvas_Item_Internal: mw.Canvas
	public get mCanvas_Item(): mw.Canvas {
		if(!this.mCanvas_Item_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_BonusPanel/mCanvas_List/SB_List/mCanvas_Item') as mw.Canvas
		}
		return this.mCanvas_Item_Internal
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
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	
		this.mBtn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_Price)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_BonusPanel/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_BonusPanel/TextBlock_1") as any);
		
	

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
 