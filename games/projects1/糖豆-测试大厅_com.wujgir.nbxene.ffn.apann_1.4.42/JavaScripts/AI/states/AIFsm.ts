import { AIConst } from "../hook/AIConst";

export interface IState {
    onUpdate(dt: number);
    onEnter(...params);
}
class RandomWalkState implements IState {

    /**原始目的地 */
    private dist: mw.Vector;
    private position: mw.Vector = new mw.Vector();
    private birthLoc: mw.Vector = new mw.Vector();

    /**检测卡住，如果坐标不动就卡住，做后续处理 */
    private checkStunTime: number = 2;
    private checkStunPosition: mw.Vector = new mw.Vector();
    constructor(private fsm: AIFsm) {

    }

    onUpdate(dt: number) {
        this.fsm.character.addMovement(mw.Vector.forward);
        this.fsm.character.lookAt(this.position);
        const loc = this.fsm.character.worldTransform.position;
        if (mw.Vector2.squaredDistance(this.position, loc) < 1600) {
            //到达
            if (this.dist) {
                this.fsm.walkTo(this.dist, null);
            } else {
                this.position.set(MathUtil.randomFloat(-300, 300), MathUtil.randomFloat(-300, 300), 0);
                mw.Vector.add(this.birthLoc, this.position, this.position);
            }
        }
        if (this.checkStunTime <= 0) {
            this.checkStunTime = MathUtil.randomFloat(2, 5);
            if (mw.Vector.squaredDistance(this.checkStunPosition, loc) < 900) {
                //未动
                if (this.dist) {
                    this.fsm.walkTo(this.dist, null);
                } else {
                    this.position.set(MathUtil.randomFloat(-300, 300), MathUtil.randomFloat(-300, 300), 0);
                    mw.Vector.add(this.birthLoc, this.position, this.position);
                }
            }
            this.checkStunPosition.set(loc);
        }
        this.checkStunTime -= dt;

    }
    onEnter(dist: mw.Vector, range: number = 200, time?: number) {
        if (!time) time = MathUtil.randomFloat(AIConst.roundWalkTime / 2, AIConst.roundWalkTime);
        range = time * this.fsm.character.maxWalkSpeed;
        this.birthLoc.set(this.fsm.character.worldTransform.position);
        this.position.set(MathUtil.randomFloat(-range, range), MathUtil.randomFloat(-range, range), 0);
        mw.Vector.add(this.birthLoc, this.position, this.position);
        this.dist = dist;
    }
}

class EliminateState implements IState {
    private time: number;
    constructor(private fsm: AIFsm) {

    }
    onUpdate(dt: number) {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time <= 0 && !this.fsm.character["isWinner"]) {
                this.fsm.character.ragdollEnabled = false;
                this.fsm.character.movementEnabled = false;
                this.fsm.character.setVisibility(mw.PropertyStatus.Off, true);
            }
        }
    }
    onEnter(...params: any[]) {
        this.time = 2;
        this.fsm.character.ragdollEnabled = true;
    }


}
/**
 * 结束状态，乱走
 */
class FinishState implements IState {

    /**原始目的地 */
    private position: mw.Vector = new mw.Vector();
    private time: number = 0;
    constructor(private fsm: AIFsm) {

    }

    onUpdate(dt: number) {
        if (this.time > 0) {
            this.time -= dt;
            return;
        }
        this.fsm.character.addMovement(mw.Vector.forward);
        this.fsm.character.lookAt(this.position);
        const loc = this.fsm.character.worldTransform.position;
        if (mw.Vector2.squaredDistance(this.position, loc) < 1600) {
            //到达
            this.fsm.walkAround();
        }
    }
    onEnter() {
        this.time = MathUtil.randomFloat(3, 6);
        const forward = this.fsm.character.worldTransform.rotation;
        forward.z += MathUtil.randomFloat(-30, 30);
        this.position.set(MathUtil.randomFloat(500, 2000), 0, 0);
        const temp = forward.rotateVector(this.position)
        mw.Vector.add(this.fsm.character.worldTransform.position, temp, this.position)
    }
}
/**
 * 困住状态
 */
