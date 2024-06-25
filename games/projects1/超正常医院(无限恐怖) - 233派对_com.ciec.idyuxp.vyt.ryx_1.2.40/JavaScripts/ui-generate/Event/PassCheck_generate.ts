
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Event/PassCheck.ui')
export default class PassCheck_Generate extends UIScript {
		private mCanvas_PassCheck_Internal: mw.Canvas
	public get mCanvas_PassCheck(): mw.Canvas {
		if(!this.mCanvas_PassCheck_Internal&&this.uiWidgetBase) {
			this.mCanvas_PassCheck_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck') as mw.Canvas
		}
		return this.mCanvas_PassCheck_Internal
	}
	private mCanvas_Bonus_Internal: mw.Canvas
	public get mCanvas_Bonus(): mw.Canvas {
		if(!this.mCanvas_Bonus_Internal&&this.uiWidgetBase) {
			this.mCanvas_Bonus_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus') as mw.Canvas
		}
		return this.mCanvas_Bonus_Internal
	}
	private mSB_Bonus_Internal: mw.ScrollBox
	public get mSB_Bonus(): mw.ScrollBox {
		if(!this.mSB_Bonus_Internal&&this.uiWidgetBase) {
			this.mSB_Bonus_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus/mSB_Bonus') as mw.ScrollBox
		}
		return this.mSB_Bonus_Internal
	}
	private mCanvas_Item_Internal: mw.Canvas
	public get mCanvas_Item(): mw.Canvas {
		if(!this.mCanvas_Item_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus/mSB_Bonus/mCanvas_Item') as mw.Canvas
		}
		return this.mCanvas_Item_Internal
	}
	private mCanvas_Collection_Internal: mw.Canvas
	public get mCanvas_Collection(): mw.Canvas {
		if(!this.mCanvas_Collection_Internal&&this.uiWidgetBase) {
			this.mCanvas_Collection_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus/mCanvas_Collection') as mw.Canvas
		}
		return this.mCanvas_Collection_Internal
	}
	private mImg_Mask_Internal: mw.Image
	public get mImg_Mask(): mw.Image {
		if(!this.mImg_Mask_Internal&&this.uiWidgetBase) {
			this.mImg_Mask_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus/mCanvas_Collection/mImg_Mask') as mw.Image
		}
		return this.mImg_Mask_Internal
	}
	private mImg_Lock_Internal: mw.Image
	public get mImg_Lock(): mw.Image {
		if(!this.mImg_Lock_Internal&&this.uiWidgetBase) {
			this.mImg_Lock_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus/mCanvas_Collection/mImg_Lock') as mw.Image
		}
		return this.mImg_Lock_Internal
	}
	private mBtn_Collection_Internal: mw.Button
	public get mBtn_Collection(): mw.Button {
		if(!this.mBtn_Collection_Internal&&this.uiWidgetBase) {
			this.mBtn_Collection_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus/mCanvas_Collection/mBtn_Collection') as mw.Button
		}
		return this.mBtn_Collection_Internal
	}
	private mCanvas_MVPBonus_Internal: mw.Canvas
	public get mCanvas_MVPBonus(): mw.Canvas {
		if(!this.mCanvas_MVPBonus_Internal&&this.uiWidgetBase) {
			this.mCanvas_MVPBonus_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Bonus/mCanvas_MVPBonus') as mw.Canvas
		}
		return this.mCanvas_MVPBonus_Internal
	}
	private mCanvas_ShowBonus_Internal: mw.Canvas
	public get mCanvas_ShowBonus(): mw.Canvas {
		if(!this.mCanvas_ShowBonus_Internal&&this.uiWidgetBase) {
			this.mCanvas_ShowBonus_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_ShowBonus') as mw.Canvas
		}
		return this.mCanvas_ShowBonus_Internal
	}
	private mImg_Bg_Internal: mw.Image
	public get mImg_Bg(): mw.Image {
		if(!this.mImg_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_ShowBonus/mImg_Bg') as mw.Image
		}
		return this.mImg_Bg_Internal
	}
	private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_ShowBonus/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mCanvas_Level_Internal: mw.Canvas
	public get mCanvas_Level(): mw.Canvas {
		if(!this.mCanvas_Level_Internal&&this.uiWidgetBase) {
			this.mCanvas_Level_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Level') as mw.Canvas
		}
		return this.mCanvas_Level_Internal
	}
	private mTxt_Level_Internal: mw.TextBlock
	public get mTxt_Level(): mw.TextBlock {
		if(!this.mTxt_Level_Internal&&this.uiWidgetBase) {
			this.mTxt_Level_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Level/mTxt_Level') as mw.TextBlock
		}
		return this.mTxt_Level_Internal
	}
	private mBar_Level_Internal: mw.ProgressBar
	public get mBar_Level(): mw.ProgressBar {
		if(!this.mBar_Level_Internal&&this.uiWidgetBase) {
			this.mBar_Level_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Level/mBar_Level') as mw.ProgressBar
		}
		return this.mBar_Level_Internal
	}
	private mTxt_Exp_Internal: mw.TextBlock
	public get mTxt_Exp(): mw.TextBlock {
		if(!this.mTxt_Exp_Internal&&this.uiWidgetBase) {
			this.mTxt_Exp_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Level/mTxt_Exp') as mw.TextBlock
		}
		return this.mTxt_Exp_Internal
	}
	private mCanvas_LevelBuy_Internal: mw.Canvas
	public get mCanvas_LevelBuy(): mw.Canvas {
		if(!this.mCanvas_LevelBuy_Internal&&this.uiWidgetBase) {
			this.mCanvas_LevelBuy_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Level/mCanvas_LevelBuy') as mw.Canvas
		}
		return this.mCanvas_LevelBuy_Internal
	}
	private mButton_LevelBuy_Internal: mw.Button
	public get mButton_LevelBuy(): mw.Button {
		if(!this.mButton_LevelBuy_Internal&&this.uiWidgetBase) {
			this.mButton_LevelBuy_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Level/mCanvas_LevelBuy/mButton_LevelBuy') as mw.Button
		}
		return this.mButton_LevelBuy_Internal
	}
	private mBtn_Buy_Internal: mw.Button
	public get mBtn_Buy(): mw.Button {
		if(!this.mBtn_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Buy_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mBtn_Buy') as mw.Button
		}
		return this.mBtn_Buy_Internal
	}
	private mBtn_GetAll_Internal: mw.Button
	public get mBtn_GetAll(): mw.Button {
		if(!this.mBtn_GetAll_Internal&&this.uiWidgetBase) {
			this.mBtn_GetAll_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mBtn_GetAll') as mw.Button
		}
		return this.mBtn_GetAll_Internal
	}
	private mCanvas_Coins_Internal: mw.Canvas
	public get mCanvas_Coins(): mw.Canvas {
		if(!this.mCanvas_Coins_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coins_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins') as mw.Canvas
		}
		return this.mCanvas_Coins_Internal
	}
	private mCanvas_Coins1_Internal: mw.Canvas
	public get mCanvas_Coins1(): mw.Canvas {
		if(!this.mCanvas_Coins1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coins1_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins1') as mw.Canvas
		}
		return this.mCanvas_Coins1_Internal
	}
	private mImage_Icon1_Internal: mw.Image
	public get mImage_Icon1(): mw.Image {
		if(!this.mImage_Icon1_Internal&&this.uiWidgetBase) {
			this.mImage_Icon1_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins1/mImage_Icon1') as mw.Image
		}
		return this.mImage_Icon1_Internal
	}
	private mText_Money1_Internal: mw.TextBlock
	public get mText_Money1(): mw.TextBlock {
		if(!this.mText_Money1_Internal&&this.uiWidgetBase) {
			this.mText_Money1_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins1/mText_Money1') as mw.TextBlock
		}
		return this.mText_Money1_Internal
	}
	private mButton_Pay1_Internal: mw.Button
	public get mButton_Pay1(): mw.Button {
		if(!this.mButton_Pay1_Internal&&this.uiWidgetBase) {
			this.mButton_Pay1_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins1/mButton_Pay1') as mw.Button
		}
		return this.mButton_Pay1_Internal
	}
	private mCanvas_Coins2_Internal: mw.Canvas
	public get mCanvas_Coins2(): mw.Canvas {
		if(!this.mCanvas_Coins2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coins2_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins2') as mw.Canvas
		}
		return this.mCanvas_Coins2_Internal
	}
	private mImage_Icon2_Internal: mw.Image
	public get mImage_Icon2(): mw.Image {
		if(!this.mImage_Icon2_Internal&&this.uiWidgetBase) {
			this.mImage_Icon2_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins2/mImage_Icon2') as mw.Image
		}
		return this.mImage_Icon2_Internal
	}
	private mText_Money2_Internal: mw.TextBlock
	public get mText_Money2(): mw.TextBlock {
		if(!this.mText_Money2_Internal&&this.uiWidgetBase) {
			this.mText_Money2_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins2/mText_Money2') as mw.TextBlock
		}
		return this.mText_Money2_Internal
	}
	private mButton_Pay2_Internal: mw.Button
	public get mButton_Pay2(): mw.Button {
		if(!this.mButton_Pay2_Internal&&this.uiWidgetBase) {
			this.mButton_Pay2_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins2/mButton_Pay2') as mw.Button
		}
		return this.mButton_Pay2_Internal
	}
	private mCanvas_Coins3_Internal: mw.Canvas
	public get mCanvas_Coins3(): mw.Canvas {
		if(!this.mCanvas_Coins3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coins3_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins3') as mw.Canvas
		}
		return this.mCanvas_Coins3_Internal
	}
	private mImage_Icon3_Internal: mw.Image
	public get mImage_Icon3(): mw.Image {
		if(!this.mImage_Icon3_Internal&&this.uiWidgetBase) {
			this.mImage_Icon3_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins3/mImage_Icon3') as mw.Image
		}
		return this.mImage_Icon3_Internal
	}
	private mText_Money3_Internal: mw.TextBlock
	public get mText_Money3(): mw.TextBlock {
		if(!this.mText_Money3_Internal&&this.uiWidgetBase) {
			this.mText_Money3_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/mCanvas_Coins/mCanvas_Coins3/mText_Money3') as mw.TextBlock
		}
		return this.mText_Money3_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('mCanvas_PassCheck/Canvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
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
		
		this.mBtn_Collection.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Collection");
		})
		
	
		this.mButton_LevelBuy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_LevelBuy");
		})
		
	
		this.mBtn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		})
		
	
		this.mBtn_GetAll.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_GetAll");
		})
		
	
		this.mButton_Pay1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Pay1");
		})
		
	
		this.mButton_Pay2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Pay2");
		})
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_Level)
		
	
		this.initLanguage(this.mTxt_Exp)
		
	
		this.initLanguage(this.mText_Money1)
		
	
		this.initLanguage(this.mText_Money2)
		
	
		this.initLanguage(this.mText_Money3)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_PassCheck/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_PassCheck/mCanvas_Level/mCanvas_LevelBuy/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_PassCheck/mBtn_Buy/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("mCanvas_PassCheck/TextBlock_4") as any);
		
	

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
 