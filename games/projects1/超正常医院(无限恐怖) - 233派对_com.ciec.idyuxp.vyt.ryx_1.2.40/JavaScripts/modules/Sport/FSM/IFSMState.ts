 
export interface IFSMState {
  
    /**
     * 状态类型
     */
    stateType:number;
    
    /**
     * 名字
     */
    name:string 
    /**
    * 状态进入，外部调用
    */
    enter(currentState: number,param?:any): void; 
    /**
     * 更新，外部驱动
     */
    onUpdate(dt: number);
    /**
     * 退出状态外部调用
     */
    exit(param?:any);

    /**
     * 销毁
     */
    onDestory();
    /**
     * 能否切换
     */
    canEnter();

    /**
    * 能否退出
    */
    canEixt();
}