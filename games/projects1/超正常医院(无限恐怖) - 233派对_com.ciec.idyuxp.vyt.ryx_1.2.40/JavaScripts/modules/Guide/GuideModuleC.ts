import { ActionCommon } from "../../const/GlobalData";
import GuideChoose_Generate from "../../ui-generate/Common/GuideChoose_generate";
import UITools from "../../utils/UI/UITools";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import { ShopData } from "../Shop/ShopData";
import { ShopModuleC } from "../Shop/ShopModuleC";
import GuideModuleData from "./GuideModuleData";
import GuideModuleS from "./GuideModuleS";
import P_Guide from "./P_Guide";
import { TaskEnum } from "./TaskEnum";


export default class GuideModuleC extends ModuleC<GuideModuleS, GuideModuleData> {

    /**新手任务列表UI */
    private guideUI: P_Guide;
    /**是否已偷袭过怪物 */
    public isAttack = false;

    protected onStart(): void {
        this.guideUI = UIService.getUI(P_Guide);
    }

    /**初始化模块的时机不走onStart，交给其它模块调用 */
    public initModule() {
        // 已经完成新手教程，直接返回

        this.data.onDataChange.add(() => {
            // 当这一次是新手教程的最后一次任务完成时
            if (this.data.isFinishGuide) {
                this.finishAllTask();
                ModuleService.getModule(AnalyticsModuleC).guideEnd();
            }
            this.updateTask();
        });
        // 任务完成监听
        ActionCommon.onTaskComplete.add((taskId) => {
            ModuleService.getModule(AnalyticsModuleC).finishGuideStep(taskId);
        })
        // 显示详情监听
        ActionCommon.onShowTaskDetail.add((taskId) => {
            this.showTaskDetail(taskId);
        })
        this.initUIBtn();
        this.initGuide();
    }

    /**初始化UI点击事件 */
    initUIBtn() {
        // 选择是否进行新手教程UI
        let chooseUI = UIService.getUI(GuideChoose_Generate);
        chooseUI.mButton_New.onClicked.add(() => {
            this.guideUI.initUI(this.data);
            this.server.net_setGuiding();
            UITools.playCloseTween(chooseUI);
            if (DataCenterC.getData(ShopData).isShowGift) {
                let shopModuleC = ModuleService.getModule(ShopModuleC);
                shopModuleC.showScreenShop(11011);
            }
        })
        chooseUI.mButton_Close.onClicked.add(() => {
            UITools.playCloseTween(chooseUI);

            if (DataCenterC.getData(ShopData).isShowGift) {
                let shopModuleC = ModuleService.getModule(ShopModuleC);
                shopModuleC.showScreenShop(11011);
            }
        })
        // 老玩家直接完成新手任务
        chooseUI.mButton_Old.onClicked.add(() => {
            UITools.playCloseTween(chooseUI);
            this.server.net_setFinishGuide();
            this.finishAllTask();

            if (DataCenterC.getData(ShopData).isShowGift) {
                let shopModuleC = ModuleService.getModule(ShopModuleC);
                shopModuleC.showScreenShop(11011);
            }
        })
    }

    /**初始化新手教程 */
    public initGuide() {
        /**未接受新手教程，显示是否进行新手教程弹窗 */
        if (!this.data.isGuiding) {
            // 弹窗：是否进行新手教程
            UIService.show(GuideChoose_Generate);
        } else {
            // 正在进行新手教程，读取进度并显示UI
            this.guideUI.initUI(this.data);
        }
        // 添加任务完成监听
        ActionCommon.onTaskComplete.add((taskId) => {
            this.server.net_finishTask(taskId);
        });
        console.log("初始化新手教程");
    }

    /**显示新手任务细节 */
    private showedTaskIds: Set<number> = new Set();
    public showTaskDetail(taskId: number) {
        if (this.data.isFinishGuide || this.showedTaskIds.has(taskId) || taskId < this.data.curTaskId) return;
        // 特殊逻辑
        if (taskId == TaskEnum.special_attack && !this.isAttack) {
            this.guideUI.arrowAnim(true);
            return;
        }
        // 一般逻辑
        this.guideUI.showTaskDetail(this.data.taskDataList[taskId - 1].taskId);
        this.showedTaskIds.add(taskId);
    }

    /**完成当前任务 */
    public updateTask() {
        this.guideUI.updateTaskState(this.data.taskDataList);
    }

    /**完成所有任务 (数据从服务端接收，不用通知服务端) */
    public finishAllTask() {
        // 移除数据变化监听
        this.data.onDataChange.clear();
        // 移除任务监听
        ActionCommon.onTaskComplete.clear();
    }

    /**获取是否完成引导 */
    public get isFinishGuide() {
        return this.data.isFinishGuide;
    }
}