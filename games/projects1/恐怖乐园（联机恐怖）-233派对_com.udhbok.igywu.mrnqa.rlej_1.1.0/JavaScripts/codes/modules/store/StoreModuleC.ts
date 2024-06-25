/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-23 10:13:05
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-06-07 18:23:15
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\store\StoreModuleC.ts
 * @Description  : 
 */
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../../config/GameConfig";
import ShopBean from "./ShopBean";
import StoreModuleS from "./StoreModuleS";
import { UIGainItem } from "./ui/UIGaintem";
import { EStateIndex, RouteDefine } from "../route/RouteDefine";
import { UIGiftBagOpen } from "./ui/UIGiftBagOpen";
import { UIGiftDisplay } from "./ui/UIGiftDisplay";
import UIShop from "./ui/UIShop";
import Tips from "../../utils/Tips";
import IAPModuleC from "../iap/IAPModuleC";
import { UIShopTips } from "./ui/UIShopTips";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { IShopElement } from "../../../config/Shop";
import { LanUtil } from "../../utils/LanUtil";
import { SignModuleC } from "../sign/SignModuleC";
import UIIntegration from "../../ui/UIIntegration";
import { EGameTheme, GamesStartDefines } from "../../Defines";
import GameStart from "../../GameStart";
import ExGuideData from "../../guide/ExGuideData";

AddGMCommand("加恐惧币", (player: mw.Player, val: string) => {
    RouteDefine.changeFearCoin(Player.localPlayer.userId, Number(val))
})
AddGMCommand("买月礼包", (player: mw.Player, val: string) => {
    ModuleService.getModule(StoreModuleC).reqBuyItem(GameConfig.Shop.getElement(102), 1)
}, (player: mw.Player, val: string = "1") => {

})
AddGMCommand("设置模型旋转", (player: mw.Player, val: string) => {
    ModuleService.getModule(StoreModuleC).setModelRotate(val)
})

AddGMCommand("设置模型缩放", (player: mw.Player, val: string) => {
    ModuleService.getModule(StoreModuleC).setModelScale(val)
})
AddGMCommand("设置模型位置", (player: mw.Player, val: string) => {
    ModuleService.getModule(StoreModuleC).setModelPosition(val)
})


AddGMCommand("兑换礼包", (player: mw.Player, val: string) => {
    UIService.show(UIGiftBagOpen, Number(val))
})


export enum EShopItemType {
    /**房子皮肤 */
    RoomSkin = 1,
    /**消耗品 */
    Consumables = 2,
    /**互动道具 */
    Interaction = 3,
    /**礼包 */
    Gift = 4,
    /**月卡 */
    Card = 5,
    /**充值 */
    Recharge = 6,
    /**建材 */
    Building = 7,
    /**日周月礼包 */
    LimitGift = 8,
    /**所有商品 */
    All = 9,
}

export const popIndex = {
    "Hall": 1,//大厅
    "Graveyard": 2,//孤岛
    "Town": 3,//小镇
    "School": 4,//学校
    "Hospital": 5//医院
}

export default class StoreModuleC extends ModuleC<StoreModuleS, null> {

    static skipDisplay: boolean = false
    private _curShopID: number = 1;
    private _shops: Map<number, ShopBean> = new Map();
    private _shopDataMap: Map<number, Map<number, IShopElement[][]>> = new Map()
    public static discount: number = 1;
    public hideType: number[] = [];

    private _initDataFinish: boolean = false;

    private _shopDataById: Map<number, IShopElement[]> = new Map()

    protected onStart(): void {
        UIService.getUI(UIIntegration);
        //大厅直接初始化
        if (GamesStartDefines.gameTheme == EGameTheme.Hall) {
            this.initStore()
        }
        //非大厅监听这个事件 
        Event.addLocalListener("PlayerAlready", () => {
            this.initStore();
            if (GameStart.GameTheme != EGameTheme.Hall && GameStart.GameTheme != EGameTheme.Graveyard) {
                this.checkPopDialog();
            }
        })

        Event.addLocalListener("evt_openShop", (guid: string, shopID: string) => {
            this.openStore(Number(shopID))
        })
        RouteDefine.getDiscount(this.localPlayer.userId).then(val => {
            StoreModuleC.discount = val
        })
    }


