
import { PlayerRace } from "../../const/enum";
import { P_Result } from "../GameHud/UI/P_Result";
import { P_RulesTips } from "../Player/UI/P_RulesTips";
import TimeModuleC from "../Time/TimeModuleC";
import { TeamData } from "./TeamData";
import TeamS from "./TeamS";

export default class TeamC extends ModuleC<TeamS, TeamData> {

    private resultUI: P_Result = null;

    protected onStart(): void {
        ModuleService.getModule(TimeModuleC).onDayStart.add(() => {
            // let tip = UIService.getUI(P_RulesTips);
            // tip.showRule();
        });
    }

    /**结算
     * @param type 
     * @param isWin 
     */
    net_settlement(type: PlayerRace, isWin: boolean, resData: string) {
        if (!this.resultUI) {
            this.resultUI = UIService.getUI(P_Result);
        }
        this.resultUI.showRule(type, isWin, resData);
    }

    net_Tips(team: PlayerRace) {
        console.warn(`lwj 变身 ${team}`);
        UIService.getUI(P_RulesTips).showTeamTips(team);
    }

    /**进入活动 */
    private enterActivity(player: Player) {
        TeleportService.asyncTeleportToScene("abnormal-town", [player.userId]);
    }


}