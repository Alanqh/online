/*
 * @Author       : dal
 * @Date         : 2024-03-06 17:22:28
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-31 18:30:18
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\buff\BuffData.ts
 * @Description  : 
 */
// buff.ts  

import { EGameTheme, GamesStartDefines } from "../../Defines";
import RouteConst from "../route/RouteConst";

@Serializable
export class Buff {

    /** 类型 */
    @Property({ replicated: true })
    type: number = -1;

    /** 效果值 */
    @Property({ replicated: true })
    value: number = 0;

    /** 持续时间 - 秒 */
    @Property({ replicated: true })
    duration: number = 0;

    /** 开始时间 - 这是一个时间戳 */
    @Property({ replicated: true })
    startTimeStamp: number = Date.now();
}

export class ArchiveBuff {

    /** 配置id */
    cfgId: number = 1;

    /** 持续时间 */
    duration: number = 0;

    /** 生效时间 = 秒 */
    elapse: number = 0;

    /** 定时器id */
    interval: any;
}

export class BuffData {

    /** buff列表 */
    public buffList: Buff[] = [];
}

export class BuffDataHelper {

    private static getKey(userId: string) {
        return `${userId}_BuffData_${EGameTheme.Hall}`;
    }

    public static isSelfGame(gameTheme: EGameTheme) {
        return GamesStartDefines.gameTheme === gameTheme;
    }

    /** 每隔10分钟清理一次或主动清理的存档缓存 */
    private static cacheDataMap: Map<string, BuffData> = new Map();

    public static async reqGetData(userId: string) {
        const key = this.getKey(userId);

        let data: BuffData;

        // 有缓存就拿
        if (this.cacheDataMap.has(key)) {
            data = this.cacheDataMap.get(key);
        }
        // 没有就创建
        else {
            data = await this.getDataFromDB(userId);
            this.cacheDataMap.set(key, data);
            // 创建的时候设置一个延迟销毁的定时器
            setTimeout(() => { if (this.cacheDataMap.has(key)) { this.cacheDataMap.delete(key) } }, 6e5);
        }

        return data;
    }

    private static async getDataFromDB(userId: string) {
        let res: DataStorageResult;
        const key = this.getKey(userId);
        if (SystemUtil.isPIE) {
            res = await DataStorage.asyncGetData(key);
        } else {
            res = await DataStorage.asyncGetData(key)// (GameStart.GameTheme === EGameTheme.Hall) ? await DataStorage.asyncGetData(key) : await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(EGameTheme.Hall), key);
        }
        let data: BuffData;
        if (!res.data) { data = new BuffData(); }
        else { data = res.data; }
        return data;
    }


    public static async reqSaveData(userId: string, dataList: Buff[]): Promise<void> {

        const key = this.getKey(userId);

        // 先拿数据
        const data = await this.reqGetData(userId);

        data.buffList = dataList;

        /** 游戏id - 存到大厅上去哈 */
        let gameId = RouteConst.getGameIdByGameTheme(EGameTheme.Hall);

        if (!SystemUtil.isPIE && StringUtil.isEmpty(gameId)) {
            console.error(`DEBUG ERROR >>> 游戏Id错误 gameId不能为空`);
            return;
        }

        await DataStorage.asyncSetData(key, data);
    }
}