/*
 * @Author       : dal
 * @Date         : 2023-11-09 11:12:27
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-10 14:38:46
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\player\PlayerModuleS.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { ArchiveHelper } from "../archive/ArchiveHelper";
import { GhostModuleS } from "../ghost/GhostModuleS";
import MissionModuleS from "../mission/MissionModuleS";
import { ProcedureModuleS } from "../procedure/ProcedureModuleS";
import RecordData from "../record/RecordData";
import { RouteModuleS } from "../route/RouteModule";
import PlayerData, { INIT_HP_NUM } from "./PlayerData";
import { PlayerModuleC } from "./PlayerModuleC";

export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerData> {
    protected onPlayerJoined(player: mw.Player): void {
        this.getPlayerData(player).hpAction.add((hp: number) => {
            if (hp <= 0) {
                ModuleService.getModule(GhostModuleS).setPlayerCd(player);
                ModuleService.getModule(MissionModuleS).playerDead(player)
            }
        })
    }

    @Decorator.noReply()
    net_initLife(pid: number, lifeNum: number) {
        const data = this.getPlayerData(pid);
        data.initLife(Player.getPlayer(pid).userId, lifeNum);
    }

    @Decorator.noReply()
    net_reduceLife(pid: number) {
        const data = this.getPlayerData(pid);
        data.reduceLife(Player.getPlayer(pid).userId);
    }

    /**
     * 杀死生命。玩家会直接死掉
     * @param pid 玩家id
     */
    @Decorator.noReply()
    net_killLife(pid: number) {
        const data = this.getPlayerData(pid);
        data.reduceLife(Player.getPlayer(pid).userId, data.life);
    }

    @Decorator.noReply()
    net_relife(effectGuid: string) {
        const data = this.currentData;
        const player = this.currentPlayer;
        data.relife(player.userId);
        this.getAllClient().net_playEffect(this.currentPlayerId, effectGuid);
        Event.dispatchToLocal("OnPlayerReLife", player.userId, ProcedureModuleS.getScriptByUserID(player.userId).archiveID);

        // 记录复活次数
        const recordData = DataCenterS.getData(player, RecordData);
        recordData && recordData.saveRebirthTimes();
    }

    @Decorator.noReply()
    async net_setLife(userId: string) {
        const archiveData = await ArchiveHelper.reqGetData(userId, ProcedureModuleS.getScriptByUserID(userId).archiveID);
        const data = this.getPlayerData(userId);
        data.setLife(archiveData.lifeNum);
    }

    @Decorator.noReply()
    async net_setCollision(isCrouch: boolean) {
        const player = Player.getPlayer(this.currentPlayerId);
        if (!player || !player.character) return;
        // Player.getAllPlayers().forEach(e => {
        //     if (e.playerId != player.playerId) {
        //         this.getClient(e).net_setOtherPlayerCollision(player.playerId, isCrouch);
        //     }
        // });
    }

    @Decorator.noReply()
    net_setCharName(name: string) {
        this.currentPlayer.character.displayName = name;
    }

    net_setKillCd(cd: number) {
        ModuleService.getModule(GhostModuleS).setPlayerCd(this.currentPlayer, cd);
    }

    /** 直接设置玩家当前生命值 */
    @Decorator.noReply()
    net_setHp(userId: string, hpNum: number) {
        let tempHp = hpNum ? hpNum : INIT_HP_NUM;
        if (tempHp < 0) { tempHp = 0; }
        if (tempHp > INIT_HP_NUM) { tempHp = INIT_HP_NUM; }
        const data = this.getPlayerData(userId);
        data.setHp(userId, tempHp);
    }

    /** 根据当前生命值增加或改变一个值  */
    @Decorator.noReply()
    net_changeHp(userId: string, deltaNum: number) {
        const data = this.getPlayerData(userId);
        let tempHp = data.hp + deltaNum;
        if (tempHp < 0) { tempHp = 0; }
        if (tempHp > INIT_HP_NUM) { tempHp = INIT_HP_NUM; }
        data.setHp(userId, tempHp);
    }

    /**
     * 获取一个玩家的生命值
     * @param userId 玩家的userId
     * @returns 这个玩家当前的生命值如果不存在这个玩家会返回0。
     */
    public getHp(userId: string) {
        const data = this.getPlayerData(userId);
        if (!data) {
            return 0;
        }
        return data.hp || 0;
    }

    /**获取玩家等级 */
    public async net_getPlayerLevel(userId: string) {
        let data = await ModuleService.getModule(RouteModuleS).net_reqAllGameRouteData(userId)
        const exp = data.map(v => { return v.totalExp }).reduce((v1, v2) => { return v1 + v2 }, 0);
        const curLevelCfg = GameConfig.PlayerExp.getAllElement().find(v => { return exp >= v.val });

        let curLevel = curLevelCfg ? curLevelCfg.level : 0;
        return curLevel;
    }
}
