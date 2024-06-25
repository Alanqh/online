
import { SceneUnitModuleC } from "./SceneUnitModuleC";
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { SceneUnitPerformantFactory } from "./Tool/NPCTool";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import TimeModuleS from "../Time/TimeModuleS";
import { AtkCheck } from "./Tool/AtkCheck";
import { PlayerCurState } from "../../const/enum";
import { TaskEnum } from "../Guide/TaskEnum";
import ChangeJS from "../ChangeMonster/ChangeJS";
import { DayNpc } from "./SceneUnitModule";

export class SceneUnitModuleS extends ModuleS<SceneUnitModuleC, null> {
    private playerMS: PlayerModuleS = null;
    private timeMS: TimeModuleS = null;


    /**NPC 变身怪 攻击 key:sceneID val:[动画timeoutMap,playerID] */
    private npcHitAniTimeoutMap: Map<number, any[]> = new Map();
    /**玩家攻击 动画timeoutMap */
    private playerHitAniTimeoutMap: Map<number, any> = new Map();
    /**玩家怪 攻击玩家 攻击动画 key:攻击者 val timeout  */
    private playerMonsterAtkPlayerMap: Map<number, number> = new Map();


    async onStart() {

        SceneUnitPerformantFactory.init();

        /**提前生成，防止用的时候 生成延迟 */
        this.createTrigger();

        this.playerMS = ModuleService.getModule(PlayerModuleS);
        this.timeMS = ModuleService.getModule(TimeModuleS)
        this.timeMS.onNightStart.add(this.createNpc.bind(this));
        this.timeMS.onDayStart.add(this.recycleNpc.bind(this));

        // GlobalData.PlayerAttribute.playerStateChanged_S.add(this.playerQuitInteract, this);
        setTimeout(() => {
            DayNpc.instance.init();
        }, 6666);

    }

    protected onPlayerLeft(player: mw.Player): void {
        try {

        } catch (error) {
        }
    }

    /**
     * 夜晚开始 创建怪物 
     */
    public async createNpc() {

        //回收白天NPC
        await DayNpc.instance.recycle();
    }

    /**回收怪 */
    public async recycleNpc() {

        DayNpc.instance.startALLNpc();
    }

    //#region  test


    net_test1() {
    }
    net_test2() {

    }

    //#endregion test


    /**玩家怪 攻击玩家 */
    @Decorator.noReply()
    public net_playerAtkPlayer() {
        let curPlayer = this.currentPlayer;
        let time = setTimeout(() => {
            let playerId = AtkCheck.playerAtkPlayer(curPlayer.character);
            // console.warn(`lwj playerid ${playerId}`);
            let can = this.playerMS.canBeAttacked(0, playerId);
            if (!can) return;
            //攻击
            console.warn(`lwj 开始玩家受击`);
            this.changeMonsterAtkPlayer(playerId, curPlayer.playerId);

            this.clearPlayerMonsterAtkPlayer(curPlayer.playerId);
        }, GlobalData.NPC.npcAtkCheckTime);

        this.playerMonsterAtkPlayerMap.set(this.currentPlayerId, time);
    }


    @Decorator.noReply()
    /**玩家攻击NPC */
    public net_hitSceneUnit(sceneID: number) {
        let playerId = this.currentPlayerId;
        let char = this.currentPlayer.character;

        let timeout = setTimeout(() => {
            if (!char || !char.worldTransform) return;
            // let pos = char.worldTransform.position.clone();
            // pos.add(char.worldTransform.getForwardVector().multiply(100));

            //玩家怪
            console.warn(`lwj 玩家攻击玩家怪 ${sceneID}  `);
            this.atkPlayerMonster(sceneID);
            this.clearPlayerAttAckNpcTimeout(sceneID);
        }, 800);
        this.playerHitAniTimeoutMap.set(sceneID, timeout);
    }

    /**玩家攻击玩家怪 */
    private atkPlayerMonster(playerId: number) {
        this.clearPlayerMonsterAtkPlayer(playerId);
        Player.getPlayer(playerId)?.character?.getComponent(ChangeJS).onPlayerDropBlood();
    }


    /** 
     * 清除npc攻击玩家的受击动画
     */
    private clearNpcAttackPlayerAni(scenceID: number) {
        let valArr = this.npcHitAniTimeoutMap.get(scenceID);
        if (!valArr || valArr.length == 0) {
            console.warn(`lwj 没有攻击玩家的受击动画`);
            return;
        }
        let char = Player.getPlayer(valArr[1])?.character;
        if (!char) {
            console.warn(`lwj error 没有玩家角色 `);
            return;
        }
        char.movementEnabled = true;
        this.playerMS.setPlayerInteract(valArr[1], true);

        if (valArr[0]) {
            clearTimeout(valArr[0]);
            this.npcHitAniTimeoutMap.delete(scenceID);
        }
    }

    /**npc攻击动画延迟中是否有player */
    public isNpcHitAniTimeoutPlayer(playerId: number): number {
        let sceneID: number = 0;
        this.npcHitAniTimeoutMap.forEach((val, key) => {
            if (sceneID != 0) return;
            if (val[1] == playerId) sceneID = key;
        });
        return sceneID;
    }

    /**变身怪攻击到玩家 玩家的受击表现
     * @param hitPlayer 受击玩家
     * @param playerId 攻击玩家
     */
    private changeMonsterAtkPlayer(hitPlayer: number, playerId: number) {
        let scenceID = this.isNpcHitAniTimeoutPlayer(hitPlayer);
        //NPC攻击到了玩家
        if (scenceID != 0) return;

        let char = Player.getPlayer(hitPlayer).character;
        let ani = char.loadAnimation(GlobalData.NPC.playHitAniGuid);
        ani.play();
        char.movementEnabled = false;
        // this.playerMS.setPlayerInteract(hitPlayer, false);


        //防止玩家受击时，玩家攻击NPC
        let aniTimeout = setTimeout(() => {
            char.movementEnabled = true;
            this.clearNpcAttackPlayerAni(playerId);
            this.clearPlayerAttAckNpcTimeout(playerId);
            this.playerMS.attackPlayer(hitPlayer, playerId)
            console.warn(`lwj npc成功攻击玩家  `);
        }, ani.length * 666);

        this.npcHitAniTimeoutMap.set(playerId, [aniTimeout, hitPlayer]);
    }

    /**
     * 清除玩家攻击NPC延迟
     */
    private clearPlayerAttAckNpcTimeout(scenceID: number) {

        let timeout = this.playerHitAniTimeoutMap.get(scenceID);
        if (timeout) {
            // console.log(`lwj 接上个log 清`);
            clearTimeout(timeout);
            this.playerHitAniTimeoutMap.delete(scenceID);
        }
    }

    /** 清楚玩家怪攻击玩家 */
    public clearPlayerMonsterAtkPlayer(playerId: number) {
        let timeout = this.playerMonsterAtkPlayerMap.get(playerId);
        if (timeout) {
            clearTimeout(timeout);
            this.playerMonsterAtkPlayerMap.delete(playerId);
        }
    }



    /**NPC跳舞 */
    public npcDance(atkerId: number, guid: string, danceId: number) {

        DayNpc.instance.danceNpc(guid, danceId);
        return;

        ActionCommon.onTaskComplete.call(atkerId, TaskEnum.shootMonster);
    }

    /**变身 */
    public changeModel(guid: string) {

        DayNpc.instance.changeModel(guid);
        return;

    }




    /**
     * 生成触发器
     */
    public createTrigger() {
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });

        GameObjPool.asyncSpawn("Interactor", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Interactor", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Interactor", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
    }


}