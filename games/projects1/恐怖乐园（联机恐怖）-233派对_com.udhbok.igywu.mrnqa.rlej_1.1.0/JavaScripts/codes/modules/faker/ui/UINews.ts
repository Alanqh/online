/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-24 09:56:22
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-17 14:24:50
 * @FilePath: \1001_hall\JavaScripts\codes\modules\faker\ui\UINews.ts
 * @Description  : 
 */

import PhotoNews_UI_Generate from "../../../../ui-generate/ShareUI/news/newghost/PhotoNews_UI_generate";
import { MainUI } from "../../../ui/MainUI";
import { IntegrationPanel } from "../../../ui/UIIntegration";
import { EStateIndex, RouteDefine } from "../../route/RouteDefine";

/** 胶卷 */
export class UIPhotoNews extends PhotoNews_UI_Generate implements IntegrationPanel {

    onStart() {
        this.mBtn_BGPN.onClicked.add(async () => {
            let canReceive = await RouteDefine.canReceiveActivity(Player.localPlayer.userId, EStateIndex.PhotoNews);
            if (canReceive) {
                await RouteDefine.setActivityRewardState(Player.localPlayer.userId, EStateIndex.PhotoNews);
                // 领15个胶片
                RouteDefine.addSpecialItem(Player.localPlayer.userId, 51004, 15, true);
                this.show();
                // 领取过成就胶卷才显示摄像机UI
                UIService.getUI(MainUI).canvas_camera_1.visibility = SlateVisibility.SelfHitTestInvisible;
                Event.dispatchToLocal("evt_panelRedPointChange_UIPhotoNews", `active`, false);
            }
        })
    }

    async show() {
        if (await RouteDefine.canReceiveActivity(Player.localPlayer.userId, EStateIndex.PhotoNews)) {
            this.mImage_CheckF.visibility = SlateVisibility.Collapsed;
            this.img_redpointNP.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mBtn_BGPN.enable = true;
        } else {
            this.mImage_CheckF.visibility = SlateVisibility.SelfHitTestInvisible;
            this.img_redpointNP.visibility = SlateVisibility.Collapsed;
            this.mBtn_BGPN.enable = false;
        }
    }

    showVisible(bVisible: boolean): void {
        bVisible && this.show();
        this.uiObject.visibility = bVisible ? SlateVisibility.Visible : SlateVisibility.Hidden;
    }
}