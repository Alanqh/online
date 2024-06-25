import { GameConfig } from "../../../../config/GameConfig";
import TeamJump_UI_Generate from "../../../../ui-generate/ShareUI/hall/TeamJump_UI_generate";
import GameStart from "../../../GameStart";
import { CommonUtils } from "../../../utils/CommonUtils";
import { LanUtil } from "../../../utils/LanUtil";
import { JumpListener } from "../JumpListener";
import { RouteModuleC } from "../RouteModule";

@Component
export default class RouteTeamEntry extends Script {

    @Property({ hideInEditor: true, replicated: true, onChanged: "onPlayerNumChanged" })
    public playerNums: number = 0;

    @Property({ hideInEditor: true, replicated: true, onChanged: "onResetTimeChanged" })
    public restTime: number = -1;

    @Property({ displayName: "游戏id", tooltip: "指的是GameTheam表格中的id" })
    public gameid: number = 1;

    private _enterPlayers: string[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            ModuleService.ready().then(() => {
                this.hideUI();
            })
            return;
        }
        Player.onPlayerLeave.add((player: Player) => {
            this.removePlayer(player.userId);
        })
        const trigger = this.gameObject.getChildByName("trigger") as Trigger;
        trigger.onEnter.add((char: Character) => {
            if (!char.player) {
                return;
            }
            this.addPlayer(char.player.userId);
        })
        trigger.onLeave.add((char: Character) => {
            if (!char.player) {
                return;
            }
            this.removePlayer(char.player.userId);
        })
    }

    private _timer: number = 0;

    protected onUpdate(dt: number): void {
        this._timer += dt;
        if (this._timer <= 1) {
            return;
        }
        if (this._enterPlayers.length != this.playerNums) {
            this.playerNums = this._enterPlayers.length;
        }
        this._timer = 0;
        this.restTime -= 1;
        if (this.restTime <= 0) {
            const cfg = GameConfig.GameTheme.getElement(this.gameid);
            if (!cfg) {
                return;
            }
            let arr = [];
            if (this._enterPlayers.length > cfg.maxNum) {
                arr = this._enterPlayers.slice(0, cfg.maxNum)
                this._enterPlayers.splice(0, cfg.maxNum);
                this.restTime = 15;
            }
            else {
                arr = this._enterPlayers.slice(0);
                this._enterPlayers.length = 0;
                this.useUpdate = false;
            }
            this.playerNums = this._enterPlayers.length;
            arr.forEach(e => {
                const player = Player.getPlayer(e);
                if (player) {
                    this.jumpGameTrace(player, arr.length, cfg.id);
                }
            })
            JumpListener.instance.jumpScene(arr, cfg.levelName);
        }
    }

    @RemoteFunction(Client)
    private jumpGameTrace(plyaer: Player, teamNum: number, gameId: number) {
        ModuleService.getModule(RouteModuleC).traceTeam(teamNum, gameId);
    }

    private addPlayer(userId: string) {
        const index = this._enterPlayers.indexOf(userId);
        if (index == -1) {
            this._enterPlayers.push(userId);

            if (this._enterPlayers.length == 1) {
                this.playerNums = 1;
            }
        }
        if (!this.useUpdate) {
            this.restTime = 15;
            this.useUpdate = true;
        }
    }

    private removePlayer(userId: string) {
        const index = this._enterPlayers.indexOf(userId);
        if (index != -1) {
            this._enterPlayers.splice(index, 1);
        }
        if (this._enterPlayers.length == 0) {
            this.useUpdate = false;
            this.playerNums = this._enterPlayers.length;
        }
    }

    public onPlayerNumChanged() {
        if (!this.gameObject) return;
        const cfg = GameConfig.GameTheme.getElement(this.gameid);
        if (this.playerNums == 0) {
            this.hideUI();
            return;
        }
        this.gameObject.getChildren().forEach(e => {
            if (e.name == "uiwidget") {
                e.setVisibility(PropertyStatus.On);
            }
        })
        const uiArr = this.getUI();
        uiArr.forEach(e => {
            e.mtxt_num.text = CommonUtils.formatString(LanUtil.getText("RouteTeam_01"), this.playerNums, cfg.maxNum);
        })
    }

    private hideUI() {
        this.gameObject.getChildren().forEach(e => {
            if (e.name == "uiwidget") {
                e.setVisibility(PropertyStatus.Off);
            }
        })
    }

    public onResetTimeChanged() {
        if (!this.gameObject) return;
        const uiArr = this.getUI();
        uiArr.forEach(e => {
            e.mtxt_time.text = CommonUtils.formatString(LanUtil.getText("RouteTeam_02"), this.restTime.toFixed(0));
        })
    }

    private getUI(): TeamJump_UI_Generate[] {
        let res = [];
        const childs = this.gameObject.getChildren();
        for (let index = 0; index < childs.length; index++) {
            const element = childs[index];
            if (element.name != "uiwidget") continue;
            const uiwidget = element as UIWidget;
            if (!uiwidget["bindUUI"]) {
                const ui = UIService.create(TeamJump_UI_Generate);
                ui.mtxt_num.text = "";
                ui.mtxt_time.text = "";
                uiwidget["bindUUI"] = ui;
                uiwidget.setTargetUIWidget(ui.uiWidgetBase);
            }
            res.push(uiwidget["bindUUI"]);
        }
        return res;
    }
}
