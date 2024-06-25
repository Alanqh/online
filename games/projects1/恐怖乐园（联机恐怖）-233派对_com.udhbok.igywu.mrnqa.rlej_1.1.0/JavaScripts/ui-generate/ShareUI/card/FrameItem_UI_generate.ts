
 

 @UIBind('UI/ShareUI/card/FrameItem_UI.ui')
 export default class FrameItem_UI_Generate extends UIScript {
	 	private canvas_frameItem_Internal: mw.Canvas
	public get canvas_frameItem(): mw.Canvas {
		if(!this.canvas_frameItem_Internal&&this.uiWidgetBase) {
			this.canvas_frameItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frameItem') as mw.Canvas
		}
		return this.canvas_frameItem_Internal
	}
	private btn_select_Internal: mw.Button
	public get btn_select(): mw.Button {
		if(!this.btn_select_Internal&&this.uiWidgetBase) {
			this.btn_select_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frameItem/btn_select') as mw.Button
		}
		return this.btn_select_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frameItem/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private canvas_locked_Internal: mw.Canvas
	public get canvas_locked(): mw.Canvas {
		if(!this.canvas_locked_Internal&&this.uiWidgetBase) {
			this.canvas_locked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frameItem/canvas_locked') as mw.Canvas
		}
		return this.canvas_locked_Internal
	}
	private img_lockedBg_Internal: mw.Image
	public get img_lockedBg(): mw.Image {
		if(!this.img_lockedBg_Internal&&this.uiWidgetBase) {
			this.img_lockedBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frameItem/canvas_locked/img_lockedBg') as mw.Image
		}
		return this.img_lockedBg_Internal
	}
	private img_lock_Internal: mw.Image
	public get img_lock(): mw.Image {
		if(!this.img_lock_Internal&&this.uiWidgetBase) {
			this.img_lock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_frameItem/canvas_locked/img_lock') as mw.Image
		}
		return this.img_lock_Internal
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
		
		this.btn_select.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "FrameItem_UI_btn_select");
		})
		this.btn_select.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_select.onPressed.add(() => {
			this.btn_select["preScale"] = this.btn_select.renderScale;
			this.btn_select.renderScale = Vector2.one.set(this.btn_select["preScale"]).multiply(1.1);
		})
		this.btn_select.onReleased.add(() => {
			this.btn_select.renderScale = this.btn_select["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_FrameItem_UI'] = FrameItem_UI_Generate;