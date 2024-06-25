/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-05 18:33:35
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-03 10:45:45
 * @FilePath     : \stumbleguys_new\JavaScripts\Prefabs\GameStater\Script\LifeState.ts
 * @Description  : 
 */
import { Team } from "./data/Team";
import { ILifeController } from "./ILifeController";
import { BaseState } from "./StateMachine";
import { TeamManager } from "./TeamManager";

const SETTLE_TIME = 80;

export enum LifeState {
    /** 加载中 */
    Loading = "Join",
    /** 俯瞰场景 */
    Overlook = "Overlook",
    /** 开始倒计时 */
    CountDown = "CountDown",
    /** 游戏中 */
    Gameing = "Gameing",
    /** 结束 */
    EndGame = "End",
    /** 淘汰结算 */
    Result = "Knockout",
    /** 选择地图 */
    ChooseMap = "RandomMap",
    /** 没有游戏进行 */
    Idle = "Idle",
    /** 释放状态 */
    Dispose = "Dispose",
}

class GameStateBase extends BaseState<ILifeController>{
    protected _curStateTime: number;

    onStateEnter(...params: any[]) {
    }
    onCreate() {
    }
    onStateUpdate(dt: number) {
    }
    onStateExit() {
    }

}

/**
 * 进度条状态
 */
export class StateLoading extends GameStateBase {

    onStateEnter(...params: any[]) {
        this.owner.setState(LifeState.Loading);
        this._curStateTime = 0;
    }
    onStateUpdate(dt: number) {
        this._curStateTime += dt;
        this.owner.passTime = this._curStateTime;
        if (this._curStateTime >= this.owner.config.loadTime) {
            this.machine.changeState(StateOverlook);
        }
    }
    onCreate() {
    }
    onStateExit() {
    }

}

/**
 * 俯瞰全局状态
 */
class StateOverlook extends GameStateBase {

    onStateEnter(...params: any[]) {
        /**游戏开始BGM */
        Event.dispatchToLocal("PLAY_BY_CFG", 3);
        this._curStateTime = 0;
        this.owner.setState(LifeState.Overlook);
    }
    onStateUpdate(dt: number) {
        this._curStateTime += dt;
        this.owner.passTime = this._curStateTime;
        if (this._curStateTime >= this.owner.config.overlookTime) {
            this.machine.changeState(StateCountDown);
        }

    }
    onCreate() {
    }
    onStateExit() {
    }

}

/**
 * 倒计时状态
 */
class StateCountDown extends GameStateBase {

    onStateEnter(...params: any[]) {
        this._curStateTime = 0;
        this.owner.setState(LifeState.CountDown);
        const count = this.owner.players.length;
        this.owner.players.forEach(player => {
            player.eliminateRemaind = count;
            if (this.owner.serverData) {
                player.eliminateRemaind += (this.owner.serverData.aiList ? this.owner.serverData.aiList.length : 0)
                    + (this.owner.serverData[player.userId].aiList ? this.owner.serverData[player.userId].aiList.length : 0)
            }
            player.remainAICount = player.eliminateRemaind - count;
        });
    }
    onStateUpdate(dt: number) {
        this._curStateTime += dt;
        this.owner.passTime = this._curStateTime;
        if (this._curStateTime >= this.owner.config.countDownTime) {
            this.machine.changeState(StateGameing);
        }
    }
    onCreate() {
    }
    onStateExit() {

    }

}

/**
 * 游戏中状态
 */
export class StateGameing extends GameStateBase {

