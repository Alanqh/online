/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-08 16:29:26
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-05-16 19:03:53
 * @FilePath: \1001_hall\JavaScripts\codes\modules\record\RecordModuleS.ts
 * @Description  : 
 */

import { AchieveService, EAchieveType } from "../achievement/AchieveDefine";
import { RouteDefine } from "../route/RouteDefine";
import RecordData from "./RecordData";
import { RecordDefine } from "./RecordDefine";
import RecordModuleC from "./RecordModuleC";

export default class RecordModuleS extends ModuleS<RecordModuleC, RecordData> {

    protected onPlayerEnterGame(player: mw.Player): void {
        setTimeout(() => {
            this.getPlayerData(player).checkCanReceiveFakerReward();
        }, 3e3);
    }

    /**
     * 增加交互次数
     * @param type 0是非门交互  1是门交互
     */
    @Decorator.noReply()
    public net_addHandCount(type: number) {
        this.currentData.saveInterActorCount(type);
    }

    /**
     * 增加拍鬼次数
     * @param cfgIdList 
     */
    @Decorator.noReply()
    public net_addGhostPicCount(cfgIdList: number[]) {
        this.currentData.saveGhostPicTimes(cfgIdList);
    }

    protected onPlayerJoined(player: mw.Player): void {
        const data = this.getPlayerData(player);
        if (!data) { console.error(`DEBUG MyTypeError >>> 保存登录天数失败`); }
        data.saveLoginInfo();
        AchieveService.getAchieveIns(EAchieveType.ContinueLogin).listen(player, data.loginInfo.continueLoginDay);
    }

    private registerEvent() {
        Event.addLocalListener(RecordDefine.CaptureFaker, (player: mw.Player) => {
            RouteDefine.saveKilledFaker(player.userId);
            // DataCenterS.getData(player, RecordData).saveCaptureFakerTimes()
        })


    }

    protected onStart(): void {
        this.registerEvent()
    }

    /**
     * 保存对话且领取过奖励的Npc信息
     * @param id npcID
     */
    @Decorator.noReply()
    public net_saveTalkNpc(id: number) {
        this.currentData.saveTalkNpcInfo(id);
    }
}