/** 
 * @Author       : lei.zhao
 * @Date         : 2023-09-05 18:32:11
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-13 17:12:50
 * @FilePath     : \stumbleguys\JavaScripts\AI\client\PassStagetAI.ts
 * @Description  : 修改描述
 */

import CheckPoint from "../../Prefabs/CheckPoint/Script/CheckPoint";
import { AIRobot } from "./AIRobot";
import { CLAI } from "./ClientAIService";

/**
 * 通关AI
 */
const temp = new Vector();
export class PassStageAI {
    private checkPoint: CheckPoint;
    public isFinish = false;
    constructor(public id: number, public ai: AIRobot) {
    }

    public start() {
        this.checkPoint = CLAI.getCheckPoint(99);
        this.ai.setPass(true);
        //ai出生到指定位置
        const worldSize = this.checkPoint.gameObject.worldTransform.rotation.rotateVector(this.checkPoint.gameObject.worldTransform.scale);
        temp.set(worldSize.x * 50 * this.checkPoint.rage * MathUtil.randomFloat(-1, 1), worldSize.y * 50 * this.checkPoint.rage * MathUtil.randomFloat(-1, 1), 0);
        temp.add(this.checkPoint.gameObject.worldTransform.position);
        this.ai.checkPoint(temp);
        this.ai.reborn();
    }

    public stop() {
        this.ai.isPassable = false;
        this.ai.pauseTime = 10000;
        this.ai.destroy();
    }

}