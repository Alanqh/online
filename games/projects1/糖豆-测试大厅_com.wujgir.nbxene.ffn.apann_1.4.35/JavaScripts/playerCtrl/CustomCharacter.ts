import { PlayerManagerExtesion } from '../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
/** 
* @Author       : yuanqi.bai
* @Date         : 2023-04-04 09:23:40
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-24 17:27:00
 * @FilePath     : \stumbleguys_new\JavaScripts\playerCtrl\CustomCharacter.ts
* @Description  : 修改描述
*/
import { MGSController } from "../mgs/MGSController";
import { Singleton } from "../tool/Singleton";
import { EFrontSlope, PlayerComponentMgr } from "./PlayerComponentMgr";
import { PlayerParam } from "./PlayerParam";
const SWOOP_ANIM: string = "146283";
export class CustomCharacter {
    public beforeJump: (character: mw.Character) => void;
    constructor(private _character: Character) {
        this.initAsset();
    }
    get character(): Character {
        return this._character;
    }

    get moveEnable(): boolean {
        return this._character.movementEnabled;
    }
    set moveEnable(v) {
        this._character.movementEnabled = v;
    }

    get maxAcceleration() {
        return this._character.maxAcceleration
    }
    set maxAcceleration(v) {
        this._character.maxAcceleration = v
    }

    get rotateRate() {
        return this._character.rotateRate
    }
    set rotateRate(v) {
        this._character.rotateRate = v
    }

    get brakingDecelerationFalling() {
        return this._character.horizontalBrakingDecelerationFalling
    }
    set brakingDecelerationFalling(v) {
        this._character.horizontalBrakingDecelerationFalling = v
    }

    get maxWalkSpeed() {
        return this._character.maxWalkSpeed
    }

    get worldLocation() {
        return this._character.worldTransform.position
    }
    set maxWalkSpeed(v) {
        v = 450;
        this._character.maxWalkSpeed = v
    }

    get brakingDecelerationWalking() {
        return this._character.brakingDecelerationWalking
    }
    set brakingDecelerationWalking(v) {
        this._character.brakingDecelerationWalking = v
    }

    get isJumping() {
        return this._character.isJumping
    };


    get jumpEnable() {
        return this._character.jumpEnabled
    }
    set jumpEnable(v) {
        this._character.jumpEnabled = v
    }

    get ragdollEnable() {
        return this.character.ragdollEnabled;
    }
    set ragdollEnable(v) {
        this.character.ragdollEnabled = v;
    }

    get forwardVector() {
        return this._character.worldTransform.getForwardVector();
    }
    get velocity() {
        return this._character.velocity;
    }
    get walkableFloorAngle() {
        return this._character.walkableFloorAngle;
    }
    set walkableFloorAngle(v: number) {
        this._character.walkableFloorAngle = v;
    }
    isSwiming() {
        return this._character.movementMode == mw.MovementMode.Swim;
    }
    loadAnimation(asset: string): mw.Animation {
        return PlayerManagerExtesion.loadAnimationExtesion(this._character, asset);
    }
    addImpulse(addForce: mw.Vector, arg1: boolean) {
        this._character.addImpulse(addForce, arg1);
    }

    jump() {
        this.beforeJump && this.beforeJump(this._character);
        this._character.jump();
        Event.dispatchToLocal("CommonEffect_Jump", this._character);
    }
    get jumpCount() {
        return this._character.jumpMaxCount;
    }
    set jumpCount(value: number) {
        this._character.jumpMaxCount = value;
    }
    /**
     * 播放动作
     * @param asset 资源id 
     * @param times 播放次数，0为循环播放
     */

    playAnimation(asset: string, times: number, rata: number = 1) {
        let animation = PlayerManagerExtesion.loadAnimationExtesion(this._character, asset, true);
        if (animation && !animation.isPlaying) {
            animation.loop = times;
            animation.speed = rata
            animation.play();
        }
    }
    /**
     * 停止播放中的动作
     * @param asset 资源id
     */
    stopAnimation(asset: string) {
        PlayerManagerExtesion.rpcStopAnimation(this._character, asset);
    }

    set maxJumpHeight(height: number) {
        this.character.maxJumpHeight = height
    }
    get maxJumpHeight() {
        return this.character.maxJumpHeight
    }


    /**飞扑的冲量大小 */
    private addForce: mw.Vector = mw.Vector.zero;
    /**角色速度 */
    speedVec: mw.Vector = mw.Vector.zero;
    /**角色速度大小 */
    speedSize: number = 0;
    /**角色速度Z方向大小 */
    speedZ: number = 0;
    /**当前地面速度 */
    currentWalkSpeed: number = 0;

    /**前冲特效 */
    dashEffect: mw.Effect;
    /**落地特效 */
    dropEffect: mw.Effect;

    /**受击特效 */
    hitEffect: mw.Effect;

