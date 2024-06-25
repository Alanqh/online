import { GameConfig } from "../../config/GameConfig";
import GuideChoose_Generate from "../../ui-generate/Common/GuideChoose_generate";
import GuideList_Generate from "../../ui-generate/Common/GuideList_generate";
import GuidePop_Generate from "../../ui-generate/Common/GuidePop_generate";
import UITools from "../../utils/UI/UITools";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import GuideModuleData, { TaskData } from "./GuideModuleData";

export default class P_Guide extends GuideList_Generate {

    /**当前任务 */
    public curTask: TaskData;
    /**正在播放tween动画 */
    private isTweening = false;
    /**箭头初始位置 */
    private arrowStartPos: Vector2;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.arrowStartPos = this.mImg_Arrow.position.clone();
    }

    /**初始化新手任务UI */
    public initUI(data: GuideModuleData) {
        console.log(data);
        let conf = GameConfig.Task.getElement(data.curTaskId);
        this.curTask = data.taskDataList[conf.id - 1];
        if (this.curTask == null) {
            console.error("lmn error:任务id不存在" + conf.id);
            // this.curTask = data.taskDataList[0];
        }
        this.startGuideAnim();

        ModuleService.getModule(AnalyticsModuleC).guideStart();
    }

    /**更新任务进度(递归) */
    public updateTaskState(taskList: TaskData[]) {

        let task = taskList[this.curTask.taskId - 1];
        // 没有下一个任务了
        if (task == null) {
            this.finishAllTask();
            return;
        }
        // 当前正在播放tween动画，直接返回
        if (this.isTweening) {
            return;
        }
        this.curTask = task;
        // 未完成 更新次数
        if (task.curCount < task.maxCount) {
            this.updateTaskUI(task);
            return;
        }
        // 已完成
        // console.log("完成任务" + task.taskId);
        this.updateTaskUI(task);
        // 完成任务 切换下一个任务
        this.switchToNextTask(taskList);
    }


    /**切换到下一任务 */
    private switchToNextTask(taskList: TaskData[]) {
        // 新任务淡入
        let fadeInTween = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, 1000)
            .onUpdate((obj) => {
                this.mText_Name.renderOpacity = obj.alpha;
                this.mText_Desc.renderOpacity = obj.alpha;
            })
            .onComplete(() => {

                this.isTweening = false;
                this.updateTaskState(taskList);
            })
        // 完成的任务淡出
        let fadeOutTween = new mw.Tween({ alpha: 1 }).to({ alpha: 0 }, 1000)
            .onUpdate((obj) => {
                this.mText_Name.renderOpacity = obj.alpha;
                this.mText_Desc.renderOpacity = obj.alpha;
            })
            .onComplete(() => {
                // 更新任务
                let curIndex = taskList.findIndex(task => task.taskId == this.curTask.taskId);
                let nextTask = taskList[curIndex + 1];
                if (nextTask == null) {
                    this.finishAllTask();
                    return;
                }
                this.curTask = nextTask;
                this.updateTaskUI(this.curTask);
                fadeInTween.start();
            })
            .start();
        this.isTweening = true;
    }

    /**更新任务完成次数 */
    public updateTaskUI(task: TaskData) {
        let conf = GameConfig.Task.getElement(task.taskId);
        this.mText_Desc.text = `${conf.Describe} (${task.curCount}/${this.curTask.maxCount})`;
        this.mText_Name.text = conf.Name;
    }

    /**显示任务细节弹窗 */
    public showTaskDetail(taskId: number) {
        let conf = GameConfig.Task.getElement(taskId);
        let detailUI = UIService.create(GuidePop_Generate);
        detailUI.mButton_Close.onClicked.add(() => {
            UITools.playCloseTween(detailUI);
        });
        detailUI.mButton_Confirm.onClicked.add(() => {
            UITools.playCloseTween(detailUI);
        });
        UITools.playPopUpTween(detailUI);
        detailUI.mText_Des.text = conf.Text;
        detailUI.mImg_TeachShow.imageGuid = conf.Picture;
        console.log("显示任务详情");
    }

    /**箭头引导动画 */
    private arrowTween: mw.Tween<any> = null;
    public arrowAnim(show: boolean) {
        if (show) {
            this.mCanvas_1.visibility = SlateVisibility.HitTestInvisible;
            let startPos = this.mImg_Arrow.position.clone();
            this.arrowTween = new mw.Tween({ pos: startPos.clone() }).to({ pos: new Vector2(startPos.x - 20, startPos.y) }, 500)
                .onUpdate((obj) => {
                    this.mImg_Arrow.position = obj.pos;
                })
                .yoyo(true)
                .repeat(Infinity)
                .start();
        } else {
            this.mCanvas_1.visibility = SlateVisibility.Hidden;
            this.arrowTween?.stop();
            this.mImg_Arrow.position = this.arrowStartPos.clone();
        }

    }

    /**完成所有任务的UI动画 */
    public finishAllTask() {
        new mw.Tween({ pos: this.mCanvas.position.clone() }).to({ pos: new Vector(this.mCanvas.size.x * -1, this.mCanvas.position.y) }, 500)
            .onUpdate((obj) => {
                this.mCanvas.position = obj.pos;
            })
            .onComplete(() => {
                this.onFinishAllTask();
            })
            .start()
    }

    /**开始进行新手任务 */
    private startGuideAnim() {
        console.log("新手引导UI 启动！")
        this.updateTaskUI(this.curTask);
        this.show();
        let originalPos = this.mCanvas.position.clone();
        // 入场时位置
        this.mCanvas.position = new Vector2(this.mCanvas.size.x * -1, this.mCanvas.position.y);
        // 最终挪到mCanvas_Pos的 相对0,0位置
        this.mCanvas_Pos.addChild(this.mCanvas);
        new mw.Tween({ pos: this.mCanvas.position.clone() }).to({ pos: Vector2.zero }, 500)
            .onUpdate((obj) => {
                this.mCanvas.position = obj.pos;
            })
            .onComplete(() => {

            })
            .start();
    }


    /**完成所有任务UI结束后 */
    private onFinishAllTask() {
        this.hide();
        // 显示传送UI
    }

}