import { ClassInstance } from "../tools/ClassInstance/ClassInstance";
import { Axle, MoveType } from "./MoveScript";

class MoveUpdate {
    private obj: GameObject;
    private speed: Vector;
    private moveType: MoveType;
    private delayTime: number = 0;
    private forward: Vector;
    private right: Vector;
    private up: Vector;
    constructor(obj: GameObject, speed: Vector, moveType: MoveType, delayTime: number) {
        this.obj = obj;
        this.speed = speed;
        this.moveType = moveType;
        this.delayTime = delayTime;
        this.forward = this.obj.localTransform.getForwardVector();
        this.right = this.obj.localTransform.getRightVector();
        this.up = this.obj.localTransform.getUpVector();

    }

    public update(dt: number) {
        if (this.delayTime > 0) {
            this.delayTime -= dt;
            return;
        }
        if (this.moveType == MoveType.World) {
            let pos = ClassInstance.getVectorClone(this.obj.worldTransform.position);
            let speedClone = ClassInstance.getVectorClone(this.speed);
            this.obj.worldTransform.position = pos.add(speedClone.multiply(dt));
        }
        else if (this.moveType == MoveType.Local) {
            let forward = ClassInstance.getVectorClone(this.forward).normalized.multiply(this.speed.x);
            let right = ClassInstance.getVectorClone(this.right).normalized.multiply(this.speed.y);
            let up = ClassInstance.getVectorClone(this.up).normalized.multiply(this.speed.z);
            Vector.add(forward, right, right);
            Vector.add(right, up, up);
            let res = up.multiply(dt);
            let pos = ClassInstance.getVectorClone(this.obj.localTransform.position);
            this.obj.localTransform.position = pos.add(res);
        }
    }
}

class RotUpdate {
    private obj: GameObject;
    // 每秒钟旋转速度
    private speed: Vector;
    // 当前旋转值
    private tmpRot: Quaternion;
    private delayTime: number = 0;
    constructor(obj: GameObject, speed: Vector, moveType: MoveType, delayTime: number) {
        this.obj = obj;
        this.speed = speed;
        this.delayTime = delayTime;
        this.tmpRot = this.obj.localTransform.rotation.toQuaternion();
    }

    public update(dt: number) {
        if (this.delayTime > 0) {
            this.delayTime -= dt;
            return;
        }
        // 根据speed和dt计算出需要旋转的Rotation 代表xyz轴的旋转角度
        let addSpeed = ClassInstance.newc<Vector>(Vector);
        Vector.multiply(this.speed, dt, addSpeed);

        // 跟MoveType无关。只改相对旋转
        Quaternion.rotateX(this.tmpRot, addSpeed.x * Math.PI / 180, this.tmpRot);
        Quaternion.rotateY(this.tmpRot, addSpeed.y * Math.PI / 180, this.tmpRot);
        Quaternion.rotateZ(this.tmpRot, addSpeed.z * Math.PI / 180, this.tmpRot);
        let rot = ClassInstance.newc<Rotation>(Rotation);
        Rotation.fromQuaternion(this.tmpRot, rot);
        this.obj.localTransform.rotation = rot;
        ClassInstance.delete(addSpeed);
        ClassInstance.delete(rot);
    }
}

class ScaleUpdate {
    private obj: GameObject;
    private speed: Vector;
    private moveType: MoveType;
    private delayTime: number = 0;
    constructor(obj: GameObject, speed: Vector, moveType: MoveType, delayTime: number) {
        this.obj = obj;
        this.speed = speed;
        this.moveType = moveType;
        this.delayTime = delayTime;
    }


    public update(dt: number) {
        if (this.delayTime > 0) {
            this.delayTime -= dt;
            return;
        }
        let speed = ClassInstance.getVectorClone(this.speed);
        let scale = ClassInstance.getVectorClone(this.getObjMoveScale(this.obj));
        let addRot = speed.multiply(dt);
        scale.add(addRot);
        this.setObjMoveScale(this.obj, scale);
    }

