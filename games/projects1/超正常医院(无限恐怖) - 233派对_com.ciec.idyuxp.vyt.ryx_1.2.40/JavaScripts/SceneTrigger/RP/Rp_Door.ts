import { oTrace, oTraceError } from "odin";
import { utils } from "../../utils/uitls";
import InteractBtn from "../../utils/UI/InteractBtn";
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { SoundEnum } from "../../enum/SoundEnum";
import { AnalyticsModuleS } from "../../modules/Analytics/AnalyticsModule";
import { MonsterChangeC } from "../../modules/ChangeMonster/MonsterChangeC";
import { PlayerRace } from "../../const/enum";


enum CupboardDoorState {
    Open,
    Close,
}

@Component
export default class Rp_Door extends Script {

    @Property({ displayName: "开门旋转的角度,绝对旋转" })
    private openRotation: Rotation = Rotation.zero;
    @Property({ displayName: "关门的旋转角度,绝对旋转" })
    private closeRotation: Rotation = Rotation.zero;
    @Property({ displayName: "开门时间" })
    private openTime: number = 0.5;
    @Property({ displayName: "关门时间" })
    private closeTime: number = 0.5;
    @Property({ displayName: "开关门冷却" })
    private coolTime: number = 0.5;
    @Property({ displayName: "门的触发器GUID" })
    private doorTriggerGuid: string = "";
    @Property({ displayName: "柜子的触发器GUID" })
    private cupboardTriggerGuid: string = "";
    @Property({ displayName: "ui偏移" })
    private offset: Vector2 = Vector2.zero;

