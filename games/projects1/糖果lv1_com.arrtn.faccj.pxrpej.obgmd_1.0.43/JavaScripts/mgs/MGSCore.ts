import { MGSBase } from "./MGSBase";

/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-24 10:38:51
 * @LastEditors  : zhenyu.zhang
 * @LastEditTime : 2023-02-24 10:55:57
 * @FilePath     : \stumbleguys\JavaScripts\mgs\MGSCore.ts
 * @Description  : 核心埋点
 */

export class MGSCore extends MGSBase {

    /**
     * 核心循环开始(大厅)
     */
    public coreStart(): void {
        this.reportLog("ts_coregameplay_start", "核心循环开始", { step_time: 869233 });
    }

    /**
     * 核心循环步骤
     * @param step 步骤 1 ~ 13
     */
    public coreStep(step: number): void {
        this.reportLog("ts_coregameplay_step", "核心循环步骤", { coregameplay_step: step, step_time: 869233 })
    }

    /**
     * 核心循环结束
     */
    public coreEnd(): void {
        this.reportLog("ts_coregameplay_end", "核心循环开始", { step_time: 869233 });
    }

}