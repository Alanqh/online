/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-08 13:54:57
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2024-05-17 18:06:12
 * @FilePath: \1001_hall\JavaScripts\codes\modules\mission\MissionData.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { MapEx } from "../../utils/MapEx";
import { GhostTraceHelper } from "../../utils/TraceHelper";

export type TMissionData = {
    arrayString?: string[]
    count?: number,
    mapNumber?: MapEx.MapExClass<number>,
    mapNumberArray?: MapEx.MapExClass<number[]>,
}

export default class MissionData extends Subdata {

    static dataChangeAction: Action = new Action()
    static curPlayer: mw.Player;
    /**时间戳 */
    @Decorator.persistence()
    timeStamp: number;
    /**进行中的任务 */
    @Decorator.persistence()
    onGoingMission: number[] = [];

    /**已经完成的任务 */
    @Decorator.persistence()
    completedMission: number[] = [];

    /**每日活跃值 */
    @Decorator.persistence()
    activeValue: number = 0;

    @Decorator.persistence()
    missionData: MapEx.MapExClass<TMissionData> = {};

    /**当日领取的活越奖励 */
    @Decorator.persistence()
    activeReward: number[] = []

    /**监听活跃值变化 */
    onActiveValueChange: Action1<number> = new Action1()

    /**接取任务监听 */
    onMissionTaken: Action1<number> = new Action1();

    /**完成任务监听 */
    onMissionComplete: Action1<number> = new Action1();

    private syncDataRpc(functionName: string, ...params: any) {
        let player = this[`ownerPlayer`]
        if (SystemUtil.isServer() && player) {
            Event.dispatchToClient(player, "evt_syncMissionData", functionName, ...params)
        }
    }

    protected onDataInit(): void {

        let index = this.onGoingMission.indexOf(1001)
        if (index != -1) this.onGoingMission.splice(index, 1)

        if (SystemUtil.isClient()) {
            Event.addServerListener("evt_syncMissionData", (functionName: string, ...param: any) => {
                console.error("functionName : " + functionName);

                this[functionName] && this[functionName](...param)
                if (functionName == "takeMission") {
                    GhostTraceHelper.uploadMGS("ts_game_over", "任务接取", {
                        round_id: 700,
                        disaster_id: param[0]
                    })
                }
                if (functionName == "completeMission") {
                    const missionId = param[0]
                    const mission = GameConfig.Mission.getElement(missionId);
                    let activeVal = mission.reward.find(e => {
                        return e[0] == 10203;
                    })
                    GhostTraceHelper.uploadMGS("ts_game_over", "任务完成", {
                        round_id: 701,
                        disaster_id: missionId,
                        totalnum: mission.missionType,
                        tower_broken: activeVal ? activeVal[1] : null
                    })
                }
                if (functionName == "saveActiveReward") {
                    GhostTraceHelper.uploadMGS("ts_game_over", "活跃值奖励领取", {
                        round_id: 702,
                        disaster_id: param[0]
                    })
                }
            })
        }
        this.save(false)

    }
    /**接取任务 */
    public takeMission(missionId: number) {
        if (-1 == this.onGoingMission.indexOf(missionId) && !this.isCompleted(missionId)) {
            this.onGoingMission.push(missionId);
            //初始化任务数据
            this.save(false)
            this.onMissionTaken.call(missionId);
            this.syncDataRpc("takeMission", missionId)
            return true
        }
        return false;
    }
    /**完成任务 */
    public completeMission(missionId: number) {
        let index = this.onGoingMission.indexOf(missionId);
        if (-1 == index) return false//没有接取这个任务
        this.onGoingMission.splice(index, 1);
        this.completedMission.push(missionId);
        if (MapEx.has(this.missionData, missionId)) {//完成了就把任务数据删了
            MapEx.del(this.missionData, missionId)
        }
        this.save(false);
        this.onMissionComplete.call(missionId);
        this.syncDataRpc("completeMission", missionId)
        return true
    }

