import { ActionCommon } from "../../const/GlobalData";
import { PlayerCurState } from "../../const/enum";
import { PlayerModuleC } from "../../modules/Player/PlayerModuleC";
import { utils } from "../../utils/uitls";


/**
 * 受伤脚本
 * 触发掉血
 */
@Component
export default class RP_Injuried extends Script {

    @Property({ displayName: "一次掉血量" })
    private value: number = 11;
    @Property({ displayName: "检测受伤间隔/s" })
    private timeOut = 1;

    private trigger: mw.Trigger = null;
    private checkTime: any = null;
    private curPlayer: mw.Player = null;

    protected onStart(): void {
        if (SystemUtil.isServer()) {
        }

        if (SystemUtil.isClient()) {

            this.triggerEvent();

            Player.asyncGetLocalPlayer().then((player) => {
                this.curPlayer = player;
            });

            ActionCommon.onPlayerCurStateChange.add((state: PlayerCurState, playerID: number) => {
                // if (state == PlayerCurState.Dead && this.curPlayer.playerId == playerID) {
                //     this.clearTimer();
                // }
            });
        }


    }

    /**
     * 注册触发器事件
     */
    private triggerEvent() {

        this.trigger = this.gameObject as Trigger;

        this.trigger.onEnter.add((obj) => {

            let isChar = utils.checkTriggerGo(obj)
            if (!isChar) return;

            let char = obj as Character;
            this.checkInTrigger(char);

            ModuleService.getModule(PlayerModuleC).changeHp(-this.value);
        });

        this.trigger.onLeave.add((obj) => {

            let isChar = utils.checkTriggerGo(obj)
            if (!isChar) return;

            this.clearTimer();
        })
    }


    /**
     * 定时检查
     */
    private checkInTrigger(char: Character) {

        this.checkTime = TimeUtil.setInterval(() => {

            if (this.trigger.checkInArea(char)) {
                ModuleService.getModule(PlayerModuleC).changeHp(-this.value);
            }

        }, this.timeOut)
    }

    private clearTimer() {
        if (this.checkTime) {
            TimeUtil.clearInterval(this.checkTime);
            this.checkTime = null;
        }
    }
}
