/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-09 16:22:45
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-10 21:22:58
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\mission\MissionCondition.ts
 * @Description  : 
 */

import { IMissionElement } from "../../../config/Mission"
import { MapEx } from "../../utils/MapEx"
import MissionData from "./MissionData"
const ALL: string = "ALL"

export class MissionCondition {

    public static ins = new MissionCondition()

    public checkCondition(mission: IMissionElement, player?: mw.Player) {
        return this[mission.targetType](mission, player)
    }

    /**通关游戏 */
    public passLevel(mission: IMissionElement, player: mw.Player) {
        let gameTheme = mission.targetPara[0]//游戏名
        let diff = Number(mission.targetPara[1])//难度
        let count = Number(mission.targetPara[2])//通关次数
        let totalNumber = 0//计算通关次数
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, count]
        switch (gameTheme) {
            case ALL:
                MapEx.forEach(data.mapNumberArray, (key, v) => {
                    totalNumber += v.length;
                })
                break;
            default:
                let list = MapEx.get(data.mapNumberArray, gameTheme) ?? [];
                list.forEach(e => {
                    if (e >= diff) totalNumber++;
                })
        }
        return [totalNumber, count]
    }

    /**
     * 拍照
     * @param param 
     * @param player 
     */
    public takePhoto(mission: IMissionElement, player: mw.Player) {
        let monsterName = mission.targetPara[0];//怪物tag
        let distance = Number(mission.targetPara[1]);//距离
        let count = mission.targetPara[2]//次数
        let totalNumber = 0;
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, count]
        if (monsterName == ALL) {
            MapEx.forEach(data.mapNumberArray, (k, v) => {
                if (distance == -1) {
                    totalNumber += v.length
                } else {
                    v.forEach(d => {
                        if (d <= distance) totalNumber++
                    })
                }
            })
        } else {
            let list = MapEx.get(data.mapNumberArray, monsterName) ?? []
            if (distance == -1) {
                totalNumber = list.length;
            } else {
                totalNumber = list.filter(e => { return e <= distance }).length;
            }
        }
        return [totalNumber, count]
    }

    /**找到道具 */
    public findItem(mission: IMissionElement, player: mw.Player) {
        let gameName = mission.targetPara[0];
        let findId = Number(mission.targetPara[1]);
        let count = Number(mission.targetPara[2]);
        let totalNumber = 0;
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, count]
        if (gameName == ALL) {
            MapEx.forEach(data.mapNumberArray, (k, v) => {
                totalNumber += v.filter(id => { return id == findId }).length
            })
        } else {
            let array = MapEx.get(data.mapNumberArray, gameName) ?? [];
            totalNumber = array.filter(id => { return id == findId }).length;
        }

        return [totalNumber, count]
    }

    /**使用交互物 */
    public useInteractItem(mission: IMissionElement, player: mw.Player) {
        let gameName = mission.targetPara[0];
        let guid = mission.targetPara[1];
        let eventName = mission.targetPara[2];
        let count = Number(mission.targetPara[3]);
        let totalNumber = 0
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, count]
        if (gameName == ALL && guid != ALL) {
            totalNumber = data.arrayString.filter(e => { return e.includes(guid) && e.includes(eventName) }).length;
        } else if (gameName != ALL && guid == ALL) {
            totalNumber = data.arrayString.filter(e => { return e.includes(gameName) && e.includes(eventName) }).length;
        } else if (gameName == ALL && guid == ALL) {
            totalNumber = data.arrayString.filter(e => { return e.includes(eventName) }).length;
        } else {
            totalNumber = data.arrayString.filter(e => { return e == `${gameName}_${guid}_${eventName}` }).length;
        }
        return [totalNumber, count]
    }

    /**登录游戏 */
    public loginGame(mission: IMissionElement, player: mw.Player) {
        let gameName = mission.targetPara[0];
        let count = Number(mission.targetPara[1]);
        let totalNumber = 0;
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, count]
        if (gameName == ALL) {
            MapEx.forEach(data.mapNumber, (k, v) => { totalNumber += v })
        } else {
            totalNumber = MapEx.get(data.mapNumber, gameName) ?? 0
        }
        return [totalNumber, count]
    }


    /**存活时间 */
    public survive(mission: IMissionElement, player: mw.Player) {
        let gameName = mission.targetPara[0];
        let time = mission.targetPara[1];
        let totalNumber = 0;
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, time]
        if (gameName == ALL) {
            MapEx.forEach(data.mapNumber, (k, v) => { totalNumber += v })
        } else {
            totalNumber = MapEx.get(data.mapNumber, gameName) ?? 0
        }
        return [totalNumber, time]
    }

    /**达成结局 */
    public ending(mission: IMissionElement, player: mw.Player) {
        let gameName = mission.targetPara[0];
        let resultId = Number(mission.targetPara[1]);
        let count = Number(mission.targetPara[2]);
        let totalNumber = 0
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, count]
        if (gameName == ALL) {
            MapEx.forEach(data.mapNumberArray, (k, v) => {
                totalNumber += v.length;
            })
        } else {
            let endingArray = MapEx.get(data.mapNumberArray, gameName) ?? []
            endingArray.forEach(v => { if (v == resultId) totalNumber++ })
        }
        return [totalNumber, count]
    }

    /**购买物品 */
    public buyItem(mission: IMissionElement, player: mw.Player) {
        let totalCount = Number(mission.targetPara[1]);
        let itemID = mission.targetPara[0]//道具id
        let totalNumber = 0//统计已经购买的数量
        let data = this.getData(mission.id, player)
        if (!data) return [totalNumber, totalCount]
        if (itemID == ALL) {
            MapEx.forEach(data.mapNumber, (k, v) => { totalNumber += v })
        } else {
            totalNumber = MapEx.get(data.mapNumber, Number(itemID)) ?? 0
        }
        return [totalNumber, totalCount];

    }

    /**点赞赠送 */
    public like(mission: IMissionElement, player: mw.Player) {
        let type = Number(mission.targetPara[0]);
        let count = Number(mission.targetPara[1]);
        let data = this.getData(mission.id, player)
        if (!data) return [0, count]
        let totalNumber = MapEx.get(data.mapNumber, type) ?? 0
        return [totalNumber, count]
    }

    /**抓捕伪人 */
    public captureFaker(mission: IMissionElement, player: mw.Player) {
        let captureTimes = Number(mission.targetPara[0]);
        let data = this.getData(mission.id, player)
        if (!data) return [0, captureTimes]
        return [data.count, captureTimes]
    }

    /**在线时长 */
    public online(mission: IMissionElement, player: mw.Player) {
        let time = Number(mission.targetPara[0])
        let data = this.getData(mission.id, player)
        if (!data) return [0, time]
        let min = Math.floor(data.count / 60)
        return [min, time]
    }

    /**使用道具 */
    public useItem(mission: IMissionElement, player: mw.Player) {
        let itemId = mission.targetPara[0];
        let count = Number(mission.targetPara[1]);
        let data = this.getData(mission.id, player);
        if (!data) return [0, count]
        let totalNumber = 0
        if (itemId == ALL) {
            MapEx.forEach(data.mapNumber, (k, v) => { totalNumber += v })
        } else {
            totalNumber = MapEx.get(data.mapNumber, Number(itemId)) ?? 0
        }
        return [totalNumber, count]
    }

    public costFearCoin(mission: IMissionElement, player: mw.Player) {
        let count = Number(mission.targetPara[0]);
        let data = this.getData(mission.id, player);
        if (!data) return [0, count]
        return [data.count, count]
    }

    public getRecord(player: mw.Player) {
        if (SystemUtil.isClient()) {
            return DataCenterC.getData(MissionData)
        } else {
            return DataCenterS.getData(player, MissionData)
        }

    }

    public getData(missionId: number, player: mw.Player) {
        let record = this.getRecord(player)
        let data = MapEx.get(record.missionData, missionId)
        return data;
    }

}