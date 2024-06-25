
 

 @UIBind('UI/ShareUI/Find相关UI/Collection_UI.ui')
 export default class Collection_UI_Generate extends UIScript {
	 	private canvas_collection_Internal: mw.Canvas
	public get canvas_collection(): mw.Canvas {
		if(!this.canvas_collection_Internal&&this.uiWidgetBase) {
			this.canvas_collection_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_collection') as mw.Canvas
		}
		return this.canvas_collection_Internal
	}
	private bg2_Internal: mw.Image
	public get bg2(): mw.Image {
		if(!this.bg2_Internal&&this.uiWidgetBase) {
			this.bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_collection/bg2') as mw.Image
		}
		return this.bg2_Internal
	}
	private img_findicon_Internal: mw.Image
	public get img_findicon(): mw.Image {
		if(!this.img_findicon_Internal&&this.uiWidgetBase) {
			this.img_findicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_collection/img_findicon') as mw.Image
		}
		return this.img_findicon_Internal
	}
	private txt_findname_Internal: mw.TextBlock
	public get txt_findname(): mw.TextBlock {
		if(!this.txt_findname_Internal&&this.uiWidgetBase) {
			this.txt_findname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_collection/txt_findname') as mw.TextBlock
		}
		return this.txt_findname_Internal
	}
	private txt_findcontent_Internal: mw.TextBlock
	public get txt_findcontent(): mw.TextBlock {
		if(!this.txt_findcontent_Internal&&this.uiWidgetBase) {
			this.txt_findcontent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_collection/txt_findcontent') as mw.TextBlock
		}
		return this.txt_findcontent_Internal
	}
	private txt_findbackground_Internal: mw.TextBlock
	public get txt_findbackground(): mw.TextBlock {
		if(!this.txt_findbackground_Internal&&this.uiWidgetBase) {
			this.txt_findbackground_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_collection/txt_findbackground') as mw.TextBlock
		}
		return this.txt_findbackground_Internal
	}
	private img_notFinding_Internal: mw.Image
	public get img_notFinding(): mw.Image {
		if(!this.img_notFinding_Internal&&this.uiWidgetBase) {
			this.img_notFinding_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_collection/img_notFinding') as mw.Image
		}
		return this.img_notFinding_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private btn_back_01_Internal: mw.StaleButton
	public get btn_back_01(): mw.StaleButton {
		if(!this.btn_back_01_Internal&&this.uiWidgetBase) {
			this.btn_back_01_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btn_back_01') as mw.StaleButton
		}
		return this.btn_back_01_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.btn_back_01.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Collection_UI_btn_back_01");
		})
		this.initLanguage(this.btn_back_01);
		this.btn_back_01.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back_01.onPressed.add(() => {
			this.btn_back_01["preScale"] = this.btn_back_01.renderScale;
			this.btn_back_01.renderScale = Vector2.one.set(this.btn_back_01["preScale"]).multiply(1.1);
		})
		this.btn_back_01.onReleased.add(() => {
			this.btn_back_01.renderScale = this.btn_back_01["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Collection_UI_btn_close");
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
		
		this.initLanguage(this.txt_findname)
		this.txt_findname.isRichText = true;
		
	
		this.initLanguage(this.txt_findcontent)
		this.txt_findcontent.isRichText = true;
		
	
		this.initLanguage(this.txt_findbackground)
		this.txt_findbackground.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_collection/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_collection/TextBlock_1_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Collection_UI'] = Collection_UI_Generate;