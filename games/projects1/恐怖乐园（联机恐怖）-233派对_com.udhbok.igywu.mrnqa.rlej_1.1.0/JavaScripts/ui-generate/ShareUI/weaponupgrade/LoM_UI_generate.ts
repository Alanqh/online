
 

 @UIBind('UI/ShareUI/weaponupgrade/LoM_UI.ui')
 export default class LoM_UI_Generate extends UIScript {
	 	private canvas_LoM_Internal: mw.Canvas
	public get canvas_LoM(): mw.Canvas {
		if(!this.canvas_LoM_Internal&&this.uiWidgetBase) {
			this.canvas_LoM_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM') as mw.Canvas
		}
		return this.canvas_LoM_Internal
	}
	private img_frame1_Internal: mw.Image
	public get img_frame1(): mw.Image {
		if(!this.img_frame1_Internal&&this.uiWidgetBase) {
			this.img_frame1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/img_frame1') as mw.Image
		}
		return this.img_frame1_Internal
	}
	private img_frame2_Internal: mw.Image
	public get img_frame2(): mw.Image {
		if(!this.img_frame2_Internal&&this.uiWidgetBase) {
			this.img_frame2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/img_frame2') as mw.Image
		}
		return this.img_frame2_Internal
	}
	private img_frame3_Internal: mw.Image
	public get img_frame3(): mw.Image {
		if(!this.img_frame3_Internal&&this.uiWidgetBase) {
			this.img_frame3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/img_frame3') as mw.Image
		}
		return this.img_frame3_Internal
	}
	private mCanvas_LoMTop_Internal: mw.Canvas
	public get mCanvas_LoMTop(): mw.Canvas {
		if(!this.mCanvas_LoMTop_Internal&&this.uiWidgetBase) {
			this.mCanvas_LoMTop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMTop') as mw.Canvas
		}
		return this.mCanvas_LoMTop_Internal
	}
	private text_LoMDetail_Internal: mw.TextBlock
	public get text_LoMDetail(): mw.TextBlock {
		if(!this.text_LoMDetail_Internal&&this.uiWidgetBase) {
			this.text_LoMDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMTop/text_LoMDetail') as mw.TextBlock
		}
		return this.text_LoMDetail_Internal
	}
	private text_LoMTitle_Internal: mw.TextBlock
	public get text_LoMTitle(): mw.TextBlock {
		if(!this.text_LoMTitle_Internal&&this.uiWidgetBase) {
			this.text_LoMTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMTop/text_LoMTitle') as mw.TextBlock
		}
		return this.text_LoMTitle_Internal
	}
	private mCanvas_LoMExchange_Internal: mw.Canvas
	public get mCanvas_LoMExchange(): mw.Canvas {
		if(!this.mCanvas_LoMExchange_Internal&&this.uiWidgetBase) {
			this.mCanvas_LoMExchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMExchange') as mw.Canvas
		}
		return this.mCanvas_LoMExchange_Internal
	}
	private mCanvas_ChangeBefore_Internal: mw.Canvas
	public get mCanvas_ChangeBefore(): mw.Canvas {
		if(!this.mCanvas_ChangeBefore_Internal&&this.uiWidgetBase) {
			this.mCanvas_ChangeBefore_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMExchange/mCanvas_ChangeBefore') as mw.Canvas
		}
		return this.mCanvas_ChangeBefore_Internal
	}
	private mCanvas_ChangeAfter_Internal: mw.Canvas
	public get mCanvas_ChangeAfter(): mw.Canvas {
		if(!this.mCanvas_ChangeAfter_Internal&&this.uiWidgetBase) {
			this.mCanvas_ChangeAfter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMExchange/mCanvas_ChangeAfter') as mw.Canvas
		}
		return this.mCanvas_ChangeAfter_Internal
	}
	private mCanvas_LoMBotton_Internal: mw.Canvas
	public get mCanvas_LoMBotton(): mw.Canvas {
		if(!this.mCanvas_LoMBotton_Internal&&this.uiWidgetBase) {
			this.mCanvas_LoMBotton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMBotton') as mw.Canvas
		}
		return this.mCanvas_LoMBotton_Internal
	}
	private btn_ExchangeNo_Internal: mw.Button
	public get btn_ExchangeNo(): mw.Button {
		if(!this.btn_ExchangeNo_Internal&&this.uiWidgetBase) {
			this.btn_ExchangeNo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMBotton/btn_ExchangeNo') as mw.Button
		}
		return this.btn_ExchangeNo_Internal
	}
	private text_ExchangeNo_Internal: mw.TextBlock
	public get text_ExchangeNo(): mw.TextBlock {
		if(!this.text_ExchangeNo_Internal&&this.uiWidgetBase) {
			this.text_ExchangeNo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMBotton/btn_ExchangeNo/text_ExchangeNo') as mw.TextBlock
		}
		return this.text_ExchangeNo_Internal
	}
	private btn_ExchangeYes_Internal: mw.Button
	public get btn_ExchangeYes(): mw.Button {
		if(!this.btn_ExchangeYes_Internal&&this.uiWidgetBase) {
			this.btn_ExchangeYes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMBotton/btn_ExchangeYes') as mw.Button
		}
		return this.btn_ExchangeYes_Internal
	}
	private text_ExchangeYes_Internal: mw.TextBlock
	public get text_ExchangeYes(): mw.TextBlock {
		if(!this.text_ExchangeYes_Internal&&this.uiWidgetBase) {
			this.text_ExchangeYes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_LoM/mCanvas_LoMBotton/btn_ExchangeYes/text_ExchangeYes') as mw.TextBlock
		}
		return this.text_ExchangeYes_Internal
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
		
		this.btn_ExchangeNo.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "LoM_UI_btn_ExchangeNo");
		})
		this.btn_ExchangeNo.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_ExchangeNo.onPressed.add(() => {
			this.btn_ExchangeNo["preScale"] = this.btn_ExchangeNo.renderScale;
			this.btn_ExchangeNo.renderScale = Vector2.one.set(this.btn_ExchangeNo["preScale"]).multiply(1.1);
		})
		this.btn_ExchangeNo.onReleased.add(() => {
			this.btn_ExchangeNo.renderScale = this.btn_ExchangeNo["preScale"];
		})
		
	
		this.btn_ExchangeYes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "LoM_UI_btn_ExchangeYes");
		})
		this.btn_ExchangeYes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_ExchangeYes.onPressed.add(() => {
			this.btn_ExchangeYes["preScale"] = this.btn_ExchangeYes.renderScale;
			this.btn_ExchangeYes.renderScale = Vector2.one.set(this.btn_ExchangeYes["preScale"]).multiply(1.1);
		})
		this.btn_ExchangeYes.onReleased.add(() => {
			this.btn_ExchangeYes.renderScale = this.btn_ExchangeYes["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_LoMDetail)
		this.text_LoMDetail.isRichText = true;
		
	
		this.initLanguage(this.text_LoMTitle)
		this.text_LoMTitle.isRichText = true;
		
	
		this.initLanguage(this.text_ExchangeNo)
		this.text_ExchangeNo.isRichText = true;
		
	
		this.initLanguage(this.text_ExchangeYes)
		this.text_ExchangeYes.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_LoM_UI'] = LoM_UI_Generate;