/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-01-30 14:58:17
 * @LastEditors  : zhenyu.zhang
 * @LastEditTime : 2023-01-30 15:24:19
 * @FilePath     : \stumbleguys\JavaScripts\UIDefault.ts
 * @Description  : 默认UI
 */
@UIBind('')
export default class UIDefault extends mw.UIScript {
	Character: Character;

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;

		//找到对应的跳跃按钮
		const JumpBtn = this.uiWidgetBase.findChildByPath('MWCanvas/MWButton_Jump') as mw.StaleButton
		//点击跳跃按钮,异步获取人物后执行跳跃
		JumpBtn.onPressed.add(() => {
			if (this.Character) {
				this.Character.jump();
			} else {
				Player.asyncGetLocalPlayer().then((player) => {
					this.Character = player.character;
					//角色执行跳跃功能
					this.Character.jump();
				});
			}
		})

		const joystick = this.uiWidgetBase.findChildByPath('MWCanvas/MWVirtualJoystickPanelDesigner') as mw.VirtualJoystickPanel;
		joystick.onJoyStickDown.add(() => {
			Event.dispatchToLocal("Joy.Down.Client");
		});
		joystick.onJoyStickUp.add(() => {
			Event.dispatchToLocal("Joy.Up.Client");
		});
		joystick.onInputDir.add((vec: mw.Vector2) => {
			Event.dispatchToLocal("Joy.Move.Client", vec);
		});
		Player.asyncGetLocalPlayer().then((player) => {
			if (joystick.onInputDir) {

			}
		});

	}

}
