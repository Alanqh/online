/*
 * @Author       : dal
 * @Date         : 2024-01-11 09:21:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-18 18:23:55
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\items\TransItem.ts
 * @Description  : 回血道具
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import { ITransItemElement } from "../../../../config/TransItem";
import { DialogUI } from "../../../ui/DialogUI";
import { LanUtil } from "../../../utils/LanUtil";
import MusicMgr from "../../../utils/MusicMgr";
import { ObjAniUtil } from "../../../utils/ObjAniUtil";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { ItemUseBox } from "../../bag/ui/ItemUseBox";
import BuffDefine from "../../buff/BuffDefine";
import { BuffModuleC } from "../../buff/BuffModule";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import { EquipDefine } from "../EquipDefine";
import { EquipModuleC } from "../EquipModuleC";
import { Item, registerItem } from "./Item";

enum ETransItemType {

    /** 改变生命值 */
    ChangeHp = 1,

    /** Buff */
    Buff = 2,
}

@registerItem
export class TransItem extends Item {

    private go: GameObject;

    /** 道具的配置 */
    private transCfg: ITransItemElement;

    public onHand(element: IItemElement, go: GameObject, ownerId: number): void {
        if (ownerId != Player.localPlayer.playerId) { return; }
        this.transCfg = GameConfig.TransItem.getElement(element.clazzParam[0]);
        this.go = go;
        this.prePos = this.go.localTransform.position.clone();
        this.preRot = this.go.localTransform.rotation.clone();
        this.toPos = this.transCfg.endPos;
        let tempRot = this.transCfg.endRot;
        this.toRot = new Rotation(tempRot.x, tempRot.y, tempRot.z);
        this.useTime = this.transCfg.useTime;
        this.isLockUse = false;
    }

    public onRemoveHand(element: IItemElement): void {

    }

    protected async onUse(element: IItemElement, useCount: number): Promise<boolean> {
        if (this.isLockUse) { return false; }

        if (Number.isNaN(useCount) || useCount <= 0) { return; }

        switch (this.transCfg.type) {
            case ETransItemType.ChangeHp:
                if (ModuleService.getModule(PlayerModuleC).isHealthy()) {
                    Tips.show(GameConfig.Language["medicineTips_01"].Value);
                    return false;
                } else if (ModuleService.getModule(PlayerModuleC).checkCanAddFullHp(Number(this.transCfg.dataEx[0]) * (useCount - 1))) {
                    Tips.show(LanUtil.getText("Code_073"));
                    return false;
                }
            case ETransItemType.Buff:
                if (useCount > 1) {
                    Tips.show(`${element.name}${LanUtil.getText("Code_074")}`);
                    return false;
                }
                break;
            default:
                break;
        }

        this.playUseAni(() => {
            if (this.go === null || !this.go.getVisibility()) { return; }
            switch (this.transCfg.type) {
                case ETransItemType.ChangeHp:
                    Tips.show(GameConfig.Language["medicineTips_02"].Value);
                    ModuleService.getModule(PlayerModuleC).changeHp(Number(this.transCfg.dataEx[0]) * useCount);
                    break;
                case ETransItemType.Buff:
                    this.buffOnUse(element, useCount);
                    break;
                default:
                    break;
            }
            EffectService.playOnGameObject(this.transCfg.useEff, Player.localPlayer.character, {
                slotType: HumanoidSlotType.Root
            });
            GhostTraceHelper.itemTrace(EquipDefine.curPlayerEquipItem.cfgId, 2);
        });
        EquipModuleC.waitTime = 1;
        return true;
    }

    private buffOnUse(element: IItemElement, useCount: number) {
        const buffCfg = GameConfig.Buff.getElement(element.clazzParam[0]);
        const module = ModuleService.getModule(BuffModuleC);

        if (buffCfg.isArchive) {
            module.addArchiveBuff(buffCfg.type);
            return true;
        } else {
            const checkConflict = module.checkValConflict(buffCfg.type, buffCfg.value);
            UIService.hide(ItemUseBox);
            if (checkConflict) {
                const curBuff = module.getBuff(buffCfg.type);
                UIService.getUI(DialogUI).show(StringUtil.format(LanUtil.getText("Code_072"), BuffDefine.getCfgByValueAndType(curBuff.value, curBuff.type).name), (res: boolean) => {
                    if (res) {
                        if (ModuleService.getModule(EquipModuleC).removeItem(Player.localPlayer.playerId, useCount)) {
                            module.reqAddBuff(buffCfg.id, useCount);
                            Tips.show(GameConfig.SubLanguage["bag_11"].Value);
                        }
                    }
                })
            } else {
                module.reqAddBuff(buffCfg.id, useCount);
            }
            return !checkConflict;
        }
    }

    private preRot = Rotation.zero;

    private prePos = Vector.zero;

    private toRot = Rotation.zero;

    private toPos = Vector.zero;

    private useTime = 100;

    private isLockUse: boolean = false;

    /** 播放使用动画 */
    public playUseAni(completeCall: Function) {
        if (this.isLockUse) { return; }
        this.isLockUse = true;
        MusicMgr.instance.play(this.transCfg.useSound, this.go);
        ObjAniUtil.playRotAni(this.go, this.toRot, this.useTime, () => {
            ObjAniUtil.playRotAni(this.go, this.preRot, this.useTime, () => {
                this.isLockUse = false;
                completeCall();
                return true;
            }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);

        ObjAniUtil.playPosAni(this.go, this.toPos, this.useTime, () => {
            ObjAniUtil.playPosAni(this.go, this.prePos, this.useTime, () => { }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);
    }
}
