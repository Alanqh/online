/*
 * @Author       : dal
 * @Date         : 2024-05-24 10:34:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-24 10:39:21
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRank\GlobalRankDefine.ts
 * @Description  : 
 */

import { DegreeType } from "../blackboard/BoardDefine";

/**
 * @deprecated 2024.5.4 没维护了，用新全服排行榜数据
 */
export class GlobalRankDefine {

    /** 最多存储长度 */
    public static readonly MaxRankItemSaveLength = 1e3;

    /** 最大显示长度 */
    public static readonly MaxRankItemViewLength = 50;

    /** 服务端多久保存一次数据 */
    public static readonly RankDataSaveTime = 1e4;

    /** 排行榜类型 */
    public static readonly RankDataTypeList: number[] = [DegreeType.Simple, DegreeType.Normal, DegreeType.Difficult, DegreeType.Scary, DegreeType.MaxScary];
}