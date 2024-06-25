
abstract class WeaponAction {
    abstract shootAnimation: string;
    abstract reloadAnimation: string;
    abstract holdStance: string;

    public get assetGuids(): string[] {
        return [this.shootAnimation, this.reloadAnimation, this.holdStance];
    }
}

@Serializable
export class MaleAction extends WeaponAction {
    @mw.Property({ displayName: "射击动画" })
    shootAnimation: string = "80483";
    @mw.Property({ displayName: "换弹动画" })
    reloadAnimation: string = "80479";
    @mw.Property({ displayName: "姿态" })
    holdStance: string = "94261";
}
@Serializable
export class FemaleAction extends WeaponAction {
    @mw.Property({ displayName: "射击动画" })
    shootAnimation: string = "49095";
    @mw.Property({ displayName: "换弹动画" })
    reloadAnimation: string = "80479";
    @mw.Property({ displayName: "姿态" })
    holdStance: string = "49098";
}