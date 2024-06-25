import { PlayerManagerExtesion } from "../Modified027Editor/ModifiedPlayer";
import { PlayerParam } from "./PlayerParam";

export const SkatingEnable = "SkatingEnable"
export const SkatingDisable = "SkatingDisable"

/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-10-31 17:42:48
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-12-13 14:43:37
 * @FilePath     : \stumbleguys\JavaScripts\playerCtrl\SkatingAnimation.ts
 * @Description  : 修改描述
 */
export class SkatingAnimation {
    /**操作杆按下的触点, 能多点触控*/
    joyStickDown: number = 0;
    curSwitchTime: number = 0
    switchTime: number = 0.5
    isStand: boolean = true
    isTurn: boolean = false
    turnTime: number = 0
    enable: boolean = true
    finishEnable: boolean = true

    constructor(public actor: Character) {
        Event.addLocalListener("Joy.TouchNum", (num: number) => {
            this.joyStickDown = num
        })
        Event.addLocalListener("EnterTurn", () => {
            //转向持续1s
            this.isTurn = true
            this.turnTime = 2
        })
        Event.addLocalListener("EnterStand", () => {
            this.isStand = true
        })
        Event.addLocalListener("LeaveStand", () => {
            this.isStand = false
        })
        Event.addLocalListener(SkatingEnable, () => {
            this.enable = true
        })
        Event.addLocalListener(SkatingDisable, () => {
            this.enable = false
        })
        Event.addLocalListener("FinishLine.Pass.Client", () => {
            this.finishEnable = false
            PlayerParam.isSkating = false
            setTimeout(() => {
                if (this.actor.currentAnimation) PlayerManagerExtesion.rpcStopAnimation(this.actor, this.actor.currentAnimation.assetId);
                setTimeout(() => {
                    PlayerManagerExtesion.changeBaseStanceExtesion(this.actor, "154704");
                }, 100);
            }, 1000);
        })
    }

    onUpdate(dt) {
        if (!this.finishEnable) return
        if (!this.enable) return
        if (this.curSwitchTime > 0) {
            this.curSwitchTime -= dt
        }
        if (this.turnTime > 0) {
            this.turnTime -= dt
            if (this.turnTime <= 0) this.isTurn = false
        }
        if (this.curSwitchTime <= 0) {
            if (this.isStand) {
                if (this.joyStickDown > 0) {
                    if (this.isTurn) {
                        if (this.actor.currentStance) {
                            // console.log("测试:: 转向1")
                            PlayerManagerExtesion.changeBaseStanceExtesion(this.actor, null);
                            //停姿态后不能马上播动画
                            setTimeout(() => {
                                if (!this.enable) return
                                PlayerManagerExtesion.rpcPlayAnimation(this.actor, "146121", 0, 1.5)
                            }, 50);
                            this.curSwitchTime = this.switchTime
                        } else {
                            if (this.actor.currentAnimation && this.actor.currentAnimation.assetId == "146121" && this.actor.currentAnimation.isPlaying) {
                                //已经在播当前动画了, 不用重复播
                            } else {
                                // console.log("测试:: 转向2")
                                PlayerManagerExtesion.rpcPlayAnimation(this.actor, "146121", 0, 1.5)
                                this.curSwitchTime = this.switchTime
                            }
                        }
                    } else {
                        if (!this.actor.currentStance) {
                            // console.log("测试:: 跑动")
                            if (this.actor.currentAnimation) PlayerManagerExtesion.rpcStopAnimation(this.actor, this.actor.currentAnimation.assetId);
                            //等动画停了再设置状态机才能成功
                            setTimeout(() => {
                                if (!this.enable) return
                                PlayerManagerExtesion.changeBaseStanceExtesion(this.actor, "154704");
                            }, 50);
                            this.curSwitchTime = this.switchTime
                        }
                    }
                } else {
                    if (this.actor.currentStance) {
                        // console.log("测试:: 站立1")
                        setTimeout(() => {
                            if (!this.enable) return
                            PlayerManagerExtesion.changeBaseStanceExtesion(this.actor, null);
                            setTimeout(() => {
                                if (!this.enable) return
                                PlayerManagerExtesion.rpcPlayAnimation(this.actor, "146120", 0)
                            }, 50);
                        }, 500);
                        this.curSwitchTime = this.switchTime + 0.1
                    } else {
                        if (this.actor.currentAnimation && this.actor.currentAnimation.assetId == "146120" && this.actor.currentAnimation.isPlaying) {
                            //已经在播当前动画了, 不用重复播
                        } else {
                            // console.log("测试:: 站立2")
                            PlayerManagerExtesion.rpcPlayAnimation(this.actor, "146120", 0)
                            this.curSwitchTime = this.switchTime
                        }
                    }
                }
            } else {
                if (!this.actor.currentStance) {
                    // console.log("测试:: 空中")
                    if (this.actor.currentAnimation) PlayerManagerExtesion.rpcStopAnimation(this.actor, this.actor.currentAnimation.assetId);
                    setTimeout(() => {
                        if (!this.enable) return
                        PlayerManagerExtesion.changeBaseStanceExtesion(this.actor, "154704");
                        // console.log("空中切换状态机")
                    }, 50);
                    this.curSwitchTime = this.switchTime
                }
            }
        }
    }
}