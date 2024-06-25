import { GameConfig } from "../../config/GameConfig";

export class TaskData {
    /**任务配置 */
    taskId: number;
    /**当前完成次数 */
    curCount: number;
    /**最大完成次数 */
    maxCount: number;

    constructor(taskId: number, curCount: number, maxCount: number = 1) {
        this.taskId = taskId;
        this.curCount = curCount;
        this.maxCount = maxCount;
    }
}


export default class GuideModuleData extends Subdata {

    /**是否已完成新手教程 */
    @Decorator.persistence("1")
    public isFinishGuide = false;
    /**正在进行新手教程 */
    @Decorator.persistence("2")
    public isGuiding = false;
    /**当前新手教程进行到的任务id */
    @Decorator.persistence("3")
    public curTaskId = 1;
    /**任务数据列表 */
    @Decorator.persistence("4")
    public taskDataList: TaskData[] = [];


    /**初始化数据 */
    protected initDefaultData(): void {
        GameConfig.Task.getAllElement().forEach(conf => {
            let taskData = new TaskData(conf.id, 0, conf.Num);
            this.taskDataList.push(taskData);
        });
    }

    /**完成一次 */
    finishOnce(taskId: number) {
        // console.log("完成任务" + taskId, "当前任务:" + this.curTaskId);.
        let index = this.taskDataList.findIndex(task => task.taskId == taskId);
        this.taskDataList[index].curCount++;
        this.updateTaskState();
    }

    /**更新任务完成状态(递归) */
    public updateTaskState() {
        // 所有任务已完成
        if (this.curTaskId == null) {
            this.onFinishAllTask();
            console.error("所有任务都已经完成了");
            return;
        }
        let curTask = this.taskDataList.find(task => task.taskId == this.curTaskId);
        // 任务未完成
        if (curTask.curCount < curTask.maxCount) {
            return;
        }
        // 任务完成
        this.curTaskId = this.getNextTaskId();
        this.updateTaskState();
    }

    /**完成任务 */
    private onFinishAllTask() {
        this.isFinishGuide = true;
    }

    /**获取下一个任务的id */
    private getNextTaskId() {
        let curTaskIndex = this.taskDataList.findIndex(task => task.taskId == this.curTaskId);
        let nextTaskIndex = curTaskIndex + 1;
        let task = this.taskDataList[nextTaskIndex];
        return task?.taskId;
    }
}