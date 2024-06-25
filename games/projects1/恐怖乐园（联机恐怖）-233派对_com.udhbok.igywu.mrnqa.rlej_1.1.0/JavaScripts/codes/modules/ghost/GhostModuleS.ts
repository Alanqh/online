import { GameConfig } from "../../../config/GameConfig";
import { IGhostDayElement } from "../../../config/GhostDay";
import { IGhostInstanceElement } from "../../../config/GhostInstance";
import { CeHuaDefines } from "../../CehuaDefines";
import { NodeInfoFlyEntity } from "../../GamePlay/Framework/MeleeWeapon/AnmationInfo";
import { LoadMgr } from "../../GamePlay/Framework/Tools/LoadManager";
import GameStart, { EGameTheme } from "../../GameStart";
import { Behavior3Map } from "../../configB3/BehaviorMap";
import { WaitLoop } from "../../utils/AsyncTool";
import { ImpluseUpdater } from "../../utils/ImpuluseLimiter";
import ArchiveModuleS from "../archive/ArchiveModuleS";
import GhostBossInst from "../ghostBoss/GhostBossInst";
import { ProcedureModuleS } from "../procedure/ProcedureModuleS";
import TimeModuleS from "../time/TimeModuleS";
import GhostBehavoirInst from "./GhostBehavoir";
import { GhostSettings, GhostEvents } from "./GhostDefine";
import GhostInst from "./GhostInst";
import { GhostModuleC } from "./GhostModuleC";
import { EHurtTextType, HitDamage } from "../hotweapon/ui/UIHitDamage";
import { PlayerModuleS } from "../player/PlayerModuleS";
import { BlackBoardModuleS } from "../blackboard/BlackBoardModuleS";
import { GamesStartDefines } from "../../Defines";

export class GhostModuleS extends ModuleS<GhostModuleC, null> {

    /** 所有鬼的集合 */
    public ghostMap: Map<string, GhostInst | GhostBehavoirInst> = new Map();

    /** 是否已经正常初始化过鬼了 */
    private ghostStarted: boolean = false;

    /** 击杀列表 */
    private killMap: Map<number, number> = new Map();

    private _ghostPlayerMap: Map<number, GhostBehavoirInst[]> = new Map();

    /** 每个鬼的实例的生成次数 */
    private _insCountMap: Map<number, number> = new Map();

    private _maxDay: number = 0;

    private _patrolArr: Vector[] = [];

    private _unUnsedChars: GhostBehavoirInst[] = [];

    private _patrolStartTime: number = -100;

    private _redMoonMap: Map<number, IGhostDayElement> = new Map();

    public safeMap: Map<number, boolean> = new Map();