    private getObjMoveScale(obj: GameObject) {
        if (this.moveType == MoveType.World) {
            return obj.worldTransform.scale;
        }
        return obj.localTransform.scale;
    }
    private setObjMoveScale(obj: GameObject, scale: Vector) {
        if (this.moveType == MoveType.World) {
            obj.worldTransform.scale = scale;
            return;
        }
        obj.localTransform.scale = scale;
    }
}


enum MoveState {
    Waiting,
    Moving,
}
// 重复单程移动
export class MoveUpdateRepeat {
    private startPos: Vector;
    private curPos: Vector = Vector.zero;// 操作的坐标
    private timer: number = -1;
    private myState: MoveState = MoveState.Waiting;

    public onRestart: Action = new Action();
    public onMoveEnd: Action = new Action();
    constructor(
        private obj: GameObject,
        private speed: Vector,
        private moveTimer: number,
        private moveType: MoveType,
        private delayTime: number,
        private restartTime: number
    ) {
        this.startPos = this.obj.worldTransform.position.clone();
        this.timer = TimeUtil.elapsedTime() + this.delayTime;
        this.myState = MoveState.Waiting;
    }

    update(dt: number) {
        if (this.myState == MoveState.Waiting) {
            if (TimeUtil.elapsedTime() < this.timer) {
                return;
            }
            this.myState = MoveState.Moving;
            this.curPos.x = this.startPos.x;
            this.curPos.y = this.startPos.y;
            this.curPos.z = this.startPos.z;

            this.timer = TimeUtil.elapsedTime() + this.moveTimer;
            this.setPos();
            this.obj.setVisibility(PropertyStatus.On, true);
            this.onRestart?.call();
            return
        }

        if (TimeUtil.elapsedTime() >= this.timer) {
            // 移动时间到
            this.obj.setVisibility(PropertyStatus.Off, true);
            this.timer = TimeUtil.elapsedTime() + this.restartTime;
            this.myState = MoveState.Waiting;
            this.onMoveEnd?.call();
            return;
        }
        let speedClone = ClassInstance.getVectorClone(this.speed);
        Vector.multiply(speedClone, dt, speedClone);
        Vector.add(this.curPos, speedClone, this.curPos);
        this.setPos();
    }

    private setPos() {
        if (this.moveType == MoveType.Local) {
            this.obj.localTransform.position = this.curPos;
        } else {
            this.obj.worldTransform.position = this.curPos;
        }
    }
}
// 重复移动
type RepeatSettingType = {
    repeat: boolean;
    restartTime: number;
    moveTimer: number;
}
// YOYO设置
type YOYOSettingType = {
    YOYO: boolean;
    moveTime: number;
    goStopTime: number;
    backStopTime: number;
}

class RotateUpdateRepeat {
    private tmpRot: Quaternion = Quaternion.identity;
    private timer: number = -1;
    private myState: MoveState = MoveState.Waiting;

    constructor(
        private obj: GameObject,
        private speed: Vector,
        private moveTimer: number,
        private moveType: MoveType,
        private delayTime: number,
        private restartTime: number
    ) {
        this.timer = TimeUtil.elapsedTime() + this.delayTime;
        this.myState = MoveState.Waiting;
        this.tmpRot = this.obj.localTransform.rotation.toQuaternion();
    }

    update(dt: number) {
        if (this.myState == MoveState.Waiting) {
            if (TimeUtil.elapsedTime() < this.timer) {
                return;
            }
            this.myState = MoveState.Moving;
            this.timer = TimeUtil.elapsedTime() + this.moveTimer;
            return
        }

        if (TimeUtil.elapsedTime() >= this.timer) {
            // 移动时间到
            this.timer = TimeUtil.elapsedTime() + this.restartTime;
            this.myState = MoveState.Waiting;
            return;
        }
        let addSpeed = ClassInstance.getVectorClone(this.speed);
        Vector.multiply(addSpeed, dt, addSpeed);

        // 跟MoveType无关。只改相对旋转
        Quaternion.rotateX(this.tmpRot, addSpeed.x * Math.PI / 180, this.tmpRot);
        Quaternion.rotateY(this.tmpRot, addSpeed.y * Math.PI / 180, this.tmpRot);
        Quaternion.rotateZ(this.tmpRot, addSpeed.z * Math.PI / 180, this.tmpRot);

        let rot = ClassInstance.newc<Rotation>(Rotation);
        Rotation.fromQuaternion(this.tmpRot, rot);
        this.obj.localTransform.rotation = rot;
        ClassInstance.delete(rot);
    }
}


