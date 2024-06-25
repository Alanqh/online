/*
 * @Author       : dal
 * @Date         : 2024-01-25 16:28:44
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-04-26 18:02:00
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\items\CameraItem.ts
 * @Description  : 
 */

import { IItemElement } from "../../../../config/Item";
import { MainUI } from "../../../ui/MainUI";
import CameraPanel from "../ui/UICamera";
import { Item, registerItem } from "./Item";

@registerItem
export default class CameraItem extends Item {

    public static itemGo: GameObject;

    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
        if (!this.isOwner(ownerId)) { return; }
        CameraItem.itemGo = itemIns;
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        if (!this.isOwner(ownerId)) { return; }
        UIService.show(MainUI, false, true);
        UIService.hide(CameraPanel);
    }

    protected async onUse(element: IItemElement): Promise<boolean> {
        UIService.hide(MainUI);
        UIService.show(CameraPanel);
        CameraItem.itemGo.setVisibility(PropertyStatus.Off);
        return true;
    }
}