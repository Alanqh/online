
import { oTrace } from "odin";
import { EGlobalFsmType } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import MGSHome from "./MGSHome";
import { MGSModuleData } from "./MGSModuleData";
import MGSModuleS from "./MGSModuleS";

/**核心循环 */
export enum MGSStep {
    // /**通过新手引导 */
    // GuidEnd = 11,
    // /**开始游戏，待倒计时走完，触发跳转 */
    // BeginJumpGame = 12,
    /**进入游戏房 */
    EnterGame = 13,
    /**等待阶段结束 */
    WaitStateEnd = 14,
    /**第一轮比赛结束时,获胜 */
    FirstRoundEndWin = 15,
    /**第二轮比赛结束时，冠军 */
    SecondRoundEndWin = 16,
    /**跳往大厅时 */
    JumpToHall = 17,
}
/**观战埋点 */
export enum MGSWatch {
    /**切换玩家 */
    ChangePlayer,
    /**点赞 */
    ClickLike,
    /**点赞10次 */
    ClickLike_10,
    /**切换5次玩家 */
    ChangePlayer_5,
}

/**跳转埋点 */
export enum MGSJump {
    /**匹配等待 */
    Wait = 1,
    /**第一轮比赛期间，右上角手动返回 */
    FirstRound = 2,
    /**第二轮比赛期间，右上角手动返回 */
    SecondRound = 3,
    /**第一轮被淘汰玩家，任何形式返回 */
    FirstRoundFail = 4,
    /**第一轮晋级，冠军结算时候，任何形式返回 */
    FirstRoundWin = 5,
}

export default class MGSModuleC extends ModuleC<MGSModuleS, MGSModuleData> {

    public gameStep(step: MGSStep) {
        oTrace('guan log gameStep step', step, "this.curStep", this.data.curStep);
        if (this.data.curStep >= step) {
            return;
        }
        this.server.net_coreGameplay_step(step);
    }

    /**玩家进入游戏 */
    public playerEnterGame() {
        if (this.data.curStep >= MGSStep.EnterGame) {
            return;
        }
        MGSHome.coreStep(Player.localPlayer, MGSStep.EnterGame);
    }

    /**
     * 观战埋点
     * @param type 
     */
    public watchClick(type: MGSWatch) {
        switch (type) {
            case MGSWatch.ChangePlayer:
                MGSHome.watchClick("401");
                break;
            case MGSWatch.ClickLike:
                MGSHome.watchClick("402");
                break;
            case MGSWatch.ClickLike_10:
                MGSHome.watchClick("403");
                break;
            case MGSWatch.ChangePlayer_5:
                MGSHome.watchClick("404");
                break;
        }
    }

    /**
     * 客户端发起跳往大厅
     */
    public jumpToHall(isFirstRoundWin: boolean) {
        // 先发送核心循环
        this.sendJumpToHallStep();

        // 等待过程中跳走
        if (GlobalData.globalState_C == EGlobalFsmType.Wait || GlobalData.globalState_C == EGlobalFsmType.PrepareChange) {
            MGSHome.jumpToHall(MGSJump.Wait);
            return
        }

        // 第一轮比赛期间，右上角手动返回
        if (GlobalData.levelEndCount_C == 0) {
            MGSHome.jumpToHall(MGSJump.FirstRound);
            return
        }

        // 首轮获胜
        // 首轮淘汰，任何形式返回
        if (!isFirstRoundWin) {
            MGSHome.jumpToHall(MGSJump.FirstRoundFail);
            return
        }

        // 第二轮，没淘汰的玩家，手动退出
        if (GlobalData.levelEndCount_C == 1) {
            MGSHome.jumpToHall(MGSJump.SecondRound);
            return
        }

        // 第一轮晋级了，冠军结算时以任何方式返回大厅
        MGSHome.jumpToHall(MGSJump.FirstRoundWin);
    }

    private sendJumpToHallStep() {
        if (this.data.curStep >= MGSStep.JumpToHall) {
            return;
        }
        MGSHome.coreStep(Player.localPlayer, MGSStep.JumpToHall);
        this.server.net_HumpToHall_Client();
    }
}