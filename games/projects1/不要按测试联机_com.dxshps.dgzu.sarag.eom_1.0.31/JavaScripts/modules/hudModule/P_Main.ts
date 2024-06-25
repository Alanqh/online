import { GameConfig } from "../../config/GameConfig";
import { EGamingFsmType, EGlobalFsmType, EPlayerStateType, EWatchType } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Main_Game_Generate from "../../ui-generate/Game/Main_Game_generate";
import { CameraUtil } from "../../utils/CameraUtil";
import GameComUtils from "../../utils/GameComUtils";
import { PetModuleC } from "../petModule/PetModuleC";
import P_BaseControl from "./ui/P_BaseControl";

export default class P_Main extends Main_Game_Generate {

    private calculateTween: Tween<{ x: number }> = null;
    protected onStart(): void {
        this.mText_WaitNum.visibility = SlateVisibility.SelfHitTestInvisible;
        this.mText_SuccessfulMatch.visibility = SlateVisibility.Collapsed;

        this.mCanvas_Watch.visibility = SlateVisibility.Collapsed;
        this.mCanvas_Calculate.visibility = SlateVisibility.Collapsed;

        this.mCanvas_Gaming.visibility = SlateVisibility.Collapsed;
        // this.mCanvas_Num.visibility = SlateVisibility.Collapsed;
        this.mCanvas_Time.visibility = SlateVisibility.Collapsed;
        this.mCanvas_RoundOver.visibility = SlateVisibility.Collapsed;
        this.mCanvas_Pass.visibility = SlateVisibility.Collapsed;

        this.changeWatchEnterState(false);
        this.mCanvas_Out.visibility = SlateVisibility.Collapsed;

        this.mCanvas_Exit.visibility = SlateVisibility.Collapsed;

        this.mBtn_Quit.onClicked.add(() => {
            this.mCanvas_Exit.visibility = SlateVisibility.SelfHitTestInvisible;
        })

        this.mBtn_Exit_Cancel.onClicked.add(() => {
            this.mCanvas_Exit.visibility = SlateVisibility.Collapsed;
        })

        this.mBtn_Exit_Confirm.onClicked.add(() => {
            this.mCanvas_Exit.visibility = SlateVisibility.Collapsed;
            GlobalData.playerQuitGameAc.call();
        })
        this.mBtn_Enter_Watch.onClicked.add(() => {
            this.startWatch();
        })
        this.mBtn_Exit_Watch.onClicked.add(() => {
            this.exitWatch();
        })
        this.mBtn_Previous.onClicked.add(() => {
            CameraUtil.changeWatch(EWatchType.Previous);
        })
        this.mBtn_Next.onClicked.add(() => {
            CameraUtil.changeWatch(EWatchType.Next);
        })

        CameraUtil.initCamera(this);

        this.createCalculateTween();
    }



    private exitWatch() {
        this.changeWatch(false);
        this.changeWatchEnterState(true);
        CameraUtil.changeWatch(EWatchType.EndWatch);
        ModuleService.getModule(PetModuleC).setPetCtrlUIVisible(true);
    }
    // 全局状态切换
    public globalStateChange(state: EGlobalFsmType) {
        if (state == EGlobalFsmType.Wait || state == EGlobalFsmType.PrepareChange) {
            this.mCanvas_Waiting.visibility = SlateVisibility.SelfHitTestInvisible;
            this.showMathcUI();
        } else {
            if (this.matchTween != null) {
                this.matchTween.stop();
                this.matchTween = null;
            }
            this.mCanvas_Waiting.visibility = SlateVisibility.Collapsed;
            this.mCanvas_Match.visibility = SlateVisibility.Collapsed;
        }

        this.mCanvas_Gaming.visibility = state == EGlobalFsmType.Game ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.mCanvas_Watch.visibility = SlateVisibility.Collapsed;

        if (state == EGlobalFsmType.Game) {
            this.mCavnas_PlayerCount.visibility = SlateVisibility.Collapsed;
            this.mCanvas_Time.visibility = SlateVisibility.Collapsed;
            this.mCanvas_Pass.visibility = SlateVisibility.Collapsed;
            this.mCanvas_Counts.visibility = SlateVisibility.Collapsed;
        }
    }

    // 设置等待人数
    public setWaitNum(curNum: number) {
        let playerMaxCount = GameConfig.RuleGame.getElement(10005).int_Value;
        this.mText_WaitNum.text = StringUtil.format("({0}/{1})", curNum, playerMaxCount);
    }