    public async checkPopDialog() {
        RouteDefine.canReceiveActivity(Player.localPlayer.userId, EStateIndex.ShowPopDialog).then(async v => {
            let stamp = await this.server.net_getGuideMark()
            if (!v && stamp != null && stamp != new Date().toLocaleDateString()) {
                TimeUtil.delaySecond(0.5).then(async () => {
                    UIService.show(UIIntegration).showSubTab();
                    TimeUtil.delaySecond(0.1).then(() => { ModuleService.getModule(SignModuleC).popSignUI() })
                })
            }
        });
    }

    public initStore() {
        let game = GameConfig.GameTheme.getAllElement().find(e => e.key == GamesStartDefines.gameTheme);
        let allData = GameConfig.Shop.getAllElement().filter(e => e.showGameID != null && e.showGameID.includes(game.id));
        GameConfig.ShopInstance.getAllElement().forEach(async e => {
            let shopId = e.id;
            this._shopDataById.set(shopId, allData.filter(d => d.shopID == shopId))
            let camera = await mw.GameObject.asyncFindGameObjectById(e.cameraGuid) as Camera
            let point = await mw.GameObject.asyncFindGameObjectById(e.itemPoint)
            if (camera && point && !this._shops.has(shopId)) {
                let shop = new ShopBean(shopId, camera, point);
                this._shops.set(shopId, shop)
                let shopData = allData.filter(c => c.shopID == shopId)//筛选出该商店的数据
                let map: Map<number, IShopElement[][]> = new Map()
                GameConfig.ShopLabel.getAllElement().forEach(e => {
                    if (!e.displayAll) {
                        this.hideType.push(e.id)
                    }
                    if (e.id != EShopItemType.All) {
                        let data = shopData.filter(c => { return c.type == e.id && c.show })//找出这一类的所有数据
                        let sort1 = [].concat(data.sort((a, b) => { return a.weight - b.weight }))
                        let sort2 = [].concat(data.sort((a, b) => {
                            let priceA = a.currencyType == 2 ? a.price * 1000000 : a.price
                            let priceB = b.currencyType == 2 ? b.price * 1000000 : b.price
                            return priceA - priceB
                        }))
                        let sort3 = [].concat(data.sort((a, b) => {
                            let priceA = a.currencyType == 2 ? a.price * 1000000 : a.price
                            let priceB = b.currencyType == 2 ? b.price * 1000000 : b.price
                            return priceB - priceA
                        }))
                        let sort4 = [].concat(data.sort((a, b) => { return Number(a.listingTime) - Number(b.listingTime) }))
                        let sort5 = [].concat(data.sort((a, b) => { return Number(b.listingTime) - Number(a.listingTime) }))

                        map.set(e.id, [sort1, sort2, sort3, sort4, sort5])
                    }
                })
                //过滤一下房子皮肤
                let skins = await RouteDefine.getAllSkins(this.localPlayer.userId);
                let skinData = map.get(EShopItemType.RoomSkin)
                for (let i = 0; i < skinData.length; ++i) {
                    let temp = []
                    skinData[i].forEach(e => {
                        let skinID = Number(GameConfig.Item.getElement(e.itemID).clazzParam[0])
                        if (skins.indexOf(skinID) == -1) { temp.push(e) }
                    })
                    skinData[i] = temp
                }
                this._shopDataMap.set(shopId, map)
                //整理全部商品数据
                this.getAllGoodData()
            }
        })
        TimeUtil.delaySecond(1).then(() => {
            UIService.getUI(UIShop);
            this._initDataFinish = true;
        })
    }
    private getAllGoodData() {
        this._shopDataMap.forEach((m, shopID) => {
            m.delete(EShopItemType.All);
            let temp = [];
            m.forEach((v, k) => {
                if (this.hideType.indexOf(k) == -1) temp = temp.concat(v[0])
            })
            let sort1 = [].concat(temp.sort((a, b) => { return a.weight - b.weight }))
            let sort2 = [].concat(temp.sort((a, b) => {
                let priceA = a.currencyType == 2 ? a.price * 1000000 : a.price
                let priceB = b.currencyType == 2 ? b.price * 1000000 : b.price
                return priceA - priceB
            }))
            let sort3 = [].concat(temp.sort((a, b) => {
                let priceA = a.currencyType == 2 ? a.price * 1000000 : a.price
                let priceB = b.currencyType == 2 ? b.price * 1000000 : b.price
                return priceB - priceA
            }))
            let sort4 = [].concat(temp.sort((a, b) => { return Number(a.listingTime) - Number(b.listingTime) }))
            let sort5 = [].concat(temp.sort((a, b) => { return Number(b.listingTime) - Number(a.listingTime) }))
            m.set(EShopItemType.All, [sort1, sort2, sort3, sort4, sort5])
        })
    }

