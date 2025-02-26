/*
 * @Author       : dal
 * @Date         : 2023-12-24 15:09:48
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-16 14:57:38
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\meleeweapon\MeleeWeaponC.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import Tips from "../../utils/Tips";
import { MeleeWeapon } from "./MeleeWeapon";
import MeleeWeaponModuleS from "./MeleeWeaponS";
import MeleeWeaponPanel from "./ui/MeleeWeaponPanel";

export default class MeleeWeaponModuleC extends ModuleC<MeleeWeaponModuleS, null> {

    /** 自己的武器 */
    public myWeapon: MeleeWeapon;

    /** 所有人的武器 */
    private weaponMap: Map<number, MeleeWeapon> = new Map();

    protected onAwake(): void {
        Player.asyncGetLocalPlayer().then((player) => {
            this.myWeapon = new MeleeWeapon();
            this.weaponMap.set(player.playerId, this.myWeapon);
        });
    }

    /**
     * 设置动画信息
     * @param prePos 
     * @param toPos 
     * @param preRot 
     * @param toRot 
     */
    public setAniInfo(prePos: Vector, toPos: Vector, preRot: Rotation, toRot: Rotation) {
        if (!this.myWeapon || !this.myWeapon["go"]) {
            Tips.show("目前仅支持冷兵器模拟");
            return;
        }
        this.myWeapon["prePos"] = prePos;
        this.myWeapon["toPos"] = toPos;
        this.myWeapon["preRot"] = preRot;
        this.myWeapon["toRot"] = toRot;
        Tips.show("模拟数据设置成功，点击攻击按钮进行模拟");
        this.reqAtk();
    }

    private get selfPanel() {
        return UIService.getUI(MeleeWeaponPanel);
    }

    public isOwner(ownerId: number) {
        return ownerId === this.localPlayerId;
    }

    public equip(element: IItemElement, weaponGo: GameObject, ownerId: number) {
        let script = this.weaponMap.get(ownerId);
        if (!script) { script = new MeleeWeapon(); this.weaponMap.set(ownerId, script); }
        if (this.isOwner(ownerId)) {
            UIService.show(MeleeWeaponPanel);
        }
        script.setWeaponInfo(ownerId, weaponGo, GameConfig.MeleeWeapon.getElement(element.clazzParam[0]));
    }

    public unEquip(ownerId: number) {
        if (!this.weaponMap.has(ownerId)) { return; }
        this.weaponMap.get(ownerId).clearWeaponInfo();
        if (this.isOwner(ownerId)) {
            UIService.hideUI(this.selfPanel);
        }
    }

    public reqAtk() {
        if (this.myWeapon.isLockUse) { return; }
        this.server.net_reqAtk(this.localPlayerId, this.myWeapon.curCombo);
    }

    public net_resAtk(ownerId: number, comboIndex: number) {
        if (!this.weaponMap.has(ownerId)) { return; }
        const weaponScript = this.weaponMap.get(ownerId);
        if (this.isOwner(ownerId)) {
            weaponScript.selfUse();
        } else {
            weaponScript.otherUse(comboIndex);
        }

    }

    protected onUpdate(dt: number): void {
        this.myWeapon.onUpdate(dt);
    }
}