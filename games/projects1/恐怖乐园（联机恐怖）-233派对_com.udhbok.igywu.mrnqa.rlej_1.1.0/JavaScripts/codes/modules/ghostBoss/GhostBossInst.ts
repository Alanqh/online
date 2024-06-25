import { DifficultyConfig, IDifficultyElement } from "../../../config/Difficulty";
import { GameConfig } from "../../../config/GameConfig";
import { IGhostBossDifficultElement } from "../../../config/GhostBossDifficult";
import { IGhostDayElement } from "../../../config/GhostDay";
import { GamesStartDefines, EGameTheme } from "../../Defines";
import { NodeInfoFlyEntity } from "../../GamePlay/Framework/MeleeWeapon/AnmationInfo";
import Weapon from "../../GamePlay/Framework/MeleeWeapon/Weapon";
import { LoadMgr } from "../../GamePlay/Framework/Tools/LoadManager";
import GameStart from "../../GameStart";
import { BehaviorTreeManager } from "../../behavior3/BehaviorManager";
import { Behavior3Map } from "../../configB3/BehaviorMap";
import { GhostDmageUtil } from "../../utils/GhostDamageUtil";
import { ImpluseUpdater } from "../../utils/ImpuluseLimiter";
import { LanUtil } from "../../utils/LanUtil";
import { VectorUtils } from "../../utils/VectorUtils";
import { EBuffType } from "../buff/BuffDefine";
import { BuffModuleS } from "../buff/BuffModule";
import GhostBehavoirInst from "../ghost/GhostBehavoir";
import { GhostLogicState, GhostMoveState } from "../ghost/GhostDefine";
import { GhostModuleC } from "../ghost/GhostModuleC";
import { GhostModuleS } from "../ghost/GhostModuleS";
import { GhostPetAni } from "../ghost/com/GhostPetAnimator";
import { GhostNodeStat } from "../ghost/nodes/const/GhostNodeStat";
import MissionModuleS from "../mission/MissionModuleS";
import { PlayerModuleS } from "../player/PlayerModuleS";
import RecordData from "../record/RecordData";
import { BossLifeInfo } from "./GhostBossCtl";
import { GhostBossModuleC } from "./GhostBossModuleC";
import { GhostBossModuleS } from "./GhostBossModuleS";
import { BossConst } from "./const/BossConst";
import { BossInfoUI } from "./ui/BossInfoUI";

export class BossInfo {
    public difficult: number = 0;
    public maxHp: number = 300;
    public atkRate: number = 1;
    public playercount: number = 0;
    public insId: number = 0;
    public sceneId: number = 0;
}
export class GhostDmgInfo {
    public pid: number;
    public dmg: number;
    public hate: number;
}

@Component
export default class GhostBossInst extends GhostBehavoirInst {
    @Property({ replicated: true, onChanged: "onBossInfoChanged" })
    public bossInfo: BossInfo;

    @Property({ replicated: true, onChanged: "onTauntChanged" })
    public tauntArr: number[] = [];

    public hateArr: GhostDmgInfo[] = [];

    public onChangeHp: Action = new Action();

    public diffcultCfg: IGhostBossDifficultElement;

    public isInvicible: boolean = false;

    public littles: GhostBehavoirInst[] = [];

    private _effect: Effect;

    public minHpPercent: number = 1;

    public dmgTargets: number[] = [];

    public lifeInfo: BossLifeInfo;

    onBossInfoChanged() {
        UIService.getUI(BossInfoUI).updateHp(this.curHp, this.bossInfo.maxHp);
        const cfg = GameConfig.GhostBossDifficult.getElement(this.bossInfo.difficult);
        const instCfg = GameConfig.GhostInstance.getElement(this.bossInfo.insId);
        UIService.getUI(BossInfoUI).updateBossInfo(`${LanUtil.getText(instCfg.photoTag)}(${cfg.name})`);
        let char = this.gameObject as Character
        char.asyncReady().then(async () => {
            this._effect?.destroy();
            this._effect = null;
            if (!cfg.effect || cfg.effect == "") {
                return;
            }
            this._effect = await GameObject.asyncSpawn(cfg.effect);
            char.attachToSlot(this._effect, cfg.effectSlot);
            this._effect.localTransform.position = cfg.effectLoc;
            this._effect.localTransform.rotation = new Rotation(cfg.effectRot);
            this._effect.worldTransform.scale = Vector.one.multiply(cfg.effectScale);
            this._effect.setColor("Color_01", LinearColor.colorHexToLinearColor(`#${cfg.effectColor}`));
        })
    }


