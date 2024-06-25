import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
/** 
* @Author       : yuanqi.bai
* @Date         : 2023-02-22 18:10:36
* @LastEditors  : yuanqi.bai
* @LastEditTime : 2023-07-23 18:32:35
* @FilePath     : \stumbleguys\JavaScripts\Prefabs\传送带\Script\ConveyorBeltTS.ts
* @Description  : 修改描述
*/
import { CLAI } from "../../../AI/client/ClientAIService";
import { ConveryImpulse } from "./ConveryImpulse";

const TEMP = new mw.Vector();
@Component
export default class ConveyorBeltTS extends mw.Script {

	/**需要叠加降落速度的角色 */
	private impuse: ConveryImpulse;

	@mw.Property({ displayName: "速度(米/秒)" })
	private speed: number = 200;
	/**是否移动 */
	private isMoving: boolean;
	private _serverImpuses: ConveryImpulse[] = [];

	private local: Character;
	protected onStart(): void {
		if (this.isRunningClient()) {
			Player.asyncGetLocalPlayer().then(player => {
				this.local = player.character;
			})
			let trigger = this.gameObject as mw.Trigger
			trigger.onEnter.add((go: mw.GameObject) => {
				if (go) {

					if (go == this.local) {
						this.isMoving = true;
						if (!this.impuse) {
							this.impuse = new ConveryImpulse(this.local);
						}
					} else if (PlayerManagerExtesion.isNpc(go)) {
						if (CLAI.hasAI(go)) {
							let has = this._serverImpuses.find(i => i.guid == go.gameObjectId);
							if (!has) {
								has = new ConveryImpulse(go)
								this._serverImpuses.push(has);
							}
							has.moving = true
						}
					}
				}

			});
			trigger.onLeave.add((go: mw.GameObject) => {
				if (go) {
					if (go == this.local) {
						this.isMoving = false;
						if (this.local.isJumping) {
							if ((this.local.velocity.x + this.local.velocity.y) < 200) {
								this.impuse.invalidate(this.gameObject.worldTransform.getForwardVector(), this.speed);
							}
						} else {
							this.impuse.invalidate(this.gameObject.worldTransform.getForwardVector(), this.speed);
						}
					} else if (PlayerManagerExtesion.isNpc(go)) {
						if (CLAI.hasAI(go)) {
							let targetIndex = this._serverImpuses.findIndex(i => i.guid == go.gameObjectId);
							if (targetIndex >= 0) {
								this._serverImpuses.splice(targetIndex, 1);
							}
						}
					}
				}

			});
		} else {
			this.onServerStart();
		}
		// 开启帧更新
		this.useUpdate = true;
	}

	protected onUpdate(dt: number): void {

		if (this.isRunningClient()) {
			if (this.isMoving) {
				let location = this.local.worldTransform.position;
				mw.Vector.multiply(this.gameObject.worldTransform.getForwardVector(), dt * this.speed, TEMP);
				// 添加距离需要用帧时间校准
				mw.Vector.add(location, TEMP, location);
				this.local.worldTransform.position = location;
			}
			if (this.impuse) {
				this.impuse.onUpdate(dt);
			}
		}
		this.onServerUpdate(dt);
	}
	onServerStart() {
		this.isMoving = true;
		let trigger = this.gameObject as mw.Trigger
		trigger.onEnter.add((go: Character) => {
			if (PlayerManagerExtesion.isNpc(go)) {
				let has = this._serverImpuses.find(i => i.guid == go.gameObjectId);
				if (!has) {
					has = new ConveryImpulse(go)
					this._serverImpuses.push(has);
				}
				has.moving = true
			}
		});
		trigger.onLeave.add((go: Character) => {

			let targetIndex = this._serverImpuses.findIndex(i => i.guid == go.gameObjectId);
			if (targetIndex >= 0) {
				this._serverImpuses.splice(targetIndex, 1);
			}
		});
	}
	onServerUpdate(dt) {

		for (let i of this._serverImpuses) {
			if (i.moving) {
				let location = i.worldLocation;
				mw.Vector.multiply(this.gameObject.worldTransform.getForwardVector(), dt * this.speed, TEMP);
				// 添加距离需要用帧时间校准
				mw.Vector.add(location, TEMP, location);
				i.worldLocation = location;
			}
			i.onUpdate(dt);
		}
	}
}
