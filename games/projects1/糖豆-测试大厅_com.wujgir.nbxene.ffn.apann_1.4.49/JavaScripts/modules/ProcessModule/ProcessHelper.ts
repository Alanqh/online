/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-08 18:49:31
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-06-12 09:57:12
 * @FilePath     : \stumbleguys\JavaScripts\modules\ProcessModule\ProcessHelper.ts
 * @Description  : 流程模块helper
 */

import { SceneJumpService } from "../../modScene/SceneJumpMgr";

export namespace ProcessHelper {

    /**
     * 跳转到新游戏
     * @param sceneName 游戏id
     * @param users 玩家列表
     * @param data 数据
     */
    export function enterNewGame(sceneName: string, users: string[], data: any): void {
        SceneJumpService.jumpToScene(users, sceneName, data);

        // RouteService.requestGameId(sceneName.toString()).then(longId => {
        //     RouteService.enterNewGameByTeam(longId, users, data).catch(() => {
        //         setTimeout(() => {
        //             enterNewGame(sceneName, users, data);
        //         }, 10000);
        //     });
        // }).catch(() => {
        //     setTimeout(() => {
        //         enterNewGame(sceneName, users, data);
        //     }, 10000);
        // });
    }

    /**
     * 单人跳转到新游戏
     * @param sceneName 目标游戏 MGSID
     * @param data 要携带的数据
     */
    export function enterGameClient(userid: string, sceneName: string, data: any): void {
        SceneJumpService.jumpToScene([userid], sceneName, data);
        // if (SystemUtil.isClient()) {
        //     RouteService.requestGameId(sceneName).then(longId => {
        //         console.log("单人发起跳转", longId, "jsonData", JSON.stringify(data));
        //         setInterval(() => {
        //             RouteService.enterNewGame(longId, data);
        //         }, 10000)
        //         RouteService.enterNewGame(longId, data);
        //     }).catch(() => {
        //         setTimeout(() => {
        //             enterGameClient(sceneName, data);
        //         }, 10000);
        //     });
        // }
    }
    export function getPlayerId(userId: string): number {
        const player = Player.getAllPlayers().find(i => i.userId == userId);
        return player ? player.playerId : 0;
    }
    export function getUserId(player: mw.Player): string {
        return player['getUserId']();
    }
    export function getPlayerByUid(userId: string) {
        const player = Player.getAllPlayers().find(i => i.userId == userId);
        return player
    }

}