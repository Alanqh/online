
 

 @UIBind('UI/ShareUI/integration/Achievements/MainAchieveTip.ui')
 export default class MainAchieveTip_Generate extends UIScript {
	 	private canvas_achievementTip_Internal: mw.Canvas
	public get canvas_achievementTip(): mw.Canvas {
		if(!this.canvas_achievementTip_Internal&&this.uiWidgetBase) {
			this.canvas_achievementTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip') as mw.Canvas
		}
		return this.canvas_achievementTip_Internal
	}
	private img_medalBg1_Internal: mw.Image
	public get img_medalBg1(): mw.Image {
		if(!this.img_medalBg1_Internal&&this.uiWidgetBase) {
			this.img_medalBg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medalBg1') as mw.Image
		}
		return this.img_medalBg1_Internal
	}
	private img_medalBg2_Internal: mw.Image
	public get img_medalBg2(): mw.Image {
		if(!this.img_medalBg2_Internal&&this.uiWidgetBase) {
			this.img_medalBg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medalBg2') as mw.Image
		}
		return this.img_medalBg2_Internal
	}
	private img_medal_Internal: mw.Image
	public get img_medal(): mw.Image {
		if(!this.img_medal_Internal&&this.uiWidgetBase) {
			this.img_medal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medal') as mw.Image
		}
		return this.img_medal_Internal
	}
	private img_medalBr0_Internal: mw.Image
	public get img_medalBr0(): mw.Image {
		if(!this.img_medalBr0_Internal&&this.uiWidgetBase) {
			this.img_medalBr0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medal/img_medalBr0') as mw.Image
		}
		return this.img_medalBr0_Internal
	}
	private img_starBr0_Internal: mw.Image
	public get img_starBr0(): mw.Image {
		if(!this.img_starBr0_Internal&&this.uiWidgetBase) {
			this.img_starBr0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medal/img_starBr0') as mw.Image
		}
		return this.img_starBr0_Internal
	}
	private img_star_Internal: mw.Image
	public get img_star(): mw.Image {
		if(!this.img_star_Internal&&this.uiWidgetBase) {
			this.img_star_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medal/img_starBr0/img_star') as mw.Image
		}
		return this.img_star_Internal
	}
	private img_medalTip_Internal: mw.TextBlock
	public get img_medalTip(): mw.TextBlock {
		if(!this.img_medalTip_Internal&&this.uiWidgetBase) {
			this.img_medalTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medalTip') as mw.TextBlock
		}
		return this.img_medalTip_Internal
	}
	private img_medalPoint_Internal: mw.Image
	public get img_medalPoint(): mw.Image {
		if(!this.img_medalPoint_Internal&&this.uiWidgetBase) {
			this.img_medalPoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_achievementTip/img_medalPoint') as mw.Image
		}
		return this.img_medalPoint_Internal
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
		
		this.initLanguage(this.img_medalTip)
		this.img_medalTip.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MainAchieveTip'] = MainAchieveTip_Generate;