import { oTrace } from "odin";
import { PlayerManagerExtesion } from "../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../config/GameConfig";
import { GMEventS2S, GamingCtrlEventS2S, LevelEventC2S, LevelEventS2S } from "../const/GameCommonEvent";
import { GlobalData } from "../const/GlobalData";
import MGSHome from "../modules/mgsModule/MGSHome";
import GameComUtils from "../utils/GameComUtils";
import { LevelBase } from "./LevelBase";
import { LevelLogicBase } from "./LevelLogicBase";


export abstract class LevelLogic_S<T extends LevelBase> extends LevelLogicBase<T> {
    // protected winList: Array<number> = new Array();
    private prepareListener: EventListener;
    private startListener: EventListener;
    private playerDieListener: EventListener;
    protected countdownTimer: number;
    protected funcMap_S: Map<string, Function> = new Map<string, Function>();
    private checkPointMap: Map<number, number> = new Map<number, number>();

    private gmEndListener: EventListener;

    protected async onScriptStart() {
        this.checkPointMap.clear();
        // 正式开始游戏
        this.prepareListener = Event.addLocalListener(GamingCtrlEventS2S.CTRL_GAMING_PREPARE, this.gamingPrepare);
        this.startListener = Event.addLocalListener(GamingCtrlEventS2S.CTRL_GAMING_START_PLAY, this.gamingStart);
        this.playerDieListener = Event.addClientListener(LevelEventC2S.LEVEL_DIE_C2S, this.playerDieistener);

        let trigger = await GameObject.asyncFindGameObjectById(this.info.winTriggerGuid) as Trigger;

        trigger.onEnter.add(this.playerEnterWindTrigger);

        this.info.totalTimer = this.myConfig.levelTime;
        Player.onPlayerLeave.add(this.playerLeaveListener);
        try {
            await this.onInitServer();
        } catch (error) {
            console.error("LevelLogic_S onScriptStart error:", error);
        }
        oTrace('guan log 关卡创建完毕');
        // 初始化完毕，发送通知
        Event.dispatchToLocal(LevelEventS2S.LEVEL_CREATE_PREFAB_DONE_S2S);

        this.gmEndListener = Event.addLocalListener(GMEventS2S.GM_ENDGAME, () => {
            oTrace('guan log GM修改时间');
            this.info.totalTimer = 1;
        })
    }

    private aiCount: number = 0;
    private aiPos: Vector[] = [];
    private playerPrepareP: Map<number, {
        pos: Vector,
        rot: Rotation
    }> = new Map();

    private prepareDataDone = false;
    /**
     * 游戏准备阶段
     * 修改所有玩家位置，是否写在客户端合适？
     * 可能这时候客户端还没有准备好，存起来客户端自己要？
     */
    private gamingPrepare = (lastLevelID: number) => {
        let plist = Player.getAllPlayers();

        let newP = this.myConfig.birthPoint.clone();
        newP.z += 100;

        let maxCount = plist.length > 15 ? plist.length : 15;
        let forwardDir = this.myConfig.finishDirection;
        let posLis = GameComUtils.getPos(newP,
            forwardDir,
            maxCount,
            200,
            200,
            6)

        // 确保获得的位置比玩家数量多
        if (plist.length > posLis.length) {
            console.error("关卡人数太多，位置不够", plist.length, posLis.length)
            return
        }

        let count = 0;
        let newRot = forwardDir.toRotation();
        this.playerPrepareP.clear();
        for (let i = 0; i < plist.length; i++) {
            this.playerPrepareP.set(plist[i].playerId, {
                pos: posLis[count],
                rot: newRot
            })
            // this.info.net_Server_Call_Client_Single_S(plist[i], "net_ChangePlayerPos_C", posLis[count], newRot);
            count++;
        }
        let playerNum = GameConfig.Level.getElement(lastLevelID).playerNum;
        this.aiCount = playerNum - count;
        for (let i = count; i <= playerNum; i++) {
            // 生成AI 并修改位置
            let pos = posLis[i];
            this.aiPos.push(pos);
        }
        this.prepareDataDone = true;
        // TODO 让客户端根据人数补齐AI
        // for (let i = 0; i < plist.length; i++) {
        //     // Event.dispatchToClient(plist[i], LevelEventS2C.LEVEL_CREATE_NPC_S2C, aiCount, aiPos);
        //     this.info.net_Server_Call_Client_Single_S(plist[i], "net_CreateNPC_C", this.aiCount, this.aiPos);
        // }
    }