    async initCube() {
        const ghostModule = ModuleService.getModule(GhostModuleC);
        let bodyBox = await LoadMgr.asyncSpawn("197397");
        bodyBox.tag = "GhostBody";
        this.ghostChar.attachToSlot(bodyBox, HumanoidSlotType.Root);
        bodyBox.worldTransform.scale = new Vector(1.5, 1.5, 2.5);
        bodyBox.localTransform.position = new Vector(0, 0, 0);
        bodyBox.setCollision(CollisionStatus.QueryOnly);
        bodyBox.setVisibility(PropertyStatus.Off);
        ghostModule.regPart(bodyBox.gameObjectId, this.ghostChar.gameObjectId);
        this._cubeArr.push(bodyBox);

        let headSphere = await LoadMgr.asyncSpawn("197388");
        headSphere.tag = "GhostHead";
        headSphere["isBoss"] = true;
        this.ghostChar.attachToSlot(headSphere, HumanoidSlotType.Head);
        headSphere.localTransform.position = new Vector(0, 0, -10);
        headSphere.localTransform.scale = Vector.one.multiply(0.5);
        headSphere.setVisibility(PropertyStatus.Off);
        headSphere.setCollision(CollisionStatus.QueryOnly);

        this._cubeArr.push(headSphere);
        ghostModule.regPart(headSphere.gameObjectId, this.ghostChar.gameObjectId);
        ghostModule.regPart(this.ghostChar.gameObjectId, this.ghostChar.gameObjectId);
    }

    onTauntChanged() {
        if (!Player.localPlayer) {
            return;
        }
        UIService.getUI(BossInfoUI).updateHate(this.tauntArr.indexOf(Player.localPlayer.playerId));
    }

    public onCurHpChanged(path: string, newval: number, oldVal: number): void {
        super.onCurHpChanged(path, newval, oldVal);
        /** UIchanged */
        UIService.getUI(BossInfoUI).updateHp(this.curHp, this.bossInfo.maxHp);
    }

    public recoverHp(hp: number) {
        if (this.curHp <= 0) {
            return;
        }
        let curHp = this.curHp;
        curHp += hp;
        if (curHp > this.bossInfo.maxHp) {
            curHp = this.bossInfo.maxHp;
        }
        this.curHp = curHp;
        this.onChangeHp.call();
    }

    public precheck: (pid: number) => boolean;

    public takeDmg(dmg: number, targetId: number): void {
        if (targetId && !this.precheck(targetId)) {
            return;
        }
        if (this.isInvicible) {
            return;
        }
        if (this.curHp <= 0) {
            return;
        }
        this.curHp -= dmg;

        let hateItem = this.hateArr.find(e => {
            return e.pid == targetId;
        })
        if (!hateItem) {
            hateItem = new GhostDmgInfo();
            hateItem.pid = targetId;
            hateItem.dmg = 0;
            hateItem.hate = 0;
            this.hateArr.push(hateItem);
        }
        if (hateItem.dmg == 0) {
            ModuleService.getModule(GhostBossModuleS).sendFirstDmg(targetId, this.bossInfo);
        }
        hateItem.dmg += dmg;
        hateItem.hate += dmg;
        let percent = this.curHp / this.bossInfo.maxHp;
        this.minHpPercent = Math.min(percent, this.minHpPercent);
        this.minHpPercent = Math.max(0, this.minHpPercent);
        this.onChangeHp.call();
        if (this.curHp <= 0) {
            this.targetId = 0;
            this.relifeTimer = TimeUtil.elapsedTime() + this._insCfg.relifeTime || 10;
            this.enableTree = false;
            this.enableKill = false;
            // this.ghostChar.setVisibility(PropertyStatus.Off);
            this.meleeWeapon.stopPlay();
            this.playAni("dizAni", true);
            this.ghostChar.movementEnabled = false;
            Navigation.stopFollow(this.ghostChar);
            Navigation.stopNavigateTo(this.ghostChar);
            this.reset2Hang(false);
            this.ghostChar.collisionWithOtherCharacterEnabled = false;
            this.result();
        }
    }

