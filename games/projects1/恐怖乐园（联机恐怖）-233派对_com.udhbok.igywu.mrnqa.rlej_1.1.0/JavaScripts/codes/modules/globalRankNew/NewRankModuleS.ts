/*
 * @Author       : dal
 * @Date         : 2024-05-24 14:04:24
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-05 16:25:49
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\NewRankModuleS.ts
 * @Description  : 
 */
import { BaseInfo } from "../idcard/IDCardConst";
import { IDCardDataHelper } from "../idcard/IDCardDataHelper";
import { NewPlayerRankData } from "./NewPlayerRankData";
import NewRankData, { NewRankDataInfoBase } from "./NewRankData";
import { EBaseRankDataType, NewRankDefine } from "./NewRankDefine";
import { NewRankModuleC } from "./NewRankModuleC";

/**
 * GlobalRank模块Server端
 */
export class NewRankModuleS extends ModuleS<NewRankModuleC, NewPlayerRankData> {

    protected onPlayerEnterGame(player: mw.Player): void {
        this.getPlayerData(player)?.syncData();
    }

    /**
     * 获取玩家的基础信息数组
     * @param userIdArr 需要一个排行在前三得玩家userId数组
     */
    public async net_getUserBaseInfoArr(userIdArr: string[]) {
        let tempArr: BaseInfo[] = [];
        for (const v of userIdArr) {
            const data = await IDCardDataHelper.reqGetData(v);
            tempArr.push(data.baseInfo);
        }
        return tempArr;
    }

    /** 缓存的数据实例 */
    private dataMap: Map<EBaseRankDataType, NewRankData<any>> = new Map();

    protected override onAwake(): void {
        super.onAwake();
        NewRankDefine.rankTypeArr.forEach((rankType) => { this.createDataScript(rankType); });
    }

    protected onStart(): void {
    }

    protected onPlayerJoined(player: mw.Player): void {
    }

    /** 生成数据脚本 */
    private async createDataScript(key: EBaseRankDataType) {
        const script = await Script.spawnScript(NewRankData, true);
        // 初始化各种难度的全服排行榜脚本
        script.server_init(key);
        this.dataMap.set(key, script);
    }

    /**
     * 更新在全服排行榜中的数据
     * @param userId 
     * @param type 类型
     * @param dataVal 数值
     */
    public async updateGlobalRankInfo(userId: string, type: EBaseRankDataType, dataVal: number) {
        const player = Player.getPlayer(userId);
        let nickName;
        // 玩家不在线上-去IDCardData看看有没
        if (!player) {
            const data = await IDCardDataHelper.reqGetData(userId);
            nickName = data.baseInfo.n;
        } else {
            if (SystemUtil.isPIE) {
                nickName = player.character.displayName;
            } else {
                nickName = player["nickname"];
            }
        }
        if (StringUtil.isEmpty(nickName)) {
            const data = await IDCardDataHelper.reqGetData(userId);
            nickName = data.baseInfo.n;
        }
        this.dataMap.get(type).setData({
            i: userId,
            n: nickName,
            v: dataVal,
        });
    }

    /**
     * 因为后五十名的数据太多了同步不到客户端，所以rpc拿自己的排名
     * @param type 类型
     * @param userId userId
     * @returns 一个数组，第一个元素是排名，第二个元素是分数
     */
    public net_reqGetSelfRankInfo(type: EBaseRankDataType, userId: string): number[] {
        const rankId = this.dataMap.get(type).getDataArray()
            .filter((v: NewRankDataInfoBase) => { return !NewRankDefine.BlackList.includes(v.i) })
            .findIndex((v: NewRankDataInfoBase) => { return userId === v.i; });
        return [rankId + 1, this.currentData.baseRankInfo[type]];
    }

    /** 每当玩家下线 */
    protected onPlayerLeft(player: mw.Player): void {
        if (Player.getAllPlayers().length <= 1) {
            this.dataMap.forEach(data => { data.forceUpdateData(); });
        }
    }
}