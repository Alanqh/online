/** 
 * @Author       : chenxinyu
 * @Date         : 2023-09-12 15:43:45
 * @LastEditors  : chenxinyu
 * @LastEditTime : 2023-10-16 18:20:01
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GhostFSM.ts
 * @Description  : 修改描述
 */

import { ZwtTween } from "../tool/ZwtTween";


/**幽灵状态接口类 */
export class IGhostState {
    //状态名称
    private _stateName: string = "IGhostState"
    public get StateName(): string {
        return this._stateName
    }
    public set StateName(v: string) {
        this._stateName = v;
    }

    //控制者
    protected _controller: GhostStateController = null

    //构造函数
    constructor(controller: GhostStateController) {
        this._controller = controller
    }

    /**开始 */
    public StateBegin(): void { }

    /**结束 */
    public StateEnd(): void { }

    /**更新 */
    public StateUpdate(): void { }
}

export class GhostSleepState extends IGhostState {
    private _idleEffect: Effect = null
    private _randNum: number
    private _interNum: number
    private ghostID: string

    constructor(controller: GhostStateController, effect: Effect, ghost: string) {
        super(controller)
        this._idleEffect = effect
        this.StateName = "GhostSleepState"
        this.ghostID = ghost
    }

    public override StateBegin(): void {
        this._idleEffect.forceStop()
        setTimeout(() => {
            this._interNum = setInterval(() => {
                this._randNum = Math.random()
            }, 3000)
        }, 10000);
    }

    public override StateUpdate(): void {
        if (this._randNum > 0.7) {
            //30%概率进入idle状态
            this._controller.SetState(new GhostIdleState(this._controller, this.ghostID))
            clearInterval(this._interNum)
        }
    }
}

export class GhostIdleState extends IGhostState {
    private ghostID: string

    constructor(controller: GhostStateController, ghost: string) {
        super(controller)
        this.StateName = "GhostIdleState"
        this.ghostID = ghost
    }

    public override StateBegin(): void {
        //找到幽灵模型
        Event.dispatchToLocal("GhostIdleState", this.ghostID)
    }
}

export class GhostScareState extends IGhostState {
    private ghost: mw.IntegratedMover
    private tweenIdle: mw.Tween<{ rot: Rotation }>
    private showEffect: Effect

    constructor(controller: GhostStateController, ghost, tweenIdle: mw.Tween<{ rot: Rotation }>, showEffect: Effect) {
        super(controller)
        this.StateName = "GhostScareState"
        this.ghost = ghost
        this.tweenIdle = tweenIdle
        this.showEffect = showEffect
    }

    public override StateBegin(): void {
        //鬼出来
        this.tweenIdle.pause()
        this.showEffect.forceStop()
        this.showEffect.play()
        new ZwtTween(this.ghost)
            .moveTo(Vector.zero, 0.5, true)
            .moveTo(new Vector(40, 0, 0), 0.2, true)
            .moveTo(new Vector(-40, 0, 0), 0.2, true)
            .moveTo(new Vector(40, 0, 0), 0.2, true)
            .moveTo(new Vector(-40, 0, 0), 0.2, true)
            .moveTo(Vector.zero, 0.1, true)
            .moveTo(new Vector(0, 0, -75), 0.5, true)
            .start()
    }
}

export default class GhostStateController {
    private m_state: IGhostState
    private m_bRunBegin = false

    constructor() { }

    /** 设置状态*/
    public SetState(state: IGhostState): void {
        this.m_bRunBegin = false
        this.m_state = state
    }

    /**更新 */
    public StateUpdate(): void {
        //通知新的State开始
        if (this.m_state != null && this.m_bRunBegin == false) {
            this.m_state.StateBegin()
            this.m_bRunBegin = true
        }

        if (this.m_state != null) {
            this.m_state.StateUpdate()
        }
    }
}