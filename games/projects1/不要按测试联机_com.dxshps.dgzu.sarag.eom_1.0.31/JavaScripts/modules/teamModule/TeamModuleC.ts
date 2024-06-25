import TeamModuleS from "./TeamModuleS";
import P_TeamUI, { TeamListItem } from "./ui/P_TeamUI";

export default class TeamModuleC extends ModuleC<TeamModuleS, null>{

    private p_TeamUI: P_TeamUI;
    private _teamList: TeamListItem[] = [];
    private enterTeamArr: number[] = [];

    protected onStart(): void {
        this.p_TeamUI = UIService.create(P_TeamUI);
        this.p_TeamUI.init();
        this.initTeamList();
        UIService.showUI(this.p_TeamUI);
    }

    private initTeamList() {
        for (let i = 0; i < 4; i++) {
            let item = UIService.create(TeamListItem);
            item.init(i + 1);
            this.p_TeamUI.mCanvas_TeamL.addChild(item.uiObject);
            item.uiObject.visibility = SlateVisibility.Collapsed;
            this._teamList.push(item);
        }
    }

    public net_PlayerTeamChange(leaderUserId: string, teamArr: number[]) {
        this.enterTeamArr = teamArr;
        this.onRefreshTeamList(leaderUserId, teamArr);
    }

    public net_teamBreak(){
        this.enterTeamArr = [];
        this._teamList.forEach(item => {
            item.uiObject.visibility = SlateVisibility.Collapsed;
        })
    }

    private async onRefreshTeamList(leaderUserId: string, teamArr: number[]) {
        this._teamList.forEach(item => {
            item.uiObject.visibility = SlateVisibility.Collapsed;
        })
        let leader = Player.getPlayer(leaderUserId);
        if (!leader) {//可能队长还没进游戏？？？估计拿不到名字，先用自己的
            leader = Player.localPlayer;
        }
        //先设置队长消息
        this._teamList[0].setInfo(leader.playerId, true);
        this._teamList[0].uiObject.visibility = SlateVisibility.Visible;
        let num = 1;
        
        teamArr.forEach((playerId) => {
            if (playerId == leader.playerId) return;//队长已经设置过了
            this._teamList[num].setInfo(playerId, false);
            this._teamList[num].uiObject.visibility = SlateVisibility.Visible;
            num++;
        })
    }

    public refreshTeamName(playerId: number, playerName: string) {
        if (this.enterTeamArr.length == 0) return;
        let index = this.enterTeamArr.indexOf(playerId);
        if (index == -1) {
            return;
        }
        this._teamList[index].setName(playerName);
    }

}