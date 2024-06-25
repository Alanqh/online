
 

 @UIBind('UI/ShareUI/weaponupgrade/LoMItem_UI.ui')
 export default class LoMItem_UI_Generate extends UIScript {
	 	private mCanvas_LoMItem_Internal: mw.Canvas
	public get mCanvas_LoMItem(): mw.Canvas {
		if(!this.mCanvas_LoMItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_LoMItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LoMItem') as mw.Canvas
		}
		return this.mCanvas_LoMItem_Internal
	}
	private mImg_Item_Internal: mw.Image
	public get mImg_Item(): mw.Image {
		if(!this.mImg_Item_Internal&&this.uiWidgetBase) {
			this.mImg_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LoMItem/mImg_Item') as mw.Image
		}
		return this.mImg_Item_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LoMItem/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
	}
	private mText_LoMItemNum_Internal: mw.TextBlock
	public get mText_LoMItemNum(): mw.TextBlock {
		if(!this.mText_LoMItemNum_Internal&&this.uiWidgetBase) {
			this.mText_LoMItemNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LoMItem/mText_LoMItemNum') as mw.TextBlock
		}
		return this.mText_LoMItemNum_Internal
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
		

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.nameTxt)
		this.nameTxt.isRichText = true;
		
	
		this.initLanguage(this.mText_LoMItemNum)
		this.mText_LoMItemNum.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_LoMItem_UI'] = LoMItem_UI_Generate;