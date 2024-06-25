/** 
 * @Author       : lei.zhao
 * @Date         : 2022-10-31 18:47:49
 * @LastEditors  : bao.zhang bao.zhang@appshahe.com
 * @LastEditTime : 2023-08-18 15:40:37
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\Transporter\Script\Transporter.ts
 * @Description  : 修改描述
 */

import { ModifiedCameraSystem } from "../../Modified027Editor/ModifiedCamera";


@Component
export default class Transporter extends mw.Script {
	@mw.Property({ displayName: "传送到的位置" })
	public location: mw.Vector = new mw.Vector(0);
	@mw.Property({ displayName: "传送到的角色旋转" })
	public rotation: mw.Vector = new mw.Vector(0);
	private _trigger: mw.Trigger;
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if (SystemUtil.isServer()) return;
		this.location.z += 80;
		this._trigger = this.gameObject as mw.Trigger;
		this._trigger.onEnter.add((cha) => {
			if (cha instanceof mw.Character) {
				if (cha == Player.localPlayer.character) {
					cha.worldTransform.position = this.location;
					this.setRotation(cha as mw.Character);
				} else if (cha instanceof mw.Character) {
					cha.worldTransform.position = this.location;
				}
			}
		});
	}

	private setRotation(cha: mw.Character) {
		cha.worldTransform.rotation = new Rotation(this.rotation);
		const cameraSystem = Camera.currentCamera;
		cameraSystem.rotationLagEnabled = false;
		ModifiedCameraSystem.setOverrideCameraRotation(cha.worldTransform.getForwardVector().toRotation());
		TimeUtil.delayExecute(() => {
			ModifiedCameraSystem.resetOverrideCameraRotation();
			cameraSystem.rotationLagEnabled = true;
		}, 10)
	}


}
