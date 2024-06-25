
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 逝水无痕
 * UI: Prefabs/聊天表情/UI/Emoji.ui
 * TIME: 2023.01.18-00.45.15
 */



@UIBind('UI/Emoji.ui')
export default class Emoji_Generate extends mw.UIScript {
	@UIWidgetBind('Canvas/mBtn_expression')
	public mBtn_expression: mw.StaleButton = undefined;



	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击

		this.mBtn_expression.onClicked.add(() => {
			Event.dispatchToLocal("PlayButtonClick", "mBtn_expression");
		})
		this.initLanguage(this.mBtn_expression);
		this.mBtn_expression.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


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
