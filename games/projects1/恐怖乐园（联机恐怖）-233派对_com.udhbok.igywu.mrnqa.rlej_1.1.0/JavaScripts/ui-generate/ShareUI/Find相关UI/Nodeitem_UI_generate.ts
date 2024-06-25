
 

 @UIBind('UI/ShareUI/Find相关UI/Nodeitem_UI.ui')
 export default class Nodeitem_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private img_finditem_Internal: mw.Image
	public get img_finditem(): mw.Image {
		if(!this.img_finditem_Internal&&this.uiWidgetBase) {
			this.img_finditem_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_finditem') as mw.Image
		}
		return this.img_finditem_Internal
	}
	private btn_nodeward1_Internal: mw.Button
	public get btn_nodeward1(): mw.Button {
		if(!this.btn_nodeward1_Internal&&this.uiWidgetBase) {
			this.btn_nodeward1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/btn_nodeward1') as mw.Button
		}
		return this.btn_nodeward1_Internal
	}
	private img_point_Internal: mw.Image
	public get img_point(): mw.Image {
		if(!this.img_point_Internal&&this.uiWidgetBase) {
			this.img_point_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_point') as mw.Image
		}
		return this.img_point_Internal
	}
	private canvas_gotten_Internal: mw.Canvas
	public get canvas_gotten(): mw.Canvas {
		if(!this.canvas_gotten_Internal&&this.uiWidgetBase) {
			this.canvas_gotten_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_gotten') as mw.Canvas
		}
		return this.canvas_gotten_Internal
	}
	private img_gotten_Internal: mw.Image
	public get img_gotten(): mw.Image {
		if(!this.img_gotten_Internal&&this.uiWidgetBase) {
			this.img_gotten_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_gotten/img_gotten') as mw.Image
		}
		return this.img_gotten_Internal
	}
	private img_receivedIcon_Internal: mw.Image
	public get img_receivedIcon(): mw.Image {
		if(!this.img_receivedIcon_Internal&&this.uiWidgetBase) {
			this.img_receivedIcon_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_gotten/img_receivedIcon') as mw.Image
		}
		return this.img_receivedIcon_Internal
	}
	private canvas_cant_Internal: mw.Canvas
	public get canvas_cant(): mw.Canvas {
		if(!this.canvas_cant_Internal&&this.uiWidgetBase) {
			this.canvas_cant_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_cant') as mw.Canvas
		}
		return this.canvas_cant_Internal
	}
	private img_cant_Internal: mw.Image
	public get img_cant(): mw.Image {
		if(!this.img_cant_Internal&&this.uiWidgetBase) {
			this.img_cant_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_cant/img_cant') as mw.Image
		}
		return this.img_cant_Internal
	}
	private txt_collect_Internal: mw.TextBlock
	public get txt_collect(): mw.TextBlock {
		if(!this.txt_collect_Internal&&this.uiWidgetBase) {
			this.txt_collect_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/txt_collect') as mw.TextBlock
		}
		return this.txt_collect_Internal
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
		
		this.btn_nodeward1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Nodeitem_UI_btn_nodeward1");
		})
		this.btn_nodeward1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_nodeward1.onPressed.add(() => {
			this.btn_nodeward1["preScale"] = this.btn_nodeward1.renderScale;
			this.btn_nodeward1.renderScale = Vector2.one.set(this.btn_nodeward1["preScale"]).multiply(1.1);
		})
		this.btn_nodeward1.onReleased.add(() => {
			this.btn_nodeward1.renderScale = this.btn_nodeward1["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txt_collect)
		this.txt_collect.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Nodeitem_UI'] = Nodeitem_UI_Generate;