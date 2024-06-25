
 

 @UIBind('UI/ShareUI/props/BuildingStyle_UI.ui')
 export default class BuildingStyle_UI_Generate extends UIScript {
	 	private canvas_frame0_Internal: mw.Canvas
	public get canvas_frame0(): mw.Canvas {
		if(!this.canvas_frame0_Internal&&this.uiWidgetBase) {
			this.canvas_frame0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0') as mw.Canvas
		}
		return this.canvas_frame0_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private text_switch_Internal: mw.TextBlock
	public get text_switch(): mw.TextBlock {
		if(!this.text_switch_Internal&&this.uiWidgetBase) {
			this.text_switch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/text_switch') as mw.TextBlock
		}
		return this.text_switch_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private img_frame_1_Internal: mw.Image
	public get img_frame_1(): mw.Image {
		if(!this.img_frame_1_Internal&&this.uiWidgetBase) {
			this.img_frame_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/img_frame_1') as mw.Image
		}
		return this.img_frame_1_Internal
	}
	private canvas_frame2_Internal: mw.Canvas
	public get canvas_frame2(): mw.Canvas {
		if(!this.canvas_frame2_Internal&&this.uiWidgetBase) {
			this.canvas_frame2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2') as mw.Canvas
		}
		return this.canvas_frame2_Internal
	}
	private canvas_tab1_Internal: mw.Canvas
	public get canvas_tab1(): mw.Canvas {
		if(!this.canvas_tab1_Internal&&this.uiWidgetBase) {
			this.canvas_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab1') as mw.Canvas
		}
		return this.canvas_tab1_Internal
	}
	private img_tab1_Internal: mw.Image
	public get img_tab1(): mw.Image {
		if(!this.img_tab1_Internal&&this.uiWidgetBase) {
			this.img_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab1/img_tab1') as mw.Image
		}
		return this.img_tab1_Internal
	}
	private img_selected1_Internal: mw.Image
	public get img_selected1(): mw.Image {
		if(!this.img_selected1_Internal&&this.uiWidgetBase) {
			this.img_selected1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab1/img_selected1') as mw.Image
		}
		return this.img_selected1_Internal
	}
	private btn_tab1_Internal: mw.Button
	public get btn_tab1(): mw.Button {
		if(!this.btn_tab1_Internal&&this.uiWidgetBase) {
			this.btn_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab1/btn_tab1') as mw.Button
		}
		return this.btn_tab1_Internal
	}
	private canvas_tab2_Internal: mw.Canvas
	public get canvas_tab2(): mw.Canvas {
		if(!this.canvas_tab2_Internal&&this.uiWidgetBase) {
			this.canvas_tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab2') as mw.Canvas
		}
		return this.canvas_tab2_Internal
	}
	private img_tab2_Internal: mw.Image
	public get img_tab2(): mw.Image {
		if(!this.img_tab2_Internal&&this.uiWidgetBase) {
			this.img_tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab2/img_tab2') as mw.Image
		}
		return this.img_tab2_Internal
	}
	private img_selected2_Internal: mw.Image
	public get img_selected2(): mw.Image {
		if(!this.img_selected2_Internal&&this.uiWidgetBase) {
			this.img_selected2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab2/img_selected2') as mw.Image
		}
		return this.img_selected2_Internal
	}
	private btn_tab2_Internal: mw.Button
	public get btn_tab2(): mw.Button {
		if(!this.btn_tab2_Internal&&this.uiWidgetBase) {
			this.btn_tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab2/btn_tab2') as mw.Button
		}
		return this.btn_tab2_Internal
	}
	private canvas_tab3_Internal: mw.Canvas
	public get canvas_tab3(): mw.Canvas {
		if(!this.canvas_tab3_Internal&&this.uiWidgetBase) {
			this.canvas_tab3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab3') as mw.Canvas
		}
		return this.canvas_tab3_Internal
	}
	private img_tab3_Internal: mw.Image
	public get img_tab3(): mw.Image {
		if(!this.img_tab3_Internal&&this.uiWidgetBase) {
			this.img_tab3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab3/img_tab3') as mw.Image
		}
		return this.img_tab3_Internal
	}
	private img_selected3_Internal: mw.Image
	public get img_selected3(): mw.Image {
		if(!this.img_selected3_Internal&&this.uiWidgetBase) {
			this.img_selected3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab3/img_selected3') as mw.Image
		}
		return this.img_selected3_Internal
	}
	private btn_tab3_Internal: mw.Button
	public get btn_tab3(): mw.Button {
		if(!this.btn_tab3_Internal&&this.uiWidgetBase) {
			this.btn_tab3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab3/btn_tab3') as mw.Button
		}
		return this.btn_tab3_Internal
	}
	private canvas_tab4_Internal: mw.Canvas
	public get canvas_tab4(): mw.Canvas {
		if(!this.canvas_tab4_Internal&&this.uiWidgetBase) {
			this.canvas_tab4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab4') as mw.Canvas
		}
		return this.canvas_tab4_Internal
	}
	private img_tab4_Internal: mw.Image
	public get img_tab4(): mw.Image {
		if(!this.img_tab4_Internal&&this.uiWidgetBase) {
			this.img_tab4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab4/img_tab4') as mw.Image
		}
		return this.img_tab4_Internal
	}
	private img_selected4_Internal: mw.Image
	public get img_selected4(): mw.Image {
		if(!this.img_selected4_Internal&&this.uiWidgetBase) {
			this.img_selected4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab4/img_selected4') as mw.Image
		}
		return this.img_selected4_Internal
	}
	private btn_tab4_Internal: mw.Button
	public get btn_tab4(): mw.Button {
		if(!this.btn_tab4_Internal&&this.uiWidgetBase) {
			this.btn_tab4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frame0/canvas_frame2/canvas_tab4/btn_tab4') as mw.Button
		}
		return this.btn_tab4_Internal
	}
	private canvas_styles_Internal: mw.Canvas
	public get canvas_styles(): mw.Canvas {
		if(!this.canvas_styles_Internal&&this.uiWidgetBase) {
			this.canvas_styles_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/canvas_styles') as mw.Canvas
		}
		return this.canvas_styles_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildingStyle_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_tab1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildingStyle_UI_btn_tab1");
		})
		this.btn_tab1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab1.onPressed.add(() => {
			this.btn_tab1["preScale"] = this.btn_tab1.renderScale;
			this.btn_tab1.renderScale = Vector2.one.set(this.btn_tab1["preScale"]).multiply(1.1);
		})
		this.btn_tab1.onReleased.add(() => {
			this.btn_tab1.renderScale = this.btn_tab1["preScale"];
		})
		
	
		this.btn_tab2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildingStyle_UI_btn_tab2");
		})
		this.btn_tab2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab2.onPressed.add(() => {
			this.btn_tab2["preScale"] = this.btn_tab2.renderScale;
			this.btn_tab2.renderScale = Vector2.one.set(this.btn_tab2["preScale"]).multiply(1.1);
		})
		this.btn_tab2.onReleased.add(() => {
			this.btn_tab2.renderScale = this.btn_tab2["preScale"];
		})
		
	
		this.btn_tab3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildingStyle_UI_btn_tab3");
		})
		this.btn_tab3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab3.onPressed.add(() => {
			this.btn_tab3["preScale"] = this.btn_tab3.renderScale;
			this.btn_tab3.renderScale = Vector2.one.set(this.btn_tab3["preScale"]).multiply(1.1);
		})
		this.btn_tab3.onReleased.add(() => {
			this.btn_tab3.renderScale = this.btn_tab3["preScale"];
		})
		
	
		this.btn_tab4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "BuildingStyle_UI_btn_tab4");
		})
		this.btn_tab4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab4.onPressed.add(() => {
			this.btn_tab4["preScale"] = this.btn_tab4.renderScale;
			this.btn_tab4.renderScale = Vector2.one.set(this.btn_tab4["preScale"]).multiply(1.1);
		})
		this.btn_tab4.onReleased.add(() => {
			this.btn_tab4.renderScale = this.btn_tab4["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_switch)
		this.text_switch.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_frame0/canvas_frame2/canvas_tab1/btn_tab1/Text_styleItem") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_frame0/canvas_frame2/canvas_tab2/btn_tab2/Text_styleItem") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_frame0/canvas_frame2/canvas_tab3/btn_tab3/Text_styleItem") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_frame0/canvas_frame2/canvas_tab4/btn_tab4/Text_styleItem") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_BuildingStyle_UI'] = BuildingStyle_UI_Generate;