
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/AnimationEditor/vectorItem.ui
*/



@UIBind('UI/AnimationEditor/vectorItem.ui')
export default class vectorItem_Generate extends UIScript {
		private mTip_Internal: mw.TextBlock
	public get mTip(): mw.TextBlock {
		if(!this.mTip_Internal&&this.uiWidgetBase) {
			this.mTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTip') as mw.TextBlock
		}
		return this.mTip_Internal
	}
	private xInputBox_Internal: mw.InputBox
	public get xInputBox(): mw.InputBox {
		if(!this.xInputBox_Internal&&this.uiWidgetBase) {
			this.xInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/xInputBox') as mw.InputBox
		}
		return this.xInputBox_Internal
	}
	private yInputBox_Internal: mw.InputBox
	public get yInputBox(): mw.InputBox {
		if(!this.yInputBox_Internal&&this.uiWidgetBase) {
			this.yInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/yInputBox') as mw.InputBox
		}
		return this.yInputBox_Internal
	}
	private zInputBox_Internal: mw.InputBox
	public get zInputBox(): mw.InputBox {
		if(!this.zInputBox_Internal&&this.uiWidgetBase) {
			this.zInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/zInputBox') as mw.InputBox
		}
		return this.zInputBox_Internal
	}
	private xAddButton_Internal: mw.Button
	public get xAddButton(): mw.Button {
		if(!this.xAddButton_Internal&&this.uiWidgetBase) {
			this.xAddButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/xAddButton') as mw.Button
		}
		return this.xAddButton_Internal
	}
	private xSubButton_Internal: mw.Button
	public get xSubButton(): mw.Button {
		if(!this.xSubButton_Internal&&this.uiWidgetBase) {
			this.xSubButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/xSubButton') as mw.Button
		}
		return this.xSubButton_Internal
	}
	private yAddButton_Internal: mw.Button
	public get yAddButton(): mw.Button {
		if(!this.yAddButton_Internal&&this.uiWidgetBase) {
			this.yAddButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/yAddButton') as mw.Button
		}
		return this.yAddButton_Internal
	}
	private ySubButton_Internal: mw.Button
	public get ySubButton(): mw.Button {
		if(!this.ySubButton_Internal&&this.uiWidgetBase) {
			this.ySubButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ySubButton') as mw.Button
		}
		return this.ySubButton_Internal
	}
	private zAddButton_Internal: mw.Button
	public get zAddButton(): mw.Button {
		if(!this.zAddButton_Internal&&this.uiWidgetBase) {
			this.zAddButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/zAddButton') as mw.Button
		}
		return this.zAddButton_Internal
	}
	private zSubButton_Internal: mw.Button
	public get zSubButton(): mw.Button {
		if(!this.zSubButton_Internal&&this.uiWidgetBase) {
			this.zSubButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/zSubButton') as mw.Button
		}
		return this.zSubButton_Internal
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
		
		this.xAddButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "xAddButton");
		})
		this.xAddButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.xSubButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "xSubButton");
		})
		this.xSubButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.yAddButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "yAddButton");
		})
		this.yAddButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.ySubButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "ySubButton");
		})
		this.ySubButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.zAddButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "zAddButton");
		})
		this.zAddButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.zSubButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "zSubButton");
		})
		this.zSubButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTip)
		
	
		//文本多语言
		

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
 