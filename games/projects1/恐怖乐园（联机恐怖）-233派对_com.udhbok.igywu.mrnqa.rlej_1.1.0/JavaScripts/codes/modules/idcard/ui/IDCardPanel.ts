/*
 * @Author       : dal
 * @Date         : 2024-02-28 16:37:08
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-05-19 17:55:12
 * @FilePath: \1001_hall\JavaScripts\codes\modules\idcard\ui\IDCardPanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import Avatar_UI_Generate from "../../../../ui-generate/ShareUI/card/Avatar_UI_generate";
import LevelItem_Generate from "../../../../ui-generate/ShareUI/card/LevelItem_generate";
import { EGameTheme } from "../../../Defines";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { GridContainer, GridSelectContainer } from "../../../utils/UIPool";
import { AchieveService } from "../../achievement/AchieveDefine";
import AchieveModuleC from "../../achievement/AchieveModuleC";
import { AchieveMiniItem } from "../../achievement/ui/AchieveItem";
import FakerModuleC from "../../faker/FakerModuleC";
import { RouteDefine } from "../../route/RouteDefine";
import { RouteModuleC } from "../../route/RouteModule";
import FakerIDCardHelper, { FakerErrorInfoType, recycleTime } from "../FakerIDCardHelper";
import { GameThemeRecordList } from "../IDCardConst";
import { IDCardData, IDCardDataType } from "../IDCardDataHelper";
import IDCardDefine from "../IDCardDefine";
import { IDCardModuleC } from "../IDCardModule";
import AddFriendHud from "./AddFriendPanel";
import GameRecordPanel from "./GameRecordPanel";
import GameThemeItem from "./GameThemeItem";
import { GiftItem, GiftSendItem } from "./GiftItem";
import HeadFrameChangePanel from "./HeadFrameChangePanel";
import { RecentGiftInfoItem, RecentLikeInfoItem } from "./RecentInfoItem";

export default class IDCardPanel extends Avatar_UI_Generate {

    protected onAwake(): void {
        this.canUpdate = false;
        this.initButtons();
    }

    protected onStart() {
        this.btn_close.onClicked.add(() => { this.hide(); });
        this.btn_good.onClicked.add(this.onLikeClick.bind(this));
        this.btn_gift.onClicked.add(this.onGiftClick.bind(this));
        this.btn_more.onClicked.add(this.onMoreClick.bind(this));
        this.btn_pexp.onClicked.add(this.onPexpClick.bind(this));
        this.btn_off1.onClicked.add(() => { this.canvas_like.visibility = SlateVisibility.Collapsed; });
        this.btn_off2.onClicked.add(() => { this.canvas_sendgift.visibility = SlateVisibility.Collapsed; });
        this.btn_off3.onClicked.add(() => { this.canvas_giftItems.visibility = SlateVisibility.Collapsed; });
        this.btn_off001.onClicked.add(() => { this.canvas_achieveMini.visibility = SlateVisibility.Collapsed; });
        this.btn_myAchievement.onClicked.add(() => { this.canvas_achieveMini.visibility = SlateVisibility.SelfHitTestInvisible; });
        this.btn_taAchievement.onClicked.add(() => { this.canvas_achieveMini.visibility = SlateVisibility.SelfHitTestInvisible; });
        this.stalebtn_chage.onClicked.add(() => {
            if (!this.isSelfIDCard) { return; }
            UIService.show(HeadFrameChangePanel, this.curUsedFrameId);
        })
        this.stalebtnedit.onClicked.add(this.enterEditMode.bind(this));
        this.stalebtn_BeFriend.onClicked.add(this.onAddFriendClick.bind(this));
        this.inputBox_sign.onTextCommitted.add(this.onSignCommitted.bind(this));
        this.btn_report.onClicked.add(this.onReportFaker.bind(this));
        this.initContainer();
        this.layer = mw.UILayerDialog;
    }

    /** 设置成就信息 */
    private async setAchieveInfo() {
        // 活跃点数
        const data = await ModuleService.getModule(AchieveModuleC).getAchieveData(this.userId);
        if (!data) { return; }
        this.txt_achievement.text = `成就点数：${data.points}`;
        this.text_achieveMiniTip.text = data.finishedArr.length === 0 ? "Ta暂时还没有解锁成就哦" : "";
        this.achieveContainer.clear();
        data.finishedArr.sort((a, b) => { return AchieveService.getAchieveCfg(b).rarity - AchieveService.getAchieveCfg(a).rarity }).forEach(v => {
            const node = this.achieveContainer.addNode();
            node.setData(data, v);
        });
    }

    private onAddFriendClick() {
        UIService.show(AddFriendHud, this.userId, this.idCardData.baseInfo.n);
    }

    private enterEditMode() {
        this.inputBox_sign.focus();
    }

    private onSignCommitted() {
        if (!this.isSelfIDCard) { return; }
        let newSignTxt = this.inputBox_sign.text;
        StringUtil.maskWordCheck(newSignTxt).then((result) => {
            if (result.result) {
                this.selfModule.reqSetData(this.userId, [IDCardDataType.SignTxt], [this.inputBox_sign.text]);
                Tips.show(LanUtil.getText("Code_028"));
            }
            else {
                Tips.show(LanUtil.getText("Code_029"));
            }
        });
    }

    private onReportFaker() {
        this.hide();
        if (!Player.getPlayer(this.userId)) {
            Tips.show("举报失败，这个玩家不在线！");
            return;
        }
        ModuleService.getModule(FakerModuleC).reportFaker(this.isFaker ? this.gameObjectId : Player.getPlayer(this.userId).character.gameObjectId);
    }

    /** 当前名片的玩家id */
    private userId: string;

    private idCardData: IDCardData;

    /** 是否是伪人 */
    private isFaker: boolean = false;

    /** 错误类型数据 */
    private errorTypeArr: FakerErrorInfoType[] = [];

    private gameObjectId: string;

    protected async onShow(userId: string, isFaker: boolean, gameObjectId?: string) {
        if (!userId) { return; }

        UIAniUtil.popUp(this.contentCanvas);

        this.userId = userId;
        this.gameObjectId = gameObjectId
        // 伪人
        this.isFaker = isFaker;
        if (this.isFaker) {
            this.errorTypeArr = FakerIDCardHelper.instance.getErrorType(this.userId);
        } else {
            this.errorTypeArr = [];
        }

        this.hideLikeAndGiftCanvas();
        this.updateIDCardInfo(await IDCardDefine.reqIDCardData(userId), isFaker);

        if (isFaker) {
            GhostTraceHelper.uploadMGS("ts_action_ride_rocket", "打开名片UI_别人的", { rocket_ride_other: 998 });
        } else {
            if (this.isSelfIDCard) {
                GhostTraceHelper.uploadMGS("ts_item_tips", "打开名片UI_自己的", { item_id: 0 });
            } else {
                GhostTraceHelper.uploadMGS("ts_item_tips", "打开名片UI_别人的", { item_id: 1 });
            }
        }

        // 设置玩家头像
        this.setCurHeadFrame();

        // 通关信息
        this.updateRouteDataInfo();

        // 在这儿关
        this.canvas_achieveMini.visibility = SlateVisibility.Collapsed;
    }

    /** 当前使用的头像框id */
    private curUsedFrameId: number = 1;

    public async setCurHeadFrame() {
        const headFrameId = await ModuleService.getModule(IDCardModuleC).getCurHeadFrame(this.userId);
        this.curUsedFrameId = headFrameId;
        // 使用默认头像框
        if (headFrameId === 1) {
            this.img_head_1.visibility = SlateVisibility.Collapsed;
            return;
        }
        const headCfg = GameConfig.AvatarFrame.getElement(headFrameId);
        const itemCfg = GameConfig.Item.getElement(headCfg?.itemId);
        if (!itemCfg || !headCfg) {
            console.error(`DEBUG MyTypeError>>> 设置玩家当前头像失败${Player.localPlayer.userId}`);
            this.img_head_1.visibility = SlateVisibility.Collapsed;
            return;
        }
        this.img_head_1.visibility = SlateVisibility.SelfHitTestInvisible;
        this.img_head_1.imageGuid = itemCfg.icon;
    }

    public hide() {
        UIService.hideUI(this);
        // UIAniUtil.popDown(this.contentCanvas, 500, () => { UIService.hideUI(this); });
    }

    protected onHide() {
        this.userId = null;
        this.idCardData = null;
        this.levelContainer.clear();
        UIService.hide(GameRecordPanel);
        UIAniUtil.popDown(this.contentCanvas);

    }

    private get isSelfIDCard() {
        return !this.isFaker && this.userId === Player.localPlayer.userId;
    }

    private hideLikeAndGiftCanvas() {
        this.canvas_like.visibility = SlateVisibility.Collapsed;
        this.canvas_sendgift.visibility = SlateVisibility.Collapsed;
        this.canvas_giftItems.visibility = SlateVisibility.Collapsed;
    }

    public async updateIDCardInfo(data: IDCardData, isFaker: boolean = false) {
        // 当前是伪人界面就不局部刷新了
        if (!isFaker && this.isFaker) {
            return;
        }
        this.idCardData = data;
        // 自己无法改变人的个性签名
        if (this.isSelfIDCard) {
            this.canvas_report.visibility = SlateVisibility.Collapsed;
            this.stalebtn_chage.visibility = SlateVisibility.Collapsed;
            this.stalebtnedit.visibility = SlateVisibility.Collapsed;
            this.stalebtn_BeFriend.visibility = SlateVisibility.Collapsed;
            this.btn_taAchievement.visibility = SlateVisibility.Collapsed;
            this.btn_myAchievement.visibility = SlateVisibility.Visible;
            this.stalebtn_chage.visibility = SlateVisibility.Visible;
            this.inputBox_sign.enable = true;
            this.inputBox_love.enable = false;
            this.inputBox_sign.hintString = GameConfig.SubLanguage.UI_Sign.Value;
            this.text_achieveMini.text = "我的成就";
            this.initRecentLikeContainer();
            this.initRecentGitContainer();
        } else {
            this.canvas_report.visibility = SlateVisibility.SelfHitTestInvisible;
            this.stalebtn_chage.visibility = SlateVisibility.Collapsed;
            this.stalebtn_chage.visibility = SlateVisibility.Collapsed;
            this.stalebtn_BeFriend.visibility = SlateVisibility.Collapsed;
            this.stalebtnedit.visibility = SlateVisibility.Collapsed;
            this.btn_taAchievement.visibility = SlateVisibility.Visible;
            this.btn_myAchievement.visibility = SlateVisibility.Collapsed;
            this.inputBox_sign.enable = false;
            this.inputBox_sign.hintString = "";
            this.text_achieveMini.text = "ta的成就";
            if (this.isFaker) {
                this.stalebtn_BeFriend.text = LanUtil.getText("Code_030");
                this.stalebtn_BeFriend.enable = false;
            } else {
                AccountService.isFriend((isSuccess: boolean, jsonData: string) => {
                    if (jsonData.includes("false")) {
                        this.stalebtn_BeFriend.visibility = SlateVisibility.Visible;
                        this.stalebtn_BeFriend.text = LanUtil.getText("UI_addfriends");
                        this.stalebtn_BeFriend.enable = true;
                    } else if (jsonData.includes("true")) {
                        this.stalebtn_BeFriend.visibility = SlateVisibility.Visible;
                        this.stalebtn_BeFriend.text = LanUtil.getText("Code_030");
                        this.stalebtn_BeFriend.enable = false;
                    }
                }, this.userId);
            }
        }

        // 基本信息
        this.txt_cardname.text = StringUtil.format(LanUtil.getText("Code_031"), this.idCardData.baseInfo.n);
        if (SystemUtil.isPIE) {
            this.img_head.imageGuid = this.idCardData.baseInfo.u;
        } else {
            this.img_head["imageInfo"]["asyncSetByUrl"](this.idCardData.baseInfo.u);
        }
        if (this.idCardData.baseInfo.s === 0) {
            this.img_girl.visibility = SlateVisibility.SelfHitTestInvisible;
            this.img_boy.visibility = SlateVisibility.Collapsed;
        } else {
            this.img_girl.visibility = SlateVisibility.Collapsed;
            this.img_boy.visibility = SlateVisibility.SelfHitTestInvisible;
        }

        if (this.errorTypeArr.includes(FakerErrorInfoType.Id)) {
            this.txt_ID.text = LanUtil.getText("Code_034") + "：" + this.getErrorID(this.userId);
        } else {
            this.txt_ID.text = LanUtil.getText("Code_034") + "：" + this.idCardData.baseInfo.id;
        }

        // 如果正在输入，就不用更新了
        if (!this.inputBox_sign.isHovered) {
            this.inputBox_sign.text = this.idCardData.signTxt;
            // 别人看到自己的卡是空时显示内容
            if (!this.isSelfIDCard && StringUtil.isEmpty(this.idCardData.signTxt)) {
                this.inputBox_sign.text = LanUtil.getText("UI_nosign");
            }
        }
        this.inputBox_love.text = LanUtil.getText("Code_035");
        this.txt_goodnum.text = this.idCardData.beLikedCount + "";
        this.txt_giftnum.text = IDCardDefine.getAllGiftCount(this.idCardData) + "";

        // 礼物信息
        this.giftContainer.nodes.forEach(node => {
            node.setCount(this.idCardData.giftInfoList.find(v => { return node["cfgId"] === v.gId })?.c);
        });

        // 送礼
        // const allSpecialItem = await RouteDefine.getSpecialItemDataList(this.userId);
        // this.sendGiftContainer.nodes.forEach((nodes) => {
        //     const itemData = allSpecialItem.find(v => { return v.cfgId === nodes["cfg"].itemId });
        //     nodes.setData(itemData ? itemData.count : 0, isFaker);
        // })

        // 魅力值
        this.setCharmValue();

        // 更新卡片上伪人信息
        this.updateFakerInfo();

        // 设置成就信息
        this.setAchieveInfo();
    }

    private readonly likeIcon = "159410";

    private readonly giftIcon = "159373";

    private generateRandomString(length: number): string {
        let randomString = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    /** key: userId value: 随机id */
    private errorIdMap: Map<string, string> = new Map();

    /** 获取错误的玩家id */
    private getErrorID(userId: string) {
        let fakerId = this.errorIdMap.get(userId);
        if (!fakerId) {
            fakerId = this.generateRandomString(userId.toString().length);
            this.errorIdMap.set(userId, fakerId);
            setTimeout(() => {
                this.errorIdMap.delete(userId);
            }, recycleTime);
        }
        return fakerId;
    }

    /** key: userId value: 随机id */
    private errorIconMap: Map<string, string[]> = new Map();

    /** 获取错误的玩家id */
    private getErrorIcon(userId: string) {
        let iconArr = this.errorIconMap.get(userId);
        if (!iconArr) {
            let iconArr = [];
            let fakerIconArr = GameConfig.SubGlobal.fakerIcon.stringList;
            iconArr.push(fakerIconArr[MathUtil.randomInt(0, fakerIconArr.length)]);
            iconArr.push(fakerIconArr[MathUtil.randomInt(0, fakerIconArr.length)]);
            this.errorIconMap.set(userId, iconArr);
            setTimeout(() => {
                this.errorIconMap.delete(userId);
            }, recycleTime);
        }
        return iconArr;
    }

    /** 更新伪人信息 */
    private updateFakerInfo() {

        if (this.errorTypeArr.includes(FakerErrorInfoType.NoBadge)) {
            this.img_safe.visibility = SlateVisibility.Collapsed;
        } else {
            this.img_safe.visibility = SlateVisibility.SelfHitTestInvisible;
        }

        if (this.errorTypeArr.includes(FakerErrorInfoType.Icon)) {
            const iconArr = this.getErrorIcon(this.userId);
            this.img_good.imageGuid = iconArr[0];
            this.img_gift.imageGuid = iconArr[1];
        } else {
            this.img_good.imageGuid = this.likeIcon;
            this.img_gift.imageGuid = this.giftIcon;
        }

        if (this.errorTypeArr.includes(FakerErrorInfoType.InfoEmpty)) {
            this.txt_gender.visibility = SlateVisibility.Collapsed;
            this.txt_name.visibility = SlateVisibility.Collapsed;
            this.txt_ID.visibility = SlateVisibility.Collapsed;
            this.txt_level.visibility = SlateVisibility.Collapsed;
        } else {
            this.txt_gender.visibility = SlateVisibility.SelfHitTestInvisible;
            this.txt_name.visibility = SlateVisibility.SelfHitTestInvisible;
            this.txt_ID.visibility = SlateVisibility.SelfHitTestInvisible;
            this.txt_level.visibility = SlateVisibility.SelfHitTestInvisible;
        }

        if (this.errorTypeArr.includes(FakerErrorInfoType.SexAndNameReplace)) {
            this.txt_name.text = LanUtil.getText("Code_033") + "：";
            this.txt_gender.text = LanUtil.getText("Code_032") + "：" + this.idCardData.baseInfo.n;
        } else {
            this.txt_name.text = LanUtil.getText("Code_032") + "：" + this.idCardData.baseInfo.n;
            this.txt_gender.text = LanUtil.getText("Code_033") + "：";
        }
    }

    /** 人气等级到下一级所需经验 */
    private nextCharmLevelDis: number = 0;

    /** 计算鬼魅值 */
    private setCharmValue() {
        this.txt_popuEP.text = LanUtil.getText("Code_036") + "：" + this.idCardData.charmVal;
        const curLevelCfg = GameConfig.PopularExp.getAllElement().find(v => { return this.idCardData.charmVal >= v.charmVal });
        const curLevel = curLevelCfg ? curLevelCfg.level : 0;
        // 下一等级的配置，有可能拿不到，记得处理
        const nextLevelCfg = GameConfig.PopularExp.getElement(curLevel + 1);
        this.nextCharmLevelDis = nextLevelCfg ? nextLevelCfg.charmVal - this.idCardData.charmVal : -1;
        this.txt_populevel.text = LanUtil.getText("Code_037") + "：" + (curLevel) + LanUtil.getText("Code_038");
    }

    private async updateRouteDataInfo() {
        const allGameRouteDataList = (await ModuleService.getModule(RouteModuleC).reqAllGameRouteData(this.userId))
        const exp = allGameRouteDataList.map(v => { return v.totalExp }).reduce((v1, v2) => { return v1 + v2 }, 0);
        this.setPlayerValue(Math.floor(exp));
        const newArr = allGameRouteDataList.filter(v => { return v.gameTheme != EGameTheme.Hall }).sort((v1, v2) => { return v2.totalGameTime - v1.totalGameTime });
        this.gameThemeInfoContainer.nodes.forEach((v, id) => {
            v.setData(newArr[id]);
        });
    }

    /** 人气等级到下一级所需经验 */
    private nextPlayerLevelDis: number = 0;

    /** key: userId value: 随机id */
    private errorLevelMap: Map<string, number> = new Map();

    /** 获取错误的玩家id */
    private getErrorLevel(userId: string) {
        let level = this.errorLevelMap.get(userId);
        if (!this.errorLevelMap.has(userId)) {
            level = MathUtil.randomInt(1, 100);
            this.errorLevelMap.set(userId, level);
            setTimeout(() => {
                this.errorLevelMap.delete(userId);
            }, recycleTime);
        }
        return level;
    }

    /** 等级UI显示 */
    protected readonly levelRankUI: string[] = ["210940", "210975", "210939", "210938"];

    private readonly wrongLevelColor: LinearColor = LinearColor.colorHexToLinearColor("7BFFFAFF");

    private readonly correctLevelColor: LinearColor = LinearColor.colorHexToLinearColor("FFFFFFFF");

    // 最大等级
    private _maxLevel: number;

    private get maxLevel() {
        if (!this._maxLevel) { this._maxLevel = GameConfig.PlayerExp.getAllElement().length; }
        return this._maxLevel;
    }

    /** 计算鬼魅值 */
    private setPlayerValue(exp: number) {
        const curLevelCfg = GameConfig.PlayerExp.getAllElement().find(v => { return exp >= v.val });
        let curLevel = curLevelCfg ? curLevelCfg.level : 0;
        // 下一等级的配置，有可能拿不到，记得处理
        const nextLevelCfg = GameConfig.PlayerExp.getElement(curLevel + 1);
        this.txt_EP.text = `${LanUtil.getText("Code_039")}：${exp}/${nextLevelCfg ? nextLevelCfg.val : curLevelCfg.val}`; // "经验" + "：" + exp;
        if (this.errorTypeArr.includes(FakerErrorInfoType.Level)) {
            curLevel = this.getErrorLevel(this.userId);
        }
        if (curLevel === 0) {
            this.txt_level.text = LanUtil.getText("Code_040") + "：" + curLevel + LanUtil.getText("Code_038");
        } else {
            this.txt_level.text = LanUtil.getText("Code_040") + "：";
            this.convertLevelToSymbols(curLevel);
        }
        this.nextPlayerLevelDis = nextLevelCfg ? nextLevelCfg.val - exp : -1;
    }

    /**
     * 将等级转换成符号
     * @param level 等级
     * @returns 
     */
    private convertLevelToSymbols(level: number) {
        const stars = Math.floor(level % 4);
        const moons = Math.floor((level / 4) % 4);
        const suns = Math.floor((level / 16) % 4);
        const crowns = Math.floor(level / 64);
        for (let i = 0; i < crowns; i++) {
            this.addLevelNode(this.levelRankUI[3], level);
        }

        for (let i = 0; i < suns; i++) {
            this.addLevelNode(this.levelRankUI[2], level);
        }

        for (let i = 0; i < moons; i++) {
            this.addLevelNode(this.levelRankUI[1], level);
        }

        for (let i = 0; i < stars; i++) {
            this.addLevelNode(this.levelRankUI[0], level);
        }
    }

    private addLevelNode(imgGuid: string, level: number) {
        const node = this.levelContainer.addNode();
        if (this.errorTypeArr.includes(FakerErrorInfoType.Level)) {
            node.imgBtn.normalImageColor = this.wrongLevelColor;
        } else {
            node.imgBtn.normalImageColor = this.correctLevelColor;
        }
        node.imgBtn.normalImageGuid = imgGuid;
        node.imgBtn.onClicked.clear();
        node.imgBtn.onClicked.add(() => { Tips.show(`${level}级`); });
    }

    private get selfModule() {
        return ModuleService.getModule(IDCardModuleC);
    }

    private initRecentLikeContainer() {
        this.recentLikeContainer.clear();
        for (let index = this.idCardData.recentLikeInfoList.length - 1; index >= 0; index--) {
            const recentLikeInfo = this.idCardData.recentLikeInfoList[index];
            this.recentLikeContainer.addNode().setData(recentLikeInfo);
        }
    }

    private initRecentGitContainer() {
        this.recentGiftContainer.clear();
        for (let index = this.idCardData.recentGiftInfoList.length - 1; index >= 0; index--) {
            const recentGiftInfo = this.idCardData.recentGiftInfoList[index];
            this.recentGiftContainer.addNode().setData(recentGiftInfo);
        }
    }

    private onLikeClick() {
        if (this.isSelfIDCard) {
            this.canvas_like.visibility = this.canvas_like.visible ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
            this.canvas_sendgift.visibility = SlateVisibility.Collapsed;
        } else {
            this.selfModule.reqLike(this.userId, this.isFaker);
        }
    }

    private onGiftClick() {
        if (this.isSelfIDCard) {
            this.canvas_sendgift.visibility = this.canvas_sendgift.visible ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
            this.canvas_like.visibility = SlateVisibility.Collapsed;
        } else {
            // this.canvas_giftItems.visibility = this.canvas_giftItems.visible ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
            // 这样会循环引用
            // UIService.show(NewGiftPanel, this.idCardData.baseInfo);
            Event.dispatchToLocal("ShowNewGiftPanel", this.idCardData.baseInfo);
            this.giftItemScrollbox.scrollToStart();
        }
    }

    /** 经验值的问号 */
    private onMoreClick() {
        if (this.nextPlayerLevelDis < 0) {
            Tips.show("当前已是最高等级");
        } else {
            Tips.show(StringUtil.format(GameConfig.SubLanguage.UI_EXPtips.Value, this.nextPlayerLevelDis));
        }
    }

    /** 鬼魅值的问号 */
    private onPexpClick() {
        if (this.nextCharmLevelDis < 0) {
            Tips.show("当前已是最高等级");
        } else {
            Tips.show(StringUtil.format(GameConfig.SubLanguage.UI_PopularExp.Value, this.nextCharmLevelDis));
        }
    }

    /** 等级 */
    private levelContainer: GridContainer<LevelItem_Generate>;
    /** 点赞 */
    private recentLikeContainer: GridSelectContainer<RecentLikeInfoItem>;
    /** 礼物墙 */
    private giftContainer: GridSelectContainer<GiftItem>;
    /** 游戏记录 */
    private gameThemeInfoContainer: GridSelectContainer<GameThemeItem>;
    /** 送礼 */
    // private sendGiftContainer: GridSelectContainer<GiftSendItem>;
    /** 最近收礼 */
    private recentGiftContainer: GridSelectContainer<RecentGiftInfoItem>;
    /** 他人成就 */
    private achieveContainer: GridContainer<AchieveMiniItem>;

    private initContainer() {
        // 等级
        this.levelCanvas.removeAllChildren();
        this.levelContainer = new GridContainer(this.levelCanvas, LevelItem_Generate);
        this.levelContainer.clear();

        // 所有礼物展示
        this.canvas_gift.removeAllChildren();
        this.giftContainer = new GridSelectContainer(this.canvas_gift, GiftItem);
        GameConfig.Gift.getAllElement().forEach(v => {
            let node = this.giftContainer.addNode();
            node.init(v.id, v.imageGuid);
        });

        // 游戏记录
        this.canvas_record.removeAllChildren();
        this.gameThemeInfoContainer = new GridSelectContainer(this.canvas_record, GameThemeItem);
        GameThemeRecordList.forEach(v => {
            this.gameThemeInfoContainer.addNode();
        })

        // 最近被点赞
        this.canvas_likeName.removeAllChildren();
        this.recentLikeContainer = new GridSelectContainer(this.canvas_likeName, RecentLikeInfoItem);

        // 最近的收礼
        this.recentGiftContainer = new GridSelectContainer(this.canvas_giftName, RecentGiftInfoItem);

        // 礼物列表
        // this.sendGiftContainer = new GridSelectContainer(this.canvas_giftItem, GiftSendItem);
        // GameConfig.Gift.getAllElement().forEach((v) => {
        //     this.sendGiftContainer.addNode().init(v);
        // });

        // 他人成就
        this.achieveContainer = new GridContainer(this.canvas_achieveMiniFr, AchieveMiniItem);
    }
}