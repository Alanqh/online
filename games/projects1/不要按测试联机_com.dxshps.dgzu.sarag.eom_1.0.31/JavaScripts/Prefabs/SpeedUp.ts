import { GameEventC2C } from "../const/GameCommonEvent";
import { AIManager_C } from "../modules/aIModule/AIManager_C";
import GameComUtils from "../utils/GameComUtils";

@Component
export default class SpeedUp extends Script {

    @mw.Property({ group: "推进设置", displayName: "冲量" })
    private force: Vector = Vector.zero;
    @mw.Property({ group: "推进设置", displayName: "最大速度，增加量" })
    private maxSpeed: number = 2000;
    @mw.Property({ group: "推进设置", displayName: "持续时间" })
    private totalTimer: number = 3;

    private charList: Map<Character, number> = new Map();
    private tmpV: Vector = Vector.zero;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (this.isRunningClient()) {
            this.initClient();
        }
    }

    private initClient() {
        let trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add(this.onEnter);
        this.useUpdate = true;
    }
    private onEnter = (obj: GameObject) => {
        if (!obj || (obj instanceof Character) == false) {
            return;
        }

        let char = obj as Character;
        Vector.subtract(this.force, char.velocity, this.tmpV)

        let isAi = AIManager_C.Instance.checkIsAiById(obj.gameObjectId);
        if (isAi) {
            // AI
            char.addImpulse(this.tmpV, true);
            char.maxWalkSpeed += this.maxSpeed;
            this.charList.set(char, TimeUtil.elapsedTime() + this.totalTimer);
            return
        }

        if (GameComUtils.check_isLocalPlayer(obj)) {
            char.addImpulse(this.tmpV, true);
            // char.maxWalkSpeed += this.maxSpeed;
            Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, this.maxSpeed);
            this.charList.set(char, TimeUtil.elapsedTime() + this.totalTimer);
        }
    }


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.charList.size == 0) {
            return;
        }
        let now = TimeUtil.elapsedTime();
        for (let [key, value] of this.charList.entries()) {
            if (now > value) {
                this.charList.delete(key);
                if (GameComUtils.check_isLocalPlayer(key)) {
                    Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, -this.maxSpeed);
                    break;
                }
                key.maxWalkSpeed -= this.maxSpeed;
                break;
            }
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}