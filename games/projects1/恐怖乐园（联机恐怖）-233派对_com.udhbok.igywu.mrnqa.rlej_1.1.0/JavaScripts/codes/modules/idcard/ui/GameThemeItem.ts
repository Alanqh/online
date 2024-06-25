/*
 * @Author       : dal
 * @Date         : 2024-02-28 19:00:12
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-08 11:53:08
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\ui\GameThemeItem.ts
 * @Description  : 
 */
import Recorditem_UI_Generate from "../../../../ui-generate/ShareUI/card/Recorditem_UI_generate";
import { EGameTheme } from "../../../Defines";
import { LanUtil } from "../../../utils/LanUtil";
import TimeTransferUtil from "../../../utils/TimeTransferUtil";
import Tips from "../../../utils/Tips";
import RouteConst from "../../route/RouteConst";
import { RouteData } from "../../route/RouteData";
import GameRecordPanel from "./GameRecordPanel";

export default class GameThemeItem extends Recorditem_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public onStart() {
        this.onSelect = new Action();
        this.btn.onClicked.add(() => {
            if (!this.routeData) { return; }
            if (this.routeData.gameTheme === EGameTheme.Empty) {
                Tips.show(LanUtil.getText("Code_023"));
                return;
            }
            UIService.show(GameRecordPanel, this.routeData.gameTheme, this.routeData);
        });
    }

    public setSelected(isTrue: boolean) {
    }

    private routeData: RouteData;

    public setData(routeData: RouteData) {
        this.routeData = routeData;
        if (!this.routeData) { return; }
        if (routeData.gameTheme === EGameTheme.Empty) {
            this.txtgamename.text = LanUtil.getText("Code_023");
            this.txtpasstime.text = "";
            return;
        }
        const gameThemeCfg = RouteConst.getGameThemeCfg(routeData.gameTheme);
        this.txtgamename.text = gameThemeCfg.name;
        const timeInfo = TimeTransferUtil.getTimeInfoByTimeSec(routeData.totalGameTime);
        this.txtpasstime.text = timeInfo.hour + LanUtil.getText("Code_024") + timeInfo.minute + LanUtil.getText("Code_025");
    }
}