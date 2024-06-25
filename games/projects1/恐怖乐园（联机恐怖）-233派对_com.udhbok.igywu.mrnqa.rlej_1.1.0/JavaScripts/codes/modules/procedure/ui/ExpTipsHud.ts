/*
 * @Author       : dal
 * @Date         : 2024-03-12 14:54:05
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-08 13:51:42
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\ExpTipsHud.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import ExpTips_UI_Generate from "../../../../ui-generate/ShareUI/props/ExpTips_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";
import { RouteModuleC } from "../../route/RouteModule";


export default class ExpTipsHud extends ExpTips_UI_Generate {

    private shiftCanvasLvUp(isShow: boolean) {
        this.canvas_lvUp.visibility = isShow ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    protected onStart() {
        this.layer = mw.UILayerSystem;
    }

    onShow(gainExp: number, curExp: number) {
        this.text_exp.text = LanUtil.getText("Code_070") + "：" + "+" + Math.floor(gainExp);
        const curLevelCfg = GameConfig.PlayerExp.getAllElement().find(v => { return curExp >= v.val; });
        const curLevel = curLevelCfg ? curLevelCfg.level : 0;
        const nextLevelCfg = GameConfig.PlayerExp.getElement(curLevel + 1);
        this.text_lv.text = StringUtil.format(LanUtil.getText("Code_071"), curLevel);
        this.shiftCanvasLvUp(gainExp + curExp >= nextLevelCfg.val);
    }
}
