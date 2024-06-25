
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/PrefabEvtUI.ui
 * TIME: 2023.03.27-16.57.10
 */

 

 @UIBind('UI/PrefabEvtUI.ui')
 export default class PrefabEvtUI_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mFlyCanvas/mFlyUpBtn')
    public mFlyUpBtn: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mFlyCanvas/mFlyDownBtn')
    public mFlyDownBtn: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mFlyCanvas')
    public mFlyCanvas: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mFlyUpBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mFlyUpBtn");
		})
		this.mFlyUpBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mFlyDownBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mFlyDownBtn");
		})
		this.mFlyDownBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

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
 