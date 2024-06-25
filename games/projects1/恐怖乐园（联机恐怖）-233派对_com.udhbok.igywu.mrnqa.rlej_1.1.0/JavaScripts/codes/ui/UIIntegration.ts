/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-09 09:38:24
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-05-19 17:44:12
 * @FilePath: \1001_hall\JavaScripts\codes\ui\UIIntegration.ts
 * @Description  : 
 */

import { GameConfig } from "../../config/GameConfig";
import { INoticeElement } from "../../config/Notice";
import IntegraBtnItem_UI_Generate from "../../ui-generate/ShareUI/integration/IntegraBtnItem_UI_generate";
import Integration_UI_Generate from "../../ui-generate/ShareUI/integration/Integration_UI_generate";
import { AchievementPanel } from "../modules/achievement/ui/AchievementPanel";
import { UIPhotoNews } from "../modules/faker/ui/UINews";
import UIFakerNewsItem from "../modules/faker/ui/UIFakerNewsItem";
import UIMissionDailyPanel from "../modules/mission/ui/UIMissionDailyPanel";
import UIMissionNormalPanel from "../modules/mission/ui/UIMissionNormalPanel";
import { LanUtil } from "../utils/LanUtil";
import { MainUI } from "./MainUI";
import { UIAniUtil } from "../utils/UIAniUtil";
import ActivityBtn_UI_Generate from "../../ui-generate/ShareUI/integration/ActivityBtn_UI_generate";
import { GridSelectContainer } from "../utils/UIPool";


export interface IntegrationPanel extends mw.UIScript {
    showVisible(bVisible: boolean): void
}

export enum EIntegrationTabType {

    Daily = 1,
    Mission,
    Achievement,
    Notice,
}

class UISubTabItem extends ActivityBtn_UI_Generate {

    /** 不能监听这个 */
    public onSelect: Action = new Action();

    public isSelected: boolean;

    private readonly selectColor = LinearColor.colorHexToLinearColor("#FFF300FF");
    private readonly unSelectColor = LinearColor.colorHexToLinearColor("#FFFFFF");

    public setSelected(isTrue: boolean) {
        if (isTrue) {
            this.btn_activity1.normalImageColor = this.selectColor;
        } else {
            this.btn_activity1.normalImageColor = this.unSelectColor;
        }
        this.isSelected = isTrue;
    }

    protected onStart() {
        this.btn_activity1.onClicked.add(() => {
            if (this.isSelected) { return; }
            this.call();
        });
        this.switchPointView(false);
    }

    public call() {
        this.onSelect.call();
        UIService.getUI(UIIntegration).switchSubTab(this.cfg.panelName);
    }

    public cfg: INoticeElement;

    public setData(cfgId: number) {
        this.cfg = GameConfig.Notice.getElement(cfgId);
        this.text_activity1.text = this.cfg.title;
    }

    public switchPointView(isView: boolean) {
        this.img_redpointA1.visibility = isView ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }
}

export default class UIIntegration extends Integration_UI_Generate {
    /** 面板实例数组 */
    private panelMap: Map<string, IntegrationPanel> = new Map();

    /**已经创建得页签ID */
    private createdTabIndex: number[] = [];

    private tabItems: IntegrationTab[] = [];

    protected onShow() {
        this.switchTab(1);
        UIAniUtil.popUp(this.canvas_frame);
    }
    protected onHide() {
        this.curPanelID = -1;
        UIAniUtil.popDown(this.canvas_frame);

    }
    private subTabContainer: GridSelectContainer<UISubTabItem>;

    protected onStart(): void {
        this.subTabContainer = new GridSelectContainer<UISubTabItem>(this.canvas_activityBtn, UISubTabItem);
        this.btn_back.onClicked.add(() => {
            UIService.hide(UIIntegration)
        })
        this.initTabs();
        this.initPanels();
    }

    /**初始化页签 */
    private initTabs() {
        let data = GameConfig.Notice.getAllElement();
        for (let i = 0; i < data.length; ++i) {
            // 如果是活动类型并且是子界面就不用创建tab了
            if (data[i].type === EIntegrationTabType.Notice && !data[i].children) { continue; }
            this.createTab(data[i].id);
            if (data[i].children) {
                data[i].children.forEach(id => {
                    this.createTab(id, data[i].id);
                    this.subTabContainer.addNode().setData(id);
                })
            }
        }
    }

