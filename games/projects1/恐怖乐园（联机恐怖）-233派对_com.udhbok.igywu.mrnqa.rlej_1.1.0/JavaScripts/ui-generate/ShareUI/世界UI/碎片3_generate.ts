﻿
 

 @UIBind('UI/ShareUI/世界UI/碎片3.ui')
 export default class 碎片3_Generate extends UIScript {
	 

 
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
		

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_碎片3'] = 碎片3_Generate;