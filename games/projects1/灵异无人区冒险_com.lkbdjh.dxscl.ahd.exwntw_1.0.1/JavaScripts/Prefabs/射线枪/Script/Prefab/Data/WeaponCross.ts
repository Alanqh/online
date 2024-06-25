@Serializable
export class WeaponCross {
    @mw.Property({ displayName: "最低扩散度" })
    public min: number = 10;
    @mw.Property({ displayName: "扩散每次射击增加" })
    public add: number = 2;
    @mw.Property({ displayName: "最大扩散度" })
    public max: number = 30;
}