class BubbleState implements IState {
    private time: number;
    private height: number;
    private lastTime: number;
    private location: mw.Vector;
    private zReset: number;
    constructor(private fsm: AIFsm) {

    }
    onUpdate(dt: number) {
        if (this.lastTime > 0) {
            this.lastTime -= dt;
            const height = MathUtil.lerp(0, this.height, 1 - this.lastTime / this.time);
            this.location.z = this.zReset + height;
            this.fsm.character.worldTransform.position = this.location;
            if (this.lastTime <= 0) {
                this.fsm.character.switchToWalking();
                this.fsm.walkTo(null, null);
            }
        }
    }
    onEnter(location: mw.Vector, time: number, height: number) {
        this.time = time;
        this.zReset = location.z + 80;
        this.location = location;
        this.lastTime = time;
        this.height = height;
        this.fsm.character.switchToFlying();
    }

}
class WalkToState implements IState {
    public targetObject: mw.GameObject;
    private onSuccess: (owner: Character) => void;

    /**最大行走时间 */
    private maxWalkTime: number = 10;

    /**检测卡住，如果坐标不动就卡住，做后续处理 */
    private checkStunTime: number = 10;
    private checkStunPosition: mw.Vector = new mw.Vector();
    private success: (npcLocation: Vector, objectLocation: Vector) => boolean;
    constructor(private fsm: AIFsm) {
        this.checkStunTime = MathUtil.randomFloat(5, 10);
        this.maxWalkTime = MathUtil.randomFloat(2, 8);
    }
    onEnter(targetObject: mw.GameObject, onSuccess: (owner: Character) => void, success?: (npcLocation: Vector, objectLocation: Vector) => boolean) {
        this.targetObject = targetObject;
        this.onSuccess = onSuccess;
        this.success = success;
        this.checkStunPosition.set(this.fsm.character.worldTransform.position);
    }
    onUpdate(dt: number) {
        if (!this.targetObject) return;
        const dist = this.targetObject.worldTransform.position;
        const loc = this.fsm.character.worldTransform.position;
        if (this.checkStunTime <= 0) {
            this.checkStunTime = MathUtil.randomFloat(5, 10);
            if (mw.Vector2.squaredDistance(this.checkStunPosition, loc) < 900) {
                //未动
                this.fsm.changeState(RandomWalkState, dist, MathUtil.randomFloat(2, 5));
                return;
            }
            this.checkStunPosition.set(loc);
        }
        if (this.maxWalkTime > 0 && AIConst.roundWalkInterval && AIConst.roundWalkTime) {
            this.maxWalkTime -= dt;
            if (this.maxWalkTime <= 0) {
                this.maxWalkTime = MathUtil.randomFloat(AIConst.roundWalkInterval / 2, AIConst.roundWalkInterval);
                this.fsm.changeState(RandomWalkState, dist);
                return;
            }
        }
        this.checkStunTime -= dt;
        if ((this.success && this.success(loc, dist)) || mw.Vector2.squaredDistance(dist, loc) < 3600) {//
            //达到
            this.fsm.idel();
            this.onSuccess && this.onSuccess(this.fsm.character);
        } else {
            this.fsm.character.lookAt(dist);
            this.fsm.character.addMovement(mw.Vector.forward);
        }
    }
}
class WalkState implements IState {
    private position: Vector = new Vector();
    private targetPosition: Vector = null;
    private onSuccess: (target: mw.Vector) => void;

    /**最大行走时间 */
    private maxWalkTime: number = 10;

