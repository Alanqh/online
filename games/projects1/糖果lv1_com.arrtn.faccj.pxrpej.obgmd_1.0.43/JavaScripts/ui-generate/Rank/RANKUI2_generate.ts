




@UIBind('UI/Rank/RANKUI2.ui')
export default class RANKUI2_Generate extends UIScript {
		private mImageBack_Internal: mw.Image
	public get mImageBack(): mw.Image {
		if(!this.mImageBack_Internal&&this.uiWidgetBase) {
			this.mImageBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImageBack') as mw.Image
		}
		return this.mImageBack_Internal
	}
	private mImageTrophy_Internal: mw.Image
	public get mImageTrophy(): mw.Image {
		if(!this.mImageTrophy_Internal&&this.uiWidgetBase) {
			this.mImageTrophy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_2/Canvas_1/mImageTrophy') as mw.Image
		}
		return this.mImageTrophy_Internal
	}
	private mTextRank_Internal: mw.TextBlock
	public get mTextRank(): mw.TextBlock {
		if(!this.mTextRank_Internal&&this.uiWidgetBase) {
			this.mTextRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_2/Canvas_1/mTextRank') as mw.TextBlock
		}
		return this.mTextRank_Internal
	}
	private mImgHead_Internal: mw.Image
	public get mImgHead(): mw.Image {
		if(!this.mImgHead_Internal&&this.uiWidgetBase) {
			this.mImgHead_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_2/Canvas_3/mImgHead') as mw.Image
		}
		return this.mImgHead_Internal
	}
	private mTextName_Internal: mw.TextBlock
	public get mTextName(): mw.TextBlock {
		if(!this.mTextName_Internal&&this.uiWidgetBase) {
			this.mTextName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/Canvas_2/Canvas_3/mTextName') as mw.TextBlock
		}
		return this.mTextName_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextRank)
		
	
		this.initLanguage(this.mTextName)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 