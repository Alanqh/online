
 

 @UIBind('UI/ShareUI/Find相关UI/Findthing_UI.ui')
 export default class Findthing_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private canvas_findmessage_Internal: mw.Canvas
	public get canvas_findmessage(): mw.Canvas {
		if(!this.canvas_findmessage_Internal&&this.uiWidgetBase) {
			this.canvas_findmessage_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage') as mw.Canvas
		}
		return this.canvas_findmessage_Internal
	}
	private img_setting_Internal: mw.Image
	public get img_setting(): mw.Image {
		if(!this.img_setting_Internal&&this.uiWidgetBase) {
			this.img_setting_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/img_setting') as mw.Image
		}
		return this.img_setting_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private img_quality_Internal: mw.Image
	public get img_quality(): mw.Image {
		if(!this.img_quality_Internal&&this.uiWidgetBase) {
			this.img_quality_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/img_quality') as mw.Image
		}
		return this.img_quality_Internal
	}
	private img_findicon_Internal: mw.Image
	public get img_findicon(): mw.Image {
		if(!this.img_findicon_Internal&&this.uiWidgetBase) {
			this.img_findicon_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/img_findicon') as mw.Image
		}
		return this.img_findicon_Internal
	}
	private txt_findbackground_Internal: mw.TextBlock
	public get txt_findbackground(): mw.TextBlock {
		if(!this.txt_findbackground_Internal&&this.uiWidgetBase) {
			this.txt_findbackground_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/txt_findbackground') as mw.TextBlock
		}
		return this.txt_findbackground_Internal
	}
	private txt_findcontent_Internal: mw.TextBlock
	public get txt_findcontent(): mw.TextBlock {
		if(!this.txt_findcontent_Internal&&this.uiWidgetBase) {
			this.txt_findcontent_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/txt_findcontent') as mw.TextBlock
		}
		return this.txt_findcontent_Internal
	}
	private txt_content_Internal: mw.TextBlock
	public get txt_content(): mw.TextBlock {
		if(!this.txt_content_Internal&&this.uiWidgetBase) {
			this.txt_content_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/txt_content') as mw.TextBlock
		}
		return this.txt_content_Internal
	}
	private txt_findname_Internal: mw.TextBlock
	public get txt_findname(): mw.TextBlock {
		if(!this.txt_findname_Internal&&this.uiWidgetBase) {
			this.txt_findname_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/txt_findname') as mw.TextBlock
		}
		return this.txt_findname_Internal
	}
	private txt_background_Internal: mw.TextBlock
	public get txt_background(): mw.TextBlock {
		if(!this.txt_background_Internal&&this.uiWidgetBase) {
			this.txt_background_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/txt_background') as mw.TextBlock
		}
		return this.txt_background_Internal
	}
	private canvas_take_Internal: mw.Canvas
	public get canvas_take(): mw.Canvas {
		if(!this.canvas_take_Internal&&this.uiWidgetBase) {
			this.canvas_take_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/canvas_take') as mw.Canvas
		}
		return this.canvas_take_Internal
	}
	private btn_take_Internal: mw.Button
	public get btn_take(): mw.Button {
		if(!this.btn_take_Internal&&this.uiWidgetBase) {
			this.btn_take_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/canvas_take/btn_take') as mw.Button
		}
		return this.btn_take_Internal
	}
	private txt_taken_Internal: mw.TextBlock
	public get txt_taken(): mw.TextBlock {
		if(!this.txt_taken_Internal&&this.uiWidgetBase) {
			this.txt_taken_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/canvas_take/txt_taken') as mw.TextBlock
		}
		return this.txt_taken_Internal
	}
	private txt_take_Internal: mw.TextBlock
	public get txt_take(): mw.TextBlock {
		if(!this.txt_take_Internal&&this.uiWidgetBase) {
			this.txt_take_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/canvas_take/txt_take') as mw.TextBlock
		}
		return this.txt_take_Internal
	}
	private canvas_rewards_Internal: mw.Canvas
	public get canvas_rewards(): mw.Canvas {
		if(!this.canvas_rewards_Internal&&this.uiWidgetBase) {
			this.canvas_rewards_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/ScrollBox/canvas_rewards') as mw.Canvas
		}
		return this.canvas_rewards_Internal
	}
	private detailBtn_Internal: mw.Button
	public get detailBtn(): mw.Button {
		if(!this.detailBtn_Internal&&this.uiWidgetBase) {
			this.detailBtn_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/detailBtn') as mw.Button
		}
		return this.detailBtn_Internal
	}
	private canvas_didntfind_Internal: mw.Canvas
	public get canvas_didntfind(): mw.Canvas {
		if(!this.canvas_didntfind_Internal&&this.uiWidgetBase) {
			this.canvas_didntfind_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/canvas_didntfind') as mw.Canvas
		}
		return this.canvas_didntfind_Internal
	}
	private img_nofindicon_Internal: mw.Image
	public get img_nofindicon(): mw.Image {
		if(!this.img_nofindicon_Internal&&this.uiWidgetBase) {
			this.img_nofindicon_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_findmessage/canvas_didntfind/img_nofindicon') as mw.Image
		}
		return this.img_nofindicon_Internal
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
		
		this.btn_take.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Findthing_UI_btn_take");
		})
		this.btn_take.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_take.onPressed.add(() => {
			this.btn_take["preScale"] = this.btn_take.renderScale;
			this.btn_take.renderScale = Vector2.one.set(this.btn_take["preScale"]).multiply(1.1);
		})
		this.btn_take.onReleased.add(() => {
			this.btn_take.renderScale = this.btn_take["preScale"];
		})
		
	
		this.detailBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Findthing_UI_detailBtn");
		})
		this.detailBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.detailBtn.onPressed.add(() => {
			this.detailBtn["preScale"] = this.detailBtn.renderScale;
			this.detailBtn.renderScale = Vector2.one.set(this.detailBtn["preScale"]).multiply(1.1);
		})
		this.detailBtn.onReleased.add(() => {
			this.detailBtn.renderScale = this.detailBtn["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txt_findbackground)
		this.txt_findbackground.isRichText = true;
		
	
		this.initLanguage(this.txt_findcontent)
		this.txt_findcontent.isRichText = true;
		
	
		this.initLanguage(this.txt_content)
		this.txt_content.isRichText = true;
		
	
		this.initLanguage(this.txt_findname)
		this.txt_findname.isRichText = true;
		
	
		this.initLanguage(this.txt_background)
		this.txt_background.isRichText = true;
		
	
		this.initLanguage(this.txt_taken)
		this.txt_taken.isRichText = true;
		
	
		this.initLanguage(this.txt_take)
		this.txt_take.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Findthing_UI'] = Findthing_UI_Generate;