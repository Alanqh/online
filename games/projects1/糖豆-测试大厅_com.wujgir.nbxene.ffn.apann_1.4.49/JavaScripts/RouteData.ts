/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-23 19:20:44
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-08-03 13:15:08
 * @FilePath     : \stumbleguys\JavaScripts\RouteData.ts
 * @Description  : 修改描述
 */
/**
 * 跳转到小游戏携带的数据
 */
export class RouteDataGame {
    /**玩家信息 */
    player: { skinId: number, garnitureId: number, seat: number, firstRank: number, finalRank: number };
    /**回合数 */
    round: number;
    /**AI列表 */
    aiList: AIData[];
    /**大厅ID */
    squareId: number;
    /**决赛ID */
    finalId: number;
}
export type AIData = { name: string, skinId: number, garnitureId: number, seat: number, isWin: boolean, title: string };
