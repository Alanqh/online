import { oTrace } from "odin";
import { recordCharacter } from "../Prefabs/CheckPoint/Script/CheckPoint";
import { GameConfig } from "../config/GameConfig";
import { EGamingFsmType, EPlayerStateType } from "../const/Enum";
import { GameEventC2C, GamingCtrlEventC2C, LevelEventC2S } from "../const/GameCommonEvent";
import { GlobalData } from "../const/GlobalData";
import { stateType } from "../modules/aIModule/AIMachine/AIStateManager";
import { AIManager_C } from "../modules/aIModule/AIManager_C";
import AIPathUtil from "../modules/aIModule/AIPathUtil";
import GamingModuleC from "../modules/gamingModule/GamingModuleC";
import MGSHome from "../modules/mgsModule/MGSHome";
import { PetModuleC } from "../modules/petModule/PetModuleC";
import { FourPlayerState } from "../modules/petModule/fourPlayerFSM/FourPlayerFSM";
import PlayerModuleC from "../modules/playerModule/PlayerModuleC";
import { PropModuleC } from "../modules/propModule/PropModuleC";
import GameComUtils from "../utils/GameComUtils";
import GameEnvCfgUtils from "../utils/GameEnvCfgUtils";
import { LevelBase } from "./LevelBase";
import { LevelLogicBase } from "./LevelLogicBase";

enum ECreateNpcState {
    None,
    Createing,
    Done,
}

export abstract class LevelLogic_C<T extends LevelBase> extends LevelLogicBase<T> {
    private resetPosListener: EventListener;
    private checkPointListener: EventListener;
    private createNPCListener: EventListener;
    private stateChangeListener: EventListener;
    private wallObj: GameObject = null;

    private createNpcState: ECreateNpcState = ECreateNpcState.None;
    protected funcMap_C: Map<string, Function> = new Map<string, Function>();

    // 属性同步下来的状态，如果客户端卡了，可能会跳过一些状态，所以需要记录下来
    private mState: number = EGamingFsmType.None;

    protected async onScriptStart() {
        // this.findWinTrigger();
        this.mState = EGamingFsmType.None;
        // 切后台会导致这里收不到
        this.stateChangeListener = Event.addLocalListener(GamingCtrlEventC2C.CTRL_GAMING_STATE_CHANGE_C2C, (state: EGamingFsmType) => {

            // 存在跳过状态的情况
            if (state - this.mState > 1) {
                // 从加载中直接到游戏中
                if (state == EGamingFsmType.Gaming && this.mState < EGamingFsmType.Prepare) {
                    // 创建NPC，修改玩家位置
                    this.info.net_Client_Call_Server_C("net_ClientEnterPrepare_S");
                }
            }
            this.mState = state;

            if (state == EGamingFsmType.Prepare) {
                this.info.net_Client_Call_Server_C("net_ClientEnterPrepare_S");
                return;
            }

            if (state != EGamingFsmType.Gaming) {
                return
            }
            if (this.wallObj == null) {
                return
            }
            this.wallObj.destroy();
            this.wallObj = null;
        });
        this.findDeathTriggers();
        this.resetPosListener = Event.addLocalListener(GameEventC2C.GAME_RESET_PLAYER_POS_C2C, () => {
            this.reborn();
        })
        this.checkPointListener = Event.addLocalListener(GameEventC2C.GAME_CHECKPOINT_C2C, (checkPoint: number) => {
            this.playEffect(true);

            this.info.net_Client_Call_Server_C("net_SetCheckPoint_S", checkPoint);

        })

        // this.createNPCListener = Event.addServerListener(LevelEventS2C.LEVEL_CREATE_NPC_S2C, this.initAI.bind(this))

        if (this.info.wallGuid != "") {
            this.wallObj = await GameObject.asyncFindGameObjectById(this.info.wallGuid);
        }

        try {
            await this.onInitClient();

            GameEnvCfgUtils.changeSkyBox(this.myConfig.light);

            // 查询是否已经开始了
            if (GlobalData.gameingState_C == EGamingFsmType.Gaming) {
                if (this.mState < EGamingFsmType.Prepare) {
                    // this.info.net_Client_Call_Server_C("net_NeedCreateNpc_S");
                    this.info.net_Client_Call_Server_C("net_ClientEnterPrepare_S");
                }

                this.mState = EGamingFsmType.Gaming;
                if (this.wallObj == null) {
                    return
                }
                this.wallObj.destroy();
                this.wallObj = null;
            }
        } catch (error) {
            console.error("LevelLogic_C onScriptStart error:", error);
        }
    }

