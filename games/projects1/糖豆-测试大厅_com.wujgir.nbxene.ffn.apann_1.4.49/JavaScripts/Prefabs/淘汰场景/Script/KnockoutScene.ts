/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-03-21 09:38:44
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-17 09:28:38
 * @FilePath     : \stumbleguys\JavaScripts\prefabs\淘汰场景\Script\KnockoutScene.ts
 * @Description  : 修改描述
*/

import { LanUtils } from "../../../tool/LanguageUtil";

export default class KnockoutScene extends mw.UIScript {
    private playerWinNumber: number = 0;
    private aiWinNumber: number = 0;
    protected onStart() {

        console.log("世界UI运行");



        // Event.addLocalListener("UPDATE_WORLD_UI", (num: number) => {
        //     if (num === 0) return;
        //     this._updatePLayerNum(num);
        // });

        //依次掉落
        // Event.addLocalListener("OnPlayerEliminated", () => {
        //     this._cumulativeCount++;
        //     let currentCount = this._count - this._cumulativeCount;
        //     if (currentCount < 0) return;
        //     this._updatePLayerNum(currentCount);
        // });

        Event.addLocalListener("GameState.UpdateWinNum", (playerNum: number) => {
            this.playerWinNumber = playerNum;
            this._updatePLayerNum();
        });
        Event.addLocalListener("GameState.AddAIWinNum", () => {
            this.aiWinNumber++;
            this._updatePLayerNum();
        });
    }

    private _updatePLayerNum(): void {
        const num = this.playerWinNumber + this.aiWinNumber;
        console.log("世界UI刷新", num);
        const textCom = this.uiWidgetBase.findChildByPath('RootCanvas/playerNumText') as mw.TextBlock;
        textCom.text = LanUtils.getLanguage("UI_LAN_130").replace("{}", num.toFixed(0));
    }

}