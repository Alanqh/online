import { GameConfig } from "../../../config/GameConfig";
import { GhostInstanceConfig, IGhostInstanceElement } from "../../../config/GhostInstance";
import GhostBehavoirInst from "../ghost/GhostBehavoir";
import GhostInst from "../ghost/GhostInst";
import { GhostModuleS } from "../ghost/GhostModuleS";
import GhostBossCom from "./GhostBossCom";
import GhostBossInst, { BossInfo, GhostDmgInfo } from "./GhostBossInst";
import { GhostBossModuleS } from "./GhostBossModuleS";

export class BossLifeInfo {
    onlyid: number;
    /** 鬼的id */
    insId: number;
    /** 生成点 */
    spawnPoint: string;
    /** 消亡倒计时 */
    vanishTime: number;
    /** 是否已经生成 */
    isSpawned: boolean = false;
    /** 难度 */
    public diffcult: number = 0;

    cli_com: GhostBossCom;

    cli_cfg: IGhostInstanceElement;
}

export class GhostBossCtl {
    public ins: GhostBossInst;
    public curTargetId: number = 0;
    public curTimer: number = 0;
    public tautTimer: number = 0;
    public entryPids: number[] = [];
    public bindInfo: BossLifeInfo;
    public recoverTimer: number = 0;
    public com: GhostBossCom;

    public cacheLittles: GhostBehavoirInst[] = [];

    public isDied: boolean = false;

    private precheck(pid: number) {
        return this.entryPids.includes(pid);
    }

    async init(info: BossLifeInfo, com: GhostBossCom) {
        this.com = com;
        const ghostModuleS = ModuleService.getModule(GhostModuleS);
        if (!this.ins || this.ins.ghostChar.isDestroyed) {
            this.ins = await ghostModuleS.spawnGhost(GameConfig.GhostInstance.getElement(info.insId), 1, false) as GhostBossInst;
            this.ins.iseffectByForce = false;
            this.ins.onChangeHp.add(() => {
                let percent = this.ins.curHp / this.ins.bossInfo.maxHp
                percent = Math.max(0, percent);
                com.restHp = percent;
                if (this.ins.curHp <= 0) {
                    setTimeout(() => {
                        this.isDied = true;
                        this.destroy();
                        ModuleService.getModule(GhostBossModuleS).removeBoss(this.bindInfo);
                    }, 2000);
                }
            });
            this.ins.onFinishPatrol.add(() => {
                const rot = this.com.gameObject.worldTransform.rotation;;
                rot.z += 180;
                this.ins.ghostChar.worldTransform.rotation = rot;
            })
            this.ins.precheck = this.precheck.bind(this);
        }
        ghostModuleS.ghostMap.set(this.ins.id, this.ins);
        const diffcultCfg = GameConfig.GhostBossDifficult.getElement(info.diffcult);
        const insCfg = GameConfig.GhostInstance.getElement(info.insId);
        let playerCount = Player.getAllPlayers().length;
        let hprate = 1;
        let atkrate = 1;
        if (playerCount <= 1) {
            hprate = 0.75;
        }
        else if (playerCount >= 2 && playerCount <= 4) {
            hprate = 1;
        }
        else {
            hprate = 1.25;
        }

        console.log("生成的时候玩家人数为" + playerCount + `血量比${hprate}，攻击力比${atkrate}`);

        this.ins.diffcultCfg = diffcultCfg;
        let bossInfo = new BossInfo();
        bossInfo.atkRate = diffcultCfg.atk * atkrate;
        bossInfo.maxHp = Math.ceil(insCfg.hp * diffcultCfg.hp * hprate);
        bossInfo.playercount = playerCount;
        bossInfo.difficult = info.diffcult;
        bossInfo.insId = info.insId;
        bossInfo.sceneId = com.scene_id;
        this.ins.bossInfo = bossInfo;
        this.ins.lifeInfo = info;
        this.ins.ghostChar.complexMovementEnabled = true;
        await this.ins.server_initGhost(info.insId, null);
        this.ins.reset();
        this.ins._insCfg.patrols = [com.gameObject.worldTransform.position.add(Vector.up.multiply(50))];
        this.ins.ghostChar.worldTransform.position = com.gameObject.worldTransform.position.add(Vector.up.multiply(200));
        this.bindInfo = info;
        com.restHp = 1;
        return this;
    }


