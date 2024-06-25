
/**
 * 关卡数据
 */
export class LevelComData {
    /**时间戳,唯一标记 */
    public dateKey: number = 0;
    /** 关卡id */
    public levelID: number = 0;
    /**每个玩家死亡次数 */
    public dieMap: Map<number, number> = new Map<number, number>();
    /**获胜玩家以及对应时间 */
    public winPlayerData: Map<number, number> = new Map<number, number>();
    /**关卡耗时 */
    public levelTime: number = 0;
}