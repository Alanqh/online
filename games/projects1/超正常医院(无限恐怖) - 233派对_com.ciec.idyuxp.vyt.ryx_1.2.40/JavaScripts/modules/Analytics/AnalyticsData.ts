import { MapEx } from "odin";

/**
 * 埋点数据
 */
export class AnalyticsData extends Subdata {

    /**玩家上次登陆日期 */
    @Decorator.persistence()
    public lastLoginDate: number = 0;

    /**偷袭成功次数 */
    @Decorator.persistence()
    public attackCount: number = 0;

    /**玩家死亡个数 */
    @Decorator.persistence()
    public deadCount: number = 0;

    /**玩家解救次数 */
    @Decorator.persistence()
    public saveCount: number = 0;

    /**柜子交互 */
    @Decorator.persistence()
    public cabinetCount: boolean = false;

    /**合体触发器 */
    @Decorator.persistence()
    public combineCount: boolean = false;

    /**首次做 */
    @Decorator.persistence()
    public firstDo: MapEx.MapExClass<boolean> = {};

    /**玩家拾取道具 */
    @Decorator.persistence()
    public pickItemMap: MapEx.MapExClass<boolean> = {};

    /**商业化每天做 */
    @Decorator.persistence()
    public shopFirstDo: MapEx.MapExClass<boolean> = {};

    /**重置数据 */
    public reset() {
        this.attackCount = 0;


        this.deadCount = 0;
        this.saveCount = 0;
        this.pickItemMap = {};
        this.cabinetCount = false;

        this.shopFirstDo = {};
        this.save(true);
    }



}

