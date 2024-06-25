import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : lei.zhao
 * @Date         : 2023-07-19 15:13:12
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-19 15:13:52
 * @FilePath     : \stumbleguys\JavaScripts\AI\RandomMove.ts
 * @Description  : 修改描述
 */

@Component
export default class RandomMove extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add(obj => {
            if (PlayerManagerExtesion.isNpc(obj)) {
                Event.dispatchToLocal("AI.MoveToPoint", obj, new mw.Vector(250, MathUtil.randomFloat(-650, 650), 430));
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