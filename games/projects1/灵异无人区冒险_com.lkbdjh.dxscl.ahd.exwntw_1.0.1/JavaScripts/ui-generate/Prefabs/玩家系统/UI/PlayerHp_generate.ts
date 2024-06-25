
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/Prefabs/玩家系统/UI/PlayerHp.ui
 * TIME: 2023.03.27-16.53.05
 */

 

 @UIBind('UI/Prefabs/玩家系统/UI/PlayerHp.ui')
 export default class PlayerHp_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/canvas/hpSlider')
    public hpSlider: mw.ProgressBar=undefined;
    @UIWidgetBind('RootCanvas/canvas/nameTxt')
    public nameTxt: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/canvas/levelTxt')
    public levelTxt: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/canvas')
    public canvas: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;

		this.levelTxt.visibility = SlateVisibility.Collapsed
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.nameTxt)
		
	
		this.initLanguage(this.levelTxt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 