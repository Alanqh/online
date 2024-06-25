
import { GameConfig } from "../../../../../JavaScripts/config/GameConfig";
import { AIData } from "../../../../../JavaScripts/RouteData";
import { Humanoid } from "../../../../AI/Humanoid";
import { CountDownUI } from "../../../../modules/ProcessModule/UI/CountDownUI";
import { TestMode } from "../../../../TestMode";
import { Utils } from "../../../../tool/Utils";
import { ILifeController } from "../ILifeController";
import { LifeState, StateExport, StateGameing, StateLoading } from "../LifeState";
import { StateMachine } from "../StateMachine";
import { ITeamRule } from "./IRule";
import { PassAIService } from "./PassAIService";
import { Player } from "./Player";

/**
 * 跳转到小游戏携带的数据
 */
type RoundData = {
    /**回合数 */
    round: number;
    /**AI列表 */
    aiList: AIData[];
    /**大厅ID */
    squareId: number;
    /**决赛ID */
    finalId: number;
}
export type GameDataConfig = {
    loadTime: number; overlookTime: number; countDownTime: number;
    /**大厅ID */
    gameTime: number; gameEndTime: number; resultTime: number; chooseMapTime: number;
};
if (TestMode.testMode) {
    Object.defineProperty(mw.Player.prototype, "teamId", {
        get() {
            try {
                return "32131212" || this['getUserId']();
            } catch (error) {
                return "32131212";
            }
        },
    })

    Object.defineProperty(mw.Player.prototype, "teleportId", {
        get() {
            try {
                return "32131212" || this['getUserId']();
            } catch (error) {
                return "32131212";
            }
        },
    })
}
export class Team implements ILifeController {


    public rules: ITeamRule[] = [];

    /** 携带的数据 */
    public serverData: Record<string, unknown>;
    /** 客户端用NPC */
    public clientAIData: AIData[];
    /** 过关后的NPC */
    public winNPCList: Player[] = [];
    /** 玩家ID列表 */
    public players: Player[] = [];

    /**
     * 双端都存在的状态机，权威端在服务端
     */
    private fsm: StateMachine<ILifeController>;
    private _state: LifeState = LifeState.Idle;
    public currentRank: number = 1;
    public passNum: number = 0
    public passTime: number = 0;
    public clientPlayerCount: number = 0;
    public clientCurRound: number = 0;
    private _isClientRegister: boolean = false;
    private _isFinish: boolean = false;
    private _isAllPlayerFinish: boolean = false;

    private passedAI: number[] = [];
    /**
     * 表演AI服务
     */
    private passAIService: PassAIService = null;

    constructor(public teamId: string, data: any, public config: GameDataConfig) {
        // 初始化配置
        this.serverData = data;
        this.passAIService = new PassAIService(this);
        if (TestMode.testMode && SystemUtil.isServer()) {
            this.serverData = this.serverData || {};
            this.serverData["aiList"] = [];
            this.serverData["round"] = TestMode.testRound;

            for (let i = 0; i < MathUtil.randomInt(4, 8); i++) {
                //PIE上AI的测试数据
                const name = Utils.randomInList(GameConfig.AIName.getAllElement()).name;
                (this.serverData["aiList"] as any).push({ name: name, skinId: 1010, garnitureId: [40001], seat: i + 8, title: "PIE" });
            }

        }

        this.fsm = new StateMachine(this);
        if (SystemUtil.isServer()) {
            this.fsm.setStateEnterListener(state => {
                for (const player of this.players) {
                    player.playerId && Event.dispatchToClient(player.character.player, "GameState.Change." + teamId, state.constructor.name, Date.now() + this.fsm.target.config.gameTime * 1000);
                }
            });
        } else {
            this.addClientListener();
        }
        Event.dispatchToLocal("Team.Create", this);
    }
    private addClientListener() {
        if (this._isClientRegister) return;
        this._isClientRegister = true;
        //只监听本地客户端
        // const tag = `GameState.${LifeState.Loading}.${SystemUtil.isServer() ? "Server" : "Client"}`
        // Event.dispatchToLocal(tag, this.teamId);
        Event.addServerListener("GameState.Change." + this.teamId, (stateName: string, endTime: number) => {
            if (stateName == StateGameing.name) {
                mw.UIService.show(CountDownUI, Date.now() + this.fsm.target.config.gameTime * 1000);
            }
            this.fsm.changeState(StateExport.getState(stateName));
            this.fsm.update(0.1);
        });
    }

    /**
     * 通知客户端
     */
    public broadcast(key: string, ...args: any[]) {
        for (const player of this.players) {
            if (player.playerId) {
                const gamePlayer = mw.Player.getPlayer(player.playerId);
                gamePlayer && Event.dispatchToClient(gamePlayer, key, ...args);
            }
        }
    }

