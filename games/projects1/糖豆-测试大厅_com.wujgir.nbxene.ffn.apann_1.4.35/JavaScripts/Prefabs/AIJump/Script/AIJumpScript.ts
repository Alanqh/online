import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-01 09:33:58
 * @LastEditors  : zhenyu.zhang
 * @LastEditTime : 2023-03-09 16:32:01
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\AIJump\Script\AIJumpScript.ts
 * @Description  : 修改描述
 */

import { HumanoidManager } from "../../../../JavaScripts/AI/HumanoidManager";
import { CLAI } from "../../../AI/client/ClientAIService";

@Component
export default class AIJumpScript extends mw.Script {
    @mw.Property({ displayName: "是否飞扑" })
    public isSwoop: boolean = true;
    @mw.Property({ displayName: "延迟跳跃" })
    public delay: number = 0;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add(humanoid => {
            if (PlayerManagerExtesion.isNpc(humanoid)) {
                if (this.isRunningClient()) {
                    if (CLAI.hasAI(humanoid)) {
                        if (this.delay == 0) {
                            humanoid.jump();
                            if (this.isSwoop) {
                                CLAI.swoop(humanoid, 0.2);
                            }
                        } else {
                            setTimeout(() => {
                                humanoid.jump();
                                if (this.isSwoop) {
                                    CLAI.swoop(humanoid, 0.2);
                                }
                            }, this.delay * 1000);
                        }
                    }
                } else {
                    if (HumanoidManager.getHunabiuds().find(i => i.character == humanoid)) {
                        humanoid.jump();
                        if (this.isSwoop) {
                            HumanoidManager.swoop(humanoid, 0.2);
                        }
                    }
                }

            }
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}