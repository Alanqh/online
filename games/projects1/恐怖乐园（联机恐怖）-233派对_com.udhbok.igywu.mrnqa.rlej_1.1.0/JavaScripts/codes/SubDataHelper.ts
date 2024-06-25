import { NewPlayerRankData } from "./modules/globalRankNew/NewPlayerRankData";
import { EBaseRankDataType } from "./modules/globalRankNew/NewRankDefine";
import { NewRankModuleS } from "./modules/globalRankNew/NewRankModuleS";
import RecordData from "./modules/record/RecordData";

export default class SubDataHelper {

    private static _instance: SubDataHelper = new SubDataHelper();

    private constructor() { };

    public static get ins() {
        return this._instance;
    }

    /**
     * 保存 全服 被赞 / 收礼 记录 次数
     * @param type -1 是点赞 -2 是所有礼物
     * @param deltaCount 改变值
     */
    public saveGlobalReceiveGiftTimes(userId: string, data: RecordData, type: number, deltaCount: number) {
        // 玩家在同一个房间的情况下
        if (Player.getPlayer(userId) && DataCenterS.getData(userId, RecordData)) {
            DataCenterS.getData(userId, RecordData).saveReceiveGiftTimes(type, deltaCount);
            return;
        }

        if (type === -1) {
            data.baseRecordInfo.receiveGiftTimes[0] += deltaCount;
        } else {
            data.baseRecordInfo.receiveGiftTimes[1] += deltaCount;
        }
        RecordData.setGlobalData(userId, data);
    }


    /**
     * 保存全服的某个玩家的排行信息
     * @param type 类型
     * @param dataVal 值 
     */
    public saveGlobalRankInfo(userId: string, data: NewPlayerRankData, type: EBaseRankDataType, dataVal: number) {
        if (SystemUtil.isClient()) { return; }
        // 玩家在同一个房间的情况下
        if (Player.getPlayer(userId) && DataCenterS.getData(userId, NewPlayerRankData)) {
            DataCenterS.getData(userId, NewPlayerRankData).saveRankInfo(type, dataVal);
            return;
        }
        if (dataVal == data.baseRankInfo[type]) { return; }
        // 不能比之前的值小
        if (dataVal < data.baseRankInfo[type]) {
            console.error(`DEBUG MyTypeError>>> 设置新的排行榜数据失败，不能比之前的数据${JSON.stringify(data.baseRankInfo)}小, type: ${type} dataVal: ${dataVal}`);
            return;
        }
        data.baseRankInfo[type] = dataVal;
        NewPlayerRankData.setGlobalData(userId, data);
        // 检查更新一下全服排行榜
        ModuleService.getModule(NewRankModuleS).updateGlobalRankInfo(userId, type, dataVal);
    }
}