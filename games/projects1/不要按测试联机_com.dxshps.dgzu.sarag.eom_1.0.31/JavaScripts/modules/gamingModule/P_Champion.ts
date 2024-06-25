import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import Champion_Generate from "../../ui-generate/Game/Champion_generate";

/**
 * 夺冠UI
 */
export default class P_Champion extends Champion_Generate {

    // private timer: number = 0;
    private exitTimer: number = 0;
    private isInTeam: boolean = false;
    onStart() {
        this.mBtn_BackHall.onClicked.add(() => {
            this.jump();
        })
    }

    onShow(winPlayerName: string, petConfigID: number, isInTeam: boolean) {
        this.mText_PlayerName.text = winPlayerName;
        this.isInTeam = isInTeam;

        let config = GameConfig.Pet.getElement(petConfigID);
        this.mImg_PetCard.imageGuid = config.icon;
        //玩家如果在队伍中，隐藏跳回大厅按钮,等待集体跳回大厅逻辑
        this.mBtn_BackHall.visibility = isInTeam ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        // 倒计时
        this.exitTimer = GameConfig.RuleGame.getElement(10035).float_Value;
        this.mText_Time01.text = this.exitTimer.toString();
        this.canUpdate = true;
        // this.timer = TimeUtil.elapsedTime() + 1;
        // GlobalData.playerQuitGameAc.call();

    }

    onUpdate(dt: number) {
        this.exitTimer -= dt;
        this.mText_Time01.text = this.exitTimer.toFixed(2);

        if (this.exitTimer <= 0) {
            this.jump();
        }
    }

    private jump() {
        this.mText_Time01.text = "0";

        this.canUpdate = false;
        if (!this.isInTeam) {
            GlobalData.playerQuitGameAc.call();
        }
    }
}