




@UIBind('UI/UIIceLolly.ui')
export default class UIIceLolly_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/itemCanvas')
    public itemCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/itemCanvas/itemBtn')
    public itemBtn: mw.MaskButton=undefined;
    @UIWidgetBind('RootCanvas/itemCanvas/itemCountTxt')
    public itemCountTxt: mw.TextBlock=undefined;
    

 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.itemCountTxt)
		
	
		//文本多语言
		
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 