/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-08 13:54:42
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-21 10:02:39
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\mission\MissionModuleS.ts
 * @Description  : 
 */



import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { AchieveService, EAchieveType } from "../achievement/AchieveDefine";
import { BagDefine } from "../bag/BagDefine";
import { PhotoData } from "../equip/util/CamerHelper";
import { IDCardModuleS } from "../idcard/IDCardModule";
import { PlayerModuleS } from "../player/PlayerModuleS";
import { RecordDefine } from "../record/RecordDefine";
import { RouteDataHelper, RouteDataType } from "../route/RouteData";
import { MissionCondition } from "./MissionCondition";
import MissionData from "./MissionData";
import MissionModuleC from "./MissionModuleC";

export default class MissionModuleS extends ModuleS<MissionModuleC, MissionData> {

    private survivePlayer: mw.Player[] = [];

    protected onStart(): void {
        this.registerEvent()
        //每秒钟更新一下玩家的在线时长
        TimeUtil.setInterval(() => {
            //更新玩家在线时长
            Player.getAllPlayers().forEach(player => {
                if (player && player.character) {
                    this.getPlayerData(player)?.updateOnlineTime();
                }
            })
            //更新玩家存活时长
            this.survivePlayer.forEach(p => {
                if (p && p.character) {
                    this.getPlayerData(p).updateSurviveTime(GameStart.GameTheme);
                }
            })
        }, 5)

    }

    protected onPlayerEnterGame(player: mw.Player): void {

    }


    protected onPlayerLeft(player: mw.Player): void {
        let index = this.survivePlayer.findIndex(p => p.playerId == player.playerId)
        if (-1 != index) this.survivePlayer.splice(index)
    }

    private registerEvent() {
        Event.addLocalListener(RecordDefine.CaptureFaker, (player: mw.Player) => { DataCenterS.getData(player, MissionData).updateCaptureFaker() })
        Event.addLocalListener(RecordDefine.UseItemCount, (playerId: number, itemID: number, count: number) => {
            DataCenterS.getData(playerId, MissionData).updateUseItemCount(itemID, count)
        })
    }

    /**初始化任务 */
    @Decorator.noReply()
    public async net_initMission() {
        let player = this.currentPlayer
        let currentData = this.currentData
        currentData.resetDailyMission()
        let level = await ModuleService.getModule(PlayerModuleS).net_getPlayerLevel(player.userId)

        let allMission = GameConfig.Mission.getAllElement()
        for (let i = 0; i < allMission.length; ++i) {
            let e = allMission[i]
            if (!e.npcID && !e.pre_Mission && level >= e.pre_playerLevel) {
                await this.net_takeMission(e.id, player.playerId)
            }
        }

        if (GameStart.GameTheme != EGameTheme.Hall) {
            currentData.updateLoginData(GameStart.GameTheme)
        }
    }

    /**接取任务 */
    public async net_takeMission(missionId: number, playerId: number) {
        let player = Player.getPlayer(playerId)
        let missionCfg = GameConfig.Mission.getElement(missionId);
        let dataHelper = this.getPlayerData(playerId)
        if (!missionCfg) return false;
        //判断前置条件
        if (missionCfg.isDiscard) return false;//这个任务被废弃了
        if (missionCfg.pre_Mission && !dataHelper.isCompleted(missionCfg.pre_Mission)) return false;//没完成前置任务
        let level = await ModuleService.getModule(PlayerModuleS).net_getPlayerLevel(player.userId)
        if (missionCfg.pre_playerLevel && level < missionCfg.pre_playerLevel) return false;//等级不够
        //保存任务接取状态
        let result = DataCenterS.getData(player, MissionData).takeMission(missionId);
        //接取了交互任务 开始监听对应的交互事件
        if (result && missionCfg.targetType == "useInteractItem") {
            this.getClient(player).net_listenInteractMission(missionId);
        }
    }

