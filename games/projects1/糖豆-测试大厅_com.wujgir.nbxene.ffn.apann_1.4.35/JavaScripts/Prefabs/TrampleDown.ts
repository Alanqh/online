enum TrampleType {
    Down,
    Up
}
@Component
export default class TrampleDown extends mw.Script {

    @mw.Property({ displayName: "触发器", capture: true })
    private trigger: string = "";
    @mw.Property({ displayName: "升起时间" })
    private keepTime: number = 1;
    @mw.Property({ displayName: "下落速度" })
    private speed: number = 50;
    @mw.Property({ displayName: "人数加权速度" })
    private mulitspeed: number = 10;
    @mw.Property({ displayName: "下落距离" })
    private downLimit: number = 100;
    @mw.Property({ displayName: "上升速度" })
    private upSpeed: number = 100;
    @mw.Property({ displayName: "方向", enumType: TrampleType })
    private dir: number = TrampleType.Down;

    private upCount: number = 0;
    /**
     * 向下移动速度
     */
    private downSpeed: number = 0;
    private downZ: number = 0;
    /**
     * 初始Z坐标
     */
    private resetZ: number = 0;
    private resetTime: number = 0;
    private resetLocation: mw.Vector = new mw.Vector();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.resetLocation.set(this.gameObject.worldTransform.position);
        this.resetZ = this.resetLocation.z;
        this.downZ = this.resetZ - (this.dir == TrampleType.Down ? this.downLimit : -this.downLimit);
        GameObject.asyncFindGameObjectById(this.trigger).then((trigger: mw.Trigger) => {
            trigger.onEnter.add(obj => {
                if (obj instanceof mw.Pawn) {
                    this.upCount++;
                    this.downSpeed = this.speed + this.mulitspeed * this.upCount;
                    this.useUpdate = true;
                }
            });
            trigger.onLeave.add(obj => {
                if (obj instanceof mw.Pawn) {
                    if (this.upCount > 0) {
                        this.resetTime = this.keepTime;
                        this.upCount--;
                        this.downSpeed = this.upCount == 0 ? 0 : (this.speed + this.mulitspeed * this.upCount);
                        this.useUpdate = this.downSpeed == 0;
                    }
                }
            });
        });
    }

    private moveTo(target: number, speed: number, dt: number) {
        if (this.resetLocation.z > target) {
            this.resetLocation.z -= speed * dt;
            if (this.resetLocation.z <= target) {
                this.resetLocation.z = target;
                return true;
            }
        } else if (this.resetLocation.z < target) {
            this.resetLocation.z += speed * dt;
            if (this.resetLocation.z >= target) {
                this.resetLocation.z = target;
                return true;
            }
        }
        return false;
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.downSpeed) {
            const isFinish = this.moveTo(this.downZ, this.downSpeed, dt);
            if (isFinish) {
                this.useUpdate = false;
            }
            this.gameObject.worldTransform.position = this.resetLocation;
        } else {
            if (this.resetTime > 0) {
                this.resetTime -= dt;
            } else {
                const isFinish = this.moveTo(this.resetZ, this.upSpeed, dt);
                if (isFinish) {
                    this.useUpdate = false;
                }
                this.gameObject.worldTransform.position = this.resetLocation;
            }
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}