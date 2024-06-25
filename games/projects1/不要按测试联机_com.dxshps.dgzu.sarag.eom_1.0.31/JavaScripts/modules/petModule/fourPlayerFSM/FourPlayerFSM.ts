import { oTrace } from "odin";
import { GlobalData } from "../../../const/GlobalData";
import { BaseState, StateMachine } from "../../../fsm/StateMachine";

export enum FourPlayerState {
    /**停止 */
    Stop = 99,

    /**待机 */
    IdleState = 0,
    /**跑步 */
    RunState = 1,
    /**滞空 */
    HoverState = 2,
    /**飞扑 */
    FlyState = 3,
    /**平地摔 */
    FallState = 4,
    /**冲刺 */
    RollState = 5,
    /**受击 */
    HitState = 6,
    /**受击硬直 */
    HitRecoverState = 7,
    /**死亡 */
    DeathState = 8,
}


// 设置状态互斥条件
const NoChangeMap: Map<FourPlayerState, FourPlayerState[]> = new Map(
    [
        // 飞扑,不可切换到：移动 ，滞空，飞扑，冲刺
        [FourPlayerState.FlyState, [FourPlayerState.RunState, FourPlayerState.HoverState, FourPlayerState.FlyState, FourPlayerState.RollState]],
        // 冲刺，不可切换到：飞扑，冲刺，滞空
        [FourPlayerState.RollState, [FourPlayerState.FlyState, FourPlayerState.RollState, FourPlayerState.HoverState, FourPlayerState.HitState]],
        // 硬直,不可切换到：移动 ，滞空，飞扑，冲刺
        [FourPlayerState.FallState, [FourPlayerState.RunState, FourPlayerState.HoverState, FourPlayerState.FlyState, FourPlayerState.RollState]],
        //受击,不可切换到：移动、滞空、飞扑、冲刺、
        [FourPlayerState.HitState, [FourPlayerState.RunState, FourPlayerState.HoverState, FourPlayerState.FlyState, FourPlayerState.RollState]],
        // 受击硬直
        [FourPlayerState.HitRecoverState, [FourPlayerState.RunState, FourPlayerState.HoverState, FourPlayerState.FlyState, FourPlayerState.RollState]],
    ]
)

/**
 * 查询是否可以切换状态
 * @param curState 当前状态
 * @param nextState 需要切换的状态
 * @returns 
 */
export function canChangeState(curState: FourPlayerState, nextState: FourPlayerState): boolean {
    if (curState == nextState) return false;
    if (!NoChangeMap.has(curState)) return true;
    return !NoChangeMap.get(curState).includes(nextState);
}

export function getPlayerStateEnumName(s: FourPlayerState) {
    let str: string = "";
    switch (s) {
        case FourPlayerState.IdleState:
            str = "IdleState"
            break;
        case FourPlayerState.RunState:
            str = "RunState"
            break;
        case FourPlayerState.HoverState:
            str = "HoverState"
            break;
        case FourPlayerState.FlyState:
            str = "FlyState"
            break;
        case FourPlayerState.FallState:
            str = "FallState"
            break;
        case FourPlayerState.RollState:
            str = "RollState"
            break;
        case FourPlayerState.HitState:
            str = "HitState"
            break;
        case FourPlayerState.DeathState:
            str = "DeathState"
            break;
    }
    return str;
}

export type animData = {
    state: FourPlayerState,
    isPlay: boolean,
    guid: string,
    speed: number,
    loop: number,
}

/**玩家变身四足状态机 */
export class FourPlayerFSM implements StateMachine {
    curState: FourPlayerState = FourPlayerState.Stop;
    owner: mw.Character;
    configId: number;
    fsmStateMap: Map<number, BaseState> = new Map();
    onPlayAnim: mw.Action1<animData> = new mw.Action1();
    onPlayEffect: mw.Action1<number> = new mw.Action1();
    onStopEffect: mw.Action1<number> = new mw.Action1();
    onStateChange: mw.Action1<number> = new mw.Action1();

    init(character: mw.Character): void {
        this.owner = character;
    }
    registerState(type: FourPlayerState, state: BaseState): void {
        if (this.fsmStateMap.has(type)) {
            console.error("状态机已经存在该状态");
            return;
        }
        state.fsm = this;
        this.fsmStateMap.set(type, state);
    }

    /**状态切换时注意返回值 */
    changeState(state: FourPlayerState, isForce: boolean = false, ...param: any[]): boolean {
        if (GlobalData.autoCtrl && !isForce) {
            return false;
        }
        if (this.curState && this.curState == state && !isForce) return false;

        if (this.fsmStateMap.has(state)) {
            if (this.curState != FourPlayerState.Stop) {
                if (!isForce && !canChangeState(this.curState, state)) {
                    oTrace('guan log changeState 状态切换失败', getPlayerStateEnumName(this.curState), "->", getPlayerStateEnumName(state));
                    return false;
                }
                this.fsmStateMap.get(this.curState).exit();
                this.fsmStateMap.get(state).enter(...param);
            } else {
                if (state != FourPlayerState.IdleState) return false;
                this.fsmStateMap.get(state).enter(...param);
            }
            oTrace('guan log changeState', getPlayerStateEnumName(state));
            this.curState = state;
            this.onStateChange.call(this.curState);

            return true;
        }
    }


    update(dt: number): void {
        if (this.fsmStateMap.get(this.curState)) {
            this.fsmStateMap.get(this.curState).update(dt);
        }
    }

    toPlayAnim(state: FourPlayerState, isPlay: boolean, guid: string, speed?: number, loop?: number) {
        let data: animData = { state: state, isPlay: isPlay, guid: guid, speed: speed, loop: loop };
        this.onPlayAnim.call(data);
    }

    toPlayEffect(state: FourPlayerState, configId: number) {
        this.onPlayEffect.call(configId);
    }
    toStopEffect(state: FourPlayerState, configId: number) {
        this.onStopEffect.call(configId);
    }
    /**获取当前状态 */
    public getCurState() {
        return this.curState;
    }



    startFSM() {
        this.changeState(FourPlayerState.IdleState);
    }

    stopFSM() {
        if (this.fsmStateMap.has(this.curState)) {
            this.fsmStateMap.get(this.curState).exit();
            this.curState = FourPlayerState.Stop;
        }
    }

    refreshFSM(cfgId: number) {
        this.stopFSM();
        this.configId = cfgId;//记录当前配置Id
        this.fsmStateMap.forEach((value, key) => {
            value.init(cfgId);
        });
    }
}









