/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-16 09:42:19
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-10-20 15:23:25
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GravityArea\Script\GravityArea.ts
 * @Description  : 修改描述
 */

import { PlayerParam } from "../../../playerCtrl/PlayerParam";

const TEMP = new mw.Vector();
@Component
export default class GravityArea extends mw.Script {

    /**力的起点坐标 */
    private rootPoint: mw.Vector;
    /**总长度 */
    private size: number;

    /**周期系数，用于模拟上下浮动的效果 */
    private cycle: number = 0;
    /**周期乘法系数，用于模拟上下浮动的效果 */
    private cycleMulit: number = 300;

    private local: Character;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        if (SystemUtil.isClient()) {
            Player.asyncGetLocalPlayer().then(player => {
                this.local = player.character;
            });
        }
        let trigger = this.gameObject as mw.Trigger
        trigger.onEnter.add((go: Character) => {
            if (go == this.local) {
                // 开启帧更新
                go.gravityScale = 0;
                go.jump();
                this.useUpdate = true;
            }
        });
        trigger.onLeave.add((go: Character) => {
            if (go == this.local) {
                // 开启帧更新
                this.useUpdate = false;
                go.gravityScale = PlayerParam.gravityScale;
            }
        });
        this.rootPoint = new mw.Vector();

        this.size = mw.Vector.multiply(trigger.worldTransform.scale, 100, this.rootPoint).length;
        //后方向量
        mw.Vector.multiply(trigger.worldTransform.getUpVector(), -100, this.rootPoint);
        //中心点位置
        mw.Vector.add(trigger.worldTransform.position, mw.Vector.multiply(this.rootPoint, trigger.worldTransform.scale, this.rootPoint), this.rootPoint);

    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.local) {
            let location = this.local.worldTransform.position;
            //运动方向
            mw.Vector.subtract(location, this.rootPoint, TEMP);
            //力度
            const force = (this.size - TEMP.length) * 2 - this.cycle;
            this.cycle += dt * this.cycleMulit;
            if (this.cycle > 200) {
                this.cycle = 200;
                this.cycleMulit = -this.cycleMulit;
            } else if (this.cycle < - 200) {
                this.cycle = -200;
                this.cycleMulit = -this.cycleMulit;
            }
            mw.Vector.multiply(this.gameObject.worldTransform.getUpVector(), dt * force, TEMP);
            // 添加距离需要用帧时间校准
            mw.Vector.add(location, TEMP, location);
            this.local.worldTransform.position = location;
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}