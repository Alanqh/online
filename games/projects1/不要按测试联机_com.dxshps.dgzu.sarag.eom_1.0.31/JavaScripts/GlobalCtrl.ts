import { oTrace, oTraceError } from "odin";
import { GameConfig } from "./config/GameConfig";
import { EGlobalFsmType } from "./const/Enum";
import { GMEventS2S, GlobalCtrlEventC2C, GlobalCtrlEventS2S, LevelEventS2S } from "./const/GameCommonEvent";
import { GlobalData } from "./const/GlobalData";
import { FSMManager } from "./fsm/FSMManager";
import { IFSMState } from "./fsm/IFSMState";
import GamingModuleS from "./modules/gamingModule/GamingModuleS";
import { GameToHallDataManager, JumpGameHelper } from "./modules/jumpGame/JumpGameHelper";
import MGSHome from "./modules/mgsModule/MGSHome";
import MGSModuleS from "./modules/mgsModule/MGSModuleS";
import PlayerModuleS from "./modules/playerModule/PlayerModuleS";
import TeamModuleS from "./modules/teamModule/TeamModuleS";
import GameComUtils from "./utils/GameComUtils";

/**
 * 全局控制类，挂载场景中。 
 * 单独拆一个脚本的目的是强解耦！
 * 只能从GlobalCtrl去影响其他类。
 * 
 * 只从odin中接收玩家登录
 * 
 * 12.7更新：属性同步只会同步到最新的值，中间缺的就丢了，需要容错处理
 * 这是大的控制类，时间都很长，不容易丢
 * GamingCtrl的流程容易丢，需要容错处理
 */
@Component
export default class GlobalCtrl extends Script {

    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_globalCtrl_globalState" })
    private globalState: number = EGlobalFsmType.None;
    private async client_call_globalCtrl_globalState() {
        oTrace('guan log GlobalCtrl client_call_globalCtrl_globalState', this.getStateNameFunc(this.globalState));
        await GameComUtils.waitForOdinInitDone();
        GlobalData.globalState_C = this.globalState;
        Event.dispatchToLocal(GlobalCtrlEventC2C.CTRL_STATE_CHANGE_C2C, this.globalState);
    }

    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_globalCtrl_playerList" })
    private playerList: number[] = [];
    private async client_call_globalCtrl_playerList() {
        oTrace('guan log GlobalCtrl client_call_globalCtrl_playerList', this.playerList);
        await GameComUtils.waitForOdinInitDone();
        Event.dispatchToLocal(GlobalCtrlEventC2C.CTRL_PLAYER_ENTER_C2C, this.playerList.length);
    }
    public get getPlayerCount() {
        return this.playerList.length;
    }
    // 设置等待玩家数量
    @RemoteFunction(mw.Server)
    public addWaitPlayer(pid: number) {
        if (this.playerList.includes(pid)) {
            return
        }
        let plist = Array.from(this.playerList);
        plist.push(pid);
        this.playerList = plist;
    }
    @RemoteFunction(mw.Server)
    public removeWaitPlayer(pid: number) {
        if (!this.playerList.includes(pid)) {
            return
        }
        let plist = Array.from(this.playerList);
        let index = plist.indexOf(pid);
        plist.splice(index, 1);
        this.playerList = plist;
    }
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_globalCtrl_waitTime" })
    private waitTime: number = 0;
    private async client_call_globalCtrl_waitTime() {
        oTrace('guan log GlobalCtrl client_call_globalCtrl_waitTime', this.waitTime);
        await GameComUtils.waitForOdinInitDone();

        Event.dispatchToLocal(GlobalCtrlEventC2C.CTRL_CHANGE_WAIT_TIME_C2C, this.waitTime);


    }

    // 设置等待时间
    @RemoteFunction(mw.Server)
    public changeWaitTime(time: number) {
        this.waitTime = time;
    }

    // // 玩家名次,这里需要用userid，保证多个游戏取值一样。
    // @RemoteFunction(mw.Server)
    // public setPlayer(uID: string, data: any) {

