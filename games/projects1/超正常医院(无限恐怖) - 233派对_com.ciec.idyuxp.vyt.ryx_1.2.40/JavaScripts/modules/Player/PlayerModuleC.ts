import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { P_Blood } from "./UI/P_Blood";
import { PlayerManager } from "./PlayerManager";
import { PlayerModuleData } from "./PlayerModuleData";
import { PlayerModuleS } from "./PlayerModuleS";
import { P_RulesTips } from "./UI/P_RulesTips";
import { P_Cure } from "./UI/P_Cure";
import TimeModuleC from "../Time/TimeModuleC";
import { utils } from "../../utils/uitls";
import { SoundManager } from "../../utils/SoundManager";
import { SoundEnum } from "../../enum/SoundEnum";
import { Events_CS, PlayerCurState } from "../../const/enum";
import { P_PlayerBlood } from "../GameHud/UI/P_PlayerBlood";
import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import P_Revive from "../../Common/P_Revive";
import UITools from "../../utils/UI/UITools";
import P_Rule from "../../Common/P_Rule";
import { DressScript } from "../DressUp/DressScript";

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData> {

    private bloodUI: P_Blood;
    private cureUI: P_Cure;
    private hudUI: P_Game_HUD;
    /**
     * 玩家死亡特效
     * key:玩家id
     * value:特效
     **/
    public deadEffMap: Map<number, number> = new Map<number, number>();
    // private eff2: Effect = null;
    private eff1: Effect = null;
    private injuriedTime: any = null;

    protected onStart(): void {

        this.bloodUI = UIService.getUI(P_Blood);
        this.cureUI = UIService.getUI(P_Cure);
        this.hudUI = UIService.getUI(P_Game_HUD);
        this.bindEvent();

        this.data.onDataChange.add(() => {
            UIService.getUI(P_Revive).setCoinCount(this.data.reviceCoin);
        });



        InputUtil.onKeyDown(mw.Keys.F3, () => {
            this.server.net_test();
        });

        ModuleService.getModule(TimeModuleC).onDayOver.add(() => {
            let rule = UIService.getUI(P_Rule);
            if (rule.visible && this.data.firstJoin) {
                rule.hide();
            }
        })
    }


    protected async onEnterScene(sceneType: number): Promise<void> {
        this.checkPlayerPos();
        let name = AccountService.getNickName();
        this.server.net_setPlayerName(name ? name : "小丑");

        /**初始化屏幕特效 */
        setTimeout(() => {
            this.initSceenEff();
            let name = AccountService.getNickName();
            this.server.net_setPlayerName(name ? name : "小丑");
        }, 25000);

        setTimeout(() => {
            if (!this.data.firstJoin) {
                this.server.net_startGame(false);
                return;
            }
            let rule = UIService.getUI(P_Rule);
            rule.show();
            rule.onHideAC.add(() => {
                //关闭规则后，开始游戏
                this.server.net_startGame(true);
                rule.onHideAC.clear();
            });
        }, 6000);

    }

    public test(loc: Vector) {
        this.eff1.localTransform.position = loc
        // this.eff2.localTransform.position = loc
    }

    public async initSceenEff() {
        let camera = Camera.currentCamera;


        // await GameObject.asyncSpawn(GlobalData.Environment.nightSceenEffectId1).then((eff) => {
        //     this.eff1 = eff as Effect;
        //     GlobalData.Environment.nightSceenEffect1 = this.eff1;
        //     this.eff1.parent = camera;
        //     this.eff1.localTransform.position = GlobalData.Environment.nightSceenEffectPos1
        //     this.eff1.localTransform.rotation = new Rotation(0, 0, 90);
        //     this.eff1.worldTransform.scale = Vector.one;
        //     this.eff1.setColor("Color", LinearColor.colorHexToLinearColor(GlobalData.Environment.nightSceenEffectColor1));
        //     this.eff1.loop = true;
        // });

        // await GameObject.asyncSpawn(GlobalData.Environment.nightSceenEffectId2).then((eff) => {
        //     this.eff2 = eff as Effect;
        //     GlobalData.Environment.nightSceenEffect2 = this.eff2;
        //     this.eff2.parent = camera;
        //     this.eff2.localTransform.position = GlobalData.Environment.nightSceenEffectPos2;
        //     this.eff2.localTransform.rotation = new Rotation(0, 0, 90);
        //     this.eff2.worldTransform.scale = new Vector(1.2, 1.2, 1.2);
        //     this.eff2.setColor("Color", LinearColor.colorHexToLinearColor(GlobalData.Environment.nightSceenEffectColor2));
        //     this.eff2.loop = true;
        // });

        // console.log("当前时间：" + ModuleService.getModule(TimeModuleC).curTime);
        // 这里直接禁用特效不生效，需要延时一下
        setTimeout(() => {
            if (utils.isNight()) {
                // this.eff1.play();
                // this.eff2.play();
                SoundService.stopBGM();
            } else {
                // this.eff1.stop();
                // this.eff2.stop();
                SoundManager.instance.playBGM(SoundEnum.DayBGM);
            }
        }, 3000);

        ModuleService.getModule(TimeModuleC).onNightStart.add(() => {
            // this.eff1.play();
            // this.eff2.play();
            SoundService.stopBGM();
        })
        ModuleService.getModule(TimeModuleC).onDayStart.add(() => {
            // this.eff1.stop();
            // this.eff2.stop();
            this.revivePlayer()
            SoundManager.instance.playBGM(SoundEnum.DayBGM);
        })
    }

    /**设置用枪时 特效的偏移 */
    public effOffset(isGun: boolean) {
        if (!this.eff1) return;
        let offset1 = isGun ? Vector.add(GlobalData.Environment.nightSceenEffectPos1, GlobalData.Gun.cameraOffset) : GlobalData.Environment.nightSceenEffectPos1;
        let offset2 = isGun ? Vector.add(GlobalData.Environment.nightSceenEffectPos2, GlobalData.Gun.cameraOffset) : GlobalData.Environment.nightSceenEffectPos2;
        // this.eff2.localTransform.position = offset2;
        this.eff1.localTransform.position = offset1;
    }


    private bindEvent() {
        ActionCommon.onPlayerHide.add(this.playerSafe.bind(this));
        // 扣血
        GlobalData.PlayerAttribute.playerIsHurt_C.add(() => {
            this.bloodUI.showBlood();
        });
        // 加血
        GlobalData.PlayerAttribute.playerIsCure_C.add(() => {
            this.cureUI.showBlood();
            SoundManager.instance.playSound(12);
        });
        // 玩家死亡或复活
        // ActionCommon.onPlayerCurStateChange.add((state: PlayerCurState, playerID: number) => {
        //     if (state == PlayerCurState.Dead && this.localPlayer.playerId == playerID) {
        //         this.hudUI.countDown();
        //         this.clearInjuriedTime2();
        //         // 显示复活UI
        //         UIService.show(P_Revive);
        //     }
        // });
        this.hudUI.countDownEndAC.add(() => {
            this.revivePlayer();
        });
        //玩家被NPC交互时，玩家状态变为静止
        Event.addServerListener(Events_CS.RecoverDefaultState, () => {
            this.clearInjuriedTime2();
        })
        // 使用复活币
        let reviveUI = UIService.getUI(P_Revive);
        reviveUI.setCoinCount(this.data.reviceCoin);
        reviveUI.mBtn_Use.onClicked.add(async () => {
            if (this.data.reviceCoin <= 0) {
                UITools.ShowSoftTips("复活币数量不足！");
                return;
            }
            let isSuccess = await this.server.net_useReviveCoin();
            if (isSuccess) {
                this.revivePlayer();
                console.log("剩余复活币：" + this.data.reviceCoin);
            }
        });
    }


    /**检测玩家位置 */
    private checkPlayerPos() {

        let char = Player.localPlayer.character;

        TimeUtil.setInterval(() => {
            let curZ = char.worldTransform.position.z;
            if (curZ <= GlobalData.PlayerAttribute.playerMinZ) {
                UIService.getUI(P_RulesTips).showPlayerDie()
                PlayerModuleC.resetPlayerPos();
            }
        }, 3)
    }

    public static resetPlayerPos() {
        Player.localPlayer.character.worldTransform.position = GlobalData.NPC.playerBedDayPos;
        PlayerManager.instance.updatePlayerLoc();
    }



    /**复活 */
    public revivePlayer() {
        // if (GlobalData.curPlayerData.PlayerState == PlayerCurState.Dead) {
        //     this.server.net_revivePlayerById();
        //     // 隐藏使用复活币UI
        //     UIService.hide(P_Revive);
        //     this.hudUI.clearCountDown();
        // }
    }

    /**解救玩家 */
    rescuePlayer(target: number) {
        this.server.net_rescuePlayer(target);
    }

    /**
     * 设置玩家安全状态
     */
    private playerSafe(isSafe: boolean) {
        this.server.net_SetSafe(isSafe);
    }

    /**
     * 点击呼救按钮
     */
    public callHelp() {
        UIService.getUI(P_PlayerBlood).playAni();
        this.server.net_callHelp();
    }

    /**
     * 改变血量
     */
    public changeHp(val: number) {
        this.server.net_ChangeHP(val);
    }


    //不会执行移除掉血、ui操作
    private clearInjuriedTime2() {
        if (this.injuriedTime) {
            clearTimeout(this.injuriedTime);
            this.injuriedTime = null;
        }
    }


    // 玩家进入场景监听
    // private addPlayerEnterSceneEff() {
    //     ActionCommon.onPlayerEnterScene.add(() => {
    //         let dressScript = this.localPlayer.character.getComponent(DressScript);
    //         let effPrefab = dressScript.enterEffectPrefab;
    //         if (effPrefab == null) return console.warn(`没有进场特效`);

    //         console.log(`特效数量：` + effPrefab.getChildren().length);
    //         effPrefab.getChildren().forEach((obj) => {
    //             console.log(`特效：` + obj.name);
    //         });

    //         effPrefab.getChildren().forEach((eff) => {
    //             if (eff instanceof Effect) {
    //                 eff.stop();
    //                 eff.play();
    //                 console.log(`播放进场特效`);
    //             }
    //         });
    //     });
    // }
}