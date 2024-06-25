
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Common/GuideList.ui')
export default class GuideList_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mButton_open_Internal: mw.Button
	public get mButton_open(): mw.Button {
		if(!this.mButton_open_Internal&&this.uiWidgetBase) {
			this.mButton_open_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mButton_open') as mw.Button
		}
		return this.mButton_open_Internal
	}
	private mImg_Background_1_Internal: mw.Image
	public get mImg_Background_1(): mw.Image {
		if(!this.mImg_Background_1_Internal&&this.uiWidgetBase) {
			this.mImg_Background_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImg_Background_1') as mw.Image
		}
		return this.mImg_Background_1_Internal
	}
	private mImg_Background_2_Internal: mw.Image
	public get mImg_Background_2(): mw.Image {
		if(!this.mImg_Background_2_Internal&&this.uiWidgetBase) {
			this.mImg_Background_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mImg_Background_2') as mw.Image
		}
		return this.mImg_Background_2_Internal
	}
	private mText_Background_1_Internal: mw.TextBlock
	public get mText_Background_1(): mw.TextBlock {
		if(!this.mText_Background_1_Internal&&this.uiWidgetBase) {
			this.mText_Background_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Background_1') as mw.TextBlock
		}
		return this.mText_Background_1_Internal
	}
	private mText_Background_2_Internal: mw.TextBlock
	public get mText_Background_2(): mw.TextBlock {
		if(!this.mText_Background_2_Internal&&this.uiWidgetBase) {
			this.mText_Background_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Background_2') as mw.TextBlock
		}
		return this.mText_Background_2_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Desc_Internal: mw.TextBlock
	public get mText_Desc(): mw.TextBlock {
		if(!this.mText_Desc_Internal&&this.uiWidgetBase) {
			this.mText_Desc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mText_Desc') as mw.TextBlock
		}
		return this.mText_Desc_Internal
	}
	private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mTexte_Click_Internal: mw.TextBlock
	public get mTexte_Click(): mw.TextBlock {
		if(!this.mTexte_Click_Internal&&this.uiWidgetBase) {
			this.mTexte_Click_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_1/mTexte_Click') as mw.TextBlock
		}
		return this.mTexte_Click_Internal
	}
	private mImg_Arrow_Internal: mw.Image
	public get mImg_Arrow(): mw.Image {
		if(!this.mImg_Arrow_Internal&&this.uiWidgetBase) {
			this.mImg_Arrow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_1/mImg_Arrow') as mw.Image
		}
		return this.mImg_Arrow_Internal
	}
	private mCanvas_Pos_Internal: mw.Canvas
	public get mCanvas_Pos(): mw.Canvas {
		if(!this.mCanvas_Pos_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pos_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pos') as mw.Canvas
		}
		return this.mCanvas_Pos_Internal
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
		
		this.mButton_open.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_open");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Background_1)
		
	
		this.initLanguage(this.mText_Background_2)
		
	
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Desc)
		
	
		this.initLanguage(this.mTexte_Click)
		
	
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
 