/** 
 * @Author       : chenxinyu
 * @Date         : 2023-07-20 18:43:11
 * @LastEditors  : chenxinyu
 * @LastEditTime : 2023-07-23 18:18:09
 * @FilePath     : \stumbleguys\JavaScripts\TransitionUI.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: 国际美男
 * TIME: 2023.07.20-18.43.12
 */

import Transition_Generate from "./ui-generate/Transition_generate";

export default class TransitionUI extends Transition_Generate {

	private defaultScale: Array<number> = new Array<number>()

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		console.log("onStart")
		//设置能否每帧触发onUpdate
		this.canUpdate = true;
		this.layer = mw.UILayerDialog

		Event.addLocalListener("showTrans", () => {
			this.showTrans()
			setTimeout(() => {
				this.hideTrans()
			}, 1000);
		})
	}

	onShow() {
	}

	/**转场特效出场 */
	private showTrans() {
		for (let i = 0; i < this.canvas.getChildrenCount(); i++) {
			//canvas内的块块随机大小
			let scale: number = 0
			if (this.defaultScale.length < this.canvas.getChildrenCount()) {
				scale = this.canvas.getChildAt(i).renderScale.x
				this.defaultScale.push(scale)
			}
			else {
				scale = this.defaultScale[i]
			}

			new mw.Tween({ scale: 0 })
				.to({ scale: scale }, 500)
				.onUpdate((obj) => {
					this.canvas.getChildAt(i).renderScale = new Vector(obj.scale, obj.scale, obj.scale)
				})
				.start();
		}
	}

	/**转场特效消失 */
	private hideTrans() {
		for (let i = 0; i < this.canvas.getChildrenCount(); i++) {
			//canvas内的块块随机大小
			new mw.Tween({ scale: this.canvas.getChildAt(i).renderScale.x })
				.to({ scale: 0 }, 500)
				.onUpdate((obj) => {
					this.canvas.getChildAt(i).renderScale = new Vector(obj.scale, obj.scale, obj.scale)
				})
				.start();
		}
	}




}
