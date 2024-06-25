/**
 * 性别
 */
export enum Sex {
    /**
     * 女
     */
    Female = 1,
    /**
     * 男
     */
    Male = 2
}


/**NPC动画状态 */
export enum EnumSceneUnitAnimationState {
    /**巡逻 */
    walk = 1,
    /**举起玩家 */
    pick,
    /**追击 */
    Active,
    /**攻击动画 */
    atkAni,
    /**idle */
    // idle
    /**巡视 */
    patrol,
    /**发现 */
    discover,
    /**default */
    default,
}

/** 玩家生存状态 */
export enum PlayerCurState {
    /**求生 */
    Survive = 1,
    /**活着 */
    Alive = 2,
    /**虚弱 */
    Weak = 3,
    /**变异 */
    Mutant = 4,
}

/**CS事件 */
export enum Events_CS {
    /**成功攻击鬼 */
    AttackGhost = "AttackGhost",


    /**显示隐藏解救玩家按钮 参数1：是否显示按钮 2：玩家id */
    ShowHideRescueBtn = "ShowHideRescueBtn",
    /**恢复默认状态 */
    RecoverDefaultState = "RecoverDefaultState",
    /**玩家拯救玩家 */
    PlayerRescue = "PlayerRescue",
    /**新一天 */
    NewDay = "NewDay",
    /**在所有客户端播放动画编辑器动画 */
    PlayAnimEditor = "PlayAnimEditor",
    /**在指定客户端播放音效 */
    PlaySound = "PlaySound",
    /**换装 */
    SetCoslth = "SetCoslth",
    /**播放动画-S */
    PlayAnimation_S = "PlayAnimation_S",
    /**播放动画-C */
    PlayAnimation_C = "PlayAnimation_C",
    /**播放动画-S (动画编辑器) */
    playAnimation_S_Editor = "playAnimation_S_Editor",
    /**播放动画-C (动画编辑器) */
    playAnimation_C_Editor = "playAnimation_C_Editor",
    /**变身怪显示放下玩家按钮 */
    ShowMonsterDropPlayer = "ShowMonsterDropPlayer",
}



export enum CurTimeState {
    Day = 1,
    DayToDusk = 2,
    Dusk = 3,
    DuskToNight = 4,
    Night = 5,
    NightToDay = 6
}

/**
 * 玩家状态类型
 */
export enum EPlayerState {
    /**无 */
    None,
    /**正常待机*/
    Idle,
    /**跳*/
    jump,
    /**潜行*/
    crouch,
    /**冲刺*/
    sprint,
    /**潜行翻滚*/
    roll,
    /**死亡*/
    Dead,
    /**跑*/
    run,
    /**马弓手 */
    Archer,
    /**怪物攻击 */
    MonsterAttack,
}

/**
 *  全服埋点
 */
export enum EnumAnalytics {
    /**当前日期 */
    CurDate = "CurDate",
    /**玩家死亡 */
    PlayerDead = "PlayerDead",
    /**玩家解救 */
    PlayerRescue = "PlayerRescue",
    /**玩家攻击 */
    PlayerAttack = "PlayerAttack",
    /**马弓手次数 */
    ArcherCount = "ArcherCount",
    /**马弓手时间 */
    ArcherTime = "ArcherTime",

    /**复活币使用次数 */
    reborn_use = "reborn_use",
    /**变身卡使用次数 */
    transfer_use = "transfer_use",
    /**怪物变身 */
    Monster_ = "Monster_",
    /**充值弹窗 */
    recharge_hit = "recharge_hit",
    /**确认充值 */
    recharge_confirm_hit = "recharge_confirm_hit",
    /**充值成功 */
    recharge_return_hit = "recharge_return_hit",
    Event_Click = "Event_Click",
    EventShop_Click = "EventShop_Click",
    EventShop_Buy = "EventShop_Buy",
    EventButton_Click = "EventButton_Click",
    EventTransferSuccess = "EventTransferSuccess",
    PassCheck_Click = "PassCheck_Click",
    PassCheckBuy = "PassCheckBuy",
    PassCheckBuyAffrim = "PassCheckBuyAffrim",
    PasscheckBuySuccess = "PasscheckBuySuccess",
    PassCheckBonus_Get_ = "PassCheckBonus_Get_",
}

/**
 * 首次做
 */
