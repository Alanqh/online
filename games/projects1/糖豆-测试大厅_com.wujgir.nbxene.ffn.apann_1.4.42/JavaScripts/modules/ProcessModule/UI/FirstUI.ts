/** 
 * @Author       : weihao.xu
 * @Date         : 2023-12-29 11:21:57
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-05 15:35:00
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\ProcessModule\UI\FirstUI.ts
 * @Description  : 修改描述
 */

import { LanUtils } from "../../../tool/LanguageUtil";
import ChampionUI_Generate from "../../../ui-generate/ChampionUI_generate";
import { Tools } from "../../../utils/Tools";
import { ToolUtils } from "../../dress/ToolUtils";
import ProcessModuleC, { GameInfo } from "../ProcessModuleC";

export default class FirstUI extends ChampionUI_Generate {

    protected onAwake(): void {
        super.onAwake();
        if (LanUtils.isCH) {
            this.enUI_1.visibility = mw.SlateVisibility.Visible;
            this.enUI_1_1.visibility = mw.SlateVisibility.Hidden;
        } else {
            this.enUI_1.visibility = mw.SlateVisibility.Hidden;
            this.enUI_1_1.visibility = mw.SlateVisibility.Visible;
        }
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