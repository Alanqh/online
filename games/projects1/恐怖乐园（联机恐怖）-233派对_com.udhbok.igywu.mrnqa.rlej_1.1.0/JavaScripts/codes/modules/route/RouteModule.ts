/*
 * @Author       : dal
 * @Date         : 2024-01-23 17:28:12
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-03-26 15:27:09
 * @FilePath     : \1005_town\JavaScripts\codes\modules\route\RouteModule.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { MainUI } from "../../ui/MainUI";
import { RealNameTool, RealNameConditionType } from "../../ui/realName/RealNameUI";
import { WaitLoop } from "../../utils/AsyncTool";
import { LanUtil } from "../../utils/LanUtil";
import { MapEx } from "../../utils/MapEx";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { AchieveService, EAchieveType } from "../achievement/AchieveDefine";
import { BagItemData } from "../bag/BagDefine";
import { BagModuleC } from "../bag/BagModuleC";
import { DegreeType } from "../blackboard/BoardDefine";
import IAPModuleC from "../iap/IAPModuleC";
import { AllGameRouteList } from "../idcard/IDCardConst";
import MissionData from "../mission/MissionData";
import RecordData from "../record/RecordData";
import { JumpListener } from "./JumpListener";
import RouteConst from "./RouteConst";
import { RouteDataHelper, RouteDataType, PassInfo, RouteData } from "./RouteData";
import { EStateIndex, RouteDefine } from "./RouteDefine";

export class RouteModuleC extends ModuleC<RouteModuleS, null> {

    /**
     * 获取某一种类型的数据
     * @param userId 玩家id
     * @param gameTheme 游戏主题
     * @param dataType 数据类型 RouteDataType
     * @returns 某一种数据类型的数据
     */
    public async getData(userId: string, gameTheme: EGameTheme, dataType: string) {
        return this.server.net_getData(userId, gameTheme, dataType);
    }

    /**
     * 检查是否达到最大等级包括额外等级
     * @param itemLevelId 道具配置id
     * @param routeData 路由数据
     * @returns 
     */
    public async checkItemIsMaxLevel(itemLevelId: number, routeData?: RouteData) {
        if (!routeData) { routeData = await this.reqHallRouteData(this.localPlayer.userId); }
        const cfg = GameConfig.ItemLevel.getElement(itemLevelId);
        if (!cfg) { return true; }
        let exLevel = cfg.exLevel ? cfg.exLevel : 0;
        return (cfg.maxLevel + exLevel) <= RouteDefine.getItemLevel(itemLevelId, routeData);
    }

    /**
     * 升级道具
     * @param itemLevelId 道具配置id
     */
    public async upgradeItem(itemLevelId: number) {
        if (await this.checkItemIsMaxLevel(itemLevelId)) {
            console.error(`DEBUG>>> MyTypeError 该道具：${itemLevelId}已是最高等级`);
            return false;
        }
        return await this.server.net_upgradeItem(itemLevelId, this.localPlayer.userId);
    }

    public reqUnlockedItemList() {
        return this.server.net_reqUnlockedItemList(this.localPlayer.userId);
    }

    public reqJumpGame(gameTheme: EGameTheme) {
        const gameThemeCfg = RouteConst.getGameThemeCfg(gameTheme);
        const teamPlayerNum: number = 1;
        const disTime: number = Math.floor((Date.now() - this.startTime) / 1000);
        GhostTraceHelper.uploadMGS("ts_game_over", "开始跳转", { round_id: 997, dead: teamPlayerNum, kill_player: disTime, skill_id: gameThemeCfg.id, stage_level: 0 });
        JumpListener.instance.jumpSelf(gameThemeCfg.levelName);
    }

    public reqSavePassInfo(degree: DegreeType, endCfgId: number) {
        if (endCfgId === null || endCfgId === 0) { return; }
        this.server.net_reqSavePassInfo(this.localPlayer.userId, degree, endCfgId);
    }

    public async reqUnlockedGraphList(): Promise<number[]> {
        if (this.unlockedGraphList.length != 0) { return this.unlockedGraphList; }
        this.unlockedGraphList = await this.server.net_reqGraphData(this.localPlayer.userId);
        return this.unlockedGraphList;
    }

    public traceTeam(teamNum: number, gameId: number) {
        const disTime: number = Math.floor((Date.now() - this.startTime) / 1000);
        GhostTraceHelper.uploadMGS("ts_game_over", "组队开始跳转", { round_id: 997, dead: teamNum, kill_player: disTime, skill_id: gameId, stage_level: 1 });
    }

    /** 开始时间戳 */
    private startTime: number = Date.now();

    protected onStart(): void {
        DataCenterC.ready().then(async () => {
            this.unlockedGraphList = await this.server.net_reqGraphData(this.localPlayer.userId);
        })
    }

    /** 已解锁的图录列表 */
    private unlockedGraphList: number[] = [];

    /** 检查一下是否需要保存这个图录 */
    private checkNeedSaveGraph(newGraphList: number[]): number[] {
        if (newGraphList.length === 0) { return []; }
        return newGraphList.filter(v => { return !this.unlockedGraphList.includes(v); });
    }

    public async reqSaveGraph(newGraphList: number[]) {
        const tempGraphList = this.checkNeedSaveGraph(newGraphList);
        // 如果不需要保存直接return
        if (tempGraphList.length === 0) {
            // 不是初次来解锁
            newGraphList.forEach(() => {
                GhostTraceHelper.uploadMGS("ts_action_sell", "按下快门", { goods: 0 });
            });
            return;
        } else {
            // 初次解锁
            tempGraphList.forEach((v, id) => {
                GhostTraceHelper.uploadMGS("ts_action_sell", "按下快门", { goods: 1, totalgoods: this.unlockedGraphList.length + id + 1 });
            })
        }
        this.unlockedGraphList = await this.server.net_reqSaveGraph(this.localPlayer.userId, tempGraphList);
    }

    /** 获取恐惧币 */
    public async getFearCoin(userId: string) {
        return await this.server.net_getFearCoin(userId);
    }

    public async reqChangeFearCoin(userId: string, changeCount: number): Promise<boolean> {
        if (changeCount === 0) { return false; }
        if (changeCount < 0) {
            const curCoin = await this.getFearCoin(userId);
            if (curCoin + changeCount < 0) { Tips.show(LanUtil.getText("Code_062")); return false; }
        }
        return this.server.net_changeFearCoin(userId, changeCount);
    }

    /** 改变恐惧币成功的回调 */
    public net_onChangeFearCoin(fearCoin: number, delta: number) {
        RouteDefine.onFearCoinChangeAction.call(fearCoin, delta);
        RealNameTool.instance.checkRealName(RealNameConditionType.PickCoin);
    }

    /** 改变道具数量成功的回调 */
    public net_onItemChange(itemData: BagItemData) {
        RouteDefine.onItemChange.call(itemData.cfgId, itemData.count);
        ModuleService.getModule(BagModuleC).net_removeItem(itemData.guid, itemData.count);
    }

    /** 道具批量改变的回调 */
    public net_onItemsChange(itemDatas: BagItemData[]) {
        itemDatas.forEach(itemData => {
            this.net_onItemChange(itemData);
        })
    }

    /** 特殊道具增加 */
    public net_resAddItem(itemData: BagItemData, showTips: boolean = true) {
        // 有了胶卷显示拍摄按钮
        if (itemData.cfgId === EStateIndex.PhotoNews) { UIService.getUI(MainUI).canvas_camera_1.visibility = SlateVisibility.SelfHitTestInvisible; }
        ModuleService.getModule(BagModuleC).net_resAddItem(false, itemData, showTips);
    }


    /** 新增皮肤成功回调 */
    public net_onAddNewSkinCall(skinID: number) {
        RouteDefine.addNewSkin.call(skinID);
    }

    /**白嫖次数更新通知 */
    public net_wantTimesChange(value: number) {
        RouteDefine.onWantTimesChange.call(value)
    }

    public net_purchaseSuccess(commodityId: string, result: boolean) {
        IAPModuleC.onPurchaseAction.call(commodityId, result)
    }

    public async reqGetWantTimes(userId: string) {
        return this.server.net_getWantTimes(userId);
    }


    /** 获取所有游戏的路由数据 */
    public async reqAllGameRouteData(userId: string) {
        return this.server.net_reqAllGameRouteData(userId);
    }

    /** 请求自己游戏的数据 */
    public async reqRouteSelfData(userId: string) {
        return this.server.net_reqSelfRouteData(userId);
    }

    /** 请求拿大厅的路由数据 */
    public async reqHallRouteData(userId: string) {
        return this.server.net_reqRouteHallData(userId);
    }

    public async getSpecialItemCount(userId: string, itemId: number) {
        return this.server.net_getSpecialItemCount(userId, itemId);
    }

    public async reqRouteData(userId: string, gameTheme: EGameTheme) {
        return this.server.net_reqRouteData(userId, gameTheme);
    }

    public reqSetRouteData(userId: string, gameTheme: EGameTheme, properties: string[], values: any[]) {
        this.server.net_reqSetRouteData(userId, gameTheme, properties, values);
    }

    public async reqAddSpecialItem(userId: string, cfgId: number, count: number, showTips: boolean = true) {
        if (count <= 0) { return }
        this.server.net_reqAddSpecialItem(userId, cfgId, count, showTips);
    }

    public async reqRemoveSpecialItem(userId: string, cfgId: number, count: number) {
        if (count <= 0) { return true; }
        const routeData = await this.reqHallRouteData(userId);
        const specialItemData = routeData.specialItemDataList.find(v => { return v.cfgId === cfgId });
        if (!specialItemData || specialItemData.count < count) {
            Tips.show(StringUtil.format(LanUtil.getText("Code_063"), GameConfig.Item.getElement(cfgId).name));
            return false;
        }
        return this.server.net_reqRemoveSpecialItem(userId, cfgId, count);
    }

    /**
     * 批量删除接口
     * @param userId 
     * @param cfgId 
     * @param count 
     * @returns 
     */
    public async removeSpecialItems(userId: string, cfgIds: number[], counts: number[]) {
        if (counts.reduce((p, c) => { return p + c }, 0) <= 0) { return true; }
        return this.server.net_removeSpecialItems(userId, cfgIds, counts);
    }

    public async reqRewardState(userId: string) {
        return this.server.net_checkCanReceive(userId);
    }

    public async reqGetDailyRewardOfMonthly(userId: string) {
        return this.server.net_receiveDailyRewardOfMonthly(userId);
    }

    public async reqGetDailyRewardOfSeasonal(userId: string) {
        return this.server.net_receiveDailyRewardOfSeasonal(userId);
    }

    public reqSaveNewSkin(userId: string, skinID: number) {
        this.server.net_saveSkin(userId, skinID)
    }

    public reqCheckHasSkin(userId: string, skinID: number) {
        return this.server.net_hasSkin(userId, skinID)
    }

    public reqGetAllSkin(userId: string) {
        return this.server.net_getAllSkin(userId)
    }

    /**
     * 获取折扣
     * @param userId 
     * @returns 
     */
    public reqGetDisCount(userId: string) {
        return this.server.net_getCardDiscount(userId)
    }

    public reqGameThemeRouteDate(gameTheme: EGameTheme) {
        return this.server.net_reqGameThemeRouteData(Player.localPlayer.userId, gameTheme);
    }

    public reqSetRecommendState(userId: string, key: EGameTheme, state: boolean) {
        this.server.net_setRecommendState(userId, key, state)
    }

    public reqGetRecommendState(userId: string, key: EGameTheme) {
        return this.server.net_getRecommendState(userId, key)
    }

    public reqGetKilledFaker(userId: string) {
        return this.server.net_getKilledFaker(userId)
    }

    public reqSaveKilledFaker(userId: string) {
        return this.server.net_saveKilledFaker(userId)
    }

    public reqGetActivityRewardState(userId: string) {
        return this.server.net_getActivityRewardState(userId)
    }

    public reqSetActivityRewardState(userId: string, index: number) {
        return this.server.net_setActivityRewardState(userId, index)
    }

    public reqCheckBuyLimit(userId: string, itemID: number) {
        return this.server.net_checkBuyLimit(userId, itemID)
    }
}

