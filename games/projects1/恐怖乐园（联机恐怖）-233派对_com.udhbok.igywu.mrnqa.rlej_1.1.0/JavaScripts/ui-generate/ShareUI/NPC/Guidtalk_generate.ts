
 

 @UIBind('UI/ShareUI/NPC/Guidtalk.ui')
 export default class Guidtalk_Generate extends UIScript {
	 	private btn_continue_Internal: mw.Button
	public get btn_continue(): mw.Button {
		if(!this.btn_continue_Internal&&this.uiWidgetBase) {
			this.btn_continue_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/btn_continue') as mw.Button
		}
		return this.btn_continue_Internal
	}
	private img_mask_Internal: mw.Image
	public get img_mask(): mw.Image {
		if(!this.img_mask_Internal&&this.uiWidgetBase) {
			this.img_mask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/img_mask') as mw.Image
		}
		return this.img_mask_Internal
	}
	private cav_talk_Internal: mw.Canvas
	public get cav_talk(): mw.Canvas {
		if(!this.cav_talk_Internal&&this.uiWidgetBase) {
			this.cav_talk_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cav_talk') as mw.Canvas
		}
		return this.cav_talk_Internal
	}
	private img_people_Internal: mw.Image
	public get img_people(): mw.Image {
		if(!this.img_people_Internal&&this.uiWidgetBase) {
			this.img_people_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cav_talk/img_people') as mw.Image
		}
		return this.img_people_Internal
	}
	private txt_content_2_Internal: mw.TextBlock
	public get txt_content_2(): mw.TextBlock {
		if(!this.txt_content_2_Internal&&this.uiWidgetBase) {
			this.txt_content_2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cav_talk/txt_content_2') as mw.TextBlock
		}
		return this.txt_content_2_Internal
	}
	private img_likeBg3_Internal: mw.Image
	public get img_likeBg3(): mw.Image {
		if(!this.img_likeBg3_Internal&&this.uiWidgetBase) {
			this.img_likeBg3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cav_talk/Canvas/img_likeBg3') as mw.Image
		}
		return this.img_likeBg3_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cav_talk/Canvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
	}
	private cav_select_Internal: mw.Canvas
	public get cav_select(): mw.Canvas {
		if(!this.cav_select_Internal&&this.uiWidgetBase) {
			this.cav_select_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cav_talk/CanvasSec_Youduiqi/cav_select') as mw.Canvas
		}
		return this.cav_select_Internal
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
		
		this.btn_continue.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Guidtalk_btn_continue");
		})
		this.btn_continue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_continue.onPressed.add(() => {
			this.btn_continue["preScale"] = this.btn_continue.renderScale;
			this.btn_continue.renderScale = Vector2.one.set(this.btn_continue["preScale"]).multiply(1.1);
		})
		this.btn_continue.onReleased.add(() => {
			this.btn_continue.renderScale = this.btn_continue["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txt_content_2)
		this.txt_content_2.isRichText = true;
		
	
		this.initLanguage(this.txt_name)
		this.txt_name.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Guidtalk'] = Guidtalk_Generate;