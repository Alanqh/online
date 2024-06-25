/*
 * @Author       : dal
 * @Date         : 2023-11-23 09:58:50
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-23 19:34:03
 * @FilePath     : \1003_hospital\JavaScripts\codes\modules\archive\ArchiveData.ts
 * @Description  : 
 */

import { EGameTheme, GamesStartDefines } from "../../Defines";
import { MapEx } from "../../utils/MapEx";
import RouteConst from "../route/RouteConst";
import { MaxArchiveNum } from "./ArchiveHelper";

export default class PlayerArchiveData extends Subdata {

    /**
     * @deprecated 不再维护（2024/5/23），用newRankDataMap
     */
    @Decorator.persistence()
    clickCountMap: MapEx.MapExClass<number> = {};

    /** 已通过的关卡 key 是游戏主题 */
    @Decorator.persistence()
    newClickCountMap: MapEx.MapExClass<MapEx.MapExClass<number>> = {};

    public getNewClickCountMap(gameTheme?: EGameTheme) {
        if (!gameTheme) { gameTheme = GamesStartDefines.gameTheme; }
        if (!(MapEx.has(this.newClickCountMap, gameTheme))) {
            MapEx.set(this.newClickCountMap, gameTheme, {});
        }
        return MapEx.get(this.newClickCountMap, gameTheme);
    }

    /** 需要该数据的游戏 */
    private readonly needFixGameThemeArr: EGameTheme[] = [EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town];

    /**
     * 初始化通关难度map重置迁移一次数据
     * 之前迁移的数据有问题，重新迁移一次
     */
    private reMigrateData() {
        this.needFixGameThemeArr.forEach(v => {
            MapEx.set(this.newClickCountMap, v, this.clickCountMap);
        });
    }


    protected get version(): number {
        return 2;
    }

    /** 是否需要重新迁移数据 */
    private needReMigrate = true;

    protected onDataInit(): void {

        while (this.currentVersion != this.version) {
            switch (this.currentVersion) {
                case 1:
                    this.currentVersion = 2;
                    this.needReMigrate && this.reMigrateData();
                    break;
                default:
                    console.error("未处理的数据版本", this.currentVersion);
                    this.currentVersion = this.version;
                    break;
            }
            this.save(false);
        }
    }


    /** 数据迁移 */
    public async migrate(userId: string) {
        const oldKey = `${userId}_SubData_PlayerArchiveData`;
        const dataRes = (await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(GamesStartDefines.gameTheme), oldKey)).data as PlayerArchiveData;
        MapEx.set(this.newClickCountMap, GamesStartDefines.gameTheme, dataRes["clickCountMap"]);
        this.save(true);
        console.log(`DEBUG>>> 迁移PlayerArchiveData数据成功 this.clickCountMap = ${JSON.stringify(this.newClickCountMap)}`);
    }

    protected override initDefaultData(): void {
        this.needReMigrate = false;
        for (let index = 0; index < MaxArchiveNum; index++) { MapEx.set(this.getNewClickCountMap(), index, 1); }
        this.save(true);
    }

    /** 获取读档次数 */
    public getClickCount(id: number) {
        if (!MapEx.has(this.getNewClickCountMap(), id)) { return -1; }
        return MapEx.get(this.getNewClickCountMap(), id);
    }

    /** 增加读档次数 */
    public addClickCount(id: number) {
        MapEx.set(this.getNewClickCountMap(), id, this.getClickCount(id) + 1);
        this.save(true);
    }

    /** 初始化读档次数 */
    public initClickCount(id: number) {
        MapEx.set(this.getNewClickCountMap(), id, 1);
        this.save(true);
    }
}