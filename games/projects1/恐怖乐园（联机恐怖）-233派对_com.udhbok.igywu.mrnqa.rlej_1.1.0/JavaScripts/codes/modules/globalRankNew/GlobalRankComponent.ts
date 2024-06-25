/*
 * @Author       : dal
 * @Date         : 2024-05-24 16:50:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-03 18:08:19
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\GlobalRankComponent.ts
 * @Description  : 
 */

import { LogService } from "../../ui/utils/LogPanel";
import { WaitLoop } from "../../utils/AsyncTool";
import { BaseInfo } from "../idcard/IDCardConst";
import HandTriggerCom from "../inter/HandTriggerCom";
import { InterEvtData } from "../inter/ObjInterDefine";
import { EBaseRankDataType, NewRankDefine } from "./NewRankDefine";
import { NewGiftPanel } from "./ui/NewGiftPanel";
import { newRankPanelMgrIns } from "./ui/NewRankPanelMgr";

@Serializable
class RankChaInfo {

    /** 第一的形象 */
    @mw.Property({ displayName: "第一", capture: true })
    firstGuid: string = "";

    /** 第二的形象 */
    @mw.Property({ displayName: "第二", capture: true })
    secondGuid: string = "";

    /** 第三的形象 */
    @mw.Property({ displayName: "第三", capture: true })
    thirdGuid: string = "";

    firstCha: Character;

    secondCha: Character;

    thirdCha: Character;

    private globalRankComponent: GlobalRankComponent;

    async init(globalRankComponent: GlobalRankComponent) {
        this.globalRankComponent = globalRankComponent;
        LogService.addClientLog(`开始初始化排行榜角色形象${this.firstGuid} - ${this.secondGuid} - ${this.thirdGuid}`);
        if (!this.firstGuid || !this.secondGuid || !this.thirdGuid) {
            LogService.addClientLog(`排行榜角色形象初始化失败${this.firstGuid} - ${this.secondGuid} - ${this.thirdGuid}`);
            return;
        }
        this.firstCha = await GameObject.asyncFindGameObjectById(this.firstGuid) as Character;
        // this.firstCha["initPos"] = this.firstCha.worldTransform.position.clone();
        this.secondCha = await GameObject.asyncFindGameObjectById(this.secondGuid) as Character;
        // this.secondCha["initPos"] = this.secondCha.worldTransform.position.clone();
        this.thirdCha = await GameObject.asyncFindGameObjectById(this.thirdGuid) as Character;
        // this.thirdCha["initPos"] = this.thirdCha.worldTransform.position.clone();
        this.addComponent(this.firstCha);
        this.addComponent(this.secondCha);
        this.addComponent(this.thirdCha);
        LogService.addClientLog(`排行榜角色形象初始化成功`);
    }

    private async addComponent(cha: Character) {
        // 先绑定一个触发器
        // cha["trigger"] = await GameObject.asyncSpawn("Trigger");
        // cha["trigger"].parent = cha;
        // cha["trigger"].localTransform.position = Vector.zero;
        // cha["trigger"].localTransform.scale = Vector.one;
        // cha["trigger"].name = "trigger";
        cha["trigger"] = cha.getChildByName("trigger");
        // 再绑定组件
        let handTrigger = cha.addComponent(HandTriggerCom);
        let inter = new InterEvtData();
        inter.evtName = "evt_showRankGiftPanel";
        inter.params[0] = this.globalRankComponent.type;
        handTrigger.evtDataArr.push(inter);
    }

    public setShareRole(chaKey: string, baseInfo: BaseInfo) {
        if (!this[chaKey]) {
            if (this[chaKey]["trigger"]) this[chaKey]["trigger"].enabled = false;
            return;
        }
        let thisCha: Character = (this[chaKey] as Character);
        if (!baseInfo) {
            if (this[chaKey]["trigger"]) this[chaKey]["trigger"].enabled = false;
            thisCha.setVisibility(PropertyStatus.Off);
        } else {
            if (this[chaKey]["trigger"]) this[chaKey]["trigger"].enabled = true;
            thisCha.setVisibility(PropertyStatus.On);
            !SystemUtil.isPIE && AccountService.applySharedId(thisCha, baseInfo.si, () => { });
            thisCha.displayName = baseInfo.n;
            thisCha["baseInfo"] = baseInfo;
        }
        // if (thisCha["initPos"]) { thisCha.worldTransform.position = thisCha["initPos"]; }
    }
}

export let globalRankComponentMap: Map<EBaseRankDataType, GlobalRankComponent> = new Map();

@Component
export default class GlobalRankComponent extends mw.Script {

    @mw.Property({ group: "全局设置", displayName: "排行榜类型", selectOptions: EBaseRankDataType })
    public type: EBaseRankDataType = EBaseRankDataType.PlayerLevel;

    @mw.Property()
    public rankChaInfo: RankChaInfo = new RankChaInfo();

    protected onStart(): void {
        LogService.addClientLog(`初始化排行榜${this.type}`);
        WaitLoop.loop(() => { return this.gameObject }).then((uiObj: UIWidget) => {
            globalRankComponentMap.set(this.type, this);
            NewRankDefine.viewRole(this.type) && this.rankChaInfo.init(this);
            uiObj.setTargetUIWidget(newRankPanelMgrIns.getPanel(this.type, true).uiWidgetBase);
            uiObj.interaction = true;
        });

        Event.addLocalListener("evt_showRankGiftPanel", (gameObjectId: string, type: EBaseRankDataType) => {
            if (this.type === type) {
                // UIService.showUI(newRankPanelMgrIns.getPanel(this.type));
                UIService.show(NewGiftPanel, GameObject.findGameObjectById(gameObjectId)["baseInfo"], this.type);
            }
        });

        Event.addLocalListener("evt_refreshNewRankPanel", (type: EBaseRankDataType) => {
            if (this.type === type) {
                newRankPanelMgrIns.getPanel(this.type, true).refresh();
            }
        });
    }

    /** 设置分享的形象 */
    public setShareRole(baseInfo: BaseInfo[]) {
        if (!NewRankDefine.viewRole(this.type)) { return; }
        this.rankChaInfo.setShareRole("firstCha", baseInfo[0]);
        this.rankChaInfo.setShareRole("secondCha", baseInfo[1]);
        this.rankChaInfo.setShareRole("thirdCha", baseInfo[2]);
    }
}