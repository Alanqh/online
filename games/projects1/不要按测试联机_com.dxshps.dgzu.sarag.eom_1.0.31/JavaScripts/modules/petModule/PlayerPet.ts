import { GameConfig } from "../../config/GameConfig";
import { PropModuleS } from "../propModule/PropModuleS";
import { PetPendant } from "./PetDress";
import { PetModuleC } from "./PetModuleC";
import { PetEnableData } from "./PetModuleS";
import { DeathState } from "./fourPlayerFSM/DeathState";
import { FallState } from "./fourPlayerFSM/FallState";
import { FlyState } from "./fourPlayerFSM/FlyState";
import { FourPlayerFSM, FourPlayerState, animData } from "./fourPlayerFSM/FourPlayerFSM";
import { HitRecoverState } from "./fourPlayerFSM/HitRecoverState";
import { HitState } from "./fourPlayerFSM/HitState";
import { HoverState } from "./fourPlayerFSM/HoverState";
import { IdleState } from "./fourPlayerFSM/IdleState";
import { RollState } from "./fourPlayerFSM/RollState";
import { RunState } from "./fourPlayerFSM/RunState";

@Component
export default class PlayerPet extends Script {
    @mw.Property({ replicated: true, onChanged: "onEnableDataChanged" })
    public enableData: PetEnableData = { enable: false, suitInfo: null };
    @mw.Property({ replicated: true })
    public playerName: string = "";
    /**绑定角色id（只能初始化改一次） */
    @mw.Property({ replicated: true, onChanged: "onPlayerIdChanged" })
    public playerId: number = -1;

    /**无敌 */
    @mw.Property({ replicated: true })
    public isGod: boolean = false;

    /**是否可以同步 */
    private isReady: boolean = false;
    /**动画状态机 */
    public fourPlayerFSM: FourPlayerFSM;
    /**模块客户端 */
    private _petModule: PetModuleC;
    /**是否为自己脚本 */
    private _isSelf: boolean = false;
    //换装脚本
    private _petPendant: PetPendant;
    /**是否初始化（防止二次初始化） */
    private isInit: boolean = false;


    private get _followTarget(): mw.Character {
        return this.gameObject as mw.Character;
    };

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    onPlayerIdChanged() {
        this.initClient();
    }


    async initClient() {
        if (this.isInit) return;
        this.isInit = true;

        await ModuleService.ready();
        let player = await Player.asyncGetLocalPlayer();
        await Player.asyncGetPlayer(this.playerId);
        //换装类
        this._petPendant = new PetPendant(this._followTarget, this.playerName);
        if (this.playerId == Player.localPlayer.playerId) {
            this.fourPlayerFSM = new FourPlayerFSM();
            this.fourPlayerFSM.init(player.character);
            this.fourPlayerFSM.registerState(FourPlayerState.IdleState, new IdleState());
            this.fourPlayerFSM.registerState(FourPlayerState.RunState, new RunState());
            this.fourPlayerFSM.registerState(FourPlayerState.HoverState, new HoverState());
            this.fourPlayerFSM.registerState(FourPlayerState.FlyState, new FlyState());
            this.fourPlayerFSM.registerState(FourPlayerState.FallState, new FallState());
            this.fourPlayerFSM.registerState(FourPlayerState.RollState, new RollState());
            this.fourPlayerFSM.registerState(FourPlayerState.HitState, new HitState());
            let hitRecoverState = new HitRecoverState();
            hitRecoverState.beGod.add((isGod) => {
                this.beGod(isGod);
            })
            this.fourPlayerFSM.registerState(FourPlayerState.HitRecoverState, hitRecoverState);
            this.fourPlayerFSM.registerState(FourPlayerState.DeathState, new DeathState());

            this.fourPlayerFSM.onPlayAnim.add((data: animData) => {
                this.sycnPlayAnim(Player.localPlayer.playerId, data);//播放动作
            });
            this.fourPlayerFSM.onPlayEffect.add((configId: number) => {
                this.sycnPlayEffect(Player.localPlayer.playerId, true, configId);
            });
            this.fourPlayerFSM.onStopEffect.add((configId) => {
                this.sycnPlayEffect(Player.localPlayer.playerId, false, configId);
            });
            this.fourPlayerFSM.onStateChange.add((state: FourPlayerState) => {
                this.sycnChangeState(state);
            });
            this._petModule = ModuleService.getModule(PetModuleC);//获取宠物模块C
            this._isSelf = true;
            this.useUpdate = true;
            this._petModule.registerPetCom(this.playerId, this);//注册宠物脚本


            Event.addLocalListener("PlayAutoMove", (isAuto: boolean) => {
                if (!this.fourPlayerFSM) {
                    return
                }
                if (isAuto && this.fourPlayerFSM.curState == FourPlayerState.FlyState) {
                    this.fourPlayerFSM.changeState(FourPlayerState.FallState, true);
                    return
                }
                this.fourPlayerFSM.changeState(FourPlayerState.IdleState, true);
            })

        }
        this.isReady = true;
    }

