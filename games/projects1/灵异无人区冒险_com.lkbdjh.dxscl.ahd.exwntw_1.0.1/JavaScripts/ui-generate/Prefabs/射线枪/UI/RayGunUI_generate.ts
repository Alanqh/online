
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Prefabs/射线枪/UI/RayGunUI.ui
*/



@UIBind('UI/Prefabs/射线枪/UI/RayGunUI.ui')
export default class RayGunUI_Generate extends UIScript {
		private left_Internal: mw.Image
	public get left(): mw.Image {
		if(!this.left_Internal&&this.uiWidgetBase) {
			this.left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/left') as mw.Image
		}
		return this.left_Internal
	}
	private right_Internal: mw.Image
	public get right(): mw.Image {
		if(!this.right_Internal&&this.uiWidgetBase) {
			this.right_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/right') as mw.Image
		}
		return this.right_Internal
	}
	private point_Internal: mw.Image
	public get point(): mw.Image {
		if(!this.point_Internal&&this.uiWidgetBase) {
			this.point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/point') as mw.Image
		}
		return this.point_Internal
	}
	private up_Internal: mw.Image
	public get up(): mw.Image {
		if(!this.up_Internal&&this.uiWidgetBase) {
			this.up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/up') as mw.Image
		}
		return this.up_Internal
	}
	private down_Internal: mw.Image
	public get down(): mw.Image {
		if(!this.down_Internal&&this.uiWidgetBase) {
			this.down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/down') as mw.Image
		}
		return this.down_Internal
	}
	private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private icon_Internal: mw.Image
	public get icon(): mw.Image {
		if(!this.icon_Internal&&this.uiWidgetBase) {
			this.icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/icon') as mw.Image
		}
		return this.icon_Internal
	}
	private bullet_Internal: mw.TextBlock
	public get bullet(): mw.TextBlock {
		if(!this.bullet_Internal&&this.uiWidgetBase) {
			this.bullet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bullet') as mw.TextBlock
		}
		return this.bullet_Internal
	}
	private reload_Internal: mw.Button
	public get reload(): mw.Button {
		if(!this.reload_Internal&&this.uiWidgetBase) {
			this.reload_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/reload') as mw.Button
		}
		return this.reload_Internal
	}
	private crouch_Internal: mw.Button
	public get crouch(): mw.Button {
		if(!this.crouch_Internal&&this.uiWidgetBase) {
			this.crouch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/crouch') as mw.Button
		}
		return this.crouch_Internal
	}
	private right_fire_Internal: mw.VirtualJoystickPanel
	public get right_fire(): mw.VirtualJoystickPanel {
		if(!this.right_fire_Internal&&this.uiWidgetBase) {
			this.right_fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/right_fire') as mw.VirtualJoystickPanel
		}
		return this.right_fire_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 