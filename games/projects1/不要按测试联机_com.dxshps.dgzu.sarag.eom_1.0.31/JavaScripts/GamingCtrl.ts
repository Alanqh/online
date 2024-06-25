/**
 * 负责关卡创建销毁
 * 主控脚本，和GamingModuleS分离。
 * 类似mvc中的c
 */

import { oTrace } from "odin";
import { GameConfig } from "./config/GameConfig";
import { EGamingFsmType } from "./const/Enum";
import { GamingCtrlEventC2C, GamingCtrlEventS2S, GlobalCtrlEventS2S, LevelEventS2S } from "./const/GameCommonEvent";
import { GlobalData } from "./const/GlobalData";
import { FSMManager } from "./fsm/FSMManager";
import { IFSMState } from "./fsm/IFSMState";
import GamingModuleS from "./modules/gamingModule/GamingModuleS";
import GameComUtils from "./utils/GameComUtils";

@Component
export default class GamingCtrl extends Script {

    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_gamingCtrl_gamingState" })
    private gamingState: number = EGamingFsmType.None;
    private async client_call_gamingCtrl_gamingState() {
        oTrace('guan log GamingCtrl client_call_gamingCtrl_gamingState', this.getStateNameFunc(this.gamingState));
        GlobalData.gameingState_C = this.gamingState;
        // await GameComUtils.waitForOdinInitDone();// 进入游戏流程的玩家，odin肯定准备好了
        Event.dispatchToLocal(GamingCtrlEventC2C.CTRL_GAMING_STATE_CHANGE_C2C, this.gamingState);

    }

    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_gamingCtrl_waitTime" })
    private totalTime: number = 0;
    private async client_call_gamingCtrl_waitTime() {
        oTrace('guan log GamingCtrl client_call_gamingCtrl_waitTime', this.totalTime);
        await GameComUtils.waitForOdinInitDone();

    }


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            this.initServer();
        }
    }

    private mFSM: FSMManager;

    private gamingS: GamingModuleS;
    public get getGamingModule() {
        return this.gamingS;
    }
    private getStateNameFunc = (type: number) => {
        let str = "";
        switch (type) {
            case EGamingFsmType.None:
                str = "无状态"
                break;
            case EGamingFsmType.Loading:
                str = "加载中"
                break;
            case EGamingFsmType.Prepare:
                str = "准备中"
                break;
            case EGamingFsmType.Gaming:
                str = "游戏中"
                break;
            case EGamingFsmType.Calculate:
                str = "结算中"
                break;
        }

        return str;
    }
    @RemoteFunction(mw.Server)
    private initServer() {
        this.mFSM = new FSMManager();
        this.mFSM.getStateNameFunc = this.getStateNameFunc;

        Event.addLocalListener(GlobalCtrlEventS2S.CTRL_BEGINGAME_S2S, () => {
            this.beginGame();
        });
    }

    private beginGame() {
        if (this.gamingState != EGamingFsmType.None) {
            return
        }
        oTrace('guan log 服务器收到开始游戏通知');
        this.gamingS = ModuleService.getModule(GamingModuleS);

        this.mFSM.register(EGamingFsmType.Loading, new LoadingState(this));
        this.mFSM.register(EGamingFsmType.Prepare, new PrepareState(this));
        this.mFSM.register(EGamingFsmType.Gaming, new GamingState(this));
        this.mFSM.register(EGamingFsmType.Calculate, new CalculateState(this));

        this.useUpdate = true;
        this.changeState(EGamingFsmType.Loading);
    }
    @RemoteFunction(mw.Server)
    public changeState(type: EGamingFsmType) {
        this.gamingState = type;
        Event.dispatchToLocal(GamingCtrlEventS2S.CTRL_GAMING_STATE_CHANGE_S2S, this.gamingState);
        this.mFSM.changeState(this.gamingState);
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

    }
}

class LoadingState implements IFSMState {
    private createPrefabDone: boolean = false;  // 关卡创建完毕
    private loadingDone: boolean = false;       // loading动画完毕
    private loadingTimer: number;
    constructor(private ctrl: GamingCtrl) {
        Event.addLocalListener(LevelEventS2S.LEVEL_CREATE_PREFAB_DONE_S2S, () => {
            // this.change2State(EGamingFsmType.Prepare);
            this.createPrefabDone = true;
            oTrace('guan log this.createPrefabDone', this.createPrefabDone);

        })
    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GamingCtrl enter LoadingState');
        this.createPrefabDone = false;
        this.loadingDone = false;
        this.loadingTimer = TimeUtil.elapsedTime() + GameConfig.RuleGame.getElement(10006).int_Value;
        this.ctrl.getGamingModule.enterLoadingState();
    }

    onUpdate(dt: number) {
        this.checkCanChange();

        if (this.loadingDone) {
            return
        }

        if (TimeUtil.elapsedTime() >= this.loadingTimer) {
            this.loadingDone = true;
            oTrace('guan log this.loadingDone', this.loadingDone);
        }
    }

    private checkCanChange() {
        // 只有UI动画完毕，和关卡创建完毕，才能进入下一个状态
        if (!this.loadingDone || !this.createPrefabDone) {
            return
        }

        this.change2State(EGamingFsmType.Prepare);
    }

    exit() {

    }

    onDestory() {

    }

    change2State(type: number): void {
        this.ctrl.changeState(type);
    }
}

class PrepareState implements IFSMState {
    constructor(private ctrl: GamingCtrl) {

    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GamingCtrl enter PrepareState');
        this.ctrl.getGamingModule.enterPrepareState();

        let timer = GameConfig.RuleGame.getElement(10007).int_Value;
        let countdownTimer = timer + 1;// 3 2 1 开始
        setTimeout(() => {
            this.change2State(EGamingFsmType.Gaming)
        }, countdownTimer * 1000);
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

class GamingState implements IFSMState {

    constructor(private ctrl: GamingCtrl) {
        Event.addLocalListener(LevelEventS2S.LEVEL_GAMING_DONE_S2S, () => {
            this.change2State(EGamingFsmType.Calculate);
        })
    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GamingCtrl enter GamingState');
        this.ctrl.getGamingModule.enterGamingState();

        Event.dispatchToLocal(GamingCtrlEventS2S.CTRL_GAMING_START_PLAY);
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

class CalculateState implements IFSMState {
    constructor(private ctrl: GamingCtrl) {

    }
    enter(currentState: number, lastState: number): void {
        oTrace('guan log GamingCtrl enter CalculateState');
        GlobalData.levelEndCount_S++;

        let hasWinner = this.ctrl.getGamingModule.enterCalculateState(GlobalData.levelEndCount_S);
        if (!hasWinner) {
            // 没有真实玩家获胜
            oTrace('guan log 没有真实玩家获胜');
            Event.dispatchToLocal(LevelEventS2S.LEVEL_GAME_OVER_S2S);
            return
        }
        // 持续时间
        let totalTime: number = GameConfig.RuleGame.getElement(10011).int_Value;

        let endTimer = (totalTime + GlobalData.calculateChangeUITimer) * 1000;
        setTimeout(() => {
            if (GlobalData.levelEndCount_S == 2) {
                oTrace('guan log 两轮结束');
                Event.dispatchToLocal(LevelEventS2S.LEVEL_GAME_OVER_S2S);
                return
            }

            // 第二轮
            this.change2State(EGamingFsmType.Loading);
        }, endTimer);
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
