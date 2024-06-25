import { GameConfig } from "../../config/GameConfig";
import { ActionCommon } from "../../const/GlobalData";
import { PlayerRace } from "../../const/enum";
import UITools from "../../utils/UI/UITools";
import { utils } from "../../utils/uitls";
import TimeModuleC from "../Time/TimeModuleC";
import { MonsterChangeS } from "./MonsterChangeS";
import { P_MonsterChange } from "./UI/P_MonsterChange";

export class MonsterChangeC extends ModuleC<MonsterChangeS, null> {

    private chooseMonsterUI: P_MonsterChange = null;

    private monsterHasSelect: number[] = [];

    /**当期天是否已经使用了变身卡 */
    private isUseCard: boolean = false;

    /**成功使用变身卡事件 */
    public onUseCardSuccess: Action = new Action();

    /**当前玩家种族 */
    public static curPlayerRace: PlayerRace = PlayerRace.Human;

    onStart() {

        this.chooseMonsterUI = UIService.getUI(P_MonsterChange);

        this.addEvent();

        InputUtil.onKeyDown(mw.Keys.F1, () => {
            this.openChooseMonster();
        });
    }

    private addEvent() {
        ActionCommon.onPlayerHide.add((is) => {
            if (!utils.isNight()) return;
            if (this.monsterHasSelect.length == 0) return;
            // this.server.net_PlayerHide(is);
        })

        ModuleService.getModule(TimeModuleC).onDayStart.add(this.onDayStart.bind(this));
    }

    /**打开选择页 */
    public openChooseMonster(): void {
        UITools.ShowSoftTips("感染模式不可用，返回医院使用吧");
        return;
        if (this.isUseCard) {
            UITools.ShowSoftTips(GameConfig.Language.ChangeMonster_2.Value);
            return;
        }
        this.chooseMonsterUI.show();
    }

    private onDayStart() {
        this.isUseCard = false;
        this.chooseMonsterUI.monsterReset();
    }


    net_SyncMonster(ids: number[]) {
        this.monsterHasSelect = ids;
        this.chooseMonsterUI.refresh(ids);
    }

    /**玩家选择后，失败 */
    net_FailChoose() {
        UITools.ShowSoftTips(GameConfig.Language.ChangeMonster_3.Value);
        this.chooseMonsterUI.show();
    }

    /**所有端 收到玩家选择怪 */
    net_ChangeChoose(playerId: number, id: number) {
        if (playerId == this.localPlayerId) {
            console.warn(`lwj 自己选择怪物成功`);
            this.isUseCard = true;
            this.onUseCardSuccess.call();
        } else {
            console.warn(`lwj 其他玩家选择怪物 ${id}`);
            this.monsterHasSelect.push(id);
            this.chooseMonsterUI.onMonsterChange(id);
        }
    }

    /**玩家隐藏 */
    net_PlayerHide(playerId: number, isHide: boolean) {

        let player = Player.getPlayer(playerId);
        if (player) {
            player.character?.setVisibility(!isHide);
        }
    }
}