// /** 从 DataStorage 异步获取数据的原始函数 */
// let orifunc = DataStorage.asyncGetData.bind(DataStorage);
// /** 
//  * 重写 DataStorage 的 asyncGetData 方法，注入Log
//  */
// DataStorage.asyncGetData = async (key: string) => {
//     let res = await orifunc(key);
//     return res;
// }

export type CardState = {
    state: number
    remainDays: number
}

export class RouteModuleS extends ModuleS<RouteModuleC, null> {

    protected onStart(): void {
        JumpListener.instance.init();
    }

    /**
     * 获取某一种类型的数据
     * @param userId 玩家id
     * @param gameTheme 游戏主题
     * @param dataType 数据类型 RouteDataType
     * @returns 某一种数据类型的数据
     */
    public async net_getData(userId: string, gameTheme: EGameTheme, dataType: string) {
        return (await this.net_reqGameThemeRouteData(userId, gameTheme))[dataType];
    }

    /**
     * 检查是否达到最大等级包括额外等级
     * @param itemLevelId 道具配置id
     * @param routeData 路由数据
     * @returns 
     */
    public checkItemIsMaxLevel(itemLevelId: number, routeData: RouteData) {
        const cfg = GameConfig.ItemLevel.getElement(itemLevelId);
        if (!cfg) { return true; }
        let exLevel = cfg.exLevel ? cfg.exLevel : 0;
        return (cfg.maxLevel + exLevel) <= RouteDefine.getItemLevel(itemLevelId, routeData);
    }

