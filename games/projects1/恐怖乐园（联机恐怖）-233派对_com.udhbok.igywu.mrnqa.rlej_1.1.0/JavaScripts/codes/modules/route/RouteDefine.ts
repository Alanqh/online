/*
 * @Author       : dal
 * @Date         : 2024-02-26 17:31:43
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-19 16:40:30
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\route\RouteDefine.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { Const, EGameTheme } from "../../Defines";
import { MapEx } from "../../utils/MapEx";
import { BagDefine, BagItemData } from "../bag/BagDefine";
import { RouteData, RouteDataType } from "./RouteData";
import { RouteModuleC, RouteModuleS } from "./RouteModule";

export class RouteDefine {

    /** 恐惧币改变成功的回调 */
    public static onFearCoinChangeAction: Action = new Action();

    /**添加新皮肤回调 */
    public static addNewSkin: Action = new Action();
    /**白嫖次数更新回调 */
    public static onWantTimesChange: Action = new Action()

    /** 恐惧币改变成功的回调 */
    public static onItemChange: Action = new Action();

    private static get selfModuleC() {
        return ModuleService.getModule(RouteModuleC);
    }

    private static get selfModuleS() {
        return ModuleService.getModule(RouteModuleS);
    }

    private constructor() { }

    /**
     * 获取等级
     * @param itemLevelId 道具等级配置id
     * @param routeData 路由数据
     * @returns 
     */
    public static getItemLevel(itemLevelId: number, routeData: RouteData) {
        let level = MapEx.get(routeData.itemLevelMap, itemLevelId);
        return level ? level : 0;
    }

    /**
     * 异步获取武器的等级
     * @param itemLevelId ItemLevel配置id
     * @param userId 玩家id
     */
    public static async getWeaponLevel(itemLevelId: number, userId: string) {
        const itemLevelMap: MapEx.MapExClass<number> = await RouteDefine.getData(userId, EGameTheme.Hall, RouteDataType.ItemLevelMap);
        if (!itemLevelMap) { return 0; }
        const level = MapEx.get(itemLevelMap, itemLevelId);
        return level ? level : 0;
    }

    /**
     * 获取某一种类型的数据
     * @param userId 玩家id
     * @param gameTheme 游戏主题
     * @param dataType 数据类型 RouteDataType
     * @returns 某一种数据类型的数据
     */
    public static async getData(userId: string, gameTheme: EGameTheme, dataType: string) {
        return SystemUtil.isClient() ? this.selfModuleC.getData(userId, gameTheme, dataType) : this.selfModuleS.net_getData(userId, gameTheme, dataType);
    }

    /**
     * 获取恐惧币数 ( 同时支持客户端、服务端调用 )
     * @param userId 玩家id
     */
    public static async getFearCoin(userId: string): Promise<number> {
        return SystemUtil.isClient() ? this.selfModuleC.getFearCoin(userId) : this.selfModuleS.net_getFearCoin(userId);
    }

    /**
     * 改变恐惧币数量 ( 同时支持客户端、服务端调用 )
     * @param userId 玩家id
     * @param changeCount 改变数量
     * @returns 
     */
    public static async changeFearCoin(userId: string, changeCount: number): Promise<boolean> {
        return SystemUtil.isClient() ? this.selfModuleC.reqChangeFearCoin(userId, changeCount) : this.selfModuleS.net_changeFearCoin(userId, changeCount);
    }

    /**
     * 查询某一种特殊道具的数量
     */
    public static async getSpecialItemCount(userId: string, itemId: number): Promise<number> {
        return SystemUtil.isClient() ? (await this.selfModuleC.getSpecialItemCount(userId, itemId)) : (await this.selfModuleS.net_getSpecialItemCount(userId, itemId));
    }

    /**
     * 获取特殊道具
     */
    public static async getSpecialItemDataList(userId: string): Promise<BagItemData[]> {
        return SystemUtil.isClient() ? Array.from((await this.selfModuleC.reqHallRouteData(userId)).specialItemDataList) : Array.from((await this.selfModuleS.net_reqRouteHallData(userId)).specialItemDataList);
    }

    /**
     * 获得特殊道具
     * @param userId 
     * @param cfgId 配置id
     * @param count 新增数量
     */
    public static async addSpecialItem(userId: string, cfgId: number, count: number, showTips: boolean = true) {
        const itemCfg = GameConfig.Item.getElement(cfgId);
        if (itemCfg.clazz == "RoomSkin") {
            RouteDefine.reqSaveNewSkin(userId, Number(itemCfg.clazzParam[0]))
        } else {
            if (itemCfg.type != Const.SpecialItemType) {
                const player = Player.getPlayer(userId);
                if (!player) { return; }
                BagDefine.AddItem(player.playerId, cfgId, "", "", count, false);
                return;
            }
            SystemUtil.isClient() ? (await this.selfModuleC.reqAddSpecialItem(userId, cfgId, count, showTips)) : (await this.selfModuleS.net_reqAddSpecialItem(userId, cfgId, count, showTips));
        }
    }

    /**
     * 移除特殊道具
     * @param userId 
     * @param guid 道具的guid
     */
    public static async removeSpecialItem(userId: string, cfgId: number, count: number) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqRemoveSpecialItem(userId, cfgId, count)) : (await this.selfModuleS.net_reqRemoveSpecialItem(userId, cfgId, count));
    }

    /**
     * 移除特殊道具
     * @param userId 
     * @param guid 道具的guid
     */
    public static async removeSpecialItems(userId: string, cfgIds: number[], counts: number[]) {
        return SystemUtil.isClient() ? (await this.selfModuleC.removeSpecialItems(userId, cfgIds, counts)) : (await this.selfModuleS.net_removeSpecialItems(userId, cfgIds, counts));
    }

    /**
     * 查询每日奖励领取状态
     * @param userId 
     * @param index 
     * @returns 
     */
    public static async getRewardState(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqRewardState(userId)) : (await this.selfModuleS.net_checkCanReceive(userId));
    }

    /**
     * 查询折扣
     * @param userId 
     * @param index 
     * @returns 
     */
    public static async getDiscount(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqGetDisCount(userId)) : (await this.selfModuleS.net_getCardDiscount(userId));
    }



    /**
     * 保存新皮肤
     * @param userId 
     * @param skinID 
     */
    public static async reqSaveNewSkin(userId: string, skinID: number) {
        SystemUtil.isClient() ? (await this.selfModuleC.reqSaveNewSkin(userId, skinID)) : (await this.selfModuleS.net_saveSkin(userId, skinID))
    }

    /**
     * 检查是否已拥有该皮肤
     * @param userId 
     * @param skinID 
     * @returns 
     */
    public static checkHasSkin(userId: string, skinID: number) {
        return SystemUtil.isClient() ? (this.selfModuleC.reqCheckHasSkin(userId, skinID)) : (this.selfModuleS.net_hasSkin(userId, skinID));
    }

    /**
     * 获取所有解锁皮肤
     * @param userId 
     * @returns 
     */
    public static async getAllSkins(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqGetAllSkin(userId)) : (await this.selfModuleS.net_getAllSkin(userId))
    }

    public static async getWantTimes(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqGetWantTimes(userId)) : (await this.selfModuleS.net_getWantTimes(userId))
    }

    public static async getRecommendState(userId: string, key: EGameTheme) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqGetRecommendState(userId, key)) : (await this.selfModuleS.net_getRecommendState(userId, key))
    }

    public static async setRecommendState(userId: string, key: EGameTheme, state: boolean) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqSetRecommendState(userId, key, state)) : (await this.selfModuleS.net_setRecommendState(userId, key, state))
    }

    public static async saveKilledFaker(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqSaveKilledFaker(userId)) : (await this.selfModuleS.net_saveKilledFaker(userId))
    }

    public static async getKilledFakerNum(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqGetKilledFaker(userId)) : (await this.selfModuleS.net_getKilledFaker(userId))
    }

    /**活动奖励领取状态 */
    public static async getActivityRewardState(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqGetActivityRewardState(userId)) : (await this.selfModuleS.net_getActivityRewardState(userId))
    }

    public static async setActivityRewardState(userId: string, index: EStateIndex) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqSetActivityRewardState(userId, index)) : (await this.selfModuleS.net_setActivityRewardState(userId, index))
    }

    /**
     * 是否可以领取
     * @param userId 玩家id
     * @param index 活动id
     */
    public static async canReceiveActivity(userId: string, index: EStateIndex) {
        let list = await RouteDefine.getActivityRewardState(userId)
        return !list.includes(index);
    }

    public static async checkBuyLimit(userId: string, itemID: number) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqCheckBuyLimit(userId, itemID)) : (await this.selfModuleS.net_checkBuyLimit(userId, itemID))
    }

    public static async getAllRouteData(userId: string) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqAllGameRouteData(userId)) : (await this.selfModuleS.net_reqAllGameRouteData(userId))
    }

    public static async getRouteData(userId: string, gameTheme: EGameTheme) {
        return SystemUtil.isClient() ? (await this.selfModuleC.reqRouteData(userId, gameTheme)) : (await this.selfModuleS.net_reqRouteData(userId, gameTheme))
    }
}

/** 活动状态序号 */
export enum EStateIndex {

    /** 是否领取尖叫鸡 */
    ScreamKun = 0,
    /** 显示活动的弹窗 */
    ShowPopDialog = 1,
    /** 是否领取胶卷 */
    PhotoNews = 51004,
    /** 是否显示照相机UI - 领取到了胶卷才给显示 */
    ShowPhotoCanvas = 510004,
}