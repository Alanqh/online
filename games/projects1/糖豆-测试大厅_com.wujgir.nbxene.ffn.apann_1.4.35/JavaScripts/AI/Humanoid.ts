import { PlayerManagerExtesion } from '../Modified027Editor/ModifiedPlayer';
/** 
 * @Author       : lei.zhao
 * @Date         : 2023-01-31 18:34:11
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-05-30 14:37:41
 * @FilePath     : \stumbleguys\JavaScripts\AI\Humanoid.ts
 * @Description  : 修改描述
 */

import { GameConfig } from "../config/GameConfig";
import { AIFsm } from "./states/AIFsm";

export class Humanoid {

    private isPause: boolean = false;
    private fsm: AIFsm;
    private _condition: () => boolean;
    private _checkPoint: mw.Vector;
    /**
     * 复活倒计时
     */
    private _respawnTime: number = 0;
    /**行走路径点 */
    private waypoints: Vector[];
    private currentTarget: Vector;
    /**乱走半径 */
    private _range: number = 200;
    /**是否淘汰 */
    private _isEliminate: boolean = true;

    private hitAnimation: mw.Animation;
    constructor(public character: Character, public dist: mw.Vector, public cfg: { name: string, skinId: number, garnitureId: number, seat: number }) {
        this.fsm = new AIFsm(this.character);
        this._checkPoint = GameConfig.GameInfo.getElement(1).spawns[cfg.seat];
        this.hitAnimation = PlayerManagerExtesion.loadAnimationExtesion(this.character, "14701");
        this.hitAnimation.loop = 5;

        if (SystemUtil.isServer()) {
            Event.addClientListener("Bubble.In", (player, guid: string, location: mw.Vector, time: number, height: number) => {
                if (guid == this.character.gameObjectId) {
                    this.fsm.bubble(location, time, height);
                }
            });
        }
    }
    public beHit() {
        this.hitAnimation.play();
    }
    /**逻辑入口 */
    public onUpdate(dt: number) {
        if (this._isEliminate) return false;
        if (this._respawnTime > 0) {
            this._respawnTime -= dt;
            if (this._respawnTime <= 0) {
                this.character.worldTransform.position = this._checkPoint;
                this.character.ragdollEnabled = false;
                Event.dispatchToLocal("AI.Respawn.Server", this.character);
            }
        } else {
            if (!this.isPause) {
                this.fsm.onUpdate(dt);
            } else {
                this.isPause = !this._condition();
            }
        }

    }
    /**
     * 
     * 切换到行走姿态
     */
    public switchToWalk() {
        this.character.switchToWalking();
    }
    /**
     * 直接走到目标点，如果要寻路使用PathService
     * @param position 
     * @returns 
     */
    private walkTo(position: Vector, isForce: boolean = false) {
        this.currentTarget = position;
        this.fsm.walkTo(position, this.onReachPoint, isForce);
    }
    private onReachPoint = (point: mw.Vector) => {
        const index = this.waypoints.indexOf(point) + 1;
        if (index < this.waypoints.length) {
            this.walkTo(this.waypoints[index]);
        }
    }
    public setWalkPoints(waypoints: Vector[]) {
        if (waypoints.length == 0) return;
        this.waypoints = waypoints;
        this.walkTo(waypoints[0], true);
    }
    /**
     * 记录点
     * @param position 
     */
    public checkpoint(position: mw.Vector) {
        this._checkPoint = position;
    }
    /**
     * 淘汰
     */
    public eliminate() {
        Event.dispatchToLocal("AI.Eliminate.Server", this.character);
        this.character.ragdollEnabled = false;
        this.character.switchToFlying();
        this.character.worldTransform.position = new Vector(0, 0, -10000);
        this._isEliminate = true;
    }
    public stop() {
        this.hitAnimation.stop();
        this._isEliminate = true;
    }

    /**重生 */
    public respawn() {
        this.character.switchToWalking();
        this.character.ragdollEnabled = false;
        this._isEliminate = false;
    }

    /**
     * 死亡
     */
    public death() {
        if (this._respawnTime <= 0) {
            this.character.ragdollEnabled = true;
            this._respawnTime = 2;
        }
    }
    /**
     * 等待条件达到后继续执行
     * @param condition 
     */
    public waitForCondition(condition: () => boolean, range: number) {
        this.isPause = true;
        this._range = range;
        this._condition = condition;
    }

}