    public getShopData(shopID: number) {
        if (!this._shopDataMap.has(shopID)) return null;
        return this._shopDataMap.get(shopID)
    }

    public getShopDataById(shopID: number) {
        if (!this._shopDataById.has(shopID)) return null;
        return this._shopDataById.get(shopID)
    }

    public updateSkinData(newSkinID: number) {
        this._shopDataMap.forEach((m, shopID) => {
            let skinData = m.get(EShopItemType.RoomSkin)
            skinData.forEach(e => {
                let index = e.findIndex(c => Number(GameConfig.Item.getElement(c.itemID).clazzParam[0]) == newSkinID)
                if (index != -1) e.splice(index, 1);
            })
        })
        this.getAllGoodData()
    }

    public openStore(shopID: number) {
        if (!this._shops.has(shopID)) return
        if (!this._initDataFinish) {
            Tips.show(LanUtil.getText("UI_Tips_shoploading"))
            return
        }
        if (GamesStartDefines.gameTheme != EGameTheme.Graveyard && GamesStartDefines.gameTheme != EGameTheme.Hospital) {
            // WeatherCtrl.setWeather(2)
        }
        this._curShopID = shopID
        this._shops.get(this._curShopID).openStore();
    }

    public closeStore() {
        if (!UIService.getUI(UIShop).visible) return
        if (GamesStartDefines.gameTheme != EGameTheme.Graveyard && GamesStartDefines.gameTheme != EGameTheme.Hospital) {
            // WeatherCtrl.setWeather(1)
        }
        this._shops.get(this._curShopID).closeStore();
    }

    public selectItem(itemID: number) {
        this._shops.get(this._curShopID)?.selectItem(itemID);
    }

    public rotateModel(state: boolean) {
        this._shops.get(this._curShopID).rotateModel(state)
    }

    public goToShopTab(index: EShopItemType = EShopItemType.Recharge, shopID: number = 1) {
        let shop = UIService.getUI(UIShop)
        if (shop.visible) {
            shop.jumpToTab(index, shopID)
        } else {
            this.openStore(this._curShopID)
            TimeUtil.delaySecond(0.1).then(() => {
                shop.jumpToTab(index, shopID)
            })
        }
    }

    //====================================rpc================================================//

