import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { PlayerCurState, PlayerRace } from "../../const/enum";
import { MonsterChangeC } from "../../modules/ChangeMonster/MonsterChangeC";
import { ClickUIPools } from "../../utils/UI/ClickUI";
import { utils } from "../../utils/uitls";


@Component
export default class RP_Clothes extends Script {

    public static role: string = "";

    @mw.Property({ displayName: "角色数据ID", group: "换装" })
    public role: string = "";

    @mw.Property({ displayName: "UI文本多语言ID", group: "换装" })
    public iconTextID: string = "Common_Text_2";

    @mw.Property({ displayName: "衣服名字", group: "换装" })
    public clothseName: string = "Common_Text_1";

    @mw.Property({ displayName: "UI图标偏移", group: "换装" })
    public offset: mw.Vector = new mw.Vector(0, 0, 0);

    private clickHandle: () => void = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let trigger: mw.Trigger = null;
        if (this.gameObject instanceof mw.Trigger) {
            trigger = this.gameObject as mw.Trigger;
        } else {
            console.error("SP_Trigger_Server->OnStart: GameObject is not Trigger!");
        }
        trigger.onEnter.add(this.listen_enter.bind(this));
        trigger.onLeave.add(this.listen_leave.bind(this));

        ActionCommon.onPlayerCurStateChange.add((state: PlayerCurState, playerId: number) => {
            if (playerId != Player.localPlayer.playerId) return;
            // 死亡
            if (state != PlayerCurState.Alive) {
                ClickUIPools.instance.hide(this.gameObject);
            }
        })
    }

    private listen_enter(go: mw.GameObject): void {

        if ((PlayerManagerExtesion.isCharacter(go)) == false) {
            return;
        }

        if (GlobalData.curPlayerData)
            if (GlobalData.curPlayerData.PlayerState != PlayerCurState.Alive) return;

        if (MonsterChangeC.curPlayerRace == PlayerRace.Ghost) return;

        let curPlayer = Player.localPlayer;
        if (curPlayer == null) {
            return;
        }

        if (go != curPlayer.character) {
            return;
        }

        this.onPlayerAction(true);
    }

    private listen_leave(go: mw.GameObject): void {

        if ((PlayerManagerExtesion.isCharacter(go)) == false) {
            return;
        }

        let curPlayer = Player.localPlayer;
        if (curPlayer == null) {
            return;
        }

        if (go != curPlayer.character) {
            return;
        }

        this.onPlayerAction(false);
    }

    private onPlayerAction(active: boolean) {
        if (active) {
            this.showUI();
        } else {
            ClickUIPools.instance.hide(this.gameObject);
        }
    }

    private async showUI() {
        if (this.clickHandle == null) {
            this.clickHandle = this.clickBtn.bind(this);
        }
        // if (this.iconGuid != "" || this.iconGuid != null) {
        //     if (!AssetUtil.assetLoaded(this.iconGuid)) await AssetUtil.asyncDownloadAsset(this.iconGuid)
        // }

        let text = "";
        if (RP_Clothes.role == this.role && RP_Clothes.role != "") {
            text = (this.iconTextID == "" || this.iconTextID == null) ? "Common_Text_2" : utils.getLanguageByKey(this.iconTextID, null);
        } else {
            text = (this.clothseName == "" || this.clothseName == null) ? "Common_Text_1" : utils.getLanguageByKey(this.clothseName, null);
        }
        ClickUIPools.instance.show(null, text, this.gameObject, this.offset, this.clickHandle);
    }

    private clickBtn(): void {
        if (GlobalData.curPlayerData)
            if (GlobalData.curPlayerData.PlayerState != PlayerCurState.Alive) {
                return;
            }

        if (RP_Clothes.role == this.role && RP_Clothes.role != "") {
            this.backDescription();
            ClickUIPools.instance.hide(this.gameObject);
            return;
        }

        RP_Clothes.role = this.role;

        let t_CurCharac = Player.localPlayer.character;

        if (t_CurCharac.characterType != CharacterType.HumanoidV2) {
            return;
        }

        let clothsStr = [];
        if (this.role && this.role != "") {
            clothsStr.push(this.role);
        }
        if (clothsStr.length <= 0) {
            console.error("SP_Trigger_Server->OnStart: clothsStr is null!")
            return;
        }
        t_CurCharac.setDescription(clothsStr);
        t_CurCharac.syncDescription();

        ClickUIPools.instance.hide(this.gameObject);

    }


    private backDescription() {
        let t_CurCharac = Player.localPlayer.character;
        mw.AccountService.downloadData(t_CurCharac);
        RP_Clothes.role = "";
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }

}