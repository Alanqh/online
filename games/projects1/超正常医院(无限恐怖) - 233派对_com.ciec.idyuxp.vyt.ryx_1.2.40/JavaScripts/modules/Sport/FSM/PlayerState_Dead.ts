import { EPlayerState } from "../../../const/enum";
import { PlyerState } from "./PlyerState";
 
/**
 * 待机状态
 */
export class PlayerState_Dead extends PlyerState {
 
    constructor(stateType:EPlayerState) {
        super(stateType);
    }

    enter() {
 
    }

    exit() {
 
    }

    onUpdate(dt: number) {
  
    }

    onDestory(): void {

    }
 
}