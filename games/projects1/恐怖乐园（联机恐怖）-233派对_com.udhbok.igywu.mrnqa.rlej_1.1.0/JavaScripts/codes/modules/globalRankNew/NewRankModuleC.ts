/*
 * @Author       : dal
 * @Date         : 2024-05-24 14:04:24
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-28 18:01:05
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\NewRankModuleC.ts
 * @Description  : 
 */
import { NewPlayerRankData } from "./NewPlayerRankData";
import { NewRankDataInfoBase } from "./NewRankData";
import { EBaseRankDataType } from "./NewRankDefine";
import { NewRankModuleS } from "./NewRankModuleS";

/**
 * GlobalRank模块Client端
 */
export class NewRankModuleC extends ModuleC<NewRankModuleS, NewPlayerRankData> {

    /**
     * 获取玩家的基础信息数组
     * @param userIdArr 需要一个排行在前三得玩家userId数组
     */
    public getUserBaseInfoArr(userIdArr: string[]) {
        return this.server.net_getUserBaseInfoArr(userIdArr);
    }

    /** 事件同步 */
    private actionMap: Map<EBaseRankDataType, Action1<any>> = new Map();

    /** 本地缓存的数据 */
    private _dataMap: Map<EBaseRankDataType, any> = new Map();

    override onAwake(): void {
    }

    override onStart(): void {
    }

    public get dataMap() {
        return this._dataMap;
    }

    /** 拿自己的排名 */
    public async reqGetSelfRankInfo(type: EBaseRankDataType): Promise<number[]> {
        return this.server.net_reqGetSelfRankInfo(type, this.localPlayer.userId);
    }

    /** // 添加监听 */
    public addViewAction<Info extends NewRankDataInfoBase>(key: EBaseRankDataType, action: (info: Info[]) => void) {
        if (!this.actionMap.has(key)) { this.actionMap.set(key, new Action1<Info[]>()); }

        if (this._dataMap.has(key)) { action(this._dataMap.get(key)); }

        this.actionMap.get(key).add(action);
    }

    /** 数据改变的回调 */
    protected actionCall<Info extends NewRankDataInfoBase>(key: EBaseRankDataType, data: any) {
        this._dataMap.set(key, data);

        if (!this.actionMap.has(key)) { this.actionMap.set(key, new Action1<Info[]>()); }

        this.actionMap.get(key).call(data);
    }
}
