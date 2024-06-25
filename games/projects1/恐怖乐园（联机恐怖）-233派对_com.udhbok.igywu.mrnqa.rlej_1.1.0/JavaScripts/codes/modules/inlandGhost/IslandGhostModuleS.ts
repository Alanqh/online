import { GameConfig } from "../../../config/GameConfig";
import { IGhostInstanceElement } from "../../../config/GhostInstance";
import { Behavior3Map } from "../../configB3/BehaviorMap";
import GhostBehavoirInst from "../ghost/GhostBehavoir";
import { GhostModuleS } from "../ghost/GhostModuleS";
import TimeModuleS from "../time/TimeModuleS";
import IslandGhostConfig from "./IslandGhostConfig";
import { IslandGhostModuleC } from "./IslandGhostModuleC";

export class IslandGhostModuleS extends ModuleS<IslandGhostModuleC, null> {
    private _cacheGhostIns: GhostBehavoirInst[] = [];

    private timeGhosts: GhostBehavoirInst[] = [];

    private isInited: boolean = false;

    private recycleAllGhosts() {
        this.timeGhosts.forEach(e => {
            if (e.ghostChar.isDestroyed) {
                return;
            }
            e.enable = false;
            e.ghostChar.worldTransform.position = new Vector(0, 0, -10000);
            e.ghostChar.gravityScale = 0;
            e.ghostChar.complexMovementEnabled = false;
            this._cacheGhostIns.push(e);
        })
        this.timeGhosts.length = 0;
    }

    private async spawnTimeGhosts(ids: number[]) {
        for (let index = 0; index < ids.length; index++) {
            const cfg = GameConfig.GhostInstance.getElement(ids[index]);
            if (!cfg) {
                continue;
            }
            const ins = await this.getIns(cfg);
            await ins.server_initGhost(cfg.id, null);
            ins.reset(cfg.patrols[MathUtil.randomInt(0, cfg.patrols.length)].clone().add(Vector.up.multiply(100)));
            ins.ghostChar.gravityScale = 1;
            ins.ghostChar.complexMovementEnabled = true;
            ins.canEffectByPhoto = true;
            this.timeGhosts.push(ins);
        }
    }

    private async getIns(cfg: IGhostInstanceElement) {
        const ghostModule = ModuleService.getModule(GhostModuleS);
        let ins: GhostBehavoirInst;
        if (this._cacheGhostIns.length != 0) {
            let index = this._cacheGhostIns.findIndex(e => {
                return !e.ghostChar.isDestroyed;
            });
            if (index != -1) {
                ins = this._cacheGhostIns[index];
                this._cacheGhostIns.splice(index, 1)
            }
        }
        if (!ins) {
            ins = await ghostModule.spawnGhost(cfg, 0, false) as GhostBehavoirInst;
            let refreshPos = () => {
                const rdPos = ins._insCfg.patrols[MathUtil.randomInt(0, ins._insCfg.patrols.length)].clone().add(Vector.up.multiply(100))
                ins.ghostChar.worldTransform.position = rdPos;
            }
            ins.onRelife.add(refreshPos)
            ghostModule.ghostMap.set(ins.id, ins);
        }
        return ins;
    }

    protected onPlayerEnterGame(): void {
        if (!IslandGhostConfig.instance) {
            return;
        }
        if (this.isInited) {
            return;
        }
        const timeModule = ModuleService.getModule(TimeModuleS);
        timeModule.nightAction.add(() => {
            this.recycleAllGhosts();
            this.spawnTimeGhosts(IslandGhostConfig.instance.nightGhosts);
        })
        timeModule.dayAction.add(() => {
            this.recycleAllGhosts();
            this.spawnTimeGhosts(IslandGhostConfig.instance.dayGhosts);
        })
        this.isInited = true;
        this.spawnGhosts();
        this.spawnTimeGhosts(IslandGhostConfig.instance.dayGhosts);
    }

    async spawnGhosts() {
        const alwaysGhosts = IslandGhostConfig.instance.alwaysGhots;
        const ghostmodule = ModuleService.getModule(GhostModuleS);
        for (let i = 0; i < alwaysGhosts.length; i++) {
            let eleId = alwaysGhosts[i];
            let insCfg = GameConfig.GhostInstance.getElement(eleId);
            if (!insCfg) {
                continue;
            }
            if (insCfg.treeName && Behavior3Map.has(insCfg.treeName)) {
                const ins = await ghostmodule.spawnGhost(insCfg, 0, false) as GhostBehavoirInst;
                ins.server_initGhost(eleId, null);
                let refreshPos = () => {
                    const rdPos = ins._insCfg.patrols[MathUtil.randomInt(0, ins._insCfg.patrols.length)].clone().add(Vector.up.multiply(100))
                    ins.ghostChar.worldTransform.position = rdPos;
                }
                refreshPos();
                ins.onRelife.add(refreshPos)
                ghostmodule.ghostMap.set(ins.id, ins);
            }
        }
    }
}