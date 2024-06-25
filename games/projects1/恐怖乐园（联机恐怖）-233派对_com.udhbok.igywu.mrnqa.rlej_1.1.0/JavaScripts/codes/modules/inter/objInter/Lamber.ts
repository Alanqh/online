/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-24 14:23:05
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2023-12-26 11:53:01
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\inter\objInter\Lamber.ts
 * @Description  : 
 */

import { PlayerManagerExtension } from "../../../Modified027Editor/ModifiedPlayer";
import { MainUI } from "../../../ui/MainUI";
import { CommonUtils } from "../../../utils/CommonUtils";

@Component
export default class Lamber extends Script {
    public climbDownAni: string = "164199";

    public climbUpAni: string = "164200";

    public climbStance: string = "119920";

    private _clampingStat: number = 0;
    /**攀爬时间是否触发了已经 */
    private _isClimbing: boolean = false;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    private _judgeClimbFunc: any;

    private _trigger: Trigger;

    private _box: Vector2 = Vector2.zero;

    private _jumpFlag: boolean = false;

    private _jumpTimer: number = 0;

    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        this._trigger = this.gameObject.getChildByName("trigger") as Trigger;
        const triggerBoxPos = this._trigger.worldTransform.position.z;
        const triggerBoxSize = this._trigger.worldTransform.scale.z * (50);
        this._box = new Vector2(triggerBoxPos - triggerBoxSize, triggerBoxPos + triggerBoxSize)
        this._trigger.onLeave.add((char) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            console.log("玩家离开触发器")
            this._jumpFlag = false;
            if (this._isClimbing) {
                this.endClimb();
                console.log("玩家通过触发器离开梯子")
            }
        });

        const startTrigger = this.gameObject.getChildByName("startTrigger") as Trigger;
        startTrigger.onEnter.add((char: Character) => {
            if (!this.gameObject.getVisibility()) {
                return;
            }
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            if (this._jumpFlag) {
                this._jumpFlag = false;
                return;
            }
            if (TimeUtil.elapsedTime() - this._jumpTimer < 0.5) {
                return;
            }
            if (!this._isClimbing) {
                const triggerBoxPos = this._trigger.worldTransform.position.z;
                const triggerBoxSize = this._trigger.worldTransform.scale.z * (50);
                this._box = new Vector2(triggerBoxPos - triggerBoxSize, triggerBoxPos + triggerBoxSize)
                this.change2Climb();
            }
        })

        //触发爬梯子事件
        Event.addLocalListener("OnPlayerJump", (guid) => {
            if (this._isClimbing) {
                this._jumpTimer = TimeUtil.elapsedTime();
                this._jumpFlag = true;
                const char = Player.localPlayer.character;
                const loc = char.worldTransform.position;
                loc.add(char.worldTransform.getForwardVector().multiply(-30));
                char.worldTransform.position = loc;
                char.addImpulse(char.worldTransform.getForwardVector().multiply(-200), true);
                this.endClimb(false);

            }
        })
    }

    async change2Climb() {
        this.initAsset();
        if (!AssetUtil.assetLoaded(this.climbStance)) {
            await AssetUtil.asyncDownloadAsset(this.climbStance);
        }

        this.startClimb();
        this._isClimbing = true;
        this.useUpdate = true;
    }

    private judgeClimb(vec: Vector2) {
        if (!this._isClimbing) {
            return;
        }
        const char = Player.localPlayer.character;
        let transform = char.worldTransform
        if (vec.y > 0) {
            const startPos = char.getSlotWorldPosition(HumanoidSlotType.Hair);
            const endPos = startPos.clone().add(transform.getUpVector().multiply(40));
            let res = QueryUtil.lineTrace(startPos, endPos, true, false);
            res = res.filter(e => {
                return !(e.gameObject instanceof Trigger) && !(e.gameObject instanceof Character)
            })
            if (res.length != 0) {
                return;
            }
            char.worldTransform.position = (transform.position.add(transform.getUpVector().multiply(3)));
            if (this._clampingStat != 1) {
                this._clampingStat = 1;
                this.changeAnimation(Player.localPlayer.playerId, true);
            }
        }
        else if (vec.y < 0) {
            char.worldTransform.position = transform.position.add(transform.getUpVector().multiply(-3));
            if (this._clampingStat != 2) {
                this._clampingStat = 2
                this.changeAnimation(Player.localPlayer.playerId, false);
            }
        }
        else if (Math.abs(vec.y) <= 0) {
            this._clampingStat = 0
            this.changeAnimation(Player.localPlayer.playerId);
        }
    }

    private async changeAnimation(playerId: number, isUp: boolean = null) {
        let player = await Player.asyncGetPlayer(playerId);
        const char = player.character;
        if (!AssetUtil.assetLoaded(this.climbUpAni) || !AssetUtil.assetLoaded(this.climbDownAni)) {
            await AssetUtil.asyncDownloadAsset(this.climbUpAni);
            await AssetUtil.asyncDownloadAsset(this.climbDownAni);
        }
        let animationUp: SubStance = PlayerManagerExtension.loadStanceExtesion(char, this.climbUpAni);
        let animationDown: SubStance = PlayerManagerExtension.loadStanceExtesion(char, this.climbDownAni);

        if (isUp == null) {
            //PlayerManagerExtension.rpcStopAnimation(char, "");
            PlayerManagerExtension.loadStanceExtesion(char, this.climbStance).play()
            return;
        }

        // animationUp.loop = Infinity;
        // animationDown.loop = Infinity;

        if (isUp) {
            animationUp.play();
        }
        else {
            animationDown.play();
        }
    }

    /**
     * 初始化攀爬的资源双端都要下载
     */
    private async initAsset() {
        if (!AssetUtil.assetLoaded(this.climbUpAni) || !AssetUtil.assetLoaded(this.climbDownAni) || !AssetUtil.assetLoaded(this.climbStance)) {
            await AssetUtil.asyncDownloadAsset(this.climbUpAni);
            await AssetUtil.asyncDownloadAsset(this.climbDownAni);
            await AssetUtil.asyncDownloadAsset(this.climbStance);
            console.log("下载资源完成")
        }
    }

    /**
     * 客户端开始攀爬
     */
    private startClimb() {
        /** init stat */
        this._isClimbing = true;
        this._clampingStat = 0
        /** set pos */
        const char = Player.localPlayer.character;
        char.switchToFlying();
        /** set ui */
        UIService.getUI(MainUI).mVirtualJoystickPanel.controlType = CameraControlType.None
        if (!this._judgeClimbFunc) {
            this._judgeClimbFunc = this.judgeClimb.bind(this);
        }
        /** set pos */
        const dir = this._trigger.worldTransform.getForwardVector();
        const rot = dir.toRotation();
        char.worldTransform.rotation = rot;
        const loc = char.worldTransform.position;
        const playerHeight = loc.z - char.getSlotWorldPosition(HumanoidSlotType.Root).z;
        const centerPos = this.gameObject.getChildByName("centerPos")
        console.log("playerHeight" + playerHeight)
        loc.z = this._box.x;
        loc.x = centerPos.worldTransform.position.x;
        loc.y = centerPos.worldTransform.position.y;
        loc.add(char.worldTransform.getUpVector().multiply(playerHeight + 10));
        char.worldTransform.position = loc;
        /** play ani */
        UIService.getUI(MainUI).mVirtualJoystickPanel.onInputDir.add(this._judgeClimbFunc);
        console.log("进入了梯子")
    }

    private endClimb(addImpulse: boolean = true) {
        this._isClimbing = false;
        Player.localPlayer.character.switchToWalking();
        UIService.getUI(MainUI).mVirtualJoystickPanel.controlType = CameraControlType.MoveType;
        UIService.getUI(MainUI).mVirtualJoystickPanel.onInputDir.remove(this._judgeClimbFunc);
        this._judgeClimbFunc = null;
        const char = Player.localPlayer.character;
        PlayerManagerExtension.stopStanceExtesion(char);
        //PlayerManagerExtension.rpcStopAnimation(char, "");
        const dir = char.worldTransform.getForwardVector();
        dir.z = 0;
        char.worldTransform.rotation = dir.toRotation();
        this.useUpdate = false;
        addImpulse && char.addImpulse(char.worldTransform.getForwardVector().multiply(400).add(Vector.up.multiply(200)), true);
        console.log("离开了梯子")
    }

    protected onUpdate(dt: number): void {
        const curz = Player.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.Root).z;
        if (curz < this._box.x || curz > this._box.y) {
            this.endClimb();
        }
    }
}