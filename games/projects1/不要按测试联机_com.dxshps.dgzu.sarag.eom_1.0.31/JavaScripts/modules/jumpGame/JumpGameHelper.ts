import { InGameStatus } from "../../const/Enum";
import PlayerModuleS from "../playerModule/PlayerModuleS";

const waitRetryTime: number = 10;

export class JumpGameHelper {

    /**组队跳游戏
     * @param gameId 游戏id
     * @param playerList 玩家列表
     * @param data 游戏数据
     * @effect 服务端调用
     */
    // public static enterNewGameByTeam(gameId: string, playerList: string[], data?: any) {
    //     RouteService.enterNewGameByTeam(gameId, playerList, data).catch(() => {
    //         setTimeout(() => {
    //             this.enterNewGameByTeam(gameId, playerList, data);
    //         }, waitRetryTime * 1000);
    //     })
    // }
    public static enterNewGameByTeam(gameId: string, playerList: string[], data: any): void {
        RouteService.requestGameId(gameId.toString()).then(longId => {
            RouteService.enterNewGameByTeam(longId, playerList, data).catch(() => {
                setTimeout(() => {
                    this.enterNewGameByTeam(gameId, playerList, data);
                }, 10000);
            });
        }).catch(() => {
            setTimeout(() => {
                this.enterNewGameByTeam(gameId, playerList, data);
            }, 10000);
        });
    }

    /**
     * 单玩家跳转游戏
     * @param gameId 游戏Id
     * @param data 玩家传输数据
     * @effect 客户端调用
     */
    // public static enterNewGame(gameId: string, data?: any) {
    //     RouteService.enterNewGame(gameId, data)
    // }
    public static enterGameClient(gameId: string, data: any): void {
        if (SystemUtil.isClient()) {
            RouteService.requestGameId(gameId).then(longId => {
                console.log("单人发起跳转", longId, "jsonData", JSON.stringify(data));
                setInterval(() => {
                    RouteService.enterNewGame(longId, data);
                }, 10000)
                RouteService.enterNewGame(longId, data);
            }).catch(() => {
                setTimeout(() => {
                    this.enterGameClient(gameId, data);
                }, 10000);
            });
        }
    }

}

/**大厅跳其他游戏数据管理 */
export class HallToGameDataManager {
    public timer: number = 0;// 时间戳
    public leaderUserId: string = "0";
    constructor(
        public petId: number,
        /**背部挂件 */
        public Back: number = 0,
        /**肩部挂件 */
        public Shoulder: number = 0,
        /**拖尾挂件 */
        public Tail: number = 0,
        /**特效挂件 */
        public Effect: number = 0,
        /**头部挂件 */
        public Head: number = 0,
        /**冲刺加速度等级 */
        public SprintAccelLv: number = 0,
        /**冲刺持续时间等级 */
        public SprintDurationLv: number = 0,
        /**冲刺最大速度等级 */
        public SprintMaxSpeedLv: number = 0,
        /**冲刺cd等级 */
        public SprintCdLv: number = 0,
        /**移动最大速度等级 */
        public MoveMaxSpeedLv: number = 0,
        /**移动加速度等级 */
        public MoveAccelLv: number = 0,
    ) { }
    encode(): string {
        this.timer = new Date().getTime();
        let str = this.petId.toString() + "|" +
            this.Back.toString() + "|" +
            this.Shoulder.toString() + "|" +
            this.Tail.toString() + "|" +
            this.Effect.toString() + "|" +
            this.Head.toString() + "|" +
            this.SprintAccelLv.toFixed(0) + "|" +
            this.SprintDurationLv.toFixed(0) + "|" +
            this.SprintMaxSpeedLv.toFixed(0) + "|" +
            this.SprintCdLv.toFixed(0) + "|" +
            this.MoveMaxSpeedLv.toFixed(0) + "|" +
            this.MoveAccelLv.toFixed(0) + "|" +
            this.timer.toString() + "|" +
            this.leaderUserId;
        return str;
    }
    public static decode(str: string): HallToGameDataManager {
        let arr = str.split("|");
        if (arr == null || arr.length == 0) return null;
        if (arr.length != 14) {
            console.error("HallToGameDataManager decode error", str);
            return null;
        }
        let data = new HallToGameDataManager(Number(arr[0]), Number(arr[1]), Number(arr[2]), Number(arr[3]), Number(arr[4]), Number(arr[5]), 
            Number(arr[6]), Number(arr[7]), Number(arr[8]), Number(arr[9]), Number(arr[10]), Number(arr[11]));
        data.timer = Number(arr[12]);
        data.leaderUserId = arr[13];
        return data;
    }
}

/**其他游戏跳大厅数据管理 */
export class GameToHallDataManager {
    public timer: number = 0;// 时间戳
    public leaderUserId: string = "0"
    constructor(
        public isSuccess: InGameStatus = -1,
        public diveCount: number = 0
    ) {
    }

    encode(): string {
        this.timer = new Date().getTime();

        return this.isSuccess.toString() + "|" +
            this.timer.toString() + "|" +
            this.leaderUserId + "|" +
            this.diveCount;
    }

    public static decode(str: string): GameToHallDataManager {
        let arr = str.split("|");
        if (arr == null || arr.length == 0) return null;
        if (arr.length != 4) {
            console.error("GameToHallDataManager decode error", str);
            return null;
        }
        let data = new GameToHallDataManager((Number(arr[0])));
        data.timer = Number(arr[1]);
        data.leaderUserId = arr[2];
        data.diveCount = Number(arr[3]);
        return data;
    }
}