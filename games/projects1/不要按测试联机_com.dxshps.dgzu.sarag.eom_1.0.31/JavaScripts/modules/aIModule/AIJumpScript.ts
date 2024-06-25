import { AIManager_C } from "./AIManager_C";

@Component
export default class AIJumpScript extends Script {

    @Property({ displayName: "向前力的大小" })
    private force: number = 100;

    @Property({ displayName: "向上冲量大小" })
    private upForce: number = 0;

    @Property({ displayName: "到达高度后执行前冲,自身Z轴代码加" })
    private posZ: number = 0;

    private upV: Vector = null;
    protected onStart(): void {
        if (!this.isRunningClient()) {
            return;
        }
        if (this.upForce > 0) {
            this.upV = new Vector(0, 0, this.upForce);
        }
        const trigger = this.gameObject as Trigger;
        const endY = this.gameObject.worldTransform.position.z + this.posZ;
        trigger.onEnter.add(obj => {
            if (obj instanceof Character) {
                let fsm = AIManager_C.Instance.getFsmByObjectId(obj.gameObjectId);
                if (!fsm) return;
                let forceV: Vector = null;
                if (this.force > 0) {
                    forceV = obj.worldTransform.getForwardVector().multiply(this.force);
                }
                fsm.swoop(obj, forceV, this.upV, endY);
            }
        })
    }
}