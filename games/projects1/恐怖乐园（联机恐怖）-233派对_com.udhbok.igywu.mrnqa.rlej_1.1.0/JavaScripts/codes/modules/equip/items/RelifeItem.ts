import { IItemElement } from "../../../../config/Item";
import { registerItem, Item } from "./Item";

@registerItem
export class RelifeItem extends Item {
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
    }
    protected onRemoveHand(element: IItemElement, ownerId: number): void {
    }
    protected async onUse(element: IItemElement, useCount?: number): Promise<boolean> {
        return false;
    }
}
