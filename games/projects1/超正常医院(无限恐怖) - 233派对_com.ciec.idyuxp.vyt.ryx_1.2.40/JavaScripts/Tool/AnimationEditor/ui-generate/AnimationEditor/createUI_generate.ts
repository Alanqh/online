
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/AnimationEditor/createUI.ui
*/



@UIBind('UI/AnimationEditor/createUI.ui')
export default class createUI_Generate extends UIScript {
		private closeButton_Internal: mw.Button
	public get closeButton(): mw.Button {
		if(!this.closeButton_Internal&&this.uiWidgetBase) {
			this.closeButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeButton') as mw.Button
		}
		return this.closeButton_Internal
	}
	private nameInput_Internal: mw.InputBox
	public get nameInput(): mw.InputBox {
		if(!this.nameInput_Internal&&this.uiWidgetBase) {
			this.nameInput_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/nameInput') as mw.InputBox
		}
		return this.nameInput_Internal
	}
	private frameInput_Internal: mw.InputBox
	public get frameInput(): mw.InputBox {
		if(!this.frameInput_Internal&&this.uiWidgetBase) {
			this.frameInput_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/frameInput') as mw.InputBox
		}
		return this.frameInput_Internal
	}
	private createButton_Internal: mw.Button
	public get createButton(): mw.Button {
		if(!this.createButton_Internal&&this.uiWidgetBase) {
			this.createButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/createButton') as mw.Button
		}
		return this.createButton_Internal
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
		
		this.closeButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "closeButton");
		})
		this.closeButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.createButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "createButton");
		})
		this.createButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/createButton/TextBlock_2") as any);
		
	

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
 