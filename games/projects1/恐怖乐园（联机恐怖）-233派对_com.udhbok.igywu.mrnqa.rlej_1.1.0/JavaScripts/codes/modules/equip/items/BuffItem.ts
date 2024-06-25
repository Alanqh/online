/*
 * @Author       : dal
 * @Date         : 2024-04-01 13:44:18
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-04-26 18:01:21
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\items\BuffItem.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import { DialogUI } from "../../../ui/DialogUI";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { ItemUseBox } from "../../bag/ui/ItemUseBox";
import BuffDefine from "../../buff/BuffDefine";
import { BuffModuleC } from "../../buff/BuffModule";
import { EquipModuleC } from "../EquipModuleC";
import { Item, registerItem } from "./Item";

@registerItem
export class BuffItem extends Item {

    public onHand(element: IItemElement, go: GameObject, ownerId: number): void {

    }

    public onRemoveHand(element: IItemElement): void {

    }

    protected async onUse(element: IItemElement, useCount: number): Promise<boolean> {
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
}