    // }


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            this.initServer();
        }

        if (SystemUtil.isClient()) {
            this.initClient();
        }

        GlobalData.globalCtrlInitDone = true;
    }

    private getStateNameFunc = (type: number) => {
        let str = "";
        switch (type) {
            case EGlobalFsmType.None:
                str = "无状态"
                break;
            case EGlobalFsmType.Wait:
                str = "等待阶段"
                break;
            case EGlobalFsmType.Game:
                str = "游戏阶段"
                break;
            case EGlobalFsmType.BackToSquare:
                str = "返回大厅阶段"
                break;
        }

        return str;
    }

    @RemoteFunction(mw.Client)
    private initClient() {
        Event.addLocalListener(GlobalCtrlEventC2C.MODULE_GET_STATE_C2C, () => {
            Event.dispatchToLocal(GlobalCtrlEventC2C.CTRL_STATE_CHANGE_C2C, this.globalState);
            Event.dispatchToLocal(GlobalCtrlEventC2C.CTRL_PLAYER_ENTER_C2C, this.playerList.length);
        })
    }

    private mFSM: FSMManager;
    @RemoteFunction(mw.Server)
    private initServer() {
        this.mFSM = new FSMManager();
        this.mFSM.getStateNameFunc = this.getStateNameFunc;
        this.mFSM.register(EGlobalFsmType.Wait, new WaitState(this));
        this.mFSM.register(EGlobalFsmType.PrepareChange, new PrepareChange(this));
        this.mFSM.register(EGlobalFsmType.Game, new GameState(this));
        this.mFSM.register(EGlobalFsmType.BackToSquare, new BackToSquareState(this));

        this.changeState(EGlobalFsmType.Wait);

        this.useUpdate = true;

        Event.addLocalListener(GMEventS2S.GM_BEGINGAME, () => {
            this.changeState(EGlobalFsmType.Game);
        })
    }

    @RemoteFunction(mw.Server)
    public changeState(type: EGlobalFsmType) {
        this.globalState = type;
        this.mFSM.changeState(this.globalState);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        this.mFSM?.update(dt);
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this.mFSM?.destory();
        this.mFSM = null;
    }
}

/**
 * 等待阶段
 * 人齐，或者超时，进入游戏
 */
class WaitState implements IFSMState {
    private loginListener: EventListener;
    private waitTime: number = GameConfig.RuleGame.getElement(10004).int_Value;
    private playerMaxCount = GameConfig.RuleGame.getElement(10005).int_Value;
    private timer: number = 0;
    private leftPlayerList: number[] = [];
    private msgTimer: number = 0;
    constructor(private ctrl: GlobalCtrl) {

    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GlobalCtrl enter WaitState');
        this.leftPlayerList = [];
        this.msgTimer = 0;
        Player.onPlayerLeave.add(this.playerLeave)
        this.loginListener = Event.addLocalListener(GlobalCtrlEventS2S.CTRL_LOGIN_S2S, this.playerLogin);

        this.timer = TimeUtil.elapsedTime() + 1;
        this.ctrl.changeWaitTime(this.waitTime);

        // this.waitTime = 10;
    }

    private playerLeave = (player: mw.Player) => {
        try {
            if (!this.leftPlayerList.includes(player.playerId)) {
                this.leftPlayerList.push(player.playerId);
            }
            this.ctrl.removeWaitPlayer(player.playerId);
        } catch (error) {
            console.error("GlobalCtrl WaitState playerLeave error:" + error);
        }
    }

    private playerLogin = (pID: number) => {
        try {
            this.ctrl.addWaitPlayer(pID);

            if (this.ctrl.getPlayerCount >= this.playerMaxCount) {
                this.change2State(EGlobalFsmType.PrepareChange);
            }

        } catch (error) {
            console.error("GlobalCtrl WaitState playerLogin error:" + error);
        }
    }

    onUpdate(dt: number) {
        if (TimeUtil.elapsedTime() >= this.timer) {
            this.timer = TimeUtil.elapsedTime() + 1;
            this.waitTime--;
            this.msgTimer++;
            // Tips.showToAllClient("剩余等待时间" + this.waitTime);
            this.ctrl.changeWaitTime(this.waitTime);
            if (this.waitTime <= 0) {
                this.change2State(EGlobalFsmType.PrepareChange);
            }
        }
    }

