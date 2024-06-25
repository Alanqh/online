import { oTrace } from "odin";
import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../../config/GameConfig";
import { EGamingFsmType, EPlayerStateType, InGameStatus } from "../../const/Enum";
import { GamingCtrlEventC2C, TrapEventC2C } from "../../const/GameCommonEvent";
import { GlobalData } from "../../const/GlobalData";
import { ClassInstance } from "../../tools/ClassInstance/ClassInstance";
import GameComUtils from "../../utils/GameComUtils";
import GameEnvCfgUtils from "../../utils/GameEnvCfgUtils";
import { stateType } from "../aIModule/AIMachine/AIStateManager";
import { AIManager_C } from "../aIModule/AIManager_C";
import HUDModuleC from "../hudModule/HUDModuleC";
import { GameToHallDataManager, JumpGameHelper } from "../jumpGame/JumpGameHelper";
import MGSHome from "../mgsModule/MGSHome";
import MGSModuleC from "../mgsModule/MGSModuleC";
import { PetModuleC } from "../petModule/PetModuleC";
import PlayerModuleC from "../playerModule/PlayerModuleC";
import PlayerSync from "../playerModule/PlayerSync";
import GamingModuleS from "./GamingModuleS";
import P_Champion from "./P_Champion";
import P_Loading from "./P_Loading";

export default class GamingModuleC extends ModuleC<GamingModuleS, null> {

    private myLoading: P_Loading;
    private calculatePoint: GameObject[];
    private calculate_Camera: Camera;
    private npc: Character;
    private lastLevelID: number = -1;                   // 上一个关卡ID
    /**飞扑次数 */
    private diveCount: number = 0;

    private laseGamingState: EGamingFsmType = EGamingFsmType.None;

    private enterGame: boolean = false;

    private playerExtentZ: number = 168;

    protected onStart(): void {
        GlobalData.levelEndCount_C = 0;

        this.myLoading = mw.UIService.create(P_Loading);

        Event.addLocalListener(GamingCtrlEventC2C.CTRL_GAMING_STATE_CHANGE_C2C, this.gamingStateChange);

        this.findCalculatePoint();

        GlobalData.playerQuitGameAc.add(this.playerQuiteGame.bind(this));
    }

    protected onEnterScene(sceneType: number): void {

        this.playerExtentZ = this.localPlayer.character.collisionExtent.z;

        let config = GameConfig.RuleGame.getElement(10024);
        GameObject.asyncFindGameObjectById(config.string_Value).then((go) => {
            this.calculate_Camera = go as Camera;
        })

        let npcGuid = GameConfig.RuleGame.getElement(10029);
        GameObject.asyncFindGameObjectById(npcGuid.string_Value).then((go) => {
            this.npc = go as Character;

            this.npc.asyncReady().then((go) => {
                this.npc.displayName = "";
                // 全部都在客户端改吧
                this.npc.complexMovementEnabled = false;
            })
        })
    }

    private async findCalculatePoint() {
        this.calculatePoint = [];
        for (let i = 1; i <= 12; i++) {
            let str = "淘汰结算看台/Point";
            if (i < 10) {
                str += "0";
            }
            str += i.toString();
            let point = await GameObject.asyncGetGameObjectByPath(str);
            this.calculatePoint.push(point);
        }
    }


    /**
     * 游戏状态变更，用的是属性同步后的广播，挂机就收不到，导致跳过状态，这里需要判断
     * @param state 游戏状态
     * @returns 
     */
    private gamingStateChange = async (state: EGamingFsmType) => {
        let pModuleC = ModuleService.getModule(PlayerModuleC);

        await pModuleC.playerReady();

        let pState = pModuleC.getPlayerState();

        if (this.laseGamingState == state) {
            // 不可能，但是还是加上
            console.error("gamingStateChange this.laseGamingState == state!!!!!!!!!!!!!!!!");
            return
        }
        // 如果就是下一个状态，直接切换
        if (this.laseGamingState + 1 == state || (this.laseGamingState == EGamingFsmType.Calculate && state == EGamingFsmType.Loading)) {
            this.gamingStateChange_Normal(state, pState);
            this.laseGamingState = state;
            return
        }

        // 如果是跳过了的状态，挨个再走一遍
        this.doNeedGamingState(state, pState);

    }

