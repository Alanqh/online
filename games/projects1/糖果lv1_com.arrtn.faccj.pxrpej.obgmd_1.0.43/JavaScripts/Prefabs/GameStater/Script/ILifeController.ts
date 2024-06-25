/** 
 * @Author       : lei.zhao
 * @Date         : 2023-07-13 16:02:26
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-03 11:11:38
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GameStater\Script\ILifeController.ts
 * @Description  : 修改描述
 */
import { Player } from "./data/Player";
import { LifeState } from "./LifeState";

export interface ILifeController {
    passTime: number;
    /**
     * 设置状态，服务端调用
     * @param state 
     */
    setState(state: LifeState);
    broadcast(key: string, ...args: any[]);
    getWinner();
    state: LifeState;

    config: GameConfig;
    serverData: any;

    /**
     * 所有玩家都到终点
     */
    isFinish: boolean;

    teamId: string;
    players: Player[];
}

export type GameConfig = {/* load条时长 */
    loadTime: number;
    /* 俯瞰时长 */
    overlookTime: number;
    /* 倒计时时间 */
    countDownTime: number;
    /* 本局游戏最大时间 */
    gameTime: number;
    /* 游戏结束UI显示时间 */
    gameEndTime: number;
    /* 淘汰结算时间 */
    resultTime: number;
    /* 选图时间 */
    chooseMapTime: number;
};