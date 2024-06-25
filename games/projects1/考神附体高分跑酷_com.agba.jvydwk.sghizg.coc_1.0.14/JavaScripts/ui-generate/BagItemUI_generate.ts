
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/BagItemUI.ui
 * TIME: 2023.09.06-10.43.04
*/



@UIBind('UI/BagItemUI.ui')
export default class BagItemUI_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/lock')
    public lock: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/icon')
    public icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/txt')
    public txt: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/btn')
    public btn: mw.Button=undefined;
    

 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 