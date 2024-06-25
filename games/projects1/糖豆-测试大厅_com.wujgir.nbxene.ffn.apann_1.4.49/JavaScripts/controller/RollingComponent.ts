import { SpeedComponent } from "./SpeedComponent";

const TEMP_VECTOR = new mw.Vector();
export class RollingComponent {
    /**是否翻滚姿态 */
    private _isEnable: boolean = false;
    /**移动的前向量 */
    private _forward: UE.Vector;
    constructor(private character: Character) {

    }

    public onUpdate(dt: number) {
        if (this._isEnable && this._forward) {
            const moveLen = 1000 * dt;
            TEMP_VECTOR.set(this._forward.X * moveLen, this._forward.Y * moveLen, this._forward.Z * moveLen);
            this.character.worldTransform.position = mw.Vector.add(TEMP_VECTOR, this.character.worldTransform.position, TEMP_VECTOR);
        }
    }

    /**进入翻滚 */
    public enable() {
        this._isEnable = true;
    }

    /**离开翻滚 */
    public disable() {
        this._isEnable = false;
    }

    /**绑定一个speed组件用于坡度判断 */
    public link(speed: SpeedComponent) {
        speed.onSlopeChanged.add(this.onSlopeChanged);
    }

    /**坡度改变事件 */
    private onSlopeChanged = (forward: UE.Vector, slope: number) => {
        this._forward = forward;
        if (slope > 0.3) {
            this.enable();
        } else if (slope < 0.01) {
            this.disable();
        }
    }
}