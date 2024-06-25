
 

 @UIBind('UI/ShareUI/common/AnimationEditor/AnimationNode.ui')
 export default class AnimationNode_Generate extends UIScript {
	 	private cavSelect_Internal: mw.Canvas
	public get cavSelect(): mw.Canvas {
		if(!this.cavSelect_Internal&&this.uiWidgetBase) {
			this.cavSelect_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cavSelect') as mw.Canvas
		}
		return this.cavSelect_Internal
	}
	private btnSelect_Internal: mw.Button
	public get btnSelect(): mw.Button {
		if(!this.btnSelect_Internal&&this.uiWidgetBase) {
			this.btnSelect_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/btnSelect') as mw.Button
		}
		return this.btnSelect_Internal
	}
	private mCanvasNode_Internal: mw.Canvas
	public get mCanvasNode(): mw.Canvas {
		if(!this.mCanvasNode_Internal&&this.uiWidgetBase) {
			this.mCanvasNode_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasNode') as mw.Canvas
		}
		return this.mCanvasNode_Internal
	}
	private mTextBlockNodeName_Internal: mw.TextBlock
	public get mTextBlockNodeName(): mw.TextBlock {
		if(!this.mTextBlockNodeName_Internal&&this.uiWidgetBase) {
			this.mTextBlockNodeName_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasNode/mTextBlockNodeName') as mw.TextBlock
		}
		return this.mTextBlockNodeName_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasNode/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvasParams_Internal: mw.Canvas
	public get mCanvasParams(): mw.Canvas {
		if(!this.mCanvasParams_Internal&&this.uiWidgetBase) {
			this.mCanvasParams_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mCanvasNode/mScrollBox/mCanvasParams') as mw.Canvas
		}
		return this.mCanvasParams_Internal
	}
	private mBtnPre_Internal: mw.StaleButton
	public get mBtnPre(): mw.StaleButton {
		if(!this.mBtnPre_Internal&&this.uiWidgetBase) {
			this.mBtnPre_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas/mBtnPre') as mw.StaleButton
		}
		return this.mBtnPre_Internal
	}
	private mBtnNext_Internal: mw.StaleButton
	public get mBtnNext(): mw.StaleButton {
		if(!this.mBtnNext_Internal&&this.uiWidgetBase) {
			this.mBtnNext_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas/mBtnNext') as mw.StaleButton
		}
		return this.mBtnNext_Internal
	}
	private mBtnCheck_Internal: mw.StaleButton
	public get mBtnCheck(): mw.StaleButton {
		if(!this.mBtnCheck_Internal&&this.uiWidgetBase) {
			this.mBtnCheck_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas/mBtnCheck') as mw.StaleButton
		}
		return this.mBtnCheck_Internal
	}
	private mBtnDel_Internal: mw.StaleButton
	public get mBtnDel(): mw.StaleButton {
		if(!this.mBtnDel_Internal&&this.uiWidgetBase) {
			this.mBtnDel_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/Canvas/mBtnDel') as mw.StaleButton
		}
		return this.mBtnDel_Internal
	}
	private mTextTips_Internal: mw.TextBlock
	public get mTextTips(): mw.TextBlock {
		if(!this.mTextTips_Internal&&this.uiWidgetBase) {
			this.mTextTips_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mTextTips') as mw.TextBlock
		}
		return this.mTextTips_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.mBtnPre.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationNode_mBtnPre");
		})
		this.initLanguage(this.mBtnPre);
		this.mBtnPre.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnPre.onPressed.add(() => {
			this.mBtnPre["preScale"] = this.mBtnPre.renderScale;
			this.mBtnPre.renderScale = Vector2.one.set(this.mBtnPre["preScale"]).multiply(1.1);
		})
		this.mBtnPre.onReleased.add(() => {
			this.mBtnPre.renderScale = this.mBtnPre["preScale"];
		})
		
		
	
		this.mBtnNext.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationNode_mBtnNext");
		})
		this.initLanguage(this.mBtnNext);
		this.mBtnNext.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnNext.onPressed.add(() => {
			this.mBtnNext["preScale"] = this.mBtnNext.renderScale;
			this.mBtnNext.renderScale = Vector2.one.set(this.mBtnNext["preScale"]).multiply(1.1);
		})
		this.mBtnNext.onReleased.add(() => {
			this.mBtnNext.renderScale = this.mBtnNext["preScale"];
		})
		
		
	
		this.mBtnCheck.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationNode_mBtnCheck");
		})
		this.initLanguage(this.mBtnCheck);
		this.mBtnCheck.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnCheck.onPressed.add(() => {
			this.mBtnCheck["preScale"] = this.mBtnCheck.renderScale;
			this.mBtnCheck.renderScale = Vector2.one.set(this.mBtnCheck["preScale"]).multiply(1.1);
		})
		this.mBtnCheck.onReleased.add(() => {
			this.mBtnCheck.renderScale = this.mBtnCheck["preScale"];
		})
		
		
	
		this.mBtnDel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationNode_mBtnDel");
		})
		this.initLanguage(this.mBtnDel);
		this.mBtnDel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnDel.onPressed.add(() => {
			this.mBtnDel["preScale"] = this.mBtnDel.renderScale;
			this.mBtnDel.renderScale = Vector2.one.set(this.mBtnDel["preScale"]).multiply(1.1);
		})
		this.mBtnDel.onReleased.add(() => {
			this.mBtnDel.renderScale = this.mBtnDel["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.btnSelect.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "AnimationNode_btnSelect");
		})
		this.btnSelect.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btnSelect.onPressed.add(() => {
			this.btnSelect["preScale"] = this.btnSelect.renderScale;
			this.btnSelect.renderScale = Vector2.one.set(this.btnSelect["preScale"]).multiply(1.1);
		})
		this.btnSelect.onReleased.add(() => {
			this.btnSelect.renderScale = this.btnSelect["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mTextBlockNodeName)
		this.mTextBlockNodeName.isRichText = true;
		
	
		this.initLanguage(this.mTextTips)
		this.mTextTips.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/mCanvasNode/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_AnimationNode'] = AnimationNode_Generate;