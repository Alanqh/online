import { GameConfig } from "../../../config/GameConfig";
import { IGhostGraphElement } from "../../../config/GhostGraph";
import { IGhostInstanceElement } from "../../../config/GhostInstance";
import { Behavior3Map } from "../../configB3/BehaviorMap";
import { CommonUtils } from "../../utils/CommonUtils";
import GhostBehavoirInst from "../ghost/GhostBehavoir";
import GhostInst from "../ghost/GhostInst";
import { GhostModuleS } from "../ghost/GhostModuleS";
import { ActiveGhostModuleC } from "./ActiveGhostModuleC";

export class ActiveGhostTimeLine {
    public cfg: IGhostGraphElement;
    public timeArea: number[][] = [];
    public isActive: boolean = false;
    public ghostInsCfgs: IGhostInstanceElement[] = [];

    public instances: GhostBehavoirInst[] = [];
}

export class ActiveGhostModuleS extends ModuleS<ActiveGhostModuleC, null> {
    /** cur ghost instances */
    private _ghostLines: ActiveGhostTimeLine[] = [];

    private _lastRefreshTime: Date;

    private _cacheGhostIns: GhostBehavoirInst[] = [];

    protected onStart(): void {
        GameConfig.GhostGraph.getAllElement().forEach(async e => {
            if (e.activeTime) {

                const cfgs = GameConfig.GhostInstance.getAllElement().filter(cfg => {
                    return e.tag == cfg.photoTag;
                })
                console.log("鉴定为活动鬼，开始注册" + cfgs.map(e => e.id))
                if (!cfgs || cfgs.length == 0) {
                    console.log("活动鬼的数目不够注册，G" + e.tag)
                    return;
                }

                let line = new ActiveGhostTimeLine();
                if (e.activeTime[0][0] != -1) {
                    for (let index = 0; index < e.activeTime.length; index++) {
                        const element = e.activeTime[index];
                        line.timeArea.push([this.getTime(element[0] == 6 ? 0 : element[0] + 1, element[1]), this.getTime(element[2] == 6 ? 0 : element[2] + 1, element[3])]);
                    }
                }
                line.cfg = e;

                for (let i = 0; i < cfgs.length; i++) {
                    let cfg = cfgs[i];
                    if (cfg.treeName && Behavior3Map.has(cfg.treeName)) {
                        line.ghostInsCfgs.push(cfg);
                    }
                    else {
                        console.error("活动鬼没有配置行为树，不给予生成");
                    }
                }

                console.log("最终活动鬼有这些" + line.ghostInsCfgs.map(e => e.id));
                console.log("最终活动鬼的活动时间为" + line.timeArea.map(e => { return `${e[0]}~${e[1]}` }));

                this._ghostLines.push(line);
            }
        })
        setInterval(() => {
            this.intervalCheck();
        }, 1000)
    }

    protected getTime(day: number, hour: number) {
        const dayTime = day * 24 * 60 * 60 * 1000
        const hourTime = hour * 60 * 60 * 1000;
        return dayTime + hourTime;
    }

    protected intervalCheck(): void {
        const curTime = new Date(Date.now());
        if (this._lastRefreshTime && curTime.getHours() == this._lastRefreshTime.getHours() && curTime.getDay() == this._lastRefreshTime.getDay()) {
            return;
        }
        curTime.setHours(curTime.getHours(), 0, 0);
        this._lastRefreshTime = curTime;
        this.onCheckGhosts(curTime.getTime());
    }

    onCheckGhosts(time: number) {
        let weekFirst = new Date(time);
        weekFirst.setDate(weekFirst.getDate() - weekFirst.getDay());
        weekFirst.setHours(0, 0, 0, 0)
        const weekTime = weekFirst.getTime();
        const passTime = time - weekTime;
        console.log("当前活动鬼系统经过的时间为" + passTime)
        this._ghostLines.forEach(e => {
            let canActive = false;
            if (e.cfg.activeTime[0][0] == -1) {
                canActive = true;
            }
            else {
                e.timeArea.forEach(time => {
                    if (passTime >= time[0] && passTime <= time[1]) {
                        canActive = true;
                        console.log("这组鬼在活动刷新区间内" + e.cfg.id);
                        console.log("鬼的活动区间" + time[0] + "~" + time[1]);
                    }
                })
            }
            if (e.isActive != canActive) {
                e.isActive = canActive;
                if (canActive) {
                    e.ghostInsCfgs.forEach(async cfg => {
                        const ins = await this.getIns(cfg);
                        await ins.server_initGhost(cfg.id, null);
                        ins.reset(cfg.patrols[0]);
                        ins.ghostChar.gravityScale = 1;
                        ins.ghostChar.complexMovementEnabled = true;
                        ins.canEffectByPhoto = true;
                        e.instances.push(ins);
                    })
                }
                else {
                    e.instances.forEach(e => {
                        if (e.ghostChar.isDestroyed) {
                            return;
                        }
                        e.enable = false;
                        e.ghostChar.worldTransform.position = new Vector(0, 0, -10000);
                        e.ghostChar.gravityScale = 0;
                        e.ghostChar.complexMovementEnabled = false;
                        this._cacheGhostIns.push(e);
                    })
                    e.instances = [];
                }
            }
        })
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
            ghostModule.ghostMap.set(ins.id, ins);
        }
        return ins;
    }

    public net_onShotGhost(ghostGuid: string) {
        const ghostmoduleS = ModuleService.getModule(GhostModuleS);
        if (!ghostmoduleS.ghostMap.has(ghostGuid)) {
            return;
        }

        let ins = ghostmoduleS.ghostMap.get(ghostGuid) as GhostBehavoirInst;
        let targetId = this.currentPlayerId;
        this.onShotGhost(ins, targetId);
        console.log("shot on Ghost" + ins.id);
        // 给个碎片
        return this.getPiece(ins._insCfg);
    }

    private onShotGhost(ins: GhostBehavoirInst, targetId: number) {
        if (!ins.enableTree || !ins.enable) {
            return;
        }
        if (ins.curHp <= 0) {
            return;
        }
        if (!ins.canEffectByPhoto) {
            return;
        }
        let damage = 1;
        if (ins._insCfg["onlySelfKill"] && damage >= ins.curHp) {
            damage = ins.curHp - 1;
        }
        if (damage == 0) {
            return;
        }
        ins.takeDmg(damage, targetId, this.currentPlayerId);
    }

    /** 拍到鬼了给个碎片 */
    private getPiece(insCfg: IGhostInstanceElement) {
        if (!insCfg.providePieces) {
            return -1;
        }
        // 权重列表
        const weightArr = insCfg.providePieces.map(v => { return v[1] });
        // 索引
        const index = CommonUtils.weightRandom(weightArr);
        // 找到图录配置
        const graphCfg = GameConfig.GhostGraph.getAllElement().find(v => { return v.tag === insCfg.photoTag });
        // 找到碎片配置
        const pieceCfg = GameConfig.GhostFragment.getAllElement().find(v => { return v.ghostGraphId === graphCfg.id && v.fragmentCode === insCfg.providePieces[index][0] });
        // 返回碎片id
        return pieceCfg.id;
    }
}
