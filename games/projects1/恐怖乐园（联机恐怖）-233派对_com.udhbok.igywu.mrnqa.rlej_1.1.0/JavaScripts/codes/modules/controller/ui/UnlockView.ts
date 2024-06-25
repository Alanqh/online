/*
 * @Author       : dal
 * @Date         : 2024-03-19 18:39:06
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-25 14:10:34
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\controller\ui\UnlockView.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import Succeed_UI_Generate from "../../../../ui-generate/ShareUI/unlock/Succeed_UI_generate";
import GameStart from "../../../GameStart";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { BagModuleC } from "../../bag/BagModuleC";
import { EquipDefine } from "../../equip/EquipDefine";
import { RouteData } from "../../route/RouteData";
import { RouteModuleC } from "../../route/RouteModule";

export default class UnlockView extends Succeed_UI_Generate {

    protected onStart() {
        this.btn_back.onClicked.add(() => {
            UIService.hideUI(this);
        });

        this.btn_use.onClicked.add(() => {
            EquipDefine.EquipItem(ModuleService.getModule(BagModuleC).getItemsById(this.cfg.id)[0].guid);
            UIService.hideUI(this);
        });
        this.layer = UILayerDialog
    }

    private cfg: IItemElement;

    protected onShow(cfg: IItemElement) {
        this.cfg = cfg;
        this.img_icon.imageGuid = cfg.icon;
        this.text_name.text = cfg.name;
        this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(this.cfg.quality).imgGuid;
        ModuleService.getModule(RouteModuleC).reqGameThemeRouteDate(GameStart.GameTheme).then((routeData: RouteData) => {
            GhostTraceHelper.uploadMGS("ts_action_qte", "玩家购买武器上发", { qte_result: this.cfg.id, play_type: routeData.totalGameTime });
        });
    }
}