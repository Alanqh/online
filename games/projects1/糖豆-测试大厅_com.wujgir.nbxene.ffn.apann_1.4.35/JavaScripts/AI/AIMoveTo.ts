import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : lei.zhao
 * @Date         : 2023-07-21 15:11:22
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-28 14:59:22
 * @FilePath     : \stumbleguys\JavaScripts\AI\AIMoveTo.ts
 * @Description  : 修改描述
 */

@Component
export default class AIMoveTo extends mw.Script {

    @mw.Property({ displayName: "目标节点1", capture: true })
    private moveToGuid0: string = "";
    @mw.Property({ displayName: "目标节点2", capture: true })
    private moveToGuid1: string = "";
    @mw.Property({ displayName: "目标节点2", capture: true })
    private moveToGuid2: string = "";
    @mw.Property({ displayName: "目标节点3", capture: true })
    private moveToGuid3: string = "";

    private moveList: mw.Character[] = [];

    private moveToObjs: mw.GameObject[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        for (let i = 0; i < 4; i++) {
            this[`moveToGuid${i}`] && GameObject.asyncFindGameObjectById(this[`moveToGuid${i}`]).then(moveToObj => {
                moveToObj.setVisibility(mw.PropertyStatus.Off);
                moveToObj.setCollision(mw.PropertyStatus.Off);
                this.moveToObjs.push(moveToObj);
                const trigger = this.gameObject as mw.Trigger;
                trigger.onEnter.add(obj => {
                    if (PlayerManagerExtesion.isNpc(obj)) {
                        if (!this.moveList.includes(obj))
                            this.moveList.push(obj);
                        if (this.gameObject.worldTransform.position.x >= 800) {
                            Event.dispatchToLocal("AI.MoveToPoint", obj, new mw.Vector(250, MathUtil.randomFloat(-650, 650), 430));
                        }
                    }
                });
            });
        }
        this.useUpdate = true;
    }
    private successWalk = (npcLocation: Vector, objectLocation: Vector) => {
        return npcLocation.x >= objectLocation.x;
    }
    private randomWalk = (npc: mw.Character) => {
        Event.dispatchToLocal("AI.MoveToPoint", npc, new mw.Vector(MathUtil.randomFloat(200, 400), MathUtil.randomFloat(-650, 650), 430));
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.moveList.length > 0) {
            const x = this.gameObject.worldTransform.position.x;
            if (x <= 300) {
                for (let i = 0; i < this.moveList.length; i++) {
                    Event.dispatchToLocal("AI.MoveToObject", this.moveList[i], this.moveToObjs[MathUtil.randomInt(0, this.moveToObjs.length)], this.randomWalk, this.successWalk);
                }
                this.moveList.length = 0;
            }
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}