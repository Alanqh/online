
import { IFSMState } from './IFSMState';
import { FSMManager } from './FSMManager';
import { SportModuleC } from '../SportModuleC';
import { EPlayerState } from '../../../const/enum';

// /**
//   * 本地播放动画-当前玩家，同时切换到ActionState状态
//   * @param owner 播放者
//   * @param animationGuid 动画guid
//   * @param loop 是否循环  注意：loop != 1  循环播放  事件不会回调的
//   * @param rate 动画速率
//   * @param isLocally 是否本地播放
//   */
// export function playCurrentPlayerAnimationAndChangeActionState(animationGuid: string, loop: number, rate: number, isLocally: boolean = false) {
//     let owner = Player.localPlayer.character;
//     if (owner === undefined || owner === null) return;
//     EventManager.instance.call(EModule_Events.changeState, EPlayerState.Action);
//     let anim = PlayerManagerExtesion.loadAnimationExtesion(owner, animationGuid, isLocally)
//     anim.loop = loop;
//     anim.speed = rate;
//     anim.play();
//     anim.onFinish.add(() => {
//         EventManager.instance.call(EModule_Events.changetoBaseState, -1);
//     });
//     return anim;
// }




/**玩家状态基类*/
export abstract class PlyerState implements IFSMState {

    /**默认状态 */
    public static dfaultState: EPlayerState = null;

    /**名字 */
    public name: string = this.constructor.name;

    /**状态类型 */
    public stateType: number = EPlayerState.None;

    /**运动控制 */
    protected sportModuleC: SportModuleC;

    /**状态管理 */
    protected mPlayerStateManager: FSMManager = null;


    constructor(stateType: EPlayerState) {
        this.sportModuleC = ModuleService.getModule(SportModuleC);
        this.mPlayerStateManager = this.sportModuleC.mPlayerStateManager;
        this.stateType = stateType;
    }

    /**
     * 能否进入
     */
    canEnter() {
        return true;
    }

    /**
    * 能否退出
    */
    canEixt() {
        return true;
    }

    /**
     * 状态进入，外部调用
     * @param context 战斗实体
     */
    enter(param?: any) {

    }

    /**
     * 退出状态外部调用
     */
    exit(param: any) {

    }

    /**
     * 更新，外部驱动
     */
    onUpdate(dt: number) {
        this.updateDfState();
    }

    /**
     * 刷新基本状态 
     */
    private updateDfState() {
        if (!Player.localPlayer.character) return;
        if (Player.localPlayer.character.isJumping) {
            PlyerState.dfaultState = EPlayerState.jump;
        } else {
            let ve = Player.localPlayer.character.velocity;
            let speed = ve.length;
            if (speed <= 0) {
                PlyerState.dfaultState = EPlayerState.Idle;
            }
            else {
                PlyerState.dfaultState = EPlayerState.run;
            }
        }
        this.changeDefaultState();
    }

    /**
     * 切换
     */
    public changeDefaultState() {

        if (this.stateType != EPlayerState.Idle && PlyerState.dfaultState == EPlayerState.Idle) {
            this.mPlayerStateManager.changeState(EPlayerState.Idle);
        }

        if (this.stateType != EPlayerState.run && PlyerState.dfaultState == EPlayerState.run) {
            this.mPlayerStateManager.changeState(EPlayerState.run);
        }

        if (this.stateType != EPlayerState.jump && PlyerState.dfaultState == EPlayerState.jump) {
            this.mPlayerStateManager.changeState(EPlayerState.jump);
        }
    }




    /**
    * 销毁
    */
    onDestory() {

    }

}