    public sortHateItems() {
        this.hateArr = this.hateArr.filter(e => {
            return Player.getPlayer(e.pid) && e.dmg != 0;
        })
        this.hateArr.sort((a, b) => {
            return b.dmg - a.dmg;
        })
    }

    public sendTrace(issuc: boolean) {
        if (this.hateArr.length == 0) {
            return;
        }
        ModuleService.getModule(GhostBossModuleS).sendVectory(
            this.hateArr[0].pid,
            this.bossInfo,
            issuc,
            this.minHpPercent,
            this.hateArr.length,
            this.dmgTargets.length,
            BossConst.LIMIT_TIME - this.lifeInfo.vanishTime);
    }

    result() {
        const n = Math.max(3, this.bossInfo.playercount)
        const goldPercent = (this.bossInfo.maxHp / n);
        const yinpercent = (this.bossInfo.maxHp / (2 * n))
        this.sortHateItems();
        if (this.hateArr.length != 0) {
            ModuleService.getModule(GhostBossModuleS).sendTips(this.hateArr[0].pid, this._insCfg.photoTag);
            this.sendTrace(true);
        }
        this.hateArr.forEach(e => {
            const player = Player.getPlayer(e.pid);
            if (!player) {
                return;
            }
            if (e.dmg == 0) {
                return;
            }
            const buffModule = ModuleService.getModule(BuffModuleS);
            const dmg = e.dmg;
            let rate = 1 * this.diffcultCfg.rewardRate;
            let level = 1;
            if (dmg > goldPercent) {
                rate *= BossConst.PAIZIPRIZE[0];
                level = 3;
            }
            else if (dmg > yinpercent) {
                rate *= BossConst.PAIZIPRIZE[1];
                level = 2;
            }

            const dropCfg = GameConfig.DropItem.getElement(this._cfg.dropItemId);
            let dropIndexArr: number[] = [];
            dropCfg.dropPropability.forEach((v, i) => {
                if (v * rate > Math.random()) {
                    dropIndexArr.push(i);
                }
            });
            let dropItemIdArr: number[] = [];
            let dropItemCountArr: number[] = [];
            let dropItems: number[][] = [];
            dropIndexArr.forEach(v => {
                let id = dropCfg.dropItemId[v];
                let count = Math.ceil(MathUtil.randomInt(dropCfg.dropCount[v][0], dropCfg.dropCount[v][1] + 1) * rate);
                if (id == 10201) {
                    const buff = buffModule.getBuffByType(player, EBuffType.BossReward);
                    if (buff) {
                        count *= buff.value
                        count = Math.ceil(count);
                        buffModule.removeBuff(player, EBuffType.BossReward);
                    }
                }
                dropItemIdArr.push(id);
                dropItemCountArr.push(count);
                dropItems.push([id, count]);
            });
            try {
                ModuleService.getModule(MissionModuleS).getReward(dropItems, player);

                if (level == 3) {
                    buffModule.net_reqAddBuff(player.userId, 8, 1)
                }
                else if (level == 2) {
                    buffModule.net_reqAddBuff(player.userId, 9, 1)
                }

                if (this.diffcultCfg.difficult == 4) {
                    // 记录玩家击杀Boss
                    const recordData = DataCenterS.getData(player, RecordData);
                    recordData && recordData.saveKillBossTimes(this._cfg.id);
                }
            } catch (error) {
                console.error(error.stack)
            }
            ModuleService.getModule(GhostBossModuleS).sendReward(player.playerId, dropItemIdArr, dropItemCountArr, true, level);
        })
    }

