/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-10 20:03:37
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-05-20 10:40:23
 * @FilePath: \1001_hall\JavaScripts\codes\modules\npc\NpcScript.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { INPCElement } from "../../../config/NPC";
import { WaitLoop } from "../../utils/AsyncTool";
import UINpcTalk from "./ui/UINpcTalk";

@Component
export default class NpcScript extends Script {
    private cha: Character;
    private missionData: number[] = [];
    private npcCfg: INPCElement;
    private effectId: number = -1

    @mw.Property({ displayName: "配置ID" })
    public cfgId: number = 1


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            this.cha = this.gameObject as Character;
            this.npcCfg = GameConfig.NPC.getElement(this.cfgId);
            this.cha.displayName = this.npcCfg.name;
            if (SystemUtil.isClient()) {
                this.registerEvents();
                this.setDescription();
            }
        })
    }

    private setDescription() {
        if (this.npcCfg.Character && this.cha) {
            this.cha.setDescription([this.npcCfg.Character])
        }
    }

    private registerEvents() {
        Event.addLocalListener("evt_interactNpc", this.interact.bind(this))//监听交互
        Event.addLocalListener(`evt_npcNewMission_${this.cfgId}`, this.triggerNewMission.bind(this));//监听新触发任务
        Event.addLocalListener(`evt_npcMissionCompleted_${this.cfgId}`, this.newMissionCompleted.bind(this));//监听任务完成
    }

    private triggerNewMission(missionId: number) {
        if (!this.missionData.includes(missionId)) this.missionData.push(missionId);
        this.checkMissionTips()
    }

    private interact(gameObjectId: string) {
        if (gameObjectId == this.cha.gameObjectId) {
            this.lookAtPlayer(true);
            UIService.show(UINpcTalk, this.cfgId, this.missionData, () => {
                this.lookAtPlayer(false);
            });
        }
    }
    private rawRot
    private lookAtPlayer(flag: boolean) {
        let pos = Player.localPlayer?.character?.worldTransform?.position
        if (!pos) return;
        if (flag) {
            this.rawRot = this.cha.worldTransform.rotation;
            this.cha.worldTransform.lookAt(pos)
        }
        else {
            this.cha.worldTransform.rotation = this.rawRot;
        }
    }

    private newMissionCompleted(completedMissionId: number) {
        let index = this.missionData.indexOf(completedMissionId)
        if (-1 != index) this.missionData.splice(index, 1);
        this.checkMissionTips()
    }

    private checkMissionTips() {
        if (this.missionData.length == 0) {
            EffectService.stop(this.effectId);
            this.effectId = null;
        } else if (!this.cfgId) {
            this.effectId = EffectService.playOnGameObject("113775", this.cha, { slotType: HumanoidSlotType.ChatFrame, loopCount: Infinity })
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}