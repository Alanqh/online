/*
 * @Author: ao001.wu ao001.wu@appshahe.com
 * @Date: 2023-03-19 13:19:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-08-19 19:58:43
 * @FilePath: \RPCDemo\JavaScripts\RankMgr.ts
 * @Description: 
 */

import mydata from "../mydata"

export class RankMgr {
    // 单例模式
    private static _instance: RankMgr
    public static get Instance() {
        if (RankMgr._instance == null) {
            RankMgr._instance = new RankMgr()
        }
        return RankMgr._instance
    }

    /**判断是否初始化，防止初始化多次 */
    private _isInit = false

    /**维护在服务端的记录当前房间所有玩家分数的列表 */
    private _scoreDataList: { "playerID": string, "nickname": string, "score": number, "s2": number, "s3": number }[] = []

    /**初始化RankMgr */
    initRankMgr() {
        if (this._isInit) { return }

        // 服务端监听玩家上下线
        if (SystemUtil.isServer()) {
            // 玩家上线，向分数列表创建该玩家的分数记录
            Player.onPlayerJoin.add((player: mw.Player) => {
                let uid = this.net_getuid(player)
                this._scoreDataList.push({ "playerID": uid, "nickname": "", "score": 0, "s2": 0, "s3": 0 })
            })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "5", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "5", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "5", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })

            // 玩家下线，将该玩家的分数记录从列表中移除
            Player.onPlayerLeave.add((player: mw.Player) => {
                let index = this.getIndexByPlayerID(this.net_getuid(player))
                if (index != -1) {
                    this._scoreDataList.splice(index, 1);
                }
            })

            // 服务端开启数据自动同步
            this.serverOpenAutoSyncData()
        }
        if (SystemUtil.isClient()) {
            // 监听服务端同步过来的分数
            Event.addServerListener("SyncData", (enCodedataList: string[]) => {
                // 同步到分数后，将分数传给RankUI
                Event.dispatchToLocal("onScoreDataChange", enCodedataList)
            })
        }
        this._isInit = true
    }


    /**服务端开始自动同步数据 */
    private serverOpenAutoSyncData() {
        // 每500毫秒，向所有客户端发送服务端存储的分数列表（！这个同步频率不能太快,如需高频率同步，推荐使用Replicated）
        let syncHandle = setInterval(() => {
            //获取所有玩家//更新玩家的数值
            Player.getAllPlayers().forEach((player: mw.Player) => {
                let Pdata = DataCenterS.getData(player, mydata)
                let nickname:string = player.character.displayName
                nickname = nickname.substring(0, 6)
                let index = this.getIndexByPlayerID(this.net_getuid(player))
                if (Pdata && index != -1) {
                    this._scoreDataList[index].nickname = nickname
                    this._scoreDataList[index].score = Pdata.score
                    this._scoreDataList[index].s2 = Pdata.pro
                    this._scoreDataList[index].s3 = Pdata.reborn
                }
            })
            let enCodeDataList: string[] = []
            for (let data of this._scoreDataList) {
                enCodeDataList.push(this.enCodeScoreData(data))
            }
            Event.dispatchToAllClient("SyncData", enCodeDataList)
        }, 1000)
    }

    /**将数据转化成string类型（方便进行RPC传输） */
    private enCodeScoreData(data: { "playerID": string, "nickname": string, "score": number, "s2": number, "s3": number }) {
        return data.playerID + "_" + data.nickname + "_" + data.score + "_" + data.s2 + "_" + data.s3
    }

    /**通过playerID获取对应数据的index ,下线删除时候用*/
    private getIndexByPlayerID(playerID: string) {
        for (let i = 0; i < this._scoreDataList.length; i++) {
            if (this._scoreDataList[i].playerID == playerID) {
                return i
            }
        }
        return -1
    }
    //获取玩家id
    net_getuid(player: mw.Player): string {
        let uid = player.userId
        return uid
    }
}