    private createTab(tabId: number, parentId: number = null) {
        let tabData = GameConfig.Notice.getElement(tabId);
        if (!tabData) return;
        if (this.createdTabIndex.indexOf(tabId) != -1) return;//已经创建过了
        let tab = UIService.create(IntegrationTab)
        tab.setData(tabData, this, parentId);
        this.canvas_btn.addChild(tab.uiObject);
        this.createdTabIndex.push(tabId)
        this.tabItems.push(tab);
    }

    /** 
     * 设置活动tab的显隐
     */
    private setSubTabView(isHide: boolean) {
        this.canvas_activity.visibility = isHide ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
    }



    /** 当前界面的id */
    private curPanelID: number = -1;

    public switchTab(panelID: number) {
        // 不要反复打开
        if (this.curPanelID === panelID) { return; }
        this.curPanelID = panelID;

        let panelCfg = GameConfig.Notice.getElement(panelID);

        this.tabItems.forEach((item) => {
            item.onSelected(panelCfg.id);
        })

        // 没有子界面的关闭子界面UI
        this.setSubTabView(!panelCfg.children);

        // 设置标题
        this.text_title.text = panelCfg.title;

        // 有子界面的选第一个
        if (panelCfg.children != null) {
            this.subTabContainer.getFirstUsedNode().call();
            return;
        };

        this.switchSubTab(panelCfg.panelName)


    }

    /**
     * 切换子面板tab
     * 目前活动面板有子面板
     */
    public switchSubTab(panelName: string) {
        this.panelMap.forEach((p, n) => {
            p.showVisible(n == panelName);
        })
    }

    /**
     * 显示subTab
     */
    public showSubTab() {
        this.switchTab(EIntegrationTabType.Notice);
    }

    /**
     * 获取子界面活动按钮
     * @param panelName 子界面的名字
     */
    public getSubUIItem(panelName: string): UISubTabItem {
        return this.subTabContainer.nodes.find(v => { return v.cfg.panelName === panelName });
    }

    private createPanel<T extends IntegrationPanel>(panelClass: { new(): T }) {
        let panel = UIService.create(panelClass)
        this.canvas_panels.addChild(panel.uiObject)

        if (panel instanceof UIFakerNewsItem) {
            panel.uiObject.position = Vector2.zero;
            panel.rootCanvas.position = Vector2.zero;
        }

        this.panelMap.set(panelClass.name, panel)
    }

    /**设置主界面入口按钮红点 */
    public setEntranceRedPoint() {
        let redCount = 0;
        this.tabItems.forEach(e => {
            redCount += e.redPointStrings.length;
        })
        UIService.getUI(MainUI).img_wupoint06.visibility = redCount == 0 ? SlateVisibility.Collapsed : SlateVisibility.Visible
    }

    /**
     * 设置子界面活动按钮红点状态
     */
    public setBtnRedPoint(childPanelName: string, isRed: boolean) {
        const subItem = this.getSubUIItem(childPanelName);
        if (subItem) {
            subItem.switchPointView(isRed);
        }
    }

    /**初始化面板 */
    private initPanels() {
        this.createPanel(UIMissionDailyPanel) //添加每日任务面板
        this.createPanel(UIMissionNormalPanel) //添加常规任务面板
        this.createPanel(AchievementPanel)  // 成就面板 
        this.createPanel(UIFakerNewsItem)//活动面板
        this.createPanel(UIPhotoNews) //胶卷面板
    }

}

export class IntegrationTab extends IntegraBtnItem_UI_Generate {

