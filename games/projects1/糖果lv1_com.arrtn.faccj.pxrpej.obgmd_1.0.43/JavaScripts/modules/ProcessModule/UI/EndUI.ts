/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-04-12 17:39:29
 * @LastEditors  : chenxinyu
 * @LastEditTime : 2023-07-23 18:58:39
 * @FilePath     : \stumbleguys\JavaScripts\modules\ProcessModule\UI\EndUI.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: 青衫落拓
 * TIME: 2023.02.14-14.21.15
 */

import TransitionUI from "../../../TransitionUI";
import { LanUtils } from "../../../tool/LanguageUtil";
import EndUI_Generate from "../../../ui-generate/EndUI_generate";
import { ToolUtils } from "../../dress/ToolUtils";
import ProcessModuleC, { GameInfo } from "../ProcessModuleC";



export default class EndUI extends EndUI_Generate {
	protected onAwake() {
		LanUtils.setOutSeaImg(this.enUI_1, 6);
		super.onAwake();
	}

	onShow() {
		let transTime
		if (ModuleService.getModule(ProcessModuleC)._isPass) {
			transTime = 3000
		} else {
			transTime = 1200
		}
		setTimeout(() => {
			let round = 2
			ModuleService.getModule(ProcessModuleC).getGameInfo().then((gameInfo: GameInfo) => {
				round = gameInfo.round
			})

			mw.UIService.show(TransitionUI)
			Event.dispatchToLocal("showTrans")

			console.log("round:" + round)
			if (round == 1) {
				//直接隐藏UI
				mw.UIService.hide(EndUI);
			} else {
				//展示胜利动画
				mw.UIService.hide(EndUI);
				Event.dispatchToLocal("CameraCloseUp", true)
			}
			//在结果UI里移出EndUI;
			Event.dispatchToLocal("ShiftResultUI", EndUI);
		}, transTime);
		let startPos = new mw.Vector2(this.mCanvasMove.position.x + 2300, this.uiObject.position.y)
		ToolUtils.UIAnimaRightToLeft(this.mCanvasMove, this.mImageEmo, startPos, mw.Vector2.zero)
	}

}
