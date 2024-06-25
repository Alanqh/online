
 

 @UIBind('UI/ShareUI/integration/mission/ActiveReward_UI.ui')
 export default class ActiveReward_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_reward_Internal: mw.Canvas
	public get canvas_reward(): mw.Canvas {
		if(!this.canvas_reward_Internal&&this.uiWidgetBase) {
			this.canvas_reward_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_reward') as mw.Canvas
		}
		return this.canvas_reward_Internal
	}
	private img_reward_Internal: mw.Image
	public get img_reward(): mw.Image {
		if(!this.img_reward_Internal&&this.uiWidgetBase) {
			this.img_reward_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_reward/img_reward') as mw.Image
		}
		return this.img_reward_Internal
	}
	private text_gain_Internal: mw.TextBlock
	public get text_gain(): mw.TextBlock {
		if(!this.text_gain_Internal&&this.uiWidgetBase) {
			this.text_gain_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_reward/text_gain') as mw.TextBlock
		}
		return this.text_gain_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_reward/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private text_gainNum_Internal: mw.TextBlock
	public get text_gainNum(): mw.TextBlock {
		if(!this.text_gainNum_Internal&&this.uiWidgetBase) {
			this.text_gainNum_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_reward/text_gainNum') as mw.TextBlock
		}
		return this.text_gainNum_Internal
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
		
		this.initLanguage(this.text_gain)
		this.text_gain.isRichText = true;
		
	
		this.initLanguage(this.text_gainNum)
		this.text_gainNum.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ActiveReward_UI'] = ActiveReward_UI_Generate;