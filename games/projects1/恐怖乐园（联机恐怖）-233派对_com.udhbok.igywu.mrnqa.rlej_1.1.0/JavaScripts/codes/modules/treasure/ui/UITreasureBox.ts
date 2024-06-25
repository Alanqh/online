/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-27 10:23:06
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-04-25 20:11:47
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\ui\UITreasureBox.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { ITreasureBoxElement } from "../../../../config/TreasureBox";
import TreasureBox_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/TreasureBox_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { RouteDefine } from "../../route/RouteDefine";
import TreasureData from "../TreasureData";
import TreasureModuleC from "../TreasureModuleC";
import { UIPrizePool } from "./UIPrizePool";

export class UITreasureBox extends TreasureBox_UI_Generate {
    private _curBoxID: number
    private _curData: ITreasureBoxElement[] = [];
    /**是否需要看广告 */
    private _needWatchAd: boolean;

    private _state: number = 0;

    private _boxNum: number = 0;

    onStart() {
        this.btn_prizePool.onClicked.add(() => {
            UIService.show(UIPrizePool, this._curData)
        })
        this.btn_open.onClicked.add(() => {
            if (!this._curBoxID) return
            // if (this._needWatchAd) {
            //     ModuleService.getModule(TreasureModuleC).watchAd(this._curBoxID, this._boxNum + 1)
            // } else {
            ModuleService.getModule(TreasureModuleC).reqOpenTreasureBox(this._curBoxID)
            UIService.hide(UITreasureBox)
            // }
        })
        this.adsButton.onShow.add((isReady: boolean) => {
            if (!isReady) {
                GhostTraceHelper.uploadMGS("ts_action_launch_rocket", "广告未就绪", { other_fuel: 502 })
            } else {
                GhostTraceHelper.uploadMGS("ts_action_launch_rocket", "玩家看广告上发", { fuel_robot: this._boxNum + 1 })
            }
        })

        this.adsButton.onClose.add((isSuccess: boolean) => {
            if (isSuccess) {
                ModuleService.getModule(TreasureModuleC).reqOpenTreasureBox(this._curBoxID)
            }
        })

        this.btn_back.onClicked.add(() => {
            UIService.hide(UITreasureBox)
        })
        let dataHelper = DataCenterC.getData(TreasureData)
        this.setBtnText(dataHelper.openTimes)
        dataHelper.onOpenTimeChange.add((times: number) => {
            this.setBtnText(times)
            GhostTraceHelper.uploadMGS("ts_action_launch_rocket", "玩家领取到奖励上发", { fuel_bag: times })
        })
        this.layer = UILayerSystem
    }

    onShow(boxID: number) {
        this._curBoxID = boxID
        this._curData = GameConfig.TreasureBox.getAllElement().filter(e => e.enable && e.boxID == boxID)
        GhostTraceHelper.uploadMGS("ts_action_launch_rocket", "宝箱界面开启上发", { launch_result: this._state })
    }

    async setBtnText(times: number) {
        this._boxNum = times
        this.mText_openable.text = ""
        if (times >= GameConfig.SubGlobal.openBoxTimes.number) {
            this.text_open.text = LanUtil.getText("Code_064");
            this.btn_open.enable = false;
            this._state = 2
            this.adsButton.visibility = SlateVisibility.Collapsed;//隐藏广告按钮
        }

        else if (times > 0) {
            this.btn_open.visibility = SlateVisibility.Collapsed;
            this.adsButton.visibility = SlateVisibility.Visible;//显示广告按钮
            this._needWatchAd = true;
            this.text_open.text = LanUtil.getText("Code_065");
            this._state = 1
        } else if (times == 0) {
            this._needWatchAd = false;
            this.text_open.text = LanUtil.getText("Code_066");
            this._state = 0
            this.mText_openable.text = LanUtil.getText("UI_bag_04")
        }

    }

}