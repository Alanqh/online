
 

 @UIBind('UI/ShareUI/MonsterBlood_UI.ui')
 export default class MonsterBlood_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private img_bg0_Internal: mw.Image
	public get img_bg0(): mw.Image {
		if(!this.img_bg0_Internal&&this.uiWidgetBase) {
			this.img_bg0_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_bg0') as mw.Image
		}
		return this.img_bg0_Internal
	}
	private img_br0_Internal: mw.Image
	public get img_br0(): mw.Image {
		if(!this.img_br0_Internal&&this.uiWidgetBase) {
			this.img_br0_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_br0') as mw.Image
		}
		return this.img_br0_Internal
	}
	private progressBar_Internal: mw.ProgressBar
	public get progressBar(): mw.ProgressBar {
		if(!this.progressBar_Internal&&this.uiWidgetBase) {
			this.progressBar_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/progressBar') as mw.ProgressBar
		}
		return this.progressBar_Internal
	}
	private img_iconBr1_Internal: mw.Image
	public get img_iconBr1(): mw.Image {
		if(!this.img_iconBr1_Internal&&this.uiWidgetBase) {
			this.img_iconBr1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_iconBr1') as mw.Image
		}
		return this.img_iconBr1_Internal
	}
	private img_iconBr2_Internal: mw.Image
	public get img_iconBr2(): mw.Image {
		if(!this.img_iconBr2_Internal&&this.uiWidgetBase) {
			this.img_iconBr2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_iconBr2') as mw.Image
		}
		return this.img_iconBr2_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_iconBr2/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private txt_monsterName_Internal: mw.TextBlock
	public get txt_monsterName(): mw.TextBlock {
		if(!this.txt_monsterName_Internal&&this.uiWidgetBase) {
			this.txt_monsterName_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/txt_monsterName') as mw.TextBlock
		}
		return this.txt_monsterName_Internal
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
		
		this.initLanguage(this.txt_monsterName)
		this.txt_monsterName.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MonsterBlood_UI'] = MonsterBlood_UI_Generate;