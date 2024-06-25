import { ActionCommon, GlobalData } from "../../../const/GlobalData";
import { EPlayerState, FirstDo, GameMode, RedDotType, ShopFirstDo, ShopType } from "../../../const/enum";
import TimeModuleC from "../../Time/TimeModuleC";
import { SportModuleC } from "../../Sport/SportModuleC";
import { BtnCD } from "../../../utils/UI/BtnCD";
import UITools from "../../../utils/UI/UITools";
import Game_HUD_Generate from "../../../ui-generate/GameHUD/Game_HUD_generate";
import { SoundManager } from "../../../utils/SoundManager";
import { utils } from "../../../utils/uitls";
import { GameConfig } from "../../../config/GameConfig";
import { AnalyticsModuleC } from "../../Analytics/AnalyticsModule";
import P_Bag from "../../Bag/P_Bag";
import P_Rule from "../../../Common/P_Rule";
import { RedDotModuleC } from "module_reddot";
import DanceModuleC from "../../Dance/DanceModuleC";
import { LotteryModuleC } from "../../Lottery/LotteryModule";



export default class P_Game_HUD extends Game_HUD_Generate {

    public OnOff: Action = new Action();
    public onInitMatchAction: Action = new Action();
    public onJumpRP: Action = new Action();
    public onOpenShop: Action1<ShopType> = new Action1();
    private btnMathAni: Tween<{ param: number }>;

    /**攻击NPC事件  场景NPCID */
    public attNpcAC: Action1<number> = new Action1();

    private curNpcId: number = 0;

    private sportModuleC: SportModuleC = null;

    onStart() {
        this.layer = UILayerBottom;
        console.warn(`lwj P_Game_HUD start`);
        ModuleService.ready().then(() => {
            console.warn(`lwj P_Game_HUD ready`);
            this.sportModuleC = ModuleService.getModule(SportModuleC);
            this.setBtnVisible(true);
            this.setInteractBtnVisible(false);
            this.setAttackBtnVisible(false, 0);
            this.mProgressBar_HP.visibility = SlateVisibility.SelfHitTestInvisible;

            this.mBtn_Jump.onClicked.add(this.jump.bind(this));
            this.mBtn_Bag.onClicked.add(() => {
                let bag = UIService.getUI(P_Bag);
                bag.show()
                UITools.playPopUpTween(bag);
                ModuleService.getModule(AnalyticsModuleC).firstdo(FirstDo.firstOpenBag);
            })
            this.mBtn_Rule.onClicked.add(() => {
                UITools.playPopUpTween(UIService.show(P_Rule));
                ModuleService.getModule(AnalyticsModuleC).firstdo(FirstDo.firstClickMode);
            });

            this.mBtn_Close.onClicked.add(() => {
                this.mCanvas_Rule.visibility = mw.SlateVisibility.Collapsed;
            });
            this.mButton_Shop.onClicked.add(() => {
                this.onOpenShop.call(ShopType.Shop);
            });
            this.mButton_Hot.onClicked.add(() => {
                this.onOpenShop.call(ShopType.Hot);
                redDot.removeRedDotEvent(RedDotType.Shop);
            });


            this.mBtn_Stealth.onClicked.add(this.crouth.bind(this));
            this.mBtn_Sprint.onPressed.add(this.sprint.bind(this));
            this.mBtn_Sprint.onReleased.add(this.stopSprint.bind(this));


            this.mBtn_Attack.onClicked.add(() => {
                this.attNpcAC.call(this.curNpcId);
                this.setAttackBtnVisible(false, 0);
                SoundManager.instance.playSound(3)
            });
            this.mBtn_MonsterAttack.onClicked.add(() => {
                if (this.isInCD(EPlayerState.MonsterAttack)) {
                    UITools.ShowSoftTips(utils.getLanguageByKey("Tips_05"))
                    return;
                }
                this.onMonsterAtkAC.call();
                SoundManager.instance.playSound(3)
            });
            this.mButton_Expression.onClicked.add(() => {
                ModuleService.getModule(DanceModuleC).showDance();
            })
            this.mBtn_Lottery.onClicked.add(() => {
                ModuleService.getModule(LotteryModuleC).showLotteryUI();
                ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.Lottery_Click);
            })
            // 时间Ui图片变化监听
            this.addImageChangeListener();
            this.setKillUIVis(false);
            this.setSurvivalUIVis(false);
            this.setRescueUIVis(false);

            console.warn(`lwj P_Game_HUD end`);
        });

