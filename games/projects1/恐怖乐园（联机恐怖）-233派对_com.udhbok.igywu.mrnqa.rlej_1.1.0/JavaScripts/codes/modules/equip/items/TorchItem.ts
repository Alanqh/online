/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-15 16:36:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-03-19 18:32:18
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\items\TorchItem.ts
 * @Description  : 
 */

import { IItemElement } from "../../../../config/Item";
import { Item, registerItem } from "./Item";

@registerItem
export class TorchItem extends Item {
    private _torchObj: mw.GameObject;
    public fireType: number = 1
    private _fire: mw.Effect;
    private _event: EventListener;
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
        if (!this.isOwner(ownerId)) return
        this._torchObj = itemIns
        this._fire = this._torchObj.getChildByName("火焰") as mw.Effect
        this._event = Event.addLocalListener("evt_changeItemState", this.changState.bind(this));
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        if (!this.isOwner(ownerId)) return
        this._fire.setVisibility(mw.PropertyStatus.Off)
        this._event?.disconnect()
        this.fireType = - 1;
    }

    protected async onUse(element: IItemElement, useCount?: number): Promise<boolean> {
        return true
    }

    /**改变火把状态 */
    changState(gameObjectId: string, name: string, param: string) {
        console.log("EEEEEEEEEEEEEEEEEEEEEEEEEE", name, param);
        if (!name || name != "TorchItem") return
        if (!this._torchObj) return;
        let state = Number(param)
        if (state == -1) {
            if (this.fireType == 2) return
            this._fire.setVisibility(mw.PropertyStatus.Off)
            this.fireType = -1
        } else {
            this.fireType = state
            let color = this.fireType == 1 ? new LinearColor(255, 114, 38) : new LinearColor(201, 0, 255)
            this._fire.setColor("Color", color);
            this._fire.setVisibility(mw.PropertyStatus.On)

        }
    }
}

