/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-03 10:35:55
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2024-01-24 11:25:30
 * @FilePath     : \petparty\JavaScripts\modules\playerModule\PlayerModuleC.ts
 * @Description  : 修改描述
 */
import { oTrace } from "odin";
import EmojiScript from "../../EmojiPlate/EmojiScript";
import { GameConfig } from "../../config/GameConfig";
import { EGamingFsmType, EPlayerStateType, InGameStatus } from "../../const/Enum";
import { GameEventC2C } from "../../const/GameCommonEvent";
import GamingModuleC from "../gamingModule/GamingModuleC";
import { HallToGameDataManager } from "../jumpGame/JumpGameHelper";
import LoginModuleC from "../loginModule/LoginModuleC";
import { PetModuleC } from "../petModule/PetModuleC";
import { SuitInfo } from "../petModule/PetModuleData";
import { FourPlayerState } from "../petModule/fourPlayerFSM/FourPlayerFSM";
import PlayerModuleS from "./PlayerModuleS";
import PlayerSync from "./PlayerSync";

export default class PlayerModuleC extends ModuleC<PlayerModuleS, null> {
    // private defaultPlayerId: string = "159749";
    private configId: number = -1;
    private suit: number[];

    private isAnimal: boolean = false;
    private camera: Camera;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        SystemUtil.onPause.add(() => {
            this.server.net_PlayerPause();
        });