    data: INoticeElement
    mainPanel: UIIntegration
    parentId: number;
    showChildren: boolean = false;
    btnOff: Vector2 = new Vector2(1, -1);
    redPointPanels: string[] = [];
    redPointStrings: string[] = [];
    onSelected(id: number) {
        if (this.data.id == id) {
            this.btn_icon.enable = false
        }
        else {
            this.btn_icon.enable = true
        }
    }
    onStart() {
        this.btn_icon.onClicked.add(() => {
            if (!this.data || !this.mainPanel) return;
            this.mainPanel.switchTab(this.data.id)
        })
        this.btn_onOff.visibility = SlateVisibility.Collapsed;
        this.btn_onOff.onClicked.add(() => {
            //这个扩展就先注释掉了
            return;
            if (!this.data.children) return
            this.showChildren = !this.showChildren;
            Event.dispatchToLocal(`evt_childCanvasVisible_${this.data.id}`, this.showChildren);
            this.setBtnSwitch()
        })
    }

    /** 父节点的面板名 */
    private parentPanelName: string = "";

    setData(data: INoticeElement, parent: UIIntegration, parentId: number = null) {
        this.data = data
        this.mainPanel = parent
        this.parentId = parentId;
        this.btn_icon.normalImageGuid = this.data.icon.toString();
        this.btn_icon.disableImageGuid = this.data.icon.toString();
        this.btn_icon.pressedImageGuid = this.data.icon.toString();
        this.btn_onOff.visibility = this.data.children != null ? SlateVisibility.Visible : SlateVisibility.Hidden;
        if (this.parentId) {
            Event.addLocalListener(`evt_childCanvasVisible_${this.parentId}`, this.showOrHide.bind(this));
            this.uiObject.visibility = SlateVisibility.Collapsed;//有父节点 初始化的时候隐藏
            this.parentPanelName = GameConfig.Notice.getElement(parentId).panelName;
            Event.addLocalListener(`evt_panelRedPointChange_${data.panelName}`, this.onChildrenRedPointChange.bind(this));
            return;
        }
        this.saveRedPointPanels();
        //监听一个红点变化
        Event.addLocalListener("evt_panelRedPointChange", this.onRedPointChange.bind(this))
    }

    /** 子界面红点改变的回调 */
    onChildrenRedPointChange(str: string, isAdd: boolean) {
        if (isAdd) {
            let index = this.redPointStrings.indexOf(str);
            // 没有这个红点就添加一下
            if (-1 == index) this.redPointStrings.push(str);
            // 有这个红点就返回了
            if (-1 != index) return;
        } else {
            let index = this.redPointStrings.indexOf(str);
            // 没有就返回
            if (-1 == index) return;
            // 有这个红点就删了
            if (-1 != index) this.redPointStrings.splice(index, 1);
        }
        Event.dispatchToLocal("evt_panelRedPointChange", this.parentPanelName, `active`, isAdd);
        this.mainPanel.setBtnRedPoint(this.data.panelName, isAdd);
    }

    onRedPointChange(panelName: string, str: string, isAdd: boolean) {
        if (this.redPointPanels.includes(panelName)) {

            let index = this.redPointStrings.indexOf(str)
            if (isAdd) {
                if (-1 == index) this.redPointStrings.push(str)
            } else {
                if (-1 != index) this.redPointStrings.splice(index, 1)
            }
        }

        this.img_point.visibility = this.redPointStrings.length <= 0 ? SlateVisibility.Collapsed : SlateVisibility.Visible;
        this.text_mun.text = this.redPointStrings.length.toString();
        this.mainPanel.setEntranceRedPoint();
    }

    /**保存红点树面板 */
    saveRedPointPanels() {
        this.redPointPanels.push(this.data.panelName)
        let tabIds = [this.data.id];
        while (tabIds.length > 0) {
            let id = tabIds.pop();
            let data = GameConfig.Notice.getElement(id);
            this.redPointPanels.push(data.panelName);
            if (data.children) data.children.forEach(id => { tabIds.push(id) })
        }
    }

    showOrHide(bVisible: boolean) {
        if (bVisible) {
            this.uiObject.visibility = SlateVisibility.Visible
        } else {
            this.showChildren = false;
            this.uiObject.visibility = SlateVisibility.Collapsed
            //通知自己的子节点也隐藏
            Event.dispatchToLocal(`evt_childCanvasVisible_${this.data.id}`, this.showChildren);
            this.setBtnSwitch()
        }
    }

    /**设置切换按钮状态 */
    setBtnSwitch() {
        this.btn_onOff.renderScale = this.showChildren ? this.btnOff : Vector2.one
    }

}