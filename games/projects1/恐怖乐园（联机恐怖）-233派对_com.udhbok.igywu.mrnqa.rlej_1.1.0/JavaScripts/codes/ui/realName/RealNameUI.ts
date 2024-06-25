/*
 * @Author       : zhenzhuo.wang zhenzhuo.wang@appshahe.com
 * @Date         : 2024-05-28 14:49:17
 * @LastEditors: zhenzhuo.wang zhenzhuo.wang@appshahe.com
 * @LastEditTime: 2024-05-30 22:39:15
 * @FilePath     : \fantastic-city\JavaScripts\modules\common\RealNameUI.ts
 * @Description  :
 */

import { GameConfig } from "../../../config/GameConfig";
import RealNameUI_Generate from "../../../ui-generate/ShareUI/common/RealNameUI_generate";
import realName_item_Generate from "../../../ui-generate/ShareUI/common/realName_item_generate";
import { UIUtils } from "../../modules/cameraCG/utils/UIUtils";
import { RealNameData } from "../../modules/realName/RealNameData";
import { RealNameModuleC } from "../../modules/realName/RealNameModule";
import RecordData from "../../modules/record/RecordData";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";

const useRealName: boolean = SystemUtil.isPIE ? false : true;

/**
 * 实名认证触发的条件类型
 */
export enum RealNameConditionType {
    /** 游戏开始 */
    GameStart = 1,
    /** 时长达到30分钟触发 */
    GameTimeAct = 2,
    /** 开始新手引导 */
    GuideStart = 3,
    /** 捡取恐惧币 */
    PickCoin = 4,
    /** 购物发生的时候 */
    IAP = 5
}

/**
 * 实名认证工具
 */
export class RealNameTool {
    private static _instance: RealNameTool;
    public static get instance(): RealNameTool {
        if (!this._instance) {
            this._instance = new RealNameTool();
        }
        return this._instance;
    }

    private _type: RealNameConditionType = RealNameConditionType.GameStart;

    public get type() {
        return this._type;
    }

    /** 默认是未实名状态PIE用 */
    private _realNameStatePIE: RealNameVerifyExtend.VerificationStatus = RealNameVerifyExtend.VerificationStatus.UnVerified;
    /** 手机上使用 */
    private _realNameStateMobile: RealNameVerifyExtend.VerificationStatus = null;
    /* 实名认证的配置，如果值为空，则不处于实名认证过程中 */
    private _isInVerify: boolean = false;
    /** 检测定时器 */
    private _checkInterval: any;

    private _isChekedTIme: boolean = false;

    public constructor() {
        DataCenterC.ready().then(() => {
            const data = DataCenterC.getData(RecordData);
            const time = 30 * 60
            if (data) {
                data.onDataChange.add(() => {
                    if (this._isChekedTIme) {
                        return;
                    }
                    if (data.baseRecordInfo.totalOnlineTimesLength <= time) {
                        return;
                    }
                    this._isChekedTIme = true;
                    this.checkRealName(RealNameConditionType.GameTimeAct);
                })
                if (data.baseRecordInfo.totalOnlineTimesLength >= time) {
                    this._isChekedTIme = true;
                    this.checkRealName(RealNameConditionType.GameTimeAct);
                }
            }
        })
    }

    /**
     * 检测实名认证，外部调用
     * @param type 实名认证触发的条件类型
     * @returns 是否已经实名
     */
    public checkRealName(type: RealNameConditionType): boolean {
        if (!useRealName) return true;
        if (SystemUtil.isPIE) {
            const data = DataCenterC.getData(RealNameData);
            if (data.isget) {
                return true;
            }
        }
        this._type = type;
        if (SystemUtil.isPIE) {
            return this.dealRealNameState(this._realNameStatePIE);
        }
        else {
            if (!this._realNameStateMobile) {
                let res = RealNameVerifyExtend.RealNameVerifyService.getVerificationStatus();
                res.then((value) => {
                    this._realNameStateMobile = value;
                    this.dealRealNameState(value);
                }, (value) => {
                    // 超时，当作实名成年处理
                    this._realNameStateMobile = RealNameVerifyExtend.VerificationStatus.VerifiedAdult;
                    // Tips.show("----超时", 5)
                });
                return false;
            }
            else {
                return this.dealRealNameState(this._realNameStateMobile);
            }
        }
    }

    /**
     * 获取实名认证状态成功，处理实名认证状态
     * @param value
     * @returns 是否已经是成年实名
     */
    private dealRealNameState(value: RealNameVerifyExtend.VerificationStatus): boolean {
        if (!this._type) return true;
        // 实名成年，不处理
        if (value == RealNameVerifyExtend.VerificationStatus.VerifiedAdult) return true;
        // 未实名，弹出游戏内UI
        else if (value == RealNameVerifyExtend.VerificationStatus.UnVerified) {
            this.tryShowRealNameUI(this._type);
        }
        // 实名未成年，弹出【未成年拦截弹窗】
        else if (value == RealNameVerifyExtend.VerificationStatus.VerifiedMinor) {
            GhostTraceHelper.uploadMGS("ts_page", "触发未成年拦截弹窗", {
                page_name: "youngGuys"
            })
            RealNameVerifyExtend.RealNameVerifyService.promoteRealNameVerify();
        }
        return false;
    }

    /**
     * 展示实名认证界面
     * @param type 实名认证触发的条件类型
     */
    private tryShowRealNameUI(type: RealNameConditionType): void {
        // 时长特殊处理，需要判断时长是否满足条件
        if (type == RealNameConditionType.GameTimeAct) {
            UIService.getUI(RealNameUI).showUI(GameConfig.SubGlobal.RealNameItems.numberList, true)
        }
        else {
            UIService.getUI(RealNameUI).showUI(GameConfig.SubGlobal.RealNameItems.numberList, false)
        }
    }