    /**完成任务 */
    public async net_completeMission(missionId: number) {
        let dataHelper = this.currentData;
        let player = this.currentPlayer
        let missionCfg = GameConfig.Mission.getElement(missionId);
        if (!missionCfg) return false;
        if (missionCfg.isDiscard) return false;//这个任务被废弃了
        //检查任务达成条件
        let progress = await MissionCondition.ins.checkCondition(missionCfg, player);
        if (progress[0] < progress[1]) return false;//未达成条件
        //保存任务完成状态
        let result = dataHelper.completeMission(missionId);
        //发放任务奖励
        if (result && missionCfg.reward) {
            if (missionCfg.reward) this.getReward(missionCfg.reward, player)
            //自动接取系列任务
            if (missionCfg.autoGetMissionID) {
                this.net_takeMission(missionCfg.autoGetMissionID, player.playerId)
            }
        }
        return result
    }

    /** 作弊完成一个任务 */
    public cheatCompleteMission(player: Player, missionId: number) {
        if (!SystemUtil.isPIE) {
            return;
        }
        let missionCfg = GameConfig.Mission.getElement(missionId);
        if (!missionCfg) return false;
        if (missionCfg.isDiscard) return false;//这个任务被废弃了
        const dataHelper = this.getPlayerData(player);
        let result = dataHelper.completeMission(missionId);
        //发放任务奖励
        if (result && missionCfg.reward) {
            if (missionCfg.reward) this.getReward(missionCfg.reward, player)
            //自动接取系列任务
            if (missionCfg.autoGetMissionID) {
                this.net_takeMission(missionCfg.autoGetMissionID, player.playerId)
            }
        }
        return result
    }

    /**记录玩家拍照数据 */
    public net_savePhotoData(data: PhotoData[]) {
        data.forEach(e => {
            this.currentData.updatePhotoData(e.tag, e.distance)
        })
    }

    /**开始计算玩家存活时间 */
    public net_surviveTime() {
        let index = this.survivePlayer.findIndex(p => p.playerId == this.currentPlayerId);
        if (-1 == index) this.survivePlayer.push(this.currentPlayer);
    }

    /**领取活跃度奖励 */
    public net_GetDailyReward(activeId: number) {
        let cfg = GameConfig.ActiveValue.getElement(activeId);
        if (!cfg) return false;
        if (this.currentData.activeValue < cfg.id) return false;//活跃度不够
        let result = this.currentData.saveActiveReward(activeId);
        if (result) {
            if (cfg.rewards) this.getReward(cfg.rewards, this.currentPlayer)
        }
    }

    /**保存交互数据 */
    public net_saveInteractData(gameTheme: string, guid: string, eventName: string) {
        this.currentData.updateInteractData(gameTheme, guid, eventName)
    }

    /**获取奖励 */
    public getReward(rewardList: number[][], player: mw.Player) {
        rewardList.forEach(e => {
            let value = e[0]//奖励内容
            let count = e[1]//奖励数量
            switch (value) {
                case 10201://经验值
                    RouteDataHelper.reqSetData(player.userId, EGameTheme.Hall, [RouteDataType.TotalExp], [count]);
                    AchieveService.getAchieveIns(EAchieveType.PlayerLevel).listen(player.userId);
                    this.getClient(player).net_playFlyAni(false);
                    break;
                case 10202://鬼魅值
                    ModuleService.getModule(IDCardModuleS).net_addCharmVal(player.userId, count)
                    this.getClient(player).net_playFlyAni(true);
                    break;
                case 10203://活跃度
                    DataCenterS.getData(player, MissionData).updateActiveValue(count);
                    break;
                default://其他道具
                    BagDefine.AddItem(player.playerId, value, "", "", count, false);
            }
        })
    }

    /**玩家死亡停止计时 */
    public playerDead(player: mw.Player) {
        let index = this.survivePlayer.findIndex(p => p.playerId == player.playerId)
        if (-1 != index) this.survivePlayer.splice(index, 1);
    }
}