    async net_upgradeItem(itemLevelId: number, userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        if (this.checkItemIsMaxLevel(itemLevelId, routeData)) { return false; }
        let curLevel = RouteDefine.getItemLevel(itemLevelId, routeData);
        MapEx.set(routeData.itemLevelMap, itemLevelId, curLevel + 1);
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        return true;
    }

    protected onPlayerJoined(player: mw.Player): void {
        this.checkGiftPackTime(player.userId);
    }

    public async net_reqUnlockedItemList(userId: string) {
        return (await this.net_reqRouteHallData(userId)).unlockedItemList;
    }

    public async net_reqAllGameRouteData(userId: string) {
        const routeDataList: RouteData[] = [];
        await AllGameRouteList.forEach(async v => {
            routeDataList.push(await RouteDataHelper.reqGetData(userId, v));
        })
        await WaitLoop.loop(() => { return routeDataList.length === AllGameRouteList.length });
        return routeDataList;
    }

    @Decorator.noReply()
    public async net_reqAddSpecialItem(userId: string, cfgId: number, count: number, showTips: boolean = true) {
        if (count <= 0) { return; }

        // 保存一个显示摄像机按钮的状态
        if (cfgId === EStateIndex.PhotoNews) {
            RouteDefine.setActivityRewardState(userId, EStateIndex.ShowPhotoCanvas);
        }

        const routeData = await this.net_reqRouteHallData(userId);
        let specialItemData = routeData.specialItemDataList.find(v => { return v.cfgId === cfgId });
        if (!specialItemData) {
            specialItemData = new BagItemData();
            specialItemData.guid = `${Date.now()}_${cfgId}`
            specialItemData.cfgId = cfgId;
            specialItemData.count = count;
            routeData.specialItemDataList.push(specialItemData);
        } else {
            specialItemData.count += count;
        }
        // 触发一次保存即可
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);

