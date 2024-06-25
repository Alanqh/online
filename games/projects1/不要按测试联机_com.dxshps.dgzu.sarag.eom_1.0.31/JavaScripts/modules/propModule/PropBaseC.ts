import { GameConfig } from "../../config/GameConfig";
import { IToolStatElement } from "../../config/ToolStat";
import { ClassInstance } from "../../tools/ClassInstance/ClassInstance";
import GameComUtils from "../../utils/GameComUtils";
import { P_Prop } from "./P_Prop";
import { PropAimType, PropMoveData, PropMoveStartPosOffsetX, StartPosOffsetZ, distanceRate, parabolaZIncrement, v2Up } from "./PropUtils";




// 客户端道具基类
export class PropBaseC {
    //道具配置
    protected _propCfg: IToolStatElement;
    // 开始坐标
    protected _startPos: Vector = Vector.zero;
    // 检测距离，无所谓，用来算方向
    protected _distance: number;
    // 方向
    protected _dir: Vector = Vector.zero;
    //首次点击方向
    private startDir: Vector = null;
    /**
     * 构造
     * @param propId 道具表id
     */
    constructor(protected propId: number, protected mUI: P_Prop) {
        this._propCfg = GameConfig.ToolStat.getElement(propId);
        this._distance = this._propCfg.range * (1 + distanceRate) + PropMoveStartPosOffsetX;
        this.mUI.initPackData(propId);
    }


    /**
     * 开始绘制
     */
    public drawStart() {
        GameComUtils.resetVector(this._startPos);
        GameComUtils.resetVector(this._dir);
        this.startDir = null;
    }

    /**
     * 投掷预测
     * @param v 摇杆方向
     */
    public drawMove(v: Vector2, isCharFwd: boolean): PropMoveData {
        // 不预测
        if (this._propCfg.aimType == PropAimType.None) {
            return null;
        }

        // 算出终点
        let angle = Vector2.signAngle(v, v2Up);
        let trans = Player.localPlayer.character.worldTransform;
        let forward = isCharFwd ? trans.getForwardVector() : Camera.currentCamera.worldTransform.getForwardVector();
        Vector.add(trans.position, StartPosOffsetZ, this._startPos);
        let tmpV = ClassInstance.newc<Vector>(Vector);
        Vector.cross(Vector.forward, forward, tmpV)
        let angle2 = Vector.angle(Vector.forward, forward);
        angle = angle + (tmpV.z > 0 ? angle2 : -angle2);

        this.getEndPoint(this._startPos, angle, this._distance, tmpV);
        Vector.subtract(tmpV, this._startPos, this._dir);
        ClassInstance.delete(tmpV);

        // 修改起点
        let tmpV2 = ClassInstance.newc<Vector>(Vector);
        Vector.normalize(this._dir, this._dir);
        if (!this.startDir) { this.startDir = this._dir.clone(); }
        if (isCharFwd) { this._dir = this.startDir.clone(); }
        Vector.multiply(this._dir, PropMoveStartPosOffsetX, tmpV2);
        Vector.add(this._startPos, tmpV2, this._startPos);
        ClassInstance.delete(tmpV2);
        this._dir.z = parabolaZIncrement;
        if (this._propCfg.aimType == PropAimType.Line) {
            // 直线，修改z
            this._dir.z = 0;
        }

        return { startPos: this._startPos, dir: this._dir };
    }

    /**
     * 根据起始点、角度、距离获取终点
     * @param startPos 开始坐标
     * @param angle 角度
     * @param distance 距离
     * @param tmpV 临时变量
     */
    private getEndPoint(startPos: Vector, angle: number, distance: number, tmpV: Vector) {
        tmpV.x = startPos.x + distance * Math.cos(angle * Math.PI / 180);
        tmpV.y = startPos.y + distance * Math.sin(angle * Math.PI / 180);
        tmpV.z = startPos.z;
    }

    /**
     * 预测结束
     * @returns 返回方向
     */
    public drawEnd(): PropMoveData {
        if (this._startPos.equals(Vector.zero)) {
            this._startPos = Player.localPlayer.character.worldTransform.position;
            this._dir = Player.localPlayer.character.worldTransform.getForwardVector().normalized;
            this._dir.z = parabolaZIncrement;
            if (this._propCfg.aimType == PropAimType.Line) {
                this._dir.z = 0;
            }
        }
        return { startPos: this._startPos, dir: this._dir };
    }

    /**
     * 取消预测
     */
    public drawCancel() {

    }

    /**使用过程中被强行中断 */
    public breakProp() {
        if (!this._propCfg.aimType) {
            return;
        }
        this.drawCancel();
    }

    /**
     * 销毁
     */
    public destoryProp() {
        this.mUI.clearPropUI();
    }

}
