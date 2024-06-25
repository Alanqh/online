import { EPlayerState } from "../../../const/enum";
import { FSMManager } from "./FSMManager";
import { PlayeState_jump } from "./PlayeState_jump";
import { PlayerState_Crouch } from "./PlayerState_Crouch";
import { PlayerState_Dead } from "./PlayerState_Dead";
import { PlayerState_Idle } from "./PlayerState_Idle";
import { PlayerState_Roll } from "./PlayerState_Roll";
import { PlayerState_Run } from "./PlayerState_Run";
import { PlayerState_Sprint } from "./PlayerState_Sprint";

/**
 * 玩家状态机管理器
 */
export default class PlayerFSMManager extends FSMManager {

  /**
    * 注册状态机
    */
  public createPlayerFSM() {
    this.register(EPlayerState.Idle, new PlayerState_Idle(EPlayerState.Idle));
    this.register(EPlayerState.jump, new PlayeState_jump(EPlayerState.jump));
    this.register(EPlayerState.crouch, new PlayerState_Crouch(EPlayerState.crouch));
    this.register(EPlayerState.sprint, new PlayerState_Sprint(EPlayerState.sprint));
    this.register(EPlayerState.roll, new PlayerState_Roll(EPlayerState.roll));
    this.register(EPlayerState.run, new PlayerState_Run(EPlayerState.run));
    this.register(EPlayerState.Dead, new PlayerState_Dead(EPlayerState.Dead));
    // this.register(EPlayerState.Archer, new PlayerState_Archer(EPlayerState.Archer));
    this.changeState(EPlayerState.Idle);
  }

}