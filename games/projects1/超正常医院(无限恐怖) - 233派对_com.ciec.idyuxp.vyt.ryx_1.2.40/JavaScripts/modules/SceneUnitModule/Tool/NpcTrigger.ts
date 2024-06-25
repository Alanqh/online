import { GlobalData } from "../../../const/GlobalData";
import { PlayerCurState, PlayerRace } from "../../../const/enum";
import { utils } from "../../../utils/uitls";
import { MonsterChangeC } from "../../ChangeMonster/MonsterChangeC";
import P_Game_HUD from "../../GameHud/UI/P_Game_HUD";


export class NpcTrigger {

    private trigger: mw.Trigger = null;
    private sceneID: number = 0;
    private hudUI: P_Game_HUD = null;
    private timeout: any = null;



    constructor(sceneID: number) {
        this.sceneID = sceneID;
        this.hudUI = UIService.getUI(P_Game_HUD);
    }
    public async init(npc: mw.GameObject) {

        this.trigger = npc.getChildByName("触发器") as mw.Trigger;
        if (!this.trigger) {
            this.trigger = await GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset);
            this.trigger.parent = npc;
            this.trigger.localTransform.position = new mw.Vector(0, 0, 0);
            this.trigger.localTransform.rotation = new mw.Rotation(0, 0, 0);
            this.trigger.localTransform.scale = GlobalData.NPC.npcScal;
            this.trigger.onEnter.add(this.enterTrigger.bind(this));
            this.trigger.onLeave.add(this.leaveTrigger.bind(this));
        } else {
            this.trigger.onEnter.add(this.enterTrigger.bind(this));
            this.trigger.onLeave.add(this.leaveTrigger.bind(this));
        }
    }


    /**设置触发器启用 */
    public async setTriggerEnable(enable: boolean, scenceID: number) {
        this.sceneID = scenceID;
        if (!this.trigger) {
            await TimeUtil.delaySecond(0.5);
            this.setTriggerEnable(enable, scenceID);
            return;
        }
        this.trigger.enabled = enable;
        if (!enable) {
            this.hudUI.setAttackBtnVisible(false, this.sceneID);
        }
    }

    /**进入触发器 */
    private enterTrigger(obj: mw.GameObject) {
        let isChar = utils.checkTriggerGo(obj);
        if (!isChar) {
            return;
        }
        if (!utils.isNight()) return;
        let isMonster = MonsterChangeC.curPlayerRace == PlayerRace.Ghost
        if (isMonster) return;
        if (GlobalData.curPlayerData && GlobalData.curPlayerData.PlayerState != PlayerCurState.Survive) return;
        this.hudUI.setAttackBtnVisible(true, this.sceneID);
    }

    /**离开触发器 */
    private leaveTrigger(obj: mw.GameObject) {
        let isChar = utils.checkTriggerGo(obj);
        if (!isChar) {
            return;
        }
        this.hudUI.setAttackBtnVisible(false, this.sceneID);
    }

    private clearTimeOut() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

}