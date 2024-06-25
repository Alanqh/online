import { oTrace, oTraceError } from "odin";
import { IFSMState } from "./IFSMState";

export class FSMManager {
    //当前状态
    private currentState: IFSMState = null;
    //状态集合
    private stateMap = new Map<number, IFSMState>();
    //当前状态类型
    private currentStateType: number = 0;
    public get getCurState() {
        return this.currentStateType;
    }
    //状态改变事件
    public onStateAc: Action1<number> = new Action1();

    public getStateNameFunc: (type: number) => string = null;
    private getStateName(type: number) {
        if (this.getStateNameFunc) {
            return this.getStateNameFunc(type);
        }
        return type + "";
    }

    /**
     * 注册状态
     * @param type 状态机类型
     * @param newstate 状态对象
     */
    public register(type: number, newstate: IFSMState) {
        if (this.stateMap.has(type) == false) {
            this.stateMap.set(type, newstate);
        }
    }
    /**
    * 状态轮询：调用子状态
    */
    public update(dt: number) {
        if (this.currentState) {
            this.currentState.onUpdate(dt);
        }
    }

    /**
    * 切换状态：立即转换到新的状态（参数自己注册时填写）
    * @param type 新的状态
    */
    public changeState(type: number): void {
        oTrace("====>切换状态：" + type + ",name:" + this.getStateName(type));
        let lastState = this.currentStateType;
        // 先退出当前状态
        if (this.currentState) {
            try {
                this.currentState.exit();
            } catch (e) {
                oTraceError("lastState exit:" + this.getStateName(lastState) + ",error:" + e);
            }
            this.currentState = null;
            this.currentStateType = 0;
        }
        // 接着步入新状态：是否已存在了
        if (this.stateMap == null) {
            return;
        }
        let state = this.stateMap.get(type);
        if (state == null) {
            return;
        }
        try {
            state.enter(type, lastState);//lastState
        } catch (e) {
            oTraceError("new state enter:" + this.getStateName(type) + ",error:" + e);
        }
        this.currentState = state;
        this.currentStateType = type;
        this.onStateAc.call(type)
    }
    public destory() {
        if (this.currentState) {
            this.currentState.exit();
            this.currentState = null;
        }
        this.stateMap.forEach(state => {
            state.onDestory();
        })
        this.stateMap.clear();
        this.stateMap = null;
    }

}
