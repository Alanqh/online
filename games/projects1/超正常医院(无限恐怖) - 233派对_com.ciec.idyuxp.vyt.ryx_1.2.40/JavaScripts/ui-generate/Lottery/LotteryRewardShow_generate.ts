
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Lottery/LotteryRewardShow.ui')
export default class LotteryRewardShow_Generate extends UIScript {
		private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private mCanvas_1item_Internal: mw.Canvas
	public get mCanvas_1item(): mw.Canvas {
		if(!this.mCanvas_1item_Internal&&this.uiWidgetBase) {
			this.mCanvas_1item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_1item') as mw.Canvas
		}
		return this.mCanvas_1item_Internal
	}
	private con_items_Internal: mw.Canvas
	public get con_items(): mw.Canvas {
		if(!this.con_items_Internal&&this.uiWidgetBase) {
			this.con_items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items') as mw.Canvas
		}
		return this.con_items_Internal
	}
	private mCanvas_item5_Internal: mw.Canvas
	public get mCanvas_item5(): mw.Canvas {
		if(!this.mCanvas_item5_Internal&&this.uiWidgetBase) {
			this.mCanvas_item5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item5') as mw.Canvas
		}
		return this.mCanvas_item5_Internal
	}
	private mCanvas_item3_Internal: mw.Canvas
	public get mCanvas_item3(): mw.Canvas {
		if(!this.mCanvas_item3_Internal&&this.uiWidgetBase) {
			this.mCanvas_item3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item3') as mw.Canvas
		}
		return this.mCanvas_item3_Internal
	}
	private mCanvas_item4_Internal: mw.Canvas
	public get mCanvas_item4(): mw.Canvas {
		if(!this.mCanvas_item4_Internal&&this.uiWidgetBase) {
			this.mCanvas_item4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item4') as mw.Canvas
		}
		return this.mCanvas_item4_Internal
	}
	private mCanvas_item2_Internal: mw.Canvas
	public get mCanvas_item2(): mw.Canvas {
		if(!this.mCanvas_item2_Internal&&this.uiWidgetBase) {
			this.mCanvas_item2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item2') as mw.Canvas
		}
		return this.mCanvas_item2_Internal
	}
	private mCanvas_item1_Internal: mw.Canvas
	public get mCanvas_item1(): mw.Canvas {
		if(!this.mCanvas_item1_Internal&&this.uiWidgetBase) {
			this.mCanvas_item1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item1') as mw.Canvas
		}
		return this.mCanvas_item1_Internal
	}
	private mCanvas_item10_Internal: mw.Canvas
	public get mCanvas_item10(): mw.Canvas {
		if(!this.mCanvas_item10_Internal&&this.uiWidgetBase) {
			this.mCanvas_item10_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item10') as mw.Canvas
		}
		return this.mCanvas_item10_Internal
	}
	private mCanvas_item9_Internal: mw.Canvas
	public get mCanvas_item9(): mw.Canvas {
		if(!this.mCanvas_item9_Internal&&this.uiWidgetBase) {
			this.mCanvas_item9_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item9') as mw.Canvas
		}
		return this.mCanvas_item9_Internal
	}
	private mCanvas_item8_Internal: mw.Canvas
	public get mCanvas_item8(): mw.Canvas {
		if(!this.mCanvas_item8_Internal&&this.uiWidgetBase) {
			this.mCanvas_item8_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item8') as mw.Canvas
		}
		return this.mCanvas_item8_Internal
	}
	private mCanvas_item7_Internal: mw.Canvas
	public get mCanvas_item7(): mw.Canvas {
		if(!this.mCanvas_item7_Internal&&this.uiWidgetBase) {
			this.mCanvas_item7_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item7') as mw.Canvas
		}
		return this.mCanvas_item7_Internal
	}
	private mCanvas_item6_Internal: mw.Canvas
	public get mCanvas_item6(): mw.Canvas {
		if(!this.mCanvas_item6_Internal&&this.uiWidgetBase) {
			this.mCanvas_item6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_items/mCanvas_item6') as mw.Canvas
		}
		return this.mCanvas_item6_Internal
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
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	

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
 