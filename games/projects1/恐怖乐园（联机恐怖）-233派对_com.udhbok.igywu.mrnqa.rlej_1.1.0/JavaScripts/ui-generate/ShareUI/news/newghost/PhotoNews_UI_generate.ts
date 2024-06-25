
 

 @UIBind('UI/ShareUI/news/newghost/PhotoNews_UI.ui')
 export default class PhotoNews_UI_Generate extends UIScript {
	 	private rootCanvas_Internal: mw.Canvas
	public get rootCanvas(): mw.Canvas {
		if(!this.rootCanvas_Internal&&this.uiWidgetBase) {
			this.rootCanvas_Internal = this.uiWidgetBase.findChildByPath('rootCanvas') as mw.Canvas
		}
		return this.rootCanvas_Internal
	}
	private mBtn_BGPN_Internal: mw.Button
	public get mBtn_BGPN(): mw.Button {
		if(!this.mBtn_BGPN_Internal&&this.uiWidgetBase) {
			this.mBtn_BGPN_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/mBtn_BGPN') as mw.Button
		}
		return this.mBtn_BGPN_Internal
	}
	private text_titlePN_Internal: mw.TextBlock
	public get text_titlePN(): mw.TextBlock {
		if(!this.text_titlePN_Internal&&this.uiWidgetBase) {
			this.text_titlePN_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_titlePN') as mw.TextBlock
		}
		return this.text_titlePN_Internal
	}
	private text_titleN_Internal: mw.TextBlock
	public get text_titleN(): mw.TextBlock {
		if(!this.text_titleN_Internal&&this.uiWidgetBase) {
			this.text_titleN_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_titleN') as mw.TextBlock
		}
		return this.text_titleN_Internal
	}
	private text_newN_Internal: mw.TextBlock
	public get text_newN(): mw.TextBlock {
		if(!this.text_newN_Internal&&this.uiWidgetBase) {
			this.text_newN_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_newN') as mw.TextBlock
		}
		return this.text_newN_Internal
	}
	private text_titleFF_Internal: mw.TextBlock
	public get text_titleFF(): mw.TextBlock {
		if(!this.text_titleFF_Internal&&this.uiWidgetBase) {
			this.text_titleFF_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_titleFF') as mw.TextBlock
		}
		return this.text_titleFF_Internal
	}
	private text_tipF_Internal: mw.TextBlock
	public get text_tipF(): mw.TextBlock {
		if(!this.text_tipF_Internal&&this.uiWidgetBase) {
			this.text_tipF_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_tipF') as mw.TextBlock
		}
		return this.text_tipF_Internal
	}
	private text_giftF_Internal: mw.TextBlock
	public get text_giftF(): mw.TextBlock {
		if(!this.text_giftF_Internal&&this.uiWidgetBase) {
			this.text_giftF_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/text_giftF') as mw.TextBlock
		}
		return this.text_giftF_Internal
	}
	private canvas_countDownF_Internal: mw.Canvas
	public get canvas_countDownF(): mw.Canvas {
		if(!this.canvas_countDownF_Internal&&this.uiWidgetBase) {
			this.canvas_countDownF_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_countDownF') as mw.Canvas
		}
		return this.canvas_countDownF_Internal
	}
	private img_giftF_Internal: mw.Image
	public get img_giftF(): mw.Image {
		if(!this.img_giftF_Internal&&this.uiWidgetBase) {
			this.img_giftF_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_countDownF/img_giftF') as mw.Image
		}
		return this.img_giftF_Internal
	}
	private text_numF_Internal: mw.TextBlock
	public get text_numF(): mw.TextBlock {
		if(!this.text_numF_Internal&&this.uiWidgetBase) {
			this.text_numF_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_countDownF/text_numF') as mw.TextBlock
		}
		return this.text_numF_Internal
	}
	private mImage_CheckF_Internal: mw.Image
	public get mImage_CheckF(): mw.Image {
		if(!this.mImage_CheckF_Internal&&this.uiWidgetBase) {
			this.mImage_CheckF_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_countDownF/mImage_CheckF') as mw.Image
		}
		return this.mImage_CheckF_Internal
	}
	private img_redpointNP_Internal: mw.Image
	public get img_redpointNP(): mw.Image {
		if(!this.img_redpointNP_Internal&&this.uiWidgetBase) {
			this.img_redpointNP_Internal = this.uiWidgetBase.findChildByPath('rootCanvas/canvas_countDownF/img_redpointNP') as mw.Image
		}
		return this.img_redpointNP_Internal
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
		
		this.mBtn_BGPN.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "PhotoNews_UI_mBtn_BGPN");
		})
		this.mBtn_BGPN.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtn_BGPN.onPressed.add(() => {
			this.mBtn_BGPN["preScale"] = this.mBtn_BGPN.renderScale;
			this.mBtn_BGPN.renderScale = Vector2.one.set(this.mBtn_BGPN["preScale"]).multiply(1.1);
		})
		this.mBtn_BGPN.onReleased.add(() => {
			this.mBtn_BGPN.renderScale = this.mBtn_BGPN["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_titlePN)
		this.text_titlePN.isRichText = true;
		
	
		this.initLanguage(this.text_titleN)
		this.text_titleN.isRichText = true;
		
	
		this.initLanguage(this.text_newN)
		this.text_newN.isRichText = true;
		
	
		this.initLanguage(this.text_titleFF)
		this.text_titleFF.isRichText = true;
		
	
		this.initLanguage(this.text_tipF)
		this.text_tipF.isRichText = true;
		
	
		this.initLanguage(this.text_giftF)
		this.text_giftF.isRichText = true;
		
	
		this.initLanguage(this.text_numF)
		this.text_numF.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_PhotoNews_UI'] = PhotoNews_UI_Generate;