export default class MoveObj {
    private moveUpdate: MoveUpdate;
    private moveRepeatUpdate: MoveUpdateRepeat;
    private rotUpdate: RotUpdate;
    private rotRepeatUpdate: RotateUpdateRepeat;

    private scaleUpdate: ScaleUpdate;
    private obj: GameObject;
    private tweenArray: Array<Tween<any>> = new Array<Tween<any>>();
    private useUpdate: boolean = true;
    private isDelay: boolean = false;

    public constructor(obj: GameObject) {
        this.obj = obj
    }

    public moveTween(moveType: MoveType,
        speed: Vector,
        delayTime: number,
        repeatSetting: RepeatSettingType,
        yoyoSetting: YOYOSettingType) {
        if (yoyoSetting == null) {

            if (repeatSetting.repeat) {
                this.moveRepeatUpdate = new MoveUpdateRepeat(this.obj, speed, repeatSetting.moveTimer, moveType, delayTime, repeatSetting.restartTime)
            } else {
                this.moveUpdate = new MoveUpdate(this.obj, speed, moveType, delayTime);
            }

            return;
        }
        let startPos = this.obj.worldTransform.position.clone();
        let endPos = this.getMoveEndPos(this.obj, speed, yoyoSetting.moveTime, moveType);
        let movePos: Vector = Vector.zero;
        let tween = new Tween<{ x: number, y: number, z: number }>({ x: startPos.x, y: startPos.y, z: startPos.z })
            .to({ x: endPos.x, y: endPos.y, z: endPos.z }, yoyoSetting.moveTime * 1000)
            .onUpdate((dt) => {
                movePos.x = dt.x;
                movePos.y = dt.y;
                movePos.z = dt.z;
                if (moveType == MoveType.Local) {
                    this.obj.localTransform.position = movePos;
                    return;
                }
                this.obj.worldTransform.position = movePos;
            })
            .delay(delayTime * 1000)
            .repeatDelay(0);

        let tween2 = new Tween<{ x: number, y: number, z: number }>({ x: endPos.x, y: endPos.y, z: endPos.z })
            .to({ x: startPos.x, y: startPos.y, z: startPos.z }, yoyoSetting.moveTime * 1000)
            .onUpdate((dt) => {
                movePos.x = dt.x;
                movePos.y = dt.y;
                movePos.z = dt.z;
                if (moveType == MoveType.Local) {
                    this.obj.localTransform.position = movePos;
                    return;
                }
                this.obj.worldTransform.position = movePos;
            })
            .delay(yoyoSetting.goStopTime * 1000);

        let tween3 = new Tween<{ x: number, y: number, z: number }>({ x: startPos.x, y: startPos.y, z: startPos.z })
            .to({ x: endPos.x, y: endPos.y, z: endPos.z }, yoyoSetting.moveTime * 1000)
            .onUpdate((dt) => {
                movePos.x = dt.x;
                movePos.y = dt.y;
                movePos.z = dt.z;
                if (moveType == MoveType.Local) {
                    this.obj.localTransform.position = movePos;
                    return;
                }
                this.obj.worldTransform.position = movePos;
            })
            .delay(yoyoSetting.backStopTime * 1000);
        tween.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween2);
        tween.start();
        this.tweenArray.push(tween);
        this.tweenArray.push(tween2);
        this.tweenArray.push(tween3);
    }

    public rotateTween(rotateType: MoveType,
        speed: Vector,
        delayTime: number,
        repeatSetting: RepeatSettingType,
        yoyoSetting: YOYOSettingType) {
        if (yoyoSetting == null) {
            if (repeatSetting.repeat) {
                this.rotRepeatUpdate = new RotateUpdateRepeat(this.obj, speed, repeatSetting.moveTimer, rotateType, delayTime, repeatSetting.restartTime)
            } else {
                this.rotUpdate = new RotUpdate(this.obj, speed, rotateType, delayTime);
            }
            return;
        }

        let startRot = this.obj.localTransform.rotation.clone();
        let endRot = speed.multiply(yoyoSetting.moveTime);
        let rot: Vector = Vector.zero;
        let tween = new Tween<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 })
            .to({ x: endRot.x, y: endRot.y, z: endRot.z }, yoyoSetting.moveTime * 1000)
            .onUpdate((dt) => {
                rot.x = dt.x;
                rot.y = dt.y;
                rot.z = dt.z;
                this.setMoveRot(this.obj, startRot, rot, rotateType);
            })
            .delay(delayTime * 1000)
            .repeatDelay(0);

        let tween2 = new Tween<{ x: number, y: number, z: number }>({ x: endRot.x, y: endRot.y, z: endRot.z })
            .to({ x: 0, y: 0, z: 0 }, yoyoSetting.moveTime * 1000)
            .onUpdate((dt) => {
                rot.x = dt.x;
                rot.y = dt.y;
                rot.z = dt.z;
                this.setMoveRot(this.obj, startRot, rot, rotateType);
            })
            .delay(yoyoSetting.goStopTime * 1000);


        let tween3 = new Tween<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 })
            .to({ x: endRot.x, y: endRot.y, z: endRot.z }, yoyoSetting.moveTime * 1000)
            .onUpdate((dt) => {
                rot.x = dt.x;
                rot.y = dt.y;
                rot.z = dt.z;
                this.setMoveRot(this.obj, startRot, rot, rotateType);
            })
            .delay(yoyoSetting.backStopTime * 1000);
        tween.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween2);
        tween.start();
        this.tweenArray.push(tween);
        this.tweenArray.push(tween2);
        this.tweenArray.push(tween3);
    }

    // public rotateTween(rotateType: MoveType, speed: Vector, repeat: boolean, onceTime: number, goWait: number, backWait: number, delayTime: number) {
    //     if (!repeat) {
    //         this.rotUpdate = new RotUpdate(this.obj, speed, rotateType, delayTime);
    //         return;
    //     }
    //     let startRot = this.getStartRot(this.obj, rotateType);
    //     let endRot = speed.multiply(onceTime);
    //     let rot: Vector = Vector.zero;
    //     let tween = new Tween<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 })
    //         .to({ x: endRot.x, y: endRot.y, z: endRot.z }, onceTime * 1000)
    //         .onUpdate((dt) => {
    //             rot.x = dt.x;
    //             rot.y = dt.y;
    //             rot.z = dt.z;
    //             this.setMoveRot(this.obj, startRot, rot, rotateType);
    //         })
    //         .delay(delayTime * 1000)
    //         .repeatDelay(0);

    //     let tween2 = new Tween<{ x: number, y: number, z: number }>({ x: endRot.x, y: endRot.y, z: endRot.z })
    //         .to({ x: 0, y: 0, z: 0 }, onceTime * 1000)
    //         .onUpdate((dt) => {
    //             rot.x = dt.x;
    //             rot.y = dt.y;
    //             rot.z = dt.z;
    //             this.setMoveRot(this.obj, startRot, rot, rotateType);
    //         })
    //         .delay(goWait * 1000);


    //     let tween3 = new Tween<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 })
    //         .to({ x: endRot.x, y: endRot.y, z: endRot.z }, onceTime * 1000)
    //         .onUpdate((dt) => {
    //             rot.x = dt.x;
    //             rot.y = dt.y;
    //             rot.z = dt.z;
    //             this.setMoveRot(this.obj, startRot, rot, rotateType);
    //         })
    //         .delay(backWait * 1000);
    //     tween.chain(tween2);
    //     tween2.chain(tween3);
    //     tween3.chain(tween2);
    //     tween.start();
    //     this.tweenArray.push(tween);
    //     this.tweenArray.push(tween2);
    //     this.tweenArray.push(tween3);
    // }

    public scaleTween(scaleType: MoveType, speed: Vector, repeat: boolean, onceTime: number, goWait: number, backWait: number, delayTime: number) {
        if (!repeat) {
            this.scaleUpdate = new ScaleUpdate(this.obj, speed, scaleType, delayTime);
            return;
        }
        let startPos = this.getMoveStartScale(this.obj, scaleType);
        let endPos = startPos.clone().add(speed.multiply(onceTime));
        let dtPos = Vector.zero;
        let tween = new Tween<{ x: number, y: number, z: number }>({ x: startPos.x, y: startPos.y, z: startPos.z })
            .to({ x: endPos.x, y: endPos.y, z: endPos.z }, onceTime * 1000)
            .onUpdate((dt) => {
                dtPos.x = dt.x;
                dtPos.y = dt.y;
                dtPos.z = dt.z;
                if (scaleType == MoveType.World) {
                    this.obj.worldTransform.scale = dtPos;
                    return;
                }
                this.obj.localTransform.scale = dtPos;
            })
            .delay(delayTime * 1000)
            .repeatDelay(0);

        let tween2 = new Tween<{ x: number, y: number, z: number }>({ x: endPos.x, y: endPos.y, z: endPos.z })
            .to({ x: startPos.x, y: startPos.y, z: startPos.z }, onceTime * 1000)
            .onUpdate((dt) => {
                dtPos.x = dt.x;
                dtPos.y = dt.y;
                dtPos.z = dt.z;
                if (scaleType == MoveType.World) {
                    this.obj.worldTransform.scale = dtPos;
                    return;
                }
                this.obj.localTransform.scale = dtPos;
            })
            .delay(goWait * 1000);


        let tween3 = new Tween<{ x: number, y: number, z: number }>({ x: startPos.x, y: startPos.y, z: startPos.z })
            .to({ x: endPos.x, y: endPos.y, z: endPos.z }, onceTime * 1000)
            .onUpdate((dt) => {
                dtPos.x = dt.x;
                dtPos.y = dt.y;
                dtPos.z = dt.z;
                if (scaleType == MoveType.World) {
                    this.obj.worldTransform.scale = dtPos;
                    return;
                }
                this.obj.localTransform.scale = dtPos;
            })
            .delay(backWait * 1000);
        tween.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween2);
        tween.start();
        this.tweenArray.push(tween);
        this.tweenArray.push(tween2);
        this.tweenArray.push(tween3);
    }

    public swingTween(speed: number, axle: Axle, maxAngle: number, moveType: MoveType, delayTime: number) {
        let startRot: Rotation = this.getSwingStartRot(this.obj, moveType, axle, maxAngle, speed);
        let firstDir = speed > 0 ? 1 : -1;
        let endRot: Vector = Vector.zero;
        /**一次摆动是两个angle相加 */
        if (axle == Axle.X) {
            endRot.x = 2 * maxAngle * firstDir;
        }
        else if (axle == Axle.Y) {
            endRot.y = 2 * maxAngle * firstDir;
        }
        else {
            endRot.z = 2 * maxAngle * firstDir;
        }
        // if (moveType == MoveType.World) {
        //     this.obj.worldTransform.rotation = startRot.clone();
        // }
        // else {
        // }
        this.obj.localTransform.rotation = startRot.clone();
        let dtRot = Vector.zero;
        let tween = new Tween<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 })
            /**时间也是按照两个angle来计算的 */
            .to({ x: endRot.x, y: endRot.y, z: endRot.z }, Math.abs(2 * maxAngle / speed * 1000))
            .onUpdate((dt) => {
                dtRot.x = dt.x;
                dtRot.y = dt.y;
                dtRot.z = dt.z;
                this.setMoveRot(this.obj, startRot, dtRot, moveType);
            })
            .yoyo(true)
            .easing(TweenUtil.Easing.Quadratic.InOut)
            .delay(delayTime * 1000)
            .repeatDelay(0)
            .repeat(Infinity);
        tween.start();
        this.tweenArray.push(tween);

    }

    private getMoveStartScale(obj: GameObject, moveType: MoveType) {
        if (moveType == MoveType.World) {
            return obj.worldTransform.scale;
        }
        else {
            return obj.localTransform.scale;
        }
    }

    // /**本地旋转需要拿localtransform */
    // private getStartRot(obj: GameObject, moveType: MoveType) {
    //     if (moveType == MoveType.World) {
    //         return this.obj.worldTransform.rotation.clone();
    //     }
    //     else {
    //         return this.obj.localTransform.rotation.clone();
    //     }
    // }

    /**速度小于零开始的时候先 */
    private getSwingStartRot(obj: GameObject, moveType: MoveType, axle: Axle, maxAngle: number, speed: number) {
        let firstRot = speed > 0 ? -1 : 1;
        let res: Rotation;

        // if (moveType == MoveType.World) {
        //     let rot = obj.worldTransform.rotation.clone();
        //     if (axle == Axle.X) {
        //         rot.x += maxAngle * firstRot;
        //     }
        //     else if (axle == Axle.Y) {
        //         rot.y += maxAngle * firstRot;
        //     }
        //     else if (axle == Axle.Z) {
        //         rot.z += maxAngle * firstRot;
        //     }
        //     res = rot;
        // }
        // else {
        // }
        let rot = obj.localTransform.rotation.clone();
        if (axle == Axle.X) {
            let qua = rot.toQuaternion();
            Quaternion.rotateX(qua, maxAngle * firstRot * Math.PI / 180, qua);
            res = qua.toRotation();
        }
        else if (axle == Axle.Y) {
            let qua = rot.toQuaternion();
            Quaternion.rotateY(qua, maxAngle * firstRot * Math.PI / 180, qua);
            res = qua.toRotation();
        }
        else if (axle == Axle.Z) {
            let qua = rot.toQuaternion();
            Quaternion.rotateZ(qua, maxAngle * firstRot * Math.PI / 180, qua);
            res = qua.toRotation();
        }
        return res;
    }

    public resumeObj() {
        this.tweenArray.forEach((value) => {
            value.resume();
        })
        this.useUpdate = true;
    }

    public stopObj() {
        this.tweenArray.forEach((value) => {
            value.stop();
        })
        this.useUpdate = false;
    }

    private setMoveRot(obj: GameObject, orginRot: Rotation, angle: Vector, moveType: MoveType) {
        // let rotClone = ClassInstance.getRotateClone(orginRot);
        // let addRot = ClassInstance.newc<Rotation>(Rotation);
        // addRot.x = angle.x;
        // addRot.y = angle.y;
        // addRot.z = angle.z;
        // if (moveType == MoveType.World) {
        //     obj.worldTransform.rotation = rotClone.add(addRot);
        // }
        // else {
        //     //角度变弧度
        let qua = ClassInstance.newc<Quaternion>(Quaternion);
        Quaternion.fromRotation(orginRot, qua);
        Quaternion.rotateX(qua, angle.x * Math.PI / 180, qua);
        Quaternion.rotateY(qua, angle.y * Math.PI / 180, qua);
        Quaternion.rotateZ(qua, angle.z * Math.PI / 180, qua);
        obj.localTransform.rotation = qua.toRotation();
        // }

        ClassInstance.delete(qua);


    }
    /**别在update里面调用 */
    private getMoveEndPos(obj: GameObject, speed: Vector, time: number, moveType: MoveType) {
        let pos = obj.worldTransform.position.clone();
        if (moveType == MoveType.World) {
            return pos.add(speed.multiply(time));
        }
        else if (moveType == MoveType.Local) {
            let forward = obj.localTransform.getForwardVector().normalized.multiply(speed.x);
            let right = obj.localTransform.getRightVector().normalized.multiply(speed.y);
            let up = obj.localTransform.getUpVector().normalized.multiply(speed.z);
            Vector.add(forward, right, right);
            Vector.add(right, up, up);
            let res = up.multiply(time);
            return obj.localTransform.position.clone().add(res);
        }
    }

    public update(dt: number) {
        if (!this.useUpdate) {
            return;
        }
        if (this.isDelay) {
            return;
        }
        if (this.moveUpdate) {
            this.moveUpdate.update(dt);
        }
        if (this.moveRepeatUpdate) {
            this.moveRepeatUpdate.update(dt);
        }
        if (this.rotUpdate) {
            this.rotUpdate.update(dt);
        }
        if (this.rotRepeatUpdate) {
            this.rotRepeatUpdate.update(dt);
        }
        if (this.scaleUpdate) {
            this.scaleUpdate.update(dt);
        }
    }
}

