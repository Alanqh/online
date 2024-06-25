
@Component
export default class RotationInverval extends mw.Script {

    @mw.Property({ displayName: "开始时间" })
    private startTime: number = 0;
    @mw.Property({ displayName: "旋转间隔" })
    private interval: number = 0;
    @mw.Property({ displayName: "旋转时间" })
    private time: number = 0;
    @mw.Property({ displayName: "旋转角度" })
    private rotation: mw.Vector = new Vector(0, 0, 0);

    private curInverval: number = 0;
    private curTime: number = 0;
    private currentRotaion: mw.Rotation = new Rotation(0, 0, 0);
    private targetRotaion: mw.Rotation = new Rotation(0, 0, 0);
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.curInverval = 0;
        this.curTime = this.time;
        this.useUpdate = true;
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.startTime > 0) {
            this.startTime -= dt;
        } else {
            if (this.curTime < this.time) {
                this.curTime += dt;
                if (this.curTime >= this.time) {
                    this.curInverval = this.interval;
                    this.curTime = this.time;
                }
                this.gameObject.localTransform.rotation = mw.Rotation.lerp(this.currentRotaion, this.targetRotaion, this.curTime / this.time);
            }
            else if (this.curInverval <= 0) {
                this.currentRotaion.set(this.targetRotaion);
                this.targetRotaion.set(this.currentRotaion.x + this.rotation.x, this.currentRotaion.y + this.rotation.y, this.currentRotaion.z + this.rotation.z);
                this.curTime = 0;
            } else {
                this.curInverval -= dt;
            }

        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}