export enum FirstDo {
    /**首次点击模式说明 */
    firstClickMode = "Rule",
    /**首次点击梦境模式 */
    firstClickDream = "Rule_01",
    /**首次被小眼怪发现 */
    firstEyeFind = "Monster_01",
    /**首次获得钥匙 */
    firstGetKey = "GetKey",
    /**首次通关 */
    firstPass = "GameClean",
    /**首次进入梦境模式 */
    firstEnterDream = "Dream",
    /**首次打开背包 */
    firstOpenBag = "bag",
}

/**核心循环步骤 */
export enum CoreGameplay {
    /**拾取道具 */
    pickProp = 1001,
    /**使用道具*/
    useProp = 1002,
    /**拾取道具 */
    pickProp_dream = 2001,
    /**使用道具*/
    usePro_dream = 2002,
    /**获得钥匙 */
    getKey_dream = 2003,
    /**放置钥匙 */
    putKey_dream = 2004,
}


/**新手引导埋点 */
export enum GuideAnalytics {
    /**集到3个回复道具 */
    Guide_01 = 1,
    /**点击道具栏任意道具进行1次使用 */
    Guide_02 = 2,
    /**收集到1个镇定剂 */
    Guide_03 = 3,
    /**绕到怪物后方使用镇定剂进行偷袭 */
    Guide_04 = 4,
    /**前往地下室拯救一位被抓到的队友 */
    Guide_05 = 5,
    /**在任意模式下生存1天 */
    Guide_06 = 6,
    /**收集一把脉冲枪 */
    Guide_07 = 7,
    /**使用脉冲枪击中任意怪物 */
    Guide_08 = 8,
    /**寻找到医院里散落的传送门 */
    Guide_09 = 9,
    /**进入传送门内寻找钥匙 */
    Guide_10 = 10,
    /**拾取到任意一把钥匙 */
    Guide_11 = 11,
    /**将任意一把钥匙递送到骷髅门处 */
    Guide_12 = 12,
}

/**商业化第一次做 */
export enum ShopFirstDo {
    /**点击热销按钮 */
    hot_click = "hot_click",
    /**进入破冰礼包界面 */
    hot = "hot",
    /**点击购买破冰礼包 */
    hot_buy = "hot_buy",
    /**点击确认购买破冰礼包 */
    hot_buy_affrim = "hot_buy_affrim",
    /**购买破冰礼包成功 */
    hot_buy_success = "hot_buy_success",
    /** 点击进入会员礼包界面*/
    vip_click = "vip_click",
    /**点击购买会员礼包 */
    vip_buy = "vip_buy",
    /**点击确认购买会员礼包 */
    vip_buy_affrim = "vip_buy_affrim",
    /**购买会员礼包成功 */
    vip_buy_success = "vip_buy_success",
    /**点击进入商城界面 */
    present_click = "present_click",
    /**点击周礼包 */
    free_present_click = "free_present_click",
    /**成功领取周礼包 */
    present_take = "present_take",
    /**点击复活币 */
    reborn_click = "reborn_click",
    /**确认买复活币 */
    reborn_buy = "reborn_buy",
    transfer_buy_success = "transfer_buy_success",
    transfer_buy_success_number = "transfer_buy_success_number",
    /**购买复活币个数 */
    reborn_buy_success_number = "reborn_buy_success_number",
    /**点击购买复活币礼包 */
    reborn_present_buy = "reborn_present_buy",
    /**确认购买复活币 */
    reborn_present_buy_affrim = "reborn_present_buy_affrim",
    /**点击购买变身礼包 */
    transfer_click = "transfer_click",
    /**确认购买变身礼包 */
    transfer_buy = "transfer_buy",
    /**商城界面触达 */
    shop = "shop",
    /**商城武器界面触达 */
    weapon_click = "weapon_click",
    /**点击购买武器 */
    weapon_buy = "weapon_buy",
    /**点击确认购买武器 */
    weapon_buy_affrim = "weapon_buy_affrim",
    /**点击购买3日武器体验礼包 */
    weapon_daily_buy_01 = "weapon_daily_buy_01",
    /**点击购买7日武器体验礼包 */
    weapon_daily_buy_02 = "weapon_daily_buy_02",
    /**3日礼包确认购买 */
    weapon_daily_buy_affrim_01 = "weapon_daily_buy_affrim_01",
    /**7日礼包确认购买 */
    weapon_daily_buy_affrim_02 = "weapon_daily_buy_affrim_02",
    ///////////////////    二期埋点   ///////////
    dress_click = "dress_click",
    decorate_click = "decorate_click",
    shopitem_click_ = "shopitem_click_",
    shopitem_buy_ = "shopitem_buy_",

