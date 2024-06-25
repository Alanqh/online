/** 
 * @Author       : chenxinyu
 * @Date         : 2023-07-23 17:17:48
 * @LastEditors  : chenxinyu
 * @LastEditTime : 2023-08-17 17:41:05
 * @FilePath     : \stumbleguys\JavaScripts\EndRankUI.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: 国际美男
 * TIME: 2023.07.21-16.59.15
 */

import { TeamService } from "./Prefabs/team/Team";
import { GameConfig } from "./config/GameConfig";
import { MGSGame } from "./mgs/MGSGame";
import PlayerModuleC from "./modules/PlayerModule/PlayerModuleC";
import { LanUtils } from "./tool/LanguageUtil";
import { Singleton } from "./tool/Singleton";
import { Utils } from "./tool/Utils";
import EndRank_Generate from "./ui-generate/EndRank_generate";

export default class EndRankUI extends EndRank_Generate {

	private canOtherClick = true
	private aiName: []
	private _isClickGood = false
	private goodString: Array<string> = new Array<string>()
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = true;
		this.layer = mw.UILayerMiddle;
		this.menberName.visibility = mw.SlateVisibility.Collapsed;
		this.jumpCamera.visibility = mw.SlateVisibility.Collapsed;

		this.goodString = ["", "", "", ""]
		this.goodImg.visibility = mw.SlateVisibility.Collapsed;

		Event.addLocalListener("showWinnerEnd", (aiCount: number, aiName: []) => {
			this.goodBtn.visibility = mw.SlateVisibility.Collapsed;

			if (aiCount > 0) {
				setInterval(() => {
					this.goodString.splice(0, 1)
					this.goodString.push("\n" + aiName[Utils.rangeInt(0, aiName.length)] + LanUtils.getLanguage("UI_EndRank_02"))
					this.refreshText()
				}, 5000)
			}
		})

		//显示冠军队友名字
		Event.addLocalListener("showEnd", (player: mw.Player, winName: string) => {
			this.textName.text = winName
			if (player == undefined) return
			let team = ModuleService.getModule(PlayerModuleC).cacheMember
			if (team.indexOf(player.userId) != -1) {
				this.menberName.visibility = mw.SlateVisibility.Visible;
				this.menberName.text = LanUtils.getLanguage("UI_EndRank_01") + " : "
				team.forEach(element => {
					const player = Player.getAllPlayers().find(p => p.userId == element);
					if (player) {
						this.menberName.text += "\n" + player.character.displayName
					}
				});
			}
		})

		Event.addLocalListener("showGoodClick", (name: string) => {
			this.goodString.splice(0, 1)
			this.goodString.push("\n" + name + LanUtils.getLanguage("UI_EndRank_02"))
			this.refreshText()
			// this.goodText.text += "\n" + name + "给你点赞了"
		})

		this.goodBtn.onClicked.add(() => {
			this.goodImg.visibility = mw.SlateVisibility.Visible;
			this.goodClickEffect(this.goodBtn.position.x)
			let time = Utils.rangeInt(351, 500)
			setTimeout(() => {
				this.goodImg.visibility = mw.SlateVisibility.Visible;
				this.goodClickEffect(this.goodBtn.position.x + 50)
			}, time);
			Event.dispatchToServer("ClickGood")

			//第一次点赞埋点
			if (!this._isClickGood) {
				this._isClickGood = true
				Singleton.getIns(MGSGame).playerClickGood();
			}
		})

		this.jumpCamera.onClicked.add(() => {


		})
	}

	onShow(time: number) {
		let minute: number = Math.floor(Math.floor(time / 1000) / 60)
		let second: number = Math.floor(time / 1000) % 60
		let ms: number = Math.floor(time / 10) - Math.floor(time / 1000) * 100
		this.completeTimeTxt.text = LanUtils.getLanguage("UI_TIP_09") + " : " + minute + " ' " + second + " '' " + ms
	}

	private refreshText() {
		let text = ""
		this.goodString.forEach(element => {
			text += element
		});
		this.goodText.text = text
	}


	private goodClickEffect(posx: number) {
		let posY = Utils.rangeInt(400, 700)
		new mw.Tween({ posY: 884, op: 1 })
			.to({ posY: posY, op: 0 }, 350)
			.onUpdate((obj) => {
				let transform: mw.UITransform = this.goodImg.transform
				transform.position = new Vector(posx, obj.posY)
				this.goodImg.transform = transform
				this.goodImg.imageColor = new mw.LinearColor(1, 0, 0, obj.op)
			})
			.onComplete(() => {
				let transform: mw.UITransform = this.goodImg.transform
				transform.position = new Vector(posx, 884)
				this.goodImg.transform = transform
				this.goodImg.imageColor = new mw.LinearColor(1, 0, 0, 1)
				this.goodImg.visibility = mw.SlateVisibility.Collapsed;
			})
			.start();
	}
}
