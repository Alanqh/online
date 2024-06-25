import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { PropRefreshType, ShopFirstDo, TabType } from "../../const/enum";
import { utils } from "../../utils/uitls";
import { AnalyticsModuleS } from "../Analytics/AnalyticsModule";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { DressUpItemData } from "../DressUp/DressData";
import DressUpModuleS from "../DressUp/DressUpModuleS";
import PlayerAssetModuleS from "../PlayerAsset/PlayerAssetModuleS";
import PropSaveData from "../PlayerAsset/PropSaveData";
import { ShareModuleS } from "../Share/ShareModule";
import TeamS from "../Team/TeamS";
import TSIAP from "./IAPInstance";
import { AdInfo, ShopData, propInfo } from "./ShopData";
import { ShopModuleC } from "./ShopModuleC";

export class ShopModuleS extends ModuleS<ShopModuleC, ShopData> {

    private anlytics: AnalyticsModuleS = null;
    private shareMS: ShareModuleS = null;
    private teamMS: TeamS = null;

    //test
    addDay: number = 0;

    protected onStart(): void {
        TSIAP.instance.onBuyGoodsSuccess.add(this.onOrderDelivered.bind(this));

        TimeUtil.setInterval(() => {
            Player.getAllPlayers().forEach((player) => {
                this.updateVipTime(player);
            });
        }, 60)
        this.teamMS = ModuleService.getModule(TeamS);
        this.shareMS = ModuleService.getModule(ShareModuleS);
        this.anlytics = ModuleService.getModule(AnalyticsModuleS);
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        let lastTime = new Date(this.getPlayerData(player).selectPopTime);
        let now = new Date();
        if (!utils.isSameDay(lastTime, now)) {
            let shopData = this.getPlayerData(player);
            shopData.isShowGift = true;
            shopData.save(true);
        }
        this.moveMoney(player);
        this.updateVipTime(player);
        this.refreshLimitProps(player);



        //是否有称号
        let data = this.getPlayerData(player);
        if (data.vipInfo) {
            // ModuleService.getModule(PlayerModuleS).showTitle(player.playerId, true);
        }
        this.getClient(player).net_SyncShopData();
    }

    private moveMoney(player: Player) {
        let data = this.getPlayerData(player);
        if (data.isUp) return;
        if (data.gameCoin <= 0) {
            data.isUp = true;
            data.save(false);
            return;
        }
        this.shareMS.addGameCoin(data.gameCoin, player);
        data.isUp = true;
        data.save(false);
    }

    //服务器接受平台返回购买成功
    private onOrderDelivered(playerId: number, commodityId: string, amount: number) {

        console.warn(`lwj S端接受回调  playerId:${playerId} commodityId:${commodityId} amount:${amount} `);

        //根据商品ID添加道具
        let cfg = GameConfig.ShopItem.findElement("commodityId", commodityId);
        if (!cfg) {
            console.error("lwj  onOrderDelivered config not found:", commodityId);
            return;
        }

        let player = Player.getPlayer(playerId);
        this.addGameCoin(cfg.awards * amount, player);
        AnalyticsTool.ts_action_firstdo(ShopFirstDo.shopitem_success_ + cfg.ID, 0, player);
    }

    /**异常币购买 */
    net_buyItem(id: number, count: number): boolean {
        let cfg = GameConfig.ShopItem.getElement(id);

        //限购
        let isLimit = !this.currentData.isCanBuy(id, count);
        if (isLimit) {
            return false;
        }
        let isSuccess = this.shareMS.reduceGameCoin(cfg.price * count, this.currentPlayer);
        if (!isSuccess) {
            return false;
        }

        this.onBuyItemByMoney(this.currentPlayerId, id, count);
        this.addDress(this.currentPlayerId, cfg.dressIds);
        this.addChat(this.currentPlayerId, cfg.DanceIds);
        this.currentData.addBoughtId(id, count);

        AnalyticsTool.ts_action_firstdo(ShopFirstDo.shopitem_success_ + id, 0, this.currentPlayer);

        return true;
    }

