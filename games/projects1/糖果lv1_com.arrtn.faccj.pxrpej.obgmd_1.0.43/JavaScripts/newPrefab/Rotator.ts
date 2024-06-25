/** 
 * @Author       : weihao.xu
 * @Date         : 2023-06-25 16:32:25
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-06-26 10:06:57
 * @FilePath     : \stumbleguys\JavaScripts\newPrefab\Rotator.ts
 * @Description  : 修改描述
 */
@Component
export default class Rotator extends mw.Script {
    @mw.Property({ displayName: "旋转度数" })
    private angle: number = 60;
    @mw.Property({ displayName: "速度" })
    private speed: number = 60;
    @mw.Property({ displayName: "循环延迟" })
    private delay: number = 1;
    @mw.Property({ displayName: "启动延迟" })
    private startDelay: number = 1;
    private tempAngle: number = 0;
    private tempRotation: Rotation;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            setTimeout(() => {
                this.useUpdate = true;
                this.tempRotation = this.gameObject.worldTransform.rotation.clone();
            }, this.startDelay * 1000);
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        let sub = dt * this.speed;
        this.tempAngle += sub;
        if (this.tempAngle >= this.angle) {
            // 校准
            if (this.speed > 0) {
                sub -= this.tempAngle - this.angle;
            } else {
                sub += this.angle - this.tempAngle;
            }
        }
        this.tempRotation.z += sub;
        if (this.tempRotation.z >= 360) {
            this.tempRotation.z -= 360;
        } else if (this.tempRotation.z <= -360) {
            this.tempRotation.z += 360;
        }
        this.gameObject.worldTransform.rotation = (this.tempRotation);
        if (this.tempAngle >= this.angle) {
            this.useUpdate = false;
            setTimeout(() => {
                this.tempAngle = 0;
                this.useUpdate = true;
            }, this.delay * 1000);
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}