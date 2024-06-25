/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-15 19:37:21
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-06-09 11:08:43
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\传送带\Script\ConveryImpulse.ts
 * @Description  : 传送带冲量，用于角色离开传送带的位置
 */
const TEMP = new mw.Vector();
const TEMPOUT = new mw.Vector();
export class ConveryImpulse {
    private maxSpeed = 0;
    private isStart = false;
    private _moving = false;
    public guid: string;
    private addSpeed: number = 0;
    constructor(private character: Character) {
        this.guid = character.gameObjectId;
    }
    /**更新参数 */
    public invalidate(dir: mw.Vector, speed: number) {
        TEMP.set(dir.x, dir.y, dir.z);
        this.maxSpeed = speed;
        this.addSpeed = speed / 3;
        this.isStart = true;
    }
    set moving(active: boolean) {
        this._moving = active;
    }
    get moving() {
        return this._moving;
    }
    get worldLocation() { return this.character.worldTransform.position; }
    set worldLocation(v: mw.Vector) { this.character.worldTransform.position = v }

    public onUpdate(dt: number) {
        if (!this.isStart) return;
        const isJump = this.character.isJumping;
        // this.character["syncSetMovementMode"](0);
        if (isJump) {
            mw.Vector.multiply(TEMP, dt * this.maxSpeed, TEMPOUT);
            if (this.maxSpeed > 200) {
                this.maxSpeed -= dt * 100;
            }
            mw.Vector.add(this.character.worldTransform.position, TEMPOUT, TEMPOUT);
            this.character.worldTransform.position = TEMPOUT
        } else {
            this.character.addImpulse(mw.Vector.multiply(TEMP, this.maxSpeed * 0.5, TEMPOUT), true)
        }
        this.isStart = isJump;
    }

}