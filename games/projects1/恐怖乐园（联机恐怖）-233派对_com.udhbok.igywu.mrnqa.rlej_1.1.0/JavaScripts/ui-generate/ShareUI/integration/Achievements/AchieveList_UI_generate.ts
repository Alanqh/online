
 

 @UIBind('UI/ShareUI/integration/Achievements/AchieveList_UI.ui')
 export default class AchieveList_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private img_lvBg_Internal: mw.Image
	public get img_lvBg(): mw.Image {
		if(!this.img_lvBg_Internal&&this.uiWidgetBase) {
			this.img_lvBg_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/img_lvBg') as mw.Image
		}
		return this.img_lvBg_Internal
	}
	private canvas_title_Internal: mw.Canvas
	public get canvas_title(): mw.Canvas {
		if(!this.canvas_title_Internal&&this.uiWidgetBase) {
			this.canvas_title_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title') as mw.Canvas
		}
		return this.canvas_title_Internal
	}
	private img_titleBr_Internal: mw.Image
	public get img_titleBr(): mw.Image {
		if(!this.img_titleBr_Internal&&this.uiWidgetBase) {
			this.img_titleBr_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/img_titleBr') as mw.Image
		}
		return this.img_titleBr_Internal
	}
	private canvas_done_Internal: mw.Canvas
	public get canvas_done(): mw.Canvas {
		if(!this.canvas_done_Internal&&this.uiWidgetBase) {
			this.canvas_done_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_done') as mw.Canvas
		}
		return this.canvas_done_Internal
	}
	private text_doneTitle_Internal: mw.TextBlock
	public get text_doneTitle(): mw.TextBlock {
		if(!this.text_doneTitle_Internal&&this.uiWidgetBase) {
			this.text_doneTitle_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_done/text_doneTitle') as mw.TextBlock
		}
		return this.text_doneTitle_Internal
	}
	private img_doneBr_Internal: mw.Image
	public get img_doneBr(): mw.Image {
		if(!this.img_doneBr_Internal&&this.uiWidgetBase) {
			this.img_doneBr_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_done/img_doneBr') as mw.Image
		}
		return this.img_doneBr_Internal
	}
	private btn_donePage_Internal: mw.StaleButton
	public get btn_donePage(): mw.StaleButton {
		if(!this.btn_donePage_Internal&&this.uiWidgetBase) {
			this.btn_donePage_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_done/btn_donePage') as mw.StaleButton
		}
		return this.btn_donePage_Internal
	}
	private canvas_unfinished_Internal: mw.Canvas
	public get canvas_unfinished(): mw.Canvas {
		if(!this.canvas_unfinished_Internal&&this.uiWidgetBase) {
			this.canvas_unfinished_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_unfinished') as mw.Canvas
		}
		return this.canvas_unfinished_Internal
	}
	private text_unfinishedTitle_Internal: mw.TextBlock
	public get text_unfinishedTitle(): mw.TextBlock {
		if(!this.text_unfinishedTitle_Internal&&this.uiWidgetBase) {
			this.text_unfinishedTitle_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_unfinished/text_unfinishedTitle') as mw.TextBlock
		}
		return this.text_unfinishedTitle_Internal
	}
	private img_unfinishedBr_Internal: mw.Image
	public get img_unfinishedBr(): mw.Image {
		if(!this.img_unfinishedBr_Internal&&this.uiWidgetBase) {
			this.img_unfinishedBr_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_unfinished/img_unfinishedBr') as mw.Image
		}
		return this.img_unfinishedBr_Internal
	}
	private btn_unfinishedPage_Internal: mw.StaleButton
	public get btn_unfinishedPage(): mw.StaleButton {
		if(!this.btn_unfinishedPage_Internal&&this.uiWidgetBase) {
			this.btn_unfinishedPage_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_unfinished/btn_unfinishedPage') as mw.StaleButton
		}
		return this.btn_unfinishedPage_Internal
	}
	private canvas_all_Internal: mw.Canvas
	public get canvas_all(): mw.Canvas {
		if(!this.canvas_all_Internal&&this.uiWidgetBase) {
			this.canvas_all_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_all') as mw.Canvas
		}
		return this.canvas_all_Internal
	}
	private text_allTitle_Internal: mw.TextBlock
	public get text_allTitle(): mw.TextBlock {
		if(!this.text_allTitle_Internal&&this.uiWidgetBase) {
			this.text_allTitle_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_all/text_allTitle') as mw.TextBlock
		}
		return this.text_allTitle_Internal
	}
	private img_allBr_Internal: mw.Image
	public get img_allBr(): mw.Image {
		if(!this.img_allBr_Internal&&this.uiWidgetBase) {
			this.img_allBr_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_all/img_allBr') as mw.Image
		}
		return this.img_allBr_Internal
	}
	private btn_allPage_Internal: mw.StaleButton
	public get btn_allPage(): mw.StaleButton {
		if(!this.btn_allPage_Internal&&this.uiWidgetBase) {
			this.btn_allPage_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_title/canvas_all/btn_allPage') as mw.StaleButton
		}
		return this.btn_allPage_Internal
	}
	private scrollBox_pages_Internal: mw.ScrollBox
	public get scrollBox_pages(): mw.ScrollBox {
		if(!this.scrollBox_pages_Internal&&this.uiWidgetBase) {
			this.scrollBox_pages_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/scrollBox_pages') as mw.ScrollBox
		}
		return this.scrollBox_pages_Internal
	}
	private canvas_page_Internal: mw.Canvas
	public get canvas_page(): mw.Canvas {
		if(!this.canvas_page_Internal&&this.uiWidgetBase) {
			this.canvas_page_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/scrollBox_pages/canvas_page') as mw.Canvas
		}
		return this.canvas_page_Internal
	}
	private canvas_achieveItem_Internal: mw.Canvas
	public get canvas_achieveItem(): mw.Canvas {
		if(!this.canvas_achieveItem_Internal&&this.uiWidgetBase) {
			this.canvas_achieveItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/scrollBox_pages/canvas_page/canvas_achieveItem') as mw.Canvas
		}
		return this.canvas_achieveItem_Internal
	}
	private canvas_level_Internal: mw.Canvas
	public get canvas_level(): mw.Canvas {
		if(!this.canvas_level_Internal&&this.uiWidgetBase) {
			this.canvas_level_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level') as mw.Canvas
		}
		return this.canvas_level_Internal
	}
	private canvas_lv_Internal: mw.Canvas
	public get canvas_lv(): mw.Canvas {
		if(!this.canvas_lv_Internal&&this.uiWidgetBase) {
			this.canvas_lv_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lv') as mw.Canvas
		}
		return this.canvas_lv_Internal
	}
	private text_lvTitle_Internal: mw.TextBlock
	public get text_lvTitle(): mw.TextBlock {
		if(!this.text_lvTitle_Internal&&this.uiWidgetBase) {
			this.text_lvTitle_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lv/text_lvTitle') as mw.TextBlock
		}
		return this.text_lvTitle_Internal
	}
	private maskBtn_progress_Internal: mw.MaskButton
	public get maskBtn_progress(): mw.MaskButton {
		if(!this.maskBtn_progress_Internal&&this.uiWidgetBase) {
			this.maskBtn_progress_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lv/maskBtn_progress') as mw.MaskButton
		}
		return this.maskBtn_progress_Internal
	}
	private text_lvNum_Internal: mw.TextBlock
	public get text_lvNum(): mw.TextBlock {
		if(!this.text_lvNum_Internal&&this.uiWidgetBase) {
			this.text_lvNum_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lv/text_lvNum') as mw.TextBlock
		}
		return this.text_lvNum_Internal
	}
	private text_lv_Internal: mw.TextBlock
	public get text_lv(): mw.TextBlock {
		if(!this.text_lv_Internal&&this.uiWidgetBase) {
			this.text_lv_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lv/text_lv') as mw.TextBlock
		}
		return this.text_lv_Internal
	}
	private canvas_lvGain_Internal: mw.Canvas
	public get canvas_lvGain(): mw.Canvas {
		if(!this.canvas_lvGain_Internal&&this.uiWidgetBase) {
			this.canvas_lvGain_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain') as mw.Canvas
		}
		return this.canvas_lvGain_Internal
	}
	private img_giftBr_Internal: mw.Image
	public get img_giftBr(): mw.Image {
		if(!this.img_giftBr_Internal&&this.uiWidgetBase) {
			this.img_giftBr_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/img_giftBr') as mw.Image
		}
		return this.img_giftBr_Internal
	}
	private text_gainText_Internal: mw.TextBlock
	public get text_gainText(): mw.TextBlock {
		if(!this.text_gainText_Internal&&this.uiWidgetBase) {
			this.text_gainText_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/img_giftBr/text_gainText') as mw.TextBlock
		}
		return this.text_gainText_Internal
	}
	private img_giftLight_Internal: mw.Image
	public get img_giftLight(): mw.Image {
		if(!this.img_giftLight_Internal&&this.uiWidgetBase) {
			this.img_giftLight_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/img_giftBr/img_giftLight') as mw.Image
		}
		return this.img_giftLight_Internal
	}
	private img_giftIcon_Internal: mw.Image
	public get img_giftIcon(): mw.Image {
		if(!this.img_giftIcon_Internal&&this.uiWidgetBase) {
			this.img_giftIcon_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/img_giftBr/img_giftIcon') as mw.Image
		}
		return this.img_giftIcon_Internal
	}
	private rewardTipsBtn_Internal: mw.Button
	public get rewardTipsBtn(): mw.Button {
		if(!this.rewardTipsBtn_Internal&&this.uiWidgetBase) {
			this.rewardTipsBtn_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/img_giftBr/rewardTipsBtn') as mw.Button
		}
		return this.rewardTipsBtn_Internal
	}
	private canvas_gain_Internal: mw.Canvas
	public get canvas_gain(): mw.Canvas {
		if(!this.canvas_gain_Internal&&this.uiWidgetBase) {
			this.canvas_gain_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/canvas_gain') as mw.Canvas
		}
		return this.canvas_gain_Internal
	}
	private btn_giftGain_Internal: mw.StaleButton
	public get btn_giftGain(): mw.StaleButton {
		if(!this.btn_giftGain_Internal&&this.uiWidgetBase) {
			this.btn_giftGain_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/canvas_gain/btn_giftGain') as mw.StaleButton
		}
		return this.btn_giftGain_Internal
	}
	private img_lockBr_Internal: mw.Image
	public get img_lockBr(): mw.Image {
		if(!this.img_lockBr_Internal&&this.uiWidgetBase) {
			this.img_lockBr_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/canvas_gain/img_lockBr') as mw.Image
		}
		return this.img_lockBr_Internal
	}
	private img_lock_Internal: mw.Image
	public get img_lock(): mw.Image {
		if(!this.img_lock_Internal&&this.uiWidgetBase) {
			this.img_lock_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_level/canvas_lvGain/canvas_gain/img_lockBr/img_lock') as mw.Image
		}
		return this.img_lock_Internal
	}
	private text_noAchievement_Internal: mw.TextBlock
	public get text_noAchievement(): mw.TextBlock {
		if(!this.text_noAchievement_Internal&&this.uiWidgetBase) {
			this.text_noAchievement_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/text_noAchievement') as mw.TextBlock
		}
		return this.text_noAchievement_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_donePage.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AchieveList_UI_btn_donePage");
		})
		this.initLanguage(this.btn_donePage);
		this.btn_donePage.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_donePage.onPressed.add(() => {
			this.btn_donePage["preScale"] = this.btn_donePage.renderScale;
			this.btn_donePage.renderScale = Vector2.one.set(this.btn_donePage["preScale"]).multiply(1.1);
		})
		this.btn_donePage.onReleased.add(() => {
			this.btn_donePage.renderScale = this.btn_donePage["preScale"];
		})
		
		
	
		this.btn_unfinishedPage.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AchieveList_UI_btn_unfinishedPage");
		})
		this.initLanguage(this.btn_unfinishedPage);
		this.btn_unfinishedPage.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_unfinishedPage.onPressed.add(() => {
			this.btn_unfinishedPage["preScale"] = this.btn_unfinishedPage.renderScale;
			this.btn_unfinishedPage.renderScale = Vector2.one.set(this.btn_unfinishedPage["preScale"]).multiply(1.1);
		})
		this.btn_unfinishedPage.onReleased.add(() => {
			this.btn_unfinishedPage.renderScale = this.btn_unfinishedPage["preScale"];
		})
		
		
	
		this.btn_allPage.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AchieveList_UI_btn_allPage");
		})
		this.initLanguage(this.btn_allPage);
		this.btn_allPage.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_allPage.onPressed.add(() => {
			this.btn_allPage["preScale"] = this.btn_allPage.renderScale;
			this.btn_allPage.renderScale = Vector2.one.set(this.btn_allPage["preScale"]).multiply(1.1);
		})
		this.btn_allPage.onReleased.add(() => {
			this.btn_allPage.renderScale = this.btn_allPage["preScale"];
		})
		
		
	
		this.btn_giftGain.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AchieveList_UI_btn_giftGain");
		})
		this.initLanguage(this.btn_giftGain);
		this.btn_giftGain.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_giftGain.onPressed.add(() => {
			this.btn_giftGain["preScale"] = this.btn_giftGain.renderScale;
			this.btn_giftGain.renderScale = Vector2.one.set(this.btn_giftGain["preScale"]).multiply(1.1);
		})
		this.btn_giftGain.onReleased.add(() => {
			this.btn_giftGain.renderScale = this.btn_giftGain["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.rewardTipsBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AchieveList_UI_rewardTipsBtn");
		})
		this.rewardTipsBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.rewardTipsBtn.onPressed.add(() => {
			this.rewardTipsBtn["preScale"] = this.rewardTipsBtn.renderScale;
			this.rewardTipsBtn.renderScale = Vector2.one.set(this.rewardTipsBtn["preScale"]).multiply(1.1);
		})
		this.rewardTipsBtn.onReleased.add(() => {
			this.rewardTipsBtn.renderScale = this.rewardTipsBtn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_doneTitle)
		this.text_doneTitle.isRichText = true;
		
	
		this.initLanguage(this.text_unfinishedTitle)
		this.text_unfinishedTitle.isRichText = true;
		
	
		this.initLanguage(this.text_allTitle)
		this.text_allTitle.isRichText = true;
		
	
		this.initLanguage(this.text_lvTitle)
		this.text_lvTitle.isRichText = true;
		
	
		this.initLanguage(this.text_lvNum)
		this.text_lvNum.isRichText = true;
		
	
		this.initLanguage(this.text_lv)
		this.text_lv.isRichText = true;
		
	
		this.initLanguage(this.text_gainText)
		this.text_gainText.isRichText = true;
		
	
		this.initLanguage(this.text_noAchievement)
		this.text_noAchievement.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AchieveList_UI'] = AchieveList_UI_Generate;