    // 当前门的状态
    private state: CupboardDoorState = CupboardDoorState.Close;
    // 门的触发器
    private doorTrigger: Trigger;
    // 开门动画
    private tween: Tween<Rotation>;
    // 上次操作的时间戳
    private lastTime: number = 0;
    // 柜子的触发器
    private cupboardTrigger: Trigger;
    // 进入柜子的玩家
    private cupboardPlayers: number[] = [];

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.client_init();
        }
        if (SystemUtil.isServer()) {
            this.server_init();
        }
    }


    /**
     * 客户端初始化
     */
    private async client_init() {
        // 门触发器
        this.doorTrigger = await GameObject.asyncFindGameObjectById(this.doorTriggerGuid) as Trigger;
        if (this.doorTrigger == null) {
            oTraceError("Rp_Door trigger init error, doorTrigger not find! guid = " + this.doorTriggerGuid);
            return;
        }
        this.doorTrigger.onEnter.add(this.onEnterTriggerIn.bind(this));
        this.doorTrigger.onLeave.add(this.onLeaveTriggerOut.bind(this));
        // 柜子触发器
        this.cupboardTrigger = await GameObject.asyncFindGameObjectById(this.cupboardTriggerGuid) as Trigger;
        if (this.cupboardTrigger == null) {
            oTraceError("Rp_Door trigger init error, cupboardTrigger not find! guid = " + this.cupboardTriggerGuid);
            return;
        }
        this.cupboardTrigger.onEnter.add(this.onEnterCupboardTriggerIn_C.bind(this));
        this.cupboardTrigger.onLeave.add(this.onLeaveCupboardTriggerOut_C.bind(this));
    }


    /**
     * 服务端初始化
     */
    private async server_init() {
        this.cupboardTrigger = await GameObject.asyncFindGameObjectById(this.cupboardTriggerGuid) as Trigger;
        if (this.cupboardTrigger == null) {
            oTraceError("Rp_Door trigger init error, cupboardTrigger not find! guid = " + this.cupboardTriggerGuid);
            return;
        }
        this.cupboardTrigger.onEnter.add(this.onEnterCupboardTriggerIn_S.bind(this));
        this.cupboardTrigger.onLeave.add(this.onLeaveCupboardTriggerOut_S.bind(this));
    }


    /**
     * 进入触发器
     */
    private onEnterTriggerIn(go: GameObject) {
        if (utils.checkTriggerGo(go) == false) {
            return;
        }
        if (MonsterChangeC.curPlayerRace == PlayerRace.Ghost) return;
        if (Date.now() - this.lastTime < this.coolTime * 1000) {
            return;
        }
        InteractBtn.instance.addClickFun(this.controllerDoor, this, Player.localPlayer.playerId);
        (this.gameObject.getChildren()[0] as Model)?.setPostProcessOutline(true, LinearColor.green);
    }


    /**
     * 离开触发器
     */
    private onLeaveTriggerOut(go: GameObject) {
        if (utils.checkTriggerGo(go) == false) {
            return;
        }
        InteractBtn.instance.removeClickFun(this.controllerDoor, this, Player.localPlayer.playerId);
        (this.gameObject.getChildren()[0] as Model)?.setPostProcessOutline(false);
        // InterBtn.instance.hide();
    }


    /**
     * 处理门
     */
    @RemoteFunction(mw.Server)
    private controllerDoor(playerId: number) {


        switch (this.state) {
            case CupboardDoorState.Close:
                this.openDoor(playerId);
                break;
            // case CupboardDoorState.Open:
            //     this.closeDoor();
            //     break;
        }
    }


    /**
     * 开门
     */
    private openDoor(playerId: number) {
        if (this.tween != null && this.state == CupboardDoorState.Open) return;
        utils.playAnimationAtAllClient(6007, playerId);
        this.tween = new Tween<Rotation>(this.gameObject.worldTransform.rotation).to(this.openRotation, this.openTime * 1000).onUpdate((rotation) => {
            this.gameObject.worldTransform.rotation = rotation;
        }).onComplete(() => {
            // 设置开门状态 延迟开启关门tween
            this.state = CupboardDoorState.Open;
            for (let i = 0; i < this.cupboardPlayers.length; i++) {
                ActionCommon.onPlayerStateChange_S.call(this.cupboardPlayers[i], false);
            }
            // this.tween = null;

            setTimeout(() => {
                this.closeDoor(playerId);
            }, GlobalData.SceneObject.DelayTimeAfterOpenDoor * 1000);
            // 柜子里的玩家
            for (let i = 0; i < this.cupboardPlayers.length; i++) {
                ActionCommon.onPlayerStateChange_S.call(this.cupboardPlayers[i], false);
            }
        }).start();
        utils.playSoundAtClient(SoundEnum.OpenDoor, playerId);

        ModuleService.getModule(AnalyticsModuleS).cabinet(playerId);
    }


    /**
     * 关门
     */
    private closeDoor(playerId: number) {
        // if (this.tween != null) return;
        this.tween = new Tween<Rotation>(this.gameObject.worldTransform.rotation).to(this.closeRotation, this.closeTime * 1000).onUpdate((rotation) => {
            this.gameObject.worldTransform.rotation = rotation;
        }).onComplete(() => {
            this.state = CupboardDoorState.Close;
            this.tween = null;
            for (let i = 0; i < this.cupboardPlayers.length; i++) {
                ActionCommon.onPlayerStateChange_S.call(this.cupboardPlayers[i], true);
            }
        }).start();
        utils.playSoundAtClient(SoundEnum.CloseDoor, playerId);
    }


    /**
     * 进入柜子触发器 - 服务端
     */
    private onEnterCupboardTriggerIn_S(go: GameObject) {
        if (utils.checkTriggerGo(go) == false) {
            return;
        }
        let player = (go as Character).player;
        if (this.cupboardPlayers.includes(player.playerId) == false) {
            this.cupboardPlayers.push(player.playerId);
        }
        if (this.state == CupboardDoorState.Open) {
            ActionCommon.onPlayerStateChange_S.call(player.playerId, false);
        } else if (this.state == CupboardDoorState.Close) {
            ActionCommon.onPlayerStateChange_S.call(player.playerId, true);
        }
    }
    /**
     * 离开柜子触发器 - 服务端
     */
    private onLeaveCupboardTriggerOut_S(go: GameObject) {
        if (utils.checkTriggerGo(go) == false) {
            return;
        }
        let player = (go as Character).player;
        let index = this.cupboardPlayers.indexOf(player.playerId);
        if (index != -1) {
            this.cupboardPlayers.splice(index, 1);
        }
        ActionCommon.onPlayerStateChange_S.call(player.playerId, false);
    }

    /**
     * 进入柜子触发器 - 客户端
     */
    private onEnterCupboardTriggerIn_C(go: GameObject) {
        if (utils.checkTriggerGo(go) == false) {
            return;
        }
        Camera.currentCamera.preset = CameraPreset.FirstPerson;
    }

    /**
     * 离开柜子触发器 - 客户端
     */
    private onLeaveCupboardTriggerOut_C(go: GameObject) {
        if (utils.checkTriggerGo(go) == false) {
            return;
        }
        Camera.currentCamera.preset = CameraPreset.Default;
    }

}