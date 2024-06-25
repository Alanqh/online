export interface IFSMState {
    /**
    * 状态进入，外部调用
    */
    enter(currentState: number, lastState: number): void;//,
    /**
     * 更新，外部驱动
     */
    onUpdate(dt: number);
    /**
     * 退出状态外部调用
     */
    exit();

    /**
     * 销毁
     */
    onDestory();
    /**
     * 切换状态
     * @param type 状态类型
     */
    change2State(type: number): void

}