    private async net_ClientEnterPrepare_S(playerID: number) {
        // 防止客户端比服务器快，理论上是不可能的
        await this.prepareDateReady();
        let player = Player.getPlayer(playerID);
        if (!player || !player.character) {
            return
        }
        let data = this.playerPrepareP.get(playerID);
        if (!data) {
            return
        }

        this.info.net_Server_Call_Client_Single_S(player, "net_PlayerEnterPrepare", data.pos, data.rot, this.aiCount, this.aiPos);
    }
    private async prepareDateReady() {
        return new Promise<void>((resolve, reject) => {
            let key = setInterval(() => {
                if (this.prepareDataDone) {
                    clearInterval(key);
                    resolve();
                }
            }, 10)
        });
    }
    private net_NeedCreateNpc_S(playerID: number) {
        let player = Player.getPlayer(playerID);
        this.info.net_Server_Call_Client_Single_S(player, "net_CreateNPC_C", this.aiCount, this.aiPos);
    }
    /**
     * 游戏开始
     * 开始倒计时
     * 执行子类onStartPlayGame方法
     */
    private gamingStart = () => {
        this.countdownTimer = TimeUtil.elapsedTime() + 1;
        this.useUpdate = true;
        try {
            this.onStartPlayGame();
        } catch (error) {
            console.error("LevelLogic_S gamingStart error:", error);
        }
    }

    /**
     * 玩家进入胜利触发器，第二轮只有一个玩家可以赢，第一轮要判断是否达到配置的人数
     * @param obj 玩家
     * @returns 
     */
    private playerEnterWindTrigger = (obj: GameObject) => {
        if (!PlayerManagerExtesion.isCharacter(obj)) {
            return
        }

        try {
            if (!this.info) {
                return;
            }
            this.info.addWinPlayer(obj.player.playerId);

            this.myLevelData_S.winPlayerData.set(obj.player.playerId, this.info.totalTimer);

            // 第二轮，只有1个玩家可以赢！！！
            if (GlobalData.levelEndCount_S == 1) {
                this.levelEnd();
                return
            }

            if (this.info.winPlayer.length == this.myConfig.winNum) {
                // 单轮游戏结束
                this.levelEnd();
            }

            let allPlayer = Player.getAllPlayers();
            // 这里关卡销毁后，info会报错。不知道为什么！！！！
            if (allPlayer.length == this.info.winPlayer.length) {
                // 真人玩家全部获胜
                this.levelEnd();
            }

        } catch (error) {
            console.error("LevelLogic_S playerEnterWindTrigger error:", error);
        }
    }

    /**
     * 玩家离开事件
     * @param player 
     */
    private playerLeaveListener = (player: mw.Player) => {
        this.info.removeWinPlayer(player.playerId);
        this.onPlayerLeave(player);
    };

    /**
     * 玩家死亡
     * @param player 
     */
    private playerDieistener = (player: mw.Player, pid: number) => {
        if (!this.myLevelData_S.dieMap.has(pid)) {
            this.myLevelData_S.dieMap.set(pid, 1);
            return
        }
        let count = this.myLevelData_S.dieMap.get(pid);
        count++;
        this.myLevelData_S.dieMap.set(pid, count);
    };
    /**
     * 服务器帧更新，只做倒计时
     * @param dt 
     * @returns 
     */
    protected onScriptUpdate(dt: number): void {
        if (TimeUtil.elapsedTime() < this.countdownTimer) {
            return;
        }
        this.countdownTimer = TimeUtil.elapsedTime() + 1;
        this.info.timeLapse(1);

        if (this.info.totalTimer <= 0) {
            this.levelEnd();
        }
    }

