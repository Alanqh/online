/*
 * @Author       : dal
 * @Date         : 2023-12-21 19:15:24
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-06 16:14:39
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\procedure\ui\GlobalDataHelper.ts
 * @Description  : 
 */

import { EGameTheme, GamesStartDefines, SubGameThemeArr } from "../../../Defines";
import RouteConst from "../../route/RouteConst";

export default class GlobalDataHelper {

    private constructor() { };

    private static getOldKey(degree: number) {
        return `ScarySchool_Procedure_${degree}`;
    }

    private static getNewKey(degree: number, gameTheme?: EGameTheme) {
        return `${gameTheme ? gameTheme : GamesStartDefines.gameTheme}_PassTimes_${degree}`;
    }

    /** 管理员去调用一次就迁移了 */
    public static async migrate() {
        if (SystemUtil.isPIE) { return; }
        console.error(`DEBUG MyTypeError>>> 开始迁移通关次数数据`);
        await SubGameThemeArr.forEach(async (v) => {
            for (let index = 1; index <= 5; index++) {
                let dataRes = await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(v), this.getOldKey(index));
                let data = dataRes.data as number;
                if (data) {
                    DataStorage.asyncSetData(this.getNewKey(index, v), data);
                    console.log(`DEBUG>>> 通关次数${index}数据迁移完成 ${JSON.stringify(data)}`);
                }
            }
        });
        console.error(`DEBUG MyTypeError>>> 通关次数数据迁移完成`);
    }

    /** 添加通过人数 */
    public static async addPassNum(degree: number) {
        let key = this.getNewKey(degree);
        let passNum = await this.getPassNum(degree);
        passNum++;
        await DataStorage.asyncSetData(key, passNum);
    }

    /** 获取通过人数 */
    public static async getPassNum(degree: number): Promise<number> {
        let key = this.getNewKey(degree);
        let dataRes = await DataStorage.asyncGetData(key);
        if (!dataRes.data) { return 0; }
        return dataRes.data;
    }
}