    /**检测是否可以执行同步函数 */
    private async waitInitReady() {
        if (this.isReady) {
            return true
        }
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                if (this.isReady) {
                    clearInterval(timer)
                    resolve(true)
                }
            }, 100)
        })
    }

    /**获取当前状态 */
    public getCurState() {
        return this.fourPlayerFSM.curState;
    }


    public async onEnableDataChanged() {
        await this.waitInitReady();
        if (this.enableData.enable) {
            // await this._petPendant._model.asyncReady();
            this._petPendant.setSuitDress(this.enableData.suitInfo, this._isSelf);
            if (this._isSelf) {
                this.fourPlayerFSM.refreshFSM(this.enableData.suitInfo.petId);
                this.fourPlayerFSM.startFSM();
                this.clearAnimData(Player.localPlayer.playerId);
            }
        } else {
            if (this._isSelf) {
                this.fourPlayerFSM.stopFSM();
            }
            this._petPendant.clearSuit();
        }

    }


    protected onUpdate(dt: number): void {
        if (this._isSelf) {
            this.fourPlayerFSM.update(dt);
        }
    }

    protected onDestroy(): void {
        if (SystemUtil.isServer()) return;
        if (this._petPendant) {
            this._petPendant.clearSuit();
        }
        if (this.enableData && this.enableData.enable) {
            if (!this.fourPlayerFSM) return;
            this.fourPlayerFSM.stopFSM();
        }
    }










    //===========================================server========================================'
    /**动作缓存玩家与当前动作 */
    private charAnimMap: Map<number, Animation> = new Map();

    /**冲刺特效播放Id */
    private moveEffPlayId: Map<number, number> = new Map();
    /**其他特效 */
    private otherEffPlayId: Map<number, number> = new Map();
    /**当前状态 */
    public petState: FourPlayerState = FourPlayerState.Stop;



    /**玩家切换四足形象取消动作缓存 */
    @mw.RemoteFunction(mw.Server)
    public clearAnimData(playerId: number) {
        if (this.charAnimMap.has(playerId)) {
            this.charAnimMap.delete(playerId);
        }
    }

    /**
     * 同步动作_S
     * @param data 动作数据 
     */
    @mw.RemoteFunction(mw.Server)
    public sycnPlayAnim(playerId: number, data: animData) {
        let player = Player.getPlayer(playerId);
        if (this.charAnimMap.has(playerId)) {
            let anim = this.charAnimMap.get(playerId);
            anim.stop();
            this.charAnimMap.delete(playerId);
        }
        if (!data.isPlay) return;

        let anim = player.character.loadAnimation(data.guid);
        anim.speed = data.speed;
        anim.loop = data.loop;
        anim.play();
        this.charAnimMap.set(playerId, anim);
    }

    /**
     * 冲刺拖尾特效
     * @param bool 是否播放
     * @param cfgId 配置Id
     * @returns 
     */
    @mw.RemoteFunction(mw.Server)
    public playMoveEffect(playerId: number, bool: boolean, cfgId: number): void {
        let player = Player.getPlayer(playerId);
        //冲刺特效
        let petConfig = GameConfig.Pet.getElement(cfgId);
        let timer = GameConfig.PetStat.getElement(30004).Value;//冲刺持续时间
        let playId = this.moveEffPlayId.get(playerId)
        if (!bool && playId) {
            EffectService.stop(playId);
            return;
        }
        let moveEffPlayId = EffectService.playOnGameObject(petConfig.speedEffect, player.character,
            { duration: timer, position: petConfig.speedEffectPos, rotation: new Rotation(petConfig.speedEffectRot), scale: petConfig.speedEffectScale });
        this.moveEffPlayId.set(playerId, moveEffPlayId);
    }

    /**
     * 同步特效
     * @param playerId 玩家id
     * @param bool 是否播放
     * @param cfgId 特效表id
     */
    @mw.RemoteFunction(mw.Server)
    public sycnPlayEffect(playerId: number, bool: boolean, cfgId: number) {
        let playId = this.otherEffPlayId.get(playerId);
        if (!bool) {
            if (playId) {
                EffectService.stop(playId);
            }
            return
        }
        let player = Player.getPlayer(playerId);
        let config = GameConfig.Effect.getElement(cfgId);
        let scale = ModuleService.getModule(PropModuleS).getPetEffScale(playerId, config.EffectLarge);
        let petCfg = GameConfig.Pet.getElement(this.enableData.suitInfo.petId);
        let offect = config.EffectLocation.clone().add(petCfg.effectPos);
        playId = EffectService.playOnGameObject(config.EffectID, player.character,
            {
                loopCount: config.EffectTime,
                position: offect,
                rotation: new Rotation(config.EffectRotate),
                scale: scale,
                slotType: config.EffectPoint
            });
        this.otherEffPlayId.set(playerId, playId);
    }

    /**
     * 修改无敌状态
     * @param isGod 
     */
    @mw.RemoteFunction(mw.Server)
    public beGod(isGod: boolean) {
        this.isGod = isGod;
    }

    @mw.RemoteFunction(mw.Server)
    public sycnChangeState(state: FourPlayerState) {
        this.petState = state;
    }

}

type playAnimData = {
    state: FourPlayerState,
    animGuid: string,
    anim: Animation,
}