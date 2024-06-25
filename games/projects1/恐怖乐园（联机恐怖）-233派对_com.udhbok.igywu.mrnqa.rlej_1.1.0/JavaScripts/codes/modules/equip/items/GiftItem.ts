/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-28 14:46:08
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-25 19:35:18
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\items\GiftItem.ts
 * @Description  : 
 */

import { IItemElement } from "../../../../config/Item";
import StoreModuleC from "../../store/StoreModuleC";
import { Item, registerItem } from "./Item";

@registerItem
export class GiftItem extends Item {
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
    }
    protected onRemoveHand(element: IItemElement, ownerId: number): void {
    }
    protected async onUse(element: IItemElement): Promise<boolean> {
        ModuleService.getModule(StoreModuleC).reqOpenGiftPack(element.id, 1)
        return true
    }

}