    /**
     * 尝试实名认证，UI调用
     * 1. PIE环境直接认证通过，且是成年
     * 2. 非PIE环境，调用实名认证服务
     */
    public tryRealNameVerify(): void {
        this._isInVerify = true;
        if (SystemUtil.isPIE) {
            setTimeout(() => {
                this._realNameStatePIE = RealNameVerifyExtend.VerificationStatus.VerifiedAdult;;
            }, 1000);
        }
        else {
            RealNameVerifyExtend.RealNameVerifyService.promoteRealNameVerify();
        }
        this.startIntervalCheck();
    }

    /**
     * 开启检测实名认证结果的定时器
     */
    private startIntervalCheck(): void {
        if (this._checkInterval) return;
        this._checkInterval = TimeUtil.setInterval(() => {
            this.checkRealNameResult();
        }, 1);
    }

    /**
     * 清理检测实名认证结果的定时器
     * @returns
     */
    private clearCheckInterval(): void {
        if (!this._checkInterval) return;
        TimeUtil.clearInterval(this._checkInterval);
        this._checkInterval = null;
    }

    /**
     * 检测实名认证结果，发放奖励
     */
    private checkRealNameResult(): void {
        if (!this._isInVerify) return;
        if (SystemUtil.isPIE) {
            this.trySendRealNameReward(this._isInVerify, this._realNameStatePIE);
        }
        else {
            let res = RealNameVerifyExtend.RealNameVerifyService.getVerificationStatus();
            res.then((value) => {
                this._realNameStateMobile = value;
                this.trySendRealNameReward(this._isInVerify, value);
            }, (value) => {

            });
        }
    }

    /**
     * 尝试发放奖励
     * @param cfg
     * @param state
     */
    private trySendRealNameReward(isVerify: boolean, state: RealNameVerifyExtend.VerificationStatus): void {
        if (!isVerify) {
            return;
        }
        if (state == RealNameVerifyExtend.VerificationStatus.UnVerified) {
            // Tips.show(GameConfig.Language.RealName_text_7.Value);
            return;
        }
        Tips.show(LanUtil.getText("RealName_text_6"));
        UIService.hide(RealNameUI);

        ModuleService.getModule(RealNameModuleC).reqGetReward();
        GhostTraceHelper.uploadMGS("ts_page", "实名认证成功获得奖励", {
            page_name: `realName_goods_`
        })

        this.clearCheckInterval();

        // 未成年验证
        if (state == RealNameVerifyExtend.VerificationStatus.VerifiedMinor) {
            RealNameVerifyExtend.RealNameVerifyService.promoteRealNameVerify();
        }
    }
}


/**
 * 实名认证界面
 */
class RealNameUI extends RealNameUI_Generate {
    /** 奖品物体 */
    private _rewardItems: RealNameItem[] = [];

    protected onAwake(): void {
        super.onAwake();
        this.layer = UILayerSystem;
        this.mBtn_Close.onClicked.add(() => {
            UIService.hideUI(this);
        });
        this.mBtn_Exit.onClicked.add(() => {
            Event.dispatchToServer("C2S_KickPlayer");
        });
        // 监听引擎状态
        this.mBtn_Sure.onClicked.add(() => {
            this.mBtn_Sure.enable = false;
            RealNameTool.instance.tryRealNameVerify();
        });
    }

    /**
     * 显示实名认证界面
     * @param cfg realName表的配置
     * @param isLast 是否是最后一个
     */
    public showUI(rewards: number[][], isLast: boolean): void {
        if (!rewards) {
            UIService.hideUI(this);
            return;
        }
        GhostTraceHelper.uploadMGS("ts_page", "触发未成年拦截弹窗", {
            page_name: `realName_${RealNameTool.instance.type}`
        })
        UIUtils.setUIVibility(this.mBtn_Close, !isLast, true);
        UIUtils.setUIVibility(this.mBtn_Exit, isLast, true);
        UIUtils.setUIVibility(this.mTxt_Tip, isLast);
        this.mBtn_Sure.enable = true;
        this.hideAllRewardItems();
        this.setRewardItems(rewards);
        UIService.showUI(this, this.layer);
    }

    private setRewardItems(items: number[][]): void {
        let rewards = items;
        if (!rewards || rewards.length <= 0) return;
        let length = rewards.length;
        let itemLength = this._rewardItems.length;
        for (let i = 0; i < length; i++) {
            let info = rewards[i];
            if (!info || info.length != 2) continue;
            let comCfg = GameConfig.SubItem.getElement(info[0]);
            if (!comCfg) continue;
            let item: RealNameItem = null;
            if (i < itemLength) {
                item = this._rewardItems[i];
            }
            if (!item) {
                item = UIService.create(RealNameItem);
                this.mCanvas_item.addChild(item.uiObject);
                this._rewardItems.push(item);
            }
            item.setVisible(true);
            item.init(comCfg.icon, comCfg.name, info[1]);
        }
    }

    private hideAllRewardItems(): void {
        this._rewardItems.forEach((item) => {
            item.setVisible(false);
        });
    }
}

class RealNameItem extends realName_item_Generate {
    /**
     * 初始化物品icon和名字
     */
    public init(icon: string, name: string, num: number) {
        this.text_num.text = num.toString();
        UIUtils.setUIVibility(this.text_num, num > 1);
        this.text_name.text = name;
        this.image_icon.imageGuid = icon;
    }
}