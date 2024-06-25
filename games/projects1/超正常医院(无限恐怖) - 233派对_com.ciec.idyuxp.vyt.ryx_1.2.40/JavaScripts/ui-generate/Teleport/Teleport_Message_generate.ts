
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Teleport/Teleport_Message.ui')
export default class Teleport_Message_Generate extends UIScript {
		private mBtn_Single_Internal: mw.Button
	public get mBtn_Single(): mw.Button {
		if(!this.mBtn_Single_Internal&&this.uiWidgetBase) {
			this.mBtn_Single_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Single') as mw.Button
		}
		return this.mBtn_Single_Internal
	}
	private mBtn_Multiple_Internal: mw.Button
	public get mBtn_Multiple(): mw.Button {
		if(!this.mBtn_Multiple_Internal&&this.uiWidgetBase) {
			this.mBtn_Multiple_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Multiple') as mw.Button
		}
		return this.mBtn_Multiple_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mcd_Canvas_Internal: mw.Canvas
	public get mcd_Canvas(): mw.Canvas {
		if(!this.mcd_Canvas_Internal&&this.uiWidgetBase) {
			this.mcd_Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mcd_Canvas') as mw.Canvas
		}
		return this.mcd_Canvas_Internal
	}
	private mcd_Txt_Internal: mw.TextBlock
	public get mcd_Txt(): mw.TextBlock {
		if(!this.mcd_Txt_Internal&&this.uiWidgetBase) {
			this.mcd_Txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mcd_Canvas/mcd_Txt') as mw.TextBlock
		}
		return this.mcd_Txt_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mImage_Poster_Internal: mw.Image
	public get mImage_Poster(): mw.Image {
		if(!this.mImage_Poster_Internal&&this.uiWidgetBase) {
			this.mImage_Poster_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImage_Poster') as mw.Image
		}
		return this.mImage_Poster_Internal
	}
	private mText_Introduction_Internal: mw.TextBlock
	public get mText_Introduction(): mw.TextBlock {
		if(!this.mText_Introduction_Internal&&this.uiWidgetBase) {
			this.mText_Introduction_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Introduction') as mw.TextBlock
		}
		return this.mText_Introduction_Internal
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
		
		this.mBtn_Single.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Single");
		})
		
	
		this.mBtn_Multiple.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Multiple");
		})
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mcd_Txt)
		
	
		this.initLanguage(this.mText_Introduction)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Single/Text_Single") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mBtn_Multiple/Text_Multiple") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 