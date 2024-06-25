/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-24 11:36:49
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-06-17 13:15:47
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\ghost\GhostModuleC.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { GhostGraphicConfig, IGhostGraphicElement } from "../../../config/GhostGraphic";
import { IGhostInstanceElement } from "../../../config/GhostInstance";
import KillUI_Generate from "../../../ui-generate/ShareUI/ghost/KillUI_generate";
import { CeHuaDefines } from "../../CehuaDefines";
import { GamesStartDefines } from "../../Defines";
import { NodeInfoFlyEntity } from "../../GamePlay/Framework/MeleeWeapon/AnmationInfo";
import { GhostFlyItemMgr } from "../../GamePlay/Framework/flyItem/FlyItem";
import GameStart, { EGameTheme } from "../../GameStart";
import { PlayerManagerExtension } from "../../Modified027Editor/ModifiedPlayer";
import { MainUI } from "../../ui/MainUI";
import SetUI from "../../ui/SetUI";
import MusicMgr from "../../utils/MusicMgr";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { BoardHelper } from "../blackboard/BoardDefine";
import HelpModuleC from "../help/HelpModuleC";
import { PlayerInterModuleC } from "../inter/PlayerInterModule";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import { Event_GameStateChange } from "../procedure/const/Events";
import { NotebookPanel } from "../procedure/ui/NotebookPanel";
import StoreModuleC from "../store/StoreModuleC";
import { GhostModuleS } from "./GhostModuleS";
import { GhostPatrol } from "./GhostPatrol";
import { KillUI } from "./ui/KillUI";
import { EHurtTextType, HitDamage } from "../hotweapon/ui/UIHitDamage";
import EquipScript from "../equip/EquipScript";
import { EquipModuleC } from "../equip/EquipModuleC";
import { EquipDefine } from "../equip/EquipDefine";

export class GhostModuleC extends ModuleC<GhostModuleS, null> {
    private _isKilling: boolean = false;

    private _targetPos: Character = null;

    private _dir: Vector;

    private _cfg: IGhostGraphicElement;

    private _isSetLoc: boolean = false;
    /** 鬼的伤害部位的图 */
    public partMap: Map<string, string> = new Map();

    public isinvinci: boolean = false;

    public isInsafe: boolean = false;

    private _bigPatrol: GhostPatrol[] = [];

    private _ghostScale: number = 1;

    /** 是否正在执行击杀 */
    public get isKilling() {
        return this._isKilling;
    }

    public regPart(partId: string, ghostId: string) {
        this.partMap.set(partId, ghostId);
    }