    // 匹配完毕
    public showAllPlayerReady() {
        this.mText_Matching.visibility = SlateVisibility.Collapsed;
        this.mText_WaitNum.visibility = SlateVisibility.Collapsed;
        this.mText_SuccessfulMatch.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    // 观战
    public changeWatch(isOn: boolean) {
        // 观战和重置冲突
        UIService.getUI(P_BaseControl).mCanvas_Reset.visibility = isOn ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
        this.mCanvas_Watch.visibility = isOn ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        if (isOn) {

        }
    }
    public changeWatchEnterState(isOn: boolean) {
        this.mCanvas_Watch_Enter.visibility = isOn ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    /**
     * 游戏状态切换
     * @param state 游戏状态
     * @param playerState 玩家状态
     * @returns 
     */
    public gamingStateChange(state: EGamingFsmType, playerState: EPlayerStateType) {
        // 状态变更的时候，关闭退出界面
        this.mCanvas_Exit.visibility = SlateVisibility.Collapsed;

        this.mCanvas_Calculate.visibility = state == EGamingFsmType.Calculate ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        // this.mCavnas_PlayerCount.visibility = state == EGamingFsmType.Gaming ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.mCanvas_Time.visibility = state == EGamingFsmType.Gaming ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;

        switch (state) {
            case EGamingFsmType.Loading:
                // 重置相机
                CameraUtil.changeWatch(EWatchType.EndWatch);
                // this.showPrepareCountDown();
                // 恢复玩家移动
                Player.localPlayer.character.movementEnabled = true;
                Player.localPlayer.character.jumpEnabled = true;
                break;
            case EGamingFsmType.Prepare:
                // 第二轮
                if (GlobalData.levelEndCount_C == 0) {
                    this.mCavnas_PlayerCount.visibility = SlateVisibility.HitTestInvisible;
                    this.mCavnas_FinalRound.visibility = SlateVisibility.Collapsed;
                }
                else if (GlobalData.levelEndCount_C == 1) {
                    this.mCavnas_PlayerCount.visibility = SlateVisibility.Collapsed;
                    this.mCavnas_FinalRound.visibility = SlateVisibility.HitTestInvisible;
                }
                // 输了的人默认观战，并且只能退出到大厅
                if (playerState == EPlayerStateType.Lose) {
                    this.startWatch();
                    this.mCanvas_Watch_Exit.visibility = SlateVisibility.Collapsed;
                    return
                }
                // 准备 
                this.showPrepareCountDown();
                break;
            case EGamingFsmType.Gaming:
                if (playerState == EPlayerStateType.Lose) {
                    return;
                }
                break;
            case EGamingFsmType.Calculate:
                // 结算关闭右上角UI
                this.mCavnas_PlayerCount.visibility = SlateVisibility.Collapsed;
                this.mCavnas_FinalRound.visibility = SlateVisibility.Collapsed;
                break;
            default:
                break;
        }
    }

    private showPrepareCountDown() {
        Player.localPlayer.character.movementEnabled = false;
        Player.localPlayer.character.jumpEnabled = false;

        this.mCanvas_Counts.visibility = SlateVisibility.SelfHitTestInvisible;
        this.mText_Counts.visibility = SlateVisibility.SelfHitTestInvisible;
        this.mText_Start.visibility = SlateVisibility.Collapsed;
        let timer = GameConfig.RuleGame.getElement(10007).int_Value;
        this.mText_Counts.text = timer.toString();
        let a = TimeUtil.setInterval(() => {
            timer--;
            this.mText_Counts.text = timer.toString();
            if (timer == 0) {
                this.mText_Start.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mText_Counts.visibility = SlateVisibility.Collapsed;
                TimeUtil.clearInterval(a);
                setTimeout(() => {
                    this.mCanvas_Counts.visibility = SlateVisibility.Collapsed;
                }, 1000);
            }
        }, 1)

    }

    // 倒计时
    public timerChange(curtime: number) {
        this.mText_Time.text = GameComUtils.changeSecond2Minus(curtime);
    }

    // 胜利者
    public winNumChange(pids: number[], configId: number) {
        let config = GameConfig.Level.getElement(configId);
        this.mText_PlayerCount.text = StringUtil.format("{0}/{1}", pids.length, config.winNum);
    }
    // 自己获胜
    public selfWin() {
        this.canvasTipShow(this.mCanvas_Pass, GameConfig.RuleGame.getElement(10008).int_Value * 1000);
    }

    // 开始结算
    public startCalculate(winNum: number, maxNum: number) {
        CameraUtil.changeWatch(EWatchType.EndWatch);
        this.changeWatch(false);
        this.changeWatchEnterState(false);
        this.mText_Num.text = StringUtil.format("{0}/{1}", maxNum, maxNum);
        let playersNum = Player.getAllPlayers().length;
        let changeNum = maxNum >= playersNum ? maxNum : playersNum;

        this.mBtn_Transition.circleValue = 0;
        this.calculateTween.start();

        let playEffectTimer = (GlobalData.calculateChangeUITimer + GlobalData.calculateWaitTime) * 1000;

        // GlobalData.calculateChangeUITimer
        // UI动画
        new Tween<{ x: number }>({ x: changeNum })
            .to({ x: winNum }, GlobalData.playerCountChangeTime * 1000)
            .onUpdate((v) => {
                this.mText_Num.text = v.x.toFixed() + "/" + maxNum;
            })
            .delay(playEffectTimer)
            .start();

        this.canvasTipShow(this.mCanvas_RoundOver, GameConfig.RuleGame.getElement(10010).int_Value * 1000);
    }

    // 关卡结束
    public gameOver() {
        this.canvasTipShow(this.mCanvas_RoundOver, GameConfig.RuleGame.getElement(10010).int_Value * 1000);
    }

    private canvasTipShow(canvas: mw.Canvas, timer: number) {
        canvas.visibility = SlateVisibility.SelfHitTestInvisible;
        setTimeout(() => {
            canvas.visibility = SlateVisibility.Collapsed;
        }, timer);
    }


    // 开始观战
    public startWatch() {
        if (CameraUtil.AllWatchObjLength <= 0) return;//TODO:加个tips？
        this.changeWatch(true);
        this.changeWatchEnterState(false);
        CameraUtil.changeWatch(EWatchType.StartWatch);
        ModuleService.getModule(PetModuleC).setPetCtrlUIVisible(false);
    }

    /**首次结算失败 */
    public firstLose() {
        this.mCanvas_Out.visibility = SlateVisibility.SelfHitTestInvisible;
        setTimeout(() => {
            this.mCanvas_Out.visibility = SlateVisibility.Collapsed;
        }, 2000);
    }

    private matchTween: Tween<{ x: number, y: number }> = null;
    public showMathcUI() {
        let startP = new Vector2(this.mCanvas_Anchor.position.x, this.mCanvas_Match.position.y);
        this.mCanvas_Match.position = startP.clone();
        let z = GameConfig.RuleGame.getElement(10039).float_Value;
        let endP = startP.clone().add(new Vector2(0, z));
        let moveTimer = GameConfig.RuleGame.getElement(10038).float_Value;
        this.mCanvas_Match.visibility = SlateVisibility.SelfHitTestInvisible;
        this.matchTween = new Tween<Vector2>(startP)
            .to(endP, moveTimer * 1000)
            .onUpdate((v) => {
                this.mCanvas_Match.position = v;
            })
            .onComplete(() => {
                this.matchTween = null;
            }).start();
    }

    public setMatchWaitTime(curTime: number) {
        this.mText_MatchTime.text = curTime.toString();
    }

    private createCalculateTween() {
        let bigTimer = GameConfig.RuleGame.getElement(10043).float_Value;
        let waitTimer = GameConfig.RuleGame.getElement(10044).float_Value;
        let smallTimer = GameConfig.RuleGame.getElement(10045).float_Value;
        let closeTween = new Tween<{ x: number }>({ x: 0 })
            .to({ x: 1 }, smallTimer * 1000)
            .onUpdate((v) => {
                this.mBtn_Transition.circleValue = v.x;
            }).delay(waitTimer * 1000).onComplete(() => {
                console.log("close 结束时间", TimeUtil.elapsedTime());
            });

        this.calculateTween = new Tween<{ x: number }>({ x: 1 })
            .to({ x: 0 }, bigTimer * 1000)
            .onUpdate((v) => {
                this.mBtn_Transition.circleValue = v.x;
            }).chain(closeTween)
            .onComplete(() => {
                console.log("open 结束时间", TimeUtil.elapsedTime());
            });
    }
}