    /**代币购买 */
    net_buyItemByCoin(id: number, count: number): boolean {
        let cfg = GameConfig.ShopItem.getElement(id);

        //限购
        let isLimit = !this.currentData.isCanBuy(id, count);
        if (isLimit) {
            return false;
        }
        let isSuccess = this.teamMS.reduceGameCoin(cfg.price * count, this.currentPlayerId);
        if (!isSuccess) {
            return false;
        }

        this.onBuyItemByMoney(this.currentPlayerId, id, count);
        this.addDress(this.currentPlayerId, cfg.dressIds);
        this.addChat(this.currentPlayerId, cfg.DanceIds);
        this.currentData.addBoughtId(id, count);

        AnalyticsTool.ts_action_firstdo(ShopFirstDo.shopitem_success_ + id, 0, this.currentPlayer);

        return true;
    }

    /**免费礼包 */
    net_buyWeeklyGift(id: number): boolean {
        let cfg = GameConfig.ShopItem.getElement(id);
        let isSuccess = !this.currentData.isCanBuy(id, 1);
        if (isSuccess) {
            return false;
        }
        let now = new Date();
        if (cfg.weekSolds && !cfg.weekSolds.includes(now.getDay())) {
            return false;
        }
        let propLimit = this.currentData.getBoughtProps(id);
        if (propLimit) {
            let lastTime = new Date(propLimit.date);
            let isRefresh = this.isRefresh(id, lastTime, now);
            if (!isRefresh) {
                return false;
            }
        }
        this.currentData.addBoughtId(id, 1);

        let data: PropSaveData = null;
        let time = TimeUtil.time();

        cfg.propIds.forEach((itemId, index) => {
            data = new PropSaveData(itemId, true, time, cfg.awardCount[index]);
            console.warn(`lwj 每周礼包 id: ${itemId}  数量： ${cfg.awardCount[index]}`);
            ModuleService.getModule(PlayerAssetModuleS).addPropAndSave(this.currentPlayerId, data);
        });
        this.anlytics.shopFirstDo(this.currentPlayerId, ShopFirstDo.present_take);
        AnalyticsTool.ts_action_firstdo(ShopFirstDo.shopitem_success_ + id, 0, this.currentPlayer);
        return true;
    }

    addGameCoin(val: number, player: Player) {
        this.shareMS.addGameCoin(val, player);
    }


    net_orderDelivered(commodityId: string, amount: number) {
        console.warn(`lwj S端 乐币测试方法  `);
        this.onOrderDelivered(this.currentPlayerId, commodityId, amount);
    }


    /**玩家限购道具进行刷新 */
    private refreshLimitProps(player: mw.Player) {
        let datas = this.getPlayerData(player).boughtProps;
        let now = new Date();
        let needRefresh: propInfo[] = [];
        datas.forEach((data) => {
            let lastTime = new Date(data.date);
            let isRefresh = this.isRefresh(data.id, lastTime, now);
            if (isRefresh) {
                needRefresh.push(data);
            }
        });
        //删除需要刷新的道具
        needRefresh.forEach((data) => {
            let index = datas.indexOf(data);
            datas.splice(index, 1);
        });

        this.getPlayerData(player).save(true);
    }

    /**判断道具是否刷新 */
    private isRefresh(cfgId: number, lastTime: Date, now: Date): boolean {
        let cfg = GameConfig.ShopItem.getElement(cfgId);
        let isRefresh = false;
        switch (cfg.refreshType) {
            case PropRefreshType.noRefresh:
                isRefresh = false;
                break;
            case PropRefreshType.Day:
                isRefresh = !utils.isSameDay(lastTime, now);
                break;
            case PropRefreshType.Week:
                isRefresh = !utils.isSameWeek(lastTime, now);
                break;
            default:
                break;
        }

        return isRefresh;
    }

    net_buySupply(price: number) {
        let isSuccess = this.shareMS.reduceGameCoin(price, this.currentPlayer);
        if (!isSuccess) {
            return false;
        }
        this.buySupply(this.currentPlayerId);
    }

