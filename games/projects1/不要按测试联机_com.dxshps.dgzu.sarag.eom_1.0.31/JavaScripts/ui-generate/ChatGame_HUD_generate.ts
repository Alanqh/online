
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 冰玥
 * UI: UI/ChatGame_HUD.ui
 * TIME: 2023.06.26-15.01.49
*/



@UIBind('UI/ChatGame_HUD.ui')
export default class ChatGame_HUD_Generate extends mw.UIScript {
	@UIWidgetBind('Canvas/canvas_word/scrollBox_word/mCanvasWord')
    public mCanvasWord: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/canvas_word/scrollBox_word')
    public scrollBox_word: mw.ScrollBox=undefined;
    @UIWidgetBind('Canvas/canvas_word')
    public canvas_word: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/canvas_btn/wordBtn')
    public wordBtn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/canvas_btn')
    public canvas_btn: mw.Canvas=undefined;
    

 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 