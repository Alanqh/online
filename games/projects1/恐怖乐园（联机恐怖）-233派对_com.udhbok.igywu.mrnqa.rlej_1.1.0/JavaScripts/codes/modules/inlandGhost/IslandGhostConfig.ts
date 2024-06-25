
@Component
export default class IslandGhostConfig extends Script {
    public static instance: IslandGhostConfig;

    @mw.Property({ displayName: "白天刷新的鬼" })
    public dayGhosts: number[] = [1];

    @mw.Property({ displayName: "晚上刷新的鬼" })
    public nightGhosts: number[] = [1];

    @mw.Property({ displayName: "一直存在的鬼" })
    public alwaysGhots: number[] = [1];

    protected onStart(): void {
        IslandGhostConfig.instance = this;
    }
}