    protected onStart(): void {
        Event.addLocalListener("HitMonster", (attackerId: number, goid: string, dmg: number, tag: string, ani: string, force: Vector, hitPos?: Vector) => {
            console.log("hittarget" + goid);
            if (!this.partMap.has(goid)) {
                console.log("hittarget but not a part")
                return;
            }

            let ghostid = this.partMap.get(goid);
            this.server.net_damageGhost(attackerId, ghostid, dmg, ani, force, tag === "GhostHead", hitPos);
        });

        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            CeHuaDefines.GhostPatrolCfgs.forEach(e => {
                const p = new GhostPatrol();
                p.init(e);
                this._bigPatrol.push(p);
            })

            TimeUtil.onEnterFrame.add((dt: number) => {
                this._bigPatrol.forEach(e => e.onupdate(dt));
            })
            Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
                this.server.net_clearGhost();
            })
            Event.addLocalListener(BoardHelper.BoardLoadingEvt, async () => {
                let time = await this.server.net_syncPatrol();
                this._bigPatrol.forEach(e => e.start(time));
            })
            Event.addLocalListener("OnCGPlayer", (res: boolean) => {
                this.server.net_CGStatus(res);
            })
        }
    }

    public net_flyHitDamageUI(pos: Vector, damage: number, hurtType: EHurtTextType) {
        HitDamage.show(pos, damage, hurtType);
    }

    public killPlayer(uiDealy: number, offset: number, playAni: Animation, lookPos: Character, cfg: IGhostGraphicElement, dir: Vector, inscfg: IGhostInstanceElement, day: number) {
        if (this._isKilling || ModuleService.getModule(PlayerModuleC).isKilling) {
            return;
        }
        ModuleService.getModule(StoreModuleC).closeStore()
        this._cfg = cfg;
        this._dir = dir;
        this._targetPos = lookPos
        this._isSetLoc = true;
        ModuleService.getModule(PlayerInterModuleC).reqStopInter(false);
        this._isKilling = true;
        let isGirl = (Player.localPlayer.character.description.advance.base.characterSetting.somatotype) % 2 == 0;
        this.localPlayer.character.movementEnabled = false;
        this.hideAllUI();
        setTimeout(() => {
            playAni?.play();
            UIService.show(KillUI);
            console.log("显示了碎片UI");
            MusicMgr.instance.play(104);
            MusicMgr.instance.play(isGirl ? 102 : 103);
            this._isSetLoc = false;
            setTimeout(() => {
                playAni.pause();
            }, offset * 1000);
        }, uiDealy * 1000);
        if (GameStart.isOpenHelp) {
            setTimeout(() => {
                this.set2Helper(playAni);
            }, (uiDealy + offset) * 1000);
        }
        else if (!inscfg["dmg"] && !day) {
            ModuleService.getModule(PlayerModuleC).killPlayer(offset + 2, () => {
                this._isKilling = false;
                playAni.stop();
            });
        }
        else {
            let dayCfg = day == -1 ? null : GameConfig.GhostDay.getElement(day);
            let dmg = -inscfg["dmg"];
            if (dayCfg) {
                dmg *= dayCfg.atk;
            }
            if (inscfg["dmg"] == -1) {
                dmg = 0;
            }
            this._ghostScale = (dayCfg && dayCfg.scale) ? dayCfg.scale : 1;
            Player.localPlayer.character.movementEnabled = false;
            dmg && setTimeout(() => {
                ModuleService.getModule(PlayerModuleC).changeHp(Math.ceil(dmg));
            }, uiDealy * 1000);
            setTimeout(() => {

                setTimeout(() => {
                    UIService.hide(KillUI);
                    Player.localPlayer.character.movementEnabled = true;
                    playAni.stop();
                    UIService.show(MainUI);
                    this._isKilling = false;
                }, (inscfg["stayTime"] || 0) * 1000);
            }, (uiDealy + offset) * 1000);
        }
    }

    private hideAllUI() {
        UIService.hide(MainUI);
        UIService.hide(SetUI);
        UIService.hide(NotebookPanel);
    }


    private set2Helper(playAni: Animation) {
        UIService.hide(KillUI);
        ModuleService.getModule(HelpModuleC).reqNeedHelp(() => {
            playAni.stop();
            UIService.show(MainUI);
            setTimeout(() => {
                this._isKilling = false;
            }, 4000);
        }, () => {
            this.server.net_setCd(4);
            ModuleService.getModule(PlayerModuleC).killPlayer(0, null);
            playAni.stop();
            setTimeout(() => {
                this._isKilling = false;
            }, 4000);
        })
    }

    public playKillAni() {
        if (this._isKilling) {
            return;
        }
        const char = this.localPlayer.character;
        let ani = PlayerManagerExtension.loadAnimationExtesion(char, "52998", true)
        ani.play();
        this._isKilling = true;
        let isGirl = (Player.localPlayer.character.description.advance.base.characterSetting.somatotype) % 2 == 0;
        UIService.show(KillUI);
        console.log("显示了碎片UI");
        MusicMgr.instance.play(104);
        MusicMgr.instance.play(isGirl ? 102 : 103);
        char.movementEnabled = false;
        this.hideAllUI();
        setTimeout(() => {
            ani.pause();
            setTimeout(() => {
                ani.stop();
                UIService.hide(KillUI);
                this._isKilling = false;
                char.movementEnabled = true;
            }, 2000);
        }, 1000);
    }

    protected onUpdate(dt: number): void {
        if (this._isSetLoc) {
            Camera.currentCamera.lookAt(this._targetPos.getSlotWorldPosition(HumanoidSlotType.Head));
            let rot = this._dir.toRotation();
            let offsetPos = rot.rotateVector(this._cfg.offset);
            offsetPos.multiply(this._ghostScale);
            let newPos = this._targetPos.worldTransform.position.add(offsetPos);
            let rootPosZ = Player.localPlayer.character.worldTransform.position.z;
            newPos.z = rootPosZ;
            Player.localPlayer.character.worldTransform.position = newPos;
        }
    }

    protectedPlayer(isprote: boolean) {
        this.isinvinci = isprote;
        this.server.net_protectedPlayer(isprote);
    }

    public async net_spawnPatrol(guid: string, pos: Vector[]) {
        for (let index = 0; index < pos.length; index++) {
            const element = pos[index].add(Vector.up.multiply(100));
            let effect = await GameObject.asyncSpawn(guid) as Effect;
            effect.play();
            effect.worldTransform.position = element;
            effect.onFinish.add(() => {
                effect.destroy();
            })
        }
    }

    public async net_spawnBigPatrol(time: number) {
        this._bigPatrol.forEach(e => e.start(time));
    }

    public net_sendFlyItem(spd: number, guid: string, id: string, playerid: number, dmg: number) {
        const ghost = GameObject.findGameObjectById(id) as Character;
        if (!ghost) {
            return;
        }
        GhostFlyItemMgr.instance.sendItem(guid, spd, [], ghost, playerid, dmg);
    }

    canKill(player: mw.Player, state: boolean = false) {
        return this.server.net_checkCanKill(player.playerId, state)
    }

    /**检查能不能被打 在安全区不能被打 已经死亡不能被打 */
    canBeAttack(player: mw.Player) {
        return this.server.net_checkCanBeAttack(player.playerId)
    }

    public setSafe(isSafe: boolean) {
        this.isInsafe = isSafe;
        this.server.net_setSafe(isSafe);
    }

    public net_traceDmg(cfgid: number, isdead: boolean, enterNum: number) {
        if (isdead) {
            GhostTraceHelper.uploadMGS("ts_game_over", "玩家对某个鬼怪造成伤害时上发", {
                round_id: 1001005,
                scene_id: cfgid,
                dead: isdead ? 1 : 0,
                win_num: enterNum,
                door_broken: EquipDefine.curPlayerEquipItem?.cfgId
            })
        }
        else {
            GhostTraceHelper.uploadMGS("ts_game_over", "玩家对某个鬼怪造成伤害时上发", {
                round_id: 1001005,
                scene_id: cfgid,
                dead: isdead ? 1 : 0,
                door_broken: EquipDefine.curPlayerEquipItem?.cfgId
            })
        }
    }
}