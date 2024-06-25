
 

 @UIBind('UI/ShareUI/card/Recordbar_UI.ui')
 export default class Recordbar_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private img_end1_Internal: mw.Image
	public get img_end1(): mw.Image {
		if(!this.img_end1_Internal&&this.uiWidgetBase) {
			this.img_end1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_end1') as mw.Image
		}
		return this.img_end1_Internal
	}
	private canvas_end_Internal: mw.Canvas
	public get canvas_end(): mw.Canvas {
		if(!this.canvas_end_Internal&&this.uiWidgetBase) {
			this.canvas_end_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end') as mw.Canvas
		}
		return this.canvas_end_Internal
	}
	private canvas_troofy1_1_Internal: mw.Canvas
	public get canvas_troofy1_1(): mw.Canvas {
		if(!this.canvas_troofy1_1_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_1') as mw.Canvas
		}
		return this.canvas_troofy1_1_Internal
	}
	private img_shadow1_1_Internal: mw.Image
	public get img_shadow1_1(): mw.Image {
		if(!this.img_shadow1_1_Internal&&this.uiWidgetBase) {
			this.img_shadow1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_1/img_shadow1_1') as mw.Image
		}
		return this.img_shadow1_1_Internal
	}
	private img_trophy1_1_Internal: mw.Image
	public get img_trophy1_1(): mw.Image {
		if(!this.img_trophy1_1_Internal&&this.uiWidgetBase) {
			this.img_trophy1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_1/img_trophy1_1') as mw.Image
		}
		return this.img_trophy1_1_Internal
	}
	private txt_time1_1_Internal: mw.TextBlock
	public get txt_time1_1(): mw.TextBlock {
		if(!this.txt_time1_1_Internal&&this.uiWidgetBase) {
			this.txt_time1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_1/txt_time1_1') as mw.TextBlock
		}
		return this.txt_time1_1_Internal
	}
	private txt_diffi1_1_Internal: mw.TextBlock
	public get txt_diffi1_1(): mw.TextBlock {
		if(!this.txt_diffi1_1_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_1/txt_diffi1_1') as mw.TextBlock
		}
		return this.txt_diffi1_1_Internal
	}
	private canvas_troofy1_2_Internal: mw.Canvas
	public get canvas_troofy1_2(): mw.Canvas {
		if(!this.canvas_troofy1_2_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_2') as mw.Canvas
		}
		return this.canvas_troofy1_2_Internal
	}
	private img_shadow1_2_Internal: mw.Image
	public get img_shadow1_2(): mw.Image {
		if(!this.img_shadow1_2_Internal&&this.uiWidgetBase) {
			this.img_shadow1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_2/img_shadow1_2') as mw.Image
		}
		return this.img_shadow1_2_Internal
	}
	private img_trophy1_2_Internal: mw.Image
	public get img_trophy1_2(): mw.Image {
		if(!this.img_trophy1_2_Internal&&this.uiWidgetBase) {
			this.img_trophy1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_2/img_trophy1_2') as mw.Image
		}
		return this.img_trophy1_2_Internal
	}
	private txt_time1_2_Internal: mw.TextBlock
	public get txt_time1_2(): mw.TextBlock {
		if(!this.txt_time1_2_Internal&&this.uiWidgetBase) {
			this.txt_time1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_2/txt_time1_2') as mw.TextBlock
		}
		return this.txt_time1_2_Internal
	}
	private txt_diffi1_2_Internal: mw.TextBlock
	public get txt_diffi1_2(): mw.TextBlock {
		if(!this.txt_diffi1_2_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_2/txt_diffi1_2') as mw.TextBlock
		}
		return this.txt_diffi1_2_Internal
	}
	private canvas_troofy1_3_Internal: mw.Canvas
	public get canvas_troofy1_3(): mw.Canvas {
		if(!this.canvas_troofy1_3_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_3') as mw.Canvas
		}
		return this.canvas_troofy1_3_Internal
	}
	private img_shadow1_3_Internal: mw.Image
	public get img_shadow1_3(): mw.Image {
		if(!this.img_shadow1_3_Internal&&this.uiWidgetBase) {
			this.img_shadow1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_3/img_shadow1_3') as mw.Image
		}
		return this.img_shadow1_3_Internal
	}
	private img_trophy1_3_Internal: mw.Image
	public get img_trophy1_3(): mw.Image {
		if(!this.img_trophy1_3_Internal&&this.uiWidgetBase) {
			this.img_trophy1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_3/img_trophy1_3') as mw.Image
		}
		return this.img_trophy1_3_Internal
	}
	private txt_time1_3_Internal: mw.TextBlock
	public get txt_time1_3(): mw.TextBlock {
		if(!this.txt_time1_3_Internal&&this.uiWidgetBase) {
			this.txt_time1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_3/txt_time1_3') as mw.TextBlock
		}
		return this.txt_time1_3_Internal
	}
	private txt_diffi1_3_Internal: mw.TextBlock
	public get txt_diffi1_3(): mw.TextBlock {
		if(!this.txt_diffi1_3_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_3/txt_diffi1_3') as mw.TextBlock
		}
		return this.txt_diffi1_3_Internal
	}
	private canvas_troofy1_4_Internal: mw.Canvas
	public get canvas_troofy1_4(): mw.Canvas {
		if(!this.canvas_troofy1_4_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_4') as mw.Canvas
		}
		return this.canvas_troofy1_4_Internal
	}
	private img_shadow1_4_Internal: mw.Image
	public get img_shadow1_4(): mw.Image {
		if(!this.img_shadow1_4_Internal&&this.uiWidgetBase) {
			this.img_shadow1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_4/img_shadow1_4') as mw.Image
		}
		return this.img_shadow1_4_Internal
	}
	private img_trophy1_4_Internal: mw.Image
	public get img_trophy1_4(): mw.Image {
		if(!this.img_trophy1_4_Internal&&this.uiWidgetBase) {
			this.img_trophy1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_4/img_trophy1_4') as mw.Image
		}
		return this.img_trophy1_4_Internal
	}
	private txt_time1_4_Internal: mw.TextBlock
	public get txt_time1_4(): mw.TextBlock {
		if(!this.txt_time1_4_Internal&&this.uiWidgetBase) {
			this.txt_time1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_4/txt_time1_4') as mw.TextBlock
		}
		return this.txt_time1_4_Internal
	}
	private txt_diffi1_4_Internal: mw.TextBlock
	public get txt_diffi1_4(): mw.TextBlock {
		if(!this.txt_diffi1_4_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_4/txt_diffi1_4') as mw.TextBlock
		}
		return this.txt_diffi1_4_Internal
	}
	private canvas_troofy1_5_Internal: mw.Canvas
	public get canvas_troofy1_5(): mw.Canvas {
		if(!this.canvas_troofy1_5_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_5') as mw.Canvas
		}
		return this.canvas_troofy1_5_Internal
	}
	private img_shadow1_5_Internal: mw.Image
	public get img_shadow1_5(): mw.Image {
		if(!this.img_shadow1_5_Internal&&this.uiWidgetBase) {
			this.img_shadow1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_5/img_shadow1_5') as mw.Image
		}
		return this.img_shadow1_5_Internal
	}
	private img_trophy1_5_Internal: mw.Image
	public get img_trophy1_5(): mw.Image {
		if(!this.img_trophy1_5_Internal&&this.uiWidgetBase) {
			this.img_trophy1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_5/img_trophy1_5') as mw.Image
		}
		return this.img_trophy1_5_Internal
	}
	private txt_time1_5_Internal: mw.TextBlock
	public get txt_time1_5(): mw.TextBlock {
		if(!this.txt_time1_5_Internal&&this.uiWidgetBase) {
			this.txt_time1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_5/txt_time1_5') as mw.TextBlock
		}
		return this.txt_time1_5_Internal
	}
	private txt_diffi1_5_Internal: mw.TextBlock
	public get txt_diffi1_5(): mw.TextBlock {
		if(!this.txt_diffi1_5_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_end/canvas_troofy1_5/txt_diffi1_5') as mw.TextBlock
		}
		return this.txt_diffi1_5_Internal
	}
	private txt1_Internal: mw.TextBlock
	public get txt1(): mw.TextBlock {
		if(!this.txt1_Internal&&this.uiWidgetBase) {
			this.txt1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/txt1') as mw.TextBlock
		}
		return this.txt1_Internal
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
		
		this.initLanguage(this.txt_time1_1)
		this.txt_time1_1.isRichText = true;
		
	
		this.initLanguage(this.txt_diffi1_1)
		this.txt_diffi1_1.isRichText = true;
		
	
		this.initLanguage(this.txt_time1_2)
		this.txt_time1_2.isRichText = true;
		
	
		this.initLanguage(this.txt_diffi1_2)
		this.txt_diffi1_2.isRichText = true;
		
	
		this.initLanguage(this.txt_time1_3)
		this.txt_time1_3.isRichText = true;
		
	
		this.initLanguage(this.txt_diffi1_3)
		this.txt_diffi1_3.isRichText = true;
		
	
		this.initLanguage(this.txt_time1_4)
		this.txt_time1_4.isRichText = true;
		
	
		this.initLanguage(this.txt_diffi1_4)
		this.txt_diffi1_4.isRichText = true;
		
	
		this.initLanguage(this.txt_time1_5)
		this.txt_time1_5.isRichText = true;
		
	
		this.initLanguage(this.txt_diffi1_5)
		this.txt_diffi1_5.isRichText = true;
		
	
		this.initLanguage(this.txt1)
		this.txt1.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Recordbar_UI'] = Recordbar_UI_Generate;