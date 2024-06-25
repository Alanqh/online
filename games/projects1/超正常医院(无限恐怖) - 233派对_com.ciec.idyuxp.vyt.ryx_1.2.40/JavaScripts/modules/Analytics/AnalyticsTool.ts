
import { AnalyticsUtil } from "odin";
import { CoreGameplay, GameMode, GuideAnalytics } from "../../const/enum";

/**
 * 埋点工具类
 * 用于上报埋点
 */
export class AnalyticsTool {


    /**核心循环-步骤 结束集合 */
    private static stepDoneSet: Set<number> = new Set();


    public static ts_coregameplay_start() {

        let msg = AnalyticsUtil.get(ts_coregameplay_start);
        msg.send();

        console.error("埋点：核心循环开始")
    }

    public static ts_coregameplay_step(step: CoreGameplay) {
        if (this.stepDoneSet.has(step)) return;

        let msg = AnalyticsUtil.get(ts_coregameplay_step);
        msg.data.coregameplay_step = step;
        msg.send(Player.localPlayer);

        this.stepDoneSet.add(step);
        console.error("埋点：核心循环 步骤：" + step)
    }

    public static ts_coregameplay_end(mode: GameMode) {
        let msg = AnalyticsUtil.get(ts_coregameplay_end);
        msg.data.gameid = mode;
        msg.send();
        console.error("埋点：核心循环结束")
    }

    public static ts_tutorial_start() {
        let msg = AnalyticsUtil.get(ts_tutorial_start);
        msg.data.gameid = 1425777;
        msg.send(Player.localPlayer);
        console.error("埋点：新手引导开始")
    }

    public static ts_tutorial_end() {
        let msg = AnalyticsUtil.get(ts_tutorial_end);

        msg.data.gameid = 1425777;
        msg.send(Player.localPlayer);
        console.error("埋点：新手引导结束")
    }

    public static ts_tutorial_step(step: GuideAnalytics) {
        let msg = AnalyticsUtil.get(ts_tutorial_step);
        msg.data.tutorial_step = step;
        msg.send(Player.localPlayer);
        console.error("埋点：新手引导步骤：" + step)
    }


    /**
     * 点击事件
     * @param str
     */
    public static ts_action_click(str: string, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_click);
        msg.data.button = str;
        msg.send(player);
        console.error("埋点ts_action_click" + str)
    }

    /**商业化click */
    public static ts_action_click_shop(key: any, count: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_click);
        msg.data.button = key;
        // msg.data.playtime = count;
        msg.send(player);
        console.error("埋点：商业化click：" + key + "次数 " + count)
    }

    /**选择怪物 */
    public static ts_action_click_monster(key: string, count: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_click);
        msg.data.button = key;
        // msg.data.playtime = count;
        msg.send(player);
        console.error("埋点：选择怪物：" + key + "次数 " + count)
    }



    /**
     * 玩家死亡次数
     */
    public static ts_game_dead(deadCount: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_dead);
        // msg.data.dead = deadCount;
        msg.send(player);
        console.error(`埋点：玩家死亡 ${deadCount}次`)
    }

    /**
     * 玩家击杀NPC
     */
    public static ts_action_kill(count: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_kill);
        // msg.data.monster_num = count;
        msg.send(player);
        console.error(`埋点：玩家击杀NPC ${count}只`)
    }

    /**
     * 玩家拾取道具
     */
    public static ts_action_firstdo(key: string, count: number, player?: Player) {
        let msg = AnalyticsUtil.get(ts_action_firstdo);
        // if (count == 0) {
        msg.data.record = key;
        // } else {
        //     msg.data.record = key + "" + count;
        // }
        msg.send(player);
        console.error(`埋点：ts_action_firstdo：${key}`)
    }
    /**报错 */
    public static ts_task(str: string, player: Player) {
        let msg = AnalyticsUtil.get(ts_task);
        msg.data.task_id = str;
        msg.send(player);
    }
    /**组成马弓手次数 */
    public static ts_action_do(count: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_do);
        // msg.data.movement_id = count;
        msg.send(player);
        console.warn(`lwj 埋点：组成马弓手次数：${count}`);
    }
    /**弓马手组成时间 */
    public static ts_action_hit(count: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_hit);
        msg.data.play_time = count;
        msg.send(player);
        console.warn(`lwj 埋点：弓马手组成时间：${count}`);
    }

    /**梦境通关时间 */
    public static ts_action_test1(count: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_test1);
        msg.data.test1 = count;
        msg.send(player);
        console.warn(`lwj 埋点：梦境通关时间：${count}`);
    }

    /**梦境拾取了钥匙 */
    public static ts_action_test2(count: number, player: Player) {
        let msg = AnalyticsUtil.get(ts_action_test2);
        msg.data.test2 = count;
        msg.send(player);
        console.warn(`lwj 埋点：梦境拾取了钥匙：${count}`);
    }
    /**游戏结束 */
    public static ts_game_over(round_length: number, win_camp: string) {
        let msg = AnalyticsUtil.get(ts_game_over);
        msg.data.round_length = round_length;
        msg.data.win_camp = win_camp;
        msg.send();
        console.warn(`lwj 埋点：游戏结束：${round_length}  ${win_camp}`);
    }
}

class ts_coregameplay_start extends AnalyticsUtil {
    desc: string = "核心循环开始";
    data: {

    }
}
class ts_coregameplay_step extends AnalyticsUtil {
    desc: string = "核心循环";
    data: {
        coregameplay_step: number;
    }
}
class ts_coregameplay_end extends AnalyticsUtil {
    desc: string = "核心循环结束";
    data: {
        gameid: number
    }
}

class ts_tutorial_start extends AnalyticsUtil {
    desc: string = "新手引导";
    data: {
        gameid: number;
    }
}

class ts_tutorial_end extends AnalyticsUtil {
    desc: string = "新手引导结束";
    data: {
        gameid: number;
    }
}
class ts_tutorial_step extends AnalyticsUtil {
    desc: string = "新手引导步骤";
    data: {
        tutorial_step: number;
    }
}

class ts_action_kill extends AnalyticsUtil {
    desc: string = "击杀NPC";
    data: {
        monster_num: number;
    }
}



class ts_action_dead extends AnalyticsUtil {
    desc: string = "玩家死亡";
    data: {
        dead: number;
    };
}

class ts_action_click extends AnalyticsUtil {
    desc: string = "玩家解救他人";
    data: {
        button: string;
        playtime: number;
    };
}

class ts_action_firstdo extends AnalyticsUtil {
    desc: string = "拾取道具";
    data: {
        record: string;
    };
}


class ts_task extends AnalyticsUtil {
    desc: string = "报错";
    data: {
        task_id: string;
    }
}

class ts_action_do extends AnalyticsUtil {
    desc: string = "组成马弓手次数";
    data: {
        movement_id: number;
    };
}
class ts_action_hit extends AnalyticsUtil {
    desc: string = "弓马手组成时间";
    data: {
        play_time: number;
    };
}

class ts_action_test1 extends AnalyticsUtil {
    desc: string = "梦境通关时间";
    data: {
        test1: number;
    };
}
class ts_action_test2 extends AnalyticsUtil {
    desc: string = "梦境拾取了钥匙";
    data: {
        test2: number;
    };
}


class ts_game_over extends AnalyticsUtil {
    desc: string = "游戏结束";
    data: {
        round_length: number;
        win_camp: string
    }
}