
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/AnimationEditor/editorMain.ui
*/



@UIBind('UI/AnimationEditor/editorMain.ui')
export default class editorMain_Generate extends UIScript {
		private mFraneScrollBox_Internal: mw.ScrollBox
	public get mFraneScrollBox(): mw.ScrollBox {
		if(!this.mFraneScrollBox_Internal&&this.uiWidgetBase) {
			this.mFraneScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFraneScrollBox') as mw.ScrollBox
		}
		return this.mFraneScrollBox_Internal
	}
	private mFrameCanvas_Internal: mw.Canvas
	public get mFrameCanvas(): mw.Canvas {
		if(!this.mFrameCanvas_Internal&&this.uiWidgetBase) {
			this.mFrameCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFraneScrollBox/mFrameCanvas') as mw.Canvas
		}
		return this.mFrameCanvas_Internal
	}
	private addButton_Internal: mw.Button
	public get addButton(): mw.Button {
		if(!this.addButton_Internal&&this.uiWidgetBase) {
			this.addButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/addButton') as mw.Button
		}
		return this.addButton_Internal
	}
	private subButton_Internal: mw.Button
	public get subButton(): mw.Button {
		if(!this.subButton_Internal&&this.uiWidgetBase) {
			this.subButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/subButton') as mw.Button
		}
		return this.subButton_Internal
	}
	private playButton_Internal: mw.Button
	public get playButton(): mw.Button {
		if(!this.playButton_Internal&&this.uiWidgetBase) {
			this.playButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playButton') as mw.Button
		}
		return this.playButton_Internal
	}
	private pauseButton_Internal: mw.Button
	public get pauseButton(): mw.Button {
		if(!this.pauseButton_Internal&&this.uiWidgetBase) {
			this.pauseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/pauseButton') as mw.Button
		}
		return this.pauseButton_Internal
	}
	private saveButton_Internal: mw.Button
	public get saveButton(): mw.Button {
		if(!this.saveButton_Internal&&this.uiWidgetBase) {
			this.saveButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/saveButton') as mw.Button
		}
		return this.saveButton_Internal
	}
	private mTopImage_1_Internal: mw.Image
	public get mTopImage_1(): mw.Image {
		if(!this.mTopImage_1_Internal&&this.uiWidgetBase) {
			this.mTopImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTopImage_1') as mw.Image
		}
		return this.mTopImage_1_Internal
	}
	private mTopFraneScrollBox_Internal: mw.ScrollBox
	public get mTopFraneScrollBox(): mw.ScrollBox {
		if(!this.mTopFraneScrollBox_Internal&&this.uiWidgetBase) {
			this.mTopFraneScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTopFraneScrollBox') as mw.ScrollBox
		}
		return this.mTopFraneScrollBox_Internal
	}
	private mTopFrameCanvas_Internal: mw.Canvas
	public get mTopFrameCanvas(): mw.Canvas {
		if(!this.mTopFrameCanvas_Internal&&this.uiWidgetBase) {
			this.mTopFrameCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTopFraneScrollBox/mTopFrameCanvas') as mw.Canvas
		}
		return this.mTopFrameCanvas_Internal
	}
	private mSaveCanvas_Internal: mw.Canvas
	public get mSaveCanvas(): mw.Canvas {
		if(!this.mSaveCanvas_Internal&&this.uiWidgetBase) {
			this.mSaveCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/mSaveCanvas') as mw.Canvas
		}
		return this.mSaveCanvas_Internal
	}
	private createButton_Internal: mw.Button
	public get createButton(): mw.Button {
		if(!this.createButton_Internal&&this.uiWidgetBase) {
			this.createButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/createButton') as mw.Button
		}
		return this.createButton_Internal
	}
	private aniButton_Internal: mw.Button
	public get aniButton(): mw.Button {
		if(!this.aniButton_Internal&&this.uiWidgetBase) {
			this.aniButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton') as mw.Button
		}
		return this.aniButton_Internal
	}
	private aniButton_1_Internal: mw.Button
	public get aniButton_1(): mw.Button {
		if(!this.aniButton_1_Internal&&this.uiWidgetBase) {
			this.aniButton_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton_1') as mw.Button
		}
		return this.aniButton_1_Internal
	}
	private aniButton_2_Internal: mw.Button
	public get aniButton_2(): mw.Button {
		if(!this.aniButton_2_Internal&&this.uiWidgetBase) {
			this.aniButton_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton_2') as mw.Button
		}
		return this.aniButton_2_Internal
	}
	private aniButton_3_Internal: mw.Button
	public get aniButton_3(): mw.Button {
		if(!this.aniButton_3_Internal&&this.uiWidgetBase) {
			this.aniButton_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton_3') as mw.Button
		}
		return this.aniButton_3_Internal
	}
	private aniButton_4_Internal: mw.Button
	public get aniButton_4(): mw.Button {
		if(!this.aniButton_4_Internal&&this.uiWidgetBase) {
			this.aniButton_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton_4') as mw.Button
		}
		return this.aniButton_4_Internal
	}
	private aniButton_5_Internal: mw.Button
	public get aniButton_5(): mw.Button {
		if(!this.aniButton_5_Internal&&this.uiWidgetBase) {
			this.aniButton_5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton_5') as mw.Button
		}
		return this.aniButton_5_Internal
	}
	private aniButton_6_Internal: mw.Button
	public get aniButton_6(): mw.Button {
		if(!this.aniButton_6_Internal&&this.uiWidgetBase) {
			this.aniButton_6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton_6') as mw.Button
		}
		return this.aniButton_6_Internal
	}
	private aniButton_7_Internal: mw.Button
	public get aniButton_7(): mw.Button {
		if(!this.aniButton_7_Internal&&this.uiWidgetBase) {
			this.aniButton_7_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aniButton_7') as mw.Button
		}
		return this.aniButton_7_Internal
	}
	private mInputInputBox_Internal: mw.InputBox
	public get mInputInputBox(): mw.InputBox {
		if(!this.mInputInputBox_Internal&&this.uiWidgetBase) {
			this.mInputInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputInputBox') as mw.InputBox
		}
		return this.mInputInputBox_Internal
	}
	private mInputButton_Internal: mw.Button
	public get mInputButton(): mw.Button {
		if(!this.mInputButton_Internal&&this.uiWidgetBase) {
			this.mInputButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputButton') as mw.Button
		}
		return this.mInputButton_Internal
	}
	private mOutButton_Internal: mw.Button
	public get mOutButton(): mw.Button {
		if(!this.mOutButton_Internal&&this.uiWidgetBase) {
			this.mOutButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOutButton') as mw.Button
		}
		return this.mOutButton_Internal
	}
	private mOutInputBox_Internal: mw.InputBox
	public get mOutInputBox(): mw.InputBox {
		if(!this.mOutInputBox_Internal&&this.uiWidgetBase) {
			this.mOutInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOutInputBox') as mw.InputBox
		}
		return this.mOutInputBox_Internal
	}
	private mNameCanvas_Internal: mw.Canvas
	public get mNameCanvas(): mw.Canvas {
		if(!this.mNameCanvas_Internal&&this.uiWidgetBase) {
			this.mNameCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mNameCanvas') as mw.Canvas
		}
		return this.mNameCanvas_Internal
	}
	private nameInputBox_Internal: mw.InputBox
	public get nameInputBox(): mw.InputBox {
		if(!this.nameInputBox_Internal&&this.uiWidgetBase) {
			this.nameInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mNameCanvas/nameInputBox') as mw.InputBox
		}
		return this.nameInputBox_Internal
	}
	private nameButton_Internal: mw.Button
	public get nameButton(): mw.Button {
		if(!this.nameButton_Internal&&this.uiWidgetBase) {
			this.nameButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mNameCanvas/nameButton') as mw.Button
		}
		return this.nameButton_Internal
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
		
		this.addButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "addButton");
		})
		this.addButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.subButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "subButton");
		})
		this.subButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.playButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "playButton");
		})
		this.playButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.pauseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "pauseButton");
		})
		this.pauseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.saveButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "saveButton");
		})
		this.saveButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.createButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "createButton");
		})
		this.createButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton");
		})
		this.aniButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton_1");
		})
		this.aniButton_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton_2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton_2");
		})
		this.aniButton_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton_3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton_3");
		})
		this.aniButton_3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton_4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton_4");
		})
		this.aniButton_4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton_5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton_5");
		})
		this.aniButton_5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton_6.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton_6");
		})
		this.aniButton_6.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aniButton_7.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aniButton_7");
		})
		this.aniButton_7.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mInputButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mInputButton");
		})
		this.mInputButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOutButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOutButton");
		})
		this.mOutButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.nameButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "nameButton");
		})
		this.nameButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/saveButton/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/createButton/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton_1/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton_2/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton_3/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton_4/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton_5/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton_6/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/aniButton_7/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mNameCanvas/TextBlock_3") as any);
		
	

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
 