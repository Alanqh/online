// 普通事件- - 客户端
export class GameEventC2C {
    public static GAME_EXITINTERACT_C2C: string = "GAME_EXITINTERACT_C2C"                   // 取消交互

    public static GAME_RESET_PLAYER_POS_C2C: string = "GAME_RESET_PLAYER_POS_C2C"                 // 重置玩家位置

    public static GAME_CHECKPOINT_C2C: string = "GAME_CHECKPOINT_C2C"                 // 玩家进入检查点

    public static GAME_PLAYER_WIN_C2C: string = "GAME_PLAYER_WIN_C2C"                 // 玩家胜利

    public static GAME_CHANGE_MAXWALKSPEED_C2C: string = "GAME_CHANGE_MAXWALKSPEED_C2C"     // 修改最大移动速度

    public static GAME_RESET_MAXWALKSPEED_C2C: string = "GAME_RESET_MAXWALKSPEED_C2C"     // 重置最大移动速度

}
// 普通事件 - 服务器
export class GameEventS2S {
    public static GAME_EXITINTERACT_S2S: string = "GAME_EXITINTERACT_S2S"                   // 取消交互
}

// 全局流程控制 - 服务器
export class GlobalCtrlEventS2S {
    public static CTRL_LOGIN_S2S: string = "CTRL_LOGIN_S2S"                             // 玩家登录
    public static CTRL_WAIT_DONE_S2S: string = "CTRL_WAIT_DONE_S2S"                     // 等待结束

    public static CTRL_BEGINGAME_S2S: string = "CTRL_BEGINGAME_S2S"                     // 游戏开始


}
// 全局流程控制 - 客户端
export class GlobalCtrlEventC2C {
    public static MODULE_GET_STATE_C2C: string = "MODULE_GET_STATE_C2C"     // 模块主动获取当前状态

    public static CTRL_PLAYER_ENTER_C2C: string = "CTRL_PLAYER_ENTER_C2C"   // 玩家进入
    public static CTRL_STATE_CHANGE_C2C: string = "CTRL_STATE_CHANGE_C2C"   // 状态变更

    public static CTRL_CHANGE_WAIT_TIME_C2C: string = "CTRL_CHANGE_WAIT_TIME_C2C"   // 等待时间变更

}

// 游戏流程控制 - 服务器
export class GamingCtrlEventS2S {

    public static CTRL_GAMING_PREPARE: string = "CTRL_GAMING_PREPARE"   // 准备
    public static CTRL_GAMING_START_PLAY: string = "CTRL_GAMING_START_PLAY"   // 正式开始
    public static CTRL_GAMING_STATE_CHANGE_S2S: string = "CTRL_GAMING_STATE_CHANGE_S2S"   // 状态变更

}

// 游戏流程控制 - 客户端
export class GamingCtrlEventC2C {

    public static CTRL_GAMING_STATE_CHANGE_C2C: string = "CTRL_GAMING_STATE_CHANGE_C2C"   // 状态变更

}

// GM
export class GMEventS2S {
    public static GM_BEGINGAME: string = "GM_BEGINGAME"                   // 开始游戏
    public static GM_ENDGAME: string = "GM_ENDGAME"                   // 结束游戏

}

// 关卡相关 - 服务器
export class LevelEventS2S {
    public static LEVEL_CREATE_PREFAB_DONE_S2S: string = "LEVEL_CREATE_PREFAB_DONE_S2S"     // 预制体创建完毕

    public static LEVEL_GAMING_DONE_S2S: string = "LEVEL_GAMING_DONE_S2S"                   // 游戏阶段完成
    public static LEVEL_ADD_WINER_S2S: string = "LEVEL_ADD_WINER_S2S"                       // 添加获胜玩家

    public static LEVEL_GAME_OVER_S2S: string = "LEVEL_GAME_OVER_S2S"                       // 两轮结束

}
// 关卡相关 - 客户端
export class LevelEventC2C {

    public static LEVEL_TIMECHANGE_C2C: string = "LEVEL_TIMECHANGE_C2C"                   // 倒计时

    public static LEVEL_WINERCHANGE_C2C: string = "LEVEL_WINERCHANGE_C2C"                 // 获胜玩家变更


}
// 关卡相关 - 服务器TO客户端
export class LevelEventS2C {
    public static LEVEL_CREATE_NPC_S2C: string = "LEVEL_CREATE_NPC_S2C"     // 创建NPC

}

// 关卡相关 - 客户端TO服务器
export class LevelEventC2S {
    public static LEVEL_DIE_C2S: string = "LEVEL_DIE_C2S"     // 死亡

}

// 陷阱相关 - 客户端
export class TrapEventC2C {
    public static TRAP_CLEAN_RECORD_C2C: string = "TRAP_CLEAN_RECORD_C2C"                   // 清除记录
}