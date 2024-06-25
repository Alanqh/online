import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { MapEx } from "../../utils/MapEx";

export class PoolScoreData {
    public scoreMap: MapEx.MapExClass<number> = {};
}

export class HomeData {
    public lv: number = 0;
}

export class PoolScoreHelper {
    public static async getPoolScoreData(userId: string): Promise<PoolScoreData> {
        const dataKey = `PoolScore_${userId}`;
        let res = await DataStorage.asyncGetData(dataKey);
        if (!res.data && res.code == mw.DataStorageResultCode.Success) {
            res.data = new PoolScoreData();
        }
        return res.data;
    }

    public static async setPoolScoreData(userId: string, data: PoolScoreData) {
        const dataKey = `PoolScore_${userId}`;
        let res = await DataStorage.asyncSetData(dataKey, data);
        console.error("设置结果PoolScore" + res)
    }

    public static async SetHomeLevelData(lv: HomeData, userId: string) {
        const dataKey = `HomeData_${userId}`;
        let res = await DataStorage.asyncSetData(dataKey, lv);
        console.error("设置结果Home" + res)
    }

    public static async getHomeLevel(userId: string): Promise<HomeData> {
        const dataKey = `HomeData_${userId}`;
        return (await DataStorage.asyncGetData(dataKey)).data;
    }
}

