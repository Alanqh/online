﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/gmModule/GMHUD.ui
*/



@UIBind('UI/gmModule/GMHUD.ui')
export default class GMHUD_Generate extends UIScript {
		private argText_Internal: mw.InputBox
	public get argText(): mw.InputBox {
		if(!this.argText_Internal&&this.uiWidgetBase) {
			this.argText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/argText') as mw.InputBox
		}
		return this.argText_Internal
	}
	private groupButton_Internal: mw.StaleButton
	public get groupButton(): mw.StaleButton {
		if(!this.groupButton_Internal&&this.uiWidgetBase) {
			this.groupButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/groupButton') as mw.StaleButton
		}
		return this.groupButton_Internal
	}
	private cmdButton_Internal: mw.StaleButton
	public get cmdButton(): mw.StaleButton {
		if(!this.cmdButton_Internal&&this.uiWidgetBase) {
			this.cmdButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cmdButton') as mw.StaleButton
		}
		return this.cmdButton_Internal
	}
	private okButton_Internal: mw.Button
	public get okButton(): mw.Button {
		if(!this.okButton_Internal&&this.uiWidgetBase) {
			this.okButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/okButton') as mw.Button
		}
		return this.okButton_Internal
	}
	private cmdPanel_Internal: mw.Canvas
	public get cmdPanel(): mw.Canvas {
		if(!this.cmdPanel_Internal&&this.uiWidgetBase) {
			this.cmdPanel_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList/cmdPanel') as mw.Canvas
		}
		return this.cmdPanel_Internal
	}
	private dropList_Internal: mw.ScrollBox
	public get dropList(): mw.ScrollBox {
		if(!this.dropList_Internal&&this.uiWidgetBase) {
			this.dropList_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList') as mw.ScrollBox
		}
		return this.dropList_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 