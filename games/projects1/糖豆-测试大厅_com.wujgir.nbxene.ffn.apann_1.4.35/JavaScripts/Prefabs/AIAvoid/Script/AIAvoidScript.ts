/** 
* @Author       : lei.zhao
* @Date         : 2023-02-01 09:54:21
* @LastEditors  : lei.zhao
* @LastEditTime : 2023-02-20 15:06:05
* @FilePath     : \stumbleguys\Prefabs\AIAvoid\Script\AIAvoidScript.ts
* @Description  : 修改描述
*/
import { Humanoid } from "../../../../JavaScripts/AI/Humanoid";
import { CLAI } from "../../../AI/client/ClientAIService";
import { Utils } from '../../../tool/Utils';

@Serializable
class Range {
    @mw.Property({ displayName: "最小值" })
    public min: mw.Vector = new mw.Vector();
    @mw.Property({ displayName: "最大值" })
    public max: mw.Vector = new mw.Vector();
}

@Component
export default class AIAvoidScript extends mw.Script {
    /**
     * 避障目标，根据目标来进行避障
     */
    @mw.Property({ displayName: "目标Guid", group: "配置" })
    private targetId: string = ""
    @mw.Property({ displayName: "行走半径", group: "配置" })
    private range: number = 500;
    @mw.Property({ displayName: "是否生效", group: "旋转" })
    public isRotationCheck: boolean = false;
    @mw.Property({ displayName: "参数", arrayDefault: new Range(), group: "旋转" })
    private rotationRage: Range[] = [];
    @mw.Property({ displayName: "是否生效", group: "位置" })
    public isPositionCheck: boolean = false;
    @mw.Property({ displayName: "参数", arrayDefault: new Range(), group: "位置" })
    private positionRange: Range[] = [];


    private _targetObject: mw.GameObject;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (this.targetId) {
            this.waitTarget();
        }
        const trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add((humanoid: Character) => {
            if (Utils.isNpc(humanoid)) {
                if (humanoid["ai"]) {

                    const ai = humanoid["ai"] as Humanoid;
                    ai.waitForCondition(this.isCondition, this.range);
                } else {
                    CLAI.waitForCondition(humanoid, this.isCondition, this.range)
                }
            }
        });
    }

    /**是否满足条件 */
    private isCondition = () => {
        if (!this._targetObject) return false;
        let result = true;
        if (this.isRotationCheck) {
            result = this.checkWeight(this.rotationRage, this._targetObject.worldTransform.rotation);
        }
        if (result && this.isPositionCheck) {
            result = this.checkWeight(this.positionRange, this._targetObject.worldTransform.position);
        }
        return result;
    }
    /**
     * 检测条件分量
     * @param evi 
     * @returns 
     */
    private checkWeight(ranges: Range[], evi: { x: number, y: number, z: number }) {

        for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            if (this.isClamp(evi.x, range.max.x, range.min.x)
                && this.isClamp(evi.y, range.max.y, range.min.y)
                && this.isClamp(evi.z, range.max.z, range.min.z)) {
                return true;
            }
        }
        return false;

    }

    private isClamp(value: number, a: number, b: number) {
        return a < b ? (value >= a && value <= b) : (value >= b && value <= a);
    }

    /**获取目标 */
    private async waitTarget() {
        this._targetObject = await GameObject.asyncFindGameObjectById(this.targetId);

    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}