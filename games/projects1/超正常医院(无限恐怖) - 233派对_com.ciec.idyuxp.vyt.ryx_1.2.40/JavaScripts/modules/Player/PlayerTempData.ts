
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { PlayerCurState, PlayerRace } from "../../const/enum";
import { GameModule_Client } from "../GameHud/GameModule";
import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import Struggle_Generate from "../../ui-generate/GameHUD/Struggle_generate";
import { P_HUD } from "../GameHud/UI/P_HUD";
import P_PropBar from "../Bag/P_PropBar";
import { HeadTitle } from "./HeadTitle";
import { P_RulesTips } from "./UI/P_RulesTips";
import BagModuleC from "../Bag/BagModuleC";

const dead_Male_EffId: string = "157254";
const dead_Female_EffId: string = "157253";

/**
 * 玩家临时属性脚本
 * 
 */
@Component
export default class PlayerTempData extends Script {

    @Property({ replicated: true, multicast: true, onChanged: "onScriptComplete" })
    private _playerId: number = 0;

    @Property({ replicated: true, multicast: true, onChanged: "playerHpChanged" })
    private _curHp: number = 0;

    @Property({ replicated: true, multicast: true, onChanged: "playerStateChange" })
    private _playerState: PlayerCurState = PlayerCurState.Alive;
    /**解救人数 */
    @Property({ replicated: true, multicast: true, onChanged: "onSaveCountChange" })
    private _saveCount: number = 0;



    /**玩家是否在安全区域 */
    @Property({ replicated: true, multicast: true })
    private _isInSafeArea: boolean = false;

    // private deadAni: mw.Animation = null;

    public get isInSafeArea(): boolean {
        return this._isInSafeArea;
    }
    public set isInSafeArea(safe: boolean) {
        this._isInSafeArea = safe;
    }

    public get saveCount(): number {
        return this._saveCount;
    }


    /**玩家是否是下蹲状态 */
    private _isCrouch: boolean = false;
    public get isCrouch(): boolean {
        return this._isCrouch;
    }
    public set isCrouch(crouch: boolean) {
        this._isCrouch = crouch;
    }

    public get PlayerId(): number {
        return this._playerId;
    }

    public get CurHp(): number {
        return this._curHp;
    }

    public get PlayerState(): PlayerCurState {
        return this._playerState;
    }
    public set PlayerState(state: PlayerCurState) {
        this._playerState = state;
        if (this._playerState == PlayerCurState.Alive) {
            this._saveCount = 0;
        }
    }



    //#region  Client ******************

    // private curEffId: number = null;
    private gameModuleC: GameModule_Client = null;
    private lastPlayerHp: number = null;
    private scriptPlayer: Player = null;
    private curPlayer: Player = null;


    /**趴下姿态 */
    private climbSub: mw.SubStance = null;

    /**描边延迟 */
    private outLineTimeOut: any = null;

    /**血条UI */
    private bloodUI: HeadTitle = null;
    /**虚弱触发器 */
    private weakTrigger: mw.Trigger = null;

    /**
    * 脚本初始化完成
    */
    private async onScriptComplete() {

        Player.asyncGetPlayer(this.PlayerId).then((player) => {
            this.scriptPlayer = player;
            let height = player.character.getBoundingBoxExtent();
            let Z = height.z - 200;
            let loc = player.character.overheadUI.localTransform.position;
            if (Z > 0) {
                console.warn(`lwj Z 为正数${loc.z}  Z = ${Z}`);
                loc.z += Z;
                player.character.overheadUI.localTransform.position = loc;
            }
        });
        Player.asyncGetLocalPlayer().then((player) => {
            this.curPlayer = player;
            if (player.playerId == this.PlayerId) {
                GlobalData.curPlayerData = this;
            }
        });

    }

    private playerHpChanged() {
        if (!Player.localPlayer) return;
        if (this.bloodUI) {
            this.bloodUI.updateBlood(this._curHp);
        }
        if (this._playerId != Player.localPlayer.playerId) {
            return;
        }
        if (!this.gameModuleC) {
            this.gameModuleC = ModuleService.getModule(GameModule_Client);
        }
        if (!GlobalData.curPlayerData) {
            GlobalData.curPlayerData = this;
        }

        if (this.lastPlayerHp == null) {
            this.lastPlayerHp = this._curHp;
            return;
        }
        // if (this.lastPlayerHp > this._curHp) {
        //     // 扣血
        //     GlobalData.PlayerAttribute.playerIsHurt_C.call();
        // } else {
        //     // 加血
        //     GlobalData.PlayerAttribute.playerIsCure_C.call()
        // }
        // 如果玩家hp小于30，设置后处理饱和度

        if (this._curHp > 70) {
            PostProcess.saturation = (this._curHp / 70) * GlobalData.Environment.defaultGlobalSaturation;
        } else {
            if (this.lastPlayerHp < 70) {
                PostProcess.saturation = GlobalData.Environment.defaultGlobalSaturation;
            }
        }
        this.lastPlayerHp = this._curHp;

    }


