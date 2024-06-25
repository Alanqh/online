/*
 * @Author       : dal
 * @Date         : 2023-11-20 09:57:59
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-05 13:51:27
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRank\GlobalRankModuleC.ts
 * @Description  : 
 */
import { DegreeType } from "../blackboard/BoardDefine";
import { GlobalRankDataInfoBase } from "./GlobalRankData";
import { GlobalRankDefine } from "./GlobalRankDefine";
import { GlobalRankModuleS } from "./GlobalRankModuleS";
import PlayerRankData from "./PlayerRankData";
import UIGlobalRankPanel from "./ui/UIGlobalRankPanel";

export class GlobalRankModuleC extends ModuleC<GlobalRankModuleS, PlayerRankData> {
    /** 事件同步 */
    private actionMap: Map<number, Action1<any>> = new Map();

    /** 本地缓存的数据 */
    private _dataMap: Map<number, any> = new Map();

    override onAwake(): void {
        // 2024.5.24不再维护，注释节省性能
        return;
        // 先唤醒排行榜UI
        this.rankPanel;
    }

    override onStart(): void {
        this.initData();
    }

    public get dataMap() {
        return this._dataMap;
    }

    private get rankPanel() {
        return UIService.getUI(UIGlobalRankPanel);
    }

    private initData() {
        // 2024.5.24不再维护，注释节省性能
        return;
        // 这个现在没用了，就不初始化了，节省点性能
        GlobalRankDefine.RankDataTypeList.forEach((rankType) => {
            this.rankPanel.addDegree(rankType);
        });
    }

    /**
     * 设置通过时间
     * @param key 难度
     * @param passTime 通过时间 （需要传秒） 
     */
    public reqSetPassTime(key: DegreeType, passTime: number) {
        if (Number.isNaN(passTime)) return;
        if (!this.data.isBreakingRecord(key, passTime)) { return; }
        console.log("DEBUG>>>>>>> reqSetScore key:" + key + " passTime:" + passTime);
        this.reqSetData(key,
            {
                i: this.localPlayer.userId,
                n: SystemUtil.isMobile() ? AccountService.getNickName() : this.localPlayer.character.displayName,
                t: passTime
            });
    }

    /** 拿自己的排名 */
    public async reqGetSelfRank(degreeType: DegreeType): Promise<number> {
        return this.server.net_reqGetSelfRank(degreeType, this.localPlayer.userId);
    }


    /** 拿自己的分数 */
    public reqGetSelfScore(key: DegreeType): number {
        return this.data.getRankScore(key);
    }

    /** 请求修改数据 */
    private reqSetData<Info extends GlobalRankDataInfoBase>(key: DegreeType, data: Info) {
        this.server.net_reqSetData(key, JSON.stringify(data));
    }

    /** // 添加监听 */
    public addViewAction<Info extends GlobalRankDataInfoBase>(key: DegreeType, action: (info: Info[]) => void) {
        if (!this.actionMap.has(key)) { this.actionMap.set(key, new Action1<Info[]>()); }

        if (this._dataMap.has(key)) { action(this._dataMap.get(key)); }

        this.actionMap.get(key).add(action);
    }

    /** 数据改变的回调 */
    protected actionCall<Info extends GlobalRankDataInfoBase>(key: DegreeType, data: any) {
        this._dataMap.set(key, data);

        if (!this.actionMap.has(key)) { this.actionMap.set(key, new Action1<Info[]>()); }

        this.actionMap.get(key).call(data);
    }

    /**
     * 请求设置通关数据
     */
    public reqSetEndingData(endId: number, degree: DegreeType, passTime: number) {
        this.server.net_setPassData(endId, degree, passTime, this.localPlayer.userId);
    }
}
