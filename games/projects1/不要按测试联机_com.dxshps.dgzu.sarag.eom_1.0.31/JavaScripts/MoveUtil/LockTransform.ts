
@Component
export default class LockTransform extends Script {

    @mw.Property({ group: "锁定设置", displayName: "锁定位移,世界轴向" })
    private lock_Position: boolean = false;
    @mw.Property({ group: "锁定设置", displayName: "锁定旋转,世界轴向" })
    private lock_Rotate: boolean = false;
    @mw.Property({ group: "锁定设置", displayName: "锁定缩放,世界轴向" })
    private lock_Scale: boolean = false;

    @mw.Property({ group: "锁定设置", displayName: "检测帧间隔" })
    private lock_Check: number = 2;

    private m_Transform: Transform = null;
    private checkTimer: number = 0;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.initClient();
        }
    }

    private async initClient() {
        await this.gameObject.asyncReady();
        if (!this.lock_Position && !this.lock_Rotate && !this.lock_Scale) {
            console.log("不需要锁定任何值");
            return;
        }
        this.m_Transform = this.gameObject.worldTransform.clone();
        this.useUpdate = true;
        this.checkTimer = 0;
    }


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        this.checkTimer++;
        if (this.checkTimer < this.lock_Check || this.m_Transform == null) {
            return;
        }
        this.checkTimer = 0;
        if (this.lock_Position && !Vector.equals(this.m_Transform.position, this.gameObject.worldTransform.position)) {
            this.gameObject.worldTransform.position = this.m_Transform.position;
        }
        if (this.lock_Rotate && !this.m_Transform.rotation.equals(this.gameObject.worldTransform.rotation)) {
            this.gameObject.worldTransform.rotation = this.m_Transform.rotation;
        }
        if (this.lock_Scale && !Vector.equals(this.m_Transform.scale, this.gameObject.worldTransform.scale)) {
            this.gameObject.worldTransform.scale = this.m_Transform.scale;
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this.useUpdate = false;
        this.m_Transform = null;
    }
}