    net_buyVip(price: number) {
        let isSuccess = this.shareMS.reduceGameCoin(price, this.currentPlayer);
        if (!isSuccess) {
            return false;
        }
        this.buyVip(this.currentPlayerId);
    }

    /**玩家购买补给礼包 */
    private buySupply(playerId: number) {
        let data = this.getPlayerData(playerId);
        console.warn(`lwj S端购买补给礼包`);
        data.buySupplyInfo();
        this.getClient(playerId).net_buySuccess(TabType.Supply);
        this.anlytics.shopFirstDo(playerId, ShopFirstDo.hot_buy_success);
    }

    /**玩家领取补给礼包 */
    net_GetSupply() {
        let data = this.getPlayerData(this.currentPlayerId);
        let cur = data.supplyInfo.stage
        let cfg = GlobalData.Shop.supplyGiftIds[cur];
        if (!cfg) return -1;
        console.warn(`lwj cur ${cur} `);
        //加奖励 
        this.onBuyItemByMoney(this.currentPlayerId, cfg, 1);
        data.getSupplyInfo();
        return cur;
    }

    /**更新VIP时间 */
    private updateVipTime(player: Player) {
        let data = this.getPlayerData(player);
        if (!data) return;
        if (!data.vipInfo) return;
        let buyTime = new Date(data.vipInfo.date);
        let now = new Date();
        if (this.addDay > 0) {
            now.setDate(now.getDate() + this.addDay);
        }
        let hour = utils.compareDate(now, buyTime);
        hour = GlobalData.Shop.vipHour - hour;
        if (hour <= 0) {
            //过期了
            data.resetVip();
            this.getClient(player).net_ResetVip();
            // ModuleService.getModule(PlayerModuleS).showTitle(player.playerId, false);
        }
    }

    test_VIP(player: Player, addDay: number) {
        let data = this.getPlayerData(player);
        if (!data) return;
        if (!data.vipInfo) return;
        let buyTime = new Date(data.vipInfo.date);
        let now = new Date();
        //加时间
        now.setDate(now.getDate() + addDay);
        let hour = utils.compareDate(now, buyTime);
        hour = GlobalData.Shop.vipHour - hour;
        if (hour <= 0) {
            //过期了
            data.resetVip();
            this.getClient(player).net_ResetVip();
            // ModuleService.getModule(PlayerModuleS).showTitle(player.playerId, false);
        }
    }


    /**玩家购买VIP */
    private buyVip(playerId: number) {
        let data = this.getPlayerData(playerId);
        data.buyVipInfo();
        this.getClient(playerId).net_buySuccess(TabType.Vip);
        // ModuleService.getModule(PlayerModuleS).showTitle(playerId, true);
        this.anlytics.shopFirstDo(playerId, ShopFirstDo.vip_buy_success);
    }

    net_GetVip(): boolean {
        console.warn(`lwj 领取vip奖励`);
        if (!this.currentData.vipInfo) return false;
        let lastStr = this.currentData.vipInfo.todayDate;
        let now = new Date();

        if (this.addDay > 0) {
            now.setDate(now.getDate() + this.addDay);
        }
        if (lastStr == "") {
            this.currentData.getVipAward(now.toString());
            this.onBuyItemByMoney(this.currentPlayerId, 5001, 1);
            return true;
        }
        let lastTime = new Date(lastStr);
        let isSome = utils.isSameDay(lastTime, now);
        if (isSome) return false;
        this.currentData.getVipAward(now.toString());

        this.onBuyItemByMoney(this.currentPlayerId, 5001, 1);
        return true;

    }

