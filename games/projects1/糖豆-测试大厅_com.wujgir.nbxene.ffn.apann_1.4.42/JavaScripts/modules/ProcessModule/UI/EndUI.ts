/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-04-12 17:39:29
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-05 15:34:47
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\ProcessModule\UI\EndUI.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: 青衫落拓
 * TIME: 2023.02.14-14.21.15
 */

import { LanUtils } from "../../../tool/LanguageUtil";
import EndUI_Generate from "../../../ui-generate/EndUI_generate";
import { ToolUtils } from "../../dress/ToolUtils";



export default class EndUI extends EndUI_Generate {
	protected onAwake() {
		LanUtils.setOutSeaImg(this.enUI_1, 6);
		super.onAwake();
	}

	onShow() {
		let startPos = new mw.Vector2(this.mCanvasMove.position.x + 2300, this.uiObject.position.y)
		ToolUtils.UIAnimaRightToLeft(this.mCanvasMove, this.mImageEmo, startPos, mw.Vector2.zero)
	}

}