    /**
     * 玩家过关
     * @param player 
     */
    public playerFinish(player: Player) {
        player.rank = this.currentRank;
        const isPassedStart = this.passAIService.onPlayerFinish();
        if (isPassedStart) {
            const now = Date.now();
            const sortArray = this.players.filter(i => i.passedTime > 0).map(i => (now - i.passedTime) / 1000).sort((a, b) => a - b);
            const passTime = sortArray[0] ? sortArray[0] : 0;
            Event.dispatchToLocal("Team.PassAI.Start", this.teamId, passTime);
        }
    }
    /**
     * 通过保底检查点
     * @param player 
     */
    public checkPassed(player: mw.Player) {
        const tp = this.getPlayer(player);
        if (tp && tp.passedTime == 0) {
            tp.passedTime = Date.now();
            const passedNumber = this.players.filter(i => i.passedTime > 0).length;
            this.passAIService.onPlayerPassed(passedNumber);
        }
    }
    /**
     * 真人玩家数量
     */
    public get playerCount(): number {
        let playerCount = 0;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].playerId) {
                playerCount++;
            }
        }
        return playerCount;
    }

    /**
     * 淘汰玩家
     * @param guid 
     */
    public eliminate(guid: string) {
        let playerIndex = this.players.findIndex(i => i.character.gameObjectId == guid);
        if (playerIndex >= 0) {
            this.players[playerIndex].isEliminate = true;
            const humanoid = this.players[playerIndex].character["ai"] as Humanoid;
            if (humanoid) {
                humanoid.eliminate();
            }
            this.players.splice(playerIndex, 1);
            for (const player of this.players) {
                player.playerId && Event.dispatchToClient(mw.Player.getPlayer(player.playerId), "AI.FinishLine.Client", player.data.seat);
            }
        }
    }

    /**
     * 标记一个NPC胜利了
     * @param character npc
     */
    public addWinNpc(character: Character): void {
        const index = this.players.findIndex(i => i.guid == character.gameObjectId);
        if (index >= 0) {
            const npc = this.players[index];
            if (!this.winNPCList.includes(npc))
                this.winNPCList.push(npc);
        }
        // 复用
        this.removeNpc(character);
    }

    /**
     * 添加一个Npc
     * @param character npc
     */
    public addNpc(character: Character, cfg: any) {
        if (!this.players.find(i => i.guid == character.gameObjectId)) {
            const player = new Player(0, "", this, character.gameObjectId, cfg);
            this.players.push(player);
        }
    }

    /**
     * 移除一个NPC
     * @param character npc
     */
    public removeNpc(character: Character) {
        const player = this.players.find(i => i.guid == character.gameObjectId);
        if (player) {
            this.eliminate(player.character.gameObjectId);
        }
    }

    /**
    * 移除一个玩家
    * @param player 
    */
    public removePlayer(player: mw.Player) {
        const index = this.players.findIndex(i => i.playerId == player.playerId);
        if (index >= 0) {
            this.players.splice(index, 1);
        }
    }
    public getPlayer(player: mw.Player) {
        return this.players.find(i => i.playerId == player.playerId);
    }

    /**
     * 通知其他客户端让AI过关
     * @param id 
     */
    public onAIPassed(id: number) {
        if (id && !this.passedAI.includes(id)) {
            this.passedAI.push(id);
            this.broadcast("AI.Passed.Finish", id);
        }
    }
    /**
     * 添加一个玩家
     * @param player 
     */
    public addPlayer(player: mw.Player, userId: string) {
        if (TestMode.testMode && SystemUtil.isServer()) {
            this.serverData = this.serverData || {};
            this.serverData[userId] = {
                skinId: "151157",
                seat: 0, garnitureId: [40020, 50001, 50002, 60001], emoji: [20007, 20008], title: "<i>PIE专属</i>", aiList: []
            }

            for (let i = 0; i < MathUtil.randomInt(2, 8); i++) {
                //PIE上AI的测试数据
                const name = Utils.randomInList(GameConfig.AIName.getAllElement()).name;
                this.serverData[userId]["aiList"].push({ name: name, skinId: 1010, garnitureId: [40001], seat: i + 8 });
            }
        }
        let lPlayer = this.players.find(i => i.playerId == player.playerId);
        if (lPlayer) {
            this.players.splice(this.players.indexOf(lPlayer), 1);
        }
        lPlayer = new Player(player.playerId, userId, this, "", (this.serverData ? this.serverData[userId] : null) as any);
        this.players.push(lPlayer);
        return lPlayer;
    }
    /**是否释放 */
    public get isDispose() {
        return this._state == LifeState.Dispose;
    }
    public get state() {
        return this._state;
    }
    public set state(value: LifeState) {
        this._state = value;
    }
    /**
     * 设置状态
     * @param state 
     */
    public setState(state: LifeState) {
        if (this._state != state) {
            this._state = state;
            const tag = `GameState.${state}.${SystemUtil.isServer() ? "Server" : "Client"}`

            //发送参数
            const params = [];
            if (state == LifeState.Loading) {
                params.push(this.serverData ? this.serverData["aiList"] : [], this.teamId);
            } else {
                params.push(this.teamId);
            }
            if (state == LifeState.EndGame) {
                this.players.forEach(player => {
                    if (player.guid) {
                        player.character.movementEnabled = false;
                    }
                });
                this.dispatchChampion();
            }
            Event.dispatchToLocal(tag, ...params);
        }
    }
    public start() {
        if (!this.fsm.currentState) {
            this.fsm.changeState(StateLoading);
        } else if (this.fsm.currentState.constructor.name == StateGameing.name) {
            this.fsm.changeState(StateLoading);
        }
    }
    /**重置房间状态 */
    public reset() {
        this.start();
        this.currentRank = 1;
        this.winNPCList.length = 0;
        this._isFinish = false;
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            if (!player.reset()) {
                this.players.splice(i, 1);
                i--;
            }
        }
    }
    public getWinner() {
        const cfg = GameConfig.GameInfo.getElement(1);
        if (cfg.type == 2 && this.serverData["round"] == 2) {
            const allPlayers = this.players.filter(i => i.playerId);
            if (!allPlayers.find(i => i.rank == 1)) {
                const winplayer = allPlayers.find(i => !i.isEliminate);
                winplayer && (winplayer.rank = 1);
            }
        }
    }
    /**满足结束条件 */
    public get isFinish() {
        if (this._isFinish) {
            return true;
        }
        if (SystemUtil.isServer()) {
            //过线数量
            let finishCount = this.currentRank - 1;
            //剩余数量
            const isRound2 = this.serverData["round"] == 2;
            const cfg = GameConfig.GameInfo.getElement(1);
            if (isRound2) {
                if (cfg.type == 1 || cfg.type == 3) {
                    //竞速
                    this._isFinish = finishCount >= 1;
                } else {
                    //淘汰
                    const allPlayers = this.players.filter(i => i.playerId);
                    /**
                     * 还有人没被淘汰
                     */
                    this._isFinish = allPlayers.find(i => i.eliminateRemaind <= 1) != null;
                    if (this._isFinish) {
                        const winplayer = allPlayers.find(i => !i.isEliminate);
                        winplayer && (winplayer.rank = 1);
                    }
                }
            } else {
                if (cfg.type == 1) {
                    //竞速,真人全部过关
                    if (!this._isAllPlayerFinish) {
                        this._isAllPlayerFinish = !this.players.find(i => !i.isFinish);
                        this._isAllPlayerFinish && Event.dispatchToLocal("Player.ALL.Finish", this.teamId);
                    }
                    if (this.passedAI.length + this.players.filter(i => i.isFinish).length >= cfg.playerNum) {
                        this._isFinish = true;
                    }
                } else {
                    //淘汰
                    const allPlayers = this.players.filter(i => i.playerId);
                    /**
                     * 还有人没被淘汰
                     */
                    this._isFinish = allPlayers.find(i => i.eliminateRemaind <= 1) != null;
                    if (this._isFinish) {
                        const winplayer = allPlayers.find(i => !i.isEliminate);
                        winplayer && (winplayer.rank = 1);
                    }
                }
            }
            if (this._isFinish) {
                return true;
            }
            return this._isFinish;
        } else {
            return false;
        }

    }

    /**
     * 获取当前轮次
     */
    public get curRound() {
        return this.serverData?.["round"];
    }

    /**
     * 更新
     * @param dt 
     */
    public onUpdate(dt: number) {
        if (SystemUtil.isServer()) {
            this.passAIService.onUpdate(dt);
            this.fsm.update(dt);
            if (this._state == LifeState.Gameing) {
                this.rules.forEach(rule => {
                    rule.onUpdate(dt);
                });
            } else if (this._state == LifeState.EndGame) {
                this.rules.forEach(rule => {
                    rule.onStop();
                });
            }
        }
    }
    /**
     * 同步冠军信息
     */
    public dispatchChampion() {
        if (SystemUtil.isServer()) {
            let team = this;
            if (team?.curRound == 2) {
                let champion: Player = team.players.find(i => i.rank == 1);
                if (champion) {
                    for (let tsPlayer of team.players) {
                        if (tsPlayer && tsPlayer.playerId && mw.Player.getPlayer(tsPlayer.playerId)) {
                            Event.dispatchToClient(mw.Player.getPlayer(tsPlayer.playerId), "SHOW_GAME_CHAMPOIN", champion.playerId, null, null);
                        }
                    }
                } else {
                    let guid: string = null;
                    let skinId: number = null;
                    let name: string = null;
                    for (let tsPlayer of team.players) {
                        if (tsPlayer.winNpcs.length) {
                            guid = tsPlayer.winNpcs[0].guid;
                            skinId = tsPlayer.winNpcs[0].skinId;
                            name = tsPlayer.winNpcs[0].name;
                            break;
                        }
                    }
                    for (let tsPlayer of team.players) {
                        if (tsPlayer && tsPlayer.playerId && mw.Player.getPlayer(tsPlayer.playerId)) {
                            Event.dispatchToClient(mw.Player.getPlayer(tsPlayer.playerId), "SHOW_GAME_CHAMPOIN", null, guid, skinId, name);
                        }
                    }
                }
            }
        }
    }
}