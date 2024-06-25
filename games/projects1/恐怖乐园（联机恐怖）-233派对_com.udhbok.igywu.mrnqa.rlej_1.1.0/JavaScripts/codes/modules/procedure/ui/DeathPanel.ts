/*
 * @Author       : dal
 * @Date         : 2023-11-29 16:54:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-27 15:11:27
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\DeathPanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import Day_UI_Generate from "../../../../ui-generate/ShareUI/Day_UI_generate";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import PlayerData, { INIT_LIFE_NUM } from "../../player/PlayerData";

export class DeathPanel extends Day_UI_Generate {

    protected onStart(): void {
        this.layer = UILayerTop;
        
    }

    setDayNum() {
        this.text_daytips.text = GameConfig.Language[`catch_${INIT_LIFE_NUM - DataCenterC.getData(PlayerData).life + 1}`]?.Value;
    }

    playFullAni() {
        this.playOpenAni(this.playScaleAni.bind(this));
    }

    playScaleAni() {
        UIAniUtil.playOpaAni(this.rootCanvas, 0, 1e3, () => {
            UIService.hideUI(this);
        });
    }

    playOpenAni(callback) {
        this.setDayNum();
        this.rootCanvas.renderOpacity = 0;
        this.rootCanvas.renderScale = Vector2.one;
        UIAniUtil.playOpaAni(this.rootCanvas, 1, 2e3, () => {
            callback();
        });
        UIService.showUI(this);
    }
}