    ///////////////////  单次 上传  ///////////////////////
    shopitem_success_ = "shopitem_success_",

    /**购买复活币成功 */
    reborn_buy_success = "reborn_buy_success",
    /**购买变身礼包成功 */
    transfer_success = "transfer_success",
    /**购买武器成功 */
    weapon_buy_success = "weapon_buy_success",
    /**3日礼包购买成功 */
    weapon_daily_buy_success_01 = "weapon_daily_buy_success_01",
    /**7日礼包购买成功 */
    weapon_daily_buy_success_02 = "weapon_daily_buy_success_02",

    /**点击抽奖入口按钮 */
    Lottery_Click = "Lottery_Click",

    Title_Click = "Title_Click",

    /**领取20抽奖励人数 */
    LotteryBonus_Click_1 = "LotteryBonus_Click_1",
    /**领取40抽奖励人数 */
    LotteryBonus_Click_2 = "LotteryBonus_Click_2",
    /**领取60抽奖励人数 */
    LotteryBonus_Click_3 = "LotteryBonus_Click_3",
    /**领取100抽奖励人数 */
    LotteryBonus_Click_4 = "LotteryBonus_Click_4",

}

/**商业化总数点击 */
export enum ShopClick {
    /**复活币 */
    reborn_use = "reborn_use",
    /**变身卡 */
    transfer_use = "transfer_use",
    /** 每个怪物被玩家选择的次数*/
    id_monster = "id_monster",
    /**值弹窗则次数加1 */
    recharge_hit = "recharge_hit",


}

/**
 * 游戏模式
 */
export enum GameMode {
    /**普通模式 */
    Normal = 1,
    /**梦境模式 */
    Dream = 2,
}

/**
 * 怪物类型
 */
export enum MonsterType {
    /**小眼怪 */
    Eye = "Eye",
    /**大眼怪 */
    BigEye = "BigEye",
    /**鬼 */
    Ghost = "Ghost",
}

/**一级标签 对应shop表id */
export enum TabType {
    /**代币商城 */
    Score = 1015,
    /**乐币商城 */
    Coin = 1001,
    /**超值礼包 */
    Gift = 1010,
    /**补给礼包 */
    Supply = 1011,
    /**VIP */
    Vip = 1012,
    /**充值页 */
    Recharge = 1013,
    /**挂件 */
    Pendant = 1014,

}

/**货币类型 */
export enum CoinType {
    /**乐币 */
    Coin = 1,
    /**不正常币 */
    Abnormal = 0,
    /**活动代币 */
    BioCoin = 2,
}
export enum AwardType {
    /**道具 */
    Prop = 1,
    /**枪械 */
    Gun = 2,

}

/**商城 */
export enum ShopType {
    /**商城 */
    Shop = 1,
    /**热销 */
    Hot = 2,
}

/**道具刷新 */
export enum PropRefreshType {
    /**不刷新 */
    noRefresh = 1,
    /**每日 */
    Day = 3,
    /**每周 */
    Week = 2,

}

/**商品id code */
export enum ShopGuidCode {
    /**补给礼包 */
    Supply = "2tCPPwd0000BV",
    /**Vip */
    Vip = "ErRw7Q80000BW",

}


/**玩家阵营 */
export enum PlayerRace {
    /**人 */
    Human = 1,
    /**鬼 */
    Ghost = 2,
    /**混合 */
    Mix = 3,
}

/**红点 */
export enum RedDotType {
    /**热销 */
    Hot = "Hot",
    /**商店 */
    Shop = "Shop",
    /**补给礼包一级标签 */
    SupplyLevel_1 = "SupplyLevel_1",
    /**超值礼包一级标签 */
    GiftLevel_1 = "GiftLevel_1",
    /**VIP一级标签 */
    VipLevel_1 = "VipLevel_1",
}

export enum DanceTabType {
    /**表情 */
    Expression = 1,
    /**动作 */
    Dance = 2,
}

export enum PropQualityType {
    /**蓝色品质 */
    Blue = 1,
    /**紫色品质 */
    Purple = 2,
    /**金色品质 */
    Golden = 3,
}

export enum LotteryRewardCountType {
    /**20抽 */
    RewardCount_20 = 1,
    /**40抽 */
    RewardCount_40 = 2,
    /**60抽 */
    RewardCount_60 = 3,
    /**100抽 */
    RewardCount_100 = 4,

}