/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-23 21:04:53
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-08-24 16:52:18
 * @FilePath     : \stumbleguys\JavaScripts\Modules\ProcessModule\UI\OutUI.ts
 * @Description  : 淘汰UI
 */

import { ToolUtils } from "../../../modules/dress/ToolUtils";
import { LanUtils } from "../../../tool/LanguageUtil";
import OutUI_Generate from "../../../ui-generate/OutUI_generate";

export default class OutUI extends OutUI_Generate {
	protected onAwake() {
		LanUtils.setOutSeaImg(this.enUI_1, 7);
		super.onAwake();
	}

	onShow(round2: boolean = false) {
		if (!round2) {
			setTimeout(() => {
				mw.UIService.hide(OutUI);
				//在结果UI里移出EndUI;
				Event.dispatchToLocal("ShiftResultUI", OutUI);
			}, 2000);
		}
		let startPos = new mw.Vector2(this.mCanvasMove.position.x + 2300, this.uiObject.position.y)
		ToolUtils.UIAnimaRightToLeft(this.mCanvasMove, this.mImageEmo, startPos, mw.Vector2.zero, () => {
			Event.dispatchToLocal("PLAY_BY_CFG", 15);
		})
	}
}