    /**
     * 初始化鬼
     * @param cfgId 实例id
     */
    async server_initGhost(cfgId: number, dayCfg: IGhostDayElement) {
        this.ghostChar = this.gameObject as mw.Character;
        this.ghostChar.maxStepHeight = 70;
        this.ghostChar.walkableFloorAngle = 60;
        this.cfgId = cfgId;
        this._insCfg = GameConfig.GhostInstance.getElement(this.cfgId);
        console.log("生成了鬼" + this.cfgId);
        this._cfg = GameConfig.Ghost.getAllElement().find(e => {
            return e.ghostId == this._insCfg.ghostId;
        });
        this.bindDay = dayCfg ? dayCfg.id : -1;
        if (!dayCfg) {
            dayCfg = { id: -1, spd: 1, atk: 1, scale: 1, day: -1, markExLan: null, exLan: null, markExNightLan: null, exNightLan: null, exGhost: null, isRedMoon: false }
        }
        this.dayCfg = dayCfg;
        if (!this.dayCfg.scale) {
            this.dayCfg.scale = 1;
        }
        this.ghostChar.worldTransform.scale = Vector.one.multiply(this.dayCfg.scale);
        if (!Behavior3Map.has(this._insCfg["treeName"])) {
            console.error("GhostBehavoirError: don't have target tree:" + this._insCfg["treeName"]);
            return;
        }
        this._behavoirTree = BehaviorTreeManager.new(`ghost${this.id} `, Behavior3Map.get(this._insCfg["treeName"]), {
            character: this.ghostChar,
            inst: this
        });
        GameConfig.Ghost.getAllElement().filter(e => {
            return e.ghostId == this._insCfg.ghostId;
        }).forEach(e => {
            for (let index = 0; index < e.diffcult.length; index++) {
                const dif = e.diffcult[index];
                this.cfgMap.set(dif, e);
            }
        });
        console.log("鬼初始化完成");
        this._trigger.enabled = false;
        if (!this.meleeWeapon) {
            this.meleeWeapon = await Script.spawnScript(Weapon, true, this.ghostChar);
            this.meleeWeapon.initCharacter(this.ghostChar, null);
        }
        this.meleeWeapon.reWriteAnimationByParams(...this._insCfg.skills);
        if (this._cfg.attackMode <= 0) {
            this._trigger.enabled = false;
        }
        this._serverInited = true;
        this.useUpdate = true;

        this.ghostChar.capsuleCorrectionEnabled = false;
        this.ghostChar.collisionShape = CustomShapeType.VerticalCapsule;
        this.ghostChar.collisionExtent = new Vector(60, 60, 100);

        let dCfg = GameConfig.GhostGraphic.getAllElement().find(e => {
            return e.appearanceId == this._insCfg.appearanceId;
        })
        this.ghostChar.setDescription([dCfg.apprance]);
        this.ghostChar.syncDescription();

        this.reset2Hang();
    }

    public ser_attack(skillId: number, targetId: number = 0) {
        let cfg = GameConfig.GhostAttack.getElement(skillId);
        if (!cfg) {
            return;
        }
        Navigation.stopNavigateTo(this.ghostChar);
        this._behavoirTree.set_env(GhostNodeStat.PlayMelee, -1);
        this.skillCdMap.set(skillId, TimeUtil.elapsedTime() + cfg.cd);
        let skillIndex = this._insCfg.skills.indexOf(skillId);
        if (skillIndex == -1) {
            return;
        }
        cfg["exEffect"] && cfg["exEffect"].forEach(e => {
            const effectId = e[0];
            if (effectId == 3) {
                let startPos = this.ghostChar.worldTransform.position;
                let tempVec = Vector.zero
                new Tween({ t: 0 }).to({ t: 1 }, 200).onUpdate((t) => {
                    const curPos = Vector.lerp(startPos, this._insCfg.patrols[0], t.t, tempVec);
                    this.ghostChar.worldTransform.position = curPos;
                }).start();
            }
            if (effectId == 4) {
                this.spawnLittles();
            }
        })
        this.meleeWeapon.playAnimation(skillIndex, () => {
            this.moveProxy.resetFailCount();
            this._behavoirTree.set_env(GhostNodeStat.PlayMelee, 0);
            this._behavoirTree.set_env(GhostNodeStat.IsMoving, 0);
            cfg["exEffect"] && cfg["exEffect"].forEach(e => {
                const effectId = Number(e[0]);
                if (effectId == 1) {
                    this.takeDmg(this.curHp, 0)
                }
            })
        }, (params: string, maxIndex: number, hitobjs: GameObject[]) => {
            let dmg = Number(params);
            dmg = -dmg;
            dmg *= this._insCfg.dmg;
            dmg *= this.bossInfo.atkRate;
            dmg = Math.ceil(dmg);
            hitobjs.forEach(e => {
                if (e instanceof Character && e.player) {
                    const playermodule = ModuleService.getModule(PlayerModuleS);
                    //if kill special target
                    let charDmg = dmg//- this._insCfg.dmg * this.bossInfo.atkRate;
                    const dmgRate = GhostDmageUtil.getDamgeRate(this, e, cfg["exEffect"]);
                    charDmg = Math.ceil(charDmg * dmgRate);
                    playermodule.net_changeHp(e.player.userId, charDmg);
                    if (!this.dmgTargets.includes(e.player.playerId)) {
                        this.dmgTargets.push(e.player.playerId);
                    }
                    console.log("attackPlayer" + this.bindPlayerId)
                    if (playermodule.getHp(e.player.userId)) {
                        let dir = Vector.subtract(e.worldTransform.position, this.ghostChar.worldTransform.position).normalize();
                        let force = dir.toRotation().rotateVector(cfg.force);
                        ImpluseUpdater.instance.addImpluse(e, force.multiply(dmgRate));
                    }
                    else {
                        ModuleService.getModule(GhostModuleS).setPlayerCd(e.player);
                    };

                }
            })
        }, null, null, null, (info: NodeInfoFlyEntity) => {
            ModuleService.getModule(GhostModuleS).sendFlyItem(info, this.id, targetId, this._insCfg.dmg);
        });
    }

