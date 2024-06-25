
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/Prefabs/通知系统/UI/Notify.ui
 * TIME: 2023.03.27-16.53.06
 */

 

 @UIBind('UI/Prefabs/通知系统/UI/Notify.ui')
 export default class Notify_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/tips')
    public tips: mw.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.tips)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 