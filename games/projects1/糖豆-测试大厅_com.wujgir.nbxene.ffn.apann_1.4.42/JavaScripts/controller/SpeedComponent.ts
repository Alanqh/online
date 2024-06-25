/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-01 16:04:01
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-01 17:00:44
 * @FilePath     : \stumbleguys\JavaScripts\controller\SpeedComponent.ts
 * @Description  : 速度组件，控制角色速度，全局唯一
 */
/**临时Vector */
const END_TEMP = new UE.Vector(0, 0, 0);
/**碰撞结果 */
const OutHitsRef = puerts.$ref(new UE.HitResult());
/**坡度更改阈值 */
const Slope_Modifer = 0.0001;
const MAX_WALKSPEED = 450;
export class SpeedComponent {
    /**上一次检测的坡度 */
    private _lastCheckSlope: number = 0;

    /**坡度改变的监听器 */
    public onSlopeChanged: Action2<UE.Vector, number>;
    constructor(private character: Character) {
        this.onSlopeChanged = new Action2();
    }
    public onUpdate(dt: number) {
        this.checkCollider();

    }

    /**
     * 检测碰撞，决定上坡下坡的加成
     */
    private checkCollider() {
        const start = this.character["actor"].K2_GetActorLocation();
        start.Z -= 80;
        END_TEMP.X = start.X;
        END_TEMP.Y = start.Y;
        END_TEMP.Z = start.Z - 30;
        const isSucc = UE.KismetSystemLibrary.LineTraceSingle(this.character["actor"], start, END_TEMP, UE.ETraceTypeQuery.Visibility, false, null, UE.EDrawDebugTrace.None/*UE.EDrawDebugTrace.ForDuration*/, OutHitsRef, true);
        if (isSucc && OutHitsRef.value) {

            //点乘计算速度加成,0为垂直
            //>0下坡，越靠近1坡越大
            //<0上坡，越靠近-1坡越大
            const forward = this.character["actor"].GetActorForwardVector();
            const impactNormal = OutHitsRef.value.ImpactNormal;
            const dot = forward.X * impactNormal.X + forward.Y * impactNormal.Y + forward.Z * impactNormal.Z;

            if (Math.abs(this._lastCheckSlope - dot) > Slope_Modifer) {
                this._lastCheckSlope = dot;
                this.character.maxWalkSpeed = MAX_WALKSPEED + 100 * dot;
                const right = this.character["actor"].GetActorRightVector();
                this.onSlopeChanged.call(UE.Vector.CrossProduct(right, impactNormal), dot);
            }
        }
    }
}