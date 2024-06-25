/** 
* @Author       : yuanqi.bai
* @Date         : 2023-02-08 13:20:17
* @LastEditors  : lei.zhao
* @LastEditTime : 2023-07-12 13:17:48
* @FilePath     : \stumbleguys\JavaScripts\prefabs\加速通道\Script\Tunnel.ts
* @Description  : 修改描述
*/

import { Utils } from "../../../tool/Utils";

@Component
export default class Tunnel extends mw.Script {
    @mw.Property({ displayName: "传送速度" })
    private _stableSpeed: number = 3000;

    @mw.Property({ displayName: "出口的抛出冲量" })
    private _forceCount: number = 1000;

    @mw.Property({ displayName: "初始位置" })
    private _startLocation: mw.Vector = new mw.Vector();
    //角色抛出的冲量大小
    private force: mw.Vector;

    //角色移动的单位方向
    private _direction: mw.Vector;

    //本地角色
    private _character: Character;

    private _startMoving: boolean = false;

    //角色移动的计算暂存向量
    private _scaleDirection: mw.Vector = new mw.Vector(0, 0, 0);

    private _AI: Character[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        if (this.isRunningClient()) {
            this._character = (await Player.asyncGetLocalPlayer()).character;
            this._direction = this.gameObject.worldTransform.getForwardVector();
            this.force = this._direction.clone().multiply(this._forceCount);

            let trigger: mw.Trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add((other: mw.GameObject) => {
                if (other instanceof Character) {

                    if (other == this._character) {
                        this._character.switchToFlying();
                        //FEAT 将玩家设置到管道中线
                        // this._character.worldTransform.position = this.projection(this._direction, this._character.worldTransform.position, this.gameObject.worldTransform.position);
                        this._character.worldTransform.position = this._startLocation;
                        this._character.lookAt(this._character.worldTransform.position.add(this._direction));
                        this._startMoving = true;
                    } else if (Utils.isNpc(other)) {
                        other.switchToFlying();
                        other.worldTransform.position = this._startLocation;
                        other.lookAt(other.worldTransform.position.add(this._direction));
                        this._AI.push(other);
                    }
                }
            });
            trigger.onLeave.add((other: mw.GameObject) => {
                if (other instanceof Character) {

                    if (other == this._character) {
                        this._startMoving = false;
                        this._character.addImpulse(this.force, true);
                        this._character.switchToWalking();
                    } else if (Utils.isNpc(other)) {
                        other.addImpulse(this.force, true);
                        other.switchToWalking();
                        this._AI.splice(this._AI.indexOf(other), 1);
                    }
                }
            });
            this.useUpdate = true;
        } else {
            this._direction = this.gameObject.worldTransform.getForwardVector();
            this.force = this._direction.clone().multiply(this._forceCount);

            let trigger: mw.Trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add((other: mw.GameObject) => {
                if (other instanceof Character) {

                    if (Utils.isNpc(other)) {
                        other.switchToFlying();
                        other.worldTransform.position = this._startLocation;
                        other.lookAt(other.worldTransform.position.add(this._direction));
                        this._AI.push(other);
                    }
                }
            });
            trigger.onLeave.add((other: mw.GameObject) => {
                if (other instanceof Character) {

                    if (Utils.isNpc(other)) {
                        other.addImpulse(this.force, true);
                        other.switchToWalking();
                        this._AI.splice(this._AI.indexOf(other), 1);
                    }
                }
            });
            this.useUpdate = true;
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.isRunningClient()) {
            if (this._startMoving) {
                mw.Vector.multiply(this._direction, dt * this._stableSpeed, this._scaleDirection)
                this._character.worldTransform.position = this._character.worldTransform.position.add(this._scaleDirection);
            }
        } else {
            for (let i of this._AI) {
                mw.Vector.multiply(this._direction, dt * this._stableSpeed, this._scaleDirection)
                i.worldTransform.position = i.worldTransform.position.add(this._scaleDirection);
            }
        }
    }

}