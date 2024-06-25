
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 逝水无痕
 * UI: Prefabs/聊天表情/UI/Game_HUD.ui
 * TIME: 2023.01.18-00.45.15
 */

 

 @UIBind('UI/Game_HUD.ui')
 export default class Game_HUD_Generate extends mw.UIScript {
	 @UIWidgetBind('Canvas/canvas_emoji/scrollBox_emoji/mCanvasEmoji')
    public mCanvasEmoji: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/canvas_emoji/scrollBox_emoji')
    public scrollBox_emoji: mw.ScrollBox=undefined;
    @UIWidgetBind('Canvas/canvas_emoji')
    public canvas_emoji: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/canvas_btn/emojiBtn')
    public emojiBtn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/canvas_btn')
    public canvas_btn: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.emojiBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "emojiBtn");
		})
		this.initLanguage(this.emojiBtn);
		this.emojiBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 