
 

 @UIBind('UI/ShareUI/integration/mission/MissionItem_UI.ui')
 export default class MissionItem_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_task_Internal: mw.Canvas
	public get canvas_task(): mw.Canvas {
		if(!this.canvas_task_Internal&&this.uiWidgetBase) {
			this.canvas_task_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task') as mw.Canvas
		}
		return this.canvas_task_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_bgseasonal2_Internal: mw.Image
	public get img_bgseasonal2(): mw.Image {
		if(!this.img_bgseasonal2_Internal&&this.uiWidgetBase) {
			this.img_bgseasonal2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/img_bgseasonal2') as mw.Image
		}
		return this.img_bgseasonal2_Internal
	}
	private text_taskName_Internal: mw.TextBlock
	public get text_taskName(): mw.TextBlock {
		if(!this.text_taskName_Internal&&this.uiWidgetBase) {
			this.text_taskName_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/text_taskName') as mw.TextBlock
		}
		return this.text_taskName_Internal
	}
	private text_taskTips_Internal: mw.TextBlock
	public get text_taskTips(): mw.TextBlock {
		if(!this.text_taskTips_Internal&&this.uiWidgetBase) {
			this.text_taskTips_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/text_taskTips') as mw.TextBlock
		}
		return this.text_taskTips_Internal
	}
	private text_taskTips_1_Internal: mw.TextBlock
	public get text_taskTips_1(): mw.TextBlock {
		if(!this.text_taskTips_1_Internal&&this.uiWidgetBase) {
			this.text_taskTips_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/text_taskTips_1') as mw.TextBlock
		}
		return this.text_taskTips_1_Internal
	}
	private img_br1_Internal: mw.Image
	public get img_br1(): mw.Image {
		if(!this.img_br1_Internal&&this.uiWidgetBase) {
			this.img_br1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/img_br1') as mw.Image
		}
		return this.img_br1_Internal
	}
	private text_giftName_Internal: mw.TextBlock
	public get text_giftName(): mw.TextBlock {
		if(!this.text_giftName_Internal&&this.uiWidgetBase) {
			this.text_giftName_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/text_giftName') as mw.TextBlock
		}
		return this.text_giftName_Internal
	}
	private canvas_gifts_Internal: mw.Canvas
	public get canvas_gifts(): mw.Canvas {
		if(!this.canvas_gifts_Internal&&this.uiWidgetBase) {
			this.canvas_gifts_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/canvas_gifts') as mw.Canvas
		}
		return this.canvas_gifts_Internal
	}
	private canvas_giftGain_Internal: mw.Canvas
	public get canvas_giftGain(): mw.Canvas {
		if(!this.canvas_giftGain_Internal&&this.uiWidgetBase) {
			this.canvas_giftGain_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/canvas_giftGain') as mw.Canvas
		}
		return this.canvas_giftGain_Internal
	}
	private img_progress_Internal: mw.Image
	public get img_progress(): mw.Image {
		if(!this.img_progress_Internal&&this.uiWidgetBase) {
			this.img_progress_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/canvas_giftGain/img_progress') as mw.Image
		}
		return this.img_progress_Internal
	}
	private text_progress_Internal: mw.TextBlock
	public get text_progress(): mw.TextBlock {
		if(!this.text_progress_Internal&&this.uiWidgetBase) {
			this.text_progress_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/canvas_giftGain/img_progress/text_progress') as mw.TextBlock
		}
		return this.text_progress_Internal
	}
	private btn_giftGain_Internal: mw.StaleButton
	public get btn_giftGain(): mw.StaleButton {
		if(!this.btn_giftGain_Internal&&this.uiWidgetBase) {
			this.btn_giftGain_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/canvas_giftGain/btn_giftGain') as mw.StaleButton
		}
		return this.btn_giftGain_Internal
	}
	private text_noTask_Internal: mw.TextBlock
	public get text_noTask(): mw.TextBlock {
		if(!this.text_noTask_Internal&&this.uiWidgetBase) {
			this.text_noTask_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_task/text_noTask') as mw.TextBlock
		}
		return this.text_noTask_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_giftGain.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MissionItem_UI_btn_giftGain");
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
		

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_taskName)
		this.text_taskName.isRichText = true;
		
	
		this.initLanguage(this.text_taskTips)
		this.text_taskTips.isRichText = true;
		
	
		this.initLanguage(this.text_taskTips_1)
		this.text_taskTips_1.isRichText = true;
		
	
		this.initLanguage(this.text_giftName)
		this.text_giftName.isRichText = true;
		
	
		this.initLanguage(this.text_progress)
		this.text_progress.isRichText = true;
		
	
		this.initLanguage(this.text_noTask)
		this.text_noTask.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MissionItem_UI'] = MissionItem_UI_Generate;