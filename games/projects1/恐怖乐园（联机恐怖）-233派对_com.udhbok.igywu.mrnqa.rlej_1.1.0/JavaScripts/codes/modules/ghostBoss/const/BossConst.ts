
export class BossConst {
    /** 刷出前等待时间 */
    public static readonly SPAWN_WAIT_TIME = SystemUtil.isPIE ? 20 : 4 * 60;
    /** 存活限时 */
    public static readonly LIMIT_TIME = 6 * 60;
    /** 下落时间 */
    public static readonly FALL_TIME = 15
    /** 下落速度 */
    public static readonly FALL_SPD = 300;
    /** 金、银奖励比例 */
    public static readonly PAIZIPRIZE = [1.5, 1.2];
    /** 刷新间隔(单位s) */
    public static readonly INTERVAL = 600;
}