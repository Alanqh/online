import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-23 14:26:35
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-06-06 17:54:14
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\AIRepath\Script\AIRepath.ts
 * @Description  : 修改描述
 */

@Component
export default class AIRepath extends mw.Script {

    @mw.Property({ displayName: "路径点名字" })
    private point: string = "";
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add((humanoid) => {
            if (PlayerManagerExtesion.isNpc(humanoid)) {
                if (this.isRunningClient()) {
                    Event.dispatchToLocal("AI.Repath.Client", humanoid, this.point);
                } else {
                    Event.dispatchToLocal("AI.Repath.Server", humanoid, this.point);
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