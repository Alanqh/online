import { PlayerManagerExtesion } from "../Modified027Editor/ModifiedPlayer"
import ItemObj from "../modules/dress/ItemObj"
import { ScriptManager } from "../modules/dress/ScriptManager"
import { Singleton } from "../tool/Singleton"
import { ZwtTween } from "../tool/ZwtTween"
import PlayerCtrlUI from "./PlayerCtrlUI"
import { SkatingDisable, SkatingEnable } from "./SkatingAnimation"

/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-11-07 10:51:49
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-12-14 14:02:28
 * @FilePath     : \stumbleguys\JavaScripts\playerCtrl\FrozenMgr.ts
 * @Description  : 玩家被冰冻的机制
 */
export const FrozenEvent = "FrozenEvent"

export class FrozenMgr {
    isFrozen: boolean = false
    frozenTime: number = 0
    lock: boolean = false
    curCamera: Camera = null
    screenEffect: Effect = null
    private _iceCubeObj: GameObject = null
    private _tween: ZwtTween;

    constructor(public actor: Character) {
        this.curCamera = Camera.currentCamera
        Event.addLocalListener(FrozenEvent, (other: Character, duration: number) => {
            if (other != this.actor || this.lock) return
            this.lock = true
            setTimeout(() => {
                this.lock = false
            }, 2000);
            if (!this.isFrozen) {
                this.isFrozen = true
                this.beFrozen()
                this.frozenTime = duration
            } else {
                this.isFrozen = false
                this.unFrozen()
                this.frozenTime = 0
            }
        })
        if (this.actor.player) {
            GameObject.asyncSpawn("146772").then((effect: Effect) => {
                effect.loop = true
                effect.parent = this.curCamera
                effect.localTransform.position = new Vector(150, 0, 0);
                effect.localTransform.scale = new Vector(1.5, 1.42, 1.5);
                effect.localTransform.rotation = new Rotation(0, 0, 90);
                effect.stop()
                this._tween = new ZwtTween(effect)
                    .scaleTo(new Vector(1.5, 1.42, 1.5), 2)
                    .scaleTo(new Vector(1.55, 1.47, 1.55), 2)
                    .repeat(2, -1)
                this.screenEffect = effect
            })
        } else {
            GameObject.asyncSpawn("6D9B8FFA4F49CEA56A96E0B3B6BADE6A").then((obj) => {
                this._iceCubeObj = obj
                this.actor.attachToSlot(obj, HumanoidSlotType.Root)
                this._iceCubeObj.localTransform.position = Vector.zero
                this._iceCubeObj.setVisibility(false)
            })
        }
    }

    /**被冻住 */
    beFrozen() {
        if (this.actor.player) {
            Event.dispatchToLocal(SkatingDisable)
            mw.UIService.getUI(PlayerCtrlUI).isJump = false
            let itemObj = Singleton.getIns(ScriptManager).getScriptOnPlayer(Player.localPlayer.playerId, ItemObj)
            itemObj.beFrozen(this.actor.player)
        } else {
            this.actor.worldTransform.position = this.actor.worldTransform.position.add(new Vector(0, 0, 50))
            this.actor.setCollision(CollisionStatus.QueryOnly)
            if (this._iceCubeObj) this._iceCubeObj.setVisibility(true)
        }
        this.actor.switchToFlying()
        PlayerManagerExtesion.rpcPlayAnimation(this.actor, "47758", 0)
        if (this.screenEffect) this.screenEffect.play()
        if (this._tween) this._tween.start()
    }

    /**解冻 */
    unFrozen() {
        if (this.actor.player) {
            Event.dispatchToLocal(SkatingEnable)
            mw.UIService.getUI(PlayerCtrlUI).isJump = true
            let itemObj = Singleton.getIns(ScriptManager).getScriptOnPlayer(Player.localPlayer.playerId, ItemObj)
            itemObj.unFrozen(this.actor.player)
        } else {
            this.actor.setCollision(CollisionStatus.On)
            if (this._iceCubeObj) this._iceCubeObj.setVisibility(false)
        }
        this.actor.movementEnabled = true
        this.actor.jumpEnabled = true
        this.actor.switchToWalking()
        PlayerManagerExtesion.rpcStopAnimation(this.actor, "47758")
        if (this.screenEffect) this.screenEffect.stop()
        if (this._tween) this._tween.stop()
    }

    onUpdate(dt) {
        if (this.isFrozen) {
            //FIXME 会被飞扑或机关打断禁止移动状态, 所以这样判断
            if (this.actor.movementEnabled) this.actor.movementEnabled = false
            if (this.actor.jumpEnabled) this.actor.jumpEnabled = false
            if (this.frozenTime > 0) {
                this.frozenTime -= dt
                if (this.frozenTime <= 0) {
                    this.isFrozen = false
                    this.unFrozen()
                }
            }
        }
    }
}