    onStateEnter(...params: any[]) {
        this._curStateTime = 0;
        this.owner.setState(LifeState.Gameing);
    }
    onStateUpdate(dt: number) {
        this._curStateTime += dt;
        this.owner.passTime = this._curStateTime;
        if (this._curStateTime >= this.owner.config.gameTime || this.owner.isFinish) {
            this.owner.getWinner();
            this.machine.changeState(StateEndGame);
        }
    }
    onCreate() {
        Event.addLocalListener("Team.PassAI.Start", (teamId: string, passTime: number) => {
            if (teamId == this.owner.teamId) {
                const time = Math.max(30, passTime + 10);
                console.log("剩余时间更新", passTime, time);
                this._curStateTime = Math.max(this.owner.config.gameTime - time, this._curStateTime);
                this.owner.broadcast("Player.ALL.Finish", this.owner.config.gameTime - this._curStateTime)
            }
        });
        Event.addLocalListener("Player.ALL.Finish", (teamId: string) => {
            if (teamId == this.owner.teamId) {
                //直接开始倒计时
                this._curStateTime = Math.max(this.owner.config.gameTime - 30, this._curStateTime);
                this.owner.broadcast("Player.ALL.Finish", this.owner.config.gameTime - this._curStateTime)
            }
        });
    }
    onStateExit() {
    }
}

/**
 * 游戏冲线结束得状态
 */
export class StateEndGame extends GameStateBase {
    onStateEnter(...params: any[]) {
        let team = TeamManager.getTeam(this.owner.teamId);
        if (team && team.curRound == 2) {
            this._curStateTime = -3;
        }
        else {
            this._curStateTime = 0;
        }
        this.owner.setState(LifeState.EndGame);
    }
    onStateUpdate(dt: number) {
        this._curStateTime += dt;

        if (this._curStateTime >= this.owner.config.gameEndTime) {
            // 判断轮次 第二轮直接走 跳转
            const round = (this.owner as Team).curRound;
            if (round && round == 2) {
                this.machine.changeState(StateChooseMap);
            } else {
                this.machine.changeState(StateResult);
            }
        }
    }

    onCreate() {
    }
    onStateExit() {
    }

}

/**
 * 表现淘汰结果
 */
class StateResult extends GameStateBase {
    onStateEnter(...params: any[]) {
        this._curStateTime = 0;
        this.owner.setState(LifeState.Result);
    }
    onStateUpdate(dt: number) {
        this._curStateTime += dt;
        if (this._curStateTime >= this.owner.config.resultTime) {
            this.machine.changeState(StateChooseMap);
        }
    }
    onCreate() {
    }
    onStateExit() {
    }

}

/**
 * 选择地图状态
 */
class StateChooseMap extends GameStateBase {
    private stateTime: number = 0;
    onStateEnter(...params: any[]) {
        this._curStateTime = 0;
        this.owner.setState(LifeState.ChooseMap);
        this.stateTime = this.owner.config.chooseMapTime;
        if (SystemUtil.isServer()) {
            this.stateTime = this.owner.serverData["round"] === 2 ? SETTLE_TIME + this.stateTime : this.stateTime;
        }
    }
    onStateUpdate(dt: number) {
        this._curStateTime += dt;
        if (this._curStateTime >= this.stateTime) {
            this.machine.changeState(StateDispose);
        }
    }
    onCreate() {
    }
    onStateExit() {
    }

}
/**
 * 跳游戏状态
 */
export class StateDispose extends GameStateBase {
    onStateEnter(...params: any[]) {
        this.owner.setState(LifeState.Dispose);
    }
    onStateUpdate(dt: number) {
    }
    onCreate() {
    }
    onStateExit() {
    }

}

/**
 * 跳游戏状态
 */
export class StateIdle extends GameStateBase {
    onStateEnter(...params: any[]) {
    }
    onStateUpdate(dt: number) {
    }
    onCreate() {
    }
    onStateExit() {
    }

}

export namespace StateExport {
    const stateList = [StateChooseMap, StateCountDown, StateEndGame, StateGameing, StateIdle, StateLoading, StateOverlook, StateResult, StateDispose];
    export function getState(stateName: string) {
        for (let i = 0; i < stateList.length; i++) {
            if (stateList[i].name == stateName) {
                return stateList[i];
            }
        }
        return null;
    }
}