    private async initAI(count: number, posLis: Vector[], rot: Rotation) {
        let useLockPath = this.myConfig.aiPath == 1 ? true : false;
        let lockPointList = AIPathUtil.getLockPath(this.myConfig.id, this.gameObject.worldTransform);
        let pathPosMap = AIPathUtil.getNormalPath(this.myConfig.id, this.gameObject.worldTransform);

        if (useLockPath) {
            if (lockPointList == null) {
                console.error("没有找到固定路线 levelID", this.myConfig.aiPath);
                return
            } else if (lockPointList.length < 1) {
                console.error("固定路线不对 levelID", this.myConfig.aiPath);
                return
            }
        }

        if (!useLockPath && pathPosMap == null) {
            if (pathPosMap == null) {
                console.error("没有找到普通路线 levelID", this.myConfig.aiPath);
                return
            } else if (pathPosMap.size < 1) {
                console.error("普通路线不对 levelID", this.myConfig.aiPath);
                return
            }
        }

        if (this.createNpcState != ECreateNpcState.None) return;
        this.createNpcState = ECreateNpcState.Createing;
        // count = 1;
        for (let i = 0; i < count; i++) {
            await AIManager_C.Instance.setNewAI(useLockPath, lockPointList, pathPosMap, posLis[i], rot);
            // await TimeUtil.delaySecond(0.05);
        }
        // let aiArr = AIManager_C.Instance.FsmArr;
        // aiArr.forEach((fsm, index) => {
        //     fsm.changeState(stateType.Born, posLis[index]);
        // })
        this.createNpcState = ECreateNpcState.Done;
    }

    private async findDeathTriggers() {
        if (this.info.deadTriggerNum == 0) return;

        let deathTriggerParent = this.gameObject.getChildByName(GlobalData.deadTriggerParentName);
        if (deathTriggerParent) {
            await deathTriggerParent.asyncReady();
            // 触发器名称从1开始
            for (let i = 1; i <= this.info.deadTriggerNum; i++) {
                let deadTrigger = deathTriggerParent.getChildByName(i.toString()) as Trigger;
                if (!deadTrigger) {
                    oTrace('guan log 没找到触发器', i);
                    continue;
                }
                await deadTrigger.asyncReady();
                deadTrigger.onEnter.add(this.playerEnterDeadTrigger);
            }
        }
    }
    private deadconfig = GameConfig.RuleGame.getElement(10018);
    private deadTimer: number = 0;

    private playerEnterDeadTrigger = (obj: GameObject) => {
        let isAi = AIManager_C.Instance.checkIsAiById(obj.gameObjectId);
        if (isAi) {
            AIManager_C.Instance.changeAIFSMByID(obj.gameObjectId, stateType.Dead);
            return;
        }
        if (!GameComUtils.check_isLocalPlayer(obj)) {
            return
        }
        ModuleService.getModule(PetModuleC).changeState(false, FourPlayerState.DeathState);
        this.useUpdate = true;
        this.deadTimer = TimeUtil.elapsedTime() + this.deadconfig.float_Value;

        Player.localPlayer.character.ragdollEnabled = true;

        let checkPoint = 0;
        if (recordCharacter.checkPoint != -1) {
            checkPoint = recordCharacter.checkPoint;
        }
        MGSHome.playerDie(this.info.configID, GlobalData.levelEndCount_C == 0, checkPoint);

        Event.dispatchToServer(LevelEventC2S.LEVEL_DIE_C2S, Player.localPlayer.playerId);
        ModuleService.getModule(PropModuleC).net_ClearPropUI();

    }

