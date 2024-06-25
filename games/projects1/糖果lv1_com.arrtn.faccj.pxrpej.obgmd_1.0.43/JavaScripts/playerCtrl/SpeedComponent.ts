/** 
 * @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date         : 2023-04-03 16:24:25
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-10-20 15:23:05
 * @FilePath     : \stumbleguys\JavaScripts\playerCtrl\SpeedComponent.ts
 * @Descripttion : 
 */
import { EFrontSlope } from "./PlayerComponentMgr";

/**临时Vector */
const start1 = new UE.Vector(0, 0, 0);
/**临时Vector */
const END_TEMP = new UE.Vector(0, 0, 0);
/**临时Vector */
const END_TEMP1 = new UE.Vector(0, 0, 0);
/**碰撞结果 */
const OutHitsRef = puerts.$ref(new UE.HitResult());
/**坡度更改阈值 */
const Slope_Modifer = 0;
const DOWN_LENGHT: number = 45;
export class SpeedComponent {
    /**上一次检测的坡度 */
    private _lastCheckSlope: number = 0;
    /**射线击中点法向量 */
    private collDir: UE.Vector = new UE.Vector(0, 0, 0);
    /**是否在地面 */
    public onGround: boolean = true;

    /**角色的前向量 */
    forwardVec: mw.Vector = mw.Vector.zero;
    /**上一次射线法向量 */
    currentImpack: UE.Vector = new UE.Vector(0, 0, 0);
    /**当前角色前方的坡度 */
    private _currentFrontSlope: EFrontSlope = EFrontSlope.Ground;
    /**前方的具体的坡度值 */
    private _currentSlope: number = 0;
    /**是否坡度改变 */
    isEnter: boolean = false;
    /**坡度改变次数 */
    count: number = 0;
    /**当前是否处于地面滑行状态 */
    public currentSlide: boolean = false;

    constructor(private character: Character) {
    }

    public onUpdate(dt: number) {
        this.checkCollider();
    }

    public getCollDir() {
        return this.collDir;
    }


    /**
     * 检测碰撞，决定上坡下坡的加成
     */
    private checkCollider() {
        const start = this.character["actor"].K2_GetActorLocation();
        this.forwardVec = this.character.worldTransform.getForwardVector();
        this.forwardVec.normalize();
        start.Z -= 40;
        start1.X = start.X;
        start1.Y = start.Y;
        start1.Z = start.Z;
        start1.X += this.forwardVec.x * 20;
        start1.Y += this.forwardVec.y * 20;
        start.X -= this.forwardVec.x * 20;
        start.Y -= this.forwardVec.y * 20;
        END_TEMP.X = start.X;
        END_TEMP.Y = start.Y;
        END_TEMP.Z = start.Z - DOWN_LENGHT;
        let isSucc = UE.KismetSystemLibrary.LineTraceSingle(this.character["actor"], start, END_TEMP, UE.ETraceTypeQuery.Visibility, false, null, UE.EDrawDebugTrace.None/*UE.EDrawDebugTrace.ForDuration*/, OutHitsRef, true);
        if (!isSucc) {
            END_TEMP1.X = start1.X;
            END_TEMP1.Y = start1.Y;
            END_TEMP1.Z = start1.Z - DOWN_LENGHT;
            isSucc = UE.KismetSystemLibrary.LineTraceSingle(this.character["actor"], start1, END_TEMP1, UE.ETraceTypeQuery.Visibility, false, null, UE.EDrawDebugTrace.None/*UE.EDrawDebugTrace.ForDuration*/, OutHitsRef, true);
        }
        if (isSucc && OutHitsRef[0]) {
            //点乘计算速度加成,0为垂直
            //>0下坡，越靠近1坡越大
            //<0上坡，越靠近-1坡越大
            if (!this.onGround) {
                const v = this.character.velocity;
                if (v.z < -1100) {
                    Event.dispatchToLocal("PLAY_BY_CFG", 7);
                }
                Event.dispatchToLocal("stopJump");
                this.onGround = this.character.velocity.z <= 0;
            }
            const forward = this.character["actor"].GetActorForwardVector();
            const impactNormal = OutHitsRef[0].ImpactNormal;
            this.collDir = impactNormal;
            if (this.currentSlide) {
                if ((this.collDir.X - this.currentImpack.X < 0.001) && (this.collDir.Y - this.currentImpack.Y) < 0.001 && (this.collDir.Z - this.currentImpack.Z < 0.001)) {
                    this.count++;
                    if (this.count > 1 && !this.isEnter) {
                        this.isEnter = true;
                    }
                } else {
                    this.currentImpack.X = this.collDir.X;
                    this.currentImpack.Y = this.collDir.Y;
                    this.currentImpack.Z = this.collDir.Z;
                    if (this.isEnter) {
                        this.isEnter = false;
                        this.count = 0
                        this.currentImpack.X = 0
                        this.currentImpack.Y = 0
                        this.currentImpack.Z = 0
                        this.currentSlide = false;
                        Event.dispatchToLocal("stopSlide", new mw.Vector());
                    }
                }
            } else {
                if (this.isEnter) {
                    this.isEnter = false;
                }
            }

            const dot = forward.X * impactNormal.X + forward.Y * impactNormal.Y + forward.Z * impactNormal.Z;
            if (Math.abs(this._lastCheckSlope - dot) >= Slope_Modifer) {
                this._lastCheckSlope = dot;
                let temp1 = new UE.Vector(0, 0, 0);
                temp1.X = this.character.worldTransform.getUpVector().x;
                temp1.Y = this.character.worldTransform.getUpVector().y;
                temp1.Z = this.character.worldTransform.getUpVector().z;
                this.changePlayerPoDu(dot)
            }
        } else {
            this.onGround = false;
        }
    }
    /**
     * 改变当前角色面前坡度
     * @param slope 坡度值
     * @param temp 
     */
    changePlayerPoDu(slope: number) {
        this._currentSlope = slope;
        if (slope > 0.05) {
            this._currentFrontSlope = EFrontSlope.Down;
        } else if (slope < -0.05) {
            this._currentFrontSlope = EFrontSlope.Up;
        } else {
            this._currentFrontSlope = EFrontSlope.Ground;
        }
    }
    /**前方的具体的坡度值 */
    get currentSlope() {
        return this._currentSlope;
    }
    /**当前角色前方的坡度 */
    get currentFrontSlope() {
        return this._currentFrontSlope
    }
}