    private async playerStateChange() {
        console.log("玩家状态改变------", this._playerState);
        ActionCommon.onPlayerCurStateChange.call(this._playerState, this._playerId);
        switch (this._playerState) {
            case PlayerCurState.Alive:
                await this.playerRevive();
                break;
            case PlayerCurState.Survive:
                this.playerSurvive();
                break;
            case PlayerCurState.Weak:
                await this.playerWeak();
                break;
            case PlayerCurState.Mutant:
                this.playerMutant();
                break;
            default:
                break;
        }
    }



    @RemoteFunction(mw.Client)
    public setInteract_C(player: Player, isInteract: boolean) {
        UIService.getUI(P_Game_HUD).setBtnVisible(isInteract);
        if (isInteract) {
            console.warn(`lwj 开启交互显示`);
            UIService.getUI(P_PropBar).show();
            UIService.getUI(P_HUD).setInter(true);
            UIService.getUI(Struggle_Generate).hide();
        } else {
            UIService.getUI(P_PropBar).hide();
            UIService.getUI(P_HUD).setInter(false);
            UIService.getUI(Struggle_Generate).show();
        }
    }
    /**求生状态 */
    private playerSurvive() {
        this.bloodUI?.setVisible(false);
        this.removeTrigger();
        this.standUp();
        if (this.scriptPlayer != this.curPlayer) return;
        UIService.getUI(P_Game_HUD).setSurvivalTime();
        this.setUIState();
    }



    /**玩家虚弱 */
    private async playerWeak() {
        let player = await Player.asyncGetPlayer(this.PlayerId);
        if (!player) return;
        let char = player.character;
        if (!char) return;
        if (this.scriptPlayer == this.curPlayer) {
            ModuleService.getModule(BagModuleC).onUnequipProp.call();
            this.setUIState();
            console.warn(`lwj 当前玩家虚弱`);
        }
        if (!this.bloodUI) {
            this.bloodUI = new HeadTitle(this.scriptPlayer.character);
        }

        this.bloodUI.updateBlood(0);
        this.bloodUI.setVisible(true);
        this.playerClimb(char);
        this.addTrigger(char);
        console.warn(`lwj 添加触发器`);
    }

    /**玩家爬 */
    private playerClimb(char: mw.Character) {
        this.climbSub = char.loadSubStance("285826");
        setTimeout(() => {
            this.climbSub.play();
        }, 100);
    }

    /**玩家变身 */
    private playerMutant() {
        this.removeTrigger();
        this.bloodUI.setVisible(false);
        this.standUp();
        if (this._playerId != Player.localPlayer.playerId) return;
        UIService.getUI(P_Game_HUD).clearSurvivalTime();
        this.setUIState()
    }

    /**起身 */
    private standUp() {
        if (this.climbSub) {
            this.climbSub.stop();
            this.climbSub = null;
        }
    }
    /**添加触发器 */
    private addTrigger(char: Character) {
        if (this.weakTrigger) {
            this.weakTrigger.enabled = true;
            console.warn(`lwj 开启虚弱触发器`);
            return;
        }
        GameObjPool.asyncSpawn("Trigger", GameObjPoolSourceType.Asset).then((obj) => {
            this.weakTrigger = obj as mw.Trigger;
            this.weakTrigger.parent = char;
            this.weakTrigger.localTransform.position = new mw.Vector(0, 0, 0);
            this.weakTrigger.localTransform.rotation = new mw.Rotation(0, 0, 0);
            this.weakTrigger.localTransform.scale = GlobalData.NPC.npcScal;
            this.weakTrigger.onEnter.add((obj) => {
                if (obj instanceof mw.Character == false) {
                    return false;
                }
                let player = (obj as mw.Character).player;
                if (player == this.scriptPlayer) return;
                if (player == Player.localPlayer) {
                    console.warn(`lwj jinru chufaqi `);
                    ModuleService.getModule(GameModule_Client).addRescuePlayer(true, this._playerId);
                }
            });
            this.weakTrigger.onLeave.add((obj) => {
                if (obj instanceof mw.Character == false) {
                    return false;
                }
                let player = (obj as mw.Character).player;
                if (player == this.scriptPlayer) return;
                if (player == Player.localPlayer) {

                    ModuleService.getModule(GameModule_Client).addRescuePlayer(false, this._playerId);
                }
            });
        });
    }
    /**移除触发器 */
    private removeTrigger() {
        if (this.weakTrigger) {
            console.warn(`lwj 触发器不了用`);
            this.weakTrigger.enabled = false;
        }
    }