    reset() {
        this.curHp = this.bossInfo.maxHp;
        this.hateArr.length = 0;
        this.enable = true;
        this.enableTree = true;
        this.enableKill = true;
        this._behavoirTree?.interrupt();
        this.logicState == GhostLogicState.Casual ? this.setCasualConfigs() : this.setChaseConfigs();
        this.moveProxy.resetFailCount();
        this.hateArr.length = 0;
        this.minHpPercent = 1;
        this.dmgTargets = [];
    }

    /**
     * 画质变更
     * @param style 
     * @returns 
     */
    onStyleChanged(style: number) {
        if (!this.ghostChar.worldTransform) {
            return;
        }
        this.graphicCfg = GameConfig.GhostGraphic.getAllElement().find(e => {
            return e.appearanceId == this._insCfg.appearanceId;
        });
        if (!this.graphicCfg) {
            console.error("[GhostChar]没有配置的鬼的画质等级" + `style${style} :appearanceId${this._insCfg.appearanceId} `);
            this.ghostChar.setDescription(["0A44E7084716F2C8873756A9262E6D34"]);
            return;
        }
        if (!this._petAniCtl) {
            this._petAniCtl = new GhostPetAni(this.gameObject as Character);
        }
        this._petAniCtl.setAnimation(this.graphicCfg, false);

        console.log("画质换装" + this.graphicCfg.apprance)

        this.ghostChar.setVisibility(this.ghostChar.getVisibility(), false);
        this.ghostChar.asyncReady().then(() => {
            this._petAniCtl.stopAni();
        })
    }

    /**
     * 服务端开始追
     */
    @RemoteFunction(mw.Server)
    server_startChase(playerId: number) {
        if (!Player.getPlayer(playerId)) {
            return;
        }
        if (playerId == this.targetId) {
            return;
        }
        Navigation.stopNavigateTo(this.ghostChar);
        Navigation.stopFollow(this.ghostChar);
        console.log("鬼开始追", playerId);
        this.targetId = playerId;
        this.targetData.setData(Player.getPlayer(playerId), 0, this._cfg.ghostId);
        this._behavoirTree.set_env(GhostNodeStat.Chasing, -1);
        this._behavoirTree.set_env(GhostNodeStat.IsMoving, 0);
        this.setChaseConfigs();
        this.logicState = GhostLogicState.Chase;
        console.log("boss enter chase");
        if (this.moveState != GhostMoveState.Follow) {
            this.moveState = GhostMoveState.Follow;
            this.stopAni();
        }
    }

    async spawnLittles() {
        let cfgid = this.diffcultCfg.littles[0];
        let count = this.diffcultCfg.littles[1];
        const ghostmos = ModuleService.getModule(GhostModuleS);
        for (let index = 0; index < count; index++) {
            const cfg = GameConfig.GhostInstance.getElement(cfgid);
            const littleone = await ghostmos.spawnGhost(cfg) as GhostBehavoirInst;
            littleone.server_initGhost(cfg.id, null);
            littleone.reset(this._insCfg.patrols[0].clone().add(VectorUtils.getRandomVec2D(-500, 500)));
            littleone.ghostChar.worldTransform.position = this._insCfg.patrols[0].clone().add(VectorUtils.getRandomVec2D(-500, 500));
            ghostmos.ghostMap.set(littleone.id, littleone);
            littleone.server_startChase(this.targetId, 1);
            this.littles.push(littleone);
        }
        // this.isInvicible = true;
    }
}