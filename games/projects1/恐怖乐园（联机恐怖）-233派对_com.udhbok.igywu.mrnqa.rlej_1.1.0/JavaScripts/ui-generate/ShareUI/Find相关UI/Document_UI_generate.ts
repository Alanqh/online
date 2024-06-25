
 

 @UIBind('UI/ShareUI/Find相关UI/Document_UI.ui')
 export default class Document_UI_Generate extends UIScript {
	 	private rootcanvas_Internal: mw.Canvas
	public get rootcanvas(): mw.Canvas {
		if(!this.rootcanvas_Internal&&this.uiWidgetBase) {
			this.rootcanvas_Internal = this.uiWidgetBase.findChildByPath('rootcanvas') as mw.Canvas
		}
		return this.rootcanvas_Internal
	}
	private btn_bg0_Internal: mw.Button
	public get btn_bg0(): mw.Button {
		if(!this.btn_bg0_Internal&&this.uiWidgetBase) {
			this.btn_bg0_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/btn_bg0') as mw.Button
		}
		return this.btn_bg0_Internal
	}
	private canvas_whiteline_Internal: mw.Canvas
	public get canvas_whiteline(): mw.Canvas {
		if(!this.canvas_whiteline_Internal&&this.uiWidgetBase) {
			this.canvas_whiteline_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_whiteline') as mw.Canvas
		}
		return this.canvas_whiteline_Internal
	}
	private scrollBox_nodeward_Internal: mw.ScrollBox
	public get scrollBox_nodeward(): mw.ScrollBox {
		if(!this.scrollBox_nodeward_Internal&&this.uiWidgetBase) {
			this.scrollBox_nodeward_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/scrollBox_nodeward') as mw.ScrollBox
		}
		return this.scrollBox_nodeward_Internal
	}
	private canvas_nodeward_Internal: mw.Canvas
	public get canvas_nodeward(): mw.Canvas {
		if(!this.canvas_nodeward_Internal&&this.uiWidgetBase) {
			this.canvas_nodeward_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/scrollBox_nodeward/canvas_nodeward') as mw.Canvas
		}
		return this.canvas_nodeward_Internal
	}
	private canvas_setting_Internal: mw.Canvas
	public get canvas_setting(): mw.Canvas {
		if(!this.canvas_setting_Internal&&this.uiWidgetBase) {
			this.canvas_setting_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_setting') as mw.Canvas
		}
		return this.canvas_setting_Internal
	}
	private img_notebook_Internal: mw.Image
	public get img_notebook(): mw.Image {
		if(!this.img_notebook_Internal&&this.uiWidgetBase) {
			this.img_notebook_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_setting/img_notebook') as mw.Image
		}
		return this.img_notebook_Internal
	}
	private canvas_findnote_Internal: mw.Canvas
	public get canvas_findnote(): mw.Canvas {
		if(!this.canvas_findnote_Internal&&this.uiWidgetBase) {
			this.canvas_findnote_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_findnote') as mw.Canvas
		}
		return this.canvas_findnote_Internal
	}
	private canvas_back_Internal: mw.Canvas
	public get canvas_back(): mw.Canvas {
		if(!this.canvas_back_Internal&&this.uiWidgetBase) {
			this.canvas_back_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_back') as mw.Canvas
		}
		return this.canvas_back_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_back/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private txt_nodename_Internal: mw.TextBlock
	public get txt_nodename(): mw.TextBlock {
		if(!this.txt_nodename_Internal&&this.uiWidgetBase) {
			this.txt_nodename_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/txt_nodename') as mw.TextBlock
		}
		return this.txt_nodename_Internal
	}
	private txt_gotnumber_Internal: mw.TextBlock
	public get txt_gotnumber(): mw.TextBlock {
		if(!this.txt_gotnumber_Internal&&this.uiWidgetBase) {
			this.txt_gotnumber_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/txt_gotnumber') as mw.TextBlock
		}
		return this.txt_gotnumber_Internal
	}
	private txt_docname_Internal: mw.TextBlock
	public get txt_docname(): mw.TextBlock {
		if(!this.txt_docname_Internal&&this.uiWidgetBase) {
			this.txt_docname_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/txt_docname') as mw.TextBlock
		}
		return this.txt_docname_Internal
	}
	private canvas_last_Internal: mw.Canvas
	public get canvas_last(): mw.Canvas {
		if(!this.canvas_last_Internal&&this.uiWidgetBase) {
			this.canvas_last_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_last') as mw.Canvas
		}
		return this.canvas_last_Internal
	}
	private btn_last_Internal: mw.Button
	public get btn_last(): mw.Button {
		if(!this.btn_last_Internal&&this.uiWidgetBase) {
			this.btn_last_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_last/btn_last') as mw.Button
		}
		return this.btn_last_Internal
	}
	private txt_last_Internal: mw.TextBlock
	public get txt_last(): mw.TextBlock {
		if(!this.txt_last_Internal&&this.uiWidgetBase) {
			this.txt_last_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_last/txt_last') as mw.TextBlock
		}
		return this.txt_last_Internal
	}
	private redPoint_last_Internal: mw.Image
	public get redPoint_last(): mw.Image {
		if(!this.redPoint_last_Internal&&this.uiWidgetBase) {
			this.redPoint_last_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_last/redPoint_last') as mw.Image
		}
		return this.redPoint_last_Internal
	}
	private canvas_next_Internal: mw.Canvas
	public get canvas_next(): mw.Canvas {
		if(!this.canvas_next_Internal&&this.uiWidgetBase) {
			this.canvas_next_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_next') as mw.Canvas
		}
		return this.canvas_next_Internal
	}
	private btn_next_Internal: mw.Button
	public get btn_next(): mw.Button {
		if(!this.btn_next_Internal&&this.uiWidgetBase) {
			this.btn_next_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_next/btn_next') as mw.Button
		}
		return this.btn_next_Internal
	}
	private txt_next_Internal: mw.TextBlock
	public get txt_next(): mw.TextBlock {
		if(!this.txt_next_Internal&&this.uiWidgetBase) {
			this.txt_next_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_next/txt_next') as mw.TextBlock
		}
		return this.txt_next_Internal
	}
	private redPoint_next_Internal: mw.Image
	public get redPoint_next(): mw.Image {
		if(!this.redPoint_next_Internal&&this.uiWidgetBase) {
			this.redPoint_next_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_next/redPoint_next') as mw.Image
		}
		return this.redPoint_next_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private img_b_Internal: mw.Image
	public get img_b(): mw.Image {
		if(!this.img_b_Internal&&this.uiWidgetBase) {
			this.img_b_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_tips/img_b') as mw.Image
		}
		return this.img_b_Internal
	}
	private txt_tips_Internal: mw.TextBlock
	public get txt_tips(): mw.TextBlock {
		if(!this.txt_tips_Internal&&this.uiWidgetBase) {
			this.txt_tips_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_tips/txt_tips') as mw.TextBlock
		}
		return this.txt_tips_Internal
	}
	private canvas_pool_Internal: mw.Canvas
	public get canvas_pool(): mw.Canvas {
		if(!this.canvas_pool_Internal&&this.uiWidgetBase) {
			this.canvas_pool_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pool') as mw.Canvas
		}
		return this.canvas_pool_Internal
	}
	private img_frame2_Internal: mw.Image
	public get img_frame2(): mw.Image {
		if(!this.img_frame2_Internal&&this.uiWidgetBase) {
			this.img_frame2_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pool/img_frame2') as mw.Image
		}
		return this.img_frame2_Internal
	}
	private img_frame3_Internal: mw.Image
	public get img_frame3(): mw.Image {
		if(!this.img_frame3_Internal&&this.uiWidgetBase) {
			this.img_frame3_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pool/img_frame3') as mw.Image
		}
		return this.img_frame3_Internal
	}
	private text_prizePool_Internal: mw.TextBlock
	public get text_prizePool(): mw.TextBlock {
		if(!this.text_prizePool_Internal&&this.uiWidgetBase) {
			this.text_prizePool_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pool/text_prizePool') as mw.TextBlock
		}
		return this.text_prizePool_Internal
	}
	private canvas_prize_Internal: mw.Canvas
	public get canvas_prize(): mw.Canvas {
		if(!this.canvas_prize_Internal&&this.uiWidgetBase) {
			this.canvas_prize_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/canvas_pool/ScrollBox/canvas_prize') as mw.Canvas
		}
		return this.canvas_prize_Internal
	}
	private guideArea_Internal: mw.Image
	public get guideArea(): mw.Image {
		if(!this.guideArea_Internal&&this.uiWidgetBase) {
			this.guideArea_Internal = this.uiWidgetBase.findChildByPath('rootcanvas/guideArea') as mw.Image
		}
		return this.guideArea_Internal
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
		
		this.btn_bg0.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Document_UI_btn_bg0");
		})
		this.btn_bg0.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_bg0.onPressed.add(() => {
			this.btn_bg0["preScale"] = this.btn_bg0.renderScale;
			this.btn_bg0.renderScale = Vector2.one.set(this.btn_bg0["preScale"]).multiply(1.1);
		})
		this.btn_bg0.onReleased.add(() => {
			this.btn_bg0.renderScale = this.btn_bg0["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Document_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_last.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Document_UI_btn_last");
		})
		this.btn_last.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_last.onPressed.add(() => {
			this.btn_last["preScale"] = this.btn_last.renderScale;
			this.btn_last.renderScale = Vector2.one.set(this.btn_last["preScale"]).multiply(1.1);
		})
		this.btn_last.onReleased.add(() => {
			this.btn_last.renderScale = this.btn_last["preScale"];
		})
		
	
		this.btn_next.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Document_UI_btn_next");
		})
		this.btn_next.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_next.onPressed.add(() => {
			this.btn_next["preScale"] = this.btn_next.renderScale;
			this.btn_next.renderScale = Vector2.one.set(this.btn_next["preScale"]).multiply(1.1);
		})
		this.btn_next.onReleased.add(() => {
			this.btn_next.renderScale = this.btn_next["preScale"];
		})
		
	
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Document_UI_btn_close");
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
		
		this.initLanguage(this.txt_nodename)
		this.txt_nodename.isRichText = true;
		
	
		this.initLanguage(this.txt_gotnumber)
		this.txt_gotnumber.isRichText = true;
		
	
		this.initLanguage(this.txt_docname)
		this.txt_docname.isRichText = true;
		
	
		this.initLanguage(this.txt_last)
		this.txt_last.isRichText = true;
		
	
		this.initLanguage(this.txt_next)
		this.txt_next.isRichText = true;
		
	
		this.initLanguage(this.txt_tips)
		this.txt_tips.isRichText = true;
		
	
		this.initLanguage(this.text_prizePool)
		this.text_prizePool.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Document_UI'] = Document_UI_Generate;