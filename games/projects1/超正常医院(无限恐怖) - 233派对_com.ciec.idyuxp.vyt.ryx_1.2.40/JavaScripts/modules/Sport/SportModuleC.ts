import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { EPlayerState, Events_CS, PlayerCurState } from "../../const/enum";
import { BtnCD } from "../../utils/UI/BtnCD";
import UITools from "../../utils/UI/UITools";
import { utils } from "../../utils/uitls";
import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import { P_PlayerBlood } from "../GameHud/UI/P_PlayerBlood";
import TimeModuleC from "../Time/TimeModuleC";
import PlayerFSMManager from "./FSM/PlayerFSMManager";
import { SportModuleS } from "./SportModuleS";




/**
 * 玩家运动模块
 */
export class SportModuleC extends ModuleC<SportModuleS, null> {


    /**玩家状态机 */
    public mPlayerStateManager: PlayerFSMManager;

    /**hudUI类 */
    private hudUI: P_Game_HUD;

    /**玩家精力条 */
    private sp: number = 100;

    /**玩家理论速度 */
    private speed: number = 0;

    /**恢复体力key */
    private recoverSpkey: any = null;

    /**冲刺 */
    public isCanSprint: boolean = false;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.hudUI = UIService.getUI(P_Game_HUD);
        this.speed = GlobalData.PlayerSport.dfSpeed;

        ActionCommon.onPlayerCurStateChange.add((state: PlayerCurState, playerId: number) => {
            if (playerId != Player.localPlayer.playerId) return;
            // 重生
            if (state == PlayerCurState.Alive) {
                this.changeState_Base();
                this.speed = GlobalData.PlayerSport.dfSpeed
            }
            // 死亡
            else if (state == PlayerCurState.Weak) {
                this.speed = GlobalData.PlayerSport.dfSpeed - 150;
            } else {
                this.speed = GlobalData.PlayerSport.dfSpeed
            }
        });

        ModuleService.getModule(TimeModuleC).onNightStart.add(() => {
            this.localPlayer.character.currentAnimation?.stop();
            if (this.getPlayerCurrentState() == EPlayerState.crouch) {
                this.changeState_Base();
                this.hudUI.mBtn_Jump.visibility = SlateVisibility.Visible;
            }
        })

        this.mPlayerStateManager = new PlayerFSMManager();
        this.mPlayerStateManager.createPlayerFSM();