    /**
     * 挨个执行状态，间隔0.1s后执行下一个，直到跟同步的状态一致
     * @param state 
     * @param pState 
     */
    private async doNeedGamingState(state: EGamingFsmType, pState: EPlayerStateType) {
        let curState = this.laseGamingState;
        while (curState != state) {
            if (curState == EGamingFsmType.Calculate) {
                curState = EGamingFsmType.Loading;
            } else {
                curState++;
            }
            this.gamingStateChange_Normal(curState, pState);
            await TimeUtil.delaySecond(0.1);
        }
        this.laseGamingState = state;
    }

    /**
     * 常规状态变更
     * @param state 
     */
    private gamingStateChange_Normal(state: EGamingFsmType, pState: EPlayerStateType) {

        ModuleService.getModule(HUDModuleC).gamingStateChange(state, pState);

        ModuleService.getModule(PlayerModuleC).gamingStateChange(state);

        if (state == EGamingFsmType.Gaming) {

            MGSHome.gameStart(this.lastLevelID);
        }

        if (state == EGamingFsmType.Prepare) {
            if (this.lastLevelID) {
                let config = GameConfig.Level.getElement(this.lastLevelID);
                GameComUtils.playBGMByCfg(config.BgmId);//关卡BGM
                ModuleService.getModule(HUDModuleC).isShowBaseControl(true, pState);
            }
        }

        if (state == EGamingFsmType.Prepare && pState == EPlayerStateType.Normal) {
            ModuleService.getModule(PetModuleC).setRollCDTime();
        }
        if (state == EGamingFsmType.Gaming && pState == EPlayerStateType.Normal) {
            GameComUtils.play2DSoundByCfg(30002);//游戏开始音效
            // 只有在游戏中且玩家状态为正常时，才显示宠物操作UI
            ModuleService.getModule(PetModuleC).setPetCtrlUIVisible(true);
        }
        if (state == EGamingFsmType.Loading) {
            GameComUtils.playBGMByCfg(30011);//关卡筛选BGM

            //检测ai是否存在，存在则清理
            let aiArr = AIManager_C.Instance.FsmArr;
            if (aiArr.length > 0) {
                AIManager_C.Instance.rebackAllFsm();
            }

        }
    }

    public hideLoading() {
        if (!this.myLoading || !this.myLoading.visible) {
            return
        }
        mw.UIService.hideUI(this.myLoading);
    }

    public net_enterLoadingState(levelID: number) {
        this.lastLevelID = levelID;
        this.enterGame = true;
        // 清理记录点
        Event.dispatchToLocal(TrapEventC2C.TRAP_CLEAN_RECORD_C2C);
        // 显示UI
        mw.UIService.showUI(this.myLoading, mw.UILayerMiddle, levelID);
    }

