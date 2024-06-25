import GameComUtils from "../utils/GameComUtils";

@Component
export default class UpWind extends Script {

    @mw.Property({ replicated: true, displayName: "再次给冲量时间s" })
    private checkTimer: number = 4;

    @mw.Property({ replicated: true, displayName: "冲量" })
    private upV: number = 1000;

    @mw.Property({ replicated: true, group: "下落属性", displayName: "最大下落速度" })
    private maxFallingSpeed: number = 512;
    @mw.Property({ replicated: true, group: "下落属性", displayName: "下落控制" })
    private driftControl: number = 0.2;
    @mw.Property({ replicated: true, group: "下落属性", displayName: "重力倍率" })
    private gravityScale: number = 0.3;
    @mw.Property({ replicated: true, group: "下落属性", displayName: "下落制动速率" })
    private horizontalBrakingDecelerationFalling: number = 600;

    private mTimer: number = 0;
    private mUpV: Vector = null;

    private old_maxFallingSpeed: number;
    private old_driftControl: number;
    private old_gravityScale: number;
    private old_horizontalBrakingDecelerationFalling: number;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return
        }
        let trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add(this.onEnter);
        trigger.onLeave.add(this.onLeave);
        this.mUpV = new Vector(0, 0, this.upV);
    }

    private onEnter = (obj: GameObject) => {
        if (!GameComUtils.check_isLocalPlayer(obj)) {
            return
        }

        let myCharacter = Player.localPlayer.character;

        this.old_maxFallingSpeed = myCharacter.maxFallingSpeed;
        this.old_driftControl = myCharacter.driftControl;
        this.old_gravityScale = myCharacter.gravityScale;
        this.old_horizontalBrakingDecelerationFalling = myCharacter.horizontalBrakingDecelerationFalling;

        // 最大下落速度为1024
        myCharacter.maxFallingSpeed = this.maxFallingSpeed;

        // 按地面移动速率的0.1倍控制下落过程
        myCharacter.driftControl = this.driftControl;

        // 10倍重力
        myCharacter.gravityScale = this.gravityScale;

        // 下落制动速率为10
        myCharacter.horizontalBrakingDecelerationFalling = this.horizontalBrakingDecelerationFalling;


        this.mUpV.x = -myCharacter.velocity.x;
        this.mUpV.y = -myCharacter.velocity.y;

        this.mTimer = TimeUtil.elapsedTime() + this.checkTimer;
        myCharacter.addImpulse(this.mUpV, true);

        this.useUpdate = true;
    }

    private onLeave = (obj: GameObject) => {
        if (!GameComUtils.check_isLocalPlayer(obj)) {
            return
        }
        this.useUpdate = false;
        let myCharacter = Player.localPlayer.character;

        // 最大下落速度
        myCharacter.maxFallingSpeed = this.old_maxFallingSpeed;

        // 按地面移动速率的0.2倍控制下落过程
        myCharacter.driftControl = this.old_driftControl

        // 重力
        myCharacter.gravityScale = this.old_gravityScale

        // 下落制动速率
        myCharacter.horizontalBrakingDecelerationFalling = this.old_horizontalBrakingDecelerationFalling
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (TimeUtil.elapsedTime() < this.mTimer) {
            return
        }

        this.mTimer = TimeUtil.elapsedTime() + this.checkTimer;
        this.mUpV.x = 0;
        this.mUpV.y = 0;
        this.mUpV.z = this.upV - Player.localPlayer.character.velocity.z;
        Player.localPlayer.character.addImpulse(this.mUpV, true);
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}