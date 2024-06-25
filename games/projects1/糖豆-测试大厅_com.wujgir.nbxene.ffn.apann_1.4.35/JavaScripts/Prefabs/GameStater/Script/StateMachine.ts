/*
 * @Author: YuKun.Gao
 * @Date: 2022-02-28 20:13:11
 * @LastEditors: zhaolei
 * @LastEditTime: 2022-06-22 17:47:36
 * @Description: 状态机
 * @FilePath: \JavaScripts\Tools\StateMachine.ts
 */

/**状态接口 */
interface IState<T> {
    owner: T;
    machine: StateMachine<T>;
    /**
     * 进入状态
     * @param params 
     */
    onStateEnter(...params: any[]): void;
    /**
     * 创建时
     * @param params 
     */
    onCreate(): void;
    /**
    * 更新
    * @param params 
    */
    onStateUpdate(dt: number): void;
    /**
     * 退出状态
     */
    onStateExit(): void;
}

export abstract class BaseState<T> implements IState<T> {
    constructor(public owner: T, public machine: StateMachine<T>) {

    }
    abstract onStateEnter(...params: any[]);
    abstract onCreate();
    abstract onStateUpdate(dt: number);
    abstract onStateExit();

}



/**状态机 */
export class StateMachine<T> {

    /**
     * 目标
     */
    public target: T;
    /**当前状态 */
    private _curState: IState<T>;
    /**下一个状态 */
    private _nextState: IState<T>;
    /**下一个状态进入参数 */
    private _nextStateParams: any[];

    private _stateList: IState<T>[];
    //状态进入监听
    private _onStateEnter: (state: IState<T>) => void;
    //状态退出监听
    private _onStateExit: (state: IState<T>) => void;
    /**初始化状态机,第0个为默认状态 */
    constructor(obj: T, ...states: { new(target, machine): IState<T> }[]) {
        this._stateList = [];
        this.target = obj;
        if (states.length > 0) {
            states.forEach(state => {
                let stateObj = new state(obj, this);
                stateObj.onCreate();
                this._stateList.push(stateObj);
            });
            this._curState = this._stateList[0];
            this._curState.onStateEnter();
        }
    }
    public changeTarget(obj: T) {
        this.target = obj;
        this._stateList.forEach(state => {
            state.owner = obj;
        });
    }
    /**当前状态 */
    public get currentState() {
        return this._curState;
    }
    public set currentState(v) {
        this._curState = v;
    }

    /**切换状态 */
    public changeState(state: new (target, machine) => IState<T>, ...params: any[]): void {
        if (this.currentState && this.currentState.constructor.name == state.name) return;
        this._nextState = this.getState(state);
        this._nextStateParams = params;
    }
    /**
     * 获取状态
     * @param state 
     * @returns 
     */
    public getState<K extends IState<T>>(state: new (target, machine) => K): K {
        let stateInst = this._stateList.find(i => i.constructor.name == state.name) as K;
        if (!stateInst) {
            stateInst = new state(this.target, this);
            stateInst.onCreate();
            this._stateList.push(stateInst);
        }
        return stateInst;
    }
    /**更新状态机 */
    public update(dt: number): void {
        if (this._curState != null) {
            this._curState.onStateUpdate(dt);
        }
        if (this._nextState) {
            this.doChangeState();
        }
    }
    /**
     * 设置状态进入监听
     * @param callback 
     */
    public setStateEnterListener(callback: (state: IState<T>) => void) {
        this._onStateEnter = callback;
    }
    /**
   * 设置状态退出监听
   * @param callback 
   */
    public setStateExitListener(callback: (state: IState<T>) => void) {
        this._onStateExit = callback;
    }
    private doChangeState() {

        if (this._nextState == this._curState) return;
        if (this._curState != null) {
            this._curState.onStateExit();
            if (this._onStateExit) {
                this._onStateExit(this._curState);
            }
        }
        this._curState = this._nextState;
        this._curState.onStateEnter(...this._nextStateParams);
        if (this._onStateEnter) {
            this._onStateEnter(this._curState);
        }
        this._nextState = null;
    }



}