    // 游戏结束
    public net_GameOver() {
        ModuleService.getModule(HUDModuleC).gameOver();
        setTimeout(() => {
            this.playerQuiteGame();
        }, 1000);
    }
    /**玩家独自返回大厅方法 */
    public playerQuiteGame() {
        // 首轮获胜
        let isFirstRoundWin = ModuleService.getModule(PlayerModuleC).checkFirstRoundWin();
        ModuleService.getModule(MGSModuleC).jumpToHall(isFirstRoundWin);

        try {
            let status = ModuleService.getModule(PlayerModuleC).getInGameStatus();
            oTrace('guan log playerQuiteGame status', status);
            let data = new GameToHallDataManager(status, this.diveCount).encode();
            let gameId: string = GlobalData.HallRoom_GameId;
            // let playerSync = PlayerSync.PlayerSyncMap_Client.get(Player.localPlayer.playerId);
            // if (playerSync && playerSync.LeaderId != "0") {
            //     let userId = Player.localPlayer.userId
            //     if (playerSync.LeaderId == userId) {
            //         this.server.net_JumpGameByTeam(userId, gameId);
            //         return
            //     }
            // }
            JumpGameHelper.enterGameClient(gameId, data);
        } catch (error) {
            console.error("playerQuiteGame error:", error);
        }
    }
    /**gm_获胜会大厅 */
    public gm_backToHall() {
        try {
            let status = InGameStatus.Winner;
            let data = new GameToHallDataManager(status).encode();
            let gameId: string = GlobalData.HallRoom_GameId;
            JumpGameHelper.enterGameClient(gameId, data);
        } catch (error) {
            console.error("playerQuiteGame error:", error);
        }
    }
    // 进入结算
    public async net_enterCalculateState(pidList: number[], pNameList: string[], winList: number[], levelID: number, levelEndCount: number) {
        oTrace('guan log net_enterCalculateState pidList:', pidList, "pNameList:", pNameList, "winList:", winList, "levelID:", levelID, "levelEndCount:", levelEndCount);

        GlobalData.levelEndCount_C = levelEndCount;
        let config = GameConfig.Level.getElement(levelID);
        ModuleService.getModule(HUDModuleC).startCalculate(winList.length, levelEndCount == 2 ? 1 : config.winNum);

        ModuleService.getModule(PetModuleC).setPetCtrlUIVisible(false);
        ModuleService.getModule(HUDModuleC).isShowBaseControl(false);

        GameComUtils.play2DSoundByCfg(30005);//游戏结束音效

        let playEffectTimer = (GlobalData.calculateChangeUITimer * 0.5);
        oTrace('guan log net_enterCalculateState playEffectTimer', playEffectTimer);
        await TimeUtil.delaySecond(playEffectTimer);
        // 第一轮结算
        if (levelEndCount == 1) {
            GameComUtils.playBGMByCfg(30010);//第一轮结算BGM
            // TODO AI结算
            this.aiCalculate(pidList.length);
            this.firstCalculate(pidList, winList);
            return
        }
        GameComUtils.playBGMByCfg(30008);//第二轮结算BGM
        // 第二轮结算
        this.secondCalculate(pidList, pNameList, winList);
        // TODO 停止所有AI
        AIManager_C.Instance.rebackAllFsm();
    }


    private aiCalculate(playerCount: number) {
        let fsmArr = AIManager_C.Instance.FsmArr;
        // for (let i = 0; i < fsmArr.length; i++) {
        //     let trans = this.calculatePoint[playerCount + i].worldTransform;
        //     fsmArr[i].changeState(stateType.Calculate, trans.position, trans.rotation);
        // }

        let changeAI = 0;
        let startIndex = playerCount;
        for (let i = startIndex; i < this.calculatePoint.length; i++) {
            if (changeAI >= fsmArr.length) {
                break;
            }
            let trans = this.calculatePoint[i].worldTransform;
            fsmArr[changeAI].changeState(stateType.Calculate, trans.position, trans.rotation);
            changeAI++;
        }

    }