    /**乐币购买回调 */
    private onBuyItemByMoney(playerId: number, cfgId: number, count: number) {

        let cfg = GameConfig.ShopItem.getElement(cfgId);
        let data: PropSaveData = null;
        let time = -1;
        let isForever = true;
        if (cfg.time) {
            isForever = false;
        }
        let shopData = this.getPlayerData(playerId);
        if (!cfg.propIds) return;

        cfg.propIds.forEach((itemId, index) => {
            let forever = isForever;

            if (!isForever) {
                time = cfg.time[index] * 24 * 60 * 60;
                if (time == 0) {
                    forever = true;
                    time = -1;
                }
            }
            data = new PropSaveData(itemId, forever, time, count * cfg.awardCount[index]);
            console.warn(`lwj 添加 id: ${itemId} 是否限时${forever}  数量： ${count * cfg.awardCount[index]}`);
            ModuleService.getModule(PlayerAssetModuleS).addPropAndSave(playerId, data);
        });
        this.shopFirstDo(playerId, cfgId);
        //统计复活币个数
        if (cfgId == 1001) {
            AnalyticsTool.ts_action_firstdo(ShopFirstDo.reborn_buy_success_number, count, Player.getPlayer(playerId));
        }
        if (cfgId == 3002) {
            AnalyticsTool.ts_action_firstdo(ShopFirstDo.reborn_buy_success_number, cfg.awardCount[0] * count, Player.getPlayer(playerId));
        }
        //统计变身卡
        if (cfgId == 1002) {
            AnalyticsTool.ts_action_firstdo(ShopFirstDo.transfer_buy_success_number, count, Player.getPlayer(playerId));
        }
        if (cfgId == 3003) {
            AnalyticsTool.ts_action_firstdo(ShopFirstDo.transfer_buy_success_number, cfg.awardCount[0] * count, Player.getPlayer(playerId))
        }
    }

    private addDress(playerID: number, dressArr: number[]) {
        if (!dressArr || dressArr.length == 0) {
            return;
        }
        let dressMS = ModuleService.getModule(DressUpModuleS);

        let data: DressUpItemData = null;

        dressArr.forEach((v) => {
            let cfg = GameConfig.Dress.getElement(v);
            if (!cfg) {
                return;
            }
            let type = this.findDressType(v);
            if (type == 0) {
                console.error(`lwj 找不到装扮类型 id:${v}`);
                return;
            }
            data = new DressUpItemData(v, type);

            dressMS.addDress(playerID, data);
        });


    }

    private addChat(playerID: number, chatArr: number[]) {
        if (!chatArr || chatArr.length == 0) {
            return;
        }
    }

    private findDressType(dressId: number): number {
        let type = 0;
        let cfg = GameConfig.DressTab.getAllElement();
        cfg.forEach((v) => {
            if (!v.SourceId) return;
            if (type != 0) return;
            if (v.SourceId.includes(dressId)) {
                type = v.id;
            }
        })
        return type;
    }

    /**埋点 */
    private shopFirstDo(playerId: number, cfgId: number) {
        let player = Player.getPlayer(playerId);
        switch (cfgId) {
            case 1002:
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.transfer_buy_success, 0, player);
                break;
            case 3002:
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.reborn_buy_success, 0, player);
                break;
            case 3003:
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.transfer_success, 0, player);
                break;
            case 2001:
                //武器
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.weapon_buy_success, 0, player);
                break;
            case 2002:
                //3天武器
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.weapon_daily_buy_success_01, 0, player);
                break;
            case 2003:
                //7天武器
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.weapon_daily_buy_success_02, 0, player);
                break;
            case 2004:
                //团扇
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.weapon_buy_success, 0, player);
                break;
            default:
                break;
        }
    }
    public net_setShowGiftInfo(isshow: boolean) {
        let shopData = this.getPlayerData(this.currentPlayerId);
        shopData.isShowGift = isshow;
        shopData.selectPopTime = new Date().toString();
        shopData.save(true);
    }


    /**保存广告播放信息 */
    net_saveAdInfo(id: number, remain: number) {
        let adInfo = this.currentData.adInfo.find((data) => data.id == id);
        if (adInfo)
            adInfo.remain = remain;
        else
            this.currentData.adInfo.push(new AdInfo(id, remain));
        this.currentData.save(false);
    }
}