    private playerEnterWindTrigger = (obj: GameObject) => {
        if (!GameComUtils.check_isLocalPlayer(obj)) {
            return
        }
        //TODO 找到一个双端通信方式
        // 先放服务器
        // this.addWinPlayer(obj.player.playerId);

        // // 第二轮，只有1个玩家可以赢！！！
        // if (GlobalData.levelEndCount == 1) {
        //     Event.dispatchToLocal(LevelEventS2S.LEVEL_GAMING_DONE_S2S)
        //     return
        // }

        // if (this.winPlayer.length == this.myConfig.winNum) {
        //     // 单轮游戏结束
        //     Event.dispatchToLocal(LevelEventS2S.LEVEL_GAMING_DONE_S2S)
        // }
    }


    protected onScriptUpdate(dt: number): void {
        this.checkReborn();
    }
    protected checkReborn() {
        if (this.deadTimer == -1 || TimeUtil.elapsedTime() < this.deadTimer) return
        this.deadTimer = -1;
        this.reborn();
    }

    protected reborn() {
        if (recordCharacter.checkPoint == -1) {
            // 默认出生点
            Player.localPlayer.character.worldTransform.position = this.myConfig.birthPoint;
        } else {
            Player.localPlayer.character.worldTransform.position = GameComUtils.getRandomPoint(recordCharacter.centerPoint, recordCharacter.size)
        }
        Player.localPlayer.character.ragdollEnabled = false;
        ModuleService.getModule(PetModuleC).changeState(false, FourPlayerState.IdleState);
        // 重生特效
        this.playEffect();
    }

    protected playEffect(playSound: boolean = false) {
        GameComUtils.playEffectOnPos(Player.localPlayer.character.worldTransform.position, this.deadconfig.int_Value);
        if (!playSound) return;
        GameComUtils.play2DSoundByCfg(30009);//到达检查点提示音效
    }


    protected onScriptDestroy(): void {
        if (this.resetPosListener) {
            Event.removeListener(this.resetPosListener);
        }
        if (this.checkPointListener) {
            Event.removeListener(this.checkPointListener);
        }
        if (this.createNPCListener) {
            Event.removeListener(this.createNPCListener);
        }
        if (this.stateChangeListener) {
            Event.removeListener(this.stateChangeListener);
        }
    }

    protected onPlayerLeave(player: mw.Player): void {

    }

    /** 初始化 */
    protected abstract onInitClient();
    /**
     * 服务器调用客户端方法
     * @param funName 方法名-需要以net_开头
     * @param args 可选参数
     */
    public serverCallClientFun(funName: string, ...args: any[]) {
        if (this.funcMap_C.has(funName)) {
            this.funcMap_C.get(funName).call(this, ...args);
        } else {
            oTrace('guan log 没有找到方法', funName);
        }
    }

    // private net_CreateNPC_C(count: number, posLis: Vector[]) {
    //     this.initAI(count, posLis);
    // }

    // private async net_ChangePlayerPos_C(pos: Vector, rot: Rotation) {
    //     let pModuleC = ModuleService.getModule(PlayerModuleC);
    //     await pModuleC.playerReady();
    //     let pState = pModuleC.getPlayerState();
    //     if (pState != EPlayerStateType.Normal) return;
    //     Player.localPlayer.character.worldTransform.position = pos;
    //     Player.localPlayer.character.worldTransform.rotation = rot;
    // }

    private async net_PlayerEnterPrepare(pos: Vector, rot: Rotation, count: number, posLis: Vector[]) {
        this.initAI(count, posLis, rot.clone());
        let pModuleC = ModuleService.getModule(PlayerModuleC);
        await pModuleC.playerReady();
        let pState = pModuleC.getPlayerState();
        setTimeout(() => {
            //关闭UI
            ModuleService.getModule(GamingModuleC).hideLoading();
        }, 100);
        if (pState != EPlayerStateType.Normal) return;
        Player.localPlayer.character.worldTransform.position = pos;
        Player.localPlayer.character.worldTransform.rotation = rot;
        Camera.currentCamera.springArm.useControllerRotation = false;
        setTimeout(() => {
            Camera.currentCamera.springArm.localTransform.rotation = rot
            Camera.currentCamera.springArm.useControllerRotation = true;
        }, 100);
    }
}
