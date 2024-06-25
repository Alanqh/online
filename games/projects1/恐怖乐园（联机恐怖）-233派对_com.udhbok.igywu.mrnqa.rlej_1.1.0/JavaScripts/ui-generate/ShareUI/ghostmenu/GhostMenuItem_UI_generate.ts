
 

 @UIBind('UI/ShareUI/ghostmenu/GhostMenuItem_UI.ui')
 export default class GhostMenuItem_UI_Generate extends UIScript {
	 	private mCanvas_GhostMenuItem_Internal: mw.Canvas
	public get mCanvas_GhostMenuItem(): mw.Canvas {
		if(!this.mCanvas_GhostMenuItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_GhostMenuItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuItem') as mw.Canvas
		}
		return this.mCanvas_GhostMenuItem_Internal
	}
	private mImg_GMI_Internal: mw.Image
	public get mImg_GMI(): mw.Image {
		if(!this.mImg_GMI_Internal&&this.uiWidgetBase) {
			this.mImg_GMI_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuItem/mImg_GMI') as mw.Image
		}
		return this.mImg_GMI_Internal
	}
	private mBtn_GMI_Internal: mw.Button
	public get mBtn_GMI(): mw.Button {
		if(!this.mBtn_GMI_Internal&&this.uiWidgetBase) {
			this.mBtn_GMI_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuItem/mBtn_GMI') as mw.Button
		}
		return this.mBtn_GMI_Internal
	}
	private mImg_GMBG_Internal: mw.Image
	public get mImg_GMBG(): mw.Image {
		if(!this.mImg_GMBG_Internal&&this.uiWidgetBase) {
			this.mImg_GMBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuItem/mImg_GMBG') as mw.Image
		}
		return this.mImg_GMBG_Internal
	}
	private mText_GMN_Internal: mw.TextBlock
	public get mText_GMN(): mw.TextBlock {
		if(!this.mText_GMN_Internal&&this.uiWidgetBase) {
			this.mText_GMN_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuItem/mText_GMN') as mw.TextBlock
		}
		return this.mText_GMN_Internal
	}
	private mImageGML_Internal: mw.Image
	public get mImageGML(): mw.Image {
		if(!this.mImageGML_Internal&&this.uiWidgetBase) {
			this.mImageGML_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuItem/mImageGML') as mw.Image
		}
		return this.mImageGML_Internal
	}
	private mText_GMP_Internal: mw.TextBlock
	public get mText_GMP(): mw.TextBlock {
		if(!this.mText_GMP_Internal&&this.uiWidgetBase) {
			this.mText_GMP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuItem/mText_GMP') as mw.TextBlock
		}
		return this.mText_GMP_Internal
	}
	private img_redpointGMI_Internal: mw.Image
	public get img_redpointGMI(): mw.Image {
		if(!this.img_redpointGMI_Internal&&this.uiWidgetBase) {
			this.img_redpointGMI_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_redpointGMI') as mw.Image
		}
		return this.img_redpointGMI_Internal
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
		
		this.mBtn_GMI.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostMenuItem_UI_mBtn_GMI");
		})
		this.mBtn_GMI.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_GMI.onPressed.add(() => {
			this.mBtn_GMI["preScale"] = this.mBtn_GMI.renderScale;
			this.mBtn_GMI.renderScale = Vector2.one.set(this.mBtn_GMI["preScale"]).multiply(1.1);
		})
		this.mBtn_GMI.onReleased.add(() => {
			this.mBtn_GMI.renderScale = this.mBtn_GMI["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mText_GMN)
		this.mText_GMN.isRichText = true;
		
	
		this.initLanguage(this.mText_GMP)
		this.mText_GMP.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GhostMenuItem_UI'] = GhostMenuItem_UI_Generate;