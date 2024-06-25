import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme, GamesStartDefines } from "../../Defines";
import { CommonUtils } from "../../utils/CommonUtils";
import GhostBehavoirInst from "../ghost/GhostBehavoir";
import { GhostModuleS } from "../ghost/GhostModuleS";
import GhostBossCom from "./GhostBossCom";
import { BossLifeInfo, GhostBossCtl } from "./GhostBossCtl";
import { BossInfo } from "./GhostBossInst";
import { GhostBossModuleC } from "./GhostBossModuleC";
import { BossConst } from "./const/BossConst";

export class GhostBossModuleS extends ModuleS<GhostBossModuleC, null> {

    public curBoss: GhostBossCtl;

    lifeTimer: any;

    public allArea: GhostBossCom[] = [];

    public bossLifeInfos: BossLifeInfo[] = [];

    public isEnable: boolean = false;

    private dyId: number = 0;

    private bossTimer: number = 0;

    protected onStart(): void {
        this.isEnable = GamesStartDefines.gameTheme == EGameTheme.Town
        setTimeout(() => {
            this.addBoss();
            this.lifeTimer = setInterval(() => {
                this.onLifeTimer();
            }, 1000);
        }, 1000)
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            this.leaveBoss(player.playerId)
        } catch (error) {
            console.error(error.stack)
        }
    }

    protected onUpdate(dt: number): void {
        this.curBoss?.onUpdate(dt);
    }

    protected onLifeTimer(): void {
        if (!this.isEnable) {
            return;
        }
        for (let i = 0; i < this.bossLifeInfos.length; i++) {
            const bossLifeInfo = this.bossLifeInfos[i];
            if (bossLifeInfo.vanishTime >= 0) {
                bossLifeInfo.vanishTime--;
                if (bossLifeInfo.vanishTime <= BossConst.LIMIT_TIME && !bossLifeInfo.isSpawned) {
                    this.spawnEntity(bossLifeInfo);
                }
            } else {
                this.bossLifeInfos.splice(i, 1);
                i--;
                this.curBoss.destroy();
                this.getAllClient().net_removeBoss(bossLifeInfo);
            }
        }
        this.bossTimer += 1;
        if (this.curBoss && this.curBoss.isDied) {
            this.curBoss.isDied = false;
            this.addBoss();
        }
        if (this.bossTimer >= BossConst.INTERVAL) {
            this.addBoss();
        }
    }

    public removeBoss(info: BossLifeInfo) {
        const i = this.bossLifeInfos.findIndex(e => { return e.onlyid == info.onlyid; });
        this.bossLifeInfos.splice(i, 1);
        this.getAllClient().net_removeBoss(info);
    }

    addBossArea(com: GhostBossCom) {
        this.allArea.push(com);
    }

    addBoss() {
        this.bossTimer = 0;
        if (!this.isEnable || this.allArea.length == 0) {
            return;
        }
        console.log("开始生成一个新的boss")
        let sum = 0;
        for (let index = 0; index < this.allArea.length; index++) {
            const element = this.allArea[index];
            sum += element.weight;
        }
        let rd = Math.random() * sum;
        let target: GhostBossCom = null;
        for (let index = 0; index < this.allArea.length; index++) {
            const element = this.allArea[index];
            rd -= element.weight;
            if (rd <= 0) {
                target = element;
                break;
            }
        }
        let diffcult = this.getRdDifficult();
        const cfg = GameConfig.GhostBossDifficult.getElement(diffcult);
        const bossLifeInfo = {
            onlyid: this.dyId++,
            insId: cfg.ghostpool[MathUtil.randomInt(0, cfg.ghostpool.length)],
            spawnPoint: target.gameObject.gameObjectId,
            vanishTime: BossConst.LIMIT_TIME + BossConst.SPAWN_WAIT_TIME,
            diffcult: diffcult
        } as BossLifeInfo;
        console.log("本次boss的生成信息" + `地点${target.gameObject.gameObjectId}+难度${diffcult}`)
        this.bossLifeInfos.push(bossLifeInfo);
        this.getAllClient().net_addBoss(bossLifeInfo);
    }

    private getRdDifficult(): number {
        const allCfgs = GameConfig.GhostBossDifficult.getAllElement();
        let sum = 0;
        for (let index = 0; index < allCfgs.length; index++) {
            const element = allCfgs[index];
            sum += element.weight;
        }
        let rd = Math.random() * sum;
        let target: number = 1;
        for (let index = 0; index < allCfgs.length; index++) {
            const element = allCfgs[index];
            rd -= element.weight;
            if (rd <= 0) {
                target = element.id;
                break;
            }
        }
        return target;
    }

    async spawnEntity(info: BossLifeInfo) {
        info.isSpawned = true;
        if (!this.curBoss) {
            this.curBoss = new GhostBossCtl();
        }
        await this.curBoss.init(info, this.allArea.find(e => { return e.gameObject.gameObjectId == info.spawnPoint; }));
        this.getAllClient().net_spawnBoss(info);
    }

    @Decorator.noReply()
    public net_entryBoss(comId: string) {
        if (this.curBoss.bindInfo.spawnPoint != comId) {
            return;
        }
        if (this.curBoss.entryPids.includes(this.currentPlayerId)) {
            return;
        }
        this.curBoss.addValidPlayer(this.currentPlayerId);
    }

    @Decorator.noReply()
    public net_LeaveBoss(comId: string) {
        if (this.curBoss.bindInfo.spawnPoint != comId) {
            return;
        }
        this.leaveBoss(this.currentPlayerId);
    }

    private leaveBoss(pid: number) {
        if (!this.curBoss) {
            return;
        }
        this.curBoss.removePlayer(pid);
    }

    public sendReward(pid: number, ids: number[], counts: number[], issuc: boolean, lv: number) {
        this.getClient(pid).net_sendReward(ids, counts, issuc, lv);
    }

    sendTips(pid: number, bossKey: string) {
        this.getAllClient().net_tipsHeiHei(Player.getPlayer(pid).character.displayName, bossKey);
    }

    sendVectory(pid: number, bossinfo: BossInfo, isSuc: boolean, minHp: number, fightCount: number, hurtCount: number, lifeTime: number) {
        this.getClient(pid).net_sendVectory(bossinfo, isSuc, minHp, fightCount, hurtCount, lifeTime);
    }

    sendFirstDmg(pid: number, bossinfo: BossInfo) {
        let player = Player.getPlayer(pid);
        if (!player) {
            return;
        }
        this.getClient(player).net_fristDmg(bossinfo.sceneId);
    }

    net_reqSyncData() {
        this.getClient(this.currentPlayer).net_syncBossInfos(this.bossLifeInfos);
    }
}