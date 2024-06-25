/*
 * @Author       : dal
 * @Date         : 2023-12-24 13:11:04
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-07 11:18:44
 * @FilePath     : \1005_town\JavaScripts\codes\modules\meleeweapon\MeleeWeapon.ts
 * @Description  : 
 */

import { IItemElement } from "../../../config/Item";
import { IMeleeWeaponElement } from "../../../config/MeleeWeapon";
import { EffectMgrIns } from "../../utils/EffectMgr";
import MusicMgr from "../../utils/MusicMgr";
import { ObjAniUtil } from "../../utils/ObjAniUtil";
import Tips from "../../utils/Tips";
import { EquipModuleC } from "../equip/EquipModuleC";
import { Item, registerItem } from "../equip/items/Item";
import { WeaponProperty, WeaponPropertyService } from "../equip/util/WeaponPropertyIns";
import { EHurtTextType, HitDamage } from "../hotweapon/ui/UIHitDamage";
import { RouteDefine } from "../route/RouteDefine";
import { RouteModuleC } from "../route/RouteModule";
import MeleeWeaponModuleC from "./MeleeWeaponC";

@registerItem
export class MeleeWeaponItem extends Item {

    private get selfModule() {
        return ModuleService.getModule(MeleeWeaponModuleC);
    }

    protected onHand(element: IItemElement, itemIns: GameObject, ownerId: number): void {
        this.selfModule.equip(element, itemIns, ownerId);
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        this.selfModule.unEquip(ownerId);
    }

    protected async onUse(element: IItemElement): Promise<boolean> {
        return true;
    }
}

/** 客户端 */
export class MeleeWeapon {

    /** 武器实例 */
    private go: GameObject;

    /** 自己 */
    private selfCha: Character;

    /** 主人 */
    private owner: Character;

    /** 武器配置 */
    public weaponCfg: IMeleeWeaponElement;

    /** 主人的姿态 */
    public ownerStance: SubStance;

    private get isOwner() {
        return this.selfCha === this.owner;
    }

    private property: WeaponProperty;

    /** 设置武器信息 */
    public async setWeaponInfo(ownerId: number, go: GameObject, weaponCfg: IMeleeWeaponElement) {
        this.resetInfo();
        this.go = go;
        this.weaponCfg = weaponCfg;
        this.selfCha = Player.localPlayer.character;
        const player = await Player.asyncGetPlayer(ownerId)
        if (!player) { ModuleService.getModule(EquipModuleC).equip(null); console.error("武器装备失败！"); return; }
        this.owner = player.character;
        if (!this.owner) { ModuleService.getModule(EquipModuleC).equip(null); console.error("武器装备失败！"); return; }


        if (this.isOwner) {
            const routeData = await ModuleService.getModule(RouteModuleC).reqHallRouteData(this.owner.player.userId);
            const level = RouteDefine.getItemLevel(this.weaponCfg["itemLevelId"], routeData);
            this.property = WeaponPropertyService.getProperty(this.weaponCfg.id, level, 2);
            this.bind();
        } else {
            let stance = this.owner.loadSubStance(this.weaponCfg.otherStance);
            stance.blendMode = StanceBlendMode.BlendUpper;
            stance.play();
            this.ownerStance = stance;
        }
    }

    /** 清楚武器信息 */
    public clearWeaponInfo() {
        if (this.ownerStance) { this.ownerStance.stop(); }
        this.resetInfo();
    }

    private resetInfo() {
        this.isLockUse = false;
        this._flyDirIndex = null;
        this.weaponCfg = null;
    }

    /** 绑定触发器,只有主人才会执行 */
    public bind() {
        this.comboTime = 0;
        this.curCombo = 0;
        this.shiftAtkInfo(0);
        this.maxCombo = this.weaponCfg.selfAtkToPos.length - 1;
        this.prePos = this.go.localTransform.position.clone();
        this.preRot = this.go.localTransform.rotation.clone();
        for (let trigger of this.go.getChildren()) {
            if (trigger instanceof Trigger) {
                this.damageTrigger = trigger;
                trigger.onEnter.clear();
                trigger.enabled = false;
                trigger.onEnter.add(this.hurtEvent.bind(this));
            }
        }
    }

    /** 力的方向轴系数 */
    private _flyDirIndex: Vector;

    public get flyDirIndex() {
        if (!this._flyDirIndex) { this._flyDirIndex = new Vector(0, 0, this.weaponCfg.dirZIndex); }
        return this._flyDirIndex;
    }

