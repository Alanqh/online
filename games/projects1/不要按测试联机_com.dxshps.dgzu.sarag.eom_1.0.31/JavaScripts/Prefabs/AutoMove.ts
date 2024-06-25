import { GlobalData } from "../const/GlobalData";
import { AIManager_C } from "../modules/aIModule/AIManager_C";
import GameComUtils from "../utils/GameComUtils";

@Component
export default class AutoMove extends Script {

    @mw.Property({ displayName: "移动速度，本地轴向" })
    private moveSpeed: Vector = Vector.zero;
    @mw.Property({ displayName: "移动时间" })
    private moveTimer: number = 1;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return
        }
        let trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add(this.onEnter);
    }
    private onEnter = (obj: GameObject) => {
        if (!obj || (obj instanceof Character) == false) {
            return;
        }
        let isAi = AIManager_C.Instance.checkIsAiById(obj.gameObjectId);
        if (isAi) {
            AIManager_C.Instance.ctrlMove(obj as Character, this.moveTimer, this.gameObject.worldTransform.transformDirection(this.moveSpeed));
            return
        }
        if (!GameComUtils.check_isLocalPlayer(obj)) {
            return
        }

        let myCharacter = Player.localPlayer.character;
        myCharacter.complexMovementEnabled = false;
        autoMoveCharacter.refreshTimer(this.moveTimer, this.gameObject.worldTransform.transformDirection(this.moveSpeed));
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}

const autoMoveAniGuid: string = "14554";
const autoMoveAniSpeed: number = 1;
class AutoMoveCharacter {
    public autoMoveTimer: number = null;
    public autoMoveSpeed: Vector = Vector.zero;

    private mTmpV: Vector = Vector.zero;

    constructor() {
        if (SystemUtil.isServer()) {
            let playerAniMap: Map<number, mw.Animation> = new Map();
            Event.addClientListener("PlayAutoMoveAni", (player: mw.Player, isPlay: boolean) => {
                let ani: mw.Animation = null;
                if (!playerAniMap.has(player.playerId)) {
                    ani = player.character.loadAnimation(autoMoveAniGuid);
                    ani.speed = autoMoveAniSpeed;
                    ani.loop = 0;
                    playerAniMap.set(player.playerId, ani);
                }
                ani = playerAniMap.get(player.playerId);
                if (!ani) {
                    return;
                }
                isPlay ? ani.play() : ani.stop();
            })

            Player.onPlayerLeave.add((player: Player) => {
                try {
                    if (playerAniMap.has(player.playerId)) {
                        playerAniMap.delete(player.playerId);
                    }
                } catch (error) {
                    console.error("AutoMoveCharacter onPlayerLeave", error);
                }
            })
        }
    }

    public refreshTimer(moveTimer: number, moveSpeed: Vector) {
        if (SystemUtil.isServer()) {
            console.error("服务器不允许此操作");
            return;
        }
        if (!this.autoMoveTimer) {
            TimeUtil.onEnterFrame.add(this.onUpdate, this);
            Player.localPlayer.character.complexMovementEnabled = false;
            Player.localPlayer.character.jumpEnabled = false;
            Player.localPlayer.character.movementEnabled = false;
            GlobalData.autoCtrl = true;
            Event.dispatchToLocal("PlayAutoMove", true)
            Event.dispatchToServer("PlayAutoMoveAni", true);
        }
        this.autoMoveTimer = TimeUtil.elapsedTime() + moveTimer;
        Vector.copy(moveSpeed, this.autoMoveSpeed);

    }
    private onUpdate(dt: number): void {
        if (!this.autoMoveTimer) {
            return
        }
        if (TimeUtil.elapsedTime() >= this.autoMoveTimer) {
            this.autoMoveTimer = null;
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            Player.localPlayer.character.complexMovementEnabled = true;
            Player.localPlayer.character.jumpEnabled = true;
            GlobalData.autoCtrl = false;
            Event.dispatchToLocal("PlayAutoMove", false)

            Player.localPlayer.character.movementEnabled = true;
            Event.dispatchToServer("PlayAutoMoveAni", false);

            return
        }
        Vector.add(Player.localPlayer.character.worldTransform.position, this.autoMoveSpeed, this.mTmpV);
        Player.localPlayer.character.worldTransform.position = this.mTmpV;
    }
}
export const autoMoveCharacter: AutoMoveCharacter = new AutoMoveCharacter();