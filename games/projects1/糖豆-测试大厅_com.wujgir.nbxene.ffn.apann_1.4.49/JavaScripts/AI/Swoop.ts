import { PlayerManagerExtesion } from '../Modified027Editor/ModifiedPlayer';
/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-22 16:26:25
 * @LastEditors  : bao.zhang bao.zhang@appshahe.com
 * @LastEditTime : 2023-07-23 17:42:45
 * @FilePath     : \stumbleguys\JavaScripts\AI\Swoop.ts
 * @Description  : 修改描述
 */
import { AIConst } from "./hook/AIConst";

const TEMP = new mw.Vector();
export class Swoop {
    /**飞扑动画 */
    private animation: mw.Animation;
    constructor(public humanoid: Character, private timeOut: number) {
        this.animation = PlayerManagerExtesion.loadAnimationExtesion(this.humanoid, "122290", SystemUtil.isServer());
        this.animation.loop = 23333;
    }

    public onUpdate(dt: number): boolean {
        if (this.timeOut > 0) {
            this.timeOut -= dt;
            if (this.timeOut <= 0) {
                this.animation.play();
                this.humanoid.gravityScale = 0.5 * AIConst.gravityScale;
            }
        } else {
            this.updatePosition(dt);
            const isEnd = !this.humanoid.isJumping;
            if (isEnd) {
                this.humanoid.gravityScale = AIConst.gravityScale;
                this.animation.stop();
                if (this.humanoid.currentAnimation) {
                    this.humanoid.currentAnimation.stop();
                }
            }
            return isEnd;
        }
    }
    /**更新位置 */
    private updatePosition(dt: number) {
        mw.Vector.multiply(this.humanoid.worldTransform.getForwardVector(), 100 * dt, TEMP);
        this.humanoid.worldTransform.position = mw.Vector.add(this.humanoid.worldTransform.position, TEMP, TEMP);
    }

    public stop() {
        this.timeOut = 0;
        if (this.animation) {
            this.animation.stop();
        }
        if (this.humanoid.currentAnimation) {
            this.humanoid.currentAnimation.stop();
        }
    }
}