    exit() {
        // 服务器
        MGSHome.waitState_S(new Date().getTime(), this.leftPlayerList.length, this.ctrl.getPlayerCount, this.msgTimer);
        // 关闭房间中途加入，移除玩家进入监听
        RoomSettings.enableJoiningMidgame(false);
        // Tips.showToAllClient("关闭房间中途加入");
        Event.removeListener(this.loginListener);
        Player.onPlayerLeave.remove(this.playerLeave);

    }

    onDestory() {
    }

    change2State(type: number): void {
        this.ctrl.changeState(type);
    }

}
/**
 * 匹配成功
 */
class PrepareChange implements IFSMState {
    constructor(private ctrl: GlobalCtrl) {


    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GlobalCtrl enter PrepareChange');
        Event.dispatchToLocal(GlobalCtrlEventS2S.CTRL_WAIT_DONE_S2S);

        setTimeout(() => {
            this.change2State(EGlobalFsmType.Game);
        }, GameConfig.RuleGame.getElement(10019).float_Value * 1000);
    }
    onUpdate(dt: number) {

    }

    exit() {

    }
    onDestory() {

    }

    change2State(type: number): void {
        this.ctrl.changeState(type);
    }

}

/**
 * 游戏阶段
 * 这里只记录第几次结束，不做任何逻辑
 */
class GameState implements IFSMState {
    constructor(private ctrl: GlobalCtrl) {
        Event.addLocalListener(LevelEventS2S.LEVEL_GAME_OVER_S2S, () => {
            this.change2State(EGlobalFsmType.BackToSquare);
        });

    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GlobalCtrl enter GameState');
        Event.dispatchToLocal(GlobalCtrlEventS2S.CTRL_BEGINGAME_S2S);
    }
    onUpdate(dt: number) {

    }

    exit() {

    }
    onDestory() {

    }

    change2State(type: number): void {
        this.ctrl.changeState(type);
    }

}

/**
 * 结束阶段
 * 直接返回大厅
 * 把
 */
class BackToSquareState implements IFSMState {
    private timerLimit: number = GameConfig.RuleGame.getElement(10011).int_Value;
    private jumpTimer: number = 0;
    constructor(private ctrl: GlobalCtrl) {

    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GlobalCtrl enter BackToSquareState');
        console.log("开始全部跳走")
        this.jumpTimer = -1;
        // 说明模块已经销毁了，
        let module = ModuleService.getModule(GamingModuleS);
        if (module == null) {
            oTraceError('guan log BackToSquareState module == null');
            return;
        }
        // 多1s缓冲
        this.jumpTimer = TimeUtil.elapsedTime() + this.timerLimit + 1;
    }

    onUpdate(dt: number) {
        if (this.jumpTimer == -1 || TimeUtil.elapsedTime() < this.jumpTimer) {
            return
        }
        this.jumpAll();
    }

    private async jumpAll() {
        // 每次跳转都改时间
        this.jumpTimer = -1;

        const players = Player.getAllPlayers();
        if (players.length == 0) {
            oTraceError(" ================== >>>>> In BackToSquareState players.length == 0")
            return
        }
        let needData: Record<string, unknown> = {};//玩家数据体
        let playerList: string[] = [];//跳转的玩家ID列表
        let gameId: string = GlobalData.HallRoom_GameId;//跳转的游戏ID
        if (StringUtil.isEmpty(gameId)) {
            oTraceError(" ================== >>>>> In BackToSquareState gameId is null", gameId)
            return;
        }
        players.forEach(p => {
            playerList.push(p.playerId.toString());
            let data: string = null;
            let res = ModuleService.getModule(PlayerModuleS).getInGameStatus(p.playerId);
            oTrace('guan log p.playerId', p.playerId, res);
            let gameToHall = new GameToHallDataManager(res)
            let leaderUserId = ModuleService.getModule(TeamModuleS).getPlayerLeaderId(p.userId)
            if (leaderUserId) {
                gameToHall.leaderUserId = leaderUserId;
            }
            data = gameToHall.encode();
            needData[p.userId] = data;

            ModuleService.getModule(MGSModuleS).jumpToHall_Server(p);
        })

        // 上面会发埋点，这里延迟一下等埋点结束;
        await TimeUtil.delaySecond(0.3);
        //跳转
        JumpGameHelper.enterNewGameByTeam(gameId, playerList, needData)
    }

    exit() {

    }

    onDestory() {

    }

    change2State(type: number): void {
        // this.ctrl.changeState(type);
    }

}