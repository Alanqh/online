
 

 @UIBind('UI/ShareUI/card/Cardrecord_UI.ui')
 export default class Cardrecord_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private img_name_Internal: mw.Image
	public get img_name(): mw.Image {
		if(!this.img_name_Internal&&this.uiWidgetBase) {
			this.img_name_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_name') as mw.Image
		}
		return this.img_name_Internal
	}
	private img_name2_1_Internal: mw.Image
	public get img_name2_1(): mw.Image {
		if(!this.img_name2_1_Internal&&this.uiWidgetBase) {
			this.img_name2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_name2_1') as mw.Image
		}
		return this.img_name2_1_Internal
	}
	private img_name2_2_Internal: mw.Image
	public get img_name2_2(): mw.Image {
		if(!this.img_name2_2_Internal&&this.uiWidgetBase) {
			this.img_name2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_name2_2') as mw.Image
		}
		return this.img_name2_2_Internal
	}
	private img_name2_2_1_Internal: mw.Image
	public get img_name2_2_1(): mw.Image {
		if(!this.img_name2_2_1_Internal&&this.uiWidgetBase) {
			this.img_name2_2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_name2_2_1') as mw.Image
		}
		return this.img_name2_2_1_Internal
	}
	private img_name2_2_1_1_Internal: mw.Image
	public get img_name2_2_1_1(): mw.Image {
		if(!this.img_name2_2_1_1_Internal&&this.uiWidgetBase) {
			this.img_name2_2_1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/img_name2_2_1_1') as mw.Image
		}
		return this.img_name2_2_1_1_Internal
	}
	private txt_cardname_Internal: mw.TextBlock
	public get txt_cardname(): mw.TextBlock {
		if(!this.txt_cardname_Internal&&this.uiWidgetBase) {
			this.txt_cardname_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/txt_cardname') as mw.TextBlock
		}
		return this.txt_cardname_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private img_record1_Internal: mw.Image
	public get img_record1(): mw.Image {
		if(!this.img_record1_Internal&&this.uiWidgetBase) {
			this.img_record1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_record1') as mw.Image
		}
		return this.img_record1_Internal
	}
	private img_record2_Internal: mw.Image
	public get img_record2(): mw.Image {
		if(!this.img_record2_Internal&&this.uiWidgetBase) {
			this.img_record2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_record2') as mw.Image
		}
		return this.img_record2_Internal
	}
	private scrollBox_Internal: mw.ScrollBox
	public get scrollBox(): mw.ScrollBox {
		if(!this.scrollBox_Internal&&this.uiWidgetBase) {
			this.scrollBox_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/scrollBox') as mw.ScrollBox
		}
		return this.scrollBox_Internal
	}
	private record_Internal: mw.Canvas
	public get record(): mw.Canvas {
		if(!this.record_Internal&&this.uiWidgetBase) {
			this.record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/scrollBox/record') as mw.Canvas
		}
		return this.record_Internal
	}
	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private txt_tips_Internal: mw.TextBlock
	public get txt_tips(): mw.TextBlock {
		if(!this.txt_tips_Internal&&this.uiWidgetBase) {
			this.txt_tips_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_tips/txt_tips') as mw.TextBlock
		}
		return this.txt_tips_Internal
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
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Cardrecord_UI_btn_close");
		})
		this.btn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close.onPressed.add(() => {
			this.btn_close["preScale"] = this.btn_close.renderScale;
			this.btn_close.renderScale = Vector2.one.set(this.btn_close["preScale"]).multiply(1.1);
		})
		this.btn_close.onReleased.add(() => {
			this.btn_close.renderScale = this.btn_close["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txt_cardname)
		this.txt_cardname.isRichText = true;
		
	
		this.initLanguage(this.txt_tips)
		this.txt_tips.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Cardrecord_UI'] = Cardrecord_UI_Generate;