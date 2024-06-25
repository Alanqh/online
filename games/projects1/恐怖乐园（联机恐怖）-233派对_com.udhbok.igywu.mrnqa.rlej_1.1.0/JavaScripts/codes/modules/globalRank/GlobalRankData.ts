import { GlobalRankModuleC } from "./GlobalRankModuleC";
import { DegreeType } from "../blackboard/BoardDefine";
import { GlobalDefine } from "../../../DefNoSubModule";
import RouteConst from "../route/RouteConst";
import { EGameTheme, GamesStartDefines, SubGameThemeArr } from "../../Defines";
import { GlobalRankDefine } from "./GlobalRankDefine";

/** 基础要同步的数据 - 为减少存储压力都用首字母的简写 */
export class GlobalRankDataInfoBase {
    /** userId */
    i: string;
    /** 姓名 */
    n: string;
    /** 通关数据*/
    t: number;
}

/**
 * @deprecated 2024.5.4 没维护了，用新全服排行榜数据
 */
@Component
export default class GlobalRankData<Info extends GlobalRankDataInfoBase> extends Script {

    /** 缓存数据 */
    private _cacheData: Info[] = [];

    /** 正在同步中不会再进行同步 */
    private _isUpdate = false;

    /** 额外数据的 */
    @Property({ hideInEditor: true, replicated: true })
    private _customKey: number = DegreeType.Simple;

    /** 同步数据 */
    @Property({ hideInEditor: true, replicated: true, onChanged: "onDataChange" })
    private _dataReplicated: string = "";

    /**
     * 初始化不同难度的脚本
     * @param key 难度
     */
    public server_init(key: DegreeType) {
        // 2024.5.24不再维护，注释节省性能
        return;
        this._customKey = key;
        this.updateData();
    }

    /** 获取排行榜数据 */
    public getDataArray(): Info[] {
        return this._cacheData;
    }

    /** 设置排行榜数据 */
    public setData(info: Info) {
        if (!info.i) return;
        this.updateCache([info]);
        this.updateData();
    }

    /** 老包key */
    private static getOldKey(key: number) {
        return `ScarySchool_GlobalRank_${key}`;
    }

    /** 管理员去调用一次就迁移了 */
    public static async migrate() {
        if (SystemUtil.isPIE) { return; }
        console.error(`DEBUG MyTypeError>>> 开始迁移全服排行榜数据`);
        await SubGameThemeArr.forEach(async (v) => {
            for (let index = 1; index <= 5; index++) {
                let dataRes = await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(v), this.getOldKey(index));
                let data = dataRes.data as GlobalRankDataInfoBase[];
                if (data) {
                    DataStorage.asyncSetData(this.getNewKey(index, v), data);
                    console.log(`DEBUG>>> 排行榜${index}数据迁移完成 ${JSON.stringify(data)}`);
                }
            }
        });

        console.error(`DEBUG MyTypeError>>> 全服排行榜数据迁移完成`);
    }

    /** 新包key */
    private static getNewKey(key: number, gameTheme?: EGameTheme) {
        return `${gameTheme ? gameTheme : GamesStartDefines.gameTheme}_GlobalRank_${key}`;
    }

    /** 更新数据 */
    private updateData() {
        // 2024.5.24不再维护，注释节省性能
        return;
        if (this._isUpdate) return;
        this.forceUpdateData();
        setTimeout(() => { this._isUpdate = false; }, GlobalRankDefine.RankDataSaveTime);
    }

    /** 忽视update，强制更新缓存到kv服务器 */
    public forceUpdateData() {
        // 2024.5.24不再维护，注释节省性能
        return;
        if (SystemUtil.isMobile() && GlobalDefine.MainPackageGameID !== "") {
            DataStorage.asyncGetData(GlobalRankData.getNewKey(this._customKey)).then(this.onGetData.bind(this));// DataStorage.asyncGetOtherGameData(GlobalDefine.MainPackageGameID, GlobalRankPrefix + this._customKey).then(this.onGetData.bind(this));
        } else {
            DataStorage.asyncGetData(GlobalRankData.getNewKey(this._customKey)).then(this.onGetData.bind(this));
        }
    }

    /** 获取到数据的回调 */
    private onGetData(res: DataStorageResult) {
        let isChanged = false;
        if (res.code === DataStorageResultCode.Success && res.data) {
            this.updateCache(res.data, false);
            if (JSON.stringify(res.data) !== JSON.stringify(this._cacheData)) { isChanged = true; }
        } else {
            // 初始化默认数据
            isChanged = true;
        }
        if (isChanged) {
            this._isUpdate = true;
            DataStorage.asyncSetData(GlobalRankData.getNewKey(this._customKey), this._cacheData);
        }
    }

    /** 用新数据更新缓存 */
    private updateCache(data: Info[], updateName: boolean = true) {
        // 2024.5.24不再维护，注释节省性能
        return;
        data.forEach((info) => {
            const index = this._cacheData.findIndex((item) => item.i === info.i);
            if (index === -1) {
                this._cacheData.push(info);
            } else {
                // 通关时间小于从前，更新通关时间
                if (this._cacheData[index].t > info.t) {
                    this._cacheData[index].t = info.t;
                }
                // 平台名字变了，更新名字
                if (info.n != null && updateName && this._cacheData[index].n != info.n) {
                    this._cacheData[index].n = info.n;
                }
            }
        });
        // 重新排序
        this._cacheData.sort((a, b) => a.t - b.t);
        // 遍历cacheData，保证50名之后的玩家不存name
        this._cacheData.forEach((a, index) => { if (index > GlobalRankDefine.MaxRankItemViewLength) { a.n = null; } });
        // 保留前多少位
        if (this._cacheData.length > GlobalRankDefine.MaxRankItemSaveLength) { this._cacheData.length = GlobalRankDefine.MaxRankItemSaveLength; }
        // 同步给客户端 - 只同步可见的，同步太多会同步失败
        this._dataReplicated = JSON.stringify(this._cacheData.slice(0, GlobalRankDefine.MaxRankItemViewLength));
    }

    /** 客户端排行榜模块 */
    protected globalRankModuleC: GlobalRankModuleC;

    /** 同步到客户端 */
    private onDataChange() {
        let data = JSON.parse(this._dataReplicated) as Info[];
        if (this.globalRankModuleC) {
            this.globalRankModuleC["actionCall"](this._customKey, data);
        } else {
            let inter = setInterval(() => {
                let globalRandModuleC = ModuleService.getModule(GlobalRankModuleC);
                if (globalRandModuleC) {
                    this.globalRankModuleC = globalRandModuleC;
                    globalRandModuleC["actionCall"](this._customKey, data);
                    clearInterval(inter);
                }
            }, 100);
        }
    }
}