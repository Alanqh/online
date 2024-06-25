/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-16 16:01:04
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-07 11:52:45
 * @FilePath     : \stumbleguys\JavaScripts\prefabs\CameraRuntime\Script\CameraNode.ts
 * @Description  : 修改描述
 */
declare const UE;
declare const puerts;
import { Data } from "./Data";
const LERP = new UE.Vector(0, 0, 0);
/**线性运动 */
function lerp(a, b, lerp: number) {
    LERP.X = a.X + (b.X - a.X) * lerp;
    LERP.Y = a.Y + (b.Y - a.Y) * lerp;
    LERP.Z = a.Z + (b.Z - a.Z) * lerp;
    return LERP;
}
/**贝塞尔运动 */
function bezier(a: { X: number, Y: number, Z: number }, b: { X: number, Y: number, Z: number }, c: { X: number, Y: number, Z: number }, t: number) {
    const t1 = (1 - t) * (1 - t);
    const t2 = (1 - t) * t * 2;
    const t3 = t * t;
    LERP.Set(t1 * a.X + t2 * b.X + t3 * c.X, t1 * a.Y + t2 * b.Y + t3 * c.Y, t1 * a.Z + t2 * b.Z + t3 * c.Z);
    return LERP;
}
class Transform {

    constructor(private position, private rotation) {

    }
    /**更新参数 */
    public refresh(position: number[], rotation: number[]) {
        this.position.X = position[0];
        this.position.Y = position[1];
        this.position.Z = position[2];
        this.rotation = new UE.Rotator(rotation[1], rotation[2], rotation[0]).Quaternion();
    }

    /**计算偏移 */
    public update(percent: number, pre: Transform, next: Transform, camera) {
        percent = MathUtil.clamp(0, 1, percent);
        if (pre) {
            const rot = next ? UE.Quat.Slerp(pre.rotation, next.rotation, percent).Rotator() : UE.Quat.Slerp(pre.rotation, this.rotation, percent).Rotator();
            const pos = next ? bezier(pre.position, this.position, next.position, percent) : lerp(pre.position, this.position, percent);
            camera.K2_SetWorldLocationAndRotation(pos, rot, false, null, false);
        } else {
            camera.K2_SetWorldLocationAndRotation(this.position, this.rotation.Rotator(), false, null, false);
        }
    }

}
export class CameraNode {
    /**变换坐标 */
    public transform: Transform;
    /**前一个节点 */
    private _preNode: CameraNode;
    /**后一个节点 */
    private _nextNode: CameraNode;
    /**持续时间*/
    private time: number;
    /**当前时间 */
    private currentTime: number = 0;
    /**单段*/
    private spawnTime: number = 0;

    constructor(public data: Data) {
        this.time = data.time;
        this.transform = new Transform(
            new UE.Vector(data.position[0], data.position[1], data.position[2]),
            new UE.Rotator(data.rotation[1], data.rotation[2], data.rotation[0]).Quaternion());
        data.onChanged.add(data => {
            this.transform.refresh(data.position, data.rotation);
        });
    }

    public set passTime(time: number) {
        this.currentTime = time;
    }

    /**持续时间 */
    public get lifeTime() {
        return this.time;
    }


    /**设置前一个节点，用作变换 */
    public setBezierNode(preNode: CameraNode, nextNode: CameraNode) {
        this._preNode = preNode;
        this._nextNode = nextNode;
        this.spawnTime = nextNode ? (nextNode.time - preNode.time) : (this.time - preNode.time);
    }
    public update(camera, isFollow: boolean, dt: number) {
        this.currentTime += dt;
        !isFollow && this.transform.update(this.currentTime / this.spawnTime, this._preNode ? this._preNode.transform : null, this._nextNode ? this._nextNode.transform : null, camera);
        let isFinished = !this._preNode || this.currentTime >= this.spawnTime;
        if (isFinished) {
            this.currentTime = 0;
        }
        return isFinished;
    }
}