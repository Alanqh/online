
 

 @UIBind('UI/ShareUI/shop/ShopWorld_UI.ui')
 export default class ShopWorld_UI_Generate extends UIScript {
	 	private text_shop_Internal: mw.TextBlock
	public get text_shop(): mw.TextBlock {
		if(!this.text_shop_Internal&&this.uiWidgetBase) {
			this.text_shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_shop') as mw.TextBlock
		}
		return this.text_shop_Internal
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
		
		this.initLanguage(this.text_shop)
		this.text_shop.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ShopWorld_UI'] = ShopWorld_UI_Generate;