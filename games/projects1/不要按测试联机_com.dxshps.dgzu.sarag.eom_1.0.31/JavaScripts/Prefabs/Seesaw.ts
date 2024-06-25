
/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-01-30 13:30:36
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-07-19 18:36:11
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\翘翘板\Script\Seesaw.ts
 * @Description  : 修改描述
 */
const TEMP = new mw.Vector();
const TEMPOUT = new mw.Vector();
@Component
export default class Seesaw extends mw.Script {
	private leftNum: number = 0
	private rightNum: number = 0

	@mw.Property({ displayName: "唯一id，不能重复" })
	id: number = 1

	@mw.Property({ displayName: "倾斜角度和玩家滑动速度的关系, x * 倾斜度数 * 米/秒" })
	slidingAngle: number = 1

	@mw.Property({ displayName: "最大角度" })
	maxAngle: number = 30

	@mw.Property({ displayName: "平衡速度" })
	balanceSpeed: number = 5

	@mw.Property({ displayName: "平衡增强,当两边重量达到平衡的时只需要一次回弹就保持平衡" })
	balanceEnhance: boolean = false

	@mw.Property({ displayName: "单个玩家产生的加速度，度/秒" })
	unitSpeed: number = 10

	@mw.Property({ displayName: "最大速度，度/秒" })
	maxSpeed: number = 20

	@mw.Property({ displayName: "角度衰减，度/秒" })
	damping: number = 1

	@mw.Property({ displayName: "玩家下落动量产生的旋转速度，度" })
	fallingFrce: number = 0
	@mw.Property({ displayName: "左边触发器", capture: true })
	triggerLeftGuid: string = ""
	@mw.Property({ displayName: "右边触发器", capture: true })
	triggerRightGuid: string = ""

	/**当前速度 */
	curSpeed: number = 0
	tempRotation: mw.Rotation = mw.Rotation.zero

	async onStart() {
		if (SystemUtil.isServer()) return;

		GameObject.asyncFindGameObjectById(this.triggerLeftGuid).then((trigger: mw.Trigger) => {
			if (!trigger) return;
			trigger.onEnter.add((obj) => {
				if (obj instanceof mw.Pawn && obj.getVisibility()) {
					this.leftNum++;
				}
			});
			trigger.onLeave.add((obj) => {
				if (obj instanceof mw.Pawn && obj.getVisibility()) {
					this.leftNum--;
				}
			});
		});
		GameObject.asyncFindGameObjectById(this.triggerRightGuid).then((trigger: mw.Trigger) => {
			if (!trigger) return;
			trigger.onEnter.add((obj) => {
				if (obj instanceof mw.Pawn && obj.getVisibility()) {
					this.rightNum++;
				}
			});
			trigger.onLeave.add((obj) => {
				if (obj instanceof mw.Pawn && obj.getVisibility()) {
					this.rightNum--;
				}
			});
		});
		this.useUpdate = true;
	}

	protected onUpdate(dt: number): void {
		let targetObj = this.gameObject

		if (this.leftNum > this.rightNum) {
			if (targetObj.localTransform.rotation.y < this.maxAngle) {
				this.seesawRotate(true, dt)
			}
		}
		if (this.rightNum > this.leftNum) {
			if (targetObj.localTransform.rotation.y > -this.maxAngle) {
				this.seesawRotate(false, dt)
			}
		}
		if (this.leftNum == this.rightNum) {
			if (targetObj.localTransform.rotation.y > 0) {
				this.seesawRotate(false, dt, true)
			}
			if (targetObj.localTransform.rotation.y < 0) {
				this.seesawRotate(true, dt, true)
			}
		}
	}

	/**翘翘板旋转 */
	seesawRotate(isAdd: boolean, dt: number, balance: boolean = false) {
		let targetObj = this.gameObject
		if (balance) {
			this.curSpeed += this.balanceSpeed * dt * (isAdd ? 1 : -1)
			if (this.curSpeed > 0) {
				this.curSpeed -= this.damping * dt
				if (this.curSpeed > this.maxSpeed) this.curSpeed = this.maxSpeed
			} else {
				this.curSpeed += this.damping * dt
				if (this.curSpeed < -this.maxSpeed) this.curSpeed = -this.maxSpeed
			}
		} else {
			let numDiff = Math.abs(this.leftNum - this.rightNum)
			this.curSpeed += this.unitSpeed * numDiff * dt * (isAdd ? 1 : -1)
		}
		this.tempRotation.set(targetObj.localTransform.rotation)
		this.tempRotation.y += this.curSpeed * dt
		if (this.tempRotation.y >= this.maxAngle) {
			this.tempRotation.y = this.maxAngle
			this.curSpeed = 0
		}
		if (this.tempRotation.y <= -this.maxAngle) {
			this.tempRotation.y = -this.maxAngle
			this.curSpeed = 0
		}
		targetObj.localTransform.rotation = this.tempRotation
		if (balance && Math.abs(this.curSpeed) <= 1 && Math.abs(targetObj.localTransform.rotation.y) <= 1) {
			this.curSpeed = 0
			targetObj.localTransform.rotation = mw.Rotation.zero
		}
		if (this.balanceEnhance && balance && Math.abs(targetObj.localTransform.rotation.y) <= 1) {
			this.curSpeed = 0
			targetObj.localTransform.rotation = mw.Rotation.zero
		}
	}
}