    /**当前Jumpenable */
    currentJump: boolean = false;
    private initAsset() {
        AssetUtil.asyncDownloadAsset(SWOOP_ANIM);
        AssetUtil.asyncDownloadAsset("148711");
        AssetUtil.asyncDownloadAsset("151535");

        SpawnManager.asyncSpawn({ guid: "148711" }).then(obj => {
            this.dashEffect = obj as mw.Effect;
            this.character.attachToSlot(this.dashEffect, mw.HumanoidSlotType.Root);
            this.dashEffect.loop = false;
            this.dashEffect.localTransform.scale = new mw.Vector(1.5, 1.5, 1.5);
            this.dashEffect.localTransform.position = new mw.Vector(70, 0, 50);
            this.dashEffect.localTransform.rotation = new mw.Rotation(0, -90, 0);
        });

        SpawnManager.asyncSpawn({ guid: "151535" }).then(obj => {
            this.dropEffect = obj as mw.Effect;
            this.character.attachToSlot(this.dropEffect, mw.HumanoidSlotType.Root);
            this.dropEffect.loop = true;
            this.dropEffect.localTransform.scale = new mw.Vector(2.5, 2.5, 2.5);
            this.dropEffect.localTransform.position = new mw.Vector(0, 0, 0);
        });

        SpawnManager.asyncSpawn({ guid: "181009" }).then(obj => {
            this.hitEffect = obj as mw.Effect;
            this.character.attachToSlot(this.hitEffect, mw.HumanoidSlotType.Root);
            this.hitEffect.loop = true;
            this.hitEffect.localTransform.scale = new mw.Vector(1, 1, 1);
            this.hitEffect.localTransform.position = new mw.Vector(0, 0, 155);
            setTimeout(() => {
                this.hitEffect.stop();
            }, 1);
        });
    }

    /**
     * 注册事件
     * @param character 
     */
    registerEvent(character: Character) {
        /**停止下坡滑行 */
        Event.addLocalListener("stopSlide", () => {
            this.stopAnimation(SWOOP_ANIM);
            character.movementEnabled = false;
            character.brakingDecelerationWalking = PlayerParam.delSpeed;
            character.maxAcceleration = PlayerParam.oriAcceleration;
        })


    }


    /**
     * 退出滑行,恢复角色参数
     * @param isEnable 
     */
    public exitSlide() {
        this.stopAnimation(SWOOP_ANIM);
        this.dropEffect && this.dropEffect.stop();
        this.character.rotateRate = PlayerParam.oriRotateSpeed;
        this.character.maxJumpHeight = PlayerParam.maxJumpHeight;
        if (this.character.maxWalkSpeed > PlayerParam.maxWalkSpeed) {
            this.currentWalkSpeed = PlayerParam.maxWalkSpeed;
            this.character.maxWalkSpeed = PlayerParam.maxWalkSpeed;
        }
        this.character.maxAcceleration = PlayerParam.oriAcceleration;
        this.character.brakingDecelerationWalking = PlayerParam.defaultdelSpeed;
        this.character.horizontalBrakingDecelerationFalling = PlayerParam.dropSpeed;
        if (PlayerComponentMgr.ins._speedComponent) {
            PlayerComponentMgr.ins._speedComponent.currentSlide = false;
        }
        Event.dispatchToLocal("CHANGE_JUMP_IMG", true);
    }

    /**
     * 落地时触发的事件
     */
    public CheckDropEvent() {
        this.character.rotateRate = PlayerParam.slideRotateSpeed;
        if (PlayerComponentMgr.ins._speedComponent.currentFrontSlope == EFrontSlope.Ground && PlayerComponentMgr.ins._speedComponent.onGround) {
            this.character.movementEnabled = false;
            this.character.brakingDecelerationWalking = PlayerParam.grounddelSpeed * PlayerParam.delSpeed;
            this.character.maxAcceleration = PlayerParam.oriAcceleration;
            this.dropEffect && this.dropEffect.play();
        }
        else if (PlayerComponentMgr.ins._speedComponent.currentFrontSlope == EFrontSlope.Up && PlayerComponentMgr.ins._speedComponent.onGround) {
            this.character.movementEnabled = false;
            let slope = PlayerComponentMgr.ins._speedComponent.currentSlope;
            slope = Math.abs(slope);
            MathUtil.clamp(slope, 0.01, 1);
            this.character.brakingDecelerationWalking = (1 + PlayerParam.updelSpeed * slope) * PlayerParam.delSpeed;
            this.character.maxAcceleration = PlayerParam.oriAcceleration;
            this.dropEffect && this.dropEffect.play();
        }
        else if (PlayerComponentMgr.ins._speedComponent.currentFrontSlope == EFrontSlope.Down && PlayerComponentMgr.ins._speedComponent.onGround) {
            this.character.movementEnabled = true;
            this.character.brakingDecelerationWalking = 0;
            PlayerComponentMgr.ins._speedComponent.currentSlide = true;
            this.character.maxAcceleration = PlayerParam.acceleratioonSize * PlayerParam.oriAcceleration;
            this.dropEffect && this.dropEffect.play();
            this.currentWalkSpeed = PlayerParam.slideSpeed;
            this.character.maxWalkSpeed = this.currentWalkSpeed;
        } else {
            this.character.movementEnabled = false;
            this.character.maxAcceleration = PlayerParam.oriAcceleration;
            this.character.brakingDecelerationWalking = PlayerParam.grounddelSpeed * PlayerParam.delSpeed;
            this.dropEffect && this.dropEffect.play();
        }
    }

