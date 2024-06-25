/*
 * @Author       : dal
 * @Date         : 2024-02-28 10:58:05
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-31 18:04:11
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\idcard\IDCardModule.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { IGiftElement } from "../../../config/Gift";
import SubDataHelper from "../../SubDataHelper";
import { MainUI } from "../../ui/MainUI";
import { WaitLoop } from "../../utils/AsyncTool";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { DanmakuModuleC } from "../danmaku/DanmakuModule";
import MissionData from "../mission/MissionData";
import RecordData from "../record/RecordData";
import { RouteDefine } from "../route/RouteDefine";
import { RouteModuleS } from "../route/RouteModule";
import StoreModuleC from "../store/StoreModuleC";
import { BaseInfo, DayLikeNum, EGiftPurchaseType, FreeGiftTimes, GiftInfo, IntimacyInfo, LikeAddIntimacyVal, MaxRecentLikeNum, RecentGiftInfo, RecentLikeInfo, TestHeadImgList, TestNameList } from "./IDCardConst";
import { IDCardData, IDCardDataHelper, IDCardDataType } from "./IDCardDataHelper";
import IDCardDefine from "./IDCardDefine";
import IDCardPanel from "./ui/IDCardPanel";

export class IDCardModuleC extends ModuleC<IDCardModuleS, null> {

    public async checkCanPurChase(cfg: IGiftElement, costOrCount: number) {
        if (costOrCount <= 0) { return true; }
        switch (cfg.purchaseType) {
            case EGiftPurchaseType.Free:
                const data = await this.reqData(Player.localPlayer.userId);
                if (data.freeGiftTimes >= costOrCount) {
                    return true;
                } else {
                    Tips.show(StringUtil.format(LanUtil.getText("Code_001"), data.freeGiftTimes));
                    return false;
                }
            case EGiftPurchaseType.LeBi:
                // Tips.show("现在还没接乐币哦亲！")
                return false;
            case EGiftPurchaseType.FearCoin:
                // const fearCoin = await RouteDefine.getFearCoin(Player.localPlayer.userId);
                // if (fearCoin >= costOrCount) {
                //     return true;
                // } else {
                //     Tips.show("恐惧币不足，购买失败");
                //     return false;
                // }
                let result = await ModuleService.getModule(StoreModuleC).checkMoney(costOrCount)
                return result
            default:
                return false;
        }
    }

    protected onStart(): void {
        this.updateBaseInfo();
        Event.addServerListener("OnExpChangeCall", this.checkUpdatePanel.bind(this));
    }

    private checkUpdatePanel() {
        if (this.selfPanel.visible) {
            this.reqData(this.selfPanel["userId"]).then(v => {
                this.selfPanel.updateIDCardInfo(v);
            });
        }
    }

    /** 更新初始信息 */
    private async updateBaseInfo() {
        this.server.net_reqUpdateBaseInfo(this.localPlayer.userId, await this.getLocalPlayerBaseInfo());
    }

    public async getLocalPlayerBaseInfo() {
        const p = await Player.asyncGetLocalPlayer() as Player;
        await p.character.asyncReady();
        const baseInfo = new BaseInfo();
        if (SystemUtil.isPIE) {
            baseInfo.si = "testpie";
            baseInfo.u = TestHeadImgList[MathUtil.randomInt(0, TestHeadImgList.length)];
            baseInfo.n = TestNameList[MathUtil.randomInt(0, TestNameList.length)];
            baseInfo.s = p.character.description.advance.base.characterSetting.somatotype % 2;
            baseInfo.id = p.userId;
        } else {
            AccountService.createSharedId(p.character, (shareId: string) => {
                baseInfo.si = shareId;
                baseInfo.u = p["avatarUrl"];
                baseInfo.n = p["nickname"];
                baseInfo.s = p.character.description.advance.base.characterSetting.somatotype % 2;
                baseInfo.id = p.userId;
            });
            await WaitLoop.loop(() => { return baseInfo.si }, 10, -1);
        }
        return baseInfo;
    }

    /** 检查一个玩家是否可以点赞 */
    private async checkCanLike(beLikedUserId: string): Promise<boolean> {
        if (beLikedUserId === Player.localPlayer.userId) { Tips.show(LanUtil.getText("Code_010")); return false; }
        // if (!Player.getPlayer(beLikedUserId)) { Tips.show(LanUtil.getText("Code_011")); return false; }
        const data = await this.reqData(Player.localPlayer.userId);
        if (IDCardDefine.checkIsNewDay(data.lastLoginTimeStamp)) {
            this.server.net_updateToDayLikeInfo(Player.localPlayer.userId);
            return true;
        }
        if (data.todayLikedUserIdList.includes(beLikedUserId)) { Tips.show(LanUtil.getText("Code_012")); return false; }
        if (data.todayLeftLikeNum <= 0) { Tips.show(LanUtil.getText("Code_013")); return false; }
        return true;
    }

    /** 检查一个玩家是否可以送礼 */
    private checkCanGift(beLikedUserId: string): boolean {
        // 支持给自己送礼
        // if (beLikedUserId === Player.localPlayer.userId) { Tips.show(LanUtil.getText("Code_014")); return false; }
        // 支持跨房间
        // if (!Player.getPlayer(beLikedUserId)) { Tips.show(LanUtil.getText("Code_015")); return false; }
        return true;
    }

    public async getCharmVal() {
        return this.server.net_getCharmVal(this.localPlayer.userId);
    }

    public async reqData(userId: string) {
        return this.server.net_reqData(userId);
    }

    public reqSetData(userId: string, properties: string[], values: any[]) {
        this.server.net_reqSetData(userId, properties, values);
    }

    /**
     * 请求点赞
     * @param beLikerId 
     * @param isFaker 被点赞的对象是否伪人
     */
    public async reqLike(beLikerId: string, isFaker: boolean = false) {
        if (isFaker) {
            this.server.net_reqLike(this.localPlayer.userId, beLikerId, isFaker);
            return;
        }
        if (await this.checkCanLike(beLikerId)) {
            this.server.net_reqLike(this.localPlayer.userId, beLikerId, isFaker);
            GhostTraceHelper.uploadMGS("ts_action_collect_resource", "点赞", { spawn_id: 1, spawn_num: -1 });
        }
    }

    /**
     * 响应点赞
     * @param likerId 
     * @param beLikerData 
     */
    public net_resLike(likerId: string, beLikerData: IDCardData) {
        // 被点赞的人
        if (beLikerData.baseInfo.id === this.localPlayer.userId) {
            Tips.show(StringUtil.format(LanUtil.getText("Code_016"), Player.getPlayer(likerId).character.displayName));
            UIService.getUI(MainUI).flyCharmOrExpIcon(true);
        }
        this.checkNeedRefreshPanel(beLikerData);
    }

    private get selfPanel() {
        return UIService.getUI(IDCardPanel);
    }

    /** 检查是否需要刷新面板 */
    public checkNeedRefreshPanel(beLikerData: IDCardData) {
        if (this.selfPanel.visible && this.selfPanel["userId"] === beLikerData.baseInfo.id) {
            this.selfPanel.updateIDCardInfo(beLikerData);
        }
    }

    /**
     * 请求送礼
     * @param beGiftUserId 收礼的玩家
     * @param giftCfgId 礼物配置id
     * @param giftCount 礼物数量
     * @param isFaker 是否伪人
     * @param isReduceCoin 是否直接减少恐惧币
     * @returns 
     */
    public reqGift(beGiftUserId: string, giftCfgId: number, giftCount: number, isFaker: boolean = false, isReduceCoin: boolean = false) {
        if (isFaker) {
            this.server.net_reqGift(this.localPlayer.userId, beGiftUserId, giftCfgId, giftCount, isFaker, isReduceCoin);
            return true;
        }
        if (this.checkCanGift(beGiftUserId)) {
            this.server.net_reqGift(this.localPlayer.userId, beGiftUserId, giftCfgId, giftCount, isFaker, isReduceCoin);
            GhostTraceHelper.uploadMGS("ts_action_collect_resource", "送礼", { spawn_id: giftCount, spawn_num: giftCfgId });
            return true;
        }
        return false;
    }

    /** 响应送礼 */
    public net_resGift(giftUserId: string, beLikerData: IDCardData, giftCfgId: number, giftCount: number) {
        // 自己是送礼的人
        // 自己给自己送不给提示
        if (giftUserId != beLikerData.baseInfo.id && giftUserId === Player.localPlayer.userId) {
            const giftCfg = GameConfig.Gift.getElement(giftCfgId);
            const name1 = Player.getPlayer(giftUserId).character.displayName;
            const name2 = beLikerData.baseInfo.n;
            const txt = StringUtil.format(LanUtil.getText("Code_017"), name1, name2, giftCfg.name, giftCount);
            ModuleService.getModule(DanmakuModuleC).chatemoji(txt, 1);
        }
        if (beLikerData.baseInfo.id === Player.localPlayer.userId) {
            UIService.getUI(MainUI).flyCharmOrExpIcon(true);
        }
        this.checkNeedRefreshPanel(beLikerData);
    }

    /**
     * 增加玩家魅力值
     * @param addVal 增加的量
     */
    public addCharmVal(addVal: number) {
        if (!addVal) { return; }
        this.server.net_addCharmVal(this.localPlayer.userId, addVal);
    }

    /**
     * 获取玩家当前的头像框
     */
    public getCurHeadFrame(userId: string) {
        return this.server.net_getCurHeadFrame(userId);
    }

    /**
     * 获取玩家当前的头像框
     * @param frameId 头像框配置id
     */
    public reqChangeCurFrame(frameId: number) {
        return this.server.net_reqChangeCurFrame(frameId);
    }
}

