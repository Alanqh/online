/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-29 10:48:22
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-21 18:28:13
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\equip\items\InteractItem.ts
 * @Description  : 
 */

import { IItemElement } from "../../../../config/Item";
import { EquipModuleC } from "../EquipModuleC";
import { Item, registerItem } from "./Item";

@registerItem
export class InteractItem extends Item {
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
        if (ownerId != Player.localPlayer.playerId) return
        ModuleService.getModule(EquipModuleC).scanTarget()
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        ModuleService.getModule(EquipModuleC).stopScanTarget()
    }

    protected async onUse(element: IItemElement): Promise<boolean> {
        return ModuleService.getModule(EquipModuleC).reqUseInteractItem(element.id)
    }

}
