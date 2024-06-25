/*
 * @Author       : dal
 * @Date         : 2024-03-19 18:38:37
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-25 15:49:42
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\controller\ui\UnlockTips.ts
 * @Description  : 
 */

import { IItemElement } from "../../../../config/Item";
import UnlockTips_UI_Generate from "../../../../ui-generate/ShareUI/unlock/UnlockTips_UI_generate";
import { EGameTheme } from "../../../Defines";
import { LanUtil } from "../../../utils/LanUtil";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { BagDefine } from "../../bag/BagDefine";
import WeaponUpgradePanel from "../../equip/ui/WeaponUpgradePanel";
import { RouteDataType } from "../../route/RouteData";
import { RouteDefine } from "../../route/RouteDefine";
import { RouteModuleC } from "../../route/RouteModule";
import StoreModuleC from "../../store/StoreModuleC";
import UnlockPanel from "./UnlockPanel";
import UnlockView from "./UnlockView";

export default class UnlockTips extends UnlockTips_UI_Generate {

    protected onStart() {
        this.btn_cancel.onClicked.add(() => {
            UIService.hideUI(this);
        });

        this.btn_confirm.onClicked.add(async () => {
            let result = await ModuleService.getModule(StoreModuleC).checkMoney(this.price)
            if (result) {
                if (await RouteDefine.changeFearCoin(Player.localPlayer.userId, -this.price)) {
                    UIService.hide(UnlockPanel);
                    BagDefine.AddItem(Player.localPlayer.playerId, this.cfg.id, "", "", 1, false);
                    ModuleService.getModule(RouteModuleC).reqSetRouteData(Player.localPlayer.userId, EGameTheme.Hall, [RouteDataType.UnlockedItemList], [this.cfg.id]);
                    Event.dispatchToLocal("UnlockItemSuccess", this.cfg.id);
                    if (UIService.getUI(WeaponUpgradePanel).visible) {
                        UIService.getUI(WeaponUpgradePanel).refresh(this.cfg.id);
                        GhostTraceHelper.uploadMGS("ts_action_do", "玩家通过武器升级界面弹窗购买武器上发", { movement_id: this.cfg.id });
                    } else {
                        UIService.show(UnlockView, this.cfg);
                    }
                }
            }
            UIService.hideUI(this);
        });
        this.layer = UILayerDialog
    }

    private cfg: IItemElement;

    private price: number = 999999;

    protected onShow(cfg: IItemElement, price: number) {
        this.cfg = cfg;
        this.price = price;
        this.text_tipscontent.text = StringUtil.format(LanUtil.getText("Code_042"), price, cfg.name);
    }
}