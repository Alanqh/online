/*
 * @Author       : dal
 * @Date         : 2024-01-31 20:10:02
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-29 14:25:40
 * @FilePath     : \1005_townc:\Users\admin\AppData\MetaApp\Editor_Win64\MetaWorldSaved\Saved\MetaWorld\Project\Edit\hauntedparadise\1001_hall\JavaScripts\codes\modules\bag\BagDefine.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { IWeaponSkinElement } from "../../../config/WeaponSkin";
import { Const, EGameTheme } from "../../Defines";
import { RouteDataType } from "../route/RouteData";
import { RouteDefine } from "../route/RouteDefine";
import { BagModuleC } from "./BagModuleC";
import { BagModuleS } from "./BagModuleS";

export type IBagItemData = {
    cfgId: number;
    count: number;
}

export class BagItemData {
    public guid: string = "";
    public cfgId: number = 0;
    public customData: string = "";
    public count: number = 0;
    /** 背包节点的id，如果没有初始化则为-1，将会根据itemList顺序默认给一个id，主要用于兼容之前玩家存档 */
    public nodeId: number = -1;
}

export class BagDefine {

    /** 物品栏显示的道具的总数量 */
    public static ViewCount: number = 7;

    /** 普通道具背包容量 */
    public static NormalItemCapacity: number = 10;

    /** 特殊道具背包容量 */
    public static SpecialItemCapacity: number = 9;

    /**
     * 当增加物品的时候发出
     * @param data 物品的自定义数据
     * @param needEquip 是否自动装备
     */
    public static AddItemEvt: string = "AddItemEvt";

    /**
     * 当移除物品的时候发出
     * @param cfgId 物品配置id
     * @param data 物品的自定义数据
     */
    public static RemoveItemEvt: string = "RemoveItemEvt";

    public static OnItemChangeEvt: string = "OnItemChangeEvt";

    public static OnItemInit: string = "OnItemInit";

    /** 是否初始化 */
    private static isInit: boolean = false;

    public static init() {
        if (this.isInit) { return; }
        BagDefine.NormalItemCapacity = GameConfig.Global.ItemMax.number - BagDefine.ViewCount;
        this.isInit = true;
    }

    /** 不需要显示在道具背包中的道具类型 */
    private static readonly ViewOffType: number[] = [99];

    /** 摄像机配置ID */
    private static readonly CameraItemId: number = 9999;

    /**
     * 检查 一个道具 是否需要在背包中显示
     * @param cfgId 道具配置id
     */
    public static checkNeedViewInBagByCfgId(cfgId: number) {
        const itemCfg = GameConfig.Item.getElement(cfgId);
        return itemCfg && !this.ViewOffType.includes(itemCfg.type) && cfgId != this.CameraItemId && !itemCfg.isHideInBag;
    }

    /**
     * 检查 一个道具 是否需要在背包中显示
     */
    public static checkISViewOnBagByCfg(item: IItemElement) {
        return !this.ViewOffType.includes(item.type);
    }

    /** 检测以各道具是不是特殊道具 */
    public static checkIsSpecialItem(cfgId: number) {
        let data = GameConfig.Item.getElement(cfgId)
        if (!data) return false
        if (data.clazz == "Currency") { return false }
        return data.type === Const.SpecialItemType;
    }

    /** 提取一个除去了标签及标签中内容的字符串 */
    public static extractTextBeforeRichText(input: string): string {
        const regex = /^(.*?)<[^>]+>/; // 匹配第一个富文本标签之前的内容的正则表达式
        const match = regex.exec(input);

        if (match && match.length >= 2) {
            return match[1]; // 返回匹配到的内容
        }

        return input; // 如果没有匹配到, 返回原始字符串
    }

    /**
     * @param count 数量，默认是1
     * @param needSelect 是否需要在添加物品时选中，默认是选中的
     * @returns 
     */
    public static async AddItem(playerId: number, cfgId: number, data: string = "", clueGuid: string = "", count: number = 1, needSelect: boolean = true) {
        if (SystemUtil.isClient()) {
            return await ModuleService.getModule(BagModuleC).reqAddItem(playerId, cfgId, data, clueGuid, count, needSelect);
        }
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).net_reqAddItem(playerId, cfgId, data, clueGuid, count, needSelect);
        }
    }

    public static GetItemGuid(playerId: number, cfgId: number, data: string = "") {
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).getItemGuid(playerId, cfgId, data);
        }
    }

    public static GetItemData(playerId: number, guid: string) {
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).getItem(playerId, guid);
        }
    }

    public static RemoveItem(playerId: number, guid: string, removeCount?: number) {
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(BagModuleS).removeItem(playerId, guid, removeCount);
        }
    }

    /**
     * 检查一个配置是否是武器
     * @param cfgInfo 配置信息 可以 是number 或者 itemElement
     * @returns 没有这个配置配置会返回false
     */
    public static checkIsWeapon(cfgInfo: number | IItemElement): boolean {
        if (cfgInfo instanceof Number) {
            cfgInfo = GameConfig.Item.getElement(Number(cfgInfo));
        }
        if (!cfgInfo) { return false; }
        return (cfgInfo as IItemElement).clazz === "HotWeaponItem" || (cfgInfo as IItemElement).clazz === "MeleeWeaponItem";
    }

    /**
     * 根据道具配置id获取一个可能的额外配置
     * @param cfgId 配置id
     * @param userId 玩家id
     */
    public static async getCfgEx(cfgId: number, userId: string): Promise<IItemElement | IWeaponSkinElement> {
        let itemCfg = GameConfig.Item.getElement(cfgId);
        if (!this.checkIsWeapon(itemCfg)) {
            return itemCfg;
        }
        let level: number;
        if (itemCfg.clazz === "HotWeaponItem") {
            const hotWeaponCfg = GameConfig.HotWeapon.getElement(itemCfg.clazzParam[0]);
            if (!hotWeaponCfg) {
                console.error(`DEBUG MyTypeError>>> 获取配置失败 ${itemCfg.id}`);
                return itemCfg;
            }
            level = await RouteDefine.getWeaponLevel(hotWeaponCfg["itemLevelId"], userId);
        } else if (itemCfg.clazz === "MeleeWeaponItem") {
            const meleeWeaponCfg = GameConfig.MeleeWeapon.getElement(itemCfg.clazzParam[0]);
            if (!meleeWeaponCfg) {
                console.error(`DEBUG MyTypeError>>> 获取配置失败 ${itemCfg.id}`);
                return itemCfg;
            }
            level = await RouteDefine.getWeaponLevel(meleeWeaponCfg["itemLevelId"], userId);
        }
        const weaponCfgArr = GameConfig.WeaponSkin.getAllElement().filter(v => { return v.itemID === cfgId });
        const weaponSkinCfg = weaponCfgArr.sort((a, b) => { return b.weaponLv - a.weaponLv }).find(v => { return v.weaponLv <= level });
        return weaponSkinCfg ? weaponSkinCfg : itemCfg;
    }
}