    private async playerRevive() {
        this.bloodUI?.setVisible(false);
        this.removeTrigger();
        this.standUp();
        if (this.scriptPlayer != this.curPlayer) return;

        GlobalData.PlayerAttribute.curPlayerState = PlayerCurState.Alive;
        this.setUIState();
        UIService.getUI(P_Game_HUD).clearSurvivalTime();

    }


    private setUIState() {
        let hudUI = UIService.getUI(P_Game_HUD);
        if (this._playerState == PlayerCurState.Weak) {
            hudUI.setSprintStealthVis(false);
            hudUI.setBtnVisible(false);
            UIService.getUI(Struggle_Generate).hide();
            UIService.getUI(P_PropBar).hide();
            console.warn(`lwj 隐藏`);
        }
        if (this._playerState == PlayerCurState.Alive) {
            UIService.getUI(P_PropBar).show();
            console.warn(`lwj 显示道具栏`);
            UIService.getUI(P_HUD).setInter(true);
            hudUI.setBtnVisible(true);
            hudUI.setSprintStealthVis(true);
            //生存 拯救 感染
            hudUI.setSurvivalUIVis(false)
            hudUI.setKillUIVis(false);
            hudUI.setRescueUIVis(false);
        }
        if (this._playerState == PlayerCurState.Survive) {
            UIService.getUI(P_PropBar).show();
            console.warn(`lwj 显示道具栏`);
            hudUI.setStealthVis(false);
            hudUI.setBtnVisible(true);
            hudUI.setSprintVis(true);
            //生存 拯救 感染
            hudUI.setSurvivalUIVis(true)
            hudUI.setKillUIVis(false);
            hudUI.setRescueUIVis(true);
        }
        if (this._playerState == PlayerCurState.Mutant) {
            hudUI.setSprintVis(true);
        }

    }

    @RemoteFunction(Client, Multicast)
    private openOutLine_C() {
        if (this.outLineTimeOut) {
            this.clearOutLine();
        }
        let player = Player.getPlayer(this.PlayerId);
        if (!player) return;
        let char = player.character;
        if (char) {
            //引导
            char.setPostProcessOutline(true, GlobalData.PlayerAttribute.OutlineColor, GlobalData.PlayerAttribute.OutlineWidth);
            this.outLineTimeOut = setTimeout(() => {
                char.setPostProcessOutline(false);
                this.outLineTimeOut = null;
            }, GlobalData.PlayerAttribute.OutlineTime * 1000);
        }
    }

    private clearOutLine() {
        if (this.outLineTimeOut) {
            clearTimeout(this.outLineTimeOut);
            this.outLineTimeOut = null;
        }
    }


    private onSaveCountChange() {
        if (this._playerId != this.curPlayer.playerId) {
            return;
        }
        UIService.getUI(P_Game_HUD).setRescueNum(this._saveCount);
    }

    //#endregion  ****************Client **************

    //#region  ----------------- Server ----------------


    public init_S(playerId: number, hp: number) {
        this._playerId = playerId;
        this._curHp = hp;
    }

    public changeHp_S(value: number) {
        this._curHp += value;
        if (this._curHp >= 100) {
            this._curHp = 0;
            this.playerDead_S();
        } else if (this._curHp <= 0) {
            this._curHp = 0;
        }
    }

    public savePlayer() {
        this._saveCount++;
    }

    private timeout: any = null;

    private playerDead_S() {
        this.PlayerState = PlayerCurState.Mutant;
        let player = Player.getPlayer(this.PlayerId);
        if (!player) {
            console.error(" playerDead_S 找不到当前玩家", this.PlayerId);
            return;
        }
        //开始变身
        GlobalData.PlayerAttribute.playerStateChanged_S.call(this.PlayerId, this.PlayerState)
    }
    private clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    public playerRevive_S() {
        this._curHp = GlobalData.PlayerAttribute.maxHp;
        this._playerState = PlayerCurState.Alive;

        let player = Player.getPlayer(this.PlayerId);
        if (!player) {
            console.error(" playerRevive_S 找不到当前玩家", this.PlayerId);
            return;
        }
        this.clearTimeout();

        GlobalData.PlayerAttribute.playerStateChanged_S.call(this.PlayerId, this.PlayerState)
    }

    public setInteract(playerId: number, isInteract: boolean) {
        // let player = Player.getPlayer(playerId);
        // this.setInteract_C(player, isInteract);
    }

    /**开启描边 */
    public openOutLine_S() {
        this.openOutLine_C();
    }



    //#endregion  ----------------- Server ----------------



}