        SystemUtil.onResume.add(() => {
            this.server.net_PlayerResume();
        });
    }

    protected async onEnterScene(sceneType: number) {
        await this.playerReady();
        EmojiScript.instance.setGetEmojiInfoFunc(this.getEmojoInfo.bind(this));
        EmojiScript.instance.getCanPlayChatFunc = this.canPlayEmojiAction.bind(this);
        this.resetPlayerSpeed();
        this.localPlayer.character.collisionWithOtherCharacterEnabled = false;

        Event.addLocalListener(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, (value: number) => {
            // 修改玩家最大移动速度
            this.changePlayerSpeed(value);
        })

        Event.addLocalListener(GameEventC2C.GAME_RESET_MAXWALKSPEED_C2C, () => {
            // 重置玩家最大移动速度
            this.resetPlayerSpeed();
        })

        GameObject.asyncFindGameObjectById("1454F46A").then((go) => {
            this.camera = go as Camera;
        })

        if (!SystemUtil.isPIE) {
            oTrace('guan log PlayerModuleC onEnterScene 开始读取getGameCarryingData', this.localPlayerId);
            let data = await RouteService.getGameCarryingData();
            oTrace('guan log PlayerModuleC getGameCarryingData data', data);

            if (data) {
                const hallToGameData = HallToGameDataManager.decode(data);
                this.configId = hallToGameData.petId;
                this.suit = [hallToGameData.Back, hallToGameData.Shoulder, hallToGameData.Tail, hallToGameData.Effect, hallToGameData.Head];
                const petLevels = [hallToGameData.SprintAccelLv, hallToGameData.SprintDurationLv, hallToGameData.SprintMaxSpeedLv,
                hallToGameData.SprintCdLv, hallToGameData.MoveMaxSpeedLv, hallToGameData.MoveAccelLv];
                this.setPetLevelAttr(petLevels);
                oTrace('guan log hallToGameData.clothId', hallToGameData.petId);
            } else {
                // 
                console.error("PlayerModuleC getGameCarryingData data is null, 需要等服务器同步")
                return;
                this.configId = 10001;
                this.suit = new Array(5);
            }
        } else {
            // PIE用默认的
            this.configId = 10001;
            this.suit = [10004, null, 30001, null, null]//new Array(5);
        }

        this.changeToAnimal();
        this.server.net_SetPlayerPetID(this.configId);
    }

    private getEmojoInfo(id: number) {
        return GameConfig.Chat.getElement(id);
    }

    private canPlayEmojiAction() {
        return ModuleService.getModule(PetModuleC).getCurState() == FourPlayerState.IdleState;
    }

    public async net_playerJumpGameByServer(cfgId: number, suit: number[], petLevels: number[]) {
        // 服务器过来的时候，可能还没准备好
        this.configId = cfgId;
        this.suit = suit;
        this.setPetLevelAttr(petLevels);
        this.changeToAnimal();

        await this.playerReady();
        this.server.net_SetPlayerPetID(this.configId);
    }

    /**等待player初始化完成和pet初始化完成的时候调用 */
    public async changeToAnimal() {
        if (this.configId == -1) {
            console.error('guan log changeToAnimal this.configId == -1');
            return;
        }
        await this.playerReady();

        let petModuleC = ModuleService.getModule(PetModuleC);
        await petModuleC.waitInitReady();
        // if (this.isAnimal) return;
        // this.isAnimal = true;
        // GameComUtils.changeCharacterToAnimal(this.localPlayer.character, this.configId);
        let info = new SuitInfo();
        info.petId = this.configId;
        info.suit = this.suit.slice();
        ModuleService.getModule(PetModuleC).fourPlayerFsm(true, info);
    }

    public getPlayerName(playerId: number) {
        let info = PlayerSync.PlayerSyncMap_Client.get(playerId);
        if (!info) {
            return "";
        }
        return info.playerName;
    }

    /**
     * 设置宠物等级属性
     */
    private setPetLevelAttr(petLevels: number[]) {
        ModuleService.getModule(PetModuleC)?.setPetLevelAttr(petLevels);
    }

    private initPlayerDone = (character: Character) => {
        ModuleService.getModule(LoginModuleC).readyLogin();
        // this.localPlayer.character.onDescriptionComplete.remove(this.initPlayerDone);
        // this.localPlayer.character.onDescriptionComplete.add(() => {
        //     this.localPlayer.character.syncDescription();
        // })

    }

    private mySyncPlayer: PlayerSync = null;
    private get curSyncPlayer() {
        if (this.mySyncPlayer == null) {
            this.mySyncPlayer = PlayerSync.PlayerSyncMap_Client.get(this.localPlayerId);
        }

        return this.mySyncPlayer;
    }

    public async playerReady() {
        if (this.curSyncPlayer != null) {
            return
        }
        return new Promise<void>((resolve, reject) => {
            let key = setInterval(() => {
                if (this.curSyncPlayer != null) {
                    clearInterval(key);
                    console.error("PlayerModuleC found player script");
                    resolve();
                }
            }, 10)
        });
    }
    public getPlayerState() {
        return this.curSyncPlayer.getPlayerState;
    }

    // 玩家是否获胜
    public checkIsWin(): boolean {
        return this.curSyncPlayer.getPlayerState == EPlayerStateType.Win;
    }
    // 玩家是否被淘汰
    public checkIsLose(): boolean {
        return this.curSyncPlayer.getPlayerState == EPlayerStateType.Lose;
    }

    public checkFirstRoundWin(): boolean {
        return this.curSyncPlayer.getFirstRoundWin;
    }

    public checkSecondRoundWin(): boolean {
        return this.curSyncPlayer.getSecondRoundWin;
    }

    /**
     * 游戏状态变更，只处理准备状态，如果玩家是normal状态，就变身
     * @param state 
     * @returns 
     */
    public gamingStateChange(state: EGamingFsmType) {
        if (state != EGamingFsmType.Prepare) {
            return;
        }
        if (this.curSyncPlayer.getPlayerState != EPlayerStateType.Normal) {
            return;
        }
        this.localPlayer.character.movementEnabled = true;
        this.localPlayer.character.jumpEnabled = true;

        // 准备阶段变身
        this.changeToAnimal();

    }

    /**停止四足状态机 */
    public stopAniFSM() {
        // this.isAnimal = false;
        ModuleService.getModule(PetModuleC).fourPlayerFsm(false);
    }
    /**
     * 获取玩家宠物配置id
     * @param playerID 
     * @returns 
     */
    public getPlayerPetConfigID(playerID: number) {
        let playerSync = PlayerSync.PlayerSyncMap_Client.get(playerID);
        if (playerSync == null) return -1;
        return playerSync.getPetId;
    }

    //以宠物的为基准玩家是增量
    private baseWalkSpeed: number = GameConfig.PetStat.getElement(10001).Value;

    /**
 * 修改玩家速度
 * @param value 修改值
 */
    private changePlayerSpeed(value: number) {
        let speed = Player.localPlayer.character.maxWalkSpeed + value;
        if (speed < this.baseWalkSpeed) {
            speed = this.baseWalkSpeed;
        }
        Player.localPlayer.character.maxWalkSpeed = speed;
    }

    // 重置玩家最大速度
    public resetPlayerSpeed() {
        Player.localPlayer.character.maxWalkSpeed = this.baseWalkSpeed;
    }

    public getInGameStatus(): InGameStatus {
        if (!this.curSyncPlayer) return -1;
        /**没进入关卡是不会获得奖励的 */
        if (!ModuleService.getModule(GamingModuleC).getEnterGaming()) {
            return InGameStatus.None;
        }
        // 夺冠
        if (this.curSyncPlayer.getSecondRoundWin) {
            return InGameStatus.Winner;
        }

        // 第一轮晋级
        if (this.curSyncPlayer.getFirstRoundWin) {
            return InGameStatus.SecondOut;
        }

        // 没赢过
        return InGameStatus.FirstOut;
    }
}