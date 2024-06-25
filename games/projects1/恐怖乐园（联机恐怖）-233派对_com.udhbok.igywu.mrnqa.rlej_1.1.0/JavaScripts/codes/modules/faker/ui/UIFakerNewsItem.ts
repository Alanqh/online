/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-24 09:56:22
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-16 15:36:14
 * @FilePath: \1001_hall\JavaScripts\codes\modules\faker\ui\UINews.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import FakerNewsItem_UI_Generate from "../../../../ui-generate/ShareUI/integration/faker/fakerNewsItem_UI_generate";
import { IntegrationPanel } from "../../../ui/UIIntegration";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { BagDefine } from "../../bag/BagDefine";
import { EStateIndex, RouteDefine } from "../../route/RouteDefine";


export default class UIFakerNewsItem extends FakerNewsItem_UI_Generate implements IntegrationPanel {
    private _killNum: number = 0;

    onStart() {
        this.maskBtn_color.clickedDelegate.add(async () => {
            if (this._killNum < GameConfig.SubGlobal.AlternateKilled.number) {
                Tips.show(LanUtil.getText("UI_News_07"));
                return;
            };
            //领取击杀伪人奖励
            let canReceive = await RouteDefine.canReceiveActivity(Player.localPlayer.userId, EStateIndex.ScreamKun);
            if (canReceive) {
                RouteDefine.setActivityRewardState(Player.localPlayer.userId, EStateIndex.ScreamKun);
                GameConfig.SubGlobal.AlternateKilled.array1d.forEach(id => {
                    BagDefine.AddItem(Player.localPlayer.playerId, id)
                    GhostTraceHelper.uploadMGS("ts_action_upgrade_item", "获得物品的时候上发", { item_id: id, item_level: 4 })
                })
                Event.dispatchToLocal("evt_panelRedPointChange_UIFakerNewsItem", `active`, false);
                Tips.show(LanUtil.getText("UI_News_08"));
            } else {
                Tips.show(LanUtil.getText("UI_News_09"));
            }
        })
        // this.btn_back.onClicked.add(() => {
        //     UIService.hide(UINews)
        // })
        // this.layer = UILayerSystem;
    }

    async show() {
        this._killNum = await RouteDefine.getKilledFakerNum(Player.localPlayer.userId);
        this._killNum = !this._killNum ? 0 : this._killNum
        this.text_num.text = `${this._killNum}/${GameConfig.SubGlobal.AlternateKilled.number}`;
        this.maskBtn_color.fanShapedValue = this._killNum / GameConfig.SubGlobal.AlternateKilled.number
    }

    showVisible(bVisible: boolean): void {
        this.uiObject.visibility = bVisible ? SlateVisibility.Visible : SlateVisibility.Hidden;
        if (bVisible)
            this.show();
    }




}