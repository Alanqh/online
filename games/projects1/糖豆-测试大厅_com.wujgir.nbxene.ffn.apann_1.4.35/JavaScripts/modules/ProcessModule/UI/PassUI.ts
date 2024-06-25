/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-23 21:04:53
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-05 15:35:30
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\ProcessModule\UI\PassUI.ts
 * @Description  : 过关UI
 */

import { LanUtils } from "../../../tool/LanguageUtil";
import PassUI_Generate from "../../../ui-generate/PassUI_generate";
import { Tools } from "../../../utils/Tools";
import { ToolUtils } from "../../dress/ToolUtils";
import ProcessModuleC, { GameInfo } from "../ProcessModuleC";

export default class PassUI extends PassUI_Generate {
	protected onAwake(): void {
		LanUtils.setOutSeaImg(this.enUI_1, 8);
		super.onAwake();
	}
	protected onStart() {

	}

	onShow(playerId: number, time: number) {
		if (playerId) {
			this.teamCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			let player = Player.getPlayer(playerId);
			let character = player?.character;
			let characterName = character ? character.displayName : playerId.toString();
			this.teamNameTxt.text = Tools.getUITextAfterOmission(characterName, 18);
		} else {
			this.teamCanvas.visibility = mw.SlateVisibility.Collapsed;
		}

		let minute: number = Math.floor(Math.floor(time / 1000) / 60)
		let second: number = Math.floor(time / 1000) % 60
		let ms: number = Math.floor(time / 10) - Math.floor(time / 1000) * 100
		this.completeTimeTxt.text = LanUtils.getLanguage("UI_TIP_09") + " : " + minute + " ' " + second + " '' " + ms
		let startPos = new mw.Vector2(this.mCanvasMove.position.x + 2300, this.uiObject.position.y)
		ToolUtils.UIAnimaRightToLeftAndWord(this.mCanvasMove, this.mImageEmo, this.completeTimeTxt, startPos, mw.Vector2.zero, () => {
			Event.dispatchToLocal("PLAY_BY_CFG", 13);
		})
	}

	onHide() {
		//展示完了之后告知观战
		Event.dispatchToLocal("ACTIVE_WATCH_MODULE");
	}
}
