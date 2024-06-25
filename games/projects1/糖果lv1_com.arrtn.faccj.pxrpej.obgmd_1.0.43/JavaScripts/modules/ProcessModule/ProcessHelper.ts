/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-08 18:49:31
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-06-12 09:57:12
 * @FilePath     : \stumbleguys\JavaScripts\modules\ProcessModule\ProcessHelper.ts
 * @Description  : 流程模块helper
 */

export namespace ProcessHelper {

    /**
     * 跳转到新游戏
     * @param gameId 游戏id
     * @param playerList 玩家列表
     * @param data 数据
     */
    export function enterNewGame(gameId: string, playerList: string[], data: any): void {
        RouteService.requestGameId(gameId.toString()).then(longId => {
            RouteService.enterNewGameByTeam(longId, playerList, data).catch(() => {
                setTimeout(() => {
                    enterNewGame(gameId, playerList, data);
                }, 10000);
            });
        }).catch(() => {
            setTimeout(() => {
                enterNewGame(gameId, playerList, data);
            }, 10000);
        });
    }

    /**
     * 单人跳转到新游戏
     * @param gameId 目标游戏 MGSID
     * @param data 要携带的数据
     */
    export function enterGameClient(gameId: string, data: any): void {
        if (SystemUtil.isClient()) {
            RouteService.requestGameId(gameId).then(longId => {
                console.log("单人发起跳转", longId, "jsonData", JSON.stringify(data));
                setInterval(() => {
                    RouteService.enterNewGame(longId, data);
                }, 10000)
                RouteService.enterNewGame(longId, data);
            }).catch(() => {
                setTimeout(() => {
                    enterGameClient(gameId, data);
                }, 10000);
            });
        }
    }
    export function getPlayerId(userId: string): number {
        const player = Player.getAllPlayers().find(i => i.userId == userId);
        return player ? player.playerId : 0;
    }
    export function getUserId(player: mw.Player): string {
        return player['getUserId']();
    }

}