    public isCompleted(missionId: number) {
        return this.completedMission.indexOf(missionId) != -1
    }

    public saveActiveReward(activeId: number) {
        if (-1 == this.activeReward.indexOf(activeId)) {
            this.activeReward.push(activeId);
            this.save(false);
            this.syncDataRpc("saveActiveReward", activeId)
            return true
        }
        return false;
    }

    public isAlreadyGetActiveReward(activeId: number) {
        return this.activeReward.indexOf(activeId) != -1
    }

    public updateActiveValue(val: number) {
        this.activeValue += val;
        this.save(false)
        this.onActiveValueChange.call(this.activeValue);
        this.syncDataRpc("updateActiveValue", val)
    }

    private checkTime(name: string, callback: () => void) {

        let start = Date.now();
        callback();
        let end = Date.now();
        console.error(name + "   执行时间：" + (end - start) + "ms");

    }

    public updateOnlineTime() {

        this.checkTime("updateMis", () => {
            this.onGoingMission.forEach(missionId => {
                let mission = GameConfig.Mission.getElement(missionId)
                if (mission && mission.targetType == "online") {
                    let data = MapEx.get(this.missionData, missionId)
                    if (data) {
                        data.count += 5
                        MapEx.set(this.missionData, missionId, data)
                    } else {
                        MapEx.set(this.missionData, missionId, { count: 5 })
                    }

                }
            })
        })

        this.save(false);
        this.checkTime("onDataChange", () => {
            this.onDataChange.call()
        });

        this.syncDataRpc("updateOnlineTime")
    }

