import { IItemElement } from "../../../../config/Item";
import { registerItem, Item } from "./Item";

@registerItem
export class CueCard extends Item {
    protected onHand(element: IItemElement, itemIns: mw.GameObject, ownerId: number): void {
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
    }

    protected async onUse(element: IItemElement): Promise<boolean> {
        return false;
    }
}