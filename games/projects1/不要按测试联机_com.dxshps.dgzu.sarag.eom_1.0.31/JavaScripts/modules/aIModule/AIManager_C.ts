import { oTrace } from "odin";
import { IAINameElement } from "../../config/AIName";
import { GameConfig } from "../../config/GameConfig";
import { IPetElement } from "../../config/Pet";
import { CameraUtil } from "../../utils/CameraUtil";
import GameComUtils from "../../utils/GameComUtils";
import { AIModelManager } from "./AIMachine/AIModelManager";
import { StateManager, stateType } from "./AIMachine/AIStateManager";
import { AICheckPointInfo } from "./AIModuleC";
import { AILockPath, AINormalPath } from "./AIPathUtil";
import { BornState } from "./AIState/BornState";
import { CalculateState } from "./AIState/CalculateState";
import { CtrlMoveState } from "./AIState/CtrlMoveState";
import { DeadState } from "./AIState/DeadState";
import { IdleState } from "./AIState/IdleState";
import { JumpState } from "./AIState/JumpState";
import { WaitState } from "./AIState/WaitState";
import { WalkState } from "./AIState/WalkState";

export class AIManager_C {

    private static _instance: AIManager_C;

    public static get Instance(): AIManager_C {
        if (this._instance == null) {
            this._instance = new AIManager_C();
        }
        return this._instance;
    }

    private petClothCfgs: IPetElement[] = GameConfig.Pet.getAllElement();
    private aiNameCfgs: IAINameElement[] = GameConfig.AIName.getAllElement();
    private fsmArr: StateManager[] = [];
    private _aicheckPointMap: Map<Character, AICheckPointInfo> = new Map<Character, AICheckPointInfo>();
    public get FsmArr() {
        return Array.from(this.fsmArr);
    }

    public async setNewAI(useLockPath: boolean, lockPointList: Array<AILockPath>, pathPosMap: Map<number, AINormalPath>, bornPos: Vector, rot: Rotation) {
        let model = await AIModelManager.Instance.getModel();
        this.setAIInfo(model, useLockPath, lockPointList, pathPosMap, bornPos, rot);
        if (this._aicheckPointMap.has(model)) { return; }
        CameraUtil.addWatchObj(model.gameObjectId, model.displayName);
        this._aicheckPointMap.set(model, new AICheckPointInfo());
    }

    private setAIInfo(model: Character, useLockPath: boolean, lockPointList: Array<AILockPath>, pathPosMap: Map<number, AINormalPath>, bornPos: Vector, rot: Rotation) {
        let petClothCfg = null;
        do {
            petClothCfg = this.petClothCfgs[Math.floor(Math.random() * this.petClothCfgs.length)];
        }
        while (StringUtil.isEmpty(petClothCfg.guid));

        let aiNameCfg = this.aiNameCfgs[Math.floor(Math.random() * this.aiNameCfgs.length)];
        model.displayName = aiNameCfg.Name;
        GameComUtils.changeCharacterToAnimal(model, petClothCfg.id);
        let fsm = this.initAIFSM(model, useLockPath, lockPointList, pathPosMap, petClothCfg);
        fsm.changeState(stateType.Born, bornPos)
        model.worldTransform.rotation = rot;
    }

    private initAIFSM(aiModel: Character, useLockPath: boolean, lockPointList: Array<AILockPath>, pathPosMap: Map<number, AINormalPath>, curPetCfg: IPetElement) {
        let fsm = new StateManager();
        fsm.init(aiModel, useLockPath, lockPointList, pathPosMap, curPetCfg);
        fsm.registerState(stateType.Born, new BornState());
        fsm.registerState(stateType.Idle, new IdleState());
        fsm.registerState(stateType.Walk, new WalkState());
        // fsm.registerState(stateType.Run, new StateBase());
        fsm.registerState(stateType.Jump, new JumpState());
        // fsm.registerState(stateType.Hover, new StateBase());
        // fsm.registerState(stateType.Fly, new StateBase());
        // fsm.registerState(stateType.Fall, new StateBase());
        fsm.registerState(stateType.Dead, new DeadState());
        fsm.registerState(stateType.Calculate, new CalculateState());
        fsm.registerState(stateType.Wait, new WaitState());
        fsm.registerState(stateType.CtrlMove, new CtrlMoveState());
        this.fsmArr.push(fsm);
        return fsm;
    }

    public changeAllFsmState(state: stateType) {
        this.fsmArr.forEach(fsm => {
            fsm.changeState(state);
        })
    }

    public getFsmByObjectId(id: string) {
        return this.fsmArr.find(f => { return f.curAIObj.gameObjectId == id });
    }

    public checkIsAiById(objId: string) {
        let fsm = this.fsmArr.find(fsm => { return fsm.curAIObj.gameObjectId == objId });
        return fsm ? true : false;
    }

    public changeAIFSMByID(objId: string, state: stateType) {
        let fsm = this.fsmArr.find(fsm => { return fsm.curAIObj.gameObjectId == objId });
        if (!fsm) return;
        fsm.changeState(state);
    }

    public onUpdate(dt: number): void {
        if (this.fsmArr.length == 0) return;
        this.fsmArr.forEach((fsm) => {
            fsm.update(dt);
        })
    }

    /**
     * 外部控制移动
     * @param char 
     * @param isOn 
     */
    public ctrlMove(char: Character, moveTimer: number, moveSpeed: Vector) {
        let fsm = this.fsmArr.find(fsm => { return fsm.curAIObj == char });
        if (!fsm) {
            oTrace('guan log ctrlMove 没找到', char);
            return;
        }
        fsm.ctrlMove(moveTimer, moveSpeed);
    }

    public findAICheckPointInfoByObj(obj: Character) {
        if (this._aicheckPointMap.has(obj) == false) return false
        return this._aicheckPointMap.get(obj);
    }

    public rebackAllFsm() {
        this.fsmArr.forEach(fsm => {
            fsm.reback();
        })
        this.fsmArr.length = 0;
        this._aicheckPointMap.forEach((value, model) => {
            CameraUtil.removeWatchObj(model.gameObjectId);
        })
        this._aicheckPointMap.clear();
    }
}