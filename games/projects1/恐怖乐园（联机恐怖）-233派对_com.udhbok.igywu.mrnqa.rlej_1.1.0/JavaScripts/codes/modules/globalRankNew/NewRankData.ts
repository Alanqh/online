import { EBaseRankDataType, NewRankDefine } from "./NewRankDefine";
import { NewRankModuleC } from "./NewRankModuleC";

/** 基础要同步的数据 - 为减少存储压力都用首字母的简写 */
export class NewRankDataInfoBase {
    /** userId */
    i: string;
    /** 姓名 */
    n: string;
    /** 通关数据 */
    v: number;
}

/**
 * 全服排行榜实例
 */
@Component
export default class NewRankData<Info extends NewRankDataInfoBase> extends Script {

    /** 缓存数据 */
    private _cacheData: Info[] = [];

    /** 正在同步中不会再进行同步 */
    private _isUpdate = false;

    /** 额外数据的 */
    @Property({ hideInEditor: true, replicated: true })
    private _customKey: EBaseRankDataType = EBaseRankDataType.PlayerLevel;

    /** 同步数据 */
    @Property({ hideInEditor: true, replicated: true, onChanged: "onDataChange" })
    private _dataReplicated: string = "";

    /**
     * 初始化不同难度的脚本
     * @param key 难度
     */
    public server_init(key: EBaseRankDataType) {
        this._customKey = key;
        this.updateData();
        setInterval(() => {
            this.forceUpdateData();
            Player.getAllPlayers().forEach(p => {
                this.refreshPanel(p);
            });
        }, NewRankDefine.AutoUpdateCacheTime * 1e3);
    }

    @RemoteFunction(Client)
    public refreshPanel(player: Player) {
        // 下面这样调用会循环引用
        // newRankPanelMgrIns.getPanel(this._customKey).refresh();
        Event.dispatchToLocal("evt_refreshNewRankPanel", this._customKey);
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

    /** 新包key */
    private getNewKey() {
        // 每种类型的排行榜所有游戏用一个key就行了
        return `NewGlobalRank_${this._customKey}`;
    }

    /** 更新数据 */
    private updateData() {
        if (this._isUpdate) return;
        this.forceUpdateData();
        setTimeout(() => { this._isUpdate = false; }, NewRankDefine.RankDataSaveTime);
    }

    /** 忽视update，强制更新缓存到kv服务器 */
    public forceUpdateData() {
        DataStorage.asyncGetData(this.getNewKey()).then(this.onGetData.bind(this));
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
            DataStorage.asyncSetData(this.getNewKey(), this._cacheData);
        }
    }

    /** 用新数据更新缓存 */
    private updateCache(data: Info[], updateName: boolean = true) {
        data.forEach((info) => {
            const index = this._cacheData.findIndex((item) => item.i === info.i);
            if (index === -1) {
                this._cacheData.push(info);
            } else {
                // 更新
                if (this._cacheData[index].v < info.v) {
                    this._cacheData[index].v = info.v;
                }
                // 平台名字变了，更新名字
                if (info.n != null && updateName && this._cacheData[index].n != info.n) {
                    this._cacheData[index].n = info.n;
                }
            }
        });
        // 重新排序
        this._cacheData.sort((a, b) => b.v - a.v);
        // 遍历cacheData，保证50名之后的玩家不存name
        this._cacheData.forEach((a, index) => { if (index > NewRankDefine.MaxRankItemViewLength) { a.n = null; } });
        // 保留前多少位
        if (this._cacheData.length > NewRankDefine.MaxRankItemSaveLength) { this._cacheData.length = NewRankDefine.MaxRankItemSaveLength; }
        // 同步给客户端 - 只同步可见的，同步太多会同步失败
        this._dataReplicated = JSON.stringify(this._cacheData.slice(0, NewRankDefine.MaxRankItemViewLength));
    }

    /** 客户端排行榜模块 */
    private _rankModuleC: NewRankModuleC;

    private get rankModuleC() {
        if (!this._rankModuleC) {
            this._rankModuleC = ModuleService.getModule(NewRankModuleC);
        }
        return this._rankModuleC;
    }

    /** 同步到客户端 */
    private onDataChange() {
        let data = JSON.parse(this._dataReplicated) as Info[];
        this.rankModuleC["actionCall"](this._customKey, data);
    }
}