export class IDCardModuleS extends ModuleS<IDCardModuleC, null> {

    /**
     * 请求改变当前的头像框
     * @param frameId 头像框配置id
     * @returns 是否成功
     */
    public async net_reqChangeCurFrame(frameId: number) {
        const frameCfg = GameConfig.AvatarFrame.getElement(frameId);
        const userId = this.currentPlayer.userId;
        if (frameId === 1 || await ModuleService.getModule(RouteModuleS).net_checkSpecialItemExist(userId, frameCfg.itemId)) {
            const data = await this.net_reqData(userId);
            data.curFrameId = frameId;
            this.saveData(userId, data);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取玩家当前的头像框
     */
    public async net_getCurHeadFrame(userId: string) {
        const data = await this.net_reqData(userId);
        return data.curFrameId ? data.curFrameId : 1;
    }

    @Decorator.noReply()
    public async net_reqGift(giftUserId: string, beGiftUserId: string, giftCfgId: number, giftCount: number, isFaker: boolean = false, isReduceCoin: boolean = false) {
        let serverLikerId = this.currentPlayer.userId;
        // 防作弊
        if (serverLikerId != null && serverLikerId != undefined) { giftUserId = serverLikerId; }
        // 点赞的人
        const likerData = await this.net_reqData(giftUserId);

        // 被点赞的人
        const beLikerData = await this.net_reqData(beGiftUserId);

        // 验证是否可以送礼
        if (!isFaker && !this.checkCanGift(likerData, beLikerData)) { return; }

        // 验证是否资源足够
        const cfg = GameConfig.Gift.getElement(giftCfgId);
        const itemDataList = await RouteDefine.getSpecialItemDataList(giftUserId);
        const giftItemData = itemDataList.find(v => { return v.cfgId === cfg.itemId });
        let haveCount = giftItemData ? giftItemData.count : 0;
        haveCount = isReduceCoin ? 0 : haveCount;
        const reduceItemCount = Math.min(haveCount, giftCount);
        const costOrCount = cfg.purchaseType === EGiftPurchaseType.Free ? (giftCount - haveCount) : (giftCount - haveCount) * cfg.price;
        if (!(await this.checkResEnough(giftUserId, cfg, costOrCount))) { return; }

        // 扣除资源
        this.reduceRes(giftUserId, cfg.purchaseType, cfg.itemId, reduceItemCount, costOrCount, likerData);

        //更新任务进度
        let player = Player.getPlayer(giftUserId);
        player && DataCenterS.getData(player, MissionData).updateLikeData(1, reduceItemCount)

        // 增加亲密度
        if (!isFaker) {
            this.countIntimacy(likerData, beLikerData, cfg.intimacy * giftCount);
        }
        this.saveData(giftUserId, likerData);

        if (!isFaker) {
            // 被送礼的人，增加魅力值，最近送礼列表
            beLikerData.charmVal += cfg.charmVal * giftCount;
            // 最近收礼列表
            const recentGiftInfo = new RecentGiftInfo();
            recentGiftInfo.uId = giftUserId;
            recentGiftInfo.n = likerData.baseInfo.n;
            recentGiftInfo.gId = cfg.id;
            recentGiftInfo.c = giftCount;
            beLikerData.recentGiftInfoList.push(recentGiftInfo);
            if (beLikerData.recentGiftInfoList.length > MaxRecentLikeNum) { beLikerData.recentGiftInfoList.shift(); }
            // 礼物列表
            let giftInfo = beLikerData.giftInfoList.find(v => { return v.gId === giftCfgId });
            if (!giftInfo) {
                giftInfo = new GiftInfo();
                giftInfo.gId = giftCfgId;
                beLikerData.giftInfoList.push(giftInfo);
            }
            giftInfo.c += giftCount;
            this.saveData(beGiftUserId, beLikerData);

            // 送礼人记录变更
            const likerRecordData = DataCenterS.getData(likerData.baseInfo.id, RecordData);
            likerRecordData && likerRecordData.saveSendGiftTimes(-2, giftCount);

            // 被送礼人次数记录变更
            const beLikerRecordData = await RecordData.getGlobalData(beLikerData.baseInfo.id);
            beLikerRecordData && SubDataHelper.ins.saveGlobalReceiveGiftTimes(beLikerData.baseInfo.id, beLikerRecordData, -2, giftCount);
        }

        // 通知所有客户端，完成了送礼这件事情
        this.getAllClient().net_resGift(giftUserId, beLikerData, giftCfgId, giftCount);
    }

    /** 扣除资源 */
    private reduceRes(userId: string, type: EGiftPurchaseType, itemId: number, reduceItemCount: number, costOrCount: number, likerData: IDCardData) {
        // 如果有，先扣除有的
        if (reduceItemCount > 0) {
            RouteDefine.removeSpecialItem(userId, itemId, reduceItemCount);
        }
        if (costOrCount <= 0) { return true; }
        switch (type) {
            case EGiftPurchaseType.Free:
                likerData.freeGiftTimes -= costOrCount;
                break;
            case EGiftPurchaseType.LeBi:
                // TODO: 乐币支付接口
                break;
            case EGiftPurchaseType.FearCoin:
                RouteDefine.changeFearCoin(userId, -costOrCount);
                break;
            default:
                break;
        }
    }

    /** 检查资源是否足够 */
    private async checkResEnough(userId: string, cfg: IGiftElement, costOrCount: number) {
        if (costOrCount <= 0) { return true; }
        switch (cfg.purchaseType) {
            case EGiftPurchaseType.Free:
                const data = await this.net_reqData(userId);
                return data.freeGiftTimes >= costOrCount;
            case EGiftPurchaseType.LeBi:
                return false;
            case EGiftPurchaseType.FearCoin:
                const fearCoin = await RouteDefine.getFearCoin(userId);
                return fearCoin >= costOrCount;
            default:
                return false;
        }
    }

    /**
     * 
     * @param likerId 点赞的人
     * @param beLikerId 被点赞的人
     */
    @Decorator.noReply()
    public async net_reqLike(likerId: string, beLikerId: string, isFaker: boolean = false) {
        let serverLikerId = this.currentPlayer.userId;

        // 防作弊
        if (serverLikerId != null && serverLikerId != undefined) { likerId = serverLikerId; }
        // 点赞的人
        const likerData = await this.net_reqData(likerId);
        // 被点赞的人
        const beLikerData = await this.net_reqData(beLikerId);
        if (!isFaker && !this.checkCanLike(likerData, beLikerData)) { return; }

        if (IDCardDefine.checkIsNewDay(likerData.lastLoginTimeStamp)) {
            this.updateToDayLikeInfo(likerData);
        } else {
            if (likerData.todayLeftLikeNum <= 0) { return false; }
            if (likerData.todayLikedUserIdList.includes(beLikerData.baseInfo.id)) { return false; }
        }

        // 结算请密度
        if (!isFaker) { this.countIntimacy(likerData, beLikerData, LikeAddIntimacyVal); }

        // 点赞人
        likerData.todayLeftLikeNum -= 1;
        likerData.todayLikedUserIdList.push(beLikerId);
        this.saveData(likerId, likerData);
        //更新任务进度 点赞
        let player = Player.getPlayer(likerId);
        player && DataCenterS.getData(player, MissionData).updateLikeData(0, 1)

        // 被点赞的人，增加魅力值
        if (!isFaker) {
            beLikerData.beLikedCount += 1;
            beLikerData.charmVal += 1;
            // 最近点赞列表
            const recentLikeInfo = new RecentLikeInfo();
            recentLikeInfo.u = likerId;
            recentLikeInfo.n = likerData.baseInfo.n;
            beLikerData.recentLikeInfoList.push(recentLikeInfo);
            if (beLikerData.recentLikeInfoList.length > MaxRecentLikeNum) { beLikerData.recentLikeInfoList.shift(); }
            this.saveData(beLikerId, beLikerData);

            // 增加点赞人的点赞次数记录
            const likerRecordData = DataCenterS.getData(likerData.baseInfo.id, RecordData);
            likerRecordData && likerRecordData.saveSendGiftTimes(-1, 1);

            // 增加被点赞人的点赞次数记录 - 考虑给离线玩家或其他房间玩家送礼的情况
            const beLikerRecordData = await RecordData.getGlobalData(beLikerData.baseInfo.id);
            beLikerRecordData && SubDataHelper.ins.saveGlobalReceiveGiftTimes(beLikerData.baseInfo.id, beLikerRecordData, -1, 1);

            // 给回调
            this.getAllClient().net_resLike(likerId, beLikerData);
        }
    }

    /**
     * 送了礼,要总结一下两个玩家之间亲密度
     * @param data1 数据1
     * @param data2 数据2
     * @param addVal 增加的亲密读值
     */
    private countIntimacy(data1: IDCardData, data2: IDCardData, addVal: number) {
        this.intimacyCountUtil(data1, data2.baseInfo.id, addVal);
        this.intimacyCountUtil(data2, data1.baseInfo.id, addVal);
    }

    private intimacyCountUtil(data: IDCardData, withUserId: string, addVal: number) {
        let info = data.intimacyInfoList.find(v => { return v.id === withUserId });
        if (!info) { info = new IntimacyInfo(); data.intimacyInfoList.push(info); }
        info.id = withUserId;
        info.v += addVal;
    }

    /** 检查一个玩家是否可以点赞 */
    private checkCanLike(likerData: IDCardData, beLikerData: IDCardData): boolean {
        // if (!Player.getPlayer(beLikerData.baseInfo.id)) { return false; }
        if (likerData.baseInfo.id === beLikerData.baseInfo.id) { return false; }
        return true;
    }

    /** 检查一个玩家是否可以送礼 */
    private checkCanGift(likerData: IDCardData, beLikerData: IDCardData): boolean {
        // 下面都支持了
        // 玩家不在线，不能送礼
        // if (!Player.getPlayer(beLikerData.baseInfo.id)) { return false; }
        // 不能给本人送礼
        // if (likerData.baseInfo.id === beLikerData.baseInfo.id) { return false; }
        return true;
    }

    /** 请求更新，同时更新上次登录时间 */
    @Decorator.noReply()
    public async net_reqUpdateBaseInfo(userId: string, baseInfo: BaseInfo) {
        const data = await this.net_reqData(userId);
        data.baseInfo = baseInfo;
        this.initGift(data);
        // 登录时发现是新的一天那么更新今日份点赞信息
        if (IDCardDefine.checkIsNewDay(data.lastLoginTimeStamp)) {
            this.updateToDayLikeInfo(data);
        }
        this.saveData(userId, data);
    }

    /**
     * 初始化礼物
     * @param data 
     */
    private initGift(data: IDCardData) {
        const giftIdList = GameConfig.Gift.getAllElement().map((v) => { return v.id });
        const myGiftIdList = data.giftInfoList.map(v => { return v.gId });
        const needInitGift = giftIdList.filter(v => { return !myGiftIdList.includes(v) });
        needInitGift.forEach(v => {
            const giftInfo = new GiftInfo();
            giftInfo.gId = v;
            data.giftInfoList.push(giftInfo);
        });
    }

    private updateToDayLikeInfo(data: IDCardData) {
        data.lastLoginTimeStamp = Date.now();
        data.freeGiftTimes = FreeGiftTimes;
        data.todayLeftLikeNum = DayLikeNum;
        data.todayLikedUserIdList = [];
    }

    /** 更新今日份点赞信息 */
    @Decorator.noReply()
    public net_updateToDayLikeInfo(userId: string) {
        this.net_reqSetData(userId, [IDCardDataType.LastLoginTimeStamp, IDCardDataType.TodayLeftLikeNum, IDCardDataType.TodayLikedUserIdList],
            [Date.now(), DayLikeNum, []]);
    }

    public async net_getCharmVal(userId: string) {
        return (await IDCardDataHelper.reqGetData(userId)).charmVal;
    }

    public async net_reqData(userId: string) {
        return IDCardDataHelper.reqGetData(userId);
    }

    @Decorator.noReply()
    public net_reqSetData(userId: string, properties: string[], values: any[]) {
        IDCardDataHelper.reqSetData(userId, properties, values);
    }

    @Decorator.noReply()
    private saveData(userId: string, data: IDCardData) {
        IDCardDataHelper.reqSaveData(userId, data);
    }

    /** 增加玩家鬼魅值 */
    @Decorator.noReply()
    public async net_addCharmVal(userId: string, val: number) {
        if (!val) { return; }
        let data = await this.net_reqData(userId);
        data.charmVal += val;
        this.saveData(userId, data);
    }
}
