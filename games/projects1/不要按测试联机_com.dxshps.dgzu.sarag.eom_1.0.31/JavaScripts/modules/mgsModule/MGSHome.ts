import { AnalyticsUtil, oTraceWarning } from "odin";
import { GlobalData } from "../../const/GlobalData";

/**核心循环 */
export class ts_coregameplay_start extends AnalyticsUtil {
    desc: string = '玩家进入游戏';
    data: {};
}

export class ts_coreGameplay_step extends AnalyticsUtil {
    desc: string = '核心循环步骤';
    data: { coregameplay_step: number };
}
export class ts_coregameplay_end extends AnalyticsUtil {
    desc: string = '完成核心循环';
    data: {};
}

export class ts_action_click extends AnalyticsUtil {
    desc: string = '观战界面';
    data: { button: string };
}

export class ts_game_start extends AnalyticsUtil {
    desc: string = '开始游戏';
    data: {
        game_mode: number,      // 关卡id
        player_num: number,     // 玩家数量
        scene_id: number,       // 第几轮，1或者2
    };
}
export class ts_game_result extends AnalyticsUtil {
    desc: string = '关卡结束';
    data: {
        value: number,          // 关卡id
        recover: number,        // 玩家到达终点所用时间，若未胜利则返回0
        record: number,         // 玩家通过后到对局结束的等待时间 默认999999
        sos: number,            // 玩家的死亡次数
        round: number,          // 本轮是第一轮返回1还是第二轮返回2
        kill: number,           // 玩家本轮内激活的最后一个存档点序号
        catch: number,           // 本次结算，参与的人数
        // box: number,            // 新玩家1 不是新玩家0
    };
}
export class ts_game_over extends AnalyticsUtil {
    desc: string = '关卡整体结算';
    data: {
        prince_kill: number,     // 服务器时间戳
        game_mode: number,       // 关卡id
        kill_player: number,     // 玩家死亡次数
        suicide: number,         // 第一名胜利者出现所需时间 默认0
        round_id: number,        // 第一轮返回1；是第二轮返回2
        win_num: number,         // 胜利玩家数量 无效值99999
        fail_num: number,        // 失败玩家数量 无效值99999
        totalnum: number,        // 本次结算，参与的人数
    };
}
export class ts_action_build extends AnalyticsUtil {
    desc: string = '匹配结束';
    data: {
        model_id: number,        // 服务器时间戳
        lifetime: number,        // 中途退出的真人总数 无效值99999
        item_id: number,         // 真人总数 无效值99999
        playtime: number,        // 匹配时长 无效值99999
    };
}

export class ts_action_dead extends AnalyticsUtil {
    desc: string = '死亡时发送';
    data: {
        stage_level: number,        // 关卡id
        lifetime: number,           // 当前轮次
        monster_id: number,         // 当前玩家最新激活的存档点序号，如果玩家还没有到达任何存档点，则返回0
    };
}

export class ts_achievement extends AnalyticsUtil {
    desc: string = '跳转大厅';
    data: {
        // 1：匹配等待倒计时期间，点击右上角返回按键返回大厅
        // 2：第一轮比赛期间，点击右上角返回按键返回大厅
        // 3：第二轮比赛期间，点击右上角返回按键返回大厅（非淘汰玩家）
        // 4：第一轮被淘汰后，以任何方式返回大厅（右上角返回按键、观战到冠军展示自动返回、观战到冠军展示点继续按键返回）
        // 5：第一轮晋级了，冠军结算时以任何方式返回大厅（右上角返回按键、冠军展示自动返回、冠军展示点继续按键返回）
        achievement: number,
    };
}

export class ts_action_equip_item extends AnalyticsUtil {
    desc: string = '游戏——玩家使用道具';
    data: {
        item_id: number,       //返回使用道具对应的道具表ID
        area_id: number,       //返回当前关卡ID
    };
}


export default class MGSHome {

    // public static coreStart(player: mw.Player) {
    //     let msg = AnalyticsUtil.get(ts_coregameplay_start);
    //     oTraceWarning(" check msg 玩家进入游戏", JSON.stringify(msg));
    //     msg.send(player);
    // }
    /**
     * 核心循环步骤
     * @param step 具体看MGSStep
     * @param player 
     */
    public static coreStep(player: mw.Player, step: number) {
        let msg = AnalyticsUtil.get(ts_coreGameplay_step);
        msg.data.coregameplay_step = step;
        oTraceWarning(" check msg 核心循环步骤", JSON.stringify(msg));
        msg.send(player);
    }

    // public static coreEnd(player: mw.Player) {
    //     let msg = AnalyticsUtil.get(ts_coregameplay_end);
    //     oTraceWarning(" check msg 完成核心循环", JSON.stringify(msg));
    //     msg.send(player);
    // }

