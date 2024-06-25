import { oTrace } from "odin";
import { GameConfig } from "../../../config/GameConfig";
import { IPetElement } from "../../../config/Pet";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { AIActType, AILockPath, AINormalPath, PathInfo } from "../AIPathUtil";
import { AIModelManager } from "./AIModelManager";
import { Swoop } from "./Swoop";

export enum stateType {
    /**复活 */
    Born = 1,
    /**待机 */
    Idle,
    /**走 */
    Walk,
    /**冲刺跑 */
    Run,
    /**跳 */
    Jump,
    /**滞空 */
    Hover,
    /**飞扑 */
    Fly,
    /**平地摔 */
    Fall,
    /**死亡 */
    Dead,
    /**结算 */
    Calculate,
    /**等待 */
    Wait,
    /**外部陷阱控制移动 */
    CtrlMove,
}

export class StateBase {
    fsm: StateManager;
    onEnter(...args: any) { }
    onUpdate(dt: number) { }
    onExit() { }
    onDestroy() { }
}



export class StateManager {
    private curstateType: stateType = stateType.Wait;
    private _stateMap: Map<stateType, StateBase> = new Map<stateType, StateBase>();
    private swoopArr: Swoop[] = []

    public curPathIndex: number = 0;
    public getPathInfoByIndex(index: number): PathInfo {
        if (this._useLockPath) {
            if (!this._lockPointList) return null;

            if (index >= this._lockPointList.pointList.length) return null;

            // oTrace('guan log index', index, "pos", this._lockPointList.pointList[index]);
            return this._lockPointList.pointList[index];
        }

        if (!this._pathPosMap) return null;
        let normalP = this._pathPosMap.get(index);
        return normalP.pointList[Math.floor(Math.random() * normalP.pointList.length)]
    }

    private _curState: StateBase = null;
    public get curState(): StateBase {
        return this._curState;
    }

    private _curAIObj: Character;
    public get curAIObj(): Character {
        return this._curAIObj;
    }

    public curPetCfg: IPetElement;
    public animCfg: IPetAnimationElement;
    private curCheckIndex: number = 0;
    public get CurCheckIndex() {
        return this.curCheckIndex;
    }

    private lockChangeState: boolean = false;
    public ctrlMove(moveTimer: number, moveSpeed: Vector) {
        this.changeState(stateType.CtrlMove, moveTimer, moveSpeed);
        this.lockChangeState = true;
    }

    public unlockChange() {
        this.lockChangeState = false;
    }

    /**固定路线标记 */
    private _useLockPath: boolean = false;
    private _lockPointList: AILockPath = null;
    private _pathPosMap: Map<number, AINormalPath> = null;
    private _maxIndex: number = 0;

    public init(aiModel: Character, useLockPath: boolean, lockPointList: Array<AILockPath>, pathPosMap: Map<number, AINormalPath>, petCfg: IPetElement) {
        this._curAIObj = aiModel;
        this.curPetCfg = petCfg;
        this.animCfg = GameConfig.PetAnimation.getElement(petCfg.animationSet);
        this._useLockPath = useLockPath
        // this._useLockPath = true;

        this._pathPosMap = null;
        this._lockPointList = null;

        if (this._useLockPath && lockPointList != null) {
            // 这里需要随机一条路线
            this._lockPointList = lockPointList[Math.floor(Math.random() * lockPointList.length)];
            this._maxIndex = this._lockPointList.pointList.length - 1;

            console.log(" this._lockPointList", this._lockPointList)
        } else {
            this._pathPosMap = pathPosMap;
            this._maxIndex = this._pathPosMap.size - 1;
        }
    }

    // private async findAllPathPos(pathParentObj: GameObject) {
    //     pathParentObj.getChildren().forEach(pathObj => {
    //         //获取当前点的index和类型
    //         let str = pathObj.name.split("_");
    //         if (str.length == 2) {
    //             let index = Number(str[0]);
    //             let type = Number(str[1]);
    //             if (!this._pathPosMap.has(index)) {
    //                 this._pathPosMap.set(index, new pathInfo(type, []));
    //             }
    //             pathObj.getChildren().forEach(posObj => {
    //                 let pos = posObj.worldTransform.position;
    //                 this._pathPosMap.get(index).pos.push(pos);
    //             })
    //         }
    //     })

    // }

    public registerState(state: stateType, stateBase: StateBase) {
        if (this._stateMap.has(state)) {
            return;
        }
        stateBase.fsm = this;
        this._stateMap.set(state, stateBase);
    }

    public changeState(state: stateType, ...args: any) {
        if (this.curstateType == state) {
            if (this.curstateType == stateType.CtrlMove) {
                this._curState.onEnter(...args);
            }
            return;
        }
        if (this.lockChangeState) {
            oTrace('guan log changeState 锁定状态', state, 'curstateType', this.curstateType, 'args', args);
            return;
        }
        if (this._curState) {
            this._curState.onExit();
        }
        if (!this._stateMap.has(state)) {
            console.error("=========>>>>> 未注册的状态", state);
            return;
        }
        this._curState = this._stateMap.get(state);
        this._curState.onEnter(...args);
        this.curstateType = state;
    }

    public changeStateByType(type: AIActType) {
        switch (type) {
            case AIActType.Born:
                this.changeState(stateType.Born);
                break;
            case AIActType.Walk:
            case AIActType.CheckPoint://检查点，只做记录
                this.changeState(stateType.Walk);
                break;
            case AIActType.Run:
                this.changeState(stateType.Run);
                break;
            case AIActType.Jump:
                this.changeState(stateType.Jump);
                break;
            case AIActType.Fly:
                this.changeState(stateType.Fly);
                break;
            case AIActType.Idle:
                this.changeState(stateType.Idle);
                break;
            case AIActType.Wait:
                this.changeState(stateType.Wait);
                break;
            default:
                break;
        }
    }

    public addCurIndex() {
        this.curPathIndex++;
        // oTrace('guan log this.curPathIndex', this.curPathIndex);
        if (this.curPathIndex > this._maxIndex - 1) {
            this.curPathIndex = this._maxIndex - 1;
        }
    }

    public setCurCheckIndex(index: number) {
        this.curCheckIndex = index;
    }

    public setCurPathIndex(index: number) {
        this.curPathIndex = index;
    }

    public subCurIndex() {
        this.curPathIndex--;
        if (this.curPathIndex < 0) {
            this.curPathIndex = 0;
        }
    }

    private unuseList: Swoop[] = []

    public update(dt: number) {
        if (this._curState) {
            this._curState.onUpdate(dt);
        }
        for (let i = 0; i < this.swoopArr.length; i++) {
            if (this.swoopArr[i].onUpdate(dt)) {
                this.unuseList.push(this.swoopArr[i]);
            }
        }
        if (this.unuseList.length > 0) {
            for (let i = 0; i < this.unuseList.length; i++) {
                let index = this.swoopArr.indexOf(this.unuseList[i]);
                this.swoopArr.splice(index)
            }
            this.unuseList.length = 0;
        }
    }

    public swoop(obj: Character, forceV: Vector, upV: Vector, posY: number) {
        if (this.swoopArr.find(i => i.aiModel == obj)) return;
        this.swoopArr.push(new Swoop(obj, forceV, upV, posY, this.animCfg.RunGuid, this.animCfg.RunRate));
    }

    public reback() {
        AIModelManager.Instance.rebackModel(this.curAIObj);
        this._curAIObj = null;

        this._stateMap.forEach((state, type) => {
            state.onDestroy();
        })
        this._stateMap.clear();
    }

}