    protected onStart(): void {
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            const allCfgs = GameConfig.GhostDay.getAllElement().filter(e => {
                return !e.isRedMoon;
            })
            this._maxDay = allCfgs[allCfgs.length - 1].id;
            const redMoon = GameConfig.GhostDay.getAllElement().filter(e => {
                return e.isRedMoon;
            });
            redMoon.forEach(e => {
                this._redMoonMap.set(e.day, e);
            })
            WaitLoop.loop(() => { return ModuleService.getModule(TimeModuleS) }).then(timeModule => {
                if (timeModule)
                    timeModule.nightAction.add(() => {
                        let curtime = TimeUtil.elapsedTime();
                        this._patrolStartTime = curtime;
                        this.getAllClient().net_spawnBigPatrol(curtime - this._patrolStartTime);
                        setTimeout(() => {
                            Player.getAllPlayers().forEach(e => {
                                this.playGhostSpawn(e);
                            });
                        }, CeHuaDefines.GhostPatrolStartTime * 1000);

                    })
                timeModule.dayAction.add(() => {
                    this.ghostMap.forEach((e: GhostBehavoirInst) => {
                        if (!e.bindPlayerId) {
                            return;
                        }
                        if (e.enableKill) {
                            e.enable = false;
                            e.enableKill = false;
                            Navigation.stopNavigateTo(e.ghostChar);
                            Navigation.navigateTo(e.ghostChar, e.startPos);
                            setTimeout(() => {
                                this.despawnGhost(e);
                            }, 4000);
                        }
                    })
                    this._ghostPlayerMap.clear();
                })
            })

            setInterval(() => {
                if (this._patrolArr.length != 0) {
                    this.spawnPatrols();
                }
            }, 500)
        }
        GameConfig.GhostInstance.getAllElement().forEach(e => {
            if (e.treeName) {
                e.treeName = e.treeName.trim();
            }
        })
    }

    public net_syncPatrol() {
        let curtime = TimeUtil.elapsedTime();
        let diffTime = curtime - this._patrolStartTime;
        return diffTime;
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        try {
            if (GameStart.GameTheme != EGameTheme.Graveyard) {
                this.startGame();
            }
        } catch (error) {
            console.error(error);
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            if (this.killMap.has(player.playerId)) {
                this.killMap.delete(player.playerId);
            }
            if (this.safeMap.has(player.playerId)) {
                this.safeMap.delete(player.playerId);
            }
            if (this._ghostPlayerMap.has(player.playerId)) {
                this._ghostPlayerMap.get(player.playerId).forEach(e => {
                    this.despawnGhost(e);
                })
                this._ghostPlayerMap.delete(player.playerId);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 玩家进入游戏
     */
    net_enterGame() {
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            try {
                const timeModule = ModuleService.getModule(TimeModuleS);
                if (timeModule.isInNight) {
                    console.log("newplayerenter,spawnGhosts")
                    this.playGhostSpawn(this.currentPlayer);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    private spawnPatrols() {
        this.getAllClient().net_spawnPatrol(CeHuaDefines.GhostDisEffect, this._patrolArr);
        this._patrolArr.length = 0;
    }

    private async playGhostSpawn(player: Player) {
        const dayCfg = await this.getCurDay(player.userId);
        if (!dayCfg) {
            console.log("当前玩家还没有day")
            return
        }
        if (!this.checkCanKill(player.playerId)) {
            console.error("当前玩家正在保护中")
            return;
        }
        if (dayCfg.exGhost) {
            console.log("特殊鬼" + dayCfg.exGhost)
            for (let index = 0; index < dayCfg.exGhost.length; index++) {
                const eleId = dayCfg.exGhost[index];
                let insCfg = GameConfig.GhostInstance.getElement(eleId);
                if (!insCfg) {
                    continue;
                }
                if (insCfg["treeName"] && Behavior3Map.has(insCfg["treeName"])) {
                    this.spawnPlayerGhost(player, dayCfg, insCfg);
                }
            }
        }
        else {
            for (let i = 0; i < GhostSettings.spawnGhostInsIds.length; i++) {
                let eleId = GhostSettings.spawnGhostInsIds[i];
                let insCfg = GameConfig.GhostInstance.getElement(eleId);
                if (!insCfg) {
                    continue;
                }
                if (insCfg["treeName"] && Behavior3Map.has(insCfg["treeName"])) {
                    this.spawnPlayerGhost(player, dayCfg, insCfg);
                }
            }
        }

    }

    async spawnPlayerGhost(player: Player, day: IGhostDayElement, insCfg: IGhostInstanceElement) {
        let playerId = player.playerId
        if (!this._ghostPlayerMap.has(playerId)) {
            this._ghostPlayerMap.set(playerId, []);
        }
        let ghostList = this._ghostPlayerMap.get(playerId);
        let ghost = await this.spawnGhost(insCfg) as GhostBehavoirInst;
        ghost.bindPlayerId = playerId;
        ghost.server_initGhost(insCfg.id, day);

        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            let index = this._insCountMap.get(insCfg.id) || 0;
            index = index >= insCfg.patrols.length ? 0 : index;
            ghost.ghostChar.worldTransform.position = insCfg.patrols[index];
            this._insCountMap.set(insCfg.id, index + 1);
            ghost.reset(insCfg.patrols[index]);
        }
        else {
            ghost.reset(insCfg.patrols[0]);
        }

        ghostList.push(ghost);
        this.ghostMap.set(ghost.id, ghost);
        return ghost;
    }

    /**
     * 获得当前是第几天
     * @param userId 朋友的id
     * @returns 默认返回第一天。
     */
    private async getCurDay(userId: string): Promise<IGhostDayElement> {
        const procedureScript = ProcedureModuleS.getScriptByUserID(userId);
        let archiveId = procedureScript.archiveID;
        if (archiveId === -1) {
            console.log("未注册存档")
            return null;
        }
        let data = await ModuleService.getModule(ArchiveModuleS).net_reqArchiveData(userId, archiveId);
        let day = (data.aliveDay || 0) + 1;
        let isRedMoon = data.redMoon > 0 || false;
        if (day > this._maxDay) {
            day = this._maxDay;
        }
        if (isRedMoon) {
            const moonDay = data.aliveDay - data.redMoon + 1;
            console.log("curMoonDay" + moonDay)
            const dayCfg = this._redMoonMap.get(moonDay);
            if (dayCfg) {
                return dayCfg;
            }
            else {
                return this._redMoonMap.get(1);
            }
        }
        return GameConfig.GhostDay.getAllElement().find(e => { return e.day == day });
    }

    despawnGhost(behavoir: GhostBehavoirInst) {
        if (!behavoir.ghostChar || !behavoir.ghostChar.worldTransform) {
            console.error("回收错误，鬼烂了")
            return;
        }
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            this._patrolArr.push(behavoir.ghostChar.worldTransform.position);
        }
        if (this._unUnsedChars.findIndex(e => {
            return e.ghostChar.gameObjectId == behavoir.ghostChar.gameObjectId
        }) != -1) {
            return;
        }
        this._unUnsedChars.push(behavoir);
        behavoir.ghostChar.setVisibility(PropertyStatus.Off);
        behavoir.bindPlayerId = 0;
        behavoir.enable = false;
        behavoir.targetId = 0;
        behavoir.enableKill = false;
        behavoir.enableTree = false;
        behavoir.ghostChar.complexMovementEnabled = false;
        behavoir.ghostChar.worldTransform.position = new Vector(7534, -6046, 400)
        behavoir.ghostChar.collisionWithOtherCharacterEnabled = false;
        behavoir.ghostChar.gravityScale = 0;
        this.ghostMap.delete(behavoir.ghostChar.gameObjectId);
    }

    /**
     * 游戏开始
     * @param difficulty 难度
     */
    async startGame() {
        if (this.ghostStarted) {
            console.log("鬼已经开始了");
            return;
        }
        this.ghostStarted = true;
        for (let i = 0; i < GhostSettings.spawnGhostInsIds.length; i++) {
            let eleId = GhostSettings.spawnGhostInsIds[i];
            let insCfg = GameConfig.GhostInstance.getElement(eleId);
            if (!insCfg) {
                continue;
            }
            if (insCfg["treeName"] && Behavior3Map.has(insCfg["treeName"])) {
                const ins = await this.spawnGhost(insCfg);
                ins.server_initGhost(eleId, GameConfig.GhostDay.getElement(1));
                this.ghostMap.set(ins.id, ins);
            }
            else {
                const ghostInst = await this.spawnGhost();
                ghostInst.server_initGhost(eleId, GameConfig.GhostDay.getElement(1));
                this.ghostMap.set(ghostInst.id, ghostInst);
            }
        }
    }

    /**
     * 生成鬼
     * @returns 
     */
    async spawnGhost(cfg?: IGhostInstanceElement, type: number = 0, usePool: boolean = true) {
        if (this._unUnsedChars.length != 0 && cfg && usePool) {
            let ghost = this._unUnsedChars.pop();
            ghost.ghostChar.setVisibility(PropertyStatus.On, false);
            ghost.ghostChar.complexMovementEnabled = true;
            ghost.ghostChar.collisionWithOtherCharacterEnabled = true;
            ghost.enable = true;
            ghost.enableKill = true;
            ghost.enableTree = true;
            ghost.ghostChar.gravityScale = 1;
            ghost.ghostChar.setCollision(PropertyStatus.On);
            ghost.ghostChar.movementDirection = MovementDirection.ControllerDirection;
            ghost.moveProxy.isFly = false;
            return ghost;
        }

        const npc = await LoadMgr.asyncSpawn("Character") as mw.Character;
        await npc.asyncReady();
        npc.displayName = "";
        const trigger = await LoadMgr.asyncSpawn("Trigger", { replicates: false }) as mw.Trigger;
        npc.attachToSlot(trigger, mw.HumanoidSlotType.Root);
        trigger.localTransform.position = (Vector.zero);
        trigger.localTransform.rotation = (Rotation.zero);
        trigger.worldTransform.scale = new Vector(1, 1, 1);
        if (cfg) {
            if (type == 0) {
                console.log("生成行为树鬼");
                const ghostInst = await mw.Script.spawnScript(GhostBehavoirInst, true, npc);
                ghostInst.id = npc.gameObjectId;
                ghostInst.ghostChar = npc;
                ghostInst._trigger = trigger;
                return ghostInst;
            }
            else if (type == 1) {
                console.log("生成Boss");
                const ghostInst = await mw.Script.spawnScript(GhostBossInst, true, npc);
                ghostInst.id = npc.gameObjectId;
                ghostInst.ghostChar = npc;
                ghostInst._trigger = trigger;
                return ghostInst;
            }
        }
        else {
            console.log("生成状态机鬼");
            const ghostInst = await mw.Script.spawnScript(GhostInst, true, npc);
            ghostInst.id = npc.gameObjectId;
            ghostInst.ghostChar = npc;
            ghostInst._trigger = trigger;
            return ghostInst;
        }
    }

    public checkCanKill(playerId: number, isCheckProtect: boolean = true) {
        let player = Player.getPlayer(playerId);
        if (!player) {
            return false;
        }
        if (isCheckProtect) {
            let res = this.safeMap.get(playerId);
            if (res) {
                return false;
            }
        }
        const playerModule = ModuleService.getModule(PlayerModuleS);
        if (GamesStartDefines.gameTheme == EGameTheme.Graveyard || GamesStartDefines.gameTheme == EGameTheme.Town) {
            let curHp = playerModule.getHp(player.userId);
            if (curHp <= 0) {
                return false;
            }
        }
        let killTime = this.killMap.get(playerId) || 0
        if (killTime == 0) {
            return true;
        }
        if (killTime == -1) {
            return false;
        }
        return TimeUtil.elapsedTime() - killTime > 10;
    }

    public net_checkCanBeAttack(playerId: number) {
        let player = Player.getPlayer(playerId);
        if (!player) {
            return false;
        }
        //在安全区
        let res = this.safeMap.get(playerId);
        if (res) {
            return false;
        }
        //已经死亡
        let curHp = ModuleService.getModule(PlayerModuleS).getHp(player.userId);
        if (curHp <= 0) {
            return false;
        }
        // 在保护时间内
        let killTime = this.killMap.get(playerId) || 0
        if (killTime == -1) {
            return false;
        }
        return true;
    }

    public setPlayerCd(player: Player, cd: number = 0) {
        this.killMap.set(player.playerId, TimeUtil.elapsedTime() + cd);
    }

    net_checkCanKill(pid: number, isCheckSafe: boolean) {
        return this.checkCanKill(pid, isCheckSafe);
    }

    net_protectedPlayer(isProtec: boolean) {
        this.protectedPlayer(this.currentPlayerId, isProtec);
    }

    public protectedPlayer(playerid: number, isProtec: boolean) {
        if (isProtec) {
            this.killMap.set(playerid, -1);
        }
        else {
            this.killMap.set(playerid, 0);
        }
    }

    public net_damageGhost(attackerId: number, ghostGuid: string, damage: number, aniGuid: string, force: Vector, isHitHead: boolean, hitPos?: Vector) {
        if (!this.ghostMap.has(ghostGuid)) {
            return;
        }
        let targetId = attackerId;
        let ins = this.ghostMap.get(ghostGuid) as GhostBehavoirInst;
        if (ins.curHp <= 0) {
            return;
        }
        if (!ins.enableTree || !ins.enable) {
            return;
        }
        if (ins._insCfg["onlySelfKill"] && damage >= ins.curHp) {
            damage = ins.curHp - 1;
        }
        if (damage <= 0) {
            return;
        }
        ins.takeDmg(damage, targetId, attackerId);
        if (ins.checkHitAni()) {
            ins.playAni2(aniGuid, AnimSlot.Upper);
        }
        ins.iseffectByForce && ImpluseUpdater.instance.addImpluse(ins.ghostChar, force);

        // 广播给附近的玩家一个伤害飘字
        // Player.getAllPlayers().forEach(v => {
        //     let twoDis = Vector.squaredDistance(v.character.worldTransform.position, ins.ghostChar.worldTransform.position);
        //     if (twoDis < this.ViewDmgUIDisSquare) {
        //         let hurtType = isHitHead ? EHurtTextType.HeadShot : EHurtTextType.Normal;
        //         let flyPos = hitPos ? hitPos : ins.ghostChar.getSlotWorldPosition(isHitHead ? HumanoidSlotType.Head : HumanoidSlotType.Buttocks);
        //         this.getClient(v).net_flyHitDamageUI(flyPos, damage, hurtType);
        //     }
        // });
    }

    /** 附近玩家显示伤害UI的距离平方 */
    private readonly ViewDmgUIDisSquare: number = 2e6;

    public stopMov(char: Character) {
        if (!this.ghostMap.has(char.gameObjectId)) {
            return;
        }
        let ins = this.ghostMap.get(char.gameObjectId);
        ins.bindDir = null;
    }

    public net_setCd(cd: number) {
        this.setPlayerCd(this.currentPlayer, cd);
    }

    @Decorator.noReply()
    public net_clearGhost() {
        let playerId = this.currentPlayerId
        if (this._ghostPlayerMap.has(playerId)) {
            this._ghostPlayerMap.get(playerId).forEach(e => {
                this.despawnGhost(e);
            })
            this._ghostPlayerMap.delete(playerId);
        }
    }

    @Decorator.noReply()
    public net_CGStatus(res: boolean) {
        if (res) {
            this.net_clearGhost();
        }
        this.net_protectedPlayer(res);
    }

    sendFlyItem(info: NodeInfoFlyEntity, id: string, playerid: number, dmg: number) {
        this.getAllClient().net_sendFlyItem(Number(info.moveSpeed), info.guid, id, playerid, dmg);
    }

    public net_setSafe(isSafe: boolean) {
        this.safeMap.set(this.currentPlayerId, isSafe);
    }

    public reqSendTrace(pid: number, isdead: boolean, cfgid: number, enterNum: number) {
        const player = Player.getPlayer(pid);
        if (!player) {
            return;
        }
        this.getClient(player).net_traceDmg(cfgid, isdead, enterNum);
    }
}
