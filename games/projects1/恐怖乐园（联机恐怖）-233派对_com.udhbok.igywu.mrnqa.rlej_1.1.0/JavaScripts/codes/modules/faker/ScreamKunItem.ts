/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-22 19:27:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-28 18:54:01
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\faker\ScreamKunItem.ts
 * @Description  : 
 */

import { IItemElement } from "../../../config/Item";
import { GlobalDefine } from "../../../DefNoSubModule";
import { GameDefines } from "../../CehuaDefines";
import GameStart, { EGameTheme } from "../../GameStart";
import { MainUI } from "../../ui/MainUI";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { EquipModuleC } from "../equip/EquipModuleC";
import { Item, registerItem } from "../equip/items/Item";
import CameraPanel from "../equip/ui/UICamera";
import AimScript from "./AimScript";
import FakerScript from "./FakerScript";


@registerItem
export default class ScreamKunItem extends Item {

    /**瞄准态特效对象 */
    private aimObj: mw.GameObject;

    /**手持物对象 */
    private handObj: mw.GameObject;

    private using: boolean = false;

    private tween: Tween<{}>;


    protected async onHand(element: IItemElement, itemIns: GameObject, ownerId: number): Promise<void> {
        if (ownerId != Player.localPlayer.playerId) return;
        this.handObj = itemIns;
        this.aimObj = await mw.GameObject.asyncSpawn("70E413B64395750AB184A2B5C664EAC3");
    }
    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        if (GameStart.GameTheme == EGameTheme.Hall && !UIService.getUI(CameraPanel).visible) ModuleService.getModule(EquipModuleC).resetCamera()
        if (!this.aimObj.isDestroyed) this.aimObj.destroy()
        this.tween?.stop()
        if (this.using) ModuleService.getModule(EquipModuleC).useItemImmediately(ownerId, 1)
        this.tween = null;
        this.using = false;
    }

    protected async onUse(element: IItemElement, useCount?: number) {
        if (this.using) return false
        if (!this.aimObj) return false
        let script = this.aimObj.getComponent(AimScript);
        if (!script) return false;
        if (!script.curTarget) {
            Tips.show(LanUtil.getText("UI_item_Chicken05"))
            return false;//没有扫描到目标
        }
        if (script.curTarget.tag == "Faker") {//扫描到伪人
            let fakerScript = script.curTarget.getComponent(FakerScript);
            if (fakerScript.isBeCleaning) {
                Tips.show(LanUtil.getText("UI_item_Chicken03"))
                return false;
            }
        }
        this.using = true
        this.playAni(script.curTarget);
        EquipModuleC.waitTime = 6;
        return true
    }

    async playAni(target: Character) {
        let pointEffect = this.handObj.getChildByName("光束") as Effect;
        SoundService.playSound("114053");
        pointEffect.setVisibility(mw.PropertyStatus.On);
        let oriRotation = new Rotation(-100, 0, 0)
        this.handObj.worldTransform.rotation = this.handObj.worldTransform.rotation.add(new Rotation(0, 0, 90))
        this.tween = new Tween({ ro: oriRotation })
            .to({ ro: new Rotation(-45, 0, 0) }, 2000)
            .onUpdate((val) => {
                pointEffect.localTransform.rotation = val.ro;
            })
            .yoyo(true)
            .repeat(Infinity)
        this.tween.start()
        await TimeUtil.delaySecond(3)
        if (target.player) {//扫描到玩家
            SoundService.playSound("207951");
            pointEffect?.setColor("Color", LinearColor.green)
            Tips.show(LanUtil.getText("UI_item_Chicken01"))
        } else if (target.tag == "Faker") {//扫描到伪人
            let fakerScript = target.getComponent(FakerScript);
            SoundService.playSound("207951");
            SoundService.playSound("199782");
            pointEffect?.setColor("Color", LinearColor.red)
            Tips.show(LanUtil.getText("UI_item_Chicken02"))
            let pos = pointEffect ? pointEffect.worldTransform.position : this.handObj.worldTransform.position;
            fakerScript.beCleaning(pos);//攻击伪人
        }
        await TimeUtil.delaySecond(2)
        pointEffect?.setColor("Color", LinearColor.blue);
        pointEffect?.setVisibility(mw.PropertyStatus.Off, true);
        this.tween.stop();
        pointEffect.localTransform.rotation = oriRotation;
        this.handObj.worldTransform.rotation = this.handObj.worldTransform.rotation.add(new Rotation(0, 0, -90))
        this.using = false
        return true
    }


}