    /** 伤害事件 */
    private hurtEvent(obj: GameObject) {
        if (obj instanceof Character) { return; }
        if (obj.tag && obj.tag.includes("Ghost")) {
            // TODO: 对怪物造成伤害
            // 真正造成伤害的权威端
            if (this.isOwner) {
                console.log("打到鬼了");
                // 计算子弹的力会包含方向
                let force = Player.localPlayer.character.worldTransform.getForwardVector().add(this.flyDirIndex).normalized.multiply(this.weaponCfg.force);

                // 第几段的伤害
                let dmg = this.property.dmg * this.weaponCfg.hurtRate[this.curCombo];

                // 爆头伤害
                if (obj.tag.includes("Head")) {
                    dmg *= this.property.shotHead;
                    dmg = Math.floor(dmg);
                }

                // 给自己一个伤害飘字
                HitDamage.show(obj.worldTransform.position.clone().add(this.hitPosOffset.clone()), dmg, obj.tag == "GhostHead" ? EHurtTextType.HeadShot : EHurtTextType.Normal);
                Event.dispatchToLocal("HitMonster", this.owner.player.playerId, obj.gameObjectId, dmg, obj.tag, "meleeHit", force);
            }
            this.damageTrigger.enabled = false;

            // // 播个击中特效
            // const hitPos = this.damageTrigger.worldTransform.position;
            // const effRot = this.getImpactPoint(hitPos).toRotation().add(this.hitEffRotOff);
            // EffectMgrIns.playEff("86367", hitPos, {
            //     recycleTime: 1,
            //     rot: effRot,
            //     scale: this.hitGhostEffScale,
            //     color: LinearColor.colorHexToLinearColor("00B05AFF"),
            // });

            MusicMgr.instance.play(this.weaponCfg.HitSound, this.go);
        }
    }


    private readonly hitPosOffset: Vector = new Vector(0, 0, 50);

    /** 获取打击点法线 */
    private getImpactPoint(endPos: Vector): Vector {
        if (!this.owner) { return Vector.zero; }
        let startPos = this.owner.worldTransform.position;
        // 延长一些
        let rotVec = endPos.clone().subtract(startPos).normalized.multiply(1e3);
        endPos = endPos.add(rotVec);
        let hitRes = QueryUtil.lineTrace(startPos, endPos, true);
        for (const res of hitRes) {
            if (res.gameObject && res.gameObject != this.owner && !(res.gameObject instanceof Trigger)) {
                return res.impactNormal;
            }
        }
        return Vector.zero;
    }

    /** 打中鬼的特效缩放 */
    private readonly hitGhostEffScale: Vector = new Vector(0.5, 0.5, 0.5);

    /** 偏移 */
    private readonly hitEffRotOff: Rotation = new Rotation(0, -90, 0);

    private damageTrigger: Trigger;

    /** 切换攻击信息 */
    public shiftAtkInfo(comboIndex: number) {
        if (comboIndex > this.maxCombo) { this.shiftAtkInfo(0); return; }
        this.toPos = this.weaponCfg.selfAtkToPos[comboIndex];
        let tempRot = this.weaponCfg.selfAtkToRot[comboIndex];
        this.toRot = new Rotation(tempRot.x, tempRot.y, tempRot.z);
        this.atkTime = this.property.spd;
        this.curCombo = comboIndex;
    }

    /** 最大连击索引 */
    private maxCombo: number = 2;

    /** 当前连击索引 */
    public curCombo: number = 0;

    private preRot = Rotation.zero;

    private prePos = Vector.zero;

    private toRot = Rotation.zero;

    private toPos = Vector.zero;

    /** 各段动作攻击时间 */
    private atkTime = 2e2;

    /** 是否锁定使用 */
    public isLockUse: boolean = false;

    /** 在连击中吗 */
    private isCombo: boolean = false;

    /** 自己视野中的使用武器 */
    public selfUse() {
        if (!this.weaponCfg) {
            console.error("武器配置缺失")
            return;
        }
        if (this.isLockUse) { return; }
        this.isLockUse = true;
        MusicMgr.instance.play(this.weaponCfg.attackSound, this.go);
        this.damageTrigger.enabled = true;
        ObjAniUtil.playRotAni(this.go, this.toRot, this.atkTime, () => {
            this.comboJudge();
            ObjAniUtil.playRotAni(this.go, this.preRot, this.atkTime, () => {
                if (this.damageTrigger && this.damageTrigger.enabled) {
                    this.damageTrigger.enabled = false;
                }
                this.isLockUse = false;
            }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);

        ObjAniUtil.playPosAni(this.go, this.toPos, this.atkTime, () => {
            ObjAniUtil.playPosAni(this.go, this.prePos, this.atkTime, () => { }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);
    }

    public comboJudge() {
        if (!this.isCombo && this.curCombo < this.maxCombo) {
            this.isCombo = true;
            this.comboTime = this.atkTime / 1e3;
            this.shiftAtkInfo(this.curCombo + 1);
            this.isLockUse = false;
        } else {
            this.isCombo = false;
        }
    }

    /** 别人眼中的使用武器 */
    public otherUse(comboIndex: number) {
        if (!this.owner || !this.owner.worldTransform || !this.weaponCfg) {
            return;
        }
        let otherAni = this.owner.loadAnimation(this.weaponCfg.otherAtkAni[comboIndex]);
        // TODO otherAni.length这玩意儿获取是0,有毒
        // otherAni.speed = (otherAni.length * 1e3) / this.weaponCfg.selfAtkTime[comboIndex];
        otherAni.slot = AnimSlot.Upper;
        otherAni.play();
        setTimeout(() => {
            // otherAni.stop();
            this.ownerStance.play();
        }, this.property.spd);
    }

    /** 连击时间 */
    private comboTime: number = 0;

    public onUpdate(dt) {
        if (this.isCombo && this.comboTime > 0) {
            this.comboTime -= dt;
            if (this.comboTime <= 0) {
                this.comboTime = 0;
                this.shiftAtkInfo(0);
            }
        }
    }
}