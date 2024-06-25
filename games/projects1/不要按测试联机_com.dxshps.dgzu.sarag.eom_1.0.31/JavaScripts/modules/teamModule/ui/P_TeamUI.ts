import Main_Team_Generate from "../../../ui-generate/Game/Main_Team_generate";
import Team_Generate from "../../../ui-generate/Game/Team_generate";
import PlayerModuleC from "../../playerModule/PlayerModuleC";

export default class P_TeamUI extends Main_Team_Generate {

    public init() {
        this.initVis();
        this.initBtn();
    }

    private initVis() {
        this.mBtn_Invent.visibility = SlateVisibility.Collapsed;
        this.mBtn_Exit.visibility = SlateVisibility.Collapsed;
        this.mCanvas_TeamList.visibility = SlateVisibility.Collapsed;
    }

    private initBtn() {
        this.mBtn_TeamEntrance.onClicked.add(() => {
            let vis = this.mCanvas_TeamList.visibility
            this.mCanvas_TeamList.visibility = vis == SlateVisibility.Visible ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        })
        this.mBtn_TeamList_Close.onClicked.add(() => {
            this.mCanvas_TeamList.visibility = SlateVisibility.Collapsed;
        })
    }
}

export class TeamListItem extends Team_Generate {

    public init(index: number) {
        this.mText_Team_Num.text = index.toString();
    }

    public setInfo(playerId: number, isCaptain: boolean) {
        let playerName = ModuleService.getModule(PlayerModuleC).getPlayerName(playerId);
        let visibility = isCaptain ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.mText_Team_Name.text = playerName;
        this.mText_Team_Captain.visibility = visibility;
    }

    public setName(name: string){
        this.mText_Team_Name.text = name;
    }
}