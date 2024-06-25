import { GameConfig } from "../../config/GameConfig";
import { Events_CS } from "../../const/enum";
import { PlyerState } from "../Sport/FSM/PlyerState";
import PropModuleC from "./PropModuleC";

export class PlayerState_UseProp extends PlyerState {

    private propMC: PropModuleC;


    enter(propId: number) {
        this.propMC = ModuleService.getModule(PropModuleC);
        let propConf = GameConfig.Item.getElement(propId);
        let playerId = Player.localPlayer.playerId;
        let character = Player.localPlayer.character;
        // 所有客户端播放道具动画
        Event.dispatchToServer(Events_CS.playAnimation_S_Editor, playerId, propConf.ActionAnimation);
        
    }

    exit() {

    }

    onUpdate(dt: number) {

    }
}