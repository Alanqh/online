
export abstract class BaseState {
    /**状态机 */
    fsm: StateMachine;
    get owner(): mw.Character {
        return this.fsm.owner;
    }
    abstract init(cfgId: number): void;
    abstract enter(...param: any[]): void;
    abstract update(dt: number): void;
    abstract exit(): void;
}



export interface StateMachine {
    owner: mw.Character;
    /**状态集合 */
    fsmStateMap: Map<number, BaseState>;

    registerState(type: number, state: BaseState): void;
    init(character: mw.Character, startType: number): void
    changeState(state: number, ...param: any[]): void
    update(dt: number): void
    toPlayAnim(state: number, isPlay: boolean, guid: string, speed?: number, loop?: number): void
    toPlayEffect(state: number, configId: number): void
    toStopEffect(state: number, configId: number): void

}

