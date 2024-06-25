import { ModifiedCameraSystem } from "./Modified027Editor/ModifiedCamera";
import CommonTrigger from "./Prefabs/CommonTrigger";

const TempV3 = new Rotation();

@Component
export default class CameraOffset extends CommonTrigger {
    @mw.Property({ displayName: "目标物体guid", capture: true })
    targetGuid: string = ""
    @mw.Property({ displayName: "延迟速度" })
    private delaySpeed: number = 3;

    targetObj: GameObject = null

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        super.onStart();
        if (this.targetGuid) {
            GameObject.asyncFindGameObjectById(this.targetGuid).then((target: GameObject) => {
                if (target) {
                    this.targetObj = target
                    if (!SystemUtil.isPIE) this.targetObj.setVisibility(false)
                }
            })
        }
    }

    triggerEnterSelf(): void {
        const cs = Camera.currentCamera;
        const tran = cs.worldTransform.clone();
        tran.rotation = this.targetObj.worldTransform.position.subtract(cs.worldTransform.position).toRotation()
        cs.rotationLagEnabled = true;
        cs.rotationLagSpeed = this.delaySpeed;
        ModifiedCameraSystem.setOverrideCameraRotation(tran.rotation);
        setTimeout(() => {
            ModifiedCameraSystem.resetOverrideCameraRotation();
        }, 100);
        setTimeout(() => {
            cs.rotationLagEnabled = false;
            cs.rotationLagSpeed = 10;
        }, 2000);
    }

    triggerLeaveSelf(): void {
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