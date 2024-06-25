
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/AnimationEditor/topFrameItem.ui
*/



@UIBind('UI/AnimationEditor/topFrameItem.ui')
export default class topFrameItem_Generate extends UIScript {
		private copyButton_Internal: mw.Button
	public get copyButton(): mw.Button {
		if(!this.copyButton_Internal&&this.uiWidgetBase) {
			this.copyButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/copyButton') as mw.Button
		}
		return this.copyButton_Internal
	}
	private delButton_Internal: mw.Button
	public get delButton(): mw.Button {
		if(!this.delButton_Internal&&this.uiWidgetBase) {
			this.delButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/delButton') as mw.Button
		}
		return this.delButton_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}


 
	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.copyButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "copyButton");
		})
		this.copyButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.delButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "delButton");
		})
		this.delButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/copyButton/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/delButton/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		this.canUpdate = true;
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		this.canUpdate = false;
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
	/**
     * 周期函数 每帧执行
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }
	 
}
 