        const player = Player.getPlayer(userId);
        player && this.getClient(player).net_resAddItem(specialItemData, showTips);
    }

    public async net_reqRemoveSpecialItem(userId: string, cfgId: number, count: number) {
        if (count <= 0) { return true; }
        console.log(`DEBUG>>> 删除特殊道具cfgId = ${cfgId} , count = ${count}`);
        const routeData = await this.net_reqRouteHallData(userId);
        const specialItemData = routeData.specialItemDataList.find(v => { return v.cfgId === cfgId });
        if (!specialItemData || specialItemData.count < count) {
            return false;
        } else {
            specialItemData.count -= count;
            const player = Player.getPlayer(userId);
            if (specialItemData.count <= 0) { routeData.specialItemDataList.splice(routeData.specialItemDataList.findIndex(v => { return v.cfgId === cfgId }), 1); }
            player && this.getClient(player).net_onItemChange(specialItemData);
        }
        // 触发一次保存即可
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        return true;
    }

    /** 批量删除道具接口 */
    public async net_removeSpecialItems(userId: string, cfgIds: number[], counts: number[]) {
        const routeData = await this.net_reqRouteHallData(userId);
        let itemDataArr: BagItemData[] = [];
        // 先预估是否能批量删除，如果不能就
        for (let index = 0; index < cfgIds.length; index++) {
            let cfgId = cfgIds[index];
            let count = counts[index];
            if (Number.isNaN(count) || count < 0) { continue; }
            let specialItemData = routeData.specialItemDataList.find(v => { return v.cfgId === cfgId });
            if (!specialItemData) { continue; }
            // 小伙子不要作弊哦
            if (!specialItemData && count > 0) { return false; }
            itemDataArr.push(specialItemData);
            specialItemData.count -= count;
        }
        const player = Player.getPlayer(userId);
        player && this.getClient(player).net_onItemsChange(itemDataArr);
        // 触发一次保存即可
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        return true;
    }

    public async net_reqGraphData(userId: string): Promise<number[]> {
        return (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).unlockedGraphList;
    }

    /** 通关了保存一下通关的这个结局信息 */
    @Decorator.noReply()
    public net_reqSavePassInfo(userId: string, degree: DegreeType, endCfgId: number) {
        if (!endCfgId || endCfgId === 0) { return; }
        RouteDataHelper.reqSetData(userId, GameStart.GameTheme, [RouteDataType.PassInfoMap], [new PassInfo(degree, endCfgId, 1)]);
    }

    /** 保存图录并返回已保存的图录 */
    public async net_reqSaveGraph(userId: string, newGraphList: number[]): Promise<number[]> {
        const unlockedGraphList: number[] = (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).unlockedGraphList;
        // 再过滤一遍，确保不存在解锁了相同的图录
        const tempGraphList = newGraphList.filter(v => { return !unlockedGraphList.includes(v); });
        // 拼凑出新的解锁列表
        const newUnlockedGraphList = unlockedGraphList.concat(tempGraphList);
        // 保存
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [RouteDataType.UnlockedGraphList], [newUnlockedGraphList]);
        return newUnlockedGraphList;
    }

    public async net_getFearCoin(userId: string) {
        return (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).fearCoin;
    }

    public async net_changeFearCoin(userId: string, changeCount: number): Promise<boolean> {
        const curCoin = await this.net_getFearCoin(userId);
        if (changeCount < 0) {
            if (curCoin + changeCount < 0) { return false; }
        }
        (await RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [RouteDataType.FearCoin], [changeCount]));
        const player = Player.getPlayer(userId);
        //更新任务进度
        if (changeCount < 0 && player) {
            DataCenterS.getData(player, MissionData).updateCostFearCoin(-changeCount)
        }
        player && this.getClient(player).net_onChangeFearCoin(await this.net_getFearCoin(userId), changeCount);

        // 改变记录数据
        const recordData = DataCenterS.getData(userId, RecordData);
        if (!recordData) {
            console.error(`DEBUG MyTypeError>>> 玩家${userId}保存恐惧币 ${changeCount} 改变的记录数据失败`);
        } else {
            if (changeCount > 0) { recordData.saveTotalHave(curCoin + changeCount, changeCount); }
            if (changeCount < 0) { recordData.saveTotalPay(Math.abs(changeCount)); }
        }
        return true;
    }

    /** 请求拿自己游戏的路由数据 */
    public async net_reqSelfRouteData(userId: string) {
        return RouteDataHelper.reqGetData(userId, GameStart.GameTheme);
    }

    /**
     * 获取某一种特殊道具的数量
     * @param userId 玩家id
     * @param itemId 道具id
     */
    public async net_getSpecialItemCount(userId: string, itemId: number) {
        let itemDataArr = (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).specialItemDataList;
        return itemDataArr.filter(v => { return v.cfgId === itemId }).map(v => { return v.count }).reduce((a, b) => { return a + b }, 0);
    }

    /**
     * 检查某特殊道具是否存在
     * @param userId 玩家id
     * @param itemId 道具id
     */
    public async net_checkSpecialItemExist(userId: string, itemId: number) {
        let itemDataArr = (await RouteDataHelper.reqGetData(userId, EGameTheme.Hall)).specialItemDataList;
        let id = itemDataArr.findIndex(v => { return v.cfgId === itemId });
        return id != -1;
    }

    /** 请求拿大厅的路由数据 */
    public async net_reqRouteHallData(userId: string) {
        return RouteDataHelper.reqGetData(userId, EGameTheme.Hall);
    }

    public async net_reqRouteData(userId: string, gameTheme: EGameTheme) {
        return RouteDataHelper.reqGetData(userId, gameTheme);
    }

    public async net_reqGameThemeRouteData(userId: string, gameTheme: EGameTheme) {
        return RouteDataHelper.reqGetData(userId, gameTheme);
    }

    @Decorator.noReply()
    public net_reqSetRouteData(userId: string, gameTheme: EGameTheme, properties: string[], values: any[]) {
        RouteDataHelper.reqSetData(userId, gameTheme, properties, values);
    }


    //==========================处理月卡季卡=============================//

    public async saveMonthlyCard(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        routeData.vip.monthlyCard = new Date().getTime();
        // 触发一次保存即可
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        let player = Player.getPlayer(userId)
        player && this.getClient(player).net_purchaseSuccess("", true)
        return true
    }

    public async saveSeasonalCard(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        routeData.vip.seasonalCard = new Date().getTime();
        // 触发一次保存即可
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        let player = Player.getPlayer(userId)
        player && this.getClient(player).net_purchaseSuccess("", true)
        return true
    }

    /**
     * 领取月卡每日奖励
     * @param userId 
     * @returns 
     */
    public async net_receiveDailyRewardOfMonthly(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        if (routeData.vip.monthlyCard == 0) return 0;//没买月卡
        if (routeData.vip.monthlyState) return 0 //今天已经领过
        let startTime = routeData.vip.monthlyStamp ? routeData.vip.monthlyStamp : routeData.vip.monthlyCard
        let days = this.getIntervalDays(startTime, Date.now());
        let result = GameConfig.SubGlobal.MonthlyCard.array1d[1] * days
        await this.net_changeFearCoin(userId, result);
        routeData.vip.monthlyStamp = Date.now();//更新领取时间
        routeData.vip.monthlyState = true;
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        return result
    }

    /**
     * 领取季卡卡每日奖励
     * @param userId 
     * @returns 
     */
    public async net_receiveDailyRewardOfSeasonal(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        if (routeData.vip.seasonalCard == 0) return 0;//没买季卡
        if (routeData.vip.seasonalState) return 0 //今天已经领过
        let startTime = routeData.vip.seasonalStamp ? routeData.vip.seasonalStamp : routeData.vip.seasonalCard
        let days = this.getIntervalDays(startTime, Date.now());
        let result = GameConfig.SubGlobal.SeasonalCard.array1d[1] * days
        await this.net_changeFearCoin(userId, result);
        routeData.vip.seasonalStamp = Date.now();//更新领取时间
        routeData.vip.seasonalState = true;
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        return result
    }

    /**
     * 刷新没提领奖状态
     * @param userId 
     * @param index 
     */
    public async refreshRewardState(userId: string, index: number) {
        const routeData = await this.net_reqRouteHallData(userId);
        index == 1 ? (routeData.vip.monthlyState = false) : (routeData.vip.seasonalState = false)
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
    }
    /**
     * 检查能否领取每日奖励
     * @param userId 
     * @returns 
     */
    public async net_checkCanReceive(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        let monthly: CardState = { state: 0, remainDays: 0 }
        let seasonal: CardState = { state: 0, remainDays: 0 }
        let nowDate = Date.now();
        let m_remainDays = this.getIntervalDays(routeData.vip.monthlyCard, nowDate);
        if (m_remainDays <= 30) {//月卡在有效期内
            let startTime1 = routeData.vip.monthlyStamp ? routeData.vip.monthlyStamp : routeData.vip.monthlyCard//月卡累计天数
            monthly.state = this.getIntervalDays(startTime1, nowDate);
            monthly.remainDays = 30 - m_remainDays
        }
        let s_remainDays = this.getIntervalDays(routeData.vip.seasonalCard, nowDate)
        if (s_remainDays <= 90) {//季卡在有效期内
            let startTime2 = routeData.vip.seasonalStamp ? routeData.vip.seasonalStamp : routeData.vip.seasonalCard//季卡累计天数
            seasonal.state = this.getIntervalDays(startTime2, nowDate);
            seasonal.remainDays = 90 - s_remainDays
        }
        if (routeData.vip.monthlyState) monthly.state = -1//今日已领取月卡
        if (routeData.vip.seasonalState) seasonal.state = -1//今日已领取季卡
        return [monthly, seasonal]
    }

    /**
     * 获取折扣
     * @param userId 
     * @returns 
     */
    public async net_getCardDiscount(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        let nowDate = Date.now();
        let val1 = this.getIntervalDays(routeData.vip.monthlyCard, nowDate) > 30 ? 0 : GameConfig.SubGlobal.MonthlyCard.array1d[0]
        let val2 = this.getIntervalDays(routeData.vip.seasonalCard, nowDate) > 90 ? 0 : GameConfig.SubGlobal.SeasonalCard.array1d[0]
        return 1 - val1 - val2
    }

    /**设置每日推荐状态 */
    public async net_setRecommendState(userId: string, key: EGameTheme, state: boolean) {
        const routeData = await this.net_reqSelfRouteData(userId);
        routeData.recommendState = state;
        this.net_reqSetRouteData(userId, key, [], []);
    }

    public async net_getRecommendState(userId: string, key: EGameTheme) {
        const routeData = await this.net_reqSelfRouteData(userId);
        return routeData.recommendState;
    }
    /**
     * 计算间隔天数 1,193,178,227
     */
    private getIntervalDays(startTime: number, endTime: number) {
        let days = Math.floor((endTime - startTime) / 86400000)
        return days < 1 ? 1 : days
    }
    //=================================处理房子皮肤==============================


    public async net_hasSkin(userId: string, skinID: number) {
        let data = GameConfig["RoomSkin"].getElement(skinID);
        if (!data) return false;
        if (data.getWay == 0) return true;
        const routeData = await this.net_reqRouteHallData(userId);
        return routeData.skins.indexOf(skinID) != -1
    }

    @Decorator.noReply()
    public async net_saveSkin(userId: string, skinID: number) {
        const routeData = await this.net_reqRouteHallData(userId);
        if (routeData.skins.indexOf(skinID) == -1) {
            routeData.skins.push(skinID);
            RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
            let player = Player.getPlayer(userId);
            player && this.getClient(player).net_onAddNewSkinCall(skinID);
        }
    }


    public async net_getAllSkin(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        return routeData.skins;
    }

    //===========================处理每日礼包相关========================//

    @Decorator.noReply()
    public async checkGiftPackTime(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        let nowTime = new Date()
        //重置每日礼包
        let date = nowTime.getDate()
        if (!routeData.buyLimit.timeStamp || routeData.buyLimit.timeStamp != date) {
            routeData.buyLimit.timeStamp = date;
            MapEx.forEach(routeData.buyLimit.dailyLimit, (k, v) => {
                MapEx.set(routeData.buyLimit.dailyLimit, k, 0)
            })
            //顺便重置一下每日推荐状态
            routeData.recommendState = false;
        }
        //重置每周礼包 没周一重置
        let dayInWeek = nowTime.getDay()
        if (!routeData.buyLimit.weekTime || (dayInWeek == 1 && routeData.buyLimit.weekTime != date)) {//如果今天是星期一 同时日期不是同一个日期 说明是另一个星期 则重置
            routeData.buyLimit.weekTime = date;
            MapEx.forEach(routeData.buyLimit.weekLimit, (k, v) => {
                MapEx.set(routeData.buyLimit.weekLimit, k, 0)
            })
        }

        //重置每月礼包
        let month = nowTime.getMonth()
        if (!routeData.buyLimit.monthTime || (date == 1 && routeData.buyLimit.monthTime != month)) {//如果今天是1号 同时月份不是同一个月份 说明是下一个月 则重置
            routeData.buyLimit.monthTime = month;
            MapEx.forEach(routeData.buyLimit.monthLimit, (k, v) => {
                MapEx.set(routeData.buyLimit.monthLimit, k, 0)
            })
        }
        //重置每日白嫖次数
        if (date != routeData.dateMark) {
            routeData.dateMark = date;
            routeData.wantTimes = GameConfig.SubGlobal.wantParams.number;
        }
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
    }


    public async changeWantsTimes(userId: string, val: number) {
        const routeData = await this.net_reqRouteHallData(userId);
        routeData.wantTimes += val;
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        let player = Player.getPlayer(userId)
        player && this.getClient(player).net_wantTimesChange(routeData.wantTimes)
    }

    public async net_getWantTimes(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        return routeData.wantTimes
    }

    /**获取击杀的伪人数量 */
    public async net_getKilledFaker(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        return routeData.killedFakerCount
    }

    public async net_saveKilledFaker(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        routeData.killedFakerCount++;
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);

        // 保存记录
        const recordData = DataCenterS.getData(userId, RecordData);
        recordData && recordData.saveCaptureFakers(routeData.killedFakerCount);
    }

    public async net_getActivityRewardState(userId: string) {
        const routeData = await this.net_reqRouteHallData(userId);
        return routeData.rewardStateList;
    }

    public async net_setActivityRewardState(userId: string, index: number) {
        const routeData = await this.net_reqRouteHallData(userId);
        if (routeData.rewardStateList.indexOf(index) == -1) {
            routeData.rewardStateList.push(index);
            RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        }
    }

    /**
     * 检查限购
     * @param userId 
     * @param itemID 道具ID
     * @returns 
     */

    public async net_checkBuyLimit(userId: string, shopId: number) {
        console.log("检查限购", shopId);
        let shopData = GameConfig.Shop.getAllElement().find(e => e.id == shopId);
        const routeData = await this.net_reqRouteHallData(userId);
        let dataMap: MapEx.MapExClass<number> = null
        switch (shopData.limitType) {
            case 1:
                if (shopData.buyLimit == -1) return Infinity;//不限购
                let bagItems = await RouteDefine.getSpecialItemDataList(userId)
                let count = 0;
                if (bagItems) {
                    let item = bagItems.find(e => { return e.cfgId == shopData.itemID })
                    count = item ? item.count : 0
                }
                return shopData.buyLimit - count
            case 2:
                dataMap = routeData.buyLimit.dailyLimit
                break;
            case 3:
                dataMap = routeData.buyLimit.weekLimit
                break;
            case 4:
                dataMap = routeData.buyLimit.monthLimit
                break;
            default:
                console.log("限购类型错误！！！")
        }
        if (!MapEx.has(dataMap, shopId)) return shopData.buyLimit;//还没买过直接返回可购买数量
        let count = MapEx.get(dataMap, shopId);
        return shopData.buyLimit - count
    }

    public async net_saveItemLimit(userId: string, shopId: number, buyCount: number = 1) {
        let limitData = GameConfig.Shop.getElement(shopId);
        if (!limitData) return false;
        if (buyCount > limitData.buyLimit) return false;
        const routeData = await this.net_reqRouteHallData(userId);
        let dataMap: MapEx.MapExClass<number> = null;
        switch (limitData.limitType) {
            case 1:
                return false;//背包限购 是检查背包数量 这里不处理
            case 2:
                dataMap = routeData.buyLimit.dailyLimit
                break;
            case 3:
                dataMap = routeData.buyLimit.weekLimit
                break;
            case 4:
                dataMap = routeData.buyLimit.monthLimit
                break;
            default:
        }
        if (!MapEx.has(dataMap, shopId)) {
            MapEx.set(dataMap, shopId, buyCount)
        } else {
            let count = MapEx.get(dataMap, shopId)
            MapEx.set(dataMap, shopId, count + buyCount)
        }
        RouteDataHelper.reqSetData(userId, EGameTheme.Hall, [], []);
        return true;
    }
}
