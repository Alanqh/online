import { oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { ILevelElement } from "../config/Level";
import { LevelEventC2C, LevelEventS2S } from "../const/GameCommonEvent";
import { LevelLogicBase } from "./LevelLogicBase";
import { LevelLogic_C } from "./LevelLogic_C";
import { LevelLogic_S } from "./LevelLogic_S";


/**
 * 关卡基类，分别创建S和C的管理类，维护倒计时
 */
export abstract class LevelBase extends mw.Script {

    @mw.Property({ group: "关卡设置", displayName: "Level表id" })
    public configID: number = 1;
    protected myConfig: ILevelElement = null;

    @mw.Property({ group: "关卡设置", displayName: "墙,客户端", capture: true })
    public wallGuid: string = "";

    @mw.Property({ group: "关卡设置", displayName: "胜利触发器", capture: true })
    public winTriggerGuid: string = "";

    @mw.Property({ group: "关卡设置", displayName: "死亡触发器，DeathTriggers下触发器数量" })
    public deadTriggerNum: number = 0;
    // public deadTriggerParentName: string = "DeathTriggers";

    @mw.Property({ group: "关卡属性", hideInEditor: true, replicated: true, onChanged: "onTimerChange" })
    public totalTimer: number = 0;
    private onTimerChange() {
        Event.dispatchToLocal(LevelEventC2C.LEVEL_TIMECHANGE_C2C, this.totalTimer)
    }
    @mw.Property({ group: "关卡属性", hideInEditor: true, replicated: true, onChanged: "onWinerChange" })
    public winPlayer: number[] = [];
    // 修改获胜玩家
    private onWinerChange() {
        Event.dispatchToLocal(LevelEventC2C.LEVEL_WINERCHANGE_C2C, this.winPlayer, this.configID)
    }

    protected onStart(): void {
    }

    public objLogicS: LevelLogic_S<any>;
    public objLogicC: LevelLogic_C<any>;
    protected init(serverClass: { new(objScript: LevelBase): LevelLogic_S<any> }, clientClass: { new(objScript: LevelBase): LevelLogic_C<any> }) {
        this.myConfig = GameConfig.Level.getElement(this.configID);

        if (SystemUtil.isClient()) {
            this.objLogicC = new clientClass(this);
        }
        if (SystemUtil.isServer()) {
            this.objLogicS = new serverClass(this);
        }

    }
    public get logic(): LevelLogicBase<any> {
        if (mw.SystemUtil.isClient()) {
            return this.objLogicC;
        }
        return this.objLogicS;
    }
    protected onUpdate(dt: number): void {
        this.objLogicS?.update(dt);
        this.objLogicC?.update(dt);
    }
    protected onDestroy(): void {
        if (this.objLogicS != null) {
            this.objLogicS.destroy();
            this.objLogicS = null;
        }
        if (this.objLogicC != null) {
            this.objLogicC.destroy();
            this.objLogicC = null;
        }
        this.useUpdate = false;
    }

    // 时间流逝,只能服务器调用
    @RemoteFunction(mw.Server)
    public timeLapse(value: number) {
        if (this.totalTimer <= 0) {
            return
        }
        if (this.totalTimer - value >= 0) {
            this.totalTimer -= value;
        } else {
            this.totalTimer = 0;
        }
    }

    // 添加获胜玩家
    @RemoteFunction(mw.Server)
    public addWinPlayer(playerID: number) {
        oTrace('guan log 进入胜利触发器', playerID);
        if (this.winPlayer.includes(playerID)) {
            oTrace('guan log 已经在胜利列表中');
            return false;
        }
        Event.dispatchToLocal(LevelEventS2S.LEVEL_ADD_WINER_S2S, playerID)

        let pidList = Array.from(this.winPlayer);
        pidList.push(playerID);
        this.winPlayer = pidList;
        return true;
    }

    // 添加获胜玩家
    @RemoteFunction(mw.Server)
    public removeWinPlayer(playerID: number) {
        oTrace('guan log 移除胜利玩家', playerID);
        if (!this.winPlayer.includes(playerID)) {
            oTrace('guan log 不在胜利列表中');
            return;
        }
        Event.dispatchToLocal(LevelEventS2S.LEVEL_ADD_WINER_S2S, playerID)

        let pidList = Array.from(this.winPlayer);
        let index = pidList.indexOf(playerID);
        pidList.splice(index);
        this.winPlayer = pidList;
    }



    /**
     * 客户端收到服务器调用 C
     * @param player 玩家
     * @param funcName 方法名
     * @param args 参数
     */
    @RemoteFunction(mw.Client)
    private net_Server_Call_Client_Single_C(player: mw.Player, funcName: string, ...args: any[]) {
        this.objLogicC?.serverCallClientFun(funcName, ...args);
    }

    /**
     * 服务器调用指定客户端 S专用
     * @param player 玩家，服务器调用的，所以这里可以是类
     * @param funcName 方法名
     * @param args 参数
     */
    @RemoteFunction(mw.Server)
    public net_Server_Call_Client_Single_S(player: mw.Player, funcName: string, ...args: any[]) {
        this.net_Server_Call_Client_Single_C(player, funcName, ...args)
    }


    /**
     * 客户端收到服务器调用-广播 C
     * @param funcName 方法名
     * @param args 参数
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    private net_Server_Call_Client_All_C(funcName: string, ...args: any[]) {
        this.objLogicC?.serverCallClientFun(funcName, ...args);
    }
    /**
     * 服务器调用全部客户端 S
     * @param funcName 方法名
     * @param args 参数
     */
    @RemoteFunction(mw.Server)
    public net_Server_Call_Client_All_S(funcName: string, ...args: any[]) {
        this.net_Server_Call_Client_All_C(funcName, ...args)
    }

    /**
     * 客户端调用服务器 C
     * @param funcName 方法名
     * @param args 参数
     */
    @RemoteFunction(mw.Client)
    public net_Client_Call_Server_C(funcName: string, ...args: any[]) {
        this.net_Client_Call_Server_S(Player.localPlayer.playerId, funcName, ...args);
    }

    /**
     * 服务器收到客户端调用 S 客户端调用服务器！！！
     * @param playerID 玩家，这里是客户端调用，不能传类
     * @param funcName 方法名
     * @param args 参数
     */
    @RemoteFunction(mw.Server)
    private net_Client_Call_Server_S(playerID: number, funcName: string, ...args: any[]) {
        this.objLogicS?.clientCallServer(playerID, funcName, ...args);
    }
}