    /**
     * 飞扑
     * @param isHalf 
     */
    public executeSwoop(isHalf: boolean) {
        if (isHalf) {
            this.ezSwoop();
        } else {
            this.playAnimation(SWOOP_ANIM, 0, 0.1);
            this.firstSwoop()
        }
        Singleton.getIns(MGSController).controllerType("002");
    }

    /**
    * 一段飞扑 
    */
    public firstSwoop() {
        mw.Vector.multiply(this.character.worldTransform.getForwardVector(), (PlayerParam.force), this.addForce);
        Event.dispatchToLocal("PLAY_BY_CFG", 6);
        if (this.dropEffect) {
            this.dropEffect.stop();
        }
        this.dashEffect && this.dashEffect.play();
        const length = this.addForce.length
        const velocity = this._character.velocity
        velocity.z = 0;
        this.character[`ueCharacter`].SysMovementComponent.velocity = new UE.Vector(velocity.x, velocity.y, 0)
        this.addForce.multiply(PlayerParam.forward).add(Vector.up.multiply(length * PlayerParam.up)).normalize().multiply(length)
        if (velocity.length < 50) {
            this.addForce.multiply(1.5)
        }
        this.character.addImpulse(this.addForce, true);
    }

    /**
     * 执行飞扑冲量
     * @param isHalf 
     */
    public ezSwoop() {
        mw.Vector.multiply(this.character.worldTransform.getForwardVector(), (PlayerParam.force + 400) / 2, this.addForce);

        Event.dispatchToLocal("PLAY_BY_CFG", 6);
        if (this.dropEffect) {
            this.dropEffect.stop();
        }
        this.dashEffect && this.dashEffect.play();
        mw.Vector.subtract(this.addForce, this.character.velocity, this.addForce);
        const velocity = this.character.velocity;
        velocity.z = 0;
        mw.Vector.multiply(this.addForce, MathUtil.clamp(velocity.magnitude, 0, 600) / 1000 * PlayerParam.forceSize, this.addForce);
        this.character.addImpulse(this.addForce, true);
    }


    /**
     * 检测当前速度是否有问题
     * @param speed 
     */
    public checkSpeed(speed: mw.Vector) {
        if (!PlayerComponentMgr.ins._speedComponent.onGround && Math.abs(this.speedZ) > 100) {
            if (this.character.movementEnabled && this.character.jumpEnabled) {
                Event.dispatchToLocal("CHANGE_JUMP_IMG", false);

            }
        }
        if (this.speedSize < 10 && this.character.maxWalkSpeed <= 0) {
            this.currentWalkSpeed = PlayerParam.maxWalkSpeed;
            this.character.maxWalkSpeed = PlayerParam.maxWalkSpeed;
        }
        if (this.speedSize < PlayerParam.minVelocity && this.character.maxAcceleration <= 100) {
            this.character.maxAcceleration = PlayerParam.oriAcceleration;
        }
    }

    /**
     * 播放/停止受击特效
     */
    public playHitEffect(isPlay: boolean) {
        if (isPlay) {
            this.hitEffect && this.hitEffect.play();
        } else {
            this.hitEffect && this.hitEffect.forceStop();
        }
    }
    // /**
    //  * 停止飞扑动作
    //  */
    // private stopSwoopAnimation() {
    //     if (this.animation && this.animation.isPlaying) {
    //         this.animation.stop();
    //     }
    // }
    // /**
    //  * 处理可能出现的问题
    //  */
    // public detectingExtremeState() {
    //     this.speedVec = this.character.velocity;
    //     this.speedSize = this.character.velocity.magnitude;
    //     this.speedZ = this.speedVec.z;
    //     if (PlayerCtrlState.ins.currentShortSlide && PlayerComponentMgr.ins._speedComponent.onGround) {
    //         if (this.speedSize < PlayerParam.minVelocity) {
    //             this.exitSlide();
    //         }
    //     } else if (PlayerCtrlState.ins.currentShortSlide && this.speedSize < 1 && !PlayerComponentMgr.ins._speedComponent.onGround) {
    //         this.exitSlide();
    //     } else if (this.animation && !PlayerCtrlState.ins.currentShortSlide && this.speedSize < 1 && !PlayerComponentMgr.ins._speedComponent.onGround) {
    //         this.exitSlide();
    //     }
    //     this.checkSpeed(this.speedVec);
    //     this.checkJump();
    // }

}