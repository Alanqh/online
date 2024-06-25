
import { EPlayerState } from "../../../const/enum";
import { PlyerState } from "./PlyerState";

/**
 * 跳状态
 */
export class PlayeState_jump extends PlyerState {

    constructor(stateType:EPlayerState) {
        super(stateType);
    }

    enter() {
        Player.localPlayer.character.jump();
    }

    exit() {

    }

    onUpdate(dt: number) {
        super.onUpdate(dt);
    }

    onDestory(): void {

    }

}