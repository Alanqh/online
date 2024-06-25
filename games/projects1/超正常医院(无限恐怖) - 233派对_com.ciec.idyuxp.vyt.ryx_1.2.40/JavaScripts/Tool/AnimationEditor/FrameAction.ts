import { GameConfig } from "../../config/GameConfig";
import BagModuleC from "../../modules/Bag/BagModuleC";
import PropModuleC from "../../modules/Prop/PropModuleC";

export enum FrameActionName {
    DelProp = "DelProp"
}

export class FrameAction {

    public static initFrameAction() {
        Event.addLocalListener(FrameActionName.DelProp, (player: Player) => {
            if (player.playerId != Player.localPlayer.playerId) return;

            let key = ModuleService.getModule(PropModuleC).curEquipPropKey;
            ModuleService.getModule(BagModuleC).delPropFromBag(key);
        })
    }
}