    public async reqBuyItem(data: IShopElement, count: number) {
        if (data.currencyType == 1) {
            let totalPrice = StoreModuleC.discount * data.price * count
            let isEnough = await this.checkMoney(totalPrice)
            if (!isEnough) return
            let result = await this.server.net_buyItem(data.id, count);
            switch (result) {
                case "not_enough":
                    console.log("金币不足！！！");
                    break;
                case "buy_limit":
                    console.log("商品已限购");
                    break;
                case "item_is_not_enough":
                    console.log("剩余可购买数量不足");
                    break;
                default:
                    let itemData = GameConfig.Item.getElement(Number(result))
                    itemData && UIService.show(UIGainItem, itemData, count);
                    UIService.getUI(UIShop).selectItem(data);
                    Tips.show(LanUtil.getText("Code_043"))
                    GhostTraceHelper.uploadMGS("ts_action_buy_item", "购买物品上发", { box_id: count, item_id: itemData.id, model_id: data.id })
                    GhostTraceHelper.uploadMGS("ts_action_upgrade_item", "获得物品的时候上发", { item_id: itemData.id, item_level: 1 })
                    if (Number(result) == 10021) {
                        Event.dispatchToLocal("evt_triggerRedDot")
                    }
                    break;
            }
        } else {
            let rechargeData = GameConfig.happyCoin.getElement(data.price)
            let limit = await RouteDefine.checkBuyLimit(this.localPlayer.userId, data.id)
            if (limit <= 0) {
                Tips.show(LanUtil.getText("Code_044"))
                return
            }
            if (count > limit) {
                count = limit;
                console.log("IAP====>>>购买数量超过限制")
                return
            }
            let amount = Number(UIService.getUI(UIShop).text_renum.text)//当前剩余的乐币
            let need = GameStart.isGPark ? rechargeData.outValue : rechargeData.value
            if (amount < need) {
                GhostTraceHelper.uploadMGS("ts_action_buy_reborn", "玩家尝试购买发现货币不足时上发", { reborn_id: 2 })
            }
            ModuleService.getModule(IAPModuleC).placeOrder(rechargeData.id, count, data.id)
        }
    }

    public async reqWantedItem(ItemID: number) {
        let result = await this.server.net_wantItem(ItemID)
        if (!result) return
        if (result != -1) {
            let itemData = GameConfig.Item.getElement(result)
            itemData && UIService.show(UIGainItem, itemData, 1)
            GhostTraceHelper.uploadMGS("ts_action_upgrade_item", "获得物品的时候上发", { item_id: result, item_level: 0 })
        } else {
            UIService.getUI(UIShop).addCoinAni()
            Tips.show(GameConfig.SubLanguage.shop_16.Value);
        }
    }

    /**
     * 打开礼包
     * @param itemID 
     */
    public async reqOpenGiftPack(itemID: number, count: number, state: boolean = true) {
        let curGiftItemID = itemID
        let result = await this.server.net_openGiftPack(itemID, count, state);
        if (!result) {
            Tips.show(LanUtil.getText("Code_045"))
            return
        }
        UIService.hide(UIGiftBagOpen)
        UIService.show(UIGiftDisplay, result, curGiftItemID)
    }

    public async checkMoney(cost: number) {
        let money = await RouteDefine.getFearCoin(this.localPlayer.userId)
        if (cost > money) {
            GhostTraceHelper.uploadMGS("ts_action_buy_reborn", "玩家尝试购买发现货币不足时上发", { reborn_id: 1 })
            UIService.show(UIShopTips, GameConfig.SubLanguage.shoptips_01.Value, LanUtil.getText("Code_046"), () => {
                this.goToShopTab()
            }, false)
            return false
        }
        return true
    }

    /**
     * 检查有没有可以领的月卡和季卡
     */
    public static async checkCardRewards() {
        let result = await RouteDefine.getRewardState(Player.localPlayer.userId)
        let state1 = result[0].state != 0 && result[0].state != -1
        let state2 = result[1].state != 0 && result[1].state != -1
        return state1 || state2
    }

    /**
     * 检查是否可以领取每日礼包
     */
    public static async checkDailyPack() {
        let count = await RouteDefine.checkBuyLimit(Player.localPlayer.userId, 100)
        return count > 0
    }

    setModelRotate(val: string) {
        let strs = val.split("|")
        let rotation = new Rotation(Number(strs[0]), Number(strs[1]), Number(strs[2]))
        this._shops.get(this._curShopID).setRotate(rotation)
    }
    setModelScale(val: string) {
        let strs = val.split("|")
        let scale = new Vector(Number(strs[0]), Number(strs[1]), Number(strs[2]))
        this._shops.get(this._curShopID).setScale(scale)
    }
    setModelPosition(val: string) {
        let strs = val.split("|")
        let pos = new Vector(Number(strs[0]), Number(strs[1]), Number(strs[2]))
        this._shops.get(this._curShopID).setPosition(pos)
    }
}