    /**检测卡住，如果坐标不动就卡住，做后续处理 */
    private checkStunTime: number = 10;
    private checkStunPosition: mw.Vector = new mw.Vector();
    private offset: number = 0;
    private isFaraway = false;
    constructor(private fsm: AIFsm) {
        this.checkStunTime = MathUtil.randomFloat(5, 10);
        this.maxWalkTime = MathUtil.randomFloat(2, 8);
    }
    onEnter(position: Vector, onSuccess: (target: mw.Vector) => void, offset: number) {
        this.checkStunPosition.set(this.fsm.character.worldTransform.position);
        onSuccess && (this.onSuccess = onSuccess);
        if (offset) {
            this.offset = offset;
        }
        if (position) {
            this.targetPosition = position;
        }
        if (this.targetPosition)
            this.position.set(this.targetPosition.x, this.targetPosition.y, this.targetPosition.z);
        if (this.offset && this.fsm.target) {
            let rot = MathUtil.randomFloat(-Math.PI, Math.PI);
            this.position.x += Math.cos(rot) * this.offset;
            this.position.y += Math.sin(rot) * this.offset;
        }
        this.isFaraway = false;
    }
    private faraway() {
        if (!this.isFaraway && this.offset && this.fsm.target) {
            const loc = this.fsm.character.worldTransform.position;
            if (mw.Vector2.squaredDistance(this.fsm.target, loc) < 2000000) {
                let rot = Math.atan2(this.fsm.target.y - loc.y, this.fsm.target.x - loc.x);
                rot += Math.PI + MathUtil.randomFloat(-Math.PI / 6, Math.PI / 6);
                this.position.x = loc.x + Math.cos(rot) * this.offset;
                this.position.y = loc.y + Math.sin(rot) * this.offset;
                this.isFaraway = true;
            }
        }
    }
    onUpdate(dt: number) {
        if (!this.targetPosition) return;
        const loc = this.fsm.character.worldTransform.position;
        if (this.checkStunTime <= 0) {
            this.checkStunTime = MathUtil.randomFloat(5, 10);
            if (mw.Vector2.squaredDistance(this.checkStunPosition, loc) < 900) {
                //未动
                this.fsm.changeState(RandomWalkState, this.targetPosition, MathUtil.randomFloat(2, 5));
                return;
            }
            this.checkStunPosition.set(loc);
        }
        if (this.maxWalkTime > 0 && AIConst.roundWalkInterval && AIConst.roundWalkTime) {
            this.maxWalkTime -= dt;
            if (this.maxWalkTime <= 0) {
                this.maxWalkTime = MathUtil.randomFloat(AIConst.roundWalkInterval / 2, AIConst.roundWalkInterval);
                this.fsm.changeState(RandomWalkState, this.targetPosition);
                return;
            }
        }
        this.checkStunTime -= dt;
        if (mw.Vector2.squaredDistance(this.position, loc) < 1600) {//
            //达到
            this.fsm.idel();
            this.onSuccess && this.onSuccess(this.targetPosition);
        } else {
            this.faraway();
            this.fsm.character.lookAt(this.position);
            this.fsm.character.addMovement(mw.Vector.forward);
        }
    }
}
export class AIFsm {




    private currentState: IState;

    private stateMap: Map<string, IState>;
    private _nextState: IState;
    private _nextStateParam: any[];
    private isKeepJump: boolean;
    private nextJumpTime: number;
    public target: mw.Vector;

    constructor(public character: Character) {
        //用AI强行记录一下，方便访问
        this.stateMap = new Map();
        this.nextJumpTime = MathUtil.randomFloat(2, 7);
    }
    public keepJump(isKeep: boolean) {
        this.isKeepJump = isKeep;
    }
    public forceState(stateClass: { new(fsm): IState }, ...params) {
        this._nextState = this.stateMap.get(stateClass.name);
        if (!this._nextState) {
            this._nextState = new stateClass(this);
            this.stateMap.set(stateClass.name, this._nextState);
        }
        this._nextStateParam = params;
    }
    public changeState(stateClass: { new(fsm): IState }, ...params) {
        if (this.currentState && this.currentState.constructor.name == stateClass.name) return;
        this.forceState(stateClass, ...params);
    }
    public bubble(location: mw.Vector, time: number, height: number) {
        this.changeState(BubbleState, location, time, height);
    }
    public get isFinish() {
        return this.currentState && this.currentState instanceof FinishState;
    }
    public eliminate() {
        this.changeState(EliminateState);
    }
    public finish() {
        this.changeState(FinishState);
    }
    public watch() {
    }
    public RandomWalk(position: Vector, range: number, time?: number) {
        this.changeState(RandomWalkState, position, range, time);
    }
    public walkToObject(targetObject: mw.GameObject, onSuccess: (owner: Character) => void, success?: (npcLocation: Vector, objectLocation: Vector) => boolean) {
        if (this.currentState && this.currentState instanceof WalkToState) {
            this.currentState.targetObject = targetObject;
        } else {
            this.changeState(WalkToState, targetObject, onSuccess, success);
        }
    }
    public walkTo(position: Vector, onSuccess?: (target: mw.Vector) => void, isForce: boolean = false, offset: number = 0) {
        isForce ? this.forceState(WalkState, position, onSuccess, offset) : this.changeState(WalkState, position, onSuccess, offset);
    }
    /**
     * 更新主逻辑
     * @param dt 
     */
    public onUpdate(dt: number) {
        if (this._nextState) {
            this._nextState.onEnter(...this._nextStateParam);
            this.currentState = this._nextState;
            this._nextState = null;
        }
        this.currentState && this.currentState.onUpdate(dt);
        if (this.isKeepJump) {
            this.nextJumpTime -= dt;
            if (this.nextJumpTime <= 0) {
                this.nextJumpTime = MathUtil.randomFloat(1, 2);
                this.character.jump();
            }
        }
    }
    /**
     * 附近乱走
     */
    public walkAround() {
        this.changeState(RandomWalkState);
    }
    public idel() {
        this.currentState = null;
    }

    public get isIdel() {
        return !this.currentState;
    }
}
