import { GlobalData } from "../../const/GlobalData";
import NWeaponBase from "./nHotWeaponBase";

@Component
export default class nfanWeapon extends NWeaponBase {

    @mw.Property({ displayName: "发射动作", group: "发射设置" })
    protected fireAction: string = "20246";
    @mw.Property({ displayName: "发射姿态", group: "发射设置" })
    protected firePose: string = "295002";

    @mw.Property({ displayName: "发射间隔", group: "发射设置", range: { min: 0.1, max: 10 } })
    protected fireInterval: number = 1.5;

    private recoverTime: any = null;

    init(cfgId: number) {

        super.init(cfgId);
        this.bulletCount = this.currentClipSize;
    }

    /**开火 */
    protected fire(): void {
        super.fire();
        this.recoverBullet();
    }

    /**恢复子弹 */
    private recoverBullet() {
        if (this.recoverTime) return;

        console.warn(`lwj 计时`);
        this.recoverTime = TimeUtil.setInterval(() => {
            this.bulletCount += 1;
            if (this.onStartFire) this.onStartFire(this.bulletCount);
            if (this.bulletCount >= this.currentClipSize) {
                this.bulletCount = this.currentClipSize;
                if (this.onStartFire) this.onStartFire(this.bulletCount);
                this.clearRecovrer();
            }
        }, GlobalData.Gun.fanRecoverTime)
    }

    private clearRecovrer() {
        if (this.recoverTime) {
            console.warn(`lwj 清楚`);
            TimeUtil.clearInterval(this.recoverTime);
            this.recoverTime = null;
        }
    }

    public unequip(): void {
        super.unequip();
        this.clearRecovrer();
    }
}