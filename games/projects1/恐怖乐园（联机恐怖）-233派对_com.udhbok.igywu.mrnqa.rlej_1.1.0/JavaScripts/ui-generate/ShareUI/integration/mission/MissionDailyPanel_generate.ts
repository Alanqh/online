
 

 @UIBind('UI/ShareUI/integration/mission/MissionDailyPanel.ui')
 export default class MissionDailyPanel_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private scrollBox_active_Internal: mw.ScrollBox
	public get scrollBox_active(): mw.ScrollBox {
		if(!this.scrollBox_active_Internal&&this.uiWidgetBase) {
			this.scrollBox_active_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/scrollBox_active') as mw.ScrollBox
		}
		return this.scrollBox_active_Internal
	}
	private canvas_taskList1_Internal: mw.Canvas
	public get canvas_taskList1(): mw.Canvas {
		if(!this.canvas_taskList1_Internal&&this.uiWidgetBase) {
			this.canvas_taskList1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/scrollBox_active/canvas_taskList1') as mw.Canvas
		}
		return this.canvas_taskList1_Internal
	}
	private canvas_ActSchedule_Internal: mw.Canvas
	public get canvas_ActSchedule(): mw.Canvas {
		if(!this.canvas_ActSchedule_Internal&&this.uiWidgetBase) {
			this.canvas_ActSchedule_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule') as mw.Canvas
		}
		return this.canvas_ActSchedule_Internal
	}
	private canvas_ActSchedule_1_Internal: mw.Canvas
	public get canvas_ActSchedule_1(): mw.Canvas {
		if(!this.canvas_ActSchedule_1_Internal&&this.uiWidgetBase) {
			this.canvas_ActSchedule_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1') as mw.Canvas
		}
		return this.canvas_ActSchedule_1_Internal
	}
	private img_bg00_Internal: mw.Image
	public get img_bg00(): mw.Image {
		if(!this.img_bg00_Internal&&this.uiWidgetBase) {
			this.img_bg00_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/img_bg00') as mw.Image
		}
		return this.img_bg00_Internal
	}
	private img_fr1_Internal: mw.Image
	public get img_fr1(): mw.Image {
		if(!this.img_fr1_Internal&&this.uiWidgetBase) {
			this.img_fr1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/img_fr1') as mw.Image
		}
		return this.img_fr1_Internal
	}
	private img_fr2_Internal: mw.Image
	public get img_fr2(): mw.Image {
		if(!this.img_fr2_Internal&&this.uiWidgetBase) {
			this.img_fr2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/img_fr2') as mw.Image
		}
		return this.img_fr2_Internal
	}
	private text_actNow_Internal: mw.TextBlock
	public get text_actNow(): mw.TextBlock {
		if(!this.text_actNow_Internal&&this.uiWidgetBase) {
			this.text_actNow_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/text_actNow') as mw.TextBlock
		}
		return this.text_actNow_Internal
	}
	private img_quest_Internal: mw.Image
	public get img_quest(): mw.Image {
		if(!this.img_quest_Internal&&this.uiWidgetBase) {
			this.img_quest_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/img_quest') as mw.Image
		}
		return this.img_quest_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
	}
	private mProgressBar_Internal: mw.ProgressBar
	public get mProgressBar(): mw.ProgressBar {
		if(!this.mProgressBar_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/mProgressBar') as mw.ProgressBar
		}
		return this.mProgressBar_Internal
	}
	private img_circle0_Internal: mw.Image
	public get img_circle0(): mw.Image {
		if(!this.img_circle0_Internal&&this.uiWidgetBase) {
			this.img_circle0_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/img_circle0') as mw.Image
		}
		return this.img_circle0_Internal
	}
	private text_0_Internal: mw.TextBlock
	public get text_0(): mw.TextBlock {
		if(!this.text_0_Internal&&this.uiWidgetBase) {
			this.text_0_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/text_0') as mw.TextBlock
		}
		return this.text_0_Internal
	}
	private canvas_gift01_Internal: mw.Canvas
	public get canvas_gift01(): mw.Canvas {
		if(!this.canvas_gift01_Internal&&this.uiWidgetBase) {
			this.canvas_gift01_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift01') as mw.Canvas
		}
		return this.canvas_gift01_Internal
	}
	private text_20_Internal: mw.TextBlock
	public get text_20(): mw.TextBlock {
		if(!this.text_20_Internal&&this.uiWidgetBase) {
			this.text_20_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift01/text_20') as mw.TextBlock
		}
		return this.text_20_Internal
	}
	private img_circle1_Internal: mw.Image
	public get img_circle1(): mw.Image {
		if(!this.img_circle1_Internal&&this.uiWidgetBase) {
			this.img_circle1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift01/img_circle1') as mw.Image
		}
		return this.img_circle1_Internal
	}
	private img_giftBr1_Internal: mw.Image
	public get img_giftBr1(): mw.Image {
		if(!this.img_giftBr1_Internal&&this.uiWidgetBase) {
			this.img_giftBr1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift01/img_giftBr1') as mw.Image
		}
		return this.img_giftBr1_Internal
	}
	private btn_gift1_Internal: mw.Button
	public get btn_gift1(): mw.Button {
		if(!this.btn_gift1_Internal&&this.uiWidgetBase) {
			this.btn_gift1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift01/btn_gift1') as mw.Button
		}
		return this.btn_gift1_Internal
	}
	private canvas_gift02_Internal: mw.Canvas
	public get canvas_gift02(): mw.Canvas {
		if(!this.canvas_gift02_Internal&&this.uiWidgetBase) {
			this.canvas_gift02_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift02') as mw.Canvas
		}
		return this.canvas_gift02_Internal
	}
	private text_40_Internal: mw.TextBlock
	public get text_40(): mw.TextBlock {
		if(!this.text_40_Internal&&this.uiWidgetBase) {
			this.text_40_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift02/text_40') as mw.TextBlock
		}
		return this.text_40_Internal
	}
	private img_circle2_Internal: mw.Image
	public get img_circle2(): mw.Image {
		if(!this.img_circle2_Internal&&this.uiWidgetBase) {
			this.img_circle2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift02/img_circle2') as mw.Image
		}
		return this.img_circle2_Internal
	}
	private img_giftBr2_Internal: mw.Image
	public get img_giftBr2(): mw.Image {
		if(!this.img_giftBr2_Internal&&this.uiWidgetBase) {
			this.img_giftBr2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift02/img_giftBr2') as mw.Image
		}
		return this.img_giftBr2_Internal
	}
	private btn_gift2_Internal: mw.Button
	public get btn_gift2(): mw.Button {
		if(!this.btn_gift2_Internal&&this.uiWidgetBase) {
			this.btn_gift2_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift02/btn_gift2') as mw.Button
		}
		return this.btn_gift2_Internal
	}
	private canvas_gift03_Internal: mw.Canvas
	public get canvas_gift03(): mw.Canvas {
		if(!this.canvas_gift03_Internal&&this.uiWidgetBase) {
			this.canvas_gift03_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift03') as mw.Canvas
		}
		return this.canvas_gift03_Internal
	}
	private text_60_Internal: mw.TextBlock
	public get text_60(): mw.TextBlock {
		if(!this.text_60_Internal&&this.uiWidgetBase) {
			this.text_60_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift03/text_60') as mw.TextBlock
		}
		return this.text_60_Internal
	}
	private img_circle3_Internal: mw.Image
	public get img_circle3(): mw.Image {
		if(!this.img_circle3_Internal&&this.uiWidgetBase) {
			this.img_circle3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift03/img_circle3') as mw.Image
		}
		return this.img_circle3_Internal
	}
	private img_giftBr3_Internal: mw.Image
	public get img_giftBr3(): mw.Image {
		if(!this.img_giftBr3_Internal&&this.uiWidgetBase) {
			this.img_giftBr3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift03/img_giftBr3') as mw.Image
		}
		return this.img_giftBr3_Internal
	}
	private btn_gift3_Internal: mw.Button
	public get btn_gift3(): mw.Button {
		if(!this.btn_gift3_Internal&&this.uiWidgetBase) {
			this.btn_gift3_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift03/btn_gift3') as mw.Button
		}
		return this.btn_gift3_Internal
	}
	private canvas_gift04_Internal: mw.Canvas
	public get canvas_gift04(): mw.Canvas {
		if(!this.canvas_gift04_Internal&&this.uiWidgetBase) {
			this.canvas_gift04_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift04') as mw.Canvas
		}
		return this.canvas_gift04_Internal
	}
	private text_80_Internal: mw.TextBlock
	public get text_80(): mw.TextBlock {
		if(!this.text_80_Internal&&this.uiWidgetBase) {
			this.text_80_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift04/text_80') as mw.TextBlock
		}
		return this.text_80_Internal
	}
	private img_circle4_Internal: mw.Image
	public get img_circle4(): mw.Image {
		if(!this.img_circle4_Internal&&this.uiWidgetBase) {
			this.img_circle4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift04/img_circle4') as mw.Image
		}
		return this.img_circle4_Internal
	}
	private img_giftBr4_Internal: mw.Image
	public get img_giftBr4(): mw.Image {
		if(!this.img_giftBr4_Internal&&this.uiWidgetBase) {
			this.img_giftBr4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift04/img_giftBr4') as mw.Image
		}
		return this.img_giftBr4_Internal
	}
	private btn_gift4_Internal: mw.Button
	public get btn_gift4(): mw.Button {
		if(!this.btn_gift4_Internal&&this.uiWidgetBase) {
			this.btn_gift4_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift04/btn_gift4') as mw.Button
		}
		return this.btn_gift4_Internal
	}
	private canvas_gift05_Internal: mw.Canvas
	public get canvas_gift05(): mw.Canvas {
		if(!this.canvas_gift05_Internal&&this.uiWidgetBase) {
			this.canvas_gift05_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift05') as mw.Canvas
		}
		return this.canvas_gift05_Internal
	}
	private text_100_Internal: mw.TextBlock
	public get text_100(): mw.TextBlock {
		if(!this.text_100_Internal&&this.uiWidgetBase) {
			this.text_100_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift05/text_100') as mw.TextBlock
		}
		return this.text_100_Internal
	}
	private img_circle5_Internal: mw.Image
	public get img_circle5(): mw.Image {
		if(!this.img_circle5_Internal&&this.uiWidgetBase) {
			this.img_circle5_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift05/img_circle5') as mw.Image
		}
		return this.img_circle5_Internal
	}
	private img_giftBr5_Internal: mw.Image
	public get img_giftBr5(): mw.Image {
		if(!this.img_giftBr5_Internal&&this.uiWidgetBase) {
			this.img_giftBr5_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift05/img_giftBr5') as mw.Image
		}
		return this.img_giftBr5_Internal
	}
	private btn_gift5_Internal: mw.Button
	public get btn_gift5(): mw.Button {
		if(!this.btn_gift5_Internal&&this.uiWidgetBase) {
			this.btn_gift5_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_ActSchedule/canvas_ActSchedule_1/canvas_gift05/btn_gift5') as mw.Button
		}
		return this.btn_gift5_Internal
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
		
		this.btn_gift1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MissionDailyPanel_btn_gift1");
		})
		this.btn_gift1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift1.onPressed.add(() => {
			this.btn_gift1["preScale"] = this.btn_gift1.renderScale;
			this.btn_gift1.renderScale = Vector2.one.set(this.btn_gift1["preScale"]).multiply(1.1);
		})
		this.btn_gift1.onReleased.add(() => {
			this.btn_gift1.renderScale = this.btn_gift1["preScale"];
		})
		
	
		this.btn_gift2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MissionDailyPanel_btn_gift2");
		})
		this.btn_gift2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift2.onPressed.add(() => {
			this.btn_gift2["preScale"] = this.btn_gift2.renderScale;
			this.btn_gift2.renderScale = Vector2.one.set(this.btn_gift2["preScale"]).multiply(1.1);
		})
		this.btn_gift2.onReleased.add(() => {
			this.btn_gift2.renderScale = this.btn_gift2["preScale"];
		})
		
	
		this.btn_gift3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MissionDailyPanel_btn_gift3");
		})
		this.btn_gift3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift3.onPressed.add(() => {
			this.btn_gift3["preScale"] = this.btn_gift3.renderScale;
			this.btn_gift3.renderScale = Vector2.one.set(this.btn_gift3["preScale"]).multiply(1.1);
		})
		this.btn_gift3.onReleased.add(() => {
			this.btn_gift3.renderScale = this.btn_gift3["preScale"];
		})
		
	
		this.btn_gift4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MissionDailyPanel_btn_gift4");
		})
		this.btn_gift4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift4.onPressed.add(() => {
			this.btn_gift4["preScale"] = this.btn_gift4.renderScale;
			this.btn_gift4.renderScale = Vector2.one.set(this.btn_gift4["preScale"]).multiply(1.1);
		})
		this.btn_gift4.onReleased.add(() => {
			this.btn_gift4.renderScale = this.btn_gift4["preScale"];
		})
		
	
		this.btn_gift5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "MissionDailyPanel_btn_gift5");
		})
		this.btn_gift5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift5.onPressed.add(() => {
			this.btn_gift5["preScale"] = this.btn_gift5.renderScale;
			this.btn_gift5.renderScale = Vector2.one.set(this.btn_gift5["preScale"]).multiply(1.1);
		})
		this.btn_gift5.onReleased.add(() => {
			this.btn_gift5.renderScale = this.btn_gift5["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_actNow)
		this.text_actNow.isRichText = true;
		
	
		this.initLanguage(this.text_tips)
		this.text_tips.isRichText = true;
		
	
		this.initLanguage(this.text_0)
		this.text_0.isRichText = true;
		
	
		this.initLanguage(this.text_20)
		this.text_20.isRichText = true;
		
	
		this.initLanguage(this.text_40)
		this.text_40.isRichText = true;
		
	
		this.initLanguage(this.text_60)
		this.text_60.isRichText = true;
		
	
		this.initLanguage(this.text_80)
		this.text_80.isRichText = true;
		
	
		this.initLanguage(this.text_100)
		this.text_100.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MissionDailyPanel'] = MissionDailyPanel_Generate;