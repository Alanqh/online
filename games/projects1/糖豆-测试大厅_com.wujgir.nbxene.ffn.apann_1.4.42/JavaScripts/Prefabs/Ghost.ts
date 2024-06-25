import { CLAI } from "../AI/client/ClientAIService";
import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { ZwtTween } from "../tool/ZwtTween";
import GhostStateController, { GhostScareState, GhostSleepState } from "./GhostFSM";

export enum GhostState {
    SLEEP,
    IDLE,
    SCARE
}
@Component
export default class Ghost extends mw.Script {
    @mw.Property({ displayName: "触发器", capture: true })
    private trigger: string = "";
    @mw.Property({ displayName: "小幽灵", capture: true })
    private ghost: string = "";
    @mw.Property({ displayName: "出现特效", capture: true })
    private showEffect: string = "";
    @mw.Property({ displayName: "光圈特效", capture: true })
    private idleEffect: string = "";

    private _ghostObj: GameObject = null
    private _showEffect: Effect = null
    private _idleEffect: Effect = null
    private _isScaring: boolean = false
    private _character: mw.Character
    private _inputVec: Vector2 = Vector2.zero
    private _canScare: boolean = false
    private triggerObj: mw.Trigger

    private tweenIdle: mw.Tween<{ rot: Rotation }> = null

    private _ghostStateController: GhostStateController = new GhostStateController()

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let temp = Vector.zero
        this.useUpdate = true
        this._character = Player.localPlayer.character
        this._showEffect = GameObject.findGameObjectById(this.showEffect) as Effect

        GameObject.asyncFindGameObjectById(this.idleEffect).then((effect: Effect) => {
            this._idleEffect = effect
            this._ghostStateController.SetState(new GhostSleepState(this._ghostStateController, effect, this.ghost))
        })

        //idle状态
        Event.addLocalListener("GhostIdleState", (ghostID: string) => {
            // this.triggerObj.enabled = (true)
            if (ghostID == this.ghost) {
                //找到幽灵模型
                setTimeout(() => {
                    this._canScare = true
                }, 500);
                GameObject.asyncFindGameObjectById(this.ghost).then((ghost: mw.GameObject) => {
                    this._ghostObj = ghost
                    this._idleEffect.play()

                    //idle状态
                    this.tweenIdle = new mw.Tween({ rot: new Rotation(0, 0, -40) })
                        .to({ rot: new Rotation(0, 0, 40) }, 2000)
                        .onUpdate((obj) => {
                            ghost.localTransform.rotation = obj.rot
                        })
                        .yoyo(true)
                        .repeat(Infinity)

                    new mw.Tween({ pos: new Vector(0, 0, -100) })
                        .to({ pos: new Vector(0, 0, -75) }, 500)
                        .onUpdate((obj) => {
                            ghost.localTransform.position = obj.pos
                        })
                        .chain(this.tweenIdle)
                        .start();
                });
            }
        })

        GameObject.asyncFindGameObjectById(this.trigger).then((trigger: mw.Trigger) => {
            // this.triggerObj = trigger
            trigger.onEnter.add(obj => {
                //角色碰到反着走
                if (obj instanceof Character && obj.player && this._character.player.playerId == obj.player.playerId && this._canScare) {
                    // trigger.enabled = (false)
                    obj.movementEnabled = false
                    this._isScaring = true
                    obj.maxWalkSpeed = 200
                    this._canScare = false
                    //惊吓状态
                    this._ghostStateController.SetState(new GhostScareState(this._ghostStateController, this._ghostObj, this.tweenIdle, this._showEffect))

                    //眩晕特效
                    let scareEffect = GeneralManager.rpcPlayEffectOnPlayer("142942", this._character.player, mw.HumanoidSlotType.Head, 0, new Vector(0, 0, 50), Rotation.zero, new Vector(1, 1, 1));
                    //音效
                    SoundService.playSound("130793");
                    SoundService.playSound("135455");

                    setTimeout(() => {
                        obj.movementEnabled = true
                        this._isScaring = false
                        obj.maxWalkSpeed = 450
                        this._idleEffect.forceStop()
                        //停止特效
                        EffectService.getEffectById(scareEffect).then(effect => {
                            if (effect) effect.forceStop()
                        })

                        new ZwtTween(this._ghostObj)
                            .moveTo(new Vector(0, 0, -120), 0.5, true)
                            .delay(2)
                            .moveTo(new Vector(0, 0, -100), 0.3, true)
                            .start()

                        setTimeout(() => {
                            this._ghostStateController.SetState(new GhostSleepState(this._ghostStateController, this._idleEffect, this.ghost))
                        }, 2800);
                    }, 1500);
                }
                else if (PlayerManagerExtesion.isNpc(obj) && this._canScare) {
                    this._canScare = false

                    // trigger.enabled = (false)
                    //AI踩上去
                    // let clothObject = Singleton.getIns(ScriptManager).getScriptOnPlayer(obj, this);
                    const robot = CLAI.getRobot(obj)
                    robot && robot.addMoveInput(mw.Vector.multiply(trigger.worldTransform.getRightVector(), 1, temp), 1.5, 0.2);
                    //惊吓状态
                    this._ghostStateController.SetState(new GhostScareState(this._ghostStateController, this._ghostObj, this.tweenIdle, this._showEffect))

                    //眩晕特效
                    let scareEffect = GeneralManager.rpcPlayEffectOnGameObject("142942", obj, 0, new Vector(0, 0, 60), Rotation.zero, new Vector(1, 1, 1));
                    setTimeout(() => {
                        //停止特效
                        EffectService.getEffectById(scareEffect).then(effect => {
                            if (effect) effect.forceStop()
                        })

                        new ZwtTween(this._ghostObj)
                            .moveTo(new Vector(0, 0, -120), 0.5, true)
                            .delay(2)
                            .moveTo(new Vector(0, 0, -100), 0.3, true)
                            .start()

                        setTimeout(() => {
                            this._ghostStateController.SetState(new GhostSleepState(this._ghostStateController, this._idleEffect, this.ghost))
                        }, 2800);
                    }, 1500);
                }
            });
        });

        Event.addLocalListener("JoystickMove", (vec: Vector2) => {
            if (!this._isScaring) {
                this._inputVec = vec.clone().multiply(-1)
            }
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this._isScaring) {
            this._character.movementEnabled = true
            this._character.addMovement(new Vector(this._inputVec.y, this._inputVec.x, 0))
            this._character.movementEnabled = false
        }

        this._ghostStateController.StateUpdate()
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}