    /**
     * 观战页面按钮
     * @param str 
     */
    public static watchClick(str: string) {
        let msg = AnalyticsUtil.get(ts_action_click);
        msg.data.button = str;
        oTraceWarning(" check msg 观战界面", JSON.stringify(msg));
        msg.send();
    }
    /**
     * 游戏开始
     * @param levelID 关卡ID
     */
    public static gameStart(levelID: number) {
        let msg = AnalyticsUtil.get(ts_game_start);
        msg.data.game_mode = levelID;
        msg.data.player_num = Player.getAllPlayers().length;
        msg.data.scene_id = GlobalData.levelEndCount_C + 1;// 这里是1和2.所以需要+1
        oTraceWarning(" check msg 开始游戏 gameStart", JSON.stringify(msg));
        msg.send();
    }

    /**
     * 匹配结束埋点-服务器发送
     * @param dateTime 服务器时间戳
     * @param outNum 退出人数
     * @param finalNum 真人总数
     * @param endTimer 匹配耗时
     */
    public static waitState_S(dateTime: number, outNum: number, finalNum: number, endTimer: number) {
        let msg = AnalyticsUtil.get(ts_action_build);
        msg.data.model_id = dateTime;
        msg.data.lifetime = outNum;
        msg.data.item_id = finalNum;
        msg.data.playtime = endTimer;
        oTraceWarning(" check msg 匹配结束埋点 waitState_S", JSON.stringify(msg));
        msg.send();
    }

    /**
     * 关卡结束
     * @param levelid 关卡id
     * @param winTimer 到达终点耗时，若未胜利则返回0
     * @param winWaitTimer 获胜后到对局结束的等待时间 默认999999
     * @param dieTimes 死亡次数
     * @param isFirstEndLevel 本轮是第一轮返回1还是第二轮返回2
     * @param kill 玩家本轮内激活的最后一个存档点序号 通关9999，默认0
     * @param playerNum 本次结算，参与的人数
     */
    public static levelEnd(player: mw.Player,
        levelid: number,
        winTimer: number,
        winWaitTimer: number,
        dieTimes: number,
        isFirstEndLevel: boolean,
        checkPoint: number,
        playerNum: number) {
        let msg = AnalyticsUtil.get(ts_game_result);
        msg.data.value = levelid;
        msg.data.recover = winTimer;
        msg.data.record = winWaitTimer;
        msg.data.sos = dieTimes;
        msg.data.round = isFirstEndLevel ? 1 : 2;
        msg.data.kill = checkPoint;
        msg.data.catch = playerNum;

        oTraceWarning(" check msg 关卡结束 levelEnd", JSON.stringify(msg));
        msg.send(player);
    }

    /**
     * 关卡结束埋点-服务器发送
     * @param dateTime 服务器时间戳
     * @param levelID 关卡id
     * @param deadTimes 玩家死亡次数
     * @param firstWinTimer 第一名胜利者出现所需时间 默认0
     * @param isFirstEndLevel  是否第一轮
     * @param winNum 胜利玩家数量 无效值99999
     * @param failNum 失败玩家数量 无效值99999
     * @param playerNum 本次结算，参与的人数
     */
    public static levelResult_S(dateTime: number,
        levelID: number,
        deadTimes: number,
        firstWinTimer: number,
        isFirstEndLevel: boolean,
        winNum: number,
        failNum: number,
        playerNum: number) {
        let msg = AnalyticsUtil.get(ts_game_over);
        msg.data.prince_kill = dateTime;
        msg.data.game_mode = levelID;
        msg.data.kill_player = deadTimes;
        msg.data.suicide = firstWinTimer;
        msg.data.round_id = isFirstEndLevel ? 1 : 2;//第一轮返回1；是第二轮返回2
        msg.data.win_num = winNum;
        msg.data.fail_num = failNum;
        msg.data.totalnum = playerNum;

        oTraceWarning(" check msg 关卡结束埋点 levelResult_S", JSON.stringify(msg));
        msg.send();
    }

    /**
     * 玩家死亡
     * @param levelID 关卡id
     * @param isFirstEndLevel 是否第一轮
     * @param checkPoint 存档点序号
     */
    public static playerDie(levelID: number, isFirstEndLevel: boolean, checkPoint: number) {
        let msg = AnalyticsUtil.get(ts_action_dead);
        msg.data.stage_level = levelID;
        msg.data.lifetime = isFirstEndLevel ? 1 : 2;//第一轮返回1；是第二轮返回2
        msg.data.monster_id = checkPoint;
        oTraceWarning(" check msg 玩家死亡", JSON.stringify(msg));
        msg.send();
    }

    /**
     * 开始跳转到大厅
     * @param type 
     */
    public static jumpToHall(type: number, player?: mw.Player) {
        let msg = AnalyticsUtil.get(ts_achievement);
        msg.data.achievement = type;
        oTraceWarning(" check msg 开始跳转", JSON.stringify(msg));
        msg.send(player);
    }

    /**玩家游戏使用道具(服务端) */
    public static useProp(player: mw.Player, propId: number, levelID: number) {
        let msg = AnalyticsUtil.get(ts_action_equip_item);
        msg.data.item_id = propId;
        msg.data.area_id = levelID;
        msg.send(player);
    }

}