    private firstCalculate(pidList: number[], winList: number[]) {
        let lightConfig = GameConfig.RuleGame.getElement(10040);
        GameEnvCfgUtils.changeSkyBox(lightConfig.int_Value);

        // 停止宠物状态机
        ModuleService.getModule(PlayerModuleC).stopAniFSM();

        let selfIndex = pidList.indexOf(this.localPlayerId);
        let vec = ClassInstance.newc<Vector>(Vector);
        vec.x = this.calculatePoint[selfIndex].worldTransform.position.x;
        vec.y = this.calculatePoint[selfIndex].worldTransform.position.y;
        vec.z = this.calculatePoint[selfIndex].worldTransform.position.z + 50 + this.playerExtentZ / 2;

        let rot = this.calculatePoint[selfIndex].worldTransform.rotation;

        let isWin = winList.includes(this.localPlayerId);

        // 切换到结算相机点
        let firstPot = GameConfig.RuleGame.getElement(10025).vector3_Value;
        let firstRot = new Rotation(GameConfig.RuleGame.getElement(10026).vector3_Value);

        this.calculate_Camera.springArm.worldTransform.position = firstPot;
        this.calculate_Camera.springArm.worldTransform.rotation = firstRot;
        Camera.switch(this.calculate_Camera);
        // 清空全部冲量
        this.localPlayer.character.complexMovementEnabled = false;
        // 玩家换为平台形象
        mw.AccountService.downloadData(this.localPlayer.character, () => {
            let charType = this.localPlayer.character.description.advance.base.characterSetting.somatotype;
            let isFemal = true;
            if (charType == mw.SomatotypeV2.LowpolyAdultMale || charType == mw.SomatotypeV2.AnimeMale) {
                isFemal = false;
            }
            let basicStance = this.localPlayer.character.loadStance(isFemal ? "30274" : "39317");
            basicStance.play();
            this.localPlayer.character.syncDescription();

            this.localPlayer.character.complexMovementEnabled = true;

            this.localPlayer.character.movementEnabled = false;
            this.localPlayer.character.jumpEnabled = false;
            this.localPlayer.character.worldTransform.position = vec;
            this.localPlayer.character.worldTransform.rotation = rot;
            if (isWin) {
                this.playWinAni();
            } else {
                this.playPlayerLoseAni();
            }
            ClassInstance.delete(vec);
        });
    }


    // 获胜动画
    private playWinAni() {
        let aniconfig = GameConfig.RuleGame.getElement(10013);
        PlayerManagerExtesion.rpcPlayAnimation(this.localPlayer.character, aniconfig.string_Value, 1, aniconfig.float_Value);
        GameComUtils.play2DSoundByCfg(30007);//胜利音效
    }

    // 失败动画
    private playPlayerLoseAni() {
        let aniconfig = GameConfig.RuleGame.getElement(10023);
        GameComUtils.playLoseAni(this.localPlayer.character,
            () => {
                PlayerManagerExtesion.rpcPlayAnimation(this.localPlayer.character, aniconfig.string_Value, 0, aniconfig.float_Value);
                GameComUtils.play2DSoundByCfg(30006);//淘汰音效
            }, () => {
                PlayerManagerExtesion.rpcStopAnimation(this.localPlayer.character, aniconfig.string_Value)
                ModuleService.getModule(HUDModuleC).firstLose();
            })
    }

