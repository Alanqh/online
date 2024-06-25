
 

 @UIBind('UI/ShareUI/integration/Achievements/AchieveItem_UI.ui')
 export default class AchieveItem_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_achieveItem_Internal: mw.Canvas
	public get canvas_achieveItem(): mw.Canvas {
		if(!this.canvas_achieveItem_Internal&&this.uiWidgetBase) {
			this.canvas_achieveItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem') as mw.Canvas
		}
		return this.canvas_achieveItem_Internal
	}
	private img_achieveItemBr2_Internal: mw.Image
	public get img_achieveItemBr2(): mw.Image {
		if(!this.img_achieveItemBr2_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_achieveItemBr2') as mw.Image
		}
		return this.img_achieveItemBr2_Internal
	}
	private img_achieveItemBr1_Internal: mw.Image
	public get img_achieveItemBr1(): mw.Image {
		if(!this.img_achieveItemBr1_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_achieveItemBr1') as mw.Image
		}
		return this.img_achieveItemBr1_Internal
	}
	private img_achieveItemBr3_Internal: mw.Image
	public get img_achieveItemBr3(): mw.Image {
		if(!this.img_achieveItemBr3_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_achieveItemBr3') as mw.Image
		}
		return this.img_achieveItemBr3_Internal
	}
	private img_achieveItemBr4_Internal: mw.Image
	public get img_achieveItemBr4(): mw.Image {
		if(!this.img_achieveItemBr4_Internal&&this.uiWidgetBase) {
			this.img_achieveItemBr4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_achieveItemBr4') as mw.Image
		}
		return this.img_achieveItemBr4_Internal
	}
	private canvas_medal_Internal: mw.Canvas
	public get canvas_medal(): mw.Canvas {
		if(!this.canvas_medal_Internal&&this.uiWidgetBase) {
			this.canvas_medal_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_medal') as mw.Canvas
		}
		return this.canvas_medal_Internal
	}
	private img_medal_Internal: mw.Image
	public get img_medal(): mw.Image {
		if(!this.img_medal_Internal&&this.uiWidgetBase) {
			this.img_medal_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_medal/img_medal') as mw.Image
		}
		return this.img_medal_Internal
	}
	private img_medalBr0_Internal: mw.Image
	public get img_medalBr0(): mw.Image {
		if(!this.img_medalBr0_Internal&&this.uiWidgetBase) {
			this.img_medalBr0_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_medal/img_medalBr0') as mw.Image
		}
		return this.img_medalBr0_Internal
	}
	private img_medalNum_Internal: mw.TextBlock
	public get img_medalNum(): mw.TextBlock {
		if(!this.img_medalNum_Internal&&this.uiWidgetBase) {
			this.img_medalNum_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_medal/img_medalNum') as mw.TextBlock
		}
		return this.img_medalNum_Internal
	}
	private img_starBr0_Internal: mw.Image
	public get img_starBr0(): mw.Image {
		if(!this.img_starBr0_Internal&&this.uiWidgetBase) {
			this.img_starBr0_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_starBr0') as mw.Image
		}
		return this.img_starBr0_Internal
	}
	private img_star_Internal: mw.Image
	public get img_star(): mw.Image {
		if(!this.img_star_Internal&&this.uiWidgetBase) {
			this.img_star_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_star') as mw.Image
		}
		return this.img_star_Internal
	}
	private img_achieveName_Internal: mw.TextBlock
	public get img_achieveName(): mw.TextBlock {
		if(!this.img_achieveName_Internal&&this.uiWidgetBase) {
			this.img_achieveName_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_achieveName') as mw.TextBlock
		}
		return this.img_achieveName_Internal
	}
	private img_achieveTip0_Internal: mw.TextBlock
	public get img_achieveTip0(): mw.TextBlock {
		if(!this.img_achieveTip0_Internal&&this.uiWidgetBase) {
			this.img_achieveTip0_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/img_achieveTip0') as mw.TextBlock
		}
		return this.img_achieveTip0_Internal
	}
	private canvas_timeOrLock_Internal: mw.Canvas
	public get canvas_timeOrLock(): mw.Canvas {
		if(!this.canvas_timeOrLock_Internal&&this.uiWidgetBase) {
			this.canvas_timeOrLock_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_timeOrLock') as mw.Canvas
		}
		return this.canvas_timeOrLock_Internal
	}
	private img_timeBg1_Internal: mw.Image
	public get img_timeBg1(): mw.Image {
		if(!this.img_timeBg1_Internal&&this.uiWidgetBase) {
			this.img_timeBg1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_timeOrLock/img_timeBg1') as mw.Image
		}
		return this.img_timeBg1_Internal
	}
	private img_timeBg2_Internal: mw.Image
	public get img_timeBg2(): mw.Image {
		if(!this.img_timeBg2_Internal&&this.uiWidgetBase) {
			this.img_timeBg2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_timeOrLock/img_timeBg2') as mw.Image
		}
		return this.img_timeBg2_Internal
	}
	private img_timeOrLock_Internal: mw.TextBlock
	public get img_timeOrLock(): mw.TextBlock {
		if(!this.img_timeOrLock_Internal&&this.uiWidgetBase) {
			this.img_timeOrLock_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_timeOrLock/img_timeOrLock') as mw.TextBlock
		}
		return this.img_timeOrLock_Internal
	}
	private canvas_medalLock_Internal: mw.Canvas
	public get canvas_medalLock(): mw.Canvas {
		if(!this.canvas_medalLock_Internal&&this.uiWidgetBase) {
			this.canvas_medalLock_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_medalLock') as mw.Canvas
		}
		return this.canvas_medalLock_Internal
	}
	private img_achieveLock_Internal: mw.Image
	public get img_achieveLock(): mw.Image {
		if(!this.img_achieveLock_Internal&&this.uiWidgetBase) {
			this.img_achieveLock_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_medalLock/img_achieveLock') as mw.Image
		}
		return this.img_achieveLock_Internal
	}
	private img_lockNum_Internal: mw.TextBlock
	public get img_lockNum(): mw.TextBlock {
		if(!this.img_lockNum_Internal&&this.uiWidgetBase) {
			this.img_lockNum_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_achieveItem/canvas_medalLock/img_lockNum') as mw.TextBlock
		}
		return this.img_lockNum_Internal
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
		
	
		this.initLanguage(this.img_timeOrLock)
		this.img_timeOrLock.isRichText = true;
		
	
		this.initLanguage(this.img_lockNum)
		this.img_lockNum.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AchieveItem_UI'] = AchieveItem_UI_Generate;