    public addValidPlayer(pid: number) {
        this.entryPids.push(pid);
        let info = this.ins.hateArr.find(e => { return e.pid == pid; })
        if (!info) {
            info = new GhostDmgInfo();
            info.dmg = 0;
            info.pid = pid;
            this.ins.hateArr.push(info);
        }
        info.hate = 1;
    }

    public removePlayer(pid: number) {
        const index = this.entryPids.indexOf(pid);
        if (index == -1) {
            return;
        }
        this.entryPids.splice(index, 1);
        if (this.entryPids.length == 0) {
            this.curTargetId = 0;
            this.ins.littles.forEach(e => {
                if (e.curHp <= 0) {
                    return;
                }
                e.takeDmg(99999, 0, 0)
            })
            this.ins.isInvicible = false;
            this.ins.littles.length = 0;
            this.ins._behavoirTree.interrupt();
            this.ins.server_exitChase();
        }
        let info = this.ins.hateArr.find(e => { return e.pid == pid; })
        if (info) {
            info.hate = 0;
        }
    }

    destroy() {
        this.ins.littles.forEach(e => {
            if (e.curHp <= 0) {
                return;
            }
            e.takeDmg(99999, 0, 0)
            // ModuleService.getModule(GhostModuleS).despawnGhost(e);
        })

        if (this.ins.curHp > 0) {
            this.ins.sortHateItems();
            this.ins.sendTrace(false)
            this.ins.hateArr.forEach(e => {
                const player = Player.getPlayer(e.pid)
                if (!player) {
                    return;
                }
                ModuleService.getModule(GhostBossModuleS).sendReward(player.playerId, [], [], false, 0);
            })
        }
        this.ins.hateArr.length = 0;
        this.curTargetId = 0;
        this.ins.littles.length = 0;
        this.ins.enable = false;
        this.ins.ghostChar.worldTransform.position = new Vector(0, 0, -1000)
        this.ins.ghostChar.complexMovementEnabled = false;
        this.entryPids.length = 0;
        this.ins.targetId = 0;
    }

    onUpdate(dt: number) {
        if (!this.ins) {
            return;
        }
        this.updateTarget(dt);
        this.updateHate(dt);
        this.updateTauntArr(dt);
    }

    updateTarget(dt: number) {
        if (this.curTargetId != this.ins.targetId) {
            this.ins.server_startChase(this.curTargetId);
            this.curTimer = 0;
        }
        if (this.entryPids.length == 0) {
            this.recoverTimer += dt
            if (this.recoverTimer > 1) {
                this.recoverTimer = 0;
                this.ins.recoverHp(Math.ceil(this.ins.bossInfo.maxHp * 0.05));
            }
        }
    }

    updateHate(dt: number) {
        if (this.entryPids.length <= 1) {
            this.curTimer = 0;
            return;
        }
        this.curTimer += dt;
        if (this.curTimer >= 20) {
            this.curTimer = 0;
            const cur = this.ins.hateArr.find(e => { return e.pid == this.curTargetId });
            cur.hate = cur.hate / 2;
        }
    }

    updateTauntArr(dt: number) {
        if (this.entryPids.length == 0) {
            return;
        }
        this.tautTimer += dt;
        if (this.tautTimer >= 1) {
            this.tautTimer = 0;
            this.ins.hateArr.sort((a, b) => {
                return b.hate - a.hate;
            })
            if (this.ins.hateArr[0].hate == 0) {
                this.curTargetId = 0;
                return;
            }
            this.curTargetId = this.ins.hateArr[0].pid;
            this.ins.tauntArr = this.ins.hateArr.map(e => { return e.pid; });
        }
    }
}