        //玩家被NPC交互时，玩家状态变为静止
        Event.addServerListener(Events_CS.RecoverDefaultState, () => {
            // UIService.getUI(P_PlayerBlood).playAni();
            this.localPlayer.character.currentAnimation?.stop();
            if (this.getPlayerCurrentState() == EPlayerState.crouch) {
                this.changeState_Base();
                this.hudUI.mBtn_Jump.visibility = SlateVisibility.Visible;
            }
        });
    }

    protected onUpdate(dt: number): void {
        this.mPlayerStateManager.update(dt);
        this.checkSprint();
    }

    /**-----------------------------------------------玩家状态--------------------------------------------- */
    /**
     * 获取当前状态
     */
    public getPlayerCurrentState() {
        return this.mPlayerStateManager.currentStateType;
    }

    /**起身 */
    public changeState_getUp() {
        if (this.getPlayerCurrentState() == EPlayerState.crouch) {
            this.localPlayer.character.currentAnimation?.stop();
            this.changeState_Base();
        }
    }

    /**
     * 静止(base State)
     */
    public changeState_Base() {
        this.startRecoverSp();
        this.mPlayerStateManager.changeState(EPlayerState.Idle);
    }


    /**
     * 跳跃
     */
    public changeState_jump() {
        this.startRecoverSp();
        this.mPlayerStateManager.changeState(EPlayerState.jump);
    }

    /**
     * 潜伏
     */
    public changeState_Crouch() {
        this.startRecoverSp();

        BtnCD.instance.registerSkillUsed(EPlayerState.crouch);

        this.mPlayerStateManager.changeState(EPlayerState.crouch);
    }

    /**
     * 翻滚 &&冲刺 按下
     */
    public changeState_roll_sprint() {
        let state = this.getPlayerCurrentState();

        if (state == EPlayerState.crouch || state == EPlayerState.roll) {
            // 消耗体力
            if (this.sp < GlobalData.PlayerSport.rollCostSp) {
                UITools.ShowSoftTips(utils.getLanguageByKey("Tips_07"));
                return;
            }
            this.stopRecoverSp();

            this.reducePlayerSP(GlobalData.PlayerSport.rollCostSp);

            BtnCD.instance.registerSkillUsed(EPlayerState.roll);

            this.mPlayerStateManager.changeState(EPlayerState.roll);

        } else {

            if (this.getPlayerCurrentState() == EPlayerState.sprint) {
                return;
            }

            if (this.sp < GlobalData.PlayerSport.sprintCostSp) {
                UITools.ShowSoftTips(utils.getLanguageByKey("Tips_07"));
                return;
            }

            this.isCanSprint = true;
        }
    }

    /**
     * 翻滚 &&冲刺 松开
     */
    public stopState_roll_sprint() {
        this.isCanSprint = false;
    }

    /**
     * 死亡
     */
    public changeState_dead() {
        this.mPlayerStateManager.changeState(EPlayerState.Dead);
    }

    /**
     * 冲刺检测
     */
    private checkSprint() {
        let char = Player.localPlayer.character;
        if (!char) return;
        if (this.isCanSprint) {
            if (Player.localPlayer.character.velocity.length > 0) {
                if (this.getPlayerCurrentState() == EPlayerState.sprint) {
                    return;
                }
                this.stopRecoverSp();

                this.reducePlayerSP(GlobalData.PlayerSport.sprintCostSp);

                BtnCD.instance.registerSkillUsed(EPlayerState.sprint);

                this.mPlayerStateManager.changeState(EPlayerState.sprint);
            }
            else {
                let state = this.getPlayerCurrentState();
                if (state != EPlayerState.sprint) {
                    return;
                }
                this.changeState_Base();
            }
        } else {
            let state = this.getPlayerCurrentState();
            if (state != EPlayerState.sprint) {
                return;
            }
            this.changeState_Base();
        }
    }

    /**-----------------------------------------------玩家体力速度--------------------------------------------- */

    /**
     * 获取玩家速度
     */
    public getPlayerSpeed() {
        return this.speed + GlobalData.Buff.speedBuff;
    }

    /**
     * 获取玩家体力
     */
    public getPlayeSP() {
        return this.sp;
    }

    /**
     * 设置玩家体力
     * @param value 
     */
    public setPlyaerSP(value: number) {
        this.sp = value;
        ActionCommon.onSPChange.call(this.sp);
        // 设置UI
        this.hudUI.mSpBar.currentValue = value;
    }

    /**
     * 增加玩家
     * @param value 
     */
    public addPlayerSP(value: number) {
        let val = this.getPlayeSP()
        this.setPlyaerSP(Math.min(100, val + value))
    }

    /**
     * 减少玩家体力
     */
    public reducePlayerSP(value: number) {
        let val = this.getPlayeSP()
        this.setPlyaerSP(Math.max(0, val - value))
    }

    /**
     * 恢复sp
     */
    public startRecoverSp() {
        this.stopRecoverSp();
        this.recoverSpkey = TimeUtil.setInterval(() => {
            this.addPlayerSP(GlobalData.PlayerSport.sprintRecoverSp);
            if (this.sp >= 100) {
                this.sp = 100;
                this.stopRecoverSp();
            }
        }, GlobalData.PlayerSport.oneSpRecoverTime);
    }

    /**
     * 停止恢复sp
     */
    public stopRecoverSp() {
        if (this.recoverSpkey) {
            TimeUtil.clearInterval(this.recoverSpkey);
            this.recoverSpkey = null;
        }
    }


}