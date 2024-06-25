/*
 * @Author       : dal
 * @Date         : 2024-05-08 09:41:13
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-16 21:42:38
 * @FilePath: \1001_hall\JavaScripts\codes\modules\achievement\AchieveModuleC.ts
 * @Description  : 
 */

import { MainUI } from "../../ui/MainUI";
import Tips from "../../utils/Tips";
import { EStateIndex, RouteDefine } from "../route/RouteDefine";
import { UIGainPrize } from "../treasure/ui/UIGainPrize";
import { AchieveService } from "./AchieveDefine";
import AchieveModuleData from "./AchieveModuleData";
import AchieveModuleS from "./AchieveModuleS";

export default class AchieveModuleC extends ModuleC<AchieveModuleS, AchieveModuleData> {

    protected onEnterScene(sceneType: number): void {
        this.data.achieveFinishAction.add((achieveId: number) => {

            if (this.data.checkCanLevelUp()) {
                Event.dispatchToLocal("evt_panelRedPointChange", "AchievementPanel", `active`, true);
            }

        })

        if (this.data.checkCanLevelUp()) {
            Event.dispatchToLocal("evt_panelRedPointChange", "AchievementPanel", `active`, true);
        }

        // 伪人活动的红点
        Event.addServerListener("evt_panelRedPointChange", () => {
            Event.dispatchToLocal("evt_panelRedPointChange_UIFakerNewsItem", `active`, true);
        });


        // 领取胶卷的红点是否显示
        setTimeout(() => {
            RouteDefine.canReceiveActivity(Player.localPlayer.userId, EStateIndex.PhotoNews).then(v => {
                if (v) {
                    Event.dispatchToLocal("evt_panelRedPointChange_UIPhotoNews", `active`, true);
                }
            });
            RouteDefine.canReceiveActivity(Player.localPlayer.userId, EStateIndex.ShowPhotoCanvas).then(v => {
                if (v) {
                    // 没有过胶卷不显示照相机UI
                    UIService.getUI(MainUI).canvas_camera_1.visibility = SlateVisibility.Collapsed;
                }
            });
        }, 2e3);
    }

    /** 获取礼物，以为着成就等级会提升 */
    public async getGift() {

        if (this.data.checkIsMaxLevel()) {
            Tips.show("升级失败，当前是最高等级了");
            return;
        }


        let curLevel = await this.server.net_getGift();


        if (curLevel == 0) {
            console.error("获取成就礼物失败")
            return;
        }

        console.error("获取成就礼物成功,清理红点");
        Event.dispatchToLocal("evt_panelRedPointChange", "AchievementPanel", `active`, false);

        if (this.data.checkCanLevelUp()) {
            Event.dispatchToLocal("evt_panelRedPointChange", "AchievementPanel", `active`, true);
        }

        const rewardArr = AchieveService.getLevelCfg(curLevel);

        let rewards = rewardArr.rewards;

        let itemId = [];
        let itemCount = [];
        rewards.forEach(v => {

            //if (v[0] != 10201 && v[0] != 10202 && v[0] != 10203) {
            itemId.push(v[0]);
            itemCount.push(v[1]);
            //}

        });

        if (itemId.length > 0) {
            UIService.show(UIGainPrize, [], itemId, itemCount);
        }

    }

    /**
     * 获取玩家成就数据 
     * @param userId 不传就是获取本土数据
     * @returns 
     */
    public async getAchieveData(userId?: string): Promise<AchieveModuleData> {
        if (!userId || userId === this.localPlayer.userId) { return this.data; }
        else { return this.server.net_getAchieveData(userId); }
    }
}