        //注册红点
        let redDot = ModuleService.getModule(RedDotModuleC);
        redDot.addRedDotPath(RedDotType.Hot, this.mButton_Hot);

        // 热销礼包icon动画
        this.initHotGiftTween();
    }

    onUpdate(dt: number): void {
        if (this.btnMathAni) {
            this.btnMathAni.update();
        }
    }

    public show(...param: any[]): void {
        super.show(...param);
        this.startHotGiftTween();
    }

    public hide(): void {
        super.hide();
        UIService.hideUI(this);
        this.stopHotGiftTween();
    }

    public setHp(hp: number): void {
        this.mTextBlock_HP.text = `${hp}/${GlobalData.PlayerAttribute.maxHp}`;
        this.mProgressBar_HP.currentValue = hp / GlobalData.PlayerAttribute.maxHp;
        this.mProgressBar_HP.fillImageColor = hp >= 50 ?
            LinearColor.colorHexToLinearColor(GlobalData.PlayerAttribute.hpBarHealthColor) :
            LinearColor.colorHexToLinearColor(GlobalData.PlayerAttribute.hpBarDangerColor);
    }

    /**与NPC交互时按钮显隐 */
    public setBtnVisible(isVis: boolean) {
        this.mCanvas_Bag.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        this.mCanvas_Intercative.visibility = isVis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    /**交互按钮显隐 */
    public setInteractBtnVisible(isVis: boolean) {
        this.mBtn_Interactive.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**设置冲刺 潜行按钮显隐 */
    public setSprintStealthVis(isVis: boolean) {
        this.mBtn_Sprint.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        this.mBtn_Stealth.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**潜行按钮显隐 */
    public setStealthVis(isVis: boolean) {
        this.mBtn_Stealth.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**冲刺按钮显隐 */
    public setSprintVis(isVis: boolean) {
        this.mBtn_Sprint.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**
     * 攻击NPC按钮显隐
     * @param isVis 是否显示
     * @param sceneId 场景Npcid 要攻击的NPC
     */
    public setAttackBtnVisible(isVis: boolean, sceneId: number) {
        this.curNpcId = sceneId;
        this.mBtn_Attack.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }



    //#region 时间UI相关
    private DayCount: number = 0;
    public setTimeUI(curTime: number) {
        let time = utils.parseTimeTo24(curTime);
        let h = time.hour;
        let m = time.min;

        let hStr = h.toString();
        let mStr = m.toString();
        if (h < 10) hStr = "0" + hStr;
        if (m < 10) mStr = "0" + mStr;

        // 设置UI
        this.mTxt_Time.text = `${hStr}:${mStr}`;
    }

    /**添加图片变化监听 */
    private addImageChangeListener() {
        ModuleService.ready().then(() => {
            let timeMC = ModuleService.getModule(TimeModuleC);
            timeMC.onDayStart.add((mode: GameMode) => {
                this.DayCount++;

            })

            timeMC.onNightStart.add((mode: GameMode) => {

            })
        })
    }


    //#endregion

    /**
    * 跳跃方法
    */
    public jump(): void {

        if (this.isInCD(EPlayerState.jump)) {
            UITools.ShowSoftTips(utils.getLanguageByKey("Tips_05"))
            return;
        }
        SoundManager.instance.playSound(3)
        this.sportModuleC.changeState_jump();
    }

    /**
     * 蹲下方法
     */
    public crouth(): void {
        SoundManager.instance.playSound(3)
        let crouth = (isCrouth: boolean) => {
            this.mBtn_Jump.visibility = isCrouth ? SlateVisibility.Collapsed : SlateVisibility.Visible;
            if (GlobalData.curPlayerData && GlobalData.curPlayerData.isInSafeArea) {
                ActionCommon.onPlayerHide.call(isCrouth);
            }
        }

        if (this.isInCD(EPlayerState.crouch)) {
            UITools.ShowSoftTips(utils.getLanguageByKey("Tips_05"))
            return;
        }

        if (this.sportModuleC.getPlayerCurrentState() == EPlayerState.crouch) {
            this.sportModuleC.changeState_Base();

            crouth(false);
        } else if (this.sportModuleC.getPlayerCurrentState() == EPlayerState.sprint) {
            this.sportModuleC.stopState_roll_sprint();
            crouth(false);
        } else {

            this.sportModuleC.changeState_Crouch();
            crouth(true);
        }

    }

    /**
     * 翻滚&&冲刺
     */
    public sprint(): void {
        SoundManager.instance.playSound(3)

        let state = this.sportModuleC.getPlayerCurrentState();
        if (state == EPlayerState.crouch || state == EPlayerState.roll) {
            if (this.isInCD(EPlayerState.roll)) {
                UITools.ShowSoftTips(utils.getLanguageByKey("Tips_05"))
                return;
            }
        } else {
            if (this.isInCD(EPlayerState.sprint)) {
                UITools.ShowSoftTips(utils.getLanguageByKey("Tips_05"))
                return;
            }
        }

        this.sportModuleC.changeState_roll_sprint();
    }

    /**
     * 停止冲刺
     */
    public stopSprint(): void {
        SoundManager.instance.playSound(4)

        this.sportModuleC.stopState_roll_sprint();
    }



    /**
     * 是否在cd 
     */
    public isInCD(state: EPlayerState) {
        let cd = 0;
        switch (state) {
            case EPlayerState.jump:
                cd = GlobalData.PlayerSport.jmupCD;
                break;
            case EPlayerState.crouch:
                cd = GlobalData.PlayerSport.crouchCD;
                break;
            case EPlayerState.sprint:
                cd = GlobalData.PlayerSport.sprintCD;
                break;
            case EPlayerState.roll:
                cd = GlobalData.PlayerSport.rollCD;
                break;
            default:
                cd = 2;
                break;
        }

        if (BtnCD.instance.getIsInCD(state, cd)[0]) {
            return true;
        }

        BtnCD.instance.registerSkillUsed(state);
    }

    /**计时器 */
    private t_CountDownTimer: any = null;

    /**计时结束事件 */
    public countDownEndAC: Action = new Action();

    /**
     * 倒计时
     */
    public countDown() {

        this.clearCountDown();
        this.mcanvas_Countdown.visibility = SlateVisibility.SelfHitTestInvisible;

        let t_CountDown = 60;
        let text = GameConfig.Language.Action_Text_1.Value;

        this.mTxt_CD.text = StringUtil.format(text, t_CountDown.toString())
        this.t_CountDownTimer = TimeUtil.setInterval(() => {
            if (t_CountDown > 0) {
                t_CountDown--;
                this.mTxt_CD.text = StringUtil.format(text, t_CountDown.toString())
            } else {
                this.countDownEndAC.call();
                this.clearCountDown();

            }
        }, 1);

    }

    /**
     * 清除计时器
     */
    public clearCountDown() {
        if (this.t_CountDownTimer) {
            TimeUtil.clearInterval(this.t_CountDownTimer);
            this.t_CountDownTimer = null;
            this.mcanvas_Countdown.visibility = SlateVisibility.Collapsed;
        }
    }



    //#region   玩家变身UI *****************/

    public onMonsterAtkAC: Action = new Action();

    /**变身了UI显隐 */
    public setChangeMonsterUI(isHide: boolean) {
        this.mBtn_Jump.visibility = isHide ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        this.mCanvas_Bag.visibility = isHide ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        this.mBtn_Stealth.visibility = isHide ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        this.mBtn_Attack.visibility = isHide ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        this.mBtn_MonsterAttack.visibility = isHide ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**变身怪攻击按钮显隐 */
    public setMonsterAtkBtnVis(isVis: boolean) {
        this.mBtn_MonsterAttack.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**变身怪冲刺显隐 */
    public setMonsterSprintVis(isVis: boolean) {
        this.mBtn_Sprint.visibility = isVis ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**击杀人数 */
    public setKillNum(num: number) {
        this.mTxt_Kill.text = num.toString();
    }

    /**拯救人数 */
    public setRescueNum(num: number) {
        this.mTxt_Peoples.text = num.toString();
    }

    /**击杀UI显隐 */
    public setKillUIVis(isVis: boolean) {
        this.mCanvas_Kill.visibility = isVis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }
    /**生存UI  */
    public setSurvivalUIVis(isVis: boolean) {
        this.mCanvas_Survival.visibility = isVis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }
    /**拯救UI */
    public setRescueUIVis(isVis: boolean) {
        this.mCanvas_Save.visibility = isVis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    //#endregion 玩家变身UI *****************/


    private _hotGiftShakeTween: mw.Tween<{ scaleY: number }> = null;
    private _starRotationTween: mw.Tween<{ angle: number, opacity: number }> = null;

    /** 初始化热销礼包动画且先播放 */
    private initHotGiftTween() {
        // 初始化hotImage的晃动动画
        this._hotGiftShakeTween = new mw.Tween({ scaleY: 0.9 })
            .to({ scaleY: 1.1 }, 200)
            .onUpdate(param => {
                this.hotImage.renderScale = new Vector2(1, param.scaleY);
            })
            .easing(TweenUtil.Easing.Quadratic.In)
            .yoyo(true)
            .repeat(3)
            .onComplete(() => {
                // 在hotImage的晃动动画执行完成后启动starImg的旋转和透明度变化动画
                this.hotImage.renderScale = Vector2.one;
                this._starRotationTween?.start();
            });

        // 初始化starImg的旋转和透明度变化动画
        this._starRotationTween = new mw.Tween({ angle: 0, opacity: 1 })
            .to({ angle: 360, opacity: 0 }, 1500)
            .onUpdate(param => {
                // 更新旋转角度和透明度
                this.starImg1.renderTransformAngle = param.angle;
                this.starImg2.renderTransformAngle = param.angle;
                this.starImg3.renderTransformAngle = param.angle;
                this.starImg1.renderOpacity = param.opacity;
                this.starImg2.renderOpacity = param.opacity;
                this.starImg3.renderOpacity = param.opacity;
            })
            .onComplete(() => {
                // 在starImg的旋转和透明度变化动画执行完成后再次启动hotImage的晃动动画
                this._hotGiftShakeTween?.start();
            });

        // 开始hotImage的晃动动画
        this._hotGiftShakeTween?.start();
    }

    /** 播放热销礼包的动画 */
    private startHotGiftTween() {
        this.starImg1.visibility = SlateVisibility.Visible;
        this.starImg2.visibility = SlateVisibility.Visible;
        this.starImg3.visibility = SlateVisibility.Visible;

        this._hotGiftShakeTween?.start();
    }

    private stopHotGiftTween() {
        // 停止hotImage的晃动动画
        this._hotGiftShakeTween?.stop();
        this.hotImage.renderScale = Vector2.one;

        // 停止starImg的旋转和透明度变化动画
        this._starRotationTween?.stop();
        this.starImg1.renderTransformAngle = 0;
        this.starImg2.renderTransformAngle = 0;
        this.starImg3.renderTransformAngle = 0;
        this.starImg1.renderOpacity = 1;
        this.starImg2.renderOpacity = 1;
        this.starImg3.renderOpacity = 1;

        this.starImg1.visibility = SlateVisibility.Collapsed;
        this.starImg2.visibility = SlateVisibility.Collapsed;
        this.starImg3.visibility = SlateVisibility.Collapsed;
    }


    private survivalTime: any;
    /**生存计时 */
    public setSurvivalTime() {
        if (this.survivalTime) {
            return;
        }
        let time = 0;
        this.mTxt_Days.text = utils.formatSecondsToMin(time);
        this.survivalTime = TimeUtil.setInterval(() => {
            time++;
            this.mTxt_Days.text = utils.formatSecondsToMin(time);
        }, 1)
    }

    public clearSurvivalTime() {
        if (this.survivalTime) {
            TimeUtil.clearInterval(this.survivalTime);
            this.survivalTime = null;
        }
    }
}
