export enum GhostNodeStat {
    /** 巡逻状态 */
    PatrolStat = "patrolStat",
    /** 正在移动 */
    IsMoving = "isMoving",
    /** 移动完成 */
    PatrolFinish = "patrolFinish",
    /** 正在追逐目标 */
    Chasing = "Chasing",
    /** 冷兵器播放中 */
    PlayMelee = "PlayMelee",
    /** 移动状态，0为walk，1为fly */
    MoveType = "MoveType",
    /** 受击 */
    OnHit = "onHit"
}
