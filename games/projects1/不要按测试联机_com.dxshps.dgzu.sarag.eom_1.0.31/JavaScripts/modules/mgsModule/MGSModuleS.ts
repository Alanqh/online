import PlayerModuleS from "../playerModule/PlayerModuleS";
import MGSHome from "./MGSHome";
import MGSModuleC, { MGSJump, MGSStep } from "./MGSModuleC";
import { MGSModuleData } from "./MGSModuleData";


export default class MGSModuleS extends ModuleS<MGSModuleC, MGSModuleData> {

    /**首次进入 */
    public playerEnterGame(player: mw.Player) {
        let data = this.getPlayerData(player);

        if (!data || data.curStep >= MGSStep.EnterGame) {
            return;
        }
        data.changeStep(MGSStep.EnterGame);
    }

    /**
     * 核心循环步骤
     * @param step 
     */
    @Decorator.noReply()
    public net_coreGameplay_step(step: MGSStep) {
        this.setPlayerStep(this.currentPlayer, step);
    }

    private setPlayerStep(player: mw.Player, step: MGSStep) {
        let data = this.getPlayerData(player);
        if (!data || data.curStep >= step) {
            return;
        }

        data.changeStep(step);
        MGSHome.coreStep(player, step);
    }

    public waitDone() {
        Player.getAllPlayers().forEach(player => {
            this.setPlayerStep(player, MGSStep.WaitStateEnd);
        })
    }

    /**
     * 玩家获胜
     * @param pid 玩家id
     * @param levelEndCount 当前关卡结束次数
     * @returns 
     */
    public playerWin(pid: number, levelEndCount: number) {
        let player = Player.getPlayer(pid);
        if (!player) return;
        this.setPlayerStep(player, levelEndCount == 1 ? MGSStep.FirstRoundEndWin : MGSStep.SecondRoundEndWin);
    }

    /**
     * 服务器发起跳往大厅
     * @param player 玩家
     * @param isFirstRoundWin 是否第一关获胜
     */
    public jumpToHall_Server(player: mw.Player) {
        this.setPlayerStep(player, MGSStep.JumpToHall);
        let isFirstRoundWin = ModuleService.getModule(PlayerModuleS).checkFirstRoundWin(player.playerId);

        MGSHome.jumpToHall(isFirstRoundWin ? MGSJump.FirstRoundWin : MGSJump.FirstRoundFail, player);
    }

    /**
     * 通知服务器修改数据，埋点客户端自己发
     */
    @Decorator.noReply()
    public net_HumpToHall_Client() {
        if (this.currentData.curStep >= MGSStep.JumpToHall) {
            return;
        }

        this.currentData.changeStep(MGSStep.JumpToHall);
    }
}