    protected onScriptDestroy(): void {
        if (this.startListener) {
            Event.removeListener(this.startListener);
            this.startListener = null;
        }
        if (this.prepareListener) {
            Event.removeListener(this.prepareListener);
            this.prepareListener = null;
        }
        if (this.playerDieListener) {
            Event.removeListener(this.playerDieListener);
            this.playerDieListener = null;
        }

        if (this.gmEndListener) {
            Event.removeListener(this.gmEndListener);
            this.gmEndListener = null;
        }
        Player.onPlayerLeave.remove(this.playerLeaveListener);
    }

    protected levelEnd() {
        try {
            this.myLevelData_S.levelTime = this.info.totalTimer;
            this.myLevelData_S.dateKey = new Date().getTime();
            let dieNum = 0;
            this.myLevelData_S.dieMap.forEach((value, key) => {
                dieNum += value;
            })
            let firstWinTimer = 0;
            this.myLevelData_S.winPlayerData.forEach((value, key) => {
                if (firstWinTimer < value) {
                    firstWinTimer = value;
                }
            })

            let allPlayer = Player.getAllPlayers();
            let loseNum: number = 0;
            for (let i = 0; i < allPlayer.length; i++) {
                let player = allPlayer[i];
                let winTimer = 0;
                let winWaitTimer = 999999;
                let isWin = false;
                let checkPoint = 0;
                if (this.myLevelData_S.winPlayerData.has(player.playerId)) {
                    winTimer = this.myLevelData_S.winPlayerData.get(player.playerId);
                    winWaitTimer = this.myLevelData_S.levelTime - winTimer;
                    isWin = true;
                }
                if (!isWin) {
                    loseNum++;
                }
                let dieTimes = 0;
                // 每计算一次就删除
                if (this.myLevelData_S.dieMap.has(player.playerId)) {
                    dieTimes = this.myLevelData_S.dieMap.get(player.playerId);
                    this.myLevelData_S.dieMap.delete(player.playerId);
                }

                if (this.checkPointMap.has(player.playerId)) {
                    checkPoint = this.checkPointMap.get(player.playerId);
                }
                MGSHome.levelEnd(player, this.myConfig.id, winTimer, winWaitTimer, dieTimes, GlobalData.levelEndCount_S == 0, isWin ? 9999 : checkPoint, allPlayer.length);
            }
            // 剩余的是中途退出的玩家
            loseNum += this.myLevelData_S.dieMap.size;

            MGSHome.levelResult_S(this.myLevelData_S.dateKey,
                this.myConfig.id,
                dieNum,
                firstWinTimer,
                GlobalData.levelEndCount_S == 0,
                this.myLevelData_S.winPlayerData.size,
                loseNum,
                allPlayer.length);

        } catch (error) {
            console.error("LevelLogic_S levelEnd error:", error);
        }

        // 发送事件，gamectrl会改 GlobalData.levelEndCount_S
        Event.dispatchToLocal(LevelEventS2S.LEVEL_GAMING_DONE_S2S);
    }


    /**
     * 设置玩家存档点
     * @param player 
     * @param checkPoint 
     */
    private net_SetCheckPoint_S(playerID: number, checkPoint: number) {
        this.checkPointMap.set(playerID, checkPoint);
        oTrace('guan log net_SetCheckPoint_S', playerID, checkPoint);
    }
    /** 初始化 */
    protected abstract onInitServer();
    /** 游戏正式开始 */
    protected abstract onStartPlayGame(): void;
    /**玩家离开事件 */
    protected abstract onPlayerLeave(player: mw.Player): void;

    /**
     * 客户端调用服务器方法
     * @param playerID 调用者
     * @param funName 方法名
     * @param args 参数
     */
    public clientCallServer(playerID: number, funName: string, ...args: any[]) {
        if (this.funcMap_S.has(funName)) {
            // 第一个参数必须是player，后面是可选参数
            this.funcMap_S.get(funName).call(this, playerID, ...args);
        } else {
            oTrace('guan log 没有找到方法', funName);
        }
    }
}