    public updatePassInfo(gameTheme: string, diff: number) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "passLevel") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let diffList = MapEx.get(data.mapNumberArray, gameTheme) ?? []
                    diffList.push(diff)
                    MapEx.set(data.mapNumberArray, gameTheme, diffList)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number[]> = {}
                    MapEx.set(map, gameTheme, [diff])
                    MapEx.set(this.missionData, missionId, { mapNumberArray: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updatePassInfo", gameTheme, diff)
    }

    /**
    * 保存购买数据
    * @param itemID 道具id 
    * @param count 购买数量
    */
    public updateBuyData(itemID: number, count: number) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "buyItem") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let itemCount = MapEx.get(data.mapNumber, itemID) ?? 0
                    itemCount += count
                    MapEx.set(data.mapNumber, itemID, itemCount)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number> = {};
                    MapEx.set(map, itemID, count)
                    MapEx.set(this.missionData, missionId, { mapNumber: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateBuyData", itemID, count)
    }

    public updateCaptureFaker() {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "captureFaker") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    data.count++
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    MapEx.set(this.missionData, missionId, { count: 1 })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateCaptureFaker")
    }

    public updateUseItemCount(itemId: number, count: number) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "useItem") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let itemCount = MapEx.get(data.mapNumber, itemId) ?? 0
                    itemCount += count
                    MapEx.set(data.mapNumber, itemId, itemCount)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number> = {};
                    MapEx.set(map, itemId, count)
                    MapEx.set(this.missionData, missionId, { mapNumber: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateUseItemCount", itemId, count)
    }

    public updatePhotoData(monsterName: string, distance: number) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "takePhoto") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let distanceArray = MapEx.get(data.mapNumberArray, monsterName) ?? [];
                    distanceArray.push(distance)
                    MapEx.set(data.mapNumberArray, monsterName, distanceArray)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number[]> = {}
                    MapEx.set(map, monsterName, [distance])
                    MapEx.set(this.missionData, missionId, { mapNumberArray: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updatePhotoData", monsterName, distance)
    }

    /**
    * 保存登录游戏次数
    * @param gameTheme 
    */
    public updateLoginData(gameTheme: string) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "loginGame") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let loginTime = MapEx.get(data.mapNumber, gameTheme) ?? 0
                    loginTime++;
                    MapEx.set(data.mapNumber, gameTheme, loginTime)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number> = {}
                    MapEx.set(map, gameTheme, 1)
                    MapEx.set(this.missionData, missionId, { mapNumber: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateLoginData", gameTheme)
    }

    /**
     * 更新游戏存活时间
     */
    public updateSurviveTime(gameTheme: string) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "survive") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let surviveTime = MapEx.get(data.mapNumber, gameTheme) ?? 0
                    surviveTime += 5
                    MapEx.set(data.mapNumber, gameTheme, surviveTime)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number> = {}
                    MapEx.set(map, gameTheme, 5)
                    MapEx.set(this.missionData, missionId, { mapNumber: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateSurviveTime", gameTheme)
    }

    /**
     * 更新游戏结局
     * @param gameTheme 
     * @param endingId 
     */
    updateEnding(gameTheme: string, endingId: number) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "ending") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let endingArray = MapEx.get(data.mapNumberArray, gameTheme) ?? [];
                    endingArray.push(endingId)
                    MapEx.set(data.mapNumberArray, gameTheme, endingArray)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number[]> = {}
                    MapEx.set(map, gameTheme, [endingId])
                    MapEx.set(this.missionData, missionId, { mapNumberArray: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateEnding", gameTheme, endingId)
    }

    /**
     * 更新点赞送礼进度
     */
    updateLikeData(giftID: number, count: number = 1) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "like") {
                let data = MapEx.get(this.missionData, missionId)
                let key = giftID == 0 ? 0 : 1
                let delta = giftID == 0 ? 1 : count
                if (data) {
                    let val = MapEx.get(data.mapNumber, key) ?? 0;
                    val += delta;
                    MapEx.set(data.mapNumber, key, val)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number> = {}
                    MapEx.set(map, key, count)
                    MapEx.set(this.missionData, missionId, { mapNumber: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateLikeData", giftID, count)
    }

    /**更新花费恐惧币任务进度 */
    updateCostFearCoin(cost: number) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "costFearCoin") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    data.count += cost
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    MapEx.set(this.missionData, missionId, { count: cost })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateCostFearCoin", cost)
    }

    /**更新交互数据 */
    updateInteractData(gameTheme: string, guid: string, eventName: string) {
        let str = `${gameTheme}_${guid}_${eventName}`
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "useInteractItem") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    data.arrayString.push(str)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    MapEx.set(this.missionData, missionId, { arrayString: [str] })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateInteractData", gameTheme, guid, eventName)
    }

    /**更新find任务进度 */
    updateFindData(gameTheme: string, findId: number) {
        this.onGoingMission.forEach(missionId => {
            let mission = GameConfig.Mission.getElement(missionId)
            if (mission && mission.targetType == "findItem") {
                let data = MapEx.get(this.missionData, missionId)
                if (data) {
                    let array = MapEx.get(data.mapNumberArray, gameTheme) ?? []
                    array.push(findId)
                    MapEx.set(data.mapNumberArray, gameTheme, array)
                    MapEx.set(this.missionData, missionId, data)
                } else {
                    let map: MapEx.MapExClass<number[]> = {}
                    MapEx.set(map, gameTheme, [1])
                    MapEx.set(this.missionData, missionId, { mapNumberArray: map })
                }
            }
        })
        this.save(false);
        this.onDataChange.call()
        this.syncDataRpc("updateFindData", gameTheme, findId)
    }

    /**重置每日任务 */
    public resetDailyMission() {
        let date = new Date().getDate()
        if (!this.timeStamp || this.timeStamp != date) {
            this.timeStamp = date;
            this.activeValue = 0;
            this.activeReward.length = 0;
            GameConfig.Mission.getAllElement().filter(e => { return e.missionType == 2 }).forEach(m => {
                if (MapEx.has(this.missionData, m.id)) {
                    MapEx.del(this.missionData, m.id)
                }
                let index = this.completedMission.indexOf(m.id)
                if (-1 != index) this.completedMission.splice(index, 1)
            })
            this.save(true);
            this.onDataChange.call()
        }
    }

}