import { MGSBase } from "./MGSBase";

export class MGSGuide extends MGSBase {
    /**引导开始 */
    guideStart() {
        this.reportLog("ts_tutorial_start", "新手引导开始", {});
    }
    /**
     * 引导步骤
     * @param step 
     */
    guideStep(step: number) {
        this.reportLog("ts_tutorial_step", "玩家引导步骤", { ts_tutorial_step: step })
    }
    /**引导结束 */
    guideEnd() {
        this.reportLog("ts_tutorial_end", "新手引导结束", {});
    }
}