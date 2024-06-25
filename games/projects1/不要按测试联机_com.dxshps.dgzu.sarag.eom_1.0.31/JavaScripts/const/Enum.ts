export enum EAnalyticsEvents {
    /**第一次做某事 */
    firstDo = "firstDo",
}

export enum EAnalyticsEvents_S {
    /**第一次做某事 */
    firstDo_S = "firstDo_S",
}

/**游戏ID */
export enum GameId {
    Hall = "",
    Game1 = "",
}
/**游戏跳转类型 */
export enum EGameType {
    None = "None",
    /**大厅->游戏 */
    HallToGame = "HallToGame",
    /**游戏->大厅 */
    GameToHall = "GameToHall",
}
/**全局流程状态 */
export enum EGlobalFsmType {
    None,           // 无
    Wait,           // 等待
    PrepareChange,  // 准备游戏，做一些匹配成功效果
    Game,           // 游戏
    BackToSquare    // 返回大厅
}
/**游戏流程状态 */
export enum EGamingFsmType {
    None,       // 无状态
    Loading,    // 创建关卡
    Prepare,    // 开局动画
    Gaming,     // 游戏中
    Calculate,  // 结算
}
/**玩家状态 */
export enum EPlayerStateType {
    Normal,             // 无
    Lose,               // 失败
    Win,                // 获胜
}

/**观战状态类型 */
export enum EWatchType {
    None,       // 无状态
    Previous,   //上一个
    StartWatch, //开始观战
    Next,       //下一个
    ChangeOther,//切换其他玩家
    EndWatch,   //结束观战
}

/**对局内名次，结算时候用 */
export enum InGameStatus {
    /**一局没玩完退出 */
    None = -1,
    /**第一局就淘汰 */
    FirstOut = 0,
    /**第二局淘汰 */
    SecondOut = 1,
    /**获得冠军 */
    Winner = 2,
    /**队友获胜 */
    TeamWinner = 3,
}

export enum PlayerTeamStateType {
    /**
     * 无队伍
     */
    Normal = 1,
    /**
     * 队伍中
     */
    InTeam = 2,
}
