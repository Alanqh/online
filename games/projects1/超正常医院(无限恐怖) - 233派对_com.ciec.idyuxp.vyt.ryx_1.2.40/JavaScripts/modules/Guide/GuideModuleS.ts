import { ActionCommon } from "../../const/GlobalData";
import GuideModuleC from "./GuideModuleC";
import GuideModuleData from "./GuideModuleData";


export default class GuideModuleS extends ModuleS<GuideModuleC, GuideModuleData> {

    protected onStart(): void {
        /**完成新手任务监听 */
        ActionCommon.onTaskComplete.add((playerId, taskId) => {
            let data = this.getPlayerData(playerId);
            if (data.isFinishGuide && !data.isGuiding) return;
            data.finishOnce(taskId);
            // 更新客户端数据，走onDataChange回调
            data.save(true);
        })
    }

    /**完成一次新手任务 */
    public finishOnce(taskId: number, playerId: number) {
        let data = this.getPlayerData(playerId);
        if (data.isFinishGuide) return;
        ActionCommon.onTaskComplete.call(playerId, taskId);
    }

    /**完成所有任务(测试方法) */
    public finishAllTask(playerId: number) {
        let data = this.getPlayerData(playerId);
        data.taskDataList.forEach((task) => {
            task.curCount = task.maxCount;
        })
        data.isFinishGuide = true;
        data.save(true);
    }

    /**设置状态为正在进行新手任务 */
    public net_setGuiding() {
        this.currentData.isGuiding = true;
        this.currentData.save(false);
    }

    /**设置已完成新手任务 */
    public net_setFinishGuide() {
        this.currentData.isFinishGuide = true;
        this.currentData.save(false);
    }

    /**客户端通知完成新手任务 */
    public net_finishTask(taskId: number) {
        // 已完成新手任务的 不广播事件
        if (this.currentData.isFinishGuide) return;
        ActionCommon.onTaskComplete.call(this.currentPlayerId, taskId);
    }

    /**所有任务都已完成 */
    private onFinishAllTask() {

    }
}