    private secondCalculate(pidList: number[], pNameList: string[], winList: number[]) {
        oTrace('guan log secondCalculate pidList:', pidList, "pNameList:", pNameList, "winList:", winList);
        if (!winList || winList.length != 1) {
            console.error("secondCalculate error！！！！, winList:", winList);
            return
        }
        if (!pidList || !pNameList || pidList.length != pNameList.length) {
            console.error("secondCalculate error！！！！, pidList:", pidList, "pNameList", pNameList);
            return
        }
        let winPlayerID = winList[0];
        if (!pidList.includes(winPlayerID)) {
            console.error("secondCalculate error！！！！, pidList not found winPlayerID.pidList:", pidList, "winPlayerID", winPlayerID);
            return
        }

        let lightConfig = GameConfig.RuleGame.getElement(10041);
        GameEnvCfgUtils.changeSkyBox(lightConfig.int_Value);

        let winnerName = pNameList[pidList.indexOf(winPlayerID)];

        // 切换到夺冠相机
        let secondPos = GameConfig.RuleGame.getElement(10027).vector3_Value;
        let secondRot = new Rotation(GameConfig.RuleGame.getElement(10028).vector3_Value);

        this.calculate_Camera.springArm.worldTransform.position = secondPos;
        this.calculate_Camera.springArm.worldTransform.rotation = secondRot;
        Camera.switch(this.calculate_Camera);
        //隐藏基础ui
        ModuleService.getModule(HUDModuleC).setWatchUIVisible(false);

        let isWin = winPlayerID == this.localPlayerId;
        // 赢的人换NPC
        if (isWin) {

            let winPos = GameConfig.RuleGame.getElement(10030).vector3_Value;
            let winRot = new Rotation(GameConfig.RuleGame.getElement(10031).vector3_Value);

            mw.AccountService.downloadData(this.npc, () => {
                this.npc.syncDescription();
            })
            // ModuleService.getModule(PetModuleC).changeState(true, FourPlayerState.IdleState);
            ModuleService.getModule(PetModuleC).fourPlayerFsm(false);

            // 清空全部冲量
            this.localPlayer.character.complexMovementEnabled = false;

            this.localPlayer.character.movementEnabled = false;
            this.localPlayer.character.jumpEnabled = false;
            setTimeout(() => {
                this.localPlayer.character.complexMovementEnabled = true;
                this.localPlayer.character.worldTransform.position = winPos;
                this.localPlayer.character.worldTransform.rotation = winRot;
            }, 10);

            this.localPlayer.character.displayName = "";
            // 赢的人播放动画
            this.playPlayerWinAni();

        } else {
            let pos = GameConfig.RuleGame.getElement(10032).vector3_Value;
            this.localPlayer.character.worldTransform.position = GameComUtils.getRandomPoint(pos, new Vector2(400, 400));
            // 把获胜玩家名字隐藏
            Player.asyncGetPlayer(winPlayerID).then((go) => {
                go.character.displayName = "";
            })
        }
        this.playNpcWinAni();

        let petID = ModuleService.getModule(PlayerModuleC).getPlayerPetConfigID(winPlayerID);
        let isInTeam: boolean = false;
        if (PlayerSync.PlayerSyncMap_Client.has(Player.localPlayer.playerId)) {
            let playerSy = PlayerSync.PlayerSyncMap_Client.get(Player.localPlayer.playerId);
            if (!playerSy) {
                console.error("=============>>>>>> playerSy is null", playerSy);
                return
            }
            isInTeam = playerSy.LeaderId != "0";
        }
        UIService.show(P_Champion, winnerName, petID, isInTeam);

    }
    // 玩家还是四足，播放的是宠物动画
    private async playPlayerWinAni() {
        // await TimeUtil.delaySecond(1);
        let playerAniConfig = GameConfig.RuleGame.getElement(10033);
        let aniIndex = 0;
        let aniGuid = playerAniConfig.stringArray_Value[aniIndex];
        PlayerManagerExtesion.rpcPlayAnimation(this.localPlayer.character, aniGuid);
        aniIndex++;
        TimeUtil.setInterval(() => {
            aniGuid = playerAniConfig.stringArray_Value[aniIndex];
            // if (curAni != null) {
            //     PlayerManagerExtesion.rpcStopAnimation(this.localPlayer.character, curAni.guid)
            // }

            PlayerManagerExtesion.rpcPlayAnimation(this.localPlayer.character, aniGuid);
            oTrace('guan log 玩家播放胜利动画', aniGuid);

            aniIndex++;
            aniIndex = aniIndex % playerAniConfig.stringArray_Value.length;
        }, playerAniConfig.float_Value)
    }
    // 因为需要其他玩家同步，这里延迟
    private async playNpcWinAni() {
        await TimeUtil.delaySecond(1);
        // npc播放动画，直接走本地，不需要同步
        let npcAniConfig = GameConfig.RuleGame.getElement(10034);
        let aniIndex = 0;
        let curAni = null;
        TimeUtil.setInterval(() => {
            let aniGuid = npcAniConfig.stringArray_Value[aniIndex];
            if (curAni != null) {
                curAni.stop();
            }
            curAni = this.npc.loadAnimation(aniGuid)
            curAni.play();
            oTrace('guan log npc播放胜利动画', aniGuid);


            aniIndex++;
            aniIndex = aniIndex % npcAniConfig.stringArray_Value.length;
        }, npcAniConfig.float_Value)

    }

    /**
     * 增加飞扑使用次数
     */
    public incrDiveCount() {
        this.diveCount++;
        this.server.net_incrDiveCount();
    }
    /**
     * 是否已经开始游戏
     */
    public getEnterGaming() {
        return this.enterGame;
    }

}