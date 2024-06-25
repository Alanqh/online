
 

 @UIBind('UI/ShareUI/integration/Achievements/AcMiniItem_UI.ui')
 export default class AcMiniItem_UI_Generate extends UIScript {
	 	private canvas_achieveItem_Internal: mw.Canvas
	public get canvas_achieveItem(): mw.Canvas {
		if(!this.canvas_achieveItem_Internal&&this.uiWidgetBase) {
			this.canvas_achieveItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem') as mw.Canvas
		}
		return this.canvas_achieveItem_Internal
	}
	private img_achieveItemBr1_Internal: mw.Image
	public get img_achieveItemBr1(): mw.Image {
		if(!this.img_achieveItemBr1_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/img_achieveItemBr1') as mw.Image
		}
		return this.img_achieveItemBr1_Internal
	}
	private img_achieveItemBr2_Internal: mw.Image
	public get img_achieveItemBr2(): mw.Image {
		if(!this.img_achieveItemBr2_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/img_achieveItemBr2') as mw.Image
		}
		return this.img_achieveItemBr2_Internal
	}
	private canvas_medal_Internal: mw.Canvas
	public get canvas_medal(): mw.Canvas {
		if(!this.canvas_medal_Internal&&this.uiWidgetBase) {
			this.canvas_medal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_medal') as mw.Canvas
		}
		return this.canvas_medal_Internal
	}
	private img_achieveItemBr3_Internal: mw.Image
	public get img_achieveItemBr3(): mw.Image {
		if(!this.img_achieveItemBr3_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_medal/img_achieveItemBr3') as mw.Image
		}
		return this.img_achieveItemBr3_Internal
	}
	private img_achieveItemBr4_Internal: mw.Image
	public get img_achieveItemBr4(): mw.Image {
		if(!this.img_achieveItemBr4_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_medal/img_achieveItemBr4') as mw.Image
		}
		return this.img_achieveItemBr4_Internal
	}
	private img_medal_Internal: mw.Image
	public get img_medal(): mw.Image {
		if(!this.img_medal_Internal&&this.uiWidgetBase) {
			this.img_medal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_medal/img_medal') as mw.Image
		}
		return this.img_medal_Internal
	}
	private img_medalBr0_Internal: mw.Image
	public get img_medalBr0(): mw.Image {
		if(!this.img_medalBr0_Internal&&this.uiWidgetBase) {
			this.img_medalBr0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_medal/img_medalBr0') as mw.Image
		}
		return this.img_medalBr0_Internal
	}
	private img_medalNum_Internal: mw.TextBlock
	public get img_medalNum(): mw.TextBlock {
		if(!this.img_medalNum_Internal&&this.uiWidgetBase) {
			this.img_medalNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_medal/img_medalNum') as mw.TextBlock
		}
		return this.img_medalNum_Internal
	}
	private img_starBr0_Internal: mw.Image
	public get img_starBr0(): mw.Image {
		if(!this.img_starBr0_Internal&&this.uiWidgetBase) {
			this.img_starBr0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/img_starBr0') as mw.Image
		}
		return this.img_starBr0_Internal
	}
	private img_star_Internal: mw.Image
	public get img_star(): mw.Image {
		if(!this.img_star_Internal&&this.uiWidgetBase) {
			this.img_star_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/img_starBr0/img_star') as mw.Image
		}
		return this.img_star_Internal
	}
	private img_achieveName_Internal: mw.TextBlock
	public get img_achieveName(): mw.TextBlock {
		if(!this.img_achieveName_Internal&&this.uiWidgetBase) {
			this.img_achieveName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/img_achieveName') as mw.TextBlock
		}
		return this.img_achieveName_Internal
	}
	private img_achieveTip0_Internal: mw.TextBlock
	public get img_achieveTip0(): mw.TextBlock {
		if(!this.img_achieveTip0_Internal&&this.uiWidgetBase) {
			this.img_achieveTip0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/img_achieveTip0') as mw.TextBlock
		}
		return this.img_achieveTip0_Internal
	}
	private canvas_acTime_Internal: mw.Canvas
	public get canvas_acTime(): mw.Canvas {
		if(!this.canvas_acTime_Internal&&this.uiWidgetBase) {
			this.canvas_acTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_acTime') as mw.Canvas
		}
		return this.canvas_acTime_Internal
	}
	private img_acTimeBg1_Internal: mw.Image
	public get img_acTimeBg1(): mw.Image {
		if(!this.img_acTimeBg1_Internal&&this.uiWidgetBase) {
			this.img_acTimeBg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_acTime/img_acTimeBg1') as mw.Image
		}
		return this.img_acTimeBg1_Internal
	}
	private img_acTimeBg2_Internal: mw.Image
	public get img_acTimeBg2(): mw.Image {
		if(!this.img_acTimeBg2_Internal&&this.uiWidgetBase) {
			this.img_acTimeBg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_acTime/img_acTimeBg1/img_acTimeBg2') as mw.Image
		}
		return this.img_acTimeBg2_Internal
	}
	private img_acTime_Internal: mw.TextBlock
	public get img_acTime(): mw.TextBlock {
		if(!this.img_acTime_Internal&&this.uiWidgetBase) {
			this.img_acTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_achieveItem/canvas_acTime/img_acTimeBg1/img_acTimeBg2/img_acTime') as mw.TextBlock
		}
		return this.img_acTime_Internal
	}


 
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
		
		this.initLanguage(this.img_medalNum)
		this.img_medalNum.isRichText = true;
		
	
		this.initLanguage(this.img_achieveName)
		this.img_achieveName.isRichText = true;
		
	
		this.initLanguage(this.img_achieveTip0)
		this.img_achieveTip0.isRichText = true;
		
	
		this.initLanguage(this.img_acTime)
		this.img_acTime.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AcMiniItem_UI'] = AcMiniItem_UI_Generate;